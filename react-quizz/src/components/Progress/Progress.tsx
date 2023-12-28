import styles from './Progress.module.css';

type ProgressProps = {
	currentQuestion: number;
	maxPoints: number;
	currentPoints: number;
	numOfQuestions: number;
};
export function Progress({ currentQuestion, maxPoints, currentPoints, numOfQuestions }: ProgressProps) {
	return (
		<section>
			<progress max={numOfQuestions} value={currentQuestion + 1}></progress>
			<div className={styles.stats}>
				<p>
					Question {currentQuestion + 1} / {numOfQuestions}
				</p>
				<p>
					{currentPoints} / {maxPoints}
				</p>
			</div>
		</section>
	);
}
