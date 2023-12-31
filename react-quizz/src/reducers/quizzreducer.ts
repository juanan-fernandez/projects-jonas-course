import { QuestionType } from '../interfaces/quizz';

export enum ActionsTypes {
	LOAD = 'LOAD',
	ERROR = 'ERROR',
	START = 'START',
	TICK = 'TICK',
	ANSWER = 'ANSWER',
	NEXT = 'NEXT',
	FINISH = 'FINISH',
	RESTART = 'RESTART',
	RELOAD = 'RELOAD'
}

const MAX_SECONDS_PER_QUESTION = 30;

type gameStatus = 'active' | 'complete' | 'error' | 'loading' | 'ready';
type qError = { errMessage: string; errCode: number } | undefined;

export const quizzInitialState: QuizzState = {
	questions: [],
	index: 0,
	status: 'loading',
	currentPoints: 0,
	answer: null,
	terror: undefined,
	secondsRemaining: 0,
	highScore: 0,
	round: 0
};

type QuizzState = {
	questions: QuestionType[];
	index: number;
	status: gameStatus;
	currentPoints: number;
	answer: number | null;
	secondsRemaining: number;
	highScore: number;
	round: number;
	terror: qError;
};

export type QuizzLoadAction = { type: ActionsTypes.LOAD; payload: QuestionType[] };
export type QuizzErrAction = { type: ActionsTypes.ERROR; payload: qError };
export type QuizzStartAction = { type: ActionsTypes.START };
export type QuizzAnswerAction = { type: ActionsTypes.ANSWER; payload: number };
export type QuizzNextAction = { type: ActionsTypes.NEXT };
export type QuizzFinishAction = { type: ActionsTypes.FINISH };
export type QuizzTickAction = { type: ActionsTypes.TICK };
export type QuizzReStartAction = { type: ActionsTypes.RESTART };
export type QuizzReLoadAction = { type: ActionsTypes.RELOAD; payload: QuestionType[] };

type quizzAction =
	| QuizzLoadAction
	| QuizzErrAction
	| QuizzStartAction
	| QuizzTickAction
	| QuizzAnswerAction
	| QuizzNextAction
	| QuizzFinishAction
	| QuizzReStartAction
	| QuizzReLoadAction;

export function quizzReducer(state: QuizzState, action: quizzAction): QuizzState {
	switch (action.type) {
		case ActionsTypes.LOAD:
			return { ...state, status: 'ready', questions: action.payload };

		case ActionsTypes.ERROR:
			return { ...state, status: 'error', terror: action.payload };

		case ActionsTypes.START:
			return { ...state, status: 'active', secondsRemaining: MAX_SECONDS_PER_QUESTION * state.questions.length };

		case ActionsTypes.TICK: {
			const timeRemaining = state.secondsRemaining - 1;
			return { ...state, secondsRemaining: timeRemaining, status: timeRemaining > 0 ? 'active' : 'complete' };
		}

		case ActionsTypes.ANSWER: {
			const currenQuestion = state.questions[state.index];
			const points = currenQuestion.correctOption === action.payload ? currenQuestion.points : 0;
			return { ...state, answer: action.payload, currentPoints: state.currentPoints + points };
		}

		case ActionsTypes.NEXT:
			return { ...state, answer: null, index: state.index + 1 };

		case ActionsTypes.FINISH:
			return { ...state, status: 'complete' };

		case ActionsTypes.RESTART: {
			const maxScore = state.highScore > state.currentPoints ? state.highScore : state.currentPoints;
			return {
				...quizzInitialState,
				highScore: maxScore,
				round: state.round + 1
			};
		}

		case ActionsTypes.RELOAD:
			return {
				...state,
				questions: action.payload,
				status: 'active',
				secondsRemaining: MAX_SECONDS_PER_QUESTION * action.payload.length
			};

		default:
			return state;
	}
}
