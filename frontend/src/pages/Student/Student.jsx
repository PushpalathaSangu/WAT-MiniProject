import React, { useEffect, useState } from 'react';
<<<<<<< HEAD
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import StudentSidebar from './StudentSidebar.jsx';

export default function Student() {
  const [wats, setWats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [studentYear, setStudentYear] = useState('');
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [submissions, setSubmissions] = useState([]);
  const [studentId, setStudentId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const year = localStorage.getItem('year');
    const id = localStorage.getItem('_id'); // Changed from 'studentId' to '_id'
    console.log("Year from localStorage:", year);
    console.log("Student _id from localStorage:", id);
    
    if (year && id) {
      setStudentYear(year);
      setStudentId(id);
    } else {
      console.error('Student data not found in localStorage');
=======
import { useNavigate } from 'react-router-dom';
import { FaBars, FaCheckCircle, FaEdit } from 'react-icons/fa';
import axios from 'axios';
import StudentSidebar from './StudentSidebar';

export default function Student() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [studentYear, setStudentYear] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [wats, setWats] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const year = localStorage.getItem('year');
    const id = localStorage.getItem('_id');
    const name = localStorage.getItem('studentName');

    if (year && id) {
      setStudentYear(year);
      setStudentId(id);
      setStudentName(name || 'Student');
    } else {
>>>>>>> Final commit - project completed and ready for deployment
      setError('Student data not found. Please log in again.');
      setLoading(false);
      navigate('/student-login');
    }
  }, [navigate]);

  useEffect(() => {
    if (!studentYear || !studentId) return;

    const fetchData = async () => {
      setLoading(true);
      try {
<<<<<<< HEAD
        const [watsResponse, submissionsResponse] = await Promise.all([
          axios.get(`http://localhost:4000/api/wats/active/by-year/${studentYear}`),
          axios.get(`http://localhost:4000/api/wats/submissions/student/${studentId}`)
        ]);
        
        console.log("WATs Response:", watsResponse.data);
        console.log("Submissions Response:", submissionsResponse.data);
        
        setWats(watsResponse.data);
        setSubmissions(submissionsResponse.data);
        
        if (!watsResponse.data || watsResponse.data.length === 0) {
          setError('No active WATs found for your year');
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please try again later.');
        if (err.response) {
          console.error("Server responded with:", err.response.data);
        }
=======
        const [watsRes, subsRes] = await Promise.all([
          axios.get(`http://localhost:4000/api/wats/active/by-year/${studentYear}`),
          axios.get(`http://localhost:4000/api/wats/submissions/student/${studentId}`)
        ]);
        setWats(watsRes.data);
        setSubmissions(subsRes.data);
        if (!watsRes.data.length) {
          setError('No active WATs found for your year');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load WATs. Please try again.');
>>>>>>> Final commit - project completed and ready for deployment
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [studentYear, studentId]);

<<<<<<< HEAD
  const hasAttempted = (watId) => {
    return submissions.some(sub => sub.watId === watId);
  };

  if (error) {
    return (
      <div className="flex min-h-screen">
        <StudentSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="flex-1 max-w-4xl mx-auto p-6 mt-8">
          <h2 className="text-3xl font-bold text-center mb-6">Available WATs for {studentYear}</h2>
          <p className="text-center text-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <StudentSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto p-6 mt-8">
          <h2 className="text-3xl font-bold text-center mb-6">
            Active WATs for {studentYear}
          </h2>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-3">
              <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-100 border-t-blue-500"></div>
              <p className="text-gray-500 font-medium text-sm">Loading WATs...</p>
            </div>
          ) : wats.length === 0 ? (
            <div className="text-center py-12 px-6 bg-gray-50 rounded-lg max-w-md mx-auto">
              <svg
                className="mx-auto h-10 w-10 text-gray-400 animate-fade-in"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-3 text-base font-medium text-gray-700">No Active WATs Found</h3>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {wats.map((wat) => {
                const start = new Date(wat.startTime);
                const end = new Date(wat.endTime);
                const attempted = hasAttempted(wat._id);

                return (
                  <div key={wat._id} className={`border border-gray-300 rounded-lg p-4 shadow-md ${attempted ? 'bg-gray-50' : 'bg-white'}`}>
                    <h3 className="text-xl font-semibold text-blue-700">
                      {wat.subject} - WAT {wat.watNumber}
                    </h3>
                    <p><strong>Start Time:</strong> {start.toLocaleString()}</p>
                    <p><strong>End Time:</strong> {end.toLocaleString()}</p>
                    {attempted ? (
                      <>
                        <p className="text-sm text-green-600 mt-2 font-medium">You have already attempted this WAT</p>
                        <button
                          disabled
                          className="mt-3 inline-block bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed"
                        >
                          Attempted
                        </button>
                      </>
                    ) : (
                      <>
                        <p className="text-sm text-green-600 mt-2 font-medium">This WAT is currently active</p>
                        <a
                          href={`/wats/${wat._id}`}
                          className="mt-3 inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                        >
                          Attempt WAT
                        </a>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
=======
  const hasAttempted = (watId) => submissions.some((s) => s.watId === watId);

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
        <h1 className="text-blue-600 font-bold text-lg">Student Dashboard</h1>
        <div className="w-6" />
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-md transform
          md:relative md:translate-x-0 transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <StudentSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
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
                Welcome, {studentName || 'Student'} 👋
              </h1>
              <p className="text-gray-600 mt-2 text-sm sm:text-base">
                Here are your available WATs for Year {studentYear}
              </p>
            </div>

            {/* Error / Loading */}
            {error ? (
              <div className="text-center text-red-500 text-sm">{error}</div>
            ) : loading ? (
              <div className="flex justify-center items-center py-10">
                <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-100 border-t-blue-500"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-2 sm:px-0">
                {wats.map((wat) => {
                  const attempted = hasAttempted(wat._id);
                  return (
                    <div
                      key={wat._id}
                      className={`bg-white p-4 sm:p-6 rounded-xl shadow-md border transition-all duration-200 transform hover:-translate-y-1
                        ${attempted ? 'opacity-80 bg-gray-100' : ''}`}
                    >
                      <div className="flex flex-col items-center text-center">
                        {attempted ? (
                          <FaCheckCircle className="text-3xl text-green-600 mb-3" />
                        ) : (
                          <FaEdit className="text-3xl text-blue-600 mb-3" />
                        )}
                        <h3 className="text-lg font-semibold text-gray-800">
                          {wat.subject} - WAT {wat.watNumber}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {new Date(wat.startTime).toLocaleString()} -{' '}
                          {new Date(wat.endTime).toLocaleString()}
                        </p>
                        {attempted ? (
                          <p className="mt-3 text-sm font-medium text-green-700">
                            Attempted ✅
                          </p>
                        ) : (
                          <a
                            href={`/wats/${wat._id}`}
                            className="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                          >
                            Attempt Now
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
>>>>>>> Final commit - project completed and ready for deployment
