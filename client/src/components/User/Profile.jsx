
import React, {useContext} from 'react'
import Navbar from '../Home/Navbar'
import {Link} from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import MyInfo from '../User/MyInfo'
import SavedActivities from '../User/SavedActivities'
import ChangePassword from '../User/ChangePassword'
import { AuthContext } from '../contexts/AuthProvider'
import Footer from '../Home/Footer'
import DeleteAccount from './DeleteAccount'

const Profile = () => {
   
  const {email,username} =useContext(AuthContext)
  console.log('email::',email)
  console.log('username::',username)
  return (
   <div>
      <Navbar/>
      <h1 className="col-xs-1 py-2" align="center">My Profile</h1>
      
      <div className='row mb-3'>
        <div className='col-md-3 ml-5' style={{ backgroundColor:"#003366",position:"fixed",height: "100vh", overflowY: "auto" }}>
        <ul style={{ color:"white",listStyle:"none",fontSize:"20px" }}>
          <li><Link to="/profile/my-info">My Info</Link> </li>
          <li><Link to="/profile/saved-activities">Saved Activities</Link> </li>
          <li><Link to="/profile/change-password">Change Password</Link></li>
          <li ><Link to="/profile/delete-account" style={{ color:"red" }}>Delete Account</Link></li>
        </ul>
        </div>
        <div className='col-md-8 mr-5 overflow-auto' style={{ backgroundColor:"pink",marginLeft: "30%",height:"600px"}}>
        
        <Routes>
          {/* <Route path="/profile/*" element={<Profile/>}> */}
          <Route path="/my-info" element={<MyInfo />}/>
          <Route path="/saved-activities" element={<SavedActivities/>}/>
          <Route path="/change-password" element={<ChangePassword/>}/>
          <Route path="/delete-account" element={<DeleteAccount/>}/>
          {/* </Route> */}
          
        </Routes>
        </div>
      </div>
      <div>
        <Footer/>
      </div>
    </div>
  )
}

export default Profile
