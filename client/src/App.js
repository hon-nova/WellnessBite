import logo from "./logo.svg";
import "./App.css";
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom'
import Home from './components/Home/Home'
import Register from './components/Auth/Register'
import Login from './components/Auth/Login'
import Profile from "./components/Home/Profile";


function App() {
  
  return (
  <Router>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login />}/>
      
    </Routes>
  </Router>
  );
}

export default App;
