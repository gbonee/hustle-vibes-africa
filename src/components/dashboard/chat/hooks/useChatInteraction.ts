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

  // Format chat history for API
  const formatChatHistoryForApi = (chatMessages: ChatMessage[]) => {
    // Only send the last 10 messages to keep context manageable
    const recentMessages = chatMessages.slice(-10);
    return recentMessages.map(msg => ({
      role: msg.isUser ? 'user' : 'assistant',
      content: msg.text
    }));
  };

  // Mock progress data - in a real app, this would come from the database
  const getUserProgress = (): Progress => {
    // For now, return mock data
    return {
      completed: 2,
      total: 5,
      percentage: 40
    };
  };

  const handleMessageSend = async (e: React.FormEvent, chatMessages: ChatMessage[]) => {
    e.preventDefault();
    
    if (!message.trim()) return;

    // Add user message to chat
    setChatMessages(prev => [...prev, { 
      isUser: true, 
      text: message,
      timestamp: Date.now()
    }]);
    
    // Store the message to clear the input
    const sentMessage = message;
    setMessage('');
    setIsLoading(true);

    try {
      const progress = getUserProgress();
      const previousMessages = formatChatHistoryForApi(chatMessages);

      console.log("Sending message to AI with course:", currentCourse, "language:", currentLanguage);

      // Call the edge function for AI response
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
      // Add fallback response in the chosen language
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
