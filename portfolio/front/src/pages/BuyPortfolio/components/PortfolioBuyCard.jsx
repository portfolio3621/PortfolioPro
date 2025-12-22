import React, { useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { motion } from "framer-motion";
import Fetch from "../../../Fetch.js";

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
    const handleOnEsc = (e) => {
      if (e.key === "Escape") {
        closeBuyPortfolioModel();
      }
    };
    document.addEventListener("keydown", handleOnEsc);
    return () => {
      document.removeEventListener("keydown", handleOnEsc);
    };
  }, [closeBuyPortfolioModel]);

  const handlePreview = () => {
    window.open(data.previewUrl || data.thumbnail, "_blank");
  };

  const handleBuyNow = async () => {
    try {
      setLoading(true);
      setError(null);

      const billData = {
        portfolioId: data.id || data._id, // Assuming your data has id or _id field
        status: "Claim",
      };

      // Make API call
      let response = await Fetch.post(`bill`,billData)
      if (!response.success) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }


      if (response.success) {
        // Show success message
        alert(`Purchase successful!`);
        
        // Close modal or redirect if needed
        closeBuyPortfolioModel();
        
        // You can also trigger a refresh of the parent component if needed
        // window.location.reload();
      } else {
        setError(response.message || "Purchase failed. Please try again.");
      }
    } catch (err) {
      console.error("Error creating bill:", err);
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 50 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="relative w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl shadow-xl overflow-hidden p-5"
    >
      {/* Close Button */}
      <button
        onClick={closeBuyPortfolioModel}
        className="absolute top-3 right-3 text-zinc-500 hover:text-red-500 text-3xl transition"
        aria-label="Close"
      >
        <IoIosClose />
      </button>

      {/* Thumbnail */}
      <motion.img
        src={data.thumbnail}
        alt={data.title}
        className="rounded-xl w-full h-52 object-cover mb-4"
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.3 }}
      />

      {/* Badge */}
      <div
        className={`inline-block px-4 py-1 text-xs font-semibold text-white rounded-full mb-3 ${getBadgeColor(
          data.Type
        )}`}
      >
        {data.Type}
      </div>

      {/* Info */}
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-zinc-800 dark:text-white">
          {data.title}
        </h2>
        <p className="text-lg font-bold text-green-600 dark:text-green-400">
          ₹ {data.price}
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-700 rounded-lg">
          <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* Buttons */}
      <div className="mt-6 flex gap-4">
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          onClick={handlePreview}
          disabled={loading}
          className="w-1/2 py-3 border border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-zinc-800 rounded-xl text-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Preview
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          onClick={handleBuyNow}
          disabled={loading}
          className="w-1/2 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg font-medium rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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