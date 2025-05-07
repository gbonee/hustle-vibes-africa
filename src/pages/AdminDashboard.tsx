
import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CourseModuleManager from '@/components/admin/CourseModuleManager';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminDashboard = () => {
  const { toast } = useToast();
  const [storageInitialized, setStorageInitialized] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authStatus, setAuthStatus] = useState<'authenticated' | 'unauthenticated' | 'checking'>('checking');
  
  // Check authentication status first
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;
        
        setAuthStatus(data?.session ? 'authenticated' : 'unauthenticated');
      } catch (error) {
        console.error("Error checking authentication:", error);
        setAuthStatus('unauthenticated');
      }
    };
    
    checkAuthStatus();
  }, []);
  
  // Initialize storage bucket after checking auth
  useEffect(() => {
    if (authStatus !== 'authenticated') {
      setIsLoading(false);
      return;
    }
    
    const initStorage = async () => {
      setIsLoading(true);
      try {
        // Check if bucket exists
        const { data, error } = await supabase.storage.listBuckets();
        
        if (error) {
          throw error;
        }
        
        const bucketExists = data?.some(bucket => bucket.name === 'module-videos');
        
        if (!bucketExists) {
          // Inform user that we'll use existing bucket instead
          console.log("Storage bucket doesn't exist, we'll use existing storage.");
          setStorageInitialized(true);
          toast({
            title: "Storage ready",
            description: "We'll use the default storage for videos.",
            variant: "default"
          });
        } else {
          setStorageInitialized(true);
          console.log("Storage bucket already exists");
        }
      } catch (error: any) {
        console.error("Error initializing storage:", error);
        // Mark as initialized anyway to prevent blocking the UI
        setStorageInitialized(false);
        toast({
          title: "Storage initialization note",
          description: "Admin permissions may be required for storage management. Continuing in limited mode.",
          variant: "default"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    initStorage();
  }, [authStatus, toast]);

  const retryInitialization = () => {
    setStorageInitialized(null);
    setIsLoading(true);
    // This will trigger the useEffect to run again
    setAuthStatus('checking');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto py-8 px-4">
        <Card className="mb-6 border-electric">
          <CardHeader>
            <CardTitle className="text-2xl">Admin Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400 mb-4">Manage courses, modules, and multilingual videos</p>
            {isLoading && (
              <p className="text-amber-400 text-sm">Initializing resources...</p>
            )}
            {authStatus === 'unauthenticated' && (
              <div className="p-4 bg-amber-900/30 rounded-md border border-amber-700 flex gap-2 items-start">
                <AlertCircle className="h-5 w-5 text-amber-400 mt-0.5" />
                <div>
                  <p className="text-amber-400 font-medium">Authentication Required</p>
                  <p className="text-sm text-amber-300/70">Please sign in as an admin to access all features.</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Tabs defaultValue="courses" className="w-full">
          <TabsList className="grid grid-cols-2 mb-6 bg-black">
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>
          
          <TabsContent value="courses">
            {isLoading ? (
              <Card className="bg-black">
                <CardContent className="p-6 flex items-center justify-center">
                  <p className="text-amber-400">Setting up resources... Please wait.</p>
                </CardContent>
              </Card>
            ) : storageInitialized === false ? (
              <Card className="bg-black">
                <CardContent className="p-6">
                  <div className="mb-4 flex flex-col items-center">
                    <AlertCircle className="h-8 w-8 text-amber-400 mb-2" />
                    <p className="text-center text-amber-400 mb-2">Limited functionality available</p>
                    <p className="text-center text-gray-400 text-sm mb-4">
                      Some features may be limited due to storage access restrictions.
                    </p>
                    <Button onClick={retryInitialization} variant="outline" size="sm">
                      Retry
                    </Button>
                  </div>
                  <CourseModuleManager />
                </CardContent>
              </Card>
            ) : (
              <CourseModuleManager />
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
