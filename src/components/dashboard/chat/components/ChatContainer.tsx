
import React, { useRef } from 'react';
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

  return (
    <ScrollArea 
      ref={scrollAreaRef}
      className="h-[40vh] sm:h-[50vh] mb-2 p-2 overflow-y-auto"
      scrollHideDelay={100}
    >
      <div className="flex flex-col space-y-6 pb-4">
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
