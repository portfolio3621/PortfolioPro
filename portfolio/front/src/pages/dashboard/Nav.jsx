import React, { useState, useEffect, useRef } from "react";
import { HiSearch, HiOutlineUser, HiOutlineLogout } from "react-icons/hi";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Fetch from "../../Fetch";

export default function Nav({ removeCookie, userData }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const logout = async () => {
    try {
      removeCookie("userId", { path: "/" });
      await Fetch.get("logout");
    } catch (err) {
      console.error(err);
    }
  };

  // Close profile dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <Link to="/" className="flex items-center">
            <img src="/P.svg" alt="Logo" className="h-[70px] w-[70px]" />
            <span className="ml-2 text-xl font-bold text-gray-800 hidden md:inline">
              Portfolio Pro
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            <div>
              <Link to="/portfolio/claim">
                <button className="border p-1.5 rounded-lg mr-1 hover:bg-slate-100">
                  Claim Portfolio
                </button>
              </Link>
              <Link to="/portfolio/buy">
                <button className="border p-1.5 rounded-lg bg-blue-500 hover:bg-blue-700 text-white">
                  buy a Portfolio
                </button>
              </Link>
            </div>
            {/* Profile Dropdown Trigger */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center focus:outline-none focus:ring-2 hover:bg-gray-100 focus:ring-offset-2 focus:ring-blue-500 rounded-full"
                aria-label="User menu"
                aria-expanded={isProfileOpen}
              >
                <img
                  src={userData.avatarUrl || "/user.png"}
                  alt="Profile"
                  className=" rounded-full h-10 w-10 border-2 border-transparent hover:border-slate-100 transition-all"
                />
              </button>

              {/* Profile Dropdown */}
              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    drag
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 border-0 border-base-100 w-72 origin-top-right bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                  >
                    <div className="py-3 px-4 border-b border-gray-100">
                      <div className="flex items-center">
                        <img
                          src={userData.avatarUrl || "/user.png"}
                          alt="Profile"
                          className="h-10 w-10 rounded-full mr-3"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {userData.name}
                          </p>
                          <p className="text-xs text-gray-500 ">
                            {userData.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="py-1 ">
                      <Link
                        to="/manage-profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <HiOutlineUser className="mr-3 h-5 w-5 text-gray-400" />
                        Manage Profile
                      </Link>
                    </div>
                    <div className="py-1 border-t border-gray-100">
                      <Link
                        to="/help"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <HiOutlineUser className="mr-3 h-5 w-5 text-gray-400" />
                        Help or Report issue
                      </Link>
                    </div>

                    <div className="py-1 border-t border-gray-100">
                      <button
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        onClick={() => {
                          setIsProfileOpen(false);
                          logout();
                        }}
                      >
                        <HiOutlineLogout className="mr-3 h-5 w-5 text-red-400" />
                        Log out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
