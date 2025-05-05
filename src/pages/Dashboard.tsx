import React, { useState, useEffect, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Video, MessageSquare } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useUserPreferences } from '@/hooks/useUserPreferences';
import DashboardLayout from '@/components/layout/DashboardLayout';
import CourseHeader from '@/components/dashboard/CourseHeader';
import ModulesList, { Module } from '@/components/dashboard/ModulesList';
import ModuleDetail from '@/components/dashboard/ModuleDetail';
import AIChat from '@/components/dashboard/AIChat';
import { Quiz } from '@/types/quiz';
import { Skeleton } from '@/components/ui/skeleton';
import PreviewMode from '@/components/common/PreviewMode';
import { updateModuleCompletion, updateCourseProgress, getUserCourseProgress, getModuleCompletionData, awardQuizPoints } from '@/utils/progressTracker';
import { useToast } from '@/hooks/use-toast';

// Define types
interface Course {
  id: string;
  title: string;
  avatar: string;
  progress: number;
  modules: Module[];
  translations: {
    [key: string]: {
      title: string;
      modules: {
        id: number;
        title: string;
      }[];
    }
  };
}

// Group quizzes by module topic
interface QuizzesByModule {
  [moduleId: number]: Quiz[];
}

// Text translations for UI elements
const uiTranslations = {
  pidgin: {
    lessons: "Lessons",
    chat: "AI Chat",
    yourModules: "Your Modules",
    back: "Back to All Modules",
    loading: "Dey load...",
  },
  yoruba: {
    lessons: "Ẹkọ",
    chat: "Ibaraẹnisọrọ AI",
    yourModules: "Awọn Modulu Rẹ",
    back: "Pada si Gbogbo Modulu",
    loading: "Ń gbàá...",
  },
  hausa: {
    lessons: "Darussan",
    chat: "AI Tattaunawa",
    yourModules: "Modules Naka",
    back: "Koma Zuwa Duk Modules",
    loading: "Ana loading...",
  },
  igbo: {
    lessons: "Ihe omume",
    chat: "AI Okwu",
    yourModules: "Modules Gị",
    back: "Laghachi na Modules Nile",
    loading: "Na-ebubata...",
  },
  english: {
    lessons: "Lessons",
    chat: "AI Chat",
    yourModules: "Your Modules",
    back: "Back to All Modules",
    loading: "Loading...",
  }
};

