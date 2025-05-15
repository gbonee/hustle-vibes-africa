
import { updateModuleCompletion, getModuleCompletionData } from './progress/moduleProgress';
import { getUserCourseProgress, updateCourseProgress } from './progress/courseProgress';
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
