
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import PreviewMode from '@/components/common/PreviewMode';

// Import our components
import CHFILoginForm from '@/components/auth/CHFILoginForm';
import CHFISignupForm from '@/components/auth/CHFISignupForm';
import CHFIBrandLogo from '@/components/auth/CHFIBrandLogo';
import CHFIProgramBanner from '@/components/auth/CHFIProgramBanner';
import AuthSkeleton from '@/components/auth/AuthSkeleton';

const CHFIAuth = () => {
  const navigate = useNavigate();
  const [checkingSession, setCheckingSession] = useState(true);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  
  // Check if we're in preview mode
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const preview = urlParams.get('forcePreview') === 'true';
    setIsPreviewMode(preview);
    
    // Skip session check if in preview mode
    if (preview) {
      setCheckingSession(false);
      return;
    }
    
    // Check if user is already logged in
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
    <div className="min-h-screen bg-black bg-[radial-gradient(circle_at_bottom_left,rgba(245,255,0,0.05),transparent_40%),radial-gradient(circle_at_top_right,rgba(57,255,20,0.05),transparent_30%)]">
      <div className="flex flex-col justify-center items-center p-4 min-h-screen">
        {isPreviewMode && <PreviewMode />}
        
        <div className="w-full max-w-md">
          <CHFIBrandLogo />
          
          <Card className="border border-electric/40 bg-black/60 shadow-lg shadow-electric/10">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl text-white">
                Welcome to the <span className="text-electric">CHFI x uSabi AI</span> Program
              </CardTitle>
              <CardDescription className="text-gray-300">
                Register to join 500 beneficiaries in this exclusive upskilling opportunity
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-0">
              <CHFIProgramBanner />
              
              <Tabs defaultValue="signup" className="w-full">
                <TabsList className="grid grid-cols-2 w-full bg-black/80 mb-4">
                  <TabsTrigger value="login" className="text-lg">Login</TabsTrigger>
                  <TabsTrigger value="signup" className="text-lg">Sign Up</TabsTrigger>
                </TabsList>
                
                <TabsContent value="login">
                  <CHFILoginForm />
                </TabsContent>
                
                <TabsContent value="signup">
                  <CHFISignupForm />
                </TabsContent>
              </Tabs>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4 pt-0">
              <p className="text-center text-sm text-gray-400 mt-4">
                This is a special initiative by Create Her Future Initiative in collaboration with uSabi AI
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CHFIAuth;
