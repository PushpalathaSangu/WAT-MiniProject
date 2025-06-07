import React, { useState } from 'react';
import axios from 'axios';
<<<<<<< HEAD
import AdminSidebar from './AdminSidebar';


=======
import { FaBars } from 'react-icons/fa';
import AdminSidebar from './AdminSidebar';

>>>>>>> Final commit - project completed and ready for deployment
export default function Subjects() {
  const [year, setYear] = useState('E1');
  const [semester, setSemester] = useState('sem1');
  const [subjects, setSubjects] = useState([{ code: '', name: '' }]);
<<<<<<< HEAD
=======
  const [sidebarOpen, setSidebarOpen] = useState(false);
>>>>>>> Final commit - project completed and ready for deployment

  const handleChange = (index, field, value) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index][field] = value;
    setSubjects(updatedSubjects);
  };

  const addSubjectField = () => {
    setSubjects([...subjects, { code: '', name: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/subjects/add', {
        year,
        semester,
        subjects,
      });
      alert('Subjects added/updated successfully!');
      setSubjects([{ code: '', name: '' }]);
    } catch (err) {
      console.error(err);
      alert('Failed to add subjects');
    }
  };

  return (
<<<<<<< HEAD
    <div className="flex flex-col min-h-screen">
   
      {/* Main Content with Sidebar */}
      <div className="flex flex-1 bg-gray-100">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-md">
          <AdminSidebar />
        </div>

        {/* Page Content */}
        <div className="flex-1 p-6">
          <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">
=======
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Mobile Header*/}
      <div className="md:hidden p-4 bg-white shadow flex justify-between items-center">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-blue-600 text-2xl"
          aria-label="Toggle sidebar"
        >
          <FaBars />
        </button>
        <h1 className="text-blue-600 font-bold text-lg">Add Subjects</h1>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar  */}
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

        {/* Overlay*/}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-blue-gray-800 bg-opacity-30 backdrop-blur-sm z-25 md:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto z-10 p-6 md:p-8">
          <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6 md:p-8">
>>>>>>> Final commit - project completed and ready for deployment
            <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">Add Subjects</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Year & Semester */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-1 font-medium text-gray-700">Year</label>
                  <select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {['E1', 'E2', 'E3', 'E4'].map((y) => (
<<<<<<< HEAD
                      <option key={y} value={y}>{y}</option>
=======
                      <option key={y} value={y}>
                        {y}
                      </option>
>>>>>>> Final commit - project completed and ready for deployment
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mb-1 font-medium text-gray-700">Semester</label>
                  <select
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="sem1">Semester 1</option>
                    <option value="sem2">Semester 2</option>
                  </select>
                </div>
              </div>

              {/* Subject Fields */}
              <div className="space-y-4">
                {subjects.map((subject, idx) => (
                  <div key={idx} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-1 font-medium text-gray-700">Subject Code</label>
                      <input
                        type="text"
                        value={subject.code}
                        onChange={(e) => handleChange(idx, 'code', e.target.value)}
                        placeholder="e.g., CS201"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block mb-1 font-medium text-gray-700">Subject Name</label>
                      <input
                        type="text"
                        value={subject.name}
                        onChange={(e) => handleChange(idx, 'name', e.target.value)}
<<<<<<< HEAD
                        placeholder="enter subject"
=======
                        placeholder="Enter subject name"
>>>>>>> Final commit - project completed and ready for deployment
                        required
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Add More Button */}
              <div className="text-right">
                <button
                  type="button"
                  onClick={addSubjectField}
<<<<<<< HEAD
                  className="text-blue-600 hover:underline font-medium"
=======
                  className="text-blue-600 hover:underline font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
>>>>>>> Final commit - project completed and ready for deployment
                >
                  + Add another subject
                </button>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
<<<<<<< HEAD
                  className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition"
=======
                  className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
>>>>>>> Final commit - project completed and ready for deployment
                >
                  Save Subjects
                </button>
              </div>
            </form>
          </div>
<<<<<<< HEAD
        </div>
      </div>

    
    </div>
  );
}
=======
        </main>
      </div>
    </div>
  );
}
>>>>>>> Final commit - project completed and ready for deployment
