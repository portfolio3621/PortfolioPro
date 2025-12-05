import React, { useState } from "react";
import { HiPlus, HiTrash, HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi";

const Education = ({ education, setEducation }) => {
  const [newEducation, setNewEducation] = useState({
    degree: "",
    institution: "",
    year: "",
    courses: [""]
  });
  const [expanded, setExpanded] = useState(false);

  const handleAddEducation = () => {
    if (newEducation.degree && newEducation.institution) {
      setEducation([...education, newEducation]);
      setNewEducation({
        degree: "",
        institution: "",
        year: "",
        courses: [""]
      });
      setExpanded(false);
    }
  };

  const handleRemoveEducation = (index) => {
    const updatedEducation = [...education];
    updatedEducation.splice(index, 1);
    setEducation(updatedEducation);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEducation(prev => ({ ...prev, [name]: value }));
  };

  const handleCourseChange = (index, value) => {
    const updatedCourses = [...newEducation.courses];
    updatedCourses[index] = value;
    setNewEducation(prev => ({ ...prev, courses: updatedCourses }));
  };

  const handleAddCourse = () => {
    setNewEducation(prev => ({ ...prev, courses: [...prev.courses, ""] }));
  };

  const handleRemoveCourse = (index) => {
    if (newEducation.courses.length > 1) {
      const updatedCourses = [...newEducation.courses];
      updatedCourses.splice(index, 1);
      setNewEducation(prev => ({ ...prev, courses: updatedCourses }));
    }
  };

  return (
    <div className="space-y-4">
      {education.map((edu, index) => (
        <div key={index} className="bg-slate-50 border rounded-xl border-slate-200 p-4 shadow-md relative">
          <button
            onClick={() => handleRemoveEducation(index)}
            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
          >
            <HiTrash className="h-5 w-5" />
          </button>
          <h3 className="font-medium text-lg">{edu.degree}</h3>
          <p className="text-gray-600">{edu.institution}</p>
          {edu.year && <p className="text-gray-500 text-sm">{edu.year}</p>}
          {edu.courses.length > 0 && (
            <div className="mt-2">
              <h4 className="text-sm font-medium text-gray-700">Courses:</h4>
              <ul className="list-disc list-inside text-sm text-gray-600">
                {edu.courses.map((course, i) => (
                  <li key={i}>{course}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}

      <div className="bg-slate-50 border rounded-xl border-slate-200 p-4 shadow-md">
        <div className="flex justify-between items-center cursor-pointer" onClick={() => setExpanded(!expanded)}>
          <h3 className="font-medium">Add Education</h3>
          {expanded ? (
            <HiOutlineChevronUp className="h-5 w-5" />
          ) : (
            <HiOutlineChevronDown className="h-5 w-5" />
          )}
        </div>

        {expanded && (
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Degree
              </label>
              <input
                name="degree"
                value={newEducation.degree}
                onChange={handleInputChange}
                className="block w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 focus:outline-none focus:ring-2 transition duration-200"
                placeholder="Degree (e.g) B.Sc Computer Science"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Institution
              </label>
              <input
                name="institution"
                value={newEducation.institution}
                onChange={handleInputChange}
                className="block w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 focus:outline-none focus:ring-2 transition duration-200"
                placeholder="Name of the institution"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Year
              </label>
              <input
                name="year"
                value={newEducation.year}
                onChange={handleInputChange}
                className="block w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 focus:outline-none focus:ring-2 transition duration-200"
                placeholder="Year of completion"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Courses
              </label>
              <div className="space-y-2">
                {newEducation.courses.map((course, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      value={course}
                      onChange={(e) => handleCourseChange(index, e.target.value)}
                      className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 focus:outline-none focus:ring-2 transition duration-200"
                      placeholder="Course name"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveCourse(index)}
                      className="text-red-500 hover:text-red-700 p-2"
                    >
                      <HiTrash className="h-5 w-5" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddCourse}
                  className="flex items-center text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                >
                  <HiPlus className="mr-1" /> Add Course
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAddEducation}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center"
            >
              <HiPlus className="mr-2" /> Add Education
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Education;