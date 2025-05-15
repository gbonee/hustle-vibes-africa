
import { useState, useEffect, useMemo } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Module } from '@/components/dashboard/ModulesList';
import { Course } from '@/types/course';
import { courses } from '@/data/courseData';
import { useUserPreferences } from '@/hooks/useUserPreferences';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export const useDashboardData = () => {
  const { userPrefs } = useUserPreferences();
  const [activeTab, setActiveTab] = useState("lessons");
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [user, setUser] = useState<User>({
    id: 'preview-user-id',
    name: 'Preview User',
    email: 'preview@example.com',
    avatar: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1'
  });
  
  // Get current language for translations (default to English if not set)
  const currentLanguage = userPrefs?.language || 'pidgin';
  const courseId = userPrefs?.course || 'digital-marketing';

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

  // Get current course information based on user preferences
  const currentCourse = useMemo(() => {
    return courses[courseId] || courses['digital-marketing'];
  }, [courseId]);

  return {
    activeTab,
    setActiveTab,
    selectedModule,
    setSelectedModule,
    isLoading,
    isPreviewMode,
    setIsPreviewMode,
    user,
    currentLanguage,
    courseId,
    currentCourse
  };
};
