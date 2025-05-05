
import React from 'react';

interface UploadProgressProps {
  progress: number;
}

const UploadProgress: React.FC<UploadProgressProps> = ({ progress }) => {
  return (
    <div className="space-y-2">
      <div className="w-full bg-gray-800 rounded-full h-2.5">
        <div 
          className="bg-electric h-2.5 rounded-full" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-sm text-center text-gray-400">Uploading... {progress}%</p>
    </div>
  );
};

export default UploadProgress;
