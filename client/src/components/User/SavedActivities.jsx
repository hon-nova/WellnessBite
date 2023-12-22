import React,{useState,useEffect} from 'react'

const SavedActivities = () => {
    const [myActivities,setMyActivities] =useState([])

    const [images,setImages]=useState([])

    useEffect(() => {
      const fetchImages = async () => {
        const result = await fetch("/assets/images.json");
        if (!result.ok) {
          throw new Error(`HTTP error! Status: ${result.status}`);
        }
        const dataRawJson = await result.json();
        console.log('inside fetchImages')
        console.log('dataRowJson')
        console.log(dataRawJson)
        setImages(dataRawJson);
       
      };
      fetchImages();
      console.log('Images inside useEffect::')
      console.log(images)
    }, [images]);

    const readSavedActivities = async()=>{
      const response = await fetch('http://localhost:8888/read-saved-activities')
      const result = await response.json()
      console.log("result.data")
      console.log(result.data)
      setMyActivities(result.data)
    }
    useEffect(()=>{
      readSavedActivities()
    },[])

  return (
    <div>
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
                    <img src={images[index]?.gifUrl} alt="Loading images ..." / >  </td>  
                    <td style={{ width: "100px" }}><button 
                    // onClick={()=>handleClick(element)}
                    style={{ border:"none",}}><i className="bi bi-trash3-fill">Remove</i></button>                  
                     </td>
                    
                  </tr>
                ))}
            </tbody>
          </table>
    </div>
  )
}

export default SavedActivities
