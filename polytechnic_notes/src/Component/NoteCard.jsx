import React, { useState } from "react";
import { Download as DownloadIcon, TagIcon, BookOpen, Calendar, Grid } from "lucide-react";

const NoteCard = ({ note }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="bg-gray-800 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-5 space-y-4">
        <h3 className="font-semibold text-lg text-white line-clamp-2">{note.title}</h3>
        
        <div className="flex items-center space-x-4 text-sm text-gray-300">
          <div className="flex items-center">
            <Grid className="h-4 w-4 mr-1 text-gray-400" />
            {note.branch}
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1 text-gray-400" />
            {note.year}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {note.tags?.map((tag, index) => (
            <span key={index} className="bg-blue-900 text-blue-300 px-2 py-1 rounded-full text-xs flex items-center">
              <TagIcon className="h-3 w-3 mr-1" />
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-300">Semester {note.semester}</span>
          </div>
          <div className="text-sm text-gray-400">{note.downloads?.toLocaleString()} downloads</div>
        </div>

        <button className="w-full bg-blue-700 hover:bg-blue-800 text-white py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 group">
          <DownloadIcon className={`h-5 w-5 transform transition-transform duration-300 ${isHovered ? "translate-y-1" : ""}`} />
          <span>Download Notes</span>
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
