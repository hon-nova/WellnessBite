import React from "react";
import {useNavigation} from 'react-router-dom'

const Navbar = ({isLogin,handleLogin,handleLogout}) => {
  const navigateTo = useNavigation()
  const login = ()=>{
    navigateTo(`/login`)
  }
  return (
    <div>
   <nav className="navbar navbar-expand-lg navbar-light bg-light mx-5">
  <a className="navbar-brand" href="/">

    <img src="/assets/images/workout.jpg" alt="" width={40} height={40} style={{ borderRadius:"50px" }}/>
  </a>
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <a className="nav-link" href="/activities">Activities</a>
      </li>
      <li className="nav-item active">
        <a className="nav-link" href="/nutritions">Nutritions</a>
      </li>   
    </ul>
    <ul className="navbar-nav">
    {isLogin ? (<li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="/profile" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Email Address
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <a className="dropdown-item" href="/profile">My Profile</a>
          <a className="dropdown-item" href="/change-password">Change Password</a>
          <div className="dropdown-divider"></div>
          <form onSubmit={handleLogout} className="form-inline my-2 my-lg-0">     
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Logout</button>
    </form>         
        </div>
      </li>) : (<form 
      onSubmit={handleLogin}
      className="form-inline my-2 my-lg-0">     
      <button 
      onClick={login}
      type="submit"
      className="btn btn-outline-success my-2 my-sm-0">Log in</button>
    </form>)   }   
      <li>      
    </li>
    </ul>   
  </div>
</nav></div>
  );
};

export default Navbar;
