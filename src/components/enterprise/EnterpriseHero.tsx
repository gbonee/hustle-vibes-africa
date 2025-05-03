
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface EnterpriseHeroProps {
  onRequestDemo: () => void;
}

const EnterpriseHero: React.FC<EnterpriseHeroProps> = ({ onRequestDemo }) => {
  return (
    <section className="pt-28 pb-16 md:py-32 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-electric/20 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-electric/20 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-4 bg-electric/20 text-electric hover:bg-electric/30 py-1.5 px-4 text-sm">
            For Enterprise
          </Badge>
          <h1 className="font-oswald uppercase font-bold text-5xl md:text-7xl tracking-tight mb-6 leading-none">
            <span className="block">SKILLS-FIRST</span> 
            <span className="block">EDUCATION FOR YOUR <span className="text-electric">WORKFORCE</span></span>
          </h1>
          
          <p className="text-xl md:text-2xl font-rubik mb-10 text-gray-300">
            Train your workforce with practical skills that drive real business outcomes, in their native languages.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={onRequestDemo}
              className="rebel-button text-lg group"
            >
              Request Demo
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
          
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center p-6 border border-electric/30 rounded-xl bg-black/50 hover:bg-black/70 transition">
              <Building2 className="h-10 w-10 text-electric mb-4" />
              <h3 className="text-xl font-bold mb-2">Local Language Support</h3>
              <p className="text-gray-400">Train in Pidgin, Yoruba, Hausa, Igbo and more.</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 border border-electric/30 rounded-xl bg-black/50 hover:bg-black/70 transition">
              <Building2 className="h-10 w-10 text-electric mb-4" />
              <h3 className="text-xl font-bold mb-2">Skills Certification</h3>
              <p className="text-gray-400">Verifiable skills certification for your team.</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 border border-electric/30 rounded-xl bg-black/50 hover:bg-black/70 transition">
              <Building2 className="h-10 w-10 text-electric mb-4" />
              <h3 className="text-xl font-bold mb-2">Customized Training</h3>
              <p className="text-gray-400">Built specifically for your business needs.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnterpriseHero;
