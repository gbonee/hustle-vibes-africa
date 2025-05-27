
import React, { useEffect, useRef } from 'react';
import { ChatMessage as ChatMessageType } from '../types';

interface ChatMessageProps {
  message: ChatMessageType;
  courseAvatar: string;
  isLoading?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ 
  message, 
  courseAvatar, 
  isLoading = false 
}) => {
  const gifRef = useRef<HTMLImageElement>(null);
  
  // Remove aggressive auto-scrolling for GIFs - let user control scroll
  useEffect(() => {
    if (!message.gif || !gifRef.current) return;
    
    const img = gifRef.current;
    
    const handleImageLoad = () => {
      // Only do a gentle scroll adjustment, not forcing to bottom
      // This allows users to see the response content first
      const scrollParent = img.closest('.overflow-y-auto');
      if (scrollParent && !message.isUser) {
        // For AI messages with GIFs, only scroll if user is already near bottom
        const isNearBottom = scrollParent.scrollTop + scrollParent.clientHeight >= scrollParent.scrollHeight - 100;
        if (isNearBottom) {
          setTimeout(() => {
            scrollParent.scrollTop = scrollParent.scrollHeight;
          }, 200);
        }
      }
    };
    
    img.addEventListener('load', handleImageLoad);
    
    return () => {
      img.removeEventListener('load', handleImageLoad);
    };
  }, [message.gif, message.isUser]);

  if (message.isUser) {
    return (
      <div className="flex justify-end mb-5">
        <div className="bg-electric text-black p-3 rounded-lg max-w-[80%]">
          <p>{message.text}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col mb-6">
      <div className="flex">
        <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
          <img src={courseAvatar} alt="AI Avatar" className="w-full h-full object-cover" />
        </div>
        <div className="bg-muted p-3 rounded-lg max-w-[80%]">
          <p className="whitespace-pre-line">{message.text}</p>
        </div>
      </div>
      {message.gif && (
        <div className="ml-13 mt-2 max-w-[300px]">
          <img 
            ref={gifRef}
            src={message.gif} 
            alt="Giphy reaction" 
            className="rounded-lg w-full" 
            loading="eager"
          />
        </div>
      )}
    </div>
  );
};

export const LoadingChatMessage: React.FC<{ courseAvatar: string }> = ({ courseAvatar }) => {
  return (
    <div className="flex mb-5">
      <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
        <img src={courseAvatar} alt="AI Avatar" className="w-full h-full object-cover" />
      </div>
      <div className="bg-muted p-3 rounded-lg max-w-[80%] flex items-center">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
