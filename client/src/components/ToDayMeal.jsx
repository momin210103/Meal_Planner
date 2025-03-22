import React from 'react';
import Card from './card/Card';
import MealSwitch from './MealSwitch';

const ToDayMeal = () => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate()+1);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = days[tomorrow.getDay()];
  
    const handleMealToggle = (mealName, isChecked) => {
      console.log(`${mealName} is ${isChecked ? 'enabled' : 'disabled'}`);
    };
  
    return (
      <div>
        <Card>
          <h1 className="text-black font-bold text-xl mb-2">Select Your Meal :{dayName}</h1>
          <h2 className="text-gray-700">Date: {tomorrow.toLocaleDateString()}</h2>
          
          <MealSwitch
            mealName="Breakfast"
            defaultChecked={false}
            onChange={(isChecked) => handleMealToggle('Breakfast', isChecked)}
          />
          <MealSwitch
            mealName="Lunch"
            defaultChecked={false}
            onChange={(isChecked) => handleMealToggle('Lunch', isChecked)}
          />
          <MealSwitch
            mealName="Dinner"
            defaultChecked={false}
            onChange={(isChecked) => handleMealToggle('Dinner', isChecked)}
          />
          <MealSwitch
            mealName="Fest Meal"
            defaultChecked={false}
            onChange={(isChecked) => handleMealToggle('Dinner', isChecked)}
          />
        </Card>
      </div>
    );
  };
  
  export default ToDayMeal;