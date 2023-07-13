export interface PackItemT {
	id: number;
	description: string;
	units: number;
	packed: boolean;
}

export function PackItem({ id, description, units, packed }: PackItemT): JSX.Element {
	const onChangePackedHandler = (): void => {
		console.log('changed');
	};
	return (
		<>
			<input type='checkbox' id={String(id)} onChange={onChangePackedHandler} />
			<span>{`${units} ${description}`}</span>
			<button>❌</button>
		</>
	);
}
