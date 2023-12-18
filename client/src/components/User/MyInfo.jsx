import React,{useContext} from 'react'
import { AuthContext } from '../contexts/AuthProvider'

const MyInfo = () => {
  const {email,username} =useContext(AuthContext)
  console.log('email::',email)
  console.log('username::',username)
  return (
    <div>
      <h1>My Info</h1>
      <p>Email Contact: <b>{email}</b></p>
      <p>Username: <b>{username}</b></p>
    </div>
  )
}

export default MyInfo
