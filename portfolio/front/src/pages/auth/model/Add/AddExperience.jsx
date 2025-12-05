import React, { useState, useEffect, useRef } from "react";
import { IoIosClose } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import Fetch from "../../../../Fetch";

const ExperienceAddCard = ({ ExpModelShow, id, refresh }) => {
  const modelExRef = useRef();
  const [experience, setExperience] = useState({});

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

    try {
      const res = await Fetch.put(`experience/${id}`, {
        role,
        company,
        period,
        description,
        achievements,
      });
      if (res.success === true) {
        refresh();
        ExpModelShow(false);
      }
    } catch (err) {
      console.error(err);
    }
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
        ExpModelShow(false);
      }
    };
    if (ExpModelShow) {
      document.addEventListener("keydown", handleKeyDown);
      modelExRef.current?.focus();
    }
  }, [ExpModelShow]);

  const close = () => {
    ExpModelShow(false);
  };

  return (
    <div
      ref={modelExRef}
      className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-start justify-center overflow-y-auto px-4 py-10"
    >
      <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white p-8 rounded-2xl w-full max-w-3xl relative shadow-xl space-y-6 my-20">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-3xl text-gray-500 hover:text-red-600"
          onClick={close}
          aria-label="Close"
        >
          <IoIosClose />
        </button>

        <h1 className="text-3xl font-bold text-center mb-4">Edit Experience</h1>

        <div className="space-y-4">
          {/* Basic Fields */}
          {[
            { id: "role", label: "Role", type: "text" },
            { id: "company", label: "Company", type: "text" },
            { id: "period", label: "Period", type: "text" },
          ].map(({ id, label, type }) => (
            <div key={id} className="flex flex-col gap-1">
              <label htmlFor={id} className="font-medium text-sm">
                {label}
              </label>
              <input
                id={id}
                type={type}
                placeholder={label}
                onChange={(e) =>
                  setExperience((prev) => ({ ...prev, [id]: e.target.value }))
                }
                className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          ))}

          {/* Description Section */}
          <div className="border border-gray-300 dark:border-gray-700 p-4 rounded-lg space-y-3">
            <h4 className="text-md font-semibold">Descriptions</h4>
            {(experience.description || []).map((desc, i) => (
              <div className="flex justify-between">
                <textarea
                  key={i}
                  placeholder="Enter your description"
                  onChange={(e) => handleDescriptionChange(i, e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  onClick={() => removeDescription(i)}
                  className="text-red-500 text-2xl px-3 py-1 rounded hover:text-red-600 transition"
                >
                  <MdDeleteOutline />
                </button>
              </div>
            ))}
            <button
              onClick={addDescription}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
              + Add Description
            </button>
          </div>

          {/* Achievements Section */}
          <div className="border border-gray-300 dark:border-gray-700 p-4 rounded-lg space-y-3">
            <h4 className="text-md font-semibold">Achievements</h4>
            {(experience.achievements || []).map((ach, i) => (
              <div className="flex justify-between">
                <textarea
                  key={i}
                  placeholder="Enter your Achievement"
                  onChange={(e) => handleAchievementChange(i, e.target.value)}
                  className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  onClick={() => removeAchievement(i)}
                  className=" text-red-500 px-3 py-1 rounded text-2xl hover:text-red-600 transition"
                >
                  <MdDeleteOutline />
                </button>
              </div>
            ))}
            <button
              onClick={addAchievement}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
              + Add Achievement
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 pt-4">
          <button
            onClick={close}
            className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-5 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExperienceAddCard;
