import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FiCoffee,
  FiSun,
  FiMoon,
  FiClock,
  FiCheckCircle,
} from "react-icons/fi";
import { toast } from "react-hot-toast";

const SavedMeals = () => {
  const [savedMeals, setSavedMeals] = useState([]);
  const [mealDate, setMealDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [checkedMeals, setCheckedMeals] = useState({});
  const [submittedMeals, setSubmittedMeals] = useState(() => {
    try {
      const stored = localStorage.getItem("submittedMeals");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    fetchSavedMeals();
  }, []);

  useEffect(() => {
    localStorage.setItem("submittedMeals", JSON.stringify(submittedMeals));
  }, [submittedMeals]);

  const fetchSavedMeals = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/mealplan/latest",
        { withCredentials: true }
      );
      const { date, meals } = response.data.data;
      setSavedMeals(Array.isArray(meals) ? meals : []);
      setMealDate(date);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching meals:", error);
      setError("Failed to fetch saved meals");
      setLoading(false);
    }
  };

  const getMealIcon = (type) => {
    switch (type.toLowerCase()) {
      case "breakfast":
        return <FiCoffee className="text-amber-500" />;
      case "lunch":
        return <FiSun className="text-orange-500" />;
      case "dinner":
        return <FiMoon className="text-indigo-500" />;
      default:
        return <FiClock className="text-blue-500" />;
    }
  };

  const handleCheckboxChange = (index) => {
    setCheckedMeals((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleSubmit = async () => {
    const selectedMeals = savedMeals.filter((_, idx) => checkedMeals[idx]);

    if (selectedMeals.length === 0) {
      toast.error("Please select at least one meal before submitting.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/dailymeal",
        {
          meals: selectedMeals,
          date: mealDate ? mealDate.split("T")[0] : new Date().toISOString().split("T")[0],
        },
        { withCredentials: true }
      );

      toast.success("Meals submitted successfully!");
      console.log("Submission success:", response.data);
      setSubmittedMeals(selectedMeals);
      setCheckedMeals({});
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Submission failed. Check console for details.");
    }
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
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-center text-indigo-700 mb-2">
            {mealDate && (
            <p className="text-2xl font-bold text-center text-indigo-700 mb-6">
              Select Meal For: {new Date(mealDate).toDateString()}
            </p>
          )}
          </h2>
          

          {savedMeals.length === 0 ? (
            <p className="text-center text-gray-500">No meals available</p>
          ) : (
            <div className="space-y-4">
              {savedMeals.map((meal, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-indigo-100"
                >
                  <div className="p-2 bg-indigo-50 rounded-lg">
                    {getMealIcon(meal.type)}
                  </div>
                  <div className="flex-1">
                    <span className="capitalize font-medium text-gray-700">
                      {meal.type}
                    </span>
                    <p className="text-gray-600">{meal.name}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={checkedMeals[index] || false}
                    onChange={() => handleCheckboxChange(index)}
                    className="w-5 h-5 text-indigo-600 border-black border-2 rounded focus:ring-indigo-500"
                  />
                </div>
              ))}

              <button
                onClick={handleSubmit}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg mt-6"
              >
                Submit Selected Meals
              </button>

              {submittedMeals.length > 0 && (
                <div className="bg-white p-4 rounded-lg shadow-md mt-4">
                  <h3 className="text-lg font-semibold mb-2 text-green-700 flex items-center">
                    <FiCheckCircle className="mr-2" /> Submitted Meals:
                  </h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    {submittedMeals.map((meal, idx) => (
                      <li key={idx}>
                        {meal.type}: {meal.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedMeals;
