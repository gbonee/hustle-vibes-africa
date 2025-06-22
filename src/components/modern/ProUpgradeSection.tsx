
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, DollarSign, Zap, Crown } from 'lucide-react';

const ProUpgradeSection = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-purple-900/20 via-black to-purple-800/10">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="mb-8">
          <Crown className="text-purple-400 mx-auto mb-6" size={64} />
          <h2 className="text-4xl md:text-5xl font-oswald font-bold text-white mb-6">
            Ready to <span className="text-purple-400">Earn Big</span>?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            USABI Pro members are earning ₦100K - ₦500K+ monthly building AI solutions for African startups
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
            <DollarSign className="text-electric mx-auto mb-4" size={48} />
            <h3 className="text-2xl font-bold text-white mb-2">₦420K+</h3>
            <p className="text-gray-400">Average monthly earnings</p>
          </div>
          <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
            <Zap className="text-purple-400 mx-auto mb-4" size={48} />
            <h3 className="text-2xl font-bold text-white mb-2">50+</h3>
            <p className="text-gray-400">Active bounties weekly</p>
          </div>
          <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
            <Crown className="text-orange-400 mx-auto mb-4" size={48} />
            <h3 className="text-2xl font-bold text-white mb-2">1,200+</h3>
            <p className="text-gray-400">Pro members earning</p>
          </div>
        </div>

        <div className="bg-black/60 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/50 mb-8">
          <h3 className="text-2xl font-bold text-white mb-4">What Pro Members Get:</h3>
          <div className="grid md:grid-cols-2 gap-4 text-left">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-purple-400 rounded-full mr-3" />
              <span className="text-gray-300">AI Automation Mastery Course</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-purple-400 rounded-full mr-3" />
              <span className="text-gray-300">Exclusive Bounty Access</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-purple-400 rounded-full mr-3" />
              <span className="text-gray-300">1-on-1 Mentor Sessions</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-purple-400 rounded-full mr-3" />
              <span className="text-gray-300">Priority Project Reviews</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-purple-400 rounded-full mr-3" />
              <span className="text-gray-300">Elite Community Channel</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-purple-400 rounded-full mr-3" />
              <span className="text-gray-300">Advanced Certifications</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 px-8 py-4 text-lg font-bold">
            Upgrade to Pro - ₦15K/month
            <ArrowRight className="ml-2" size={20} />
          </Button>
          <Button variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white px-8 py-4 text-lg">
            View Sample Bounties
          </Button>
        </div>

        <p className="text-gray-400 text-sm mt-6">
          30-day money-back guarantee • Cancel anytime • Start earning in Week 1
        </p>
      </div>
    </section>
  );
};

export default ProUpgradeSection;
