import React, { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    try{
      await axios.post('/api/v1/users/login', {
      email,
      password,

    },{
      withCredentials: true
    });
    console.log('Login successful!')
    navigate('/dashboard')
    }catch (error) {
      const message = error.response?.data?.message || 'Invalid email or password';
      setErrorMessage(message);
    }
    finally {
      setLoading(false);
    }
  
  };
  useEffect(() => {
    if(loading){
      setLoading(false);
    }

  },[loading])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
        {errorMessage && (<p className="mb-4 text-center text-red-500">{errorMessage}</p>
      )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <div className='relative'>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)} // Toggle showPassword state
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 focus:outline-none cursor-pointer"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading ? 'bg-green-300 cursor-not-allowed' : 'bg-[#89ce00] hover:bg-[#5ba300]'
            } text-black py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 cursor-pointer`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-500 hover:underline">
          Sign Up
          </Link>
        </p>
        
      </div>
    </div>
  );
};

export default LoginPage;