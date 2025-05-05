
import React, { useState, useRef } from 'react';
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface VideoUploaderProps {
  moduleTitle: string;
}

const VideoUploader: React.FC<VideoUploaderProps> = ({ moduleTitle }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('video/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload a video file.",
        variant: "destructive"
      });
      return;
    }

    // Check file size (limit to 1000MB)
    if (file.size > 1000 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Video must be less than 1000MB.",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsUploading(true);
      setProgress(0);
      
      // In a real app, upload to Supabase storage
      // For demo, we'll create a local URL
      const videoObjectUrl = URL.createObjectURL(file);
      setVideoUrl(videoObjectUrl);
      
      // Simulate progress
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 300);
      
      // Simulate upload completion after 3 seconds
      setTimeout(() => {
        clearInterval(interval);
        setProgress(100);
        setIsUploading(false);
        
        toast({
          title: "Video uploaded successfully",
          description: "Your practice video has been uploaded.",
          variant: "default"
        });
      }, 3000);
      
    } catch (error) {
      console.error("Error uploading video:", error);
      toast({
        title: "Upload failed",
        description: "There was a problem uploading your video. Please try again.",
        variant: "destructive"
      });
      setProgress(0);
      setIsUploading(false);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-bold mb-2">Mini-Challenge: {moduleTitle}</h3>
      <div className="bg-black p-4 rounded-lg border border-gray-800">
        <p>Post your practice video and tag @UsabiAI to win 500MB data!</p>
        
        {videoUrl ? (
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Your video:</h4>
            <video 
              className="w-full rounded-md border border-gray-700" 
              controls
              src={videoUrl}
              style={{ maxHeight: '200px' }}
            />
          </div>
        ) : null}
        
        <div className="mt-4">
          <input
            type="file"
            accept="video/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          
          {isUploading ? (
            <div className="space-y-2">
              <div className="w-full bg-gray-800 rounded-full h-2.5">
                <div 
                  className="bg-electric h-2.5 rounded-full transition-all duration-300" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-sm text-center text-gray-400">Uploading... {progress}%</p>
            </div>
          ) : (
            <Button 
              onClick={handleUploadClick}
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
            >
              <Upload size={16} />
              Upload Your Practice Video
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoUploader;
