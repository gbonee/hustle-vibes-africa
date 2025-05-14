
import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
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
import useUserSession from './hooks/useUserSession';

// Import components
import ChatHeader from './components/ChatHeader';
import ChatContainer from './components/ChatContainer';
import QuickActionButtons from './components/QuickActionButtons';
import ChatForm from './components/ChatForm';
import { AIChatProps } from './types';

const AIChat: React.FC<AIChatProps> = ({ courseAvatar, userName }) => {
  const { userPrefs } = useUserPreferences();
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

  // Get user session information
  const { 
    userId, 
    currentCourseKey, 
    isPreviewMode 
  } = useUserSession({ 
    currentCourse, 
    currentLanguage 
  });

  // Get chat interaction logic from custom hook
  const {
    message,
    setMessage,
    isLoading,
    handleMessageSend,
    sendWelcomeMessage
  } = useChatInteraction({
    setChatMessages: () => {}, // This will be overridden in useChatHistory
    currentCourse,
    currentLanguage,
    userName
  });

  // Get chat history using our custom hook
  const { 
    chatMessages, 
    setChatMessages, 
    isInitialLoad 
  } = useChatHistory(
    currentCourseKey, 
    currentCourse, 
    currentLanguage, 
    userName,
    sendWelcomeMessage
  );

  // Update the setChatMessages reference in the chat interaction hook
  useChatInteraction({
    setChatMessages,
    currentCourse,
    currentLanguage,
    userName
  });

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
      
      <CardContent className="flex-grow p-3 pb-0 overflow-hidden">
        <ChatContainer 
          chatMessages={chatMessages}
          isLoading={isLoading}
          courseAvatar={courseAvatar}
        />
      </CardContent>
      
      <CardFooter className="flex flex-col gap-1 p-3 pt-1 mt-auto pb-safe">
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
