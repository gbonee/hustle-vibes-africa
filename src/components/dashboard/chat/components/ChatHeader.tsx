
import React from 'react';
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import PreviewMode from '@/components/common/PreviewMode';
import { getChatWithCoachText, getLanguageSpecificGreeting } from '../chatTranslations';

interface ChatHeaderProps {
  courseAvatar: string;
  coachName: string;
  userName: string;
  courseSpecificGreeting: string;
  currentLanguage: string;
  isPreviewMode: boolean;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  courseAvatar,
  coachName,
  userName,
  courseSpecificGreeting,
  currentLanguage,
  isPreviewMode
}) => {
  return (
    <>
      {isPreviewMode && (
        <PreviewMode 
          onLanguageChange={(lang) => {}} 
          currentLanguage={currentLanguage}
        />
      )}
      
      <CardHeader className="pb-2">
        <div className="flex items-center">
          <Avatar className="mr-3">
            <AvatarImage src={courseAvatar} />
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{getChatWithCoachText(coachName, currentLanguage)}</CardTitle>
            <CardDescription>
              {getLanguageSpecificGreeting(userName, courseSpecificGreeting, currentLanguage)}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
    </>
  );
};

export default ChatHeader;
