
import React from 'react';
import { useVideoUpload } from './useVideoUpload';
import VideoPreview from './VideoPreview';
import VideoDropzone from './VideoDropzone';
import SelectedVideoPreview from './SelectedVideoPreview';
import UploadProgress from './UploadProgress';
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface VideoUploaderProps {
  courseId: string;
  moduleId: number;
  onVideoUploaded: (moduleId: number, url: string) => void;
  existingVideoUrl?: string;
}

const VideoUploader: React.FC<VideoUploaderProps> = ({ 
  courseId, 
  moduleId, 
  onVideoUploaded,
  existingVideoUrl
}) => {
  const {
    isUploading,
    progress,
    previewUrl,
    fileInputRef,
    handleUploadClick,
    handleFileChange,
    handleRemoveVideo,
    resetFileInput
  } = useVideoUpload({ courseId, moduleId, onVideoUploaded });

  if (existingVideoUrl) {
    return (
      <VideoPreview 
        videoUrl={supabase.storage.from('module-videos').getPublicUrl(existingVideoUrl).data.publicUrl}
        onReplace={handleUploadClick}
        onRemove={() => handleRemoveVideo(existingVideoUrl)}
      />
    );
  }

  return (
    <div className="space-y-4">
      {previewUrl ? (
        <SelectedVideoPreview 
          previewUrl={previewUrl}
          onCancel={resetFileInput}
          onReplace={handleUploadClick}
        />
      ) : (
        <VideoDropzone onClick={handleUploadClick} />
      )}
      
      <input
        type="file"
        accept="video/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      
      <div className="mt-4">
        {isUploading ? (
          <UploadProgress progress={progress} />
        ) : previewUrl ? null : (
          <Button 
            onClick={handleUploadClick}
            variant="default"
            className="w-full"
            disabled={isUploading}
          >
            <Upload size={16} className="mr-2" />
            {isUploading ? "Uploading..." : "Upload Video"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default VideoUploader;
