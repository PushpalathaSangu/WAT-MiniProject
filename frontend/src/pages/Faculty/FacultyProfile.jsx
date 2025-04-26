import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FacultySidebar from './FacultySidebar';
import { 
  FaBars, 
  FaUserTie, 
  FaEnvelope, 
  FaPhone, 
  FaChalkboardTeacher,
  FaBook,
  FaCalendarAlt,
  FaUniversity,
  FaUserCircle,
  FaInfoCircle,
  FaGraduationCap
} from 'react-icons/fa';
import axios from 'axios';

export default function FacultyProfile() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [faculty, setFaculty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('User not authenticated. Please login.');
      setLoading(false);
      return;
    }

    axios.get('http://localhost:5000/faculty/profile', {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(({ data }) => {
      setFaculty(data);
      setLoading(false);
    })
    .catch(err => {
      console.error(err);
      setError('Could not load profile.');
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full text-center">
          <div className="text-red-500 text-xl font-medium mb-4">{error}</div>
          <button
            onClick={() => navigate('/faculty-login')}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Mobile Top Bar */}
      <div className="md:hidden p-4 bg-white shadow-md flex justify-between items-center">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-blue-600 text-2xl focus:outline-none"
        >
          <FaBars />
        </button>
        <h1 className="text-blue-600 font-bold text-lg">Faculty Portal</h1>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <FacultySidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Profile Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-8">
          <div className="max-w-4xl mx-auto">
            {/* Single Profile Card */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              {/* Profile Header with Gradient */}
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full flex items-center justify-center mb-4 md:mb-0 md:mr-6">
                      <FaUserTie className='w-32 h-32' />
                    </div>
                  </div>
                  <div className="text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start">
                      <FaChalkboardTeacher className="mr-2 text-xl" />
                      <h1 className="text-2xl font-bold">{faculty?.name}</h1>
                    </div>
                    <p className="text-blue-100 font-medium">{faculty?.department || 'Faculty Member'}</p>
                    <div className="flex items-center justify-center md:justify-start mt-2">
                      <span>Faculty ID: {faculty?.facultyId}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile Details */}
              <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Personal Information */}
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 flex items-center">
                    <FaUserCircle className="mr-2 text-blue-500" />
                    Personal Information
                  </h2>
                  
                  <ProfileDetailItem
                    icon={<FaUserCircle className="text-blue-500" />}
                    label="Full Name"
                    value={faculty?.name}
                  />
                  
                  <ProfileDetailItem
                    icon={<FaEnvelope className="text-blue-500" />}
                    label="Email Address"
                    value={faculty?.email}
                  />
                  
                  <ProfileDetailItem
                    icon={<FaPhone className="text-blue-500" />}
                    label="Contact Number"
                    value={faculty?.contact}
                  />
                  
                  <ProfileDetailItem
                    icon={<FaInfoCircle className="text-blue-500" />}
                    label="Faculty ID"
                    value={faculty?.facultyId}
                  />
                </div>

                {/* Academic Information */}
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 flex items-center">
                    <FaUniversity className="mr-2 text-blue-500" />
                    Teaching Information
                  </h2>
                  
                  <ProfileDetailItem
                    icon={<FaGraduationCap className="text-blue-500" />}
                    label="Department"
                    value={faculty?.department}
                  />
                  
                  <ProfileDetailItem
                    icon={<FaCalendarAlt className="text-blue-500" />}
                    label="Years Teaching"
                    value={faculty?.years?.join(', ')}
                  />
                  
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 mt-1 mr-3">
                        <FaBook className="text-blue-500" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-500">Subjects</p>
                        <div className="mt-1 space-y-1">
                          {faculty?.subjects && Object.entries(faculty.subjects).map(([year, subjects]) => (
                            <div key={year}>
                              <p className="text-sm font-semibold text-gray-700">{year}:</p>
                              <p className="text-sm text-gray-900 ml-2">{subjects.join(', ')}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="bg-gray-50 px-6 py-4 border-t">
                <div className="flex justify-end">
                  <span className="text-sm text-gray-500">
                    Last updated: {new Date().toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// Reusable Profile Detail Component
function ProfileDetailItem({ icon, label, value }) {
  return (
    <div className="flex items-start group">
      <div className="flex-shrink-0 h-5 w-5 mt-1 mr-3 transform group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700 transition-colors">
          {label}
        </p>
        <p className="text-md font-semibold text-gray-900 mt-1 group-hover:text-blue-600 transition-colors">
          {value || 'Not available'}
        </p>
      </div>
    </div>
  );
}