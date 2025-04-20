import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './../../components/card/Card';

const BorderList = () => {
  const [borders, setBorders] = useState([]); // State to store the border list
//   const [loading, setLoading] = useState(true); // State to manage loading
//   const [error, setError] = useState(''); // State to manage errors

  // Fetch data from the API
  useEffect(()=> {
    axios.get('/api/v1/users/register')
    .then((response)=>{
        setBorders(response.data); 
    })
    .catch((error) =>{
        console.log(error)
    })   
    
  },[])

//   if (loading) {
//     return <div className="text-center py-8">Loading...</div>; // Show loading state
//   }

//   if (error) {
//     return <div className="text-center py-8 text-red-500">{error}</div>; // Show error message
//   }

  return (
    <div className="container mx-auto px-6 py-8">
      <h2 className="text-3xl font-bold mb-6">Border List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {borders.map((border) => (
          <Card key={border.id}>
            <div className="p-4">
              <p className="font-bold text-lg">Name: {border.fullName}</p>
              <p>Email: {border.email}</p>
              <p>Role: {border.Role}</p>
              <p>Room No: {border.RoomNumber}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BorderList;