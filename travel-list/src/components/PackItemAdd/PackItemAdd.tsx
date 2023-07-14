import styles from './PackItemAdd.module.css';
import type { PackItemT } from '../PackItem/PackItem';
import { useState } from 'react';

interface PackItemAddProps {
	addPackItem: (item: PackItemT) => void;
}
export function PackItemAdd({ addPackItem }: PackItemAddProps): JSX.Element {
	const [formData, setFormData] = useState({ units: 1, description: ' ' });

	const resetFormData = (): void => {
		setFormData({ units: 1, description: '' });
	};

	const formControlsHandler = (
		ev: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	): void => {
		setFormData({ ...formData, [ev.target.name]: ev.target.value });
	};

	const addItemHandler = (ev: React.FormEvent): void => {
		ev.preventDefault();
		const newItem: PackItemT = {
			id: crypto.randomUUID(),
			description: formData.description,
			units: formData.units,
			packed: false
		};
		resetFormData();
		addPackItem(newItem);
	};

	return (
		<form className={styles['add-form']} onSubmit={addItemHandler}>
			<h3>What do you need for your 😍 trip?</h3>
			<select
				id='units'
				name='units'
				onChange={formControlsHandler}
				value={formData.units}
			>
				{Array.from({ length: 20 }, (_v: unknown, i: number) => i + 1).map((num) => {
					return (
						<option key={num} value={num}>
							{num}
						</option>
					);
				})}
			</select>
			<input
				id='description'
				name='description'
				type='text'
				placeholder='Item...'
				onChange={formControlsHandler}
				value={formData.description}
			/>
			<button type='submit'>ADD</button>
		</form>
	);
}
