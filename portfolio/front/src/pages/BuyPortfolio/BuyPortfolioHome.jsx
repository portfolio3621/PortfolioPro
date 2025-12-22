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
  FaTimes
} from "react-icons/fa";
import PortfolioBuyCard from "./components/PortfolioBuyCard";

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

  const closeBuyPortfolioModel = () => {
    setBuyModel({ isOpen: false, data: null });
  };

  const getPortfolios = async () => {
    try {
      const response = await Fetch.get("all-portfolio");
      if (response.success) {
        setPortfolios(response.data);
        filterAndSortPortfolios(activeFilter, searchQuery, sortBy, response.data);
      } else {
        setError("Failed to load portfolios.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch portfolios.");
    }
  };

  const filterAndSortPortfolios = (type, query = searchQuery, sort = sortBy, list = portfolios) => {
    let filtered = [...list];
    
    if (type !== "All") {
      filtered = filtered.filter((p) => p.Type === type);
    }
    
    if (query.trim() !== "") {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.description?.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    switch (sort) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "popular":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        filtered.sort((a, b) => {
          const typeOrder = { Premium: 3, Standard: 2, Basic: 1 };
          return (typeOrder[b.Type] || 0) - (typeOrder[a.Type] || 0);
        });
    }
    
    setFilteredPortfolios(filtered);
  };

  const getBadgeColor = (type) => {
    switch (type) {
      case "Premium":
        return "bg-gradient-to-r from-purple-600 to-pink-600";
      case "Standard":
        return "bg-gradient-to-r from-blue-600 to-teal-500";
      case "Basic":
        return "bg-gradient-to-r from-gray-600 to-gray-500";
      default:
        return "bg-gray-300";
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

  useEffect(() => {
    Promise.all([getPortfolios()])
      .catch((err) => {
        console.error(err);
        setError("Failed to load data.");
      })
      .finally(() => {
        setTimeout(() => setLoading(false), 300);
      });
  }, []);

  useEffect(() => {
    filterAndSortPortfolios(activeFilter, searchQuery, sortBy);
  }, [activeFilter, searchQuery, sortBy]);

  const filterButtons = [
    { label: "All", icon: <FaStar /> },
    { label: "Basic", icon: <FaStar /> },
    { label: "Standard", icon: <FaGem /> },
    { label: "Premium", icon: <FaCrown /> },
  ];

  const sortOptions = [
    { label: "Featured", value: "featured" },
    { label: "Price: Low to High", value: "price-low" },
    { label: "Price: High to Low", value: "price-high" },
    { label: "Most Popular", value: "popular" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {loading ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-gray-200 dark:border-gray-700 rounded-full"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading portfolios...</p>
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="pt-8 pb-12 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8"
              >
                <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-800 dark:text-white">
                  Buy Your Favorite Portfolio
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Discover amazing investment opportunities
                </p>
              </motion.div>

              {/* Search and Filter */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1 relative">
                    <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search portfolios..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        <FaTimes />
                      </button>
                    )}
                  </div>

                  <div className="relative">
                    <FaFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full md:w-auto pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-800 dark:text-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition"
                    >
                      {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Filter Buttons */}
                <div className="flex flex-wrap gap-2 justify-center">
                  {filterButtons.map(({ label, icon }) => (
                    <motion.button
                      key={label}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveFilter(label)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                        activeFilter === label
                          ? `${
                              label === "Premium" 
                                ? "bg-gradient-to-r from-purple-600 to-pink-600" 
                                : label === "Standard"
                                ? "bg-gradient-to-r from-blue-600 to-teal-500"
                                : label === "Basic"
                                ? "bg-gradient-to-r from-gray-600 to-gray-500"
                                : "bg-gradient-to-r from-blue-500 to-blue-600"
                            } text-white shadow-lg`
                          : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-700"
                      }`}
                    >
                      {icon}
                      <span>{label}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Main Content */}
          <main className="px-4 md:px-8 max-w-7xl mx-auto">
            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-8 p-4 bg-red-100 dark:bg-red-900/30 border-l-4 border-red-500 rounded-lg"
              >
                <p className="text-red-700 dark:text-red-300">{error}</p>
              </motion.div>
            )}

            {/* Portfolio Grid */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {activeFilter === "All" ? "All Portfolios" : `${activeFilter} Portfolios`}
                  <span className="text-gray-500 dark:text-gray-400 font-normal ml-2">
                    ({filteredPortfolios.length})
                  </span>
                </h2>
              </div>

              <AnimatePresence>
                {filteredPortfolios.length > 0 ? (
                  <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  >
                    {filteredPortfolios.map((portfolio, index) => (
                      <motion.div
                        layout
                        key={portfolio._id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        whileHover={{ y: -4 }}
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-900/50 hover:shadow-xl dark:hover:shadow-gray-900 transition-all duration-300 overflow-hidden group border border-gray-200 dark:border-gray-700"
                      >
                        {/* Type Badge */}
                        <div className="absolute top-4 left-4 z-10">
                          <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold ${getBadgeColor(portfolio.Type)} text-white`}>
                            {getTypeIcon(portfolio.Type)}
                            {portfolio.Type}
                          </div>
                        </div>

                        {/* Portfolio Image */}
                        <div className="relative overflow-hidden h-48">
                          <img
                            src={portfolio.thumbnail || "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop"}
                            alt={portfolio.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                        </div>

                        {/* Portfolio Details */}
                        <div className="p-5">
                          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2 line-clamp-1">
                            {portfolio.title}
                          </h3>
                          
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <div className="text-2xl font-bold text-gray-800 dark:text-white">
                                ${portfolio.price.toLocaleString()}
                              </div>
                            </div>
                          </div>

                          {/* Action Button */}
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setBuyModel({ isOpen: true, data: portfolio })}
                            className={`w-full bg-gradient-to-r ${
                              portfolio.Type === "Premium" 
                                ? "from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                                : portfolio.Type === "Standard"
                                ? "from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600"
                                : "from-gray-600 to-gray-500 hover:from-gray-700 hover:to-gray-600"
                            } text-white font-semibold py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group`}
                          >
                            <span>View Details</span>
                            <FaChevronRight className="group-hover:translate-x-1 transition-transform" />
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 mx-auto mb-4 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                      <FaSearch className="text-gray-400 dark:text-gray-500 text-2xl" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      No portfolios found
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                      {searchQuery
                        ? `No results for "${searchQuery}"`
                        : `No ${activeFilter.toLowerCase()} portfolios available`}
                    </p>
                    {(searchQuery || activeFilter !== "All") && (
                      <button
                        onClick={() => {
                          setSearchQuery("");
                          setActiveFilter("All");
                        }}
                        className="px-5 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition"
                      >
                        View All Portfolios
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </main>
        </>
      )}

      {/* Buy Modal */}
      <AnimatePresence>
        {buyModel.isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/60 dark:bg-black/70 backdrop-blur-sm"
              onClick={closeBuyPortfolioModel}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
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