
import React, { FormEvent } from 'react';
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatFormProps {
  message: string;
  setMessage: (message: string) => void;
  onSubmit: (e: FormEvent) => void;
  isLoading: boolean;
  coachName: string;
  currentLanguage: string;
  disabled?: boolean;
}

const ChatForm: React.FC<ChatFormProps> = ({ 
  message, 
  setMessage, 
  onSubmit, 
  isLoading,
  coachName,
  currentLanguage,
  disabled = false
}) => {
  // Get placeholder text based on language
  const getPlaceholder = () => {
    switch(currentLanguage) {
      case 'yoruba':
        return `Bèèrè ìbéèrè lọ́wọ́ ${coachName}...`;
      case 'hausa':
        return `Tambaye ${coachName} tambaya...`;
      case 'igbo':
        return `Jụọ ${coachName} ajụjụ...`;
      default:
        return `Ask ${coachName} a question...`;
    }
  };
  
  return (
    <form onSubmit={onSubmit} className="flex w-full gap-2">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={getPlaceholder()}
        className="flex-1 bg-background text-foreground px-4 py-2 rounded-full border border-input focus:outline-none focus:ring-1 focus:ring-electric"
        disabled={isLoading || disabled}
      />
      <Button 
        type="submit" 
        size="icon" 
        className="shrink-0 rounded-full bg-electric hover:bg-electric/80"
        disabled={isLoading || !message.trim() || disabled}
      >
        {isLoading ? (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
        ) : (
          <Send className="h-4 w-4" />
        )}
      </Button>
    </form>
  );
};

export default ChatForm;
