
import React from 'react'
import { useLocation } from 'react-router-dom'

const SingleDetails = () => {  
   const location = useLocation()
   const dish=location?.state?.dish
   console.log("dish")
   console.log(dish)

   return (
      <div >
     {dish && (
        <div style={{marginBottom:"300px" }}>
          <h3 className='mt-3'>{dish.name}</h3>          
          <img src={dish.thumbnail_url} alt="" width="530" height="460" style={{ borderRadius: '10px' }} />
          <p className='my-3' style={{ marginBottom:"300px" }}><small>{dish.description}</small></p>
          <hr />
        </div>
      )}
      </div>
    )
}
export default SingleDetails
