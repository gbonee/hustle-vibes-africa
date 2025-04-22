
import React from 'react';
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleJoinWaitlist = () => {
    console.log("Join waitlist clicked");
    // Navigate to waitlist page or open modal
    // For now, we'll scroll to the bottom CTA section
    const ctaSection = document.getElementById('cta-section');
    if (ctaSection) {
      ctaSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigation = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-black/90 backdrop-blur-sm z-50 border-b border-electric/30">
      <div className="container mx-auto flex justify-between items-center py-4 px-4">
        <div className="flex items-center">
          <a href="/" className="text-3xl font-oswald font-bold text-electric">
            USABI<span className="text-white">.AI</span>
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
          <Button 
            onClick={handleJoinWaitlist} 
            className="rebel-button"
          >
            Join Waitlist
          </Button>
        </div>
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            className="text-white hover:text-electric"
            onClick={() => console.log("Mobile menu clicked")}
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Menu</span>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
