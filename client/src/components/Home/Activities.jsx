import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { jwtDecode } from "jwt-decode";
import "bootstrap-icons/font/bootstrap-icons.css";

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [targetArray, setTargetArray] = useState([]);
  const [selectedTarget, setSelectedTarget] = useState("");
  const [errorBackend, setErrorBackend] = useState("");
  const [successThumbup, setSuccessThumbup] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const result = await fetch("/assets/images.json");
      if (!result.ok) {
        throw new Error(`HTTP error! Status: ${result.status}`);
      }
      const dataRawJson = await result.json();
      console.log("inside fetchImages");
      // console.log('dataRowJson')
      // console.log(dataRawJson)
      setImages(dataRawJson);
    };
    fetchImages();
    // console.log('Images inside useEffect::')
    // console.log(images)
  }, []);

  const getImage = (id) => {
    const foundImage = images.find((image) => Number(image.id) === Number(id));
    // console.log("founddImage")
    // console.log(founddImage)
    return foundImage?.gifUrl || "";
  };
  useEffect(() => {
    console.log("getImage('0003'):", getImage(3));
  }, [images]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch("http://localhost:8888/all-activities", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await response.json();
        if (response.ok) {
          setActivities(result.data);
          // setSuccess(result.successBackend)
        }
      } catch (err) {
        console.log("FRONTEND ERROR:: ", err.message);
      }
    };
    fetchActivities();
  }, [activities]);

  const targetElements =
    activities && activities.length > 0
      ? activities.map((el) => el.target)
      : "";
  const targets = [...new Set(targetElements)];

  const getTarget = (target) => {
    const getActivityTarget = activities.filter(
      (el) => el.target.toLowerCase() === target.toLowerCase()
    );
    setTargetArray(getActivityTarget);
    // console.log('insde getTarget with set')
    // console.log(targetArray)
    return getActivityTarget;
  };
  const handleSelectedTarget = (e) => {
    const targetValue = e.target.value;
    setSelectedTarget(targetValue);
    getTarget(selectedTarget);
  };
  useEffect(() => {
    if (selectedTarget) {
      getTarget(selectedTarget);
    }
    //  console.log('inside useEffect::',targetArray)
  }, [selectedTarget]);

  const displayArray = selectedTarget ? targetArray : activities;

  const handleClick = async (activity) => {
    const token = sessionStorage.getItem("token");
    const decoded = jwtDecode(token);
    const user_id = decoded.user_id;

    try {
      console.log("Before save");
      const foundItem = activities.filter(
        (element) =>
          Number(element.activity_id) === Number(activity.activity_id)
      )[0];

      const id = foundItem.activity_id;
      // console.log("IMPORTANT FOUNDITEM")
      // console.log("foundItem:::",foundItem)
      // console.log("id::::",id)
      const response = await fetch(
        `http://localhost:8888/save-activity/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            user_id: user_id,
            activity_id: id,
          }),
        }
      );
      const result = await response.json();
      console.log("MIDDLE result");
      console.log(result);

      if (response.status === 200) {
        setSuccessThumbup(result.successBackend);
        setTimeout(() => {
          setSuccessThumbup(result.successBackend);
        }, 2000);
      } else if (response.status === 400) {
        console.log("FAILED to save activity");
        console.log(result.errorBackend);
        setErrorBackend(result.errorBackend);
      } else if (response.status === 404) {
        console.log("No User Found. Please log in.");
        console.log(result.error);
        setErrorBackend(result.error);
        setTimeout(() => {
          setErrorBackend(result.error);
        }, 2000);
      } else {
        console.log("Unexpected response:", response.status);
      }
      console.log("End save");
    } catch (err) {
      console.log("Failed to save activity FRONTEND::", err.message);
    }
  };
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSuccessThumbup("");
      setErrorBackend("");
    }, 2000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [successThumbup, errorBackend]);
  // console.log("displayArray::",displayArray)
  return (
    <div>
      <Navbar />
      <div className="row mb-3">
        <div className="col-md-1"></div>
        <div className="col-md-10">
          <div className="my-5">
            <span
              style={{
                fontFamily: "cursive",
                fontSize: "35px",
                marginRight: "20px",
              }}
            >
              Want to improve your body shape? Which target?{" "}
            </span>
            <select
              value={selectedTarget}
              onChange={handleSelectedTarget}
              style={{ height: "40px", width: "250px", borderRadius: "10px" }}
            >
              <option value="">-- Select a target --</option>
              {targets.length > 0 &&
                targets.map((el) => (
                  <option key={el} value={el}>
                    {el}
                  </option>
                ))}
            </select>
          </div>
          <div className="text-center">
            {successThumbup && (
              <p
                className="alert alert-success d-block mx-auto"
                style={{ width: "300px" }}
              >
                {successThumbup}
              </p>
            )}
          </div>
          {/* <div>{success && <p className="alert alert-success">{success}</p>}</div> */}
          <div>
            {errorBackend && (
              <p className="alert alert-warning text-center">{errorBackend}</p>
            )}
          </div>
          <p>
            <i>Records found: </i>
            {displayArray.length}
          </p>
          <table className="table table-striped">
            <tbody>
              {displayArray?.length > 0 &&
                displayArray.map((element, index) => (
                  <tr key={index}>
                    <td>{index + 1}.</td>
                    <td style={{ width: "500px" }}>
                      <div>
                        <h4 style={{ fontFamily: "cursive" }}>
                          <i>Exercise: </i>
                          {element.name}
                        </h4>
                        <p>
                          <i>Equipment used: </i>
                          <b>{element.equipment}</b>
                        </p>
                        <h5 style={{ backgroundColor: "pink" }}>
                          <i>Target: </i>
                          {element.target}
                        </h5>
                      </div>
                    </td>
                    <td style={{ width: "600px" }}>
                      <img
                        src={getImage(element?.activity_id)}
                        alt="Loading..."
                        onError={(e) => console.error("Image Error:", e)}
                      />{" "}
                    </td>
                    <td style={{ width: "200px" }}>
                      <button
                        onClick={() => handleClick(element)}
                        style={{ border: "none" }}
                      >
                        <i class="bi bi-floppy"></i>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="col-md-1"></div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Activities;
