import React, { useState, useEffect, useRef } from "react";
import { IoIosClose } from "react-icons/io";
import Fetch from "../../../../Fetch";

const EducationCard = ({ edu, onClose, index, refresh }) => {
  const [education, setEducation] = useState({});
  const modelEduRef = useRef();
  useEffect(() => {
    setEducation(edu);
  }, [edu]);

  const handleCourseChange = (i, value) => {
    const updatedCourses = [...education.courses];
    updatedCourses[i] = value;
    setEducation((prev) => ({ ...prev, courses: updatedCourses }));
  };

  const addCourse = () => {
    setEducation((prev) => ({
      ...prev,
      courses: [...(prev.courses || []), ""],
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
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose(false);
      }
    };
    if (onClose) {
      document.addEventListener("keydown", handleKeyDown);
      modelEduRef.current?.focus();
    }
    setEducation(edu);
  }, [onClose]);

  return (
    <div
      ref={modelEduRef}
      className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-start justify-center overflow-y-auto px-4 py-10"
    >
      <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white p-6 rounded-2xl w-full max-w-xl relative shadow-lg space-y-6">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-4xl text-gray-500 hover:text-red-500 transition"
          onClick={() => onClose(false)}
          aria-label="Close"
        >
          <IoIosClose />
        </button>

        <h2 className="text-2xl font-bold text-center">Edit Education</h2>

        {/* Input Fields */}
        {[
          { id: "degree", label: "Degree", value: education.degree },
          {
            id: "institution",
            label: "Institution",
            value: education.institution,
          },
          { id: "year", label: "Year", value: education.year },
        ].map(({ id, label, value }) => (
          <div key={id} className="flex flex-col">
            <label htmlFor={id} className="font-medium mb-1">
              {label}
            </label>
            <input
              id={id}
              type="text"
              value={value}
              onChange={handleChange}
              className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>
        ))}

        {/* Courses */}
        <div className="border p-3 rounded-lg">
          <h4 className="text-sm font-medium mb-2">Courses:</h4>
          {education.courses?.map((course, i) => (
            <div key={i} className="flex gap-2 items-start mt-2">
              <textarea
                className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                value={course}
                onChange={(e) => handleCourseChange(i, e.target.value)}
              />
              <button
                onClick={() => removeCourse(i)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={addCourse}
            className="mt-3 border bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Add Course
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={handleSubmit}
            className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Save
          </button>
          <button
            onClick={() => onClose(false)}
            className="bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white px-5 py-2 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EducationCard;
