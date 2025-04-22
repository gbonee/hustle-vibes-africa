
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
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
            Learn real-world hustle skills in your local language. 
            <span className="block mt-2 font-semibold">No degree. No nonsense. Just knowledge that pays.</span>
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center animate-slide-up" style={{animationDelay: '0.4s'}}>
            <Button className="rebel-button text-lg group">
              Start For Free
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="outline" className="rebel-secondary-button text-lg">
              Explore Hustles
            </Button>
          </div>
          
          <div className="mt-12 md:mt-16 flex flex-wrap justify-center gap-8 text-sm md:text-base animate-slide-up" style={{animationDelay: '0.6s'}}>
            <div className="flex items-center">
              <div className="h-8 w-8 bg-electric rounded-full flex items-center justify-center text-black font-bold">
                🇳🇬
              </div>
              <span className="ml-2 font-medium">Yoruba</span>
            </div>
            <div className="flex items-center">
              <div className="h-8 w-8 bg-electric rounded-full flex items-center justify-center text-black font-bold">
                🇳🇬
              </div>
              <span className="ml-2 font-medium">Pidgin</span>
            </div>
            <div className="flex items-center">
              <div className="h-8 w-8 bg-electric rounded-full flex items-center justify-center text-black font-bold">
                🇳🇬
              </div>
              <span className="ml-2 font-medium">Hausa</span>
            </div>
            <div className="flex items-center">
              <div className="h-8 w-8 bg-electric rounded-full flex items-center justify-center text-black font-bold">
                🇳🇬
              </div>
              <span className="ml-2 font-medium">Igbo</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
