import React from 'react';
import HeroImg from '../../assets/HeroImg.png'
import { Link } from 'react-router';

const Hero = () => {
    return (
        <section className='flex flex-col md:flex-row min-h-screen w-full'>
            <div className='bg-[#d4cec8] rounded-2xl p-8 md:p-12 lg:p-16 text-center md:text-left md:w-1/2 mx-auto text-black font-bold'>
                <div className='space-y-6 md:pt-12 lg:pt-24 max-w-2xl mx-auto'>
                    <h1 className='text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight'>
                        Welcome To Our MealPlaner
                    </h1>
                    <p className='text-lg sm:text-xl lg:text-2xl'>
                        Smart Plan Save Time
                    </p>
                    <div className='flex gap-4 justify-center md:justify-start'>
                        <Link to="/login">
                            <button className="bg-green-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 hover:text-black transition duration-300 cursor-pointer text-base sm:text-lg">
                                Get Started
                            </button>
                        </Link>
                        <Link to="/messregister">
                            <button className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 hover:text-black transition duration-300 cursor-pointer text-base sm:text-lg">
                                Create Your Mess
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className='relative bg-cover bg-center text-white h-[50vh] md:h-screen w-full md:w-1/2 rounded-2xl' 
                 style={{backgroundImage:`url(${HeroImg})`}}>
            </div>
        </section>
    );
};

export default Hero;