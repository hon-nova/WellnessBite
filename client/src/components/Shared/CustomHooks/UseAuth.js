import React,{useState,useEffect} from 'react'

const UseAuth = () => {
   const [isLoggedIn,setIsLoggedIn] = useState(false)

   useEffect(()=>{
      const storedToken = localStorage.getItem('token')
      setIsLoggedIn(storedToken)
   },[])

   const loginAuth= ()=>{
      const fakeToken = "fake.jwt.token"
      localStorage.setItem('token',fakeToken)
      setIsLoggedIn(true)
   }

   const logoutAuth = ()=>{
      //clear
      localStorage.removeItem('token')
      setIsLoggedIn(false)
   }
  return {isLoggedIn,loginAuth,logoutAuth}
}

export default UseAuth
