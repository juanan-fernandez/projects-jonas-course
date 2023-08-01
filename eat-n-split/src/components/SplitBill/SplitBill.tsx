import style from './SplitBill.module.css'
import { FriendWithId } from '../../types/friends'
import { SetStateAction, useState } from 'react'

interface SplitBillProps {
	friend: FriendWithId
	onUpdateFriend: (friend: FriendWithId) => void
	clearActiveFriend: () => void
}

export function SplitBill({ friend, onUpdateFriend, clearActiveFriend }: SplitBillProps): JSX.Element {
	const [billAmount, setBillAmount] = useState<SetStateAction<number>>(0)
	const [yourExpense, setYourExpense] = useState<SetStateAction<number>>(0)
	const [whoPays, setWhoPays] = useState(1)

	const billAmountChangeHandler = (ev: React.ChangeEvent<HTMLInputElement>): void => {
		if (!Number.isNaN(ev.currentTarget.value)) setBillAmount(parseInt(ev.currentTarget.value))
	}

	const yourExpenseChangeHandler = (ev: React.ChangeEvent<HTMLInputElement>): void => {
		if (!billAmount) return
		const expense = parseInt(ev.currentTarget.value)
		if (expense > Number(billAmount)) return
		setYourExpense(expense)
	}

	const whoPaysChangeHandler = (ev: React.ChangeEvent<HTMLSelectElement>): void => {
		setWhoPays(Number(ev.target.value))
	}

	const splitSubmitHandler = (ev: React.FormEvent): void => {
		ev.preventDefault()
		let result = 0
		const bill = Number(billAmount)
		const expense = Number(yourExpense)
		if (whoPays === 1) {
			result = friend.debts + (bill - expense)
		}
		if (whoPays === 2) {
			result = friend.debts - expense
		}

		const updatedFriend = { ...friend, debts: result }
		onUpdateFriend(updatedFriend)
		clearActiveFriend()
	}

	return (
		<>
			<form className={style.form_split_bill} onSubmit={splitSubmitHandler}>
				<h2>SPLIT A BILL WITH {friend.name.toUpperCase()} </h2>
				<label htmlFor='bill'>💰 Bill value</label>
				<input
					type='number'
					value={billAmount ? Number(billAmount) : ''}
					min='0'
					name='bill'
					id='bill'
					step='1'
					onChange={billAmountChangeHandler}
				/>
				<label htmlFor='expense'>🧍‍♀️ Your expense</label>
				<input
					type='number'
					value={yourExpense ? Number(yourExpense) : ''}
					min='0'
					step={1}
					name='expense'
					id='expense'
					onChange={yourExpenseChangeHandler}
				/>
				<label htmlFor='expense-friend'>👫 {friend.name}&apos;s expense</label>
				<input
					type='number'
					value={billAmount ? Number(billAmount) - Number(yourExpense) : ''}
					min='0'
					name='expense-friend'
					id='expense-friend'
					disabled
				/>
				<label htmlFor='expense-friend'>😛 Who is paying the bill?</label>
				<select value={whoPays} onChange={whoPaysChangeHandler}>
					<option value={1}>You</option>
					<option value={2}>{friend.name}</option>
				</select>
				<button>Split bill</button>
			</form>
		</>
	)
}
