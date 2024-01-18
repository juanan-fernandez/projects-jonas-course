import { useReducer } from 'react';
import { initialState, actionsT, bankReducer } from './reducer/reducer';
import './App.css';

// function reducer(state, action) {
// 	switch (action.type) {
// 		case actionsT.OPEN:
// 			return { ...state, isActive: true, balance: action.payload };

// 		case actionsT.DEPOSIT:
// 			return { ...state, balance: state.balance + action.payload };

// 		case actionsT.WITHDRAW:
// 			return { ...state, balance: state.balance - action.payload < 0 ? 0 : state.balance - action.payload };

// 		case actionsT.REQUEST:
// 			return { ...state, balance: state.balance + action.payload, loan: state.loan + action.payload };

// 		case actionsT.PAY:
// 			return { ...state, balance: state.balance - action.payload, loan: 0 };

// 		case actionsT.CLOSE:
// 			return { ...state, isActive: false };

// 		default:
// 			return state;
// 	}
// }

function App() {
	const [state, dispatch] = useReducer(bankReducer, initialState);
	const { balance, loan, isActive } = state;

	function openAccount() {
		dispatch({ type: actionsT.OPEN, payload: 500 });
	}

	function deposit() {
		dispatch({ type: actionsT.DEPOSIT, payload: 150 });
	}

	function withDraw50() {
		dispatch({ type: actionsT.WITHDRAW, payload: 50 });
	}

	function requestLoan() {
		if (loan === 0) {
			dispatch({ type: actionsT.REQUEST, payload: 5000 });
		}
	}
	function payLoan() {
		if (loan > 0) {
			dispatch({ type: actionsT.PAY, payload: 5000 });
		}
	}

	function closeAccount() {
		if (loan === 0 && balance === 0 && isActive) {
			dispatch({ type: actionsT.CLOSE });
		}
	}

	return (
		<div className='app'>
			<p>BALANCE: {balance}</p>
			<p>LOAN: {loan}</p>
			<button onClick={openAccount} disabled={isActive}>
				Open Account
			</button>
			<button onClick={deposit} disabled={!isActive}>
				Deposit 150
			</button>
			<button onClick={withDraw50} disabled={!isActive}>
				Withdraw 50
			</button>
			<button onClick={requestLoan} disabled={!isActive}>
				Request for a loan of 5000
			</button>
			<button onClick={payLoan} disabled={!isActive}>
				Pay Loan
			</button>
			<button onClick={closeAccount} disabled={!isActive}>
				Close Account
			</button>
		</div>
	);
}

export default App;
