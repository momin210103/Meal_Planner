

import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import ToDayMeal from '../../components/ToDayMeal';
import Acount from '../../components/Acount';
import UserContext from '../../Context/UserContext';

const UserDashBoard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const balanceData = location.state || {amount:null,date:null};
  const {user} = useContext( UserContext );

  // Mock user data (simulate logged-in user)
  // const [user, setUser] = useState({
  //   name: 'John Doe',
  //   email: 'john@example.com',
  //   role: 'user',
  // });

  // Handle logout
  const handleLogout = () => {
    // setUser(null); // Clear mock user data
    navigate('/login'); // Redirect to login page
  };

  // if (!user) {
  //   return <div className="text-center py-8">Loading...</div>; // Show loading state
  // }

  return (
    <div className="mt-25 h-12 bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 mx-auto">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300 cursor-pointer"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 space-y-1 gap-2 md:grid md:grid-cols-2 md:gap-4">
        <div className='flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-6'>
          <p className='text-green-800 font-bold text-4xl'>{user.fullName}</p>
          <p className='text-orange-700 font-bold text-4xl'>{user.Role}</p>
        </div>

        <ToDayMeal/>
        <Acount balance = {balanceData}/>

        <div className='space-x-4'>
          <button
            type="submit"
            onClick={() => navigate('/borderlist')}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 cursor-pointer"
          >
            Select New Manager
          </button>
          <button
            type="submit"
            onClick={() => navigate('/profile')}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 cursor-pointer"
          >
            SeeProfile
          </button>
        </div>

      </main>
    </div>
  );
};

export default UserDashBoard;





// const Dashboard = () => {
//   return (
//     <div className="min-h-screen bg-gray-100 p-6 mt-20">
//       <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
//         {/* Include the Profile component here */}
//         <Profile />
//             {/* Add other cards or components */} 
//         <Profile /> 
//       </div>
      
//     </div>
//   );
// };

// export default Dashboard;