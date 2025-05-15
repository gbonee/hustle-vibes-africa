
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Video, Languages, CheckCircle2, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import VideoUploader from '@/components/admin/video-uploader/VideoUploader';
import LanguageSelector, { Language } from '@/components/onboarding/LanguageSelector';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { courses } from '@/data/courseData';

interface Module {
  id: number;
  title: string;
  hasVideo: boolean;
  videoUrl?: string;
}

interface VideosByLanguage {
  [language: string]: string;
}

const CourseModuleManager = () => {
  const [selectedCourse, setSelectedCourse] = useState<string>('digital-marketing');
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('pidgin');
  const [videoUrls, setVideoUrls] = useState<Record<string, Record<number, Record<string, string>>>>({});
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [allFiles, setAllFiles] = useState<any[]>([]);

  useEffect(() => {
    fetchVideoUrls();
  }, [selectedCourse]);

  const fetchVideoUrls = async () => {
    try {
      setIsLoading(true);
      
      // First get all files, not just in the course directory, to check structure
      const { data: allFilesData, error: allFilesError } = await supabase
        .storage
        .from('module-videos')
        .list();
        
      if (allFilesError) throw allFilesError;
      setAllFiles(allFilesData || []);
      
      console.log("All files in storage:", allFilesData);
      
      // Now get course-specific files
      const { data, error } = await supabase
        .storage
        .from('module-videos')
        .list(selectedCourse);
        
      if (error) {
        console.log(`Error listing files in ${selectedCourse} folder:`, error);
        
        // Fallback: check if any files directly contain the course name
        const courseFiles = allFilesData?.filter(file => 
          file.name.includes(selectedCourse) || 
          // For importation course, also check if files start with 20x 
          (selectedCourse === 'importation' && /^20\d-/.test(file.name))
        );
        
        console.log(`Fallback - found ${courseFiles?.length} files that might belong to ${selectedCourse}`);
        
        // Process these files as if they were in the course directory
        const urls: Record<number, Record<string, string>> = {};
        
        courseFiles?.forEach(file => {
          const parts = file.name.split('-');
          if (parts.length >= 2) {
            const moduleId = parseInt(parts[0]);
            const language = parts[1];
            
            if (!isNaN(moduleId) && ['pidgin', 'yoruba', 'hausa', 'igbo', 'english'].includes(language)) {
              if (!urls[moduleId]) {
                urls[moduleId] = {};
              }
              urls[moduleId][language] = file.name; // Store without course prefix
            }
          }
        });
        
        setVideoUrls(prev => ({
          ...prev,
          [selectedCourse]: urls
        }));
        
        setIsLoading(false);
        return;
      }
      
      console.log(`Found ${data.length} files in the ${selectedCourse} folder`);
      
      // Process data to map module IDs and languages to video URLs
      const urls: Record<number, Record<string, string>> = {};
      
      data?.forEach(file => {
        // Expected format: moduleId-language-filename.mp4
        // Example: 1-pidgin-intro.mp4
        const parts = file.name.split('-');
        if (parts.length >= 2) {
          const moduleId = parseInt(parts[0]);
          const language = parts[1];
          
          if (!isNaN(moduleId) && ['pidgin', 'yoruba', 'hausa', 'igbo', 'english'].includes(language)) {
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

      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching video URLs:', error);
      toast({
        title: "Error loading videos",
        description: "There was a problem loading the video information. Please try again.",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  const handleSelectModule = (module: Module) => {
    setSelectedModule(module);
  };

  const handleVideoUploaded = (moduleId: number, url: string) => {
    // Force refresh video URLs after upload
    fetchVideoUrls();
    
    toast({
      title: "Video uploaded successfully",
      description: `The ${selectedLanguage} video for this module has been updated.`,
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

  const getLanguageLabels = (moduleId: number) => {
    const languages = videoUrls[selectedCourse]?.[moduleId]
      ? Object.keys(videoUrls[selectedCourse][moduleId])
      : [];
    
    const languageMap: Record<string, string> = {
      'pidgin': '🇳🇬 Pidgin',
      'yoruba': '🧙‍♂️ Yoruba',
      'hausa': '🌵 Hausa',
      'igbo': '🌟 Igbo',
      'english': '🇬🇧 English'
    };
    
    return languages.map(lang => languageMap[lang] || lang);
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
            
            {allFiles.length > 0 && (
              <div className="p-4 bg-yellow-900/20 rounded-md border border-yellow-500/30 mt-2">
                <h3 className="flex items-center gap-2 font-medium text-yellow-500">
                  <AlertCircle size={16} />
                  Debug Information
                </h3>
                <p className="text-xs mt-2">Total files in storage: {allFiles.length}</p>
                <div className="text-xs mt-1">
                  File examples: {allFiles.slice(0, 3).map(f => f.name).join(', ')} 
                  {allFiles.length > 3 ? '...' : ''}
                </div>
              </div>
            )}
            
            {selectedCourse && (
              <div className="space-y-4 mt-4">
                <h3 className="text-lg font-bold">Modules</h3>
                {isLoading ? (
                  <div className="text-center py-4">Loading modules...</div>
                ) : (
                  courses[selectedCourse].modules.map(module => (
                    <Card 
                      key={module.id} 
                      className={`bg-muted cursor-pointer transition-all hover:border-electric ${
                        selectedModule?.id === module.id ? 'border-electric' : ''
                      }`}
                      onClick={() => handleSelectModule(module)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">
                              ID: {module.id} - {module.title}
                            </h4>
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
                        </div>
                        
                        {/* Languages with videos indicator */}
                        {getVideoCountForModule(module.id) > 0 && (
                          <div className="mt-3 flex flex-wrap gap-1">
                            {hasVideoForLanguage(module.id, 'pidgin') && (
                              <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full">🇳🇬 Pidgin</span>
                            )}
                            {hasVideoForLanguage(module.id, 'yoruba') && (
                              <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full">🧙‍♂️ Yoruba</span>
                            )}
                            {hasVideoForLanguage(module.id, 'hausa') && (
                              <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full">🌵 Hausa</span>
                            )}
                            {hasVideoForLanguage(module.id, 'igbo') && (
                              <span className="text-xs bg-green-600/20 text-green-500 px-2 py-0.5 rounded-full">🌟 Igbo</span>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {selectedModule && (
        <Card className="bg-muted border-electric">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Upload Video for: {selectedModule.title}</h2>
            <p className="text-sm mb-4 px-3 py-2 bg-black/50 rounded-md">
              Module ID: <strong>{selectedModule.id}</strong> - 
              Use the format: <code className="text-electric">{selectedModule.id}-language-filename.ext</code>
            </p>

            <Tabs value={selectedLanguage} onValueChange={(value) => setSelectedLanguage(value as Language)}>
              <TabsList className="mb-4 bg-black">
                <TabsTrigger value="pidgin" className="flex items-center gap-1">
                  Pidgin 🇳🇬
                  {hasVideoForLanguage(selectedModule.id, 'pidgin') && (
                    <CheckCircle2 className="w-3 h-3 text-green-500 ml-1" />
                  )}
                </TabsTrigger>
                <TabsTrigger value="yoruba" className="flex items-center gap-1">
                  Yoruba 🧙‍♂️
                  {hasVideoForLanguage(selectedModule.id, 'yoruba') && (
                    <CheckCircle2 className="w-3 h-3 text-green-500 ml-1" />
                  )}
                </TabsTrigger>
                <TabsTrigger value="hausa" className="flex items-center gap-1">
                  Hausa 🌵
                  {hasVideoForLanguage(selectedModule.id, 'hausa') && (
                    <CheckCircle2 className="w-3 h-3 text-green-500 ml-1" />
                  )}
                </TabsTrigger>
                <TabsTrigger value="igbo" className="flex items-center gap-1">
                  Igbo 🌟
                  {hasVideoForLanguage(selectedModule.id, 'igbo') && (
                    <CheckCircle2 className="w-3 h-3 text-green-500 ml-1" />
                  )}
                </TabsTrigger>
              </TabsList>

              {(['pidgin', 'yoruba', 'hausa', 'igbo'] as Language[]).map((lang) => (
                <TabsContent key={lang} value={lang} className="mt-0">
                  <div className="p-4 bg-black/40 rounded-md mb-4">
                    <p className="text-sm mb-2">Uploading <strong>{lang}</strong> language video for:</p>
                    <p className="font-bold">{selectedModule.title}</p>
                    <p className="mt-2 text-xs text-electric">File naming format: <code>{selectedModule.id}-{lang}-filename.mp4</code></p>
                  </div>
                  
                  <VideoUploader 
                    courseId={selectedCourse}
                    moduleId={selectedModule.id}
                    onVideoUploaded={(moduleId, url) => handleVideoUploaded(moduleId, url)}
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
