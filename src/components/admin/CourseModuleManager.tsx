import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Video } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import VideoUploader from '@/components/admin/video-uploader/VideoUploader';

interface Course {
  id: string;
  title: string;
  modules: Module[];
}

interface Module {
  id: number;
  title: string;
  hasVideo: boolean;
  videoUrl?: string;
}

const courses = {
  'digital-marketing': {
    id: 'digital-marketing',
    title: 'Digital Marketing the Naija Way',
    modules: [
      { id: 1, title: 'Intro to Digital Marketing the Naija Way', hasVideo: false },
      { id: 2, title: 'How to Sell on WhatsApp & Instagram', hasVideo: true },
      { id: 3, title: 'Create Content That Converts (Even With Just Your Phone)', hasVideo: true },
      { id: 4, title: 'How to Run Small Ads on Meta', hasVideo: false },
      { id: 5, title: 'How to Keep Customers & Sell Weekly', hasVideo: true }
    ]
  },
  'pastry-biz': {
    id: 'pastry-biz',
    title: 'Start a Pastry Biz From Your Kitchen',
    modules: [
      { id: 1, title: 'Intro to Baking as a Business in Nigeria', hasVideo: false },
      { id: 2, title: 'How to Make Puff-Puff That Sells', hasVideo: true },
      { id: 3, title: 'How to Make Nigerian Meatpie', hasVideo: false },
      { id: 4, title: 'Branding & Packaging for Pastry Biz', hasVideo: true },
      { id: 5, title: 'How to Find Your First Customers & Start Selling', hasVideo: true }
    ]
  },
  'importation': {
    id: 'importation',
    title: 'Import From China & Sell on WhatsApp',
    modules: [
      { id: 1, title: 'How to Find Hot-Selling Products Nigerians Want', hasVideo: false },
      { id: 2, title: 'Where to Buy Cheap: 1688, Alibaba & Hidden Supplier Hacks', hasVideo: true },
      { id: 3, title: 'Shipping & Delivery: How to Import Without Wahala', hasVideo: false },
      { id: 4, title: 'How to Market & Sell FAST on WhatsApp & Instagram', hasVideo: true },
      { id: 5, title: 'Pricing, Profit & Customer Service Tips to Keep Sales Coming', hasVideo: false }
    ]
  }
};

const CourseModuleManager = () => {
  const [selectedCourse, setSelectedCourse] = useState<string>('digital-marketing');
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [videoUrls, setVideoUrls] = useState<Record<string, Record<number, string>>>({});
  const { toast } = useToast();

  useEffect(() => {
    const fetchVideoUrls = async () => {
      try {
        // In a real app, fetch from Supabase storage
        const { data, error } = await supabase
          .storage
          .from('module-videos')
          .list(`${selectedCourse}`);
          
        if (error) throw error;
        
        // Process data to map module IDs to video URLs
        const urls: Record<number, string> = {};
        data?.forEach(file => {
          const moduleId = parseInt(file.name.split('-')[0]);
          if (!isNaN(moduleId)) {
            urls[moduleId] = `${selectedCourse}/${file.name}`;
          }
        });
        
        setVideoUrls(prev => ({
          ...prev,
          [selectedCourse]: urls
        }));
      } catch (error) {
        console.error('Error fetching video URLs:', error);
      }
    };
    
    fetchVideoUrls();
  }, [selectedCourse]);

  const handleSelectModule = (module: Module) => {
    setSelectedModule(module);
  };

  const handleVideoUploaded = (moduleId: number, url: string) => {
    setVideoUrls(prev => ({
      ...prev,
      [selectedCourse]: {
        ...(prev[selectedCourse] || {}),
        [moduleId]: url
      }
    }));
    
    toast({
      title: "Video uploaded successfully",
      description: "The module video has been updated.",
      variant: "default"
    });
    
    setSelectedModule(null);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-black">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4">Course & Module Management</h2>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="course-select">Select Course</Label>
              <Select 
                value={selectedCourse} 
                onValueChange={setSelectedCourse}
              >
                <SelectTrigger id="course-select" className="w-full">
                  <SelectValue placeholder="Select a course" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(courses).map(([id, course]) => (
                    <SelectItem key={id} value={id}>{course.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {selectedCourse && (
              <div className="space-y-4 mt-4">
                <h3 className="text-lg font-bold">Modules</h3>
                {courses[selectedCourse as keyof typeof courses].modules.map(module => (
                  <Card 
                    key={module.id} 
                    className={`bg-muted cursor-pointer transition-all hover:border-electric`}
                    onClick={() => handleSelectModule(module)}
                  >
                    <CardContent className="p-4 flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{module.title}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          {module.hasVideo && (
                            <span className="text-xs bg-black px-2 py-0.5 rounded-full">
                              <Video className="inline-block w-3 h-3 mr-1" />
                              Has Video
                            </span>
                          )}
                        </div>
                      </div>
                      <div>
                        {videoUrls[selectedCourse]?.[module.id] ? (
                          <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
                            Video Uploaded
                          </span>
                        ) : (
                          <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full">
                            No Video
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {selectedModule && (
        <Card className="bg-muted border-electric">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Upload Video for: {selectedModule.title}</h2>
            <VideoUploader 
              courseId={selectedCourse}
              moduleId={selectedModule.id}
              onVideoUploaded={handleVideoUploaded}
              existingVideoUrl={videoUrls[selectedCourse]?.[selectedModule.id]}
            />
            <Button 
              variant="ghost" 
              className="mt-4 w-full"
              onClick={() => setSelectedModule(null)}
            >
              Cancel
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CourseModuleManager;
