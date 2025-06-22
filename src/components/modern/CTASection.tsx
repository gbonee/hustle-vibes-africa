
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-yellow-bright/10 to-purple-light/10">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto glass-card rounded-3xl p-12 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-purple-light/20 to-purple/20 rounded-full -translate-y-20 -translate-x-20"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-br from-yellow-bright/20 to-yellow/20 rounded-full translate-y-20 translate-x-20"></div>
          
          <div className="relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-purple-light/20 border border-purple-light/30 rounded-full px-4 py-2 mb-8">
              <Sparkles className="w-4 h-4 text-purple" />
              <span className="text-purple font-medium">Join 2,500+ African AI builders</span>
            </div>

            {/* Headline */}
            <h2 className="heading-lg mb-6">
              Ready to master AI and <span className="text-gradient">start earning?</span>
            </h2>

            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join Africa's most comprehensive AI learning platform. Start with our free course 
              and unlock unlimited earning potential.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Button 
                size="lg"
                onClick={() => navigate('/auth')}
                className="btn-primary text-lg px-8 py-4 group"
              >
                Start Learning for Free
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                size="lg"
                onClick={() => navigate('/enterprise')}
                className="btn-secondary text-lg px-8 py-4 group"
              >
                Book Enterprise Demo
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-4">Trusted by learners from</p>
              <div className="flex flex-wrap justify-center items-center space-x-8 text-gray-400">
                <span className="font-medium">University of Lagos</span>
                <span className="font-medium">Andela</span>
                <span className="font-medium">Flutterwave</span>
                <span className="font-medium">Paystack</span>
                <span className="font-medium">Interswitch</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
