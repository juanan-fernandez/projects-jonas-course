import './App.css';
//import StarRating from './componets/UI/StarRating/StarRating';
import Box from './componets/UI/Box/Box';
import { MoviesFetchedList } from './componets/Movies/MoviesFetchedList/MoviesFetchedList';

function App(): JSX.Element {
	return (
		<>
			{
				//<StarRating maxRating={10} />
			}
			<Box>
				<MoviesFetchedList />
			</Box>
		</>
	);
}

export default App;
