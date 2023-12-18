import React, {useState,useEffect,useContext} from "react";
import {useNavigate, Link} from 'react-router-dom'
import {AuthContext} from '../contexts/AuthProvider'

const Navbar = () => {
  const navigateTo = useNavigate()  
  
  const [token,setToken] =useState("")
  const {isLoggedIn,email,username,loginSuccess,logout}=useContext(AuthContext) 
  
  useEffect(()=>{
     const storedToken = sessionStorage.getItem('token');
     if (storedToken) {
        setToken(storedToken);
     }    
     const getToken = async()=>{
        try {         
           const response = await fetch("http://localhost:8888/login",{
              headers: {
                 Authorization: `Bearer ${storedToken}`
              }
           })
           if (!response.ok){
              throw new Error(`API failed with status code: ${response.status}`)
           }
                 
          loginSuccess(username,email)
        } catch(err){
           console.error("Failed to get token::",err.message)
        }
     }  
     getToken()
     console.log("Token:::",storedToken)    
  },[token])  

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
   
    {isLoggedIn ? (<li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="/profile" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {email}
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <Link className="dropdown-item" to="/profile">My Profile</Link>
          <Link className="dropdown-item" to="/change-password">Change Password</Link>
          <div className="dropdown-divider"></div>
          <form onSubmit={logout} className="form-inline my-2 my-lg-0">     
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Logout</button>
    </form>         
        </div>
      </li>) : ( <form       
      className="form-inline my-2 my-lg-0">       
      <button      
      onClick={handleLogin}
      type="submit"
      className="btn btn-outline-success my-2 my-sm-0">Log in</button>
    </form>)}   
      <li>      
    </li>
    </ul>   
  </div>
</nav></div>
  );
};

export default Navbar;
