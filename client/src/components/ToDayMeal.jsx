import React, { useEffect, useState } from 'react';
import Card from './card/Card';
import MealSwitch from './MealSwitch';
import Countdown from './CountDown';


const ToDayMeal = () => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate()+1);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = days[tomorrow.getDay()];
    const [isDisabled,setIsDisabled] = useState(false);
  
    const handleMealToggle = (mealName, isChecked) => {
    console.log(`${mealName} is ${isChecked ? 'enabled' : 'disabled'}`);
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
          <MealSwitch
            mealName="Fest Meal"
            defaultChecked={false}
            onChange={(isChecked) => handleMealToggle('Dinner', isChecked)}
            disabled={isDisabled}
          />
          
        </Card>
      </div>
    );
  };
  
  export default ToDayMeal;