import React, { useState } from "react";
import axios from "axios";

const MealWeightEditor = ({ onSave }) => {
  const getStoredWeights = () => {
    const stored = localStorage.getItem("mealWeights");
    return stored ? JSON.parse(stored) : { breakfast: 1, lunch: 1, dinner: 1 };
  };

  const [weights, setWeights] = useState(() => getStoredWeights());
  const [saving, setSaving] = useState(false);

  const handleChange = (type, value) => {
    const newWeights = {
      ...weights,
      [type]: parseFloat(value) || 0,
    };
    setWeights(newWeights);
    localStorage.setItem("mealWeights", JSON.stringify(newWeights));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      for (const type of Object.keys(weights)) {
        await axios.post(
          "http://localhost:8000/api/v1/mealplan/weight",
          { type, weight: weights[type] },
          { withCredentials: true }
        );
      }
      if (onSave) onSave(weights);
      alert("✅ Meal weights saved successfully!");
    } catch (error) {
      console.error("❌ Failed to save weights:", error);
      alert("Error saving weights");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 space-y-6">
      <h2 className="text-xl font-bold text-gray-700 text-center">🍽️ Meal Weight Editor</h2>
      <div className="space-y-4">
        {["breakfast", "lunch", "dinner"].map((meal) => (
          <div key={meal} className="flex justify-between items-center">
            <label className="capitalize text-gray-600">{meal}</label>
            <input
              type="number"
              step="0.1"
              min="0"
              value={weights[meal]}
              onChange={(e) => handleChange(meal, e.target.value)}
              className="w-24 px-3 py-1 border rounded-xl text-center text-sm focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
        ))}
      </div>
      <button
        onClick={handleSave}
        disabled={saving}
        className={`w-full py-2 px-4 rounded-xl text-white font-semibold ${
          saving ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {saving ? "Saving..." : "Save"}
      </button>
    </div>
  );
};

export default MealWeightEditor;
