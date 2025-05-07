
import React from 'react';
import { ChatMessage } from '@/hooks/useAIChat';

interface ChatMessagesProps {
  messages: ChatMessage[];
  isLoading: boolean;
  courseAvatar: string;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, isLoading, courseAvatar }) => {
  return (
    <div className="flex flex-col space-y-4">
      {messages.map((msg, index) => (
        msg.isUser ? (
          <div key={index} className="flex justify-end mb-4">
            <div className="bg-electric text-black p-3 rounded-lg max-w-[80%]">
              <p>{msg.text}</p>
            </div>
          </div>
        ) : (
          <div key={index} className="flex flex-col mb-4">
            <div className="flex">
              <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                <img src={courseAvatar} alt="AI Avatar" className="w-full h-full object-cover" />
              </div>
              <div className="bg-muted p-3 rounded-lg max-w-[80%]">
                <p className="whitespace-pre-line">{msg.text}</p>
              </div>
            </div>
            {msg.gif && (
              <div className="ml-13 mt-2 max-w-[200px]">
                <img src={msg.gif} alt="Giphy reaction" className="rounded-lg" />
              </div>
            )}
          </div>
        )
      ))}
      {isLoading && (
        <div className="flex mb-4">
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
      )}
    </div>
  );
};

export default ChatMessages;
