import style from './Friends.module.css'
import { initialFriends } from '../../dummy/data'
import { useState } from 'react'
import { FriendsList } from './FriendsList'
import { FriendWithId } from '../../types/friends'
import { SplitBill } from '../SplitBill/SplitBill'

export function Friends(): React.ReactNode {
	const [friendsData, setFriendsData] = useState(initialFriends)
	const [activeFriend, setActiveFriend] = useState<FriendWithId | null>(null)
	const [activeFriendId, setActiveFriendId] = useState('')

	const clearActiveFriend = (): void => {
		setActiveFriend(null)
		setActiveFriendId('')
	}
	const activeFriendHandler = (active: FriendWithId): void => {
		if (activeFriend && activeFriend.id === active.id) {
			clearActiveFriend()
			return
		}
		setActiveFriend(active)
		setActiveFriendId(active.id)
	}

	const addFriendToListHandler = (newFriend: FriendWithId): void => {
		//setFriendsData([...friendsData, newFriend])
		setFriendsData(currentFriends => [...currentFriends, newFriend])
	}

	const splitBillHandler = (balance: number): void => {
		if (activeFriend) {
			setFriendsData(currentList => {
				return currentList.map(f => (f.id === activeFriend.id ? { ...activeFriend, debts: f.debts + balance } : f))
			})
			clearActiveFriend()
		}
	}

	return (
		<div className={style['friends-app']}>
			<FriendsList
				friendsData={friendsData}
				onActivateFriend={activeFriendHandler}
				onAddNewFriendToList={addFriendToListHandler}
				selectedFriendId={activeFriendId}
			/>
			{activeFriend && (
				<div>
					<SplitBill friend={activeFriend} onSplitBill={splitBillHandler} />
				</div>
			)}
		</div>
	)
}
