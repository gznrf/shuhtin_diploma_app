import styles from './Field.module.scss'

const Field = (props) => {
	return (
		<input
			className={styles.field}
			{...props}
		/>
	)
}

export default Field
