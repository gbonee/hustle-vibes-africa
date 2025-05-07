
import { useState } from 'react';
import { Module } from '@/components/dashboard/ModulesList';
import { supabase } from "@/integrations/supabase/client";
import { getModuleCompletionData, getUserCourseProgress, updateModuleCompletion, updateCourseProgress, awardQuizPoints } from '@/utils/progressTracker';
import { useToast } from '@/hooks/use-toast';

export const useModuleProgress = () => {
  const { toast } = useToast();
  const [courseProgress, setCourseProgress] = useState({
    progress: 0,
    completedModules: [] as number[]
  });
  
  // Fetch course progress
  const fetchCourseProgress = async () => {
    try {
      const courseId = 'digital-marketing'; // Default value
      
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

      return {
        progress: courseProgressData?.progress_percentage || 0,
        completedModules: completedModuleIds
      };
    } catch (error) {
      console.error("Error fetching course progress:", error);
      return {
        progress: 0,
        completedModules: []
      };
    }
  };

  // Handle module completion
  const handleModuleComplete = async (courseId: string, moduleId: number, isPreviewMode: boolean) => {
    // If we're in preview mode, just update the UI
    if (isPreviewMode) {
      return;
    }
    
    try {
      // Save module completion to the database
      await updateModuleCompletion(courseId, moduleId, true);
      
      // Calculate and update overall course progress
      await updateCourseProgress(courseId);
      
      // Refresh the completion data
      await fetchCourseProgress();
      
      toast({
        title: "Progress saved!",
        description: `You've completed module ${moduleId}`,
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
  
  // Handle quiz completion
  const handleQuizComplete = async (courseId: string, moduleId: number, correct: boolean, isPreviewMode: boolean) => {
    if (isPreviewMode || !correct) return;
    
    try {
      // Award points for correct answer
      // Ensure moduleId is treated as a number
      const numericModuleId = typeof moduleId === 'string' ? parseInt(moduleId, 10) : moduleId;
      
      await awardQuizPoints(courseId, numericModuleId);
      
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
    handleQuizComplete
  };
};
