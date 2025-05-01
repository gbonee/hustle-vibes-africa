import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Settings, Video, Trophy, Award, CircleUser, Languages, LogIn, Pencil
} from "lucide-react";

interface UserPreferences {
  language: string;
  avatar: string;
  course: string;
}

interface Certificate {
  id: string;
  title: string;
  date: string;
  image: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const [userPrefs, setUserPrefs] = useState<UserPreferences | null>(null);
  
  // Load user preferences from localStorage
  useEffect(() => {
    const savedPrefs = localStorage.getItem('userPreferences');
    if (savedPrefs) {
      setUserPrefs(JSON.parse(savedPrefs));
    }
  }, []);

  // Mock user data
  const user = {
    name: "Emeka Johnson",
    email: "emeka@example.com",
    avatar: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
    progress: {
      completed: 7,
      total: 15
    },
    points: 845,
    rank: 2,
    joined: "April 2025"
  };

  // Mock certificates
  const certificates: Certificate[] = [
    {
      id: "cert001",
      title: "Digital Marketing Basics",
      date: "April 15, 2025",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb"
    }
  ];

  // Language name mapping
  const languageNames = {
    'pidgin': 'Pidgin English',
    'yoruba': 'Yoruba',
    'hausa': 'Hausa', 
    'igbo': 'Igbo'
  };

  // Avatar name mapping
  const avatarNames = {
    'digital-mama': 'Digital Mama',
    'baker-amara': 'Baker Amara',
    'uncle-musa': 'Uncle Musa'
  };

  return (
    <div className="min-h-screen bg-black pb-20">
      {/* Top Navigation Bar */}
      <header className="bg-black/90 backdrop-blur-sm border-b border-electric/30 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center py-3 px-4">
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/20591bbc-87c9-4bbc-8159-3e4becbee8c8.png" 
              alt="uSabi AI Owl Mascot" 
              className="h-8 w-auto" 
            />
            <span className="text-2xl font-oswald font-bold text-electric ml-2">
              uSabi <span className="text-white">AI</span>
            </span>
          </div>
          <Button 
            onClick={() => {}}
            variant="ghost"
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-6">
        {/* Profile Header */}
        <Card className="border-electric bg-muted mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
              <div className="relative">
                <Avatar className="w-24 h-24 border-2 border-electric">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <Button 
                  size="icon" 
                  className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-electric text-black"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex-1">
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <p className="text-gray-400">{user.email}</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-3">
                  <div className="bg-black px-3 py-1 rounded-full text-sm">
                    <Trophy className="inline-block w-4 h-4 mr-1 text-electric" />
                    Rank #{user.rank}
                  </div>
                  <div className="bg-black px-3 py-1 rounded-full text-sm">
                    <Award className="inline-block w-4 h-4 mr-1 text-electric" />
                    {user.points} Points
                  </div>
                  <div className="bg-black px-3 py-1 rounded-full text-sm">
                    <LogIn className="inline-block w-4 h-4 mr-1" />
                    Joined {user.joined}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Course Progress */}
        <h2 className="text-xl font-bold mb-4">Your Progress</h2>
        <Card className="bg-black mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold">Course Completion</h3>
                <p className="text-gray-400 text-sm">Keep going, you're doing great!</p>
              </div>
              <div className="text-right">
                <span className="text-xl font-bold">{Math.round((user.progress.completed / user.progress.total) * 100)}%</span>
                <p className="text-gray-400 text-sm">{user.progress.completed}/{user.progress.total} modules</p>
              </div>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2.5 mb-4">
              <div 
                className="bg-electric h-2.5 rounded-full" 
                style={{ width: `${(user.progress.completed / user.progress.total) * 100}%` }}
              ></div>
            </div>
            <Button 
              className="w-full mt-2"
              onClick={() => navigate('/dashboard')}
            >
              Continue Learning
            </Button>
          </CardContent>
        </Card>
        
