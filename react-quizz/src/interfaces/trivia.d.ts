export interface TriviaQuizz {
	category: string;
	correctAnswer: string;
	difficulty: Difficulty;
	id: string;
	incorrectAnswers: string[];
	isNiche: boolean;
	question: { text: string };
	regions: string[];
	tags: string[];
	type: Type;
}

export enum Difficulty {
	Easy = 'easy'
}

export interface Question {
	text: string;
}

export enum Type {
	TextChoice = 'text_choice'
}
