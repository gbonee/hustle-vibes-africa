
import React, { ReactNode } from 'react';
import Header from './Header';
import BottomNavigation from './BottomNavigation';

interface DashboardLayoutProps {
  children: ReactNode;
  currentPath: string;
  user?: {
    id: string;
    name: string;
    email: string;
    avatar: string;
  };
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, 
  currentPath,
  user = {
    id: '',
    name: 'User',
    email: '',
    avatar: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1'
  }
}) => {
  return (
    <div className="min-h-screen bg-black pb-20">
      {/* Top Navigation Bar */}
      <Header onSettingsClick={() => {}} />
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
      
      {/* Bottom Navigation */}
      <BottomNavigation currentPath={currentPath} />
    </div>
  );
};

export default DashboardLayout;
