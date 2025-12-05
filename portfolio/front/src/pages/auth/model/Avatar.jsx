import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import Fetch from "../../../Fetch";

const CLOUDINARY_URL = import.meta.env.VITE_APP_CLOUDINARY_URL;
const UPLOAD_PRESET = import.meta.env.VITE_APP_CLOUDINARY_UPLOAD_PRESET;

export default function AvatarUpload({ EditAvatarModelShow, refresh }) {
  const [imageUrl, setImageUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleAvatarChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      setUploading(true);
      const response = await axios.post(CLOUDINARY_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const url = response.data.secure_url;
      const resBackend = await Fetch.put(`update-user`, {
        avatarUrl: url,
      });
      setImageUrl(url);
      if (resBackend.success === true) {
        refresh();
        EditAvatarModelShow(false);
      }
    } catch (error) {
      console.error("Upload failed:", error.response?.data || error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleCancel = () => {
    EditAvatarModelShow(false);
  };

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        EditAvatarModelShow(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
  }, [EditAvatarModelShow]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        className="max-w-md w-full mx-auto mt-10 p-6 bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 text-center"
      >
        <motion.h2
          className="text-3xl font-bold text-gray-800 dark:text-white mb-6"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          Upload Avatar
        </motion.h2>

        <motion.label
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative inline-block cursor-pointer group"
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
          <div className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg transition-all">
            {uploading ? (
              <div className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                Uploading...
              </div>
            ) : (
              "Select Image"
            )}
          </div>
        </motion.label>

        <motion.button
          onClick={handleCancel}
          whileHover={{ scale: 1.05 }}
          className="mt-4 px-5 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium rounded-lg transition-all"
        >
          Cancel
        </motion.button>

        <AnimatePresence>
          {imageUrl && (
            <motion.div
              className="mt-6 flex flex-col items-center gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <img
                src={imageUrl}
                alt="Uploaded avatar"
                className="rounded-full w-32 h-32 object-cover border-4 border-blue-500 shadow-lg"
              />
              <span className="text-sm text-gray-500 dark:text-gray-400 max-w-xs break-words">
                {imageUrl}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
