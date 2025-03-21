import React from 'react';
import Card from './card/Card';

const Acount = () => {
    return (
        <>
        <Card>
            <div className='grid grid-cols-2 gap-5 md:grid-cols-3 p-2'>
            <div>
            <h1>Current Balance</h1>
            <Card/>
            </div>
            <div>
            <h1> Previous Balance</h1>
            <Card/>
            </div>
            <div>
            <h1>Total Meal</h1>
            <Card/>
            </div>
            <div>
            <h1>Meal Cost</h1>
            <Card/>
            </div>
            <div>
            <h1> Due Amount</h1>
            <Card/>
            </div>
            </div>
        </Card>
            
        </>
    );
};

export default Acount;