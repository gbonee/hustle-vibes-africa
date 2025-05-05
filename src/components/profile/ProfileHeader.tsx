
import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Pencil, Trophy, Award, LogIn } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

interface ProfileHeaderProps {
  user?: {
    name?: string;
    email?: string;
    avatar?: string;
    points?: number;
    rank?: number;
    joined?: string;
  };
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user: propUser }) => {
  const [user, setUser] = useState({
    name: propUser?.name || '',
    email: propUser?.email || '',
    avatar: propUser?.avatar || '',
    points: propUser?.points || 0,
    rank: propUser?.rank || 0,
    joined: propUser?.joined || ''
  });
  
  const [isAvatarDialogOpen, setIsAvatarDialogOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(user.avatar);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (propUser) {
      setUser({
        name: propUser.name || user.name,
        email: propUser.email || user.email,
        avatar: propUser.avatar || user.avatar,
        points: propUser.points || user.points,
        rank: propUser.rank || user.rank,
        joined: propUser.joined || user.joined
      });
      setAvatarUrl(propUser.avatar || user.avatar);
    }
  }, [propUser]);
  
  const handleAvatarChange = async () => {
    if (!avatarUrl.trim() || avatarUrl === user.avatar) {
      setIsAvatarDialogOpen(false);
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Get current user
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (!authUser) {
        toast({
          title: "Error",
          description: "You must be logged in to update your avatar.",
          variant: "destructive",
        });
        return;
      }
      
      // Update the profile avatar_url
      const { error } = await supabase
        .from('profiles')
        .update({ avatar_url: avatarUrl.trim() })
        .eq('id', authUser.id);
      
      if (error) {
        throw error;
      }
      
      // Update local state
      setUser(prev => ({ ...prev, avatar: avatarUrl.trim() }));
      
      toast({
        title: "Success",
        description: "Your avatar has been updated.",
      });
      
      setIsAvatarDialogOpen(false);
    } catch (error: any) {
      console.error('Error updating avatar:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update avatar. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
        <div className="relative">
          <Avatar className="w-24 h-24 border-2 border-electric">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>{user.name?.split(' ').map(n => n[0]).join('') || 'U'}</AvatarFallback>
          </Avatar>
          <Button 
            size="icon" 
            className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-electric text-black"
            onClick={() => setIsAvatarDialogOpen(true)}
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
              Rank #{user.rank || '—'}
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
      
      {/* Avatar Dialog */}
      <Dialog open={isAvatarDialogOpen} onOpenChange={setIsAvatarDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Change Avatar</DialogTitle>
            <DialogDescription>
              Enter a URL for your new avatar image.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="avatar-url" className="text-right">
                Avatar URL
              </Label>
              <Input
                id="avatar-url"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAvatarDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAvatarChange} disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProfileHeader;
