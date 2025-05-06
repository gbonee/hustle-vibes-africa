
import React, { ReactNode, useEffect } from 'react';
import Header from './Header';
import BottomNavigation from './BottomNavigation';
import { useLocation, useNavigate } from 'react-router-dom';

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
  const location = useLocation();
  const navigate = useNavigate();
  
  // Check if we need to show course selection
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const selectCourse = searchParams.get('selectCourse');
    
    if (selectCourse === 'true') {
      // Redirect to a section or component that shows course selection
      // For now, we'll just remove the param and let the dashboard handle it
      searchParams.delete('selectCourse');
      navigate({
        pathname: '/dashboard',
        search: searchParams.toString()
      }, { replace: true });
      
      // You can trigger any course selection modal/state here
      // For example: setCourseSelectionOpen(true);
      
      // This can be expanded to show a proper course selection UI
      console.log('User wants to select a course');
    }
  }, [location.search, navigate]);
  
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
