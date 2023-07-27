import { useState } from 'react'
import { initialFriends } from '../../dummy/data'
import { FriendsList } from './FriendsList'
import { FriendWithId } from '../../types/friends'

export function Friends(): React.ReactNode {
	const [friendsData, setFriendsData] = useState(initialFriends)
	const [activeFriendId, setActiveFriendId] = useState('')

	const activeFriendIdHandler = (id: string): void => {
		setActiveFriendId(id)
	}

	const addFriendToListHandler = (newFriend: FriendWithId): void => {
		setFriendsData([...friendsData, newFriend])
	}

	return (
		<div>
			<FriendsList
				friendsData={friendsData}
				onActivateFriendId={activeFriendIdHandler}
			/>
			{activeFriendId && <h2>{`Details for ${activeFriendId}`}</h2>}
		</div>
	)
}
