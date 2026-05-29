import { Route, Routes } from 'react-router-dom'
import Auth from './components/screens/auth/Auth'
import Diet from './components/screens/diet/Diet'
import Information from './components/screens/information/Information'
import NotFound from './components/screens/not-found/NotFound'
import Nutrition from './components/screens/nutrition/Nutrition'
import Profile from './components/screens/profile/Profile'
import Recommendation from './components/screens/recommendation/Recommendation'

function App() {
	return (
		<Routes>
			<Route
				path='/auth'
				element={<Auth />}
			/>
			<Route
				path='/'
				element={<Information />}
			/>
			<Route
				path='/nutrition'
				element={<Nutrition />}
			/>
			<Route
				path='/diet'
				element={<Diet />}
			/>
			<Route
				path='/recommendation'
				element={<Recommendation />}
			/>
			<Route
				path='/profile'
				element={<Profile />}
			/>
			<Route
				path='*'
				element={<NotFound />}
			/>
		</Routes>
	)
}

export default App
