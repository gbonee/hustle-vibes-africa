
import React from 'react';
import { useVideoUpload } from './useVideoUpload';
import VideoPreview from './VideoPreview';
import VideoDropzone from './VideoDropzone';
import SelectedVideoPreview from './SelectedVideoPreview';
import UploadProgress from './UploadProgress';
import { Button } from "@/components/ui/button";
import { Upload, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Language } from '@/components/onboarding/LanguageSelector';

interface VideoUploaderProps {
  courseId: string;
  moduleId: number;
  onVideoUploaded: (moduleId: number, url: string) => void;
  existingVideoUrl?: string;
  language: Language;
}

const VideoUploader: React.FC<VideoUploaderProps> = ({ 
  courseId, 
  moduleId, 
  onVideoUploaded,
  existingVideoUrl,
  language = 'pidgin'
}) => {
  const {
    isUploading,
    progress,
    previewUrl,
    fileInputRef,
    handleUploadClick,
    handleFileChange,
    handleRemoveVideo,
    resetFileInput,
    selectedFile,
    uploadSelectedFile
  } = useVideoUpload({ 
    courseId, 
    moduleId, 
    onVideoUploaded, 
    language 
  });

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
        <div className="space-y-4">
          <SelectedVideoPreview 
            previewUrl={previewUrl}
            onCancel={resetFileInput}
            onReplace={handleUploadClick}
          />
          
          <div className="flex gap-2 mt-2">
            <Button 
              onClick={uploadSelectedFile}
              variant="default" 
              className="flex-1"
              disabled={isUploading || !selectedFile}
            >
              <Check size={16} className="mr-2" />
              Upload Now
            </Button>
          </div>
        </div>
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
