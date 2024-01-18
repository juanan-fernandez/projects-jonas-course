export const initialState = {
	balance: 0,
	loan: 0,
	isActive: false
};

export const actionsT = {
	OPEN: 'Open',
	DEPOSIT: 'deposit',
	WITHDRAW: 'withdraw',
	REQUEST: 'request',
	PAY: 'pay',
	CLOSE: 'close'
};

const UPDATE_STATE = {
	[actionsT.OPEN]: (state, action) => {
		return { ...state, isActive: true, balance: action.payload };
	},

	[actionsT.DEPOSIT]: (state, action) => ({ ...state, balance: state.balance + action.payload }),

	[actionsT.WITHDRAW]: (state, action) => ({
		...state,
		balance: state.balance - action.payload < 0 ? 0 : state.balance - action.payload
	}),

	[actionsT.REQUEST]: (state, action) => ({
		...state,
		balance: state.balance + action.payload,
		loan: state.loan + action.payload
	}),

	[actionsT.PAY]: (state, action) => ({ ...state, balance: state.balance - action.payload, loan: 0 }),

	[actionsT.CLOSE]: () => initialState
};

export function bankReducer(state, action) {
	const updateState = UPDATE_STATE[action.type];
	return updateState ? updateState(state, action) : state;
}
