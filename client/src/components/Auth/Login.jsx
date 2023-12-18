import React, {useState,useContext} from 'react'
import { useNavigate} from "react-router-dom";
import { AuthContext } from '../contexts/AuthProvider';

const Login = () => {
  
  const initialForm={username:"",password:""}
  const [formData,setFormData] = useState(initialForm)
  const [success, setSuccess] = useState("");
  const [errors,setErrors] =useState(initialForm)
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
      //1 validate user input
      const updatedErrors = {
        ...errors,
        username: !formData.username ? "Provide your username!": "",
        email: !formData.email ? "Provide your email.": emailRegex.test(formData.email) ? "": "Incorrect email format. Please provide a valid email",
        password: !formData.password ? "Provide a password.": ""
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
          if(result.status === 201){
            const dataBackend = await result.json()
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
          }  else if (result.status === 401) {
              console.error("Login failed:", await result.text());
            }          
        } catch(err){
          console.log('Failed to log in Frontend: ',err.message)
        }
    }   
  }
  return (
    <div style={{ border: "1px solid grey", width: "800px" }} className="text-center px-2 py-2">
      <h1>LOGIN</h1>
      {success && <p className='alert alert-success'>{success}</p>}
      {errors.errorBackend && (
        <p className="alert alert-danger" style={{ width: "400px" }}>
          {errors.errorBackend}
        </p>
      )}
      <form onSubmit={handleLoginPage} method="post">
        {/* username */}
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
        />
        {errors.username && (
          <span
            className="alert alert-warning text-center ml-5"
            style={{ width: "400px" }}
          >
            <sup>** </sup>
            {errors.username}
          </span>
        )}
        <br />
        {/* password */}
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
        {errors.password && (
          <span
            className="alert alert-warning text-center ml-5"
            style={{ width: "400px" }}
          >
            <sup>** </sup>
            {errors.password}
          </span>
        )}
        <br />
        <button type="submit">LOGIN</button>
      </form>
      <div>Not registered yet? Please click <a href="/register">here</a> to create one.</div>
    </div>
  );
  
}
export default Login
