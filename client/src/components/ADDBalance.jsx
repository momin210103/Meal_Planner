import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import BalanceDetails from './BalanceDetails'; // import BalanceDetails

const ADDBalance = () => {
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [showDetails, setShowDetails] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowDetails(true); // Show after submit
    };

    const handleBack = () => {
        navigate('/dashboard',{
            state:{amount,date}//pass the values to the dashboard
        });
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
            <h2 className="text-2xl font-bold text-center mb-6">Add Balance</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="amount" className="block text-sm font-semibold mb-1">Amount</label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter amount"
                        required
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="date" className="block text-sm font-semibold mb-1">Date</label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition-colors"
                >
                    Submit
                </button>
                <button
                    type="button"
                    onClick={handleBack}
                    className="w-full mt-2 bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 rounded-md transition-colors"
                >
                    Back to Dashboard
                </button>
            </form>

            {showDetails && <BalanceDetails amount={amount} date={date} />}
        </div>
    );
};

export default ADDBalance;
