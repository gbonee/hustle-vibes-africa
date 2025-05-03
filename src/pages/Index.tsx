import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import AvatarSelector from '@/components/AvatarSelector';
import WhyWeExist from '@/components/WhyWeExist';
import TopCourses from '@/components/TopCourses';
import Testimonials from '@/components/Testimonials';
import ProofSection from '@/components/ProofSection';
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
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
      
      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center mb-4">
            <span className="text-white">CHOOSE YOUR</span> <span className="text-electric">HUSTLE PLAN</span>
          </h2>
          <p className="text-xl text-center mb-12 max-w-2xl mx-auto">
            No hidden fees, no long contract. Choose the plan that matches your hustle goals.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Free Plan */}
            <div className="bg-muted/80 rounded-xl overflow-hidden border border-gray-800 flex flex-col">
              <div className="p-6 text-center border-b border-gray-800">
                <h3 className="text-xl font-bold mb-2">Free</h3>
                <div className="text-electric">
                  <span className="text-3xl font-bold">₦0</span>
                  <span className="text-gray-400 text-sm">/forever</span>
                </div>
                <p className="mt-2 text-gray-400 text-sm">Taste the hustle</p>
              </div>
              <div className="p-6 flex-grow">
                <ul className="space-y-3 text-sm">
                  <li className="flex">
                    <Check className="h-5 w-5 text-electric shrink-0 mr-2" />
                    <span>Access to 1 free course</span>
                  </li>
                  <li className="flex">
                    <Check className="h-5 w-5 text-electric shrink-0 mr-2" />
                    <span>Basic AI interactions (5/day)</span>
                  </li>
                  <li className="flex">
                    <Check className="h-5 w-5 text-electric shrink-0 mr-2" />
                    <span>Content in ALL Nigerian languages</span>
                  </li>
                  <li className="flex">
                    <Check className="h-5 w-5 text-electric shrink-0 mr-2" />
                    <span>Community support</span>
                  </li>
                </ul>
              </div>
              <div className="p-6 border-t border-gray-800">
                <Button 
                  className="w-full bg-muted text-white hover:bg-gray-800"
                  onClick={handleJoinWaitlist}
                >
                  Get Started
                </Button>
              </div>
            </div>
            
            {/* Starter Plan */}
            <div className="bg-muted/80 rounded-xl overflow-hidden border border-gray-800 flex flex-col">
              <div className="p-6 text-center border-b border-gray-800">
                <h3 className="text-xl font-bold mb-2">Starter</h3>
                <div className="text-electric">
                  <span className="text-3xl font-bold">₦5,000</span>
                  <span className="text-gray-400 text-sm">/month</span>
                </div>
                <p className="mt-2 text-gray-400 text-sm">Build your hustle</p>
              </div>
              <div className="p-6 flex-grow">
                <ul className="space-y-3 text-sm">
                  <li className="flex">
                    <Check className="h-5 w-5 text-electric shrink-0 mr-2" />
                    <span>Access to 3 courses</span>
                  </li>
                  <li className="flex">
                    <Check className="h-5 w-5 text-electric shrink-0 mr-2" />
                    <span>AI tutoring (20/day)</span>
                  </li>
                  <li className="flex">
                    <Check className="h-5 w-5 text-electric shrink-0 mr-2" />
                    <span>Content in ALL Nigerian languages</span>
                  </li>
                  <li className="flex">
                    <Check className="h-5 w-5 text-electric shrink-0 mr-2" />
                    <span>Certificate on completion</span>
                  </li>
                  <li className="flex">
                    <Check className="h-5 w-5 text-electric shrink-0 mr-2" />
                    <span>Weekly group coaching</span>
                  </li>
                  <li className="flex">
                    <Check className="h-5 w-5 text-electric shrink-0 mr-2" />
                    <span className="text-yellow-300">Eligible for weekly giveaways</span>
                  </li>
                </ul>
              </div>
              <div className="p-6 border-t border-gray-800">
                <Button 
                  className="w-full bg-electric text-black hover:bg-electric/80"
                  onClick={handleJoinWaitlist}
                >
                  Join Waitlist
                </Button>
              </div>
            </div>
            
            {/* Hustler Plan */}
            <div className="bg-muted/80 rounded-xl overflow-hidden border-2 border-electric relative flex flex-col">
              <div className="absolute top-0 right-0 bg-electric text-black text-xs font-bold py-1 px-3 rounded-bl">
                MOST POPULAR
              </div>
              <div className="p-6 text-center border-b border-gray-800">
                <h3 className="text-xl font-bold mb-2">Hustler</h3>
                <div className="text-electric">
                  <span className="text-3xl font-bold">₦12,000</span>
                  <span className="text-gray-400 text-sm">/month</span>
                </div>
                <p className="mt-2 text-gray-400 text-sm">Accelerate your hustle</p>
              </div>
              <div className="p-6 flex-grow">
                <ul className="space-y-3 text-sm">
                  <li className="flex">
                    <Check className="h-5 w-5 text-electric shrink-0 mr-2" />
                    <span>Access to ALL courses</span>
                  </li>
                  <li className="flex">
                    <Check className="h-5 w-5 text-electric shrink-0 mr-2" />
                    <span>Unlimited AI tutoring</span>
                  </li>
                  <li className="flex">
                    <Check className="h-5 w-5 text-electric shrink-0 mr-2" />
                    <span>Content in ALL Nigerian languages</span>
                  </li>
                  <li className="flex">
                    <Check className="h-5 w-5 text-electric shrink-0 mr-2" />
                    <span>Premium certificates</span>
                  </li>
                  <li className="flex">
                    <Check className="h-5 w-5 text-electric shrink-0 mr-2" />
                    <span>1-on-1 coaching (2 sessions/month)</span>
                  </li>
                  <li className="flex">
                    <Check className="h-5 w-5 text-electric shrink-0 mr-2" />
                    <span>Job opportunity alerts</span>
                  </li>
                  <li className="flex">
                    <Check className="h-5 w-5 text-electric shrink-0 mr-2" />
                    <span>Business launch toolkit</span>
                  </li>
                  <li className="flex">
                    <Check className="h-5 w-5 text-electric shrink-0 mr-2" />
                    <span className="text-yellow-300">Eligible for all prizes & monthly phone giveaway</span>
                  </li>
                </ul>
              </div>
              <div className="p-6 border-t border-gray-800">
                <Button 
                  className="w-full rebel-button"
                  onClick={handleJoinWaitlist}
                >
                  Join Waitlist
                </Button>
              </div>
            </div>
            
            {/* Enterprise Plan */}
            <div className="bg-muted/80 rounded-xl overflow-hidden border border-gray-800 flex flex-col">
              <div className="p-6 text-center border-b border-gray-800">
                <h3 className="text-xl font-bold mb-2">Enterprise</h3>
                <div className="text-electric">
                  <span className="text-xl font-bold">Custom</span>
                </div>
                <p className="mt-2 text-gray-400 text-sm">For businesses & teams</p>
              </div>
              <div className="p-6 flex-grow">
                <ul className="space-y-3 text-sm">
                  <li className="flex">
                    <Check className="h-5 w-5 text-electric shrink-0 mr-2" />
                    <span>Custom training programs</span>
                  </li>
                  <li className="flex">
                    <Check className="h-5 w-5 text-electric shrink-0 mr-2" />
                    <span>Team progress tracking</span>
                  </li>
                  <li className="flex">
                    <Check className="h-5 w-5 text-electric shrink-0 mr-2" />
                    <span>Admin dashboard</span>
                  </li>
                  <li className="flex">
                    <Check className="h-5 w-5 text-electric shrink-0 mr-2" />
                    <span>Branded certificates</span>
                  </li>
                  <li className="flex">
                    <Check className="h-5 w-5 text-electric shrink-0 mr-2" />
                    <span>Dedicated account manager</span>
                  </li>
                  <li className="flex">
                    <Check className="h-5 w-5 text-electric shrink-0 mr-2" />
                    <span>Custom AI training</span>
                  </li>
                </ul>
              </div>
              <div className="p-6 border-t border-gray-800">
                <Button 
                  className="w-full bg-muted text-white hover:bg-gray-800"
                  onClick={() => navigate('/enterprise')}
                >
                  Request Demo
                </Button>
              </div>
            </div>
          </div>
          
          <div className="mt-16 text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Common Questions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div>
                <h4 className="font-bold mb-2 text-electric">Can I switch plans?</h4>
                <p className="text-gray-300 text-sm">Yes, you can upgrade or downgrade anytime. Your benefits will adjust immediately.</p>
              </div>
              <div>
                <h4 className="font-bold mb-2 text-electric">Do I get a certificate?</h4>
                <p className="text-gray-300 text-sm">Starter plans and above receive certificates upon course completion.</p>
              </div>
              <div>
                <h4 className="font-bold mb-2 text-electric">What payment methods are accepted?</h4>
                <p className="text-gray-300 text-sm">We accept bank transfers, cards, mobile money, and USSD payments.</p>
              </div>
              <div>
                <h4 className="font-bold mb-2 text-electric">Can I get a refund?</h4>
                <p className="text-gray-300 text-sm">Yes, we offer a 7-day money-back guarantee if you're not satisfied.</p>
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