const Dashboard = () => {
  const { userPrefs } = useUserPreferences();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("lessons");
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [user, setUser] = useState({
    id: 'preview-user-id',
    name: 'Preview User',
    email: 'preview@example.com',
    avatar: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1'
  });
  const [courseProgress, setCourseProgress] = useState({
    progress: 0,
    completedModules: [] as number[]
  });
  
  // Get current language for translations (default to English if not set)
  const currentLanguage = userPrefs?.language || 'pidgin';
  const texts = uiTranslations[currentLanguage as keyof typeof uiTranslations] || uiTranslations.english;
  
  // Check for preview mode
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const preview = urlParams.get('forcePreview') === 'true';
    setIsPreviewMode(preview);
    
    // In preview mode, set loading to false immediately
    if (preview) {
      setIsLoading(false);
      return;
    }
    
    // Fetch user data
    const fetchUserData = async () => {
      try {
        const { data: { user: authUser } } = await supabase.auth.getUser();
        
        if (!authUser) {
          setIsLoading(false);
          return;
        }
        
        // Get the user's profile if it exists
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', authUser.id)
          .maybeSingle();
        
        setUser({
          id: authUser.id,
          name: profile?.display_name || authUser.user_metadata?.full_name || authUser.email?.split('@')[0] || 'User',
          email: authUser.email || '',
          avatar: profile?.avatar_url || "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1"
        });
        
        // Fetch course progress if available for the current user
        await fetchCourseProgress();
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserData();
  }, []);
  
  // Fetch course progress
  const fetchCourseProgress = async () => {
    try {
      const courseId = userPrefs?.course || 'digital-marketing';
      
      // Get overall course progress
      const courseProgressData = await getUserCourseProgress(courseId);
      
      // Get individual module completion data
      const moduleCompletionData = await getModuleCompletionData(courseId);
      
      // Extract completed module IDs
      const completedModuleIds = moduleCompletionData
        .filter(module => module.completed)
        .map(module => module.module_id);
      
      setCourseProgress({
        progress: courseProgressData?.progress_percentage || 0,
        completedModules: completedModuleIds
      });
    } catch (error) {
      console.error("Error fetching course progress:", error);
    }
  };
  
  // Mock course data with translations
  const courses: Record<string, Course> = {
    'digital-marketing': {
      id: 'digital-marketing',
      title: 'Digital Marketing the Naija Way',
      avatar: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9',
      progress: 25,
      modules: [
        { id: 1, title: 'Intro to Digital Marketing the Naija Way', hasVideo: false, completed: true, locked: false },
        { id: 2, title: 'How to Sell on WhatsApp & Instagram', hasVideo: true, completed: false, locked: false },
        { id: 3, title: 'Create Content That Converts (Even With Just Your Phone)', hasVideo: true, completed: false, locked: true },
        { id: 4, title: 'How to Run Small Ads on Meta', hasVideo: false, completed: false, locked: true },
        { id: 5, title: 'How to Keep Customers & Sell Weekly', hasVideo: true, completed: false, locked: true }
      ],
      translations: {
        pidgin: {
          title: 'Digital Marketing di Naija Way',
          modules: [
            { id: 1, title: 'Introduction to Digital Marketing di Naija Way' },
            { id: 2, title: 'How to Sell for WhatsApp & Instagram' },
            { id: 3, title: 'Create Content Wey Go Convert (Even With Just Your Phone)' },
            { id: 4, title: 'How to Run Small Ads for Meta' },
            { id: 5, title: 'How to Keep Customers & Sell Every Week' }
          ]
        },
        yoruba: {
          title: 'Ìpolówó ojú òpó lójú kan Nàìjíríà',
          modules: [
            { id: 1, title: 'Ìfihan sí Ìpolówó ojú òpó lójú kan Nàìjíríà' },
            { id: 2, title: 'Báwo ni o ṣe le tà lórí WhatsApp & Instagram' },
            { id: 3, title: 'Ṣe àwọn àkóónú tí ó ń yípadà (Pẹlú fóònù rẹ nìkan)' },
            { id: 4, title: 'Báwo ni o ṣe le ṣe àfihàn kékeré lórí Meta' },
            { id: 5, title: 'Báwo ni o ṣe le dá àwọn oníbàárà dúró & tà ní ọ̀sẹ̀-n-ọ̀sẹ̀' }
          ]
        },
        hausa: {
          title: 'Tallace-tallace na Dijital a hanyar Naija',
          modules: [
            { id: 1, title: 'Gabatarwa zuwa Tallace-tallace na Dijital a hanyar Naija' },
            { id: 2, title: 'Yadda ake sayar a WhatsApp & Instagram' },
            { id: 3, title: 'Kirkira abun ciki mai amfani (Ko da wayar ka kawai)' },
            { id: 4, title: 'Yadda ake gudanar da taɓo na ƙarami a Meta' },
            { id: 5, title: 'Yadda ake kula da abokan ciniki & sayar kowane sati' }
          ]
        },
        igbo: {
          title: "Mgbasa ozi dijitalu n'uzo Naija",
          modules: [
            { id: 1, title: "Mmalite na mgbasa ozi dijitalu n'uzo Naija" },
            { id: 2, title: "Otu e si ere na WhatsApp & Instagram" },
            { id: 3, title: "Meputa ihe ndi na-atughari (Obuna site na ekwenti gi)" },
            { id: 4, title: "Otu e si agba mgbasa ozi nta na Meta" },
            { id: 5, title: "Otu e si edebe ndi ahia & re kwa izu" }
          ]
        }
      }
    },
    // ... other courses with similar translation structure
    'pastry-biz': {
      id: 'pastry-biz',
      title: 'Start a Pastry Biz From Your Kitchen',
      avatar: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901',
      progress: 20,
      modules: [
        { id: 1, title: 'Intro to Baking as a Business in Nigeria', hasVideo: false, completed: true, locked: false },
        { id: 2, title: 'How to Make Puff-Puff That Sells', hasVideo: true, completed: false, locked: false },
        { id: 3, title: 'How to Make Nigerian Meatpie', hasVideo: false, completed: false, locked: true },
        { id: 4, title: 'Branding & Packaging for Pastry Biz', hasVideo: true, completed: false, locked: true },
        { id: 5, title: 'How to Find Your First Customers & Start Selling', hasVideo: true, completed: false, locked: true }
      ],
      translations: {
        pidgin: {
          title: 'Start Pastry Business From Your Kitchen',
          modules: [
            { id: 1, title: 'Introduction to Baking as Business for Nigeria' },
            { id: 2, title: 'How to Make Puff-Puff Wey Go Sell Well-well' },
            { id: 3, title: 'How to Make Nigerian Meatpie' },
            { id: 4, title: 'Branding & Packaging for Pastry Business' },
            { id: 5, title: 'How to Find Your First Customers & Begin Sell' }
          ]
        },
        yoruba: {
          title: 'Bẹrẹ Iṣẹ́ àwọn oúnjẹ adùn láti inú kíchẹ́ẹ̀nì rẹ',
          modules: [
            { id: 1, title: 'Ìfihan sí Ìdáná gẹ́gẹ́ bí Iṣẹ́ ní Nàìjíríà' },
            { id: 2, title: 'Báwo ni o ṣe le ṣe Puff-Puff tí yóò tà' },
            { id: 3, title: 'Báwo ni o ṣe le ṣe Ẹran-àkàrà Nàìjíríà' },
            { id: 4, title: 'Àmì & Ipèsè fún Iṣẹ́ Ìdáná' },
            { id: 5, title: 'Báwo ni o ṣe le rí àwọn Oníbàárà àkọ́kọ́ rẹ & Bẹrẹ Títà' }
          ]
        },
        hausa: {
          title: 'Fara Harkar Abinci Mai Zaki Daga Dakin Girkinki',
          modules: [
            { id: 1, title: 'Gabatarwa zuwa Gashin Burodi a matsayin Kasuwanci a Najeriya' },
            { id: 2, title: 'Yadda ake yin Puff-Puff da ke sayarwa' },
            { id: 3, title: 'Yadda ake yin Meatpie na Najeriya' },
            { id: 4, title: 'Branding & Packaging domin Kasuwancin Pastry' },
            { id: 5, title: 'Yadda ake samun Masu Sayayya na Farko & Fara Sayarwa' }
          ]
        },
        igbo: {
          title: "Malite azumaahia pastry site na ulo nri gi",
          modules: [
            { id: 1, title: "Mmalite na ihe mgbaka di ka azumaahia na Naijiria" },
            { id: 2, title: "Otu e si eme puff-puff nke na-ere ere" },
            { id: 3, title: "Otu e si eme Meatpie Naijiria" },
            { id: 4, title: "Branding & Packaging maka azumaahia Pastry" },
            { id: 5, title: "Otu iga achota ndi ahia mbu gi & malite ire" }
          ]
        }
      }
    },
    'importation': {
      id: 'importation',
      title: 'Import From China & Sell on WhatsApp',
      avatar: 'https://images.unsplash.com/photo-1501286353178-1ec871214838',
      progress: 15,
      modules: [
        { id: 1, title: 'How to Find Hot-Selling Products Nigerians Want', hasVideo: false, completed: true, locked: false },
        { id: 2, title: 'Where to Buy Cheap: 1688, Alibaba & Hidden Supplier Hacks', hasVideo: true, completed: false, locked: false },
        { id: 3, title: 'Shipping & Delivery: How to Import Without Wahala', hasVideo: false, completed: false, locked: true },
        { id: 4, title: 'How to Market & Sell FAST on WhatsApp & Instagram', hasVideo: true, completed: false, locked: true },
        { id: 5, title: 'Pricing, Profit & Customer Service Tips to Keep Sales Coming', hasVideo: false, completed: false, locked: true }
      ],
      translations: {
        pidgin: {
          title: 'Import From China & Sell for WhatsApp',
          modules: [
            { id: 1, title: 'How to Find Hot-Selling Products Wey Nigerians Want' },
            { id: 2, title: 'Where to Buy Cheap: 1688, Alibaba & Hidden Supplier Hacks' },
            { id: 3, title: 'Shipping & Delivery: How to Import Without Wahala' },
            { id: 4, title: 'How to Market & Sell FAST for WhatsApp & Instagram' },
            { id: 5, title: 'Pricing, Profit & Customer Service Tips to Keep Sales Coming' }
          ]
        },
        yoruba: {
          title: 'Mú wá láti Ṣáínà & Ta lórí WhatsApp',
          modules: [
            { id: 1, title: 'Báwo ni o ṣe le rí àwọn ọjà tí ń tà gbòógì tí àwọn ará Nàìjíríà fẹ́' },
            { id: 2, title: 'Níbo ni o le rà ní ìdíẹ̀: 1688, Alibaba & àwọn èdí àwọn olùpèsè' },
            { id: 3, title: 'Ìfiránṣẹ́ & Ìfì ránṣẹ́: Báwo ni o ṣe le mú wọlé láìsí wàhálà' },
            { id: 4, title: 'Báwo ni o ṣe le polowo & tà KÍÁKÍÁ lórí WhatsApp & Instagram' },
            { id: 5, title: 'Àwọn ìdámọ̀ràn Ìdíyelé, Èrè & Iṣẹ́ Oníbàárà láti jẹ́ kí àwọn ìtàjà máa bá wọlé' }
          ]
        },
        hausa: {
          title: 'Shigo daga China & Sayar a WhatsApp',
          modules: [
            { id: 1, title: 'Yadda ake samun kayayyakin da ke sayarwa masu zafi wanda Najeriyawan ke so' },
            { id: 2, title: 'Inda za a saya a arha: 1688, Alibaba & hanyoyin samun masu samar da kaya na asiri' },
            { id: 3, title: 'Jigilar kaya & Isar: Yadda ake shigo ba tare da wahala ba' },
            { id: 4, title: 'Yadda ake tallata & sayar da SAURI a WhatsApp & Instagram' },
            { id: 5, title: 'Shawarwari game da farashin, riba & hidimar abokin ciniki don ci gaba da sayarwa' }
          ]
        },
        igbo: {
          title: "Bubata site na China & Ree na WhatsApp",
          modules: [
            { id: 1, title: "Otu iga achota ngwa ahia ndi na-ere oku ndi Naijiria choro" },
            { id: 2, title: "Ebe i ga-azuta onu ala: 1688, Alibaba & usoro nzuzo nke ndi na-eweta ngwa ahia" },
            { id: 3, title: "Mbupu & Nnyefe: Otu e si ebubata na-enwegh nsogbu" },
            { id: 4, title: "Otu e si eme mgbasa ozi & ree NGWA NGWA na WhatsApp & Instagram" },
            { id: 5, title: "Ndumoodu maka iko ugwo, uru & oru ndi ahia iji na-eleta ahia" }
          ]
        }
      }
    }
  };

  // Module-specific quizzes - Memoized to avoid recreating on each render
  const quizzesByModule: QuizzesByModule = React.useMemo(() => ({
    // Digital Marketing Module 1
    1: [
      {
        question: 'What is the primary purpose of digital marketing in Nigeria?',
        options: ['To have a website', 'To reach and engage customers online', 'To post on social media daily', 'To spend money on ads'],
        answer: 1,
        moduleId: 1,
        moduleTopic: 'Intro to Digital Marketing the Naija Way'
      },
      {
        question: 'Which platform has the highest user base in Nigeria?',
        options: ['LinkedIn', 'WhatsApp', 'Twitter', 'Snapchat'],
        answer: 1,
        moduleId: 1,
        moduleTopic: 'Intro to Digital Marketing the Naija Way'
      },
      {
        question: 'What is a key advantage of digital marketing for small Nigerian businesses?',
        options: ['It requires lots of capital', 'It works without electricity', 'It allows for targeted customer reach', 'It guarantees overnight success'],
        answer: 2,
        moduleId: 1,
        moduleTopic: 'Intro to Digital Marketing the Naija Way'
      }
    ],
    
    // Digital Marketing Module 2
    2: [
      {
        question: 'What is the best way to organize your WhatsApp business account?',
        options: ['Mix personal and business chats', 'Create broadcast lists for different product categories', 'Only post status updates', 'Send messages at random times'],
        answer: 1,
        moduleId: 2,
        moduleTopic: 'How to Sell on WhatsApp & Instagram'
      },
      {
        question: 'Which Instagram feature is best for showcasing your products?',
        options: ['IGTV', 'Reels', 'Stories', 'Shop'],
        answer: 3,
        moduleId: 2,
        moduleTopic: 'How to Sell on WhatsApp & Instagram'
      },
      {
        question: 'How often should you follow up with potential customers on WhatsApp?',
        options: ['Every hour until they respond', 'Once a week', 'Every 2-3 days', 'Never follow up'],
        answer: 2,
        moduleId: 2,
        moduleTopic: 'How to Sell on WhatsApp & Instagram'
      }
    ],
    
    // Pastry Business Module 1
    101: [
      {
        question: 'What is the most important factor when starting a pastry business in Nigeria?',
        options: ['A large kitchen space', 'High-quality ingredients', 'Expensive equipment', 'Many staff members'],
        answer: 1,
        moduleId: 101,
        moduleTopic: 'Intro to Baking as a Business in Nigeria'
      },
      {
        question: 'What capital is typically needed to start a small pastry business from your kitchen?',
        options: ['₦5,000 - ₦20,000', '₦20,000 - ₦50,000', '₦50,000 - ₦150,000', 'At least ₦500,000'],
        answer: 2,
        moduleId: 101,
        moduleTopic: 'Intro to Baking as a Business in Nigeria'
      },
      {
        question: 'Which pastry product typically has the highest profit margin in Nigeria?',
        options: ['Bread', 'Cakes', 'Small chops', 'Pies'],
        answer: 2,
        moduleId: 101,
        moduleTopic: 'Intro to Baking as a Business in Nigeria'
      }
    ],
    
    // Importation Module 1
    201: [
      {
        question: 'What is the first step in finding hot-selling products for the Nigerian market?',
        options: ['Copy what others are selling', 'Conduct market research', 'Import random items', 'Ask friends what they like'],
        answer: 1,
        moduleId: 201,
        moduleTopic: 'How to Find Hot-Selling Products Nigerians Want'
      },
      {
        question: 'Which category of products typically has high demand in Nigeria?',
        options: ['Luxury items', 'Everyday essentials', 'Collectibles', 'Seasonal items'],
        answer: 1,
        moduleId: 201,
        moduleTopic: 'How to Find Hot-Selling Products Nigerians Want'
      },
      {
        question: 'How can you test if a product will sell well before ordering in bulk?',
        options: ['Pre-sell to your audience', 'Order just one sample', 'Check social media trends', 'All of the above'],
        answer: 3,
        moduleId: 201,
        moduleTopic: 'How to Find Hot-Selling Products Nigerians Want'
      }
    ]
  }), []);
  
  // Translate quiz questions based on language
  const getTranslatedQuizzes = (moduleId: number): Quiz[] => {
    const originalQuizzes = quizzesByModule[moduleId] || [];
    
    // Only translate if needed - add translations for each language
    if (currentLanguage === 'pidgin') {
      // Apply Pidgin translations for quizzes
      return originalQuizzes.map(quiz => {
        if (moduleId === 1) {
          // Example translation for moduleId 1 questions
          if (quiz.question === 'What is the primary purpose of digital marketing in Nigeria?') {
            return {
              ...quiz,
              question: 'Wetin be the main reason for digital marketing for Nigeria?',
              options: ['To get website', 'To reach and engage customers online', 'To dey post for social media everyday', 'To spend money for ads'],
            };
          }
        }
        return quiz;
      });
    }
    
    // Add similar translations for other languages
    
    return originalQuizzes; // Return original if no translation
  };
  
  const handleModuleSelect = (module: Module) => {
    if (module.locked) return;
    setSelectedModule(module);
  };

  const handleCloseModule = () => {
    setSelectedModule(null);
    // Refresh course progress when closing a module
    fetchCourseProgress();
  };
  
  // Handle module completion
  const handleModuleComplete = async (moduleId: number) => {
    try {
      const courseId = userPrefs?.course || 'digital-marketing';
      
      // Update module completion in the database
      await updateModuleCompletion({
        courseId,
        moduleId,
        completed: true,
        progress: 100
      });
      
      // Update overall course progress
      await updateCourseProgress(courseId);
      
      // Refresh course progress data
      await fetchCourseProgress();
      
      toast({
        title: "Module Completed!",
        description: "Your progress has been updated.",
        variant: "default",
      });
    } catch (error) {
      console.error("Error updating module completion:", error);
      toast({
        title: "Error",
        description: "There was an error updating your progress.",
        variant: "destructive",
      });
    }
  };
  
  // Handle quiz completion
  const handleQuizComplete = async (moduleId: number, correct: boolean) => {
    if (!correct) return;
    
    try {
      const courseId = userPrefs?.course || 'digital-marketing';
      
      // Award points for completing the quiz
      await awardQuizPoints(moduleId, courseId);
      
      // Refresh course progress
      await fetchCourseProgress();
      
      toast({
        title: "Quiz Completed!",
        description: "You've earned points for completing the quiz!",
        variant: "default",
      });
    } catch (error) {
      console.error("Error handling quiz completion:", error);
    }
  };

  // Use digital marketing as default course if no preference is set
  const userCourse = userPrefs?.course ? courses[userPrefs.course] : courses['digital-marketing'];
  
  // Apply completion status to modules based on database data
  const getCoursesWithCompletionStatus = () => {
    const course = { ...userCourse };
    
    // Apply completion status from database
    course.modules = course.modules.map(module => {
      const isCompleted = courseProgress.completedModules.includes(module.id);
      return {
        ...module,
        completed: isCompleted
      };
    });
    
    // Update progress percentage
    course.progress = courseProgress.progress;
    
    return course;
  };
  
  // Get translated course content with updated completion status
  const getTranslatedCourse = () => {
    const course = getCoursesWithCompletionStatus();
    
    // Apply translations if available
    if (currentLanguage && course.translations && course.translations[currentLanguage]) {
      const translation = course.translations[currentLanguage];
      
      // Apply translated title
      course.title = translation.title;
      
      // Apply translated module titles
      course.modules = course.modules.map(module => {
        const translatedModule = translation.modules.find(m => m.id === module.id);
        return translatedModule ? { ...module, title: translatedModule.title } : module;
      });
    }
    
    return course;
  };
  
  const translatedCourse = getTranslatedCourse();

  if (isLoading) {
    return (
      <DashboardLayout currentPath="/dashboard" user={user}>
        <div className="w-full space-y-4">
          <Skeleton className="h-40 w-full" />
          <div className="space-y-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout currentPath="/dashboard" user={user}>
      {isPreviewMode && <PreviewMode />}
      
      {/* Course Info Card */}
      <CourseHeader 
        title={translatedCourse.title} 
        avatar={translatedCourse.avatar} 
        progress={translatedCourse.progress} 
      />

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-6 bg-black">
          <TabsTrigger value="lessons" className="text-lg">
            <Video className="mr-2 h-4 w-4" />
            {texts.lessons}
          </TabsTrigger>
          <TabsTrigger value="chat" className="text-lg">
            <MessageSquare className="mr-2 h-4 w-4" />
            {texts.chat}
          </TabsTrigger>
        </TabsList>
        
        {/* Lessons Tab */}
        <TabsContent value="lessons" className="space-y-4">
          {selectedModule ? (
            <ModuleDetail 
              module={selectedModule} 
              quizzes={getTranslatedQuizzes(selectedModule.id)} 
              onClose={handleCloseModule}
              onModuleComplete={() => handleModuleComplete(selectedModule.id)}
              onQuizComplete={(correct) => handleQuizComplete(selectedModule.id, correct)}
              language={currentLanguage}
              texts={texts}
            />
          ) : (
            <div>
              <h2 className="text-xl font-bold mb-4">{texts.yourModules}</h2>
              <ModulesList 
                modules={translatedCourse.modules} 
                onModuleSelect={handleModuleSelect} 
              />
            </div>
          )}
        </TabsContent>
        
        {/* Chat Tab */}
        <TabsContent value="chat" className="space-y-4">
          <AIChat 
            courseAvatar={translatedCourse.avatar} 
            userName={user.name} 
          />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Dashboard;
