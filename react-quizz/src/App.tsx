/* eslint-disable react/no-unescaped-entities */
import './App.css';
import { useReducer } from 'react';
import { quizzReducer, quizzInitialState } from './reducers/quizzreducer';
import { useQuizzData } from './hooks/useQuizzData';
import { Spinner } from './components/UI/Spinner/Spinner';
import { Header } from './components/Header/Header';
import { StartScreen } from './components/StartScreen/StartScreen';
import { ErrorMessage } from './components/UI/ErrorMessage/ErrorMessage';
import { Game } from './components/Game/Game';
import { QuestionType } from './interfaces/quizz';
import { Progress } from './components/Progress/Progress';
import { Question } from './components/Question/Question';
import { NextButton } from './components/NextButton/NextButton';
import { Footer } from './components/Footer/Footer';
import { Timer } from './components/Timer/Timer';
import { EndScreen } from './components/EndScreen/EndScreen';

function App() {
	const url = 'http://localhost:9000/questions';
	const [state, dispatch] = useReducer(quizzReducer, quizzInitialState);
	const { questions, index, status, currentPoints, answer, secondsRemaining, highScore, round, terror } = state;
	useQuizzData(url, round, dispatch);

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
					<Question question={questions[index]} answer={answer} dispatch={dispatch} />
					<Footer>
						<Timer dispatch={dispatch} secsRemaining={secondsRemaining} />
						{answer !== null && (
							<NextButton currentIndex={index} answer={answer} numberOfQuestions={numOfQuestions} dispatch={dispatch} />
						)}
					</Footer>
				</Game>
			)}
			{status === 'complete' && (
				<EndScreen points={currentPoints} maxPoints={getMaxPoints()} dispatch={dispatch} highScore={highScore} />
			)}
		</div>
	);
}

export default App;
