import { useEffect } from 'react';
import { QuestionType } from '../interfaces/quizz';
import { ActionsTypes, QuizzLoadAction, QuizzErrAction, QuizzReLoadAction } from '../reducers/quizzreducer';

// type fetchQuizzResponse = {
// 	msgerror: string;
// 	loading: boolean;
// 	quizz: QuestionType[];
// };

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

				const data = (await response.json()) as QuestionType[];
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
