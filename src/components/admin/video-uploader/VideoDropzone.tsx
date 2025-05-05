
import React from 'react';
import { Video } from "lucide-react";

interface VideoDropzoneProps {
  onClick: () => void;
}

const VideoDropzone: React.FC<VideoDropzoneProps> = ({ onClick }) => {
  return (
    <div 
      className="aspect-video bg-black rounded-lg flex flex-col items-center justify-center border border-dashed border-gray-600 cursor-pointer hover:border-electric transition-colors"
      onClick={onClick}
    >
      <Video className="h-12 w-12 mb-4 text-gray-500" />
      <p className="text-gray-500">Click to upload a video for this module</p>
      <p className="text-gray-600 text-sm mt-2">MP4, WebM or MOV, max 1000MB</p>
    </div>
  );
};

export default VideoDropzone;
