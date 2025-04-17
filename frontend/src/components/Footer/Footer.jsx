import React from 'react';

const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white mb-1 py-4 mt-12">
        <div className="container mx-auto text-center space-y-2">
          <p>📧 Email: wat.support@gmail.com</p>
          <p>📱 Phone: +91-9876543210</p>
          <p>📍 Address: CSE Dept,Rajiv Gandhi University of Knowledge Technologies,R.K.Valley , India</p>
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} Weekly Assessment Tests</p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  