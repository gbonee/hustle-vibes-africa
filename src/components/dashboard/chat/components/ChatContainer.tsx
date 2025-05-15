
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
  
  // Auto-scroll to bottom when messages change - improved implementation
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current;
      // Add a small delay to ensure DOM updates before scrolling
      setTimeout(() => {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }, 50);
    }
  }, [chatMessages, isLoading]);

  return (
    <ScrollArea 
      ref={scrollAreaRef}
      className="h-[80vh] mb-2 p-2 overflow-y-auto"
      scrollHideDelay={100}
    >
      <div className="flex flex-col space-y-6 pb-10">
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
