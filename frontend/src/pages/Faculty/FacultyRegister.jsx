import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import image2 from "../../assets/imag35.jpeg";
import { useNavigate } from "react-router-dom";

const FacultyRegister = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    years: [],
    subjects: {},
    contact: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(false);

  const yearOptions = ["E1", "E2", "E3", "E4"];

  useEffect(() => {
    if (isRegistered) {
      const timer = setTimeout(() => {
        setIsRegistered(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isRegistered]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleYearChange = (e) => {
    const { value, checked } = e.target;
    let newYears = [...formData.years];
    let newSubjects = { ...formData.subjects };

    if (checked) {
      newYears.push(value);
      newSubjects[value] = [""];
    } else {
      newYears = newYears.filter((year) => year !== value);
      delete newSubjects[value];
    }

    setFormData({ ...formData, years: newYears, subjects: newSubjects });
  };

  const handleSubjectChange = (year, index, value) => {
    const updatedSubjects = { ...formData.subjects };
    updatedSubjects[year][index] = value;
    setFormData({ ...formData, subjects: updatedSubjects });
  };

  const addSubjectField = (year) => {
    const updatedSubjects = { ...formData.subjects };
    updatedSubjects[year].push("");
    setFormData({ ...formData, subjects: updatedSubjects });
  };

  const removeSubjectField = (year, index) => {
    const updatedSubjects = { ...formData.subjects };
    updatedSubjects[year].splice(index, 1);
    setFormData({ ...formData, subjects: updatedSubjects });
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

    if (formData.years.length === 0)
      newErrors.years = "*Please select at least one year";

    const subjectErrors = {};
    formData.years.forEach((year) => {
      const subjects = formData.subjects[year] || [];
      const errors = subjects.map((subject) =>
        subject.trim() === "" ? "*Subject is required" : ""
      );
      if (errors.some((error) => error !== "")) {
        subjectErrors[year] = errors;
      }
    });

    if (!formData.contact.trim()) {
      newErrors.contact = "*Contact number is required";
    } else if (!/^\d{10}$/.test(formData.contact)) {
      newErrors.contact = "*Contact must be a valid 10-digit number";
    }

    if (Object.keys(subjectErrors).length > 0) {
      newErrors.subjects = subjectErrors;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5000/faculty/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        console.log(formData);
        if (response.ok) {
          setIsRegistered(true);
          setFormData({
            name: "",
            email: "",
            password: "",
            years: [],
            subjects: {},
            contact: "",
          });
          setErrors({});
          navigate("/login");
        } else {
          console.error("Failed to register the faculty");
        }
      } catch (error) {
        console.error("Error occurred while registering:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      {/* Left Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6">
        <h1 className="text-3xl font-bold text-sky-500 mb-4">Welcome</h1>
        <img src={image2} alt="Signup Visual" className="h-40 w-auto mb-4" />
        <p className="text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>

      {/* Right Section - Form */}
      <div className="w-full md:w-1/2 bg-sky-500 flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-sky-500 mb-4 text-center">
            Faculty Registration
          </h2>

          {isRegistered && (
            <div className="text-green-600 text-sm font-medium text-center bg-green-100 p-2 rounded mb-4">
              Successfully Registered!
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3 text-black">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
            />
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name}</p>
            )}

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email}</p>
            )}

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
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password}</p>
            )}

            <div>
              <label className="block mb-1 font-medium">Years Handling</label>
              <div className="grid grid-cols-2 gap-2">
                {yearOptions.map((year) => (
                  <label key={year} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={year}
                      checked={formData.years.includes(year)}
                      onChange={handleYearChange}
                    />
                    <span>{year}</span>
                  </label>
                ))}
              </div>
              {errors.years && (
                <p className="text-red-500 text-xs">{errors.years}</p>
              )}
            </div>

            {formData.years.map((year) => (
              <div key={year} className="mt-4">
                <label className="font-medium">Subjects for {year}:</label>
                {formData.subjects[year].map((subject, index) => (
                  <div key={index} className="flex items-center space-x-2 mt-2">
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) =>
                        handleSubjectChange(year, index, e.target.value)
                      }
                      placeholder={`Subject ${index + 1}`}
                      className="w-full border border-gray-300 p-2 rounded"
                    />
                    <button
                      type="button"
                      onClick={() => removeSubjectField(year, index)}
                      className="text-red-500"
                    >
                      X
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addSubjectField(year)}
                  className="text-blue-500 mt-2"
                >
                  Add Subject
                </button>
              </div>
            ))}

            <input
              type="text"
              name="contact"
              placeholder="Contact Number"
              value={formData.contact}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded mt-4"
            />
            {errors.contact && (
              <p className="text-red-500 text-xs">{errors.contact}</p>
            )}

            <button
              type="submit"
              className="w-full bg-sky-500 text-white p-2 rounded mt-4"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FacultyRegister;
