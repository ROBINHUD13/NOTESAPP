import React, { useEffect, useState } from "react";
import { useTheme } from "../ThemeContext";
import { account } from "../appwriteConfig"; // Adjust path to your Appwrite config
import { Loader2 } from "lucide-react";

const UserDashboard = () => {
  const { isDarkMode } = useTheme();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await account.get();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    getUserData();
  }, []);

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 py-12 transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gradient-to-br from-blue-50 to-indigo-50"
      }`}
    >
      <div className="relative w-full max-w-md p-8 rounded-3xl shadow-xl backdrop-blur-md border border-white/10 transition-all duration-300 bg-white/80 dark:bg-gray-800/80">
        {/* Background blob */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />

        {loading ? (
          <div className="flex flex-col items-center">
            <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
            <p className="mt-4 text-lg">Loading user data...</p>
          </div>
        ) : user ? (
          <div className="text-center space-y-4 animate-fade-in">
            <img
              src={`https://cloud.appwrite.io/v1/avatars/initials?name=${encodeURIComponent(
                user.name || "U"
              )}`}
              alt="User avatar"
              className="w-28 h-28 rounded-full mx-auto shadow-lg object-cover"
            />
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
          </div>
        ) : (
          <p className="text-center text-red-500">User not logged in.</p>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
