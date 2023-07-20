import { useState } from 'react';
import './App.css';

function App() {
	const [bill, setBill] = useState(0);
	const [tip, setTip] = useState(0);
	const [tipFriend, setTipFriend] = useState(0);

	// const billChange = (newBill: number) => {
	// 	setBill(newBill);
	// };

	const tipChange = (newTip: number) => {
		setTip(newTip);
	};

	const tipFriendChange = (newTip: number) => {
		setTipFriend(newTip);
	};

	const resetValues = () => {
		setBill(0);
		setTip(0);
		setTipFriend(0);
	};

	const totalTip = (bill * (tip + tipFriend)) / 2 / 100;

	return (
		<div className='app'>
			<InputBill onBillChange={setBill} bill={bill} />
			<UserTip onTipChange={tipChange} tip={tip}>
				How did you like the service?
			</UserTip>
			<UserTip onTipChange={tipFriendChange} tip={tipFriend}>
				How did your friend like the service?
			</UserTip>
			<Output billAmount={bill} tipAmount={totalTip} />
			<ResetButton resetValues={resetValues} />
		</div>
	);
}

export default App;

type InputBillProps = {
	onBillChange: React.Dispatch<React.SetStateAction<number>>;
	bill: number;
	//setTheBill: React.Dispatch<SetStateAction<number>>;
};
function InputBill({ onBillChange, bill }: InputBillProps) {
	const handleChangeInput = (ev: React.ChangeEvent<HTMLInputElement>) => {
		onBillChange(Number(ev.currentTarget.value));
	};

	return (
		<div className='bill'>
			<label htmlFor='bill'>How much was the bill?</label>
			<input
				name='bill'
				id='bill'
				type='number'
				onChange={handleChangeInput}
				min={0}
				defaultValue={0}
				value={bill}
			/>
		</div>
	);
}

type UserTipProps = {
	children: React.ReactNode;
	onTipChange: (newTip: number) => void;
	tip: number;
};

function UserTip({ children, onTipChange, tip }: UserTipProps) {
	const handleChangeSelect = (ev: React.ChangeEvent<HTMLSelectElement>) => {
		onTipChange(Number(ev.currentTarget.value));
	};

	return (
		<div className='tip'>
			<label htmlFor='percent'>{children}</label>
			<select
				name='percent'
				id='percent'
				defaultValue={0}
				onChange={handleChangeSelect}
				value={tip}
			>
				<option value={0}>Dissatisfied (0%)</option>
				<option value={5}>Was ok (5%)</option>
				<option value={10}>Was good (10%)</option>
				<option value={20}>Amazing (20%)</option>
			</select>
		</div>
	);
}

function Output({ billAmount, tipAmount }: { billAmount: number; tipAmount: number }) {
	return (
		<div>
			{!!billAmount && (
				<div>
					You pay ${Number(billAmount) + Number(tipAmount)} (${billAmount} + $
					{tipAmount})
				</div>
			)}
		</div>
	);
}

function ResetButton({ resetValues }: { resetValues: () => void }) {
	return <button onClick={() => resetValues()}>Reset Values</button>;
}
