
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, UserPlus, MessageSquare, MapPin, Trophy } from "lucide-react";

interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  location: string;
  course: string;
  progress: number;
  achievements: string[];
  isOnline: boolean;
  followers: number;
  following: number;
}

const UserDiscovery = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users] = useState<User[]>([
    {
      id: '1',
      name: 'Chioma Okafor',
      username: '@chioma_digital',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c',
      location: 'Lagos, Nigeria',
      course: 'Digital Marketing',
      progress: 85,
      achievements: ['First Sale', '10K Milestone', 'Viral Post'],
      isOnline: true,
      followers: 234,
      following: 189
    },
    {
      id: '2',
      name: 'Emeka Nnaji',
      username: '@emeka_imports',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      location: 'Abuja, Nigeria',
      course: 'Importation',
      progress: 72,
      achievements: ['First Import', 'Business License'],
      isOnline: false,
      followers: 156,
      following: 98
    },
    {
      id: '3',
      name: 'Fatima Abubakar',
      username: '@fatima_cakes',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
      location: 'Kano, Nigeria',
      course: 'Pastry Business',
      progress: 95,
      achievements: ['Master Baker', 'Business Mentor', '50K Milestone'],
      isOnline: true,
      followers: 567,
      following: 234
    },
    {
      id: '4',
      name: 'Tunde Williams',
      username: '@tunde_social',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
      location: 'Ibadan, Nigeria',
      course: 'Digital Marketing',
      progress: 60,
      achievements: ['First Campaign', 'Social Media Pro'],
      isOnline: true,
      followers: 89,
      following: 156
    }
  ]);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCourseColor = (course: string) => {
    switch (course) {
      case 'Digital Marketing':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Pastry Business':
        return 'bg-pink-500/20 text-pink-400 border-pink-500/30';
      case 'Importation':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          placeholder="Search for people, courses, or skills..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-gray-800 border-gray-600 text-white"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-gray-900 border-gray-700">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-electric">{users.length}</div>
            <div className="text-sm text-gray-400">Active Members</div>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-700">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-400">{users.filter(u => u.isOnline).length}</div>
            <div className="text-sm text-gray-400">Online Now</div>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-700">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400">3</div>
            <div className="text-sm text-gray-400">New Today</div>
          </CardContent>
        </Card>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="bg-gray-900 border-gray-700 hover:border-electric/50 transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    {user.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{user.name}</h3>
                    <p className="text-sm text-gray-400">{user.username}</p>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <MapPin className="w-3 h-3 mr-1" />
                      {user.location}
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Course Badge */}
              <Badge className={`${getCourseColor(user.course)} border`}>
                {user.course}
              </Badge>

              {/* Progress */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Progress</span>
                  <span className="text-white">{user.progress}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-electric h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${user.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Achievements */}
              {user.achievements.length > 0 && (
                <div>
                  <div className="flex items-center text-sm text-gray-400 mb-2">
                    <Trophy className="w-4 h-4 mr-1" />
                    Achievements
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {user.achievements.slice(0, 2).map((achievement, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-gray-600 text-gray-300">
                        {achievement}
                      </Badge>
                    ))}
                    {user.achievements.length > 2 && (
                      <Badge variant="outline" className="text-xs border-gray-600 text-gray-300">
                        +{user.achievements.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              {/* Stats */}
              <div className="flex justify-between text-sm text-gray-400">
                <span>{user.followers} followers</span>
                <span>{user.following} following</span>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <Button size="sm" className="flex-1 rebel-button">
                  <UserPlus className="w-4 h-4 mr-1" />
                  Follow
                </Button>
                <Button size="sm" variant="outline" className="border-gray-600">
                  <MessageSquare className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UserDiscovery;
