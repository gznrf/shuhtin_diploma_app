import styles from './Title.module.scss'

const Title = ({ children, align = 'center', size = 'lg' }) => {
	return (
		<h1 className={`${styles.title} ${styles[align]} ${styles[size]}`}>
			{children}
		</h1>
	)
}

export default Title
