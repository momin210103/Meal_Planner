import React, { useEffect, useState } from 'react';


const Countdown = ({initialTime}) => {
    const [timeLeft,setTimeLeft] = useState(0);
    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            const difference = initialTime - now; // Difference in milliseconds
            return Math.floor(difference / 1000); // Convert to seconds
        };

        setTimeLeft(calculateTimeLeft());

        // Update the countdown every second
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 0) {
                    clearInterval(timer);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        // Cleanup the interval on component unmount
        return () => clearInterval(timer);
    }, [initialTime]);
    //second to minutes and hour
    const formatTime = (seconds) =>{
        const hours = Math.floor(seconds/3600)
        const minutes = Math.floor((seconds % 3600)/60);
        const scnd = seconds%60;
        return `${hours.toString().padStart(2,"0")}:`+`${minutes.toString().padStart(2,"0")}:`+`${scnd.toString().padStart(2,"0")}:`
    }
    return (
        <h1>
            Time Left:<span className='font-bold text-red-600'>{formatTime(timeLeft)}</span> to select your meal
        </h1>
    );
};

export default Countdown;