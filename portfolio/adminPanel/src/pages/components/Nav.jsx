import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      // Close menu when resizing to desktop if open
      if (window.innerWidth >= 768) setIsOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const paths = [
    {
      name: "Dashboard",
      url: "/admin/dashboard",
      icon: "📊",
    },
    {
      name: "Users",
      url: "/admin/manage/user",
      icon: "👥",
    },
    {
      name: "Portfolio",
      url: "/admin/manage/portfolio",
      icon: "💼",
    },
    {
      name: "Bills",
      url: "/admin/manage/bills",
      icon: "💼",
    },
  ];

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 25 },
    },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: (i) => ({
      x: 0,
      opacity: 1,
      transition: { delay: i * 0.05 },
    }),
  };

  return (
    <nav className="navbar bg-base-200 shadow-lg sticky top-0 z-50">
      <div className="flex-1 px-4">
        <h1 className="text-xl font-bold">Admin Panel</h1>
      </div>

      {/* Desktop Navigation */}
      {!isMobile && (
        <div className="hidden md:flex space-x-2 px-4">
          {paths.map((item) => (
            <Link
              key={item.url}
              to={item.url}
              className={`btn btn-ghost ${
                location.pathname === item.url ? "btn-active" : ""
              }`}
            >
              <span className="mr-2">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </div>
      )}

      {/* Mobile Toggle Button */}
      <div className="md:hidden pr-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="btn btn-square btn-ghost"
          aria-label="Menu"
          aria-expanded={isOpen}
        >
          <motion.div
            animate={isOpen ? "open" : "closed"}
            variants={{
              open: { rotate: 90 },
              closed: { rotate: 0 },
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </motion.div>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && isMobile && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            className="absolute top-16 left-0 right-0 bg-base-200 shadow-lg md:hidden"
          >
            <ul className="menu p-4 w-full">
              {paths.map((item, i) => (
                <motion.li
                  key={item.url}
                  custom={i}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsOpen(false)}
                >
                  <Link
                    to={item.url}
                    className={`flex items-center py-3 ${
                      location.pathname === item.url ? "active" : ""
                    }`}
                  >
                    <span className="text-xl mr-3">{item.icon}</span>
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
