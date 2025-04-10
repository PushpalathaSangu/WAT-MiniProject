import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Signup.css";
import image2 from "../../assets/image3.jpeg";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    year: "",
    section: "",
    studentId: "",
    rollNumber: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "*Name is required";
    if (!formData.email.trim()) newErrors.email = "*Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "*Email is invalid";

    if (!formData.password.trim()) newErrors.password = "*Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "*Password must be at least 6 characters";

    if (!formData.year) newErrors.year = "*Please select your year";
    if (!formData.section) newErrors.section = "*Please select your section";

    if (!formData.studentId.trim())
      newErrors.studentId = "*Student ID is required";
    else if (!/^R2\d{6}$/i.test(formData.studentId))
      newErrors.studentId = "*Student ID must be in format R2XXXXXX";

    if (!formData.rollNumber.trim())
      newErrors.rollNumber = "*Roll Number is required";
    else if (!/^\d+$/.test(formData.rollNumber))
      newErrors.rollNumber = "*Roll Number must be a number";
    else if (Number(formData.rollNumber) < 1 || Number(formData.rollNumber) > 72)
      newErrors.rollNumber = "*Roll Number must be between 1 and 72";

    if (!formData.phone.trim()) newErrors.phone = "*Phone number is required";
    else if (!/^\d{10}$/.test(formData.phone))
      newErrors.phone = "*Phone number must be 10 digits";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form Submitted Successfully:", formData);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      {/* Left Side */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6">
        <h1 className="text-3xl font-bold text-sky-500 mb-4">Welcome</h1>
        <img src={image2} alt="Signup Visual" className="h-40 w-auto mb-4 h-70" />
        <p className="text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>

      {/* Right Side - Form */}
      <div className="w-full md:w-1/2 bg-sky-500 flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-sky-500 mb-4 text-center">
            Create Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-3 text-black">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
            />
            {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}

            <div className="relative">
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
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              >
                {showPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
              </span>
            </div>
            {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}

            <input
              type="text"
              name="studentId"
              placeholder="Student ID (R2XXXXXX)"
              value={formData.studentId}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
            />
            {errors.studentId && <p className="text-red-500 text-xs">{errors.studentId}</p>}

            <select
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
            >
              <option value="">Year</option>
              <option value="E1">E1</option>
              <option value="E2">E2</option>
              <option value="E3">E3</option>
              <option value="E4">E4</option>
            </select>
            {errors.year && <p className="text-red-500 text-xs">{errors.year}</p>}

            <div className="flex space-x-2">
              <div className="w-1/2">
                <select
                  name="section"
                  value={formData.section}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                >
                  <option value="">Section</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="E">E</option>
                </select>
                {errors.section && <p className="text-red-500 text-xs">{errors.section}</p>}
              </div>

              <div className="w-1/2">
                <input
                  type="number"
                  name="rollNumber"
                  placeholder="Roll No (1-72)"
                  value={formData.rollNumber}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                  min="1"
                  max="72"
                />
                {errors.rollNumber && <p className="text-red-500 text-xs">{errors.rollNumber}</p>}
              </div>
            </div>

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
            />
            {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}

            <button
              type="submit"
              className="w-full bg-sky-500 text-white py-2 rounded hover:bg-sky-600 transition"
            >
              SIGN UP
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
