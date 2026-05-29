import styles from './ProfileForm.module.scss'
import ActionsCard from './actions-card/ActionsCard'
import Fields from './fields/Fields'

const ProfileForm = ({
	formData,
	handleChange,
	handleSubmit,
	handleLogout,
	handleDeleteAccount,
	loading
}) => {
	return (
		<div className={styles.profileCard}>
			<h2 className={styles.title}>Профиль</h2>

			<form
				className={styles.form}
				onSubmit={handleSubmit}
			>
				<Fields
					formData={formData}
					handleChange={handleChange}
				/>

				<button
					type='submit'
					className={styles.button}
					disabled={loading}
				>
					{loading ? 'Сохранение...' : 'Сохранить'}
				</button>
			</form>

			<ActionsCard
				handleLogout={handleLogout}
				handleDeleteAccount={handleDeleteAccount}
			/>
		</div>
	)
}

export default ProfileForm
