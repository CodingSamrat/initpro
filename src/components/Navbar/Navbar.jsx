import Hamburger from "hamburger-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const handleNav = () => {
    setNav(!nav);
  };
  return (
    <div className='bg-slate-200 flex items-center justify-between  p-3'>
      <div>
        {/* <img src="" alt="" className=""/> */}
        <a href='/'>
          <h1 className='text-xl hover:scale-105 cursor-pointer'>INITPRO</h1>
        </a>
      </div>
      <nav className='hidden md:flex md:justify-between md:gap-8 md:mr-4'>
        <Link
          to='/'
          className='mt-1 w-9 h-9 pl-1  hover:border-spacing-0 hover:scale-110 hover:underline transition-all duration-500'>
          <p className='text-xl text-slate-700'>Home</p>
        </Link>
        <Link
          to='/about'
          className='mt-1 w-9 h-9 pl-1  hover:border-spacing-0 hover:scale-110 hover:underline transition-all duration-500'>
          <p className='text-xl text-slate-700'>About</p>
        </Link>
      </nav>
      <div
        className={
          !nav
            ? "hidden"
            : "absolute right-1 mt-48 bg-purple-400 px-5 duration-300"
        }>
        <ul className=''>
          <Link to='/'>
            <li className='p-4 font-semibold text-gray-800 text-md hover:scale-125 active:scale-75 hover:translate-y-px transition-all duration-300 ease-in-out'>
              Home
            </li>
          </Link>
          <hr />
          <Link to='/about'>
            <li className='p-4 font-semibold text-gray-800 text-md hover:scale-125 active:scale-75 hover:translate-y-px transition-all duration-300 ease-in-out'>
              About
            </li>
          </Link>
        </ul>
      </div>
      <div className='flex items-center gap-4'>
        <button className='font-light text-gray-700 px-3 py-2 rounded-full bg-purple-400 hover:bg-purple-400 hover:scale-105 active:bg-[#c271f49f] transition-all duration-300'>
          Sign Up
        </button>
        <div
          className='md:invisible inline-block  rounded-full ml-1.5 hover:bg-[#c580f04e] active:bg-[#c271f49f] duration-300 transition-all'
          onClick={handleNav}>
          <Hamburger color='#5521c595' />
        </div>
      </div>
    </div>
  );
};
export default Navbar;
