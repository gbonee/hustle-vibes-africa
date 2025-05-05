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

// Define types
interface Course {
  id: string;
  title: string;
  avatar: string;
  progress: number;
  modules: Module[];
}

// Group quizzes by module topic
interface QuizzesByModule {
  [moduleId: number]: Quiz[];
}

const Dashboard = () => {
  const { userPrefs } = useUserPreferences();
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
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserData();
  }, []);
  
  // Mock course data based on user's selection - load immediately without waiting for user data
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
      ]
    },
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
      ]
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
      ]
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
  
  // Function to get quizzes for a specific module
  const getQuizzesForModule = (moduleId: number): Quiz[] => {
    // Find the correct quiz list based on module ID and course
    if (userPrefs?.course === 'pastry-biz') {
      // Offset module IDs for pastry business course (using 100-range)
      return quizzesByModule[moduleId + 100] || [];
    } else if (userPrefs?.course === 'importation') {
      // Offset module IDs for importation course (using 200-range)
      return quizzesByModule[moduleId + 200] || [];
    } else {
      // Default to digital marketing course
      return quizzesByModule[moduleId] || [];
    }
  };

  const handleModuleSelect = (module: Module) => {
    if (module.locked) return;
    setSelectedModule(module);
  };

  const handleCloseModule = () => {
    setSelectedModule(null);
  };

  // Use digital marketing as default course if no preference is set
  const userCourse = userPrefs?.course ? courses[userPrefs.course] : courses['digital-marketing'];

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
        title={userCourse.title} 
        avatar={userCourse.avatar} 
        progress={userCourse.progress} 
      />

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-6 bg-black">
          <TabsTrigger value="lessons" className="text-lg">
            <Video className="mr-2 h-4 w-4" />
            Lessons
          </TabsTrigger>
          <TabsTrigger value="chat" className="text-lg">
            <MessageSquare className="mr-2 h-4 w-4" />
            AI Chat
          </TabsTrigger>
        </TabsList>
        
        {/* Lessons Tab */}
        <TabsContent value="lessons" className="space-y-4">
          {selectedModule ? (
            <ModuleDetail 
              module={selectedModule} 
              quizzes={getQuizzesForModule(selectedModule.id)} 
              onClose={handleCloseModule} 
            />
          ) : (
            <ModulesList 
              modules={userCourse.modules} 
              onModuleSelect={handleModuleSelect} 
            />
          )}
        </TabsContent>
        
        {/* Chat Tab */}
        <TabsContent value="chat" className="space-y-4">
          <AIChat 
            courseAvatar={userCourse.avatar} 
            userName={user.name} 
          />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Dashboard;
