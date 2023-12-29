import { QuestionType } from '../../interfaces/quizz';
import { ActionsTypes, QuizzAnswerAction } from '../../reducers/quizzreducer';

type OptionsProps = {
	question: QuestionType;
	dispatch: (action: QuizzAnswerAction) => void;
	answer: number | null;
};

export function Options({ question, dispatch, answer }: OptionsProps) {
	const hasAnswered = !!answer;
	const selectAnswer = (selectedAnswer: number) => () => {
		dispatch({ type: ActionsTypes.ANSWER, payload: selectedAnswer });
	};

	return (
		<div>
			{question.options.map((option, index) => {
				return (
					<button key={index} onClick={selectAnswer(index)} disabled={hasAnswered}>
						{option}
					</button>
				);
			})}
		</div>
	);
}
