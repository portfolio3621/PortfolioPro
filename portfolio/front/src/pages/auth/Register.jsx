import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineUserCircle,
  HiOutlinePhone,
  HiOutlineLocationMarker,
  HiOutlineBriefcase,
  HiOutlineAcademicCap,
  HiOutlineCode,
  HiOutlineDocumentText,
} from "react-icons/hi";
import Experience from "./component/Experience";
import Education from "./component/Education";
import Skills from "./component/Skills";
import Fetch from "../../Fetch";
import { useCookies } from "react-cookie";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    experience: [],
    education: [],
    skills: [],
    about: "",
    phone: "",
    address: "",
    terms: false,
  });
  
  const navigate = useNavigate();
  const [, setUserCookie] = useCookies(["userId"]);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isHovered, setIsHovered] = useState({
    submit: false,
    login: false
  });
  const [activeStep, setActiveStep] = useState(1);
  const [particles, setParticles] = useState([]);
  const [focusedField, setFocusedField] = useState(null);

  // Floating particles background
  useEffect(() => {
    const newParticles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      speed: Math.random() * 0.2 + 0.1,
      opacity: Math.random() * 0.3 + 0.1,
      color: ['blue', 'purple', 'pink'][Math.floor(Math.random() * 3)]
    }));
    setParticles(newParticles);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleGenderSelect = (gender) => {
    setFormData((prev) => ({
      ...prev,
      gender,
    }));
  };

  const validateForm = () => {
    const newErrors = {
      name: !formData.name
        ? "Name is required"
        : formData.name.length < 2
        ? "Name must be at least 2 characters"
        : "",
      email: !formData.email
        ? "Email is required"
        : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
        ? "Invalid email format"
        : "",
      password: !formData.password
        ? "Password is required"
        : formData.password.length < 6
        ? "Password must be at least 6 characters"
        : "",
      confirmPassword:
        formData.password !== formData.confirmPassword
          ? "Passwords do not match"
          : "",
      terms: !formData.terms ? "You must accept the terms" : "",
      phone:
        formData.phone && !/^[0-9]{10,15}$/.test(formData.phone)
          ? "Invalid phone number"
          : "",
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const data = await Fetch.post("register", formData);
      navigate("/file/upload");
      setUserCookie("userId", data.data._id, {
        path: "/",
        secure: true,
        sameSite: "strict",
        maxAge: 2592000,
      });
    } catch (error) {
      console.error("Registration error:", error);
      setErrors(prev => ({
        ...prev,
        server: error.response?.data?.message || "Registration failed. Please try again."
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { id: 1, title: "Basic Info", icon: "👤" },
    { id: 2, title: "Profile", icon: "📝" },
    { id: 3, title: "Experience", icon: "💼" },
    { id: 4, title: "Skills", icon: "⚡" },
  ];

  const renderStepContent = () => {
    switch (activeStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Full Name *
                </label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                      <HiOutlineUser className={`h-5 w-5 ${focusedField === 'name' ? 'text-blue-500' : 'text-gray-400'}`} />
                    </div>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 bg-white/70 dark:bg-gray-800/70 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none transition-all ${
                        errors.name 
                          ? 'border-red-500 focus:border-red-500' 
                          : 'border-gray-200 dark:border-gray-700 focus:border-blue-500'
                      }`}
                      placeholder="John Doe"
                    />
                  </div>
                  {errors.name && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-red-500 dark:text-red-400 flex items-center gap-2 mt-1"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      {errors.name}
                    </motion.p>
                  )}
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email *
                </label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                      <HiOutlineMail className={`h-5 w-5 ${focusedField === 'email' ? 'text-blue-500' : 'text-gray-400'}`} />
                    </div>
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 bg-white/70 dark:bg-gray-800/70 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none transition-all ${
                        errors.email 
                          ? 'border-red-500 focus:border-red-500' 
                          : 'border-gray-200 dark:border-gray-700 focus:border-blue-500'
                      }`}
                      placeholder="your@email.com"
                    />
                  </div>
                  {errors.email && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-red-500 dark:text-red-400 flex items-center gap-2 mt-1"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      {errors.email}
                    </motion.p>
                  )}
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password *
                </label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                      <HiOutlineLockClosed className={`h-5 w-5 ${focusedField === 'password' ? 'text-blue-500' : 'text-gray-400'}`} />
                    </div>
                    <input
                      name="password"
                      type="password"
                      minLength={6}
                      value={formData.password}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('password')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 bg-white/70 dark:bg-gray-800/70 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none transition-all ${
                        errors.password 
                          ? 'border-red-500 focus:border-red-500' 
                          : 'border-gray-200 dark:border-gray-700 focus:border-blue-500'
                      }`}
                      placeholder="••••••"
                    />
                  </div>
                  {errors.password && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-red-500 dark:text-red-400 flex items-center gap-2 mt-1"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      {errors.password}
                    </motion.p>
                  )}
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Confirm Password *
                </label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                      <HiOutlineLockClosed className={`h-5 w-5 ${focusedField === 'confirmPassword' ? 'text-blue-500' : 'text-gray-400'}`} />
                    </div>
                    <input
                      name="confirmPassword"
                      type="password"
                      minLength={6}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('confirmPassword')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 bg-white/70 dark:bg-gray-800/70 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none transition-all ${
                        errors.confirmPassword 
                          ? 'border-red-500 focus:border-red-500' 
                          : 'border-gray-200 dark:border-gray-700 focus:border-blue-500'
                      }`}
                      placeholder="••••••"
                    />
                  </div>
                  {errors.confirmPassword && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-red-500 dark:text-red-400 flex items-center gap-2 mt-1"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      {errors.confirmPassword}
                    </motion.p>
                  )}
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
              (6 characters minimum)
            </p>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            {/* Gender Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                Gender *
              </label>
              <div className="grid grid-cols-2 gap-4">
                <motion.button
                  type="button"
                  onClick={() => handleGenderSelect("Male")}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative overflow-hidden p-4 rounded-xl border-2 transition-all duration-200 ${
                    formData.gender === "Male"
                      ? "border-blue-500 bg-gradient-to-r from-blue-500/10 to-blue-600/5 shadow-lg shadow-blue-500/20"
                      : "border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 hover:border-blue-400"
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <div className={`p-3 rounded-full mb-2 ${
                      formData.gender === "Male"
                        ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                    }`}>
                      <HiOutlineUserCircle className="h-6 w-6" />
                    </div>
                    <span className="text-sm font-medium">Male</span>
                  </div>
                </motion.button>

                <motion.button
                  type="button"
                  onClick={() => handleGenderSelect("Female")}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative overflow-hidden p-4 rounded-xl border-2 transition-all duration-200 ${
                    formData.gender === "Female"
                      ? "border-pink-500 bg-gradient-to-r from-pink-500/10 to-pink-600/5 shadow-lg shadow-pink-500/20"
                      : "border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 hover:border-pink-400"
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <div className={`p-3 rounded-full mb-2 ${
                      formData.gender === "Female"
                        ? "bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                    }`}>
                      <HiOutlineUser className="h-6 w-6" />
                    </div>
                    <span className="text-sm font-medium">Female</span>
                  </div>
                </motion.button>
              </div>
            </div>

            {/* About */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                About You
              </label>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <div className="absolute left-3 top-3">
                    <HiOutlineDocumentText className={`h-5 w-5 ${focusedField === 'about' ? 'text-blue-500' : 'text-gray-400'}`} />
                  </div>
                  <textarea
                    name="about"
                    value={formData.about}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('about')}
                    onBlur={() => setFocusedField(null)}
                    rows={3}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border-2 bg-white/70 dark:bg-gray-800/70 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none transition-all border-gray-200 dark:border-gray-700 focus:border-blue-500"
                    placeholder="Brief introduction about yourself..."
                  />
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Address
              </label>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <HiOutlineLocationMarker className={`h-5 w-5 ${focusedField === 'address' ? 'text-blue-500' : 'text-gray-400'}`} />
                  </div>
                  <input
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('address')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border-2 bg-white/70 dark:bg-gray-800/70 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none transition-all border-gray-200 dark:border-gray-700 focus:border-blue-500"
                    placeholder="Your location"
                  />
                </div>
              </div>
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Phone Number
              </label>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <HiOutlinePhone className={`h-5 w-5 ${focusedField === 'phone' ? 'text-blue-500' : 'text-gray-400'}`} />
                  </div>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('phone')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 bg-white/70 dark:bg-gray-800/70 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none transition-all ${
                      errors.phone 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-gray-200 dark:border-gray-700 focus:border-blue-500'
                    }`}
                    placeholder="Enter your phone number"
                  />
                </div>
                {errors.phone && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-red-500 dark:text-red-400 flex items-center gap-2 mt-1"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    {errors.phone}
                  </motion.p>
                )}
              </div>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-6">
            {/* Experience Section */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <HiOutlineBriefcase className="h-5 w-5 text-blue-500" />
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Work Experience
                </label>
              </div>
              <Experience
                experiences={formData.experience}
                setExperiences={(exp) =>
                  setFormData({ ...formData, experience: exp })
                }
              />
            </div>

            {/* Education Section */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <HiOutlineAcademicCap className="h-5 w-5 text-purple-500" />
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Education
                </label>
              </div>
              <Education
                education={formData.education}
                setEducation={(edu) =>
                  setFormData({ ...formData, education: edu })
                }
              />
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-6">
            {/* Skills Section */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <HiOutlineCode className="h-5 w-5 text-green-500" />
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Skills
                </label>
              </div>
              <Skills
                skills={formData.skills}
                setSkills={(a) => setFormData({ ...formData, skills: a })}
              />
            </div>

            {/* Terms and Conditions */}
            <div className="space-y-2">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    checked={formData.terms}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded"
                  />
                </div>
                <div className="ml-3">
                  <label htmlFor="terms" className="block text-sm text-gray-700 dark:text-gray-300">
                    I agree to the{" "}
                    <a href="#" className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300">
                      terms and conditions
                    </a>
                    *
                  </label>
                  {errors.terms && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-sm text-red-500 dark:text-red-400 flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      {errors.terms}
                    </motion.p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-slate-950 p-4 overflow-hidden relative">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className={`absolute rounded-full ${
              particle.color === 'blue' 
                ? 'bg-blue-400/30 dark:bg-blue-500/40' 
                : particle.color === 'purple'
                ? 'bg-purple-400/30 dark:bg-purple-500/40'
                : 'bg-pink-400/30 dark:bg-pink-500/40'
            }`}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
              opacity: particle.opacity,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.sin(particle.id) * 5, 0],
            }}
            transition={{
              duration: 3 + particle.speed * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-2xl z-10"
      >
        {/* Card glow effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl opacity-20 dark:opacity-30 blur-xl" />

        {/* Card content */}
        <div className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-white/50 dark:border-gray-700/50 rounded-3xl shadow-2xl shadow-gray-500/10 dark:shadow-black/30 overflow-hidden">
          
          {/* Decorative header gradient */}
          <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
          
          <div className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="relative inline-block mb-4">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-lg opacity-60" />
                <div className="relative w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <HiOutlineUserCircle className="w-8 h-8 text-white" />
                </div>
              </div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent mb-2"
              >
                Join Our Network
              </motion.h1>
              <p className="text-gray-500 dark:text-gray-400">
                Create your professional profile in minutes
              </p>
            </div>

            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex justify-between items-center relative">
                {steps.map((step, index) => (
                  <React.Fragment key={step.id}>
                    {/* Step Circle */}
                    <div className="relative z-10">
                      <div 
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                          activeStep >= step.id
                            ? 'bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg shadow-blue-500/30'
                            : 'bg-gray-200 dark:bg-gray-700'
                        }`}
                      >
                        <span className={`text-lg ${activeStep >= step.id ? 'text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                          {step.icon}
                        </span>
                      </div>
                      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                        <span className={`text-xs font-medium ${
                          activeStep >= step.id 
                            ? 'text-blue-600 dark:text-blue-400' 
                            : 'text-gray-500 dark:text-gray-400'
                        }`}>
                          {step.title}
                        </span>
                      </div>
                    </div>
                    
                    {/* Connection Line */}
                    {index < steps.length - 1 && (
                      <div className="absolute top-6 left-1/2 w-full -z-10">
                        <div className={`h-1 w-full ${
                          activeStep > step.id 
                            ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                            : 'bg-gray-200 dark:bg-gray-700'
                        }`} />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {renderStepContent()}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                {activeStep > 1 ? (
                  <motion.button
                    type="button"
                    onClick={() => setActiveStep(prev => prev - 1)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
                  >
                    Back
                  </motion.button>
                ) : (
                  <div />
                )}

                {activeStep < steps.length ? (
                  <motion.button
                    type="button"
                    onClick={() => setActiveStep(prev => prev + 1)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
                  >
                    Continue
                  </motion.button>
                ) : (
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    onMouseEnter={() => setIsHovered(prev => ({ ...prev, submit: true }))}
                    onMouseLeave={() => setIsHovered(prev => ({ ...prev, submit: false }))}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative overflow-hidden px-8 py-3 rounded-xl font-medium transition-all duration-300 ${
                      isSubmitting 
                        ? 'bg-gradient-to-r from-blue-400 to-purple-400 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
                    }`}
                  >
                    {/* Button shine effect */}
                    <motion.div
                      initial={{ x: "-100%" }}
                      animate={{ x: isHovered.submit ? "100%" : "-100%" }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    />
                    
                    <div className="relative flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                          />
                          <span className="text-white">Creating Account...</span>
                        </>
                      ) : (
                        <>
                          <span className="text-white">Complete Registration</span>
                          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </>
                      )}
                    </div>
                  </motion.button>
                )}
              </div>
            </form>

            {/* Login Link */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <Link 
                  to="/login"
                  onMouseEnter={() => setIsHovered(prev => ({ ...prev, login: true }))}
                  onMouseLeave={() => setIsHovered(prev => ({ ...prev, login: false }))}
                  className="font-medium text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors inline-flex items-center gap-1 group"
                >
                  <span>Sign in</span>
                  <motion.svg
                    animate={{ x: isHovered.login ? 4 : 0 }}
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </motion.svg>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;