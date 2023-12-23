import React,{useContext,useEffect,useState} from 'react'
import { AuthContext } from '../contexts/AuthProvider'
import '../../css/profile.css'
import {jwtDecode} from 'jwt-decode'

const ChangePassword = () => {

  const {email} =useContext(AuthContext)
  const[success,setSuccess] =useState("")
  const [formData,setFormData]=useState({
    password:"",
    confirmPassword:""
  })
  const resetForm = () => {
    setFormData({
      password: '',
      confirmPassword: '',
    });
  };

  const [errors,setErrors] =useState({
    password:"",
    confirmPassword:"",
    errorBackend:""
  })
  const token=sessionStorage.getItem("token")
  const decode = jwtDecode(token)
  const user_id=decode.user_id
  console.log("user_id::",user_id)

  const handleInputChange =(e)=>{
    const {name,value}=e.target
    setFormData((preState)=>({
      ...preState,
      [name]:value
    }))
  }

  const handleChangePassword = async(e)=>{
    e.preventDefault()
    //validate user input
    const updatedErrors ={
      ...errors,
      password: !formData.password ? "Provide a new password":"",
      confirmPassword: !formData.confirmPassword ? "Re-enter the password" : (formData.confirmPassword !== formData.password) ? "Passwords don't match. Please try again.": ""
    }
    setErrors(updatedErrors)
    if(Object.values(errors).every((err)=> err==='')){
      try {
        const response = await fetch('http://localhost:8888/change-password',{
          method:"POST",
          headers: {
            "content-type":"application/json",
            "Authorization": `Bearer ${sessionStorage.getItem('token')}`
          },
          body: JSON.stringify({
            password: formData.password,
            user_id:user_id,
            email:email
          })
        })
        if(response.ok){
          const data=await response.json()
          console.log("data::",data)
                
          console.log(`successBackend::`)
          if(response.status===200){
            
            // setSuccess(data.successBackend)  
            // console.log(data.successBackend)
            console.log("Setting successBackend:", data.successBackend);
            setSuccess(data.successBackend);
            console.log("SuccessBackend state after setting:", success);
            resetForm()
          }       
          
          setTimeout(()=>{
            setSuccess('')
          },2000)
        } else if(response.status===400){
          const data=await response.json()
          setErrors((prevErrors)=>({
            ...prevErrors,
            errorBackend:data.error400
          }))
          setTimeout(()=>{
            setErrors((prevErrors)=>({
              ...prevErrors,
              errorBackend:''
            }))
          },2000)          
        }
      } catch(err){
        console.error("Failed to UPDATE the new password::",err.message)
      }
    }
  }
  // console.log("success::",success)
  return (
    <div className="col-xs-1 py-2" align="center">     
      <h1 className='my-3'>Change Password</h1>     
      <div>
      {success && <p className="col-xs-1 alert alert-success d-block mx-auto" align="center" style={{ width:"600px" }}>{success}</p>}
        <form onSubmit={handleChangePassword} method="POST">
        <div className='my-1'><label style={{ width:"180px" }}>Current email: </label> 
        <input type="text" name="email" value={email} disabled className='input-profile'/><br/></div>
        <div className='my-1'>
        <label style={{ width:"180px" }}>Enter New Password</label>
        <input type="password" name="password" value={formData.password} onChange={handleInputChange} className='input-profile'/>{errors.password && (
          <span
            className="alert alert-warning text-center ml-5"
            style={{ width: "400px" }}
          >
            <small><sup>** </sup>
            {errors.password}</small>
          </span>
        )}<br/>
        </div>
       <div className='my-1'>
       <label style={{ width:"180px" }}>Re-enter New Password</label>
        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange}
          className='input-profile'
        />{errors.confirmPassword && (
          <span
            className="alert alert-warning text-center ml-5"
            style={{ width: "400px" }}
          >
            <small><sup>** </sup>
            {errors.confirmPassword}</small>
          </span>
        )}<br/>
       </div>        
        <label style={{ width:"180px" }}></label> <button type="submit" className='button-profile'>Change Password</button>  
        </form>
      </div>     
    </div>
  )
}
export default ChangePassword
