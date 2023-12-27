import React, {useState,useContext,useEffect} from 'react'
import { useNavigate} from "react-router-dom";
import { AuthContext } from '../contexts/AuthProvider';
import "../../css/login.css"
import Footer from '../Home/Footer'

const Login = () => {
  
  const initialForm={username:"",password:""}
  const [formData,setFormData] = useState(initialForm)
  const [success, setSuccess] = useState("");
  const [errors,setErrors] =useState({
    username:"",
    password:"",
    errorBackend:""
  })
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const navigateTo =useNavigate()
  const { loginSuccess } = useContext(AuthContext);

  const handleInputChange =(e)=>{
    e.preventDefault()
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }
  const handleLoginPage =async (e)=>{
    e.preventDefault()
    setErrors({username:"",
    password:"",
    errorBackend:""})
      //1 validate user input      
      const updatedErrors = {
        ...errors,
        username: !formData.username ? "Provide your username!": "",        
        password: !formData.password ? "Provide a password.": "",        
      }
      setErrors(updatedErrors)
      if(Object.values(errors).every((err)=> err ==='')){
       //2 check to let them in
        try{
          const result = await fetch("http://localhost:8888/login",{
            method:"POST",
            headers: {
              "content-type":"application/json",
              "Authorization": `Bearer ${sessionStorage.getItem('token')}`
            },
            
            body: JSON.stringify({
              username: formData.username,
              password: formData.password
            })
          })
          const dataBackend = await result.json()
          if(result.status === 201){           
            const email =dataBackend.email
            console.log(dataBackend.successBackend)
            loginSuccess(formData.username,email)
            if (dataBackend.successBackend === "Successfully Logged In.") {
                setSuccess(dataBackend.successBackend);
                console.log(dataBackend.successBackend);  
                sessionStorage.setItem('token',dataBackend.token)
                sessionStorage.setItem('user_id',dataBackend.user_id)
                sessionStorage.setItem('email',dataBackend.email)
                sessionStorage.setItem('username',dataBackend.username)              
                navigateTo("/");              
            }
          } else if (result.status === 401) {
              console.error("Login failed:");
              setErrors((prevErrors)=>({
                ...prevErrors,
                errorBackend: dataBackend.errorBackend
              }))
              setTimeout(()=>{
                setErrors((prevErrors)=>({
                  ...prevErrors,
                  errorBackend: ""
                }))
              },2000)
            } else if(result.status===400){
              setErrors((prevErrors)=>({
                ...prevErrors,
                errorBackend: dataBackend.errorBackend
              }))
              setTimeout(()=>{
                setErrors((prevErrors)=>({
                  ...prevErrors,
                  errorBackend: ""
                }))
              },2000)
            } 
                           
        } catch(err){
          console.log('Failed to log in Frontend: ',err.message)
        }
    }   
  }
  useEffect(()=>{
    const timeoutId = setTimeout(() => {
      setErrors((prevErrors)=>({
        ...prevErrors,
        errorBackend: ""
      }))   
    
    }, 2000);
    return () => {     
      clearTimeout(timeoutId);
    };

  },[errors.errorBackend])

  return (
    <div style={{ marginTop:"60px", backgroundColor:"#ade2e6" }}>
  <div className='row mx-5'>
     {/* <div className='col-md-1'></div> */}
      <div className='col-md-5' style={{ backgroundColor:"	#D0D0D0" }}>
      <div className="px-2 py-2 login-form">
      <h1>LOGIN</h1>
      {success && <p className='alert alert-success'>{success}</p>}
      {!errors.username && !errors.password && errors.errorBackend && (
        <p className="alert alert-danger" style={{ width: "400px" }}>
          {errors.errorBackend}
        </p>
      )}      
      <form onSubmit={handleLoginPage} method="post">
        {/* username */}
        <label htmlFor="username">Username: </label>{errors.username && (
          <span
            className="alert alert-warning text-center ml-5"
            style={{ width: "400px" }}
          >
           <small><sup>** </sup>
            {errors.username}</small> 
          </span>
        )}<br/>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          className='input-login'
        />
       
        <br />
        {/* password */}
        <label htmlFor="password">Password: </label> {errors.password && (
          <span
            className="alert alert-warning text-center ml-5"
            style={{ width: "400px" }}
          >
            <small><sup>** </sup>
            {errors.password}</small>
          </span>
        )}<br/>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          className='input-login'
        /> <br /><br/>
        <button type="submit" className='button-login'>LOGIN</button>     
        <div className=''> <a href="/forgot-password" style={{ color:"darkblue",marginLeft:"100px" }}><i><small>Forgot password?</small></i></a></div>  
      </form>
      <div>Not registered yet? Please click <a href="/register">here</a> to create one.</div>
    </div></div>
      <div className='col-md-6'>
        <img src="/assets/images/login2.jpg" alt="" width={800} height={600}/>
      </div>
      <div className='col-md-1'></div>
    </div>
    <div><Footer/></div>
    </div>
  
   
  );
  
}
export default Login
