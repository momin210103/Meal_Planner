import React, { useContext } from 'react';
import Card from '../components/card/Card';
import UserContext from '../Context/UserContext';

const getFirstAndLastName = (fullName = '') => {
  const [firstName, ...rest] = fullName.split(' ');
  return {
    firstName: firstName || '',
    lastName: rest.join(' ') || '',
  };
};

const Profile = () => {
  const { user } = useContext(UserContext);
  const { firstName, lastName } = getFirstAndLastName(user.fullName);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">My Profile</h2>

        {/* Profile Card */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              {/* Avatar placeholder or image */}
              <span className="text-3xl font-bold text-gray-600">{firstName.charAt(0)}</span>
            </div>
            <div>
              <div className="text-xl font-bold text-gray-900">{user.fullName}</div>
              <div className="text-gray-500">{user.Role || 'Product Designer'}</div>
              <div className="text-gray-400 text-sm">{user.location || 'Los Angeles, California, USA'}</div>
            </div>
          </div>
          <button className="flex items-center gap-1 px-4 py-2 border border-gray-300 rounded-md text-black font-bold bg-[#89ce00] hover:bg-gray-100 transition text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13h3l8-8a2.828 2.828 0 00-4-4l-8 8v3z" /></svg>
            Edit
          </button>
        </div>

        {/* Personal Information Card */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Personal information</h3>
            <button className="flex items-center gap-1 px-4 py-2 border border-gray-300 rounded-md text-black font-bold bg-[#89ce00] hover:bg-gray-100 transition text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13h3l8-8a2.828 2.828 0 00-4-4l-8 8v3z" /></svg>
              Edit
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
            <div>
              <div className="text-xs text-gray-400">First Name</div>
              <div className="font-medium text-gray-700">{firstName}</div>
            </div>
            <div>
              <div className="text-xs text-gray-400">Last Name</div>
              <div className="font-medium text-gray-700">{lastName}</div>
            </div>
            <div>
              <div className="text-xs text-gray-400">Email address</div>
              <div className="font-medium text-gray-700">{user.email}</div>
            </div>
            <div>
              <div className="text-xs text-gray-400">Phone</div>
              <div className="font-medium text-gray-700">{user.phoneNumber || 'Add+'}</div>
            </div>
            <div className="sm:col-span-2">
              <div className="text-xs text-gray-400">Room Number</div>
              <div className="font-medium text-gray-700">{user.RoomNumber || 'Add+'}</div>
            </div>
            <div className="sm:col-span-2">
              <div className="text-xs text-gray-400">Role</div>
              <div className="font-medium text-gray-700">{user.Role || 'Product Designer'}</div>
            </div>
            <div className="sm:col-span-2">
              <div className="text-xs text-gray-400">Profession</div>
              <div className="font-medium text-gray-700">{user.Role || 'Lecturer'}</div>
            </div>
          </div>
        </div>

        {/* Address Card */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Address</h3>
            <button className="flex items-center gap-1 px-4 py-2 border border-gray-300 rounded-md text-black font-bold bg-[#89ce00] hover:bg-gray-100 transition text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13h3l8-8a2.828 2.828 0 00-4-4l-8 8v3z" /></svg>
              Edit
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
            <div>
              <div className="text-xs text-gray-400">Country</div>
              <div className="font-medium text-gray-700">{user.country || 'Bangladesh'}</div>
            </div>
            <div>
              <div className="text-xs text-gray-400">District</div>
              <div className="font-medium text-gray-700">{user.district || 'Not Added'}</div>
            </div>
            <div>
              <div className="text-xs text-gray-400">Thana</div>
              <div className="font-medium text-gray-700">{user.thana || 'Belkuchi'}</div>
            </div>
            <div>
              <div className="text-xs text-gray-400">Village</div>
              <div className="font-medium text-gray-700">{user.thana || 'Belkuchi'}</div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;