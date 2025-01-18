// import React from 'react';

// export const LoadingSpinner: React.FC = () => (
//   <div className="flex justify-center items-center h-screen">
//     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//   </div>
// );
import React, { useEffect, useState } from "react";
import "./LoadingSpinner.css";

const LoadingSpinner: React.FC = () => {
  const [progress, setProgress] = useState<number>(0); // Progress state with type number

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 2 : 200)); // Increment progress
    }, 60); // 2 seconds total duration

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div className="loader-container">
      {/* Image */}
      <img
        src="https://i.ibb.co/F7dWbSf/nexus.png" // Replace with your image URL
        alt="Loader"
        className="loader-image"
      />

      {/* Progress Bar */}
      <div className="progress-bar">
        <div
          className="progress-bar-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;