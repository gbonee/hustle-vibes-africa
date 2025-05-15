
import React, { useEffect, useState, useCallback } from 'react';
import { Video } from 'lucide-react';
import { Module } from './ModulesList';
import { supabase } from "@/integrations/supabase/client";
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { Skeleton } from '@/components/ui/skeleton';

interface VideoPlayerProps {
  module: Module;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ module }) => {
  const { userPrefs } = useUserPreferences();
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const fetchModuleVideo = useCallback(async () => {
    if (!module) {
      setIsLoading(false);
      setVideoUrl(null);
      return;
    }

    setIsLoading(true);
    
    try {
      // Fallback to YouTube for specific modules - check this first for faster loading
      if (module.id === 1 && module.title === "Intro to Digital Marketing the Naija Way") {
        setVideoUrl("https://www.youtube.com/embed/tlCqenvEmNg");
        setIsLoading(false);
        return;
      }
      
      // If there's no course preference, we can't fetch the video
      if (!userPrefs?.course) {
        console.log("No course selected in user preferences");
        setIsLoading(false);
        return;
      }
      
      // Get user's selected language from preferences
      const userLanguage = userPrefs?.language || 'pidgin';
      console.log(`Looking for videos for module ${module.id} in course ${userPrefs.course}, language: ${userLanguage}`);
      
      // List all videos in the bucket/folder to diagnose what's there
      const { data, error } = await supabase
        .storage
        .from('module-videos')
        .list(userPrefs.course);
        
      if (error) throw error;
      
      console.log(`Available videos in ${userPrefs.course} course:`, data);
      
      // Convert module.id to string for safer comparison
      const moduleIdStr = String(module.id);
      
      // Try multiple patterns to find the video
      // 1. First look for exact match: moduleId-language-*
      let moduleVideo = data.find(file => 
        file.name.startsWith(`${moduleIdStr}-${userLanguage}`)
      );
      
      // 2. If not found, look for a video that contains the module ID anywhere
      if (!moduleVideo) {
        moduleVideo = data.find(file => 
          file.name.includes(`-${moduleIdStr}-`) || 
          file.name.includes(`/${moduleIdStr}-`) || 
          file.name.startsWith(`${moduleIdStr}-`)
        );
      }
      
      if (moduleVideo) {
        // Get the public URL for the video
        const { data: { publicUrl } } = supabase
          .storage
          .from('module-videos')
          .getPublicUrl(`${userPrefs.course}/${moduleVideo.name}`);
          
        console.log(`Found video for module ${module.id}: ${moduleVideo.name}`);
        console.log(`Video URL: ${publicUrl}`);
        setVideoUrl(publicUrl);
      } else {
        console.log(`No video found for module ${module.id} in course ${userPrefs.course}`);
        console.log(`Videos available:`, data.map(d => d.name).join(", "));
        
        // Check if id is not a number (like "201") that might not match our pattern
        if (isNaN(Number(module.id))) {
          console.log(`Warning: Module ID ${module.id} is not a number, which might not match our naming pattern`);
        }
        setVideoUrl(null);
      }
    } catch (error) {
      console.error("Error fetching module video:", error);
      setVideoUrl(null);
    } finally {
      setIsLoading(false);
    }
  }, [module, userPrefs?.course, userPrefs?.language]);
  
  useEffect(() => {
    fetchModuleVideo();
  }, [fetchModuleVideo]);

  if (isLoading) {
    return (
      <div className="aspect-video bg-black rounded-lg flex items-center justify-center border border-gray-800">
        <Skeleton className="w-full h-full" />
      </div>
    );
  }

  // YouTube video embed
  if (videoUrl?.includes('youtube.com')) {
    return (
      <div className="aspect-video bg-black rounded-lg flex items-center justify-center border border-gray-800">
        <iframe 
          className="w-full h-full"
          src={videoUrl}
          title={module.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    );
  }
  
  // Custom uploaded video
  if (videoUrl) {
    return (
      <div className="aspect-video bg-black rounded-lg flex items-center justify-center border border-gray-800">
        <video 
          className="w-full h-full"
          src={videoUrl}
          controls
          preload="metadata"
          controlsList="nodownload"
        />
      </div>
    );
  }

  // Fallback when no video is available for the selected language
  return module.hasVideo ? (
    <div className="aspect-video bg-black rounded-lg flex items-center justify-center border border-gray-800">
      <div className="text-center">
        <Video className="h-12 w-12 mx-auto mb-4 text-electric" />
        <p className="text-gray-400">No video available in {userPrefs?.language || 'current'} language</p>
      </div>
    </div>
  ) : (
    <div className="aspect-video bg-black rounded-lg flex items-center justify-center border border-gray-800">
      <div className="text-center p-6">
        <h3 className="text-xl font-bold mb-4">Module Content</h3>
        <p className="text-gray-400">This module contains reading materials and exercises.</p>
      </div>
    </div>
  );
};

export default React.memo(VideoPlayer);
