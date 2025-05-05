
import { supabase } from "@/integrations/supabase/client";

interface ModuleCompletionData {
  courseId: string;
  moduleId: number;
  completed: boolean;
  progress: number;
}

interface CourseProgressData {
  courseId: string;
  modulesCompleted: number;
  totalModules: number;
  progressPercentage: number;
  lastModuleCompleted?: number;
}

interface LeaderboardData {
  points: number;
  completedChallenges: number;
}

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
 * Add points to the user's leaderboard entry for completing a module
 */
export const addPointsForModuleCompletion = async (pointsToAdd = 100) => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return { success: false, error: 'User not authenticated' };
  
  // Check if user has a leaderboard entry
  const { data: existingEntry } = await supabase
    .from('leaderboard_entries')
    .select('*')
    .eq('user_id', user.id)
    .maybeSingle();
  
  let result;
  
  if (existingEntry) {
    // Update existing entry
    result = await supabase
      .from('leaderboard_entries')
      .update({
        points: existingEntry.points + pointsToAdd,
        completed_challenges: existingEntry.completed_challenges + 1,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', user.id);
  } else {
    // Create new entry
    result = await supabase
      .from('leaderboard_entries')
      .insert({
        user_id: user.id,
        points: pointsToAdd,
        completed_challenges: 1
      });
  }
  
  if (result.error) {
    console.error('Error updating leaderboard entry:', result.error);
    return { success: false, error: result.error.message };
  }
  
  return { success: true };
};

/**
 * Get the user's current leaderboard entry
 */
export const getUserLeaderboardEntry = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null;
  
  const { data, error } = await supabase
    .from('leaderboard_entries')
    .select('*')
    .eq('user_id', user.id)
    .maybeSingle();
  
  if (error) {
    console.error('Error fetching leaderboard entry:', error);
    return null;
  }
  
  return data;
};

/**
 * Get the top leaderboard entries
 */
export const getLeaderboard = async (limit = 10) => {
  const { data, error } = await supabase
    .from('leaderboard_entries')
    .select(`
      id,
      points,
      rank,
      completed_challenges,
      user_id,
      profiles(id, display_name, avatar_url)
    `)
    .order('points', { ascending: false })
    .limit(limit);
  
  if (error) {
    console.error('Error fetching leaderboard:', error);
    return [];
  }
  
  // Format the data to match what the Leaderboard component expects
  return (data || []).map(entry => {
    const profile = entry.profiles as any;
    return {
      id: entry.user_id,
      name: profile?.display_name || 'Anonymous User',
      avatar: profile?.avatar_url || '',
      course: '', // We don't have this info in the leaderboard table
      progress: 0, // We don't have this info in the leaderboard table
      score: entry.points,
      completedChallenges: entry.completed_challenges,
      rank: entry.rank || 0
    };
  });
};

/**
 * Award points for completing a quiz
 */
export const awardQuizPoints = async (moduleId: number, courseId: string, points = 50) => {
  await addPointsForModuleCompletion(points);
  
  // Mark module as completed if it's not already
  const { data: moduleCompletion } = await supabase
    .from('module_completion')
    .select('*')
    .eq('user_id', (await supabase.auth.getUser()).data.user?.id)
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
