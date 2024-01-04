import styles from './Timer.module.css';
import { QuizzTickAction, ActionsTypes } from '../../reducers/quizzreducer';
import { useEffect } from 'react';

type TimerProps = { dispatch: (action: QuizzTickAction) => void; secsRemaining: number };
export function Timer({ dispatch, secsRemaining }: TimerProps) {
	useEffect(() => {
		const timer = setInterval(() => {
			dispatch({ type: ActionsTypes.TICK });
		}, 1000);
		return () => clearInterval(timer);
	});

	const getRemainTime = (time: number) => {
		const minutes = Math.floor(time / 60);
		const seconds = time - minutes * 60;
		return String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0');
	};
	return (
		<div className={styles.timer}>
			<p>{getRemainTime(secsRemaining)}</p>
		</div>
	);
}
