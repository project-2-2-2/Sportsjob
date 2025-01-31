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

    <div className="min-h-screen bg-base-100"> 
    <main className='max-w-7xl mx-auto px-4 py-6'> 
    <div className="relative w-full h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-3xl">
        {/* Title with Animation */}
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-extrabold tracking-wide"
        >
          Welcome to <span className="text-yellow-400">Sports Connect</span>
        </motion.h1>

        {/* Subtitle */}
        <p className="mt-4 text-lg md:text-xl text-gray-300">
          The ultimate sports networking platform. Connect, Compete, and Collaborate with sports enthusiasts worldwide!
        </p>

        {/* Enter Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 px-6 py-3 bg-yellow-400 text-gray-900 text-lg font-semibold rounded-lg shadow-lg hover:bg-yellow-500 transition duration-300"
          onClick={handleEnter}
        >
          {authUser ? "Enter the App" : "Get Started"}
        </motion.button>
      </div>
    </div>
    </main>
    <div>
   
   
    <div
      className={`min-h-screen   "bg-gray-100 text-black"
      } flex flex-col items-center justify-center p-6`}
    >
      <header className="flex items-center justify-between w-full max-w-4xl">
        <h1 className="text-3xl font-bold">🏀 Sports LinkedIn</h1>
        
      </header>

      <main className="flex flex-col items-center mt-12 text-center">
        <h2 className="text-4xl font-extrabold mb-4">
          Welcome to Your Sports Network! ⚽🏐🏈
        </h2>
        <p className="text-lg max-w-xl">
          Connect with athletes, coaches, and enthusiasts from all over the
          world. Share updates, achievements, and opportunities to grow in the
          sports industry.
        </p>
        <button className="mt-6 px-6 py-3 bg-blue-600 text-white hover:bg-blue-700">
          Get Started
        </button>
      </main>

      
    </div>
 
 

 

    </div>
    <footer className="mt-12 text-sm text-gray-500">
     © 2024 sriman. All rights reserved.
   </footer>
    </div>
 
  );
};

export default LandingPage;
