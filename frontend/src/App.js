import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import { LandingPage } from './pages/LandingPage';
import Callback from './pages/Callback';
import FindFriend from './pages/FindFriend';
import Compare from './pages/Compare';

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path='/' element={<LandingPage />}></Route>
          <Route path='/callback' element={<Callback />}></Route>
          <Route path='/findFriend' element={<FindFriend />}></Route>
          <Route path='/compare' element={<Compare/>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
