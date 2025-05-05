
import React, { useEffect, useState } from 'react';
import { Video } from 'lucide-react';
import { Module } from './ModulesList';
import { supabase } from "@/integrations/supabase/client";
import { useUserPreferences } from '@/hooks/useUserPreferences';

interface VideoPlayerProps {
  module: Module;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ module }) => {
  const { userPrefs } = useUserPreferences();
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchModuleVideo = async () => {
      // If there's no course preference, we can't fetch the video
      if (!userPrefs?.course) return;
      
      try {
        // Look for videos in the format: courseId/moduleId-filename
        const { data, error } = await supabase
          .storage
          .from('module-videos')
          .list(userPrefs.course);
          
        if (error) throw error;
        
        // Find the first video that starts with the module ID
        const moduleVideo = data.find(file => 
          file.name.startsWith(`${module.id}-`)
        );
        
        if (moduleVideo) {
          const { data: { publicUrl } } = supabase
            .storage
            .from('module-videos')
            .getPublicUrl(`${userPrefs.course}/${moduleVideo.name}`);
            
          setVideoUrl(publicUrl);
        } else {
          // Fallback to YouTube for specific modules
          if (module.id === 1 && module.title === "Intro to Digital Marketing the Naija Way") {
            setVideoUrl("https://www.youtube.com/embed/tlCqenvEmNg");
          } else {
            setVideoUrl(null);
          }
        }
      } catch (error) {
        console.error("Error fetching module video:", error);
        setVideoUrl(null);
      }
    };
    
    fetchModuleVideo();
  }, [module.id, module.title, userPrefs?.course]);

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
        />
      </div>
    );
  }

  // Fallback when no video is available
  return module.hasVideo ? (
    <div className="aspect-video bg-black rounded-lg flex items-center justify-center border border-gray-800">
      <div className="text-center">
        <Video className="h-12 w-12 mx-auto mb-4 text-electric" />
        <p className="text-gray-400">Video would play here</p>
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

export default VideoPlayer;
