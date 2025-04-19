import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import Sidebar from './AdminSidebar';

export default function Admin() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden p-4 bg-white shadow flex justify-between items-center">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-blue-600 text-2xl">
          <FaBars />
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main Content */}
        <main className="flex-1 p-3 overflow-y-auto flex justify-center items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
            {/* Card 1 */}
            <div className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition text-center">
              <h2 className="text-lg font-semibold mb-2 text-blue-600">Year-wise Subjects</h2>
              <p className="text-gray-600 text-sm">
                Manage and view subjects categorized by academic year.
              </p>
              <button
                onClick={() => navigate('/admin/subjects')}
                className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
              >
                View Subjects
              </button>
            </div>

            {/* Card 2 */}
            <div className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition text-center">
              <h2 className="text-lg font-semibold mb-2 text-green-600">Students</h2>
              <p className="text-gray-600 text-sm">
                View, add, or update student records.
              </p>
              <button
                onClick={() => navigate('/admin/students')}
                className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm"
              >
                Manage Students
              </button>
            </div>

            {/* Card 3 */}
            <div className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition text-center">
              <h2 className="text-lg font-semibold mb-2 text-purple-600">Faculty</h2>
              <p className="text-gray-600 text-sm">
                Manage faculty information and assignments.
              </p>
              <button
                onClick={() => navigate('/admin/faculty')}
                className="mt-3 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 text-sm"
              >
                Manage Faculty
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
