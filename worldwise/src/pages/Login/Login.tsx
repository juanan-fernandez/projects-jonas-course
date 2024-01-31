import { useState } from 'react'
import { NavBar } from '../../components/Navbar/Navbar'
import styles from './Login.module.css'
export function Login() {
	const [login, setLogin] = useState({ email: '', password: '' })

	const inputChangeHandler = (ev: React.ChangeEvent<HTMLInputElement>): void => {
		setLogin(prevLogin => ({
			...prevLogin,
			[ev.currentTarget.name]: ev.currentTarget.value
		}))
	}

	const formSubmitHandler = (ev: React.FormEvent<HTMLFormElement>) => {
		ev.preventDefault()
		if (login.email && login.password) useAuth
	}

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
							placeholder='Enter your email address'
							value={login.email}
							onChange={inputChangeHandler}
						/>
					</div>
					<div className={styles.row}>
						<label htmlFor='password'>Password</label>
						<input
							type='password'
							name='password'
							placeholder='Enter your password'
							value={login.password}
							onChange={inputChangeHandler}
						/>
					</div>
					<div className={styles.row}>
						<button type='submit'>Login</button>
					</div>
				</form>
			</section>
		</main>
	)
}
