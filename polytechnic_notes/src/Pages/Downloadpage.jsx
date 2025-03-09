import { useEffect, useState } from "react";
import { databases } from "../appwriteConfig"; // Import Appwrite configuration
import { Download } from "lucide-react";
import { useTheme } from "../ThemeContext";
import NotesList from "../Component/NotesList"; // Adjust path if needed
import { a } from "framer-motion/client";


function DownloadPage() {
  const [notes, setNotes] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [selectedSemester, setSelectedSemester] = useState("all");
  const { isDarkMode } = useTheme();
  const [loading, setLoading] = useState(true);

  const branches = ["all", "Information Technology", "Electronics", "Mechanical", "Computer", "Civil"];
  const semesters = ["all", "1", "2", "3", "4", "5", "6"];

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await databases.listDocuments(
          "67ba052f0033a5682d51",   // Replace with your Database ID
          "67ba0564002b5f20147e"   // Replace with your Collection ID
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

    const link = document.createElement('a');
    link.href = url;
    link.download = 'file.pdf';
    link.click();
  }
  const filteredNotes = notes.filter((note) => {
    const branchMatch = selectedBranch === "all" || note.branch.toLowerCase() === selectedBranch.toLowerCase();
    const semesterMatch = selectedSemester === "all" || note.semester.toString() === selectedSemester;
    return branchMatch && semesterMatch;
  });

  return (
    <div
      className={`min-h-screen relative pt-20 px-6 pb-12 transition-colors duration-300 ${isDarkMode ? "bg-gray-900 text-white" : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
        }`}
    >
      <div className="max-w-7xl mx-auto relative">
        <h2 className={`text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${isDarkMode ? "from-indigo-300 via-blue--400 to-indigo-300 mb-8 animate-fade-in" : "from-blue-600 via-purple-400 to-purple-600 mb-8 animate-fade-in"}`}>
          Browse Study Materials
        </h2>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className={`px-6 py-3 rounded-xl border border-white/20 shadow-lg focus:outline-none transition-all duration-300 ${isDarkMode ? "bg-gray-800 text-white hover:bg-gray-700" : "bg-white/40 text-gray-700 hover:bg-white/50"
              }`}
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
            className={`px-6 py-3 rounded-xl border border-white/20 shadow-lg focus:outline-none transition-all duration-300 ${isDarkMode ? "bg-gray-800 text-white hover:bg-gray-700" : "bg-white/40 text-gray-700 hover:bg-white/50"
              }`}
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
                <div key={note.$id} className="group relative animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <div
                    className={`relative p-6 rounded-2xl border border-white/20 shadow-xl transition-all duration-300 hover:-translate-y-1 ${isDarkMode ? "bg-gray-800 text-white hover:bg-gray-700" : "bg-white/60 backdrop-blur-xl hover:bg-white/80"
                      }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <h3 className="font-bold text-xl group-hover:text-indigo-300 transition-colors duration-300">
                          {note.title}
                        </h3>
                        <div className="space-y-1 ">
                          <p className="text-sm flex items-center  group-hover:text-indigo-300 transition-colors duration-300">
                            <span className="w-20">Branch:</span>
                            <span className="font-medium">{note.branch} Engineering</span>
                          </p>
                          <p className="text-sm flex items-center group-hover:text-indigo-300 transition-colors duration-300">
                            <span className="w-20">Semester:</span>
                            <span className="font-medium">{note.semester}</span>
                          </p>

                        </div>
                      </div>

                     
                      <button onClick={() => window.open(note.link, "_blank")}
                                        className={`p-3 rounded-xl transition-colors duration-300 ${
                                          isDarkMode ? "bg-gray-700" : "bg-indigo-100/80"
                                        }`}
                                      >
                                        <Download className="h-6 w-6 text-indigo-600 dark:text-indigo-300" />
                                      </button>

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
