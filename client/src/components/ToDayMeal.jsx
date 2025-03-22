import React from 'react';
import Card from './card/Card';
import MealSwitch from './MealSwitch';

const ToDayMeal = () => {
    const today = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = days[today.getDay()];
  
    const handleMealToggle = (mealName, isChecked) => {
      console.log(`${mealName} is ${isChecked ? 'enabled' : 'disabled'}`);
    };
  
    return (
      <div>
        <Card>
          <h1 className="text-black font-bold text-xl mb-4">Select Your Meal</h1>
          <h2 className="text-gray-700">Date: {today.toLocaleDateString()}</h2>
          <h2 className="text-gray-700 mb-6">{dayName}</h2>
          <MealSwitch
            mealName="Breakfast"
            defaultChecked={true}
            onChange={(isChecked) => handleMealToggle('Breakfast', isChecked)}
          />
          <MealSwitch
            mealName="Lunch"
            defaultChecked={false}
            onChange={(isChecked) => handleMealToggle('Lunch', isChecked)}
          />
          <MealSwitch
            mealName="Dinner"
            defaultChecked={true}
            onChange={(isChecked) => handleMealToggle('Dinner', isChecked)}
          />
        </Card>
      </div>
    );
  };
  
  export default ToDayMeal;