import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NotFound404() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950 transition-all duration-700">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0
            }}
            animate={{
              y: [null, -100 + Math.random() * 200],
              x: [null, -50 + Math.random() * 100],
              opacity: [0, 0.6, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 0.3
            }}
          />
        ))}
      </div>

      <div className="relative min-h-screen flex items-center justify-center p-4">
        {/* Main content */}
        <motion.div
          className="relative w-full max-w-6xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
            
            {/* Left side - Visual element */}
            <motion.div
              className="lg:w-1/2 relative"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              {/* Animated 404 container */}
              <div className="relative">
                {/* Outer glow */}
                <motion.div
                  className="absolute -inset-8 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-[3rem] blur-2xl"
                  animate={{
                    scale: [1, 1.05, 1],
                    rotate: [0, 1, -1, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Main 404 card */}
                <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-[2.5rem] p-12 shadow-2xl border border-white/30 dark:border-gray-700/30">
                  {/* Number 4 */}
                  <div className="relative">
                    <motion.div
                      className="absolute -top-8 -left-8 text-9xl font-black text-primary/20 dark:text-primary/10"
                      initial={{ scale: 0.5, rotate: -5 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.5, type: "spring" }}
                    >
                      4
                    </motion.div>
                    
                    <motion.div
                      className="text-9xl font-black bg-gradient-to-br from-primary via-secondary to-accent bg-clip-text text-transparent"
                      animate={{
                        y: [0, -10, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      404
                    </motion.div>
                    
                    <motion.div
                      className="absolute -bottom-8 -right-8 text-9xl font-black text-secondary/20 dark:text-secondary/10"
                      initial={{ scale: 0.5, rotate: 5 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.7, type: "spring" }}
                    >
                      4
                    </motion.div>
                  </div>
                  
                  {/* Decorative elements */}
                  <motion.div
                    className="absolute top-6 right-6 w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary"
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 180, 360]
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                  
                  <motion.div
                    className="absolute bottom-6 left-6 w-12 h-12 rounded-full bg-gradient-to-br from-accent to-primary"
                    animate={{
                      scale: [1, 1.3, 1],
                      rotate: [360, 0]
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                </div>
                
                {/* Floating emoji */}
                <motion.div
                  className="absolute -right-8 -top-8 text-5xl"
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  🚀
                </motion.div>
              </div>
            </motion.div>

            {/* Right side - Content */}
            <motion.div
              className="lg:w-1/2 space-y-8"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {/* Title and subtitle */}
              <div className="space-y-4">
                <motion.div
                  className="inline-flex items-center gap-3 px-4 py-2 bg-primary/10 dark:bg-primary/20 rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8, type: "spring" }}
                >
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-sm font-semibold text-primary dark:text-primary/90">
                    ERROR 404
                  </span>
                </motion.div>
                
                <h1 className="text-5xl lg:text-6xl font-bold tracking-tight">
                  <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                    Page Not Found
                  </span>
                </h1>
                
                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                  The page you're looking for seems to have vanished into the digital cosmos. 
                  But every end is a new beginning—let's find your way back.
                </p>
              </div>

              {/* Stats or metrics */}
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-white/30 dark:border-gray-700/30"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-3xl mb-2">✨</div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Explore</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Discover our best content
                  </p>
                </motion.div>
                
                <motion.div
                  className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-white/30 dark:border-gray-700/30"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-3xl mb-2">🎯</div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Navigate</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Find what you need quickly
                  </p>
                </motion.div>
              </div>

              {/* Main CTA Button */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.2, type: "spring" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/">
                  <button className="group relative w-full lg:w-auto px-12 py-5 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-2xl shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 overflow-hidden">
                    {/* Button shine effect */}
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-1000" />
                    
                    <div className="relative flex items-center justify-center gap-3">
                      <span className="text-2xl">🏠</span>
                      <span className="text-lg">Return to Homepage</span>
                      <motion.span
                        className="text-xl"
                        animate={{ x: [0, 5, 0] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                      >
                        →
                      </motion.span>
                    </div>
                    
                    {/* Button border glow */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-white/30 transition-colors duration-300" />
                  </button>
                </Link>
              </motion.div>

              {/* Secondary actions */}
              <motion.div
                className="flex flex-wrap gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
              >
                <motion.button
                  className="px-6 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl text-gray-700 dark:text-gray-300 font-medium hover:bg-white dark:hover:bg-gray-700 transition-colors duration-300 border border-gray-200 dark:border-gray-700"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.history.back()}
                >
                  ← Go Back
                </motion.button>
                
                <Link to="/contact">
                  <motion.button
                    className="px-6 py-3 bg-transparent backdrop-blur-sm rounded-xl text-primary dark:text-primary/90 font-medium hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors duration-300 border border-primary/30 dark:border-primary/50"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Contact Support
                  </motion.button>
                </Link>
              </motion.div>

              {/* Decorative quote */}
              <motion.div
                className="pt-8 border-t border-gray-200/50 dark:border-gray-700/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 }}
              >
                <p className="text-gray-500 dark:text-gray-400 italic text-center lg:text-left">
                  "Sometimes getting lost is the best way to discover something new."
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Floating decorative circles */}
          <motion.div
            className="absolute -left-20 top-1/4 w-40 h-40 rounded-full bg-gradient-to-br from-primary/10 to-transparent border border-primary/20"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 90, 180, 270, 360]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          <motion.div
            className="absolute -right-20 bottom-1/4 w-60 h-60 rounded-full bg-gradient-to-tl from-secondary/10 to-transparent border border-secondary/20"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [360, 0]
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </motion.div>

        {/* Bottom navigation hint */}
        <motion.div
          className="absolute bottom-8 left-0 right-0 text-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm rounded-full">
            <div className="w-1 h-1 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Use the navigation menu or return home
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}