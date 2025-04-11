import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useTheme } from "../ThemeContext"; // Import global theme context
import { useAuth } from "../AuthContext"; 

const Login = () => {
  const { isDarkMode } = useTheme();
  const { user, login } = useAuth();
  const navigate = useNavigate(); // Initialize navigation
  const [typedText, setTypedText] = useState("");
  const fullText =
    "Your one-stop platform for sharing and accessing study notes. Collaborate with peers, upload your notes, and explore a vast collection of shared resources to boost your learning. Join the community and make studying easier, together!";
  const [currentIndex, setCurrentIndex] = useState(0);

  // Redirect to /hero if user is logged in
  useEffect(() => {
    if (user) {
      navigate("/hero", { replace: true }); // Redirect to hero page
    }
  }, [user, navigate]);

  // Typing animation effect
  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText((prevText) => prevText + fullText[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      setTimeout(() => {
        setTypedText("");
        setCurrentIndex(0);
      }, 3000);
    }
  }, [currentIndex, fullText]);

  // Dynamic styling based on dark mode
  const cursorColor = isDarkMode ? "text-blue-400" : "text-indigo-600";
  const paragraphTextColor = isDarkMode ? "text-gray-300" : "text-gray-600";
  const paragraphHighlightColor = isDarkMode
    ? "text-blue-300"
    : "text-indigo-600";

  // Function to enhance markdown-like syntax with styled spans
  const renderFormattedText = (text) => {
    return text.split(/(\*\*.*?\*\*)/g).map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <span key={index} className={`font-extrabold ${paragraphHighlightColor}`}>
            {part.slice(2, -2)}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div
      className={`min-h-screen relative overflow-hidden flex flex-col justify-center items-center transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gradient-to-br from-blue-50 to-indigo-50"
      }`}
    >
      {/* Animated Background Circles */}
      <div
        className={`absolute top-20 left-20 w-72 h-72 rounded-full filter blur-xl opacity-30 animate-blob ${
          isDarkMode ? "bg-blue-300 mix-blend-lighten" : "bg-blue-400 mix-blend-multiply"
        }`}
      />
      <div
        className={`absolute top-40 right-20 w-72 h-72 rounded-full filter blur-xl opacity-30 animate-blob animation-delay-2000 ${
          isDarkMode ? "bg-indigo-300 mix-blend-lighten" : "bg-indigo-400 mix-blend-multiply"
        }`}
      />
      <div
        className={`absolute -bottom-20 left-40 w-72 h-72 rounded-full filter blur-xl opacity-30 animate-blob animation-delay-4000 ${
          isDarkMode ? "bg-purple-300 mix-blend-lighten" : "bg-purple-400 mix-blend-multiply"
        }`}
      />

      {/* Centered Content */}
      <div className="w-full max-w-4xl px-4 z-10">
        <div className="text-center space-y-8">
          <h2 className={`text-5xl font-extrabold tracking-tight transition-colors ${
              isDarkMode ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Welcome to{" "}
            <span className={`text-transparent bg-clip-text ${
                isDarkMode ? "bg-gradient-to-r from-purple-400 to-blue-400"
                : "bg-gradient-to-r from-indigo-600 to-blue-500"
              }`}
            >
              PolyNotes Hub
            </span>
          </h2>

          {/* Typing Animation */}
          <p className={`max-w-2xl mx-auto text-lg font-bold text-center transition-colors duration-300 ${paragraphTextColor}`}>
            {renderFormattedText(typedText)}
            <span className={`animate-pulse ml-1 ${cursorColor}`}>|</span>
          </p>

          {/* Glowing Login Button */}
          <button onClick={login}
            className={`mt-6 px-6 py-2 text-lg font-semibold rounded-lg transition-all duration-300 ${
              isDarkMode 
                ? "bg-blue-500 text-white hover:bg-blue-600 shadow-blue-400 hover:shadow-lg hover:ring-4 hover:ring-blue-400/50" 
                : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-400 hover:shadow-lg hover:ring-4 hover:ring-indigo-400/50"
              }`}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
