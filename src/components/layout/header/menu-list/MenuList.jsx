import styles from '../Header.module.scss'
import MenuItem from './menu-item/MenuItem'

const items = [
	{
		name: 'Полезная информация',
		id: 'information',
		path: '/',
		auth: false
	},
	{
		name: 'Анализ питания',
		id: 'nutrition',
		path: '/nutrition',
		auth: false
	},
	{
		name: 'Рацион',
		id: 'diet',
		path: '/diet',
		auth: true
	},
	{
		name: 'Рекомендации',
		id: 'recommendation',
		path: '/recommendation',
		auth: true
	},
	{
		name: 'Профиль',
		id: 'profile',
		path: '/profile',
		auth: true
	}
]

const MenuList = ({ setIsModalOpen, isMenuOpen, onLinkClick }) => {
	return (
		<ul className={`${styles.menu_list} ${isMenuOpen ? styles.open : ''}`}>
			{items.map((item) => (
				<MenuItem
					setIsModalOpen={setIsModalOpen}
					key={item.id}
					id={item.id}
					path={item.path}
					auth={item.auth}
					onClick={onLinkClick}
				>
					{item.name}
				</MenuItem>
			))}
		</ul>
	)
}

export default MenuList
