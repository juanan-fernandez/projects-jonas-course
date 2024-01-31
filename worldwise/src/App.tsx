import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home/Home'
import { Product } from './pages/Product/Product'
import { Pricing } from './pages/Pricing/Pricing'
import { Login } from './pages/Login/Login'

function App(): React.JSX.Element {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/pricing' element={<Pricing />} />
			<Route path='/product' element={<Product />} />
			<Route path='/login' element={<Login />} />
			<Route path='*' element={<Home />} />
		</Routes>
	)
}

export default App
