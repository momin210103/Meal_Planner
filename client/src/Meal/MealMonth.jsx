import React, { useState } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
} from 'date-fns';

const MealMonth = () => {
  const currentDate = new Date();
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());

  const monthNames = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December',
  ];

  const handleMonthChange = (e) => setSelectedMonth(Number(e.target.value));
  const handleYearChange = (e) => setSelectedYear(Number(e.target.value));

  const getDaysInMonth = (year, month) => {
    const start = startOfMonth(new Date(year, month));
    const end = endOfMonth(new Date(year, month));
    return eachDayOfInterval({ start, end });
  };

  const days = getDaysInMonth(selectedYear, selectedMonth);

  const getMeal = (date, type) => {
    const sampleMeals = {
      '2025-04-01': {
        Breakfast: { item: 'Oats', quantity: 1 },
        Lunch: { item: 'Grilled Chicken', quantity: 2 },
        Dinner: { item: 'Salad', quantity: 1 },
        Feast: { item: 'Cake', quantity: 1 },
      },
      '2025-04-02': {
        Breakfast: { item: 'Smoothie', quantity: 1 },
        Lunch: { item: 'Rice & Beans', quantity: 1 },
        Dinner: { item: 'Fish Curry', quantity: 2 },
        Feast: null,
      },
    };

    const dayKey = format(date, 'yyyy-MM-dd');
    return sampleMeals[dayKey]?.[type] || null;
  };

  let totalMonthlyMeals = 0;

  return (
    <div className="p-4 max-w-full mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-center sm:text-left">
          {monthNames[selectedMonth]} {selectedYear} Meal Plan
        </h2>

        <div className="flex flex-col sm:flex-row gap-2 items-center sm:items-start">
          <select
            value={selectedMonth}
            onChange={handleMonthChange}
            className="border border-gray-300 p-2 rounded w-full sm:w-auto text-sm"
          >
            {monthNames.map((month, index) => (
              <option key={index} value={index}>
                {month}
              </option>
            ))}
          </select>

          <select
            value={selectedYear}
            onChange={handleYearChange}
            className="border border-gray-300 p-2 rounded w-full sm:w-auto text-sm"
          >
            {Array.from({ length: 5 }, (_, i) => selectedYear - 2 + i).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Mobile Card Layout */}
      <div className="space-y-4 sm:hidden">
        {days.map((day) => {
          let dailyTotal = 0;
          const meals = ['Breakfast', 'Lunch', 'Dinner'].map((type) => {
            const meal = getMeal(day, type);
            if (meal?.quantity) dailyTotal += meal.quantity;
            return {
              type,
              ...meal,
            };
          });
          totalMonthlyMeals += dailyTotal;

          return (
            <div
              key={day.toISOString()}
              className="border border-gray-300 rounded-lg p-4 shadow-sm"
            >
              <div className="font-bold text-lg mb-2">
                {format(day, 'do MMM, EEE')}
              </div>
              <ul className="space-y-2">
                {meals.map((meal) => (
                  <li key={meal.type} className="flex justify-between text-sm">
                    <span className="flex items-center gap-2">
                      {meal.item && (
                        <span className="w-2.5 h-2.5 bg-green-500 rounded-full inline-block"></span>
                      )}
                      {meal.type}
                    </span>
                    <span className="text-right text-gray-700">
                      {meal.item ? `${meal.item} (${meal.quantity})` : '—'}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-3 text-right font-semibold text-sm">
                Total: {dailyTotal || '—'}
              </div>
            </div>
          );
        })}
      </div>

      {/* Table Layout (Tablet and Desktop) */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full border border-gray-300 text-sm text-left min-w-[800px]">
          <thead className="bg-green-100">
            <tr>
              <th className="p-3 border border-gray-300">Date</th>
              <th className="p-3 border border-gray-300">Breakfast</th>
              <th className="p-3 border border-gray-300">Lunch</th>
              <th className="p-3 border border-gray-300">Dinner</th>
              <th className="p-3 border border-gray-300 text-center">Daily Total</th>
            </tr>
          </thead>
          <tbody>
            {days.map((day) => {
              let dailyTotal = 0;
              const mealTypes = ['Breakfast', 'Lunch', 'Dinner'];
              const mealCells = mealTypes.map((type) => {
                const meal = getMeal(day, type);
                if (meal?.quantity) dailyTotal += meal.quantity;
                return (
                  <td key={type} className="p-3 border border-gray-300">
                    {meal ? (
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 bg-green-500 rounded-full inline-block"></span>
                        {meal.item} <span className="text-gray-500 text-xs">({meal.quantity})</span>
                      </div>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                );
              });

              totalMonthlyMeals += dailyTotal;

              return (
                <tr key={day.toISOString()} className="hover:bg-gray-50">
                  <td className="p-3 border border-gray-300 font-medium whitespace-nowrap">
                    {format(day, 'do EEE')}
                  </td>
                  {mealCells}
                  <td className="p-3 border border-gray-300 text-center font-semibold">
                    {dailyTotal > 0 ? dailyTotal : '—'}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="bg-green-50 text-sm">
              <td colSpan={5} className="p-3 border border-gray-300 font-bold text-right">
                Monthly Total:
              </td>
              <td className="p-3 border border-gray-300 text-center font-bold">
                {totalMonthlyMeals}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default MealMonth;
