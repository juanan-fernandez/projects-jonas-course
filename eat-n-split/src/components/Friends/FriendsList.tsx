import { FriendWithId } from '../../types/friends'

interface FriendsListProps {
	friendsData: FriendWithId[]
}
export function FriendsList({ friendsData }: FriendsListProps): React.ReactNode {
	const list = friendsData.map(friend => {
		return <li key={friend.id}></li>
	})
	return <>{list}</>
}
