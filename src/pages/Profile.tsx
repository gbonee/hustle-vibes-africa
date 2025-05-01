
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { supabase } from "@/integrations/supabase/client";

// Import our components
import Header from '@/components/layout/Header';
import BottomNavigation from '@/components/layout/BottomNavigation';
import ProfileHeader from '@/components/profile/ProfileHeader';
import CourseProgress from '@/components/profile/CourseProgress';
import CertificatesList from '@/components/profile/CertificatesList';
import UserPreferences from '@/components/profile/UserPreferences';
import AccountActions from '@/components/profile/AccountActions';

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

const Profile = () => {
  const { userPrefs } = useUserPreferences();
  const [user, setUser] = useState({
    name: '',
    email: '',
    avatar: '',
    progress: {
      completed: 0,
      total: 15
    },
    points: 0,
    rank: 0,
    joined: ''
  });
  
  const [certificates, setCertificates] = useState([
    {
      id: "cert001",
      title: "Digital Marketing Basics",
      date: "April 15, 2025",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb"
    }
  ]);

  useEffect(() => {
    const fetchUserData = async () => {
      // Get the current authenticated user
      const { data: { user: authUser } } = await supabase.auth.getUser();
      
      if (!authUser) return;
      
      // In a real app, we would fetch user's certificates, points, rank, etc.
      // For now, we'll just use some mock data but with the real user's info
      
      setUser({
        name: authUser.user_metadata?.full_name || authUser.email?.split('@')[0] || 'User',
        email: authUser.email || '',
        avatar: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1", // For now, keep a default avatar
        progress: {
          completed: 7,
          total: 15
        },
        points: 845,
        rank: 2,
        joined: new Date(authUser.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
      });
    };
    
    fetchUserData();
  }, []);

  return (
    <div className="min-h-screen bg-black pb-20">
      {/* Top Navigation Bar */}
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        {/* Profile Header */}
        <Card className="border-electric bg-muted mb-6">
          <CardContent className="p-6">
            <ProfileHeader user={user} />
          </CardContent>
        </Card>
        
        {/* Course Progress */}
        <h2 className="text-xl font-bold mb-4">Your Progress</h2>
        <Card className="bg-black mb-6">
          <CardContent className="p-6">
            <CourseProgress progress={user.progress} />
          </CardContent>
        </Card>
        
        {/* Certificates */}
        <h2 className="text-xl font-bold mb-4">Your Certificates</h2>
        <CertificatesList certificates={certificates} />
        
        {/* Preferences */}
        <h2 className="text-xl font-bold mb-4">Your Preferences</h2>
        <Card className="bg-black mb-6">
          <CardContent className="p-6">
            <UserPreferences 
              userName={user.name}
              userPrefs={userPrefs}
              languageNames={languageNames}
              avatarNames={avatarNames}
            />
          </CardContent>
        </Card>
        
        {/* Account Actions */}
        <Card className="bg-black mb-6">
          <AccountActions />
        </Card>
      </main>
      
      {/* Bottom Navigation */}
      <BottomNavigation currentPath="/profile" />
    </div>
  );
};

export default Profile;
