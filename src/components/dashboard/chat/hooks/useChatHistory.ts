
import { useState, useEffect, useCallback } from 'react';
import { ChatMessage } from '../types';
import { toast } from "@/hooks/use-toast";

export const useChatHistory = (
  courseKey: string, 
  currentCourse: string,
  currentLanguage: string,
  userName: string,
  sendWelcomeMessage: () => Promise<void>
) => {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Load chat history or send welcome message
  const loadChatHistory = useCallback(async () => {
    if (!courseKey) return;
    
    setIsLoading(true);
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
          setIsLoading(false);
          return; // Exit early if we loaded messages successfully
        }
      } catch (error) {
        console.error("Error parsing saved messages:", error);
        toast({
          title: "Error loading chat history",
          description: "We couldn't load your previous messages. Starting a new chat.",
          variant: "destructive"
        });
      }
    }
    
    // If we get here, either there were no messages or there was an error
    console.log(`No recent messages for ${courseKey}, sending welcome message`);
    await sendWelcomeMessage();
    setIsInitialLoad(false);
    setIsLoading(false);
  }, [courseKey, sendWelcomeMessage]);

  // Load chat history on initial render
  useEffect(() => {
    loadChatHistory();
  }, [loadChatHistory]);

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
    setIsInitialLoad,
    isLoading
  };
};

export default useChatHistory;
