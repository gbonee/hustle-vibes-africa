
import React, { useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CourseModuleManager from '@/components/admin/CourseModuleManager';
import { supabase } from "@/integrations/supabase/client";

const AdminDashboard = () => {
  // Initialize storage bucket on component mount
  useEffect(() => {
    const initStorage = async () => {
      try {
        // Check if bucket exists
        const { data } = await supabase.storage.listBuckets();
        const bucketExists = data?.some(bucket => bucket.name === 'module-videos');
        
        if (!bucketExists) {
          // Create bucket if it doesn't exist
          await supabase.storage.createBucket('module-videos', {
            public: true, // Make it publicly accessible
            fileSizeLimit: 1024 * 1024 * 1000, // 1000 MB
          });
        }
      } catch (error) {
        console.error("Error initializing storage:", error);
      }
    };
    
    initStorage();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto py-8 px-4">
        <Card className="mb-6 border-electric">
          <CardHeader>
            <CardTitle className="text-2xl">Admin Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400 mb-4">Manage courses, modules, and multilingual videos</p>
          </CardContent>
        </Card>

        <Tabs defaultValue="courses" className="w-full">
          <TabsList className="grid grid-cols-2 mb-6 bg-black">
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>
          
          <TabsContent value="courses">
            <CourseModuleManager />
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
