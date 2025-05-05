
import React from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { File } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { addPointsForModuleCompletion } from '@/utils/progressTracker';
import { supabase } from '@/integrations/supabase/client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

interface SubmissionsListProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  submissions: ChallengeSubmission[];
  onApprove: (submissionId: string, userId: string) => Promise<void>;
}

const SubmissionsList: React.FC<SubmissionsListProps> = ({ 
  open, 
  onOpenChange, 
  submissions, 
  onApprove 
}) => {
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
                          onClick={() => onApprove(submission.id, submission.user_id)}
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
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SubmissionsList;
