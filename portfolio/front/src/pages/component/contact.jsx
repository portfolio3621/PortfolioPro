import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiClock,
  FiLinkedin,
  FiGithub,
  FiMessageCircle,
  FiInstagram,
  FiUsers,
  FiGlobe,
  FiSend,
  FiCheckCircle,
  FiZap,
  FiStar,
  FiShield,
  FiPaperclip,
  FiArrowRight
} from 'react-icons/fi';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      offset: 100
    });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const contactInfo = [
    {
      title: 'Email Address',
      description: 'portfoliopro12@gmail.com',
      support: 'suriyaprakashraja849@gmail.com',
      icon: <FiMail className="text-2xl" />,
      color: 'from-blue-500 to-cyan-500',
      aosDelay: '100'
    },
    {
      title: 'Phone Number',
      description: '+91 9363879192',
      support: '+91 9486531371',
      icon: <FiPhone className="text-2xl" />,
      color: 'from-purple-500 to-pink-500',
      aosDelay: '200'
    }
  ];

  const socialLinks = [
    { name: 'LinkedIn', icon: <FiLinkedin />, url: '#', color: 'hover:bg-blue-100 dark:hover:bg-blue-900/30', aosDelay: '200' },
    { name: 'GitHub', icon: <FiGithub />, url: '#', color: 'hover:bg-gray-100 dark:hover:bg-gray-800', aosDelay: '300' },
    { name: 'Discord', icon: <FiMessageCircle />, url: '#', color: 'hover:bg-purple-100 dark:hover:bg-purple-900/30', aosDelay: '400' },
    { name: 'Instagram', icon: <FiInstagram />, url: '#', color: 'hover:bg-pink-100 dark:hover:bg-pink-900/30', aosDelay: '500' }
  ];

  const stats = [
    { label: 'Response Time', value: '<24h', icon: <FiZap />, aosDelay: '100' },
    { label: 'Satisfaction', value: '98%', icon: <FiStar />, aosDelay: '200' },
    { label: 'Support', value: '24/7', icon: <FiShield />, aosDelay: '300' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950">
      {/* Simplified background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300/10 dark:bg-purple-500/5 rounded-full blur-2xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-300/10 dark:bg-blue-500/5 rounded-full blur-2xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        {/* Header */}
        <div className="text-center mb-16">
        <div 
            className="inline-flex items-center gap-3 px-4 py-2 bg-primary/10 dark:bg-primary/20 rounded-full mb-6"
            data-aos="fade-down"
        >
              <div className="w-2 h-2 rounded-full bg-primary animate-ping absolute" />
              <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-sm font-semibold text-primary dark:text-primary/90">
                    GET IN TOUCH
               </span>
        </div>
          
          <h1 
            className="text-5xl lg:text-6xl font-bold tracking-tight mb-6"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Let's Connect
            </span>
          </h1>
          
          <p 
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Have a project in mind? Want to discuss opportunities? Feel free to reach out.
            We're excited to hear from you and explore how we can work together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Information */}
          <div>
            <div className="space-y-8">
              <div 
                className="bg-white/90 dark:bg-gray-800/90 rounded-3xl p-6 sm:p-8 shadow-xl border border-white/30 dark:border-gray-700/30"
                data-aos="fade-right"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
                  <FiMessageCircle className="text-2xl text-primary" />
                  Quick Response
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  We typically respond within 24 hours during business days.
                </p>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  {contactInfo.map((item, index) => (
                    <div
                      key={index}
                      className="group p-4 sm:p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-primary/30 dark:hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
                      data-aos="fade-up"
                      data-aos-delay={item.aosDelay}
                    >
                      <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${item.color} mb-4 text-white`}>
                        {item.icon}
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">
                        {item.title}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 font-medium text-sm sm:text-base">
                        {item.description}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {item.support}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Team Card */}
              <div
                className="bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 rounded-3xl p-6 sm:p-8 border border-primary/20 dark:border-primary/30"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white">
                    <FiUsers className="text-xl sm:text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                      Meet Our Team
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                      Ready to assist you
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-6 text-sm sm:text-base">
                  Our dedicated support team is available to help you with any questions
                  or concerns you may have about our services.
                </p>
                <div className="flex items-center gap-3">
                  {['👩‍💼', '👨‍💻', '👩‍🎨', '👨‍🔬'].map((emoji, index) => (
                    <div
                      key={index}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center text-lg sm:text-xl shadow-lg border-2 border-white dark:border-gray-600"
                    >
                      {emoji}
                    </div>
                  ))}
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-sm sm:text-lg font-semibold shadow-lg">
                    +{5}
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div
                className="bg-white/90 dark:bg-gray-800/90 rounded-3xl p-6 sm:p-8 shadow-xl border border-white/30 dark:border-gray-700/30"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                  <FiGlobe className="text-xl sm:text-2xl text-primary" />
                  Connect With Us
                </h3>
                <div className="flex flex-wrap gap-2">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      className={`flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium transition-all duration-300 ${social.color} text-sm sm:text-base`}
                      data-aos="zoom-in"
                      data-aos-delay={social.aosDelay}
                    >
                      <span className="text-lg sm:text-xl">{social.icon}</span>
                      <span className="hidden sm:inline">{social.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="sticky top-8">
              {isSubmitted ? (
                <motion.div
                  className="bg-white/90 dark:bg-gray-800/90 rounded-3xl p-6 sm:p-8 shadow-xl border border-white/30 dark:border-gray-700/30"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                >
                  <div className="text-center py-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 mb-4 sm:mb-6">
                      <FiCheckCircle className="text-2xl sm:text-3xl text-white" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 sm:mb-8">
                      Thank you for reaching out. We'll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="px-6 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 transition-colors flex items-center gap-2 mx-auto"
                    >
                      <FiSend />
                      Send Another Message
                    </button>
                  </div>
                </motion.div>
              ) : (
                <div
                  className="bg-white/90 dark:bg-gray-800/90 rounded-3xl p-6 sm:p-8 shadow-xl border border-white/30 dark:border-gray-700/30"
                  data-aos="fade-left"
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white">
                      <FiPaperclip className="text-xl sm:text-2xl" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                        Send Us a Message
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                        Fill out the form below
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                      <div data-aos="zoom-in" data-aos-delay="100">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white"
                          placeholder="John Doe"
                        />
                      </div>
                      
                      <div data-aos="zoom-in" data-aos-delay="200">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div data-aos="zoom-in" data-aos-delay="300">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white"
                        placeholder="How can we help?"
                      />
                    </div>

                    <div data-aos="zoom-in" data-aos-delay="400">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all duration-300 text-gray-900 dark:text-white resize-none"
                        placeholder="Tell us about your project or inquiry..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-3 sm:py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl shadow-lg transition-all duration-300 ${
                        isSubmitting ? 'opacity-80 cursor-not-allowed' : 'hover:shadow-xl hover:shadow-primary/30'
                      } flex items-center justify-center gap-3`}
                      data-aos="zoom-in"
                      data-aos-delay="500"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <FiSend className="text-lg sm:text-xl" />
                          <span className="text-sm sm:text-base">Send Message</span>
                          <FiArrowRight className="text-lg sm:text-xl" />
                        </>
                      )}
                    </button>

                    <p className="text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      By submitting this form, you agree to our privacy policy.
                    </p>
                  </form>
                </div>
              )}

              {/* Stats */}
              <div className="mt-6 sm:mt-8 grid grid-cols-3 gap-3 sm:gap-4">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white/90 dark:bg-gray-800/90 rounded-xl p-3 sm:p-4 text-center border border-white/30 dark:border-gray-700/30"
                    data-aos="fade-up"
                    data-aos-delay={stat.aosDelay}
                  >
                    <div className="text-xl sm:text-2xl mb-1 sm:mb-2 text-primary flex justify-center">
                      {stat.icon}
                    </div>
                    <div className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                    <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div
          className="mt-12 sm:mt-20 text-center"
          data-aos="fade-up"
          data-aos-delay="100"
        >
        </div>
      </div>
    </div>
  );
};

export default ContactPage;