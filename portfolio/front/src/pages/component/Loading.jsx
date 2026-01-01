import React from 'react';
import { motion } from 'framer-motion';

// Option 1: Modern Gradient Spinner
export const GradientSpinner = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  };

  return (
    <div className={`${sizes[size]} ${className}`}>
      <div className="relative w-full h-full">
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 border-r-teal-500 animate-spin"></div>
        <div className="absolute inset-1 rounded-full border-4 border-transparent border-t-pink-500 border-r-purple-500 animate-spin animate-reverse"></div>
      </div>
    </div>
  );
};

// Option 2: Pulsing Dots
export const PulsingDots = ({ className = '' }) => {
  return (
    <div className={`flex items-center justify-center space-x-2 ${className}`}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-teal-400"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.2
          }}
        />
      ))}
    </div>
  );
};

// Option 3: Elegant Orbital Spinner
export const OrbitalSpinner = ({ className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-blue-400/30"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-2 rounded-full border-2 border-teal-400/30"
        animate={{ rotate: -360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-teal-400"></div>
      </div>
    </div>
  );
};

// Option 4: Wave Dots
export const WaveDots = ({ className = '' }) => {
  return (
    <div className={`flex items-end space-x-1 h-6 ${className}`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="w-1.5 rounded-full bg-gradient-to-b from-blue-500 to-teal-400"
          initial={{ height: '0.5rem' }}
          animate={{ 
            height: ['0.5rem', '1.5rem', '0.5rem']
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

// Option 5: 3D Cube Spinner
export const CubeSpinner = ({ className = '' }) => {
  return (
    <motion.div 
      className={`relative w-10 h-10 ${className}`}
      animate={{ rotateY: 360, rotateX: 360 }}
      transition={{ 
        duration: 3, 
        repeat: Infinity, 
        ease: "linear" 
      }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {['front', 'back', 'left', 'right', 'top', 'bottom'].map((face, i) => (
        <div
          key={face}
          className={`absolute w-full h-full border-2 ${
            i % 2 === 0 
              ? 'border-blue-400/50 bg-blue-500/10' 
              : 'border-teal-400/50 bg-teal-500/10'
          }`}
          style={{
            transform: 
              face === 'front' ? 'translateZ(10px)' :
              face === 'back' ? 'rotateY(180deg) translateZ(10px)' :
              face === 'left' ? 'rotateY(-90deg) translateZ(10px)' :
              face === 'right' ? 'rotateY(90deg) translateZ(10px)' :
              face === 'top' ? 'rotateX(90deg) translateZ(10px)' :
              'rotateX(-90deg) translateZ(10px)'
          }}
        />
      ))}
    </motion.div>
  );
};

// Option 6: Glowing Pulse
export const GlowingPulse = ({ className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      <motion.div
        className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500/30 to-teal-400/30"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{ 
          duration: 1.5, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
      />
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 blur-md"
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.1, 0.3]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
      />
    </div>
  );
};

// Option 7: Modern Progress Bars
export const ProgressBars = ({ className = '' }) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="h-1.5 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ 
            duration: 0.5, 
            delay: i * 0.1,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-blue-500 via-teal-400 to-blue-500"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut" 
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};

// Option 8: Particle Ring
export const ParticleRing = ({ className = '' }) => {
  const particles = 12;
  
  return (
    <div className={`relative w-16 h-16 ${className}`}>
      <motion.div
        className="absolute inset-0 rounded-full border border-blue-400/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
      {Array.from({ length: particles }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-teal-400"
          style={{
            left: '50%',
            top: '50%',
            transform: `rotate(${i * (360 / particles)}deg) translateX(24px)`
          }}
          animate={{
            scale: [0.8, 1.2, 0.8],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.1
          }}
        />
      ))}
    </div>
  );
};

// Main Loading Component - You can choose which spinner to use
export const LoadingSpinner = ({ 
  type = 'gradient', 
  size = 'md',
  message = 'Loading template...',
  fullScreen = false,
  className = '' 
}) => {
  const spinnerComponents = {
    gradient: <GradientSpinner size={size} />,
    pulsing: <PulsingDots />,
    orbital: <OrbitalSpinner className="w-16 h-16" />,
    wave: <WaveDots />,
    cube: <CubeSpinner />,
    glow: <GlowingPulse />,
    progress: <ProgressBars />,
    particle: <ParticleRing />
  };

  const content = (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`flex flex-col items-center justify-center gap-4 ${className}`}
    >
      {/* Animated Background Ring */}
      <div className="relative">
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/10 to-teal-400/10 blur-xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
        
        {/* Main Spinner */}
        {spinnerComponents[type]}
      </div>
      
      {/* Loading Text */}
      {message && (
        <div className="text-center space-y-2">
          <motion.p 
            className="text-gray-600 dark:text-gray-300 font-medium"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {message}
          </motion.p>
          <motion.p 
            className="text-sm text-gray-500 dark:text-gray-400"
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
          >
            Please wait a moment...
          </motion.p>
        </div>
      )}
    </motion.div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50/95 via-white/95 to-blue-50/95 dark:from-gray-900/95 dark:via-gray-800/95 dark:to-gray-900/95 backdrop-blur-sm z-50">
        {content}
      </div>
    );
  }

  return content;
};

// Quick Usage Example for your loading state:
export const LoadingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <LoadingSpinner 
        type="gradient" // Try: 'pulsing', 'orbital', 'wave', 'cube', 'glow', 'progress', 'particle'
        size="lg"
        message="Loading portfolio template..."
        fullScreen={false}
      />
      
      {/* You can also show multiple options for variety */}
      <div className="mt-12 text-center">
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
          Choose a spinner style:
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          {Object.keys(spinnerComponents).map((type) => (
            <button
              key={type}
              className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm"
              onClick={() => console.log(`Selected: ${type}`)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Simple usage in your component:
export const PortfolioWithLoading = ({ portfolioData, loading }) => {
  if (loading) {
    return <LoadingPage />;
    // OR use a specific spinner directly:
    // return <LoadingSpinner type="gradient" message="Loading template..." fullScreen={true} />;
  }

  // Your existing portfolio component here...
  return <div>Your portfolio content</div>;
};

export default LoadingSpinner;