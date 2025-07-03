import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import BalanceDetails from './BalanceDetails'; // import BalanceDetails
import axios from 'axios';

const ADDBalance = () => {
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [showDetails, setShowDetails] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    const response = await axios.put(
    "http://localhost:8000/api/v1/addbalance",
    { amount: Number(amount), date: date },
    { withCredentials: true }
);  
    console.log("Response:", response.data);
    setShowDetails(true);
    } catch (error) {
        console.error("Error adding balance:", error);
        alert(error.response?.data?.message || "Failed to add balance.");
    }
};


    const handleBack = () => {
        navigate('/dashboard',{
            state:{amount,date}//pass the values to the dashboard
        });
    };

    return (
        <div className="w-full max-w-md mx-auto mt-4 sm:mt-8 md:mt-10 p-4 sm:p-6 bg-white rounded-xl shadow-lg border border-gray-200">
            <h2 className="text-xl sm:text-2xl text-black font-bold text-center mb-4 sm:mb-6">Add Balance</h2>
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <div>
                    <label htmlFor="amount" className="block text-sm sm:text-base font-semibold mb-1 text-gray-700">Amount</label> 
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter amount"
                        required
                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 placeholder-gray-400 bg-white text-sm sm:text-base"
                    />
                </div>
                <div>
                    <label htmlFor="date" className="block text-sm sm:text-base font-semibold mb-1 text-gray-700">Date</label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 bg-white text-sm sm:text-base"
                    />
                </div>
                <div className="space-y-2 sm:space-y-3">
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 sm:py-2.5 rounded-md transition-colors text-sm sm:text-base"
                    >
                        Submit
                    </button>
                    <button
                        type="button"
                        onClick={handleBack}
                        className="w-full bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 sm:py-2.5 rounded-md transition-colors text-sm sm:text-base"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </form>

            {showDetails && (
                <div className="mt-4 sm:mt-6">
                    <BalanceDetails amount={amount} date={date} />
                </div>
            )}
        </div>
    );
};

export default ADDBalance;
