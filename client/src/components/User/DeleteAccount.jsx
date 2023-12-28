import React,{useContext,useState,useEffect} from 'react'
import { AuthContext } from "../contexts/AuthProvider";
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'

const DeleteAccount = () => {
  const { email,logout} = useContext(AuthContext);
  const navigateTo = useNavigate()
  const [success,setSuccess]=useState('')
  const [errorBackend,setErrorBackend]=useState("")
  const token=sessionStorage.getItem("token")
  const decode = jwtDecode(token)
  const user_id=decode.user_id

   // /profile/delete-account
   const deleteAccount = async()=>{
    const response= await fetch('http://localhost:8888/profile/delete-account',{
      method:"DELETE",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        user_id:user_id,
        email:email
      })
    })
    const result = await response.json()
    if(response.ok){
      logout()
      sessionStorage.removeItem('token');
      console.log(result.successBackend)
      setSuccess(result.successBackend)
      setTimeout(()=>{
        setSuccess('')
      },2000)
     
      navigateTo('/')
    } else {
      if (response.status===400){
        console.log(result.errorBackend)
        setErrorBackend(result.errorBackend)
      }
    }
  }
  const handleDeleteConfirmation = () => {
    const isConfirmed = window.confirm('Are you sure you want to delete your account?');

    if (isConfirmed) {
      deleteAccount();
    }
  };
 
  return (
    <div>
      <h1>Delete This Account</h1>    
      <button 
      onClick={handleDeleteConfirmation}
      style={{ backgroundColor:"red",height:"50px",width:"200px" }}
      >Delete Account</button>
      
      {success && (
        <p className="alert alert-success" style={{ width: "400px" }}>
          {success}
        </p>
      )}
      {errorBackend && (
        <p className="alert alert-danger" style={{ width: "400px" }}>
          {errorBackend}
        </p>
      )}


    </div>
  )
}

export default DeleteAccount
