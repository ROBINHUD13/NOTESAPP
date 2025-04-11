import React, { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { useTheme } from "../ThemeContext"; // Import dark mode theme context

const ProtectedRoute = () => {
  const { user } = useAuth();
  const { isDarkMode } = useTheme(); // Access dark mode state
  const [loading, setLoading] = useState(true);

  // Simulate loading delay to confirm auth state
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // Simulates auth state check
    return () => clearTimeout(timer);
  }, [user]);

  // If still loading, show a spinner with dark mode support
  if (loading) {
    return (
      <div className={`flex items-center justify-center h-screen transition-colors duration-300 ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
        }`}
      >
        <div className={`w-10 h-10 border-4 rounded-full animate-spin ${
            isDarkMode ? "border-white border-t-gray-500" : "border-blue-600 border-t-transparent"
          }`}
        ></div>
      </div>
    );
  }

  // If user is not authenticated, show access denied modal
  if (!user) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className={`p-6 rounded-lg shadow-lg transition-colors duration-300 ${
            isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
          }`}
        >
          <h2 className="text-lg font-semibold">Access Denied</h2>
          <p className="text-gray-600 dark:text-gray-400">You need to log in to access this page.</p>
          <button
            onClick={() => (window.location.href = "/")}
            className={`mt-4 px-4 py-2 rounded transition-colors duration-300 ${
                isDarkMode ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
