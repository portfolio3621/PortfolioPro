import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function AdminAccess() {
  const navigate = useNavigate();
  const [accessCode, setAccessCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleButtonClick = (value) => {
    if (value === "C") {
      setAccessCode("");
      setError("");
    } else if (value === "⌫") {
      setAccessCode((prev) => prev.slice(0, -1));
    } else if (accessCode.length < 6) {
      setAccessCode((prev) => prev + value);
    }
  };

  const handleSubmit = () => {
    if (accessCode.length < 6) {
      setError("Code must be 6 digits");
      return;
    }

    setIsLoading(true);
    setError("");

    // Simulate authentication
    setTimeout(() => {
      if (accessCode == import.meta.env.VITE_APP_PASS) {
        alert("Access granted! Redirecting to admin panel...");
        sessionStorage.setItem("access", true);
        navigate("/admin");
      } else {
        setError("Invalid access code");
        setAccessCode("");
      }
      setIsLoading(false);
    }, 1000);
  };

  const buttons = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "C", "0", "⌫"];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  const buttonVariants = {
    tap: { scale: 0.95 },
    hover: { scale: 1.05 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xs"
      >
        <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-700">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-blue-600 to-blue-800 p-5 text-center"
          >
            <h1 className="text-2xl font-bold text-white">SECURE ACCESS</h1>
            <p className="text-blue-200 text-sm mt-1">Administrator Portal</p>
          </motion.div>

          {/* Main Content */}
          <div className="p-5">
            {/* Code Display */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className={`mb-6 p-4 bg-gray-900 rounded-lg border ${
                error ? "border-red-500" : "border-gray-700"
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-400 text-sm">ENTER CODE</span>
                <span className="text-gray-400 text-sm">
                  {accessCode.length}/6
                </span>
              </div>
              <div className="flex space-x-2">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    className={`h-12 w-full rounded-md flex items-center justify-center text-2xl font-mono ${
                      i < accessCode.length
                        ? "bg-blue-600 text-white"
                        : "bg-gray-700 text-gray-400"
                    }`}
                  >
                    {i < accessCode.length ? "•" : "−"}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="alert alert-error mb-4 py-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="stroke-current shrink-0 h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-sm">{error}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Calculator Keypad */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-3 gap-3 mb-5"
            >
              {buttons.map((btn) => (
                <motion.button
                  key={btn}
                  variants={itemVariants}
                  whileTap="tap"
                  whileHover="hover"
                  type="button"
                  onClick={() => handleButtonClick(btn)}
                  className={`btn h-14 text-xl font-medium rounded-lg ${
                    btn === "C"
                      ? "btn-error"
                      : btn === "⌫"
                      ? "btn-warning"
                      : "btn-neutral bg-gray-700 hover:bg-gray-600 border-gray-600"
                  }`}
                >
                  {btn}
                </motion.button>
              ))}
            </motion.div>

            {/* Submit Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading || accessCode.length === 0}
              className={`btn btn-primary w-full py-4 text-lg font-bold rounded-lg ${
                isLoading ? "loading" : ""
              } ${
                accessCode.length === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <motion.span
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  VERIFYING...
                </motion.span>
              ) : (
                "ENTER"
              )}
            </motion.button>
          </div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-gray-900 px-5 py-3 text-center border-t border-gray-700"
          >
            <p className="text-gray-400 text-xs">
              For authorized personnel only. All access is logged.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
