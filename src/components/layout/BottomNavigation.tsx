
import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Trophy, User, Users } from 'lucide-react';
import { useUserPreferences } from '@/hooks/useUserPreferences';

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
      community: {
        pidgin: 'Community',
        yoruba: 'Àwùjọ',
        hausa: 'Al\'umma',
        igbo: 'Obodo',
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
      community: (navigationLabels.community as any)[currentLanguage] || navigationLabels.community.pidgin,
      ranks: (navigationLabels.ranks as any)[currentLanguage] || navigationLabels.ranks.pidgin,
      profile: (navigationLabels.profile as any)[currentLanguage] || navigationLabels.profile.pidgin,
    };
  };
  
  const labels = getNavigationText();
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-sm border-t border-electric/30 z-10">
      <div className="container mx-auto flex justify-between items-center py-1">
        <Link 
          to="/dashboard" 
          className={`flex flex-col items-center justify-center p-2 flex-1 ${
            isActive('/dashboard') ? 'text-electric' : 'text-gray-400'
          }`}
        >
          <LayoutDashboard size={20} />
          <span className="text-xs mt-1">{labels.learn}</span>
        </Link>
        
        <Link 
          to="/community" 
          className={`flex flex-col items-center justify-center p-2 flex-1 ${
            isActive('/community') ? 'text-electric' : 'text-gray-400'
          }`}
        >
          <Users size={20} />
          <span className="text-xs mt-1">{labels.community}</span>
        </Link>
        
        <Link 
          to="/leaderboard" 
          className={`flex flex-col items-center justify-center p-2 flex-1 ${
            isActive('/leaderboard') ? 'text-electric' : 'text-gray-400'
          }`}
        >
          <Trophy size={20} />
          <span className="text-xs mt-1">{labels.ranks}</span>
        </Link>
        
        <Link 
          to="/profile" 
          className={`flex flex-col items-center justify-center p-2 flex-1 ${
            isActive('/profile') ? 'text-electric' : 'text-gray-400'
          }`}
        >
          <User size={20} />
          <span className="text-xs mt-1">{labels.profile}</span>
        </Link>
      </div>
    </div>
  );
};

export default BottomNavigation;
