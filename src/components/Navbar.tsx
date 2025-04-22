import React from 'react';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-black/90 backdrop-blur-sm z-50 border-b border-electric/30">
      <div className="container mx-auto flex justify-between items-center py-4 px-4">
        <div className="flex items-center">
          <a href="/" className="text-3xl font-oswald font-bold text-electric">
            USABI<span className="text-white">.AI</span>
          </a>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <a href="#courses" className="text-white hover:text-electric font-medium transition-colors">
            Hustles
          </a>
          <a href="#avatars" className="text-white hover:text-electric font-medium transition-colors">
            AI Mentors
          </a>
          <a href="#proof" className="text-white hover:text-electric font-medium transition-colors">
            Success Proof
          </a>
          <Button className="rebel-button">Join Waitlist</Button>
        </div>
        <div className="md:hidden">
          <Button variant="ghost" className="text-white hover:text-electric">
            Menu
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
