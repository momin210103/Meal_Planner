import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  FiArrowLeft,
  FiCalendar,
  FiClock,
  FiCoffee,
  FiSun,
  FiMoon,
} from "react-icons/fi";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { toast } from "react-hot-toast";

const SavedMeals = () => {
  
  const [savedMeals, setSavedMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [checkedMeals, setCheckedMeals] = useState({});
  const [activeTimers, setActiveTimers] = useState(() => {
    const savedTimers = localStorage.getItem("activeTimers");
    return savedTimers ? JSON.parse(savedTimers) : {};
  });
  const [remainingTimes, setRemainingTimes] = useState({});

  // ডেট পিকার সম্পর্কিত স্টেট ও রেফারেন্স
  const [selectedDate, setSelectedDate] = useState(() => {
    const saveDate = localStorage.getItem("selectedDate");
    if (saveDate) {
      return new Date(saveDate);
    } else {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      return tomorrow;
    }
  });
const [submittedMeals, setSubmittedMeals] = useState(() => {
  try {
    const stored = localStorage.getItem('submittedMeals');
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error parsing stored submittedMeals:", error);
    localStorage.removeItem('submittedMeals');
    return [];
  }
});

useEffect(() => {
  try {
    localStorage.setItem('submittedMeals', JSON.stringify(submittedMeals));
  } catch (error) {
    console.error("Error saving submittedMeals:", error);
  }
}, [submittedMeals]);

  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef(null);

  // লোডেড ডেটের মধ্যে শুধু সিলেক্টেড ডেটের মিল ফিল্টার করব
  const filteredMeals = savedMeals.filter((mealPlan) => {
    const mealDateStr = new Date(mealPlan.date).toISOString().split("T")[0];
    const selectedDateStr = selectedDate.toISOString().split("T")[0];
    return mealDateStr === selectedDateStr;
  });
  useEffect(() => {
    localStorage.setItem("selectedDate", selectedDate.toISOString());
  }, [selectedDate]);


  useEffect(() => {
    localStorage.setItem("activeTimers", JSON.stringify(activeTimers));
  }, [activeTimers]);

  useEffect(() => {
    fetchSavedMeals();
  }, []);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setRemainingTimes((prev) => {
        const newTimes = { ...prev };
        Object.keys(activeTimers).forEach((mealPlanIndex) => {
          if (activeTimers[mealPlanIndex]) {
            const endTime = new Date(activeTimers[mealPlanIndex]);
            const now = new Date();
            const diff = endTime - now;

            if (diff <= 0) {
              newTimes[mealPlanIndex] = "Time's up!";
              setActiveTimers((prev) => {
                const newTimers = { ...prev };
                delete newTimers[mealPlanIndex];
                return newTimers;
              });
            } else {
              const hours = Math.floor(diff / (1000 * 60 * 60));
              const minutes = Math.floor(
                (diff % (1000 * 60 * 60)) / (1000 * 60)
              );
              const seconds = Math.floor((diff % (1000 * 60)) / 1000);
              newTimes[mealPlanIndex] = `${hours
                .toString()
                .padStart(2, "0")}:${minutes
                .toString()
                .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
            }
          }
        });
        return newTimes;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [activeTimers]);

  const fetchSavedMeals = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/mealplan/global",
        {
          withCredentials: true,
        }
      );
      const mealsData = response.data?.data || response.data || [];
      setSavedMeals(Array.isArray(mealsData) ? mealsData : []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching meals:", error);
      setError("Failed to fetch saved meals");
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString(undefined, options);
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

  const handleCheckboxChange = (mealPlanIndex, mealIndex) => {
    const key = `${mealPlanIndex}-${mealIndex}`;
    setCheckedMeals((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSubmit = async () => {
    const selectedMeals = Object.entries(checkedMeals)
      .filter(([, isChecked]) => isChecked)
      .map(([key]) => {
        const [planIndex, mealIndex] = key.split("-");
        return filteredMeals[planIndex]?.meals[mealIndex];
      })
      .filter(Boolean); // undefined ফিল্টার করে ফেলবে

    console.log("Selected meals:", selectedMeals); // এটা দেখো ডেভ টুলসে

    if (selectedMeals.length === 0) {
      alert("Please select at least one meal before submitting.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/dailymeal",
        {
          meals: selectedMeals,
          date: selectedDate.toISOString().split("T")[0], // YYYY-MM-DD format
        },
        { withCredentials: true }
      );
      console.log("Submission success:", response.data);
      toast.success(
        `Your selected meals for ${selectedDate.toDateString()} have been submitted successfully!`
      );
      setSubmittedMeals(selectedMeals);
      setCheckedMeals({});
    } catch (error) {
      console.error("Submission error:", error);
      alert("Submission failed. Check console for details.");
    }
  };

  // ডেট পিকার টগল
  const togglePicker = () => {
    setShowPicker(!showPicker);
  };

  // ডেট সিলেক্ট করলে আপডেট এবং পিকার লুকানো
  const handleSelect = (date) => {
    if (date) {
      setSelectedDate(date);
      setShowPicker(false);
      setCheckedMeals({}); // সিলেক্টেড মিল রিসেট করতে চাইলে
    }
  };

  // বাইরে ক্লিক করলে পিকার লুকানো
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setShowPicker(false);
      }
    };

    if (showPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPicker]);

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
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          {showPicker && (
            <div ref={pickerRef} className="mb-2 flex justify-center">
              <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={handleSelect}
                pagedNavigation
              />
            </div>
          )}

          {!filteredMeals || filteredMeals.length === 0 ? (
            <div className="text-center py-12">
              <div className="flex items-center text-indigo-600 mb-4">
                <button onClick={togglePicker}>
                  <FiCalendar className="mr-3 text-xl" />
                </button>
                <span className="font-semibold text-lg">
                  {formatDate(selectedDate)}
                </span>
              </div>

              <p className="text-gray-600 text-lg">
                No saved meals found for this date
              </p>
              <p className="text-gray-500 mt-2">Select a date to view meals.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredMeals.map((mealPlan, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 border border-indigo-100"
                >
                  <div className="flex items-center text-indigo-600 mb-4">
                    <button onClick={togglePicker}>
                      <FiCalendar className="mr-3 text-xl" />
                    </button>
                    <span className="font-semibold text-lg">
                      {formatDate(mealPlan.date)}
                    </span>
                  </div>

                  {activeTimers[index] && (
                    <div className="flex items-center space-x-2 bg-indigo-300 px-4 py-4 mb-2 rounded-lg">
                      <FiClock className="text-red-600 animate-pulse" />
                      <span className="text-red-700 font-mono font-bold ">
                        Time Remaining:
                        {remainingTimes[index] || "00:00:00"}
                      </span>
                    </div>
                  )}

                  <div className="space-y-4">
                    {mealPlan.meals &&
                      mealPlan.meals.map((meal, mealIndex) => (
                        <div
                          key={mealIndex}
                          className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
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
                            checked={
                              checkedMeals[`${index}-${mealIndex}`] || false
                            }
                            onChange={() =>
                              handleCheckboxChange(index, mealIndex)
                            }
                            className="w-5 h-5 text-indigo-600 border-black border-2 rounded focus:ring-indigo-500"
                          />
                        </div>
                      ))}
                  </div>
                </div>
              ))}

              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mt-8 gap-4">
                <button
                  onClick={handleSubmit}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg cursor-pointer w-full sm:w-auto"
                >
                  Submit Selected Meals
                </button>

                {submittedMeals.length > 0 && (
                  <div className="bg-white p-4 rounded-lg shadow-md w-full sm:w-1/2">
                    <h3 className="text-lg font-semibold mb-2 text-indigo-700">
                      ✅ Submitted Meals:
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedMeals;
