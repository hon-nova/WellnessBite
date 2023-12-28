import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Receipt = () => {
  return (
    <div className="row">
      <h1 className="text-center">Receipt for you</h1>
    </div>
  );
};

const UserAppointment = () => {
  const location = useLocation();
  const user = location?.state?.user;
  const [date, setDate] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    digit: "",
    cvc: "",
    eM: "",
    eY: "",
  });
  const [errors, setErrors] = useState({});
  const navigateTo = useNavigate();
  const [showReceipt, setShowReceipt] = useState(false);

  console.log("user passed::", user);
  const handleSubmit = (e) => {
    e.preventDefault();
    // // let updateErrors = {}
    // (formData.name!=='') ? (updateErrors.name==="Cardholder name is required"): (updateErrors.name="")
    // (formData.digit!=='')
    // setErrors(updateErrors)
    // //make errors array
    // console.log(Object.values(errors))
    // if(Object.values(errors).every((err)=>err==='')){
    //    //payment went through, print receipt
    // }
  };
  const handleShowReceipt = () => {
    setShowReceipt(true);
  };
  return (
    <div>
      <Navbar />
      <h1 className="text-center mb-4">Appointment Details</h1>
      {user && (
        <div className="row">
          <div className="col-md-4 d-flex">
            <div className="mx-5">
              {" "}
              <img
                src={user.picture}
                alt=""
                style={{ borderRadius: "10px" }}
              />{" "}
            </div>
            <div>
              <h4>
                {user.first} {user.last}
              </h4>
              <p>From: {user.country}</p>
            </div>
          </div>
          <div className="col-md-8">
            <h5>Pick a date</h5>
            <p>
              {/* input[type="data"] enter */}
              <input
                type="date"
                name="date"
                value={date}
                style={{ borderRadius: "10px", width: "200px" }}
              />
            </p>
            <p>
              A $1 deposit! No charges for your initial trial. Reach out to us
              with any concerns you may have at the moment.
            </p>
            <div>
              <form onSubmit={handleSubmit} style={{ width: "550px" }}>
                <div style={{ paddingLeft: "10px" }}>
                  <div
                    className="px-2 py-2"
                    style={{ border: "1px solid #d3d3d3" }}
                  >
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      placeholder="Cardholder name"
                      style={{ width: "90%" }}
                      className="px-1 py-1"
                    />
                    <br />
                  </div>
                  {/* name:"",digit:"",cvc:"",eM:"",eY:"", */}
                  <div
                    className="px-2 py-2"
                    style={{ border: "1px solid #d3d3d3" }}
                  >
                    <input
                      type="text"
                      name="digit"
                      value={formData.digit}
                      placeholder="xxxx-xxxx-xxxx-xxxx"
                      className="px-1 py-1"
                      style={{ width: "80%" }}
                    />
                    <span>
                      {" "}
                      <input
                        type="text"
                        name="cvc"
                        value={formData.cvc}
                        placeholder="CVC"
                        className="px-1 py-1"
                        style={{ width: "10%" }}
                      />
                      <br />
                    </span>
                  </div>

                  <div
                    className="px-2 py-2"
                    style={{ border: "1px solid #d3d3d3" }}
                  >
                    <input
                      type="text"
                      name="eM"
                      value={formData.eM}
                      placeholder="Expired month (MM)"
                      className="px-1 py-1"
                    />
                    <span>
                      <input
                        type="text"
                        name="eY"
                        value={formData.eY}
                        placeholder="Expired year (YY)"
                        className="px-1 py-1"
                      />
                    </span>
                    <br />
                  </div>
                  <div
                    className="px-2 py-2"
                    style={{ border: "1px solid #d3d3d3" }}
                  >
                    Amount CAD$:
                    <input
                      type="text"
                      placeholder="1"
                      className="px-1 py-1"
                      disabled
                    />
                  </div>
                  <div className="text-end my-2">
                    <button
                      type="submit"
                      onClick={handleShowReceipt}
                      style={{ borderRadius: "10px" }}
                    >
                      Process Payment
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          {showReceipt && (
            <div>
              {" "}
              <Receipt />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserAppointment;
