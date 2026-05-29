import Layout from '@/components/layout/Layout'
import { motion } from 'framer-motion'
import ProfileForm from './profile-form/ProfileForm'
import ProfileStats from './profile-stats/ProfileStats'
import styles from './Profile.module.scss'
import { useProfile } from './useProfile'
import { useProfileStats } from './useProfileStats'

const Profile = () => {
	const profile = useProfile()
	const { stats } = useProfileStats()

	return (
		<Layout>
			<motion.section
				initial={{ opacity: 0, y: 18 }}
				animate={{ opacity: 1, y: 0 }}
			>
				<div className={styles.page}>
					<div className={styles.container}>
						<div className={styles.content}>
							<ProfileForm {...profile} />
							<ProfileStats
								user={profile.user}
								stats={stats}
							/>
						</div>
					</div>
				</div>
			</motion.section>
		</Layout>
	)
}

export default Profile
