
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getSendButtonText, getPlaceholderText } from '../chatTranslations';
import { cn } from '@/lib/utils';

interface ChatFormProps {
  message: string;
  setMessage: (message: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  coachName: string;
  currentLanguage: string;
}

const ChatForm: React.FC<ChatFormProps> = ({
  message,
  setMessage,
  onSubmit,
  isLoading,
  coachName,
  currentLanguage
}) => {
  return (
    <form onSubmit={onSubmit} className="flex gap-2 pb-1 sticky bottom-0 z-10">
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={getPlaceholderText(coachName, currentLanguage)}
        className={cn(
          "bg-black border-gray-700",
          "h-9 min-h-9" // Make input shorter
        )}
        disabled={isLoading}
      />
      <Button 
        type="submit" 
        disabled={isLoading}
        className="h-9 px-3 py-1 min-h-0" // Make button smaller
      >
        {getSendButtonText(currentLanguage)}
      </Button>
    </form>
  );
};

export default ChatForm;
