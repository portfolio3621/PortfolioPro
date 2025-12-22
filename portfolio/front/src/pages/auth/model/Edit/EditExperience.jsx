import React, { useState, useEffect, useRef } from "react";
import { IoIosClose } from "react-icons/io";
import { Plus, Trash2, Save, X, Briefcase, Building2, Calendar, Award, ListChecks, ChevronUp, Edit2 } from "lucide-react";
import Fetch from "../../../../Fetch";

const ExperienceCard = ({
  setEmptyFields,
  EditExpModelShow,
  exp,
  index,
  refresh,
}) => {
  const modelExRef = useRef();
  const modalContentRef = useRef();
  const [experience, setExperience] = useState(exp || { 
    role: "", 
    company: "", 
    period: "", 
    description: [], 
    achievements: [] 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (exp) {
      setExperience(exp);
    }
  }, [exp]);

  const handleDescriptionChange = (i, value) => {
    const updatedDescriptions = [...experience.description];
    updatedDescriptions[i] = value;
    setExperience((prev) => ({ ...prev, description: updatedDescriptions }));
  };

  const handleAchievementChange = (i, value) => {
    const updatedAchievements = [...experience.achievements];
    updatedAchievements[i] = value;
    setExperience((prev) => ({ ...prev, achievements: updatedAchievements }));
  };

  const handleSubmit = async () => {
    const {
      role,
      company,
      period,
      description = [],
      achievements = [],
    } = experience;

    // Check if any of the main fields are empty
    if (!role?.trim() || !company?.trim() || !period?.trim()) {
      alert("Please fill in Role, Company, and Period fields.");
      setEmptyFields?.();
      return;
    }

    // Check if any description is empty
    const hasEmptyDescription = description.some((desc) => !desc.trim());
    if (hasEmptyDescription) {
      alert("All description fields must be filled.");
      return;
    }

    // Check if any achievement is empty
    const hasEmptyAchievement = achievements.some((ach) => !ach.trim());
    if (hasEmptyAchievement) {
      alert("All achievement fields must be filled.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await Fetch.put(`experience/${index}`, {
        role,
        company,
        period,
        description,
        achievements,
      });
      if (res.success === true) {
        refresh();
        EditExpModelShow(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }

    setEmptyFields();
  };

  const addDescription = () => {
    setExperience((prev) => ({
      ...prev,
      description: [...(prev.description || []), ""],
    }));
  };

  const addAchievement = () => {
    setExperience((prev) => ({
      ...prev,
      achievements: [...(prev.achievements || []), ""],
    }));
  };

  const removeDescription = (i) => {
    setExperience((prev) => ({
      ...prev,
      description: prev.description.filter((_, index) => index !== i),
    }));
  };

  const removeAchievement = (i) => {
    setExperience((prev) => ({
      ...prev,
      achievements: prev.achievements.filter((_, index) => index !== i),
    }));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        EditExpModelShow(false);
      }
    };
    
    const handleScroll = () => {
      if (modalContentRef.current) {
        const scrollTop = modalContentRef.current.scrollTop;
        setIsScrolled(scrollTop > 20);
      }
    };

    if (EditExpModelShow) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = 'hidden';
      
      if (modalContentRef.current) {
        modalContentRef.current.addEventListener('scroll', handleScroll);
      }
      
      // Focus on first input
      setTimeout(() => {
        const firstInput = document.getElementById("role");
        if (firstInput) {
          firstInput.focus();
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
  }, [EditExpModelShow]);

  const scrollToTop = () => {
    if (modalContentRef.current) {
      modalContentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const close = () => {
    EditExpModelShow(false);
    setEmptyFields();
  };

  const formFields = [
    { 
      id: "role", 
      label: "Job Role / Position", 
      value: experience.role || "",
      icon: <Briefcase className="w-5 h-5" />,
      placeholder: "e.g., Senior Software Engineer"
    },
    { 
      id: "company", 
      label: "Company / Organization", 
      value: experience.company || "",
      icon: <Building2 className="w-5 h-5" />,
      placeholder: "e.g., Tech Solutions Inc."
    },
    { 
      id: "period", 
      label: "Employment Period", 
      value: experience.period || "",
      icon: <Calendar className="w-5 h-5" />,
      placeholder: "e.g., Jan 2022 - Present"
    },
  ];

  return (
    <div
      ref={modelExRef}
      className="fixed inset-0 z-50 bg-black/60 dark:bg-black/80 flex items-start md:items-center justify-center px-0 md:px-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === modelExRef.current) {
          close();
        }
      }}
    >
      {/* Mobile backdrop with swipe down to close hint */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 md:hidden">
        <div className="w-12 h-1.5 bg-gray-400/50 dark:bg-gray-600/50 rounded-full"></div>
      </div>

      <div 
        ref={modalContentRef}
        className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white w-full h-full md:h-auto md:max-h-[90vh] md:max-w-3xl md:rounded-3xl relative shadow-2xl border-0 md:border border-gray-100 dark:border-gray-800 overflow-y-auto"
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
                    Edit Experience
                  </h1>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 hidden md:block">
                    Update your professional work experience
                  </p>
                </div>
              </div>
              
              <button
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-300"
                onClick={close}
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
              <Briefcase className="w-5 h-5" />
              Experience Details
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formFields.map(({ id, label, value, icon, placeholder }) => (
                <div key={id} className="space-y-2">
                  <label htmlFor={id} className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {label}
                  </label>
                  <div className="relative">
                    <input
                      id={id}
                      type="text"
                      value={value}
                      onChange={(e) =>
                        setExperience((prev) => ({ ...prev, [id]: e.target.value }))
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

          {/* Description Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                <ListChecks className="w-5 h-5" />
                Job Responsibilities
              </h2>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {experience.description?.length || 0} points
              </span>
            </div>

            {(!experience.description || experience.description.length === 0) ? (
              <div className="text-center py-8 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
                  <ListChecks className="w-8 h-8 text-gray-500 dark:text-gray-400" />
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  No responsibilities added yet
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Add key responsibilities and tasks
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {experience.description.map((desc, i) => (
                  <div
                    key={i}
                    className="group bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 p-4 rounded-xl hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-1">
                        <textarea
                          value={desc}
                          onChange={(e) => handleDescriptionChange(i, e.target.value)}
                          className="w-full bg-transparent text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none text-base resize-none min-h-[60px]"
                          placeholder="Describe your responsibilities..."
                        />
                      </div>
                      <button
                        onClick={() => removeDescription(i)}
                        className="p-2 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-all duration-300 group-hover:scale-110 mt-2"
                        title="Remove description"
                      >
                        <Trash2 className="w-5 h-5 text-red-500 dark:text-red-400" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={addDescription}
              className="group flex items-center justify-center gap-2 w-full p-4 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 dark:from-blue-500/20 dark:to-indigo-500/20 hover:from-blue-500/20 hover:to-indigo-500/20 dark:hover:from-blue-500/30 dark:hover:to-indigo-500/30 border-2 border-dashed border-blue-300 dark:border-blue-700 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
            >
              <Plus className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span className="text-blue-600 dark:text-blue-400 font-medium">
                Add Responsibility
              </span>
            </button>
          </div>

          {/* Achievements Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                <Award className="w-5 h-5" />
                Key Achievements
              </h2>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {experience.achievements?.length || 0} achievements
              </span>
            </div>

            {(!experience.achievements || experience.achievements.length === 0) ? (
              <div className="text-center py-8 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-amber-200 to-orange-300 dark:from-amber-800 dark:to-orange-900 flex items-center justify-center">
                  <Award className="w-8 h-8 text-amber-600 dark:text-amber-400" />
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  No achievements added yet
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Add your notable accomplishments
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {experience.achievements.map((ach, i) => (
                  <div
                    key={i}
                    className="group bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800 p-4 rounded-xl hover:border-amber-300 dark:hover:border-amber-700 transition-all duration-300"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-1">
                        <textarea
                          value={ach}
                          onChange={(e) => handleAchievementChange(i, e.target.value)}
                          className="w-full bg-transparent text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none text-base resize-none min-h-[60px]"
                          placeholder="Describe your achievement..."
                        />
                      </div>
                      <button
                        onClick={() => removeAchievement(i)}
                        className="p-2 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-all duration-300 group-hover:scale-110 mt-2"
                        title="Remove achievement"
                      >
                        <Trash2 className="w-5 h-5 text-red-500 dark:text-red-400" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={addAchievement}
              className="group flex items-center justify-center gap-2 w-full p-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10 dark:from-amber-500/20 dark:to-orange-500/20 hover:from-amber-500/20 hover:to-orange-500/20 dark:hover:from-amber-500/30 dark:hover:to-orange-500/30 border-2 border-dashed border-amber-300 dark:border-amber-700 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
            >
              <Plus className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <span className="text-amber-600 dark:text-amber-400 font-medium">
                Add Achievement
              </span>
            </button>
          </div>

          {/* Preview Section */}
          {(experience.role || experience.company) && (
            <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl border border-gray-200 dark:border-gray-800">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Preview
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="font-bold text-gray-800 dark:text-white text-lg">
                    {experience.role || "Role not set"}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {experience.company || "Company not set"}
                    {experience.period && ` • ${experience.period}`}
                  </p>
                </div>
                {experience.description?.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">
                      Responsibilities:
                    </p>
                    <ul className="space-y-1">
                      {experience.description.slice(0, 2).map((desc, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <span className="text-blue-500 dark:text-blue-400 mt-1">•</span>
                          <span className="text-gray-700 dark:text-gray-300">
                            {desc.length > 60 ? `${desc.substring(0, 60)}...` : desc}
                          </span>
                        </li>
                      ))}
                      {experience.description.length > 2 && (
                        <li className="text-sm text-gray-500 dark:text-gray-400">
                          +{experience.description.length - 2} more responsibilities
                        </li>
                      )}
                    </ul>
                  </div>
                )}
                {experience.achievements?.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">
                      Achievements:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {experience.achievements.slice(0, 3).map((ach, i) => (
                        <span
                          key={i}
                          className="bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/40 dark:to-orange-900/40 text-amber-700 dark:text-amber-300 text-sm px-3 py-1 rounded-full"
                        >
                          {ach.length > 30 ? `${ach.substring(0, 30)}...` : ach}
                        </span>
                      ))}
                      {experience.achievements.length > 3 && (
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          +{experience.achievements.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Sticky Footer for Mobile */}
        <div className="sticky bottom-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-4 md:p-8">
          <div className="flex flex-col-reverse md:flex-row md:justify-between md:items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-xs text-gray-600 dark:text-gray-400">
                All changes will be saved when you click Update
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={close}
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
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Update Experience
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
};

export default ExperienceCard;