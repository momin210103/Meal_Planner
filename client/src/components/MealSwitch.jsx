import React, { useState } from 'react';

const MealSwitch = ({ mealName, defaultChecked = false, onChange }) => {
  const [isChecked, setIsChecked] = useState(defaultChecked);

  const handleToggle = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    if (onChange) {
      onChange(newCheckedState);
    }
  };

  return (
    <div className="flex items-center justify-between p-2">
      <span className="text-black font-medium">{mealName}</span>
      <label className="cursor-pointer">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleToggle}
          className="sr-only"
        />
        <div
          className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
            isChecked ? 'bg-green-500' : 'bg-gray-300'
          }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
              isChecked ? 'translate-x-6' : 'translate-x-0'
            }`}
          />
        </div>
      </label>
    </div>
  );
};

export default MealSwitch;