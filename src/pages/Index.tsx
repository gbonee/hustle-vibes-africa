
import React from 'react';
import ModernNavbar from '@/components/modern/ModernNavbar';
import HeroSection from '@/components/modern/HeroSection';
import FeaturesSection from '@/components/modern/FeaturesSection';
import TracksSection from '@/components/modern/TracksSection';
import StatsSection from '@/components/modern/StatsSection';
import TestimonialsSection from '@/components/modern/TestimonialsSection';
import CTASection from '@/components/modern/CTASection';
import ModernFooter from '@/components/modern/ModernFooter';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-light/5 to-yellow-bright/10">
      <ModernNavbar />
      <HeroSection />
      <FeaturesSection />
      <TracksSection />
      <StatsSection />
      <TestimonialsSection />
      <CTASection />
      <ModernFooter />
    </div>
  );
};

export default Index;
