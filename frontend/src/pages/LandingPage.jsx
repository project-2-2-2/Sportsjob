import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const LandingPage = ({ authUser }) => {
  const navigate = useNavigate();

  const handleEnter = () => {
    if (authUser) {
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="relative w-full h-[85vh] flex flex-col items-center justify-center bg-gradient-to-br from-blue-700 to-pink-600 shadow-lg">
          {/* Background Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>

          {/* Logo Above Title with Animation */}
          <motion.img
            src="/logo.svg"
            alt="Logo"
            className="relative z-10 w-32 h-32 mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />

          {/* Content */}
          <div className="relative z-10 text-center text-white px-6 max-w-3xl">
            {/* Title with Animation */}
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-5xl md:text-6xl font-extrabold tracking-wide text-yellow-300"
            >
              Welcome to <span className="text-purple-400">Sports Connect</span>
            </motion.h1>

            {/* Subtitle with Animation */}
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              className="mt-4 text-lg md:text-xl text-gray-300"
            >
              The ultimate sports networking platform. Connect, Compete, and Collaborate with sports enthusiasts worldwide!
            </motion.p>

            {/* Enter Button with Animation */}
            <motion.button
              whileHover={{ scale: 1.1, boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)" }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 px-6 py-3 bg-purple-500 text-gray-900 text-lg font-semibold rounded-lg shadow-lg hover:bg-purple-600 transition duration-300"
              onClick={handleEnter}
            >
              {authUser ? "Enter the App" : "Get Started"}
            </motion.button>
          </div>
        </div>
      </main>

      {/* Footer with Logo and Animation */}
      <motion.div
        className="flex items-center justify-center py-6 bg-gray-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <footer className="text-sm text-gray-400">
          © 2024 Sriman Akshat. All rights reserved.
        </footer>
        <img src="/logo.svg" alt="Logo" className="w-8 h-8 ml-2" />
      </motion.div>
    </div>
  );
};

export default LandingPage;