import React from 'react';
import Card from './card/Card';

const BalanceDetails = ({ amount }) => {
    return (
        <Card className="mt-6 p-4 bg-green-100 border border-green-400 rounded">
            <h3 className="text-lg font-semibold"></h3>
            <p><strong>{amount}</strong></p>
        </Card>
    );
};

export default BalanceDetails;
