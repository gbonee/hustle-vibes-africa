import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Video, MessageSquare } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useUserPreferences } from '@/hooks/useUserPreferences';
import DashboardLayout from '@/components/layout/DashboardLayout';

// Import refactored components
import CourseHeader from '@/components/dashboard/CourseHeader';
import ModulesList, { Module } from '@/components/dashboard/ModulesList';
import ModuleDetail from '@/components/dashboard/ModuleDetail';
import AIChat from '@/components/dashboard/AIChat';
import { Quiz } from '@/types/quiz';

// Define types
interface Course {
  id: string;
  title: string;
  avatar: string;
  progress: number;
  modules: Module[];
}

const Dashboard = () => {
  const { userPrefs } = useUserPreferences();
  const [activeTab, setActiveTab] = useState("lessons");
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    avatar: ''
  });
  
  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      
      if (!authUser) return;
      
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
        avatar: profile?.avatar_url || "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1" // Default avatar
      });
    };
    
    fetchUserData();
  }, []);
  
  // Mock course data based on user's selection
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

  // Sample quizzes for modules
  const quizzes: Quiz[] = [
    {
      question: 'What is the best platform to start selling your products in Nigeria?',
      options: ['LinkedIn', 'WhatsApp', 'Snapchat', 'TikTok'],
      answer: 1
    },
    {
      question: 'How much capital do you typically need to start importing from China?',
      options: ['₦5,000', '₦50,000', '₦500,000', 'It depends on the product'],
      answer: 3
    },
    {
      question: "What is the most important skill for digital marketing in Nigeria?",
      options: ['Programming', 'Persuasive copywriting', 'Graphic design', 'Video editing'],
      answer: 1
    },
    {
      question: 'Which of these is NOT necessary for a successful pastry business?',
      options: ['Quality ingredients', 'Good taste', 'A big kitchen', 'Proper packaging'],
      answer: 2
    },
    {
      question: "What is the best way to handle customer complaints?",
      options: ['Ignore them', 'Argue back', 'Respond promptly and solve the problem', 'Offer free products'],
      answer: 2
    }
  ];

  const handleModuleSelect = (module: Module) => {
    if (module.locked) return;
    setSelectedModule(module);
  };

  const handleCloseModule = () => {
    setSelectedModule(null);
  };

  const userCourse = userPrefs?.course ? courses[userPrefs.course] : courses['digital-marketing'];

  return (
    <DashboardLayout currentPath="/dashboard" user={user}>
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
              quizzes={quizzes} 
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
