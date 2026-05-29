export const createRequest = async ({ name, number }) => {
	const res = await fetch('http://localhost:3001/requests', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ name, number })
	})

	const data = await res.json()

	if (!res.ok) {
		throw new Error(data.message || 'Не удалось отправить заявку')
	}

	return data
}
