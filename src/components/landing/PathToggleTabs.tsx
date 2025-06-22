
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Zap, Award, TrendingUp } from "lucide-react";

const PathToggleTabs = () => {
  const [activeTab, setActiveTab] = useState("core");

  return (
    <section className="py-20 bg-black">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Choose Your Learning Path
          </h2>
          <p className="text-gray-400 text-lg">
            Different goals, different approaches - both lead to financial success
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-2xl mx-auto mb-12 bg-gray-900 border border-gray-700">
            <TabsTrigger 
              value="core" 
              className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-gray-300 font-semibold py-3"
            >
              <Globe className="w-5 h-5 mr-2" />
              For Local Learners
            </TabsTrigger>
            <TabsTrigger 
              value="pro" 
              className="data-[state=active]:bg-yellow-600 data-[state=active]:text-black text-gray-300 font-semibold py-3"
            >
              <Zap className="w-5 h-5 mr-2" />
              For Aspiring AI Builders
            </TabsTrigger>
          </TabsList>

          {/* Core Path Content */}
          <TabsContent value="core" className="mt-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Featured Persona */}
              <Card className="bg-gradient-to-br from-purple-900/50 to-black border-purple-700/50">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <img 
                      src="/lovable-uploads/d2463e6e-5da8-418e-987a-323e7e603e7d.png" 
                      alt="Digital Mama" 
                      className="w-16 h-16 rounded-full mr-4"
                    />
                    <div>
                      <h3 className="text-xl font-bold text-white">Meet Digital Mama</h3>
                      <p className="text-purple-300">Your Pidgin AI Tutor</p>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-4">
                    "I go teach you how to make money from your phone. No wahala, everything in Pidgin so you go understand well well."
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="bg-purple-700/50 text-purple-200">Pidgin English</Badge>
                    <Badge variant="secondary" className="bg-purple-700/50 text-purple-200">Local Business</Badge>
                    <Badge variant="secondary" className="bg-purple-700/50 text-purple-200">WhatsApp Marketing</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Core Earnings Potential */}
              <Card className="bg-gradient-to-br from-gray-900 to-black border-gray-700">
                <CardContent className="p-8">
                  <TrendingUp className="w-12 h-12 text-purple-400 mb-4" />
                  <h3 className="text-xl font-bold text-white mb-4">Earning Potential</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-300">TikTok Videos</span>
                      <span className="text-purple-400 font-semibold">₦20K/video</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Local Business Setup</span>
                      <span className="text-purple-400 font-semibold">₦50K/client</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Monthly Potential</span>
                      <span className="text-purple-400 font-bold text-lg">₦100K+</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Pro Path Content */}
          <TabsContent value="pro" className="mt-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Featured Certifications */}
              <Card className="bg-gradient-to-br from-yellow-900/50 to-black border-yellow-700/50">
                <CardContent className="p-8">
                  <Award className="w-12 h-12 text-yellow-400 mb-4" />
                  <h3 className="text-xl font-bold text-white mb-4">Partner Certifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <img 
                        src="/lovable-uploads/193a1ea1-9016-49e8-8c05-b51fef7844e6.png" 
                        alt="Bolt" 
                        className="w-8 h-8 mr-3"
                      />
                      <span className="text-white">Bolt.new AI Development</span>
                    </div>
                    <div className="flex items-center">
                      <img 
                        src="/lovable-uploads/20591bbc-87c9-4bbc-8159-3e4becbee8c8.png" 
                        alt="Lovable" 
                        className="w-8 h-8 mr-3"
                      />
                      <span className="text-white">Lovable No-Code Expert</span>
                    </div>
                    <div className="flex items-center">
                      <Zap className="w-8 h-8 mr-3 text-yellow-400" />
                      <span className="text-white">AI Agent Builder</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Pro Earnings Potential */}
              <Card className="bg-gradient-to-br from-gray-900 to-black border-gray-700">
                <CardContent className="p-8">
                  <TrendingUp className="w-12 h-12 text-yellow-400 mb-4" />
                  <h3 className="text-xl font-bold text-white mb-4">Earning Potential</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-300">WhatsApp Bot</span>
                      <span className="text-yellow-400 font-semibold">₦150K/project</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">AI Agent Build</span>
                      <span className="text-yellow-400 font-semibold">₦200K/project</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Monthly Potential</span>
                      <span className="text-yellow-400 font-bold text-lg">₦500K+</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default PathToggleTabs;
