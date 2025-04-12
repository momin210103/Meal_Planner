import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const ADDBalance = () => {
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // You can handle the form submission logic here
        console.log('Balance:', amount);
        console.log('Date:', date);
        // Reset form
        setAmount('');
        setDate('');
    };
    const handleBack = () =>{
        navigate('/dashboard');
    }

    return (
        <div className="max-w-md mx-auto p-4 bg-white rounded-xl shadow-md">
            <h2 className="text-xl font-bold mb-4">Add Balance</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="amount">Amount</label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter amount"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="date">Date</label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
                >
                    Submit
                </button>
                <button
                    type="button"
                    onClick={handleBack}
                    className="w-full mt-2 bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 rounded-md transition-colors cursor-pointer"
                >
                    Back to Dashboard
                </button>
            </form>
        </div>
    );
};

export default ADDBalance;
