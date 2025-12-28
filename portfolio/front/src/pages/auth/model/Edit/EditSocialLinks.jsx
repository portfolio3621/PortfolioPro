import React, { useState } from "react";
import Fetch from "../../../../Fetch.js";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiX,
  FiLink,
  FiPlus,
  FiTrash2,
  FiGlobe,
  FiLinkedin,
  FiGithub,
  FiInstagram,
  FiFacebook,
  FiYoutube,
  FiGitlab,
  FiDribbble,
  FiFigma,
  FiSlack,
  FiTwitch,
  FiMessageSquare
} from "react-icons/fi";
import { FaDiscord } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function EditSocialLinksModal({ onClose, refresh, initialSocialLinks }) {
  const [socialLinks, setSocialLinks] = useState(
    initialSocialLinks instanceof Map 
      ? Object.fromEntries(initialSocialLinks) 
      : initialSocialLinks || {}
  );
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [url, setUrl] = useState("");

  const platformOptions = [
    { id: "linkedin", name: "LinkedIn", icon: FiLinkedin, color: "text-[#0A66C2]", bgColor: "bg-[#0A66C2]/10" },
    { id: "github", name: "GitHub", icon: FiGithub, color: "text-gray-900 dark:text-white", bgColor: "bg-gray-900/10 dark:bg-white/10" },
    { id: "x", name: "X", icon: FaXTwitter, color: "text-black", bgColor: "bg-[#1DA1F2]/10" },
    { id: "instagram", name: "Instagram", icon: FiInstagram, color: "text-[#E4405F]", bgColor: "bg-[#E4405F]/10" },
    { id: "facebook", name: "Facebook", icon: FiFacebook, color: "text-[#1877F2]", bgColor: "bg-[#1877F2]/10" },
    { id: "youtube", name: "YouTube", icon: FiYoutube, color: "text-[#FF0000]", bgColor: "bg-[#FF0000]/10" },
    { id: "gitlab", name: "GitLab", icon: FiGitlab, color: "text-[#FC6D26]", bgColor: "bg-[#FC6D26]/10" },
    { id: "dribbble", name: "Dribbble", icon: FiDribbble, color: "text-[#EA4C89]", bgColor: "bg-[#EA4C89]/10" },
    { id: "figma", name: "Figma", icon: FiFigma, color: "text-[#F24E1E]", bgColor: "bg-[#F24E1E]/10" },
    { id: "slack", name: "Slack", icon: FiSlack, color: "text-[#4A154B]", bgColor: "bg-[#4A154B]/10" },
    { id: "discord", name: "Discord", icon: FaDiscord, color: "text-[#5865F2]", bgColor: "bg-[#5865F2]/10" },
    { id: "twitch", name: "Twitch", icon: FiTwitch, color: "text-[#9146FF]", bgColor: "bg-[#9146FF]/10" },
    { id: "telegram", name: "Telegram", icon: FiMessageSquare, color: "text-[#26A5E4]", bgColor: "bg-[#26A5E4]/10" },
    { id: "website", name: "Website", icon: FiGlobe, color: "text-emerald-600", bgColor: "bg-emerald-600/10" },
  ];

  const handleAdd = () => {
    if (selectedPlatform && url.trim()) {
      setSocialLinks((prev) => ({
        ...prev,
        [selectedPlatform.toLowerCase()]: url.trim(),
      }));
      setSelectedPlatform("");
      setUrl("");
    }
  };

  const handleRemove = (platform) => {
    const updated = { ...socialLinks };
    delete updated[platform];
    setSocialLinks(updated);
  };

  const handleSave = async () => {
    try {
      await Fetch.put("/update-social-links", { socialLinks });
      refresh();
      onClose(false);
    } catch (err) {
      console.error("Failed to update social links:", err);
      alert("Failed to save. Please try again.");
    }
  };

  const getPlatformInfo = (platformId) => {
    return platformOptions.find(p => p.id === platformId) || { name: platformId, icon: FiLink, color: "text-gray-600", bgColor: "bg-gray-100" };
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 shadow-2xl max-w-full w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Social Links</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your social media profiles</p>
        </div>
        <button
          onClick={() => onClose(false)}
          className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <FiX className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      {/* Current Links */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Current Links</h3>
        <AnimatePresence>
          {Object.entries(socialLinks).length > 0 ? (
            <div className="space-y-2">
              {Object.entries(socialLinks).map(([platform, url]) => {
                const platformInfo = getPlatformInfo(platform);
                const Icon = platformInfo.icon;
                
                return (
                  <motion.div
                    key={platform}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${platformInfo.bgColor}`}>
                        <Icon className={`w-5 h-5 ${platformInfo.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900 dark:text-white">
                            {platformInfo.name}
                          </span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                            {platform}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate max-w-[200px]">
                          {url}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemove(platform)}
                      className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors group"
                    >
                      <FiTrash2 className="w-4 h-4 text-red-400 group-hover:text-red-600" />
                    </button>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl">
              <FiLink className="w-12 h-12 text-gray-400 dark:text-gray-600 mx-auto mb-3" />
              <p className="text-gray-500 dark:text-gray-400">No social links added yet</p>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Add New Link */}
      <div className="mb-6 bg-gradient-to-r from-gray-50 to-indigo-50 dark:from-gray-800/50 dark:to-indigo-900/10 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Add New Link</h3>
        
        <div className="space-y-4">
          {/* Platform Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Platform
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {platformOptions.map((platform) => (
                <button
                  key={platform.id}
                  onClick={() => setSelectedPlatform(platform.id)}
                  className={`flex flex-col items-center p-3 rounded-xl border transition-all ${
                    selectedPlatform === platform.id
                      ? `${platform.bgColor} border-indigo-500 ring-1 ring-indigo-500`
                      : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  <platform.icon className={`w-5 h-5 mb-2 ${platform.color}`} />
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate w-full text-center">
                    {platform.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* URL Input */}
          {selectedPlatform && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-2"
            >
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                URL for {getPlatformInfo(selectedPlatform).name}
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder={`https://${selectedPlatform}.com/yourprofile`}
                  className="flex-1 p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                />
                <button
                  onClick={handleAdd}
                  disabled={!url.trim()}
                  className={`px-4 py-3 rounded-xl flex items-center gap-2 font-medium transition-all ${
                    url.trim()
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <FiPlus className="w-4 h-4" />
                  Add
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl mb-6">
        <div className="text-center">
          <div className="text-lg font-bold text-gray-900 dark:text-white">
            {Object.keys(socialLinks).length}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Total Links</div>
        </div>
        <div className="w-px h-8 bg-gray-300 dark:bg-gray-700" />
        <div className="text-center">
          <div className="text-lg font-bold text-gray-900 dark:text-white">
            {platformOptions.filter(p => socialLinks[p.id]).length}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Platforms Used</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={() => onClose(false)}
          className="flex-1 px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 font-medium transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={Object.keys(socialLinks).length === 0}
          className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all ${
            Object.keys(socialLinks).length > 0
              ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:shadow-lg"
              : "bg-gray-300 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
          }`}
        >
          Save Changes
        </button>
      </div>
    </motion.div>
  );
}