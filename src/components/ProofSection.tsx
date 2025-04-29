
import React from 'react';
import { Award, TrendingUp, Trophy } from "lucide-react";

const ProofSection = () => {
  return (
    <section id="proof" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center">
          <span className="text-electric">LEARN, EARN</span> & COMPETE
        </h2>
        <p className="text-xl text-center mb-12 max-w-2xl mx-auto">
          Your learning journey is rewarded! Earn points, climb the leaderboard, and win real prizes.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          <div className="border-2 border-electric p-6 rounded-lg bg-gradient-to-r from-black to-gray-900 transform transition-all hover:scale-105">
            <div className="w-16 h-16 rounded-full bg-electric flex items-center justify-center mb-5 mx-auto">
              <Award className="text-black w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold font-oswald mb-4 text-center">₦100 Per Lesson</h3>
            <p className="text-center text-gray-300">
              Complete lessons to earn ₦100 bonus credits towards future courses.
            </p>
          </div>
          
          <div className="border-2 border-electric p-6 rounded-lg bg-gradient-to-r from-black to-gray-900 transform transition-all hover:scale-105">
            <div className="w-16 h-16 rounded-full bg-electric flex items-center justify-center mb-5 mx-auto">
              <TrendingUp className="text-black w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold font-oswald mb-4 text-center">₦10K Weekly Prize</h3>
            <p className="text-center text-gray-300">
              Top student on our weekly leaderboard wins ₦10,000 cash.
            </p>
            <div className="mt-4 bg-muted/30 rounded-md p-3">
              <div className="flex justify-between text-xs mb-1">
                <span>Current Leader:</span>
                <span className="text-electric">Chioma D.</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-electric h-2 rounded-full" style={{width: '85%'}}></div>
              </div>
              <p className="text-xs text-right mt-1">8,500 points</p>
            </div>
          </div>
          
          <div className="border-2 border-electric p-6 rounded-lg bg-gradient-to-r from-black to-gray-900 transform transition-all hover:scale-105">
            <div className="w-16 h-16 rounded-full bg-electric flex items-center justify-center mb-5 mx-auto">
              <Trophy className="text-black w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold font-oswald mb-4 text-center">Android Phone Prize</h3>
            <p className="text-center text-gray-300">
              Monthly "Most Improved Learner" wins a new Android phone.
            </p>
            <div className="mt-4 text-center">
              <div className="inline-block bg-electric/20 py-1 px-3 rounded text-sm">
                <span className="text-electric font-bold">Next Draw:</span> 14 days
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <div className="inline-block border border-electric text-electric py-2 px-4 rounded-md transform transition-all hover:scale-105 hover:bg-electric hover:text-black cursor-pointer">
            View Full Leaderboard
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProofSection;
