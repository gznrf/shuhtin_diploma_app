import { useEffect, useState } from 'react'
import styles from './Notification.module.scss'

const NotificationContainer = () => {
	const [notifications, setNotifications] = useState([])

	useEffect(() => {
		const handler = (e) => {
			const id = Date.now() + Math.random()

			setNotifications((prev) => [...prev, { id, ...e.detail }])

			setTimeout(() => {
				setNotifications((prev) =>
					prev.filter((notification) => notification.id !== id)
				)
			}, 3000)
		}

		window.addEventListener('notification', handler)

		return () => {
			window.removeEventListener('notification', handler)
		}
	}, [])

	return (
		<div className={styles.container}>
			{notifications.map((notification) => (
				<div
					key={notification.id}
					className={`${styles.notification} ${styles[notification.type]}`}
				>
					{notification.message}
				</div>
			))}
		</div>
	)
}

export default NotificationContainer
