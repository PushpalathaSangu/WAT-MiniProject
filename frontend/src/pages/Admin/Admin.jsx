import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Admin() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('admin')) || { name: 'A' };
  const firstLetter = user?.name?.charAt(0).toUpperCase() || 'A';

  const handleLogout = () => {
    localStorage.removeItem('admin');
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-blue-700 text-white flex-shrink-0 p-4 md:min-h-screen">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-white text-blue-700 rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold">
            {firstLetter}
          </div>
          <p className="mt-2 font-medium">{user.name || 'Admin'}</p>
        </div>

        <nav className="space-y-4">
          <button
            onClick={() => navigate('/admin/profile')}
            className="w-full text-left px-3 py-2 rounded hover:bg-blue-600"
          >
            Profile
          </button>
          <button
            onClick={() => navigate('/admin/update-profile')}
            className="w-full text-left px-3 py-2 rounded hover:bg-blue-600"
          >
            Update Profile
          </button>
          <button
            onClick={handleLogout}
            className="w-full text-left px-3 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6 text-blue-700">Admin Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-2 text-blue-600">Year-wise Subjects</h2>
            <p className="text-gray-600">Manage and view subjects categorized by academic year.</p>
            <button
              onClick={() => navigate('/admin/subjects')}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              View Subjects
            </button>
          </div>

          {/* Card 2 */}
          <div className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-2 text-green-600">Students</h2>
            <p className="text-gray-600">View, add, or update student records.</p>
            <button
              onClick={() => navigate('/admin/students')}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Manage Students
            </button>
          </div>

          {/* Card 3 */}
          <div className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-2 text-purple-600">Faculty</h2>
            <p className="text-gray-600">Manage faculty information and assignments.</p>
            <button
              onClick={() => navigate('/admin/faculty')}
              className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              Manage Faculty
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
