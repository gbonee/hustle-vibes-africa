
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

interface CourseSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCourseSelect: (courseId: string) => void;
  currentCourse?: string;
}

const CourseSelector: React.FC<CourseSelectorProps> = ({ 
  open, 
  onOpenChange, 
  onCourseSelect,
  currentCourse 
}) => {
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const handleCourseSelect = async (courseId: string) => {
    try {
      // Call the provided onCourseSelect function
      onCourseSelect(courseId);
      
      // Close the dialog
      onOpenChange(false);
      
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black border border-electric/30 text-white max-w-3xl w-[95%] mx-auto">
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
            className={`flex flex-col items-center p-4 h-auto border border-electric/50 hover:border-electric/80 ${currentCourse === 'digital-marketing' ? 'bg-electric/20' : ''}`}
            onClick={() => handleCourseSelect('digital-marketing')}
          >
            <img 
              src="https://img.freepik.com/premium-photo/mature-elderly-black-woman-wearing-traditional-nigerian-clothes-african-american-grandmother-is_777271-18892.jpg" 
              alt="Digital Marketing" 
              className="w-14 h-14 rounded-full mb-2 object-cover"
            />
            <h3 className="text-base font-semibold mb-1 text-center">Digital Marketing</h3>
            <p className={`text-xs text-gray-400 text-center ${isMobile ? 'line-clamp-2' : ''}`}>
              Learn digital marketing the Naija way
            </p>
          </Button>
          
          {/* Pastry Business Course */}
          <Button
            variant="outline" 
            className={`flex flex-col items-center p-4 h-auto border border-electric/50 hover:border-electric/80 ${currentCourse === 'pastry-biz' ? 'bg-electric/20' : ''}`}
            onClick={() => handleCourseSelect('pastry-biz')}
          >
            <img 
              src="https://media.istockphoto.com/id/1269519579/photo/small-bakery-shop-owner-standing-in-front-of-store.jpg?s=612x612&w=0&k=20&c=h0Hu3UFEREi-V186FkkoQGNQYkBbOn9fkj_FJ2q3rPU=" 
              alt="Pastry Business" 
              className="w-14 h-14 rounded-full mb-2 object-cover"
            />
            <h3 className="text-base font-semibold mb-1 text-center">Pastry Business</h3>
            <p className={`text-xs text-gray-400 text-center ${isMobile ? 'line-clamp-2' : ''}`}>
              Start a pastry business from your kitchen
            </p>
          </Button>
          
          {/* Importation Course */}
          <Button
            variant="outline" 
            className={`flex flex-col items-center p-4 h-auto border border-electric/50 hover:border-electric/80 ${currentCourse === 'importation' ? 'bg-electric/20' : ''}`}
            onClick={() => handleCourseSelect('importation')}
          >
            <img 
              src="https://media.istockphoto.com/id/1296271163/photo/confident-businessman-with-arms-crossed.jpg?s=612x612&w=0&k=20&c=StyHxyC8uUIVVV4UFHb141gIahiNr0fKurV-fiNb2oU=" 
              alt="Importation" 
              className="w-14 h-14 rounded-full mb-2 object-cover"
            />
            <h3 className="text-base font-semibold mb-1 text-center">Importation</h3>
            <p className={`text-xs text-gray-400 text-center ${isMobile ? 'line-clamp-2' : ''}`}>
              Import from China & sell on WhatsApp
            </p>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CourseSelector;
