import styles from './PackList.module.css';
import { PackItem } from '../PackItem/PackItem';
import type { PackItemT } from '../PackItem/PackItem';

interface PackListProps {
	packItemsList: PackItemT[];
	updatePackListItem: (id: string) => void;
	deletePackListItem: (id: string) => void;
}

export function PackList({
	packItemsList,
	updatePackListItem,
	deletePackListItem
}: PackListProps): JSX.Element {
	const list = packItemsList.map((item: PackItemT) => {
		return (
			<li key={item.id}>
				{
					// <PackItem packItem={item} updatePackItem= {updatePackListItem} deletePackItem={deletePackListItem}/>}
					<PackItem
						packItem={item}
						updatePackItem={updatePackListItem}
						deletePackItem={deletePackListItem}
					/>
				}
			</li>
		);
	});

	return (
		<div className={styles.list}>
			<ul>{list}</ul>
		</div>
	);
}
