
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { 
  updateModuleCompletion, 
  updateCourseProgress, 
  getUserCourseProgress, 
  getModuleCompletionData, 
  awardQuizPoints 
} from '@/utils/progress';
import { Module } from '@/components/dashboard/ModulesList';

/**
 * Hook to manage module progress tracking
 */
export const useModuleProgress = (courseId: string = 'digital-marketing') => {
  const { toast } = useToast();
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [courseProgress, setCourseProgress] = useState({
    progress: 0,
    completedModules: [] as number[]
  });

  /**
   * Fetch course progress for the current user
   */
  const fetchCourseProgress = async () => {
    try {
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
      
      console.log('Completed modules:', completedModuleIds);
    } catch (error) {
      console.error("Error fetching course progress:", error);
    }
  };

  // Fetch course progress on initial load and courseId change
  useEffect(() => {
    if (!isPreviewMode) {
      fetchCourseProgress();
    }
  }, [courseId, isPreviewMode]);

  /**
   * Handle module completion
   */
  const handleModuleComplete = async (selectedModule: Module | null) => {
    // If we're in preview mode or no module is selected, just update the UI
    if (isPreviewMode || !selectedModule) {
      return;
    }
    
    try {
      console.log('Completing module:', selectedModule.id);
      
      // Save module completion to the database
      await updateModuleCompletion({
        courseId,
        moduleId: selectedModule.id,
        completed: true,
        progress: 100
      });
      
      // Calculate and update overall course progress
      await updateCourseProgress(courseId);
      
      // Refresh the completion data
      await fetchCourseProgress();
      
      toast({
        title: "Progress saved!",
        description: `You've completed "${selectedModule.title}"`,
        duration: 3000
      });
    } catch (error) {
      console.error("Error saving module completion:", error);
      toast({
        title: "Error saving progress",
        description: "Please try again later",
        variant: "destructive",
        duration: 3000
      });
    }
  };

  /**
   * Handle quiz completion
   */
  const handleQuizComplete = async (selectedModule: Module | null, correct: boolean) => {
    if (isPreviewMode || !selectedModule || !correct) return;
    
    try {
      console.log('Completing quiz for module:', selectedModule.id);
      
      // Award points for correct answer
      // Ensure moduleId is treated as a number
      const moduleId = typeof selectedModule.id === 'string' ? parseInt(selectedModule.id, 10) : selectedModule.id;
      
      await awardQuizPoints(moduleId, courseId, 50);
      
      // Mark the module as completed when quiz is correct
      await handleModuleComplete(selectedModule);
      
      toast({
        title: "Quiz completed!",
        description: "You earned 50 points for your correct answer.",
        duration: 3000
      });
    } catch (error) {
      console.error("Error awarding quiz points:", error);
    }
  };

  return {
    courseProgress,
    fetchCourseProgress,
    handleModuleComplete,
    handleQuizComplete,
    isPreviewMode,
    setIsPreviewMode
  };
};
