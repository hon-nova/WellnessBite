import React, {useState} from 'react'
import Navbar from './Navbar'
import UseAuth from '../Shared/CustomHooks/UseAuth'

const Home = () => {
  // const [isLoggedIn,setIsLoggedIn] = useState(false)
  const {isLoggedIn,loginAuth,logoutAuth} = UseAuth()

  return (
    <div>
      <Navbar isLogin={isLoggedIn} handleLogin={loginAuth} handleLogout={logoutAuth}/>
      <h1>My Home</h1>
    </div>
  )
}

export default Home
