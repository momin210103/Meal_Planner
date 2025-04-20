import React from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
} from 'date-fns';

const MealMonth = () => {
  const today = new Date();
  const currentMonth = format(today, 'MMMM yyyy');
  const start = startOfMonth(today);
  const end = endOfMonth(today);
  const days = eachDayOfInterval({ start, end });

  // Example mock meal data (you can later fetch this from a DB or spreadsheet)
  const getMeal = (date, type) => {
    const sampleMeals = {
      '2025-04-01': { Breakfast: 'Oats', Lunch: 'Grilled Chicken', Dinner: 'Salad' },
      '2025-04-02': { Breakfast: 'Smoothie', Lunch: 'Rice & Beans', Dinner: 'Fish Curry' },
    };
    const dayKey = format(date, 'yyyy-MM-dd');
    return sampleMeals[dayKey]?.[type] || '';
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">{currentMonth} Meal Plan</h2>

      <div className="overflow-auto">
        <table className="min-w-full border border-gray-300 text-sm text-left">
          <thead className="bg-green-100">
            <tr>
              <th className="p-3 border border-gray-300">Date</th>
              <th className="p-3 border border-gray-300">Breakfast</th>
              <th className="p-3 border border-gray-300">Lunch</th>
              <th className="p-3 border border-gray-300">Dinner</th>
            </tr>
          </thead>
          <tbody>
            {days.map((day) => (
              <tr key={day.toISOString()} className="hover:bg-gray-50">
                <td className="p-3 border border-gray-300 font-medium">
                  {format(day, 'do EEE')}
                </td>
                {['Breakfast', 'Lunch', 'Dinner'].map((meal) => {
                  const mealValue = getMeal(day, meal);
                  return (
                    <td key={meal} className="p-3 border border-gray-300">
                      <div className="flex items-center gap-2">
                        {mealValue && (
                          <span className="w-2.5 h-2.5 bg-green-500 rounded-full inline-block"></span>
                        )}
                        <span>{mealValue}</span>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MealMonth;
