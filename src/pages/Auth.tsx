
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import PreviewMode from '@/components/common/PreviewMode';

// Import our components
import LoginForm from '@/components/auth/LoginForm';
import SignupForm from '@/components/auth/SignupForm';
import SocialLoginButtons from '@/components/auth/SocialLoginButtons';
import AuthSkeleton from '@/components/auth/AuthSkeleton';
import BrandLogo from '@/components/auth/BrandLogo';

const Auth = () => {
  const navigate = useNavigate();
  const [checkingSession, setCheckingSession] = useState(true);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  
  // Check if we're in preview mode
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const forcePreview = urlParams.get('forcePreview') === 'true';
    setIsPreviewMode(forcePreview);
    
    console.log("Auth: Preview mode =", forcePreview);
    
    // Skip session check in preview mode
    if (forcePreview) {
      setCheckingSession(false);
      return;
    }
    
    // Check if user is already logged in (skip in preview mode)
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          // User is already logged in, redirect to dashboard
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setCheckingSession(false);
      }
    };
    
    checkSession();
  }, [navigate]);
  
  if (checkingSession && !isPreviewMode) {
    return <AuthSkeleton />;
  }

  return (
    <div className="min-h-screen bg-black flex flex-col justify-center items-center p-4">
      {isPreviewMode && <PreviewMode />}
      
      <div className="w-full max-w-md">
        <BrandLogo />

        <Card className="border-electric bg-muted">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid grid-cols-2 w-full bg-black">
              <TabsTrigger value="login" className="text-lg">Login</TabsTrigger>
              <TabsTrigger value="signup" className="text-lg">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Welcome Back!</CardTitle>
                <CardDescription className="text-center">Login to continue your hustle</CardDescription>
              </CardHeader>
              <CardContent>
                <LoginForm />
              </CardContent>
            </TabsContent>
            
            <TabsContent value="signup">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Join the Hustle!</CardTitle>
                <CardDescription className="text-center">Create your account to get started</CardDescription>
              </CardHeader>
              <CardContent>
                <SignupForm />
              </CardContent>
            </TabsContent>
            
            <CardFooter className="flex flex-col space-y-4 pt-4">
              <SocialLoginButtons />
            </CardFooter>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
