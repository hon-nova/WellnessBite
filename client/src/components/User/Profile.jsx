
import React, {useContext} from 'react'
import Navbar from '../Home/Navbar'
import {Link} from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import MyInfo from '../User/MyInfo'
import SavedActivities from '../User/SavedActivities'
import ChangePassword from '../User/ChangePassword'
import { AuthContext } from '../contexts/AuthProvider'

const Profile = () => {
   
  const {email,username} =useContext(AuthContext)
  console.log('email::',email)
  console.log('username::',username)
  return (
   <div>
      <Navbar/>
      <h1>My Profile</h1>
      
      <div className='row mb-3'>
        <div className='col-md-4 ml-5' style={{ backgroundColor:"lightblue" }}>left
        <ul>
          <li><Link to="/profile/my-info">My Info</Link> </li>
          <li><Link to="/profile/saved-activities">Saved Activities</Link> </li>
          <li><Link to="/profile/change-password">Change Password</Link></li>
        </ul>
        </div>
        <div className='col-md-7 mr-5'style={{ backgroundColor:"pink" }}>right
        
        <Routes>
          {/* <Route path="/profile/*" element={<Profile/>}> */}
          <Route path="/my-info" element={<MyInfo />}/>
          <Route path="/saved-activities" element={<SavedActivities/>}/>
          <Route path="/change-password" element={<ChangePassword/>}/>
          {/* </Route> */}
          
        </Routes>
        </div>
      </div>
    </div>
  )
}

export default Profile
