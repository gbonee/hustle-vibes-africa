
import React, { useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserPreferences } from '@/hooks/useUserPreferences';
import PreviewMode from '@/components/common/PreviewMode';
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAIChat } from '@/hooks/useAIChat';
import ChatMessages from '@/components/chat/ChatMessages';
import QuickActions from '@/components/chat/QuickActions';
import ChatInput from '@/components/chat/ChatInput';
import { 
  getTranslatedCoachName,
  getCourseSpecificGreeting,
  getLanguageSpecificAction,
  getLanguageSpecificGreeting,
  getChatWithCoachText
} from '@/utils/chatTranslations';

interface AIChatProps {
  courseAvatar: string;
  userName: string;
}

const AIChat: React.FC<AIChatProps> = ({ courseAvatar, userName }) => {
  const { userPrefs } = useUserPreferences();
  
  // Make sure we're using the current course from userPrefs
  const currentCourse = userPrefs?.course || 'digital-marketing';
  // Get the avatar-specific coach name based on the current course and language
  const currentLanguage = userPrefs?.language || 'pidgin';
  const coachName = getTranslatedCoachName(currentCourse, currentLanguage);
  const courseSpecificGreeting = getCourseSpecificGreeting(currentCourse);
  
  console.log("Current course in AIChat:", currentCourse);
  console.log("Coach name:", coachName);
  console.log("Current language:", currentLanguage);

  const {
    message,
    setMessage,
    chatMessages,
    isLoading,
    isInitialLoad,
    isPreviewMode,
    scrollAreaRef,
    userId,
    currentCourseKey,
    handleMessageSend,
    sendWelcomeMessage,
    loadChatHistory,
    updateCourseKey
  } = useAIChat(userName, courseAvatar);

  // Initialize chat when userPreferences change
  useEffect(() => {
    if (currentCourse && currentLanguage) {
      const courseKey = updateCourseKey(userId, currentCourse, currentLanguage);
      
      // Load previous messages or send welcome message
      const hasExistingMessages = loadChatHistory(courseKey);
      if (!hasExistingMessages && isInitialLoad) {
        sendWelcomeMessage(userName, currentCourse, currentLanguage);
      }
    }
  }, [userPrefs?.course, userPrefs?.language, userId]);

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
          <ChatMessages 
            messages={chatMessages} 
            isLoading={isLoading} 
            courseAvatar={courseAvatar} 
          />
        </ScrollArea>
        
        <QuickActions 
          onActionClick={handleQuickAction}
          currentLanguage={currentLanguage}
        />
        
        <ChatInput 
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
