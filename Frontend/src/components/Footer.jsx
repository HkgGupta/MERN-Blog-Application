import React from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedinIn, FaFacebookF, FaInstagram } from "react-icons/fa";
import { TbBrandGithubFilled } from "react-icons/tb";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
    return (
        <div className='w-full h-[150px] bg-[#000a30] flex flex-col items-center justify-center px-2 py-5 gap-3 font-ubuntu'>
            <div className='flex justify-center items-center gap-3 text-xl md:text-2xl text-white '>
                <Link className='border rounded-full p-2 hover:text-black hover:bg-white duration-300' to="/">
                    <TbBrandGithubFilled />
                </Link>
                <Link className='border rounded-full p-2 hover:text-white hover:bg-blue-600' to="/">
                    <FaLinkedinIn />
                </Link>
                <Link className='border rounded-full p-2 hover:text-blue-600 hover:bg-white' to="/">
                    <FaFacebookF />
                </Link>
                <Link className='border rounded-full p-2 hover:text-white hover:bg-gradient-to-br from-pink-700 to-violet-700' to="/">
                    <FaInstagram />
                </Link>
                <Link className='border rounded-full p-2 hover:text-white hover:bg-black' to="/">
                    <FaXTwitter />
                </Link>
            </div>
            <div>
                <p className='text-center text-white text-base'>Made with ❤️ by <Link to="https://github.com/HkgGupta/" className='text-blue-400'>Hkg</Link></p>
            </div>
            <div>
                <p className='text-center text-white text-sm'>Copyright &copy; 2024 | <Link to="/" className='text-blue-400'>Blogs</Link> | All Rights Reserved.</p>
            </div>
        </div>
    );
};

export default Footer;