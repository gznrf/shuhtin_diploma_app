import styles from '@/components/layout/header/Header.module.scss'
import { StorageService } from '@/services/storage.service'
import { NavLink } from 'react-router-dom'

const MenuItem = ({ id, path, children, auth, setIsModalOpen, onClick }) => {
	const handleClickLink = (event) => {
		if (!auth) return

		const token = new StorageService().getItem('token')
		const user = new StorageService().getItem('user')
		const isAuth = !!(token && user)

		if (!isAuth) {
			event.preventDefault()
			setIsModalOpen(true)
		} else if (onClick) {
			onClick() // закрываем мобильное меню после клика
		}
	}

	return (
		<li>
			<NavLink
				id={id}
				to={path}
				onClick={handleClickLink}
				className={({ isActive }) =>
					`${styles.menu_list_item} ${isActive ? styles.menu_list_item__active : ''}`
				}
			>
				{children}
			</NavLink>
		</li>
	)
}

export default MenuItem
