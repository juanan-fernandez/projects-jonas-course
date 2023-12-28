import styles from './StartScreen.module.css';
import { ActionsTypes, QuizzStartAction } from '../../reducers/quizzreducer';
type StartScreenProps = { numOfQuestions: number; dispatch: (action: QuizzStartAction) => void };

export function StartScreen({ numOfQuestions, dispatch }: StartScreenProps) {
	const onStart = () => {
		dispatch({ type: ActionsTypes.START });
	};

	return (
		<div className={styles.screen}>
			<h2>Welcome to my Quizz Project</h2>
			<h3>We will ask you {numOfQuestions} questions to test your knowledge</h3>
			<button onClick={onStart}>Let's star a new Quizz</button>
		</div>
	);
}
