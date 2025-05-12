import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { toast } from "sonner";
import { useIsMobile } from '@/hooks/use-mobile';
import PreviewMode from '@/components/common/PreviewMode';
import { ScrollArea } from "@/components/ui/scroll-area";

// Import types and helper functions
import { AIChatProps, ChatMessage as IChatMessage, Progress } from './types';
import { 
  getTranslatedCoachName, 
  getCourseSpecificGreeting 
} from './coachHelpers';
import {
  getLanguageSpecificErrorMessage,
  getLanguageSpecificErrorToast,
  getLanguageSpecificAction,
  getLanguageSpecificGreeting,
  getChatWithCoachText
} from './chatTranslations';

// Import custom hooks
import useChatHistory from './hooks/useChatHistory';

// Import components
import ChatMessage, { LoadingChatMessage } from './components/ChatMessage';
import QuickActionButtons from './components/QuickActionButtons';
import ChatForm from './components/ChatForm';

// Preload common chat assets
const preloadAssets = () => {
  // Preload coach avatars
  const avatars = [
    'https://img.freepik.com/premium-photo/mature-elderly-black-woman-wearing-traditional-nigerian-clothes-african-american-grandmother-is_777271-18892.jpg',
    'https://media.istockphoto.com/id/1269519579/photo/small-bakery-shop-owner-standing-in-front-of-store.jpg',
    'https://media.istockphoto.com/id/1296271163/photo/confident-businessman-with-arms-crossed.jpg'
  ];
  
  avatars.forEach(avatar => {
    const img = new Image();
    img.src = avatar;
  });
};

// Preload assets when module loads
preloadAssets();

const AIChat: React.FC<AIChatProps> = ({ courseAvatar, userName }) => {
  const [message, setMessage] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { userPrefs } = useUserPreferences();
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [currentCourseKey, setCurrentCourseKey] = useState<string>('');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const isMobile = useIsMobile();
  
  // Make sure we're using the current course from userPrefs
  const currentCourse = userPrefs?.course || 'digital-marketing';
  // Get the avatar-specific coach name based on the current course and language
  const currentLanguage = userPrefs?.language || 'pidgin';
  const coachName = getTranslatedCoachName(currentCourse, currentLanguage);
  const courseSpecificGreeting = getCourseSpecificGreeting(currentCourse);
  
  console.log("Current course in AIChat:", currentCourse);
  console.log("Coach name:", coachName);
  console.log("Current language:", currentLanguage);

  // Get chat history using our custom hook
  const { 
    chatMessages, 
    setChatMessages, 
    isInitialLoad 
  } = useChatHistory(currentCourseKey, currentCourse, currentLanguage, userName);

  // Initialize user ID and check preview mode - use useCallback to optimize
  const initializeChat = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        setUserId(user.id);
        // Create a unique key for this user+course combination
        const courseKey = `${user.id}_${currentCourse}_${currentLanguage}`;
        setCurrentCourseKey(courseKey);
        console.log("Setting course key for logged in user:", courseKey);
      } else {
        // Handle preview mode or user not logged in
        const courseKey = `preview_${currentCourse}_${currentLanguage}`;
        setCurrentCourseKey(courseKey);
        console.log("Setting course key for preview mode:", courseKey);
      }
    } catch (error) {
      console.error("Error initializing chat:", error);
      // Set a fallback course key
      const fallbackKey = `fallback_${currentCourse}_${currentLanguage}`;
      setCurrentCourseKey(fallbackKey);
    }
  }, [currentCourse, currentLanguage]);

  useEffect(() => {
    // Check if we're in preview mode
    const urlParams = new URLSearchParams(window.location.search);
    const preview = urlParams.get('forcePreview') === 'true';
    setIsPreviewMode(preview);

    initializeChat();
  }, [initializeChat]); // Depend only on the memoized function

  // Scroll to bottom of chat area when messages change
  useEffect(() => {
    if (scrollAreaRef.current && chatMessages.length > 0) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [chatMessages]);

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
  const formatChatHistoryForApi = useCallback(() => {
    // Only send the last 10 messages to keep context manageable
    const recentMessages = chatMessages.slice(-10);
    return recentMessages.map(msg => ({
      role: msg.isUser ? 'user' : 'assistant',
      content: msg.text
    }));
  }, [chatMessages]);

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

  const handleQuickAction = (action: string) => {
    const actionMessage = getLanguageSpecificAction(action, currentLanguage);
    setMessage(actionMessage);
  };

  return (
    <Card className="bg-muted border-electric">
      {isPreviewMode && (
        <PreviewMode 
          onLanguageChange={(lang) => {}} 
          currentLanguage={currentLanguage}
        />
      )}
      
      <CardHeader>
        <div className="flex items-center">
          <Avatar className="mr-3">
            <AvatarImage src={courseAvatar} />
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{getChatWithCoachText(coachName, currentLanguage)}</CardTitle>
            <CardDescription>{getLanguageSpecificGreeting(userName, courseSpecificGreeting, currentLanguage)}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <ScrollArea 
          ref={scrollAreaRef}
          className="h-80 mb-4 p-2"
          scrollHideDelay={100}
        >
          <div className="flex flex-col space-y-4">
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
        
        {/* Quick action buttons */}
        <QuickActionButtons 
          currentLanguage={currentLanguage}
          onActionSelect={handleQuickAction}
          isMobile={isMobile}
        />
        
        {/* Chat input form */}
        <ChatForm
          message={message}
          setMessage={setMessage}
          onSubmit={handleMessageSend}
          isLoading={isLoading}
          coachName={coachName}
          currentLanguage={currentLanguage}
        />
      </CardContent>
    </Card>
  );
};

export default AIChat;
