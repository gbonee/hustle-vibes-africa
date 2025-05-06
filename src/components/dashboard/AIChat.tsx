import React, { useState, useEffect, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { BookOpen, Award, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useIsMobile } from '@/hooks/use-mobile';
import PreviewMode from '@/components/common/PreviewMode';
import { ScrollArea } from "@/components/ui/scroll-area";

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

// Map course types to coach names
const getCoachName = (course: string): string => {
  switch (course) {
    case 'digital-marketing':
      return 'Digital Mama';
    case 'pastry-biz':
      return 'Baker Amara';
    case 'importation':
      return 'Uncle Musa';
    default:
      return 'Digital Mama';
  }
};

// Get course-specific greeting
const getCourseSpecificGreeting = (course: string): string => {
  switch (course) {
    case 'digital-marketing':
      return 'digital marketing';
    case 'pastry-biz':
      return 'pastry business';
    case 'importation':
      return 'importation business';
    default:
      return 'digital marketing';
  }
};

const AIChat: React.FC<AIChatProps> = ({ courseAvatar, userName }) => {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { userPrefs } = useUserPreferences();
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [currentCourseKey, setCurrentCourseKey] = useState<string>('');
  const isMobile = useIsMobile();
  
  // Always use the current course from userPrefs
  const currentCourse = userPrefs?.course || 'digital-marketing';
  // Get the avatar-specific coach name based on the current course
  const coachName = getCoachName(currentCourse);
  const courseSpecificGreeting = getCourseSpecificGreeting(currentCourse);
  const currentLanguage = userPrefs?.language || 'pidgin';
  
  console.log("Current course in AIChat:", currentCourse);
  console.log("Coach name:", coachName);

  // Initialize user ID and check preview mode
  useEffect(() => {
    const getUserId = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      let courseKey = '';
      
      if (user) {
        setUserId(user.id);
        // Create a unique key for this user+course combination
        courseKey = `${user.id}_${currentCourse}`;
        console.log("Setting course key for logged in user:", courseKey);
      } else {
        // Handle preview mode or user not logged in
        courseKey = `preview_${currentCourse}`;
        console.log("Setting course key for preview mode:", courseKey);
      }
      
      setCurrentCourseKey(courseKey);
      
      // Load previous messages from localStorage for the SPECIFIC AVATAR/COURSE
      const savedMessages = localStorage.getItem(`chat_history_${courseKey}`);
      if (savedMessages) {
        try {
          const parsedMessages = JSON.parse(savedMessages);
          // Only load messages from the last 7 days (was 24 hours - now extended)
          const sevenDaysAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
          const recentMessages = parsedMessages.filter(
            (msg: ChatMessage) => msg.timestamp > sevenDaysAgo
          );
          
          if (recentMessages.length > 0) {
            console.log(`Loading ${recentMessages.length} saved messages for ${courseKey}`);
            setChatMessages(recentMessages);
            setIsInitialLoad(false);
            return; // Don't add welcome message if we have recent messages
          }
        } catch (error) {
          console.error("Error parsing saved messages:", error);
        }
      }

      // If we reached here, we need to send a welcome message
      console.log(`No saved messages for ${courseKey}, sending welcome message`);
      setChatMessages([]); // Reset messages when changing avatar/course
      sendWelcomeMessage(userName, currentCourse);
    };

    // Check if we're in preview mode
    const urlParams = new URLSearchParams(window.location.search);
    const preview = urlParams.get('forcePreview') === 'true';
    setIsPreviewMode(preview);

    getUserId();
  }, [userName, currentCourse, currentLanguage]); // Added currentLanguage as dependency

  // Save messages to localStorage whenever they change - with course-specific key
  useEffect(() => {
    if (chatMessages.length > 0 && currentCourseKey) {
      console.log(`Saving ${chatMessages.length} chat messages to: ${currentCourseKey}`);
      localStorage.setItem(`chat_history_${currentCourseKey}`, JSON.stringify(chatMessages));
    }
  }, [chatMessages, currentCourseKey]);

  // Scroll to bottom of chat area when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [chatMessages]);

  // Generate a welcome message using the AI - updated to request avatar-specific messages
  const sendWelcomeMessage = async (name: string, course: string) => {
    setIsLoading(true);
    
    try {
      const progress = getUserProgress();
      console.log("Generating welcome message for course:", course);
      
      // Call the edge function for AI welcome message - requesting avatar-specific intro
      const { data, error } = await supabase.functions.invoke('chat-with-ai', {
        body: { 
          message: `Say hello to ${name} and introduce yourself as ${getCoachName(course)} for the ${course} course. Be VERY BRIEF (1-2 sentences only). Speak in ${currentLanguage} language with lots of Nigerian flavor.`,
          course: course, // Make sure to pass the correct course for avatar-specific prompt
          language: currentLanguage,
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
      // Add fallback welcome message - avatar-specific
      setChatMessages([{ 
        isUser: false, 
        text: getFixedWelcomeMessage(course, currentLanguage),
        timestamp: Date.now()
      }]);
    } finally {
      setIsLoading(false);
      setIsInitialLoad(false);
    }
  };

  // Fixed welcome messages for each avatar and language
  const getFixedWelcomeMessage = (course: string, language: string): string => {
    if (language === 'pidgin') {
      if (course === 'digital-marketing') {
        return "Ah! You don land! Digital Mama don show to teach you how to hammer for online space! No dull!";
      } else if (course === 'pastry-biz') {
        return "My darling! Baker Amara don show! Ready to bake money into your life!";
      } else if (course === 'importation') {
        return "Oya! Uncle Musa don land! Ready to show you importation business with correct connect!";
      }
    } else if (language === 'yoruba') {
      if (course === 'digital-marketing') {
        return "Ẹ ku àbọ̀! Èmi ni Digital Mama. Mo ti wá láti kọ́ ẹ nípa bí a ṣe ń ṣe owó lórí ìtakùn ayélujára!";
      } else if (course === 'pastry-biz') {
        return "Ẹ ku àbọ̀! Èmi ni Baker Amara. Mo wá láti kọ́ ẹ bí a ṣe ń ṣe owó pẹ̀lú àwọn oúnjẹ dídùn!";
      } else if (course === 'importation') {
        return "Ẹ ku àbọ̀! Èmi ni Uncle Musa. Mo wá láti kọ́ ẹ nípa bí a ṣe ń gbé ọjà wọlé láti ilẹ̀ Ṣáínà!";
      }
    } else if (language === 'hausa') {
      if (course === 'digital-marketing') {
        return "Barka da zuwa! Ni ne Digital Mama. Zan koya maka yadda za ka sami kuɗi ta hanyar dijital!";
      } else if (course === 'pastry-biz') {
        return "Barka da zuwa! Ni ne Baker Amara. Zan koya maka yadda za ka yi kasuwanci na abinci mai dadi!";
      } else if (course === 'importation') {
        return "Barka da zuwa! Ni ne Uncle Musa. Zan koya maka yadda za ka shigo da kaya daga China!";
      }
    } else if (language === 'igbo') {
      if (course === 'digital-marketing') {
        return "Nnọọ! Abụ m Digital Mama. Abịala m ịkụziri gị otú esi enweta ego site na mgbasa ozi dijitalụ!";
      } else if (course === 'pastry-biz') {
        return "Nnọọ! Abụ m Baker Amara. Abịala m ịkụziri gị otú isi enweta ego site na nri ụtọ!";
      } else if (course === 'importation') {
        return "Nnọọ! Abụ m Uncle Musa. Abịala m ịkụziri gị otú isi bubata ngwá ahịa site na China!";
      }
    }
    
    // Default fallback based on course
    return `Welcome! I am ${getCoachName(course)}. Let's talk about ${getCourseSpecificGreeting(course)}!`;
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
          course: currentCourse,
          language: currentLanguage,
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
      // Add fallback response in the chosen language
      setChatMessages(prev => [...prev, { 
        isUser: false, 
        text: getLanguageSpecificErrorMessage(),
        timestamp: Date.now()
      }]);
      toast.error(getLanguageSpecificErrorToast());
    } finally {
      setIsLoading(false);
    }
  };

  // Language-specific error messages
  const getLanguageSpecificErrorMessage = (): string => {
    switch (currentLanguage) {
      case 'pidgin':
        return "Chai! System don hang o! Try again later, my people!";
      case 'yoruba':
        return "Háà! Ẹ̀rọ náà ti dẹ́kun! Ẹ jọ̀wọ́ gbìyànjú lẹ́ẹ̀kan síi lẹ́yìn!";
      case 'hausa':
        return "Kai! Na'urar ta lalace! Ka sake gwadawa daga baya!";
      case 'igbo':
        return "Chei! Igwe ahụ adaala! Biko gbalịa ọzọ mgbe e mesịrị!";
      default:
        return "Chai! System don hang o! Try again later, my people!";
    }
  };

  // Language-specific error toast messages
  const getLanguageSpecificErrorToast = (): string => {
    switch (currentLanguage) {
      case 'pidgin':
        return "AI coach no connect. Make you try again!";
      case 'yoruba':
        return "Olùkọ́ AI kò le sopọ̀. Ẹ jọ̀wọ́ gbìyànjú lẹ́ẹ̀kan síi!";
      case 'hausa':
        return "Mai koyarwa na AI bai haɗa ba. Ka sake gwadawa!";
      case 'igbo':
        return "Onye nkuzi AI ejighị njikọ. Biko gbalịa ọzọ!";
      default:
        return "AI coach no connect. Make you try again!";
    }
  };

  const handleQuickAction = (action: string) => {
    let actionMessage = "";
    
    switch(action) {
      case 'next-lesson':
        actionMessage = getLanguageSpecificAction('next-lesson');
        break;
      case 'take-quiz':
        actionMessage = getLanguageSpecificAction('take-quiz');
        break;
      case 'challenge':
        actionMessage = getLanguageSpecificAction('challenge');
        break;
    }
    
    setMessage(actionMessage);
  };

  // Language-specific quick actions
  const getLanguageSpecificAction = (action: string): string => {
    if (currentLanguage === 'pidgin') {
      switch(action) {
        case 'next-lesson':
          return "Abeg show me the next lesson wey I need to take.";
        case 'take-quiz':
          return "I wan take quiz to test my knowledge now-now.";
        case 'help':
          return "I need help with this course o! Things no too clear.";
        case 'challenge':
          return "Give me challenge make I practice wetin I don learn.";
        default:
          return "";
      }
    } else if (currentLanguage === 'yoruba') {
      switch(action) {
        case 'next-lesson':
          return "Jọ̀wọ́ fi ẹ̀kọ́ tó kàn hàn mí.";
        case 'take-quiz':
          return "Mo fẹ́ ṣe ìdánwò láti dán ìmọ̀ mi wò báyìí.";
        case 'help':
          return "Mo nílò ìrànlọ́wọ́ pẹ̀lú ẹ̀kọ́ yìí o! Àwọn nǹkan kò tí ì yé mi dáadáa.";
        case 'challenge':
          return "Fún mi ní àdánwò kan kí n lè máa lo ohun tí mo ti kọ́.";
        default:
          return "";
      }
    } else if (currentLanguage === 'hausa') {
      switch(action) {
        case 'next-lesson':
          return "Don Allah nuna mini darasi na gaba da zan dauka.";
        case 'take-quiz':
          return "Ina son in yi gwaji don gwada ilimina yanzu.";
        case 'help':
          return "Ina bukatar taimako game da wannan darasin! Abubuwan ba su bayyana sosai ba.";
        case 'challenge':
          return "Bani wani kalubale don in yi amfani da abin da na koya.";
        default:
          return "";
      }
    } else if (currentLanguage === 'igbo') {
      switch(action) {
        case 'next-lesson':
          return "Biko gosipụta m ihe ọmụmụ na-esote m ga-amụta.";
        case 'take-quiz':
          return "Achọrọ m ime ule iji nyochaa ihe m maara ugbu a.";
        case 'help':
          return "Achọrọ m enyemaka maka ọzụzụ a! Ihe ndị a adọghị m anya nke ọma.";
        case 'challenge':
          return "Nye m ihe ịma aka ka m wee mụọ ihe m mụtara.";
        default:
          return "";
      }
    }
    
    return "";
  };

  // Generate language-specific greeting
  const getLanguageSpecificGreeting = (): string => {
    switch (currentLanguage) {
      case 'pidgin':
        return `How far ${userName}, you fit ask me anything about ${courseSpecificGreeting}`;
      case 'yoruba':
        return `Báwo ni ${userName}, ẹ lè bí mi nípa ohunkóhun nípa ${courseSpecificGreeting}`;
      case 'hausa':
        return `Sannu ${userName}, za ka iya tambaye ni komai game da ${courseSpecificGreeting}`;
      case 'igbo':
        return `Kedụ ${userName}, ị nwere ike ịjụ m ihe ọbụla gbasara ${courseSpecificGreeting}`;
      default:
        return `How far ${userName}, you fit ask me anything about ${courseSpecificGreeting}`;
    }
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
            <CardTitle>Chat with {coachName}</CardTitle>
            <CardDescription>{getLanguageSpecificGreeting()}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <ScrollArea 
          ref={scrollAreaRef}
          className="h-80 mb-4 p-2"
          scrollHideDelay={100}
        >
          <div className="flex flex-col space-y-4">
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
        </ScrollArea>
        
        {/* Quick action buttons - now in a grid with 3 columns for mobile */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleQuickAction('next-lesson')}
            className="flex items-center justify-center"
          >
            <BookOpen className="h-4 w-4 mr-1" />
            <span className={isMobile ? "text-[10px]" : "text-xs"}>Next Lesson</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleQuickAction('take-quiz')}
            className="flex items-center justify-center"
          >
            <Award className="h-4 w-4 mr-1" />
            <span className={isMobile ? "text-[10px]" : "text-xs"}>Take Quiz</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleQuickAction('challenge')}
            className="flex items-center justify-center"
          >
            <ArrowRight className="h-4 w-4 mr-1" />
            <span className={isMobile ? "text-[10px]" : "text-xs"}>Challenge</span>
          </Button>
        </div>
        
        <form onSubmit={handleMessageSend} className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={`Ask ${coachName} a question...`}
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
