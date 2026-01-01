import React, { useState, useEffect } from 'react';
import { motion , AnimatePresence } from 'framer-motion';
import { 
  FiGithub, FiLinkedin, FiTwitter, FiMail, FiPhone, FiMapPin,
  FiInstagram, FiFacebook, FiYoutube, FiGitlab, FiDribbble,
  FiFigma, FiSlack, FiTwitch, FiMessageSquare, FiGlobe,
  FiStar, FiAward, FiBriefcase, FiBookOpen, FiSun, FiMoon
} from 'react-icons/fi';
import { FaXTwitter, FaDiscord } from 'react-icons/fa6';

const Portfolio = ({ portfolioData }) => {
  // State management
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('featured');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeProject, setActiveProject] = useState(null);

  // Social media platform options with better contrast
  const platformOptions = [
    { id: "linkedin", name: "LinkedIn", icon: FiLinkedin, color: "text-white", bgColor: "bg-[#0A66C2] hover:bg-[#0A66C2]/90 dark:bg-[#0A66C2] dark:hover:bg-[#0A66C2]/90" },
    { id: "github", name: "GitHub", icon: FiGithub, color: "text-white", bgColor: "bg-gray-800 hover:bg-gray-900 dark:bg-gray-800 dark:hover:bg-gray-700" },
    { id: "x", name: "X", icon: FaXTwitter, color: "text-white", bgColor: "bg-black hover:bg-gray-900 dark:bg-black dark:hover:bg-gray-900" },
    { id: "instagram", name: "Instagram", icon: FiInstagram, color: "text-white", bgColor: "bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F56040] hover:opacity-90" },
    { id: "facebook", name: "Facebook", icon: FiFacebook, color: "text-white", bgColor: "bg-[#1877F2] hover:bg-[#1877F2]/90 dark:bg-[#1877F2] dark:hover:bg-[#1877F2]/90" },
    { id: "youtube", name: "YouTube", icon: FiYoutube, color: "text-white", bgColor: "bg-[#FF0000] hover:bg-[#FF0000]/90 dark:bg-[#FF0000] dark:hover:bg-[#FF0000]/90" },
    { id: "gitlab", name: "GitLab", icon: FiGitlab, color: "text-white", bgColor: "bg-[#FC6D26] hover:bg-[#FC6D26]/90 dark:bg-[#FC6D26] dark:hover:bg-[#FC6D26]/90" },
    { id: "dribbble", name: "Dribbble", icon: FiDribbble, color: "text-white", bgColor: "bg-[#EA4C89] hover:bg-[#EA4C89]/90 dark:bg-[#EA4C89] dark:hover:bg-[#EA4C89]/90" },
    { id: "figma", name: "Figma", icon: FiFigma, color: "text-white", bgColor: "bg-[#F24E1E] hover:bg-[#F24E1E]/90 dark:bg-[#F24E1E] dark:hover:bg-[#F24E1E]/90" },
    { id: "slack", name: "Slack", icon: FiSlack, color: "text-white", bgColor: "bg-[#4A154B] hover:bg-[#4A154B]/90 dark:bg-[#4A154B] dark:hover:bg-[#4A154B]/90" },
    { id: "discord", name: "Discord", icon: FaDiscord, color: "text-white", bgColor: "bg-[#5865F2] hover:bg-[#5865F2]/90 dark:bg-[#5865F2] dark:hover:bg-[#5865F2]/90" },
    { id: "twitch", name: "Twitch", icon: FiTwitch, color: "text-white", bgColor: "bg-[#9146FF] hover:bg-[#9146FF]/90 dark:bg-[#9146FF] dark:hover:bg-[#9146FF]/90" },
    { id: "telegram", name: "Telegram", icon: FiMessageSquare, color: "text-white", bgColor: "bg-[#26A5E4] hover:bg-[#26A5E4]/90 dark:bg-[#26A5E4] dark:hover:bg-[#26A5E4]/90" },
    { id: "website", name: "Website", icon: FiGlobe, color: "text-white", bgColor: "bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700" },
  ];

  // Default portfolio data
  const defaultPortfolioData = {
    name: 'Your Name',
    about: 'About me...',
    avatarUrl: 'https://via.placeholder.com/300',
    resumeUrl: '#',
    email: 'example@email.com',
    phone: '+1234567890',
    address: 'Your Address',
    skills: [],
    projects: [],
    experience: [],
    education: [],
    socialLinks: {}
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
  const activeSocialPlatforms = platformOptions.filter(platform => 
    data.socialLinks && data.socialLinks[platform.id]
  );

  // Theme toggle
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', !darkMode);
    setIsMenuOpen(false); // Close mobile menu after theme toggle
  };

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
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedMode);
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100' : 'bg-gradient-to-br from-gray-50 via-white to-blue-50 text-gray-800'}`}>
      {/* Floating Particles Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${darkMode ? 'bg-teal-400/10' : 'bg-blue-400/10'}`}
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{
              x: [null, Math.random() * window.innerWidth],
              y: [null, Math.random() * window.innerHeight],
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
            }}
          />
        ))}
      </div>

      {/* Glass-morphism Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-lg ${darkMode ? 'bg-gray-900/80' : 'bg-white/80'} border-b ${darkMode ? 'border-gray-700/50' : 'border-gray-200/50'} shadow-xl`}>
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className={`w-10 h-10 rounded-full ${darkMode ? 'bg-gradient-to-br from-teal-500 to-blue-500' : 'bg-gradient-to-br from-blue-500 to-teal-400'} flex items-center justify-center`}>
              <span className="font-bold text-white">
                {data.name?.split(' ').map(n => n[0]).join('') || 'JD'}
              </span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-teal-400 bg-clip-text text-transparent">
              {data.name}
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {['about', 'skills', 'projects', 'experience', 'contact'].map((item) => (
              <motion.a 
                key={item}
                href={`#${item}`}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                className={`capitalize relative group font-medium ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
              >
                {item}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 ${darkMode ? 'bg-teal-400' : 'bg-blue-500'} group-hover:w-full transition-all duration-300`}></span>
              </motion.a>
            ))}
            
            {/* Theme Toggle in Nav */}
            <motion.button 
              onClick={toggleTheme}
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              className={`p-2 rounded-full flex items-center justify-center ${darkMode ? 'bg-gray-800 hover:bg-gray-700 text-yellow-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`}
              aria-label="Toggle theme"
            >
              {darkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
            </motion.button>
          </nav>

          {/* Mobile header actions */}
          <div className="flex items-center gap-4 md:hidden">
            {/* Theme Toggle Button - Mobile */}
            <motion.button 
              onClick={toggleTheme}
              whileTap={{ scale: 0.9 }}
              className={`p-2 rounded-full flex items-center justify-center ${darkMode ? 'bg-gray-800 text-yellow-300' : 'bg-gray-100 text-gray-800'}`}
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
                <span className={`h-0.5 w-full transition-all duration-300 ${isMenuOpen ? 'transform rotate-45 translate-y-1.5' : ''} ${darkMode ? 'bg-gray-100' : 'bg-gray-800'}`}></span>
                <span className={`h-0.5 w-full transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''} ${darkMode ? 'bg-gray-100' : 'bg-gray-800'}`}></span>
                <span className={`h-0.5 w-full transition-all duration-300 ${isMenuOpen ? 'transform -rotate-45 -translate-y-1.5' : ''} ${darkMode ? 'bg-gray-100' : 'bg-gray-800'}`}></span>
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
              className={`md:hidden overflow-hidden ${darkMode ? 'bg-gray-900/95 backdrop-blur-lg' : 'bg-white/95 backdrop-blur-lg'} border-t ${darkMode ? 'border-gray-700/50' : 'border-gray-200/50'}`}
            >
              <div className="container mx-auto px-6 py-4 flex flex-col space-y-4">
                {['about', 'skills', 'projects', 'experience', 'contact'].map((item) => (
                  <a 
                    key={item}
                    href={`#${item}`}
                    className={`capitalize py-3 text-lg font-medium ${darkMode ? 'text-gray-300 hover:text-teal-400' : 'text-gray-600 hover:text-blue-600'} transition-colors border-b ${darkMode ? 'border-gray-800' : 'border-gray-100'}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <div className="pt-20 container mx-auto px-4 md:px-6 max-w-6xl">
        {/* Hero Section */}
        <section id="about" className="min-h-screen flex items-center relative py-20">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className={`absolute -top-20 -right-20 w-72 h-72 rounded-full ${darkMode ? 'bg-teal-500/5' : 'bg-blue-500/5'} blur-3xl`}></div>
            <div className={`absolute -bottom-20 -left-20 w-72 h-72 rounded-full ${darkMode ? 'bg-blue-500/5' : 'bg-teal-500/5'} blur-3xl`}></div>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-12 relative z-10">
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="flex-1 order-2 lg:order-1"
            >
              <div className="mb-6">
                <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${darkMode ? 'bg-teal-500/20 text-teal-400' : 'bg-blue-500/20 text-blue-600'} border ${darkMode ? 'border-teal-500/30' : 'border-blue-500/30'}`}>
                  Welcome to my portfolio
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Hi, I'm <span className="bg-gradient-to-r from-blue-600 to-teal-400 bg-clip-text text-transparent">{data.name}</span>
              </h1>
              <h2 className="text-2xl md:text-3xl mb-8 font-light text-gray-600 dark:text-gray-300">{data.title}</h2>
              <p className="text-lg md:text-xl leading-relaxed mb-10 text-gray-700 dark:text-gray-300 max-w-2xl">{data.about}</p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                {data.resumeUrl && (
                  <motion.a 
                    href={data.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-8 py-3 rounded-xl font-semibold shadow-lg ${darkMode ? 'bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600' : 'bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500'} text-white transition-all duration-300`}
                  >
                    Download Resume
                  </motion.a>
                )}
                <motion.a 
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-8 py-3 rounded-xl font-semibold border-2 ${darkMode ? 'border-teal-400 text-teal-400 hover:bg-teal-400/10' : 'border-blue-500 text-blue-600 hover:bg-blue-500/10'} transition-all duration-300`}
                >
                  Contact Me
                </motion.a>
              </div>

              {/* Social Links with improved contrast */}
              {activeSocialPlatforms.length > 0 && (
                <div className="flex gap-4">
                  {activeSocialPlatforms.slice(0, 4).map((platform) => {
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
                        aria-label={`Visit my ${platform.name}`}
                      >
                        <Icon className="text-xl" />
                      </motion.a>
                    );
                  })}
                  {activeSocialPlatforms.length > 4 && (
                    <motion.button 
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`p-3 rounded-xl shadow-lg transition-all duration-300 ${darkMode ? 'bg-gray-800 hover:bg-gray-700 text-gray-100' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`}
                      onClick={() => {
                        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
                      }}
                      aria-label="View more social links"
                    >
                      +{activeSocialPlatforms.length - 4}
                    </motion.button>
                  )}
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
                {/* Floating effect container */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative"
                >
                  <div className={`w-80 h-80 md:w-96 md:h-96 rounded-3xl overflow-hidden shadow-2xl ${darkMode ? 'ring-2 ring-teal-500/30' : 'ring-2 ring-blue-500/30'}`}>
                    <img 
                      src={data.avatarUrl} 
                      alt={data.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${darkMode ? 'from-gray-900/50 to-transparent' : 'from-white/50 to-transparent'}`}></div>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className={`absolute -top-6 -right-6 w-24 h-24 rounded-full ${darkMode ? 'bg-teal-500/20' : 'bg-blue-500/20'} blur-xl`}></div>
                  <div className={`absolute -bottom-6 -left-6 w-24 h-24 rounded-full ${darkMode ? 'bg-blue-500/20' : 'bg-teal-500/20'} blur-xl`}></div>
                </motion.div>

                {/* Stats overlay */}
                <div className={`absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex gap-6 p-4 rounded-2xl backdrop-blur-lg ${darkMode ? 'bg-gray-900/80' : 'bg-white/80'} shadow-xl border ${darkMode ? 'border-gray-700/50' : 'border-gray-200/50'}`}>
                  {[
                    { label: "Projects", value: data.projects?.length || 0, icon: FiBriefcase },
                    { label: "Experience", value: data.experience?.length || 0, icon: FiAward },
                    { label: "Skills", value: data.skills?.length || 0, icon: FiStar }
                  ].map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className={`p-2 rounded-full ${darkMode ? 'bg-teal-500/20 text-teal-400' : 'bg-blue-500/20 text-blue-600'} inline-block mb-2`}>
                        <stat.icon className="text-xl" />
                      </div>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-xs text-gray-500">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Skills Section */}
        {data.skills?.length > 0 && (
          <section id="skills" className="py-20">
            <div className="text-center mb-16">
              <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${darkMode ? 'bg-teal-500/20 text-teal-400' : 'bg-blue-500/20 text-blue-600'} border ${darkMode ? 'border-teal-500/30' : 'border-blue-500/30'}`}>
                Expertise
              </span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-4xl font-bold mt-4 mb-6"
              >
                My <span className="bg-gradient-to-r from-blue-600 to-teal-400 bg-clip-text text-transparent">Skills</span>
              </motion.h2>
              <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Technologies and tools I work with to create amazing digital experiences
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {data.skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className={`p-6 rounded-2xl backdrop-blur-lg ${darkMode ? 'bg-gray-900/50 border-gray-700/50' : 'bg-white/50 border-gray-200/50'} border shadow-lg`}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl ${darkMode ? 'bg-teal-500/20 text-teal-400' : 'bg-blue-500/20 text-blue-600'}`}>
                        {skill.icon || <FiStar className="text-xl" />}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{skill.name}</h3>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{skill.category || "Professional Skill"}</p>
                      </div>
                    </div>
                    <span className={`text-2xl font-bold ${darkMode ? 'text-teal-400' : 'text-blue-600'}`}>{skill.level}%</span>
                  </div>
                  
                  <div className="relative">
                    <div className={`w-full h-3 rounded-full overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className={`h-full rounded-full ${darkMode ? 'bg-gradient-to-r from-teal-500 to-blue-500' : 'bg-gradient-to-r from-blue-500 to-teal-400'}`}
                      ></motion.div>
                    </div>
                    <div className="flex justify-between text-xs mt-2 text-gray-500">
                      <span>Beginner</span>
                      <span>Intermediate</span>
                      <span>Advanced</span>
                      <span>Expert</span>
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
              <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${darkMode ? 'bg-teal-500/20 text-teal-400' : 'bg-blue-500/20 text-blue-600'} border ${darkMode ? 'border-teal-500/30' : 'border-blue-500/30'}`}>
                Portfolio
              </span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-4xl font-bold mt-4 mb-6"
              >
                Featured <span className="bg-gradient-to-r from-blue-600 to-teal-400 bg-clip-text text-transparent">Projects</span>
              </motion.h2>
              <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                A showcase of my recent work and contributions to the development community
              </p>
            </div>

            {/* Project Filter Tabs */}
            <div className="flex justify-center mb-12">
              <div className={`inline-flex rounded-xl p-1 backdrop-blur-lg ${darkMode ? 'bg-gray-900/50 border-gray-700/50' : 'bg-white/50 border-gray-200/50'} border`}>
                {['featured', 'all'].map((tab) => (
                  <motion.button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${activeTab === tab ? 
                      `${darkMode ? 'bg-gradient-to-r from-teal-500 to-blue-500 text-white shadow-lg' : 'bg-gradient-to-r from-blue-500 to-teal-400 text-white shadow-lg'}` : 
                      `${darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
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
                  className={`group relative overflow-hidden rounded-2xl ${darkMode ? 'bg-gray-900/50 border-gray-700/50' : 'bg-white/50 border-gray-200/50'} border shadow-lg backdrop-blur-lg`}
                >
                  {/* Project Image */}
                  <div className="relative h-64 overflow-hidden">
                    <motion.img 
                      src={project.imageUrl} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      animate={activeProject === index ? { scale: 1.1 } : { scale: 1 }}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${darkMode ? 'from-gray-900 via-gray-900/50 to-transparent' : 'from-white via-white/50 to-transparent'} opacity-60`}></div>
                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${darkMode ? 'bg-teal-500/20 text-teal-400' : 'bg-blue-500/20 text-blue-600'} border ${darkMode ? 'border-teal-500/30' : 'border-blue-500/30'}`}>
                      {project.category || "Development"}
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-500 dark:group-hover:text-teal-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {project.description}
                    </p>

                    {/* Technologies */}
                    {project.technologies?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.technologies.slice(0, 4).map((tech, i) => (
                          <span 
                            key={i} 
                            className={`px-3 py-1 rounded-full text-xs font-medium ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'}`}
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 4 && (
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
                            +{project.technologies.length - 4} more
                          </span>
                        )}
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
                          className={`flex-1 text-center py-3 rounded-lg font-semibold ${darkMode ? 'bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600' : 'bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500'} text-white transition-all duration-300`}
                        >
                          Live Demo
                        </motion.a>
                      )}
                      {project.github && (
                        <motion.a 
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`flex-1 text-center py-3 rounded-lg font-semibold border ${darkMode ? 'border-gray-700 text-gray-300 hover:bg-gray-800' : 'border-gray-300 text-gray-700 hover:bg-gray-100'} transition-all duration-300`}
                        >
                          View Code
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
              <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${darkMode ? 'bg-teal-500/20 text-teal-400' : 'bg-blue-500/20 text-blue-600'} border ${darkMode ? 'border-teal-500/30' : 'border-blue-500/30'}`}>
                Journey
              </span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-4xl font-bold mt-4 mb-6"
              >
                Career <span className="bg-gradient-to-r from-blue-600 to-teal-400 bg-clip-text text-transparent">Timeline</span>
              </motion.h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Experience Timeline */}
              {data.experience?.length > 0 && (
                <div>
                  <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                    <FiBriefcase className={`text-2xl ${darkMode ? 'text-teal-400' : 'text-blue-600'}`} />
                    Work Experience
                  </h3>
                  <div className="relative">
                    <div className={`absolute left-6 h-full w-0.5 ${darkMode ? 'bg-gradient-to-b from-teal-500 to-blue-500' : 'bg-gradient-to-b from-blue-500 to-teal-400'}`}></div>
                    
                    {data.experience.map((exp, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="relative mb-10 pl-16"
                      >
                        <div className={`absolute left-0 w-12 h-12 rounded-full ${darkMode ? 'bg-gradient-to-br from-teal-500 to-blue-500' : 'bg-gradient-to-br from-blue-500 to-teal-400'} flex items-center justify-center shadow-lg`}>
                          <FiBriefcase className="text-white" />
                        </div>
                        
                        <div className={`p-6 rounded-xl backdrop-blur-lg ${darkMode ? 'bg-gray-900/50 border-gray-700/50' : 'bg-white/50 border-gray-200/50'} border shadow-lg`}>
                          <h4 className="text-xl font-bold mb-2">{exp.role}</h4>
                          <div className={`mb-4 ${darkMode ? 'text-teal-400' : 'text-blue-600'} font-medium`}>
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
                                  className="flex items-start"
                                >
                                  <span className={`mr-3 mt-1 ${darkMode ? 'text-teal-400' : 'text-blue-600'}`}>▸</span>
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
                  <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                    <FiBookOpen className={`text-2xl ${darkMode ? 'text-teal-400' : 'text-blue-600'}`} />
                    Education
                  </h3>
                  <div className="relative">
                    <div className={`absolute left-6 h-full w-0.5 ${darkMode ? 'bg-gradient-to-b from-teal-500 to-blue-500' : 'bg-gradient-to-b from-blue-500 to-teal-400'}`}></div>
                    
                    {data.education.map((edu, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="relative mb-10 pl-16"
                      >
                        <div className={`absolute left-0 w-12 h-12 rounded-full ${darkMode ? 'bg-gradient-to-br from-teal-500 to-blue-500' : 'bg-gradient-to-br from-blue-500 to-teal-400'} flex items-center justify-center shadow-lg`}>
                          <FiBookOpen className="text-white" />
                        </div>
                        
                        <div className={`p-6 rounded-xl backdrop-blur-lg ${darkMode ? 'bg-gray-900/50 border-gray-700/50' : 'bg-white/50 border-gray-200/50'} border shadow-lg`}>
                          <h4 className="text-xl font-bold mb-2">{edu.degree}</h4>
                          <div className={`mb-4 ${darkMode ? 'text-teal-400' : 'text-blue-600'} font-medium`}>
                            {edu.institution} • {edu.year}
                          </div>
                          
                          {edu.courses?.length > 0 && (
                            <>
                              <h5 className="font-semibold mb-3">Relevant Courses:</h5>
                              <div className="flex flex-wrap gap-2">
                                {edu.courses.slice(0, 6).map((course, i) => (
                                  <span 
                                    key={i} 
                                    className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'}`}
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
            <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${darkMode ? 'bg-teal-500/20 text-teal-400' : 'bg-blue-500/20 text-blue-600'} border ${darkMode ? 'border-teal-500/30' : 'border-blue-500/30'}`}>
              Let's Connect
            </span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-4xl font-bold mt-4 mb-6"
            >
              Get In <span className="bg-gradient-to-r from-blue-600 to-teal-400 bg-clip-text text-transparent">Touch</span>
            </motion.h2>
            <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Have a project in mind? Let's discuss how we can work together to bring your ideas to life.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className={`p-8 rounded-2xl backdrop-blur-lg ${darkMode ? 'bg-gray-900/50 border-gray-700/50' : 'bg-white/50 border-gray-200/50'} border shadow-lg`}
            >
              <h3 className="text-2xl font-bold mb-8">Contact Information</h3>
              
              <div className="space-y-6">
                {data.email && (
                  <motion.a 
                    href={`mailto:${data.email}`}
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-6 p-4 rounded-xl hover:bg-gray-800/30 dark:hover:bg-white/10 transition-all"
                  >
                    <div className={`p-3 rounded-full ${darkMode ? 'bg-gradient-to-r from-teal-500 to-blue-500' : 'bg-gradient-to-r from-blue-500 to-teal-400'}`}>
                      <FiMail className="text-white text-xl" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Email</p>
                      <p className="font-medium">{data.email}</p>
                    </div>
                  </motion.a>
                )}

                {data.phone && (
                  <motion.div 
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-6 p-4 rounded-xl hover:bg-gray-800/30 dark:hover:bg-white/10 transition-all"
                  >
                    <div className={`p-3 rounded-full ${darkMode ? 'bg-gradient-to-r from-teal-500 to-blue-500' : 'bg-gradient-to-r from-blue-500 to-teal-400'}`}>
                      <FiPhone className="text-white text-xl" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Phone</p>
                      <p className="font-medium">{data.phone}</p>
                    </div>
                  </motion.div>
                )}

                {data.address && (
                  <motion.div 
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-6 p-4 rounded-xl hover:bg-gray-800/30 dark:hover:bg-white/10 transition-all"
                  >
                    <div className={`p-3 rounded-full ${darkMode ? 'bg-gradient-to-r from-teal-500 to-blue-500' : 'bg-gradient-to-r from-blue-500 to-teal-400'}`}>
                      <FiMapPin className="text-white text-xl" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Location</p>
                      <p className="font-medium">{data.address}</p>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Social Links with improved contrast */}
              {activeSocialPlatforms.length > 0 && (
                <div className="mt-12">
                  <h4 className="text-xl font-bold mb-6">Follow Me</h4>
                  <div className="flex flex-wrap gap-3">
                    {activeSocialPlatforms.map((platform) => {
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
                          aria-label={`Visit my ${platform.name}`}
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
              className={`p-8 rounded-2xl backdrop-blur-lg ${darkMode ? 'bg-gray-900/50 border-gray-700/50' : 'bg-white/50 border-gray-200/50'} border shadow-lg`}
            >
              <h3 className="text-2xl font-bold mb-8">Send a Message</h3>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block mb-2 font-medium">Your Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      className={`w-full px-4 py-3 rounded-lg backdrop-blur-lg border ${darkMode ? 'bg-gray-900/50 border-gray-700 text-white placeholder-gray-400 focus:border-teal-500' : 'bg-white/50 border-gray-300 text-gray-800 placeholder-gray-500 focus:border-blue-500'} focus:outline-none focus:ring-2 ${darkMode ? 'focus:ring-teal-500/30' : 'focus:ring-blue-500/30'} transition-all`}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-2 font-medium">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      className={`w-full px-4 py-3 rounded-lg backdrop-blur-lg border ${darkMode ? 'bg-gray-900/50 border-gray-700 text-white placeholder-gray-400 focus:border-teal-500' : 'bg-white/50 border-gray-300 text-gray-800 placeholder-gray-500 focus:border-blue-500'} focus:outline-none focus:ring-2 ${darkMode ? 'focus:ring-teal-500/30' : 'focus:ring-blue-500/30'} transition-all`}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block mb-2 font-medium">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    className={`w-full px-4 py-3 rounded-lg backdrop-blur-lg border ${darkMode ? 'bg-gray-900/50 border-gray-700 text-white placeholder-gray-400 focus:border-teal-500' : 'bg-white/50 border-gray-300 text-gray-800 placeholder-gray-500 focus:border-blue-500'} focus:outline-none focus:ring-2 ${darkMode ? 'focus:ring-teal-500/30' : 'focus:ring-blue-500/30'} transition-all`}
                    placeholder="Project Inquiry"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block mb-2 font-medium">Message</label>
                  <textarea 
                    id="message" 
                    rows="5"
                    className={`w-full px-4 py-3 rounded-lg backdrop-blur-lg border ${darkMode ? 'bg-gray-900/50 border-gray-700 text-white placeholder-gray-400 focus:border-teal-500' : 'bg-white/50 border-gray-300 text-gray-800 placeholder-gray-500 focus:border-blue-500'} focus:outline-none focus:ring-2 ${darkMode ? 'focus:ring-teal-500/30' : 'focus:ring-blue-500/30'} transition-all`}
                    placeholder="Tell me about your project..."
                  ></textarea>
                </div>
                <motion.button 
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-4 rounded-lg font-bold text-lg ${darkMode ? 'bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600' : 'bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500'} text-white transition-all duration-300 shadow-lg`}
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className={`py-12 ${darkMode ? 'bg-gray-900/50' : 'bg-white/50'} backdrop-blur-lg border-t ${darkMode ? 'border-gray-700/50' : 'border-gray-200/50'}`}>
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-full ${darkMode ? 'bg-gradient-to-br from-teal-500 to-blue-500' : 'bg-gradient-to-br from-blue-500 to-teal-400'} flex items-center justify-center`}>
                  <span className="font-bold text-white">
                    {data.name?.split(' ').map(n => n[0]).join('') || 'JD'}
                  </span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-teal-400 bg-clip-text text-transparent">
                  {data.name}
                </span>
              </div>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Building digital experiences with passion and precision
              </p>
            </div>

            {/* Social links in footer with improved contrast */}
            {activeSocialPlatforms.length > 0 && (
              <div className="flex gap-4">
                {activeSocialPlatforms.map((platform) => {
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
                      aria-label={`Visit my ${platform.name}`}
                    >
                      <Icon className="text-xl" />
                    </motion.a>
                  );
                })}
              </div>
            )}
          </div>

          <div className={`mt-12 pt-8 border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'} text-center`}>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              © {new Date().getFullYear()} {data.name}. All rights reserved.
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Made with ❤️ using React & Tailwind CSS
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;