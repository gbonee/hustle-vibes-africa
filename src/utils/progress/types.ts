
export interface ModuleCompletionData {
  courseId: string;
  moduleId: number;
  completed: boolean;
  progress: number;
}

export interface CourseProgressData {
  courseId: string;
  modulesCompleted: number;
  totalModules: number;
  progressPercentage: number;
  lastModuleCompleted?: number;
}

export interface LeaderboardData {
  points: number;
  completedChallenges: number;
}
