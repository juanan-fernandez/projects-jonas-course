import './App.css';
import StarRating from './componets/UI/StarRating/StarRating';

function App(): JSX.Element {
	return (
		<>
			<StarRating maxRating={10} />
		</>
	);
}

export default App;
