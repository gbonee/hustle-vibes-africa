
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Users, Briefcase } from "lucide-react";

const TracksSection = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="heading-lg mb-6">
            Choose your <span className="text-gradient">learning path</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Whether you're an individual looking to upskill or a company seeking team transformation, 
            we have the perfect program for you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* uSabi Pro & Core */}
          <div className="glass-card rounded-3xl p-8 relative overflow-hidden group hover:scale-105 transition-all duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-light/20 to-purple/20 rounded-full -translate-y-16 translate-x-16"></div>
            
            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple to-purple-dark rounded-xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-space font-bold text-gray-900">uSabi Individual</h3>
                  <p className="text-purple font-medium">Pro & Core tracks</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple rounded-full mt-2"></div>
                  <p className="text-gray-600"><strong>uSabi Pro:</strong> Advanced AI mastery for professionals</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple rounded-full mt-2"></div>
                  <p className="text-gray-600"><strong>uSabi Core:</strong> Essential AI skills for everyone</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple rounded-full mt-2"></div>
                  <p className="text-gray-600">Live sessions in your local language</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple rounded-full mt-2"></div>
                  <p className="text-gray-600">Real bounties and earning opportunities</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple rounded-full mt-2"></div>
                  <p className="text-gray-600">Industry-recognized certifications</p>
                </div>
              </div>

              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm text-gray-500">Starting from</p>
                  <p className="text-3xl font-bold text-gray-900">₦15,000<span className="text-lg text-gray-500">/month</span></p>
                </div>
                <div className="flex items-center space-x-2 text-purple">
                  <Users className="w-5 h-5" />
                  <span className="font-medium">2,500+ learners</span>
                </div>
              </div>

              <Button className="btn-primary w-full group">
                Join Individual Track
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>

          {/* uSabi Enterprise */}
          <div className="glass-card rounded-3xl p-8 relative overflow-hidden group hover:scale-105 transition-all duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-bright/20 to-yellow/20 rounded-full -translate-y-16 translate-x-16"></div>
            
            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-bright to-yellow rounded-xl flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-gray-900" />
                </div>
                <div>
                  <h3 className="text-2xl font-space font-bold text-gray-900">uSabi Enterprise</h3>
                  <p className="text-yellow-800 font-medium">Team transformation</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-800 rounded-full mt-2"></div>
                  <p className="text-gray-600">Custom AI learning paths for your team</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-800 rounded-full mt-2"></div>
                  <p className="text-gray-600">Role-specific training (Marketing, Ops, Tech, Support)</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-800 rounded-full mt-2"></div>
                  <p className="text-gray-600">Dedicated success manager</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-800 rounded-full mt-2"></div>
                  <p className="text-gray-600">Private team workspace</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-800 rounded-full mt-2"></div>
                  <p className="text-gray-600">Analytics and progress tracking</p>
                </div>
              </div>

              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm text-gray-500">Custom pricing</p>
                  <p className="text-3xl font-bold text-gray-900">Let's talk</p>
                </div>
                <div className="flex items-center space-x-2 text-yellow-800">
                  <Briefcase className="w-5 h-5" />
                  <span className="font-medium">50+ companies</span>
                </div>
              </div>

              <Button className="btn-secondary w-full group">
                Book Enterprise Demo
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TracksSection;
