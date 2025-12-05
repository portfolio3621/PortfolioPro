import React, { useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import { motion } from "framer-motion";

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

      {/* Buttons */}
      <div className="mt-6 flex gap-4">
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          onClick={handlePreview}
          className="w-1/2 py-3 border border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-zinc-800 rounded-xl text-lg font-medium transition"
        >
          Preview
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => alert("Buying...")}
          className="w-1/2 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg font-medium rounded-xl transition"
        >
          Buy Now
        </motion.button>
      </div>
    </motion.div>
  );
}
