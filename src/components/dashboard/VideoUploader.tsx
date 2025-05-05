
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
      
      // In a real app, upload to Supabase storage
      // For demo, we'll create a local URL
      const videoObjectUrl = URL.createObjectURL(file);
      setVideoUrl(videoObjectUrl);
      
      toast({
        title: "Video uploaded successfully",
        description: "Your practice video has been uploaded.",
        variant: "default"
      });
    } catch (error) {
      console.error("Error uploading video:", error);
      toast({
        title: "Upload failed",
        description: "There was a problem uploading your video. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-bold mb-2">Mini-Challenge</h3>
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
          
          <Button 
            onClick={handleUploadClick}
            variant="outline"
            disabled={isUploading}
            className="w-full flex items-center justify-center gap-2"
          >
            <Upload size={16} />
            {isUploading ? "Uploading..." : "Upload Video"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoUploader;
