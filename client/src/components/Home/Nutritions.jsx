import React,{useEffect,useState} from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const Nutritions = () => {

  const [nutritionsData, setNutritionsData] = useState([]);

  const fetchData = async () => {
    try {
      console.log("Before fetch")
      const response = await fetch('assets/nutritions.json'); 
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setNutritionsData(data);
      // console.log("data")
      // console.log(data)
      console.log("End fetch")
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Now nutritionsData contains the data from nutritions.json
  console.log(nutritionsData);
  return (
    <div>
      <Navbar/>
      <h1>Nutritions</h1>
      <div>
        <Footer/>
      </div>
    </div>
  )
}

export default Nutritions
