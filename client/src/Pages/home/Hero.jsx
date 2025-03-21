import React from 'react';
import HeroImg from '../../assets/HeroImg.png'
const Hero = () => {
    const loginpage = ()=>{
        
    }
    return (
        <section className='md:flex'>
            <div className='pt-24 md:md:pt-48 text-center space-x-8 md:w-1/2 mx-auto text-black font-bold lg:leading-snug'>
                <h1 className='text-4xl lg:text-6xl md:pt-48'>Welcome To Our MealPlaner</h1>
                <p>Smart Plan Save Time</p>
                <button className='cursor-pointer bg-green-700 rounded-2xl p-2 my-2' onClick={loginpage}>Get Started </button>
            </div>
            <div className='relative bg-cover bg-center text-white h-screen w-full md:w-1/2 rounded-2xl' style={{backgroundImage:`url(${HeroImg})`}}>
            </div>
        </section>
    );
};

export default Hero;