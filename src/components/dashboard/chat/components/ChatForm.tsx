
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
    <form onSubmit={onSubmit} className="flex flex-col sm:flex-row w-full gap-1 sticky bottom-0 bg-muted pt-1">
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={getPlaceholderText(coachName, currentLanguage)}
        className="bg-black border-gray-700 flex-grow min-h-[28px] max-h-[50px] sm:min-h-[32px] resize-none p-1.5"
        disabled={isLoading}
      />
      <Button 
        type="submit" 
        disabled={isLoading}
        className="w-full sm:w-auto py-0.5 h-7"
        size="sm"
      >
        <Send className="h-3.5 w-3.5 mr-1" />
        <span className="text-[10px]">
          {getSendButtonText(currentLanguage)}
        </span>
      </Button>
    </form>
  );
};

export default ChatForm;
