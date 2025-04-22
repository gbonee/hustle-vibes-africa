
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Users } from "lucide-react";

const languages = ['Pidgin', 'Yoruba', 'Hausa', 'Igbo'];

const Hero = () => {
  const [currentLanguage, setCurrentLanguage] = useState('Pidgin');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLanguage(prevLanguage => {
        const currentIndex = languages.indexOf(prevLanguage);
        const nextIndex = (currentIndex + 1) % languages.length;
        return languages[nextIndex];
      });
    }, 3000); // Change language every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const handleJoinWaitlist = () => {
    console.log("Join waitlist clicked from hero");
    const ctaSection = document.getElementById('cta-section');
    if (ctaSection) {
      ctaSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const handleMeetAIMentors = () => {
    console.log("Meet AI Mentors clicked");
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
        
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-oswald uppercase font-bold text-5xl md:text-7xl lg:text-8xl tracking-tight mb-6 leading-none animate-slide-up">
            <span className="block">EDUCATION</span> 
            <span className="relative inline-block text-electric">
              DON'T <span className="line-through text-white">WORK</span>
            </span>
            <span className="block">FOR THE STREETS</span>
          </h1>
          
          <p className="text-xl md:text-2xl font-rubik mb-10 text-gray-300 animate-slide-up" style={{animationDelay: '0.2s'}}>
            Learn real-world hustle skills in {currentLanguage} language. 
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
        </div>
      </div>
    </section>
  );
};

export default Hero;

