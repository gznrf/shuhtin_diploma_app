import crypto from 'crypto'
import https from 'https'
import {
	buildNutritionPrompt,
	parseModelJson,
	validateNutritionShape
} from '../utils/nutrition.js'

const httpsAgent = new https.Agent({
	keepAlive: true,
	rejectUnauthorized: false
})

let cachedAccessToken = null
let accessTokenExpiresAt = 0

export async function getAccessToken() {
	const now = Date.now()

	if (cachedAccessToken && now < accessTokenExpiresAt - 60_000) {
		return cachedAccessToken
	}

	const authKey = (process.env.GIGACHAT_AUTH_KEY || '').trim()
	const scope = (process.env.GIGACHAT_SCOPE || 'GIGACHAT_API_PERS').trim()

	if (!authKey) {
		throw new Error('Не задан GIGACHAT_AUTH_KEY')
	}

	const response = await fetch(
		'https://ngw.devices.sberbank.ru:9443/api/v2/oauth',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Accept: 'application/json',
				RqUID: crypto.randomUUID(),
				Authorization: `Basic ${authKey}`
			},
			body: new URLSearchParams({ scope })
		}
	)

	const data = await response.json().catch(() => null)

	if (!response.ok) {
		console.error('OAuth status:', response.status)
		console.error('OAuth body:', data)
		throw new Error(
			data?.message || data?.error || 'Не удалось получить access token'
		)
	}

	cachedAccessToken = data.access_token
	accessTokenExpiresAt = data?.expires_at
		? Number(data.expires_at) * 1000
		: Date.now() + 30 * 60 * 1000

	return cachedAccessToken
}

export async function analyzeMealWithGigaChat(meal) {
	const token = await getAccessToken()

	const response = await fetch(
		'https://gigachat.devices.sberbank.ru/api/v1/chat/completions',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify({
				model: 'GigaChat',
				temperature: 0.2,
				messages: [
					{
						role: 'system',
						content: 'Ты отвечаешь только валидным JSON.'
					},
					{
						role: 'user',
						content: buildNutritionPrompt(meal)
					}
				]
			}),
			agent: httpsAgent
		}
	)

	const data = await response.json().catch(() => null)

	if (!response.ok) {
		console.error('GigaChat error status:', response.status)
		console.error('GigaChat error body:', data)

		throw new Error(data?.message || data?.error || 'Ошибка запроса к GigaChat')
	}

	const content = data?.choices?.[0]?.message?.content

	if (!content) {
		console.error('Unexpected GigaChat response:', data)
		throw new Error('Пустой ответ модели')
	}

	let parsed

	try {
		parsed = parseModelJson(content)
	} catch (error) {
		console.error('JSON parse error:', error)
		console.error('Raw model content:', content)
		throw new Error('Модель вернула невалидный JSON')
	}

	if (!validateNutritionShape(parsed)) {
		console.error('Invalid response shape:', parsed)
		throw new Error('Некорректная структура ответа модели')
	}

	return parsed
}
