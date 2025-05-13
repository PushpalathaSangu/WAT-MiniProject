<<<<<<< HEAD

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FacultySidebar from './FacultySidebar';
import { FaBars } from 'react-icons/fa';
import axios from 'axios';

export default function FacultyUpdateProfile() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const [facultyData, setFacultyData] = useState({
    name: '',
    email: '',
    contact: '',
    years: [],
    subjects: {}
  });

  useEffect(() => {
    const fetchFacultyData = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:4000/faculty/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data) {
          // Convert subjects Map to plain object if needed
          const subjects = res.data.subjects instanceof Map ? 
            Object.fromEntries(res.data.subjects) : 
            res.data.subjects || {};

          setFacultyData({
            name: res.data.name || '',
            email: res.data.email || '',
            contact: res.data.contact || '',
            years: res.data.years || [],
            subjects: subjects
          });
        }
      } catch (error) {
        console.error('Error fetching faculty data', error);
        setError('Failed to load profile data');
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFacultyData();
  }, [navigate]);

  const handleChange = (e) => {
    setFacultyData({ ...facultyData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
  
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No authentication token found');
        setLoading(false);
        return;
      }

      // Prepare data for submission
      const updateData = {
        ...facultyData,
        // Ensure contactNumber is sent as contact
        contact: facultyData.contact
      };

      const res = await axios.put(
        'http://localhost:4000/faculty/update',
        updateData,
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        }
      );

      if (res.data.success) {
        setSuccess('Profile updated successfully!');
        setTimeout(() => navigate('/faculty/profile'), 1500);
      } else {
        setError(res.data.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error("Update error:", error);
      
      if (error.response) {
        if (error.response.status === 401) {
          setError('Session expired. Please login again.');
          localStorage.removeItem('token');
          navigate('/login');
        } else if (error.response.status === 400) {
          setError(error.response.data.message || 
                  'Validation error. Please check your inputs.');
        } else {
          setError(error.response.data?.message || 
                  'Error updating profile. Please try again.');
        }
      } else if (error.request) {
        setError('No response from server. Please try again.');
      } else {
        setError('Error: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading && !facultyData.name) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden p-4 bg-white shadow flex justify-between items-center">
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)} 
          className="text-blue-600 text-2xl"
        >
          <FaBars />
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <FacultySidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 p-6 overflow-y-auto flex justify-center items-start">
          <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md mt-6">
            <h2 className="text-2xl font-semibold text-blue-600 mb-4 text-center">
              Update Profile
            </h2>

            {error && (
              <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">
                {success}
              </div>
            )}

            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  name="name"
                  type="text"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                  value={facultyData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  name="email"
                  type="email"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                  value={facultyData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Contact Number</label>
                <input
                  name="contact"
                  type="tel"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded"
                  value={facultyData.contact}
                  onChange={handleChange}
                  required
                  pattern="[0-9]{10}"
                  title="10 digit phone number"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:bg-blue-300"
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update Profile'}
              </button>
            </form>
          </div>
        </main>
=======
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
  FaSave,
  FaIdCard
} from 'react-icons/fa';

export default function FacultyUpdateProfile() {
  const navigate = useNavigate();
  const [faculty, setFaculty] = useState({
    name: '',
    email: '',
    contact: '',
    facultyId: '',
    department: '',
    years: [],
    subjects: {}
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

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
    .then((response) => {
      setFaculty(response.data);
      setLoading(false);
    })
    .catch((err) => {
      console.error('Error fetching faculty profile:', err);
      setError(
        err.response?.data?.message ||
        'Failed to fetch faculty profile. Please try again later.'
      );
      setLoading(false);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFaculty(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    axios.put('http://localhost:5000/faculty/update', faculty, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(() => {
      setSuccess('Profile updated successfully!');
      setShowSuccessModal(true);
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
        >
          <FaBars />
        </button>
        <h1 className="text-blue-600 font-bold text-lg">Faculty Portal</h1>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <FacultySidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

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
                    <div className="text-center md:text-left">
                      <h1 className="text-2xl font-bold text-center">Update Profile of {faculty.facultyId}</h1>
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
                    
                    <FormField
                      icon={<FaUserTie className="text-blue-500" />}
                      label="Full Name"
                      name="name"
                      value={faculty.name}
                      onChange={handleChange}
                      required
                    />
                    
                    <FormField
                      icon={<FaEnvelope className="text-blue-500" />}
                      label="Email Address"
                      type="email"
                      name="email"
                      value={faculty.email}
                      onChange={handleChange}
                      required
                    />
                    
                    <FormField
                      icon={<FaPhone className="text-blue-500" />}
                      label="Contact Number"
                      type="tel"
                      name="contact"
                      value={faculty.contact}
                      onChange={handleChange}
                      required
                      pattern="[0-9]{10,15}"
                      title="10-15 digit phone number"
                    />
                  </div>

                  {/* Academic Information */}
                  <div className="space-y-6">
                    <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
                      Teaching Information
                    </h2>
                    
                    <FormField
                      icon={<FaIdCard className="text-blue-500" />}
                      label="Faculty ID"
                      name="facultyId"
                      value={faculty.facultyId}
                      onChange={handleChange}
                      disabled
                    />
                    
                    <FormField
                      icon={<FaUniversity className="text-blue-500" />}
                      label="Department"
                      name="department"
                      value={faculty.department}
                      onChange={handleChange}
                    />
                    
                    <FormField
                      icon={<FaCalendarAlt className="text-blue-500" />}
                      label="Years Teaching"
                      name="years"
                      value={faculty.years?.join(', ')}
                      onChange={(e) => {
                        const years = e.target.value.split(',').map(y => y.trim());
                        setFaculty(prev => ({ ...prev, years }));
                      }}
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

      {/* Success Modal */}
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
                  navigate('/faculty/profile');
                }}
                className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Reusable Form Field Component
function FormField({ icon, label, type = 'text', name, value, onChange, required = false, disabled = false, ...props }) {
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
          {...props}
        />
>>>>>>> f6835e94c53861a7cc75875b691904592825d8f8
      </div>
    </div>
  );
}