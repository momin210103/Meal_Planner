import React from 'react';

const BalanceDetails = ({ amount, date }) => {
    return (
        <div className="mt-6 p-4 bg-green-100 border border-green-400 rounded">
            <h3 className="text-lg font-semibold">Balance Summary</h3>
            <p>You entered: <strong>{amount}</strong> units</p>
            <p>Date: <strong>{date}</strong></p>
        </div>
    );
};

export default BalanceDetails;
