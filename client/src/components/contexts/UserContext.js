import { createContext,useContext,useState } from "react";

const UserContext = createContext()

export const UserProvider =({children})=>{
   const [user,setUser] =useState(null)

   // const login
}