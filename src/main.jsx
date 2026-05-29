import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './assets/styles/normalization.scss'
import NotificationContainer from './components/ui/notification/NotificationContainer.jsx'
createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<App />
		<NotificationContainer />
	</BrowserRouter>
)
