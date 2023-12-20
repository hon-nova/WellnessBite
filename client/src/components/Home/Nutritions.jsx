import React, {useEffect,useState} from 'react'

import SingleDetails from './SingleDetails'
import {Routes, Route, Link,useNavigate, Navigate,} from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'


const Nutritions = () => { 
  const navigateTo = useNavigate() 
  const [nutritions,setNutritions] =useState([])   

  useEffect(() => {
    const fetchNutritions = async () => {
      const result = await fetch("/assets/nutritions.json");
      if (!result.ok) {
        throw new Error(`HTTP error! Status: ${result.status}`);
      }
      const dataRawJson = await result.json();
      console.log('inside fetchNutritions')
      console.log('dataRowJson')
      console.log(dataRawJson)
      setNutritions(dataRawJson);
     
    };
    fetchNutritions();
  }, []);
   
    const truncateDescription = (description) => {
      const words = description.split(' ');
      const truncated = words.slice(0, 20).join(' '); 
      return `${truncated}...`;
    };
    
  return (
    <div className='mb-5'>
      <div><Navbar/></div>
      <div className='row mb-2'>
        <div className='col-md-1'></div>
        <div className='col-md-4 text-center' style={{ backgroundColor:"#F5F5F5"}}>
        <ul >
          {nutritions.length && nutritions.map((dish,index)=>(                
              <li key={index} style={{ listStyle:"none"}}>
              <div>
              <Link to={`/nutritions/single-details/${dish.name}`}
              state={{ dish: dish }}><h4>{dish.name}</h4></Link>
              <img src={dish.thumbnail_url} alt="" width="350" height="300" style={{ borderRadius: '10px'}} />
            <p className='mt-2'>({truncateDescription(dish.description)})</p>
              </div><hr/></li>                            
          ))}            
        </ul> 
        </div>
   
        <div className='col-md-7 px-5 text-center' style={{ backgroundColor:"#F0F0F0",position:'fixed',right:0,top:60,bottom:10 }}>        
        <Routes>            
        <Route path='/single-details/:name' element={<SingleDetails />} />        
        </Routes>
        </div>           
      </div>   
      <div><Footer/></div>
    </div>
  )
}

export default Nutritions
