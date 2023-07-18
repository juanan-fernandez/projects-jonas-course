import styles from './PackList.module.css';
import { PackItem } from '../PackItem/PackItem';
import type { PackItemT } from '../PackItem/PackItem';

interface PackListProps {
	packItemsList: PackItemT[];
	updatePackListItem: (id: string) => void;
	deletePackListItem: (id: string) => void;
	clearPackList: () => void;
	sortBy: (orderBy: string) => void;
}

export function PackList({
	packItemsList,
	updatePackListItem,
	deletePackListItem,
	clearPackList,
	sortBy
}: PackListProps): JSX.Element {
	const handleClearPackList = (): void => {
		if (window.confirm('Are you sure? This will remove all items in the current pack list.')) {
			clearPackList();
		}
	};

	const handleChangeOrderBy = (ev: React.ChangeEvent<HTMLSelectElement>): void => {
		const orderByValue = ev.target.value;
		sortBy(orderByValue);
	};

	const list = packItemsList.map((item: PackItemT) => {
		return (
			<li key={item.id}>
				{
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
			<div className={styles.actions}>
				<select onChange={handleChangeOrderBy}>
					<option value='by_id'>SORT BY INPUT ORDER</option>
					<option value='by_description'>SORT BY DESCRIPTION</option>
					<option value='by_packed'>SORT BY PACKED STATUS</option>
				</select>
				<button onClick={handleClearPackList}>CLEAR LIST</button>
			</div>
		</div>
	);
}