        {/* Certificates */}
        <h2 className="text-xl font-bold mb-4">Your Certificates</h2>
        {certificates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {certificates.map((cert) => (
              <Card key={cert.id} className="bg-black">
                <div className="h-32 overflow-hidden">
                  <img 
                    src={cert.image} 
                    alt={cert.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold">{cert.title}</h3>
                  <p className="text-sm text-gray-400">Issued on {cert.date}</p>
                  <div className="flex justify-between mt-4">
                    <Button variant="outline" size="sm">View</Button>
                    <Button variant="outline" size="sm">Download</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="bg-black mb-6">
            <CardContent className="p-6 text-center">
              <Award className="mx-auto h-10 w-10 text-gray-500 mb-2" />
              <h3 className="font-bold">No Certificates Yet</h3>
              <p className="text-gray-400 text-sm mb-4">Complete a course to earn your first certificate</p>
              <Button 
                className="mx-auto"
                onClick={() => navigate('/dashboard')}
              >
                Go to Courses
              </Button>
            </CardContent>
          </Card>
        )}
        
        {/* Preferences */}
        <h2 className="text-xl font-bold mb-4">Your Preferences</h2>
        <Card className="bg-black mb-6">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="display-name">Display Name</Label>
                <Input 
                  id="display-name"
                  defaultValue={user.name}
                  className="mt-1 bg-muted border-gray-700"
                />
              </div>
              
              <div>
                <Label htmlFor="language">Language Preference</Label>
                <div className="flex gap-2 mt-1">
                  <div className="flex-1 bg-muted border border-gray-700 rounded-md p-3">
                    {userPrefs?.language ? languageNames[userPrefs.language as keyof typeof languageNames] : 'Not set'}
                  </div>
                  <Button 
                    variant="outline"
                    size="icon"
                    onClick={() => navigate('/onboarding')}
                  >
                    <Languages className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div>
                <Label htmlFor="ai-coach">AI Coach</Label>
                <div className="flex gap-2 mt-1">
                  <div className="flex-1 bg-muted border border-gray-700 rounded-md p-3">
                    {userPrefs?.avatar ? avatarNames[userPrefs.avatar as keyof typeof avatarNames] : 'Not set'}
                  </div>
                  <Button 
                    variant="outline"
                    size="icon"
                    onClick={() => navigate('/onboarding')}
                  >
                    <CircleUser className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <Button className="w-full mt-2 rebel-button">
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Account Actions */}
        <Card className="bg-black mb-6">
          <CardHeader className="py-4 px-6">
            <CardTitle className="text-lg">Account Actions</CardTitle>
          </CardHeader>
          <CardContent className="px-6 py-2 space-y-2">
            <Button variant="ghost" className="w-full justify-start text-gray-400">
              Change Email
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-400">
              Change Password
            </Button>
            <Button variant="ghost" className="w-full justify-start text-red-500">
              Log Out
            </Button>
          </CardContent>
        </Card>
      </main>
      
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-sm border-t border-electric/30 py-2">
        <div className="container mx-auto grid grid-cols-3">
          <Button 
            variant="ghost"
            className="flex flex-col items-center justify-center h-16"
            onClick={() => navigate('/dashboard')}
          >
            <Video className="h-5 w-5 mb-1" />
            <span className="text-xs">Learn</span>
          </Button>
          
          <Button 
            variant="ghost"
            className="flex flex-col items-center justify-center h-16"
            onClick={() => navigate('/leaderboard')}
          >
            <Trophy className="h-5 w-5 mb-1" />
            <span className="text-xs">Leaderboard</span>
          </Button>
          
          <Button 
            variant="ghost"
            className="flex flex-col items-center justify-center h-16"
            onClick={() => navigate('/profile')}
          >
            <Avatar className="h-8 w-8 mb-1">
              <AvatarImage src="https://images.unsplash.com/photo-1535268647677-300dbf3d78d1" />
              <AvatarFallback>US</AvatarFallback>
            </Avatar>
            <span className="text-xs text-electric">Profile</span>
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default Profile;
