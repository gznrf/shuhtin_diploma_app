export function buildNutritionPrompt(meal) {
	return [
		'Ты — ассистент по анализу питания.',
		'Твоя задача: разобрать прием пищи пользователя и вернуть только валидный JSON без markdown и без пояснений.',
		'',
		'Правила:',
		'1. Разбей блюдо на отдельные продукты.',
		'2. Если граммовка не указана, оцени среднюю реалистичную порцию.',
		'3. Для каждого продукта рассчитай калории, белки, жиры и углеводы.',
		'4. Все числа округляй до целых.',
		'5. Используй русский язык в названиях продуктов.',
		'6. Если блюдо описано слишком общо, все равно дай разумную оценку.',
		'7. Верни строго один JSON-объект и больше ничего.',
		'',
		'Формат ответа:',
		'{',
		'  "foods": [',
		'    {',
		'      "name": "string",',
		'      "weight_g": 0,',
		'      "calories": 0,',
		'      "protein_g": 0,',
		'      "fat_g": 0,',
		'      "carbs_g": 0',
		'    }',
		'  ],',
		'  "total": {',
		'    "calories": 0,',
		'    "protein_g": 0,',
		'    "fat_g": 0,',
		'    "carbs_g": 0',
		'  }',
		'}',
		'',
		`Прием пищи: ${meal}`
	].join('\n')
}

export function parseModelJson(content) {
	if (!content || typeof content !== 'string') {
		throw new Error('Пустой или некорректный content от модели')
	}

	try {
		return JSON.parse(content)
	} catch {
		const cleaned = content
			.replace(/```json/gi, '')
			.replace(/```/g, '')
			.trim()

		return JSON.parse(cleaned)
	}
}

export function validateNutritionShape(parsed) {
	return (
		parsed &&
		Array.isArray(parsed.foods) &&
		parsed.total &&
		typeof parsed.total.calories !== 'undefined' &&
		typeof parsed.total.protein_g !== 'undefined' &&
		typeof parsed.total.fat_g !== 'undefined' &&
		typeof parsed.total.carbs_g !== 'undefined'
	)
}
