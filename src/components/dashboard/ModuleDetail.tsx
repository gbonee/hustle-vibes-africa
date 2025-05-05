
import React, { useState, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, CircleCheck, CircleX, Upload } from "lucide-react";
import { Module } from './ModulesList';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface Quiz {
  question: string;
  options: string[];
  answer: number;
}

interface ModuleDetailProps {
  module: Module;
  quizzes: Quiz[];
  onClose: () => void;
}

const ModuleDetail: React.FC<ModuleDetailProps> = ({ module, quizzes, onClose }) => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizResult, setQuizResult] = useState<'correct' | 'incorrect' | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleStartQuiz = () => {
    setShowQuiz(true);
    setCurrentQuizIndex(0);
    setQuizResult(null);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (answerIndex === quizzes[currentQuizIndex].answer) {
      setQuizResult('correct');
    } else {
      setQuizResult('incorrect');
    }
    
    setTimeout(() => {
      if (currentQuizIndex < quizzes.length - 1) {
        setCurrentQuizIndex(prevIndex => prevIndex + 1);
      } else {
        // End of quiz
        setShowQuiz(false);
        // Update progress (in a real app)
      }
      setQuizResult(null);
    }, 2000);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('video/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload a video file.",
        variant: "destructive"
      });
      return;
    }

    // Check file size (limit to 100MB)
    if (file.size > 100 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Video must be less than 100MB.",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsUploading(true);
      
      // In a real app, upload to Supabase storage
      // For demo, we'll create a local URL
      const videoObjectUrl = URL.createObjectURL(file);
      setVideoUrl(videoObjectUrl);
      
      toast({
        title: "Video uploaded successfully",
        description: "Your practice video has been uploaded.",
        variant: "default"
      });
    } catch (error) {
      console.error("Error uploading video:", error);
      toast({
        title: "Upload failed",
        description: "There was a problem uploading your video. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="bg-muted border-electric">
      <CardHeader>
        <CardTitle>{module.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {module.hasVideo ? (
          <div className="aspect-video bg-black rounded-lg flex items-center justify-center border border-gray-800">
            {/* In a real app this would be a video player */}
            <div className="text-center">
              <Video className="h-12 w-12 mx-auto mb-4 text-electric" />
              <p className="text-gray-400">Video would play here</p>
            </div>
          </div>
        ) : (
          <div className="aspect-video bg-black rounded-lg flex items-center justify-center border border-gray-800">
            <div className="text-center p-6">
              <h3 className="text-xl font-bold mb-4">Module Content</h3>
              <p className="text-gray-400">This module contains reading materials and exercises.</p>
            </div>
          </div>
        )}
        
        {showQuiz ? (
          <div className="bg-black p-6 rounded-lg border border-gray-800">
            <h3 className="text-xl font-bold mb-4">Quick Quiz</h3>
            <p className="text-gray-400 mb-4">Question {currentQuizIndex + 1} of {quizzes.length}</p>
            
            <div className="mb-6">
              <h4 className="text-lg mb-4">{quizzes[currentQuizIndex].question}</h4>
              <div className="space-y-2">
                {quizzes[currentQuizIndex].options.map((option, index) => (
                  <Button 
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    variant="outline"
                    className="w-full justify-start text-left h-auto py-3 px-4"
                    disabled={quizResult !== null}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </div>
            
            {quizResult && (
              <div className={`p-4 rounded-lg mb-4 flex items-center gap-2 ${
                quizResult === 'correct' 
                  ? 'bg-green-900/30 border border-green-500/30' 
                  : 'bg-red-900/30 border border-red-500/30'
              }`}>
                {quizResult === 'correct' ? (
                  <>
                    <CircleCheck className="text-green-400 h-5 w-5" />
                    <p>You sabi die! You go make money pass Dangote o!</p>
                  </>
                ) : (
                  <>
                    <CircleX className="text-red-400 h-5 w-5" />
                    <p>Ah, who dash you brain today? Oya try again jare!</p>
                  </>
                )}
              </div>
            )}
          </div>
        ) : (
          <Button 
            onClick={handleStartQuiz} 
            className="w-full py-6 bg-electric text-black hover:bg-electric/90"
          >
            Take Quiz
          </Button>
        )}
        
        <div>
          <h3 className="text-lg font-bold mb-2">Mini-Challenge</h3>
          <div className="bg-black p-4 rounded-lg border border-gray-800">
            <p>Post your practice video and tag @UsabiAI to win 500MB data!</p>
            
            {videoUrl ? (
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Your video:</h4>
                <video 
                  className="w-full rounded-md border border-gray-700" 
                  controls
                  src={videoUrl}
                  style={{ maxHeight: '200px' }}
                />
              </div>
            ) : null}
            
            <div className="mt-4">
              <input
                type="file"
                accept="video/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              
              <Button 
                onClick={handleUploadClick}
                variant="outline"
                disabled={isUploading}
                className="w-full flex items-center justify-center gap-2"
              >
                <Upload size={16} />
                {isUploading ? "Uploading..." : "Upload Video"}
              </Button>
            </div>
          </div>
        </div>
        
        <Button 
          onClick={onClose}
          variant="ghost"
          className="w-full"
        >
          Back to All Modules
        </Button>
      </CardContent>
    </Card>
  );
};

export default ModuleDetail;
