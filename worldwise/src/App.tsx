import './App.css'
import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home/Home'
import { NavBar } from './components/Navbar/Navbar'

function App(): React.JSX.Element {
	return (
		<Routes>
			<Route path='/' element={<NavBar />} />
			<Route path='/pricing' element={<Home />} />
			<Route path='/produt' element={<Home />} />
			<Route path='/login' element={<Home />} />
		</Routes>
	)
}

export default App
