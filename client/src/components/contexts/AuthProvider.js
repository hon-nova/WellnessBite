import React, {useState,createContext} from 'react'
import { useNavigate } from 'react-router-dom'
export const AuthContext = createContext()

const AuthProvider = ({children})=>{
   const navigateTo = useNavigate()   
   const [isLoggedIn,setIsLoggedIn]= useState(false)
   const[email,setEmail] = useState("")
   const [username,setUsername] = useState("")
   // const navigateTo =useNavigate()
   const loginSuccess  = (username,email)=>{
      setUsername(username)
      setEmail(email)
      setIsLoggedIn(true)
   }
   const logout = ()=>{
      setIsLoggedIn(false)     
      setEmail('')
      setUsername('')  
      sessionStorage.removeItem('token');
      navigateTo('/');      
   }
   return (
      <AuthContext.Provider value={{ isLoggedIn,email,username,loginSuccess,logout }}>
         {children}
      </AuthContext.Provider>
   )
}

export default AuthProvider;