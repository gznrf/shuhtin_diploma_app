import { motion } from 'framer-motion'
import AddToDiet from './add-to-diet/AddToDiet'
import Cards from './cards/Cards'
import styles from './Result.module.scss'
import TableAndChart from './table-and-chart/TableAndChart'

const Result = ({ data }) => {
	return (
		<motion.div
			key='result'
			initial={{ opacity: 0, y: 16 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -16 }}
			className={styles.result}
		>
			<Cards data={data} />
			<TableAndChart data={data} />
			<AddToDiet data={data} />
		</motion.div>
	)
}

export default Result
