import styles from './AddFriend.module.css'
export function AddFriend(): React.ReactNode {
	function getRandomAvatar(): string {
		const usernameLength = 10 // You can adjust the desired username length here
		const domainLength = 8 // You can adjust the desired domain length here
		const characters = 'abcdefghijklmnopqrstuvwxyz0123456789'
		let username = ''
		let domain = ''

		// Generate random username
		for (let i = 0; i < usernameLength; i++) {
			const randomIndex = Math.floor(Math.random() * characters.length)
			username += characters[randomIndex]
		}

		// Generate random domain
		for (let i = 0; i < domainLength; i++) {
			const randomIndex = Math.floor(Math.random() * characters.length)
			domain += characters[randomIndex]
		}

		// Add a common email domain (you can customize this as needed)
		const emailDomain = 'example.com'

		return `${username}@${domain}.${emailDomain}`
	}

	const submitFormHandler = (ev: React.FormEvent): void => {
		ev.preventDefault()
		const avatarUrl = 'https://robohash.org/'
	}

	return (
		<form className={styles.form_add_friend} onSubmit={submitFormHandler}>
			<label htmlFor='friend_name'>👫 Friend name</label>
			<input
				type='text'
				name='friend_name'
				id='friend_name'
				placeholder='Your friends name'
			/>
			<label htmlFor='friend_image'>📫 E-mail</label>
			<input
				type='text'
				name='friend_image'
				id='friend_image'
				value={getRandomAvatar()}
			/>
			<button type='submit'>Add</button>
		</form>
	)
}
