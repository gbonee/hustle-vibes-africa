
// Export all progress tracking utility functions
export * from './moduleProgress';
export * from './courseProgress';
export * from './leaderboardProgress';
export * from './types';

// Add a debug function for video troubleshooting
export const debugVideoAvailability = async (courseId: string, language: string) => {
  try {
    const { supabase } = await import('@/integrations/supabase/client');
    const { data, error } = await supabase.storage.from('module-videos').list(courseId);
    
    if (error) throw error;
    
    return {
      available: data.filter(file => file.name.includes(`-${language}`)),
      all: data
    };
  } catch (error) {
    console.error("Error checking video availability:", error);
    return { available: [], all: [] };
  }
};
