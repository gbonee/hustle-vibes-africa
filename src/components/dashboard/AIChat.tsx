
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useUserPreferences } from '@/hooks/useUserPreferences';

interface ChatMessage {
  isUser: boolean;
  text: string;
}

interface AIChatProps {
  courseAvatar: string;
  userName: string;
}

const AIChat: React.FC<AIChatProps> = ({ courseAvatar, userName }) => {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const { userPrefs } = useUserPreferences();
  const [isLoading, setIsLoading] = useState(false);

  // Initialize chat with welcome message
  useEffect(() => {
    setChatMessages([
      { 
        isUser: false, 
        text: `Hey ${userName}! I'm your AI coach. How can I help you with your ${userPrefs?.courseName || 'course'} journey today?` 
      }
    ]);
  }, [userName, userPrefs?.courseName]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleMessageSend = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;

    // Add user message to chat
    setChatMessages(prev => [...prev, { isUser: true, text: message }]);
    
    // Store the message to clear the input
    const sentMessage = message;
    setMessage('');
    setIsLoading(true);

    try {
      // Call the edge function for AI response
      const { data, error } = await supabase.functions.invoke('chat-with-ai', {
        body: { 
          message: sentMessage, 
          course: userPrefs?.course || 'digital-marketing',
          language: userPrefs?.language || 'english'
        }
      });

      if (error) throw error;

      // Add AI response to chat
      setChatMessages(prev => [...prev, { isUser: false, text: data.response }]);
    } catch (error) {
      console.error('Error calling AI function:', error);
      // Add fallback response
      setChatMessages(prev => [...prev, { 
        isUser: false, 
        text: "Sorry, I'm having trouble connecting right now. Please try again later." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-muted border-electric">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={courseAvatar} />
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>Chat with Your AI Coach</CardTitle>
            <CardDescription>Hey {userName}, ask me anything about your course</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div 
          ref={chatBoxRef}
          className="h-80 overflow-y-auto flex flex-col space-y-4 mb-4 p-2"
        >
          {chatMessages.map((msg, index) => (
            msg.isUser ? (
              <div key={index} className="flex justify-end mb-4">
                <div className="bg-electric text-black p-3 rounded-lg max-w-[80%]">
                  <p>{msg.text}</p>
                </div>
              </div>
            ) : (
              <div key={index} className="flex mb-4">
                <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                  <img src={courseAvatar} alt="AI Avatar" className="w-full h-full object-cover" />
                </div>
                <div className="bg-muted p-3 rounded-lg max-w-[80%]">
                  <p>{msg.text}</p>
                </div>
              </div>
            )
          ))}
          
          {isLoading && (
            <div className="flex mb-4">
              <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                <img src={courseAvatar} alt="AI Avatar" className="w-full h-full object-cover" />
              </div>
              <div className="bg-muted p-3 rounded-lg max-w-[80%] flex items-center">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <form onSubmit={handleMessageSend} className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask your AI coach a question..."
            className="bg-black border-gray-700"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading}>Send</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AIChat;
