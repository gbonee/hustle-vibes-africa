
import React from 'react';
import { BadgeCheck } from "lucide-react";

const ProofSection = () => {
  return (
    <section id="proof" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center">
          WE GOT THE <span className="text-electric">RECEIPTS</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
          <div className="space-y-8">
            <div className="border-2 border-electric p-6 rounded-lg bg-gradient-to-r from-black to-gray-900">
              <h3 className="text-2xl font-bold font-oswald mb-4 flex items-center">
                <BadgeCheck className="text-electric mr-2" size={28} />
                VERIFIED JOB OFFERS
              </h3>
              <div className="space-y-4">
                <div className="bg-muted/50 p-4 rounded transform rotate-1">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-electric">Frontend Dev Offer</span>
                    <span className="text-xs bg-green-900 text-green-200 py-1 px-2 rounded">$1,200/mo</span>
                  </div>
                  <p className="text-sm">Offered to Tobi A. after 8 weeks on Usabi AI</p>
                </div>
                
                <div className="bg-muted/50 p-4 rounded transform -rotate-1">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-electric">Digital Marketing</span>
                    <span className="text-xs bg-green-900 text-green-200 py-1 px-2 rounded">₦280K/mo</span>
                  </div>
                  <p className="text-sm">Nneka J. landed after 6 weeks of Usabi training</p>
                </div>
                
                <div className="bg-muted/50 p-4 rounded transform rotate-1">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-electric">E-Commerce Manager</span>
                    <span className="text-xs bg-green-900 text-green-200 py-1 px-2 rounded">₦350K/mo</span>
                  </div>
                  <p className="text-sm">Halima M. after completing Import Hustle course</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="border-2 border-electric p-6 rounded-lg bg-gradient-to-r from-black to-gray-900">
              <h3 className="text-2xl font-bold font-oswald mb-4 flex items-center">
                <BadgeCheck className="text-electric mr-2" size={28} />
                VERIFIED EARNINGS
              </h3>
              
              <div className="relative overflow-hidden mb-6">
                <div className="bg-muted/50 p-4 rounded">
                  <h4 className="font-bold mb-2">Top Earner Progress 🚀</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Pastry Business</span>
                        <span>₦65K/mo</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-electric h-2 rounded-full" style={{width: '65%'}}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Hair Vendor</span>
                        <span>₦120K/mo</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-electric h-2 rounded-full" style={{width: '85%'}}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Tech Job</span>
                        <span>$1.5K/mo</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-electric h-2 rounded-full" style={{width: '95%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute top-0 right-0 bg-electric text-black transform rotate-12 translate-x-2 -translate-y-2 py-1 px-4 text-xs font-bold">
                  REAL NUMBERS!
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <div className="bg-electric/20 py-1 px-3 rounded text-sm">
                  <span className="text-electric font-bold">100+</span> Jobs Secured
                </div>
                <div className="bg-electric/20 py-1 px-3 rounded text-sm">
                  <span className="text-electric font-bold">78%</span> Income Increase
                </div>
                <div className="bg-electric/20 py-1 px-3 rounded text-sm">
                  <span className="text-electric font-bold">3,500+</span> Students
                </div>
                <div className="bg-electric/20 py-1 px-3 rounded text-sm">
                  <span className="text-electric font-bold">14</span> Countries
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProofSection;
