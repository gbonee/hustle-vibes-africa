
import React from 'react';
import { Video } from 'lucide-react';
import { Module } from './ModulesList';

interface VideoPlayerProps {
  module: Module;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ module }) => {
  // YouTube video for the specific module
  const getYoutubeEmbed = () => {
    if (module.id === 1 && module.title === "Intro to Digital Marketing the Naija Way") {
      return "https://www.youtube.com/embed/tlCqenvEmNg";
    }
    return null;
  };

  const youtubeEmbedUrl = getYoutubeEmbed();

  return (
    <>
      {youtubeEmbedUrl ? (
        <div className="aspect-video bg-black rounded-lg flex items-center justify-center border border-gray-800">
          <iframe 
            className="w-full h-full"
            src={youtubeEmbedUrl}
            title={module.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      ) : module.hasVideo ? (
        <div className="aspect-video bg-black rounded-lg flex items-center justify-center border border-gray-800">
          {/* In a real app this would be a video player */}
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
      )}
    </>
  );
};

export default VideoPlayer;
