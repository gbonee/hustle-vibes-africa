
import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Pencil, Trophy, Award, LogIn, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("upload");
  const [isAvatarLoading, setIsAvatarLoading] = useState(true);

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
  
  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(null);
      setPreviewUrl(null);
      return;
    }
    
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please select an image file (JPEG, PNG, etc.)",
        variant: "destructive",
      });
      setSelectedFile(null);
      setPreviewUrl(null);
    }
  };
  
  // Upload file to Supabase storage
  const uploadAvatar = async () => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select an image to upload",
        variant: "destructive",
      });
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
      
      // Create a unique file name
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${authUser.id}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `${fileName}`;
      
      // Upload to Supabase storage
      const { data, error } = await supabase.storage
        .from('avatars')
        .upload(filePath, selectedFile);
      
      if (error) {
        throw error;
      }
      
      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);
      
      // Update profile with new avatar URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', authUser.id);
      
      if (updateError) {
        throw updateError;
      }
      
      // Update local state
      setUser(prev => ({ ...prev, avatar: publicUrl }));
      setAvatarUrl(publicUrl);
      
      toast({
        title: "Success",
        description: "Your avatar has been updated.",
      });
      
      setIsAvatarDialogOpen(false);
      setSelectedFile(null);
      setPreviewUrl(null);
      
    } catch (error: any) {
      console.error('Error uploading avatar:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to upload avatar. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Update profile with external URL
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
          {isAvatarLoading && !user.avatar ? (
            <Skeleton className="w-24 h-24 rounded-full" />
          ) : (
            <Avatar className="w-24 h-24 border-2 border-electric">
              {user.avatar ? (
                <AvatarImage 
                  src={user.avatar}
                  onLoad={() => setIsAvatarLoading(false)}
                  onError={() => setIsAvatarLoading(false)}
                />
              ) : null}
              <AvatarFallback>{user.name?.split(' ').map(n => n[0]).join('') || 'US'}</AvatarFallback>
            </Avatar>
          )}
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
              Upload a new profile picture or provide an image URL.
            </DialogDescription>
          </DialogHeader>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upload">Upload Image</TabsTrigger>
              <TabsTrigger value="url">Image URL</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upload" className="space-y-4 py-4">
              <div className="grid gap-4">
                <Label htmlFor="avatar-file">Select an image to upload</Label>
                <Input
                  id="avatar-file"
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                />
                
                {previewUrl && (
                  <div className="flex justify-center mt-4">
                    <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-electric">
                      <img 
                        src={previewUrl} 
                        alt="Avatar preview" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAvatarDialogOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={uploadAvatar} 
                  disabled={isLoading || !selectedFile}
                >
                  {isLoading ? "Uploading..." : "Upload & Save"}
                </Button>
              </DialogFooter>
            </TabsContent>
            
            <TabsContent value="url" className="space-y-4 py-4">
              <div className="grid gap-4">
                <Label htmlFor="avatar-url">Enter a URL for your new avatar image</Label>
                <Input
                  id="avatar-url"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                />
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAvatarDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAvatarChange} disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </DialogFooter>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProfileHeader;
