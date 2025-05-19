import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiArrowLeft, FiCalendar, FiClock, FiCoffee, FiSun, FiMoon } from 'react-icons/fi';
// import { useNavigate } from 'react-router';

const SavedMeals = () => {
  // const navigate = useNavigate();
  const [savedMeals, setSavedMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [checkedMeals, setCheckedMeals] = useState({});
  const [mealTimes, setMealTimes] = useState({});
  const [activeTimers, setActiveTimers] = useState(() => {
    const savedTimers = localStorage.getItem('activeTimers');
    return savedTimers ? JSON.parse(savedTimers) : {};
  });
  const [remainingTimes, setRemainingTimes] = useState({});

  useEffect(() => {
    // Save activeTimers to localStorage whenever it changes
    localStorage.setItem('activeTimers', JSON.stringify(activeTimers));
  }, [activeTimers]);

  useEffect(() => {
    fetchSavedMeals();
  }, []);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setRemainingTimes(prev => {
        const newTimes = { ...prev };
        Object.keys(activeTimers).forEach(mealPlanIndex => {
          if (activeTimers[mealPlanIndex]) {
            const endTime = new Date(activeTimers[mealPlanIndex]);
            const now = new Date();
            const diff = endTime - now;

            if (diff <= 0) {
              newTimes[mealPlanIndex] = 'Time\'s up!';
              setActiveTimers(prev => {
                const newTimers = { ...prev };
                delete newTimers[mealPlanIndex];
                return newTimers;
              });
            } else {
              const hours = Math.floor(diff / (1000 * 60 * 60));
              const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
              const seconds = Math.floor((diff % (1000 * 60)) / 1000);
              newTimes[mealPlanIndex] = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            }
          }
        });
        return newTimes;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [activeTimers]);

  const fetchSavedMeals = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/mealplan/global', {
        withCredentials: true
      });
      const mealsData = response.data?.data || response.data || [];
      setSavedMeals(Array.isArray(mealsData) ? mealsData : []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching meals:', error);
      setError('Failed to fetch saved meals');
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getMealIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'breakfast':
        return <FiCoffee className="text-amber-500" />;
      case 'lunch':
        return <FiSun className="text-orange-500" />;
      case 'dinner':
        return <FiMoon className="text-indigo-500" />;
      default:
        return <FiClock className="text-blue-500" />;
    }
  };

  const handleCheckboxChange = (mealPlanIndex, mealIndex) => {
    const key = `${mealPlanIndex}-${mealIndex}`;
    setCheckedMeals(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleTimeChange = (mealPlanIndex, type, value) => {
    setMealTimes(prev => ({
      ...prev,
      [`${mealPlanIndex}-${type}`]: value
    }));
  };

  const handleSetTime = (mealPlanIndex) => {
    const startTime = mealTimes[`${mealPlanIndex}-start`];
    const endTime = mealTimes[`${mealPlanIndex}-end`];
    
    if (startTime && endTime) {
      const [startHours, startMinutes] = startTime.split(':').map(Number);
      const [endHours, endMinutes] = endTime.split(':').map(Number);
      
      const now = new Date();
      const startDate = new Date(now);
      startDate.setHours(startHours, startMinutes, 0);
      
      const endDate = new Date(now);
      endDate.setHours(endHours, endMinutes, 0);
      
      if (endDate <= startDate) {
        endDate.setDate(endDate.getDate() + 1);
      }
      
      setActiveTimers(prev => ({
        ...prev,
        [mealPlanIndex]: endDate.toISOString() // Store as ISO string for proper serialization
      }));
    } else {
      alert('Please set both start and end times');
    }
  };

  const handleSubmit = () => {
    const selectedMeals = Object.entries(checkedMeals)
      .filter(([, isChecked]) => isChecked)
      .map(([key]) => {
        const [planIndex, mealIndex] = key.split('-');
        return savedMeals[planIndex].meals[mealIndex];
      });
    
    console.log('Selected meals:', selectedMeals);
    // Here you can add your logic to handle the selected meals
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg text-red-500">
          <p className="text-lg font-medium">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">


        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-black rounded-4xl text-center">
            Select Your Meal
          </h2>
          
          {!savedMeals || savedMeals.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-indigo-50 rounded-full p-6 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                <FiCalendar className="text-indigo-500 text-4xl" />
              </div>
              <p className="text-gray-600 text-lg">No saved meals found</p>
              <p className="text-gray-500 mt-2">Start planning your meals to see them here!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {savedMeals.map((mealPlan, index) => (
                <div 
                  key={index} 
                  className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 border border-indigo-100"
                >
                  <div className="flex items-center text-indigo-600 mb-4">
                    <FiCalendar className="mr-3 text-xl" />
                    <span className="font-semibold text-lg">{formatDate(mealPlan.date)}</span>
                  </div>

                  {/* <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <FiClock className="text-indigo-600" />
                        <span className="text-gray-600">Start Time:</span>
                        <input
                          type="time"
                          value={mealTimes[`${index}-start`] || ''}
                          onChange={(e) => handleTimeChange(index, 'start', e.target.value)}
                          className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <FiClock className="text-indigo-600" />
                        <span className="text-gray-600">End Time:</span>
                        <input
                          type="time"
                          value={mealTimes[`${index}-end`] || ''}
                          onChange={(e) => handleTimeChange(index, 'end', e.target.value)}
                          className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      
                    </div>
                    <button
                      onClick={() => handleSetTime(index)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-1 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg cursor-pointer"
                    >
                      Set
                    </button>
                  </div> */}
                  {activeTimers[index] && (
                        <div className="flex items-center space-x-2 bg-indigo-300 px-4 py-4 mb-2 rounded-lg">
                          <FiClock className="text-red-600 animate-pulse" />
                          <span className="text-red-700 font-mono font-bold ">
                            Time Remaining:
                            {remainingTimes[index] || '00:00:00'}
                          </span>
                        </div>
                      )}
                  
                  <div className="space-y-4">
                    {mealPlan.meals && mealPlan.meals.map((meal, mealIndex) => (
                      <div 
                        key={mealIndex} 
                        className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                      >
                        <div className="p-2 bg-indigo-50 rounded-lg">
                          {getMealIcon(meal.type)}
                        </div>
                        <div className="flex-1">
                          <span className="capitalize font-medium text-gray-700">{meal.type}</span>
                          <p className="text-gray-600">{meal.name}</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={checkedMeals[`${index}-${mealIndex}`] || false}
                          onChange={() => handleCheckboxChange(index, mealIndex)}
                          className="w-5 h-5 text-indigo-600 border-black border-2 rounded focus:ring-indigo-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              
              <div className="flex justify-center mt-8">
                <button
                  onClick={handleSubmit}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg cursor-pointer"
                >
                  Submit Selected Meals
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedMeals; 