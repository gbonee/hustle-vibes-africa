
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from '@/components/layout/DashboardLayout';
import CourseModuleManager from '@/components/admin/CourseModuleManager';

const AdminDashboard = () => {
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    avatar: '',
  });
  
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      
      if (!authUser) return;
      
      setUser({
        id: authUser.id,
        name: authUser.user_metadata?.full_name || authUser.email?.split('@')[0] || 'Admin',
        email: authUser.email || '',
        avatar: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
      });
      
      // In a real app, check if user has admin role
      // For demo purposes, all authenticated users can access admin panel
      setIsAdmin(true);
    };
    
    fetchUserData();
  }, []);

  if (!isAdmin) {
    return (
      <DashboardLayout currentPath="/admin" user={user}>
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <h1 className="text-2xl font-bold text-red-500">Access Denied</h1>
          <p className="text-gray-400 mt-2">You don't have permission to view this page.</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout currentPath="/admin" user={user}>
      <Card className="mb-6 border-electric">
        <CardHeader>
          <CardTitle className="text-2xl">Admin Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-400 mb-4">Manage courses, modules, and videos</p>
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
    </DashboardLayout>
  );
};

export default AdminDashboard;
