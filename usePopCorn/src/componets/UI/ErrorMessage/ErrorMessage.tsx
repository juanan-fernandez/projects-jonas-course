const css = {
	fontSize: '1.4rem',
	fontWeight: '700',
	display: 'flex',
	justifyContent: 'center',
	padding: '2rem'
};

export function ErrorMessage({ message }: { message: string }): React.JSX.Element {
	return (
		<div style={css}>
			<span>⛔ {message}</span>
		</div>
	);
}
