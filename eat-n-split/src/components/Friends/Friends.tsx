import { useState } from 'react'
import { initialFriends } from '../../dummy/data'
import { FriendsList } from './FriendsList'

export function Friends(): React.ReactNode {
	const [friendsData, setFriendsData] = useState(initialFriends)

	return (
		<div>
			<FriendsList friendsData={friendsData} />
		</div>
	)
}
