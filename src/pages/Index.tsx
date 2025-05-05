
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
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
      
      <div className="container mx-auto px-4 py-8 text-center">
        <h3 className="text-xl font-bold mb-4">Preview Pages</h3>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/auth?forcePreview=true">
            <Button variant="outline">Auth Page</Button>
          </Link>
          <Link to="/onboarding?forcePreview=true">
            <Button variant="outline">Onboarding</Button>
          </Link>
          <Link to="/dashboard?forcePreview=true">
            <Button variant="outline">Dashboard</Button>
          </Link>
          <Link to="/profile?forcePreview=true">
            <Button variant="outline">Profile</Button>
          </Link>
          <Link to="/leaderboard?forcePreview=true">
            <Button variant="outline">Leaderboard</Button>
          </Link>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
