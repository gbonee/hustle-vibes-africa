
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
  const lastMessageRef = useRef<HTMLDivElement>(null);
  
  // Only auto-scroll for user messages, not AI responses
  useEffect(() => {
    if (!scrollAreaRef.current || chatMessages.length === 0) return;
    
    const lastMessage = chatMessages[chatMessages.length - 1];
    
    // Only auto-scroll if the last message is from the user
    if (lastMessage.isUser) {
      const scrollToBottom = () => {
        if (!scrollAreaRef.current) return;
        const scrollElement = scrollAreaRef.current;
        scrollElement.scrollTop = scrollElement.scrollHeight;
      };

      scrollToBottom();
      const timeout = setTimeout(scrollToBottom, 100);
      return () => clearTimeout(timeout);
    }
  }, [chatMessages]);

  // Auto-scroll only when loading starts (user message sent)
  useEffect(() => {
    if (isLoading && scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current;
      scrollElement.scrollTop = scrollElement.scrollHeight;
    }
  }, [isLoading]);

  return (
    <ScrollArea 
      ref={scrollAreaRef}
      className="h-[calc(100vh-320px)] mb-2 p-2 overflow-y-auto"
      scrollHideDelay={100}
    >
      <div className="flex flex-col space-y-6 pb-24">
        {chatMessages.map((msg, index) => (
          <div 
            key={`${msg.timestamp}-${index}`}
            ref={index === chatMessages.length - 1 ? lastMessageRef : null}
          >
            <ChatMessage 
              message={msg}
              courseAvatar={courseAvatar}
            />
          </div>
        ))}
        {isLoading && (
          <LoadingChatMessage courseAvatar={courseAvatar} />
        )}
      </div>
    </ScrollArea>
  );
};

export default ChatContainer;
