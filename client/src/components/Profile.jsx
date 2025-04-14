import React from 'react';
import Card from '../components/card/Card';
import profileImage from '../../src/assets/momin (3).jpg'
const Profile = () => {
    const user = {
        name:' Momin Sheikh',
        email:' momincse13@gmail.com',
        role: ' User',
        room: ' 210',
        image:profileImage
    }
  return (
    <div className="">
      <Card>
      <img src={user.image} className='w-25 h-25 rounded-full'/>
        <div className=''>
        <p className='font-extrabold text-black'>Name: {user.name}</p>
        <p>Email:{user.email}</p>
        <p>Role:{user.role}</p>
        <p>Room No:{user.room}</p>
        </div>
        
      </Card>
    </div>
  );
};

export default Profile;