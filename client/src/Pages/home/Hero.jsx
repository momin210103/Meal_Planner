import React from 'react';
import HeroImg from '../../assets/HeroImg.png'
import HeroImg2 from '../../assets/Hero2.jpg'
const Hero = () => {
    return (
        <section className='h-screen relative bg-cover bg-center text-white' style={{backgroundImage:`url(${HeroImg})`}}>
            <div className='pt-24 md:md:pt-48 text-center space-x-8 md:w-1/2 mx-auto text-white font-bold lg:leading-snug'>
                <h1 className='text-4xl lg:text-6xl md:pt-48'>Welcome To Our MealPlaner</h1>
                <p>Smart Plan Save Time</p>
            </div>
        </section>
    );
};

export default Hero;