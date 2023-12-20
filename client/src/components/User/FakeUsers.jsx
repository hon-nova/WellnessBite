import React,{useEffect,useState} from 'react'
import Papa from 'papaparse'


const FakeUsers = () => {
   const [users,setUsers]=useState([])

   useEffect(() => {
      const fetchData = async () => {
        const csvFilePath = '/assets/users.csv';
  
        try {
          const response = await fetch(csvFilePath);
          const text = await response.text();
  
          Papa.parse(text, {
            header: true,
            complete: (result) => {
              // 'result.data' contains the parsed data
            //   console.log("data inside fetchData")
            //   console.log(result.data);
              setUsers(result.data)
            },
            error: (error) => {
              console.error('CSV parsing error:', error.message);
            },
          });
        } catch (error) {
          console.error('Error fetching CSV file:', error.message);
        }
      };
      fetchData();
      
    }, []);
   //  console.log("data @playground useEffect")
   //  console.log(users)
     
  return (
    <div className='quotes'>
      {users.length && users.map((el,index)=>(
         <div key={index}>        
         <img src={el.picture} alt=""/>       
         </div>
      ))}
    </div>
  )
}

export default FakeUsers
