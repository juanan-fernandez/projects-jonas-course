import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home/Home'
import { Product } from './pages/Product/Product'
import { Pricing } from './pages/Pricing/Pricing'

function App(): React.JSX.Element {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/pricing' element={<Pricing />} />
			<Route path='/product' element={<Product />} />
			<Route path='/login' element={<Home />} />
			<Route path='*' element={<Home />} />
		</Routes>
	)
}

export default App
