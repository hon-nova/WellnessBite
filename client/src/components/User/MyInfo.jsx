import React, { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import {useNavigate} from 'react-router-dom'
import {jwtDecode} from 'jwt-decode'

const MyInfo = () => {
  const { email, username } = useContext(AuthContext);
  const navigateTo = useNavigate()
  console.log("email::", email);
  console.log("username::", username);
  const token=sessionStorage.getItem("token")

  return (
    <div>
      <h1 className="col-xs-1 py-2" align="center">
        My Info
      </h1>     
      <div className="card col-xs-1" align="center" style={{ width: "18rem" }}>
        <img src="/assets/images/avatar.png" class="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">Username: {username}</h5>
          <p className="card-text">Contact Email: {email}</p>
        </div>
      </div>
    </div>
  );
};

export default MyInfo;
