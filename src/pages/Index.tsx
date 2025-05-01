
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AvatarSelector from '@/components/AvatarSelector';
import WhyWeExist from '@/components/WhyWeExist';
import TopCourses from '@/components/TopCourses';
import Testimonials from '@/components/Testimonials';
import ProofSection from '@/components/ProofSection';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  
  const handleJoinWaitlist = () => {
    console.log("Join waitlist clicked from main CTA");
    // Direct the user to the auth page instead of showing an alert
    navigate('/auth');
  };

  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <Hero />
      
      <div className="meme-banner">
        <h3 className="meme-banner-text">SCHOOL DEY WASTE TIME. HUSTLE DEY PAY BILLS.</h3>
      </div>
      
      <AvatarSelector />
      <WhyWeExist />
      <TopCourses />
      
      <Testimonials />
      
      <div className="meme-banner bg-electric">
        <h3 className="meme-banner-text text-black">NO DEGREE NEEDED, JUST SKILLS WEY GO PAY.</h3>
      </div>
      
      <ProofSection />
      
      <section id="cta-section" className="py-20 relative overflow-hidden bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-oswald uppercase mb-6">
            READY TO <span className="text-electric">HUSTLE</span> FOR REAL?
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            No long talk. Get started now. Choose your AI guide and start learning skills that actually pay.
          </p>
          <Button 
            className="rebel-button text-lg py-8 px-12 text-2xl"
            onClick={handleJoinWaitlist}
          >
            JOIN NOW
          </Button>
          <p className="mt-6 text-sm text-gray-400">
            No credit card required. Just your brain and your hustle mentality.
          </p>
        </div>
      </section>
      
      <footer className="bg-black py-8 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <img 
                src="/lovable-uploads/20591bbc-87c9-4bbc-8159-3e4becbee8c8.png" 
                alt="uSabi AI Owl Mascot" 
                className="h-8 w-auto" 
              />
              <span className="text-2xl font-oswald font-bold text-electric">
                uSabi <span className="text-white">AI</span>
              </span>
            </div>
            <p className="text-sm text-gray-400">
              © 2025 uSabi AI. Education for the streets, by the streets.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
