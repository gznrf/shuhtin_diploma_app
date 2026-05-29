import HarvardPlateImage from '@/assets/images/harvard-plate.png'
import Title from '@/components/ui/title/Title'
import styles from './HarvardPlate.module.scss'
import Part from './part-info/Part'

const informations = [
	{
		id: 1,
		name: 'Фрукты и ягоды',
		info: '⅛ тарелки. Вместе с овощами должны составлять половину вашего рациона. Старайтесь включать больше разнообразных фруктов по виду и цвету. Например яблоки, апельсины, груши, ягоды – прекрасное сочетание.',
		position: { top: '25%', left: '30%' }
	},
	{
		id: 2,
		name: 'Овощи и зелень',
		info: '⅜ тарелки. Чем больше овощей и чем они разнообразнее, тем лучше – это важные источники клетчатки. Огурцы, помидоры, брокколи, редис, морковь, шпинат, болгарский перец, кабачок, баклажан – выбирайте на свой вкус.',
		position: { top: '25%', right: '25%' }
	},
	{
		id: 3,
		name: 'Белки',
		info: '¼ тарелки. Подойдут рыба, мясо (нежирная говядина, кролик), птица (курица, индейка), морепродукты (кальмары), творог жирностью до 5%, яйца (белковый омлет), бобы и орехи.',
		position: { bottom: '25%', right: '25%' }
	},
	{
		id: 4,
		name: 'Цельнозерновые',
		info: '¼ тарелки. К этой категории относятся хлеб, макароны, цельная пшеница, неочищенный рис и т. д.',
		position: { bottom: '25%', left: '30%' }
	}
]

const HarvardPlate = () => {
	return (
		<section className={styles.plate}>
			<Title
				align='center'
				size='md'
			>
				Модель правильного питания – <span>Принцип Гарвардской тарелки</span>
			</Title>

			<div className={styles.plate_container}>
				<img
					className={styles.plate_container_image}
					src={HarvardPlateImage}
					alt='Гарвардская тарелка'
				/>

				{informations.map((item) => (
					<Part
						key={item.id}
						{...item}
					/>
				))}
			</div>
		</section>
	)
}

export default HarvardPlate
