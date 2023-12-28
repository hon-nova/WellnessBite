import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from '../Home/Footer'

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirm_password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirm_password: "",
    errorBackend: "",
  });
  const [success, setSuccess] = useState("");
  const navigateTo = useNavigate();

  // "/login-forgot-password"
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  const checkEmailExists = async (e_mail) => {
    // /email-exists/:email
    if (!e_mail) {
      return "Provide an email address";
    }

    if (!emailRegex.test(e_mail)) {
      return "Provide a valid email address";
    }

    try {
      const result = await fetch(
        `http://localhost:8888/email-exists/${e_mail}`
      );
      const dataReturn = await result.json();
      console.log("Email::");
      console.log(dataReturn);
      if (dataReturn.exists === false) {
        return 'No record found.'
      }
      return ''
    } catch (err) {
      // console.err("Failed to check email exists");
      console.error("Failed to check email exists", err);
    setErrors((prevErrors) => ({
      ...prevErrors,
      email: "Error checking email existence.",
    }));
    }
  };
  const resetPassword = async () => {
    setErrors({});

    // Validate email existence asynchronously
  const emailValidationResult = await checkEmailExists(formData.email);

  // Update the email error state
  setErrors((prevErrors) => ({
    ...prevErrors,
    email: emailValidationResult,
  }));

  const updatedErrors = {
      ...errors,
      email: !formData.email
        ? "Provide an email address"
        : emailRegex.test(formData.email) === false
        ? "Provide a valid email address"
        : await checkEmailExists(formData.email),
      password: !formData.password ? "Provide a password" : "",
      confirm_password: !formData.confirm_password
        ? "Re-type the password"
        : formData.confirm_password !== formData.password
        ? "Passwords don't match."
        : "",
    };
    setErrors(updatedErrors);
    console.log(Object.values(errors).every((er) => er === ""))
    if (Object.values(errors).every((er) => er === "")) {
      try {
        const response = await fetch("http://localhost:8888/login-forgot-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });
        const result = await response.json();
        if (response.ok) {
          console.log("result fetch backend::", result);
          if (response.status === 200) {
            console.log("result.successBackend::", result.successBackend);           

            setSuccess(result.successBackend);
            // setFormData("")
            setFormData({ email: "", password: "", confirm_password: "" });
            setTimeout(() => {
              navigateTo("/login");
            }, 2000);
          }
        } else {
          if (result.status === 400) {
            setErrors((pre)=>({
              ...pre,
              errorBackend:result.error404
            }))
          }
        }
      } catch (err) {
        // console.log(err.message)
      }
    } else {      
      setErrors((pre)=>({
        ...pre,
        errorBackend:"Please refresh the page and try again."
      }))
    }
  };
  useEffect(() => {
    const timeId = setTimeout(() => {
      setErrors((pre) => ({
        ...pre,
        errorBackend: "",
      }));
    }, 2000);

    return () => {
      clearTimeout(timeId);
    };
  }, [errors.errorBackend]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((pre) => ({
      ...pre,
      [name]: value,
    }));
  };
  const handleResetPassword = (e) => {
    e.preventDefault();
    resetPassword();
  };
  return (
    <div>
    <div className="row my-5">
    <div className="col-md-1"></div>
      <div className="col-md-5" style={{ border:"1px solid #d3d3d3",borderRadius:"5px" }}>
      <h2>Reset Password</h2>
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
      <form onSubmit={handleResetPassword}>
        Enter your registered <b>email</b>
        <br />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          style={{ width:"50%",height:"40px",borderRadius:"10px",border:"1px solid #e3e3e3" }}
        />
        {errors.email && (
          <span
            className="alert alert-danger text-center ml-5"
            style={{ width: "400px" }}
          >
            <small>
              <sup>** </sup>
              {errors.email}
            </small>
          </span>
        )}
        <br />
        New Password
        <br />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          style={{ width:"50%",height:"40px",borderRadius:"10px",border:"1px solid #e3e3e3" }}
        />
        {errors.password && (
          <span
            className="alert alert-warning text-center ml-5"
            style={{ width: "400px" }}
          >
            <small>
              <sup>** </sup>
              {errors.password}
            </small>
          </span>
        )}
        <br />
        Re-type New Password
        <br />
        <input
          type="password"
          name="confirm_password"
          value={formData.confirm_password}
          onChange={handleInputChange}
          style={{ width:"50%",height:"40px",borderRadius:"10px",border:"1px solid #e3e3e3" }}
        />
        {errors.confirm_password && (
          <span
            className="alert alert-warning text-center ml-5"
            style={{ width: "400px" }}
          >
            <small>
              <sup>** </sup>
              {errors.confirm_password}
            </small>
          </span>
        )}
        <br />
        <button type="submit"
        style={{ width:"50%",height:"40px",borderRadius:"10px",border:"1px solid #e3e3e3",marginTop:"5px" }}
        >Reset Password</button>
      </form>
      </div>
      <div className="col-md-5">
        <img src="/assets/images/security.jpg" width="900px" height="700px" alt=""/>
      </div>
      <div className="col-md-1"></div>
    </div>
    <div className="row"><Footer /></div>
     
    </div>
  );
};

export default ForgotPassword;
