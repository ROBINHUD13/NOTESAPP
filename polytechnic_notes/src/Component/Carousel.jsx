import React, { useState, useEffect } from "react";
import { Download, ChevronRight, ChevronLeft } from "lucide-react";
import sampleData from "../Data/PYQ.json";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const filteredNotes = sampleData;

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === filteredNotes.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? filteredNotes.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000); // Auto-sweep every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div className="relative flex items-center justify-center p-4">
      <div className="w-full max-w-lg overflow-hidden">
        {/* Carousel Container */}
        <div
          className="flex transition-transform duration-300"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {filteredNotes.map((note, index) => (
  <div
    key={note.id}
    className="flex-shrink-0 w-full"
    style={{ minWidth: "100%" }}
  >
    <div className="group relative p-6 h-full bg-gradient-to-r from-blue-500 to-indigo-500 backdrop-blur-md rounded-2xl border border-white/20  hover:translate-y-[-4px] transition-all duration-300">
      <div className="absolute  inset-0 bg-white rounded-2xl blur-sm  group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative ">
        <div className="flex items-center justify-center space-x-4 ">
          <div className="p-3 bg-blue-100/80 rounded-xl group-hover:bg-blue-200/80 transition-colors duration-300">
            <Download className="h-6 w-6 text-blue-600" 
            onClick={() => window.open(note.link, "_blank")} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
              {note.title}
            </h3>
            <p className="text-gray-600 text-sm flex items-center">
              <span className="w-20">Branch:</span>
              <span className="font-medium text-gray-800">
                {note.branch} Engineering
              </span>
            </p>
            <p className="text-gray-600 text-sm flex items-center">
              <span className="w-20">Semester:</span>
              <span className="font-medium text-gray-800">
                {note.semester}
              </span>
            </p>
            <p className="text-gray-600 text-sm flex items-center">
              <span className="w-20">Contributor:</span>
              <span className="font-medium text-gray-800">
                {note.contributor || "Unknown"}
              </span>
            </p>
          </div>
          
        </div>
      </div>
    </div>
  </div>
))}

        </div>
      </div>

      {/* Navigation Arrows */}
      <ChevronLeft
        onClick={handlePrev}
        className="h-6 w-6 absolute top-1/2 left-4 text-gray-400 cursor-pointer hover:text-gray-600 transform transition-transform duration-300"
      />
      <ChevronRight
        onClick={handleNext}
        className="h-6 w-6 absolute top-1/2 right-4 text-gray-400 cursor-pointer hover:text-gray-600 transform transition-transform duration-300"
      />
    </div>
  );
};

export default Carousel;
