import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminSidebar from './AdminSidebar'; // Adjust the path as necessary

export default function FacultyDetails() {
  const [faculty, setFaculty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFacultyProfile = async () => {
      try {
        const token = localStorage.getItem('token'); // Assumes token is stored in localStorage

        const res = await axios.get('http://localhost:5000/faculty/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true, // Include credentials if needed
        });

        setFaculty(res.data);
      } catch (error) {
        console.error('Error fetching faculty profile:', error);
        setFaculty(null);
      } finally {
        setLoading(false);
      }
    };

    fetchFacultyProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-gray-600">
        Loading...
      </div>
    );
  }

  if (!faculty) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-xl">
        Failed to load faculty details.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <AdminSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-blue-700 text-center mb-8">Faculty Profile</h2>

          <div className="space-y-6 text-lg">
            <div>
              <span className="font-semibold text-gray-700">Name:</span>{' '}
              <span className="text-gray-900">{faculty.name}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Email:</span>{' '}
              <span className="text-gray-900">{faculty.email}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Contact:</span>{' '}
              <span className="text-gray-900">{faculty.contact}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Years Handling:</span>{' '}
              <span className="text-gray-900">{faculty.years?.join(', ') || 'N/A'}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Subjects:</span>{' '}
              <span className="text-gray-900">{faculty.subjects?.join(', ') || 'N/A'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
