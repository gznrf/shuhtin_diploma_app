const raw = import.meta.env.VITE_API_URL ?? ''

export const API_BASE = raw.replace(/\/$/, '')

export const apiUrl = (path) => {
	const normalized = path.startsWith('/') ? path : `/${path}`
	return `${API_BASE}${normalized}`
}
