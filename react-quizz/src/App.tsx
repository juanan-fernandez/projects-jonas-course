/* eslint-disable react/no-unescaped-entities */
import './App.css';
import { useReducer } from 'react';
import { quizzReducer, quizzInitialState } from './reducers/quizzreducer';
import { useQuizzData } from './hooks/useQuizzData';
import { Spinner } from './components/UI/Spinner/Spinner';
import './App.css';
import { Header } from './components/Header/Header';
import { StartScreen } from './components/StartScreen/StartScreen';
import { ErrorMessage } from './components/UI/ErrorMessage/ErrorMessage';
import { Game } from './components/Game/Game';
import { QuestionType } from './interfaces/quizz';
import { Progress } from './components/Progress/Progress';

function App() {
	const url = 'http://localhost:9000/questions';
	const [state, dispatch] = useReducer(quizzReducer, quizzInitialState);
	const { questions, index, status, currentPoints, terror } = state;
	useQuizzData(url, dispatch);

	function getMaxPoints(): number {
		const questionAux = questions.reduce(
			(acc: QuestionType, question: QuestionType) => {
				return { ...acc, points: acc.points + question.points };
			},
			{ question: '', options: [], points: 0, correctOption: 0 }
		);
		return questionAux.points;
	}

	const numOfQuestions = questions.length;

	return (
		<div className='app'>
			<Header />
			{status === 'loading' && <Spinner />}
			{status === 'error' && <ErrorMessage message={terror ? terror.errMessage : 'Error desconocido'} />}
			{status === 'ready' && <StartScreen numOfQuestions={numOfQuestions} dispatch={dispatch} />}
			{status === 'active' && (
				<Game>
					<Progress
						currentQuestion={index}
						currentPoints={currentPoints}
						maxPoints={getMaxPoints()}
						numOfQuestions={numOfQuestions}
					/>
				</Game>
			)}
		</div>
	);
}

export default App;
