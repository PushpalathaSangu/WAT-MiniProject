import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.png';
import './navbar.css';
import WAT_ABSTRACT from '../../assets/WAT_ABSTRACT.pdf';


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'About', to: '/' },
    { name: 'Login', to: '/login' },
  ];

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo and Title */}
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-10 w-10 mr-2 rounded-full border-2 border-white" />
          <h1 className="text-xl font-bold">Weekly Assessment Tests</h1>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
            {isOpen ? (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>

        {/* Navigation Links */}
        <div className={`md:flex md:space-x-6 ${isOpen ? 'block mt-4' : 'hidden'} md:mt-0`}>
          {navItems.map(({ name, to }) => (
            <Link
              key={name}
              to={to}
              className={`block md:inline-block px-3 py-2 transition duration-200 hover:text-yellow-300 ${
                location.pathname === to ? 'active-link' : ''
              }`}
              onClick={() => setIsOpen(false)}
            >
              {name}
            </Link>
          ))}

          {/* Register Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsRegisterOpen(!isRegisterOpen)}
              className="block md:inline-block px-3 py-2 transition duration-200 hover:text-yellow-300 focus:outline-none"
            >
              Register
            </button>
            {isRegisterOpen && (
              <div className="absolute mt-2 w-48 bg-white text-black rounded-md shadow-lg z-50">
                <Link
                  to="/studentregister"
                  className="block px-4 py-2 hover:bg-gray-200"
                  onClick={() => {
                    setIsRegisterOpen(false);
                    setIsOpen(false);
                  }}
                >
                  Student
                </Link>
                <Link
                  to="/facultyregister"
                  className="block px-4 py-2 hover:bg-gray-200"
                  onClick={() => {
                    setIsRegisterOpen(false);
                    setIsOpen(false);
                  }}
                >
                  Faculty
                </Link>
                <Link
                  to="/adminregister"
                  className="block px-4 py-2 hover:bg-gray-200"
                  onClick={() => {
                    setIsRegisterOpen(false);
                    setIsOpen(false);
                  }}
                >
                  Admin
                </Link>
              </div>
            )}
          </div>

          {/* Download Link */}
          <button className="bg-yellow-400 text-black px-4 py-2 rounded-md hover:bg-yellow-500 transition duration-300">
            <a
              href={WAT_ABSTRACT}
              target="_blank"
              rel="noopener noreferrer"
              className="block md:inline-block"
            >
              WAT TIMETABLE
            </a>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
