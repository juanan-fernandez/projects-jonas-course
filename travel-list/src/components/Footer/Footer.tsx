import styles from './Footer.module.css';

import type { PackItemT } from '../PackItem/PackItem';

interface FooterProps {
	packItemsList: PackItemT[];
}

export function Footer({ packItemsList }: FooterProps): JSX.Element {
	const getFooterText = (): string => {
		let footerText = 'Start adding some items to your packing list 🚀';
		const totalItemsInList = packItemsList.length;

		if (totalItemsInList === 0) return footerText;

		const itemsPacked = packItemsList.reduce(
			(result, item) => {
				return item.packed ? { packed: [...result.packed, item] } : { ...result };
			},
			{ packed: [] as PackItemT[] }
		);

		if (itemsPacked.packed.length === packItemsList.length) {
			footerText = 'You got everything! Ready to go 🛫';
		} else {
			footerText = `💼 You have ${totalItemsInList} items on your list, and you already packed  (${Math.floor(
				(itemsPacked.packed.length / totalItemsInList) * 100
			)}%)`;
		}
		return footerText;
	};
	return <footer className={styles.footer}>{getFooterText()}</footer>;
}
