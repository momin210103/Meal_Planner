import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiLoader, FiCoffee, FiSun, FiMoon, FiClock } from "react-icons/fi";
import toast from "react-hot-toast";

// Helper icons for type
const getMealIcon = (type) => {
  switch (type.toLowerCase()) {
    case "breakfast":
      return <FiCoffee className="text-amber-500 inline" />;
    case "lunch":
      return <FiSun className="text-orange-500 inline" />;
    case "dinner":
      return <FiMoon className="text-indigo-500 inline" />;
    default:
      return null;
  }
};

const TotalMealsDashboard = () => {
  const [monthData, setMonthData] = useState(null);
  const [mealData, setMealData] = useState(null);
  const [fetchTime, setFetchTime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [latestDate,setLatestDate] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get current month in YYYY-MM
        const now = new Date();
        const month = now.toISOString().slice(0, 7);

        // Fetch month data
        const monthRes = await axios.get(
          `http://localhost:8000/api/v1/totalmealsofmonth/${month}`,
          { withCredentials: true }
        );
        setMonthData(monthRes.data.data);

          const resLatestDate = await axios.get(
          "http://localhost:8000/api/v1/mealplan/latest",
          { withCredentials: true }
        );

        // Fetch today's data
        const todayStr = resLatestDate.data.data.date;
        const formattedDate = new Date(todayStr).toISOString().split("T")[0]; // "2025-07-04"
        setLatestDate(formattedDate);
        const res = await axios.get(
          `http://localhost:8000/api/v1/totalweights/${todayStr}`,
          { withCredentials: true }
        );
        setMealData({ ...res.data.data, date: todayStr });
        // console.log(res.data.data);
        setFetchTime(new Date().toLocaleTimeString());
      } catch (error) {
        console.error(error);
        toast.error("Error fetching dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50">
        <FiLoader className="animate-spin text-indigo-600 text-5xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">

        {/* Monthly Summary */}
        {monthData && (
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-indigo-700">
              📊 Total Meals This Month
            </h2>
            <p className="text-gray-700 mb-2">
              <span className="font-bold">Total Weight:</span>{" "}
              {monthData.totalWeight} 
            </p>
            <div className="space-y-1">
              {Object.entries(monthData.byType).map(([type, weight], idx) => (
                <p key={idx} className="text-gray-600">
                  {getMealIcon(type)}{" "}
                  <span className="capitalize">{type}:</span> {weight} 
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Daily Summary */}
        {mealData && (
          <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md space-y-4">
            <h2 className="text-2xl font-bold text-center text-indigo-700">
              🍽️ Total Meal Weights
            </h2>
            <p className="text-center text-gray-600">
              Date: {latestDate}
            </p>
            <p className="text-center text-gray-500 text-sm">
              Fetched at: {fetchTime}
            </p>

            <div className="space-y-2 text-gray-700">
              <p>
                <span className="font-semibold">Total Weight:</span> {mealData.totalWeight} 
              </p>
              <p>
                {<FiCoffee className="inline mr-1 text-amber-500" />} 
                <span className="font-semibold">Breakfast:</span> {mealData.breakfastWeight} 
              </p>
              <p>
                {<FiSun className="inline mr-1 text-orange-500" />} 
                <span className="font-semibold">Lunch:</span> {mealData.lunchWeight} 
              </p>
              <p>
                {<FiMoon className="inline mr-1 text-indigo-500" />} 
                <span className="font-semibold">Dinner:</span> {mealData.dinnerWeight} 
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TotalMealsDashboard;
