export const formatPhone = (value) => {
	const digits = value.replace(/\D/g, '').slice(0, 11)

	let normalized = digits
	if (normalized.startsWith('8')) {
		normalized = '7' + normalized.slice(1)
	}
	if (!normalized.startsWith('7') && normalized.length > 0) {
		normalized = '7' + normalized
	}

	let result = '+7'
	if (normalized.length > 1) {
		result += ` (${normalized.slice(1, 4)}`
	}
	if (normalized.length >= 4) {
		result += `) ${normalized.slice(4, 7)}`
	}
	if (normalized.length >= 7) {
		result += `-${normalized.slice(7, 9)}`
	}
	if (normalized.length >= 9) {
		result += `-${normalized.slice(9, 11)}`
	}

	return result
}
