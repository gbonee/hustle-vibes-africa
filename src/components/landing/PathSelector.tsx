
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, Zap, ArrowRight } from "lucide-react";

interface PathSelectorProps {
  onPathSelect: (path: 'core' | 'pro') => void;
}

const PathSelector: React.FC<PathSelectorProps> = ({ onPathSelect }) => {
  const [selectedPath, setSelectedPath] = useState<'core' | 'pro' | null>(null);

  const handlePathClick = (path: 'core' | 'pro') => {
    setSelectedPath(path);
    onPathSelect(path);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Welcome to USABI!
        </h2>
        <p className="text-gray-400 text-lg mb-12">
          Choose your learning path to get started
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Core Path */}
          <Card 
            className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
              selectedPath === 'core' 
                ? 'bg-gradient-to-br from-purple-900/50 to-purple-800/30 border-purple-500' 
                : 'bg-gradient-to-br from-purple-900/30 to-black border-purple-700/50'
            }`}
            onClick={() => handlePathClick('core')}
          >
            <CardContent className="p-8">
              <Globe className="w-16 h-16 text-purple-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">USABI Core</h3>
              <p className="text-purple-300 font-semibold mb-4">Learn in Your Language</p>
              <ul className="text-gray-300 space-y-2 text-left mb-6">
                <li>• Hausa, Yoruba, Igbo, Pidgin support</li>
                <li>• Digital marketing & local business</li>
                <li>• Pastry, catering, importation</li>
                <li>• WhatsApp & social media selling</li>
                <li>• Earn ₦20K - ₦100K monthly</li>
              </ul>
              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                Start Learning
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* Pro Path */}
          <Card 
            className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
              selectedPath === 'pro' 
                ? 'bg-gradient-to-br from-yellow-900/50 to-yellow-800/30 border-yellow-500' 
                : 'bg-gradient-to-br from-yellow-900/30 to-black border-yellow-700/50'
            }`}
            onClick={() => handlePathClick('pro')}
          >
            <CardContent className="p-8">
              <Zap className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">USABI Pro</h3>
              <p className="text-yellow-300 font-semibold mb-4">Master AI in English</p>
              <ul className="text-gray-300 space-y-2 text-left mb-6">
                <li>• AI agent & chatbot development</li>
                <li>• No-code with Bolt/Lovable</li>
                <li>• Tech partner certifications</li>
                <li>• Global client opportunities</li>
                <li>• Earn ₦150K - ₦500K+ monthly</li>
              </ul>
              <Button className="w-full bg-yellow-600 hover:bg-yellow-700 text-black font-semibold">
                Upskill in AI
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PathSelector;
