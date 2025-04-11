import React from "react";
import { Download, Monitor, Cpu, Bookmark, Settings } from "lucide-react";
import Header from "../Component/Header";
import { useTheme } from "../ThemeContext"; // Import Theme Context

const SyllabusPage = () => {
  const { isDarkMode } = useTheme(); // Access dark mode state

  const branches = [
    {
      name: "Information Technology",
      icon: Monitor,
      color: "from-blue-500 to-cyan-500",
      link: "https://drive.google.com/file/d/19hlqY2Iur5ifvaI0IZkuMLxKcBa6EmM7/view?usp=sharing",
    },
    {
      name: "Electronics Engineering",
      icon: Cpu,
      color: "from-purple-500 to-pink-500",
      link: "https://drive.google.com/file/d/1hBZyzy1sNLQj4hGtaYtOZ7q4mph1pHaL/view?usp=sharing",
    },
    {
      name: "Textile Technology",
      icon: Bookmark,
      color: "from-amber-500 to-orange-500",
      link: "https://drive.google.com/file/d/1L3C1G7fmBO9-YSqV1wPY8OuTCEQzY5B5/view?usp=sharing",
    },
    {
      name: "Chemical Engineering",
      icon: Settings,
      color: "from-green-500 to-emerald-500",
      link: "https://drive.google.com/file/d/1xVr-QJUolFqvT_rC-BWIRCz9PNOL-hHI/view?usp=sharing",
    },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
      }`}
    >
      <Header />

      <main className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Title Section */}
          <div className="text-center mb-12 animate-fade-in">
            <h1
              className={`text-4xl  font-bold bg-clip-text text-transparent animate-fade-in ${
                isDarkMode ? "bg-gradient-to-r from-purple-300 to-blue-400" : "bg-gradient-to-r from-blue-600 to-indigo-600"
              }`}
            >
              Course Syllabus
            </h1>
            <p className={`text-lg transition-colors mt-3 duration-300 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              Download syllabus for each engineering branch
            </p>
          </div>

          {/* Syllabus Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {branches.map((branch, index) => {
              const Icon = branch.icon;
              return (
                <div key={branch.name} className="group animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="relative">
                    {/* Background Glow */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${branch.color} rounded-2xl blur opacity-25 group-hover:opacity-50 transition-opacity duration-300`}
                    />
                    
                    {/* Card */}
                    <div
                      className={`relative p-6 rounded-2xl backdrop-blur-xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 ${
                        isDarkMode ? "bg-gray-800 text-white" : "bg-white/60"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        {/* Icon + Branch Name */}
                        <div className="flex items-center space-x-4">
                          <div className={`p-3 rounded-xl bg-gradient-to-r ${branch.color}`}>
                            <Icon className="h-6 w-6 text-white" />
                          </div>
                          <h2 className="text-xl font-semibold">{branch.name}</h2>
                        </div>

                        {/* Download Button */}
                        <a
                          href={branch.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex flex-col items-center px-4 py-2 rounded-lg border border-white/20 transition-all duration-300 ${
                            isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-white/80 hover:bg-white/90"
                          }`}
                        >
                          <Download className={`h-5 w-5 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`} />
                          <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Download</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SyllabusPage;
