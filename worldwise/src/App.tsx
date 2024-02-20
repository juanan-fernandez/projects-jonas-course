import { Routes, Route, Navigate } from 'react-router-dom'
import { Home } from './pages/Home/Home'
import { Product } from './pages/Product/Product'
import { Pricing } from './pages/Pricing/Pricing'
import { Login } from './pages/Login/Login'
import { AuthContextProvider } from './store/auth/authContext'
import { CitiesContextProvider } from './store/cities/citiesContext'
import { NotFound } from './pages/NotFound/NotFound'
import { AppLayout } from './pages/AppLayout/AppLayout'
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute'
import { CitiesList } from './components/Cities/CitiesList'
import { Countries } from './components/Countries/Countries'
import { AddCityForm } from './components/AddCityForm/AddCityForm'

function App(): React.JSX.Element {
	return (
		<AuthContextProvider>
			<CitiesContextProvider>
				<Routes>
					<Route index element={<Home />} />
					<Route path='pricing' element={<Pricing />} />
					<Route path='product' element={<Product />} />
					<Route path='login' element={<Login />} />

					<Route
						path='/app'
						element={
							<ProtectedRoute>
								<AppLayout />
							</ProtectedRoute>
						}
					>
						<Route index element={<Navigate replace to='cities' />} />
						<Route path='cities' index element={<CitiesList />} />
						<Route path='countries' element={<Countries />} />
						<Route path='form/:lat/:lng' element={<AddCityForm />} />
					</Route>

					<Route path='*' element={<NotFound />} />
				</Routes>
			</CitiesContextProvider>
		</AuthContextProvider>
	)
}

export default App
