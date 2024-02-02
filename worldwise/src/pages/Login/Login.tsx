import { useEffect, useState } from 'react'
import { useAuth } from '../../store/auth/useAuth'
import { NavBar } from '../../components/Navbar/Navbar'
import styles from './Login.module.css'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components/Button/Button'
export function Login() {
	const [login, setLogin] = useState({ email: 'juanicoylosdelacueva@gmail.com', password: 'enlab' })

	const { isAuth, logIn } = useAuth()
	const navigate = useNavigate()

	const inputChangeHandler = (ev: React.ChangeEvent<HTMLInputElement>): void => {
		//const valor = ev.target.value
		setLogin(prevLogin => ({
			...prevLogin,
			[ev.target.name]: ev.target.value
		}))
	}

	const formSubmitHandler = (ev: React.FormEvent<HTMLFormElement>) => {
		ev.preventDefault()
		if (login.email && login.password) if (typeof logIn === 'function') logIn(login.email, login.password)
	}

	useEffect(() => {
		if (isAuth) navigate('/app')
	}, [isAuth])

	return (
		<main className={styles.loginpage}>
			<NavBar />
			<section>
				<form onSubmit={formSubmitHandler}>
					<div className={styles.row}>
						<label htmlFor='email'>Email address</label>
						<input
							type='email'
							name='email'
							id='email'
							placeholder='Enter your email address'
							value={login.email}
							onChange={inputChangeHandler}
							autoComplete='off'
						/>
					</div>
					<div className={styles.row}>
						<label htmlFor='password'>Password</label>
						<input
							type='password'
							name='password'
							id='password'
							placeholder='Enter your password'
							value={login.password}
							onChange={inputChangeHandler}
						/>
					</div>
					<div className={styles.row}>
						<Button>Login</Button>
					</div>
				</form>
			</section>
		</main>
	)
}
