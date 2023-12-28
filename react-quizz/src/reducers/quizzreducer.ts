import { QuestionType } from '../interfaces/quizz';

export enum ActionsTypes {
	LOAD = 'LOAD',
	ERROR = 'ERROR',
	START = 'START'
}

type gameStatus = 'active' | 'complete' | 'error' | 'loading' | 'ready';
type qError = { errMessage: string; errCode: number } | undefined;

export const quizzInitialState: QuizzState = {
	questions: [],
	index: 0,
	status: 'loading',
	currentPoints: 0,
	terror: undefined
};

type QuizzState = {
	questions: QuestionType[];
	index: number;
	status: gameStatus;
	currentPoints: number;
	terror: qError;
};

export type QuizzLoadAction = { type: ActionsTypes.LOAD; payload: QuestionType[] };
export type QuizzErrAction = { type: ActionsTypes.ERROR; payload: qError };
export type QuizzStartAction = { type: ActionsTypes.START };

type quizzAction = QuizzLoadAction | QuizzErrAction | QuizzStartAction;

export function quizzReducer(state: QuizzState, action: quizzAction): QuizzState {
	switch (action.type) {
		case ActionsTypes.LOAD:
			return { ...state, status: 'ready', questions: action.payload };

		case ActionsTypes.ERROR:
			return { ...state, status: 'error', terror: action.payload };

		case ActionsTypes.START:
			return { ...state, status: 'active' };

		default:
			return state;
	}
}
