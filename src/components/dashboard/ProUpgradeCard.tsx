
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Crown, ArrowRight, Zap, DollarSign } from 'lucide-react';

interface ProUpgradeCardProps {
  onUpgrade: () => void;
}

const ProUpgradeCard: React.FC<ProUpgradeCardProps> = ({ onUpgrade }) => {
  return (
    <Card className="bg-gradient-to-br from-purple-900/40 to-purple-800/20 border-purple-500/50 mb-6">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <Crown className="text-purple-400 mr-3" size={32} />
          <div>
            <h3 className="text-xl font-bold text-white">Unlock USABI Pro</h3>
            <p className="text-purple-400 font-semibold">Earn ₦100K - ₦500K+ monthly</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-black/30 rounded-lg p-4 text-center">
            <DollarSign className="text-electric mx-auto mb-2" size={24} />
            <p className="text-white font-bold">₦45,000</p>
            <p className="text-gray-400 text-sm">Latest bounty</p>
          </div>
          <div className="bg-black/30 rounded-lg p-4 text-center">
            <Zap className="text-purple-400 mx-auto mb-2"  size={24} />
            <p className="text-white font-bold">50+</p>
            <p className="text-gray-400 text-sm">Active bounties</p>
          </div>
        </div>

        <div className="space-y-2 mb-6">
          <div className="flex items-center text-sm">
            <div className="w-2 h-2 bg-purple-400 rounded-full mr-3" />
            <span className="text-gray-300">AI & No-code mastery courses</span>
          </div>
          <div className="flex items-center text-sm">
            <div className="w-2 h-2 bg-purple-400 rounded-full mr-3" />
            <span className="text-gray-300">Exclusive high-paying bounties</span>
          </div>
          <div className="flex items-center text-sm">
            <div className="w-2 h-2 bg-purple-400 rounded-full mr-3" />
            <span className="text-gray-300">Elite community access</span>
          </div>
        </div>

        <Button 
          onClick={onUpgrade}
          className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 font-bold"
        >
          Upgrade to Pro - ₦15K/month
          <ArrowRight className="ml-2" size={18} />
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProUpgradeCard;
