
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
  
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current;
      setTimeout(() => {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }, 100);
    }
  }, [chatMessages, isLoading]);

  return (
    <ScrollArea 
      ref={scrollAreaRef}
      className="h-[65vh] sm:h-[68vh] md:h-[72vh] mb-2 p-2 overflow-y-auto"
      scrollHideDelay={100}
    >
      <div className="flex flex-col space-y-3 pb-4">
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
