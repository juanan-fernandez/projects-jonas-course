type QuestionType = {
	question: string;
	options: string[];
	correctOption: number;
	points: number;
};

type gameStatus = { status: 'ready' | 'complete' | 'active' | 'loading' | 'error' };

type QuizzType = {
	questions: QuestionType[];
	index: number;
	status: gameStatus;
	currentPoints: number;
};

type quizzAction = {
	type: string;
	payload?: QuizzType;
};
export function quizzreducer(state: QuizzType, action: quizzAction) {}
