import React, { useState } from "react";
import { HiPlus, HiTrash } from "react-icons/hi";

const Skills = ({ skills = [], setSkills }) => {
  const [newSkill, setNewSkill] = useState({
    name: "",
    level: 0,
  });
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddSkill = () => {
    console.log("skills:", newSkill);
    if (newSkill.name) {
      setSkills([...skills, newSkill]);
      setNewSkill({ name: "", level: 0 });
      setShowAddForm(false);
    }
  };

  const handleRemoveSkill = (index) => {
    setSkills((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <h3 className="font-medium text-gray-700">Skills</h3>

      {/* Skills List */}
      <div className="space-y-3">
        {skills ? (
          skills.map((skill, index) => (
            <div
              key={index}
              className="bg-gray-50 p-3 rounded-lg border border-gray-200 relative"
            >
              <button
                onClick={() => handleRemoveSkill(index)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              >
                <HiTrash className="h-4 w-4" />
              </button>
              <div className="flex justify-between items-center">
                <span className="font-medium">{skill.name}</span>
                <span className="text-sm text-gray-500">{skill.level}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">No skills added yet</p>
        )}
      </div>

      {/* Add Skill Button */}
      {!showAddForm ? (
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <HiPlus className="mr-1" /> Add Skill
        </button>
      ) : (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Skill Name
              </label>
              <input
                type="text"
                value={newSkill.name}
                onChange={(e) =>
                  setNewSkill({ ...newSkill, name: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="e.g. JavaScript"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Proficiency: {newSkill.level}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={newSkill.level}
                onChange={(e) =>
                  setNewSkill({ ...newSkill, level: parseInt(e.target.value) })
                }
                className="w-full"
              />
            </div>

            <div className="flex space-x-2">
              <button
                type="submit"
                className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={handleAddSkill}
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Skills;
