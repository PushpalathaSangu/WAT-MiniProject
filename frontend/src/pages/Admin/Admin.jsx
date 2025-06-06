<<<<<<< HEAD
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
=======
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaBookOpen, FaUserGraduate, FaChalkboardTeacher } from 'react-icons/fa';
>>>>>>> Final commit - project completed and ready for deployment
import AdminSidebar from './AdminSidebar';

export default function Admin() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
<<<<<<< HEAD

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Mobile Header */}
      <header className="md:hidden bg-white shadow-sm p-4 flex items-center">
        <button 
          onClick={() => setSidebarOpen(true)}
          className="text-blue-600 mr-4 focus:outline-none"
          aria-label="Open sidebar"
        >
          <FaBars size={24} />
        </button>
        <h1 className="text-xl font-semibold text-gray-800">Admin Dashboard</h1>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar - Always visible on md and up */}
        <div className="hidden md:flex md:flex-shrink-0">
          <div className="flex flex-col w-64 bg-blue-600">
            <AdminSidebar sidebarOpen={true} setSidebarOpen={setSidebarOpen} />
          </div>
        </div>

        {/* Mobile Sidebar - Overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            <div 
              className="absolute inset-0 bg-gray-600 bg-opacity-75"
              onClick={() => setSidebarOpen(false)}
              aria-hidden="true"
            ></div>
            <div className="relative flex flex-col w-72 max-w-xs h-full bg-blue-600">
              <div className="h-0 flex-1 overflow-y-auto">
                <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto focus:outline-none p-4 md:p-6">
          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Card 1 - Subjects */}
            <div className="bg-white overflow-hidden shadow rounded-lg transition-all duration-300 hover:shadow-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <h3 className="text-lg font-medium text-gray-900">Year-wise Subjects</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Manage and view subjects categorized by academic year.
                    </p>
                  </div>
                </div>
                <div className="mt-5">
                  <button
                    onClick={() => navigate('/admin/subjects')}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => navigate('/admin/view-subjects')}
                    className="ml-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    View
                  </button>
                  <button
                    onClick={() => navigate('/admin/update-subjects')}
                    className="ml-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>

            {/* Card 2 - Students */}
            <div className="bg-white overflow-hidden shadow rounded-lg transition-all duration-300 hover:shadow-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <h3 className="text-lg font-medium text-gray-900">Students</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      View, add, or update student records.
                    </p>
                  </div>
                </div>
                <div className="mt-5">
                  <button
                    onClick={() => navigate('/admin/students')}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Manage Students
                  </button>
                </div>
              </div>
            </div>

            {/* Card 3 - Faculty */}
            <div className="bg-white overflow-hidden shadow rounded-lg transition-all duration-300 hover:shadow-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <h3 className="text-lg font-medium text-gray-900">Faculty</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Manage faculty information and assignments.
                    </p>
                  </div>
                </div>
                <div className="mt-5">
                  <button
                    onClick={() => navigate('/admin/faculty')}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    Manage Faculty
                  </button>
                </div>
              </div>
=======
  const [adminName, setAdminName] = useState('');

  useEffect(() => {
    const storedName = localStorage.getItem('adminName');
    if (storedName) {
      setAdminName(storedName);
    }
  }, []);

  const cards = [
    {
      title: 'Year-wise Subjects',
      description: 'Manage and view subjects categorized by academic year.',
      icon: <FaBookOpen className="text-3xl text-blue-600 mb-3" />,
      actions: [
        { label: 'Add', route: '/admin/subjects' },
        { label: 'View', route: '/admin/view-subjects' },
        { label: 'Update', route: '/admin/update-subjects' },
      ],
    },
    {
      title: 'Students',
      description: 'View, add, or update student records.',
      icon: <FaUserGraduate className="text-3xl text-green-600 mb-3" />,
      actions: [{ label: 'Manage Students', route: '/admin/students' }],
    },
    {
      title: 'Faculty',
      description: 'Manage faculty information and assignments.',
      icon: <FaChalkboardTeacher className="text-3xl text-purple-600 mb-3" />,
      actions: [{ label: 'Manage Faculty', route: '/admin/faculty' }],
    },
  ];

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Mobile Top Bar */}
      <div className="md:hidden p-4 bg-white shadow flex justify-between items-center">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-blue-600 text-2xl"
          aria-label="Toggle sidebar"
        >
          <FaBars />
        </button>
        <h1 className="text-blue-600 font-bold text-lg">Admin Dashboard</h1>
        <div className="w-6"></div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-30 w-64 bg-blue-600 shadow-md transform
            md:relative md:translate-x-0 transition-transform duration-300 ease-in-out
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        </div>

        {/* Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-blue-gray-800 bg-opacity-30 backdrop-blur-sm z-20 md:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          ></div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Message */}
            <div className="text-center mb-8 px-2 sm:px-0">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
                Welcome back, {adminName || 'Admin'} 👋
              </h1>
              <p className="text-gray-600 mt-2 text-sm sm:text-base">
                Here's what you can manage today
              </p>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-2 sm:px-0">
              {cards.map((card, idx) => (
                <div
                  key={idx}
                  className="bg-white p-4 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <div className="flex flex-col items-center text-center">
                    {card.icon}
                    <h3 className="text-lg font-semibold text-gray-800">{card.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{card.description}</p>
                    <div className="mt-4 flex flex-wrap justify-center gap-2">
                      {card.actions.map((action, i) => (
                        <button
                          key={i}
                          onClick={() => navigate(action.route)}
                          className="px-3 py-2 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
>>>>>>> Final commit - project completed and ready for deployment
            </div>
          </div>
        </main>
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> Final commit - project completed and ready for deployment
