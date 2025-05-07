import React, { useState } from 'react';
import axios from 'axios';
import { FiCheckCircle, FiAlertCircle, FiSunrise, FiSun, FiMoon } from 'react-icons/fi';

const MealPlan = () => {
  const [mealPlan, setMealPlan] = useState({
    breakfast: '',
    lunch: '',
    dinner: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: null, message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMealPlan(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    if (!mealPlan.breakfast && !mealPlan.lunch && !mealPlan.dinner) {
      setStatus({ type: 'error', message: 'Please enter at least one meal' });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: null, message: '' });

    try {
      await axios.post('http://localhost:8000/api/v1/users/mealplan', {
        date: new Date(new Date().setDate(new Date().getDate() + 1)), // tomorrow
        meals: mealPlan
      }, {
        withCredentials: true
      });
      
      setStatus({ type: 'success', message: 'Meal plan saved successfully!' });
      setMealPlan({ breakfast: '', lunch: '', dinner: '' }); // Reset form
    } catch (err) {
      console.error("Error saving meal plan:", err);
      setStatus({ type: 'error', message: err.response?.data?.message || 'Failed to save meal plan' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Plan Tomorrow's Meals</h2>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <FiSunrise className="text-yellow-500 text-xl" />
          <div className="flex-1">
            <label htmlFor="breakfast" className="block text-sm font-medium text-gray-700 mb-1">Breakfast</label>
            <input
              id="breakfast"
              name="breakfast"
              type="text"
              placeholder="What's for breakfast?"
              value={mealPlan.breakfast}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <FiSun className="text-orange-500 text-xl" />
          <div className="flex-1">
            <label htmlFor="lunch" className="block text-sm font-medium text-gray-700 mb-1">Lunch</label>
            <input
              id="lunch"
              name="lunch"
              type="text"
              placeholder="What's for lunch?"
              value={mealPlan.lunch}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <FiMoon className="text-indigo-500 text-xl" />
          <div className="flex-1">
            <label htmlFor="dinner" className="block text-sm font-medium text-gray-700 mb-1">Dinner</label>
            <input
              id="dinner"
              name="dinner"
              type="text"
              placeholder="What's for dinner?"
              value={mealPlan.dinner}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {status.type && (
        <div className={`mt-4 p-3 rounded-md ${status.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          <div className="flex items-center">
            {status.type === 'success' ? (
              <FiCheckCircle className="mr-2" />
            ) : (
              <FiAlertCircle className="mr-2" />
            )}
            {status.message}
          </div>
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className={`mt-6 w-full py-3 px-4 rounded-md font-medium transition-colors cursor-pointer ${
          isSubmitting 
            ? 'bg-blue-400 cursor-not-allowed' 
            : 'bg-green-600 '
        } text-white shadow-md`}
      >
        {isSubmitting ? 'Saving...' : 'Save Meal Plan'}
      </button>
    </div>
  );
};

export default MealPlan;