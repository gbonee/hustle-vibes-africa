
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
  
  // Optimized auto-scroll with single timeout
  useEffect(() => {
    if (!scrollAreaRef.current) return;
    
    const scrollToBottom = () => {
      if (!scrollAreaRef.current) return;
      const scrollElement = scrollAreaRef.current;
      scrollElement.scrollTop = scrollElement.scrollHeight;
    };

    // Single immediate scroll
    scrollToBottom();
    
    // One delayed scroll for content that loads asynchronously
    const timeout = setTimeout(scrollToBottom, 100);
    
    return () => clearTimeout(timeout);
  }, [chatMessages, isLoading]);

  return (
    <ScrollArea 
      ref={scrollAreaRef}
      className="h-[calc(100vh-320px)] mb-2 p-2 overflow-y-auto"
      scrollHideDelay={100}
    >
      <div className="flex flex-col space-y-6 pb-24">
        {chatMessages.map((msg, index) => (
          <ChatMessage 
            key={`${msg.timestamp}-${index}`} // More efficient key
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
