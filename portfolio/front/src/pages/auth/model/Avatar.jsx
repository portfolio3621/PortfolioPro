import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosClose } from "react-icons/io";
import { Upload, User, Image, X, CheckCircle, AlertCircle, Camera, ChevronUp } from "lucide-react";
import Fetch from "../../../Fetch";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_APP_SUPABASE_URL,
  import.meta.env.VITE_APP_SUPABASE_ANON_KEY
);


export default function AvatarUpload({ EditAvatarModelShow, refresh, oldAvatarUrl }) {
  const [imageUrl, setImageUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const modalContentRef = useRef();
  const fileInputRef = useRef();

const handleAvatarChange = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    setError("Please select an image file");
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    setError("Image size should be less than 5MB");
    return;
  }

  try {
    setUploading(true);
    setError("");

    // 1️⃣ DELETE OLD AVATAR
    const oldFileName = oldAvatarUrl?.split("/").pop();
    if (oldFileName) {
      await supabase.storage
        .from("avatars")
        .remove([oldFileName]);
    }

    // 2️⃣ UPLOAD NEW AVATAR
    const fileExt = file.name.split(".").pop();
    const fileName = `Avatars/avatar-${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(fileName, file, {
        upsert: true,
        cacheControl: "3600",
      });

    if (uploadError) throw uploadError;

    // 3️⃣ GET PUBLIC URL
    const { data } = supabase.storage
      .from("avatars")
      .getPublicUrl(fileName);
    const avatarUrl = data.publicUrl;

    // 4️⃣ SAVE TO BACKEND
    const resBackend = await Fetch.put("update-user", {
      avatarUrl,
    });

    setImageUrl(avatarUrl);

    if (resBackend.success) {
      setTimeout(() => {
        refresh();
        EditAvatarModelShow(false);
      }, 1000);
    }

  } catch (error) {
    console.error(error);
    setError("Upload failed");
  } finally {
    setUploading(false);
  }
};
  const handleCancel = () => {
    EditAvatarModelShow(false);
  };

  const scrollToTop = () => {
    if (modalContentRef.current) {
      modalContentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        EditAvatarModelShow(false);
      }
    };
    
    const handleScroll = () => {
      if (modalContentRef.current) {
        const scrollTop = modalContentRef.current.scrollTop;
        setIsScrolled(scrollTop > 20);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    
    if (modalContentRef.current) {
      modalContentRef.current.addEventListener('scroll', handleScroll);
    }
    
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (modalContentRef.current) {
        modalContentRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [EditAvatarModelShow]);

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 dark:bg-black/80 flex items-start md:items-center justify-center px-0 md:px-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          EditAvatarModelShow(false);
        }
      }}
    >
      {/* Mobile backdrop with swipe down to close hint */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 md:hidden">
        <div className="w-12 h-1.5 bg-gray-400/50 dark:bg-gray-600/50 rounded-full"></div>
      </div>

      <motion.div 
        ref={modalContentRef}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white w-full h-full md:h-auto md:max-h-[90vh] md:max-w-xl md:rounded-3xl relative shadow-2xl border-0 md:border border-gray-100 dark:border-gray-800 overflow-y-auto"
      >
        {/* Sticky Header for Mobile */}
        <div className={`sticky top-0 z-20 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 transition-all duration-300 ${
          isScrolled ? 'py-3 shadow-sm' : 'py-4'
        }`}>
          <div className="px-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500">
                  <Camera className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white">
                    Update Avatar
                  </h1>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 hidden md:block">
                    Upload a new profile picture
                  </p>
                </div>
              </div>
              
              <button
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-300"
                onClick={handleCancel}
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
            className="fixed bottom-6 right-6 z-30 p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 md:hidden"
            aria-label="Scroll to top"
          >
            <ChevronUp className="w-5 h-5" />
          </button>
        )}

        {/* Content */}
        <div className="p-4 md:p-8">
          <div className="flex flex-col items-center space-y-8">
            {/* Upload Area */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-md space-y-6"
            >
              {/* Instructions */}
              <div className="text-center space-y-2">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 mb-4">
                  <User className="w-8 h-8 text-blue-500 dark:text-blue-400" />
                </div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                  Upload Profile Picture
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Choose an image to update your profile avatar
                </p>
              </div>

              {/* Upload Box */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
                  uploading 
                    ? 'border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/10' 
                    : 'border-gray-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600'
                }`}
                onClick={triggerFileInput}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                  disabled={uploading}
                />
                
                <div className="space-y-4">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
                    {uploading ? (
                      <div className="relative">
                        <div className="w-12 h-12 border-4 border-blue-200 dark:border-blue-800 rounded-full"></div>
                        <div className="absolute top-0 left-0 w-12 h-12 border-4 border-blue-500 dark:border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    ) : (
                      <Upload className="w-10 h-10 text-blue-500 dark:text-blue-400" />
                    )}
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                      {uploading ? "Uploading..." : "Click to upload"}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      PNG, JPG, GIF up to 5MB
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-6 py-3 rounded-xl font-medium ${
                        uploading
                          ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl'
                      } transition-all duration-300`}
                      disabled={uploading}
                    >
                      {uploading ? "Uploading..." : "Browse Files"}
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              {/* Image Preview */}
              <AnimatePresence>
                {imageUrl && !uploading && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4 overflow-hidden"
                  >
                    <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl border border-green-200 dark:border-green-800">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-400" />
                        <p className="text-sm font-medium text-green-700 dark:text-green-300">
                          Upload successful! Updating profile...
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-center space-y-4">
                      <div className="relative group">
                        <img
                          src={imageUrl}
                          alt="Uploaded avatar"
                          className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-xl"
                        />
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Your new profile picture
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 text-red-500 dark:text-red-400" />
                      <p className="text-sm text-red-600 dark:text-red-400">
                        {error}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Requirements */}
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Requirements:
                </h4>
                <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                    Square images work best (1:1 ratio)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                    Maximum file size: 5MB
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                    Supported formats: JPG, PNG, GIF
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                    Recommended size: 500x500px or larger
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Sticky Footer for Mobile */}
        <div className="sticky bottom-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-4 md:p-8">
          <div className="flex flex-col-reverse md:flex-row md:justify-between md:items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Your avatar will be visible to everyone
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleCancel}
                className="px-6 py-3 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 font-medium flex-1 sm:flex-none"
              >
                <span className="flex items-center justify-center gap-2">
                  <X className="w-4 h-4" />
                  Cancel
                </span>
              </button>
              <button
                onClick={triggerFileInput}
                disabled={uploading}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl transition-all duration-300 font-medium shadow-lg hover:shadow-xl flex-1 sm:flex-none disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <span className="flex items-center justify-center gap-2">
                  <Image className="w-4 h-4" />
                  Select Image
                </span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}