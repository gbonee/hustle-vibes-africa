import { useState, useEffect, useRef } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { getFixedWelcomeMessage, getLanguageSpecificErrorMessage, getLanguageSpecificErrorToast } from '@/utils/chatTranslations';

export interface ChatMessage {
  isUser: boolean;
  text: string;
  gif?: string;
  timestamp: number;
}

interface Progress {
  completed: number;
  total: number;
  percentage: number;
}

export const useAIChat = (userName: string, courseAvatar: string) => {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [currentCourseKey, setCurrentCourseKey] = useState<string>('');
  const [currentCourse, setCurrentCourse] = useState<string>('digital-marketing');
  const [currentLanguage, setCurrentLanguage] = useState<string>('pidgin');

  // Initialize user ID and check preview mode
  useEffect(() => {
    const checkPreviewMode = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const preview = urlParams.get('forcePreview') === 'true';
      setIsPreviewMode(preview);
      return preview;
    };
    
    const preview = checkPreviewMode();
    
    const getUserId = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        setUserId(user.id);
        return user.id;
      }
      return null;
    };
    
    const initializeChat = async () => {
      const uid = await getUserId();
      return uid;
    };
    
    initializeChat();
  }, []);

  const updateCourseKey = (userId: string | null, currentCourse: string, currentLanguage: string) => {
    const courseKey = userId 
      ? `${userId}_${currentCourse}_${currentLanguage}`
      : `preview_${currentCourse}_${currentLanguage}`;
    
    setCurrentCourseKey(courseKey);
    setCurrentCourse(currentCourse);
    setCurrentLanguage(currentLanguage);
    console.log(`Setting course key: ${courseKey}`);
    return courseKey;
  };

  // Function to load chat history
  const loadChatHistory = (courseKey: string) => {
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
          return true;
        }
      } catch (error) {
        console.error("Error parsing saved messages:", error);
      }
    }
    return false;
  };

  // Save messages to localStorage
  useEffect(() => {
    if (chatMessages.length > 0 && currentCourseKey) {
      console.log(`Saving ${chatMessages.length} chat messages to: chat_history_${currentCourseKey}`);
      localStorage.setItem(`chat_history_${currentCourseKey}`, JSON.stringify(chatMessages));
    }
  }, [chatMessages, currentCourseKey]);

  // Scroll to bottom of chat area when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [chatMessages]);

  // Generate a welcome message using the AI
  const sendWelcomeMessage = async (name: string, course: string, language: string) => {
    setIsLoading(true);
    
    try {
      const progress = getUserProgress();
      console.log("Generating welcome message for course:", course, "language:", language);
      
      // Use the fixed welcome message for the specific course and language
      const welcomeMessage = getFixedWelcomeMessage(course, language);
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
        text: getFixedWelcomeMessage(course, language),
        timestamp: Date.now()
      }]);
    } finally {
      setIsLoading(false);
      setIsInitialLoad(false);
    }
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

  // Format chat history for API
  const formatChatHistoryForApi = () => {
    // Only send the last 10 messages to keep context manageable
    const recentMessages = chatMessages.slice(-10);
    return recentMessages.map(msg => ({
      role: msg.isUser ? 'user' : 'assistant',
      content: msg.text
    }));
  };

  const handleMessageSend = async (e: React.FormEvent) => {
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
      const previousMessages = formatChatHistoryForApi();

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
    chatMessages,
    isLoading,
    isInitialLoad,
    isPreviewMode,
    scrollAreaRef,
    userId,
    currentCourseKey,
    currentCourse,
    currentLanguage,
    handleMessageSend,
    sendWelcomeMessage,
    loadChatHistory,
    updateCourseKey
  };
};
