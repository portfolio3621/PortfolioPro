import React, { useEffect, useState } from "react";
import Fetch from "../../Fetch";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaCrown, 
  FaGem, 
  FaStar, 
  FaSearch, 
  FaFilter, 
  FaChevronRight,
  FaTimes,
  FaChartLine,
  FaSeedling,
  FaGlobeAmericas,
  FaCoins
} from "react-icons/fa";
import { 
  FiGrid, 
  FiTrendingUp,
} from "react-icons/fi";
import { 
  BsLightningCharge 
} from "react-icons/bs";
import { 
  TbLeaf, 
  TbCurrencyBitcoin 
} from "react-icons/tb";
import PortfolioBuyCard from "./components/PortfolioBuyCard";
const FiGlobe = (props) => (
  <svg 
    {...props} 
    stroke="currentColor" 
    fill="none" 
    strokeWidth="2" 
    viewBox="0 0 24 24" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    height="1em" 
    width="1em" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
);

const CATEGORIES = [
  { name: "All Portfolios", icon: <FiGrid />, count: 6, color: "from-blue-500 to-cyan-500" },
  { name: "Technology", icon: <BsLightningCharge />, count: 1, color: "from-purple-500 to-pink-500" },
  { name: "Green Energy", icon: <TbLeaf />, count: 1, color: "from-green-500 to-emerald-500" },
  { name: "Global", icon: <FiGlobe />, count: 1, color: "from-indigo-500 to-blue-500" },
  { name: "Crypto", icon: <TbCurrencyBitcoin />, count: 1, color: "from-yellow-500 to-orange-500" },
  { name: "Income", icon: <FiTrendingUp />, count: 1, color: "from-teal-500 to-green-500" },
];

const CATEGORY_ICONS = {
  "Technology": <BsLightningCharge className="w-4 h-4" />,
  "Green Energy": <TbLeaf className="w-4 h-4" />,
  "Global": <FaGlobeAmericas className="w-4 h-4" />,
  "Crypto": <TbCurrencyBitcoin className="w-4 h-4" />,
  "Income": <FiTrendingUp className="w-4 h-4" />
};

const CATEGORY_COLORS = {
  "Technology": "from-purple-500 to-pink-500",
  "Green Energy": "from-green-500 to-emerald-500",
  "Global": "from-indigo-500 to-blue-500",
  "Crypto": "from-yellow-500 to-orange-500",
  "Income": "from-teal-500 to-green-500"
};

// Helper icon component

