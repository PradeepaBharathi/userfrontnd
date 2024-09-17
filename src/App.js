import logo from './logo.svg';
import './App.css';
import Login from './components/Login/Login';
import {BrowserRouter, Route, Routes} from'react-router-dom'
import Userspage from './components/Users/Userspage';
import Edit from './components/editPage/Edit';
function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/usersList' element={<Userspage/>}/>
      <Route path='/edit/:id' element={<Edit/>}/>
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
