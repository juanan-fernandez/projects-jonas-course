import style from './FriendsList.module.css'
import { FriendWithId } from '../../types/friends'
import { FriendItem } from './FriendItem'
import { useState } from 'react'
import { AddFriend } from './AddFriend'

interface FriendsListProps {
	friendsData: FriendWithId[]
	onActivateFriend: (activeFriend: FriendWithId) => void
	onAddNewFriendToList: (newFriend: FriendWithId) => void
	selectedFriendId: string
}

export function FriendsList({
	friendsData,
	onActivateFriend,
	onAddNewFriendToList,
	selectedFriendId
}: FriendsListProps): React.ReactNode {
	const [showAddForm, setShowAddForm] = useState(false)

	//to select a friend
	const activateFriendHandler = (activeFriend: FriendWithId): void => {
		onActivateFriend(activeFriend)
	}

	//to add new friend
	const addFriendHandler = (newFriend: FriendWithId): void => {
		onAddNewFriendToList(newFriend)
		setShowAddForm(false)
	}

	const list = friendsData.map(friend => {
		return (
			<li key={friend.id}>
				<FriendItem
					friend={friend}
					selectFriend={activateFriendHandler.bind(null, friend)}
					isSelected={selectedFriendId === friend.id}
					showAddForm={setShowAddForm}
				/>
			</li>
		)
	})

	return (
		<div className={style.sidebar}>
			<ul>{list}</ul>
			{showAddForm && <AddFriend addFriend={addFriendHandler} />}
			<button className={style.button} onClick={(): void => setShowAddForm(!showAddForm)}>
				{showAddForm ? 'Close' : 'Add friend'}
			</button>
		</div>
	)
}
