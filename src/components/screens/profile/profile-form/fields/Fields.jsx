import styles from './Fields.module.scss'

const Fields = ({ formData, handleChange }) => {
	return (
		<>
			<div className={styles.field}>
				<label
					className={styles.label}
					htmlFor='name'
				>
					Имя
				</label>
				<input
					id='name'
					name='name'
					type='text'
					value={formData.name}
					onChange={handleChange}
					className={styles.input}
				/>
			</div>

			<div className={styles.field}>
				<label
					className={styles.label}
					htmlFor='email'
				>
					Email
				</label>
				<input
					id='email'
					name='email'
					type='email'
					value={formData.email}
					onChange={handleChange}
					className={styles.input}
				/>
			</div>

			<div className={styles.inlineFields}>
				<div className={styles.field}>
					<label
						className={styles.label}
						htmlFor='age'
					>
						Возраст
					</label>
					<input
						id='age'
						name='age'
						type='number'
						value={formData.age}
						onChange={handleChange}
						className={styles.input}
					/>
				</div>

				<div className={styles.field}>
					<label
						className={styles.label}
						htmlFor='weight'
					>
						Вес
					</label>
					<input
						id='weight'
						name='weight'
						type='number'
						step='0.1'
						value={formData.weight}
						onChange={handleChange}
						className={styles.input}
					/>
				</div>

				<div className={styles.field}>
					<label
						className={styles.label}
						htmlFor='height'
					>
						Рост
					</label>
					<input
						id='height'
						name='height'
						type='number'
						step='0.1'
						value={formData.height}
						onChange={handleChange}
						className={styles.input}
					/>
				</div>

				<div className={styles.field}>
					<label
						className={styles.label}
						htmlFor='goal'
					>
						Цель
					</label>

					<div className={styles.selectWrapper}>
						<select
							id='goal'
							name='goal'
							value={formData.goal}
							onChange={handleChange}
							className={styles.select}
						>
							<option value=''>Выбери цель</option>
							<option value='lose'>Похудение</option>
							<option value='gain'>Набор массы</option>
						</select>
						<span className={styles.selectArrow}>▼</span>
					</div>
				</div>
			</div>
		</>
	)
}

export default Fields
