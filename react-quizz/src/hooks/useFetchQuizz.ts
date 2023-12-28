//import { QuestionType } from '../interfaces/quizz';
import { ActionsTypes, QuizzLoadAction, QuizzErrAction } from '../reducers/quizzreducer';

// type fetchQuizzResponse = {
// 	msgerror: string;
// 	loading: boolean;
// 	quizz: QuestionType[];
// };

export function useFetchQuizz(url: string, dispatch: (action: QuizzLoadAction | QuizzErrAction) => void): void {
	let requestStatus = 0;

	fetch(url, {
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		}
	})
		.then(response => {
			if (!response.ok) {
				requestStatus = response.status;
				throw new Error('Error fetching data from Url');
			}
			return response.json();
		})
		.then(data => {
			dispatch({ type: ActionsTypes.LOAD, payload: data });
		})
		.catch(err => {
			if (err instanceof Error) {
				dispatch({ type: ActionsTypes.ERROR, payload: { errMessage: err.message, errCode: requestStatus } });
				//console.log('Error: fetching data', err);
			}
		});
}
