import React, { useState } from 'react';
import axios from 'axios';

const AddBazarList = () => {
    const [formData, setFormData] = useState({
        date: '',
        name: '',
        description: '',
        amount: ''
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.date || !formData.name || !formData.description || !formData.amount) {
            setMessage('All fields are required.');
            return;
        }

        try {
            setLoading(true);
            setMessage('');

            // const token = localStorage.getItem('accessToken'); // adjust if you store elsewhere

           await axios.post(
                'http://localhost:8000/api/v1/bazarlist/create', // adjust endpoint if needed
                {
                    date: formData.date,
                    name: formData.name,
                    description: formData.description,
                    amount: Number(formData.amount)
                },
                {
                    withCredentials: true, // include credentials for CORS
                }
            );

            setMessage('Bazar item added successfully.');
            setFormData({
                date: '',
                name: '',
                description: '',
                amount: ''
            });
        } catch (error) {
            console.error('Error adding bazar item:', error);
            setMessage(error.response?.data?.message || 'Error adding bazar item.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-6 p-4 bg-white rounded-xl shadow-md border border-gray-200">
            <h2 className="text-xl font-bold mb-4 text-center text-blue-600">Add Bazar Item</h2>
            {message && (
                <div className="mb-3 text-center text-sm text-red-500">
                    {message}
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-semibold mb-1">Date</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold mb-1">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g., Momin"
                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold mb-1">Description</label>
                    <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="e.g., Rice, Fish"
                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold mb-1">Amount (BDT)</label>
                    <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        placeholder="e.g., 1500"
                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2 rounded-md text-white font-semibold ${loading ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'} transition`}
                >
                    {loading ? 'Adding...' : 'Add Bazar Item'}
                </button>
            </form>
        </div>
    );
};

export default AddBazarList;
