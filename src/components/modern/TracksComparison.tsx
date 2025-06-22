
import React from 'react';
import { Check, Crown, Users, Zap } from 'lucide-react';

const TracksComparison = () => {
  return (
    <section className="py-20 px-4 bg-gray-900/50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-oswald font-bold text-white mb-4">
            Choose Your <span className="text-electric">Learning Path</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Start with Core fundamentals or jump to Pro for advanced AI earning opportunities
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* USABI Core */}
          <div className="bg-black/40 backdrop-blur-sm border border-electric/30 rounded-2xl p-8 relative">
            <div className="flex items-center mb-6">
              <Users className="text-electric mr-3" size={32} />
              <div>
                <h3 className="text-2xl font-bold text-white">USABI Core</h3>
                <p className="text-electric font-semibold">Free Forever</p>
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <Check className="text-electric mr-3 mt-1 flex-shrink-0" size={20} />
                <div>
                  <p className="text-white font-semibold">Vocational Skills Training</p>
                  <p className="text-gray-400 text-sm">Fashion, HVAC, Digital Marketing, Pastry</p>
                </div>
              </li>
              <li className="flex items-start">
                <Check className="text-electric mr-3 mt-1 flex-shrink-0" size={20} />
                <div>
                  <p className="text-white font-semibold">Local Language Support</p>
                  <p className="text-gray-400 text-sm">Yoruba, Pidgin, Hausa, Igbo</p>
                </div>
              </li>
              <li className="flex items-start">
                <Check className="text-electric mr-3 mt-1 flex-shrink-0" size={20} />
                <div>
                  <p className="text-white font-semibold">Community Access</p>
                  <p className="text-gray-400 text-sm">Connect with local learners</p>
                </div>
              </li>
              <li className="flex items-start">
                <Check className="text-electric mr-3 mt-1 flex-shrink-0" size={20} />
                <div>
                  <p className="text-white font-semibold">Basic Certificates</p>
                  <p className="text-gray-400 text-sm">Validate your skills</p>
                </div>
              </li>
            </ul>

            <div className="text-center">
              <p className="text-gray-400 mb-4">Perfect for building foundational skills</p>
            </div>
          </div>

          {/* USABI Pro */}
          <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/20 backdrop-blur-sm border border-purple-500/50 rounded-2xl p-8 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                MOST POPULAR
              </span>
            </div>

            <div className="flex items-center mb-6">
              <Crown className="text-purple-400 mr-3" size={32} />
              <div>
                <h3 className="text-2xl font-bold text-white">USABI Pro</h3>
                <p className="text-purple-400 font-semibold">₦15,000/month</p>
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <Check className="text-purple-400 mr-3 mt-1 flex-shrink-0" size={20} />
                <div>
                  <p className="text-white font-semibold">Everything in Core</p>
                  <p className="text-gray-400 text-sm">Plus all premium benefits</p>
                </div>
              </li>
              <li className="flex items-start">
                <Zap className="text-purple-400 mr-3 mt-1 flex-shrink-0" size={20} />
                <div>
                  <p className="text-white font-semibold">AI & No-Code Training</p>
                  <p className="text-gray-400 text-sm">Chatbots, Automation, AI Agents</p>
                </div>
              </li>
              <li className="flex items-start">
                <Zap className="text-purple-400 mr-3 mt-1 flex-shrink-0" size={20} />
                <div>
                  <p className="text-white font-semibold">Bounty Marketplace</p>
                  <p className="text-gray-400 text-sm">Earn ₦100K - ₦500K+ monthly</p>
                </div>
              </li>
              <li className="flex items-start">
                <Zap className="text-purple-400 mr-3 mt-1 flex-shrink-0" size={20} />
                <div>
                  <p className="text-white font-semibold">Elite Community</p>
                  <p className="text-gray-400 text-sm">Network with top AI builders</p>
                </div>
              </li>
              <li className="flex items-start">
                <Zap className="text-purple-400 mr-3 mt-1 flex-shrink-0" size={20} />
                <div>
                  <p className="text-white font-semibold">Priority Support</p>
                  <p className="text-gray-400 text-sm">Direct mentor access</p>
                </div>
              </li>
            </ul>

            <div className="text-center">
              <p className="text-gray-400 mb-4">For serious builders ready to earn</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TracksComparison;
