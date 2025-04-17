import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import image1 from '../../assets/image1.jpg';
import './Login.css';

function Login() {
  const navigate = useNavigate();

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

  // Validation function
  const validate = () => {
    let valid = true;
    const newErrors = { email: "", password: "", userType: "" };

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

  // Form change handler
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    setErrors(prev => ({
      ...prev,
      [name]: value ? "" : prev[name]
    }));
  };

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        const response = await axios.post('http://localhost:5000/auth/login', {
          email: formData.email,
          password: formData.password,
          role: formData.userType.toLowerCase()
        });
        console.log(response)
        localStorage.setItem("token", response.data.token); // store JWT
        localStorage.setItem("user",response.data.user);
        alert(response.data.message);

        // Navigate based on role
        switch (formData.userType) {
          case 'Student':
            navigate('/student-dashboard');
            break;
          case 'Faculty':
            navigate('/faculty-dashboard');
            break;
          case 'Admin':
            navigate('/admin-dashboard');
            break;
          default:
            navigate('/')
            break;
        }
       
        // Reset form
        setFormData({ email: "", password: "", userType: "" });
        setErrors({ email: "", password: "", userType: "" });

        setShowPassword(false);

      } catch (err) {
        if (err.response?.data?.message) {
          alert(err.response.data.message);
        } else {
          alert("Login failed. Please try again.");
          console.log(err);
        }
      }
    }
  };

  return (
    <div className='min-h-screen flex flex-col md:flex-row items-center justify-center bg-gray-100 p-4'>
      
      {/* Left Side - Welcome Section */}
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

      {/* Right Side - Login Form */}
      <div className='w-full md:w-2/5 bg-white p-6 shadow-md rounded-b-3xl md:rounded-r-3xl md:rounded-bl-none'>
        <form onSubmit={handleSubmit} autoComplete="off">
          <h1 className='text-2xl font-bold mb-4 text-center'>Login</h1>

          {/* Email Input */}
          <div className='mb-3'>
            <input
              type='email'
              name="email"
              placeholder='Email'
              value={formData.email}
              onChange={handleChange}
              className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm'
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Password Input */}
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

          {/* Role Selection */}
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

          {/* Submit Button */}
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
