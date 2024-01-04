import styles from './EndScreen.module.css';
import { QuizzReStartAction, ActionsTypes } from '../../reducers/quizzreducer';
type EndScreenProps = {
	points: number;
	maxPoints: number;
	highScore: number;
	dispatch: (action: QuizzReStartAction) => void;
};
export function EndScreen({ points, maxPoints, highScore, dispatch }: EndScreenProps) {
	const getPercent = () => {
		return Math.floor((points / maxPoints) * 100);
	};
	return (
		<section className={styles.section}>
			<div className={styles.score}>
				You scored {points} out of {maxPoints} ({getPercent()}%)
			</div>
			<p className={styles.highscore}>Highscore: ({points > highScore ? points : highScore}) points</p>
			<div className={styles.btn}>
				<button onClick={() => dispatch({ type: ActionsTypes.RESTART })}>Restart quizz</button>
			</div>
		</section>
	);
}
