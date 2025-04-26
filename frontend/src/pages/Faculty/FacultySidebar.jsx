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

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem('faculty');
      localStorage.removeItem('facultyName');
      localStorage.removeItem('token');
      navigate('/');
    }
  };

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
          >
            <FaSignOutAlt /> Logout
          </button>
        </nav>
      </div>
    </div>
  );
};

export default FacultySidebar;
