
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from '@/components/layout/DashboardLayout';

// Import our components
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
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [user, setUser] = useState({
    id: 'preview-user-id',
    name: 'Preview User',
    email: 'preview@example.com',
    avatar: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1',
    progress: {
      completed: 7,
      total: 15
    },
    points: 845,
    rank: 2,
    joined: 'May 2025'
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
    const urlParams = new URLSearchParams(window.location.search);
    const preview = urlParams.get('forcePreview') === 'true';
    setIsPreviewMode(preview);
    
    // Only fetch real user data if not in preview mode
    if (!preview) {
      const fetchUserData = async () => {
        // Get the current authenticated user
        const { data: { user: authUser } } = await supabase.auth.getUser();
        
        if (!authUser) return;
        
        setUser({
          id: authUser.id,
          name: authUser.user_metadata?.full_name || authUser.email?.split('@')[0] || 'User',
          email: authUser.email || '',
          avatar: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
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
    }
  }, []);

  return (
    <DashboardLayout currentPath="/profile" user={user}>
      {isPreviewMode && <PreviewMode />}
      
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
    </DashboardLayout>
  );
};

export default Profile;
