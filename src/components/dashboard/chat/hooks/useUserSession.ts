
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";

interface UseUserSessionProps {
  currentCourse: string;
  currentLanguage: string;
}

const useUserSession = ({ 
  currentCourse,
  currentLanguage
}: UseUserSessionProps) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [currentCourseKey, setCurrentCourseKey] = useState<string>('');
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  useEffect(() => {
    const getUserId = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        setUserId(user.id);
        // Create a unique key for this user+course combination
        const courseKey = `${user.id}_${currentCourse}_${currentLanguage}`;
        setCurrentCourseKey(courseKey);
        console.log("Setting course key for logged in user:", courseKey);
      } else {
        // Handle preview mode or user not logged in
        const courseKey = `preview_${currentCourse}_${currentLanguage}`;
        setCurrentCourseKey(courseKey);
        console.log("Setting course key for preview mode:", courseKey);
      }
    };

    // Check if we're in preview mode
    const urlParams = new URLSearchParams(window.location.search);
    const preview = urlParams.get('forcePreview') === 'true';
    setIsPreviewMode(preview);

    getUserId();
  }, [currentCourse, currentLanguage]);

  return {
    userId,
    currentCourseKey,
    isPreviewMode
  };
};

export default useUserSession;
