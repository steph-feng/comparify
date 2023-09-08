import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './Login';
import Callback from './Callback';
import FindFriend from './FindFriend';
import Compare from './Compare';

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/callback' element={<Callback />}></Route>
          <Route path='/findFriend' element={<FindFriend />}></Route>
          <Route path='/compare' element={<Compare/>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
