import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import StudentSidebar from './StudentSidebar';

import { 
  FaBars,
  FaUserGraduate,
  FaEnvelope,
  FaPhone,
  FaIdCard,
  FaHashtag,
  FaCalendarAlt,
  FaBook,
  FaUsers,
  FaSave
} from 'react-icons/fa';

export default function StudentUpdate() {
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    name: '',
    email: '',
    phone: '',
    studentId: '',
    rollNumber: '',
    year: '',
    semester: '',
    section: '',
    department: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
<<<<<<< HEAD
=======

>>>>>>> Final commit - project completed and ready for deployment
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('User not authenticated. Please login.');
      setLoading(false);
      return;
    }

    axios.get('http://localhost:4000/student/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      setStudent(response.data);
      setLoading(false);
    })
    .catch((err) => {
      console.error('Error fetching student profile:', err);
      setError(
        err.response?.data?.message ||
        'Failed to fetch student profile. Please try again later.'
      );
      setLoading(false);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    axios.put('http://localhost:4000/student/update', student, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(() => {
      setSuccess('Profile updated successfully!');
      setShowSuccessModal(true);
<<<<<<< HEAD
     
=======
>>>>>>> Final commit - project completed and ready for deployment
    })
    .catch((err) => {
      console.error('Error updating profile:', err);
      setError(
        err.response?.data?.message ||
        'Failed to update profile. Please try again later.'
      );
    });
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Mobile Top Bar */}
      <div className="md:hidden p-4 bg-white shadow-md flex justify-between items-center">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-blue-600 text-2xl focus:outline-none"
<<<<<<< HEAD
=======
          aria-label="Toggle sidebar"
>>>>>>> Final commit - project completed and ready for deployment
        >
          <FaBars />
        </button>
        <h1 className="text-blue-600 font-bold text-lg">Student Portal</h1>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
<<<<<<< HEAD
        <StudentSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
=======
        <div
          className={`
            fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-md transform
            md:relative md:translate-x-0 transition-transform duration-300 ease-in-out
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
        >
          <StudentSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        </div>

        {/* Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-blue-gray-800 bg-opacity-30 backdrop-blur-sm z-20 md:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}
>>>>>>> Final commit - project completed and ready for deployment

        {/* Update Profile Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-8">
          <div className="max-w-4xl mx-auto">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : error ? (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
                <p>{error}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md overflow-hidden">
                {/* Profile Header */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
                  <div className="flex flex-col md:flex-row items-center">
<<<<<<< HEAD
                  
                    <div className="text-center md:text-left">
                      <h1 className="text-2xl font-bold text-center">Update Profile of {student.studentId}</h1>
                  
=======
                    <div className="text-center md:text-left">
                      <h1 className="text-2xl font-bold text-center">Update Profile of {student.studentId}</h1>
>>>>>>> Final commit - project completed and ready for deployment
                    </div>
                  </div>
                </div>

                {/* Success Message */}
                {success && (
                  <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mx-6 mt-6">
                    <p>{success}</p>
                  </div>
                )}

                {/* Profile Details */}
                <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Personal Information */}
                  <div className="space-y-6">
                    <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
                      Personal Information
                    </h2>
<<<<<<< HEAD
                    
=======

>>>>>>> Final commit - project completed and ready for deployment
                    <FormField
                      icon={<FaUserGraduate className="text-blue-500" />}
                      label="Full Name"
                      name="name"
                      value={student.name}
                      onChange={handleChange}
                      required
                    />
<<<<<<< HEAD
                    
=======

>>>>>>> Final commit - project completed and ready for deployment
                    <FormField
                      icon={<FaEnvelope className="text-blue-500" />}
                      label="Email Address"
                      type="email"
                      name="email"
                      value={student.email}
                      onChange={handleChange}
                      required
                    />
<<<<<<< HEAD
                    
=======

>>>>>>> Final commit - project completed and ready for deployment
                    <FormField
                      icon={<FaPhone className="text-blue-500" />}
                      label="Contact Number"
                      type="tel"
                      name="phone"
                      value={student.phone}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Academic Information */}
                  <div className="space-y-6">
                    <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
                      Academic Information
                    </h2>
<<<<<<< HEAD
                    
=======

>>>>>>> Final commit - project completed and ready for deployment
                    <FormField
                      icon={<FaIdCard className="text-blue-500" />}
                      label="Student ID"
                      name="studentId"
                      value={student.studentId}
                      onChange={handleChange}
                      disabled
                    />
<<<<<<< HEAD
                    
=======

>>>>>>> Final commit - project completed and ready for deployment
                    <FormField
                      icon={<FaHashtag className="text-blue-500" />}
                      label="Roll Number"
                      name="rollNumber"
                      value={student.rollNumber}
                      onChange={handleChange}
                    />
<<<<<<< HEAD
                    
=======

>>>>>>> Final commit - project completed and ready for deployment
                    <FormField
                      icon={<FaCalendarAlt className="text-blue-500" />}
                      label="Academic Year"
                      name="year"
                      value={student.year}
                      onChange={handleChange}
                    />
<<<<<<< HEAD
                    
=======

>>>>>>> Final commit - project completed and ready for deployment
                    <FormField
                      icon={<FaBook className="text-blue-500" />}
                      label="Semester"
                      name="semester"
                      value={student.semester}
                      onChange={handleChange}
                    />
<<<<<<< HEAD
                    
=======

>>>>>>> Final commit - project completed and ready for deployment
                    <FormField
                      icon={<FaUsers className="text-blue-500" />}
                      label="Section"
                      name="section"
                      value={student.section}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Form Footer */}
                <div className="bg-gray-50 px-6 py-4 border-t flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md flex items-center transition"
                  >
                    <FaSave className="mr-2" />
                    Save Changes
                  </button>
                </div>
              </form>
            )}
          </div>
        </main>
      </div>
<<<<<<< HEAD
      {showSuccessModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 backdrop-blur-sm transition-opacity duration-300">
    <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md transform transition-all duration-300 scale-95 animate-scaleIn">
      <div className="text-center">
        {/* Success Icon */}
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
          <svg 
            className="h-10 w-10 text-green-600" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 13l4 4L19 7" 
            />
          </svg>
        </div>
        
        {/* Title & Message */}
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">Success!</h3>
        <p className="text-gray-600 mb-6">
          Profile updated successfully.
        </p>
        
        {/* Action Button */}
        <button
          onClick={() => {
            setShowSuccessModal(false);
            navigate('/student/profile');
          }}
          className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Continue
        </button>
      </div>
    </div>
  </div>
)}
=======

      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 backdrop-blur-sm transition-opacity duration-300">
          <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md transform transition-all duration-300 scale-95 animate-scaleIn">
            <div className="text-center">
              {/* Success Icon */}
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                <svg 
                  className="h-10 w-10 text-green-600" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  viewBox="0 0 24 24" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Profile updated successfully!</h3>
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  navigate('/student/profile');
                }}
                className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
              >
                Go to Profile
              </button>
            </div>
          </div>
        </div>
      )}
>>>>>>> Final commit - project completed and ready for deployment
    </div>
  );
}

<<<<<<< HEAD
// Reusable Form Field Component
function FormField({ icon, label, type = 'text', name, value, onChange, required = false, disabled = false }) {
  return (
    <div className="flex items-start">
      <div className="flex-shrink-0 h-5 w-5 mt-2 mr-3 text-blue-500">
        {icon}
      </div>
      <div className="flex-1">
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
        />
      </div>
      
    </div>
  );
}
=======
// Reusable input form field component
function FormField({ icon, label, type = 'text', name, value, onChange, required = false, disabled = false }) {
  return (
    <label className="block">
      <span className="flex items-center text-gray-700 mb-1 font-semibold">
        {icon}
        <span className="ml-2">{label}</span>
      </span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={`w-full px-4 py-2 rounded-md border ${
          disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
        } border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400`}
      />
    </label>
  );
}
>>>>>>> Final commit - project completed and ready for deployment
