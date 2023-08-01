import { Dispatch, useState } from 'react'
import { FriendWithId } from '../../types/friends'
import styles from './AddFriend.module.css'

interface AddFriendProps {
	addFriend: (newFriend: FriendWithId) => void
}
export function AddFriend({ addFriend }: AddFriendProps): React.ReactNode {
	const [friendName, setFriendName] = useState('')
	const [friendImage, setFriendImage] = useState(getRandomAvatar())

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
		const newFriend: FriendWithId = {
			id: self.crypto.randomUUID(),
			name: friendName,
			avatar: `https://robohash.org/${friendImage}`,
			debts: 0
		}
		addFriend(newFriend)
		setFriendName('')
		setFriendImage(getRandomAvatar())
	}

	//currying
	const inputChangeHandler =
		(setInput: Dispatch<React.SetStateAction<string>>) =>
		(ev: React.ChangeEvent<HTMLInputElement>): void => {
			setInput(ev.currentTarget.value)
		}

	return (
		<form className={styles.form_add_friend} onSubmit={submitFormHandler}>
			<label htmlFor='friend_name'>👫 Friend name</label>
			<input
				type='text'
				name='friend_name'
				id='friend_name'
				placeholder='Your friends name'
				onChange={inputChangeHandler(setFriendName)}
				value={friendName}
			/>
			<label htmlFor='friend_image'>🌅 Random Image Url</label>
			<input
				type='text'
				name='friend_image'
				id='friend_image'
				value={friendImage}
				onChange={inputChangeHandler(setFriendImage)}
			/>
			<button type='submit'>Add</button>
		</form>
	)
}
