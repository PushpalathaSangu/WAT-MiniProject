<<<<<<< HEAD


import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  FaUserCircle, 
  FaSignOutAlt, 
  FaBars,
  FaChalkboardTeacher,
  FaPlusCircle,
  FaListAlt,
  FaUserGraduate,
  FaUserEdit  // Import the FaUserEdit icon
} from 'react-icons/fa';

export default function FacultySidebar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('faculty')) || { name: 'F' };
  const firstLetter = user?.name?.charAt(0).toUpperCase() || 'F';
=======
import React, { useState, useEffect } from 'react';
import { FaUserCircle, FaPlusCircle, FaEdit, FaSignOutAlt, FaEye, FaChalkboardTeacher } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';

const FacultySidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [facultyName, setFacultyName] = useState('');

  useEffect(() => {
    const storedName = localStorage.getItem('facultyName');
    if (storedName) {
      setFacultyName(storedName);
    }
  }, []);

  const initial = facultyName ? facultyName.charAt(0).toUpperCase() : 'F';
>>>>>>> f6835e94c53861a7cc75875b691904592825d8f8

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem('faculty');
<<<<<<< HEAD
=======
      localStorage.removeItem('facultyName');
>>>>>>> f6835e94c53861a7cc75875b691904592825d8f8
      localStorage.removeItem('token');
      navigate('/');
    }
  };

<<<<<<< HEAD
  // Navigation items
  const navItems = [
    { label: 'Faculty', icon: <FaChalkboardTeacher />, path: '/faculty-dashboard' },
    { label: 'Profile', icon: <FaUserCircle />, path: '/faculty/profile' },
    { label: 'Update Profile', icon: <FaUserEdit />, path: '/faculty/update-profile' }, // Added update profile
    { label: 'Create WAT', icon: <FaPlusCircle />, path: '/faculty/mcqs' },
    { label: 'View WATs', icon: <FaListAlt />, path: '/faculty/view-wats' },
    { label: 'Student Details', icon: <FaUserGraduate />, path: '/faculty/students-details' }
  ];

  return (
    <>
      {/* Hamburger for small screens */}
      <div className="md:hidden bg-blue-600 p-2 flex justify-between items-center text-white">
        <div className="text-xl font-semibold">Faculty Panel</div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          <FaBars className="text-2xl" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? 'block' : 'hidden'
        } md:block bg-blue-600 w-64 flex-shrink-0 p-4 overflow-y-auto`}
      >
        {/* Avatar */}
        <div className="flex flex-col items-center pb-4 border-b border-blue-300">
          <div className="bg-white text-blue-600 rounded-full w-20 h-20 flex items-center justify-center text-3xl font-semibold shadow-lg transition duration-300 ease-in-out hover:scale-110 hover:shadow-xl">
            {firstLetter}
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="mt-3 flex flex-col space-y-2">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                navigate(item.path);
                setSidebarOpen(false);
              }}
              className={`flex items-center gap-3 px-3 py-2 text-left rounded transition ${
                location.pathname === item.path
                  ? 'bg-white text-blue-900 font-semibold shadow-md'
                  : 'text-white hover:bg-blue-200 hover:text-blue-900'
              }`}
            >
              {item.icon} {item.label}
            </button>
          ))}

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 text-left rounded hover:bg-red-200 text-red-100 hover:text-red-800 transition"
=======
  const handleNavClick = (path) => {
    navigate(path);
    if (setSidebarOpen) {
      setSidebarOpen(false); // Auto close on mobile
    }
  };

  return (
    <div className={`bg-blue-600 text-white p-4 flex flex-col justify-between transition-all duration-300 
      ${sidebarOpen ? 'absolute z-50 h-full w-64' : 'hidden'} md:block md:relative md:w-64`}>
      
      <div>
        <div className="flex justify-center mb-6">
          <div className="bg-white text-blue-500 rounded-full h-16 w-16 flex items-center justify-center text-2xl font-bold">
            {initial}
          </div>
        </div>

        <h2 className="text-xl font-semibold text-center mb-6">Faculty Panel</h2>

        {/* Faculty Dashboard Link */}
        <Link
          to="/faculty-dashboard"
          onClick={() => handleNavClick('faculty-dashboard')}
          className="flex items-center gap-2 px-3 py-2 mb-2 rounded hover:bg-white hover:text-blue-500 transition"
        >
          <FaChalkboardTeacher /> Faculty
        </Link>

        <Link
          to="/faculty/profile"
          onClick={() => handleNavClick('/faculty/profile')}
          className="flex items-center gap-2 px-3 py-2 rounded hover:bg-white hover:text-blue-500 mb-2"
        >
          <FaUserCircle /> Profile
        </Link>

        <div
          onClick={() => handleNavClick('/create-wat')}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`flex items-center gap-2 px-3 py-2 mb-2 ${isHovered ? 'bg-white text-blue-500' : ''} rounded cursor-pointer hover:bg-gray-100 transition`}
        >
          <FaPlusCircle /> Create WAT
        </div>

        <nav className="flex flex-col space-y-1">
          <Link to="/faculty/view-wats" onClick={() => handleNavClick('/faculty/view-wats')} className="flex items-center gap-2 px-3 py-2 rounded hover:bg-white hover:text-blue-500">
            <FaEye /> View WATs
          </Link>

          <Link to="/faculty/update-profile" onClick={() => handleNavClick('/faculty/update-profile')} className="flex items-center gap-2 px-3 py-2 rounded hover:bg-white hover:text-blue-500">
            <FaEdit /> Update Profile
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 rounded hover:bg-white hover:text-blue-500 w-full text-left"
>>>>>>> f6835e94c53861a7cc75875b691904592825d8f8
          >
            <FaSignOutAlt /> Logout
          </button>
        </nav>
      </div>
<<<<<<< HEAD
    </>
  );
}
=======
    </div>
  );
};

export default FacultySidebar;
>>>>>>> f6835e94c53861a7cc75875b691904592825d8f8
