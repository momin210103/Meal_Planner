import React from 'react';
import Card from '../components/card/Card';
import profileImage from '../../src/assets/hero2.jpg'
const Profile = () => {
    const user = {
        name:'John Doe',
        email:'john@example.com',
        role: 'user',
        room: '210',
        image:profileImage
    }
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Profile</h1>
      <Card title={user.img}>
        <p>Name:{user.name}</p>
        <p>Email:{user.email}</p>
        <p>Role:{user.role}</p>
        <p>Room No:{user.room}</p>
        <img src={user.image} className='w-25 h-25 rounded-full'/>
      </Card>
    </div>
  );
};

export default Profile;