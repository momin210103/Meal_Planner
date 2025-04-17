import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

//this is about page new new page hwllo
const About = () => {
    const [jokes,setJokes] = useState([]);

    useEffect(() => {
        axios.get('/api/jokes')
        .then((response) => {
            setJokes(response.data);
        })
        .catch((error) => {
            console.log('Error fetching jokes:', error);
        });
    }, []);
    return (
        <div className='text-5xl text-red-600'>
            <h1>About</h1>
            <p>JOKES:{jokes.length}</p>
            {
                jokes.map((joke) => (
                    <div key={joke.id} className='text-3xl text-blue-600'>
                        <h2>{joke.title}</h2>
                        <p>{joke.content}</p>
                    </div>
                ))
            }
        </div>
    );
};

export default About;