
import { useState, useEffect } from 'react';
import { ChatMessage } from '../types';

export const useChatHistory = (
  courseKey: string, 
  currentCourse: string,
  currentLanguage: string,
  userName: string,
  sendWelcomeMessage: () => Promise<void>
) => {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Load chat history or send welcome message
  useEffect(() => {
    if (!courseKey) return;
    
    // Function to load chat history
    const loadChatHistory = () => {
      const savedMessages = localStorage.getItem(`chat_history_${courseKey}`);
      
      if (savedMessages) {
        try {
          const parsedMessages = JSON.parse(savedMessages);
          // Only load messages from the last 7 days
          const sevenDaysAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
          const recentMessages = parsedMessages.filter(
            (msg: ChatMessage) => msg.timestamp > sevenDaysAgo
          );
          
          if (recentMessages.length > 0) {
            console.log(`Loading ${recentMessages.length} saved messages for ${courseKey}`);
            setChatMessages(recentMessages);
            setIsInitialLoad(false);
          } else {
            // If we have no recent messages, send a welcome message
            console.log(`No recent messages for ${courseKey}, sending welcome message`);
            sendWelcomeMessage();
          }
        } catch (error) {
          console.error("Error parsing saved messages:", error);
          sendWelcomeMessage();
        }
      } else {
        // If we have no saved messages at all, send a welcome message
        console.log(`No saved messages for ${courseKey}, sending welcome message`);
        sendWelcomeMessage();
      }
    };

    loadChatHistory();
  }, [courseKey, currentCourse, currentLanguage, userName, sendWelcomeMessage]);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (chatMessages.length > 0 && courseKey) {
      console.log(`Saving ${chatMessages.length} chat messages to: chat_history_${courseKey}`);
      localStorage.setItem(`chat_history_${courseKey}`, JSON.stringify(chatMessages));
    }
  }, [chatMessages, courseKey]);

  return {
    chatMessages,
    setChatMessages,
    isInitialLoad,
    setIsInitialLoad
  };
};

export default useChatHistory;
