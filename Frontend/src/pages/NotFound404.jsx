import React from 'react';
import { Link } from 'react-router-dom';

const NotFound404 = () => {
    return (
        <div className='w-full h-[calc(100vh-220px)] flex flex-col justify-center items-center gap-3'>
            <h1 className='text-3xl font-bold'>Page Not Found</h1>
            <p className='text-lg'>The page you are looking for does not exist.</p>
            <p className='text-lg'>Please check the URL and try again.</p>
            <Link to="/" className='py-2 px-3 bg-indigo-700 text-white font-bold rounded-xl'>Go Home</Link>
        </div>
    );
};

export default NotFound404;