import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full py-20">
      {/* The Rounded Spinner */}
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600 border-t-transparent"></div>
      <p className="mt-4 text-gray-600 font-medium animate-pulse">Loading data...</p>
    </div>
  );
};

export default LoadingSpinner;