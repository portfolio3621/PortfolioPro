import React, { useState, useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import { Plus, Trash2, Save, X, Zap } from "lucide-react";
import Fetch from "../../../../Fetch";

const SkillCard = ({ skillsData, onClose, refresh }) => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    setSkills(skillsData || []);
    const keyEscToExitModel = (e) => {
      if (e.key === "Escape") {
        onClose(false);
      }
    };
    document.addEventListener("keydown", keyEscToExitModel);
    return () => document.removeEventListener("keydown", keyEscToExitModel);
  }, [skillsData, onClose]);

  const handleChange = (i, field, value) => {
    const updated = [...skills];
    updated[i][field] = field === "level" ? parseInt(value) || 0 : value;
    setSkills(updated);
  };

  const addSkill = () => {
    setSkills([...skills, { name: "", level: 50 }]);
  };

  const removeSkill = (i) => {
    const updated = skills.filter((_, index) => index !== i);
    setSkills(updated);
  };

  const handleSubmit = async () => {
    const isEmpty = skills.some(
      (skill) =>
        !skill.name.trim() ||
        isNaN(skill.level) ||
        skill.level < 0 ||
        skill.level > 100
    );

    if (isEmpty) {
      alert("Please enter valid skill names and levels (0–100).");
      return;
    }
    try {
      const res = await Fetch.put(`update-user`, {
        skills,
      });
      if (res.success === true) {
        refresh();
        onClose(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 dark:bg-black/70 flex justify-center items-start overflow-y-auto px-4 py-10 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white p-8 rounded-3xl w-full max-w-2xl relative shadow-2xl border border-gray-200 dark:border-gray-800">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Edit Skills
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Add, remove or update your skills and proficiency levels
              </p>
            </div>
          </div>
          <button
            onClick={() => onClose(false)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors duration-300"
          >
            <IoIosClose className="text-3xl text-gray-500 hover:text-red-500" />
          </button>
        </div>

        {/* Skill List */}
        <div className="space-y-4 mb-8 max-h-[400px] overflow-y-auto pr-2">
          {skills.length === 0 ? (
            <div className="text-center py-8 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
                <Plus className="w-8 h-8 text-gray-500 dark:text-gray-400" />
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                No skills added yet. Click "Add Skill" to get started!
              </p>
            </div>
          ) : (
            skills.map((skill, i) => (
              <div
                key={i}
                className="group bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 p-4 rounded-xl hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={skill.name}
                      placeholder="Enter skill name..."
                      onChange={(e) => handleChange(i, "name", e.target.value)}
                      className="w-full bg-transparent text-lg font-medium text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none"
                    />
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Proficiency Level
                        </span>
                        <span className="text-sm font-semibold bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-blue-400 dark:to-indigo-400 text-transparent bg-clip-text">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="relative pt-1">
                        <div className="overflow-hidden h-3 flex rounded-full bg-gray-200 dark:bg-gray-700">
                          <div
                            style={{ width: `${skill.level}%` }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 dark:from-blue-400 dark:via-blue-500 dark:to-indigo-500 transition-all duration-700"
                          ></div>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={skill.level}
                          onChange={(e) => handleChange(i, "level", e.target.value)}
                          className="absolute top-0 w-full h-3 opacity-0 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeSkill(i)}
                    className="p-2 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-all duration-300 group-hover:scale-110"
                    title="Remove skill"
                  >
                    <Trash2 className="w-5 h-5 text-red-500 dark:text-red-400" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-gray-200 dark:border-gray-800">
          <button
            onClick={addSkill}
            className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            <span className="font-medium">Add New Skill</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onClose(false)}
              className="px-6 py-3 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 flex items-center gap-2"
            >
              <X className="w-5 h-5" />
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center gap-2"
            >
              <Save className="w-5 h-5" />
              Save Changes
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-8 p-4 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800/50 dark:to-blue-900/20 rounded-xl">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {skills.length}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Skills</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {Math.max(...skills.map(s => s.level), 0)}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Highest Level</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {skills.length > 0 
                  ? Math.round(skills.reduce((a, b) => a + b.level, 0) / skills.length) 
                  : 0
                }%
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Avg. Proficiency</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillCard;