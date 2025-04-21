import React, { useEffect, useState } from 'react';
import Card from './card/Card';
import MealSwitch from './MealSwitch';
import Countdown from './CountDown';
import axios from 'axios';


const ToDayMeal = () => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate()+1);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = days[tomorrow.getDay()];
    const [isDisabled,setIsDisabled] = useState(false);
    const [isSaved,setIsSaved] = useState(false);
    const [mealSelection, setMealSelection] = useState({
      Breakfast: false,
      Lunch: false,
      Dinner: false,

    });
  
    const handleMealToggle = (mealName, isChecked) => {
      setMealSelection(prev => ({
        ...prev,
        [mealName.toLowerCase()]: isChecked
      }));
    };


    // Function to get today's 10:00 PM time
    const getEndTimeToday = () => {
      const endTime = new Date();
      endTime.setHours(22, 0, 0, 0); // 10:00 PM today
      return endTime;
  };
    // Function to check if the current time is between 12:00 AM and 10:00 PM
    const isMealSelectionTime = () => {
      const now = new Date();
      const startTime = new Date(now);
      startTime.setHours(0, 0, 0, 0); // 12:00 AM
      const endTime = new Date(now);
      endTime.setHours(22, 0, 0, 0); // 10:00 PM

      return now >= startTime && now <= endTime;
  };

    // Update the disabled state based on the current time
    useEffect(() => {
      const checkTime = () => {
          setIsDisabled(!isMealSelectionTime());
      };

      // Check the time immediately
      checkTime();

      // Set up an interval to check the time every minute
      const interval = setInterval(checkTime, 60000); // Check every minute

      // Clean up the interval on component unmount
      return () => clearInterval(interval);
  }, []);
  const handleSaveSelection = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/v1/users/dailymeal',
        {
          date: tomorrow,
          selection: mealSelection
        },
        {
          withCredentials: true // Needed to send cookies
        }
      );
      if(response.status == 200){
        setIsSaved(true);
        setIsDisabled(true);

      }
      
    } catch (error) {
      console.error('❌ Failed to save meal selection:', error);
    }

  }

 
 
  
    return (
      <div>
        <Card>
          <h1 className="text-black font-bold text-xl mb-2">Select Your Meal :{dayName}</h1>
          <h2 className="text-gray-700">Date: {tomorrow.toLocaleDateString()}</h2>
          <div>
            <Countdown initialTime={getEndTimeToday()}/>
          </div>
          <MealSwitch
            mealName="Breakfast"
            defaultChecked={false}
            onChange={(isChecked) => handleMealToggle('Breakfast', isChecked)}
            disabled={isDisabled}
          />
          <MealSwitch
            mealName="Lunch"
            defaultChecked={false}
            onChange={(isChecked) => handleMealToggle('Lunch', isChecked)}
            disabled={isDisabled}
          />
          <MealSwitch
            mealName="Dinner"
            defaultChecked={false}
            onChange={(isChecked) => handleMealToggle('Dinner', isChecked)}
            disabled={isDisabled}
          />
          { !isSaved? (
            <button onClick = {handleSaveSelection} disabled = {isDisabled} className = "mt-4 bg-green-500 text-white py-2 px-4 rounded">
              Save Selection
            </button>

          ):(
            <p className='mt-4 text-green-600 font-semibold'> You Selected your meal</p>

          )

          }
        </Card>
      </div>
    );
  };
  
  export default ToDayMeal;