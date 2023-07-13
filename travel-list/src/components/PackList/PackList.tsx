import styles from './PackList.module.css';
import { PackItem } from '../PackItem/PackItem';
import type { PackItemT } from '../PackItem/PackItem';

interface PackListT {
	packItemsList: PackItemT[];
}

export function PackList({ packItemsList }: PackListT): JSX.Element {
	const list = packItemsList.map((item: PackItemT) => {
		return (
			<li key={item.id}>
				<PackItem
					id={item.id}
					description={item.description}
					units={item.units}
					packed={item.packed}
				/>
			</li>
		);
	});

	return (
		<div className={styles.list}>
			<ul>{list}</ul>
		</div>
	);
}
