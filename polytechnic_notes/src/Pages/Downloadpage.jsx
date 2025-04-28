import { useEffect, useState } from "react";
import { databases } from "../appwriteConfig"; // Import Appwrite configuration
import { Download } from "lucide-react";
import clsx from "clsx";
import { useTheme } from "../ThemeContext";


function DownloadPage() {
  const [notes, setNotes] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [selectedSemester, setSelectedSemester] = useState("all");
  const { isDarkMode } = useTheme();
  const [loading, setLoading] = useState(true);

  const branches = ["all", "Information Technology", "Electronics", "Mechanical", "Computer", "Civil"];
  const semesters = ["all", "1", "2", "3", "4", "5", "6"];
  
  // Adjusted branch colors with brighter gradients for light mode
  const branchColors = {
    "Information Technology": "from-blue-600 to-cyan-600", // Brighter colors
    "Electronics": "from-pink-600 to-fuchsia-600", // Brighter colors
    "Chemical": "from-green-600 to-emerald-600", // Brighter colors
    "Textile": "from-amber-600 to-orange-600", // Brighter colors
    "Mechanical": "from-purple-600 to-violet-600", // Brighter colors
    "Computer": "from-red-600 to-rose-600", // Brighter colors
    "Civil": "from-teal-600 to-lime-600", // Brighter colors for Civil
  };
  const branchColorClasses = {
    "Information Technology": "group-hover:text-cyan-400",
    "Electronics": "group-hover:text-pink-600",
    "Chemical": "group-hover:text-green-400",
    "Textile": "group-hover:text-orange-400",
    "Mechanical": "group-hover:text-violet-400",
    "Computer": "group-hover:text-rose-400",
    "Civil": "group-hover:text-lime-400",
  };
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await databases.listDocuments(
          import.meta.env.VITE_DATABASE_ID,   // Replace with your Database ID
          import.meta.env.VITE_COLLECTION_ID   // Replace with your Collection ID
        );
        setNotes(response.documents);
      } catch (error) {
        console.error("Error fetching notes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const downloadFile = (url) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = "file.pdf";
    link.click();
  };

  const filteredNotes = notes.filter((note) => {
    const branchMatch = selectedBranch === "all" || note.branch.toLowerCase() === selectedBranch.toLowerCase();
    const semesterMatch = selectedSemester === "all" || note.semester.toString() === selectedSemester;
    return branchMatch && semesterMatch;
  });

  return (
    <div
      className={`min-h-screen relative pt-20 px-6 pb-12 overflow-hidden transition-colors duration-300 ${isDarkMode ? "bg-gray-900 text-white" : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"}`}
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
      <div className="max-w-7xl mx-auto relative">
        <h2 className={`text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${isDarkMode ? "from-indigo-300 via-blue--400 to-indigo-300 mb-8 animate-fade-in" : "from-blue-600 via-purple-400 to-purple-600 mb-8 animate-fade-in"}`}>
          Browse Study Materials
        </h2>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className={`px-6 py-3 rounded-xl border border-white/20 shadow-lg focus:outline-none transition-all duration-300 ${isDarkMode ? "bg-gray-800 text-white hover:bg-gray-700" : "bg-white/40 text-gray-700 hover:bg-white/50"}`}
          >
            {branches.map((branch) => (
              <option key={branch} value={branch}>
                {branch === "all" ? "All Branches" : `${branch} Engineering`}
              </option>
            ))}
          </select>

          <select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            className={`px-6 py-3 rounded-xl border border-white/20 shadow-lg focus:outline-none transition-all duration-300 ${isDarkMode ? "bg-gray-800 text-white hover:bg-gray-700" : "bg-white/40 text-gray-700 hover:bg-white/50"}`}
          >
            {semesters.map((semester) => (
              <option key={semester} value={semester}>
                {semester === "all" ? "All Semesters" : `Semester ${semester}`}
              </option>
            ))}
          </select>
        </div>

        {/* Loading State */}
        {loading ? (
          <p className="text-center text-gray-500">Loading notes...</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.length > 0 ? (
              filteredNotes.map((note, index) => (
                // cards for notes download
                <div
                  key={note.$id}
                  className="group relative animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative">
                    {/* Background Glow */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${branchColors[note.branch] || "from-gray-400 to-gray-500"} rounded-2xl blur opacity-25 group-hover:opacity-50 transition-opacity duration-300`}
                    />

                    {/* Card */}
                    <div
                      className={`relative p-6 rounded-2xl backdrop-blur-xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 ${
                        isDarkMode ? "bg-gray-800 text-white" : "bg-white/80"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                        <h3
  className={clsx(
    "font-bold text-xl transition-colors duration-300 ",
    branchColorClasses[note.branch] || "group-hover:text-gray-400"
  )}
>
  {note.title}
</h3>
                          <div className="space-y-1">
                            <p className="text-sm flex items-center transition-colors duration-300">
                              <span className={clsx("w-20  duration-300 ", branchColorClasses[note.branch] || "group-hover:text-gray-400")} >Branch:</span>
                              <span className={clsx("font-medium  duration-300 ", branchColorClasses[note.branch] || "group-hover:text-gray-400")} >{note.branch} Engineering</span>
                            </p>
                            <p className="text-sm flex items-center group-hover:text-indigo-500 transition-colors duration-300">
                              <span className={clsx("w-20  duration-300 ", branchColorClasses[note.branch] || "group-hover:text-gray-400")} >Semester:</span>
                              <span className={clsx("font-medium  duration-300 ", branchColorClasses[note.branch] || "group-hover:text-gray-400")} >{note.semester}</span>
                            </p>
                          </div>
                        </div>

                        {/* Download Button */}
                        <button
                          onClick={() => window.open(note.link, "_blank")}
                          className={`flex flex-col items-center px-4 py-2 rounded-lg border border-white/20 transition-all duration-300 ${
                            isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-white/80 hover:bg-white/90"
                          }`}
                        >
                          <Download className={`h-5 w-5 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`} />
                          <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Download</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No notes available.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default DownloadPage;
