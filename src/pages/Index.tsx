
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AvatarSelector from '@/components/AvatarSelector';
import WhyWeExist from '@/components/WhyWeExist';
import TopCourses from '@/components/TopCourses';
import Testimonials from '@/components/Testimonials';
import ProofSection from '@/components/ProofSection';
import { Button } from "@/components/ui/button";
import { Building2, ArrowRight } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  
  const handleJoinWaitlist = () => {
    console.log("Join waitlist clicked from main CTA");
    // Open the Google Form in a new tab
    window.open("https://docs.google.com/forms/d/e/1FAIpQLSddajKguRwE_0pfsDpHM6T3xIg26G89kQlvtn2uQK9P1IqTZA/viewform", "_blank");
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
      
      {/* Enterprise Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-10 items-center">
            <div className="md:w-1/2">
              <Building2 className="h-16 w-16 text-electric mb-6" />
              <h2 className="text-4xl md:text-5xl font-oswald uppercase mb-4">
                FOR <span className="text-electric">ENTERPRISE</span>
              </h2>
              <p className="text-xl mb-6">
                Equip your workforce with practical skills in their native languages. Custom training programs for Nigerian businesses.
              </p>
              <ul className="mb-8 space-y-2">
                <li className="flex items-center">
                  <span className="text-electric mr-2">✓</span> Customized training programs
                </li>
                <li className="flex items-center">
                  <span className="text-electric mr-2">✓</span> Bulk enrollment discounts
                </li>
                <li className="flex items-center">
                  <span className="text-electric mr-2">✓</span> Progress tracking & analytics
                </li>
              </ul>
              <Button 
                onClick={() => navigate('/enterprise')}
                variant="outline" 
                className="rebel-secondary-button text-lg"
              >
                Learn More
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="md:w-1/2">
              <div className="relative border-2 border-electric rounded-xl overflow-hidden">
                <div className="aspect-video bg-black/50">
                  <div className="flex items-center justify-center h-full flex-col">
                    <img 
                      src="/lovable-uploads/20591bbc-87c9-4bbc-8159-3e4becbee8c8.png" 
                      alt="uSabi AI Enterprise" 
                      className="h-20 w-auto mb-4" 
                    />
                    <h3 className="text-2xl font-bold">Enterprise Solutions</h3>
                    <p className="text-gray-400 mt-2">Training for Nigerian businesses</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
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
