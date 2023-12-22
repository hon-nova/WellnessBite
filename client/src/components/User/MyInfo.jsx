import React,{useContext} from 'react'
import { AuthContext } from '../contexts/AuthProvider'

const MyInfo = () => {
  const {email,username} =useContext(AuthContext)
  console.log('email::',email)
  console.log('username::',username)
  return (
    <div>
      <h1 className="col-xs-1 py-2" align="center">My Info</h1>
      <p>Username: <b>{username}</b></p>
      <p>Email Contact: <b>{email}</b></p>     
    </div>
  )
}

export default MyInfo
