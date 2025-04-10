import React from 'react';
import homeImage from '../../assets/image6.jpeg'; // Replace with your actual image file

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6">
      <p className="text-xl font-semibold mb-4">Weekly Assessments Test</p>
      <img 
        src={homeImage} 
        alt="Weekly Assessment Visual" 
        className="w-80 h-auto rounded shadow-md" 
      />
    </div>
  );
};

export default Home;
