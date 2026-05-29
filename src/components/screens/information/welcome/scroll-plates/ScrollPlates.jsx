import Plate1 from '@/assets/images/plates/plate-1.png'
import Plate2 from '@/assets/images/plates/plate-2.png'
import Plate3 from '@/assets/images/plates/plate-3.png'
import Plate4 from '@/assets/images/plates/plate-4.png'
import Plate5 from '@/assets/images/plates/plate-5.png'
import styles from './ScrollPlates.module.scss'

const plates = [Plate1, Plate2, Plate3, Plate4, Plate5]
const ScrollPlates = () => {
	return (
		<div className={styles.scroll_container}>
			<div className={styles.scroll_track}>
				{plates.map((plate) => {
					return (
						<img
							key={plate}
							src={plate}
							alt='plate'
							className={styles.plate_img}
						/>
					)
				})}
				{plates.map((plate) => {
					return (
						<img
							key={plate}
							src={plate}
							alt='plate'
							className={styles.plate_img}
						/>
					)
				})}
			</div>
		</div>
	)
}

export default ScrollPlates
