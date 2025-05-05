
import { supabase } from "@/integrations/supabase/client";
import { useToast } from '@/hooks/use-toast';

// Define a type for the challenge status to avoid type errors
export interface ChallengeStatus {
  hasSubmitted: boolean;
  isApproved: boolean;
  submissionUrl?: string;
  submissionType?: string;
}

// Define a type for the challenge submission to avoid type errors
interface ChallengeSubmission {
  id: string;
  user_id: string;
  challenge_id: string;
  submission_url: string;
  submission_type: string;
  submitted_at: string | null;
  is_approved: boolean | null;
}

export const useChallengeSubmission = () => {
  const { toast } = useToast();
  
  const getChallengeStatus = async (challengeId: string): Promise<ChallengeStatus> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return { hasSubmitted: false, isApproved: false };
      
      // Use type assertion to handle the response
      const { data: submission, error } = await supabase
        .from('challenge_submissions' as any)
        .select('*')
        .eq('user_id', user.id)
        .eq('challenge_id', challengeId)
        .maybeSingle();
      
      if (error) {
        console.error("Error checking challenge status:", error);
        return { hasSubmitted: false, isApproved: false };
      }
      
      if (submission) {
        // Type assertion to safely handle the response
        const typedSubmission = submission as unknown as ChallengeSubmission;
        return {
          hasSubmitted: true,
          isApproved: typedSubmission.is_approved || false,
          submissionUrl: typedSubmission.submission_url,
          submissionType: typedSubmission.submission_type
        };
      }
      
      return { hasSubmitted: false, isApproved: false };
    } catch (error) {
      console.error("Error checking challenge status:", error);
      return { hasSubmitted: false, isApproved: false };
    }
  };
  
  const submitChallengeFile = async (challengeId: string, file: File): Promise<boolean> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return false;
      
      // First upload the file to storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `challenge_submissions/${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('challenges')
        .upload(filePath, file);
      
      if (uploadError) {
        console.error("Error uploading file:", uploadError);
        toast({
          title: "Upload failed",
          description: "There was an error uploading your file. Please try again.",
          variant: "destructive",
        });
        return false;
      }
      
      // Get the public URL
      const { data: publicURL } = supabase.storage
        .from('challenges')
        .getPublicUrl(filePath);
      
      if (!publicURL) {
        toast({
          title: "Upload failed",
          description: "Could not get public URL for the file.",
          variant: "destructive",
        });
        return false;
      }
      
      // Check if a submission already exists
      const { data: existingSubmission, error: queryError } = await supabase
        .from('challenge_submissions' as any)
        .select('*')
        .eq('user_id', user.id)
        .eq('challenge_id', challengeId)
        .maybeSingle();
        
      if (queryError) {
        console.error("Error checking existing submission:", queryError);
        toast({
          title: "Upload failed",
          description: "There was an error checking for existing submissions.",
          variant: "destructive",
        });
        return false;
      }
        
      if (existingSubmission) {
        // Type assertion to safely handle the submission
        const typedSubmission = existingSubmission as unknown as ChallengeSubmission;
        
        // Update existing submission
        const { error: updateError } = await supabase
          .from('challenge_submissions' as any)
          .update({
            submission_url: publicURL.publicUrl,
            submission_type: file.type,
            submitted_at: new Date().toISOString(),
            is_approved: false
          })
          .eq('id', typedSubmission.id);
          
        if (updateError) {
          console.error("Error updating submission:", updateError);
          toast({
            title: "Upload failed",
            description: "There was an error updating your submission.",
            variant: "destructive",
          });
          return false;
        }
      } else {
        // Create new submission
        const { error: insertError } = await supabase
          .from('challenge_submissions' as any)
          .insert({
            user_id: user.id,
            challenge_id: challengeId,
            submission_url: publicURL.publicUrl,
            submission_type: file.type,
            submitted_at: new Date().toISOString(),
            is_approved: false
          });
          
        if (insertError) {
          console.error("Error creating submission:", insertError);
          toast({
            title: "Upload failed",
            description: "There was an error creating your submission.",
            variant: "destructive",
          });
          return false;
        }
      }
      
      toast({
        title: "Submission successful",
        description: "Your file has been successfully submitted.",
        variant: "default",
      });
      
      return true;
    } catch (error) {
      console.error("Error submitting challenge:", error);
      toast({
        title: "Upload failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };
  
  return {
    getChallengeStatus,
    submitChallengeFile
  };
};
