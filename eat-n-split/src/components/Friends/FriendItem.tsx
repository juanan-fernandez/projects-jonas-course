import styles from './FriendItem.module.css'
import { FriendWithId } from '../../types/friends'

interface FriendItemProps {
	friend: FriendWithId
	activateFriendId: () => void
}
export function FriendItem({
	friend,
	activateFriendId
}: FriendItemProps): React.ReactNode {
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
		result = `You owe ${friend.name} ${friend.debts}€`
		pStyle = `${styles.red}`
	}

	return (
		<div className={styles.friend}>
			<img src={friend.avatar} alt={friend.name} />
			<div className={styles.text}>
				<h3>{friend.name}</h3>
				<p className={pStyle}>{result}</p>
			</div>

			<button onClick={activateFriendId}>Select</button>
		</div>
	)
}
