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

// Import Progress type from chat types file
import { Progress } from './chat/types';

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

// Get translated coach names based on language
const getTranslatedCoachName = (course: string, language: string): string => {
  const baseCoachName = getCoachName(course);
  
  // Return the base name if no translation needed
  if (language === 'pidgin') {
    return baseCoachName;
  }
  
  // Coach name translations
  const coachNameTranslations: Record<string, Record<string, string>> = {
    yoruba: {
      'Digital Mama': 'Ìyá Díjítà',
      'Baker Amara': 'Aladàáná Amara',
      'Uncle Musa': 'Bàbá Musa'
    },
    hausa: {
      'Digital Mama': 'Mama Dijital',
      'Baker Amara': 'Mai Gashi Amara',
      'Uncle Musa': 'Kawu Musa'
    },
    igbo: {
      'Digital Mama': 'Nne Dijitạl',
      'Baker Amara': 'Onye Nri Amara',
      'Uncle Musa': 'Nna Nwanna Musa'
    }
  };
  
  // Return translated name or default to base name
  return coachNameTranslations[language]?.[baseCoachName] || baseCoachName;
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

const AIChat: React.FC<AIChatProps> = ({ courseAvatar, userName }) => {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { userPrefs } = useUserPreferences();
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [currentCourseKey, setCurrentCourseKey] = useState<string>('');
  const isMobile = useIsMobile();
  
  // Make sure we're using the current course from userPrefs
  const currentCourse = userPrefs?.course || 'digital-marketing';
  // Get the avatar-specific coach name based on the current course and language
  const currentLanguage = userPrefs?.language || 'pidgin';
  const coachName = getTranslatedCoachName(currentCourse, currentLanguage);
  const courseSpecificGreeting = getCourseSpecificGreeting(currentCourse);
  
  console.log("Current course in AIChat:", currentCourse);
  console.log("Coach name:", coachName);
  console.log("Current language:", currentLanguage);

  // Initialize user ID and check preview mode
  useEffect(() => {
    const getUserId = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        setUserId(user.id);
        // Create a unique key for this user+course combination
        const courseKey = `${user.id}_${currentCourse}_${currentLanguage}`;
        setCurrentCourseKey(courseKey);
        console.log("Setting course key for logged in user:", courseKey);
        
        // Load previous messages from localStorage for the SPECIFIC AVATAR/COURSE/LANGUAGE
        loadChatHistory(courseKey);
      } else {
        // Handle preview mode or user not logged in
        const courseKey = `preview_${currentCourse}_${currentLanguage}`;
        setCurrentCourseKey(courseKey);
        console.log("Setting course key for preview mode:", courseKey);
        
        // Load previous messages for preview mode
        loadChatHistory(courseKey);
      }
    };

    // Check if we're in preview mode
    const urlParams = new URLSearchParams(window.location.search);
    const preview = urlParams.get('forcePreview') === 'true';
    setIsPreviewMode(preview);

    getUserId();
  }, [currentCourse, currentLanguage]); // Make sure this re-runs when currentCourse or language changes

  // Function to load chat history
  const loadChatHistory = (courseKey: string) => {
    const savedMessages = localStorage.getItem(`chat_history_${courseKey}`);
    
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        // Only load messages from the last 7 days
        const sevenDaysAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
        const recentMessages = parsedMessages.filter(
          (msg: ChatMessage) => msg.timestamp > sevenDaysAgo
        );
        
        if (recentMessages.length > 0) {
          console.log(`Loading ${recentMessages.length} saved messages for ${courseKey}`);
          setChatMessages(recentMessages);
          setIsInitialLoad(false);
        } else {
          // If we have no recent messages, send a welcome message
          console.log(`No recent messages for ${courseKey}, sending welcome message`);
          sendWelcomeMessage(userName, currentCourse, currentLanguage);
        }
      } catch (error) {
        console.error("Error parsing saved messages:", error);
        sendWelcomeMessage(userName, currentCourse, currentLanguage);
      }
    } else {
      // If we have no saved messages at all, send a welcome message
      console.log(`No saved messages for ${courseKey}, sending welcome message`);
      sendWelcomeMessage(userName, currentCourse, currentLanguage);
    }
  };

  // Save messages to localStorage whenever they change - with course-specific key
  useEffect(() => {
    if (chatMessages.length > 0 && currentCourseKey) {
      console.log(`Saving ${chatMessages.length} chat messages to: chat_history_${currentCourseKey}`);
      localStorage.setItem(`chat_history_${currentCourseKey}`, JSON.stringify(chatMessages));
    }
  }, [chatMessages, currentCourseKey]);

  // Modified scroll behavior - only scroll for user messages, not AI responses
  useEffect(() => {
    if (!scrollAreaRef.current || chatMessages.length === 0) return;
    
    const lastMessage = chatMessages[chatMessages.length - 1];
    
    // Only auto-scroll if the last message is from the user
    if (lastMessage.isUser) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [chatMessages]);

  // Generate a welcome message using the AI
  const sendWelcomeMessage = async (name: string, course: string, language: string) => {
    setIsLoading(true);
    
    try {
      const progress = getUserProgress();
      console.log("Generating welcome message for course:", course, "language:", language);
      
      // Use the fixed welcome message for the specific course and language
      const welcomeMessage = getFixedWelcomeMessage(course, language);
      console.log("Using welcome message:", welcomeMessage);
      
      // Try to get a GIF for the welcome message
      let gifUrl = null;
      try {
        const giphyApiKey = "pLURtkhVrUXr4TN8PseRqbVN4n9Re7ky"; // Using a fixed GIPHY API key
        const searchTerm = "aki and pawpaw nigerian comedy"; // Always use Aki and Pawpaw
        
        const giphyResponse = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&q=${encodeURIComponent(searchTerm)}&limit=10&offset=0&rating=pg-13&lang=en&bundle=messaging_non_clips`);
        const giphyData = await giphyResponse.json();
        
        if (giphyData.data && giphyData.data.length > 0) {
          // Get a random GIF from the top 10 results for more variety
          const randomIndex = Math.floor(Math.random() * Math.min(10, giphyData.data.length));
          gifUrl = giphyData.data[randomIndex].images.fixed_height.url;
        }
      } catch (giphyError) {
        console.error('Giphy API error:', giphyError);
        // Continue without a GIF if there's an error
      }
      
      // Add welcome message to chat with the GIF
      setChatMessages([{ 
        isUser: false, 
        text: welcomeMessage,
        gif: gifUrl,
        timestamp: Date.now()
      }]);
      
    } catch (error) {
      console.error('Error generating welcome message:', error);
      // Add fallback welcome message - avatar-specific
      setChatMessages([{ 
        isUser: false, 
        text: getFixedWelcomeMessage(course, language),
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

    // Scroll to show user message immediately
    setTimeout(() => {
      if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
      }
    }, 100);

    try {
      const progress = getUserProgress();
      const previousMessages = formatChatHistoryForApi();

      console.log("Sending message to AI with course:", currentCourse, "language:", currentLanguage);

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

      // Add AI response to chat - no auto-scroll, let user see from start
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

  // Get translated action button labels
  const getQuickActionButtonText = (actionType: string): string => {
    const translations = {
      'next-lesson': {
        pidgin: 'Next Lesson',
        yoruba: 'Ẹ̀kọ́ Tókàn',
        hausa: 'Darasin Gaba',
        igbo: 'Ihe Ọmụmụ Ozugbo',
      },
      'take-quiz': {
        pidgin: 'Take Quiz',
        yoruba: 'Ṣe Idánwò',
        hausa: 'Yi Gwaji',
        igbo: 'Were Quiz',
      },
      'challenge': {
        pidgin: 'Challenge',
        yoruba: 'Ìdánwò',
        hausa: 'Kalubale',
        igbo: 'Ịma Aka',
      },
    };
    
    return translations[actionType]?.[currentLanguage] || translations[actionType]?.pidgin || actionType;
  };
  
  // Get translated "Chat with [coach]" text
  const getChatWithCoachText = (): string => {
    const translations = {
      pidgin: `Chat with ${coachName}`,
      yoruba: `Bá ${coachName} sọ̀rọ̀`,
      hausa: `Yi magana da ${coachName}`,
      igbo: `Soro ${coachName} kparịta ụka`,
    };
    
    return translations[currentLanguage] || translations.pidgin;
  };
  
  // Get placeholder text translation
  const getPlaceholderText = (): string => {
    const translations = {
      pidgin: `Ask ${coachName} a question...`,
      yoruba: `Bi ${coachName} ìbéèrè kan...`,
      hausa: `Tambayi ${coachName} tambaya...`,
      igbo: `Jụọ ${coachName} ajụjụ...`,
    };
    
    return translations[currentLanguage] || translations.pidgin;
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
            <CardTitle>{getChatWithCoachText()}</CardTitle>
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
        
        {/* Quick action buttons - now with translated text */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleQuickAction('next-lesson')}
            className="flex items-center justify-center"
          >
            <BookOpen className="h-4 w-4 mr-1" />
            <span className={isMobile ? "text-[10px]" : "text-xs"}>{getQuickActionButtonText('next-lesson')}</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleQuickAction('take-quiz')}
            className="flex items-center justify-center"
          >
            <Award className="h-4 w-4 mr-1" />
            <span className={isMobile ? "text-[10px]" : "text-xs"}>{getQuickActionButtonText('take-quiz')}</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleQuickAction('challenge')}
            className="flex items-center justify-center"
          >
            <ArrowRight className="h-4 w-4 mr-1" />
            <span className={isMobile ? "text-[10px]" : "text-xs"}>{getQuickActionButtonText('challenge')}</span>
          </Button>
        </div>
        
        <form onSubmit={handleMessageSend} className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={getPlaceholderText()}
            className="bg-black border-gray-700"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading}>
            {currentLanguage === 'pidgin' ? 'Send' : 
             currentLanguage === 'yoruba' ? 'Firánṣẹ́' :
             currentLanguage === 'hausa' ? 'Aika' :
             currentLanguage === 'igbo' ? 'Zipu' : 'Send'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AIChat;
