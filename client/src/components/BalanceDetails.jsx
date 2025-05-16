import React from 'react';
import Card from './card/Card';

const BalanceDetails = ({ amount }) => {
    return (
        <Card className="mt-6 p-6 bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Current Balance</h3>
                    <p className="text-3xl font-bold text-green-600">
                        ${amount?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                </div>
                <div className="bg-green-200 p-3 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
            </div>
        </Card>
    );
};

export default BalanceDetails;