export default function BuyPortfolioHome() {
  const [loading, setLoading] = useState(true);
  const [buyModel, setBuyModel] = useState({
    isOpen: false,
    data: null,
  });
  const [error, setError] = useState(null);
  const [portfolios, setPortfolios] = useState([]);
  const [filteredPortfolios, setFilteredPortfolios] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [selectedCategory, setSelectedCategory] = useState("All Portfolios");

  const closeBuyPortfolioModel = () => {
    setBuyModel({ isOpen: false, data: null });
  };

  const getPortfolios = async () => {
    try {
      setLoading(true);
      const response = await Fetch.get("all-portfolio");
      
      if (response.success && Array.isArray(response.data)) {
        // Process real data only, no fake enhancements
        const processedData = response.data.map(portfolio => ({
          ...portfolio,
          price: parseFloat(portfolio.price) || 0,
          // Map old categories to new ones if needed
          category: mapCategory(portfolio.category)
        }));
        
        setPortfolios(processedData);
        filterAndSortPortfolios(activeFilter, searchQuery, sortBy, processedData);
      } else {
        setError("Failed to load portfolios. No data available.");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Unable to connect to server. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const mapCategory = (oldCategory) => {
    // Map old categories to new ones if your backend still returns old categories
    const categoryMap = {
      "Technology": "Technology",
      "Design": "Technology", // Map design to technology
      "Business": "Income",
      "E-commerce": "Income",
      "Mobile": "Technology",
      "Global": "Global",
      "Green Energy": "Green Energy",
      "Crypto": "Crypto",
      "Income": "Income"
    };
    
    return categoryMap[oldCategory] || oldCategory;
  };

  const filterAndSortPortfolios = (type, query = searchQuery, sort = sortBy, list = portfolios) => {
    let filtered = [...list];
    
    // Filter by portfolio type
    if (type !== "All") {
      filtered = filtered.filter((p) => p.Type === type);
    }
    
    // Filter by category
    if (selectedCategory !== "All Portfolios") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }
    
    // Filter by search query
    if (query.trim() !== "") {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        (p.category && p.category.toLowerCase().includes(query.toLowerCase())) ||
        (p.Type && p.Type.toLowerCase().includes(query.toLowerCase()))
      );
    }
    
    // Sorting logic
    switch (sort) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "title-asc":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "featured":
        // Featured sorting - prioritize Premium, then by price high to low
        filtered.sort((a, b) => {
          const typeOrder = { "Premium": 3, "Standard": 2, "Basic": 1 };
          if (typeOrder[a.Type] !== typeOrder[b.Type]) {
            return typeOrder[b.Type] - typeOrder[a.Type];
          }
          return b.price - a.price;
        });
        break;
      default:
        filtered.sort((a, b) => a.title.localeCompare(b.title));
    }
    
    setFilteredPortfolios(filtered);
  };

  const getBadgeColor = (type) => {
    switch (type) {
      case "Premium":
        return "bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-500/20";
      case "Standard":
        return "bg-gradient-to-r from-blue-600 to-teal-500 shadow-lg shadow-blue-500/20";
      case "Basic":
        return "bg-gradient-to-r from-gray-600 to-gray-500 shadow-lg shadow-gray-500/20";
      default:
        return "bg-gradient-to-r from-gray-400 to-gray-600";
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "Premium":
        return <FaCrown className="w-4 h-4" />;
      case "Standard":
        return <FaGem className="w-4 h-4" />;
      case "Basic":
        return <FaStar className="w-4 h-4" />;
      default:
        return <FaStar className="w-4 h-4" />;
    }
  };

  const getCategoryCount = (categoryName) => {
    if (categoryName === "All Portfolios") {
      return portfolios.length;
    }
    return portfolios.filter(p => p.category === categoryName).length;
  };

  useEffect(() => {
    getPortfolios();
  }, []);

  useEffect(() => {
    filterAndSortPortfolios(activeFilter, searchQuery, sortBy);
  }, [activeFilter, searchQuery, sortBy, selectedCategory]);

  const filterButtons = [
    { label: "All", icon: <FaStar className="w-4 h-4" /> },
    { label: "Basic", icon: <FaStar className="w-4 h-4" /> },
    { label: "Standard", icon: <FaGem className="w-4 h-4" /> },
    { label: "Premium", icon: <FaCrown className="w-4 h-4" /> },
  ];

  const sortOptions = [
    { label: "Featured", value: "featured", icon: <FaStar className="w-4 h-4" /> },
    { label: "Name: A-Z", value: "title-asc", icon: <FaChevronRight className="w-4 h-4 rotate-90" /> },
    { label: "Name: Z-A", value: "title-desc", icon: <FaChevronRight className="w-4 h-4 -rotate-90" /> },
    { label: "Price: Low to High", value: "price-low", icon: <FiTrendingUp className="w-4 h-4" /> },
    { label: "Price: High to Low", value: "price-high", icon: <FiTrendingUp className="w-4 h-4 rotate-180" /> },
  ];

  const getCategoryDescription = (category) => {
    const descriptions = {
      "Technology": "Cutting-edge tech and innovation portfolios",
      "Green Energy": "Sustainable and renewable energy investments",
      "Global": "Diversified international market portfolios",
      "Crypto": "Digital asset and blockchain portfolios",
      "Income": "High-yield income generating portfolios"
    };
    return descriptions[category] || "Professional portfolio templates";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {loading ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-20 h-20 border-4 border-gray-200 dark:border-gray-700 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full"
            />
          </div>
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="mt-6 text-gray-600 dark:text-gray-300 text-lg font-medium"
          >
            Loading portfolios...
          </motion.p>
        </div>
      ) : (
        <>
          {/* Hero Section */}
          <div className="pt-12 pb-16 px-4 md:px-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/5 dark:to-purple-500/5" />
            <div className="max-w-7xl mx-auto relative">
              <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-10"
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Investment Portfolios
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  Discover professionally curated investment portfolios across diverse sectors
                </p>
              </motion.div>

              {/* Search and Filter Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50 mb-8"
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Search Input */}
                  <div className="flex-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaSearch className="text-gray-400 dark:text-gray-500" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search portfolios by title, category, or investment type..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-12 py-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-400/10 transition-all duration-300"
                    />
                    {searchQuery && (
                      <motion.button
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        onClick={() => setSearchQuery("")}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
                      >
                        <FaTimes />
                      </motion.button>
                    )}
                  </div>

                  {/* Sort Dropdown */}
                  <div className="relative min-w-[200px]">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FaFilter className="text-gray-400 dark:text-gray-500" />
                    </div>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-gray-800 dark:text-white appearance-none focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-400/10 transition-all duration-300"
                    >
                      {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                      <ChevronDownIcon className="text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Category Filters */}
                <div className="mt-6">
                  <div className="flex flex-wrap gap-2 mb-6 justify-center">
                    {CATEGORIES.map((category) => (
                      <motion.button
                        key={category.name}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedCategory(category.name)}
                        className={`flex flex-col items-center gap-2 px-5 py-4 rounded-xl transition-all min-w-[140px] ${
                          selectedCategory === category.name
                            ? `${category.color} text-white shadow-lg shadow-opacity-30`
                            : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
                        }`}
                      >
                        <span className="text-2xl mb-1">{category.icon}</span>
                        <span className="font-semibold text-sm">{category.name}</span>
                        <span className={`px-2 py-1 text-xs rounded-full mt-1 ${
                          selectedCategory === category.name 
                            ? 'bg-white/20' 
                            : 'bg-gray-100 dark:bg-gray-700'
                        }`}>
                          {getCategoryCount(category.name)}
                        </span>
                      </motion.button>
                    ))}
                  </div>

                  {/* Category Description */}
                  {selectedCategory !== "All Portfolios" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="text-center mb-6"
                    >
                      <p className="text-gray-600 dark:text-gray-400 italic">
                        {getCategoryDescription(selectedCategory)}
                      </p>
                    </motion.div>
                  )}

                  {/* Type Filters */}
                  <div className="flex flex-wrap gap-2 justify-center">
                    {filterButtons.map(({ label, icon }) => (
                      <motion.button
                        key={label}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveFilter(label)}
                        className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all ${
                          activeFilter === label
                            ? `${
                                label === "Premium" 
                                  ? "bg-gradient-to-r from-purple-600 to-pink-600" 
                                  : label === "Standard"
                                  ? "bg-gradient-to-r from-blue-600 to-teal-500"
                                  : label === "Basic"
                                  ? "bg-gradient-to-r from-gray-600 to-gray-500"
                                  : "bg-gradient-to-r from-blue-500 to-blue-600"
                              } text-white shadow-lg shadow-blue-500/20 dark:shadow-blue-900/30`
                            : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
                        }`}
                      >
                        {icon}
                        <span className="font-medium">{label}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Main Content */}
          <main className="px-4 md:px-8 max-w-7xl mx-auto pb-20">
            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-8 overflow-hidden"
                >
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                        <FaTimes className="text-red-500 dark:text-red-400" />
                      </div>
                      <p className="text-red-700 dark:text-red-300">{error}</p>
                    </div>
                    <button
                      onClick={() => setError(null)}
                      className="text-red-500 hover:text-red-700 dark:hover:text-red-400"
                    >
                      <FaTimes />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Results Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {selectedCategory === "All Portfolios" 
                      ? (activeFilter === "All" ? "All Investment Portfolios" : `${activeFilter} Investment Portfolios`)
                      : `${selectedCategory} Portfolios - ${activeFilter === "All" ? "All Tiers" : activeFilter}`
                    }
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    {filteredPortfolios.length} {filteredPortfolios.length === 1 ? 'portfolio' : 'portfolios'} available
                    {selectedCategory !== "All Portfolios" && (
                      <span className="ml-2 text-sm bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full">
                        {selectedCategory}
                      </span>
                    )}
                  </p>
                </div>
                
                {filteredPortfolios.length > 0 && (
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Sorted by: <span className="font-medium text-gray-700 dark:text-gray-300">
                        {sortOptions.find(o => o.value === sortBy)?.label}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Portfolio Grid */}
            <AnimatePresence mode="wait">
              {filteredPortfolios.length > 0 ? (
                <motion.div
                  key="grid"
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                  {filteredPortfolios.map((portfolio, index) => (
                    <motion.div
                      layout
                      key={portfolio._id}
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{ 
                        y: -8,
                        transition: { duration: 0.2 }
                      }}
                      className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/30 hover:shadow-2xl dark:hover:shadow-gray-900/50 transition-all duration-300 overflow-hidden border border-gray-200/50 dark:border-gray-700/50"
                    >
                      {/* Type Badge */}
                      <div className="absolute top-4 left-4 z-10">
                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold ${getBadgeColor(portfolio.Type)} text-white shadow-lg`}>
                          {getTypeIcon(portfolio.Type)}
                          <span>{portfolio.Type}</span>
                        </div>
                      </div>

                      {/* Category Badge */}
                      {portfolio.category && (
                        <div className="absolute top-14 left-4 z-10">
                          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-gray-700 dark:text-gray-300 border border-gray-300/50 dark:border-gray-600/50`}>
                            {CATEGORY_ICONS[portfolio.category] || <FaStar className="w-3 h-3" />}
                            <span>{portfolio.category}</span>
                          </div>
                        </div>
                      )}

                      {/* Portfolio Image */}
                      <div className="relative overflow-hidden h-56">
                        <img
                          src={portfolio.thumbnail || getDefaultImage(portfolio.category)}
                          alt={portfolio.title}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>

                      {/* Portfolio Details */}
                      <div className="p-5">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {portfolio.title}
                        </h3>
                        
                        {portfolio.path && (
                          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                            {portfolio.path}
                          </p>
                        )}

                        {/* Price Section */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-right">
                            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                              ${portfolio.price?.toLocaleString() || "0"}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              One-time investment
                            </div>
                          </div>
                        </div>

                        {/* Action Button */}
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setBuyModel({ isOpen: true, data: portfolio })}
                          className={`w-full py-3 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 group/btn ${
                            portfolio.Type === "Premium" 
                              ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40"
                              : portfolio.Type === "Standard"
                              ? "bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
                              : "bg-gradient-to-r from-gray-600 to-gray-500 hover:from-gray-700 hover:to-gray-600 shadow-lg shadow-gray-500/25 hover:shadow-gray-500/40"
                          }`}
                        >
                          <span>View Details</span>
                          <FaChevronRight className="group-hover/btn:translate-x-1 transition-transform" />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-16"
                >
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full flex items-center justify-center"
                  >
                    <FaSearch className="text-blue-500 dark:text-blue-400 text-3xl" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
                    No portfolios found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">
                    {searchQuery
                      ? `We couldn't find any portfolios matching "${searchQuery}"`
                      : `No ${activeFilter.toLowerCase()} portfolios available${selectedCategory !== "All Portfolios" ? ` in ${selectedCategory}` : ''}`}
                  </p>
                  {(searchQuery || activeFilter !== "All" || selectedCategory !== "All Portfolios") && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setSearchQuery("");
                        setActiveFilter("All");
                        setSelectedCategory("All Portfolios");
                      }}
                      className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2 mx-auto"
                    >
                      <FaTimes className="w-4 h-4" />
                      Clear all filters
                    </motion.button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </>
      )}

      {/* Buy Modal */}
      <AnimatePresence>
        {buyModel.isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 dark:bg-black/60 backdrop-blur-sm"
              onClick={closeBuyPortfolioModel}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl"
            >
              <PortfolioBuyCard
                data={buyModel.data}
                closeBuyPortfolioModel={closeBuyPortfolioModel}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Helper functions
function getDefaultImage(category) {
  const images = {
    "Technology": "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&auto=format&fit=crop",
    "Green Energy": "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w-800&auto=format&fit=crop",
    "Global": "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&auto=format&fit=crop",
    "Crypto": "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&auto=format&fit=crop",
    "Income": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop"
  };
  return images[category] || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop";
}

function ChevronDownIcon(props) {
  return (
    <svg
      {...props}
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}