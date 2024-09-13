import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FcSearch } from "react-icons/fc";
import { CgMenuRight } from "react-icons/cg";
import { IoClose, IoHomeOutline, IoCreateOutline, IoLogOutOutline } from "react-icons/io5";
import { LuUser } from "react-icons/lu";
import { TbUserCheck } from "react-icons/tb";
import logo from '../assets/logo.png';

const NavBar = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const isLoggedIn = true;

  const toggleMobileNav = () => {
    setIsMobileNavOpen(prevState => !prevState);
  };

  const renderNavLinks = () => (
    <>
      {!isLoggedIn ? (
        <button className="bg-white text-blue-700 hover:bg-blue-800 hover:text-white font-bold py-2 px-4 rounded duration-200 shadow-md">
          <Link to="/login" onClick={toggleMobileNav} className='flex items-center gap-[6px]'><TbUserCheck size={22} />Sign In</Link>
        </button>
      ) : (
        <>
          <button className='border-b-2 border-transparent hover:shadow-xl hover:border-[#001F3F] duration-200 p-2'>
            <Link to="/" onClick={toggleMobileNav} className='flex items-center gap-[6px]'><IoHomeOutline size={18} /> Home</Link>
          </button>
          <button className='border-b-2 border-transparent hover:shadow-xl hover:border-[#001F3F] duration-200 p-2'>
            <Link to="/post/create" onClick={toggleMobileNav} className='flex items-center gap-[6px]'><IoCreateOutline size={20} /> Create</Link>
          </button>
          <button className='border-b-2 border-transparent hover:shadow-xl hover:border-[#001F3F] duration-200 p-2'>
            <Link to="/profile" onClick={toggleMobileNav} className='flex items-center gap-[6px]'><LuUser size={20} /> Profile</Link>
          </button>
          <button className="bg-transparent hover:bg-red-500 text-white font-semibold hover:text-white py-2 px-2 border border-white hover:border-transparent rounded flex items-center gap-[6px]" onClick={toggleMobileNav}>
            <IoLogOutOutline size={20} /> Logout
          </button>
        </>
      )}
    </>
  );

  return (
    <nav className="h-[70px] flex items-center justify-between px-2 py-2 bg-[#2e9ad0] text-white shadow-xl lg:gap-4">
      {/* Logo and Branding */}
      <div className="flex items-center mx-2">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="logo" className="w-[70px] inline" />
          <h1 className="hidden text-2xl font-bold min-[1020px]:inline ml-2 font-ubuntu">Blogs</h1>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="max-w-[400px] w-full relative flex items-center md:w-[30%] lg:w-[400px] h-10 rounded-lg shadow-lg bg-white overflow-hidden">
        <div className="grid place-items-center h-full w-12 text-gray-500">
          <FcSearch size={20} />
        </div>
        <input
          className="h-full w-full outline-none text-md text-black pr-2"
          type="text"
          id="search"
          placeholder="Search Blog..."
        />
      </div>

      <div className={`font-semibold relative mx-2`}>
        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-3">
          {renderNavLinks()}
        </ul>

        {/* Mobile Navigation Toggle Button */}
        <button
          className="md:hidden mt-2"
          onClick={toggleMobileNav}
          aria-expanded={isMobileNavOpen}
          aria-label="Toggle navigation menu"
        >
          {isMobileNavOpen ? (
            <IoClose size={26} className='text-[#000a30]' />
          ) : (
            <CgMenuRight size={26} className='text-[#000a30]' />
          )}
        </button>

        {/* Mobile Navigation Menu */}
        <ul
          className={`duration-500 flex justify-center items-center ${isMobileNavOpen ? 'translate-x-0 opacity-100 pointer-events-auto' : 'translate-x-[-30%] opacity-0 pointer-events-none -z-10'} md:hidden gap-2 flex-col absolute right-2 top-16 bg-[#2e9ad0ce] py-2 px-4 shadow-xl rounded-md w-[150px]`}
        >
          {renderNavLinks()}
        </ul>

      </div>
    </nav>
  );
};

export default NavBar;