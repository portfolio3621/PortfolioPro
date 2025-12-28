import React, { useState, useEffect } from "react";
import { 
  FiPlus, 
  FiSearch, 
  FiFilter, 
  FiTrendingUp,
  FiGrid,
  FiGlobe,
  FiZap,
  FiChevronDown,
  FiMenu,
  FiX,
  FiRefreshCw
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

// Import Zustand stores
import { useUserStore } from "../../stores/userStore";
import { usePortfolioStore } from "../../stores/portfolioStore";

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
  const [activeCategory, setActiveCategory] = useState("All Portfolios");
  const [theme, setTheme] = useState("light");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const [cookie, , removeCookie] = useCookies(["userId"]);

  // Zustand stores
  const { 
    user, 
    fetchUser, 
    isLoading: userLoading,
    clearUser,
    getUserInitials 
  } = useUserStore();
  
  const { 
    portfolios, 
    fetchPortfolios, 
    refreshPortfolios,
    getFilteredPortfolios,
    isLoading: portfolioLoading, 
    isRefreshing, 
    lastUpdated 
  } = usePortfolioStore();

  // Calculate category counts dynamically from actual portfolio data
  const categoryCounts = React.useMemo(() => {
    const counts = {};
    CATEGORIES.forEach(cat => {
      if (cat.name === "All Portfolios") {
        counts[cat.name] = portfolios.length;
      } else {
        counts[cat.name] = portfolios.filter(p => p.category === cat.name).length;
      }
    });
    return counts;
  }, [portfolios]);

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

  const handleCategorySelect = (category) => {
    setActiveCategory(category);
    setSidebarOpen(false);
  };

  // Fetch data on mount
  useEffect(() => {
    const loadData = async () => {
      await fetchUser();
      await fetchPortfolios();
    };
    loadData();
  }, [fetchUser, fetchPortfolios]);

  const handleRefresh = async () => {
    await fetchPortfolios();
  };

  const handleLogout = () => {
    clearUser();
    removeCookie("userId");
    // Optional: Redirect to login page
    // window.location.href = "/login";
  };

  // Format last updated time
  const formatLastUpdated = () => {
    if (!lastUpdated) return "Never";
    
    const now = new Date();
    const diffMs = now - lastUpdated;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} minute${diffMins === 1 ? '' : 's'} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
    
    return lastUpdated.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // Get filtered portfolios
  const filteredPortfolios = getFilteredPortfolios(searchQuery, activeCategory);

  // Calculate total portfolio value
  const totalPortfolioValue = React.useMemo(() => {
    return portfolios.reduce((sum, portfolio) => sum + (portfolio.value || 0), 0);
  }, [portfolios]);

  // Calculate portfolio statistics
  const portfolioStats = React.useMemo(() => {
    const stats = {
      total: portfolios.length,
      active: portfolios.filter(p => p.status === 'active').length,
      completed: portfolios.filter(p => p.status === 'completed').length,
      profit: portfolios.reduce((sum, p) => sum + (p.profit || 0), 0),
    };
    return stats;
  }, [portfolios]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 dark:bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      
      {/* Nav with Zustand user data */}
      <Nav onLogout={handleLogout} place="dashboard" />
      
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{user?.name || "Investor"}</span> 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Here's what's happening with your {portfolioStats.total} portfolios today
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
                        {categoryCounts[item.name] || 0}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Link to="/portfolio/buy">
                    <button className="w-full flex items-center justify-center space-x-2 p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
                      <FiPlus className="w-5 h-5" />
                      <span>Add New Portfolio</span>
                    </button>
                  </Link>
                  <button className="w-full flex items-center justify-center space-x-2 p-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300">
                    <FiFilter className="w-5 h-5" />
                    <span>Advanced Filters</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <hr className="dark:text-slate-500 text-slate-300 lg:hidden" />

          {/* Right Column - Portfolios */}
          <div className="lg:col-span-3">
            {/* Portfolio Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {activeCategory === "All Portfolios" ? "All Portfolios" : activeCategory}
                  <span className="text-gray-500 dark:text-gray-400 ml-2">({filteredPortfolios.length})</span>
                </h2>
                <div className="flex items-center space-x-3 mt-1">
                  <p className="text-gray-600 dark:text-gray-400">
                    {portfolioLoading ? "Loading portfolios..." : "Browse and manage your investment portfolios"}
                  </p>
                  {lastUpdated && !portfolioLoading && (
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      • Updated {formatLastUpdated()}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                <button
                  onClick={handleRefresh}
                  disabled={portfolioLoading || isRefreshing}
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 transform hover:-translate-y-0.5 flex items-center space-x-2 ${
                    portfolioLoading || isRefreshing
                      ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg'
                  }`}
                >
                  <FiRefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                  <span>{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
                </button>
                <Link to="/portfolio/buy">
                  <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 flex items-center space-x-2">
                    <FiPlus className="w-4 h-4" />
                    <span>New Portfolio</span>
                  </button>
                </Link>
              </div>
            </div>

            {/* Desktop Search */}
            <div className="hidden md:block mb-6">
              <div className="relative max-w-md">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search portfolios by name or category..."
                  className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:focus:ring-blue-400 focus:outline-none transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Loading State */}
            {portfolioLoading && (
              <div className="mb-8">
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-8">
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="relative mb-6">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center">
                        <FiRefreshCw className="w-10 h-10 text-blue-500 dark:text-blue-400 animate-spin" />
                      </div>
                      <div className="absolute -inset-2 rounded-full border-4 border-transparent border-t-blue-500 border-r-purple-500 animate-spin"></div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Loading Portfolios</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-center max-w-md mx-auto">
                      Fetching your latest portfolio data...
                    </p>
                    <div className="mt-6 w-full max-w-xs">
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Portfolio Grid */}
            {!portfolioLoading && filteredPortfolios.length > 0 ? (
              <div className="mb-8">
                <Card portfolios={filteredPortfolios} />
              </div>
            ) : !portfolioLoading && (
              <div className="text-center py-16 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center">
                  <FiSearch className="w-10 h-10 text-blue-500 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No portfolios found</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                  {portfolios.length === 0 
                    ? "You haven't created any portfolios yet. Start by creating your first portfolio!"
                    : "Try adjusting your search or filter criteria to find what you're looking for."}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setActiveCategory("All Portfolios");
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                    Reset Filters
                  </button>
                  {portfolios.length === 0 && (
                    <Link to="/portfolio/buy">
                      <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
                        Add First Portfolio
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 py-6 flex justify-end border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl block mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-600 dark:text-gray-400">
                © {new Date().getFullYear()} PortfolioPro. All rights reserved.
              </p>
            </div>
            <div className="flex items-center space-x-6">
             <Link to="/privacy-policy">
              <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                Privacy Policy
              </button>
             </Link>
             <Link to="/terms">
              <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                Terms of Service
              </button>
             </Link>
              <Link to="/contact">
                <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  Contact Support
                </button>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}