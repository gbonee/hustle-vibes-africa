
import React from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from 'react-router-dom';

interface CourseProgressProps {
  progress: {
    completed: number;
    total: number;
  }
}

const CourseProgress: React.FC<CourseProgressProps> = ({ progress }) => {
  const navigate = useNavigate();
  
  // Calculate percentage, handling edge cases
  const percentage = progress.total > 0 
    ? Math.round((progress.completed / progress.total) * 100) 
    : 0;
  
  // Get appropriate message based on progress
  const getMessage = () => {
    if (percentage === 0) return "Start your journey today!";
    if (percentage < 30) return "Great start! Keep going!";
    if (percentage < 60) return "You're making progress!";
    if (percentage < 85) return "You're doing great!";
    if (percentage < 100) return "Almost there! Keep it up!";
    return "Congratulations! You've completed the course!";
  };
  
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold">Course Completion</h3>
          <p className="text-gray-400 text-sm">{getMessage()}</p>
        </div>
        <div className="text-right">
          <span className="text-xl font-bold">{percentage}%</span>
          <p className="text-gray-400 text-sm">{progress.completed}/{progress.total} modules</p>
        </div>
      </div>
      <Progress value={percentage} className="h-2.5 mb-4 bg-gray-800" />
      <Button 
        className="w-full mt-2"
        onClick={() => navigate('/dashboard')}
      >
        {percentage === 100 ? "Review Course" : "Continue Learning"}
      </Button>
    </>
  );
};

export default CourseProgress;
