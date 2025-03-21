// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router';
// import SettingsCard from '../../components/card/SettingsCard';

// const UserDashBoard = () => {
//   const navigate = useNavigate();

//   // Mock user data (simulate logged-in user)
//   const [user, setUser] = useState({
//     name: 'John Doe',
//     email: 'john@example.com',
//     role: 'user',
//   });

//   // Handle logout
//   const handleLogout = () => {
//     setUser(null); // Clear mock user data
//     navigate('/login'); // Redirect to login page
//   };

//   if (!user) {
//     return <div className="text-center py-8">Loading...</div>; // Show loading state
//   }

//   return (
//     <div className="mt-25 h-12 bg-gray-100">
//       {/* Header */}
//       <header className="bg-white shadow">
//         <div className="container mx-auto px-6 py-4 flex justify-between items-center">
//           <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
//           <button
//             onClick={handleLogout}
//             className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
//           >
//             Logout
//           </button>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="container mx-auto px-6 py-8">
//         <div className="bg-white p-8 rounded-lg shadow-lg">
//           <h2 className="text-3xl font-bold text-gray-800 mb-4">
//             Welcome, {user.name}!
//           </h2>
//           <div className="space-y-4">
//             <div>
//               <label className="block text-gray-700 font-bold mb-2">Email:</label>
//               <p className="text-gray-600">{user.email}</p>
//             </div>
//             <div>
//               <label className="block text-gray-700 font-bold mb-2">Role:</label>
//               <p className="text-gray-600">{user.role}</p>
//             </div>
//           </div>
//         </div>

//         {/* Navigation Menu */}
//         <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
//           <Link
//             to="/profile"
//             className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
//           >
//             <h3 className="text-xl font-bold text-gray-800 mb-2">Profile</h3>
//             <p className="text-gray-600">View and edit your profile.</p>
//           </Link>
          
//           <Link
//             to="/orders"
//             className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
//           >
//             <h3 className="text-xl font-bold text-gray-800 mb-2">Orders</h3>
//             <p className="text-gray-600">View your order history.</p>
//           </Link>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default UserDashBoard;



import React from 'react';
import Card from '../../components/card/Card';
import Profile from '../../components/Profile';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6 mt-20">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
        {/* Include the Profile component here */}
        <Profile />
            {/* Add other cards or components */} 
        <Profile /> 
      </div>
      
    </div>
  );
};

export default Dashboard;