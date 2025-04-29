
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Flag } from "lucide-react";

const Hero = () => {
  const handleJoinWaitlist = () => {
    console.log("Join waitlist clicked from hero");
    // Navigate to waitlist page or open modal
    // For now, we'll scroll to the bottom CTA section
    const ctaSection = document.getElementById('cta-section');
    if (ctaSection) {
      ctaSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const handleMeetAIMentors = () => {
    console.log("Meet AI Mentors clicked");
    // Scroll to AI mentors section
    const avatarsSection = document.getElementById('avatars');
    if (avatarsSection) {
      avatarsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="pt-24 pb-16 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="absolute top-0 right-0 w-96 h-96 bg-electric/20 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-neon/20 rounded-full blur-3xl -z-10"></div>
        
        {/* Banned hook */}
        <div className="mb-8 animate-pulse bg-red-900/50 border border-red-500 p-3 rounded-md max-w-md mx-auto flex items-center gap-2">
          <Flag className="text-red-500" size={20} />
          <p className="text-sm font-medium">🔥 BANNED! NUC says our AI tutors "too disruptive" for education</p>
        </div>
        
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-oswald uppercase font-bold text-5xl md:text-7xl lg:text-8xl tracking-tight mb-6 leading-none animate-slide-up">
            <span className="block">SCHOOL IS <span className="relative text-white line-through">DEAD</span></span> 
            <span className="block">HUSTLE IS <span className="text-electric highlight-text">ALIVE</span></span>
          </h1>
          
          <p className="text-xl md:text-2xl font-rubik mb-10 text-gray-300 animate-slide-up" style={{animationDelay: '0.2s'}}>
            Learn real-world hustle skills in your local language. 
            <span className="block mt-2 font-semibold">No degree. No nonsense. Just knowledge that pays.</span>
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center animate-slide-up" style={{animationDelay: '0.4s'}}>
            <Button 
              onClick={handleJoinWaitlist} 
              className="rebel-button text-lg group"
            >
              Join Waitlist
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              variant="outline" 
              onClick={handleMeetAIMentors}
              className="rebel-secondary-button text-lg"
            >
              Meet AI Mentors
              <Users className="ml-2 h-5 w-5" />
            </Button>
          </div>
          
          <p className="mt-4 text-electric animate-slide-up text-lg font-medium" style={{animationDelay: '0.5s'}}>
            First 1000 users pay what they want! 🔥
          </p>
          
          <div className="mt-12 md:mt-16 flex flex-wrap justify-center gap-8 text-sm md:text-base animate-slide-up" style={{animationDelay: '0.6s'}}>
            <div className="flex items-center">
              <div className="h-8 w-8 bg-electric rounded-full flex items-center justify-center text-black font-bold">
                🇳🇬
              </div>
              <span className="ml-2 font-medium">Yoruba</span>
            </div>
            <div className="flex items-center">
              <div className="h-8 w-8 bg-electric rounded-full flex items-center justify-center text-black font-bold">
                🇳🇬
              </div>
              <span className="ml-2 font-medium">Pidgin</span>
            </div>
            <div className="flex items-center">
              <div className="h-8 w-8 bg-electric rounded-full flex items-center justify-center text-black font-bold">
                🇳🇬
              </div>
              <span className="ml-2 font-medium">Hausa</span>
            </div>
            <div className="flex items-center">
              <div className="h-8 w-8 bg-electric rounded-full flex items-center justify-center text-black font-bold">
                🇳🇬
              </div>
              <span className="ml-2 font-medium">Igbo</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
