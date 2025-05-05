
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Facebook, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

const SocialLoginButtons: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin + '/dashboard'
        }
      });
      
      if (error) {
        toast({
          title: "Login failed",
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "An error occurred",
        description: "Please try again later.",
        variant: "destructive",
      });
      console.error('Error during Google login:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'facebook',
        options: {
          redirectTo: window.location.origin + '/dashboard'
        }
      });
      
      if (error) {
        toast({
          title: "Login failed",
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "An error occurred",
        description: "Please try again later.",
        variant: "destructive",
      });
      console.error('Error during Facebook login:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="relative w-full">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-600"></span>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-muted px-2 text-gray-400">Or continue with</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 w-full">
        <Button 
          type="button" 
          variant="outline" 
          onClick={handleGoogleLogin}
          className="bg-black border-gray-700 hover:bg-gray-900"
          disabled={loading}
        >
          <Mail className="mr-2 h-5 w-5" />
          Google
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          onClick={handleFacebookLogin}
          className="bg-black border-gray-700 hover:bg-gray-900"
          disabled={loading}
        >
          <Facebook className="mr-2 h-5 w-5" />
          Facebook
        </Button>
      </div>
    </>
  );
};

export default SocialLoginButtons;
