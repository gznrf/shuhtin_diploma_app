import Chart from './chart/Chart'
import Table from './table/Table'
import styles from './TableAndChart.module.scss'

const TableAndChart = ({ data }) => {
	return (
		<div className={styles.content_grid}>
			<Table data={data} />
			<Chart data={data} />
		</div>
	)
}

export default TableAndChart
