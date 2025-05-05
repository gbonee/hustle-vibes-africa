
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useUserPreferences } from '@/hooks/useUserPreferences';

interface CourseHeaderProps {
  title: string;
  avatar: string;
  progress: number;
}

const CourseHeader: React.FC<CourseHeaderProps> = ({ title, avatar, progress }) => {
  const { userPrefs } = useUserPreferences();
  
  // Use the current course to display the correct course title
  const courseTitle = userPrefs?.course ? 
    userPrefs.course === 'digital-marketing' ? 'Digital Marketing Mastery' :
    userPrefs.course === 'pastry-biz' ? 'Pastry Business Masterclass' :
    userPrefs.course === 'importation' ? 'Importation Business Academy' :
    title : title;
  
  return (
    <Card className="bg-muted border-electric mb-6">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div 
            className="w-16 h-16 rounded-full overflow-hidden"
            style={{
              backgroundImage: `url(${avatar})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          <div>
            <h2 className="text-xl font-bold">{courseTitle}</h2>
            <div className="flex items-center gap-2 mt-1">
              <Progress value={progress} className="h-2 w-32" />
              <span className="text-sm text-gray-400">{progress}% complete</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseHeader;
