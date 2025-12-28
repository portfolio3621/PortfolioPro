import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiEye, 
  FiExternalLink, 
  FiTrash2, 
  FiLink, 
  FiHeart, 
  FiShare2,
  FiBriefcase,
  FiDollarSign
} from "react-icons/fi";
import { TbCurrencyBitcoin, TbLeaf } from "react-icons/tb";
import { MdContentCopy, MdArrowOutward } from "react-icons/md";
import { BsLightningCharge } from "react-icons/bs";
import { Link } from "react-router-dom";

const BASE_URL = window.location.origin;

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3 }
  },
  hover: { 
    y: -4,
    transition: { type: "spring", stiffness: 400, damping: 15 }
  }
};

const getCategoryIcon = (category) => {
  switch(category) {
    case 'Technology': return <BsLightningCharge className="w-5 h-5" />;
    case 'Green Energy': return <TbLeaf className="w-5 h-5" />;
    case 'Crypto': return <TbCurrencyBitcoin className="w-5 h-5" />;
    case 'Global': return <FiBriefcase className="w-5 h-5" />;
    default: return <FiBriefcase className="w-5 h-5" />;
  }
};

const getCategoryColor = (category) => {
  switch(category) {
    case 'Technology': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400';
    case 'Green Energy': return 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400';
    case 'Crypto': return 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400';
    case 'Global': return 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400';
    default: return 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400';
  }
};

export default function Card({ portfolios }) {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [likedCards, setLikedCards] = useState({});
  const [copiedId, setCopiedId] = useState(null);

  const handleLike = (id) => {
    setLikedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleCopy = async (id, text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {portfolios.map((portfolio, index) => (
        <motion.div
          key={portfolio.id}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          transition={{ delay: index * 0.1 }}
          className="group"
          onMouseEnter={() => setHoveredCard(portfolio.id)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          {/* Card Container */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-shadow duration-300">
            {/* Card Header with Image */}
            <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-700 dark:to-gray-800">
              <motion.div
                animate={hoveredCard === portfolio.id ? { scale: 1.05 } : { scale: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <img
                  src={`https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80&text=${encodeURIComponent(portfolio.name)}`}
                  alt={portfolio.name}
                  className="w-full h-full object-cover opacity-80"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent dark:from-gray-800/60" />
              
              {/* Top Badges */}
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${getCategoryColor(portfolio.category)}`}>
                  {portfolio.category}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={() => handleLike(portfolio.id)}
                  className="p-2 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700 transition-colors"
                >
                  <FiHeart className={`w-4 h-4 ${likedCards[portfolio.id] ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-400'}`} />
                </button>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6">
              {/* Title and Price */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {portfolio.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {portfolio.description}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {portfolio.price}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    starting price
                  </div>
                </div>
              </div>

              {/* Category and Icon */}
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-2 rounded-lg ${getCategoryColor(portfolio.category)}`}>
                  {getCategoryIcon(portfolio.category)}
                </div>
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Category</div>
                  <div className="font-medium text-gray-900 dark:text-white">{portfolio.category}</div>
                </div>
              </div>

              {/* URL Copy Section */}
              <div className="mb-6">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Portfolio URL</div>
                <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <FiLink className="text-gray-400 dark:text-gray-500 flex-shrink-0" />
                  <input
                    type="text"
                    readOnly
                    value={`${BASE_URL}/portfolio/public/${portfolio.id}`}
                    className="flex-1 bg-transparent text-sm text-gray-700 dark:text-gray-300 truncate outline-none"
                  />
                  <button
                    onClick={() => handleCopy(portfolio.id, `${BASE_URL}/portfolio/public/${portfolio.id}`)}
                    className={`p-2 rounded-lg transition-colors ${
                      copiedId === portfolio.id 
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                        : 'hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    <MdContentCopy className="w-4 h-4" />
                  </button>
                </div>
                <AnimatePresence>
                  {copiedId === portfolio.id && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="text-sm text-green-600 dark:text-green-400 mt-1 text-right"
                    >
                      Copied!
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <Link
                  to={`/manage/bill/${portfolio.id}`}
                  className="flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-3 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <FiEye />
                  View Details
                </Link>
                <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300">
                <Link to={`${BASE_URL}/portfolio/public/${portfolio.id}`}>
                  <FiExternalLink />
                  Preview
                </Link>
                </button>
                
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}