
import React, {useContext,useEffect} from 'react'
import Navbar from '../Home/Navbar'
import {Link} from 'react-router-dom'
import { Routes, Route,useNavigate } from 'react-router-dom'
import MyInfo from '../User/MyInfo'
import SavedActivities from '../User/SavedActivities'
import ChangePassword from '../User/ChangePassword'
import { AuthContext } from '../contexts/AuthProvider'
import Footer from '../Home/Footer'
import DeleteAccount from './DeleteAccount'

const Profile = () => {
   const navigateTo = useNavigate()
  const {email,username} =useContext(AuthContext)
  console.log('email::',email)
  console.log('username::',username)
  useEffect(()=>{
    console.log("Inside useEffect")
    if(!email){
      sessionStorage.removeItem('token')
      navigateTo('/')
    }
  },[email])
  return (
   <div>
      <Navbar/>
      <h1 className="col-xs-1 py-2" align="center">My Profile</h1>
      
      <div className='row mb-3'>
        <div className='col-md-3 ml-5' style={{ backgroundColor:"#003366",position:"fixed",height: "100vh", overflowY: "auto" }}>
        <ul style={{ color:"white",listStyle:"none",fontSize:"20px" }}>
          <li><Link to="/profile/my-info">Dashboard</Link> </li>
          <li><Link to="/profile/saved-activities">Saved Activities</Link> </li>
          <li><Link to="/profile/change-password">Change Password</Link></li>
          <li ><Link to="/profile/delete-account" style={{ color:"red" }}>Delete Account</Link></li>
        </ul>
        </div>
        <div className='col-md-8 overflow-auto col-xs-1' align="center" style={{ backgroundColor:"pink",marginLeft: "25%", height:"600px"}}>
        
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
