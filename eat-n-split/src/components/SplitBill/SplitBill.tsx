import { FriendWithId } from '../../types/friends'

interface SplitBillProps {
	friend: FriendWithId
}

export function SplitBill({ friend }: SplitBillProps): JSX.Element {
	return (
		<>
			<h1>SPLIT A BILL WITH {friend.name.toUpperCase()} </h1>
			<form>
				<label htmlFor='bill'>💰 Bill value</label>
				<input type='number' defaultValue={''} min='0' name='bill' id='bill' />
				<label htmlFor='expense'>🧍‍♀️ Your expense</label>
				<input type='number' defaultValue={''} min='0' name='expense' id='expense' />
				<label htmlFor='expense-friend'>👫 {friend.name}&aposs expense</label>
				<input
					type='number'
					defaultValue={''}
					min='0'
					name='expense-friend'
					id='expense-friend'
					disabled
				/>
				<label htmlFor='expense-friend'>👫 {friend.name}&aposs expense</label>
				<select>
					<option value={1}>You </option>
				</select>
				<button onClick={e => e.preventDefault()}>Calculate split bill!</button>
			</form>
		</>
	)
}
