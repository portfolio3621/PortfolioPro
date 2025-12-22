import React, { useState, useEffect, useRef } from "react";
import { IoIosClose } from "react-icons/io";
import { Plus, Trash2, Save, X, GraduationCap, BookOpen, Building, Calendar, ChevronUp, Edit2 } from "lucide-react";
import Fetch from "../../../../Fetch";

const EducationCard = ({ edu, onClose, index, refresh }) => {
  const [education, setEducation] = useState({ degree: "", institution: "", year: "", courses: [] });
  const modelEduRef = useRef();
  const modalContentRef = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (edu) {
      setEducation({
        degree: edu.degree || "",
        institution: edu.institution || "",
        year: edu.year || "",
        courses: edu.courses || []
      });
    }
  }, [edu]);

  const handleCourseChange = (i, value) => {
    const updatedCourses = [...education.courses];
    updatedCourses[i] = value;
    setEducation((prev) => ({ ...prev, courses: updatedCourses }));
  };

  const addCourse = () => {
    setEducation((prev) => ({
      ...prev,
      courses: [...prev.courses, ""],
    }));
  };

  const removeCourse = (i) => {
    setEducation((prev) => ({
      ...prev,
      courses: prev.courses.filter((_, index) => index !== i),
    }));
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setEducation((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async () => {
    // Validate fields
    const isEmpty =
      !education.degree?.trim() ||
      !education.institution?.trim() ||
      !education.year?.trim() ||
      education.courses?.some((c) => !c.trim());
    
    if (isEmpty) {
      alert("Please fill all fields.");
      return;
    }
    
    setIsSubmitting(true);
    try {
      const res = await Fetch.put(`education/${index}`, {
        degree: education.degree,
        institution: education.institution,
        year: education.year,
        courses: education.courses,
      });
      if (res.success === true) {
        refresh();
        onClose(false);
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
        onClose(false);
      }
    };
    
    const handleScroll = () => {
      if (modalContentRef.current) {
        const scrollTop = modalContentRef.current.scrollTop;
        setIsScrolled(scrollTop > 20);
      }
    };

    if (onClose) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = 'hidden';
      
      if (modalContentRef.current) {
        modalContentRef.current.addEventListener('scroll', handleScroll);
      }
      
      // Focus on first input
      setTimeout(() => {
        const firstInput = document.getElementById("degree");
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
  }, [onClose]);

  const scrollToTop = () => {
    if (modalContentRef.current) {
      modalContentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const formFields = [
    { 
      id: "degree", 
      label: "Degree / Certification", 
      value: education.degree,
      icon: <GraduationCap className="w-5 h-5" />,
      placeholder: "e.g., Bachelor of Science in Computer Science"
    },
    {
      id: "institution",
      label: "Institution",
      value: education.institution,
      icon: <Building className="w-5 h-5" />,
      placeholder: "e.g., University of Technology"
    },
    { 
      id: "year", 
      label: "Year of Completion", 
      value: education.year,
      icon: <Calendar className="w-5 h-5" />,
      placeholder: "e.g., 2020 - 2024"
    },
  ];

  return (
    <div
      ref={modelEduRef}
      className="fixed inset-0 z-50 bg-black/60 dark:bg-black/80 flex items-start md:items-center justify-center px-0 md:px-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === modelEduRef.current) {
          onClose(false);
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
                <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
                  <Edit2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white">
                    Edit Education
                  </h1>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 hidden md:block">
                    Update your educational qualification
                  </p>
                </div>
              </div>
              
              <button
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-300"
                onClick={() => onClose(false)}
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
            className="fixed bottom-6 right-6 z-30 p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 md:hidden"
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
              <GraduationCap className="w-5 h-5" />
              Education Details
            </h2>
            
            <div className="space-y-4">
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
                      onChange={handleChange}
                      className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl p-4 pl-12 focus:outline-none focus:border-purple-500 dark:focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-base"
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

          {/* Courses Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Relevant Courses
              </h2>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {education.courses?.length || 0} courses
              </span>
            </div>

            {(!education.courses || education.courses.length === 0) ? (
              <div className="text-center py-8 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-gray-500 dark:text-gray-400" />
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  No courses added yet
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Add relevant courses you studied
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {education.courses.map((course, i) => (
                  <div
                    key={i}
                    className="group bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 p-4 rounded-xl hover:border-purple-300 dark:hover:border-purple-700 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <textarea
                          value={course}
                          onChange={(e) => handleCourseChange(i, e.target.value)}
                          className="w-full bg-transparent text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none text-base resize-none min-h-[60px]"
                          placeholder="Enter course description..."
                        />
                      </div>
                      <button
                        onClick={() => removeCourse(i)}
                        className="p-2 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-all duration-300 group-hover:scale-110"
                        title="Remove course"
                      >
                        <Trash2 className="w-5 h-5 text-red-500 dark:text-red-400" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={addCourse}
              className="group flex items-center justify-center gap-2 w-full p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20 hover:from-purple-500/20 hover:to-pink-500/20 dark:hover:from-purple-500/30 dark:hover:to-pink-500/30 border-2 border-dashed border-purple-300 dark:border-purple-700 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
            >
              <Plus className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <span className="text-purple-600 dark:text-purple-400 font-medium">
                Add Course
              </span>
            </button>
          </div>

          {/* Preview Section */}
          {(education.degree || education.institution) && (
            <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl border border-gray-200 dark:border-gray-800">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Preview
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-gray-800 dark:text-white text-lg">
                    {education.degree || "Degree not set"}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {education.institution || "Institution not set"}
                    {education.year && ` • ${education.year}`}
                  </p>
                </div>
                {education.courses?.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-400 mb-2">
                      Courses:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {education.courses.slice(0, 3).map((course, i) => (
                        <span
                          key={i}
                          className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40 text-purple-700 dark:text-purple-300 text-sm px-3 py-1 rounded-full"
                        >
                          {course.length > 30 ? `${course.substring(0, 30)}...` : course}
                        </span>
                      ))}
                      {education.courses.length > 3 && (
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          +{education.courses.length - 3} more
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
                onClick={() => onClose(false)}
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
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl transition-all duration-300 font-medium shadow-lg hover:shadow-xl flex-1 sm:flex-none disabled:opacity-70 disabled:cursor-not-allowed"
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
                      Update Education
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

export default EducationCard;