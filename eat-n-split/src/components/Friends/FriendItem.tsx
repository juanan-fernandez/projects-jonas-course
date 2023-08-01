import styles from './FriendItem.module.css'
import { FriendWithId } from '../../types/friends'
import { SetStateAction } from 'react'

interface FriendItemProps {
	friend: FriendWithId
	selectFriend: () => void
	clearFriend: () => void
	isSelected: boolean
	showAddForm: React.Dispatch<SetStateAction<boolean>>
}
export function FriendItem({ friend, selectFriend, clearFriend, isSelected, showAddForm }: FriendItemProps): React.ReactNode {
	//const [isSelected, setIsSelected] = useState(false)

	let result = ''
	let pStyle = ''
	if (friend.debts === 0) {
		result = `You and ${friend.name} are even`
	}
	if (friend.debts > 0) {
		result = `${friend.name} owes you ${friend.debts}€`
		pStyle = `${styles.green}`
	}
	if (friend.debts < 0) {
		result = `You owe ${friend.name} ${Math.abs(friend.debts)}€`
		pStyle = `${styles.red}`
	}

	const isSelectedHandler = (): void => {
		showAddForm(false)
		if (isSelected) {
			clearFriend()
		} else {
			selectFriend()
		}
	}

	return (
		<div className={`${styles.friend}  ${isSelected ? styles.selected : ''}`}>
			<img src={friend.avatar} alt={friend.name} />
			<div className={styles.text}>
				<h3>{friend.name}</h3>
				<p className={pStyle}>{result}</p>
			</div>

			<button onClick={isSelectedHandler}>{isSelected ? 'Close' : 'Select'}</button>
		</div>
	)
}
