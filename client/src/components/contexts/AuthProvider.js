import React, {useState,createContext} from 'react'
export const AuthContext = createContext()


const AuthProvider = ({children})=>{

   const [isLoggedIn,setIsLoggedIn]= useState(false)
   const[email,setEmail] =useState("")
   const [username,setUsername] =useState("")

   const loginSuccess  =(username,email)=>{
      setUsername(username)
      setEmail(email)
   }
   const logout = ()=>{
      setIsLoggedIn(false)
   }
   return (
      <AuthContext.Provider value={{ isLoggedIn,email,username,loginSuccess,logout }}>
         {children}
      </AuthContext.Provider>
   )
}

export default AuthProvider;