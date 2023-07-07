import { useState } from 'react';

import './App.css';

type stepProps = {
	step: number;
	handleStep: (upOrDown: '-' | '+') => void;
};
function Step({ step, handleStep }: stepProps): JSX.Element {
	return (
		<div>
			<button onClick={() => handleStep('-')}>-</button>
			<span className='text'>
				Step:
				{step}
			</span>
			<button onClick={() => handleStep('+')}>+</button>
		</div>
	);
}

type counterProps = {
	count: number;
	handleIncrementCount: () => void;
	handleDecrementCount: () => void;
};

function Counter({
	count,
	handleDecrementCount,
	handleIncrementCount,
}: counterProps): JSX.Element {
	return (
		<div>
			<button onClick={handleDecrementCount}>-</button>
			<span className='text'>
				Count:
				{count}
			</span>
			<button onClick={handleIncrementCount}>+</button>
		</div>
	);
}

type dateInfoProps = {
	days: number;
};

function DateInfo({ days }: dateInfoProps): JSX.Element {
	const getDateAdd = (daysToAdd: number) => {
		let newDate = new Date();
		newDate.setDate(newDate.getDate() + daysToAdd);
		return newDate;
	};

	const message = days < 0 ? `${days} ago ` : `${days} from `;
	const verb = days < 0 ? ` was ` : ` will be `;
	const sentence = `${message} today ${verb} ${getDateAdd(days)}`;
	return <p className='text-date'>{sentence}</p>;
}

function App(): JSX.Element {
	const [counter, setCounter] = useState<number>(0);
	const [step, setStep] = useState(1);

	function handleIncrement() {
		setCounter(prev => prev + step);
	}
	function handleDecrement() {
		setCounter(prev => prev - step);
	}

	function handleStep(plusOrMinus: '-' | '+') {
		if (plusOrMinus === '+') {
			setStep(prev => prev + 1);
		}
		if (step > 1 && plusOrMinus === '-') {
			setStep(prev => prev - 1);
		}
	}

	return (
		<>
			<Step step={step} handleStep={handleStep} />
			<Counter
				count={counter}
				handleDecrementCount={handleDecrement}
				handleIncrementCount={handleIncrement}
			/>
			<DateInfo days={counter} />
		</>
	);
}

export default App;
