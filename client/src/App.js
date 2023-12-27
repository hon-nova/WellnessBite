// import logo from "./logo.svg";
import "./App.css";
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom'
import Home from './components/Home/Home'
import Register from './components/Auth/Register'
import Login from './components/Auth/Login'
import Profile from "./components/User/Profile"
import AuthProvider from "./components/contexts/AuthProvider";
import Activities from "./components/Home/Activities";
import Nutritions from "./components/Home/Nutritions";
import Users from './components/Home/Users'
import Error from './components/Home/Error'


function App() {

  return (
      <Router>
       <AuthProvider>
       <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/profile/*" element={<Profile/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/activities" element={<Activities />}/>
          <Route path="/contact-agents" element={<Users />}/>
          <Route path="/nutritions/*" element={<Nutritions/>}/>
          <Route path="*" element={<Error/>}/>
        </Routes>
       </AuthProvider>
      </Router>
      );
}

export default App;
