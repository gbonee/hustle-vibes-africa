
import React from 'react';
import { Button } from "@/components/ui/button";
import { X, Upload } from "lucide-react";

interface VideoPreviewProps {
  videoUrl: string;
  onReplace: () => void;
  onRemove: () => void;
}

const VideoPreview: React.FC<VideoPreviewProps> = ({ 
  videoUrl, 
  onReplace, 
  onRemove 
}) => {
  return (
    <div className="space-y-4">
      <div className="aspect-video bg-black rounded-lg flex items-center justify-center border border-gray-800 overflow-hidden">
        <video 
          src={videoUrl}
          controls
          className="w-full h-full"
        />
      </div>
      <div className="flex gap-2">
        <Button 
          onClick={onReplace}
          variant="default"
          className="flex-1"
        >
          <Upload size={16} className="mr-2" />
          Replace Video
        </Button>
        <Button 
          onClick={onRemove}
          variant="destructive"
        >
          <X size={16} className="mr-2" />
          Remove
        </Button>
      </div>
    </div>
  );
};

export default VideoPreview;
