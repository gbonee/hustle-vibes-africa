
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from '@/components/layout/DashboardLayout';
import PreviewMode from '@/components/common/PreviewMode';
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from 'react-router-dom';

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

// UI translations for different languages
const uiTranslations = {
  pidgin: {
    yourProgress: 'Your Progress',
    yourCertificates: 'Your Certificates',
    yourPreferences: 'Your Preferences',
    loading: 'Loading profile data...',
  },
  yoruba: {
    yourProgress: 'Ìlosíwájú Rẹ',
    yourCertificates: 'Àwọn Ìwé-ẹ̀rí Rẹ',
    yourPreferences: 'Àwọn Àṣàyàn Rẹ',
    loading: 'Ń gbé dáta profaìlì...',
  },
  hausa: {
    yourProgress: 'Ci Gabanka',
    yourCertificates: 'Takardun Shaida',
    yourPreferences: 'Zaɓin Ka',
    loading: 'Ana loding bayanin profile...',
  },
  igbo: {
    yourProgress: 'Ịganagote Gị',
    yourCertificates: 'Akwụkwọ gị ndị e nyere gị',
    yourPreferences: 'Ihe ị na-ahọrọ',
    loading: 'Na-ebubata data profaịlụ...',
  }
};

const Profile = () => {
  const navigate = useNavigate();
  const { userPrefs } = useUserPreferences();
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({
    id: 'preview-user-id',
    name: 'Preview User',
    email: 'preview@example.com',
    avatar: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1',
    progress: {
      completed: 0,
      total: 0
    },
    points: 0,
    rank: 0,
    joined: 'May 2025'
  });
  
  const [certificates, setCertificates] = useState<any[]>([]);
  const [hasCompletedCourse, setHasCompletedCourse] = useState(false);
  
  // Get the current language for UI text
  const currentLanguage = userPrefs?.language || 'pidgin';
  const texts = uiTranslations[currentLanguage as keyof typeof uiTranslations] || uiTranslations.pidgin;

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const preview = urlParams.get('forcePreview') === 'true';
    setIsPreviewMode(preview);
    
    // Only fetch real user data if not in preview mode
    if (!preview) {
      const fetchUserData = async () => {
        setIsLoading(true);
        try {
          // Get the current authenticated user
          const { data: { user: authUser } } = await supabase.auth.getUser();
          
          if (!authUser) {
            navigate('/auth');
            return;
          }
          
          // Get the user profile if it exists
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', authUser.id)
            .maybeSingle();
          
          // Get course progress
          const { data: courseProgress } = await supabase
            .from('course_progress')
            .select('*')
            .eq('user_id', authUser.id)
            .maybeSingle();
          
          // Get leaderboard entry to get points and rank
          const { data: leaderboardEntry } = await supabase
            .from('leaderboard_entries')
            .select('*')
            .eq('user_id', authUser.id)
            .maybeSingle();
          
          // Format joined date
          const joinedDate = new Date(authUser.created_at);
          const month = joinedDate.toLocaleString('default', { month: 'long' });
          const year = joinedDate.getFullYear();
          
          // Determine if user has completed the course
          const progressPercentage = courseProgress?.progress_percentage || 0;
          const courseCompleted = progressPercentage === 100;
          setHasCompletedCourse(courseCompleted);
          
          // If course is completed, add a certificate
          if (courseCompleted) {
            setCertificates([{
              id: "cert001",
              title: "Digital Marketing Basics",
              date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
              image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb"
            }]);
          } else {
            setCertificates([]);
          }
          
          setUser({
            id: authUser.id,
            name: profile?.display_name || authUser.user_metadata?.full_name || authUser.email?.split('@')[0] || 'User',
            email: authUser.email || '',
            avatar: profile?.avatar_url || "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
            progress: {
              completed: courseProgress?.modules_completed || 0,
              total: courseProgress?.total_modules || 15
            },
            points: leaderboardEntry?.points || 0,
            rank: leaderboardEntry?.rank || 0,
            joined: `${month} ${year}`
          });
        } catch (error) {
          console.error('Error fetching user data:', error);
          toast({
            title: "Error",
            description: "Failed to load user data",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchUserData();
    } else {
      // For preview mode, set some sample data
      setIsLoading(false);
    }
  }, [navigate]);

  if (isLoading) {
    return (
      <DashboardLayout currentPath="/profile">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-pulse text-electric">{texts.loading}</div>
        </div>
      </DashboardLayout>
    );
  }

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
      <h2 className="text-xl font-bold mb-4">{texts.yourProgress}</h2>
      <Card className="bg-black mb-6">
        <CardContent className="p-6">
          <CourseProgress progress={user.progress} />
        </CardContent>
      </Card>
      
      {/* Certificates */}
      <h2 className="text-xl font-bold mb-4">{texts.yourCertificates}</h2>
      <CertificatesList certificates={certificates} />
      
      {/* Preferences */}
      <h2 className="text-xl font-bold mb-4">{texts.yourPreferences}</h2>
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
