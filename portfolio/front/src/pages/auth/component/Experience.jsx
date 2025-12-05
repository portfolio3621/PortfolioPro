import React, { useState } from "react";
import {
  HiPlus,
  HiTrash,
  HiOutlineChevronDown,
  HiOutlineChevronUp,
} from "react-icons/hi";

function Experience({ experiences, setExperiences }) {
  const [newExperience, setNewExperience] = useState({
    role: "",
    company: "",
    period: "",
    description: [""],
    achievements: [""],
  });
  const [expanded, setExpanded] = useState(false);
  const [noExperience, setNoExperience] = useState(false);

  const handleAddExperience = () => {
    if (
      newExperience.role.trim() &&
      newExperience.company.trim() &&
      newExperience.period.trim()
    ) {
      // Filter out empty descriptions
      const filteredDescriptions = newExperience.description.filter((desc) =>
        desc.trim()
      );

      setExperiences([
        ...experiences,
        {
          ...newExperience,
          description: filteredDescriptions.length
            ? filteredDescriptions
            : [""],
        },
      ]);
      setNewExperience({
        role: "",
        company: "",
        period: "",
        description: [""],
        achievements: [""],
      });
      setExpanded(false);
    }
  };

  const handleRemoveExperience = (index) => {
    const updatedExperiences = [...experiences];
    updatedExperiences.splice(index, 1);
    setExperiences(updatedExperiences);
  };

  const handleNoExperienceChange = (e) => {
    const checked = e.target.checked;
    setNoExperience(checked);
    if (checked) {
      setExperiences([]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExperience((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDescriptionChange = (index, value) => {
    const updatedDescriptions = [...newExperience.description];
    updatedDescriptions[index] = value;
    setNewExperience((prev) => ({
      ...prev,
      description: updatedDescriptions,
    }));
  };
  const handleAchievementChange = (index, value) => {
    const updatedAchievements = [...newExperience.achievements];
    updatedAchievements[index] = value;
    setNewExperience((prev) => ({
      ...prev,
      achievements: updatedAchievements,
    }));
  };

  const handleAddDescription = () => {
    setNewExperience((prev) => ({
      ...prev,
      description: [...prev.description, ""],
    }));
  };
  const handleAddAchievement = () => {
    setNewExperience((prev) => ({
      ...prev,
      achievements: [...prev.achievements, ""],
    }));
  };

  const handleRemoveDescription = (index) => {
    if (newExperience.description.length > 1) {
      const updatedDescriptions = [...newExperience.description];
      updatedDescriptions.splice(index, 1);
      setNewExperience((prev) => ({
        ...prev,
        description: updatedDescriptions,
      }));
    }
  };
  const handleRemoveAchievement = (index) => {
    if (newExperience.achievements.length > 1) {
      const updatedAchievements = [...newExperience.achievements];
      updatedAchievements.splice(index, 1);
      setNewExperience((prev) => ({
        ...prev,
        achievements: updatedAchievements,
      }));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={noExperience}
          onChange={handleNoExperienceChange}
          className="mr-2 h-4 w-4"
        />
        <label htmlFor="noExperience" className="text-sm text-gray-700">
          I don't have any work experience
        </label>
      </div>

      {!noExperience && (
        <>
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="bg-slate-50 border rounded-xl border-slate-200 p-4 shadow-md relative"
            >
              <button
                onClick={() => handleRemoveExperience(index)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              >
                <HiTrash className="h-5 w-5" />
              </button>
              <h3 className="font-medium text-lg">{exp.role}</h3>
              <p className="text-gray-600">{exp.company}</p>
              {exp.period && (
                <p className="text-gray-500 text-sm">{exp.period}</p>
              )}
              {exp.description.some((d) => d.trim()) && (
                <div className="mt-2">
                  <h4 className="text-sm font-medium text-gray-700">
                    Description:
                  </h4>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {exp.description
                      .filter((d) => d.trim())
                      .map((desc, i) => (
                        <li key={i}>{desc}</li>
                      ))}
                  </ul>
                </div>
              )}
              {exp.achievements.some((d) => d.trim()) && (
                <div className="mt-2">
                  <h4 className="text-sm font-medium text-gray-700">
                    Achievements:
                  </h4>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {exp.achievements
                      .filter((d) => d.trim())
                      .map((desc, i) => (
                        <li key={i}>{desc}</li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
          ))}

          <div className="bg-slate-50 border rounded-xl border-slate-200 p-4 shadow-md">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => setExpanded(!expanded)}
            >
              <h3 className="font-medium">Add Experience</h3>
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
                    Role*
                  </label>
                  <input
                    name="role"
                    value={newExperience.role}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 focus:outline-none focus:ring-2 transition duration-200"
                    placeholder="Role (e.g) Manager"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company*
                  </label>
                  <input
                    name="company"
                    value={newExperience.company}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 focus:outline-none focus:ring-2 transition duration-200"
                    placeholder="Name of the company"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Period*
                  </label>
                  <input
                    name="period"
                    value={newExperience.period}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 focus:outline-none focus:ring-2 transition duration-200"
                    placeholder="(e.g) 2020 - present"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <div className="space-y-2">
                    {newExperience.description.map((desc, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          value={desc}
                          onChange={(e) =>
                            handleDescriptionChange(index, e.target.value)
                          }
                          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 focus:outline-none focus:ring-2 transition duration-200"
                          placeholder="Description point"
                        />
                        {newExperience.description.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveDescription(index)}
                            className="text-red-500 hover:text-red-700 p-2"
                          >
                            <HiTrash className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={handleAddDescription}
                      className="flex items-center text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                    >
                      <HiPlus className="mr-1" /> Add Description Point
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Achievements
                  </label>
                  <div className="space-y-2">
                    {newExperience.achievements.map((achive, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input
                          value={achive}
                          onChange={(e) =>
                            handleAchievementChange(index, e.target.value)
                          }
                          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 focus:outline-none focus:ring-2 transition duration-200"
                          placeholder="Achivement point"
                        />
                        {newExperience.achievements.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveAchievement(index)}
                            className="text-red-500 hover:text-red-700 p-2"
                          >
                            <HiTrash className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={handleAddAchievement}
                      className="flex items-center text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                    >
                      <HiPlus className="mr-1" /> Add Achievemenet Point
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleAddExperience}
                  disabled={
                    !newExperience.role.trim() ||
                    !newExperience.company.trim() ||
                    !newExperience.period.trim()
                  }
                  className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center"
                >
                  <HiPlus className="mr-2" /> Add Experience
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Experience;
