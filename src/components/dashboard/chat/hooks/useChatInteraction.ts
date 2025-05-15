
import { useState, useCallback } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { ChatMessage, Progress } from '../types';
import { 
  getLanguageSpecificErrorMessage,
  getLanguageSpecificErrorToast
} from '../chatTranslations';
import { getFixedWelcomeMessage } from '../welcomeMessages';

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

  // Generate a welcome message using the AI
  const sendWelcomeMessage = useCallback(async () => {
    setIsLoading(true);
    
    try {
      const progress = getUserProgress();
      console.log("Generating welcome message for course:", currentCourse, "language:", currentLanguage);
      
      // Use the fixed welcome message for the specific course and language
      const welcomeMessage = getFixedWelcomeMessage(currentCourse, currentLanguage);
      console.log("Using welcome message:", welcomeMessage);
      
      // Try to get a GIF for the welcome message
      let gifUrl = null;
      try {
        const giphyApiKey = "pLURtkhVrUXr4TN8PseRqbVN4n9Re7ky"; // Using a fixed GIPHY API key
        const searchTerm = "aki and pawpaw nigerian comedy"; // Always use Aki and Pawpaw
        
        const giphyResponse = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&q=${encodeURIComponent(searchTerm)}&limit=10&offset=0&rating=pg-13&lang=en&bundle=messaging_non_clips`);
        const giphyData = await giphyResponse.json();
        
        if (giphyData.data && giphyData.data.length > 0) {
          // Get a random GIF from the top 10 results for more variety
          const randomIndex = Math.floor(Math.random() * Math.min(10, giphyData.data.length));
          gifUrl = giphyData.data[randomIndex].images.fixed_height.url;
        }
      } catch (giphyError) {
        console.error('Giphy API error:', giphyError);
        // Continue without a GIF if there's an error
      }
      
      // Add welcome message to chat with the GIF
      setChatMessages([{ 
        isUser: false, 
        text: welcomeMessage,
        gif: gifUrl,
        timestamp: Date.now()
      }]);
      
    } catch (error) {
      console.error('Error generating welcome message:', error);
      // Add fallback welcome message - avatar-specific
      setChatMessages([{ 
        isUser: false, 
        text: getFixedWelcomeMessage(currentCourse, currentLanguage),
        timestamp: Date.now()
      }]);
    } finally {
      setIsLoading(false);
    }
  }, [currentCourse, currentLanguage, setChatMessages]);

  const handleMessageSend = useCallback(async (e: React.FormEvent, chatMessages: ChatMessage[]) => {
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
      
      // Use the correct toast API format for errors
      toast({
        title: "Error",
        description: getLanguageSpecificErrorToast(currentLanguage),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [message, currentCourse, currentLanguage, userName, setChatMessages]);

  return {
    message,
    setMessage,
    isLoading,
    handleMessageSend,
    sendWelcomeMessage
  };
};

export default useChatInteraction;
