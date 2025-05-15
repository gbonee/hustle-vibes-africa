
import { supabase } from "@/integrations/supabase/client";

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
