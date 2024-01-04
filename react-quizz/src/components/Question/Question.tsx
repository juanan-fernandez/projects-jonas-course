import { QuestionType } from '../../interfaces/quizz';
import { QuizzAnswerAction } from '../../reducers/quizzreducer';
import { Options } from './Options';
type QuestionProps = {
	question: QuestionType;
	answer: number | null;
	dispatch: (action: QuizzAnswerAction) => void;
};

const style = { fontSize: '1.4rem', fontWeight: 700, margin: '1rem 0' };

export function Question({ question, dispatch, answer }: QuestionProps) {
	return (
		<section>
			<p style={style}>{question.question}</p>
			<Options question={question} dispatch={dispatch} answer={answer} />
		</section>
	);
}
