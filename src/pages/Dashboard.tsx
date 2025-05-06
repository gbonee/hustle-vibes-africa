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
      avatar: 'https://img.freepik.com/premium-photo/mature-elderly-black-woman-wearing-traditional-nigerian-clothes-african-american-grandmother-is_777271-18892.jpg',
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
    'pastry-biz': {
      id: 'pastry-biz',
      title: 'Start a Pastry Biz From Your Kitchen',
      avatar: 'https://media.istockphoto.com/id/1269519579/photo/small-bakery-shop-owner-standing-in-front-of-store.jpg?s=612x612&w=0&k=20&c=h0Hu3UFEREi-V186FkkoQGNQYkBbOn9fkj_FJ2q3rPU=',
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
      avatar: 'https://media.istockphoto.com/id/1296271163/photo/confident-businessman-with-arms-crossed.jpg?s=612x612&w=0&k=20&c=StyHxyC8uUIVVV4UFHb141gIahiNr0fKurV-fiNb2oU=',
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

  // Module-specific quizzes with translations
  const quizzesByModule: QuizzesByModule = React.useMemo(() => {
    const basicQuizzes = {
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
    };
    
    // Quiz translations
    const translations = {
      yoruba: {
        1: [
          {
            question: 'Kí ni idi àkọkọ fún ìpolówó ojú òpó lójú kan ní Nàìjíríà?',
            options: ['Láti ní ìtàkùn ayélujára', 'Láti dé àwọn oníbàárà kí o sì ṣe ìdàpọ̀ pẹ̀lú wọn lórí ayélujára', 'Láti fi síta lórí àwọn mídia sósàn lójoojúmọ́', 'Láti ná owó lórí ìfihàn'],
            answer: 1,
            moduleId: 1,
            moduleTopic: 'Ìfihan sí Ìpolówó ojú òpó lójú kan Nàìjíríà'
          },
          {
            question: 'Èwo ní pẹpẹ tí ó ní ìsàn olùlò tí ó ga jùlọ ní Nàìjíríà?',
            options: ['LinkedIn', 'WhatsApp', 'Twitter', 'Snapchat'],
            answer: 1,
            moduleId: 1,
            moduleTopic: 'Ìfihan sí Ìpolówó ojú òpó lójú kan Nàìjíríà'
          },
          {
            question: 'Kí ni ánfààní pàtàkì fún ìpolówó ojú òpó lójú kan fún àwọn iṣẹ́ kékeré Nàìjíríà?',
            options: ['Ó nílò ọ̀pọ̀lọpọ̀ owó', 'Ó ńṣiṣẹ́ láìsí iná mọ̀nà-mọ̀ná', 'Ó fàyè gba ìdé àwọn oníbàárà tó dá', 'Ó ńṣèlérí àṣeyọrí lójú ẹsẹ̀'],
            answer: 2,
            moduleId: 1,
            moduleTopic: 'Ìfihan sí Ìpolówó ojú òpó lójú kan Nàìjíríà'
          }
        ],
        2: [
          {
            question: 'Kí ni ọ̀nà tí ó dára jùlọ láti ṣe ètò àkọọ́lẹ̀ iṣẹ́ WhatsApp rẹ?',
            options: ['Da àwọn ìjíròrò tara ẹni àti ti iṣẹ́ pọ̀', 'Ṣẹ̀dá àwọn àkójọ ìgbésókè fún oríṣiríṣi ẹ̀ka ọjà', 'Kàn fi àwọn ìgbésókè ipò síta', 'Fi ọ̀rọ̀ ránṣẹ́ ní àsìkò àrìnnàkò'],
            answer: 1,
            moduleId: 2,
            moduleTopic: 'Báwo ni o ṣe le tà lórí WhatsApp & Instagram'
          },
          {
            question: 'Èwo ni ẹ̀ya Instagram tí ó dára jùlọ fún ṣíṣàfihàn àwọn ọjà rẹ?',
            options: ['IGTV', 'Reels', 'Stories', 'Shop'],
            answer: 3,
            moduleId: 2,
            moduleTopic: 'Báwo ni o ṣe le tà lórí WhatsApp & Instagram'
          },
          {
            question: 'Báwo ni o ṣe gbọdọ̀ tẹ̀lé àwọn oníbàárà tí ó ṣeéṣe lórí WhatsApp?',
            options: ['Ní wákàtí kọ̀ọ̀kan títí wọn yóò fi dáhùn', 'Ní ẹ̀ẹ̀kan ní ọ̀sẹ̀ kan', 'Ní ọjọ́ 2-3 kọ̀ọ̀kan', 'Má ṣe tẹ̀lé látẹ̀yìnwá'],
            answer: 2,
            moduleId: 2,
            moduleTopic: 'Báwo ni o ṣe le tà lórí WhatsApp & Instagram'
          }
        ],
        101: [
          {
            question: 'Kí ni àmì tí ó ṣe pàtàkì jùlọ nígbà tí o bá ń bẹ̀rẹ̀ iṣẹ́ oúnjẹ adùn ní Nàìjíríà?',
            options: ['Àyè kíchẹ́ẹ̀nì tí ó tóbi', 'Àwọn ohun èlò tí ó ní ìdiwọ̀n gíga', 'Ohun elo tí ó wọ́n', 'Ọ̀pọ̀lọpọ̀ àwọn ọmọ iṣẹ́'],
            answer: 1,
            moduleId: 101,
            moduleTopic: 'Ìfihan sí Ìdáná gẹ́gẹ́ bí Iṣẹ́ ní Nàìjíríà'
          },
          {
            question: 'Iye owó wo ni a máa ń nílò láti bẹ̀rẹ̀ iṣẹ́ àwọn oúnjẹ adùn kékeré láti inú kíchẹ́ẹ̀nì rẹ?',
            options: ['₦5,000 - ₦20,000', '₦20,000 - ₦50,000', '₦50,000 - ₦150,000', 'Ó kéré jù ₦500,000'],
            answer: 2,
            moduleId: 101,
            moduleTopic: 'Ìfihan sí Ìdáná gẹ́gẹ́ bí Iṣẹ́ ní Nàìjíríà'
          },
          {
            question: 'Èwo ni ọjà oúnjẹ adùn tí ó ní àaye èrè tí ó ga jùlọ ní Nàìjíríà?',
            options: ['Àkàrà', 'Kéèkì', 'Àwọn oúnjẹ kékeré', 'Àwọn pásìtírì'],
            answer: 2,
            moduleId: 101,
            moduleTopic: 'Ìfihan sí Ìdáná gẹ́gẹ́ bí Iṣẹ́ ní Nàìjíríà'
          }
        ],
        201: [
          {
            question: 'Kí ni ìgbésẹ̀ àkọ́kọ́ ní ṣíṣe ríràn àwọn ọjà tí ń tà gbòógì fún ọjà Nàìjíríà?',
            options: ['Da ohun tí àwọn yòókù ń tà àwòkọ', 'Ṣe ìwádìí ọjà', 'Mu àwọn ohun èlò àrìnnàkò wọle', 'Bere lọ́wọ́ àwọn ọ̀rẹ́ ohun tí wọ́n fẹ́ràn'],
            answer: 1,
            moduleId: 201,
            moduleTopic: 'Báwo ni o ṣe le rí àwọn ọjà tí ń tà gbòógì tí àwọn ará Nàìjíríà fẹ́'
          },
          {
            question: 'Èwo ni ẹ̀ka àwọn ọjà tí ó jẹ́ pé ó ní ìbéèrè gíga ní Nàìjíríà?',
            options: ['Àwọn ohun èlò ti ìgbadùn', 'Àwọn nkan tí a nílò lójoojúmọ́', 'Àwọn nkan tí a ń kójọpọ̀', 'Àwọn nkan ìgbà'],
            answer: 1,
            moduleId: 201,
            moduleTopic: 'Báwo ni o ṣe le rí àwọn ọjà tí ń tà gbòógì tí àwọn ará Nàìjíríà fẹ́'
          },
          {
            question: 'Báwo ni o ṣe le dán ọjà wò bóyá yóò tà dáradára kí o tó pàṣẹ ní ọ̀pọ̀lọpọ̀?',
            options: ['Tà tẹ́lẹ̀ sí àwùjọ rẹ', 'Pàṣẹ kan ìwòntún-wò', 'Ṣàyẹ̀wò àwọn ìpalará ìgbàlódé lórí mídia sósàn', 'Gbogbo àwọn tí a dárúkọ'],
            answer: 3,
            moduleId: 201,
            moduleTopic: 'Báwo ni o ṣe le rí àwọn ọjà tí ń tà gbòógì tí àwọn ará Nàìjíríà fẹ́'
          }
        ]
      },
      hausa: {
        1: [
          {
            question: 'Menene manufar farko ta tallace-tallace na dijital a Najeriya?',
            options: ['Don samun yanar gizo', 'Don kai wa da haɗa kan masu sayayya akan yanar gizo', 'Danna akan kafofin sada zumunta kowace rana', 'Don kashe kudi akan tallace-tallace'],
            answer: 1,
            moduleId: 1,
            moduleTopic: 'Gabatarwa zuwa Tallace-tallace na Dijital a hanyar Naija'
          },
          {
            question: 'Wanne dandali ne ya fi yawan masi amfani a Najeriya?',
            options: ['LinkedIn', 'WhatsApp', 'Twitter', 'Snapchat'],
            answer: 1,
            moduleId: 1,
            moduleTopic: 'Gabatarwa zuwa Tallace-tallace na Dijital a hanyar Naija'
          },
          {
            question: 'Menene babban amfani na tallace-tallace na dijital ga kasuwancin
