<<<<<<< HEAD


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminSidebar from './AdminSidebar'; // Adjust the import path as needed
=======
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaBars } from 'react-icons/fa';
import AdminSidebar from './AdminSidebar';
>>>>>>> Final commit - project completed and ready for deployment

const ViewSubjects = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState('E1');
  const [selectedSemester, setSelectedSemester] = useState('sem1');
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const academicYears = ['E1', 'E2', 'E3', 'E4'];
  const semesters = ['sem1', 'sem2'];

  const fetchSubjects = async () => {
    setLoading(true);
    setError(null);
<<<<<<< HEAD
    
=======
>>>>>>> Final commit - project completed and ready for deployment
    try {
      const response = await axios.get(
        `http://localhost:4000/api/subjects/${selectedYear}/${selectedSemester}`
      );
      setSubjects(response.data.subjects || []);
    } catch (err) {
      console.error('Failed to fetch subjects:', err);
      setError('Failed to load subject data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, [selectedYear, selectedSemester]);

<<<<<<< HEAD
  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const handleSemesterChange = (e) => {
    setSelectedSemester(e.target.value);
  };

  const formatSemester = (sem) => {
    return sem.replace('sem', 'Sem ');
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Admin Sidebar */}
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      {/* Main Content */}
      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            

            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
              <div className="p-6 bg-blue-500 text-white">
                <h2 className="text-2xl font-bold text-center">View Subjects</h2>
              </div>
              
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
=======
  const handleYearChange = (e) => setSelectedYear(e.target.value);
  const handleSemesterChange = (e) => setSelectedSemester(e.target.value);

  const formatSemester = (sem) => sem.replace('sem', 'Sem ');

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Mobile Top Bar - z-20 (below sidebar) */}
      <div className="md:hidden p-4 bg-white shadow flex justify-between items-center sticky top-0 z-20">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-blue-600 text-2xl"
          aria-label="Toggle sidebar"
        >
          <FaBars />
        </button>
        <h1 className="text-xl font-semibold text-blue-700">View Subjects</h1>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - z-30 (highest) */}
        <div
          className={
            `fixed inset-y-0 left-0 z-30 w-64 bg-blue-600 shadow-md transform
            md:relative md:translate-x-0 transition-transform duration-300 ease-in-out
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`
          }
        >
          <AdminSidebar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
        </div>

        {/* Overlay - z-25 (between header and sidebar) */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-blue-gray-800 bg-opacity-30 backdrop-blur-sm z-25 md:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          ></div>
        )}

        {/* Main Content - z-10 (lowest) */}
        <main className="flex-1 overflow-y-auto z-10 bg-gradient-to-br from-blue-50 to-indigo-50 py-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto w-full">
            {/* Header Card */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
              <div className="p-4 sm:p-6 bg-blue-500 text-white text-center">
                <h2 className="text-xl sm:text-2xl font-bold">View Subjects</h2>
              </div>

              {/* Dropdowns */}
              <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
>>>>>>> Final commit - project completed and ready for deployment
                <div>
                  <label htmlFor="year-select" className="block text-sm font-medium text-gray-700 mb-2">
                    Academic Year
                  </label>
<<<<<<< HEAD
                  <div className="relative">
                    <select
                      id="year-select"
                      value={selectedYear}
                      onChange={handleYearChange}
                      className="block w-full pl-3 pr-10 py-3 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg shadow-sm appearance-none bg-white"
                    >
                      {academicYears.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
=======
                  <select
                    id="year-select"
                    value={selectedYear}
                    onChange={handleYearChange}
                    className="block w-full py-2 px-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {academicYears.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
>>>>>>> Final commit - project completed and ready for deployment
                </div>

                <div>
                  <label htmlFor="semester-select" className="block text-sm font-medium text-gray-700 mb-2">
                    Semester
                  </label>
<<<<<<< HEAD
                  <div className="relative">
                    <select
                      id="semester-select"
                      value={selectedSemester}
                      onChange={handleSemesterChange}
                      className="block w-full pl-3 pr-10 py-3 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg shadow-sm appearance-none bg-white"
                    >
                      {semesters.map((sem) => (
                        <option key={sem} value={sem}>
                          {formatSemester(sem)}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
=======
                  <select
                    id="semester-select"
                    value={selectedSemester}
                    onChange={handleSemesterChange}
                    className="block w-full py-2 px-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {semesters.map((sem) => (
                      <option key={sem} value={sem}>
                        {formatSemester(sem)}
                      </option>
                    ))}
                  </select>
>>>>>>> Final commit - project completed and ready for deployment
                </div>
              </div>
            </div>

<<<<<<< HEAD
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200 bg-gray-50">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium mr-3">
                    {selectedYear}
                  </span>
                  <span className="text-gray-600">
                    {formatSemester(selectedSemester)}
                  </span>
                </h2>
              </div>

              {loading ? (
                <div className="flex justify-center items-center py-16">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                  <span className="ml-3 text-gray-600">Loading subjects...</span>
=======
            {/* Subjects List */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-gray-200 bg-gray-50">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 flex flex-wrap items-center gap-2">
                  <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                    {selectedYear}
                  </span>
                  <span className="text-gray-600">{formatSemester(selectedSemester)}</span>
                </h2>
              </div>

              {/* States: Loading, Error, Subjects List, Empty */}
              {loading ? (
                <div className="flex justify-center items-center py-16">
                  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-indigo-500 border-b-2"></div>
                  <span className="ml-4 text-gray-600">Loading subjects...</span>
>>>>>>> Final commit - project completed and ready for deployment
                </div>
              ) : error ? (
                <div className="p-6">
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                    <div className="flex items-center">
<<<<<<< HEAD
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-red-700">{error}</p>
                      </div>
=======
                      <svg className="h-5 w-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <p className="text-sm text-red-700">{error}</p>
>>>>>>> Final commit - project completed and ready for deployment
                    </div>
                  </div>
                </div>
              ) : subjects.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                  {subjects.map((subject, index) => (
<<<<<<< HEAD
                    <li key={index} className="px-6 py-4 hover:bg-gray-50 transition-colors duration-150">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center mt-1 mr-4">
                          <span className="text-indigo-600 font-medium">{index + 1}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-gray-800 mb-1">
=======
                    <li key={index} className="px-4 sm:px-6 py-4 hover:bg-gray-50 transition-colors duration-150">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                          <span className="text-indigo-600 font-medium">{index + 1}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1">
>>>>>>> Final commit - project completed and ready for deployment
                            {subject.name}
                          </h3>
                          {subject.code && (
                            <p className="text-sm text-gray-500">
                              <span className="font-medium">Code:</span> {subject.code}
                            </p>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-12 text-center">
<<<<<<< HEAD
                  <svg
                    className="mx-auto h-16 w-16 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">No subjects available</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    There are no subjects registered for {selectedYear} - {formatSemester(selectedSemester)}.
=======
                  <svg className="mx-auto h-14 w-14 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">No subjects available</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    No subjects registered for {selectedYear} - {formatSemester(selectedSemester)}.
>>>>>>> Final commit - project completed and ready for deployment
                  </p>
                </div>
              )}
            </div>
          </div>
<<<<<<< HEAD
        </div>
=======
        </main>
>>>>>>> Final commit - project completed and ready for deployment
      </div>
    </div>
  );
};

export default ViewSubjects;