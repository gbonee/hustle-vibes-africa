
import React from 'react';
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

const AccountActions: React.FC = () => {
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        toast({
          title: "Error",
          description: "Failed to log out. Please try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "You have been logged out.",
        });
        navigate('/auth');
      }
    } catch (error) {
      console.error('Error during logout:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <CardHeader className="py-4 px-6">
        <CardTitle className="text-lg">Account Actions</CardTitle>
      </CardHeader>
      <CardContent className="px-6 py-2 space-y-2">
        <Button variant="ghost" className="w-full justify-start text-gray-400">
          Change Email
        </Button>
        <Button variant="ghost" className="w-full justify-start text-gray-400">
          Change Password
        </Button>
        <Button 
          variant="ghost" 
          className="w-full justify-start text-red-500"
          onClick={handleLogout}
        >
          Log Out
        </Button>
      </CardContent>
    </>
  );
};

export default AccountActions;
