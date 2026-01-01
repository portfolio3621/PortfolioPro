// Nav.jsx (modified UI for place/section display)
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiMenu,
  FiX,
  FiSun,
  FiMoon,
  FiShoppingCart,
  FiHome,
  FiUser,
  FiLogOut,
  FiHelpCircle,
  FiChevronRight,
  FiGrid,
  FiBriefcase,
} from 'react-icons/fi';
import { LuTicket } from "react-icons/lu";
import { useUserStore } from "../../stores/userStore";
import Fetch from "../../Fetch.js";

export default function Nav({ removeCookie, place }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const profileRef = useRef(null);
  const location = useLocation();
const {user:userData} = useUserStore();

  // Theme handling
  useEffect(() => {
    const saved = localStorage.getItem('portfolio-theme') || 'light';
    setTheme(saved);
    document.documentElement.classList.toggle('dark', saved === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('portfolio-theme', newTheme);
  };

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
    removeCookie('userId', { path: '/' });
    await Fetch.get("/logout")
    window.location.href = '/login';
    } catch (e) {
      console.error(e)
    }
  };

  const mainLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: <FiHome className="w-5 h-5" /> },
    { name: 'Buy Portfolio', path: '/portfolio/buy', icon: <FiShoppingCart className="w-5 h-5" /> },
    { name: 'Claim Portfolio', path: '/portfolio/claim', icon: <LuTicket className="w-5 h-5" /> },
  ];

  // Section configurations with proper icons and colors
  const sections = {
    dashboard: {
      name: 'Dashboard',
      icon: <FiGrid className="w-4 h-4" />,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-blue-200 dark:border-blue-800',
    },
    profile: {
      name: 'Profile',
      icon: <FiUser className="w-4 h-4" />,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      borderColor: 'border-green-200 dark:border-green-800',
    },
    portfolio: {
      name: 'Portfolio',
      icon: <FiBriefcase className="w-4 h-4" />,
      color: 'from-amber-500 to-orange-500',
      bgColor: 'bg-amber-50 dark:bg-amber-900/20',
      borderColor: 'border-amber-200 dark:border-amber-800',
    },
    default: {
      name: 'Home',
      icon: <FiHome className="w-4 h-4" />,
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
      borderColor: 'border-indigo-200 dark:border-indigo-800',
    }
  };

  const currentSection = sections[place] || sections.default;

  // Get current page name from URL
  const getCurrentPageName = () => {
    const path = location.pathname;
    if (path.includes('/dashboard')) return 'Dashboard';
    if (path.includes('/portfolio/buy')) return 'Buy Portfolio';
    if (path.includes('/portfolio/claim')) return 'Claim Portfolio';
    if (path.includes('/manage-profile')) return 'Profile Settings';
    if (path.includes('/help')) return 'Help & Support';
    return 'Dashboard';
  };

  return (
    <>
      {/* Main Navbar */}
      <header className="sticky top-0 z-50 w-full">
        <div className="absolute inset-0 bg-white/70 dark:bg-gray-950/70 backdrop-blur-xl border-b border-gray-200/40 dark:border-gray-800/50 shadow-sm" />

        <nav className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            {/* Logo and Current Section */}
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-3 group">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <span className="text-white font-bold text-xl tracking-tight">P</span>
                  </div>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-500/40 to-purple-600/40 blur-lg opacity-60 group-hover:opacity-80 transition-opacity" />
                </div>
                <div className="hidden sm:block">
                  <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                    PortfolioPro
                  </span>
                </div>
              </Link>

              {/* Current Section Display */}
              <div className="hidden lg:flex items-center gap-2">
                <div className="w-px h-6 bg-gray-300 dark:bg-gray-700" />
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${currentSection.bgColor} border ${currentSection.borderColor}`}>
                  <div className={`p-1.5 rounded-md bg-gradient-to-br ${currentSection.color}`}>
                    <div className="text-white">
                      {currentSection.icon}
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                      {currentSection.name}
                    </span>
                    <FiChevronRight className="w-3 h-3 text-gray-500 dark:text-gray-400" />
                    <span className="text-sm font-semibold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
                      {getCurrentPageName()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              {mainLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="relative px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group"
                >
                  <span className="flex items-center gap-2">
                    {link.icon}
                    {link.name}
                  </span>
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 group-hover:w-4/5 transition-all duration-300 rounded-full" />
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Current Section Badge (Mobile/Tablet) */}
              <div className="md:hidden flex items-center">
                <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg ${currentSection.bgColor} border ${currentSection.borderColor}`}>
                  <div className={`p-1 rounded-md bg-gradient-to-br ${currentSection.color}`}>
                    <div className="text-white">
                      {currentSection.icon}
                    </div>
                  </div>
                  <span className="text-xs font-medium text-gray-800 dark:text-gray-200">
                    {currentSection.name}
                  </span>
                </div>
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100/80 dark:bg-gray-800/50 hover:bg-gray-200 dark:hover:bg-gray-700/70 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <FiSun className="w-5 h-5 text-amber-500" />
                ) : (
                  <FiMoon className="w-5 h-5 text-indigo-300" />
                )}
              </button>

              {/* Profile Area */}
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-3 pl-2 pr-1 py-1.5 rounded-xl hover:bg-gray-100/80 dark:hover:bg-gray-800/50 transition-all group"
                >
                  <div className="relative">
                    <img
                      src={userData?.avatarUrl || '/default-avatar.png'}
                      alt="User"
                      className="w-9 h-9 rounded-lg object-cover border-2 border-white dark:border-gray-800 shadow-sm group-hover:border-indigo-400 transition-colors"
                    />
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white dark:border-gray-900 rounded-full" />
                  </div>

                  <div className="hidden lg:flex flex-col items-start text-left">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {userData?.name || 'User'}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[140px]">
                      {userData?.email || 'user@example.com'}
                    </span>
                  </div>
                </button>

                {/* Profile Dropdown */}
                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      className="absolute right-0 mt-3 w-72 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200/70 dark:border-gray-700/60 overflow-hidden"
                    >
                      {/* User Info */}
                      <div className="p-5 bg-gradient-to-br from-indigo-50/50 to-purple-50/40 dark:from-gray-800/80 dark:to-gray-900/80">
                        <div className="flex items-center gap-4">
                          <img
                            src={userData?.avatarUrl || '/default-avatar.png'}
                            alt="User"
                            className="w-14 h-14 rounded-xl object-cover border-2 border-indigo-500/30"
                          />
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">
                              {userData?.name || 'User'}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {userData?.email || 'user@example.com'}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Current Section in Dropdown */}
                      <div className="px-5 py-3 border-b border-gray-200 dark:border-gray-800">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                            Current Section
                          </span>
                          <div className={`flex items-center gap-1.5 px-2 py-1 rounded-md ${currentSection.bgColor}`}>
                            <div className={`p-1 rounded bg-gradient-to-br ${currentSection.color}`}>
                              {currentSection.icon}
                            </div>
                            <span className="text-xs font-medium text-gray-800 dark:text-gray-200">
                              {currentSection.name}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        <Link
                          to="/dashboard"
                          className="flex items-center gap-3 px-5 py-3 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
                          onClick={() => setProfileOpen(false)}
                        >
                          <FiHome className="w-5 h-5" />
                          Dashboard
                        </Link>
                        <Link
                          to="/manage-profile"
                          className="flex items-center gap-3 px-5 py-3 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
                          onClick={() => setProfileOpen(false)}
                        >
                          <FiUser className="w-5 h-5" />
                          Manage Profile
                        </Link>
                        <Link
                          to="/help"
                          className="flex items-center gap-3 px-5 py-3 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
                          onClick={() => setProfileOpen(false)}
                        >
                          <FiHelpCircle className="w-5 h-5" />
                          Help & Support
                        </Link>
                      </div>

                      <div className="border-t border-gray-200 dark:border-gray-800 py-2">
                        <button
                          onClick={() => {
                            setProfileOpen(false);
                            handleLogout();
                          }}
                          className="w-full flex items-center gap-3 px-5 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        >
                          <FiLogOut className="w-5 h-5" />
                          Log out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/70 transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6 dark:text-slate-200" />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setMobileOpen(false)}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white dark:bg-gray-950 border-l border-gray-200 dark:border-gray-800 shadow-2xl z-50 md:hidden overflow-y-auto"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-2xl">P</span>
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      PortfolioPro
                    </span>
                  </div>
                  <button onClick={() => setMobileOpen(false)}>
                    <FiX className="w-7 h-7 text-gray-600 dark:text-gray-300" />
                  </button>
                </div>

                {/* User Card with Current Section */}
                <div className="mb-8 p-5 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 border border-indigo-100 dark:border-indigo-900/30">
                  <div className="flex items-center gap-4 mb-3">
                    <img
                      src={userData?.avatarUrl || '/default-avatar.png'}
                      alt="User"
                      className="w-14 h-14 rounded-xl object-cover border-2 border-indigo-400/40"
                    />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {userData?.name || 'User'}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {userData?.email || 'user@example.com'}
                      </p>
                    </div>
                  </div>
                  {/* Current Section in Mobile */}
                  <div className="flex items-center justify-between pt-3 border-t border-indigo-100 dark:border-indigo-900/30">
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      Currently in
                    </span>
                    <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg ${currentSection.bgColor}`}>
                      <div className={`p-1 rounded-md bg-gradient-to-br ${currentSection.color}`}>
                        {currentSection.icon}
                      </div>
                      <span className="text-xs font-medium text-gray-800 dark:text-gray-200">
                        {currentSection.name}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Links */}
                <div className="space-y-2 mb-8">
                  {mainLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-4 p-4 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                        {link.icon}
                      </div>
                      <span className="font-medium text-gray-800 dark:text-gray-200">
                        {link.name}
                      </span>
                    </Link>
                  ))}
                </div>

                {/* Extra Actions */}
                <div className="space-y-3">
<button
  type="button"
  onClick={toggleTheme}
  className="
    w-full flex items-center justify-center gap-3 p-4 rounded-xl
    bg-gray-100 dark:bg-gray-800/70
    hover:bg-gray-200 dark:hover:bg-gray-700
    transition-colors duration-200
  "
>
  {theme === "light" ? (
    <>
      <FiMoon className="text-lg" />
      <span>Dark Mode</span>
    </>
  ) : (
    <>
      <FiSun className="text-yellow-400" />
      <span className="text-slate-200">Light Mode</span>
    </>
  )}
</button>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 transition-colors"
                  >
                    <FiLogOut />
                    <span>Log out</span>
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