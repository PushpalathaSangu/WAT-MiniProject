// App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Footer from './components/Footer/Footer';

const App = () => {
  return (
    <div className="flex flex-col min-h-screen"> 
      <Navbar />
      
      <main className="flex-grow pt-20"> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      
      <Footer /> 
    </div>
  );
};

export default App;
