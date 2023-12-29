import { QuizzNextAction, QuizzFinishAction, ActionsTypes } from '../../reducers/quizzreducer';

type NextButtonProps = {
	currentIndex: number;
	answer: number | null;
	numberOfQuestions: number;
	dispatch: (action: QuizzNextAction | QuizzFinishAction) => void;
};
export function NextButton({ currentIndex, answer, numberOfQuestions, dispatch }: NextButtonProps) {
	const goNext = () => {
		currentIndex + 1 === numberOfQuestions ? dispatch({ type: ActionsTypes.NEXT }) : dispatch({ type: ActionsTypes.FINISH });
	};

	return <>{answer && <button onClick={goNext}>{currentIndex + 1 === numberOfQuestions ? 'Finish Quizz' : 'Next'}</button>}</>;
}
