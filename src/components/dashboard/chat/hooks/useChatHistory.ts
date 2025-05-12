
import { useState, useEffect, useRef } from 'react';
import { ChatMessage } from '../types';
import { getFixedWelcomeMessage } from '../welcomeMessages';

// Cache for welcome messages to reduce lag and API calls
const welcomeMessageCache: Record<string, ChatMessage> = {};

export const useChatHistory = (
  courseKey: string, 
  currentCourse: string,
  currentLanguage: string,
  userName: string
) => {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const hasLoadedRef = useRef(false);

  // Load chat history or send welcome message
  useEffect(() => {
    if (!courseKey || hasLoadedRef.current) return;
    
    const loadChatHistory = async () => {
      try {
        setIsInitialLoad(true);
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
              hasLoadedRef.current = true;
              return;
            }
          } catch (error) {
            console.error("Error parsing saved messages:", error);
          }
        }
        
        // If we reach here, we need to send a welcome message
        console.log(`No valid messages for ${courseKey}, sending welcome message`);
        await sendWelcomeMessage();
        hasLoadedRef.current = true;
      } catch (error) {
        console.error("Error loading chat history:", error);
        setIsInitialLoad(false);
        hasLoadedRef.current = true;
      }
    };
    
    // Pre-load welcome message
    const sendWelcomeMessage = async () => {
      try {
        console.log("Generating welcome message for course:", currentCourse, "language:", currentLanguage);
        
        // Use cached welcome message if available
        const cacheKey = `${currentCourse}_${currentLanguage}`;
        if (welcomeMessageCache[cacheKey]) {
          console.log("Using cached welcome message");
          setChatMessages([welcomeMessageCache[cacheKey]]);
          setIsInitialLoad(false);
          return;
        }
        
        // Use the fixed welcome message for the specific course and language
        const welcomeMessage = getFixedWelcomeMessage(currentCourse, currentLanguage);
        console.log("Using welcome message:", welcomeMessage);
        
        // Try to get a GIF for the welcome message in the background
        let gifUrl = null;
        try {
          const giphyApiKey = "pLURtkhVrUXr4TN8PseRqbVN4n9Re7ky"; // Using a fixed GIPHY API key
          const searchTerm = "aki and pawpaw nigerian comedy"; // Always use Aki and Pawpaw
          
          // First display message without GIF for better responsiveness
          const messageObj: ChatMessage = { 
            isUser: false, 
            text: welcomeMessage,
            timestamp: Date.now()
          };
          
          setChatMessages([messageObj]);
          setIsInitialLoad(false);
          
          // Cache the message
          welcomeMessageCache[cacheKey] = messageObj;
          
          // Then fetch GIF in background and update if successful
          const giphyResponse = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&q=${encodeURIComponent(searchTerm)}&limit=10&offset=0&rating=pg-13&lang=en&bundle=messaging_non_clips`);
          const giphyData = await giphyResponse.json();
          
          if (giphyData.data && giphyData.data.length > 0) {
            // Get a random GIF from the top 10 results for more variety
            const randomIndex = Math.floor(Math.random() * Math.min(10, giphyData.data.length));
            gifUrl = giphyData.data[randomIndex].images.fixed_height.url;
            
            // Update message with GIF
            const updatedMessage: ChatMessage = {
              ...messageObj,
              gif: gifUrl
            };
            
            setChatMessages([updatedMessage]);
            welcomeMessageCache[cacheKey] = updatedMessage;
          }
        } catch (giphyError) {
          console.error('Giphy API error:', giphyError);
          // Continue without a GIF if there's an error
        }
        
      } catch (error) {
        console.error('Error generating welcome message:', error);
        // Add fallback welcome message - avatar-specific
        const fallbackMessage: ChatMessage = { 
          isUser: false, 
          text: getFixedWelcomeMessage(currentCourse, currentLanguage),
          timestamp: Date.now()
        };
        
        setChatMessages([fallbackMessage]);
        setIsInitialLoad(false);
        
        // Cache the fallback message
        const cacheKey = `${currentCourse}_${currentLanguage}`;
        welcomeMessageCache[cacheKey] = fallbackMessage;
      }
    };

    loadChatHistory();
  }, [courseKey, currentCourse, currentLanguage, userName]);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (chatMessages.length > 0 && courseKey) {
      console.log(`Saving ${chatMessages.length} chat messages to: chat_history_${courseKey}`);
      localStorage.setItem(`chat_history_${courseKey}`, JSON.stringify(chatMessages));
    }
  }, [chatMessages, courseKey]);

  // Reset hasLoaded when courseKey changes
  useEffect(() => {
    if (courseKey) {
      hasLoadedRef.current = false;
    }
  }, [courseKey]);

  return {
    chatMessages,
    setChatMessages,
    isInitialLoad,
    setIsInitialLoad
  };
};

export default useChatHistory;
