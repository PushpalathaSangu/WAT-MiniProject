import React from 'react';
// import homeImage from '../../assets/logo1.jpeg';
import homeImage from '../../assets/home.jpeg';
import { FaClipboardCheck, FaChartLine, FaCalendarAlt, FaUserGraduate, FaUserTie, FaUserShield, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const userTypes = [
    {
      role: "Student",
      icon: <FaUserGraduate className="w-12 h-12 mx-auto mb-4 text-blue-600" />,
      description: "Take weekly assessments, track your progress, and receive personalized feedback to improve your performance.",
      benefits: [
        "Personalized dashboard",
        "Performance analytics",
        "Subject-wise breakdown"
      ]
    },
    {
      role: "Faculty",
      icon: <FaUserTie className="w-12 h-12 mx-auto mb-4 text-green-600" />,
      description: "Create and manage assessments, monitor student progress, and provide targeted guidance to your class.",
      benefits: [
        "Assessment creator",
        "Class performance reports",
        "Automated grading"
      ]
    },
    {
      role: "Admin",
      icon: <FaUserShield className="w-12 h-12 mx-auto mb-4 text-purple-600" />,
      description: "Manage the entire assessment platform, oversee user accounts, and generate institutional reports.",
      benefits: [
        "User management",
        "Institutional analytics",
        "System configuration"
      ]
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === userTypes.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? userTypes.length - 1 : prev - 1));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          Weekly Assessment <span className="text-blue-600">Tests</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Track your progress, identify strengths, and improve weaknesses with our comprehensive weekly assessment platform.
        </p>
        
        <div className="flex justify-center mb-8">
          <img 
            src={homeImage} 
            alt="Weekly Assessment Visual" 
            className="w-full max-w-2xl rounded-lg shadow-xl border-4 border-white" 
          />
        </div>
        
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          <button 
            onClick={() => navigate('/login')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300 transform hover:scale-105"
          >
            Login
          </button>
          <button 
            onClick={() => navigate('/register')}
            className="bg-white hover:bg-gray-100 text-blue-600 font-semibold py-3 px-8 border border-blue-600 rounded-lg shadow-md transition duration-300"
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* Features Section */}
<div className="bg-white py-12">
  <div className="container mx-auto px-6">
    <h2 className="text-3xl font-bold text-center text-gray-800 mb-12 ">Benefits</h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      <FeatureCard 
        icon={<FaClipboardCheck className="w-8 h-8" />}
        title="Comprehensive Tests"
        description="Weekly tests covering all major subjects and topics to ensure complete evaluation."
      />
      <FeatureCard 
        icon={<FaChartLine className="w-8 h-8" />}
        title="Progress Tracking"
        description="Visual analytics to track your improvement over time and identify patterns."
      />
      <FeatureCard 
        icon={<FaCalendarAlt className="w-8 h-8" />}
        title="Regular Schedule"
        description="Consistent weekly schedule to build discipline and regular evaluation habits."
      />
      <FeatureCard 
        icon={<FaUserGraduate className="w-8 h-8" />}
        title="Expert Evaluation"
        description="Tests designed by subject matter experts to ensure quality and relevance."
      />
    </div>
  </div>
</div>


      {/* User Types Carousel */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Designed For Everyone</h2>
          
          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {userTypes.map((user, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                      <div className="text-center">
                        {user.icon}
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">{user.role}</h3>
                        <p className="text-gray-600 mb-6">{user.description}</p>
                        <ul className="text-left max-w-md mx-auto space-y-2 mb-6">
                          {user.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-start">
                              <span className="text-green-500 mr-2">✓</span>
                              <span className="text-gray-700">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                        <button 
                          onClick={() => navigate('/register')}
                          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                          Get Started
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <button 
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
            >
              <FaChevronLeft className="text-gray-600" />
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
            >
              <FaChevronRight className="text-gray-600" />
            </button>
            
            <div className="flex justify-center mt-8 space-x-2">
              {userTypes.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-blue-600' : 'bg-gray-300'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 border border-gray-100">
      <div className="text-blue-600 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default Home;