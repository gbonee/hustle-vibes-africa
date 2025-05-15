
import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Trophy, User } from 'lucide-react';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { cn } from '@/lib/utils';

interface BottomNavigationProps {
  currentPath: string;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ currentPath }) => {
  const isActive = (path: string) => currentPath === path;
  const { userPrefs } = useUserPreferences();
  const currentLanguage = userPrefs?.language || 'pidgin';
  
  // Get localized navigation labels
  const getNavigationText = () => {
    const navigationLabels = {
      learn: {
        pidgin: 'Learn',
        yoruba: 'Kọ́',
        hausa: 'Koyo',
        igbo: 'Mụta',
      },
      ranks: {
        pidgin: 'Ranks',
        yoruba: 'Ipò',
        hausa: 'Matsayi',
        igbo: 'Ọkwa',
      },
      profile: {
        pidgin: 'Profile',
        yoruba: 'Profaili',
        hausa: 'Bayani',
        igbo: 'Profaịlụ',
      }
    };
    
    return {
      learn: (navigationLabels.learn as any)[currentLanguage] || navigationLabels.learn.pidgin,
      ranks: (navigationLabels.ranks as any)[currentLanguage] || navigationLabels.ranks.pidgin,
      profile: (navigationLabels.profile as any)[currentLanguage] || navigationLabels.profile.pidgin,
    };
  };
  
  const labels = getNavigationText();
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-sm border-t border-electric/30 z-10">
      <div className="container mx-auto flex justify-between items-center py-0.5">
        <Link 
          to="/dashboard" 
          className={cn(
            "flex flex-col items-center justify-center p-1 flex-1",
            isActive('/dashboard') ? 'text-electric' : 'text-gray-400'
          )}
        >
          <LayoutDashboard size={18} />
          <span className="text-[10px]">{labels.learn}</span>
        </Link>
        
        <Link 
          to="/leaderboard" 
          className={cn(
            "flex flex-col items-center justify-center p-1 flex-1",
            isActive('/leaderboard') ? 'text-electric' : 'text-gray-400'
          )}
        >
          <Trophy size={18} />
          <span className="text-[10px]">{labels.ranks}</span>
        </Link>
        
        <Link 
          to="/profile" 
          className={cn(
            "flex flex-col items-center justify-center p-1 flex-1",
            isActive('/profile') ? 'text-electric' : 'text-gray-400'
          )}
        >
          <User size={18} />
          <span className="text-[10px]">{labels.profile}</span>
        </Link>
      </div>
    </div>
  );
};

export default BottomNavigation;
