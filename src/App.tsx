
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import Index from "./pages/Index";
import Manifesto from "./pages/Manifesto";
import Enterprise from "./pages/Enterprise";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import CHFIAuth from "./pages/CHFIAuth";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import Community from "./pages/Community";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import { Skeleton } from "@/components/ui/skeleton";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);

  // Check if we're in preview mode from URL
  const forcePreview = new URLSearchParams(window.location.search).get('forcePreview') === 'true';

  useEffect(() => {
    // Skip auth checks if in preview mode
    if (forcePreview) {
      setLoading(false);
      return;
    }

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log('Auth state changed:', event);
        setSession(currentSession);
        
        if (event === 'SIGNED_IN' && currentSession) {
          // Check if this is the user's first time logging in
          const hasCompletedOnboarding = localStorage.getItem(`onboarding_completed_${currentSession.user.id}`);
          setIsNewUser(!hasCompletedOnboarding);
        }
        
        setLoading(false);
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      console.log('Current session:', currentSession ? 'exists' : 'none');
      setSession(currentSession);
      
      if (currentSession) {
        // Check if this is the user's first time logging in
        const hasCompletedOnboarding = localStorage.getItem(`onboarding_completed_${currentSession.user.id}`);
        setIsNewUser(!hasCompletedOnboarding);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [forcePreview]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <div className="space-y-4 w-full max-w-md px-4">
          <Skeleton className="h-12 w-40 mx-auto" />
          <Skeleton className="h-[400px] w-full" />
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/manifesto" element={<Manifesto />} />
            <Route path="/enterprise" element={<Enterprise />} />
            
            {/* Auth routes */}
            <Route 
              path="/auth" 
              element={
                forcePreview ? <Auth /> : (
                  session ? (
                    isNewUser ? <Navigate to="/onboarding" /> : <Navigate to="/dashboard" />
                  ) : <Auth />
                )
              } 
            />
            
            {/* CHFI Auth Route - new dedicated authentication page */}
            <Route 
              path="/chfi-auth" 
              element={
                forcePreview ? <CHFIAuth /> : (
                  session ? (
                    isNewUser ? <Navigate to="/onboarding" /> : <Navigate to="/dashboard" />
                  ) : <CHFIAuth />
                )
              } 
            />
            
            {/* Onboarding route */}
            <Route 
              path="/onboarding" 
              element={
                forcePreview ? <Onboarding /> : (
                  session ? (
                    <Onboarding onComplete={() => {
                      if (session) {
                        localStorage.setItem(`onboarding_completed_${session.user.id}`, 'true');
                        setIsNewUser(false);
                      }
                    }} />
                  ) : <Navigate to="/auth" />
                )
              }
            />
            
            {/* Protected routes */}
            <Route 
              path="/dashboard" 
              element={
                forcePreview ? <Dashboard /> : (
                  session ? (
                    isNewUser ? <Navigate to="/onboarding" /> : <Dashboard />
                  ) : <Navigate to="/auth" />
                )
              }
            />
            <Route 
              path="/community" 
              element={
                forcePreview ? <Community /> : (
                  session ? (
                    isNewUser ? <Navigate to="/onboarding" /> : <Community />
                  ) : <Navigate to="/auth" />
                )
              }
            />
            <Route 
              path="/leaderboard" 
              element={
                forcePreview ? <Leaderboard /> : (
                  session ? (
                    isNewUser ? <Navigate to="/onboarding" /> : <Leaderboard />
                  ) : <Navigate to="/auth" />
                )
              }
            />
            <Route 
              path="/profile" 
              element={
                forcePreview ? <Profile /> : (
                  session ? (
                    isNewUser ? <Navigate to="/onboarding" /> : <Profile />
                  ) : <Navigate to="/auth" />
                )
              }
            />
            
            {/* Admin route */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
