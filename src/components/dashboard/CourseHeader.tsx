
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useUserPreferences } from '@/hooks/useUserPreferences';

interface CourseHeaderProps {
  title: string;
  avatar: string;
  progress: number;
}

// Define translations for all course titles
const courseTranslations = {
  pidgin: {
    'digital-marketing': 'Digital Marketing the Naija Way',
    'pastry-biz': 'Pastry Business Masterclass',
    'importation': 'Import From China & Sell on WhatsApp'
  },
  yoruba: {
    'digital-marketing': 'Ìpolówó ojú òpó lójú kan Nàìjíríà',
    'pastry-biz': 'Iṣẹ́ àwọn oúnjẹ adùn láti inú kíchẹ́ẹ̀nì rẹ',
    'importation': 'Mú wá láti Ṣáínà & Ta lórí WhatsApp'
  },
  hausa: {
    'digital-marketing': 'Tallace-tallace na Dijital a hanyar Naija',
    'pastry-biz': 'Farkon Harkar Abinci Mai Zaki Daga Dakin Girkinki',
    'importation': 'Shigo daga China & Sayar a WhatsApp'
  },
  igbo: {
    'digital-marketing': "Mgbasa ozi dijitalu n'uzo Naija",
    'pastry-biz': "Malite azumaahia pastry site na ulo nri gi",
    'importation': "Bubata site na China & Ree na WhatsApp"
  },
  english: {
    'digital-marketing': 'Digital Marketing the Nigerian Way',
    'pastry-biz': 'Pastry Business Masterclass',
    'importation': 'Import From China & Sell on WhatsApp'
  }
};

// Get translation for "complete" text
const getCompleteText = (language: string): string => {
  const translations = {
    pidgin: 'complete',
    yoruba: 'ti parí',
    hausa: 'an kammala',
    igbo: 'emezuru',
    english: 'complete',
  };
  
  return translations[language as keyof typeof translations] || 'complete';
};

const CourseHeader: React.FC<CourseHeaderProps> = ({ title, avatar, progress }) => {
  const { userPrefs } = useUserPreferences();
  const currentLanguage = userPrefs?.language || 'pidgin';
  const currentCourse = userPrefs?.course || 'digital-marketing';
  
  // Get translated course title
  const getCourseTitle = (): string => {
    return (courseTranslations[currentLanguage as keyof typeof courseTranslations] || courseTranslations.pidgin)[currentCourse] || title;
  };
  
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
            <h2 className="text-xl font-bold">{getCourseTitle()}</h2>
            <div className="flex items-center gap-2 mt-1">
              <Progress value={progress} className="h-2 w-32" />
              <span className="text-sm text-gray-400">{progress}% {getCompleteText(currentLanguage)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseHeader;
