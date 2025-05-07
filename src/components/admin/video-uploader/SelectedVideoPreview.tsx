
import React from 'react';
import { Button } from "@/components/ui/button";
import { Upload, X, Check } from "lucide-react";

interface SelectedVideoPreviewProps {
  previewUrl: string;
  onCancel: () => void;
  onReplace: () => void;
  onUpload: () => void;
  isUploading: boolean;
}

const SelectedVideoPreview: React.FC<SelectedVideoPreviewProps> = ({ 
  previewUrl, 
  onCancel, 
  onReplace,
  onUpload,
  isUploading
}) => {
  return (
    <div>
      <div className="aspect-video bg-black rounded-lg flex items-center justify-center border border-gray-800 overflow-hidden">
        <video 
          src={previewUrl}
          controls
          className="w-full h-full"
        />
      </div>
      <div className="flex gap-2 mt-4">
        <Button 
          onClick={onCancel}
          variant="outline"
          className="flex-1"
          disabled={isUploading}
        >
          <X size={16} className="mr-2" />
          Cancel
        </Button>
        <Button 
          onClick={onReplace}
          variant="secondary"
          className="flex-1"
          disabled={isUploading}
        >
          <Upload size={16} className="mr-2" />
          Choose Different Video
        </Button>
      </div>
      
      <Button 
        onClick={onUpload}
        variant="default" 
        className="w-full mt-2"
        disabled={isUploading}
      >
        <Check size={16} className="mr-2" />
        {isUploading ? "Uploading..." : "Upload Now"}
      </Button>
    </div>
  );
};

export default SelectedVideoPreview;
