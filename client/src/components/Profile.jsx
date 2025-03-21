import React from 'react';
import Card from '../components/card/Card';

const Profile = () => {
    const user = {
        name:'John Doe',
        email:'john@example.com',
        role: 'user'
    }
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Profile</h1>
      <Card title="Personal Information">
        <p>Name:{user.name}</p>
        <p>Email:{user.email}</p>
        <p>Role:{user.role}</p>
      </Card>
    </div>
  );
};

export default Profile;