import { useEffect, useRef, useState } from "react";
import { IoIosClose } from "react-icons/io";
import Fetch from "../../../../Fetch";
import { HiOutlineUser, HiOutlineUserCircle, HiOutlineMail, HiOutlinePhone, HiOutlineInformationCircle } from "react-icons/hi";
import { Save, X, User, Edit2, MapPin, Briefcase, ChevronUp } from "lucide-react";

export default function EditPersonalModel({
  EditPersonalModelShow,
  user,
  refresh,
}) {
  const modelRef = useRef();
  const modalContentRef = useRef();
  const [userData, setUserData] = useState(user);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await Fetch.put(`update-user`, {
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        about: userData.about,
        address: userData.address,
        gender: userData.gender,
      });
      if (response.success === true) {
        EditPersonalModelShow(false);
        refresh();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        EditPersonalModelShow(false);
      }
    };
    
    const handleScroll = () => {
      if (modalContentRef.current) {
        const scrollTop = modalContentRef.current.scrollTop;
        setIsScrolled(scrollTop > 20);
      }
    };

    if (EditPersonalModelShow) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
      
      if (modalContentRef.current) {
        modalContentRef.current.addEventListener('scroll', handleScroll);
      }
      
      // Focus on first input when modal opens on mobile
      setTimeout(() => {
        const firstInput = document.getElementById("name");
        if (firstInput) {
          firstInput.focus();
          // Scroll input into view on mobile
          setTimeout(() => {
            firstInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 100);
        }
      }, 300);
    }
    
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = 'unset';
      if (modalContentRef.current) {
        modalContentRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [EditPersonalModelShow, user]);

  const handleGenderSelect = (gender) => {
    setUserData((prev) => ({
      ...prev,
      gender,
    }));
  };

  const scrollToTop = () => {
    if (modalContentRef.current) {
      modalContentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const formFields = [
    { 
      id: "name", 
      label: "Full Name", 
      type: "text", 
      value: userData.name,
      icon: <User className="w-5 h-5" />,
      placeholder: "Enter your full name"
    },
    { 
      id: "email", 
      label: "Email Address", 
      type: "email", 
      value: userData.email,
      icon: <HiOutlineMail className="w-5 h-5" />,
      placeholder: "your.email@example.com"
    },
    { 
      id: "phone", 
      label: "Phone Number", 
      type: "tel", 
      value: userData.phone,
      icon: <HiOutlinePhone className="w-5 h-5" />,
      placeholder: "+1 (123) 456-7890"
    },
  ];

  return (
    <div
      ref={modelRef}
      className="fixed inset-0 z-50 bg-black/60 dark:bg-black/80 flex items-start md:items-center justify-center px-0 md:px-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === modelRef.current) {
          EditPersonalModelShow(false);
        }
      }}
    >
      {/* Mobile backdrop with swipe down to close hint */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 md:hidden">
        <div className="w-12 h-1.5 bg-gray-400/50 dark:bg-gray-600/50 rounded-full"></div>
      </div>

      <div 
        ref={modalContentRef}
        className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white w-full h-full md:h-auto md:max-h-[90vh] md:max-w-2xl md:rounded-3xl relative shadow-2xl border-0 md:border border-gray-100 dark:border-gray-800 overflow-y-auto"
      >
        {/* Sticky Header for Mobile */}
        <div className={`sticky top-0 z-20 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 transition-all duration-300 ${
          isScrolled ? 'py-3 shadow-sm' : 'py-4'
        }`}>
          <div className="px-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500">
                  <Edit2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white">
                    Edit Profile
                  </h1>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 hidden md:block">
                    Update your personal details
                  </p>
                </div>
              </div>
              
              <button
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-300"
                onClick={() => EditPersonalModelShow(false)}
                aria-label="Close"
              >
                <IoIosClose className="text-2xl md:text-3xl text-gray-500 hover:text-red-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Scroll to top button */}
        {isScrolled && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-30 p-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 md:hidden"
            aria-label="Scroll to top"
          >
            <ChevronUp className="w-5 h-5" />
          </button>
        )}

        {/* Content */}
        <div className="p-4 md:p-8 space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
              <User className="w-5 h-5" />
              Personal Information
            </h2>
            
            <div className="space-y-4">
              {formFields.map(({ id, label, type, value, icon, placeholder }) => (
                <div key={id} className="space-y-2">
                  <label htmlFor={id} className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {label}
                  </label>
                  <div className="relative">
                    <input
                      id={id}
                      type={type}
                      value={value}
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          [id]: e.target.value,
                        }))
                      }
                      className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl p-4 pl-12 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-base"
                      placeholder={placeholder}
                      autoComplete="off"
                    />
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500">
                      {icon}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gender Selection */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              Gender
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { 
                  value: "Male", 
                  icon: <HiOutlineUserCircle className="w-6 h-6" />,
                  color: "from-blue-500 to-blue-600",
                },
                { 
                  value: "Female", 
                  icon: <HiOutlineUser className="w-6 h-6" />,
                  color: "from-pink-500 to-rose-500",
                }
              ].map(({ value, icon, color }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => handleGenderSelect(value)}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-300 ${
                    userData.gender === value
                      ? `border-blue-500 dark:border-blue-400 bg-gradient-to-r ${color}/10`
                      : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                  }`}
                >
                  <div className={`p-3 rounded-full mb-2 ${
                    userData.gender === value
                      ? `bg-gradient-to-r ${color} text-white`
                      : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                  }`}>
                    {icon}
                  </div>
                  <span className={`font-medium text-sm ${
                    userData.gender === value
                      ? "text-gray-800 dark:text-white"
                      : "text-gray-600 dark:text-gray-400"
                  }`}>
                    {value}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Address Field */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Address
            </h2>
            <div className="relative">
              <textarea
                id="address"
                value={userData.address}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: e.target.value,
                  }))
                }
                className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl p-4 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 min-h-[100px] resize-y text-base"
                placeholder="Enter your complete address..."
              />
            </div>
          </div>

          {/* About Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
              <HiOutlineInformationCircle className="w-5 h-5" />
              About Yourself
            </h2>
            <div className="relative">
              <textarea
                id="about"
                value={userData.about}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    about: e.target.value,
                  }))
                }
                className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl p-4 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 min-h-[120px] resize-y text-base"
                placeholder="Tell us about yourself, your profession, interests..."
                maxLength={500}
              />
              <div className="flex justify-between items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
                <span>{userData.about?.length || 0} / 500 characters</span>
                <span className="text-xs">Max 500 characters</span>
              </div>
            </div>
          </div>

          {/* Profile Preview */}
          <div className="p-4 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800/50 dark:to-blue-900/20 rounded-2xl border border-gray-200 dark:border-gray-800">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Profile Preview
            </h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-gray-600 dark:text-gray-400">Name:</span>
                <p className="font-medium text-gray-800 dark:text-white truncate">{userData.name || "Not set"}</p>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Gender:</span>
                <p className="font-medium text-gray-800 dark:text-white">{userData.gender || "Not set"}</p>
              </div>
              <div className="col-span-2">
                <span className="text-gray-600 dark:text-gray-400">Email:</span>
                <p className="font-medium text-gray-800 dark:text-white truncate">{userData.email || "Not set"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Footer for Mobile */}
        <div className="sticky bottom-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-4 md:p-8">
          <div className="flex flex-col-reverse md:flex-row md:justify-between md:items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-xs text-gray-600 dark:text-gray-400">
                All changes will be saved automatically
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => EditPersonalModelShow(false)}
                className="px-6 py-3 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 font-medium flex-1 sm:flex-none"
              >
                <span className="flex items-center justify-center gap-2">
                  <X className="w-4 h-4" />
                  Cancel
                </span>
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-xl transition-all duration-300 font-medium shadow-lg hover:shadow-xl flex-1 sm:flex-none disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <span className="flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save Changes
                    </>
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}