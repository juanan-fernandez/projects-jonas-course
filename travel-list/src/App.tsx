import { useState } from 'react';
import './App.css';
import { Header } from './components/Header/Header';
import { PackList } from './components/PackList/PackList';
import { PackItemAdd } from './components/PackItemAdd/PackItemAdd';
import type { PackItemT } from './components/PackItem/PackItem';
import { Footer } from './components/Footer/Footer';

function App(): JSX.Element {
	const [pack, setPack] = useState<PackItemT[] | []>([]);

	const onClearPack = (): void => {
		setPack([]);
	};
	const onDeletePackItem = (id: string): void => {
		const newPack = pack.filter((item) => item.id !== id);
		setPack(newPack);
	};

	const onUpdatePackItem = (id: string): void => {
		const newPack = pack.map((item) => {
			return item.id === id ? { ...item, packed: !item.packed } : item;
		});
		setPack(newPack);
	};

	const onAddPackItem = (itemPack: PackItemT): void => {
		setPack((currentPack) => [...currentPack, itemPack]);
	};

	const sortPackListBy = (orderBy: string): void => {
		const newOrderedList = [...pack];

		if (orderBy === 'by_description') {
			newOrderedList.sort((a, b) => a.description.localeCompare(b.description));
		}
		if (orderBy === 'by_packed') {
			newOrderedList.sort((a, b) => Number(b.packed) - Number(a.packed));
		}
		setPack(newOrderedList);
	};
	return (
		<div className='app'>
			<Header />
			<PackItemAdd addPackItem={onAddPackItem} />
			<PackList
				packItemsList={pack}
				updatePackListItem={onUpdatePackItem}
				deletePackListItem={onDeletePackItem}
				clearPackList={onClearPack}
				sortBy={sortPackListBy}
			/>
			<Footer packItemsList={pack} />
		</div>
	);
}

export default App;
