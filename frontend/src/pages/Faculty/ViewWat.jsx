import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FacultySidebar from './FacultySidebar';
import { 
  FaBars, 
  FaClock, 
  FaBook, 
  FaHourglassStart, 
  FaHourglassEnd,
  FaPlus,
  FaCheckCircle,
  FaRunning
} from 'react-icons/fa';

export default function ViewWATs() {
  const [wats, setWats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWats = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/wats');
        
        if (!response.data || response.data.length === 0) {
          setError('No WATs found');
        } else {
          const sortedWats = response.data.sort((a, b) => 
            new Date(b.startTime) - new Date(a.startTime)
          );
          setWats(sortedWats);
        }
      } catch (err) {
        console.error('Error fetching WATs:', err);
        setError(err.response?.data?.message || 'Failed to load WATs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchWats();
  }, []);

  const currentTime = new Date();

  const categorizeWats = (wats) => {
    return wats.reduce((acc, wat) => {
      const startTime = new Date(wat.startTime);
      const endTime = new Date(wat.endTime);
      
      if (currentTime > endTime) {
        acc.completed.push(wat);
      } else {
        acc.active.push(wat);
      }
      return acc;
    }, { active: [], completed: [] });
  };

  const { active, completed } = categorizeWats(wats);

  const formatDateTime = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit', 
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleString('en-US', options);
  };

  const WatCard = ({ wat, status }) => {
    const statusColors = {
      active: 'bg-blue-100 text-blue-800',
      upcoming: 'bg-blue-100 text-blue-800',
      completed: 'bg-gray-100 text-gray-800'
    };

    const borderColors = {
      active: 'border-blue-500',
      upcoming: 'border-blue-500',
      completed: 'border-gray-400'
    };

    const isCompleted = status === 'completed';

    return (
      <div 
        key={wat._id} 
        className={`rounded-lg shadow-md border-l-4 ${borderColors[status]} mb-6 w-80 ${
          isCompleted ? 'h-56' : 'h-52'
        }`}
      >
        <div className="bg-white p-4 h-full flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-md font-semibold text-gray-800 line-clamp-1">
              {wat.subject} (Year {wat.year})
            </h3>
            <span className={`text-xs px-2 py-1 rounded-full ${statusColors[status]}`}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          </div>
          
          <p className="text-gray-600 text-sm mb-1 line-clamp-1">
            WAT {wat.watNumber} • Semester {wat.semester}
          </p>
          
          <div className="mt-2 space-y-1 text-sm">
            <div className="flex items-center text-gray-600">
              <FaHourglassStart className="mr-2 text-blue-500 text-xs" />
              <span>Starts: {formatDateTime(wat.startTime)}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <FaHourglassEnd className="mr-2 text-blue-500 text-xs" />
              <span>Ends: {formatDateTime(wat.endTime)}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <FaClock className="mr-2 text-blue-500 text-xs" />
              <span>Duration: {wat.duration || 'N/A'} mins</span>
            </div>
          </div>
          
          {isCompleted && (
            <button
              onClick={() => navigate(`/wat-results/${wat._id}`)}
              className="mt-auto w-full bg-green-600 hover:bg-green-700 text-white py-1 px-4 rounded-md transition-colors text-sm"
            >
              View Results
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <FacultySidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className="md:hidden p-4 bg-white shadow-sm flex items-center">
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-blue-600 mr-4"
        >
          <FaBars size={20} />
        </button>
        <h1 className="text-xl font-bold text-blue-800">WAT Management</h1>
      </div>

      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Weekly Assessment Tests
            </h1>
            <div className="flex space-x-4">
              <div className="flex items-center text-sm text-gray-500">
                <FaClock className="mr-1" />
                {currentTime.toLocaleDateString()}
              </div>
              <button 
                onClick={() => navigate('/create-wat')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center text-sm"
              >
                <FaPlus className="mr-2" />
                Create WAT
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
              <p>{error}</p>
            </div>
          ) : wats.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-block p-4 bg-blue-100 rounded-full mb-4">
                <FaBook className="text-blue-500 text-3xl" />
              </div>
              <h3 className="text-xl font-medium text-gray-700 mb-2">
                No WATs Created Yet
              </h3>
              <p className="text-gray-500">
                Create your first WAT by clicking the "Create WAT" button.
              </p>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1">
                <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                  <div className="flex items-center">
                    <FaRunning className="text-blue-500 text-xl mr-3" />
                    <h2 className="text-xl font-semibold text-gray-800">Active/Upcoming</h2>
                    <span className="ml-auto bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                      {active.length} {active.length === 1 ? 'WAT' : 'WATs'}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col space-y-4">
                  {active.length > 0 ? (
                    active.map(wat => (
                      <WatCard 
                        key={wat._id} 
                        wat={wat} 
                        status={currentTime < new Date(wat.startTime) ? 'upcoming' : 'active'} 
                      />
                    ))
                  ) : (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                      <p className="text-blue-800">No active or upcoming WATs</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex-1">
                <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                  <div className="flex items-center">
                    <FaCheckCircle className="text-gray-500 text-xl mr-3" />
                    <h2 className="text-xl font-semibold text-gray-800">Completed</h2>
                    <span className="ml-auto bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full">
                      {completed.length} {completed.length === 1 ? 'WAT' : 'WATs'}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col space-y-4">
                  {completed.length > 0 ? (
                    completed.map(wat => (
                      <WatCard key={wat._id} wat={wat} status="completed" />
                    ))
                  ) : (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                      <p className="text-gray-600">No completed WATs</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}