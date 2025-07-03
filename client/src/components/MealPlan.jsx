import React, { useState } from "react";
import axios from "axios";
import {
  FiCheckCircle,
  FiAlertCircle,
  FiSunrise,
  FiSun,
  FiMoon,
  FiArrowLeft,
  FiClock,
} from "react-icons/fi";
import MealWeightEditor from "./MealWeightEditor";

import { useNavigate } from "react-router";

const MealPlan = () => {
  const navigate = useNavigate();
  const [mealPlan, setMealPlan] = useState({
    breakfast: { name: "" },
    lunch: { name: "" },
    dinner: { name: "" },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: null, message: "" });
  // const [date,setDate] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMealPlan((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        name: value,
      },
    }));
  };

  const handleSubmit = async () => {
    if (
      !mealPlan.breakfast.name &&
      !mealPlan.lunch.name &&
      !mealPlan.dinner.name
    ) {
      setStatus({ type: "error", message: "Please enter at least one meal" });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: null, message: "" });

    try {
      // Proper tomorrow handling with timezone adjustment
      const now = new Date();
      now.setDate(now.getDate() + 1);
      now.setHours(0, 0, 0, 0);
      const offset = now.getTimezoneOffset() * 60000;
      const adjustedDate = new Date(now.getTime() - offset);
      const formattedDate = adjustedDate.toISOString().split("T")[0];

      // Create meals array
      const mealsArray = [];
      if (mealPlan.breakfast.name.trim()) {
        mealsArray.push({
          type: "breakfast",
          name: mealPlan.breakfast.name.trim(),
        });
      }
      if (mealPlan.lunch.name.trim()) {
        mealsArray.push({ type: "lunch", name: mealPlan.lunch.name.trim() });
      }
      if (mealPlan.dinner.name.trim()) {
        mealsArray.push({ type: "dinner", name: mealPlan.dinner.name.trim() });
      }

      const response = await axios.post(
        "http://localhost:8000/api/v1/mealplan",
        {
          date: formattedDate,
          meals: mealsArray,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setStatus({
        type: "success",
        message: response.data.message || "Meal plan saved successfully!",
      });

      setMealPlan({
        breakfast: { name: "" },
        lunch: { name: "" },
        dinner: { name: "" },
      });
    } catch (err) {
      console.error("Error saving meal plan:", err);
      if (err.response?.status === 403) {
        setStatus({
          type: "error",
          message:
            "Access denied. Only managers can create or update meal plans.",
        });
      } else if (err.response?.data?.message) {
        setStatus({
          type: "error",
          message: err.response.data.message,
        });
      } else {
        setStatus({
          type: "error",
          message: "Failed to save meal plan. Please try again.",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  // Get tomorrow's date nicely formatted
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const options = { year: "numeric", month: "short", day: "numeric" };
const tomorrowFormatted = tomorrow.toLocaleDateString(undefined, options);


  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
        >
          <FiArrowLeft className="mr-2" />
          <span className="text-sm sm:text-base font-medium">Back</span>
        </button>

        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-2 text-gray-800 flex items-center space-x-2">
  <span>Set Meal</span>
  <FiClock className="text-gray-500" />
  <span className="text-sm sm:text-base text-gray-500">{tomorrowFormatted}</span>
</h2>


          <div className="space-y-4 sm:space-y-6">
            {/* Time Selection Section */}

            <div className="flex items-start space-x-3">
              <FiSunrise className="text-yellow-500 text-xl mt-2" />
              <div className="flex-1">
                <label
                  htmlFor="breakfast"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Breakfast
                </label>
                <input
                  id="breakfast"
                  name="breakfast"
                  type="text"
                  placeholder="What's for breakfast?"
                  value={mealPlan.breakfast.name}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base placeholder-black text-black"
                />
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <FiSun className="text-orange-500 text-xl mt-2" />
              <div className="flex-1">
                <label
                  htmlFor="lunch"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Lunch
                </label>
                <input
                  id="lunch"
                  name="lunch"
                  type="text"
                  placeholder="What's for lunch?"
                  value={mealPlan.lunch.name}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base placeholder-black text-black"
                />
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <FiMoon className="text-indigo-500 text-xl mt-2" />
              <div className="flex-1">
                <label
                  htmlFor="dinner"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Dinner
                </label>
                <input
                  id="dinner"
                  name="dinner"
                  type="text"
                  placeholder="What's for dinner?"
                  value={mealPlan.dinner.name}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base placeholder-black text-black"
                />
              </div>
            </div>
          </div>

          {status.type && (
            <div
              className={`mt-4 p-3 rounded-md ${
                status.type === "success"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              <div className="flex items-center text-sm sm:text-base">
                {status.type === "success" ? (
                  <FiCheckCircle className="mr-2 flex-shrink-0" />
                ) : (
                  <FiAlertCircle className="mr-2 flex-shrink-0" />
                )}
                {status.message}
              </div>
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`mt-6 w-full py-2 sm:py-3 px-4 rounded-md font-medium transition-all duration-200 ${
              isSubmitting
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 active:scale-[0.98]"
            } text-white shadow-md text-sm sm:text-base`}
          >
            {isSubmitting ? "Saving..." : "Save Meal Plan"}
          </button>
        </div>
        <MealWeightEditor />
      </div>
    </div>
  );
};

export default MealPlan;
