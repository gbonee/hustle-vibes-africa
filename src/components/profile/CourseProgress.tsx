
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

interface CourseProgressProps {
  progress: {
    completed: number;
    total: number;
  }
}

const CourseProgress: React.FC<CourseProgressProps> = ({ progress }) => {
  const navigate = useNavigate();
  
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold">Course Completion</h3>
          <p className="text-gray-400 text-sm">Keep going, you're doing great!</p>
        </div>
        <div className="text-right">
          <span className="text-xl font-bold">{Math.round((progress.completed / progress.total) * 100)}%</span>
          <p className="text-gray-400 text-sm">{progress.completed}/{progress.total} modules</p>
        </div>
      </div>
      <div className="w-full bg-gray-800 rounded-full h-2.5 mb-4">
        <div 
          className="bg-electric h-2.5 rounded-full" 
          style={{ width: `${(progress.completed / progress.total) * 100}%` }}
        ></div>
      </div>
      <Button 
        className="w-full mt-2"
        onClick={() => navigate('/dashboard')}
      >
        Continue Learning
      </Button>
    </>
  );
};

export default CourseProgress;
