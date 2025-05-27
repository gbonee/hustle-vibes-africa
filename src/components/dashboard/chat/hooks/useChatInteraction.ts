import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ChatMessage, Progress } from '../types';
import { 
  getLanguageSpecificErrorMessage,
  getLanguageSpecificErrorToast
} from '../chatTranslations';

interface UseChatInteractionProps {
  setChatMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  currentCourse: string;
  currentLanguage: string;
  userName: string;
}

const useChatInteraction = ({
  setChatMessages,
  currentCourse,
  currentLanguage,
  userName
}: UseChatInteractionProps) => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Format chat history for API - keep only last 5 messages for faster processing
  const formatChatHistoryForApi = (chatMessages: ChatMessage[]) => {
    const recentMessages = chatMessages.slice(-5); // Reduced from 10 to 5
    return recentMessages.map(msg => ({
      role: msg.isUser ? 'user' : 'assistant',
      content: msg.text
    }));
  };

  // Mock progress data - cached to avoid recalculation
  const getUserProgress = (): Progress => {
    return {
      completed: 2,
      total: 5,
      percentage: 40
    };
  };

  const handleMessageSend = async (e: React.FormEvent, chatMessages: ChatMessage[]) => {
    e.preventDefault();
    
    if (!message.trim() || isLoading) return; // Prevent multiple submissions

    // Add user message to chat immediately for better UX
    const userMessage = { 
      isUser: true, 
      text: message,
      timestamp: Date.now()
    };
    setChatMessages(prev => [...prev, userMessage]);
    
    // Store the message and clear input immediately
    const sentMessage = message;
    setMessage('');
    setIsLoading(true);

    try {
      const progress = getUserProgress();
      const previousMessages = formatChatHistoryForApi(chatMessages);

      // Call the edge function with optimized payload
      const { data, error } = await supabase.functions.invoke('chat-with-ai', {
        body: { 
          message: sentMessage, 
          course: currentCourse,
          language: currentLanguage,
          userName,
          progress,
          previousMessages
        }
      });

      if (error) throw error;

      // Add AI response to chat
      setChatMessages(prev => [...prev, { 
        isUser: false, 
        text: data.response,
        gif: data.gif,
        timestamp: Date.now()
      }]);
    } catch (error) {
      console.error('Error calling AI function:', error);
      // Add fallback response
      setChatMessages(prev => [...prev, { 
        isUser: false, 
        text: getLanguageSpecificErrorMessage(currentLanguage),
        timestamp: Date.now()
      }]);
      toast.error(getLanguageSpecificErrorToast(currentLanguage));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    message,
    setMessage,
    isLoading,
    handleMessageSend
  };
};

export default useChatInteraction;
