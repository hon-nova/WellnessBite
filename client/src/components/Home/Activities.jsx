import React, { useEffect, useState } from "react";
import Navbar from './Navbar'
import Footer from './Footer'

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [targetArray,setTargetArray] = useState([])
  const [selectedTarget,setSelectedTarget]=useState("")

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

  const getTarget = (target)=>{
      const getActivityTarget = activities.filter((el)=> el.target.toLowerCase()===target.toLowerCase())
      setTargetArray(getActivityTarget)
      console.log('insde getTarget with set')
      console.log(targetArray)      

      return getActivityTarget
  }
  const handleSelectedTarget =(e)=>{
   const targetValue =e.target.value
   setSelectedTarget(targetValue)
   getTarget(selectedTarget)
  }
useEffect(()=>{
   if(selectedTarget){
      getTarget(selectedTarget)
   }
  
   console.log('inside useEffect::',targetArray)
},[selectedTarget])
const displayArray = (selectedTarget) ? targetArray :activities

  return (
    <div>
      <Navbar />
      <div className="row mb-3">
        <div className="col-md-1"></div>
        <div className="col-md-10">
          
          <div className="my-5">
            <span style={{ fontFamily:"cursive",fontSize:"35px",marginRight:"20px" }}>Want to improve your body shape? Which target? </span>
            <select value={selectedTarget} onChange={handleSelectedTarget}
            style={{ height:"40px",width:"250px",borderRadius:"10px" }}
            >
              <option value="">-- Select a target --</option>
              {targets.length > 0 &&
                targets.map((el) => <option value={el}>{el}</option>)}
            </select>
          </div>
          <p><i>Records found: </i>{displayArray.length}</p>
          <table className="table table-striped">
            <tbody>
              {displayArray.length > 0 &&
               displayArray.map((element, index) => (
                  <tr key={index}>
                  <td>{index+1}.</td>
                    <td style={{ width:"500px" }}>
                      <div>
                        <h4 style={{ fontFamily:"cursive" }}><i>Exercise: </i>{element.name}</h4>
                        <p><i>Equipment used: </i><b>{element.equipment}</b></p>
                        <h5 style={{ backgroundColor:"pink" }}><i>Target: </i>{element.target}</h5>
                      </div>
                    </td>
                    <td style={{ width:"600px" }}>
                      <img src={element.gifUrl} alt="" />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="col-md-1"></div>
      </div>
      <div><Footer/></div>
    </div>
  );
};

export default Activities;
