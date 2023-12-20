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
              console.log("data inside fetchData")
              console.log(result.data);
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
      console.log("data inside useEffect")
      console.log(users)
      fetchData();
    }, []);
  return (
    <div>
      {}
    </div>
  )
}

export default FakeUsers
