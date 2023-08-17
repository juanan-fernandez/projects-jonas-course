import './App.css';
import StarRating from './componets/UI/StarRating/StarRating';
import Box from './componets/UI/Box/Box';

function App(): JSX.Element {
	return (
		<>
			<StarRating maxRating={10} />
			<Box>En la b</Box>
		</>
	);
}

export default App;
