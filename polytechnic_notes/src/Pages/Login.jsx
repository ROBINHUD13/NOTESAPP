import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useTheme } from "../ThemeContext"; // Import global theme context
import { useAuth } from "../AuthContext";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import AnimatedSection from "../Component/AnimatedSection"; // Import the AnimatedSection component
import ScrollWheel from "../Component/ScrollWheel";



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
      className={`relative overflow-hidden flex flex-col transition-colors duration-300 ${isDarkMode ? "bg-gray-900 text-white" : "bg-gradient-to-br from-blue-50 to-indigo-50"
        }`}
    >
      {/* Animated Background Circles */}
      <div
        className={`absolute top-20 left-20 w-72 h-72 rounded-full filter blur-xl opacity-30 animate-blob ${isDarkMode ? "bg-blue-300 mix-blend-lighten" : "bg-blue-400 mix-blend-multiply"
          }`}
      />
      <div
        className={`absolute top-40 right-20 w-72 h-72 rounded-full filter blur-xl opacity-30 animate-blob animation-delay-2000 ${isDarkMode ? "bg-indigo-300 mix-blend-lighten" : "bg-indigo-400 mix-blend-multiply"
          }`}
      />
      <div
        className={`absolute -bottom-20 left-40 w-72 h-72 rounded-full filter blur-xl opacity-30 animate-blob animation-delay-4000 ${isDarkMode ? "bg-purple-300 mix-blend-lighten" : "bg-purple-400 mix-blend-multiply"
          }`}
      />
      {/* Section 1: Centered Hero Content */}
      <section className="min-h-screen flex flex-col justify-center items-center relative">


        {/* Centered Content */}
        <div className="w-full max-w-4xl px-4 z-10 text-center space-y-8">
          <h2 className={`text-5xl font-extrabold tracking-tight transition-colors ${isDarkMode ? "text-gray-200" : "text-gray-800"
            }`}
          >
            Welcome to{" "}
            <span className={`text-transparent bg-clip-text ${isDarkMode ? "bg-gradient-to-r from-purple-400 to-blue-400"
              : "bg-gradient-to-r from-indigo-600 to-blue-500"
              }`}
            >
              E-Library Hub
            </span>
          </h2>

          <p className={`max-w-2xl mx-auto text-lg font-bold text-center transition-colors duration-300 ${paragraphTextColor}`}>
            {renderFormattedText(typedText)}
            <span className={`animate-pulse ml-1 ${cursorColor}`}>|</span>
          </p>

          <button onClick={login}
            className={`mt-6 px-6 py-2 text-lg font-semibold rounded-lg transition-all duration-300 ${isDarkMode
              ? "bg-blue-500 text-white hover:bg-blue-600 shadow-blue-400 hover:shadow-lg hover:ring-4 hover:ring-blue-400/50"
              : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-400 hover:shadow-lg hover:ring-4 hover:ring-indigo-400/50"
              }`}
          >
            Login
          </button>
        </div>
      </section>

      {/* Section 2: Image and Text Box */}
      <section className="min-h-screen flex flex-col justify-center items-center px-4 z-[1] ">
        <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-8 w-full max-w-6xl">
          {/* Image Column */}
          <div className="w-full md:w-1/2">
            <AnimatedSection direction="left">
              <img
                src="/easy search.webp"
                alt="Study Collaboration"
                className="w-[500px] h-[300px] object-cover rounded-xl  shadow-lg"
              />
            </AnimatedSection>
          </div>

          {/* Text Column */}
          <div className="w-full md:w-1/2">
            <AnimatedSection direction="right">
              <div className="text-left space-y-4">
                <h3 className={`text-2xl font-bold ${isDarkMode ? "text-blue-300" : "text-indigo-600"}`}>
                  🔍 Easy Search & Browse
                </h3>
                <p className={`text-base ${paragraphTextColor}`}>
                  Find relevant notes instantly using our smart search functionality. Filter by branches and semesters. Whether it’s physics formulas, literature summaries, or exam prep guides—you’re only a few clicks away from accessing helpful resources.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
        <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-8 w-full max-w-6xl">
          {/* Text Column */}
          <div className="w-full md:w-1/2">
            <AnimatedSection direction="right">
              <div className="text-left space-y-4">
                <h3 className={`text-2xl font-bold ${isDarkMode ? "text-blue-300" : "text-indigo-600"}`}>
                  🎓 Study Together, Grow Together
                </h3>
                <p className={`text-base ${paragraphTextColor}`}>
                  E-Library Hub is more than a notes repository—it’s a learning community. Share knowledge, learn from others, and support your fellow learners. We believe that when we collaborate, everyone grows stronger together.
                </p>
              </div>
            </AnimatedSection>
          </div>
          {/* Image Column */}
          <div className="w-full md:w-1/2">
            <AnimatedSection direction="left">
              <img
                src="/stady togather.webp"
                alt="Study Collaboration"
                className="w-[500px] h-[300px] object-cover rounded-xl shadow-lg"
              />
            </AnimatedSection>
          </div>


        </div>
        <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-8 w-full max-w-6xl">
          {/* Image Column */}
          <div className="w-full md:w-1/2">
            <AnimatedSection direction="left">
              <img
                src="/darklight.jpg"
                alt="Study Collaboration"
                className="w-[500px] h-[300px]  flex justify-center object-cover items-center rounded-xl shadow-lg"
              />
            </AnimatedSection>
          </div>

          {/* Text Column */}
          <div className="w-full md:w-1/2">
            <AnimatedSection direction="right">
              <div className="text-left space-y-4">
                <h3 className={`text-2xl font-bold ${isDarkMode ? "text-blue-300" : "text-indigo-600"}`}>
                  🌗 Light & Dark Theme Support
                </h3>
                <p className={`text-base ${paragraphTextColor}`}>
                  Customize your experience your way. Whether you prefer a clean, bright interface or a sleek, dark aesthetic, E-Library Hub has you covered.
                  Switch seamlessly between light and dark mode to match your environment, reduce eye strain, or simply suit your vibe. Your selected theme is remembered, so the site always feels just right when you return.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
        <div className="mt-8 mb-20 flex flex-col md:flex-row items-center justify-center gap-8 w-full max-w-6xl">
          {/* Text Column */}
          <div className="w-full md:w-1/2">
            <AnimatedSection direction="right">
              <div className="text-left space-y-4">
                <h3 className={`text-2xl font-bold ${isDarkMode ? "text-blue-300" : "text-indigo-600"}`}>
                  💡 Ready to Get Started?
                </h3>
                <p className={`text-base ${paragraphTextColor}`}>
                  Join the E-Library Hub today and become part of a growing academic network. Whether you're here to contribute or explore, your journey to better learning begins now.
                </p>
              </div>
            </AnimatedSection>
          </div>
          {/* Image Column */}
          <div className="w-full md:w-1/2">
            <AnimatedSection direction="left">
              <img
                src="/get strted.webp"
                alt="Study Collaboration"
                className="w-[500px] h-[300px] object-cover rounded-xl shadow-lg"
              />
            </AnimatedSection>
          </div>
        </div>
      </section>
      <div className="fixed top-3/4 right-[-22.5rem] -translate-y-1/2 transform h-[30rem] w-[35rem] overflow-hidden  z-0">
        <ScrollWheel />
      </div>


    </div>
  );

};

export default Login;
