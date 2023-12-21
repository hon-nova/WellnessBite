import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [targetArray, setTargetArray] = useState([]);
  const [selectedTarget, setSelectedTarget] = useState("");
  const [count,setCount] =useState(0)
  const [isLike,setIsLike]=useState(false)

  useEffect(() => {
    const fetchActivities = async () => {
      const result = await fetch("/assets/activities.json");
      if (!result.ok) {
        throw new Error(`HTTP error! Status: ${result.status}`);
      }
      const dataRawJson = await result.json();
      setActivities(dataRawJson);
    };
    fetchActivities();
  }, []);
  const targetElements = activities.map((el) => el.target);
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

  const handleClick =()=>{    
      setIsLike((like)=>!like)
      setCount((c)=> isLike ? c-1 : c+1)    
  }
  
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
                targets.map((el) => <option value={el}>{el}</option>)}
            </select>
          </div>
          <p>
            <i>Records found: </i>
            {displayArray.length}
          </p>
          <table className="table table-striped">
            <tbody>
              {displayArray.length > 0 &&
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
                    <img src={element.gifUrl} alt="Loading images ..." />
                   
                    </td>
                    <td style={{ width: "100px" }}><button 
                    onClick={handleClick}
                    style={{ border:"none"}}><svg 
                    style={{ backgroundColor:isLike ? 'yellow': 'transparent' }}
                    xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hand-thumbs-up" viewBox="0 0 16 16">
  <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
</svg></button>
                     <p>Like: {count}</p>
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
