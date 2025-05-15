
import { supabase } from "@/integrations/supabase/client";

/**
 * Function to debug video availability for troubleshooting purposes
 */
export const debugVideoAvailability = async (courseId: string, language: string) => {
  try {
    // Get all videos for this course
    const { data: courseFiles, error } = await supabase
      .storage
      .from('module-videos')
      .list(courseId);
      
    if (error) {
      console.error("Error listing course files:", error);
      return { available: [], all: [] };
    }
    
    // Get all videos across all courses for reference
    const { data: allFiles, error: allError } = await supabase
      .storage
      .from('module-videos')
      .list();
      
    if (allError) {
      console.error("Error listing all files:", allError);
      return { available: courseFiles || [], all: [] };
    }
    
    // Filter for the requested language
    const availableInLanguage = courseFiles?.filter(file => 
      file.name.includes(`-${language}`)
    ) || [];
    
    return {
      available: availableInLanguage,
      all: allFiles || []
    };
  } catch (err) {
    console.error("Debug video error:", err);
    return { available: [], all: [] };
  }
};
