import { useState } from 'react'
import styles from './Header.module.scss'
import MenuList from './menu-list/MenuList'

const Header = ({ setIsModalOpen }) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
	const closeMenu = () => setIsMenuOpen(false)

	return (
		<header
			className={`${styles.header} ${isMenuOpen ? styles.menu_open : ''}`}
		>
			<p className={styles.logo}>Proper Nutrition</p>
			<button
				className={styles.burger_btn}
				onClick={toggleMenu}
			>
				<span></span>
				<span></span>
				<span></span>
			</button>
			<nav className={styles.menu}>
				<MenuList
					setIsModalOpen={setIsModalOpen}
					isMenuOpen={isMenuOpen}
					onLinkClick={closeMenu}
				/>
			</nav>
		</header>
	)
}

export default Header
