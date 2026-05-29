import { useState } from 'react'
import AuthModal from '../ui/auth-modal/AuthModal'
import Footer from './footer/Footer'
import Header from './header/Header'
import styles from './Layout.module.scss'
import RequestButton from './request-button/RequestButton'
import RequestModal from './request-modal/RequestModal'

const Layout = ({ children }) => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [isRequestOpen, setIsRequestOpen] = useState(false)

	return (
		<div className={styles.layout}>
			<Header setIsModalOpen={setIsModalOpen} />
			<main className={styles.main}>{children}</main>
			<Footer />
			<AuthModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
			/>
			<RequestButton onClick={() => setIsRequestOpen(true)} />
			<RequestModal
				isOpen={isRequestOpen}
				onClose={() => setIsRequestOpen(false)}
			/>
		</div>
	)
}

export default Layout
