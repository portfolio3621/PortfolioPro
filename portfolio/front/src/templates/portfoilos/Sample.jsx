import React, { useState, useEffect } from 'react';
import { motion , AnimatePresence } from 'framer-motion';
import { 
  FiGithub, FiLinkedin, FiTwitter, FiMail, FiPhone, FiMapPin,
  FiInstagram, FiFacebook, FiYoutube, FiGitlab, FiDribbble,
  FiFigma, FiSlack, FiTwitch, FiMessageSquare, FiGlobe
} from 'react-icons/fi';
import { FaXTwitter, FaDiscord } from 'react-icons/fa6';

const Portfolio = ({ portfolioData }) => {

  // State management
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('featured');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Social media platform options
  const platformOptions = [
    { id: "linkedin", name: "LinkedIn", icon: FiLinkedin, color: "text-[#0A66C2]", bgColor: "bg-[#0A66C2]/10" },
    { id: "github", name: "GitHub", icon: FiGithub, color: "text-gray-900 dark:text-white", bgColor: "bg-gray-900/10 dark:bg-white/10" },
    { id: "x", name: "X", icon: FaXTwitter, color: "text-black", bgColor: "bg-[#1DA1F2]/10" },
    { id: "instagram", name: "Instagram", icon: FiInstagram, color: "text-[#E4405F]", bgColor: "bg-[#E4405F]/10" },
    { id: "facebook", name: "Facebook", icon: FiFacebook, color: "text-[#1877F2]", bgColor: "bg-[#1877F2]/10" },
    { id: "youtube", name: "YouTube", icon: FiYoutube, color: "text-[#FF0000]", bgColor: "bg-[#FF0000]/10" },
    { id: "gitlab", name: "GitLab", icon: FiGitlab, color: "text-[#FC6D26]", bgColor: "bg-[#FC6D26]/10" },
    { id: "dribbble", name: "Dribbble", icon: FiDribbble, color: "text-[#EA4C89]", bgColor: "bg-[#EA4C89]/10" },
    { id: "figma", name: "Figma", icon: FiFigma, color: "text-[#F24E1E]", bgColor: "bg-[#F24E1E]/10" },
    { id: "slack", name: "Slack", icon: FiSlack, color: "text-[#4A154B]", bgColor: "bg-[#4A154B]/10" },
    { id: "discord", name: "Discord", icon: FaDiscord, color: "text-[#5865F2]", bgColor: "bg-[#5865F2]/10" },
    { id: "twitch", name: "Twitch", icon: FiTwitch, color: "text-[#9146FF]", bgColor: "bg-[#9146FF]/10" },
    { id: "telegram", name: "Telegram", icon: FiMessageSquare, color: "text-[#26A5E4]", bgColor: "bg-[#26A5E4]/10" },
    { id: "website", name: "Website", icon: FiGlobe, color: "text-emerald-600", bgColor: "bg-emerald-600/10" },
  ];

  // Default portfolio data
  const defaultPortfolioData = {
    name: 'Your Name',
    title: 'Your Title',
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

  // Filter projects - handle empty/undefined projects
  const filteredProjects = data.projects?.length > 0 
    ? (activeTab === "all" 
        ? data.projects 
        : data.projects.filter(project => project.featured))
    : [];

  // Get active social platforms based on data
  const activeSocialPlatforms = platformOptions.filter(platform => 
    data.socialLinks && data.socialLinks[platform.id]
  );

  // Theme toggle
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', !darkMode);
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
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-800'}`}>
      {/* Scroll progress bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-teal-400 z-50" 
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Navigation */}
      <header className={`sticky top-0 z-40 backdrop-blur-md ${darkMode ? 'bg-gray-900/80' : 'bg-white/80'} border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold"
          >
            <span className={`${darkMode ? 'text-teal-400' : 'text-blue-600'}`}>
              {data.name?.split(' ').map(n => n[0]).join('') || 'JD'}
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {['about', 'skills', 'projects', 'experience', 'contact'].map((item) => (
              <a 
                key={item}
                href={`#${item}`}
                className={`capitalize hover:${darkMode ? 'text-teal-400' : 'text-blue-600'} transition-colors`}
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button 
            className="md:hidden focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className={`w-6 flex flex-col gap-1 ${isMenuOpen ? 'transform rotate-90' : ''} transition-transform`}>
              <span className={`h-0.5 w-full ${darkMode ? 'bg-gray-100' : 'bg-gray-800'}`}></span>
              <span className={`h-0.5 w-full ${darkMode ? 'bg-gray-100' : 'bg-gray-800'}`}></span>
              <span className={`h-0.5 w-full ${darkMode ? 'bg-gray-100' : 'bg-gray-800'}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`md:hidden overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}
            >
              <div className="container mx-auto px-4 py-2 flex flex-col space-y-4">
                {['about', 'skills', 'projects', 'experience', 'contact'].map((item) => (
                  <a 
                    key={item}
                    href={`#${item}`}
                    className={`capitalize py-2 ${darkMode ? 'hover:text-teal-400' : 'hover:text-blue-600'} transition-colors`}
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

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <section id="about" className={`py-20 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex flex-col md:flex-row items-center gap-10">
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex-1 order-2 md:order-1"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Hi, I'm <span className={`${darkMode ? 'text-teal-400' : 'text-blue-600'}`}>{data.name}</span>
              </h1>
              <h2 className="text-2xl md:text-3xl mb-6">{data.title}</h2>
              <p className="text-lg leading-relaxed mb-8">{data.about}</p>
              <div className="flex flex-wrap gap-4">
                {data.resumeUrl && (
                  <a 
                    href={data.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-6 py-3 rounded-lg font-medium ${darkMode ? 'bg-teal-600 hover:bg-teal-700' : 'bg-blue-600 hover:bg-blue-700'} text-white transition-colors`}
                  >
                    Download Resume
                  </a>
                )}
                <a 
                  href="#contact"
                  className={`px-6 py-3 rounded-lg font-medium border ${darkMode ? 'border-teal-400 text-teal-400 hover:bg-gray-800' : 'border-blue-600 text-blue-600 hover:bg-gray-100'} transition-colors`}
                >
                  Contact Me
                </a>
              </div>
            </motion.div>
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex-1 order-1 md:order-2 flex justify-center"
            >
              <div className={`relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-xl ${darkMode ? 'ring-2 ring-teal-400' : 'ring-2 ring-blue-600'}`}>
                <img 
                  src={data.avatarUrl} 
                  alt={data.name} 
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 ${darkMode ? 'bg-teal-400/10' : 'bg-blue-600/10'}`}></div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Skills Section - Only show if skills exist */}
        {data.skills?.length > 0 && (
          <section id="skills" className={`py-16 ${darkMode ? 'border-gray-700' : 'border-gray-200'} border-t`}>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className={`text-3xl font-bold mb-12 text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}
            >
              My <span className={`${darkMode ? 'text-teal-400' : 'text-blue-600'}`}>Skills</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.skills.map((skill, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {skill.icon && <span className="text-lg">{skill.icon}</span>}
                        <span className="font-medium">{skill.name}</span>
                      </div>
                      <span>{skill.level}%</span>
                    </div>
                    <div className={`w-full h-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                      <div 
                        className={`h-full rounded-full ${darkMode ? 'bg-teal-400' : 'bg-blue-500'}`}
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </section>
        )}

        {/* Projects Section - Only show if projects exist */}
        {data.projects?.length > 0 && (
          <section id="projects" className={`py-16 ${darkMode ? 'border-gray-700' : 'border-gray-200'} border-t`}>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className={`text-3xl font-bold mb-8 text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}
            >
              Featured <span className={`${darkMode ? 'text-teal-400' : 'text-blue-600'}`}>Projects</span>
            </motion.h2>

            {/* Project Tabs */}
            <div className="flex justify-center mb-12">
              <div className={`inline-flex rounded-lg p-1 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                {['featured', 'all'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-md capitalize ${activeTab === tab ? 
                      `${darkMode ? 'bg-teal-600 text-white' : 'bg-blue-600 text-white'}` : 
                      `${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-200'}`}`}
                  >
                    {tab}
                </button>
                ))}
              </div>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    layout
                    className={`rounded-xl overflow-hidden shadow-lg ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border`}
                  >
                    {project.imageUrl && (
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={project.imageUrl} 
                          alt={project.title} 
                          className="w-full h-full object-cover transition-transform hover:scale-110 duration-500"
                        />
                        <div className={`absolute inset-0 ${darkMode ? 'bg-teal-400/10' : 'bg-blue-600/10'}`}></div>
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                      <p className="mb-4">{project.description}</p>
                      {project.technologies?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.map((tech, i) => (
                            <span 
                              key={i} 
                              className={`px-2 py-1 rounded text-xs font-medium ${darkMode ? 'bg-teal-600/20 text-teal-400' : 'bg-blue-600/20 text-blue-600'}`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="flex gap-3">
                        {project.link && (
                          <a 
                            href={project.link} 
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex-1 text-center py-2 rounded-md font-medium ${darkMode ? 'bg-teal-600 hover:bg-teal-700' : 'bg-blue-600 hover:bg-blue-700'} text-white transition-colors`}
                          >
                            Live Demo
                          </a>
                        )}
                        {project.github && (
                          <a 
                            href={project.github} 
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex-1 text-center py-2 rounded-md font-medium border ${darkMode ? 'border-teal-400 text-teal-400 hover:bg-gray-700' : 'border-blue-600 text-blue-600 hover:bg-gray-100'} transition-colors`}
                          >
                            Code
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </section>
        )}

        {/* Experience Section - Only show if experience exists */}
        {(data.experience?.length > 0 || data.education?.length > 0) && (
          <section id="experience" className={`py-16 ${darkMode ? 'border-gray-700' : 'border-gray-200'} border-t`}>
            {data.experience?.length > 0 && (
              <>
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className={`text-3xl font-bold mb-12 text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}
                >
                  Work <span className={`${darkMode ? 'text-teal-400' : 'text-blue-600'}`}>Experience</span>
                </motion.h2>

                <div className="relative">
                  {/* Timeline */}
                  <div className={`absolute left-4 md:left-1/2 h-full w-0.5 transform -translate-x-1/2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>

                  {data.experience.map((exp, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true }}
                      className={`mb-12 relative ${index % 2 === 0 ? 'md:pr-8 md:pl-0 md:text-right' : 'md:pl-8 md:pr-0'}`}
                    >
                      <div className={`absolute top-4 ${index % 2 === 0 ? 'md:right-0 md:left-auto left-4' : 'md:left-0 left-4'} w-4 h-4 rounded-full ${darkMode ? 'bg-teal-400' : 'bg-blue-600'} transform ${index % 2 === 0 ? 'md:translate-x-2' : 'md:-translate-x-2'}`}></div>
                      
                      <div className={`p-6 rounded-xl shadow-md ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                        <div className={`absolute top-4 ${index % 2 === 0 ? 'md:right-8 left-6' : 'md:left-8 left-6'} w-0 h-0 border-t-8 border-b-8 border-l-8 border-t-transparent border-b-transparent ${index % 2 === 0 ? 'md:border-l-teal-400 border-l-gray-800' : 'md:border-r-teal-400 border-r-gray-50'} ${darkMode ? 'border-l-gray-800' : 'border-l-gray-50'} ${index % 2 === 0 ? 'md:border-r-0' : 'md:border-l-0'} border-r-8 md:border-r-8 md:border-l-8`}></div>
                        
                        <h3 className="text-xl font-bold">{exp.role}</h3>
                        <h4 className={`text-lg mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {exp.company} | {exp.period}
                        </h4>
                        
                        {exp.description?.length > 0 && (
                          <ul className="space-y-2 mb-4">
                            {exp.description.map((item, i) => (
                              <li key={i} className="flex">
                                <span className={`mr-2 ${darkMode ? 'text-teal-400' : 'text-blue-600'}`}>•</span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        )}
                        
                        {exp.achievements?.length > 0 && (
                          <>
                            <h5 className="font-semibold mt-4 mb-2">Key Achievements:</h5>
                            <ul className="space-y-2">
                              {exp.achievements.map((achievement, i) => (
                                <li key={i} className="flex">
                                  <span className={`mr-2 ${darkMode ? 'text-teal-400' : 'text-blue-600'}`}>✓</span>
                                  {achievement}
                                </li>
                              ))}
                            </ul>
                          </>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            )}

            {/* Education - Only show if education exists */}
            {data.education?.length > 0 && (
              <>
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className={`text-3xl font-bold ${data.experience?.length > 0 ? 'mt-20' : ''} mb-12 text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}
                >
                  <span className={`${darkMode ? 'text-teal-400' : 'text-blue-600'}`}>Education</span> Background
                </motion.h2>

                <div className="grid md:grid-cols-2 gap-8">
                  {data.education.map((edu, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className={`p-6 rounded-xl shadow-md ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}
                    >
                      <h3 className="text-xl font-bold">{edu.degree}</h3>
                      <h4 className={`text-lg mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {edu.institution} | {edu.year}
                      </h4>
                      
                      {edu.courses?.length > 0 && (
                        <>
                          <h5 className="font-semibold mb-2">Relevant Courses:</h5>
                          <div className="flex flex-wrap gap-2">
                            {edu.courses.map((course, i) => (
                              <span 
                                key={i} 
                                className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-teal-600/20 text-teal-400' : 'bg-blue-600/20 text-blue-600'}`}
                              >
                                {course}
                              </span>
                            ))}
                          </div>
                        </>
                      )}
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </section>
        )}

        {/* Contact Section */}
        <section id="contact" className="py-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className={`text-3xl font-bold mb-12 text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}
          >
            Get In <span className={`${darkMode ? 'text-teal-400' : 'text-blue-600'}`}>Touch</span>
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
              <div className="space-y-4">
                {data.email && (
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${darkMode ? 'bg-teal-600/20 text-teal-400' : 'bg-blue-600/20 text-blue-600'}`}>
                      <FiMail className="text-xl" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <a 
                        href={`mailto:${data.email}`} 
                        className={`font-medium ${darkMode ? 'text-teal-400 hover:text-teal-300' : 'text-blue-600 hover:text-blue-500'}`}
                      >
                        {data.email}
                      </a>
                    </div>
                  </div>
                )}

                {data.phone && (
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${darkMode ? 'bg-teal-600/20 text-teal-400' : 'bg-blue-600/20 text-blue-600'}`}>
                      <FiPhone className="text-xl" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p>{data.phone}</p>
                    </div>
                  </div>
                )}

                {data.address && (
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${darkMode ? 'bg-teal-600/20 text-teal-400' : 'bg-blue-600/20 text-blue-600'}`}>
                      <FiMapPin className="text-xl" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p>{data.address}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Social Links - Updated to use platformOptions */}
              {activeSocialPlatforms.length > 0 && (
                <div className="mt-8">
                  <h4 className="text-lg font-semibold mb-4">Connect with me</h4>
                  <div className="flex flex-wrap gap-3">
                    {activeSocialPlatforms.map((platform) => {
                      const Icon = platform.icon;
                      return (
                        <a 
                          key={platform.id}
                          href={data.socialLinks[platform.id]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`p-3 rounded-full ${platform.bgColor} ${platform.color} hover:opacity-90 transition-opacity`}
                          title={platform.name}
                        >
                          <Icon className="text-xl" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold mb-6">Send Me a Message</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block mb-1">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700 focus:border-teal-400' : 'bg-white border-gray-300 focus:border-blue-500'} focus:outline-none focus:ring-1 ${darkMode ? 'focus:ring-teal-400' : 'focus:ring-blue-500'}`}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-1">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700 focus:border-teal-400' : 'bg-white border-gray-300 focus:border-blue-500'} focus:outline-none focus:ring-1 ${darkMode ? 'focus:ring-teal-400' : 'focus:ring-blue-500'}`}
                      placeholder="Your email"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block mb-1">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700 focus:border-teal-400' : 'bg-white border-gray-300 focus:border-blue-500'} focus:outline-none focus:ring-1 ${darkMode ? 'focus:ring-teal-400' : 'focus:ring-blue-500'}`}
                    placeholder="Subject"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block mb-1">Message</label>
                  <textarea 
                    id="message" 
                    rows="5"
                    className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700 focus:border-teal-400' : 'bg-white border-gray-300 focus:border-blue-500'} focus:outline-none focus:ring-1 ${darkMode ? 'focus:ring-teal-400' : 'focus:ring-blue-500'}`}
                    placeholder="Your message"
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className={`px-6 py-3 rounded-lg font-medium ${darkMode ? 'bg-teal-600 hover:bg-teal-700' : 'bg-blue-600 hover:bg-blue-700'} text-white transition-colors`}
                >
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className={`py-8 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} {data.name}. All rights reserved.</p>
          
          {/* Social links in footer - Updated */}
          {activeSocialPlatforms.length > 0 && (
            <div className="flex justify-center flex-wrap gap-3 mt-4">
              {activeSocialPlatforms.map((platform) => {
                const Icon = platform.icon;
                return (
                  <a 
                    key={platform.id}
                    href={data.socialLinks[platform.id]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded-full ${platform.bgColor} ${platform.color} hover:opacity-80 transition-opacity`}
                    title={platform.name}
                  >
                    <Icon className="text-lg" />
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </footer>

      {/* Theme Toggle Button */}
      <motion.button 
        onClick={toggleTheme}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`fixed bottom-6 right-6 p-3 rounded-full shadow-lg ${darkMode ? 'bg-teal-500 hover:bg-teal-600' : 'bg-blue-500 hover:bg-blue-600'} text-white transition-colors z-50`}
      >
        {darkMode ? '☀️' : '🌙'}
      </motion.button>
    </div>
  );
};

export default Portfolio;