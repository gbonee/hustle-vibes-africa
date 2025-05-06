
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

interface HeaderProps {
  onSettingsClick?: () => void;
  userAvatar?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  onSettingsClick = () => {},
  userAvatar
}) => {
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchUserAvatar = async () => {
      try {
        setIsLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('avatar_url')
            .eq('id', user.id)
            .maybeSingle();
            
          if (profile?.avatar_url) {
            setAvatar(profile.avatar_url);
          } else if (userAvatar) {
            setAvatar(userAvatar);
          }
        } else if (userAvatar) {
          setAvatar(userAvatar);
        }
      } catch (error) {
        console.error('Error fetching user avatar:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserAvatar();
    
    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
        fetchUserAvatar();
      }
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, [userAvatar]);
  
  return (
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
          onClick={() => navigate('/profile')}
          variant="ghost" 
          className="rounded-full w-10 h-10 p-0"
        >
          {isLoading ? (
            <Skeleton className="h-10 w-10 rounded-full" />
          ) : (
            <Avatar>
              {avatar ? (
                <AvatarImage src={avatar} />
              ) : null}
              <AvatarFallback>US</AvatarFallback>
            </Avatar>
          )}
        </Button>
      </div>
    </header>
  );
};

export default Header;
