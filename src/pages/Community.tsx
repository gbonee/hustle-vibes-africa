
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, MessageSquare, TrendingUp, Group } from "lucide-react";
import UserDiscovery from '@/components/community/UserDiscovery';
import CommunityChat from '@/components/community/CommunityChat';
import TrendingNews from '@/components/community/TrendingNews';
import Groups from '@/components/community/Groups';
import CommunityFeed from '@/components/community/CommunityFeed';

const Community = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('feed');
  
  // Mock user data - replace with actual auth user
  const user = {
    id: '1',
    name: 'Your Name',
    email: 'you@example.com',
    avatar: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1'
  };

  return (
    <DashboardLayout 
      currentPath={location.pathname} 
      user={user}
    >
      <div className="container mx-auto px-4 pb-4">
        <div className="mb-6">
          <h1 className="text-3xl font-oswald font-bold text-electric mb-2">
            Community
          </h1>
          <p className="text-gray-300">
            Connect, share, and grow with the uSabi community
          </p>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="feed" className="text-xs">
              <MessageSquare className="w-4 h-4 mr-1" />
              Feed
            </TabsTrigger>
            <TabsTrigger value="users" className="text-xs">
              <Users className="w-4 h-4 mr-1" />
              People
            </TabsTrigger>
            <TabsTrigger value="groups" className="text-xs">
              <Group className="w-4 h-4 mr-1" />
              Groups
            </TabsTrigger>
            <TabsTrigger value="trending" className="text-xs">
              <TrendingUp className="w-4 h-4 mr-1" />
              Trending
            </TabsTrigger>
            <TabsTrigger value="chat" className="text-xs">
              <MessageSquare className="w-4 h-4 mr-1" />
              Chat
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="feed" className="space-y-6">
            <CommunityFeed />
          </TabsContent>
          
          <TabsContent value="users" className="space-y-6">
            <UserDiscovery />
          </TabsContent>
          
          <TabsContent value="groups" className="space-y-6">
            <Groups />
          </TabsContent>
          
          <TabsContent value="trending" className="space-y-6">
            <TrendingNews />
          </TabsContent>
          
          <TabsContent value="chat" className="space-y-6">
            <CommunityChat />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Community;
