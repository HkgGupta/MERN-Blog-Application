import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className='w-full flex flex-col items-center gap-5 py-5'>
            <p className='text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-1 md:mb-2'>Welcome to my blog</p>
            <div className='w-[90%] h-fit flex flex-col justify-center items-center shadow-lg rounded-xl overflow-hidden gap-2 bg-white p-5'>
                <p className='text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-1 md:mb-2'>Posts</p>
                <Link to="/posts" className='py-2 px-3 bg-indigo-700 text-white font-bold rounded-xl'>View All Posts</Link>
            </div>
        </div>
    );
};

export default Home;