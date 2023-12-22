import React,{useState,useEffect} from 'react'

const SavedActivities = () => {
    const [myActivities,setMyActivities] =useState([])

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
                    <img src={element.gifUrl} alt="Loading images ..." />                   
                    </td>
                    
                  </tr>
                ))}
            </tbody>
          </table>
    </div>
  )
}

export default SavedActivities
