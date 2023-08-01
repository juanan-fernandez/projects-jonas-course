import style from './FriendsList.module.css'
import { FriendWithId } from '../../types/friends'
import { FriendItem } from './FriendItem'
import { useState } from 'react'
import { AddFriend } from './AddFriend'

interface FriendsListProps {
	friendsData: FriendWithId[]
	onActivateFriend: (activeFriend: FriendWithId) => void
	onAddNewFriendToList: (newFriend: FriendWithId) => void
	clearActiveFriend: () => void
	selectedFriendId: string
}

export function FriendsList({
	friendsData,
	onActivateFriend,
	onAddNewFriendToList,
	clearActiveFriend,
	selectedFriendId
}: FriendsListProps): React.ReactNode {
	const [showAddForm, setShowAddForm] = useState(false)

	//to select a friend
	const activateFriendIdHandler = (activeFriend: FriendWithId): void => {
		onActivateFriend(activeFriend)
	}

	const list = friendsData.map(friend => {
		return (
			<li key={friend.id}>
				<FriendItem
					friend={friend}
					selectFriend={activateFriendIdHandler.bind(null, friend)}
					clearFriend={clearActiveFriend}
					isSelected={selectedFriendId === friend.id}
					showAddForm={setShowAddForm}
				/>
			</li>
		)
	})

	return (
		<div className={style.sidebar}>
			<ul>{list}</ul>
			{showAddForm && <AddFriend addFriend={onAddNewFriendToList} />}
			<button className={style.button} onClick={(): void => setShowAddForm(!showAddForm)}>
				{showAddForm ? 'Close' : 'Add friend'}
			</button>
		</div>
	)
}
