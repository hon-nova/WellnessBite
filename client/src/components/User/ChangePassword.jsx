import React,{useContext,useState} from 'react'
import { AuthContext } from '../contexts/AuthProvider'

const ChangePassword = () => {

  const {email,username} =useContext(AuthContext)
  const[success,setSuccess] =useState("")
  const [formData,setFormData]=useState({
    password:"",
    confirmPassword:""
  })
  const [errors,setErrors] =useState({
    password:"",
    confirmPassword:"",
    errorBackend:""
  })

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
            password: formData.password
          })
        })
        const data=await response.json()
        if(response.ok){         
          console.log(`successBackend::`)
          console.log(data.successBackend)
          setSuccess(data.successBackend)
        } else {
          console.log("error500")
          console.log(data.error500)
          if(response.status===500){
            setErrors((prevErrors)=>({
              ...prevErrors,
              errorBackend:data.error500
            }))
          }
          if(response.status===404){
            console.log("error404")
            console.log(data.error404)
            setErrors((prevErrors)=>({
              ...prevErrors,
              errorBackend:data.error404
            }))
          }
        }
      } catch(err){
        console.error("Failed to change to a new password::",err.message)
      }
    }
  }
  return (
    <div>
      <h1>Change Password Me</h1>
      {success && <p>{success}</p>}
      {errors.errorBackend && <p className='alert alert-warning'>{errors.errorBackend}</p>}
      <div>
        <form onSubmit={handleChangePassword} method="POST">
        <label style={{ width:"180px" }}>Current email: </label> <input type="text" name="email" value={email} disabled/><br/>
        <label style={{ width:"180px" }}>Enter New Password</label><input type="password" name="password" value={formData.password} onChange={handleInputChange}/>{errors.password && (
          <span
            className="alert alert-warning text-center ml-5"
            style={{ width: "400px" }}
          >
            <small><sup>** </sup>
            {errors.password}</small>
          </span>
        )}<br/>
        <label style={{ width:"180px" }}>Re-enter New Password</label><input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange}/>{errors.confirmPassword && (
          <span
            className="alert alert-warning text-center ml-5"
            style={{ width: "400px" }}
          >
            <small><sup>** </sup>
            {errors.confirmPassword}</small>
          </span>
        )}<br/>
        <button type="submit">Change Password</button>
        
        </form>
      </div>
    </div>
  )
}

export default ChangePassword
