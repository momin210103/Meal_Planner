import React from 'react';
import Card from './card/Card';

const ToDayMeal = () => {
    const today = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = days[today.getDay()];
    return (
        <div>
            <Card>
                <h1 className='text-black font-bold'>Select Your Meal</h1>
                <h2>Date:{today.toLocaleDateString()}</h2>
                <h2>{dayName}</h2>
                <div className='flex relative'>
                <h2>Breakfast</h2>
                <input type="checkbox" defaultChecked className="toggle toggle-accent absolute left-27 top-1"  />
                </div>
                <div className='flex relative'>
                <h2>Launch</h2>
                <input type="checkbox" defaultChecked className="toggle toggle-accent absolute left-25 top-1"  />
                </div>
                <div className='flex relative'>
                <h2>Dinner</h2>
                <input type="checkbox" defaultChecked className="toggle toggle-accent absolute left-25 top-1"  />
                </div>
            </Card>
        </div>
    );
};

export default ToDayMeal;