import style from './FriendsList.module.css'
import { FriendWithId } from '../../types/friends'
import { FriendItem } from './FriendItem'
import { useState } from 'react'
import { AddFriend } from './AddFriend'

interface FriendsListProps {
	friendsData: FriendWithId[]
	onActivateFriendId: (id: string) => void
}

export function FriendsList({
	friendsData,
	onActivateFriendId
}: FriendsListProps): React.ReactNode {
	const [showAddForm, setShowAddForm] = useState(false)
	//to select a friend
	const activateFriendIdHandler = (friendId: string): void => {
		onActivateFriendId(friendId)
	}

	const list = friendsData.map(friend => {
		return (
			<li key={friend.id}>
				<FriendItem
					friend={friend}
					activateFriendId={activateFriendIdHandler.bind(null, friend.id)}
				/>
			</li>
		)
	})

	return (
		<div className={style.sidebar}>
			<ul>{list}</ul>
			{showAddForm && <AddFriend />}
			<button
				className={style.button}
				onClick={(): void => setShowAddForm(!showAddForm)}
			>
				{showAddForm ? 'Close' : 'Add friend'}
			</button>
		</div>
	)
}
