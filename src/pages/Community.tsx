
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Users, Calendar, Zap } from 'lucide-react';

const Community = () => {
  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-oswald font-bold mb-4">
            USABI <span className="text-electric">Community</span>
          </h1>
          <p className="text-xl text-gray-300">
            Connect with builders, share knowledge, and grow together
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Core Community */}
          <Card className="bg-gray-900/50 border-electric/30">
            <CardHeader>
              <CardTitle className="flex items-center text-electric">
                <Users className="mr-2" size={24} />
                Core Community
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">
                Local language discussions for vocational learners
              </p>
              <Button className="w-full bg-electric text-black hover:bg-yellow-400">
                Join Core Chat
              </Button>
            </CardContent>
          </Card>

          {/* Pro Community */}
          <Card className="bg-gradient-to-br from-purple-900/40 to-purple-800/20 border-purple-500/50">
            <CardHeader>
              <CardTitle className="flex items-center text-purple-400">
                <Zap className="mr-2" size={24} />
                Pro Community
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">
                Elite AI builders sharing bounties and insights
              </p>
              <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                Join Pro Chat
              </Button>
            </CardContent>
          </Card>

          {/* Live Events */}
          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Calendar className="mr-2" size={24} />
                Live Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">
                Weekly livestreams and community calls
              </p>
              <Button variant="outline" className="w-full border-gray-600 text-gray-300">
                View Schedule
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Community Feed Placeholder */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">Community Feed</h2>
          <Card className="bg-gray-900/50 border-gray-700">
            <CardContent className="p-8 text-center">
              <MessageCircle className="text-gray-500 mx-auto mb-4" size={48} />
              <p className="text-gray-400">Community feed coming soon...</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Community;
