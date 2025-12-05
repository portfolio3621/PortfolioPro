import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NotFound404() {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-base-200 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.h1
        className="text-9xl font-extrabold text-primary"
        initial={{ scale: 0.8, rotate: -10 }}
        animate={{ scale: 1, rotate: 10 }}
        transition={{ yoyo: Infinity, duration: 1, ease: 'easeInOut' }}
      >
        404
      </motion.h1>

      <motion.p
        className="mt-4 text-2xl font-semibold text-secondary"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        Oops! Page not found.
      </motion.p>

      <motion.div
        className="mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <Link to="/" className="btn btn-primary btn-lg">
          Go Home
        </Link>
      </motion.div>
    </motion.div>
  );
}
