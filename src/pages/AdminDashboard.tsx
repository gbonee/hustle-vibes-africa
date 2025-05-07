
import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CourseModuleManager from '@/components/admin/CourseModuleManager';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const AdminDashboard = () => {
  const { toast } = useToast();
  const [storageInitialized, setStorageInitialized] = useState(false);
  
  // Initialize storage bucket on component mount
  useEffect(() => {
    const initStorage = async () => {
      try {
        // Check if bucket exists
        const { data } = await supabase.storage.listBuckets();
        const bucketExists = data?.some(bucket => bucket.name === 'module-videos');
        
        if (!bucketExists) {
          // Create bucket if it doesn't exist
          // Using a reasonable file size limit (50MB)
          const { data, error } = await supabase.storage.createBucket('module-videos', {
            public: true, // Make it publicly accessible
            fileSizeLimit: 1024 * 1024 * 50, // 50 MB
          });
          
          if (error) {
            console.error("Error creating storage bucket:", error);
            toast({
              title: "Storage initialization failed",
              description: "There was an error setting up storage. Please try again later.",
              variant: "destructive"
            });
          } else {
            console.log("Storage bucket created successfully:", data);
            setStorageInitialized(true);
            toast({
              title: "Storage initialized",
              description: "Video storage is ready to use.",
              variant: "default"
            });
          }
        } else {
          setStorageInitialized(true);
          console.log("Storage bucket already exists");
        }
      } catch (error) {
        console.error("Error initializing storage:", error);
        toast({
          title: "Storage initialization failed",
          description: "Please make sure you are authenticated as an admin.",
          variant: "destructive"
        });
      }
    };
    
    initStorage();
  }, [toast]);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto py-8 px-4">
        <Card className="mb-6 border-electric">
          <CardHeader>
            <CardTitle className="text-2xl">Admin Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400 mb-4">Manage courses, modules, and multilingual videos</p>
            {!storageInitialized && (
              <p className="text-amber-400 text-sm">Initializing storage...</p>
            )}
          </CardContent>
        </Card>

        <Tabs defaultValue="courses" className="w-full">
          <TabsList className="grid grid-cols-2 mb-6 bg-black">
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>
          
          <TabsContent value="courses">
            {storageInitialized ? (
              <CourseModuleManager />
            ) : (
              <Card className="bg-black">
                <CardContent className="p-6 flex items-center justify-center">
                  <p className="text-amber-400">Setting up storage... Please wait.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="users">
            <Card className="bg-black">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">User Management</h2>
                <p className="text-gray-400">User management features will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
