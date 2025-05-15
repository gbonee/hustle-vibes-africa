
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
  
  // Enhanced image loading handler for better scroll behavior
  useEffect(() => {
    if (!message.gif || !gifRef.current) return;
    
    const img = gifRef.current;
    
    const handleImageLoad = () => {
      // Find all ScrollArea parents and scroll them to bottom
      let parent = img.parentElement;
      const scrollParents = [];
      
      // Collect all potential scroll containers
      while (parent) {
        if (parent.classList.contains('overflow-y-auto') || 
            parent.classList.contains('scroll-area') ||
            parent.getAttribute('data-radix-scroll-area-viewport') !== null) {
          scrollParents.push(parent);
        }
        parent = parent.parentElement;
      }
      
      // Scroll all potential containers to bottom with multiple attempts
      scrollParents.forEach(scrollParent => {
        const scrollToBottom = () => {
          scrollParent.scrollTop = scrollParent.scrollHeight;
        };
        
        // Multiple scroll attempts with increasing delays
        scrollToBottom();
        setTimeout(scrollToBottom, 50);
        setTimeout(scrollToBottom, 150);
        setTimeout(scrollToBottom, 300);
      });
    };
    
    // Add event listeners
    img.addEventListener('load', handleImageLoad);
    
    // Also set a fallback timer in case the load event doesn't fire
    const fallbackTimer = setTimeout(handleImageLoad, 1000);
    
    return () => {
      img.removeEventListener('load', handleImageLoad);
      clearTimeout(fallbackTimer);
    };
  }, [message.gif]);

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
            onLoad={(e) => {
              // Additional inline onload handler as a fallback
              const scrollToBottomOnce = () => {
                // Start with the image element itself
                const imgElement = e.currentTarget;
                // Find a parent with overflow-y-auto class
                let element = imgElement.parentElement;
                
                while (element) {
                  if (element.classList.contains('overflow-y-auto')) {
                    // Once found, scroll to the bottom
                    element.scrollTop = element.scrollHeight;
                    break;
                  }
                  element = element.parentElement;
                }
              };
              
              // Multiple scroll attempts
              scrollToBottomOnce();
              setTimeout(scrollToBottomOnce, 100);
            }}
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
