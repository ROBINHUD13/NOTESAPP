import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../ThemeContext"; // Import global theme context
import { Upload, Download, ChevronRight } from "lucide-react";

const Hero = () => {
  const { isDarkMode } = useTheme(); // Access dark mode state
 


  return (
    <div
      className={`min-h-screen relative overflow-hidden transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gradient-to-br from-blue-50 to-indigo-50"
      }`}
    >
      {/* Animated background circles */}
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

      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-16 pb-24 relative">
        <div className="text-center space-y-6 animate-fade-in">
        <h2
  className={`text-5xl mt-10 font-extrabold tracking-tight transition-colors ${
    isDarkMode ? "text-gray-200" : "text-gray-800"
  }`}
>
  Welcome to{" "}
  <span
    className={`text-transparent bg-clip-text ${
      isDarkMode
        ? "bg-gradient-to-r from-purple-400 to-blue-400"
        : "bg-gradient-to-r from-indigo-600 to-blue-500"
    }`}
  >
     E-Library Hub
  </span>
</h2>

          <p
            className={`text-xl max-w-2xl mx-auto leading-relaxed transition-colors ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Share and discover quality study materials with fellow polytechnic students
          </p>
        </div>

        <div className="flex justify-center mt-12">
          <div className="relative w-64 h-64 animate-float">
          {isDarkMode ? 
           <img
              src="/darklogo.jpg"
              alt="Illustration"
              className="w-full h-full rounded-3xl object-cover shadow-2xl"
            /> :  
          <img
              src="/hero icon.jpg"
              alt="Illustration"
              className="w-full h-full rounded-3xl object-cover shadow-2xl"
            />}
           
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        </div>

        

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-8 mt-20 max-w-4xl mx-auto">
          <Link to="/upload" className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur-sm opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
            <div
              className={`relative p-6 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl hover:translate-y-[-4px] transition-all duration-300 ${
                isDarkMode ? "bg-gray-800 text-white" : "bg-white/90"
              }`}
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`p-3 rounded-xl transition-colors duration-300 ${
                    isDarkMode ? "bg-gray-700" : "bg-blue-100/80"
                  }`}
                >
                  <Upload className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Contribute Notes</h3>
                  <p className="text-gray-600 dark:text-gray-300">Share your study materials</p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400 dark:text-gray-300 ml-auto transform group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </Link>

          <Link to="/download" className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur-sm opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
            <div
              className={`relative p-6 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl hover:translate-y-[-4px] transition-all duration-300 ${
                isDarkMode ? "bg-gray-800 text-white" : "bg-white/90"
              }`}
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`p-3 rounded-xl transition-colors duration-300 ${
                    isDarkMode ? "bg-gray-700" : "bg-indigo-100/80"
                  }`}
                >
                  <Download className="h-6 w-6 text-indigo-600 dark:text-indigo-300" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Browse Notes</h3>
                  <p className="text-gray-600 dark:text-gray-300">Find study materials</p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400 dark:text-gray-300 ml-auto transform group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </Link>
        </div>
      </div>

  

    </div>
  );
};

export default Hero;
