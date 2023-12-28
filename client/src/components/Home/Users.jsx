import React,{useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import Navbar from './Navbar'

const Users = ({users}) => {
   const [selectedCountry,setSelectedCountry]=useState("")
   const [filteredCountries,setFilteredCountries]=useState([])  

  const navigateTo = useNavigate()
 let countries= users.map((user)=>user.country)
 countries=[...new Set(countries)]
//  console.log("countries:::",countries)

//IMPORTANT: a method that takes `selectedCountry` as an argument
//this method returns an array of those persons belong to that `selectedCountry`

const getCountriesReturn = (selectedCountry)=>{

   const countriesReturn = users.filter((user)=>user.country===selectedCountry)   
   console.log("countriesReturn:::",countriesReturn)
   setFilteredCountries(countriesReturn)
   return countriesReturn
}
const handleDisplayCountries = (e)=>{
   let country = e.target.value
   setSelectedCountry(country)
   getCountriesReturn(selectedCountry)  
}
useEffect(()=>{
   if(selectedCountry){
      getCountriesReturn(selectedCountry)      
   }
   console.log("main filteredCountries:::",filteredCountries)
},[selectedCountry])
const displayArray = selectedCountry ? filteredCountries : users

useEffect(()=>{
   console.log("filteredCountries:::",filteredCountries)
},[selectedCountry,countries])

const handleContact = (user)=>{
   navigateTo(`/contact-agent/${user.user_id}`,{state: {user:user}})
}
  return (  
    <div>
    <div className="row"><Navbar/></div>
    <div className="row my-3 mx-5">
      <select 
      value={selectedCountry} 
      onChange={handleDisplayCountries}      
      style={{ width:"200px",borderRadius:"10px" }}>
         <option value="">--Select country--</option>
         {countries.length>0 && countries.map((c,index)=>(
            <option key={index} name="country" value={c}>{c}</option>
         ))}        
      </select><span><i>Record found: {displayArray.length}</i></span>
    </div>  
    <div className="row" style={{ marginLeft:"220px" }}>   
         {displayArray.length>0 && displayArray.map((emp)=>(
            <div className="col-md-3 mx-2 my-2 pt-2 text-center" key={emp.id} style={{ border:"1px solid #d3d3d3",borderRadius:"10px" }}>     
            <p><img src={emp.picture} alt="" style={{borderRadius:"50%"}}/> </p>            
               <p>{emp.user_id}</p>
               <p>{emp.first} {emp.last}</p>
               <p>{emp.country}</p> 
               <button 
               onClick={()=>{handleContact(emp)}}
               style={{ borderRadius:"10px" }}>Contact this agent?</button>
         </div>
         ))}    
    </div>
    </div>
  )
}

export default Users
