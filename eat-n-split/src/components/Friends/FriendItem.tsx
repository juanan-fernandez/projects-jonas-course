import { FriendWithId } from '../../types/friends'

interface FriendItemProps {
	friend: FriendWithId
}
export function FriendItem({ friend }: FriendItemProps): React.ReactNode {
	let result = ''
	if (friend.debts === 0) {
		result = `You and ${friend.name} are even`
	}
	if (friend.debts > 0) {
		result = `${friend.name} owes you ${friend.debts}€`
	}
	if (friend.debts < 0) {
		result = `You owe ${friend.name} ${friend.debts}€`
	}

	return (
		<div>
			<img src={friend.avatar} alt={friend.name} />
			<h1>{friend.name}</h1>
			<p>{result}</p>
			<button>Select</button>
		</div>
	)
}
