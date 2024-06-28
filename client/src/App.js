import {
	BrowserRouter,
	Routes,
	Route,
} from 'react-router-dom';
import Books from './pages/Books';
import UploadForm from './pages/UploadForm';
import './style.css';

function App() {
  return (
		<div className='App'>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Books/>}/>
					<Route path='/profile'/>
					<Route path='/cart'/>
					<Route path='/testing' element={<UploadForm />}/>
				</Routes>
			</BrowserRouter>
		</div>
  );
}

export default App;
