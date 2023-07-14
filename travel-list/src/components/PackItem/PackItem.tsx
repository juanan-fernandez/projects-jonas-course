import styles from './PackItem.module.css';

export interface PackItemT {
	id: `${string}-${string}-${string}-${string}-${string}`;
	description: string;
	units: number;
	packed: boolean;
}

interface PackItemProps {
	packItem: PackItemT;
	updatePackItem: (id: string) => void;
	deletePackItem: (id: string) => void;
}

export function PackItem({ packItem, updatePackItem, deletePackItem }: PackItemProps): JSX.Element {
	const { id, description, units, packed } = packItem;

	return (
		<>
			<input
				type='checkbox'
				id={String(id)}
				onChange={() => {
					updatePackItem(id);
				}}
				checked={packed}
			/>
			<span className={packed ? `${styles['is-packed']}` : ''}>{`${units} ${description}`}</span>
			<button
				onClick={() => {
					deletePackItem(id);
				}}
			>
				❌
			</button>
		</>
	);
}
