
import { supabase } from "@/integrations/supabase/client";

/**
 * Gets the current user's course progress
 */
export const getUserCourseProgress = async (courseId: string) => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null;
  
  const { data, error } = await supabase
    .from('course_progress')
    .select('*')
    .eq('user_id', user.id)
    .eq('course_id', courseId)
    .maybeSingle();
  
  if (error) {
    console.error('Error fetching course progress:', error);
    return null;
  }
  
  return data;
};

/**
 * Updates overall course progress based on completed modules
 */
export const updateCourseProgress = async (courseId: string) => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return { success: false, error: 'User not authenticated' };
  
  // Get all module completion data
  const { data: modules, error: modulesError } = await supabase
    .from('module_completion')
    .select('*')
    .eq('user_id', user.id)
    .eq('course_id', courseId);
  
  if (modulesError) {
    console.error('Error fetching modules:', modulesError);
    return { success: false, error: modulesError.message };
  }
  
  // Calculate progress
  const totalModules = 5; // This should be retrieved from a courses table ideally
  const completedModules = modules?.filter(m => m.completed).length || 0;
  const progressPercentage = Math.round((completedModules / totalModules) * 100);
  const lastModuleCompleted = modules?.length ? 
    Math.max(...modules.filter(m => m.completed).map(m => m.module_id)) : 
    null;
  
  // Check if record exists
  const { data: existingRecord } = await supabase
    .from('course_progress')
    .select('*')
    .eq('user_id', user.id)
    .eq('course_id', courseId)
    .maybeSingle();
  
  let result;
  
  if (existingRecord) {
    // Update existing record
    result = await supabase
      .from('course_progress')
      .update({
        modules_completed: completedModules,
        total_modules: totalModules,
        progress_percentage: progressPercentage,
        last_module_completed: lastModuleCompleted,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', user.id)
      .eq('course_id', courseId);
  } else {
    // Insert new record
    result = await supabase
      .from('course_progress')
      .insert({
        user_id: user.id,
        course_id: courseId,
        modules_completed: completedModules,
        total_modules: totalModules,
        progress_percentage: progressPercentage,
        last_module_completed: lastModuleCompleted
      });
  }
  
  if (result.error) {
    console.error('Error updating course progress:', result.error);
    return { success: false, error: result.error.message };
  }
  
  return { success: true };
};

/**
 * Award points for completing a quiz
 */
export const awardQuizPoints = async (moduleId: number, courseId: string, points: number) => {
  const { addPointsForModuleCompletion } = await import('./leaderboardProgress');
  const { updateModuleCompletion } = await import('./moduleProgress');
  
  await addPointsForModuleCompletion(points);
  
  // Mark module as completed if it's not already
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return { success: false, error: 'User not authenticated' };
  
  const { data: moduleCompletion } = await supabase
    .from('module_completion')
    .select('*')
    .eq('user_id', user.id)
    .eq('course_id', courseId)
    .eq('module_id', moduleId)
    .maybeSingle();
  
  if (!moduleCompletion || !moduleCompletion.completed) {
    await updateModuleCompletion({
      courseId,
      moduleId,
      completed: true,
      progress: 100
    });
  }
  
  return { success: true };
};
