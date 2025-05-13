import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  FaUserCircle, 
  FaEdit, 
  FaSignOutAlt, 
  FaTachometerAlt, 
  FaBars,
  FaClipboardList
} from 'react-icons/fa';

export default function StudentSidebar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('student')) || { name: 'S' };
  const firstLetter = user?.name?.charAt(0).toUpperCase() || 'S';

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem('student');
      localStorage.removeItem('token');
      navigate('/');
    }
  };

  // Navigation items for student
  const navItems = [
    { label: 'Student', icon: <FaTachometerAlt />, path: '/student-dashboard' },
    { label: 'Profile', icon: <FaUserCircle />, path: '/student/profile' },
    { label: 'Update Profile', icon: <FaEdit />, path: '/student/update-profile' },
    { label: 'View WATs', icon: <FaClipboardList />, path: '/student/wats' },
    { label: 'View WATs Marks', icon: <FaClipboardList />, path: '/student/wat-marks' }
  ];

  return (
    <>
      {/* Hamburger for small screens */}
      <div className="md:hidden bg-blue-600 p-2 flex justify-between items-center text-white">
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          <FaBars className="text-2xl" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? 'block' : 'hidden'
        } md:block bg-blue-600 w-64 flex-shrink-0 p-4 overflow-y-auto mb-10`}
      >
        {/* Avatar */}
        <div className="flex flex-col items-center pb-4 border-b border-blue-300">
          <div className="bg-white text-blue-600 rounded-full w-20 h-20 flex items-center justify-center text-3xl font-semibold shadow-lg transition duration-300 ease-in-out hover:scale-110 hover:shadow-xl">
            {firstLetter}
          </div>
          <br /><br />
          <p className="text-blue-100 text-sm">{user?.email || ''}</p>
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
            className="flex items-center gap-3 px-3 py-2 text-left rounded hover:bg-red-200 text-red-100 hover:text-red-800 transition mt-4"
          >
            <FaSignOutAlt /> Logout
          </button>
        </nav>
      </div>
    </>
  );
}