import { QuestionType } from '../../interfaces/quizz';
import { QuizzAnswerAction } from '../../reducers/quizzreducer';
import { Options } from './Options';
type QuestionProps = {
	question: QuestionType;
	answer: number | null;
	dispatch: (action: QuizzAnswerAction) => void;
};

export function Question({ question, dispatch, answer }: QuestionProps) {
	return (
		<section className='container'>
			<p>{question.question}</p>
			<Options question={question} dispatch={dispatch} answer={answer} />
		</section>
	);
}
