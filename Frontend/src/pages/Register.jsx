import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RiLockPasswordLine } from "react-icons/ri";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { MdOutlineAlternateEmail, MdOutlineMarkEmailRead, MdOutlineCall } from "react-icons/md";

const Register = () => {

    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className='w-full flex flex-col justify-center items-center font-ubuntu my-5' style={{ minHeight: 'calc(100vh - 70px - 150px)' }}>
            <div className='min-h-[80%] flex flex-col gap-4 w-[90%] sm:w-[80%] lg:w-[500px] items-center justify-center rounded-xl bg-white mx-5 px-5 py-8 shadow-md'>
                <h1 className='text-3xl font-bold mb-3'>Register</h1>
                <div className='w-full flex justify-center items-center px-5'>
                    <form action="" className='flex flex-col gap-4 w-full'>
                        <div className='flex flex-col'>
                            <div className='flex flex-row'>
                                <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-white border rounded-e-0 border-gray-300 border-e-0 rounded-s-md">
                                    <MdOutlineAlternateEmail size={20} className='text-gray-700' />
                                </span>
                                <input type="text" placeholder="Username" className='px-3 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 rounded-e-md w-full tracking-wider' />
                            </div>
                            <p className={`hidden text-red-500 text-sm pt-1 px-1`}>Username is required.</p>
                        </div>

                        <div className='flex flex-col'>
                            <div className='flex flex-row'>
                                <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-white border rounded-e-0 border-gray-300 border-e-0 rounded-s-md">
                                    <MdOutlineMarkEmailRead size={20} className='text-gray-700' />
                                </span>
                                <input type="text" placeholder="Email" className='px-3 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 rounded-e-md w-full tracking-wider' />
                            </div>
                            <p className={`hidden text-red-500 text-sm pt-1 px-1`}>Email is required.</p>
                        </div>

                        <div className='flex flex-col'>
                            <div className='flex flex-row'>
                                <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-white border rounded-e-0 border-gray-300 border-e-0 rounded-s-md">
                                    <MdOutlineCall size={20} className='text-gray-700' />
                                </span>
                                <input type="text" placeholder="Phone" className='px-3 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 rounded-e-md w-full tracking-wider' />
                            </div>
                            <p className={`hidden text-red-500 text-sm pt-1 px-1`}>Phone is required.</p>
                        </div>

                        <div className='flex flex-col h-full'>
                            <div className='flex flex-row w-full relative h-full'>

                                <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-white border rounded-e-0 border-gray-300 border-e-0 rounded-s-md">
                                    <RiLockPasswordLine size={20} className='text-gray-700' />
                                </span>

                                <span onClick={togglePasswordVisibility} className="absolute right-3 text-sm text-gray-900 cursor-pointer h-full flex items-center">
                                    {
                                        passwordVisible ? <IoMdEye size={20} className='text-gray-700' /> : <IoMdEyeOff size={20} className='text-gray-700' />
                                    }
                                </span>

                                <input type={passwordVisible ? "text" : "password"} placeholder="Password" className={`px-3 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 rounded-e-md w-full tracking-wider`} />
                            </div>
                            <p className={`hidden text-red-500 text-sm pt-1 px-1`}>Password is required.</p>
                        </div>

                        <button className='py-3 bg-blue-400 text-white text-md rounded-md font-bold uppercase tracking-wider hover:bg-blue-500 duration-200 shadow-md'>Register</button>

                        <p className='text-center text-base'>Already have an account? &nbsp;<Link to="/login" className='text-blue-500 font-bold hover:underline'>Login</Link></p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
