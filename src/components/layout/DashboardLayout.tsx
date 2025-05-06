
import React, { ReactNode, useEffect, useState } from 'react';
import Header from './Header';
import BottomNavigation from './BottomNavigation';
import { useLocation, useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { useToast } from '@/hooks/use-toast';

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
  const { userPrefs, updateUserPreference } = useUserPreferences();
  const { toast } = useToast();
  const [courseSelectionOpen, setCourseSelectionOpen] = useState(false);
  
  // Check if we need to show course selection
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const selectCourse = searchParams.get('selectCourse');
    
    if (selectCourse === 'true') {
      // Open the course selection dialog
      setCourseSelectionOpen(true);
      
      // Clean up URL
      searchParams.delete('selectCourse');
      navigate({
        pathname: '/dashboard',
        search: searchParams.toString()
      }, { replace: true });
      
      console.log('User wants to select a course');
    }
  }, [location.search, navigate]);
  
  const handleCourseSelect = async (courseId: string) => {
    try {
      // Update user preference with the selected course
      await updateUserPreference('course', courseId);
      
      // Close the dialog
      setCourseSelectionOpen(false);
      
      // Refresh the page to load the new course content
      window.location.reload();
      
      // Show success toast
      toast({
        title: "Course Changed Successfully!",
        description: "Your course has been updated.",
        variant: "default",
      });
    } catch (error) {
      console.error("Error changing course:", error);
      toast({
        title: "Error",
        description: "There was an error changing your course.",
        variant: "destructive",
      });
    }
  };
  
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
      
      {/* Course Selection Dialog */}
      <Dialog open={courseSelectionOpen} onOpenChange={setCourseSelectionOpen}>
        <DialogContent className="bg-black border border-electric/30 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-oswald text-electric">Choose Your Course</DialogTitle>
            <DialogDescription className="text-gray-300">
              Select which course you want to learn
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {/* Digital Marketing Course */}
            <Button
              variant="outline" 
              className={`flex flex-col items-center p-6 h-auto border border-electric/50 hover:border-electric/80 ${userPrefs?.course === 'digital-marketing' ? 'bg-electric/20' : ''}`}
              onClick={() => handleCourseSelect('digital-marketing')}
            >
              <img 
                src="https://img.freepik.com/premium-photo/mature-elderly-black-woman-wearing-traditional-nigerian-clothes-african-american-grandmother-is_777271-18892.jpg" 
                alt="Digital Marketing" 
                className="w-16 h-16 rounded-full mb-3 object-cover"
              />
              <h3 className="text-lg font-semibold mb-1">Digital Marketing</h3>
              <p className="text-sm text-gray-400 text-center">Learn digital marketing the Naija way</p>
            </Button>
            
            {/* Pastry Business Course */}
            <Button
              variant="outline" 
              className={`flex flex-col items-center p-6 h-auto border border-electric/50 hover:border-electric/80 ${userPrefs?.course === 'pastry-biz' ? 'bg-electric/20' : ''}`}
              onClick={() => handleCourseSelect('pastry-biz')}
            >
              <img 
                src="https://media.istockphoto.com/id/1269519579/photo/small-bakery-shop-owner-standing-in-front-of-store.jpg?s=612x612&w=0&k=20&c=h0Hu3UFEREi-V186FkkoQGNQYkBbOn9fkj_FJ2q3rPU=" 
                alt="Pastry Business" 
                className="w-16 h-16 rounded-full mb-3 object-cover"
              />
              <h3 className="text-lg font-semibold mb-1">Pastry Business</h3>
              <p className="text-sm text-gray-400 text-center">Start a pastry business from your kitchen</p>
            </Button>
            
            {/* Importation Course */}
            <Button
              variant="outline" 
              className={`flex flex-col items-center p-6 h-auto border border-electric/50 hover:border-electric/80 ${userPrefs?.course === 'importation' ? 'bg-electric/20' : ''}`}
              onClick={() => handleCourseSelect('importation')}
            >
              <img 
                src="https://media.istockphoto.com/id/1296271163/photo/confident-businessman-with-arms-crossed.jpg?s=612x612&w=0&k=20&c=StyHxyC8uUIVVV4UFHb141gIahiNr0fKurV-fiNb2oU=" 
                alt="Importation" 
                className="w-16 h-16 rounded-full mb-3 object-cover"
              />
              <h3 className="text-lg font-semibold mb-1">Importation</h3>
              <p className="text-sm text-gray-400 text-center">Import from China & sell on WhatsApp</p>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DashboardLayout;
