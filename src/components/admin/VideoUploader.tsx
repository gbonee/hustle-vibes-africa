
import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Video, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

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
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
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

    // Check file size (limit to 100MB)
    if (file.size > 100 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Video must be less than 100MB.",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsUploading(true);
      setProgress(0);
      
      // Create local preview
      const videoObjectUrl = URL.createObjectURL(file);
      setPreviewUrl(videoObjectUrl);
      
      // Define file path in storage bucket
      const filePath = `${courseId}/${moduleId}-${file.name.replace(/\s+/g, '-')}`;
      
      // Upload to Supabase storage
      const { data, error } = await supabase.storage
        .from('module-videos')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
          onUploadProgress: (progress) => {
            // Update progress
            setProgress(Math.round((progress.loaded / progress.total) * 100));
          }
        });
      
      if (error) throw error;
      
      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('module-videos')
        .getPublicUrl(filePath);
      
      // Call completion callback
      onVideoUploaded(moduleId, publicUrl);
      
      toast({
        title: "Video uploaded successfully",
        description: "Your module video has been uploaded.",
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
      setProgress(0);
      // Clean up local preview
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    }
  };

  const handleRemoveVideo = async () => {
    if (!existingVideoUrl) return;
    
    // Extract file path from URL
    const videoPath = existingVideoUrl;
    
    try {
      const { error } = await supabase.storage
        .from('module-videos')
        .remove([videoPath]);
      
      if (error) throw error;
      
      // Call completion callback with empty URL
      onVideoUploaded(moduleId, '');
      
      toast({
        title: "Video removed",
        description: "The module video has been removed.",
        variant: "default"
      });
    } catch (error) {
      console.error("Error removing video:", error);
      toast({
        title: "Removal failed",
        description: "There was a problem removing the video. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-4">
      {existingVideoUrl ? (
        <div className="space-y-4">
          <div className="aspect-video bg-black rounded-lg flex items-center justify-center border border-gray-800 overflow-hidden">
            <video 
              src={supabase.storage.from('module-videos').getPublicUrl(existingVideoUrl).data.publicUrl}
              controls
              className="w-full h-full"
            />
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={handleUploadClick}
              variant="default"
              className="flex-1"
            >
              <Upload size={16} className="mr-2" />
              Replace Video
            </Button>
            <Button 
              onClick={handleRemoveVideo}
              variant="destructive"
            >
              <X size={16} className="mr-2" />
              Remove
            </Button>
          </div>
        </div>
      ) : (
        <div>
          {previewUrl ? (
            <div className="aspect-video bg-black rounded-lg flex items-center justify-center border border-gray-800 overflow-hidden">
              <video 
                src={previewUrl}
                controls
                className="w-full h-full"
              />
            </div>
          ) : (
            <div 
              className="aspect-video bg-black rounded-lg flex flex-col items-center justify-center border border-dashed border-gray-600 cursor-pointer hover:border-electric transition-colors"
              onClick={handleUploadClick}
            >
              <Video className="h-12 w-12 mb-4 text-gray-500" />
              <p className="text-gray-500">Click to upload a video for this module</p>
              <p className="text-gray-600 text-sm mt-2">MP4, WebM or MOV, max 100MB</p>
            </div>
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
              <div className="space-y-2">
                <div className="w-full bg-gray-800 rounded-full h-2.5">
                  <div 
                    className="bg-electric h-2.5 rounded-full" 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-center text-gray-400">Uploading... {progress}%</p>
              </div>
            ) : previewUrl ? (
              <div className="flex gap-2">
                <Button 
                  onClick={() => {
                    if (fileInputRef.current) {
                      fileInputRef.current.value = '';
                    }
                    setPreviewUrl(null);
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleUploadClick}
                  variant="default"
                  className="flex-1"
                >
                  Replace
                </Button>
              </div>
            ) : (
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
      )}
    </div>
  );
};

export default VideoUploader;
