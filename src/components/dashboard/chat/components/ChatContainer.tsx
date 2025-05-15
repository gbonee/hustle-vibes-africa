
import React, { useRef, useEffect } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatMessage, { LoadingChatMessage } from './ChatMessage';
import { ChatMessage as IChatMessage } from '../types';

interface ChatContainerProps {
  chatMessages: IChatMessage[];
  isLoading: boolean;
  courseAvatar: string;
}

const ChatContainer: React.FC<ChatContainerProps> = ({
  chatMessages,
  isLoading,
  courseAvatar
}) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  // Enhanced auto-scroll implementation that accounts for GIFs and dynamic content
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current;
      
      // Use a longer delay to ensure GIFs have started loading
      const scrollToBottom = () => {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      };
      
      // Initial scroll attempt
      scrollToBottom();
      
      // Multiple delayed attempts to handle different content loading speeds
      setTimeout(scrollToBottom, 100);
      setTimeout(scrollToBottom, 300);
      setTimeout(scrollToBottom, 500);
    }
  }, [chatMessages, isLoading]);

  return (
    <ScrollArea 
      ref={scrollAreaRef}
      className="h-[80vh] mb-2 p-2 overflow-y-auto"
      scrollHideDelay={100}
    >
      <div className="flex flex-col space-y-6 pb-16">
        {chatMessages.map((msg, index) => (
          <ChatMessage 
            key={index}
            message={msg}
            courseAvatar={courseAvatar}
          />
        ))}
        {isLoading && (
          <LoadingChatMessage courseAvatar={courseAvatar} />
        )}
      </div>
    </ScrollArea>
  );
};

export default ChatContainer;
