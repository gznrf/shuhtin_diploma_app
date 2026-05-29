import emailIcon from '@/assets/images/icon/email.svg'
import eyeClose from '@/assets/images/icon/eye-close.svg'
import eyeOpen from '@/assets/images/icon/eye-open.svg'
import personIcon from '@/assets/images/icon/person-log.svg'
import styles from '@/components/screens/auth/Auth.module.scss'
import Field from '@/components/ui/field/Field'
import { usePasswordToggle } from '@/hooks/usePasswordToggle'

const InputContainer = ({ formData, handleChange, ref }) => {
	const { showPassword, togglePassword, inputType } = usePasswordToggle()

	return (
		<>
			<div className={styles.input_box}>
				<Field
					type='text'
					name='name'
					placeholder='Имя'
					required
					ref={ref}
					value={formData.name}
					onChange={handleChange}
				/>
				<img
					src={personIcon}
					alt=''
				/>
			</div>

			<div className={styles.input_box}>
				<Field
					type='email'
					name='email'
					placeholder='Email'
					required
					autoComplete='new-password'
					value={formData.email}
					onChange={handleChange}
				/>
				<img
					src={emailIcon}
					alt=''
				/>
			</div>

			<div className={styles.input_box}>
				<Field
					id='inputPassword'
					type={inputType}
					name='password'
					placeholder='Пароль'
					required
					autoComplete='new-password'
					value={formData.password}
					onChange={handleChange}
				/>
				<img
					onClick={togglePassword}
					src={showPassword ? eyeOpen : eyeClose}
					alt=''
				/>
			</div>
		</>
	)
}

export default InputContainer
