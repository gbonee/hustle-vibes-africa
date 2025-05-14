
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { useIsMobile } from '@/hooks/use-mobile';

// Import types and helper functions
import { 
  getTranslatedCoachName, 
  getCourseSpecificGreeting 
} from './coachHelpers';
import { getLanguageSpecificAction } from './chatTranslations';

// Import custom hooks
import useChatHistory from './hooks/useChatHistory';
import useChatInteraction from './hooks/useChatInteraction';

// Import components
import ChatHeader from './components/ChatHeader';
import ChatContainer from './components/ChatContainer';
import QuickActionButtons from './components/QuickActionButtons';
import ChatForm from './components/ChatForm';
import { AIChatProps } from './types';

const AIChat: React.FC<AIChatProps> = ({ courseAvatar, userName }) => {
  const { userPrefs } = useUserPreferences();
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

  // Get chat interaction logic from custom hook
  const {
    message,
    setMessage,
    isLoading,
    handleMessageSend
  } = useChatInteraction({
    setChatMessages,
    currentCourse,
    currentLanguage,
    userName
  });

  // Initialize user ID and check preview mode
  useEffect(() => {
    const getUserId = async () => {
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
    };

    // Check if we're in preview mode
    const urlParams = new URLSearchParams(window.location.search);
    const preview = urlParams.get('forcePreview') === 'true';
    setIsPreviewMode(preview);

    getUserId();
  }, [currentCourse, currentLanguage]); // Make sure this re-runs when currentCourse or language changes

  const handleQuickAction = (action: string) => {
    const actionMessage = getLanguageSpecificAction(action, currentLanguage);
    setMessage(actionMessage);
  };

  return (
    <Card className="bg-muted border-electric flex flex-col h-full">
      <ChatHeader 
        courseAvatar={courseAvatar}
        coachName={coachName}
        userName={userName}
        courseSpecificGreeting={courseSpecificGreeting}
        currentLanguage={currentLanguage}
        isPreviewMode={isPreviewMode}
      />
      
      <CardContent className="flex-grow p-4 pb-0 overflow-hidden">
        <ChatContainer 
          chatMessages={chatMessages}
          isLoading={isLoading}
          courseAvatar={courseAvatar}
        />
      </CardContent>
      
      <CardFooter className="flex flex-col gap-3 p-4 pt-2 mt-auto">
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
          onSubmit={(e) => handleMessageSend(e, chatMessages)}
          isLoading={isLoading}
          coachName={coachName}
          currentLanguage={currentLanguage}
        />
      </CardFooter>
    </Card>
  );
};

export default AIChat;
