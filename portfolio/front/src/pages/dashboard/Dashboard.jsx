import React, { useState, useMemo, useEffect } from "react";
import { 
  FiPlus, 
  FiSearch, 
  FiFilter, 
  FiBell, 
  FiUser, 
  FiTrendingUp,
  FiStar,
  FiGrid,
  FiDollarSign,
  FiClock,
  FiBarChart2,
  FiShield,
  FiGlobe,
  FiZap,
  FiChevronDown,
  FiMenu,
  FiX,
  FiActivity,
  FiPackage
} from "react-icons/fi";
import { 
  MdOutlineDashboard,
  MdOutlinePalette,
  MdOutlineSettings,
  MdOutlineLogout
} from "react-icons/md";
import { 
  TbLeaf,
  TbCurrencyBitcoin
} from "react-icons/tb";
import { BsLightningCharge } from "react-icons/bs";
import Card from "./Card";
import { useCookies } from "react-cookie";
import Fetch from "../../Fetch";
import Nav from "./Nav.jsx";
import { Link } from "react-router-dom";
// Move portfolios data outside component to prevent recreation on every render
const PORTFOLIOS_DATA = [
  {
    id: 1,
    name: "Tech Innovators Portfolio",
    path: "/portfolios/tech-innovators",
    thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    description: "Cutting-edge tech companies driving innovation",
    category: "Technology",
    price: "$299",
  },
  {
    id: 2,
    name: "Green Energy Bundle",
    path: "/portfolios/green-energy",
    thumbnail: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    description: "Sustainable energy solutions for the future",
    category: "Green Energy",
    price: "$349",
 },
  {
    id: 3,
    name: "Global Markets",
    path: "/portfolios/global-markets",
    thumbnail: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    description: "Diversified international market exposure",
    category: "Global",
    price: "$449",
 },
  {
    id: 4,
    name: "Starter Portfolio",
    path: "/portfolios/starter",
    thumbnail: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    description: "Perfect for first-time investors",
    category: "Starter",
    price: "$199",
 },
  {
    id: 5,
    name: "Crypto Starter",
    path: "/portfolios/crypto-starter",
    thumbnail: "https://images.unsplash.com/photo-1620336655055-bd87c5d1d73f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    description: "Entry point to digital assets",
    category: "Crypto",
    price: "$399",
 },
  {
    id: 6,
    name: "Dividend Income",
    path: "/portfolios/dividend-income",
    thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    description: "Stable companies with reliable dividends",
    category: "Income",
    price: "$279",
 },
];

