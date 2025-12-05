import React, { useEffect, useState } from "react";
import Fetch from "../../Fetch";
import { motion } from "framer-motion";
import { FaCrown, FaGem, FaStar, FaGlobe } from "react-icons/fa";
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
  const [activeFilter, setActiveFilter] = useState("Basic");

  const closeBuyPortfolioModel = () => {
    setBuyModel({ isOpen: false, data: null });
  };

  const getPortfolios = async () => {
    try {
      const response = await Fetch.get("all-portfolio");
      if (response.success) {
        setPortfolios(response.data);
        filterPortfolios(activeFilter, response.data);
      } else {
        setError("Failed to load portfolios.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch portfolios.");
    }
  };

  const filterPortfolios = (type, list = portfolios) => {
    if (type === "All") {
      setFilteredPortfolios(list);
    } else {
      const filtered = list.filter((p) => p.Type === type);
      setFilteredPortfolios(filtered);
    }
    setActiveFilter(type);
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

  useEffect(() => {
    Promise.all([getPortfolios()])
      .catch((err) => {
        console.error(err);
        setError("Failed to load data.");
      })
      .finally(() => setLoading(false));
  }, []);

  const filterButtons = [
    { label: "All", icon: <FaGlobe className="text-green-500" /> },
    { label: "Basic", icon: <FaStar className="text-yellow-400" /> },
    { label: "Standard", icon: <FaGem className="text-purple-500" /> },
    { label: "Premium", icon: <FaCrown className="text-orange-400" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {loading ? (
        <div className="flex items-center justify-center h-screen text-gray-500 text-xl">
          Loading...
        </div>
      ) : (
        <>
          {error && (
            <div className="bg-red-100 text-red-700 text-center p-3 mb-4 rounded">
              {error}
            </div>
          )}

          <main className="mt-6 px-4 md:px-10 max-w-7xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
              Buy Your Favorite Portfolio
            </h1>

            <div className="flex justify-center mb-8">
              <div className="flex gap-4 bg-white shadow-md px-6 py-2 rounded-full flex-wrap justify-center">
                {filterButtons.map(({ label, icon }) => (
                  <button
                    key={label}
                    onClick={() => filterPortfolios(label)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                      activeFilter === label
                        ? "bg-blue-600 text-white shadow"
                        : "hover:bg-blue-100 text-gray-600"
                    }`}
                  >
                    {icon}
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPortfolios.length > 0 ? (
                filteredPortfolios.map((portfolio) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    key={portfolio._id}
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden relative"
                  >
                    <div
                      className={`absolute top-3 left-3 text-white text-xs px-3 py-1 rounded-full font-semibold ${getBadgeColor(
                        portfolio.Type
                      )}`}
                    >
                      {portfolio.Type}
                    </div>
                    <img
                      src={portfolio.thumbnail}
                      alt={portfolio.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-5">
                      <h3 className="text-xl font-semibold text-gray-800">
                        {portfolio.title}
                      </h3>
                      <p className="text-blue-600 mt-2 text-lg font-bold">
                        ${portfolio.price}
                      </p>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.05 }}
                        onClick={() =>
                          setBuyModel({ isOpen: true, data: portfolio })
                        }
                        className="mt-6 w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg font-medium rounded-xl transition"
                      >
                        Buy Now
                      </motion.button>
                    </div>
                  </motion.div>
                ))
              ) : (
                <p className="col-span-full text-center text-gray-500 text-lg">
                  No portfolios found in this category.
                </p>
              )}
            </div>
          </main>
        </>
      )}
      {buyModel.isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="w-full max-w-xl px-4"
          >
            <PortfolioBuyCard
              data={buyModel.data}
              closeBuyPortfolioModel={closeBuyPortfolioModel}
            />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
