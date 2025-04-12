import React from 'react';
import Card from './card/Card';

const Acount = () => {
    return (
        <>
        <Card>
            <div className='grid grid-cols-2 gap-5 bg-gray-100 text-black font-bold'>
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
            <button className='
            px-8 py-3
            rounded-xl
            font-bold text-white
            bg-gradient-to-r from-emerald-400 via-green-500 to-lime-400
            hover:bg-gradient-to-r hover:from-emerald-500 hover:via-green-600 hover:to-lime-500
            active:scale-[0.98]
            transition-all duration-300
            shadow-lg hover:shadow-xl
            transform hover:-translate-y-0.5
            focus:outline-none focus:ring-4 focus:ring-emerald-300/50
            relative overflow-hidden
            group cursor-pointer'>
            <h1 > ADD Balance</h1>
            </button>
            </div>
        </Card>
            
        </>
    );
};

export default Acount;