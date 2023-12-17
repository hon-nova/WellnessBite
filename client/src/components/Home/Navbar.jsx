import React from "react";
import {useNavigate, Link} from 'react-router-dom'
import UseAuth from '../Shared/CustomHooks/UseAuth'

const Navbar = () => {
  const navigateTo = useNavigate()
  // const login = ()=>{
  //   navigateTo(`/login`)
  // }
  const {isLoggedIn,loginAuth,logoutAuth} = UseAuth()
  const handleLogin  = (e)=>{
    e.preventDefault()
    navigateTo('/login')
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
        <Link className="nav-link" to="/activities">Activities</Link>
      </li>
      <li className="nav-item active">
        <Link className="nav-link" to="/nutritions">Nutritions</Link>
      </li>   
    </ul>
    <ul className="navbar-nav">
    <form 
      
      className="form-inline my-2 my-lg-0">       
      <button      
      onClick={handleLogin}
      type="submit"
      className="btn btn-outline-success my-2 my-sm-0">Log in</button>
    </form>
    {/* {isLoggedIn ? (<li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="/profile" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Email Address
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <Link className="dropdown-item" to="/profile">My Profile</Link>
          <Link className="dropdown-item" to="/change-password">Change Password</Link>
          <div className="dropdown-divider"></div>
          <form onSubmit={logoutAuth} className="form-inline my-2 my-lg-0">     
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Logout</button>
    </form>         
        </div>
      </li>) : (<form 
      onSubmit={loginAuth}
      className="form-inline my-2 my-lg-0">       
      <button      
      type="submit"
      className="btn btn-outline-success my-2 my-sm-0">Log in</button>
    </form>)}    */}
      <li>      
    </li>
    </ul>   
  </div>
</nav></div>
  );
};

export default Navbar;
