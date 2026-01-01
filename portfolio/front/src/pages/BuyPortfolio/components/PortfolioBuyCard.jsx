import React, { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { motion } from "framer-motion";
import Fetch from "../../../Fetch.js";
import { Link } from "react-router-dom";

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

export default function PortfolioBuyCard({ data, closeBuyPortfolioModel }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") closeBuyPortfolioModel();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [closeBuyPortfolioModel]);

  const handleBuyNow = async () => {
    setLoading(true);
    setError(null);

    try {
      const billData = {
        portfolioId: data._id || data.id,
        status: "Claim",           // ← Changed - makes more sense for new purchase
      };

      const response = await Fetch.post("bill", billData);

      if (!response?.success) {
        throw new Error(response?.message || "Failed to create purchase record");
      }

      // Success
      alert("Purchase successful! You now own this portfolio template.");
      closeBuyPortfolioModel();

      // Optional: you could refresh parent list here
      // window.location.reload(); or use context/redux to update UI

    } catch (err) {
      console.log("Purchase error:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: 40 }}
      transition={{ duration: 0.25 }}
      className="relative w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden p-6"
    >
      <button
        onClick={closeBuyPortfolioModel}
        className="absolute top-4 right-4 text-zinc-400 hover:text-red-500 text-3xl transition-colors"
        aria-label="Close"
      >
        <IoIosClose />
      </button>

      <motion.img
        src={data.thumbnail}
        alt={data.title}
        className="rounded-xl w-full h-56 object-cover mb-5 shadow-md"
        whileHover={{ scale: 1.02 }}
      />

      <div
        className={`inline-block px-4 py-1.5 text-sm font-semibold text-white rounded-full mb-4 ${getBadgeColor(data.Type)}`}
      >
        {data.Type}
      </div>

      <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
        {data.title}
      </h2>

      <p className="text-2xl font-extrabold text-green-600 dark:text-green-400 mb-6">
        ₹{data.price?.toLocaleString() || data.price}
      </p>

      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="flex gap-4">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex-1 py-3 border-2 border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 rounded-xl font-medium hover:bg-blue-50 dark:hover:bg-zinc-800 transition-colors"
        >
          <Link to={`/portfolio/template/${data._id}`}>
            Preview
          </Link>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleBuyNow}
          disabled={loading}
          className={`flex-1 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-xl transition-all flex items-center justify-center shadow-md ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Processing...
            </>
          ) : (
            "Buy Now"
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}