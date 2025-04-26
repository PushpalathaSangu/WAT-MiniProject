import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FacultySidebar from './FacultySidebar';
import { FaBars, FaArrowLeft } from 'react-icons/fa';

export default function StudentsDetails() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [assignedYears, setAssignedYears] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAssignedYears = async () => {
      try {
        const facultyId = localStorage.getItem('_id');  // Corrected here
        
        if (!facultyId) {
          throw new Error('Faculty ID not found in local storage');
        }
    
        const response = await fetch(`http://localhost:5000/faculty/${facultyId}/years`);
    
        if (!response.ok) {
          throw new Error('Failed to fetch assigned years');
        }
    
        const data = await response.json();
        setAssignedYears(data.years || []);
      } catch (err) {
        console.error('Error fetching years:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    

    fetchAssignedYears();
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
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden p-4 bg-white shadow flex justify-between items-center">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-blue-600 text-2xl">
          <FaBars />
        </button>
        <button onClick={() => navigate(-1)} className="text-blue-600 text-2xl">
          <FaArrowLeft />
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <FacultySidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 p-6 overflow-y-auto">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Student Details</h2>
            <p className="text-lg text-gray-600 mt-2">Select a year to view students</p>
          </div>

          {assignedYears.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-lg text-gray-500">No assigned years found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {assignedYears.map((year) => (
                <div
                  key={year}
                  onClick={() => navigate(`/faculty/students/year/${year}`)}
                  className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg cursor-pointer transition-all hover:-translate-y-1"
                >
                  <div className="flex flex-col items-center">
                    <span className="text-4xl font-bold text-blue-600 mb-2">{year}</span>
                    <h3 className="text-xl font-semibold text-center text-gray-700">
                      Year {year}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
