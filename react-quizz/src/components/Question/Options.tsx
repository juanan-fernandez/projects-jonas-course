import styles from './Options.module.css';
import { QuestionType } from '../../interfaces/quizz';
import { ActionsTypes, QuizzAnswerAction } from '../../reducers/quizzreducer';

type OptionsProps = {
	question: QuestionType;
	dispatch: (action: QuizzAnswerAction) => void;
	answer: number | null;
};

export function Options({ question, dispatch, answer }: OptionsProps) {
	const hasAnswered = answer !== null;
	const selectAnswer = (selectedAnswer: number) => () => {
		dispatch({ type: ActionsTypes.ANSWER, payload: selectedAnswer });
	};

	return (
		<div className={styles.options}>
			{question.options.map((option, idx) => {
				return (
					<button
						key={idx}
						onClick={selectAnswer(idx)}
						disabled={hasAnswered}
						className={
							!hasAnswered
								? ''
								: question.correctOption === idx
								? styles['btn-correct']
								: answer === idx
								? styles['btn-selected']
								: styles['btn-not-selected']
						}
					>
						{option}
					</button>
				);
			})}
		</div>
	);
}
