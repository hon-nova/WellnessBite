import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/login.css"
const Register = () => {
  const navigateTo = useNavigate();
  const initialForm = {
    username: "",
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialForm);
  const [success, setSuccess] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    errorBackend: "",
  });
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  const checkUsernameExists = async (user_name) => {
    try {
      const result = await fetch(
        `http://localhost:8888/username-exists/${user_name}`
      );
      const dataReturn = await result.json();
      console.log("Username::");
      console.log(dataReturn);
      if (dataReturn.exists === true) {
        //set error
        setErrors((prevErrors) => ({
          ...prevErrors,
          username:
            "This username is already taken. Please choose another name or log in instead.",
        }));
      }
    } catch (err) {
      console.err("Failed to check username exists");
    }
  };
  const checkEmailExists = async (e_mail) => {
    // /email-exists/:email
    try {
      const result = await fetch(
        `http://localhost:8888/email-exists/${e_mail}`
      );
      const dataReturn = await result.json();
      console.log("Email::");
      console.log(dataReturn);
      if (dataReturn.exists === true) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "The email already exists. Please provide another email.",
        }));
      }
    } catch (err) {
      console.err("Failed to check email exists");
    }
  };
  const registerUser = async () => {
    setErrors({});
    //validate user
    if (!formData.username) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: "username is required.",
      }));
    } else checkUsernameExists(formData.username);

    if (!formData.email) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email is required.",
      }));
    } else if (emailRegex.test(formData.email) === false) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Incorrect email format. Please provide a valid email.",
      }));
    } else await checkEmailExists(formData.email);

    if (!formData.password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password is required.",
      }));
    }

    console.log(Object.values(errors).every((err) => err === "")); //true if errors
    if (Object.values(errors).every((err) => err === "")) {
      try {
        console.log("Begin Inside register.");
        const result = await fetch(`http://localhost:8888/register`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            password: formData.password, //name: value pair in the form
          }),
        });
        const dataReturn = await result.json();

        console.log(dataReturn);
        if (dataReturn.successBackend === "Successfully registered.") {
          setSuccess(dataReturn.successBackend);
          console.log(dataReturn.successBackend);
          setTimeout(() => {
            navigateTo("/login");
          }, 2000);
        }
        if (result.status === 400) {
          console.error("Registration failed:", await result.text());
        }
      } catch (err) {
        
        console.log("Full response object:", err.response);
        console.error("Failed registered Frontend");
      }
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleRegister = (e) => {
    e.preventDefault();    
    registerUser();
  };
  return (
    <div style={{ marginTop:"60px", backgroundColor:"	#F8F8F8" }}>
        <div className='row mx-5'>
     <div className='col-md-1'></div>
      <div className='col-md-4' style={{ backgroundColor:"#D0D0D0" }}>     
      <div className="px-2 py-2 login-form"> 
      <h1>REGISTER</h1>
      {success && (
        <p className="alert alert-success" style={{ width: "400px" }}>
          {success}
        </p>
      )}
      {errors.errorBackend && (
        <p className="alert alert-danger" style={{ width: "400px" }}>
          {errors.errorBackend}
        </p>
      )}
      <form onSubmit={handleRegister}>
        {/* username */}
        <label htmlFor="username">Username: </label><br/>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          className='input-login'
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
        {/* email */}
        <label htmlFor="email">Email: </label><br/>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className='input-login'
        />
        {errors.email && (
          <span
            className="alert alert-warning text-center ml-5"
            style={{ width: "400px" }}
          >
            <sup>** </sup>
            {errors.email}
          </span>
        )}
        <br />
        {/* password */}
        <label htmlFor="password">Password: </label><br/>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          className='input-login'
        /><br/>
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
        <button type="submit" className="button-login">REGISTER</button>
      </form>
      </div>

    
  </div>
      <div className='col-md-6'>
      <img src="/assets/images/register.jpg" alt="" width={800} height={600}/></div>
      <div className='col-md-1'></div>
    </div>
    </div>
  )
   
};

export default Register;
