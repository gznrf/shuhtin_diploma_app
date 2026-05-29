import { EXAMPLES } from '../../nutrition.constants'
import styles from './InputBlock.module.scss'

const InputBlock = ({ meal, setMeal, handleKeyDown, handleExampleClick }) => {
	return (
		<div className={styles.input_block}>
			<label
				className={styles.input_block__label}
				htmlFor='meal'
			>
				Описание приема пищи
			</label>

			<textarea
				id='meal'
				value={meal}
				onChange={(e) => setMeal(e.target.value)}
				onKeyDown={handleKeyDown}
				placeholder='Например: 2 яйца, тост с авокадо, салат и латте'
				className={styles.input_block__textarea}
				rows={4}
			/>

			<div className={styles.input_block__hint}>
				Подсказка: можно писать в свободной форме. Например: “гречка, курица и
				салат”.
			</div>

			<div className={styles.input_block__examples}>
				{EXAMPLES.map((example) => (
					<button
						key={example}
						type='button'
						className={styles.example}
						onClick={() => handleExampleClick(example)}
					>
						{example}
					</button>
				))}
			</div>
		</div>
	)
}

export default InputBlock
