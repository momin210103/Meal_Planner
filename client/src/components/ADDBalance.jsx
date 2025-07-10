import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import PendingCard from './BalanceDetails';
import axios from 'axios';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { MdArrowBack } from 'react-icons/md';
import toast from 'react-hot-toast';
import ConfirmModal from './ConfirmModal';

const ADDBalance = () => {
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    // const [showDetails, setShowDetails] = useState(false);
    const navigate = useNavigate();

    // Load pending state from localStorage on mount
    useEffect(() => {
        const pending = localStorage.getItem('pendingDeposit');
        if (pending) {
            const { amount, date } = JSON.parse(pending);
            setAmount(amount);
            setDate(date);
            // setShowDetails(true);
        }
    }, []);
    const handleConfirmAddBalance = async () => {
        try {
            const response = await axios.put(
                "http://localhost:8000/api/v1/addbalance",
                { amount: Number(amount), date },
                { withCredentials: true }
            );
            console.log("Response:", response.data);
            toast.success("Your Balance Add successfully wait for Manager Approved")

            // Save to localStorage
            // localStorage.setItem('pendingDeposit', JSON.stringify({ amount, date }));
            // setShowDetails(true);
        } catch (error) {
            console.error("Error adding balance:", error);
            alert(error.response?.data?.message || "Failed to add balance.");
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsModalOpen(true);

    };

    const handleBack = () => {
        navigate('/dashboard', { state: { amount, date } });
    };

    // Optionally clear pending after manual action
    // const clearPending = () => {
    //     localStorage.removeItem('pendingDeposit');
    //     setShowDetails(false);
    //     setAmount('');
    //     setDate('');
    // };

    return (
        <div className="w-full max-w-md mx-auto mt-10 p-6 sm:p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-neutral-800 mb-6">
                💸 Add Balance
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-600 mb-1">
                        Amount
                    </label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter amount"
                        required
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 placeholder-gray-400 bg-white transition"
                    />
                </div>
                <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-600 mb-1">
                        Date
                    </label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 bg-white transition"
                    />
                </div>
                <div className="space-y-3">
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                        <AiOutlinePlusCircle size={20} />
                        Submit
                    </button>
                    <button
                        type="button"
                        onClick={handleBack}
                        className="w-full bg-gray-200 hover:bg-gray-300 text-black font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                        <MdArrowBack size={20} />
                        Back to Dashboard
                    </button>
                </div>
            </form>
            <ConfirmModal
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                title="Confirm Add Balance"
                description={`Add ₹${amount} for ${date}?`}
                onConfirm={handleConfirmAddBalance}
            />

            {/* {showDetails && Number(amount) > 0 && (
                <div className="relative">
                    <PendingCard amount={amount} date={date} />
                    <button
                        onClick={clearPending}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs hover:bg-red-600"
                    >
                        Clear
                    </button>
                </div>
            )} */}
        </div>
    );
};

export default ADDBalance;
