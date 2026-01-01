import React, { useState, useEffect } from 'react';
import { motion , AnimatePresence } from 'framer-motion';
import { 
  FiGithub, FiTwitter, FiMail, FiPhone, FiMapPin,
  FiGlobe, FiStar, FiAward, FiBriefcase, FiBookOpen,
  FiSun, FiMoon, FiExternalLink, FiCode, FiDatabase,
  FiShield, FiLock, FiTrendingUp, FiDollarSign, FiCpu
} from 'react-icons/fi';
import { 
  FaEthereum, FaBitcoin, FaWallet, FaCoins, FaNetworkWired,
  FaShieldAlt, FaRocket, FaChartLine, FaGem, FaCodeBranch,
  FaConnectdevelop, FaFingerprint, FaServer, FaUserLock
} from 'react-icons/fa';
import { 
  SiSolidity, SiEthereum, SiBitcoin, SiBinance,
  SiPolymerproject, SiChainlink, SiPolkadot, SiCardano,
  SiWeb3Dotjs
} from 'react-icons/si';
import { FaXTwitter, FaDiscord, FaTelegram } from 'react-icons/fa6';

const CryptoPortfolio = ({ portfolioData }) => {
  // State management
  const [darkMode, setDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState('featured');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeProject, setActiveProject] = useState(null);
  const [walletAddress, setWalletAddress] = useState('');
  const [networkStatus, setNetworkStatus] = useState('disconnected');
  const [cryptoPrices, setCryptoPrices] = useState({
    btc: 0,
    eth: 0,
    sol: 0
  });

  // Crypto platform options
  const cryptoPlatforms = [
    { id: "github", name: "GitHub", icon: FiGithub, color: "text-white", bgColor: "bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black" },
    { id: "x", name: "X", icon: FaXTwitter, color: "text-white", bgColor: "bg-gradient-to-r from-gray-900 to-black hover:from-black hover:to-gray-900" },
    { id: "telegram", name: "Telegram", icon: FaTelegram, color: "text-white", bgColor: "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700" },
    { id: "discord", name: "Discord", icon: FaDiscord, color: "text-white", bgColor: "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700" },
    { id: "website", name: "Website", icon: FiGlobe, color: "text-white", bgColor: "bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600" },
    { id: "ethereum", name: "Ethereum", icon: FaEthereum, color: "text-white", bgColor: "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700" },
    { id: "bitcoin", name: "Bitcoin", icon: FaBitcoin, color: "text-white", bgColor: "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600" },
  ];

  // Crypto skills
  const cryptoSkills = [
    { name: "Solidity", icon: SiSolidity, level: 90, category: "Blockchain" },
    { name: "Web3.js", icon: SiWeb3Dotjs, level: 85, category: "Web3" },
    { name: "Smart Contracts", icon: FaCodeBranch, level: 88, category: "Development" },
    { name: "DeFi Protocols", icon: FaCoins, level: 82, category: "Finance" },
    { name: "NFT Development", icon: FaGem, level: 85, category: "Web3" },
    { name: "Security Auditing", icon: FaShieldAlt, level: 87, category: "Security" },
    { name: "Layer 2 Solutions", icon: FaNetworkWired, level: 80, category: "Scaling" },
    { name: "Cross-chain", icon: SiChainlink, level: 78, category: "Interoperability" },
  ];

  // Default portfolio data
  const defaultPortfolioData = {
    name: 'Crypto Dev',
    title: 'Blockchain Developer & Smart Contract Auditor',
    about: 'Building decentralized applications and secure smart contracts. Specialized in DeFi, NFTs, and cross-chain interoperability. Passionate about Web3 and the future of decentralized finance.',
    avatarUrl: 'https://images.unsplash.com/photo-1620336655055-bd87c3c1fa5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    resumeUrl: '#',
    email: 'dev@crypto.eth',
    phone: '+1 (555) 123-4567',
    address: 'Remote • Global',
    skills: cryptoSkills,
    projects: [],
    experience: [],
    education: [],
    socialLinks: {},
    walletAddress: '0x742d35Cc6634C0532925a3b844Bc9e8e0895b9B0',
    networks: ['Ethereum', 'Polygon', 'Arbitrum', 'Optimism'],
    certifications: ['Certified Ethereum Developer', 'Smart Contract Security Auditor']
  };

  // Merge portfolioData with defaults
  const data = { ...defaultPortfolioData, ...portfolioData };

  // Filter projects
  const filteredProjects = data.projects?.length > 0 
    ? (activeTab === "all" 
        ? data.projects 
        : data.projects.filter(project => project.featured))
    : [];

  // Get active social platforms
  const activeCryptoPlatforms = cryptoPlatforms.filter(platform => 
    data.socialLinks && data.socialLinks[platform.id]
  );

  // Theme toggle
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', !darkMode);
    setIsMenuOpen(false);
  };

  // Simulate crypto price updates
  useEffect(() => {
    const updatePrices = () => {
      setCryptoPrices({
        btc: 45000 + Math.random() * 1000,
        eth: 3000 + Math.random() * 200,
        sol: 100 + Math.random() * 10
      });
    };
    
    updatePrices();
    const interval = setInterval(updatePrices, 5000);
    return () => clearInterval(interval);
  }, []);

  // Scroll progress indicator
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const progress = (scrollTop / (docHeight - windowHeight)) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check for saved theme preference
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') !== 'false';
    setDarkMode(savedMode);
  }, []);

  // Copy wallet address
  const copyWalletAddress = () => {
    navigator.clipboard.writeText(data.walletAddress);
    // You can add a toast notification here
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100' 
        : 'bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 text-gray-800'
    }`}>
      {/* Animated Crypto Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Floating blockchain nodes */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.3 + 0.1
            }}
            animate={{
              x: [null, Math.random() * window.innerWidth],
              y: [null, Math.random() * window.innerHeight],
            }}
            transition={{
              duration: Math.random() * 30 + 20,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              width: Math.random() * 50 + 20,
              height: Math.random() * 50 + 20,
            }}
          />
        ))}

        {/* Blockchain connection lines */}
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          {[...Array(8)].map((_, i) => (
            <motion.line
              key={i}
              x1={Math.random() * 100 + '%'}
              y1={Math.random() * 100 + '%'}
              x2={Math.random() * 100 + '%'}
              y2={Math.random() * 100 + '%'}
              stroke="url(#lineGradient)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{
                duration: 3,
                delay: i * 0.3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          ))}
        </svg>
      </div>

      {/* Glass-morphism Header with Crypto Style */}
      <header className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl ${
        darkMode 
          ? 'bg-gray-900/90 border-b border-cyan-500/20' 
          : 'bg-white/90 border-b border-blue-500/20'
      } shadow-2xl shadow-cyan-500/10`}>
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo with Crypto Symbol */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="relative">
              <div className={`w-12 h-12 rounded-xl ${
                darkMode 
                  ? 'bg-gradient-to-br from-cyan-500 to-blue-600' 
                  : 'bg-gradient-to-br from-blue-500 to-cyan-400'
              } flex items-center justify-center shadow-lg shadow-cyan-500/30`}>
                <FaEthereum className="text-white text-2xl" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-gray-900"></div>
            </div>
            <div>
              <div className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {data.name}
              </div>
              <div className="text-xs text-cyan-400/80 font-mono">Web3 Developer</div>
            </div>
          </motion.div>

          {/* Crypto Stats Ticker */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2">
              <FaBitcoin className="text-amber-500" />
              <span className="font-mono font-bold">${cryptoPrices.btc.toFixed(0)}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaEthereum className="text-purple-500" />
              <span className="font-mono font-bold">${cryptoPrices.eth.toFixed(0)}</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {['about', 'skills', 'projects', 'experience', 'contact'].map((item) => (
              <motion.a 
                key={item}
                href={`#${item}`}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                className={`capitalize relative group font-mono font-medium ${
                  darkMode 
                    ? 'text-gray-300 hover:text-cyan-400' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {item}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 ${
                  darkMode ? 'bg-cyan-400' : 'bg-blue-500'
                } group-hover:w-full transition-all duration-300`}></span>
              </motion.a>
            ))}
            
            {/* Wallet Button */}
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={copyWalletAddress}
              className={`px-4 py-2 rounded-lg font-mono text-sm ${
                darkMode 
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600' 
                  : 'bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-600 hover:to-teal-500'
              } text-white flex items-center gap-2`}
            >
              <FaWallet className="text-sm" />
              <span className="hidden lg:inline">
                {data.walletAddress.slice(0, 6)}...{data.walletAddress.slice(-4)}
              </span>
              <span className="lg:hidden">Wallet</span>
            </motion.button>

            {/* Theme Toggle */}
            <motion.button 
              onClick={toggleTheme}
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              className={`p-2 rounded-lg flex items-center justify-center ${
                darkMode 
                  ? 'bg-gray-800 hover:bg-gray-700 text-cyan-400 border border-cyan-500/30' 
                  : 'bg-gray-100 hover:bg-gray-200 text-blue-600 border border-blue-500/30'
              }`}
              aria-label="Toggle theme"
            >
              {darkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
            </motion.button>
          </nav>

          {/* Mobile header actions */}
          <div className="flex items-center gap-4 md:hidden">
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={copyWalletAddress}
              className={`p-2 rounded-lg ${
                darkMode 
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-500' 
                  : 'bg-gradient-to-r from-emerald-500 to-teal-400'
              } text-white`}
            >
              <FaWallet className="text-sm" />
            </motion.button>

            <motion.button 
              onClick={toggleTheme}
              whileTap={{ scale: 0.9 }}
              className={`p-2 rounded-lg ${
                darkMode 
                  ? 'bg-gray-800 text-cyan-400' 
                  : 'bg-gray-100 text-blue-600'
              }`}
              aria-label="Toggle theme"
            >
              {darkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
            </motion.button>

            {/* Mobile menu button */}
            <button 
              className="focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className={`w-6 flex flex-col gap-1 transition-all duration-300 ${isMenuOpen ? 'transform rotate-180' : ''}`}>
                <span className={`h-0.5 w-full transition-all duration-300 ${isMenuOpen ? 'transform rotate-45 translate-y-1.5' : ''} ${darkMode ? 'bg-cyan-400' : 'bg-blue-600'}`}></span>
                <span className={`h-0.5 w-full transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''} ${darkMode ? 'bg-cyan-400' : 'bg-blue-600'}`}></span>
                <span className={`h-0.5 w-full transition-all duration-300 ${isMenuOpen ? 'transform -rotate-45 -translate-y-1.5' : ''} ${darkMode ? 'bg-cyan-400' : 'bg-blue-600'}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`md:hidden overflow-hidden ${
                darkMode 
                  ? 'bg-gray-900/95 backdrop-blur-xl border-t border-cyan-500/20' 
                  : 'bg-white/95 backdrop-blur-xl border-t border-blue-500/20'
              }`}
            >
              <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
                {['about', 'skills', 'projects', 'experience', 'contact'].map((item) => (
                  <a 
                    key={item}
                    href={`#${item}`}
                    className={`capitalize py-3 text-lg font-mono font-medium ${
                      darkMode 
                        ? 'text-gray-300 hover:text-cyan-400 border-b border-cyan-500/10' 
                        : 'text-gray-600 hover:text-blue-600 border-b border-blue-500/10'
                    } transition-colors`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
                <div className="pt-4 border-t border-cyan-500/20">
                  <div className="font-mono text-sm text-cyan-400/80 mb-2">Wallet Address</div>
                  <div className={`p-3 rounded-lg font-mono text-sm ${
                    darkMode ? 'bg-gray-800' : 'bg-gray-100'
                  }`}>
                    {data.walletAddress}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <div className="pt-20 container mx-auto px-4 md:px-6 max-w-6xl">
        {/* Hero Section */}
        <section id="about" className="min-h-screen flex items-center relative py-20">
          {/* Animated blockchain elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-gradient-to-r from-cyan-500/5 to-blue-500/5 blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-gradient-to-r from-purple-500/5 to-indigo-500/5 blur-3xl"></div>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-12 relative z-10">
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="flex-1 order-2 lg:order-1"
            >
              <div className="mb-6">
                <span className={`px-4 py-1.5 rounded-full text-sm font-mono font-medium ${
                  darkMode 
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' 
                    : 'bg-blue-500/20 text-blue-600 border border-blue-500/30'
                }`}>
                  Web3 Developer
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight font-mono">
                Building the <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Decentralized</span> Future
              </h1>
              <h2 className="text-2xl md:text-3xl mb-8 font-light text-cyan-400/80">{data.title}</h2>
              <p className="text-lg md:text-xl leading-relaxed mb-10 text-gray-300 max-w-2xl">{data.about}</p>
              
              {/* Crypto Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { label: "Smart Contracts", value: "50+", icon: FaCodeBranch },
                  { label: "TVL Managed", value: "$10M+", icon: FiTrendingUp },
                  { label: "Audits", value: "25+", icon: FaShieldAlt }
                ].map((stat, index) => (
                  <div key={index} className={`p-4 rounded-xl backdrop-blur-lg ${
                    darkMode 
                      ? 'bg-gray-900/50 border border-cyan-500/20' 
                      : 'bg-white/50 border border-blue-500/20'
                  }`}>
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 rounded-lg ${
                        darkMode ? 'bg-cyan-500/20 text-cyan-400' : 'bg-blue-500/20 text-blue-600'
                      }`}>
                        <stat.icon />
                      </div>
                      <div className="text-2xl font-bold font-mono">{stat.value}</div>
                    </div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mb-8">
                <motion.a 
                  href="#projects"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-8 py-3 rounded-xl font-bold font-mono shadow-lg ${
                    darkMode 
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700' 
                      : 'bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500'
                  } text-white transition-all duration-300`}
                >
                  VIEW PROJECTS
                </motion.a>
                <motion.button 
                  onClick={copyWalletAddress}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-8 py-3 rounded-xl font-bold font-mono border-2 ${
                    darkMode 
                      ? 'border-emerald-500 text-emerald-400 hover:bg-emerald-500/10' 
                      : 'border-emerald-400 text-emerald-600 hover:bg-emerald-400/10'
                  } transition-all duration-300 flex items-center gap-2`}
                >
                  <FaWallet />
                  COPY WALLET
                </motion.button>
              </div>

              {/* Supported Networks */}
              <div className="mb-8">
                <div className="text-sm text-gray-400 mb-3 font-mono">SUPPORTED NETWORKS</div>
                <div className="flex flex-wrap gap-3">
                  {data.networks?.map((network, index) => (
                    <span key={index} className={`px-4 py-2 rounded-full text-sm font-medium ${
                      darkMode 
                        ? 'bg-gray-800 text-cyan-400 border border-cyan-500/30' 
                        : 'bg-gray-100 text-blue-600 border border-blue-500/30'
                    }`}>
                      {network}
                    </span>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              {activeCryptoPlatforms.length > 0 && (
                <div className="flex gap-3">
                  {activeCryptoPlatforms.map((platform) => {
                    const Icon = platform.icon;
                    return (
                      <motion.a 
                        key={platform.id}
                        href={data.socialLinks[platform.id]}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -3, scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={`p-3 rounded-xl shadow-lg transition-all duration-300 ${platform.bgColor} ${platform.color}`}
                        title={platform.name}
                      >
                        <Icon className="text-xl" />
                      </motion.a>
                    );
                  })}
                </div>
              )}
            </motion.div>

            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="flex-1 order-1 lg:order-2 flex justify-center"
            >
              <div className="relative">
                {/* Floating avatar with crypto effects */}
                <motion.div 
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative"
                >
                  {/* Outer ring */}
                  <div className="absolute inset-0 rounded-3xl animate-spin-slow">
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-20"></div>
                  </div>
                  
                  {/* Main avatar */}
                  <div className="relative w-80 h-80 md:w-96 md:h-96 rounded-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 z-10"></div>
                    <img 
                      src={data.avatarUrl} 
                      alt={data.name} 
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Blockchain overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent"></div>
                    
                    {/* Floating crypto icons */}
                    {[FaEthereum, FaBitcoin, SiSolidity, FaWallet].map((Icon, i) => (
                      <motion.div
                        key={i}
                        className={`absolute p-2 rounded-full ${
                          darkMode ? 'bg-gray-800/80' : 'bg-white/80'
                        } backdrop-blur-sm`}
                        initial={{ 
                          x: Math.random() * 200 - 100,
                          y: Math.random() * 200 - 100
                        }}
                        animate={{ 
                          y: [null, Math.random() * 50 - 25],
                          rotate: [0, 360]
                        }}
                        transition={{
                          duration: Math.random() * 3 + 2,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                        style={{
                          left: `${Math.random() * 70 + 15}%`,
                          top: `${Math.random() * 70 + 15}%`,
                        }}
                      >
                        <Icon className={`text-lg ${
                          i === 0 ? 'text-purple-500' : 
                          i === 1 ? 'text-amber-500' : 
                          i === 2 ? 'text-gray-300' : 'text-emerald-500'
                        }`} />
                      </motion.div>
                    ))}
                  </div>

                  {/* Certifications badge */}
                  <div className={`absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4 p-4 rounded-xl backdrop-blur-lg ${
                    darkMode 
                      ? 'bg-gray-900/80 border border-cyan-500/30' 
                      : 'bg-white/80 border border-blue-500/30'
                  } shadow-xl`}>
                    <div className="text-center">
                      <div className={`p-2 rounded-full ${
                        darkMode ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-500/20 text-emerald-600'
                      } inline-block mb-2`}>
                        <FaShieldAlt />
                      </div>
                      <div className="text-sm font-mono">Certified</div>
                      <div className="text-xs text-gray-400">Smart Contract</div>
                    </div>
                    <div className="text-center">
                      <div className={`p-2 rounded-full ${
                        darkMode ? 'bg-cyan-500/20 text-cyan-400' : 'bg-blue-500/20 text-blue-600'
                      } inline-block mb-2`}>
                        <FiTrendingUp />
                      </div>
                      <div className="text-sm font-mono">DeFi Expert</div>
                      <div className="text-xs text-gray-400">TVL $10M+</div>
                    </div>
                    <div className="text-center">
                      <div className={`p-2 rounded-full ${
                        darkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-500/20 text-purple-600'
                      } inline-block mb-2`}>
                        <FaNetworkWired />
                      </div>
                      <div className="text-sm font-mono">Multi-chain</div>
                      <div className="text-xs text-gray-400">4+ Networks</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Skills Section - Crypto Focused */}
        {data.skills?.length > 0 && (
          <section id="skills" className="py-20">
            <div className="text-center mb-16">
              <span className={`px-4 py-1.5 rounded-full text-sm font-mono font-medium ${
                darkMode 
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' 
                  : 'bg-blue-500/20 text-blue-600 border border-blue-500/30'
              }`}>
                BLOCKCHAIN EXPERTISE
              </span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-4xl font-bold mt-4 mb-6 font-mono"
              >
                Core <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Technologies</span>
              </motion.h2>
              <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Specialized skills in blockchain development, smart contract security, and decentralized applications
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className={`p-6 rounded-xl backdrop-blur-lg ${
                    darkMode 
                      ? 'bg-gray-900/50 border border-cyan-500/20 hover:border-cyan-500/40' 
                      : 'bg-white/50 border border-blue-500/20 hover:border-blue-500/40'
                  } shadow-lg transition-all duration-300`}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg ${
                        darkMode ? 'bg-cyan-500/20 text-cyan-400' : 'bg-blue-500/20 text-blue-600'
                      }`}>
                        {skill.icon && React.createElement(skill.icon, { className: "text-2xl" })}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold font-mono">{skill.name}</h3>
                        <p className={`text-sm ${darkMode ? 'text-cyan-400/80' : 'text-blue-600/80'}`}>{skill.category}</p>
                      </div>
                    </div>
                    <span className={`text-2xl font-bold font-mono ${
                      darkMode ? 'text-cyan-400' : 'text-blue-600'
                    }`}>{skill.level}%</span>
                  </div>
                  
                  <div className="relative">
                    <div className={`w-full h-2 rounded-full overflow-hidden ${
                      darkMode ? 'bg-gray-800' : 'bg-gray-200'
                    }`}>
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className={`h-full rounded-full ${
                          darkMode 
                            ? 'bg-gradient-to-r from-cyan-500 to-blue-500' 
                            : 'bg-gradient-to-r from-blue-500 to-cyan-400'
                        }`}
                      ></motion.div>
                    </div>
                    <div className="flex justify-between text-xs mt-2 font-mono text-gray-500">
                      <span>0%</span>
                      <span>25%</span>
                      <span>50%</span>
                      <span>75%</span>
                      <span>100%</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Projects Section */}
        {data.projects?.length > 0 && (
          <section id="projects" className="py-20">
            <div className="text-center mb-16">
              <span className={`px-4 py-1.5 rounded-full text-sm font-mono font-medium ${
                darkMode 
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' 
                  : 'bg-blue-500/20 text-blue-600 border border-blue-500/30'
              }`}>
                DECENTRALIZED PROJECTS
              </span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-4xl font-bold mt-4 mb-6 font-mono"
              >
                Blockchain <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Portfolio</span>
              </motion.h2>
              <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Featured decentralized applications, smart contracts, and Web3 solutions
              </p>
            </div>

            {/* Project Filter Tabs */}
            <div className="flex justify-center mb-12">
              <div className={`inline-flex rounded-xl p-1 backdrop-blur-lg ${
                darkMode 
                  ? 'bg-gray-900/50 border border-cyan-500/20' 
                  : 'bg-white/50 border border-blue-500/20'
              }`}>
                {['featured', 'all', 'defi', 'nft'].map((tab) => (
                  <motion.button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-6 py-2 rounded-lg font-mono font-medium transition-all duration-300 ${
                      activeTab === tab 
                        ? `${
                            darkMode 
                              ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg' 
                              : 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg'
                          }` 
                        : `${
                            darkMode 
                              ? 'text-gray-400 hover:text-cyan-400 hover:bg-gray-800' 
                              : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
                          }`
                    }`}
                  >
                    {tab.toUpperCase()}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  onMouseEnter={() => setActiveProject(index)}
                  onMouseLeave={() => setActiveProject(null)}
                  className={`group relative overflow-hidden rounded-2xl ${
                    darkMode 
                      ? 'bg-gray-900/50 border border-cyan-500/20 hover:border-cyan-500/40' 
                      : 'bg-white/50 border border-blue-500/20 hover:border-blue-500/40'
                  } shadow-xl backdrop-blur-lg transition-all duration-300`}
                >
                  {/* Project Image with Crypto Overlay */}
                  <div className="relative h-64 overflow-hidden">
                    <motion.img 
                      src={project.imageUrl || 'https://images.unsplash.com/photo-1620336655055-bd87c3c1fa5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      animate={activeProject === index ? { scale: 1.1 } : { scale: 1 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-70"></div>
                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-mono font-medium ${
                      darkMode 
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                        : 'bg-emerald-500/20 text-emerald-600 border border-emerald-500/30'
                    }`}>
                      {project.category || "DeFi"}
                    </div>
                    {/* Blockchain overlay effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10"></div>
                  </div>

                  {/* Project Content */}
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-2 rounded-lg ${
                        project.type === 'defi' ? 'bg-emerald-500/20 text-emerald-400' :
                        project.type === 'nft' ? 'bg-purple-500/20 text-purple-400' :
                        'bg-cyan-500/20 text-cyan-400'
                      }`}>
                        {project.type === 'defi' ? <FaCoins /> :
                         project.type === 'nft' ? <FaGem /> :
                         <FaCodeBranch />}
                      </div>
                      <h3 className="text-2xl font-bold font-mono group-hover:text-cyan-400 transition-colors">
                        {project.title}
                      </h3>
                    </div>
                    
                    <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {project.description}
                    </p>

                    {/* Project Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {project.tvl && (
                        <div className={`p-3 rounded-lg ${
                          darkMode ? 'bg-gray-800/50' : 'bg-gray-100/50'
                        }`}>
                          <div className="text-sm text-gray-400">TVL</div>
                          <div className="font-mono font-bold text-emerald-400">${project.tvl}</div>
                        </div>
                      )}
                      {project.users && (
                        <div className={`p-3 rounded-lg ${
                          darkMode ? 'bg-gray-800/50' : 'bg-gray-100/50'
                        }`}>
                          <div className="text-sm text-gray-400">Users</div>
                          <div className="font-mono font-bold text-cyan-400">{project.users}</div>
                        </div>
                      )}
                    </div>

                    {/* Technologies */}
                    {project.technologies?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.technologies.slice(0, 4).map((tech, i) => (
                          <span 
                            key={i} 
                            className={`px-3 py-1 rounded-full text-xs font-mono font-medium ${
                              darkMode 
                                ? 'bg-gray-800 text-cyan-400 border border-cyan-500/30' 
                                : 'bg-gray-100 text-blue-600 border border-blue-500/30'
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      {project.link && (
                        <motion.a 
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`flex-1 text-center py-3 rounded-lg font-mono font-bold ${
                            darkMode 
                              ? 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600' 
                              : 'bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500'
                          } text-white transition-all duration-300 flex items-center justify-center gap-2`}
                        >
                          <FiExternalLink />
                          LIVE DAPP
                        </motion.a>
                      )}
                      {project.github && (
                        <motion.a 
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`flex-1 text-center py-3 rounded-lg font-mono font-bold border ${
                            darkMode 
                              ? 'border-gray-700 text-gray-300 hover:bg-gray-800 hover:border-cyan-500/50' 
                              : 'border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-blue-500/50'
                          } transition-all duration-300 flex items-center justify-center gap-2`}
                        >
                          <FiCode />
                          CONTRACT
                        </motion.a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Experience & Education Section */}
        {(data.experience?.length > 0 || data.education?.length > 0) && (
          <section id="experience" className="py-20">
            <div className="text-center mb-16">
              <span className={`px-4 py-1.5 rounded-full text-sm font-mono font-medium ${
                darkMode 
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' 
                  : 'bg-blue-500/20 text-blue-600 border border-blue-500/30'
              }`}>
                BLOCKCHAIN JOURNEY
              </span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-4xl font-bold mt-4 mb-6 font-mono"
              >
                Web3 <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Timeline</span>
              </motion.h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Experience Timeline */}
              {data.experience?.length > 0 && (
                <div>
                  <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 font-mono">
                    <FaRocket className={`text-2xl ${darkMode ? 'text-cyan-400' : 'text-blue-600'}`} />
                    DEFI EXPERIENCE
                  </h3>
                  <div className="relative">
                    <div className={`absolute left-6 h-full w-0.5 ${
                      darkMode 
                        ? 'bg-gradient-to-b from-cyan-500 to-blue-500' 
                        : 'bg-gradient-to-b from-blue-500 to-cyan-400'
                    }`}></div>
                    
                    {data.experience.map((exp, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="relative mb-10 pl-16"
                      >
                        <div className={`absolute left-0 w-12 h-12 rounded-xl ${
                          darkMode 
                            ? 'bg-gradient-to-br from-cyan-500 to-blue-600' 
                            : 'bg-gradient-to-br from-blue-500 to-cyan-400'
                        } flex items-center justify-center shadow-lg`}>
                          {exp.type === 'defi' ? <FaCoins className="text-white" /> :
                           exp.type === 'nft' ? <FaGem className="text-white" /> :
                           <FaRocket className="text-white" />}
                        </div>
                        
                        <div className={`p-6 rounded-xl backdrop-blur-lg ${
                          darkMode 
                            ? 'bg-gray-900/50 border border-cyan-500/20' 
                            : 'bg-white/50 border border-blue-500/20'
                        } shadow-lg`}>
                          <h4 className="text-xl font-bold mb-2 font-mono">{exp.role}</h4>
                          <div className={`mb-4 font-mono ${darkMode ? 'text-cyan-400' : 'text-blue-600'}`}>
                            {exp.company} • {exp.period}
                          </div>
                          
                          {exp.description?.length > 0 && (
                            <ul className="space-y-3 mb-4">
                              {exp.description.map((item, i) => (
                                <motion.li 
                                  key={i}
                                  initial={{ opacity: 0, x: -20 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.3, delay: i * 0.1 }}
                                  className="flex items-start text-gray-300"
                                >
                                  <span className={`mr-3 mt-1 ${darkMode ? 'text-cyan-400' : 'text-blue-600'}`}>◈</span>
                                  {item}
                                </motion.li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education Timeline */}
              {data.education?.length > 0 && (
                <div>
                  <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 font-mono">
                    <FaUserLock className={`text-2xl ${darkMode ? 'text-cyan-400' : 'text-blue-600'}`} />
                    EDUCATION
                  </h3>
                  <div className="relative">
                    <div className={`absolute left-6 h-full w-0.5 ${
                      darkMode 
                        ? 'bg-gradient-to-b from-cyan-500 to-blue-500' 
                        : 'bg-gradient-to-b from-blue-500 to-cyan-400'
                    }`}></div>
                    
                    {data.education.map((edu, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="relative mb-10 pl-16"
                      >
                        <div className={`absolute left-0 w-12 h-12 rounded-xl ${
                          darkMode 
                            ? 'bg-gradient-to-br from-cyan-500 to-blue-600' 
                            : 'bg-gradient-to-br from-blue-500 to-cyan-400'
                        } flex items-center justify-center shadow-lg`}>
                          <FaUserLock className="text-white" />
                        </div>
                        
                        <div className={`p-6 rounded-xl backdrop-blur-lg ${
                          darkMode 
                            ? 'bg-gray-900/50 border border-cyan-500/20' 
                            : 'bg-white/50 border border-blue-500/20'
                        } shadow-lg`}>
                          <h4 className="text-xl font-bold mb-2 font-mono">{edu.degree}</h4>
                          <div className={`mb-4 font-mono ${darkMode ? 'text-cyan-400' : 'text-blue-600'}`}>
                            {edu.institution} • {edu.year}
                          </div>
                          
                          {edu.courses?.length > 0 && (
                            <>
                              <h5 className="font-semibold mb-3 font-mono">BLOCKCHAIN COURSES:</h5>
                              <div className="flex flex-wrap gap-2">
                                {edu.courses.slice(0, 6).map((course, i) => (
                                  <span 
                                    key={i} 
                                    className={`px-3 py-1 rounded-full text-sm font-mono ${
                                      darkMode 
                                        ? 'bg-gray-800 text-cyan-400 border border-cyan-500/30' 
                                        : 'bg-gray-100 text-blue-600 border border-blue-500/30'
                                    }`}
                                  >
                                    {course}
                                  </span>
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Contact Section */}
        <section id="contact" className="py-20">
          <div className="text-center mb-16">
            <span className={`px-4 py-1.5 rounded-full text-sm font-mono font-medium ${
              darkMode 
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' 
                : 'bg-blue-500/20 text-blue-600 border border-blue-500/30'
            }`}>
              CONNECT WITH ME
            </span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-4xl font-bold mt-4 mb-6 font-mono"
            >
              Let's Build <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Together</span>
            </motion.h2>
            <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Interested in blockchain development, smart contracts, or DeFi? Let's connect and build the future of Web3.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className={`p-8 rounded-2xl backdrop-blur-lg ${
                darkMode 
                  ? 'bg-gray-900/50 border border-cyan-500/20' 
                  : 'bg-white/50 border border-blue-500/20'
              } shadow-lg`}
            >
              <h3 className="text-2xl font-bold mb-8 font-mono">CONTACT INFO</h3>
              
              <div className="space-y-6">
                {data.email && (
                  <motion.a 
                    href={`mailto:${data.email}`}
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-6 p-4 rounded-xl hover:bg-gray-800/30 transition-all group"
                  >
                    <div className={`p-3 rounded-lg ${
                      darkMode 
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 group-hover:from-cyan-600 group-hover:to-blue-600' 
                        : 'bg-gradient-to-r from-blue-500 to-cyan-400 group-hover:from-blue-600 group-hover:to-cyan-500'
                    } transition-all duration-300`}>
                      <FiMail className="text-white text-xl" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1 font-mono">ENS / EMAIL</p>
                      <p className="font-medium font-mono">{data.email}</p>
                    </div>
                  </motion.a>
                )}

                {/* Wallet Address */}
                <motion.div 
                  whileHover={{ x: 10 }}
                  onClick={copyWalletAddress}
                  className="flex items-center gap-6 p-4 rounded-xl hover:bg-gray-800/30 transition-all cursor-pointer group"
                >
                  <div className={`p-3 rounded-lg ${
                    darkMode 
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-500 group-hover:from-emerald-700 group-hover:to-teal-600' 
                      : 'bg-gradient-to-r from-emerald-500 to-teal-400 group-hover:from-emerald-600 group-hover:to-teal-500'
                  } transition-all duration-300`}>
                    <FaWallet className="text-white text-xl" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1 font-mono">WALLET ADDRESS</p>
                    <p className="font-medium font-mono text-cyan-400">{data.walletAddress}</p>
                  </div>
                </motion.div>

                {data.phone && (
                  <motion.div 
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-6 p-4 rounded-xl hover:bg-gray-800/30 transition-all group"
                  >
                    <div className={`p-3 rounded-lg ${
                      darkMode 
                        ? 'bg-gradient-to-r from-purple-600 to-indigo-500 group-hover:from-purple-700 group-hover:to-indigo-600' 
                        : 'bg-gradient-to-r from-purple-500 to-indigo-400 group-hover:from-purple-600 group-hover:to-indigo-500'
                    } transition-all duration-300`}>
                      <FiPhone className="text-white text-xl" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1 font-mono">SIGNAL / TELEGRAM</p>
                      <p className="font-medium font-mono">{data.phone}</p>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Social Links */}
              {activeCryptoPlatforms.length > 0 && (
                <div className="mt-12">
                  <h4 className="text-xl font-bold mb-6 font-mono">WEB3 SOCIALS</h4>
                  <div className="flex flex-wrap gap-3">
                    {activeCryptoPlatforms.map((platform) => {
                      const Icon = platform.icon;
                      return (
                        <motion.a 
                          key={platform.id}
                          href={data.socialLinks[platform.id]}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ y: -5, scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className={`p-4 rounded-xl shadow-lg transition-all duration-300 ${platform.bgColor} ${platform.color}`}
                          title={platform.name}
                        >
                          <Icon className="text-xl" />
                        </motion.a>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className={`p-8 rounded-2xl backdrop-blur-lg ${
                darkMode 
                  ? 'bg-gray-900/50 border border-cyan-500/20' 
                  : 'bg-white/50 border border-blue-500/20'
              } shadow-lg`}
            >
              <h3 className="text-2xl font-bold mb-8 font-mono">SEND MESSAGE</h3>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block mb-2 font-mono font-medium">YOUR NAME</label>
                    <input 
                      type="text" 
                      id="name" 
                      className={`w-full px-4 py-3 rounded-lg backdrop-blur-lg border font-mono ${
                        darkMode 
                          ? 'bg-gray-900/50 border-cyan-500/30 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30' 
                          : 'bg-white/50 border-blue-500/30 text-gray-800 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30'
                      } focus:outline-none transition-all`}
                      placeholder="vitalik.eth"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-2 font-mono font-medium">ENS / EMAIL</label>
                    <input 
                      type="email" 
                      id="email" 
                      className={`w-full px-4 py-3 rounded-lg backdrop-blur-lg border font-mono ${
                        darkMode 
                          ? 'bg-gray-900/50 border-cyan-500/30 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30' 
                          : 'bg-white/50 border-blue-500/30 text-gray-800 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30'
                      } focus:outline-none transition-all`}
                      placeholder="dev@web3.eth"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block mb-2 font-mono font-medium">PROJECT TYPE</label>
                  <input 
                    type="text" 
                    id="subject" 
                    className={`w-full px-4 py-3 rounded-lg backdrop-blur-lg border font-mono ${
                      darkMode 
                        ? 'bg-gray-900/50 border-cyan-500/30 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30' 
                        : 'bg-white/50 border-blue-500/30 text-gray-800 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30'
                    } focus:outline-none transition-all`}
                    placeholder="DeFi / NFT / DAO"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block mb-2 font-mono font-medium">PROJECT DETAILS</label>
                  <textarea 
                    id="message" 
                    rows="5"
                    className={`w-full px-4 py-3 rounded-lg backdrop-blur-lg border font-mono ${
                      darkMode 
                        ? 'bg-gray-900/50 border-cyan-500/30 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30' 
                        : 'bg-white/50 border-blue-500/30 text-gray-800 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30'
                    } focus:outline-none transition-all`}
                    placeholder="Tell me about your Web3 project..."
                  ></textarea>
                </div>
                <motion.button 
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-4 rounded-lg font-mono font-bold text-lg ${
                    darkMode 
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600' 
                      : 'bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500'
                  } text-white transition-all duration-300 shadow-lg`}
                >
                  SEND ENCRYPTED MESSAGE
                </motion.button>
              </form>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className={`py-12 ${
        darkMode 
          ? 'bg-gray-900/50 backdrop-blur-lg border-t border-cyan-500/20' 
          : 'bg-white/50 backdrop-blur-lg border-t border-blue-500/20'
      }`}>
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-xl ${
                  darkMode 
                    ? 'bg-gradient-to-br from-cyan-500 to-blue-600' 
                    : 'bg-gradient-to-br from-blue-500 to-cyan-400'
                } flex items-center justify-center shadow-lg`}>
                  <FaEthereum className="text-white" />
                </div>
                <div>
                  <div className="text-xl font-bold font-mono bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    {data.name}
                  </div>
                  <div className="text-xs text-cyan-400/80 font-mono">Smart Contract Developer</div>
                </div>
              </div>
              <p className={`font-mono ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Building secure and scalable blockchain solutions
              </p>
            </div>

            {/* Social links in footer */}
            {activeCryptoPlatforms.length > 0 && (
              <div className="flex gap-3">
                {activeCryptoPlatforms.slice(0, 5).map((platform) => {
                  const Icon = platform.icon;
                  return (
                    <motion.a 
                      key={platform.id}
                      href={data.socialLinks[platform.id]}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -3, scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`p-3 rounded-xl shadow-lg transition-all duration-300 ${platform.bgColor} ${platform.color}`}
                      title={platform.name}
                    >
                      <Icon className="text-xl" />
                    </motion.a>
                  );
                })}
              </div>
            )}
          </div>

          <div className={`mt-12 pt-8 border-t ${
            darkMode ? 'border-cyan-500/20' : 'border-blue-500/20'
          } text-center`}>
            <p className={`font-mono ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              © {new Date().getFullYear()} {data.name}. All rights reserved.
            </p>
            <p className="mt-2 text-sm text-gray-500 font-mono">
              Built with ❤️ using React, Tailwind & Web3.js
            </p>
          </div>
        </div>
      </footer>

      {/* Add custom CSS for slow spin animation */}
      <style jsx>{`
        @keyframes slow-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: slow-spin 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default CryptoPortfolio;