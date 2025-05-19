import React, { useState, } from 'react';
import axios from 'axios';
import { FiCheckCircle, FiAlertCircle, FiSunrise, FiSun, FiMoon, FiArrowLeft, FiClock } from 'react-icons/fi';

import { useNavigate } from 'react-router';

const MealPlan = () => {

  

  const navigate = useNavigate();
  const [mealPlan, setMealPlan] = useState({
    breakfast: { name: '' },
    lunch: { name: '' },
    dinner: { name: '' }
  });
  const [mealTimes, setMealTimes] = useState({
    start: '',
    end: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: null, message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMealPlan(prev => ({
      ...prev,
      [name]: {
        ...prev[name],
        name: value
      }
    }));
  };

  const handleTimeChange = (timeType, value) => {
    setMealTimes(prev => ({
      ...prev,
      [timeType]: value
    }));
  };

  const handleSetTime = () => {
    // You can add validation or additional logic here if needed
    console.log('Setting meal times:', mealTimes);
  };

  const handleSubmit = async () => {
    if (!mealPlan.breakfast.name && !mealPlan.lunch.name && !mealPlan.dinner.name) {
      setStatus({ type: 'error', message: 'Please enter at least one meal' });
      return;
    }
  
    setIsSubmitting(true);
    setStatus({ type: null, message: '' });
  
    try {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const formattedDate = tomorrow.toISOString().split('T')[0];
  
      // Create meals array
      const mealsArray = [];
      if (mealPlan.breakfast.name.trim()) {
        mealsArray.push({ type: 'breakfast', name: mealPlan.breakfast.name.trim() });
      }
      if (mealPlan.lunch.name.trim()) {
        mealsArray.push({ type: 'lunch', name: mealPlan.lunch.name.trim() });
      }
      if (mealPlan.dinner.name.trim()) {
        mealsArray.push({ type: 'dinner', name: mealPlan.dinner.name.trim() });
      }
  
      const response = await axios.post('http://localhost:8000/api/v1/mealplan', {
        date: formattedDate,
        meals: mealsArray,
        startTime: mealTimes.start || "10:00",
        endTime: mealTimes.end || "10:00"
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      // Handle successful response
      setStatus({ 
        type: 'success', 
        message: response.data.message || 'Meal plan saved successfully!' 
      });
      
      // Clear form
      setMealPlan({
        breakfast: { name: '' },
        lunch: { name: '' },
        dinner: { name: '' }
      });
      setMealTimes({ start: '', end: '' });
    } catch (err) {
      console.error("Error saving meal plan:", err);
      
      // Handle different types of errors
      if (err.response?.status === 403) {
        setStatus({ 
          type: 'error', 
          message: 'Access denied. Only managers can create or update meal plans. Please contact your manager for assistance.' 
        });
      } else if (err.response?.data?.message) {
        setStatus({ 
          type: 'error', 
          message: err.response.data.message 
        });
      } else {
        setStatus({ 
          type: 'error', 
          message: 'Failed to save meal plan. Please try again.' 
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
        >
          <FiArrowLeft className="mr-2" />
          <span className="text-sm sm:text-base font-medium">Back</span>
        </button>

        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800">Plan Tomorrow's Meals</h2>
          
          <div className="space-y-4 sm:space-y-6">
            {/* Time Selection Section */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <FiClock className="text-indigo-600" />
                  <span className="text-gray-600">Start Time:</span>
                  <input
                    type="time"
                    value={mealTimes.start || ''}
                    onChange={(e) => handleTimeChange('start', e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <FiClock className="text-indigo-600" />
                  <span className="text-gray-600">End Time:</span>
                  <input
                    type="time"
                    value={mealTimes.end || ''}
                    onChange={(e) => handleTimeChange('end', e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
              <button
                onClick={handleSetTime}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-1 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg cursor-pointer"
              >
                Set
              </button>
            </div>

            <div className="flex items-start space-x-3">
              <FiSunrise className="text-yellow-500 text-xl mt-2" />
              <div className="flex-1">
                <label htmlFor="breakfast" className="block text-sm font-medium text-gray-700 mb-1">Breakfast</label>
                <input
                  id="breakfast"
                  name="breakfast"
                  type="text"
                  placeholder="What's for breakfast?"
                  value={mealPlan.breakfast.name}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base placeholder-black text-black"
                />
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <FiSun className="text-orange-500 text-xl mt-2" />
              <div className="flex-1">
                <label htmlFor="lunch" className="block text-sm font-medium text-gray-700 mb-1">Lunch</label>
                <input
                  id="lunch"
                  name="lunch"
                  type="text"
                  placeholder="What's for lunch?"
                  value={mealPlan.lunch.name}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base placeholder-black text-black"
                />
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <FiMoon className="text-indigo-500 text-xl mt-2" />
              <div className="flex-1">
                <label htmlFor="dinner" className="block text-sm font-medium text-gray-700 mb-1">Dinner</label>
                <input
                  id="dinner"
                  name="dinner"
                  type="text"
                  placeholder="What's for dinner?"
                  value={mealPlan.dinner.name}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base placeholder-black text-black"
                />
              </div>
            </div>
          </div>

          {status.type && (
            <div className={`mt-4 p-3 rounded-md ${status.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              <div className="flex items-center text-sm sm:text-base">
                {status.type === 'success' ? (
                  <FiCheckCircle className="mr-2 flex-shrink-0" />
                ) : (
                  <FiAlertCircle className="mr-2 flex-shrink-0" />
                )}
                {status.message}
              </div>
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`mt-6 w-full py-2 sm:py-3 px-4 rounded-md font-medium transition-all duration-200 ${
              isSubmitting 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-green-600 hover:bg-green-700 active:scale-[0.98]'
            } text-white shadow-md text-sm sm:text-base`}
          >
            {isSubmitting ? 'Saving...' : 'Save Meal Plan'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MealPlan;
