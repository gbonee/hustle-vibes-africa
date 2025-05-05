import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Trophy, Star, Upload, File } from "lucide-react";
import DashboardLayout from '@/components/layout/DashboardLayout';
import { getLeaderboard, getUserLeaderboardEntry, addPointsForModuleCompletion } from '@/utils/progressTracker';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface LeaderboardUser {
  id: number | string;
  name: string;
  avatar: string;
  course: string;
  progress: number;
  score: number;
  completedChallenges: number;
  rank: number;
  badge?: string;
}

interface ChallengeSubmission {
  id: string;
  user_id: string;
  challenge_id: string;
  submission_url: string;
  submission_type: string;
  submitted_at: string;
  is_approved: boolean;
  user_name: string;
  avatar_url: string;
}

const Leaderboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [currentUser, setCurrentUser] = useState<LeaderboardUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { getChallengeStatus, submitChallengeFile } = useUserPreferences();
  const [challengeStatus, setChallengeStatus] = useState({ hasSubmitted: false, isApproved: false });
  const [isAdmin, setIsAdmin] = useState(false);
  const [showSubmissions, setShowSubmissions] = useState(false);
  const [submissions, setSubmissions] = useState<ChallengeSubmission[]>([]);
  const WEEKLY_CHALLENGE_ID = 'weekly-challenge-1';
  
  const [user, setUser] = useState({
    id: '',
    name: 'User',
    email: '',
    avatar: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1'
  });
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: { user: authUser } } = await supabase.auth.getUser();
        
        if (authUser) {
          // Get the user's profile if it exists
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', authUser.id)
            .maybeSingle();
          
          setUser({
            id: authUser.id,
            name: profile?.display_name || authUser.user_metadata?.full_name || authUser.email?.split('@')[0] || 'User',
            email: authUser.email || '',
            avatar: profile?.avatar_url || "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1"
          });
          
          // Check if user is admin
          const isUserAdmin = authUser.email === 'admin@example.com' || authUser.user_metadata?.is_admin === true;
          setIsAdmin(isUserAdmin);
          
          // Check challenge status
          const status = await getChallengeStatus(WEEKLY_CHALLENGE_ID);
          setChallengeStatus(status);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    
    fetchUserData();
  }, [getChallengeStatus]);
  
  useEffect(() => {
    const fetchLeaderboardData = async () => {
      setIsLoading(true);
      try {
        // Fetch top users
        const leaderboardData = await getLeaderboard(10);
        
        // Add badges to top users
        const usersWithBadges = leaderboardData.map(user => {
          let badge;
          if (user.rank === 1) badge = "🏆 Top Hustler";
          else if (user.rank === 2) badge = "🔥 Rising Star";
          
          // Add default course info if missing
          return {
            ...user,
            badge,
            course: user.course || getRandomCourse(),
            progress: user.progress || Math.floor(Math.random() * 30) + 70, // Random progress between 70-100%
          };
        });
        
        setUsers(usersWithBadges);
        
        // Fetch current user's data
        const userEntry = await getUserLeaderboardEntry();
        if (userEntry) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userEntry.user_id)
            .maybeSingle();
            
          setCurrentUser({
            id: userEntry.user_id,
            name: profile?.display_name || 'You',
            avatar: profile?.avatar_url || '',
            course: getRandomCourse(),
            progress: 75, // Default progress
            score: userEntry.points,
            completedChallenges: userEntry.completed_challenges,
            rank: userEntry.rank || 0
          });
        }
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchLeaderboardData();
  }, []);
  
  // Helper function to get a random course for users without course data
  const getRandomCourse = () => {
    const courses = ['Digital Marketing', 'Import & Sell', 'Pastry Biz'];
    return courses[Math.floor(Math.random() * courses.length)];
  };
  
  const handleUploadClick = () => {
    if (challengeStatus.hasSubmitted && !challengeStatus.isApproved) {
      toast({
        title: "Submission pending review",
        description: "Your submission is currently being reviewed by our team.",
        variant: "default",
      });
      return;
    }
    
    if (challengeStatus.isApproved) {
      toast({
        title: "Challenge completed",
        description: "You've already completed this challenge and earned points!",
        variant: "default",
      });
      return;
    }
    
    setUploadOpen(true);
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };
  
  const handleFileUpload = async () => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload.",
        variant: "destructive",
      });
      return;
    }
    
    // Check file size (max 50MB)
    if (selectedFile.size > 50 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Maximum file size is 50MB.",
        variant: "destructive",
      });
      return;
    }
    
    setIsUploading(true);
    
    try {
      const success = await submitChallengeFile(WEEKLY_CHALLENGE_ID, selectedFile);
      
      if (success) {
        toast({
          title: "Submission successful!",
          description: "Your pitch has been submitted for review. You'll earn points once it's approved.",
          variant: "default",
        });
        
        setChallengeStatus({ ...challengeStatus, hasSubmitted: true });
        setUploadOpen(false);
        setSelectedFile(null);
      } else {
        toast({
          title: "Upload failed",
          description: "There was an error uploading your file. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading your file. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };
  
  const fetchSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from('challenge_submissions' as any)
        .select(`
          id,
          user_id,
          challenge_id,
          submission_url,
          submission_type,
          submitted_at,
          is_approved,
          profiles(display_name, avatar_url)
        `)
        .eq('challenge_id', WEEKLY_CHALLENGE_ID)
        .order('submitted_at', { ascending: false });
      
      if (error) throw error;
      
      if (data) {
        const formattedSubmissions = data.map((submission: any) => ({
          id: submission.id,
          user_id: submission.user_id,
          challenge_id: submission.challenge_id,
          submission_url: submission.submission_url,
          submission_type: submission.submission_type,
          submitted_at: submission.submitted_at,
          is_approved: submission.is_approved,
          user_name: submission.profiles?.display_name || 'Unknown User',
          avatar_url: submission.profiles?.avatar_url || ''
        }));
        
        setSubmissions(formattedSubmissions);
        setShowSubmissions(true);
      }
    } catch (error) {
      console.error('Error fetching submissions:', error);
      toast({
        title: "Error",
        description: "Failed to fetch challenge submissions.",
        variant: "destructive",
      });
    }
  };
  
  const approveSubmission = async (submissionId: string, userId: string) => {
    try {
      // First update the submission to approved
      const { error: updateError } = await supabase
        .from('challenge_submissions' as any)
        .update({ is_approved: true })
        .eq('id', submissionId);
      
      if (updateError) throw updateError;
      
      // Then award points to the user
      await addPointsForModuleCompletion(1000, userId);
      
      toast({
        title: "Submission approved",
        description: "The user has been awarded 1000 points for their submission.",
        variant: "default",
      });
      
      // Refresh the submissions list
      await fetchSubmissions();
      
    } catch (error) {
      console.error('Error approving submission:', error);
      toast({
        title: "Error",
        description: "Failed to approve submission.",
        variant: "destructive",
      });
    }
  };
  
  const formatFileType = (type: string) => {
    if (type.includes('video')) return 'Video';
    if (type.includes('image')) return 'Image';
    if (type.includes('pdf')) return 'PDF';
    if (type.includes('word') || type.includes('document')) return 'Document';
    return 'File';
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };
  
  if (isLoading) {
    return (
      <DashboardLayout currentPath="/leaderboard" user={user}>
        <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>
        <div className="space-y-4">
          <Card className="bg-muted border border-gray-700 animate-pulse">
            <CardContent className="h-40"></CardContent>
          </Card>
          <Card className="bg-muted border border-gray-700 animate-pulse">
            <CardContent className="h-20"></CardContent>
          </Card>
          <Card className="bg-muted border border-gray-700 animate-pulse">
            <CardContent className="h-60"></CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout currentPath="/leaderboard" user={user}>
      <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>
      
      {/* Top 3 Section */}
      <div className="grid grid-cols-3 gap-2 mb-8">
        {users.slice(0, 3).map((user) => (
          <Card key={user.id} className={`bg-muted border ${user.rank === 1 ? 'border-2 border-electric' : 'border-gray-700'}`}>
            <CardContent className="p-4 flex flex-col items-center">
              <div className="relative mt-2 mb-2">
                <Avatar className={`w-16 h-16 border-2 ${user.rank === 1 ? 'border-electric' : user.rank === 2 ? 'border-gray-300' : 'border-amber-700'}`}>
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className={`absolute -bottom-2 -right-2 rounded-full w-8 h-8 flex items-center justify-center text-black ${
                  user.rank === 1 ? 'bg-electric' : user.rank === 2 ? 'bg-gray-300' : 'bg-amber-700'
                }`}>
                  {user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : '🥉'}
                </div>
              </div>
              <h3 className="font-bold text-center mt-2 truncate max-w-full">{user.name}</h3>
              <p className="text-xs text-gray-400 text-center">{user.course}</p>
              <p className="font-bold text-center mt-1">{user.score} pts</p>
              {user.badge && (
                <span className="text-xs bg-electric/20 text-electric px-2 py-1 rounded-full mt-1">
                  {user.badge}
                </span>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Current User Card */}
      {currentUser && (
        <Card className="bg-black border border-electric mb-6">
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="mr-4 w-8 flex justify-center">
                <span className="font-bold">{currentUser.rank}</span>
              </div>
              <Avatar className="w-10 h-10 mr-3">
                <AvatarImage src={currentUser.avatar} />
                <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold">{currentUser.name} <span className="text-electric">(You)</span></h3>
                  <span className="font-bold">{currentUser.score} pts</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <Progress value={currentUser.progress} className="h-1.5 flex-1" />
                  <span className="text-xs text-gray-400">{currentUser.progress}%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Full Leaderboard */}
      <Card className="bg-muted border border-gray-800">
        <CardHeader className="py-4 px-6">
          <CardTitle>Weekly Rankings</CardTitle>
        </CardHeader>
        <CardContent className="px-2 py-0">
          <div className="space-y-1">
            {users.map((user) => (
              <div 
                key={user.id} 
                className={`flex items-center p-3 rounded-md ${
                  user.id === currentUser?.id ? 'bg-black border border-electric/30' : ''
                }`}
              >
                <div className="mr-4 w-8 flex justify-center">
                  <span className={`font-bold ${user.rank <= 3 ? 'text-electric' : ''}`}>{user.rank}</span>
                </div>
                <Avatar className="w-10 h-10 mr-3">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-bold">
                      {user.name}
                      {user.id === currentUser?.id && <span className="text-electric ml-1">(You)</span>}
                    </h3>
                    <span className="font-bold">{user.score} pts</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <div className="text-xs text-gray-400">{user.course}</div>
                    <div className="flex items-center text-xs text-gray-400">
                      <Trophy className="w-3 h-3 mr-1" />
                      <span>{user.completedChallenges} challenges</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Weekly Challenge */}
      <Card className="bg-black border border-electric mt-6">
        <CardContent className="p-5">
          <h3 className="text-lg font-bold mb-2 flex items-center">
            <Star className="w-5 h-5 mr-2 text-electric" />
            Weekly Challenge
          </h3>
          <p className="mb-4">Record a 30-second pitch for your business idea and upload it to earn 1000 bonus points!</p>
          
          {isAdmin ? (
            <Button 
              className="w-full rebel-button mb-2"
              onClick={fetchSubmissions}
            >
              View Submissions
            </Button>
          ) : (
            <Button 
              className="w-full rebel-button"
              onClick={handleUploadClick}
              disabled={challengeStatus.isApproved}
            >
              {challengeStatus.hasSubmitted && !challengeStatus.isApproved 
                ? "Submission Under Review" 
                : challengeStatus.isApproved 
                  ? "Challenge Completed" 
                  : "Upload Your Pitch"}
            </Button>
          )}
          
          {challengeStatus.hasSubmitted && !challengeStatus.isApproved && (
            <p className="text-xs text-center mt-2 text-gray-400">
              Your submission is being reviewed. Points will be awarded once approved.
            </p>
          )}
          
          {challengeStatus.isApproved && (
            <p className="text-xs text-center mt-2 text-electric">
              Challenge completed! You've earned 1000 points.
            </p>
          )}
        </CardContent>
      </Card>
      
      {/* File Upload Dialog */}
      <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upload Your Pitch</DialogTitle>
            <DialogDescription>
              Submit a video or document showcasing your 30-second business pitch.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid w-full gap-2">
              <label htmlFor="pitch-file" className="cursor-pointer border-2 border-dashed border-gray-600 rounded-md p-6 flex flex-col items-center justify-center">
                <Upload className="h-10 w-10 mb-2 text-gray-500" />
                <span className="text-sm font-medium">
                  {selectedFile ? selectedFile.name : "Click to select file"}
                </span>
                <span className="text-xs text-gray-500 mt-1">
                  {selectedFile 
                    ? `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB` 
                    : "Video, PDF, or Document up to 50MB"}
                </span>
                <input 
                  id="pitch-file" 
                  type="file" 
                  className="hidden" 
                  accept="video/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/*"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>
          <DialogFooter>
            <Button 
              type="button" 
              onClick={() => setUploadOpen(false)} 
              variant="outline"
              disabled={isUploading}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              onClick={handleFileUpload}
              disabled={!selectedFile || isUploading}
              className="rebel-button"
            >
              {isUploading ? "Uploading..." : "Submit"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Admin Submissions Dialog */}
      <Dialog open={showSubmissions} onOpenChange={setShowSubmissions}>
        <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Challenge Submissions</DialogTitle>
            <DialogDescription>
              Review and approve submissions to award points to users.
            </DialogDescription>
          </DialogHeader>
          
          {submissions.length === 0 ? (
            <p className="text-center py-6 text-gray-500">No submissions yet</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions.map((submission) => (
                  <TableRow key={submission.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <Avatar className="w-8 h-8 mr-2">
                          <AvatarImage src={submission.avatar_url} />
                          <AvatarFallback>{submission.user_name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {submission.user_name}
                      </div>
                    </TableCell>
                    <TableCell>{formatFileType(submission.submission_type)}</TableCell>
                    <TableCell>{formatDate(submission.submitted_at)}</TableCell>
                    <TableCell>
                      {submission.is_approved ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Approved
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Pending
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => window.open(submission.submission_url, '_blank')}
                        >
                          <File className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        
                        {!submission.is_approved && (
                          <Button 
                            size="sm" 
                            className="rebel-button" 
                            onClick={() => approveSubmission(submission.id, submission.user_id)}
                          >
                            Approve
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          
          <DialogFooter>
            <Button onClick={() => setShowSubmissions(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Leaderboard;
