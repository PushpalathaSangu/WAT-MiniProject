import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  FaUserCircle, 
  FaEdit, 
  FaSignOutAlt, 
  FaTachometerAlt, 
  FaBars,
  FaUsers,
  FaChalkboardTeacher
} from 'react-icons/fa';

export default function AdminSidebar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('admin')) || { name: 'A' };
  const firstLetter = user?.name?.charAt(0).toUpperCase() || 'A';

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem('admin');
      localStorage.removeItem('token');
      navigate('/');
<<<<<<< HEAD
=======
      setSidebarOpen(false);
>>>>>>> Final commit - project completed and ready for deployment
    }
  };

  // Navigation items
  const navItems = [
    { label: 'Admin', icon: <FaTachometerAlt />, path: '/admin-dashboard' },
    { label: 'Profile', icon: <FaUserCircle />, path: '/admin/profile' },
    { label: 'Update Profile', icon: <FaEdit />, path: '/admin/update-profile' },
    { label: 'Manage Students', icon: <FaUsers />, path: '/admin/students' },
    { label: 'Manage Faculty', icon: <FaChalkboardTeacher />, path: '/admin/faculty' }
  ];

  return (
    <>
<<<<<<< HEAD
      {/* Hamburger for small screens */}
      <div className="md:hidden bg-blue-600 p-2 flex justify-between items-center text-white">
        <div className="text-xl font-semibold">Admin Panel</div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
=======
      {/* Mobile top bar: Hamburger + title (only visible on small screens) */}
      <div className="md:hidden bg-blue-600 p-3 flex justify-between items-center text-white">
        <div className="text-xl font-semibold">Admin Panel</div>
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)} 
          aria-label="Toggle sidebar"
          className="focus:outline-none"
        >
>>>>>>> Final commit - project completed and ready for deployment
          <FaBars className="text-2xl" />
        </button>
      </div>

      {/* Sidebar */}
<<<<<<< HEAD
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
=======
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-blue-600 text-white
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:static md:translate-x-0 md:flex md:flex-col
          overflow-y-auto
        `}
      >
        {/* Avatar Section */}
        <div className="flex flex-col items-center border-b border-blue-400 p-6">
          <div className="bg-white text-blue-600 rounded-full w-20 h-20 flex items-center justify-center text-4xl font-bold shadow-lg transition-transform duration-300 hover:scale-110 hover:shadow-xl">
            {firstLetter}
          </div>
          <div className="mt-3 font-semibold text-lg">{user?.name || 'Admin'}</div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col mt-6 space-y-2 px-2">
          {navItems.map(({ label, icon, path }) => (
            <button
              key={label}
              onClick={() => {
                navigate(path);
                setSidebarOpen(false); // Close sidebar on mobile after navigation
              }}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-md transition
                ${
                  location.pathname === path
                    ? 'bg-white text-blue-900 font-semibold shadow-md'
                    : 'hover:bg-blue-500 hover:text-white'
                }
                focus:outline-none focus:ring-2 focus:ring-white
              `}
            >
              {icon} <span>{label}</span>
>>>>>>> Final commit - project completed and ready for deployment
            </button>
          ))}

          {/* Logout Button */}
          <button
            onClick={handleLogout}
<<<<<<< HEAD
            className="flex items-center gap-3 px-3 py-2 text-left rounded hover:bg-red-200 text-red-100 hover:text-red-800 transition"
=======
            className="flex items-center gap-3 px-4 py-3 rounded-md text-red-100 hover:bg-red-200 hover:text-red-800 transition focus:outline-none focus:ring-2 focus:ring-red-400 mt-4"
>>>>>>> Final commit - project completed and ready for deployment
          >
            <FaSignOutAlt /> Logout
          </button>
        </nav>
<<<<<<< HEAD
      </div>
    </>
  );
}
=======
      </aside>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        ></div>
      )}
    </>
  );
}
>>>>>>> Final commit - project completed and ready for deployment
