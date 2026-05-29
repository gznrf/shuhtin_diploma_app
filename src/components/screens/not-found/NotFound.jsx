import Notfound from '@/assets/images/404.svg'
import styles from './NotFound.module.scss'

const NotFound = () => {
	return (
		<div className={styles.not_found}>
			<img
				src={Notfound}
				alt='Not found'
			/>
			<p>404 Not Found</p>
		</div>
	)
}

export default NotFound
