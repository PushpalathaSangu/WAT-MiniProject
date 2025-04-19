import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaUserGraduate, FaBook, FaChartBar, FaIdCard, FaPhone, FaEnvelope, FaCalendarAlt } from 'react-icons/fa';

const StudentDetails = () => {
  const { studentId } = useParams();
  const [student, setStudent] = useState(null);
  const [watMarks, setWatMarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        // Fetch student details
        const studentRes = await axios.get(`http://localhost:5000/student/${studentId}`);
        setStudent(studentRes.data);
        console.log(studentRes.data)

        // Fetch WAT marks
        const watRes = await axios.get(`http://localhost:5000/api/wats/submit/${studentId}`);
        setWatMarks(watRes.data);
        
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching student data');
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [studentId]);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  if (!student) return <div className="text-center py-8">Student not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Student Details</h1>
      
      {/* Student Information Card */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center mb-6">
          <div className="bg-blue-100 p-4 rounded-full mr-4">
            <FaUserGraduate className="text-blue-600 text-2xl" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{student.name}</h2>
            <p className="text-gray-600">{student.studentId}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="flex items-center">
            <FaIdCard className="text-gray-500 mr-2" />
            <span className="font-semibold">Roll No:</span>
            <span className="ml-2">{student.rollNumber}</span>
          </div>
          
          <div className="flex items-center">
            <FaCalendarAlt className="text-gray-500 mr-2" />
            <span className="font-semibold">Year:</span>
            <span className="ml-2">{student.year}</span>
          </div>
          
          <div className="flex items-center">
            <FaBook className="text-gray-500 mr-2" />
            <span className="font-semibold">Section:</span>
            <span className="ml-2">{student.section}</span>
          </div>
          
          <div className="flex items-center">
            <FaBook className="text-gray-500 mr-2" />
            <span className="font-semibold">Semester:</span>
            <span className="ml-2">{student.semester}</span>
          </div>
          
          <div className="flex items-center">
            <FaEnvelope className="text-gray-500 mr-2" />
            <span className="font-semibold">Email:</span>
            <span className="ml-2">{student.email}</span>
          </div>
          
          <div className="flex items-center">
            <FaPhone className="text-gray-500 mr-2" />
            <span className="font-semibold">Phone:</span>
            <span className="ml-2">{student.phone}</span>
          </div>
        </div>
      </div>

      {/* WAT Performance Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <FaChartBar className="mr-2 text-blue-600" />
          WAT Performance
        </h2>
        
        {watMarks.length === 0 ? (
          <p className="text-gray-500">No WAT submissions found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left">Subject</th>
                  <th className="py-3 px-4 text-left">WAT Title</th>
                  <th className="py-3 px-4 text-left">Date</th>
                  <th className="py-3 px-4 text-left">Score</th>
                  <th className="py-3 px-4 text-left">Percentage</th>
                </tr>
              </thead>
              <tbody>
                {watMarks.map((wat, index) => (
                  <tr key={wat._id} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                    <td className="py-3 px-4">{wat.subject}</td>
                    <td className="py-3 px-4">{wat.watTitle}</td>
                    <td className="py-3 px-4">{new Date(wat.submittedAt).toLocaleDateString()}</td>
                    <td className="py-3 px-4">{wat.score}/{wat.totalMarks}</td>
                    <td className="py-3 px-4">
                      {((wat.score / wat.totalMarks) * 100).toFixed(2)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDetails;