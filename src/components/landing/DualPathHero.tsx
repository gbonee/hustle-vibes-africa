
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Globe } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const DualPathHero = () => {
  const navigate = useNavigate();

  const handleCorePathClick = () => {
    // Navigate to auth with core preference
    navigate('/auth?path=core');
  };

  const handleProPathClick = () => {
    // Navigate to auth with pro preference
    navigate('/auth?path=pro');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-yellow-900/20"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        {/* Main Headline */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Learn Digital Skills in Your Language
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric to-yellow-400">
            or Master AI in English
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
          Choose your path: Start a local hustle in your native language or build AI solutions for global opportunities
        </p>

        {/* Dual CTA Buttons */}
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-16">
          {/* USABI Core Button */}
          <div className="relative group">
            <Button
              onClick={handleCorePathClick}
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-6 text-lg font-semibold rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 border-purple-500"
            >
              <Globe className="w-6 h-6 mr-3" />
              Start Learning (Hausa/Yoruba/Igbo/Pidgin)
              <ArrowRight className="w-5 h-5 ml-3" />
            </Button>
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-purple-400 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
          </div>

          {/* USABI Pro Button */}
          <div className="relative group">
            <Button
              onClick={handleProPathClick}
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black px-8 py-6 text-lg font-semibold rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 border-yellow-400"
            >
              <Zap className="w-6 h-6 mr-3" />
              Upskill in AI (English)
              <ArrowRight className="w-5 h-5 ml-3" />
            </Button>
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-600 to-yellow-400 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
          </div>
        </div>

        {/* Path Descriptions */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Core Path */}
          <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 p-6 rounded-xl border border-purple-700/50">
            <h3 className="text-xl font-bold text-purple-300 mb-3">USABI Core - Local Hustle</h3>
            <ul className="text-gray-300 space-y-2 text-left">
              <li>• Learn in Hausa, Yoruba, Igbo, or Pidgin</li>
              <li>• Digital marketing for local businesses</li>
              <li>• Pastry & catering business skills</li>
              <li>• WhatsApp selling strategies</li>
              <li>• Earn ₦20K - ₦100K monthly</li>
            </ul>
          </div>

          {/* Pro Path */}
          <div className="bg-gradient-to-br from-yellow-900/30 to-yellow-800/20 p-6 rounded-xl border border-yellow-700/50">
            <h3 className="text-xl font-bold text-yellow-300 mb-3">USABI Pro - AI Builder</h3>
            <ul className="text-gray-300 space-y-2 text-left">
              <li>• Learn in English with global focus</li>
              <li>• Build AI agents & chatbots</li>
              <li>• No-code development with Bolt/Lovable</li>
              <li>• Get certified by tech partners</li>
              <li>• Earn ₦150K - ₦500K+ monthly</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DualPathHero;
