import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Book, Home, Upload, BookOpen, Library, Sun, Moon } from "lucide-react";
import { useTheme } from "../ThemeContext";
import { useAuth } from "../AuthContext";
import { avatars, account } from "../appwriteConfig"; // Import avatars & account from Appwrite

const Header = () => {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Home");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        try {
          const userData = await account.get(); // Fetch user data from Appwrite
          if (userData.prefs?.photo) {
            setProfilePicture(userData.prefs.photo); // Use Google OAuth profile picture
          } else {
            const avatarUrl = avatars.getInitials(userData.name || "User"); // Fallback Avatar
            setProfilePicture(avatarUrl);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserProfile();
  }, [user]);

  const navItems = [
    { label: "Home", href: "/hero", icon: Home },
    { label: "Browse", href: "/download", icon: Library },
    { label: "Upload", href: "/upload", icon: Upload },
    { label: "Syllabus", href: "/syllabus", icon: BookOpen },
  ];

  const handleNavClick = (label, href) => {
    setActiveTab(label);
    navigate(href);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <>
      <header className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-700 fixed w-full top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center cursor-pointer" onClick={() => navigate("/")}>
              <Book className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <span className="ml-2 text-xl font-bold text-gray-800 dark:text-white">PolyNotes <span className="text-sm border-2 border-black p-1">v1</span></span>
            </div>

            <nav className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.label, item.href)}
                  className={`text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors duration-200 ${
                    activeTab === item.label ? "font-semibold text-blue-600 dark:text-blue-400" : ""
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className="text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors duration-200"
              >
                {isDarkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
              </button>

              {user && (
                <div className="relative">
                  <img
                    src={profilePicture}
                    alt="Profile"
                    className="h-10 w-10 rounded-full cursor-pointer border-2 border-gray-300 dark:border-gray-600 hover:shadow-lg"
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                  />
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 min-w-[200px] max-w-[280px] bg-white dark:bg-gray-800 shadow-lg rounded-lg py-3 z-50 border border-gray-200 dark:border-gray-700">
                      <div className="px-4 pb-2 text-center">
                        <img
                          src={profilePicture}
                          alt="User Profile"
                          className="h-16 w-16 mx-auto rounded-full border-2 border-blue-500 dark:border-blue-400"
                        />
                        <p className="text-gray-900 dark:text-gray-200 font-medium mt-2">
                          {user?.name || "User"}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 text-sm truncate max-w-[240px] mx-auto">
                          {user?.email || "example@email.com"}
                        </p>
                      </div>
                      <div className="mt-2 border-t border-gray-200 dark:border-gray-700">
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className={`md:hidden fixed bottom-0 left-0 right-0 ${isDarkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"} border-t z-50`}>
        <nav className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.label;
            return (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.label, item.href)}
                className="flex flex-col items-center justify-center w-full h-full"
              >
                <div
                  className={`flex flex-col items-center transition-all duration-300 transform ${
                    isActive ? "scale-110 -translate-y-1" : ""
                  }`}
                >
                  <Icon className={`h-6 w-6 transition-colors duration-200 ${isActive ? "text-blue-600" : isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                  <span className={`text-xs mt-1 transition-colors duration-200 ${isActive ? "text-blue-600 font-medium" : isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                    {item.label}
                  </span>
                </div>
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default Header;

