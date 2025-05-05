import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Upload } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { useChallengeSubmission } from '@/hooks/useChallengeSubmission';

interface WeeklyChallengeProps {
  challengeId: string;
  challengeStatus: {
    hasSubmitted: boolean;
    isApproved: boolean;
  };
  isAdmin: boolean;
  onFetchSubmissions: () => void;
}

const WeeklyChallenge: React.FC<WeeklyChallengeProps> = ({ 
  challengeId, 
  challengeStatus, 
  isAdmin, 
  onFetchSubmissions 
}) => {
  const { toast } = useToast();
  const [uploadOpen, setUploadOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { submitChallengeFile } = useChallengeSubmission();
  
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
      const success = await submitChallengeFile(challengeId, selectedFile);
      
      if (success) {
        toast({
          title: "Submission successful!",
          description: "Your pitch has been submitted for review. You'll earn points once it's approved.",
          variant: "default",
        });
        
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
  
  return (
    <>
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
              onClick={onFetchSubmissions}
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
    </>
  );
};

export default WeeklyChallenge;
