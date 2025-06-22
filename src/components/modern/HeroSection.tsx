
import React from 'react';
import { Button } from "@/components/ui/button";
import { Play, ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="pt-32 pb-20 px-4">
      <div className="container mx-auto text-center">
        {/* Floating badge */}
        <div className="inline-flex items-center space-x-2 bg-purple-light/20 border border-purple-light/30 rounded-full px-4 py-2 mb-8 animate-fade-in">
          <Sparkles className="w-4 h-4 text-purple" />
          <span className="text-purple font-medium">Africa's #1 AI Learning Platform</span>
        </div>

        {/* Main headline */}
        <h1 className="heading-xl mb-6 animate-slide-up">
          Learn AI. Earn with AI. <br />
          <span className="text-gradient">In your language.</span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
          Master AI skills through live sessions, real projects, and bounties. 
          Available in English, Yoruba, Hausa, and Pidgin. Start earning while you learn.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <Button 
            size="lg"
            onClick={() => navigate('/auth')}
            className="btn-primary text-lg px-8 py-4"
          >
            Join uSabi Pro
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button 
            size="lg"
            variant="outline"
            className="btn-ghost text-lg px-8 py-4"
          >
            <Play className="mr-2 w-5 h-5" />
            Watch Demo
          </Button>
          <Button 
            size="lg"
            onClick={() => navigate('/enterprise')}
            className="btn-secondary text-lg px-8 py-4"
          >
            Book Enterprise Demo
          </Button>
        </div>

        {/* Hero Visual */}
        <div className="relative max-w-6xl mx-auto animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="glass-card rounded-3xl p-8 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Left side - Dashboard preview */}
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-purple-light/20 to-yellow-bright/20 rounded-2xl p-6">
                  <h3 className="font-space font-semibold text-lg mb-3 text-gray-900">
                    Hi, Kemi. What will you uSabi today?
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="dashboard-tile">
                      <div className="text-2xl mb-2">🔨</div>
                      <p className="font-medium text-sm">Build Update</p>
                    </div>
                    <div className="dashboard-tile">
                      <div className="text-2xl mb-2">🎨</div>
                      <p className="font-medium text-sm">Design Roast</p>
                    </div>
                    <div className="dashboard-tile">
                      <div className="text-2xl mb-2">📬</div>
                      <p className="font-medium text-sm">Ask for Help</p>
                    </div>
                    <div className="dashboard-tile">
                      <div className="text-2xl mb-2">✍️</div>
                      <p className="font-medium text-sm">New Post</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side - Stats */}
              <div className="space-y-6">
                <div className="text-left">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple to-purple-dark rounded-xl flex items-center justify-center floating">
                      <span className="text-white font-bold text-xl">🚀</span>
                    </div>
                    <div>
                      <p className="font-space font-semibold text-lg">2,500+ Learners</p>
                      <p className="text-gray-600 text-sm">Across 36 African countries</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-yellow-bright/10 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-gray-900">₦2.5M+</p>
                    <p className="text-sm text-gray-600">Earned by learners</p>
                  </div>
                  <div className="bg-purple-light/10 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-gray-900">150+</p>
                    <p className="text-sm text-gray-600">AI Projects completed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
