import style from './Friends.module.css';
import { useState } from 'react';
import { initialFriends } from '../../dummy/data';
import { FriendsList } from './FriendsList';
import { FriendWithId } from '../../types/friends';
import { SplitBill } from '../SplitBill/SplitBill';

export function Friends(): React.ReactNode {
	const [friendsData, setFriendsData] = useState(initialFriends);
	const [activeFriend, setActiveFriend] = useState<FriendWithId | null>(null);
	const [activeFriendId, setActiveFriendId] = useState('');

	const clearActiveFriend = (): void => {
		setActiveFriend(null);
		setActiveFriendId('');
	};
	const activeFriendHandler = (active: FriendWithId): void => {
		if (activeFriend && activeFriend.id === active.id) {
			clearActiveFriend();
			return;
		}
		setActiveFriend(active);
		setActiveFriendId(active.id);
	};

	const addFriendToListHandler = (newFriend: FriendWithId): void => {
		//setFriendsData([...friendsData, newFriend])
		setFriendsData(currentFriends => [...currentFriends, newFriend]);
	};

	const updateFriendHandler = (myFriend: FriendWithId): void => {
		const updatedFriendsList = friendsData.map(f => {
			return f.id === myFriend.id ? myFriend : f;
		});
		setFriendsData(updatedFriendsList);
	};

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
					<SplitBill
						friend={activeFriend}
						onUpdateFriend={updateFriendHandler}
						clearActiveFriend={clearActiveFriend}
						key={activeFriend.id}
					/>
				</div>
			)}
		</div>
	);
}
