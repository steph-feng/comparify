import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './Login';
import Callback from './Callback';
import TopArtists from './TopArtists';
import TopTracks from './TopTracks';

let topArtistsToDB;
let topTracksToDB;

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/callback' element={<Callback />}></Route>
          <Route path='/top-artists' element={<TopArtists />}></Route>
          <Route path='/top-tracks' element={<TopTracks />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
export { topArtistsToDB, topTracksToDB };
