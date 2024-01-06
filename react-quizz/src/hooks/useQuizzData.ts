import { useEffect } from 'react';
import { QuestionType } from '../interfaces/quizz';
import { TriviaQuizz } from '../interfaces/trivia';
import { ActionsTypes, QuizzLoadAction, QuizzErrAction, QuizzReLoadAction } from '../reducers/quizzreducer';

// type fetchQuizzResponse = {
// 	msgerror: string;
// 	loading: boolean;
// 	quizz: QuestionType[];
// };

function transformData(data: TriviaQuizz[]): QuestionType[] {
	const quizz: QuestionType[] = data.map(q => {
		const questionQuestion = { question: q.question.text, points: 10 };

		const questionOptions = [...q.incorrectAnswers, q.correctAnswer].sort((a, b) => {
			return Math.floor(Math.random() * a.length) - Math.floor(Math.random() * b.length);
		});

		const correctAnswer = questionOptions.findIndex(answer => answer === q.correctAnswer);

		return { ...questionQuestion, options: questionOptions, correctOption: correctAnswer };
	});
	return quizz;
}

export function useQuizzData(
	url: string,
	round: number,
	dispatch: (action: QuizzLoadAction | QuizzErrAction | QuizzReLoadAction) => void
): void {
	useEffect(() => {
		let requestStatus = 0;
		const controller = new AbortController();

		async function fetchData(): Promise<void> {
			try {
				const response = await fetch(url, {
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json'
					}
				});

				if (!response.ok) {
					requestStatus = response.status;
					throw new Error('Error fetching data from Url');
				}

				const triviaData = (await response.json()) as TriviaQuizz[];
				const data = transformData(triviaData);
				round > 0
					? dispatch({ type: ActionsTypes.RELOAD, payload: data })
					: dispatch({ type: ActionsTypes.LOAD, payload: data });
			} catch (err) {
				if (err instanceof Error) {
					dispatch({ type: ActionsTypes.ERROR, payload: { errMessage: err.message, errCode: requestStatus } });
					console.log('Error: fetching data', err);
				}
			}
		}

		fetchData();

		return () => {
			controller.abort();
		};
	}, [url, round]);
}
