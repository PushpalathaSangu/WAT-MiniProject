import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Student() {
  const [wats, setWats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [studentYear, setStudentYear] = useState('');

  useEffect(() => {
    const fetchStudentYear = async () => {
      const studentData = JSON.parse(localStorage.getItem('student'));
      if (studentData?.year) {
        setStudentYear(studentData.year);
      } else {
        console.error('Student year not found in localStorage');
        setLoading(false);
      }
    };

    fetchStudentYear();
  }, []);

  useEffect(() => {
    const fetchWats = async () => {
      if (!studentYear) return;

      try {
        const response = await axios.get(`http://localhost:5000/api/wats/by-year/${studentYear}`);
        setWats(response.data);
      } catch (error) {
        console.error('Error fetching WATs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWats();
  }, [studentYear]);

  const currentTime = new Date();

  return (
    <div className="max-w-4xl mx-auto p-6 mt-8">
      <h2 className="text-3xl font-bold text-center mb-6">Available WATs for {studentYear}</h2>

      {loading ? (
        <p className="text-center text-gray-600">Loading WATs...</p>
      ) : wats.length === 0 ? (
        <p className="text-center text-red-500">No WATs available for your year.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {wats.map((wat) => {
            const start = new Date(wat.startTime);
            const end = new Date(wat.endTime);
            const isActive = currentTime >= start && currentTime <= end;
            const isCompleted = currentTime > end;
            const isUpcoming = currentTime < start;

            return (
              <div key={wat._id} className="border border-gray-300 rounded-lg p-4 shadow-md bg-white">
                <h3 className="text-xl font-semibold text-blue-700">{wat.subject}</h3>
                <p><strong>Start Time:</strong> {start.toLocaleString()}</p>
                <p><strong>End Time:</strong> {end.toLocaleString()}</p>

                {isActive && (
                  <a
                    href={`/wat/${wat._id}`}
                    className="mt-3 inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Attempt WAT
                  </a>
                )}

                {isCompleted && (
                  <p className="text-sm text-red-600 mt-2 font-medium">WAT is completed.</p>
                )}

                {isUpcoming && (
                  <p className="text-sm text-gray-500 mt-2 italic">This WAT is not currently active.</p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
