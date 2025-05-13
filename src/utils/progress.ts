
import { updateModuleCompletion, updateCourseProgress, getUserCourseProgress, getModuleCompletionData } from './progress/moduleProgress';
import { getLeaderboard, getUserLeaderboardEntry, addPointsForModuleCompletion, awardQuizPoints } from './progress/leaderboardProgress';
import { debugVideoAvailability as debugVideo } from './progress/index';

// Export all required functions
export {
  // Module progress functions
  updateModuleCompletion,
  updateCourseProgress,
  getUserCourseProgress,
  getModuleCompletionData,
  
  // Leaderboard functions
  getLeaderboard,
  getUserLeaderboardEntry,
  addPointsForModuleCompletion,
  awardQuizPoints,
  
  // Debug utility
  debugVideo as debugVideoAvailability
};
