
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Video, MessageSquare } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useUserPreferences } from '@/hooks/useUserPreferences';
import DashboardLayout from '@/components/layout/DashboardLayout';
import CourseHeader from '@/components/dashboard/CourseHeader';
import LessonsTab from '@/components/dashboard/LessonsTab';
import AIChat from '@/components/dashboard/AIChat';
import { Skeleton } from '@/components/ui/skeleton';
import PreviewMode from '@/components/common/PreviewMode';
import { useModuleProgress } from '@/hooks/useModuleProgress';
import { useCourseData } from '@/hooks/useCourseData';
import { uiTranslations } from '@/constants/uiTranslations';

const Dashboard = () => {
  const { userPrefs } = useUserPreferences();
  const [activeTab, setActiveTab] = useState("lessons");
  const [isLoading, setIsLoading] = useState(true);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [user, setUser] = useState({
    id: 'preview-user-id',
    name: 'Preview User',
    email: 'preview@example.com',
    avatar: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1'
  });
  
  const { courseProgress, fetchCourseProgress, handleModuleComplete, handleQuizComplete } = useModuleProgress();
  const { courses, getTranslatedQuizzes } = useCourseData();
  
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
        
        // Fetch course progress
        await fetchCourseProgress();
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserData();
  }, [fetchCourseProgress]);
  
  // Module completion handler
  const onModuleComplete = (moduleId: number) => {
    const courseId = userPrefs?.course || 'digital-marketing';
    handleModuleComplete(courseId, moduleId, isPreviewMode);
  };
  
  // Quiz completion handler
  const onQuizComplete = (moduleId: number, correct: boolean) => {
    const courseId = userPrefs?.course || 'digital-marketing';
    handleQuizComplete(courseId, moduleId, correct, isPreviewMode);
  };
  
  // Get the current course based on user preferences
  const currentCourse = userPrefs?.course && courses[userPrefs.course] 
    ? courses[userPrefs.course] 
    : courses['digital-marketing'];
  
  // Get current path for DashboardLayout
  const currentPath = '/dashboard';
  
  // Render the dashboard with appropriate components
  return (
    <DashboardLayout currentPath={currentPath}>
      {isLoading ? (
        <div className="p-4 space-y-4">
          <Skeleton className="h-32 rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-20 rounded-md" />
            <Skeleton className="h-20 rounded-md" />
            <Skeleton className="h-20 rounded-md" />
          </div>
        </div>
      ) : isPreviewMode ? (
        <PreviewMode />
      ) : (
        <div className="p-4">
          <CourseHeader 
            title={currentCourse.title} 
            avatar={currentCourse.avatar} 
            progress={courseProgress.progress} 
          />
          
          <Tabs 
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-4"
          >
            <TabsList className="w-full">
              <TabsTrigger value="lessons" className="w-1/2">
                <Video className="h-4 w-4 mr-2" />
                {texts.lessons}
              </TabsTrigger>
              <TabsTrigger value="chat" className="w-1/2">
                <MessageSquare className="h-4 w-4 mr-2" />
                {texts.chat}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="lessons" className="space-y-4">
              <LessonsTab 
                modules={currentCourse.modules}
                completedModuleIds={courseProgress.completedModules}
                courseTranslations={currentCourse.translations}
                currentLanguage={currentLanguage}
                isPreviewMode={isPreviewMode}
                texts={texts}
                getTranslatedQuizzes={(moduleId) => getTranslatedQuizzes(moduleId, currentLanguage)}
                onModuleComplete={onModuleComplete}
                onQuizComplete={onQuizComplete}
              />
            </TabsContent>
            
            <TabsContent value="chat">
              <AIChat
                courseAvatar={currentCourse.avatar}
                userName={user.name}
              />
            </TabsContent>
          </Tabs>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Dashboard;
