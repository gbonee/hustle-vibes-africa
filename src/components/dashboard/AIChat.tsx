
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { BookOpen, Award, HelpCircle, ArrowRight } from "lucide-react";
import { toast } from "sonner";

interface ChatMessage {
  isUser: boolean;
  text: string;
  gif?: string;
  timestamp: number;
}

interface AIChatProps {
  courseAvatar: string;
  userName: string;
}

interface Progress {
  completed: number;
  total: number;
  percentage: number;
}

const AIChat: React.FC<AIChatProps> = ({ courseAvatar, userName }) => {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const { userPrefs } = useUserPreferences();
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Initialize user ID
  useEffect(() => {
    const getUserId = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        // Load previous messages from localStorage
        const savedMessages = localStorage.getItem(`chat_history_${user.id}`);
        if (savedMessages) {
          const parsedMessages = JSON.parse(savedMessages);
          // Only load messages from the last 24 hours
          const oneDayAgo = Date.now() - (24 * 60 * 60 * 1000);
          const recentMessages = parsedMessages.filter(
            (msg: ChatMessage) => msg.timestamp > oneDayAgo
          );
          if (recentMessages.length > 0) {
            setChatMessages(recentMessages);
            setIsInitialLoad(false);
            return; // Don't add welcome message if we have recent messages
          }
        }
      }

      // We'll generate a proper welcome message via the AI instead of using a static one
      sendWelcomeMessage(userName, userPrefs?.course || 'digital-marketing');
    };

    getUserId();
  }, [userName, userPrefs?.course]);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (userId && chatMessages.length > 0) {
      localStorage.setItem(`chat_history_${userId}`, JSON.stringify(chatMessages));
    }
  }, [chatMessages, userId]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chatMessages]);

  // Generate a welcome message using the AI
  const sendWelcomeMessage = async (name: string, course: string) => {
    setIsLoading(true);
    
    try {
      const progress = getUserProgress();
      
      // Call the edge function for AI welcome message
      const { data, error } = await supabase.functions.invoke('chat-with-ai', {
        body: { 
          message: `Say hello to ${name} and introduce yourself as their AI coach for the ${course} course. Be very welcoming and cheerful. Speak in Pidgin English with lots of Nigerian flavor.`,
          course: course || 'digital-marketing',
          language: userPrefs?.language || 'pidgin', // Default to pidgin
          userName: name,
          progress,
          previousMessages: []
        }
      });

      if (error) throw error;

      // Add AI welcome response to chat
      setChatMessages([{ 
        isUser: false, 
        text: data.response,
        gif: data.gif,
        timestamp: Date.now()
      }]);
      
    } catch (error) {
      console.error('Error calling AI function for welcome message:', error);
      // Add fallback welcome message
      setChatMessages([{ 
        isUser: false, 
        text: `Wetin dey happen, ${name}! How you dey? I be your AI coach for this ${course} journey. Make we hammer together! Ask me anything, I go show you the way!`,
        timestamp: Date.now()
      }]);
    } finally {
      setIsLoading(false);
      setIsInitialLoad(false);
    }
  };

  // Mock progress data - in a real app, this would come from the database
  const getUserProgress = (): Progress => {
    // For now, return mock data
    return {
      completed: 2,
      total: 5,
      percentage: 40
    };
  };

  // Format chat history for API
  const formatChatHistoryForApi = () => {
    // Only send the last 10 messages to keep context manageable
    const recentMessages = chatMessages.slice(-10);
    return recentMessages.map(msg => ({
      role: msg.isUser ? 'user' : 'assistant',
      content: msg.text
    }));
  };

  const handleMessageSend = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;

    // Add user message to chat
    setChatMessages(prev => [...prev, { 
      isUser: true, 
      text: message,
      timestamp: Date.now()
    }]);
    
    // Store the message to clear the input
    const sentMessage = message;
    setMessage('');
    setIsLoading(true);

    try {
      const progress = getUserProgress();
      const previousMessages = formatChatHistoryForApi();

      // Call the edge function for AI response
      const { data, error } = await supabase.functions.invoke('chat-with-ai', {
        body: { 
          message: sentMessage, 
          course: userPrefs?.course || 'digital-marketing',
          language: userPrefs?.language || 'pidgin', // Default to pidgin
          userName,
          progress,
          previousMessages
        }
      });

      if (error) throw error;

      // Add AI response to chat
      setChatMessages(prev => [...prev, { 
        isUser: false, 
        text: data.response,
        gif: data.gif,
        timestamp: Date.now()
      }]);
    } catch (error) {
      console.error('Error calling AI function:', error);
      // Add fallback response
      setChatMessages(prev => [...prev, { 
        isUser: false, 
        text: "Chai! System don hang o! Try again later, my people!",
        timestamp: Date.now()
      }]);
      toast.error("AI coach no connect. Make you try again!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (action: string) => {
    let actionMessage = "";
    
    switch(action) {
      case 'next-lesson':
        actionMessage = "Abeg show me the next lesson wey I need to take.";
        break;
      case 'take-quiz':
        actionMessage = "I wan take quiz to test my knowledge now-now.";
        break;
      case 'help':
        actionMessage = "I need help with this course o! Things no too clear.";
        break;
      case 'challenge':
        actionMessage = "Give me challenge make I practice wetin I don learn.";
        break;
    }
    
    setMessage(actionMessage);
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
              <div key={index} className="flex flex-col mb-4">
                <div className="flex">
                  <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                    <img src={courseAvatar} alt="AI Avatar" className="w-full h-full object-cover" />
                  </div>
                  <div className="bg-muted p-3 rounded-lg max-w-[80%]">
                    <p className="whitespace-pre-line">{msg.text}</p>
                  </div>
                </div>
                {msg.gif && (
                  <div className="ml-13 mt-2 max-w-[200px]">
                    <img src={msg.gif} alt="Giphy reaction" className="rounded-lg" />
                  </div>
                )}
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
        
        {/* Quick action buttons */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleQuickAction('next-lesson')}
            className="flex items-center justify-center"
          >
            <BookOpen className="h-4 w-4 mr-1" />
            <span className="text-xs">Next Lesson</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleQuickAction('take-quiz')}
            className="flex items-center justify-center"
          >
            <Award className="h-4 w-4 mr-1" />
            <span className="text-xs">Take Quiz</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleQuickAction('challenge')}
            className="flex items-center justify-center"
          >
            <ArrowRight className="h-4 w-4 mr-1" />
            <span className="text-xs">Challenge</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleQuickAction('help')}
            className="flex items-center justify-center"
          >
            <HelpCircle className="h-4 w-4 mr-1" />
            <span className="text-xs">Get Help</span>
          </Button>
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
