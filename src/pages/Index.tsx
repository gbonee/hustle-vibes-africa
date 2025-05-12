
import React from 'react';
import { Button } from "@/components/ui/button";
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AvatarSelector from '@/components/AvatarSelector';
import WhyWeExist from '@/components/WhyWeExist';
import TopCourses from '@/components/TopCourses';
import Testimonials from '@/components/Testimonials';
import ProofSection from '@/components/ProofSection';
import PricingSection from '@/components/PricingSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

const Index = () => {
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
      
      <PricingSection />
      
      <CTASection handleJoinWaitlist={handleJoinWaitlist} />
      
      <Footer />
    </div>
  );
};

export default Index;
