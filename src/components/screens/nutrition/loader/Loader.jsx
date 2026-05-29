import { motion } from 'framer-motion'
import styles from './Loader.module.scss'

const Loader = () => {
	return (
		<motion.div
			key='loading'
			initial={{ opacity: 0, y: 12 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -12 }}
			className={styles.loadingCard}
		>
			<div className={styles.skeletonTitle} />
			<div className={styles.skeletonLine} />
			<div className={styles.skeletonLine} />
			<div className={styles.skeletonLineShort} />
		</motion.div>
	)
}

export default Loader
