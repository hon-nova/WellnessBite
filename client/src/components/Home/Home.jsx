import React, {useState} from 'react'
import Navbar from './Navbar'

const Home = () => {
  const [isLoggedIn,setIsLoggedIn] = useState(false)

  const handleLoginHome = ()=>{
    const fakeToken = "fake.jwt.token"
    localStorage.setItem('token',fakeToken)
    setIsLoggedIn(true)
  }
  const handleLogoutHome =()=>{
    localStorage.removeItem('token')
    setIsLoggedIn(false)
  }

  return (
    <div>
      <Navbar isLogin={isLoggedIn} handleLogin={handleLoginHome} handleLogout={handleLogoutHome}/>
    </div>
  )
}

export default Home
