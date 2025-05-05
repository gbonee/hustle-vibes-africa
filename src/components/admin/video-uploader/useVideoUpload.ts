
import { useState, useRef } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface UseVideoUploadProps {
  courseId: string;
  moduleId: number;
  onVideoUploaded: (moduleId: number, url: string) => void;
}

export const useVideoUpload = ({ courseId, moduleId, onVideoUploaded }: UseVideoUploadProps) => {
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
      
      // Create local preview
      const videoObjectUrl = URL.createObjectURL(file);
      setPreviewUrl(videoObjectUrl);
      
      // Define file path in storage bucket
      const filePath = `${courseId}/${moduleId}-${file.name.replace(/\s+/g, '-')}`;
      
      // Set up the upload with manual progress tracking
      const { data, error } = await supabase.storage
        .from('module-videos')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });
      
      // Manually track upload progress (since onUploadProgress isn't available)
      // We'll just set it to 100% when complete
      setProgress(100);
      
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
      // Clean up local preview
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    }
  };

  const handleRemoveVideo = async (existingVideoUrl: string) => {
    if (!existingVideoUrl) return;
    
    try {
      const { error } = await supabase.storage
        .from('module-videos')
        .remove([existingVideoUrl]);
      
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

  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setPreviewUrl(null);
  };

  return {
    isUploading,
    progress,
    previewUrl,
    fileInputRef,
    handleUploadClick,
    handleFileChange,
    handleRemoveVideo,
    resetFileInput
  };
};
