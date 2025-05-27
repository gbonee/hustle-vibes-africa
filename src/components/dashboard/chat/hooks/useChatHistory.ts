
import { useState, useEffect } from 'react';
import { ChatMessage } from '../types';
import { getFixedWelcomeMessage } from '../welcomeMessages';

export const useChatHistory = (
  courseKey: string, 
  currentCourse: string,
  currentLanguage: string,
  userName: string
) => {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Nigerian comedy search terms for better GIF variety
  const nigerianComedyTerms = [
    "aki and pawpaw nigerian comedy",
    "mama g nigerian comedy", 
    "wedding party nigerian movie funny",
    "nigerian nollywood comedy",
    "osita iheme chinedu ikedieze",
    "nigerian funny dance",
    "african comedy reaction",
    "nollywood funny scenes"
  ];

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
    
    // Generate a welcome message with Nigerian comedy GIF
    const sendWelcomeMessage = async () => {
      try {
        console.log("Generating welcome message for course:", currentCourse, "language:", currentLanguage);
        
        // Use the fixed welcome message for the specific course and language
        const welcomeMessage = getFixedWelcomeMessage(currentCourse, currentLanguage);
        console.log("Using welcome message:", welcomeMessage);
        
        // Try to get a Nigerian comedy GIF for the welcome message
        let gifUrl = null;
        try {
          const giphyApiKey = "pLURtkhVrUXr4TN8PseRqbVN4n9Re7ky";
          const randomTerm = nigerianComedyTerms[Math.floor(Math.random() * nigerianComedyTerms.length)];
          const randomOffset = Math.floor(Math.random() * 20);
          
          const giphyResponse = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&q=${encodeURIComponent(randomTerm)}&limit=10&offset=${randomOffset}&rating=pg-13&lang=en&bundle=messaging_non_clips`);
          const giphyData = await giphyResponse.json();
          
          if (giphyData.data && giphyData.data.length > 0) {
            // Filter for more relevant Nigerian comedy results
            const relevantGifs = giphyData.data.filter((gif: any) => {
              const title = (gif.title || '').toLowerCase();
              return title.includes('african') || 
                     title.includes('nigerian') || 
                     title.includes('nollywood') ||
                     title.includes('comedy') ||
                     title.includes('funny') ||
                     title.includes('dance') ||
                     title.includes('wedding');
            });
            
            const gifsToUse = relevantGifs.length > 0 ? relevantGifs : giphyData.data;
            const randomIndex = Math.floor(Math.random() * gifsToUse.length);
            gifUrl = gifsToUse[randomIndex].images.fixed_height.url;
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
        setIsInitialLoad(false);
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

  return {
    chatMessages,
    setChatMessages,
    isInitialLoad,
    setIsInitialLoad
  };
};

export default useChatHistory;
