import React, {useState} from 'react'

const Login = () => {
  const [username,setUsername] =useState("")
  const [password,setPassword] =useState("")
  const [errors,setErrors] =useState({
    username:"",
    password:""
  })

  const isValidatedUser = (uname,upassword)=>{
    //fetch data from backend first
    if(!uname){
      errors.username="Username is required."
    } else {

    }

    return true
  }
  const handleLoginPage =()=>{

  }
  return (
    <div style={{border:"1px solid grey",width:"500px"}} className="text-center px-2 py-2">
      <h1>LOGIN</h1>     
    <form onSubmit={handleLoginPage}>
      {/* username */}
      <label htmlFor="username">Username: </label>
      <input
        type="text"
        id="username"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />      
      {/* password */}
      <label htmlFor="password">Password: </label>
      <input
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button type="submit">Submit</button>
    </form>
    </div>
  )
}

export default Login
