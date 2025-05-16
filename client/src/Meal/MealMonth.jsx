import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '../components/ErrorFallback';


const MealMonth = () => {
  const navigate = useNavigate();
  const currentDate = new Date();
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching meal data...');
        const response = await axios.get("http://localhost:8000/api/v1/users/dailymeal", {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });
        console.log('API Response:', response.data);
        setItems(Array.isArray(response.data) ? response.data : []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching meal data:', error);
        if (error.response?.status === 401) {
          // Redirect to login if unauthorized
          navigate('/login');
          return;
        }
        setItems([]);
        setError(error.response?.data?.message || error.message || 'Failed to fetch meal data');
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedMonth, selectedYear, navigate]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading meal data...</p>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-md">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Retry
        </button>
      </div>
    </div>
  );

  const monthNames = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',
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
    try {
      if (!Array.isArray(items)) return '—';
      
      const dayKey = format(date, "yyyy-MM-dd");
      const found = items.find(item => 
        item?.date && format(new Date(item.date), "yyyy-MM-dd") === dayKey
      );
      
      // Safely check all levels
      const mealType = type?.toLowerCase();
      const isSelected = found?.selection?.[mealType];
      
      return isSelected ? `${type} (Selected)` : '—';
    } catch (error) {
      console.error('Error in getMeal:', error);
      return '—';
    }
  };
  let totalMonthlyMeals = 0;

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
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
            if (meal !== '—') dailyTotal += 1;
            return {
              type,
              meal,
            };
          });
          totalMonthlyMeals += dailyTotal;

          return (
            <div key={day.toISOString()} className="border border-gray-300 rounded-lg p-4 shadow-sm">
              <div className="font-bold text-lg mb-2">
                {format(day, 'do MMM, EEE')}
              </div>
              <ul className="space-y-2">
                {meals.map((meal) => (
                  <li key={meal.type} className="flex justify-between text-sm">
                    <span className="flex items-center gap-2">
                      {meal.meal !== '—' && (
                        <span className="w-2.5 h-2.5 bg-green-500 rounded-full inline-block"></span>
                      )}
                      {meal.type}
                    </span>
                    <span className="text-right text-gray-700">
                      {meal.meal || '—'}
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
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="p-3 border border-gray-300">Date</th>
              <th className="p-3 border border-gray-300">Breakfast</th>
              <th className="p-3 border border-gray-300">Lunch</th>
              <th className="p-3 border border-gray-300">Dinner</th>
              <th className="p-3 border border-gray-300 text-center">Daily Total</th>
            </tr>
          </thead>
          <tbody>
            {days.map((day, index) => {
              let dailyTotal = 0;
              const mealCells = ['Breakfast', 'Lunch', 'Dinner'].map((mealType) => {
                const meal = getMeal(day, mealType);
                const isSelected = meal !== '—';

                if (isSelected) dailyTotal += 1;

                return (
                  <td key={mealType} className="p-3 border border-gray-300">
                    <div className="flex items-center gap-2">
                      {isSelected && (
                        <span className="w-2.5 h-2.5 bg-green-500 rounded-full inline-block"></span>
                      )}
                      {meal}
                    </div>
                  </td>
                );
              });

              totalMonthlyMeals += dailyTotal;

              return (
                <tr 
                  key={day.toISOString()} 
                  className={`hover:bg-gray-100 transition-colors duration-200 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-green-50'
                  }`}
                >
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
            <tr className="bg-green-100 text-sm">
              <td colSpan={4} className="p-3 border border-gray-300 font-bold text-right">
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
    </ErrorBoundary>
  );
};

export default MealMonth;
