import React, { useState, useEffect, useRef } from "react";
import { 
  HiSearch, 
  HiOutlineUser, 
  HiOutlineLogout, 
  HiOutlineCog,
  HiOutlineQuestionMarkCircle,
  HiOutlineShoppingCart,
  HiOutlineTicket,
  HiMenu,
  HiX,
  HiOutlineChartBar,
  HiOutlineHome
} from "react-icons/hi";
import {
  FaSun,
  FaMoon
} from "react-icons/fa";
import { 
  MdOutlineDashboard,
  MdOutlineColorLens
} from "react-icons/md";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Fetch from "../../Fetch";

export default function Nav({ removeCookie, userData }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState(3);
  const profileRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const logout = async () => {
    try {
      removeCookie("userId", { path: "/" });
      await Fetch.get("logout");
    } catch (err) {
      console.error(err);
    }
  };

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("portfolio-theme", newTheme);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Initialize theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolio-theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  const navLinks = [
    { name: "Dashboard", path: "/dashboard", icon: <MdOutlineDashboard /> },
    { name: "Claim Portfolio", path: "/portfolio/claim", icon: <HiOutlineTicket /> },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left Section - Logo & Desktop Menu */}
            <div className="flex items-center space-x-8">
              {/* Logo */}
              <Link to="/" className="flex items-center group">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <span className="text-white font-bold text-lg">P</span>
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                </div>
                <div className="ml-3">
                  <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    PortfolioPro
                  </span>
                  <p className="text-xs text-gray-500 dark:text-gray-400 hidden md:block">Premium Dashboard</p>
                </div>
              </Link>

              {/* Desktop Navigation Links */}
              <div className="hidden md:flex items-center space-x-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-200 group"
                  >
                    <span className="mr-2 text-lg opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-200">
                      {link.icon}
                    </span>
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Section - Actions & Profile */}
            <div className="flex items-center space-x-3">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <div className="text-yellow-400">
                    <FaSun />
                  </div>
                ) : (
                  <div>
                    <FaMoon />
                  </div>
                )}
              </button>


              {/* Buy Portfolio Button */}
              <div className="hidden md:block">
                <Link to="/portfolio/buy">
                  <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 flex items-center space-x-2">
                    <HiOutlineShoppingCart className="w-4 h-4" />
                    <span>Buy Portfolio</span>
                  </button>
                </Link>
              </div>

              {/* Profile Dropdown */}
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 focus:outline-none group"
                  aria-label="User menu"
                  aria-expanded={isProfileOpen}
                >
                  <div className="relative">
                    <img
                      src={userData.avatarUrl || "/user.png"}
                      alt="Profile"
                      className="w-10 h-10 rounded-xl border-2 border-transparent group-hover:border-blue-500 transition-all duration-300"
                    />
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-semibold text-gray-800 dark:text-white">
                      {userData.name || "User"}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[120px]">
                      {userData.email || "user@example.com"}
                    </p>
                  </div>
                </button>

                {/* Profile Dropdown Menu */}
                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2, type: "spring", stiffness: 300 }}
                      className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
                    >
                      {/* User Info */}
                      <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                        <div className="flex items-center">
                          <img
                            src={userData.avatarUrl || "/user.png"}
                            alt="Profile"
                            className="h-12 w-12 rounded-xl mr-3"
                          />
                          <div>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">
                              {userData.name || "User"}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                              {userData.email || "user@example.com"}
                            </p>
                          </div>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-xs px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
                            Premium Member
                          </span>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        <Link
                          to="/dashboard"
                          className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <MdOutlineDashboard className="mr-3 h-5 w-5 text-gray-400" />
                          Dashboard
                        </Link>
                        <Link
                          to="/manage-profile"
                          className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <HiOutlineUser className="mr-3 h-5 w-5 text-gray-400" />
                          Manage Profile
                        </Link>
                        <Link
                          to="/settings"
                          className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <HiOutlineCog className="mr-3 h-5 w-5 text-gray-400" />
                          Settings
                        </Link>
                      </div>

                      <div className="py-2 border-t border-gray-100 dark:border-gray-700">
                        <Link
                          to="/help"
                          className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <HiOutlineQuestionMarkCircle className="mr-3 h-5 w-5 text-gray-400" />
                          Help & Support
                        </Link>
                      </div>

                      <div className="py-2 border-t border-gray-100 dark:border-gray-700">
                        <button
                          className="flex items-center w-full px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                          onClick={() => {
                            setIsProfileOpen(false);
                            logout();
                          }}
                        >
                          <HiOutlineLogout className="mr-3 h-5 w-5" />
                          Log out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {isMobileMenuOpen ? (
                  <HiX className="w-6 h-6" />
                ) : (
                  <HiMenu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 right-0 w-80 bg-white dark:bg-gray-800 shadow-2xl z-50 md:hidden overflow-y-auto"
              ref={mobileMenuRef}
            >
              <div className="p-6">
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">P</span>
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-800 dark:text-white">PortfolioPro</h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Mobile Menu</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <HiX className="w-6 h-6" />
                  </button>
                </div>

                {/* User Info */}
                <div className="mb-8 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-750 dark:to-gray-700">
                  <div className="flex items-center space-x-3">
                    <img
                      src={userData.avatarUrl || "/user.png"}
                      alt="Profile"
                      className="w-14 h-14 rounded-xl"
                    />
                    <div>
                      <h3 className="font-bold text-gray-800 dark:text-white">{userData.name || "User"}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{userData.email || "user@example.com"}</p>
                      <span className="text-xs px-2 py-1 mt-1 inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
                        Premium
                      </span>
                    </div>
                  </div>
                </div>

                {/* Mobile Navigation Links */}
                <nav className="space-y-2 mb-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      className="flex items-center p-4 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="mr-3 text-xl">{link.icon}</span>
                      <span className="font-medium">{link.name}</span>
                    </Link>
                  ))}
                </nav>

                {/* Mobile Action Buttons */}
                <div className="space-y-3 mb-8">
                  <Link to="/portfolio/buy" onClick={() => setIsMobileMenuOpen(false)}>
                    <button className="w-full flex items-center justify-center space-x-2 p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all">
                      <HiOutlineShoppingCart className="w-5 h-5" />
                      <span>Buy Portfolio</span>
                    </button>
                  </Link>
                  
                  <Link to="/portfolio/claim" onClick={() => setIsMobileMenuOpen(false)}>
                    <button className="w-full flex items-center justify-center space-x-2 p-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                      <HiOutlineTicket className="w-5 h-5" />
                      <span>Claim Portfolio</span>
                    </button>
                  </Link>
                </div>

                {/* Mobile Settings */}
                <div className="space-y-2">
                  <button
                    onClick={toggleTheme}
                    className="w-full flex items-center p-4 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
                  >
                    <MdOutlineColorLens className="mr-3 text-xl" />
                    <span className="font-medium">
                      {theme === 'light' ? 'Switch to Dark' : 'Switch to Light'} Mode
                    </span>
                  </button>
                  
                  <Link
                    to="/help"
                    className="flex items-center p-4 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <HiOutlineQuestionMarkCircle className="mr-3 text-xl" />
                    <span className="font-medium">Help & Support</span>
                  </Link>
                  
                  <button
                    onClick={logout}
                    className="w-full flex items-center p-4 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
                  >
                    <HiOutlineLogout className="mr-3 text-xl" />
                    <span className="font-medium">Log Out</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}