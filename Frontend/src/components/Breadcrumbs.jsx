import React from 'react';
import { Link } from 'react-router-dom';
import { MdHome, MdOutlineArrowRight } from "react-icons/md";

const Breadcrumbs = ({title}) => {
    return (
        <div className='w-full flex'>
            <span className='py-2 px-3 bg-gray-300 rounded-md border border-dashed border-indigo-500 text-base font-bold flex flex-row items-center gap-1 w-full'>
                <MdHome size={20} className='text-indigo-700 shrink-0' />
                <p className='text-indigo-700 hover:underline cursor-pointer'>
                    <Link to="/">Home</Link>
                </p>
                <MdOutlineArrowRight size={24} className='text-blue-600 shrink-0' />
                <p className='text-indigo-700 hover:underline cursor-pointer'>
                    <Link to="/posts">Posts</Link>
                </p>
                <MdOutlineArrowRight size={24} className='text-blue-600 shrink-0' />
                <p className='text-gray-700 truncate'>
                    {title}
                </p>
            </span>
        </div>
    );
};

export default Breadcrumbs;