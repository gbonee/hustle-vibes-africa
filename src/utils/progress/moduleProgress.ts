
import { supabase } from "@/integrations/supabase/client";
import { ModuleCompletionData } from './types';
import { updateCourseProgress } from './courseProgress';
import { addPointsForModuleCompletion } from './leaderboardProgress';

/**
 * Gets all module completion data for a course
 */
export const getModuleCompletionData = async (courseId: string) => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return [];
  
  const { data, error } = await supabase
    .from('module_completion')
    .select('*')
    .eq('user_id', user.id)
    .eq('course_id', courseId);
  
  if (error) {
    console.error('Error fetching module completion data:', error);
    return [];
  }
  
  return data || [];
};

/**
 * Records the completion (or partial progress) of a module
 */
export const updateModuleCompletion = async (data: ModuleCompletionData) => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return { success: false, error: 'User not authenticated' };
  
  // Check if record exists
  const { data: existingRecord } = await supabase
    .from('module_completion')
    .select('*')
    .eq('user_id', user.id)
    .eq('course_id', data.courseId)
    .eq('module_id', data.moduleId)
    .maybeSingle();
  
  let result;
  
  if (existingRecord) {
    // Update existing record
    result = await supabase
      .from('module_completion')
      .update({
        completed: data.completed,
        progress: data.progress,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', user.id)
      .eq('course_id', data.courseId)
      .eq('module_id', data.moduleId);
  } else {
    // Insert new record
    result = await supabase
      .from('module_completion')
      .insert({
        user_id: user.id,
        course_id: data.courseId,
        module_id: data.moduleId,
        completed: data.completed,
        progress: data.progress
      });
  }
  
  if (result.error) {
    console.error('Error updating module completion:', result.error);
    return { success: false, error: result.error.message };
  }
  
  // If module is completed, we might want to update course progress and add points
  if (data.completed) {
    await updateCourseProgress(data.courseId);
    await addPointsForModuleCompletion();
  }
  
  return { success: true };
};

// Export the getUserCourseProgress function to fix the export error
export { getUserCourseProgress } from './courseProgress';
