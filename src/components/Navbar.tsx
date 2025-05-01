
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleJoinWaitlist = () => {
    console.log("Join waitlist clicked");
    // Navigate to auth page
    navigate('/auth');
    setOpen(false);
  };

  const handleNavigation = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-black/90 backdrop-blur-sm z-50 border-b border-electric/30">
      <div className="container mx-auto flex justify-between items-center py-4 px-4">
        <div className="flex items-center">
          <a href="/" className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/20591bbc-87c9-4bbc-8159-3e4becbee8c8.png" 
              alt="uSabi AI Owl Mascot" 
              className="h-9 w-auto" 
            />
            <span className="text-3xl font-oswald font-bold text-electric">
              uSabi <span className="text-white">AI</span>
            </span>
          </a>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <button 
            onClick={() => handleNavigation('courses')}
            className="text-white hover:text-electric font-medium transition-colors"
          >
            Hustles
          </button>
          <button 
            onClick={() => handleNavigation('avatars')}
            className="text-white hover:text-electric font-medium transition-colors"
          >
            AI Mentors
          </button>
          <button 
            onClick={() => handleNavigation('proof')}
            className="text-white hover:text-electric font-medium transition-colors"
          >
            Success Proof
          </button>
          <button 
            onClick={() => navigate('/manifesto')}
            className="text-white hover:text-electric font-medium transition-colors flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            <span>Manifesto</span>
          </button>
          <Button 
            onClick={handleJoinWaitlist} 
            className="rebel-button"
          >
            Join Now
          </Button>
        </div>
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                className="text-white hover:text-electric p-1"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-black/95 border-electric/30 p-0">
              <div className="flex flex-col p-6 h-full">
                <div className="flex justify-between items-center mb-8">
                  <a href="/" className="flex items-center gap-2">
                    <img 
                      src="/lovable-uploads/20591bbc-87c9-4bbc-8159-3e4becbee8c8.png" 
                      alt="uSabi AI Owl Mascot" 
                      className="h-9 w-auto" 
                    />
                    <span className="text-3xl font-oswald font-bold text-electric">
                      uSabi <span className="text-white">AI</span>
                    </span>
                  </a>
                  <Button 
                    variant="ghost" 
                    className="text-white hover:text-electric p-1"
                    onClick={() => setOpen(false)}
                  >
                    <X className="h-6 w-6" />
                    <span className="sr-only">Close</span>
                  </Button>
                </div>
                <div className="flex flex-col space-y-6">
                  <Button 
                    variant="ghost"
                    onClick={() => handleNavigation('courses')}
                    className="text-white hover:text-electric font-medium transition-colors justify-start text-xl"
                  >
                    Hustles
                  </Button>
                  <Button 
                    variant="ghost"
                    onClick={() => handleNavigation('avatars')}
                    className="text-white hover:text-electric font-medium transition-colors justify-start text-xl"
                  >
                    AI Mentors
                  </Button>
                  <Button 
                    variant="ghost"
                    onClick={() => handleNavigation('proof')}
                    className="text-white hover:text-electric font-medium transition-colors justify-start text-xl"
                  >
                    Success Proof
                  </Button>
                  <Button 
                    variant="ghost"
                    onClick={() => {
                      navigate('/manifesto');
                      setOpen(false);
                    }}
                    className="text-white hover:text-electric font-medium transition-colors justify-start text-xl"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Manifesto
                  </Button>
                  <Button 
                    onClick={handleJoinWaitlist} 
                    className="rebel-button w-full mt-4"
                  >
                    Join Now
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
