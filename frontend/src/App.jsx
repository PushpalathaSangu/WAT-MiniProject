import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import Home from './pages/Home/Home.jsx';
import Login from './pages/Login/Login.jsx';

import FacultyRegister from './pages/Faculty/FacultyRegister.jsx';
import StudentRegister from './pages/Student/StudentRegister.jsx';
import AdminRegister from './pages/Admin/AdminRegister.jsx';

import Student from './pages/Student/Student.jsx';
import Faculty from './pages/Faculty/Faculty.jsx';
import Admin from './pages/Admin/Admin.jsx';

import CreateWATPage from './pages/Faculty/CreateWatPage.jsx';

import WATAttemptPage from './pages/Student/WatAttemptPage.jsx';
import About from './pages/About/About.jsx';

import AdminProfile from './pages/Admin/AdminProfile.jsx';
import UpdateProfile from './pages/Admin/UpdateProfile.jsx';
import Subjects from './pages/Admin/Subjects.jsx';
import StudentDetails from './pages/Admin/StudentDetails.jsx';
import FacultyDetails from './pages/Admin/FacultyDetails.jsx'

const App = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/studentregister" || location.pathname === "/facultyregister" || location.pathname === "/adminregister";

  return (
    <div className="flex flex-col min-h-screen">
      {!isAuthPage && <Navbar />}
      <main className="flex-grow pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/studentregister" element={<StudentRegister />} />
          <Route path="/facultyregister" element={<FacultyRegister />} />
          <Route path="/adminregister" element={<AdminRegister />} />

          <Route path="/student-dashboard" element={<Student />} />
          <Route path="/faculty-dashboard" element={<Faculty />} />
          <Route path="/admin-dashboard" element={<Admin />} />

          <Route path="/admin/profile" element={<AdminProfile />} />
          <Route path="/admin/update-profile" element={<UpdateProfile/>} />
          <Route path="/admin/subjects" element={<Subjects />} />
          <Route path="/admin/students" element={<StudentDetails />} />
          <Route path="/admin/faculty" element={<FacultyDetails />} />

          <Route path="/create-wat" element={<CreateWATPage />} />
     
          <Route path="/wats/:id" element={<WATAttemptPage />} />
        </Routes>
      </main>
      {!isAuthPage && <Footer />}
    </div>
  );
};

export default App;
