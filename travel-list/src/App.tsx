import './App.css';
import { Header } from './components/Header/Header';
import { PackList } from './components/PackList/PackList';
import { Pack } from './dummy/data';

function App(): JSX.Element {
	return (
		<div className='app'>
			<Header />
			<PackList packItemsList={Pack} />
		</div>
	);
}

export default App;
