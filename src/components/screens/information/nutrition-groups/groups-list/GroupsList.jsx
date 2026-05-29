import Group1 from '@/assets/images/nutrition-groups/group-1.png'
import Group2 from '@/assets/images/nutrition-groups/group-2.png'
import Group3 from '@/assets/images/nutrition-groups/group-3.png'
import Group4 from '@/assets/images/nutrition-groups/group-4.png'
import Group5 from '@/assets/images/nutrition-groups/group-5.png'
import styles from './GroupsList.module.scss'

const groups = [
	{
		name: 'овощи и фрукты',
		srcImage: Group1,
		number: '1'
	},
	{
		name: 'сложные углеводы',
		srcImage: Group2,
		number: '2'
	},
	{
		name: 'белок (животный и растительный)',
		srcImage: Group3,
		number: '3'
	},
	{
		name: 'молочные продукты',
		srcImage: Group4,
		number: '4'
	},
	{
		name: 'жиры и масла',
		srcImage: Group5,
		number: '5'
	}
]

const GroupsList = () => {
	return (
		<div className={styles.groups}>
			<h3>Сбалансированный рацион включает пять пищевых групп</h3>
			<ul className={styles.groups_list}>
				{groups.map((group) => {
					return (
						<li
							key={group.number}
							className={styles.groups_list_item}
						>
							<h4>{group.name}</h4>
							<img
								src={group.srcImage}
								alt={group.name}
							/>
							<span>{group.number}</span>
						</li>
					)
				})}
			</ul>
			<div className={styles.remark}>
				<p>
					Самое главное – использовать все пять пищевых групп и соблюдать
					разнообразие внутри них. Не обязательно включать какой-то определенный
					продукт, выбор зависит от ваших предпочтений.
				</p>
			</div>
		</div>
	)
}

export default GroupsList
