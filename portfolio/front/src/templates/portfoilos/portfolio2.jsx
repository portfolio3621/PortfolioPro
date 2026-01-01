import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  FiGithub, FiLinkedin, FiTwitter, FiMail, FiPhone, FiMapPin,
  FiInstagram, FiFacebook, FiYoutube, FiGitlab, FiDribbble,
  FiFigma, FiSlack, FiMessageSquare, FiGlobe,
  FiStar, FiAward, FiBriefcase, FiBookOpen, FiSun, FiMoon,
  FiChevronRight, FiExternalLink, FiCode, FiLayers
} from 'react-icons/fi';
import { FaXTwitter, FaDiscord, FaBehance, FaSpotify } from 'react-icons/fa6';
import { SiNotion, SiAdobe, SiTailwindcss, SiReact } from 'react-icons/si';

const Portfolio = ({ portfolioData }) => {
  // State management
  const [darkMode, setDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState('featured');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isCursorHover, setIsCursorHover] = useState(false);

  // Ref for scroll tracking
  const containerRef = useRef();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

  // Social media platforms with premium styling
  const platformOptions = [
    { id: "linkedin", name: "LinkedIn", icon: FiLinkedin, color: "text-white", bgColor: "bg-gradient-to-br from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900" },
    { id: "github", name: "GitHub", icon: FiGithub, color: "text-white", bgColor: "bg-gradient-to-br from-gray-900 to-black hover:from-black hover:to-gray-900" },
    { id: "x", name: "X", icon: FaXTwitter, color: "text-white", bgColor: "bg-gradient-to-br from-black to-gray-900 hover:from-gray-900 hover:to-black" },
    { id: "behance", name: "Behance", icon: FaBehance, color: "text-white", bgColor: "bg-gradient-to-br from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900" },
    { id: "dribbble", name: "Dribbble", icon: FiDribbble, color: "text-white", bgColor: "bg-gradient-to-br from-pink-600 to-pink-800 hover:from-pink-700 hover:to-pink-900" },
    { id: "figma", name: "Figma", icon: FiFigma, color: "text-white", bgColor: "bg-gradient-to-br from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900" },
    { id: "instagram", name: "Instagram", icon: FiInstagram, color: "text-white", bgColor: "bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 hover:opacity-90" },
    { id: "spotify", name: "Spotify", icon: FaSpotify, color: "text-white", bgColor: "bg-gradient-to-br from-green-600 to-green-800 hover:from-green-700 hover:to-green-900" },
    { id: "discord", name: "Discord", icon: FaDiscord, color: "text-white", bgColor: "bg-gradient-to-br from-indigo-600 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900" },
    { id: "website", name: "Website", icon: FiGlobe, color: "text-white", bgColor: "bg-gradient-to-br from-emerald-600 to-emerald-800 hover:from-emerald-700 hover:to-emerald-900" },
  ];

  // Default portfolio data with premium structure
  const defaultPortfolioData = {
    name: 'Alexandra Chen',
    title: 'Senior Product Designer & Developer',
    about: 'I create digital experiences that blend elegant design with robust engineering. With over 8 years of expertise in product design and full-stack development, I transform complex problems into beautiful, intuitive solutions.',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    resumeUrl: '#',
    email: 'hello@alexandrachen.design',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    stats: [
      { value: '150+', label: 'Projects Completed' },
      { value: '8+', label: 'Years Experience' },
      { value: '98%', label: 'Client Satisfaction' },
      { value: '50+', label: 'Happy Clients' }
    ],
    skills: [],
    projects: [],
    experience: [],
    education: [],
    socialLinks: {},
    services: [
      { title: 'Product Design', description: 'End-to-end product design from concept to launch', icon: FiLayers },
      { title: 'UI/UX Development', description: 'Interactive prototypes and production-ready code', icon: SiReact },
      { title: 'Design Systems', description: 'Scalable design systems and component libraries', icon: FiLayers },
      { title: 'Brand Strategy', description: 'Comprehensive brand identity and strategy', icon: FiStar }
    ]
  };

  const data = { ...defaultPortfolioData, ...portfolioData };

  // Custom cursor effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsCursorHover(true);
    const handleMouseLeave = () => setIsCursorHover(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.querySelectorAll('a, button').forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', !darkMode);
  };

  return (
    <div 
      ref={containerRef}
      className={`min-h-screen transition-all duration-700 overflow-hidden ${
        darkMode 
          ? 'bg-gradient-to-br from-gray-950 via-black to-gray-950 text-gray-100' 
          : 'bg-gradient-to-br from-gray-50 via-white to-blue-50/30 text-gray-900'
      }`}
    >
      {/* Premium Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `linear-gradient(${darkMode ? '#ffffff' : '#000000'} 1px, transparent 1px), linear-gradient(90deg, ${darkMode ? '#ffffff' : '#000000'} 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
        
        {/* Floating particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${darkMode ? 'bg-gradient-to-r from-purple-500/10 to-blue-500/10' : 'bg-gradient-to-r from-blue-500/5 to-purple-500/5'}`}
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.5 + 0.3
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
              width: Math.random() * 150 + 50,
              height: Math.random() * 150 + 50,
            }}
          />
        ))}

        {/* Gradient orbs */}
        <motion.div 
          className={`absolute top-1/4 -left-40 w-96 h-96 rounded-full blur-3xl ${
            darkMode ? 'bg-gradient-to-r from-purple-900/20 to-blue-900/20' : 'bg-gradient-to-r from-purple-200/40 to-blue-200/40'
          }`}
          animate={{ y: [0, -40, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className={`absolute bottom-1/4 -right-40 w-96 h-96 rounded-full blur-3xl ${
            darkMode ? 'bg-gradient-to-r from-blue-900/20 to-emerald-900/20' : 'bg-gradient-to-r from-blue-200/40 to-emerald-200/40'
          }`}
          animate={{ y: [0, 40, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      {/* Custom Cursor */}
      <motion.div
        className={`fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-50 mix-blend-difference ${
          darkMode ? 'bg-white/90' : 'bg-black/90'
        }`}
        animate={{
          x: cursorPosition.x - 16,
          y: cursorPosition.y - 16,
          scale: isCursorHover ? 1.5 : 1
        }}
        transition={{ type: "spring", mass: 0.5 }}
      />

      {/* Premium Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", damping: 20 }}
        className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-40 w-[90%] max-w-6xl px-8 py-4 rounded-2xl backdrop-blur-xl ${
          darkMode 
            ? 'bg-gray-900/30 border border-gray-800/50 shadow-2xl shadow-black/30' 
            : 'bg-white/20 border border-white/30 shadow-2xl shadow-white/20'
        }`}
      >
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className={`relative w-12 h-12 rounded-xl ${
              darkMode 
                ? 'bg-gradient-to-br from-purple-600 to-blue-600 shadow-lg shadow-purple-600/20' 
                : 'bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg shadow-blue-500/20'
            } flex items-center justify-center overflow-hidden`}>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <span className="font-bold text-white text-lg">AC</span>
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight">{data.name}</span>
              <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Product Designer</div>
            </div>
          </motion.div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {['Work', 'Services', 'Experience', 'Skills', 'Contact'].map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -2 }}
                className={`relative text-sm font-medium tracking-wide uppercase ${
                  darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                } transition-colors`}
              >
                {item}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 ${
                  darkMode ? 'bg-gradient-to-r from-purple-500 to-blue-500' : 'bg-gradient-to-r from-blue-500 to-purple-500'
                } group-hover:w-full transition-all duration-300`} />
              </motion.a>
            ))}
            
            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              className={`relative p-3 rounded-xl backdrop-blur-sm ${
                darkMode 
                  ? 'bg-gray-800/50 border border-gray-700/50 hover:bg-gray-700/50' 
                  : 'bg-white/30 border border-white/30 hover:bg-white/40'
              } transition-all duration-300`}
            >
              {darkMode ? (
                <FiSun className="w-5 h-5 text-yellow-300" />
              ) : (
                <FiMoon className="w-5 h-5 text-gray-700" />
              )}
            </motion.button>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-xl font-semibold text-sm tracking-wide ${
                darkMode 
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700' 
                  : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
              } text-white shadow-lg shadow-purple-500/20 transition-all`}
            >
              Let's Talk
            </motion.button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="space-y-2">
              <span className={`block w-6 h-0.5 ${darkMode ? 'bg-gray-300' : 'bg-gray-700'} transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block w-6 h-0.5 ${darkMode ? 'bg-gray-300' : 'bg-gray-700'} transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-6 h-0.5 ${darkMode ? 'bg-gray-300' : 'bg-gray-700'} transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`md:hidden mt-6 pt-6 border-t ${
                darkMode ? 'border-gray-800' : 'border-gray-200'
              }`}
            >
              <div className="space-y-4">
                {['Work', 'Services', 'Experience', 'Skills', 'Contact'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className={`block py-3 text-lg font-medium ${
                      darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                    } transition-colors`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section id="hero" className="min-h-screen flex items-center relative pt-32 pb-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-3 px-4 py-2 rounded-full mb-8 backdrop-blur-sm bg-white/5 border border-white/10"
                >
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 animate-pulse" />
                  <span className="text-sm font-medium tracking-wide">AVAILABLE FOR NEW PROJECTS</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-5xl lg:text-7xl font-bold mb-6 leading-tight"
                >
                  Creating{' '}
                  <span className={`bg-gradient-to-r from-purple-500 via-blue-500 to-emerald-500 bg-clip-text text-transparent ${darkMode ? 'drop-shadow-2xl' : ''}`}>
                    Digital
                  </span>{' '}
                  Experiences
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className={`text-xl mb-10 leading-relaxed max-w-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
                >
                  {data.about}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-wrap gap-4"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-8 py-4 rounded-xl font-semibold text-lg ${
                      darkMode
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
                        : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
                    } text-white shadow-2xl shadow-purple-500/30 transition-all`}
                  >
                    View My Work
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-8 py-4 rounded-xl font-semibold text-lg border-2 ${
                      darkMode
                        ? 'border-white/20 text-white hover:bg-white/5'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-100/50'
                    } transition-all`}
                  >
                    Download CV
                  </motion.button>
                </motion.div>

                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="grid grid-cols-4 gap-6 mt-16"
                >
                  {data.stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className={`text-3xl font-bold mb-2 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent`}>
                        {stat.value}
                      </div>
                      <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Right Content - Avatar */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotateY: 180 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="relative"
              >
                <div className="relative w-full aspect-square max-w-lg mx-auto">
                  {/* Floating elements */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-3xl border-2 border-dashed border-white/10"
                  />
                  
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-8 rounded-2xl border border-white/5"
                  />

                  {/* Main image */}
                  <div className="absolute inset-0 rounded-3xl overflow-hidden">
                    <img
                      src={data.avatarUrl}
                      alt={data.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  </div>

                  {/* Decorative elements */}
                  <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className={`absolute -top-6 -right-6 w-32 h-32 rounded-full ${
                      darkMode ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20' : 'bg-gradient-to-r from-purple-500/10 to-blue-500/10'
                    } blur-2xl`}
                  />
                  
                  <motion.div
                    animate={{ y: [0, 20, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: 2 }}
                    className={`absolute -bottom-6 -left-6 w-32 h-32 rounded-full ${
                      darkMode ? 'bg-gradient-to-r from-emerald-500/20 to-blue-500/20' : 'bg-gradient-to-r from-emerald-500/10 to-blue-500/10'
                    } blur-2xl`}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent" />
          <div className="container mx-auto max-w-6xl px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full mb-6 backdrop-blur-sm bg-white/5 border border-white/10">
                <span className="text-sm font-medium tracking-wide">WHAT I DO</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Professional{' '}
                <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                  Services
                </span>
              </h2>
              <p className={`text-xl max-w-2xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Comprehensive design and development services tailored to your business needs
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {data.services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className={`p-8 rounded-2xl backdrop-blur-xl border ${
                      darkMode
                        ? 'bg-gray-900/30 border-gray-800 hover:border-purple-500/30'
                        : 'bg-white/20 border-white/20 hover:border-purple-500/30'
                    } transition-all duration-300 group`}
                  >
                    <div className={`w-16 h-16 rounded-xl mb-6 flex items-center justify-center ${
                      darkMode
                        ? 'bg-gradient-to-br from-purple-600/20 to-blue-600/20 group-hover:from-purple-600/30 group-hover:to-blue-600/30'
                        : 'bg-gradient-to-br from-purple-500/10 to-blue-500/10 group-hover:from-purple-500/20 group-hover:to-blue-500/20'
                    }`}>
                      <Icon className={`w-8 h-8 ${
                        darkMode ? 'text-purple-400' : 'text-purple-600'
                      }`} />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                    <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {service.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm font-medium text-purple-500">
                      <span>Learn more</span>
                      <FiChevronRight className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section id="work" className="py-32">
          <div className="container mx-auto max-w-6xl px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full mb-6 backdrop-blur-sm bg-white/5 border border-white/10">
                <span className="text-sm font-medium tracking-wide">FEATURED WORK</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Selected{' '}
                <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                  Projects
                </span>
              </h2>
              <p className={`text-xl max-w-2xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                A curated selection of my recent work showcasing design and development excellence
              </p>
            </motion.div>

            <div className="space-y-32">
              {[1, 2, 3].map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className={`group relative rounded-3xl overflow-hidden ${
                    darkMode
                      ? 'bg-gradient-to-br from-gray-900/50 to-black/50'
                      : 'bg-gradient-to-br from-white/30 to-gray-100/30'
                  }`}
                >
                  <div className="grid lg:grid-cols-2 gap-8 items-center p-8">
                    <div className={`p-12 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 ${
                        darkMode ? 'bg-purple-500/10 text-purple-400' : 'bg-purple-100 text-purple-600'
                      }`}>
                        <span className="text-sm font-medium">Case Study</span>
                      </div>
                      <h3 className="text-3xl font-bold mb-6">Fintech Dashboard Platform</h3>
                      <p className={`text-lg mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        A comprehensive dashboard for financial analytics with real-time data visualization and AI-powered insights.
                      </p>
                      <div className="flex flex-wrap gap-3 mb-8">
                        {['React', 'TypeScript', 'Tailwind', 'D3.js', 'Node.js'].map((tech, i) => (
                          <span
                            key={i}
                            className={`px-4 py-2 rounded-full text-sm font-medium ${
                              darkMode
                                ? 'bg-gray-800/50 text-gray-300'
                                : 'bg-white/50 text-gray-700'
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-4">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`px-6 py-3 rounded-xl font-semibold ${
                            darkMode
                              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                              : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                          }`}
                        >
                          View Project
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`px-6 py-3 rounded-xl font-semibold border ${
                            darkMode
                              ? 'border-gray-700 text-gray-300 hover:bg-gray-800/30'
                              : 'border-gray-300 text-gray-700 hover:bg-gray-100/50'
                          }`}
                        >
                          View Details
                        </motion.button>
                      </div>
                    </div>
                    
                    <div className={`relative h-96 rounded-2xl overflow-hidden ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                      <div className={`absolute inset-0 bg-gradient-to-br ${
                        index % 3 === 0 
                          ? 'from-purple-600/20 to-blue-600/20'
                          : index % 3 === 1
                          ? 'from-emerald-600/20 to-blue-600/20'
                          : 'from-pink-600/20 to-purple-600/20'
                      }`} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <FiLayers className="w-32 h-32 opacity-20" />
                      </div>
                      <motion.img
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                        alt="Project"
                        className="w-full h-full object-cover mix-blend-overlay opacity-50"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills & Expertise Section */}
        <section id="skills" className="py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-transparent" />
          <div className="container mx-auto max-w-6xl px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full mb-6 backdrop-blur-sm bg-white/5 border border-white/10">
                <span className="text-sm font-medium tracking-wide">EXPERTISE</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Technical{' '}
                <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                  Skills
                </span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {data.skills.length > 0 ? data.skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className={`p-8 rounded-2xl backdrop-blur-xl border ${
                    darkMode
                      ? 'bg-gray-900/30 border-gray-800'
                      : 'bg-white/20 border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                        darkMode
                          ? 'bg-gradient-to-br from-purple-600/20 to-blue-600/20'
                          : 'bg-gradient-to-br from-purple-500/10 to-blue-500/10'
                      }`}>
                        {skill.icon || <FiStar className="w-6 h-6 text-purple-500" />}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">{skill.name}</h3>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {skill.category || 'Professional Skill'}
                        </p>
                      </div>
                    </div>
                    <span className={`text-3xl font-bold ${
                      darkMode ? 'text-purple-400' : 'text-purple-600'
                    }`}>
                      {skill.level}%
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className={`w-full h-2 rounded-full overflow-hidden ${
                      darkMode ? 'bg-gray-800' : 'bg-gray-200'
                    }`}>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                        viewport={{ once: true }}
                        className={`h-full rounded-full ${
                          darkMode
                            ? 'bg-gradient-to-r from-purple-500 to-blue-500'
                            : 'bg-gradient-to-r from-blue-500 to-purple-500'
                        }`}
                      />
                    </div>
                    <div className="flex justify-between text-xs font-medium">
                      <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Beginner</span>
                      <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Expert</span>
                    </div>
                  </div>
                </motion.div>
              )) : (
                <div className="col-span-2 text-center py-20">
                  <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full mb-6 backdrop-blur-sm bg-white/5 border border-white/10">
                    <span className="text-sm font-medium tracking-wide">SKILLS COMING SOON</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Experience Timeline */}
        <section id="experience" className="py-32">
          <div className="container mx-auto max-w-6xl px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full mb-6 backdrop-blur-sm bg-white/5 border border-white/10">
                <span className="text-sm font-medium tracking-wide">CAREER JOURNEY</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Professional{' '}
                <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                  Experience
                </span>
              </h2>
            </motion.div>

            <div className="relative">
              {/* Timeline line */}
              <div className={`absolute left-8 lg:left-1/2 h-full w-0.5 ${
                darkMode
                  ? 'bg-gradient-to-b from-purple-500/30 via-blue-500/30 to-emerald-500/30'
                  : 'bg-gradient-to-b from-purple-400/20 via-blue-400/20 to-emerald-400/20'
              }`} />

              {data.experience.length > 0 ? data.experience.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative mb-16 ${index % 2 === 0 ? 'lg:mr-auto lg:pr-12' : 'lg:ml-auto lg:pl-12'}`}
                  style={index % 2 === 0 ? { maxWidth: 'calc(50% - 2rem)' } : { maxWidth: 'calc(50% - 2rem)' }}
                >
                  <div className="flex items-start gap-6">
                    {/* Timeline dot */}
                    <div className={`absolute left-0 lg:left-1/2 transform lg:-translate-x-1/2 w-6 h-6 rounded-full ${
                      darkMode
                        ? 'bg-gradient-to-br from-purple-500 to-blue-500'
                        : 'bg-gradient-to-br from-blue-500 to-purple-500'
                    } shadow-lg shadow-purple-500/30`} />

                    <div className={`ml-12 lg:ml-0 p-8 rounded-2xl backdrop-blur-xl border w-full ${
                      darkMode
                        ? 'bg-gray-900/30 border-gray-800'
                        : 'bg-white/20 border-white/20'
                    }`}>
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-2xl font-bold mb-2">{exp.role}</h3>
                          <div className={`text-lg font-medium mb-4 ${
                            darkMode ? 'text-purple-400' : 'text-purple-600'
                          }`}>
                            {exp.company} • {exp.period}
                          </div>
                        </div>
                        <div className={`px-4 py-2 rounded-full text-sm font-medium ${
                          darkMode ? 'bg-purple-500/10 text-purple-400' : 'bg-purple-100 text-purple-600'
                        }`}>
                          Full-time
                        </div>
                      </div>
                      
                      {exp.description?.length > 0 && (
                        <ul className="space-y-3 mb-6">
                          {exp.description.slice(0, 3).map((item, i) => (
                            <li key={i} className="flex items-start">
                              <span className={`mr-3 mt-1 ${
                                darkMode ? 'text-purple-400' : 'text-purple-600'
                              }`}>▸</span>
                              <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </motion.div>
              )) : (
                <div className="text-center py-20">
                  <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full mb-6 backdrop-blur-sm bg-white/5 border border-white/10">
                    <span className="text-sm font-medium tracking-wide">EXPERIENCE COMING SOON</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-transparent" />
          <div className="container mx-auto max-w-6xl px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full mb-6 backdrop-blur-sm bg-white/5 border border-white/10">
                <span className="text-sm font-medium tracking-wide">LET'S CONNECT</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Get In{' '}
                <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                  Touch
                </span>
              </h2>
              <p className={`text-xl max-w-2xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Ready to bring your ideas to life? Let's create something amazing together.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`p-12 rounded-3xl backdrop-blur-xl border ${
                  darkMode
                    ? 'bg-gray-900/30 border-gray-800'
                    : 'bg-white/20 border-white/20'
                }`}
              >
                <h3 className="text-3xl font-bold mb-10">Contact Information</h3>
                
                <div className="space-y-8">
                  {data.email && (
                    <motion.a
                      href={`mailto:${data.email}`}
                      whileHover={{ x: 10 }}
                      className="flex items-center gap-6 group"
                    >
                      <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${
                        darkMode
                          ? 'bg-gradient-to-br from-purple-600/20 to-blue-600/20 group-hover:from-purple-600/30 group-hover:to-blue-600/30'
                          : 'bg-gradient-to-br from-purple-500/10 to-blue-500/10 group-hover:from-purple-500/20 group-hover:to-blue-500/20'
                      } transition-all`}>
                        <FiMail className={`w-6 h-6 ${
                          darkMode ? 'text-purple-400' : 'text-purple-600'
                        }`} />
                      </div>
                      <div>
                        <div className={`text-sm font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Email
                        </div>
                        <div className="text-xl font-semibold">{data.email}</div>
                      </div>
                    </motion.a>
                  )}

                  {data.phone && (
                    <motion.div
                      whileHover={{ x: 10 }}
                      className="flex items-center gap-6 group"
                    >
                      <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${
                        darkMode
                          ? 'bg-gradient-to-br from-purple-600/20 to-blue-600/20 group-hover:from-purple-600/30 group-hover:to-blue-600/30'
                          : 'bg-gradient-to-br from-purple-500/10 to-blue-500/10 group-hover:from-purple-500/20 group-hover:to-blue-500/20'
                      } transition-all`}>
                        <FiPhone className={`w-6 h-6 ${
                          darkMode ? 'text-purple-400' : 'text-purple-600'
                        }`} />
                      </div>
                      <div>
                        <div className={`text-sm font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Phone
                        </div>
                        <div className="text-xl font-semibold">{data.phone}</div>
                      </div>
                    </motion.div>
                  )}

                  {data.location && (
                    <motion.div
                      whileHover={{ x: 10 }}
                      className="flex items-center gap-6 group"
                    >
                      <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${
                        darkMode
                          ? 'bg-gradient-to-br from-purple-600/20 to-blue-600/20 group-hover:from-purple-600/30 group-hover:to-blue-600/30'
                          : 'bg-gradient-to-br from-purple-500/10 to-blue-500/10 group-hover:from-purple-500/20 group-hover:to-blue-500/20'
                      } transition-all`}>
                        <FiMapPin className={`w-6 h-6 ${
                          darkMode ? 'text-purple-400' : 'text-purple-600'
                        }`} />
                      </div>
                      <div>
                        <div className={`text-sm font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Location
                        </div>
                        <div className="text-xl font-semibold">{data.location}</div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Social Links */}
                {platformOptions.length > 0 && (
                  <div className="mt-16">
                    <h4 className="text-xl font-bold mb-8">Connect With Me</h4>
                    <div className="flex flex-wrap gap-4">
                      {platformOptions.slice(0, 5).map((platform) => {
                        const Icon = platform.icon;
                        return (
                          <motion.a
                            key={platform.id}
                            href="#"
                            whileHover={{ y: -5, scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className={`p-4 rounded-xl shadow-lg transition-all duration-300 ${platform.bgColor} ${platform.color}`}
                            title={platform.name}
                          >
                            <Icon className="text-2xl" />
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
                viewport={{ once: true }}
                className={`p-12 rounded-3xl backdrop-blur-xl border ${
                  darkMode
                    ? 'bg-gray-900/30 border-gray-800'
                    : 'bg-white/20 border-white/20'
                }`}
              >
                <h3 className="text-3xl font-bold mb-10">Send a Message</h3>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className={`block mb-3 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className={`w-full px-6 py-4 rounded-xl backdrop-blur-sm border ${
                          darkMode
                            ? 'bg-white/5 border-gray-800 text-white placeholder-gray-500 focus:border-purple-500'
                            : 'bg-white/50 border-gray-300 text-gray-900 placeholder-gray-600 focus:border-purple-500'
                        } focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all`}
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className={`block mb-3 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        className={`w-full px-6 py-4 rounded-xl backdrop-blur-sm border ${
                          darkMode
                            ? 'bg-white/5 border-gray-800 text-white placeholder-gray-500 focus:border-purple-500'
                            : 'bg-white/50 border-gray-300 text-gray-900 placeholder-gray-600 focus:border-purple-500'
                        } focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all`}
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className={`block mb-3 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className={`w-full px-6 py-4 rounded-xl backdrop-blur-sm border ${
                        darkMode
                          ? 'bg-white/5 border-gray-800 text-white placeholder-gray-500 focus:border-purple-500'
                          : 'bg-white/50 border-gray-300 text-gray-900 placeholder-gray-600 focus:border-purple-500'
                      } focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all`}
                      placeholder="Project Inquiry"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className={`block mb-3 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows="5"
                      className={`w-full px-6 py-4 rounded-xl backdrop-blur-sm border ${
                        darkMode
                          ? 'bg-white/5 border-gray-800 text-white placeholder-gray-500 focus:border-purple-500'
                          : 'bg-white/50 border-gray-300 text-gray-900 placeholder-gray-600 focus:border-purple-500'
                      } focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all`}
                      placeholder="Tell me about your project..."
                    />
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full py-5 rounded-xl font-bold text-lg ${
                      darkMode
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
                        : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
                    } text-white shadow-2xl shadow-purple-500/30 transition-all`}
                  >
                    Send Message
                  </motion.button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className={`py-20 border-t ${
          darkMode
            ? 'border-gray-800 bg-gradient-to-b from-transparent to-black/50'
            : 'border-gray-200 bg-gradient-to-b from-transparent to-white/50'
        }`}>
          <div className="container mx-auto max-w-6xl px-4">
            <div className="grid lg:grid-cols-3 gap-12 mb-16">
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <div className={`w-14 h-14 rounded-xl ${
                    darkMode
                      ? 'bg-gradient-to-br from-purple-600 to-blue-600 shadow-lg shadow-purple-600/20'
                      : 'bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg shadow-blue-500/20'
                  } flex items-center justify-center`}>
                    <span className="font-bold text-white text-xl">AC</span>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{data.name}</div>
                    <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Product Designer & Developer
                    </div>
                  </div>
                </div>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-8`}>
                  Creating digital experiences that blend elegant design with cutting-edge technology.
                </p>
                <div className="flex gap-4">
                  {platformOptions.slice(0, 4).map((platform) => {
                    const Icon = platform.icon;
                    return (
                      <motion.a
                        key={platform.id}
                        href="#"
                        whileHover={{ y: -5, scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={`p-3 rounded-xl shadow-lg transition-all duration-300 ${platform.bgColor} ${platform.color}`}
                      >
                        <Icon className="text-xl" />
                      </motion.a>
                    );
                  })}
                </div>
              </div>

              <div>
                <h4 className="text-xl font-bold mb-8">Quick Links</h4>
                <div className="grid grid-cols-2 gap-4">
                  {['About', 'Services', 'Projects', 'Experience', 'Skills', 'Contact'].map((link) => (
                    <a
                      key={link}
                      href={`#${link.toLowerCase()}`}
                      className={`py-2 ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xl font-bold mb-8">Newsletter</h4>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-6`}>
                  Subscribe to receive updates on my latest work and insights.
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Your email"
                    className={`flex-1 px-4 py-3 rounded-xl backdrop-blur-sm border ${
                      darkMode
                        ? 'bg-white/5 border-gray-800 text-white placeholder-gray-500'
                        : 'bg-white/50 border-gray-300 text-gray-900 placeholder-gray-600'
                    } focus:outline-none focus:border-purple-500`}
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-6 py-3 rounded-xl font-semibold ${
                      darkMode
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600'
                        : 'bg-gradient-to-r from-blue-500 to-purple-500'
                    } text-white`}
                  >
                    Subscribe
                  </motion.button>
                </div>
              </div>
            </div>

            <div className={`pt-8 border-t ${
              darkMode ? 'border-gray-800' : 'border-gray-200'
            } text-center`}>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                © {new Date().getFullYear()} {data.name}. All rights reserved.
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Crafted with precision using React, Tailwind CSS & Framer Motion
              </p>
            </div>
          </div>
        </footer>
      </div>

      {/* Back to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 right-8 z-50 p-4 rounded-xl shadow-2xl ${
          darkMode
            ? 'bg-gradient-to-br from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
            : 'bg-gradient-to-br from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
        } text-white`}
      >
        <FiChevronRight className="w-6 h-6 rotate-270" />
      </motion.button>
    </div>
  );
};

export default Portfolio;