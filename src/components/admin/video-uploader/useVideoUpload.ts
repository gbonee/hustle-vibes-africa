
import { useState, useRef } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import type { Language } from '@/components/onboarding/LanguageSelector';

interface UseVideoUploadProps {
  courseId: string;
  moduleId: number;
  onVideoUploaded: (moduleId: number, url: string) => void;
  language: Language;
}

export const useVideoUpload = ({ 
  courseId, 
  moduleId, 
  onVideoUploaded,
  language
}: UseVideoUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setPreviewUrl(null);
    setSelectedFile(null);
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

    // Check file size (limit to 50MB to match bucket limit)
    if (file.size > 50 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Video must be less than 50MB.",
        variant: "destructive"
      });
      return;
    }

    // Create local preview
    const videoObjectUrl = URL.createObjectURL(file);
    setPreviewUrl(videoObjectUrl);
    setSelectedFile(file);
  };

  const uploadSelectedFile = async () => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a video file to upload.",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsUploading(true);
      setProgress(0);
      
      // Define file path in storage bucket with language code
      // Format: courseId/moduleId-language-filename.mp4
      const fileName = selectedFile.name.replace(/\s+/g, '-');
      const filePath = `${courseId}/${moduleId}-${language}-${fileName}`;
      
      // Create bucket if it doesn't exist
      // This is done automatically by Supabase

      // Set up the upload
      const { data, error } = await supabase.storage
        .from('module-videos')
        .upload(filePath, selectedFile, {
          cacheControl: '3600',
          upsert: true
        });
      
      // Set to 100% when complete
      setProgress(100);
      
      if (error) throw error;
      
      // Call completion callback
      onVideoUploaded(moduleId, filePath);
      
      toast({
        title: "Video uploaded successfully",
        description: `The ${language} video for this module has been uploaded.`,
        variant: "default"
      });

      // Reset the file input and preview after successful upload
      resetFileInput();
    } catch (error: any) {
      console.error("Error uploading video:", error);
      toast({
        title: "Upload failed",
        description: error.message || "There was a problem uploading your video. Please try again.",
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
    try {
      const { error } = await supabase.storage
        .from('module-videos')
        .remove([existingVideoUrl]);
      
      if (error) throw error;
      
      // Call completion callback with empty URL
      onVideoUploaded(moduleId, '');
      
      toast({
        title: "Video removed",
        description: `The ${language} video has been removed.`,
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

  return {
    isUploading,
    progress,
    previewUrl,
    fileInputRef,
    selectedFile,
    handleUploadClick,
    handleFileChange,
    uploadSelectedFile,
    handleRemoveVideo,
    resetFileInput
  };
};
