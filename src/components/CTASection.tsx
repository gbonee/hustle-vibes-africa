
import React from 'react';
import { Button } from "@/components/ui/button";

type CTASectionProps = {
  handleJoinWaitlist: () => void;
};

const CTASection = ({ handleJoinWaitlist }: CTASectionProps) => {
  return (
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
  );
};

export default CTASection;
