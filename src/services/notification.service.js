export const showNotification = (message, type = 'success') => {
	window.dispatchEvent(
		new CustomEvent('notification', {
			detail: { message, type }
		})
	)
}
