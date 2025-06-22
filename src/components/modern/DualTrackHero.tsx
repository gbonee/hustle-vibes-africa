
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, GraduationCap } from 'lucide-react';

interface DualTrackHeroProps {
  activeTrack: 'core' | 'pro';
  setActiveTrack: (track: 'core' | 'pro') => void;
}

const DualTrackHero: React.FC<DualTrackHeroProps> = ({ activeTrack, setActiveTrack }) => {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-yellow-600/10" />
      
      <div className="container mx-auto relative z-10">
        {/* Main Headline */}
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-8xl font-oswald font-bold text-white mb-6">
            Learn Skills.
            <span className="text-electric"> Build AI.</span>
            <br />
            <span className="text-gradient bg-gradient-to-r from-purple-400 to-yellow-400 bg-clip-text text-transparent">
              Get Paid.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
            <span className="text-electric font-semibold">USABI Core:</span> Master vocational skills in Yoruba, Pidgin, Hausa
            <br />
            <span className="text-purple-400 font-semibold">USABI Pro:</span> Upskill in AI/No-code (English) and earn bounties
          </p>
          
          {/* Track Toggle */}
          <div className="flex justify-center mb-12">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-full p-2 border border-gray-700">
              <button
                onClick={() => setActiveTrack('core')}
                className={`px-8 py-3 rounded-full font-semibold transition-all ${
                  activeTrack === 'core'
                    ? 'bg-electric text-black'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                USABI Core
              </button>
              <button
                onClick={() => setActiveTrack('pro')}
                className={`px-8 py-3 rounded-full font-semibold transition-all ${
                  activeTrack === 'pro'
                    ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                USABI Pro
              </button>
            </div>
          </div>
        </div>

        {/* Split Screen Visual */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Core Track */}
          <div className={`relative rounded-2xl overflow-hidden transition-all duration-500 ${
            activeTrack === 'core' ? 'ring-4 ring-electric scale-105' : 'opacity-75'
          }`}>
            <div className="bg-gradient-to-br from-electric/20 to-yellow-600/10 p-8 h-full">
              <div className="flex items-center mb-4">
                <GraduationCap className="text-electric mr-3" size={32} />
                <h3 className="text-2xl font-bold text-white">USABI Core</h3>
              </div>
              
              <div className="bg-black/30 rounded-lg p-6 mb-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-pink-500 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">A</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold">Adunni from Lagos</p>
                    <p className="text-gray-300 text-sm">Learning Fashion Design</p>
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <p className="text-electric font-semibold mb-2">Today's Lesson (Pidgin):</p>
                  <p className="text-white">"How to sew belle top wey go make your customer happy"</p>
                </div>
              </div>
              
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-electric rounded-full mr-3" />
                  Local language courses
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-electric rounded-full mr-3" />
                  Practical vocational skills
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-electric rounded-full mr-3" />
                  Community support
                </li>
              </ul>
              
              <Button className="w-full mt-6 bg-electric text-black hover:bg-yellow-400 font-bold">
                Start Learning Free
              </Button>
            </div>
          </div>

          {/* Pro Track */}
          <div className={`relative rounded-2xl overflow-hidden transition-all duration-500 ${
            activeTrack === 'pro' ? 'ring-4 ring-purple-500 scale-105' : 'opacity-75'
          }`}>
            <div className="bg-gradient-to-br from-purple-500/20 to-purple-900/10 p-8 h-full">
              <div className="flex items-center mb-4">
                <Zap className="text-purple-400 mr-3" size={32} />
                <h3 className="text-2xl font-bold text-white">USABI Pro</h3>
              </div>
              
              <div className="bg-black/30 rounded-lg p-6 mb-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">K</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold">Kemi from Abuja</p>
                    <p className="text-gray-300 text-sm">AI Automation Specialist</p>
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <p className="text-purple-400 font-semibold mb-2">Current Bounty:</p>
                  <div className="flex justify-between items-center">
                    <p className="text-white">WhatsApp Bot for Startup</p>
                    <span className="text-electric font-bold">₦45,000</span>
                  </div>
                </div>
              </div>
              
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3" />
                  AI & No-code training
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3" />
                  High-paying bounties
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3" />
                  Elite community access
                </li>
              </ul>
              
              <Button className="w-full mt-6 bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 font-bold">
                Upgrade to Pro
                <ArrowRight className="ml-2" size={18} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DualTrackHero;
