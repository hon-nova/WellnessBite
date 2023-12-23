import React,{useState,useEffect} from 'react'
import {jwtDecode} from 'jwt-decode'

const SavedActivities = () => {

    const [myActivities,setMyActivities] =useState([]) 
    const [images,setImages]=useState([])
    const [removedMessage,setRemovedMessage]=useState("")
    const [success,setSuccess]=useState("")
    const [errorBackend,setErrorBackend]=useState("")

    const token = sessionStorage.getItem("token");    
    const decoded = jwtDecode(token);  
    const user_id = decoded.user_id;  
    // console.log("user_id:::",user_id)

    useEffect(() => {
      const fetchImages = async () => {
        const result = await fetch("/assets/images.json");
        if (!result.ok) {
          throw new Error(`HTTP error! Status: ${result.status}`);
        }
        const dataRawJson = await result.json();
        // console.log('inside fetchImages')
        // console.log('dataRowJson')
        // console.log(dataRawJson)
        setImages(dataRawJson);

      };
      fetchImages();
    }, [images]);
    const getImage= (id)=>{
      const foundImage = images.find((image)=>Number(image.id) ===Number(id))
      // console.log("founddImage")
      // console.log(founddImage)
      return foundImage?.gifUrl || ''
    }

    const readSavedActivities = async()=>{
      const response = await fetch('http://localhost:8888/read-saved-activities')
      const result = await response.json()
      // console.log("result.data")
      // console.log(result.data)
      setMyActivities(result.data)
    }
    useEffect(()=>{
      readSavedActivities()
    },[])
   
    const handleRemove = async(item)=>{
      try{
        const response = await fetch(`http://localhost:8888/remove-activity/${item.activity_id}`,{
          method:"POST",
          headers:{
            "Content-Type":"application/json",
            "Authorization": `Bearer ${token}`,
          },
          body:JSON.stringify({
            user_id:user_id
          })
        })
        const result = await response.json()
        console.log("result:::",result)
        if(response.status===200){
          // setSuccess("FRONTEND removed successfully")
          setSuccess(result.successBackend)
        } else {
          if (response.status===400){
            // setErrorBackend("FRONTEND failed to remove activity")
            setErrorBackend(result.errorBackend)
          } 
        }
      }catch(error){
        console.log("Failed to remove activity::",error.message)
      }
      const removedItem = myActivities.find((el)=>el.activity_id===item.activity_id)
      let newActivityArray = [...myActivities]
      let updatedArray = newActivityArray.filter((el)=>el.activity_id !== removedItem.activity_id)
      setMyActivities(updatedArray)
      // setRemovedMessage("Activity Removed.")
      // setTimeout(()=>{
      //   setRemovedMessage('')
      // },2000)
    }   
    useEffect(() => {
      const timeoutId = setTimeout(() => {
        // setRemovedMessage('');
        setSuccess('')
        setErrorBackend('')
       
      }, 2000);
      return () => {      
        clearTimeout(timeoutId);
      };
    }, [success,errorBackend]); 
  return (
    <div>
     {success && <p className="col-xs-1 alert alert-success d-block mx-auto" align="center" style={{ width:"200px" }}>{success}</p>}

     {errorBackend && <p className="col-xs-1 alert alert-success d-block mx-auto" align="center" style={{ width:"200px" }}>{errorBackend}</p>}
     
    {/* {removedMessage && <p className="col-xs-1 alert alert-success d-block mx-auto" align="center" style={{ width:"200px" }}>{removedMessage}</p>} */}
      <h5 className="col-xs-1 py-2" align="center" style={{fontStyle:"italic" }}>Start small. Dedicating 5 minutes to practice during every workout session can help achieve your fitness goals faster. Slow and steady to win the race.</h5>
      <table className="table table-striped">
            <tbody>
              {myActivities?.length > 0 &&
                myActivities.map((element,index) => (
                  <tr key={element.id}>
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
                    <img src={getImage(element?.activity_id)} alt="Loading images ..." / >  </td>
                    <td style={{ width: "100px" }}><button
                    onClick={()=>handleRemove(element)}
                    style={{ border:"none",}}>Remove</button>
                     </td>
                  </tr>
                ))}
            </tbody>
          </table>
    </div>
  )
}

export default SavedActivities
