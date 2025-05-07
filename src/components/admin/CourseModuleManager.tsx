
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Video, Languages } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import VideoUploader from '@/components/admin/video-uploader/VideoUploader';
import LanguageSelector, { Language } from '@/components/onboarding/LanguageSelector';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

interface VideosByLanguage {
  [language: string]: string;
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
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('pidgin');
  const [videoUrls, setVideoUrls] = useState<Record<string, Record<number, Record<string, string>>>>({});
  const { toast } = useToast();

  useEffect(() => {
    fetchVideoUrls();
  }, [selectedCourse]);

  const fetchVideoUrls = async () => {
    try {
      // Fetch from Supabase storage
      const { data, error } = await supabase
        .storage
        .from('module-videos')
        .list(`${selectedCourse}`);
        
      if (error) throw error;
      
      // Process data to map module IDs and languages to video URLs
      const urls: Record<number, Record<string, string>> = {};
      
      data?.forEach(file => {
        // Expected format: moduleId-language-filename.mp4
        // Example: 1-pidgin-intro.mp4
        const parts = file.name.split('-');
        if (parts.length >= 2) {
          const moduleId = parseInt(parts[0]);
          const language = parts[1];
          
          if (!isNaN(moduleId) && ['pidgin', 'yoruba', 'hausa', 'igbo'].includes(language)) {
            if (!urls[moduleId]) {
              urls[moduleId] = {};
            }
            urls[moduleId][language] = `${selectedCourse}/${file.name}`;
          }
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

  const handleSelectModule = (module: Module) => {
    setSelectedModule(module);
  };

  const handleVideoUploaded = (moduleId: number, language: Language, url: string) => {
    setVideoUrls(prev => ({
      ...prev,
      [selectedCourse]: {
        ...(prev[selectedCourse] || {}),
        [moduleId]: {
          ...(prev[selectedCourse]?.[moduleId] || {}),
          [language]: url
        }
      }
    }));
    
    toast({
      title: "Video uploaded successfully",
      description: `The ${language} video for this module has been updated.`,
      variant: "default"
    });
  };

  const hasVideoForLanguage = (moduleId: number, language: Language): boolean => {
    return Boolean(videoUrls[selectedCourse]?.[moduleId]?.[language]);
  };

  const getVideoCountForModule = (moduleId: number): number => {
    const langCount = videoUrls[selectedCourse]?.[moduleId]
      ? Object.keys(videoUrls[selectedCourse][moduleId]).length
      : 0;
    return langCount;
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
                      <div className="flex items-center gap-2">
                        {getVideoCountForModule(module.id) > 0 && (
                          <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full flex items-center">
                            <Languages className="w-3 h-3 mr-1" /> 
                            {getVideoCountForModule(module.id)} language{getVideoCountForModule(module.id) !== 1 ? 's' : ''}
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
            <div className="mb-4">
              <Label className="mb-2 block">Select Language</Label>
              <LanguageSelector 
                selectedLanguage={selectedLanguage}
                onSelectLanguage={setSelectedLanguage}
                mode="inline"
              />
            </div>

            <Tabs value={selectedLanguage} onValueChange={(value) => setSelectedLanguage(value as Language)}>
              <TabsList className="mb-4 bg-black">
                <TabsTrigger value="pidgin">Pidgin 🇳🇬</TabsTrigger>
                <TabsTrigger value="yoruba">Yoruba 🧙‍♂️</TabsTrigger>
                <TabsTrigger value="hausa">Hausa 🌵</TabsTrigger>
                <TabsTrigger value="igbo">Igbo 🌟</TabsTrigger>
              </TabsList>

              {(['pidgin', 'yoruba', 'hausa', 'igbo'] as Language[]).map((lang) => (
                <TabsContent key={lang} value={lang} className="mt-0">
                  <div className="p-4 bg-black/40 rounded-md mb-4">
                    <p className="text-sm mb-2">Uploading <strong>{lang}</strong> language video for:</p>
                    <p className="font-bold">{selectedModule.title}</p>
                  </div>
                  
                  <VideoUploader 
                    courseId={selectedCourse}
                    moduleId={selectedModule.id}
                    onVideoUploaded={(moduleId, url) => handleVideoUploaded(moduleId, lang, url)}
                    existingVideoUrl={videoUrls[selectedCourse]?.[selectedModule.id]?.[lang]}
                    language={lang}
                  />
                </TabsContent>
              ))}
            </Tabs>

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
