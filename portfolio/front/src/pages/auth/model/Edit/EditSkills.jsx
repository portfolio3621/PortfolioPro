import React, { useState, useEffect } from "react";
import { IoIosClose } from "react-icons/io";
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
  }, [skillsData]);

  const handleChange = (i, field, value) => {
    const updated = [...skills];
    updated[i][field] = field === "level" ? parseInt(value) : value;
    setSkills(updated);
  };

  const addSkill = () => {
    setSkills([...skills, { name: "", level: 0 }]);
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
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-start overflow-y-auto px-4 py-10">
      <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white p-6 rounded-2xl w-full max-w-xl relative shadow-lg space-y-6">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-3xl text-gray-500 hover:text-red-500"
          onClick={() => onClose(false)}
        >
          <IoIosClose />
        </button>

        <h2 className="text-2xl font-bold text-center">Edit Skills</h2>

        {/* Skill List */}
        <div className="space-y-4">
          {skills.map((skill, i) => (
            <div key={i} className="flex items-center gap-3">
              <input
                type="text"
                value={skill.name}
                placeholder="Skill Name"
                onChange={(e) => handleChange(i, "name", e.target.value)}
                className="flex-1 border border-gray-300 dark:border-gray-700 p-2 rounded-md"
              />
              <input
                type="number"
                value={skill.level}
                min={0}
                max={100}
                placeholder="Level"
                onChange={(e) => handleChange(i, "level", e.target.value)}
                className="w-24 border border-gray-300 dark:border-gray-700 p-2 rounded-md"
              />
              <button
                onClick={() => removeSkill(i)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-between pt-4">
          <button
            onClick={addSkill}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Skill
          </button>

          <div className="space-x-2">
            <button
              onClick={handleSubmit}
              className="bg-indigo-600 text-white px-5 py-2 rounded hover:bg-indigo-700"
            >
              Save
            </button>
            <button
              onClick={() => onClose(false)}
              className="bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white px-5 py-2 rounded hover:bg-gray-400 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillCard;
