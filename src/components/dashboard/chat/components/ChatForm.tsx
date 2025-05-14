
import React from 'react';
import { Button } from "@/components/ui/button";
import { getSendButtonText, getPlaceholderText } from '../chatTranslations';
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

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
    <form onSubmit={onSubmit} className="flex flex-col sm:flex-row w-full gap-2 sticky bottom-0 bg-muted pb-1 pt-1">
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={getPlaceholderText(coachName, currentLanguage)}
        className="bg-black border-gray-700 flex-grow min-h-[36px] max-h-[70px] sm:min-h-[40px] resize-none"
        disabled={isLoading}
      />
      <Button 
        type="submit" 
        disabled={isLoading}
        className="w-full sm:w-auto py-1 h-9"
        size="sm"
      >
        <Send className="h-4 w-4 mr-1" />
        <span className="text-sm">
          {getSendButtonText(currentLanguage)}
        </span>
      </Button>
    </form>
  );
};

export default ChatForm;