const CATEGORIES = [
  { name: "All Portfolios", icon: <FiGrid />, count: 6, color: "from-blue-500 to-cyan-500" },
  { name: "Technology", icon: <BsLightningCharge />, count: 1, color: "from-purple-500 to-pink-500" },
  { name: "Green Energy", icon: <TbLeaf />, count: 1, color: "from-green-500 to-emerald-500" },
  { name: "Global", icon: <FiGlobe />, count: 1, color: "from-indigo-500 to-blue-500" },
  { name: "Crypto", icon: <TbCurrencyBitcoin />, count: 1, color: "from-yellow-500 to-orange-500" },
  { name: "Income", icon: <FiTrendingUp />, count: 1, color: "from-teal-500 to-green-500" },
];

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userData, setUserData] = useState({});
  const [cookie, , removeCookie] = useCookies(["userId"]);
  const [activeCategory, setActiveCategory] = useState("All Portfolios");
  const [theme, setTheme] = useState("light");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Apply theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolio-theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("portfolio-theme", newTheme);
  };

  // Memoized filtered portfolios for better performance
  const filteredPortfolios = useMemo(() => {
    let filtered = [...PORTFOLIOS_DATA];

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((portfolio) =>
        ["name", "description", "category"].some((prop) =>
          portfolio[prop]?.toLowerCase().includes(query)
        )
      );
    }

    // Filter by category
    if (activeCategory !== "All Portfolios") {
      filtered = filtered.filter(portfolio => portfolio.category === activeCategory);
    }

    return filtered;
  }, [searchQuery, activeCategory]);

  const handleCategorySelect = (category) => {
    setActiveCategory(category);
    setSidebarOpen(false);
  };

  const getUserData = async () => {
    try {
      const data = await Fetch.get(`get-data`);

      if (data.success === true) {
        setUserData(data.data);
      } else {
        removeCookie("userId");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 dark:bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

     <Nav userData={userData} removeCookie={removeCookie}/>
      {/* Mobile Search */}
      <div className="md:hidden px-4 py-3 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="relative">
          <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search portfolios..."
            className="w-full pl-12 pr-4 py-3 bg-gray-100 dark:text-white dark:bg-gray-700 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-50 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 md:hidden`}>
        <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)} />
        <div className="relative w-80 h-full bg-white dark:bg-gray-800 shadow-2xl overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">P</span>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-800 dark:text-white">PortfolioPro</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Dashboard</p>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            {/* User Info */}
            <div className="mb-8 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-750 dark:to-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">
                    {userData.name ? userData.name.charAt(0).toUpperCase() : "U"}
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 dark:text-white">{userData.name || "User"}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Premium Member</p>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">Categories</h3>
              {CATEGORIES.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleCategorySelect(item.name)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 ${
                    activeCategory === item.name
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-r ${item.color} ${activeCategory === item.name ? 'bg-white/20' : ''}`}>
                      <div className={activeCategory === item.name ? 'text-white' : 'text-white'}>
                        {item.icon}
                      </div>
                    </div>
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <span className={`text-sm px-2 py-1 rounded-full ${
                    activeCategory === item.name
                      ? 'bg-white/20'
                      : 'bg-gray-100 dark:bg-gray-700'
                  }`}>
                    {item.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{userData.name || "Investor"}</span> 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Here's what's happening with your portfolios today
          </p>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Column - Categories and Filters */}
          <div className="lg:col-span-1 hidden lg:block">
            <div className="sticky top-24 space-y-6">
              {/* Categories */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Categories</h3>
                <div className="space-y-2">
                  {CATEGORIES.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => handleCategorySelect(item.name)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 ${
                        activeCategory === item.name
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-r ${item.color} ${activeCategory === item.name ? 'bg-white/20' : ''}`}>
                          {item.icon}
                        </div>
                        <span className="font-medium">{item.name}</span>
                      </div>
                      <span className={`text-sm px-2 py-1 rounded-full ${
                        activeCategory === item.name
                          ? 'bg-white/20'
                          : 'bg-gray-100 dark:bg-gray-700'
                      }`}>
                        {item.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-center space-x-2 p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
                    <FiPlus className="w-5 h-5" />
                    <span>Create New Portfolio</span>
                  </button>
                  <button className="w-full flex items-center justify-center space-x-2 p-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300">
                    <FiFilter className="w-5 h-5" />
                    <span>Advanced Filters</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
<hr className="dark:text-slate-500 text-slate-300"/>
          {/* Right Column - Portfolios */}
          <div className="lg:col-span-3">
            {/* Portfolio Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {activeCategory === "All Portfolios" ? "All Portfolios" : activeCategory}
                  <span className="text-gray-500 dark:text-gray-400 ml-2">({filteredPortfolios.length})</span>
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {filteredPortfolios.length > 0 
                    ? "Browse and manage your investment portfolios"
                    : "No portfolios match your current filters"}
                </p>
              </div>
              <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                <Link to="/portfolio/buy">
                <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 flex items-center space-x-2">
                  <FiPlus className="w-4 h-4" />
                  <span>New Portfolio</span>
                </button>
                </Link>
              </div>
            </div>

            {/* Portfolio Grid */}
            {filteredPortfolios.length > 0 ? (
              <div className="mb-8">
                <Card portfolios={filteredPortfolios} />
              </div>
            ) : (
              <div className="text-center py-16 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center">
                  <FiSearch className="w-10 h-10 text-blue-500 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No portfolios found</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                  Try adjusting your search or filter criteria to find what you're looking for.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("All Portfolios");
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  Reset Filters
                </button>
              </div>
            )}

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 py-6 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-600 dark:text-gray-400">
                © {new Date().getFullYear()} PortfolioPro. All rights reserved.
              </p>
            </div>
            <div className="flex items-center space-x-6">
              <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                Privacy Policy
              </button>
              <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                Terms of Service
              </button>
              <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}