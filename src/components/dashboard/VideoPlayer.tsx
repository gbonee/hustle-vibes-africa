
import React, { useEffect, useState, useCallback } from 'react';
import { Video } from 'lucide-react';
import { Module } from './ModulesList';
import { supabase } from "@/integrations/supabase/client";
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { Skeleton } from '@/components/ui/skeleton';
import { debugVideoAvailability } from '@/utils/progress';

interface VideoPlayerProps {
  module: Module;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ module }) => {
  const { userPrefs } = useUserPreferences();
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [debugInfo, setDebugInfo] = useState<{available: any[], all: any[]} | null>(null);
  
  const fetchModuleVideo = useCallback(async () => {
    if (!module) {
      setIsLoading(false);
      setVideoUrl(null);
      return;
    }

    setIsLoading(true);
    
    try {
      // If there's no course preference, we can't fetch the video
      if (!userPrefs?.course) {
        setIsLoading(false);
        return;
      }
      
      // Get user's selected language from preferences
      const userLanguage = userPrefs?.language || 'pidgin';
      console.log(`Looking for ${userLanguage} videos for module ${module.id} in course ${userPrefs.course}`);
      
      // First try the direct approach - list files in the course folder
      const { data, error } = await supabase
        .storage
        .from('module-videos')
        .list(userPrefs.course);
        
      if (error) {
        console.error("Error listing files:", error);
        throw error;
      }
      
      console.log(`Found ${data?.length || 0} files in the ${userPrefs.course} folder`);
      console.log("Available files:", data?.map(file => file.name));
      
      // Try multiple naming patterns to be more flexible
      let moduleVideo = null;
      
      // Pattern 1: moduleId-language-filename (primary format)
      moduleVideo = data?.find(file => 
        file.name.startsWith(`${module.id}-${userLanguage}`)
      );
      
      // Pattern 2: Check for any file that contains the module ID and language
      if (!moduleVideo) {
        moduleVideo = data?.find(file => 
          file.name.includes(`${module.id}-`) && 
          file.name.includes(`-${userLanguage}`)
        );
      }
      
      // Pattern 3: Just try to match the module ID for any language if desperate
      if (!moduleVideo && userPrefs.course === 'importation' && module.id >= 200) {
        // Special handling for importation course (has IDs like 201, 202, etc.)
        moduleVideo = data?.find(file => file.name.startsWith(`${module.id}-`));
      }
      
      if (moduleVideo) {
        const { data: { publicUrl } } = supabase
          .storage
          .from('module-videos')
          .getPublicUrl(`${userPrefs.course}/${moduleVideo.name}`);
          
        console.log(`Found video for module ${module.id}: ${moduleVideo.name}`);
        console.log(`Public URL: ${publicUrl}`);
        setVideoUrl(publicUrl);
      } else {
        // As a backup approach, try listing all files and finding matches
        console.log("No direct match found, trying broader search");
        const { data: allData, error: allError } = await supabase
          .storage
          .from('module-videos')
          .list();
        
        if (!allError && allData) {
          console.log("All files in storage:", allData.map(f => f.name));
          // Just try to find anything with the module ID
          const anyMatch = allData.find(file => 
            file.name.includes(`${module.id}-`) || 
            file.name.startsWith(`${module.id}_`)
          );
          
          if (anyMatch) {
            const { data: { publicUrl } } = supabase
              .storage
              .from('module-videos')
              .getPublicUrl(anyMatch.name);
              
            console.log(`Found alternative match: ${anyMatch.name}`);
            setVideoUrl(publicUrl);
          } else {
            // Debug output to help diagnose the issue
            console.log(`No ${userLanguage} video found for module ${module.id}.`);
            
            // Store debug info for display to admin users
            const debug = await debugVideoAvailability(userPrefs.course, userLanguage);
            setDebugInfo(debug);
            
            setVideoUrl(null);
          }
        }
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

  // YouTube video embed - removed special case for intro module
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
        {debugInfo && (
          <div className="mt-4 text-xs text-gray-500">
            <p>Available videos: {debugInfo.available.length}</p>
            <p>Total files: {debugInfo.all.length}</p>
            <p className="mt-2">Naming format should be: {module.id}-{userPrefs?.language}-filename</p>
          </div>
        )}
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
