import image1 from '../../assets/image1.jpg';
import { Link } from 'react-router-dom';
import './Login.css';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import React from 'react';

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: ""
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    userType: ""
  });

  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    let valid = true;
    let newErrors = { email: "", password: "", userType: "" };

    if (!formData.email.trim()) {
      newErrors.email = "* Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "* Invalid email format";
      valid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = "* Password is required";
      valid = false;
    }

    if (!formData.userType) {
      newErrors.userType = "* Please select a user type";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: value ? "" : prevErrors[name],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert(`Login successful as ${formData.userType}!`);

      setFormData({
        email: "",
        password: "",
        userType: ""
      });

      setErrors({
        email: "",
        password: "",
        userType: ""
      });
    }
  };

  return (
    <div className='min-h-screen flex flex-col md:flex-row items-center justify-center bg-gray-100 p-4'>
      {/* Left Side - Image */}
      <div className="w-full md:w-2/5 p-4 flex flex-col items-center bg-blue-200 rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none">
        <h1 className="text-2xl font-bold mb-2 text-blue-900">Welcome Back</h1>
        <img src={image1} alt="Welcome" className="w-64 h-48 object-cover rounded-xl mb-3 shadow-md" />
        <p className="text-sm text-center">
          Don't have an account yet?{' '}
          <Link to="/signup" className="text-blue-600 hover:underline font-medium">
            Sign up
          </Link>
        </p>
      </div>

      {/* Right Side - Form */}
      <div className='w-full md:w-2/5 bg-white p-6 shadow-md rounded-b-3xl md:rounded-r-3xl md:rounded-bl-none'>
        <form onSubmit={handleSubmit}>
          <h1 className='text-2xl font-bold mb-4 text-center'>Login</h1>

          {/* Email Field */}
          <div className='mb-3'>
            <input
              type='email'
              placeholder='Email'
              name="email"
              value={formData.email}
              onChange={handleChange}
              className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm'
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Password Field */}
          <div className='mb-3 relative'>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            autoComplete="new-password"
          />

            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          {/* User Type Dropdown */}
          <div className='mb-4'>
            <select
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-700'
            >
              <option value="">-- Select User Type --</option>
              <option value="Student">Student</option>
              <option value="Faculty">Faculty</option>
              <option value="Admin">Admin</option>
            </select>
            {errors.userType && <p className="text-red-500 text-xs mt-1">{errors.userType}</p>}
          </div>

          <button
            type="submit"
            className='w-full bg-blue-600 text-white py-2 rounded text-sm hover:bg-blue-700 transition duration-300'
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
