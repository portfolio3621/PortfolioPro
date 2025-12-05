import React, { useState, useEffect } from 'react';
import { motion , AnimatePresence } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const Portfolio = () => {
  // Portfolio data with additional fields
  const portfolioData = {
    personalInfo: {
      name: "John Doe",
      title: "Full Stack Developer",
      email: "john.doe@example.com",
      phone: "+1 (123) 456-7890",
      address: "San Francisco, CA",
      about: "I'm a passionate developer with 5+ years of experience building web applications. I specialize in React, Node.js, and cloud technologies.",
      socialLinks: {
        github: "https://github.com/johndoe",
        linkedin: "https://linkedin.com/in/johndoe",
        x: "https://x.com/johndoe",
      },
      avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
      resumeUrl: "#",
    },
    skills: {
      technical: [
        { name: "JavaScript", level: 90, icon: "🚀" },
        { name: "React", level: 85, icon: "⚛️" },
        { name: "Node.js", level: 80, icon: "🛠️" },
        { name: "TypeScript", level: 75, icon: "🔍" },
        { name: "GraphQL", level: 70, icon: "📊" },
        { name: "AWS", level: 70, icon: "☁️" },
      ],
      professional: [
        "Team Leadership",
        "Agile Development",
        "Technical Writing",
        "Mentoring",
        "Public Speaking"
      ]
    },
    projects: [
      {
        title: "E-commerce Platform",
        description: "A full-stack e-commerce solution with React frontend and Node.js backend.",
        technologies: ["React", "Node.js", "MongoDB", "Stripe API"],
        link: "#",
        github: "#",
        imageUrl: "https://via.placeholder.com/600x400?text=E-commerce",
        featured: true
      },
      {
        title: "Task Management App",
        description: "A productivity app for managing tasks with drag-and-drop functionality.",
        technologies: ["React", "Firebase", "Material UI", "Redux"],
        link: "#",
        github: "#",
        imageUrl: "https://via.placeholder.com/600x400?text=Task+App",
        featured: true
      },
      {
        title: "Health Tracking Dashboard",
        description: "A dashboard for tracking health metrics with data visualization.",
        technologies: ["React", "D3.js", "Express", "MongoDB"],
        link: "#",
        github: "#",
        imageUrl: "https://via.placeholder.com/600x400?text=Health+Dashboard",
        featured: false
      },
    ],
    experience: [
      {
        role: "Senior Developer",
        company: "Tech Corp Inc.",
        period: "2020 - Present",
        description: [
          "Led a team of 5 developers to build scalable web applications",
          "Implemented CI/CD pipelines reducing deployment time by 40%",
          "Mentored junior developers and conducted code reviews"
        ],
        achievements: [
          "Reduced API response time by 60% through optimization",
          "Implemented testing framework increasing coverage to 85%"
        ]
      },
      {
        role: "Junior Developer",
        company: "Web Solutions LLC",
        period: "2018 - 2020",
        description: [
          "Developed and maintained client websites using modern JavaScript frameworks",
          "Collaborated with designers to implement responsive UIs",
          "Participated in agile development processes"
        ]
      },
    ],
    education: [
      {
        degree: "B.Sc. Computer Science",
        institution: "State University",
        year: "2018",
        courses: [
          "Data Structures & Algorithms",
          "Database Systems",
          "Web Development",
          "Machine Learning"
        ]
      },
    ],
    testimonials: [
      {
        name: "Jane Smith",
        role: "Product Manager at Tech Corp",
        content: "John's work on our e-commerce platform was exceptional. He delivered complex features ahead of schedule while maintaining high code quality.",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg"
      },
      {
        name: "Mike Johnson",
        role: "CTO at Web Solutions",
        content: "One of the most dedicated developers I've worked with. Always willing to go the extra mile to solve challenging problems.",
        avatar: "https://randomuser.me/api/portraits/men/2.jpg"
      }
    ]
  };

  // State management
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('featured');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Theme toggle
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', !darkMode);
  };

  // Filter projects
  const filteredProjects = activeTab === 'all' 
    ? portfolioData.projects 
    : portfolioData.projects.filter(project => project.featured);

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
            <span className={`${darkMode ? 'text-teal-400' : 'text-blue-600'}`}>JD</span>
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
                Hi, I'm <span className={`${darkMode ? 'text-teal-400' : 'text-blue-600'}`}>{portfolioData.personalInfo.name}</span>
              </h1>
              <h2 className="text-2xl md:text-3xl mb-6">{portfolioData.personalInfo.title}</h2>
              <p className="text-lg leading-relaxed mb-8">{portfolioData.personalInfo.about}</p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href={portfolioData.personalInfo.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-6 py-3 rounded-lg font-medium ${darkMode ? 'bg-teal-600 hover:bg-teal-700' : 'bg-blue-600 hover:bg-blue-700'} text-white transition-colors`}
                >
                  Download Resume
                </a>
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
                  src={portfolioData.personalInfo.avatarUrl} 
                  alt={portfolioData.personalInfo.name} 
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 ${darkMode ? 'bg-teal-400/10' : 'bg-blue-600/10'}`}></div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Skills Section */}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Technical Skills */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold mb-6">Technical Skills</h3>
              <div className="space-y-6">
                {portfolioData.skills.technical.map((skill, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{skill.icon}</span>
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

            {/* Professional Skills */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold mb-6">Professional Skills</h3>
              <div className="flex flex-wrap gap-3">
                {portfolioData.skills.professional.map((skill, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className={`px-4 py-2 rounded-full ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
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
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={project.imageUrl} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform hover:scale-110 duration-500"
                    />
                    <div className={`absolute inset-0 ${darkMode ? 'bg-teal-400/10' : 'bg-blue-600/10'}`}></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="mb-4">{project.description}</p>
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
                    <div className="flex gap-3">
                      <a 
                        href={project.link} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex-1 text-center py-2 rounded-md font-medium ${darkMode ? 'bg-teal-600 hover:bg-teal-700' : 'bg-blue-600 hover:bg-blue-700'} text-white transition-colors`}
                      >
                        Live Demo
                      </a>
                      <a 
                        href={project.github} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex-1 text-center py-2 rounded-md font-medium border ${darkMode ? 'border-teal-400 text-teal-400 hover:bg-gray-700' : 'border-blue-600 text-blue-600 hover:bg-gray-100'} transition-colors`}
                      >
                        Code
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className={`py-16 ${darkMode ? 'border-gray-700' : 'border-gray-200'} border-t`}>
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

            {portfolioData.experience.map((exp, index) => (
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
                  
                  <ul className="space-y-2 mb-4">
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex">
                        <span className={`mr-2 ${darkMode ? 'text-teal-400' : 'text-blue-600'}`}>•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  
                  {exp.achievements && (
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

          {/* Education */}
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className={`text-3xl font-bold mt-20 mb-12 text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}
          >
            <span className={`${darkMode ? 'text-teal-400' : 'text-blue-600'}`}>Education</span> Background
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {portfolioData.education.map((edu, index) => (
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
              </motion.div>
            ))}
          </div>
        </section>


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
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-full ${darkMode ? 'bg-teal-600/20 text-teal-400' : 'bg-blue-600/20 text-blue-600'}`}>
                    <FiMail className="text-xl" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <a 
                      href={`mailto:${portfolioData.personalInfo.email}`} 
                      className={`font-medium ${darkMode ? 'text-teal-400 hover:text-teal-300' : 'text-blue-600 hover:text-blue-500'}`}
                    >
                      {portfolioData.personalInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-full ${darkMode ? 'bg-teal-600/20 text-teal-400' : 'bg-blue-600/20 text-blue-600'}`}>
                    <FiPhone className="text-xl" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p>{portfolioData.personalInfo.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-full ${darkMode ? 'bg-teal-600/20 text-teal-400' : 'bg-blue-600/20 text-blue-600'}`}>
                    <FiMapPin className="text-xl" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p>{portfolioData.personalInfo.address}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="text-lg font-semibold mb-4">Connect with me</h4>
                <div className="flex gap-4">
                  <a 
                    href={portfolioData.personalInfo.socialLinks.github} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}
                  >
                    <FiGithub className="text-xl" />
                  </a>
                  <a 
                    href={portfolioData.personalInfo.socialLinks.linkedin} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}
                  >
                    <FiLinkedin className="text-xl" />
                  </a>
                  <a 
                    href={portfolioData.personalInfo.socialLinks.twitter} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}
                  >
                    <FiTwitter className="text-xl" />
                  </a>
                </div>
              </div>
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
          <p>© {new Date().getFullYear()} {portfolioData.personalInfo.name}. All rights reserved.</p>
          <div className="flex justify-center gap-4 mt-4">
            <a 
              href={portfolioData.personalInfo.socialLinks.github} 
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} transition-colors`}
            >
              <FiGithub className="text-xl" />
            </a>
            <a 
              href={portfolioData.personalInfo.socialLinks.linkedin} 
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} transition-colors`}
            >
              <FiLinkedin className="text-xl" />
            </a>
            <a 
              href={portfolioData.personalInfo.socialLinks.twitter} 
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'} transition-colors`}
            >
              <FiTwitter className="text-xl" />
            </a>
          </div>
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
