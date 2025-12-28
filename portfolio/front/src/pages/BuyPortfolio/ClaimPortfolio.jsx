import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaLockOpen, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import Fetch from "../../Fetch.js";

export default function ClaimPortfolio() {
  const [token, setToken] = useState("");
  const [status, setStatus] = useState(null); // null, 'success', or 'error'

  const handleClaim = async () => {
    if (!token.trim()) {
      setStatus("error");
      return;
    }

    try {
      // Simulate API call
      const data = await Fetch.put(`bill/recover`,{ token })

      if (data.success) {
        setStatus("success");
        // redirect or show portfolio preview
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.log(err);
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 to-purple-200 dark:from-zinc-900 dark:to-zinc-800 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-zinc-900 shadow-xl rounded-2xl p-8 max-w-md w-full"
      >
        <div className="flex justify-center mb-6 text-blue-600 dark:text-white text-4xl">
          <FaLockOpen />
        </div>

        <h1 className="text-center text-2xl font-bold text-zinc-800 dark:text-white mb-2">
          Claim Your Portfolio
        </h1>
        <p className="text-center text-zinc-500 dark:text-zinc-400 mb-6">
          Enter your claim token to unlock access.
        </p>

        <input
          type="password"
          value={token}
          onChange={(e) => {
            setToken(e.target.value);
            setStatus(null);
          }}
          placeholder="Enter claim token"
          className="w-full px-4 py-3 rounded-xl border dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-white placeholder-zinc-500 dark:placeholder-zinc-400"
        />

        {status === "error" && (
          <p className="flex items-center gap-2 text-red-500 mt-3 text-sm">
            <FaExclamationCircle /> Invalid or expired token.
          </p>
        )}
        {status === "success" && (
          <p className="flex items-center gap-2 text-green-500 mt-3 text-sm">
            <FaCheckCircle /> Portfolio claimed successfully!
          </p>
        )}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClaim}
          className="mt-6 w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg font-medium rounded-xl transition"
        >
          Claim Now
        </motion.button>
      </motion.div>
    </div>
  );
}
