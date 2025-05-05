
import React from 'react';
import { Button } from "@/components/ui/button";

interface SelectedVideoPreviewProps {
  previewUrl: string;
  onCancel: () => void;
  onReplace: () => void;
}

const SelectedVideoPreview: React.FC<SelectedVideoPreviewProps> = ({ 
  previewUrl, 
  onCancel, 
  onReplace 
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
        >
          Cancel
        </Button>
        <Button 
          onClick={onReplace}
          variant="default"
          className="flex-1"
        >
          Replace
        </Button>
      </div>
    </div>
  );
};

export default SelectedVideoPreview;
