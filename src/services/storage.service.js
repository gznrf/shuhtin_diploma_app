export class StorageService {
	constructor() {}
	setItem(key, value) {
		localStorage.setItem(key, JSON.stringify(value))
	}

	getItem(key) {
		const value = localStorage.getItem(key)
		if (!value) return null
		try {
			return JSON.parse(value)
		} catch {
			return value
		}
	}

	removeItem(key) {
		localStorage.removeItem(key)
	}

	clear() {
		localStorage.clear()
	}
}
