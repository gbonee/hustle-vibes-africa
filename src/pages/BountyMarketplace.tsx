
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useUserSubscription } from '@/hooks/useUserSubscription';
import { DollarSign, Calendar, Users, Zap, Crown } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface Bounty {
  id: string;
  title: string;
  description: string;
  category: string;
  reward_amount: number;
  currency: string;
  skills_required: string[];
  difficulty_level: string;
  deadline: string;
  status: string;
}

const BountyMarketplace = () => {
  const location = useLocation();
  const { subscription } = useUserSubscription();
  const [bounties, setBounties] = useState<Bounty[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBounties();
  }, []);

  const fetchBounties = async () => {
    try {
      const { data, error } = await supabase
        .from('bounties')
        .select('*')
        .eq('status', 'open')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBounties(data || []);
    } catch (error) {
      console.error('Error fetching bounties:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    return currency === 'NGN' ? `₦${amount.toLocaleString()}` : `$${amount}`;
  };

  if (!subscription.isProUser) {
    return (
      <DashboardLayout currentPath="/bounties">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <Crown className="text-purple-400 mx-auto mb-6" size={64} />
            <h1 className="text-3xl font-bold text-white mb-4">
              Bounty Marketplace - Pro Only
            </h1>
            <p className="text-gray-300 mb-8">
              Upgrade to USABI Pro to access high-paying AI bounties and start earning ₦100K+ monthly
            </p>
            <Button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 px-8 py-4 text-lg font-bold">
              Upgrade to Pro - ₦15K/month
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout currentPath="/bounties">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              🔥 USABI Bounties
            </h1>
            <p className="text-gray-300">
              High-paying AI projects from Nigerian startups
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge className="bg-purple-500 text-white">
              <Crown className="mr-1" size={16} />
              Pro Member
            </Badge>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-electric/20 to-yellow-600/10 border-electric/30">
            <CardContent className="p-6 text-center">
              <DollarSign className="text-electric mx-auto mb-2" size={32} />
              <p className="text-2xl font-bold text-white">₦{subscription.totalEarnings.toLocaleString()}</p>
              <p className="text-gray-400 text-sm">Total Earned</p>
            </CardContent>
          </Card>
          <Card className="bg-black/40 border-gray-700">
            <CardContent className="p-6 text-center">
              <Zap className="text-purple-400 mx-auto mb-2" size={32} />
              <p className="text-2xl font-bold text-white">{bounties.length}</p>
              <p className="text-gray-400 text-sm">Active Bounties</p>
            </CardContent>
          </Card>
          <Card className="bg-black/40 border-gray-700">
            <CardContent className="p-6 text-center">
              <Users className="text-blue-400 mx-auto mb-2" size={32} />
              <p className="text-2xl font-bold text-white">15</p>
              <p className="text-gray-400 text-sm">Applied</p>
            </CardContent>
          </Card>
          <Card className="bg-black/40 border-gray-700">
            <CardContent className="p-6 text-center">
              <Calendar className="text-orange-400 mx-auto mb-2" size={32} />
              <p className="text-2xl font-bold text-white">8</p>
              <p className="text-gray-400 text-sm">Completed</p>
            </CardContent>
          </Card>
        </div>

        {/* Bounties Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {bounties.map((bounty) => (
            <Card key={bounty.id} className="bg-black/40 border-gray-700 hover:border-purple-500/50 transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-white text-lg mb-2">
                      {bounty.title}
                    </CardTitle>
                    <div className="flex items-center space-x-2 mb-3">
                      <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                        {bounty.category}
                      </Badge>
                      <Badge variant="outline" className="border-gray-600 text-gray-400">
                        {bounty.difficulty_level}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-electric">
                      {formatCurrency(bounty.reward_amount, bounty.currency)}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4 line-clamp-3">
                  {bounty.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {bounty.skills_required.map((skill, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-400 text-sm">
                    <Calendar className="mr-1" size={16} />
                    {new Date(bounty.deadline).toLocaleDateString()}
                  </div>
                  <Button className="bg-electric text-black hover:bg-yellow-400 font-semibold">
                    Apply Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {bounties.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <Zap className="text-gray-600 mx-auto mb-4" size={64} />
            <h3 className="text-xl text-gray-400 mb-2">No bounties available</h3>
            <p className="text-gray-500">Check back soon for new opportunities!</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default BountyMarketplace;
