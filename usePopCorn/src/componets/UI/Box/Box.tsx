import { useState } from 'react';
import styles from './Box.module.css';
interface BoxProps {
	children: React.ReactNode;
}

export default function Box({ children }: BoxProps): React.ReactNode {
	const [expanded, setExpanded] = useState(true);

	const handleExanded = (): void => {
		setExpanded(!expanded);
	};

	return (
		<div className={`${styles.box} ${expanded ? styles.extended : ''}`}>
			<div className={styles.box__header}>
				<button onClick={handleExanded}>{expanded ? '-' : '+'}</button>
			</div>
			<div className={styles.box__content}>
				{expanded ? children : <p className={styles.viewcontent}>Click button to view content</p>}
			</div>
		</div>
	);
}
