
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import DualTrackHero from '@/components/modern/DualTrackHero';
import TracksComparison from '@/components/modern/TracksComparison';
import FeaturesShowcase from '@/components/modern/FeaturesShowcase';
import StatsSection from '@/components/modern/StatsSection';
import TestimonialsSection from '@/components/modern/TestimonialsSection';
import ProUpgradeSection from '@/components/modern/ProUpgradeSection';
import Footer from '@/components/Footer';

const Index = () => {
  const [activeTrack, setActiveTrack] = useState<'core' | 'pro'>('core');

  const handleJoinWaitlist = () => {
    console.log("Join waitlist clicked from main CTA");
    window.open("https://docs.google.com/forms/d/e/1FAIpQLSddajKguRwE_0pfsDpHM6T3xIg26G89kQlvtn2uQK9P1IqTZA/viewform", "_blank");
  };

  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      
      {/* New Dual-Track Hero Section */}
      <DualTrackHero activeTrack={activeTrack} setActiveTrack={setActiveTrack} />
      
      {/* Tracks Comparison */}
      <TracksComparison />
      
      {/* Features Showcase */}
      <FeaturesShowcase />
      
      {/* Stats Section */}
      <StatsSection />
      
      {/* Pro Upgrade Section */}
      <ProUpgradeSection />
      
      {/* Testimonials */}
      <TestimonialsSection />
      
      <Footer />
    </div>
  );
};

export default Index;
