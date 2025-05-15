
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getSendButtonText, getPlaceholderText } from '../chatTranslations';

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
    <form onSubmit={onSubmit} className="flex gap-2">
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={getPlaceholderText(coachName, currentLanguage)}
        className="bg-black border-gray-700"
        disabled={isLoading}
      />
      <Button type="submit" disabled={isLoading}>
        {getSendButtonText(currentLanguage)}
      </Button>
    </form>
  );
};

export default ChatForm;
