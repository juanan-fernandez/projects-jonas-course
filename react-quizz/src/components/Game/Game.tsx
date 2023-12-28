import styles from './Game.module.css';
type GameProps = { children: React.ReactNode };

export function Game({ children }: GameProps) {
	return <main className={styles.main}>{children}</main>;
}
