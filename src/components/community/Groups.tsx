
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Search, Users, Plus, MessageSquare, TrendingUp, Lock, Globe } from "lucide-react";

interface Group {
  id: string;
  name: string;
  description: string;
  avatar: string;
  memberCount: number;
  category: string;
  isPrivate: boolean;
  recentActivity: string;
  trending: boolean;
  joined: boolean;
}

const Groups = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newGroup, setNewGroup] = useState({
    name: '',
    description: '',
    category: '',
    isPrivate: false
  });

  const [groups, setGroups] = useState<Group[]>([
    {
      id: '1',
      name: 'Digital Marketing Hustlers',
      description: 'Share tips, strategies, and wins in digital marketing. From social media to email campaigns!',
      avatar: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
      memberCount: 1247,
      category: 'Digital Marketing',
      isPrivate: false,
      recentActivity: '2 minutes ago',
      trending: true,
      joined: true
    },
    {
      id: '2',
      name: 'Pastry Business Network',
      description: 'Connect with fellow pastry entrepreneurs. Share recipes, business tips, and success stories.',
      avatar: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587',
      memberCount: 856,
      category: 'Pastry Business',
      isPrivate: false,
      recentActivity: '15 minutes ago',
      trending: false,
      joined: false
    },
    {
      id: '3',
      name: 'Import/Export Masters',
      description: 'Everything about importation business. From finding suppliers to clearing customs.',
      avatar: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d',
      memberCount: 634,
      category: 'Importation',
      isPrivate: false,
      recentActivity: '1 hour ago',
      trending: true,
      joined: true
    },
    {
      id: '4',
      name: 'Lagos Entrepreneurs',
      description: 'Local business network for Lagos-based entrepreneurs. Meet, collaborate, and grow together.',
      avatar: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df',
      memberCount: 342,
      category: 'Location-based',
      isPrivate: true,
      recentActivity: '3 hours ago',
      trending: false,
      joined: false
    },
    {
      id: '5',
      name: 'Women in Business NG',
      description: 'Empowering Nigerian women entrepreneurs. Share experiences, mentorship, and support.',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2',
      memberCount: 892,
      category: 'Community',
      isPrivate: false,
      recentActivity: '4 hours ago',
      trending: true,
      joined: false
    },
    {
      id: '6',
      name: 'Young Entrepreneurs Forum',
      description: 'For entrepreneurs under 30. Share your journey, challenges, and celebrate wins together.',
      avatar: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f',
      memberCount: 567,
      category: 'Community',
      isPrivate: false,
      recentActivity: '6 hours ago',
      trending: false,
      joined: true
    }
  ]);

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleJoinGroup = (groupId: string) => {
    setGroups(groups.map(group => 
      group.id === groupId 
        ? { ...group, joined: !group.joined, memberCount: group.joined ? group.memberCount - 1 : group.memberCount + 1 }
        : group
    ));
  };

  const handleCreateGroup = () => {
    if (newGroup.name && newGroup.description) {
      const group: Group = {
        id: Date.now().toString(),
        name: newGroup.name,
        description: newGroup.description,
        avatar: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f',
        memberCount: 1,
        category: newGroup.category || 'General',
        isPrivate: newGroup.isPrivate,
        recentActivity: 'now',
        trending: false,
        joined: true
      };
      setGroups([group, ...groups]);
      setNewGroup({ name: '', description: '', category: '', isPrivate: false });
      setShowCreateDialog(false);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Digital Marketing':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Pastry Business':
        return 'bg-pink-500/20 text-pink-400 border-pink-500/30';
      case 'Importation':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Community':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'Location-based':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Create Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Groups</h2>
          <p className="text-gray-400">Connect with like-minded entrepreneurs</p>
        </div>
        
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button className="rebel-button">
              <Plus className="w-4 h-4 mr-2" />
              Create Group
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border-gray-700 text-white">
            <DialogHeader>
              <DialogTitle>Create New Group</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="groupName">Group Name</Label>
                <Input
                  id="groupName"
                  value={newGroup.name}
                  onChange={(e) => setNewGroup({...newGroup, name: e.target.value})}
                  placeholder="Enter group name"
                  className="bg-gray-800 border-gray-600"
                />
              </div>
              <div>
                <Label htmlFor="groupDescription">Description</Label>
                <Textarea
                  id="groupDescription"
                  value={newGroup.description}
                  onChange={(e) => setNewGroup({...newGroup, description: e.target.value})}
                  placeholder="Describe your group..."
                  className="bg-gray-800 border-gray-600"
                />
              </div>
              <div>
                <Label htmlFor="groupCategory">Category</Label>
                <Input
                  id="groupCategory"
                  value={newGroup.category}
                  onChange={(e) => setNewGroup({...newGroup, category: e.target.value})}
                  placeholder="e.g., Digital Marketing, Community"
                  className="bg-gray-800 border-gray-600"
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isPrivate"
                  checked={newGroup.isPrivate}
                  onChange={(e) => setNewGroup({...newGroup, isPrivate: e.target.checked})}
                  className="rounded"
                />
                <Label htmlFor="isPrivate">Make this group private</Label>
              </div>
              <Button onClick={handleCreateGroup} className="w-full rebel-button">
                Create Group
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          placeholder="Search groups..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-gray-800 border-gray-600 text-white"
        />
      </div>

      {/* Your Groups */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Your Groups</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {groups.filter(group => group.joined).map((group) => (
            <Card key={group.id} className="bg-gray-900 border-gray-700 hover:border-electric/50 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={group.avatar} />
                    <AvatarFallback>{group.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-white">{group.name}</h3>
                      {group.trending && (
                        <Badge className="bg-electric/20 text-electric border-electric/30 text-xs">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          Hot
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge className={`${getCategoryColor(group.category)} border text-xs`}>
                        {group.category}
                      </Badge>
                      {group.isPrivate ? (
                        <Lock className="w-3 h-3 text-gray-400" />
                      ) : (
                        <Globe className="w-3 h-3 text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-gray-400 text-sm line-clamp-2">{group.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {group.memberCount}
                    </div>
                    <div className="flex items-center">
                      <MessageSquare className="w-4 h-4 mr-1" />
                      {group.recentActivity}
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="border-gray-600">
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Discover Groups */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Discover Groups</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredGroups.filter(group => !group.joined).map((group) => (
            <Card key={group.id} className="bg-gray-900 border-gray-700 hover:border-electric/50 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={group.avatar} />
                    <AvatarFallback>{group.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-white">{group.name}</h3>
                      {group.trending && (
                        <Badge className="bg-electric/20 text-electric border-electric/30 text-xs">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          Hot
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge className={`${getCategoryColor(group.category)} border text-xs`}>
                        {group.category}
                      </Badge>
                      {group.isPrivate ? (
                        <Lock className="w-3 h-3 text-gray-400" />
                      ) : (
                        <Globe className="w-3 h-3 text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-gray-400 text-sm line-clamp-2">{group.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {group.memberCount}
                    </div>
                    <div className="flex items-center">
                      <MessageSquare className="w-4 h-4 mr-1" />
                      {group.recentActivity}
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    onClick={() => handleJoinGroup(group.id)}
                    className="rebel-button"
                  >
                    {group.isPrivate ? 'Request' : 'Join'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Groups;
