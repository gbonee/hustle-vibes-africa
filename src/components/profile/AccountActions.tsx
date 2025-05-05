
import React, { useState } from 'react';
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(6, "Password must be at least 6 characters"),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const AccountActions: React.FC = () => {
  const navigate = useNavigate();
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const emailForm = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });
  
  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  
  const handleLogout = async () => {
    try {
      setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleEmailUpdate = async (values: z.infer<typeof emailSchema>) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.updateUser({ email: values.email });
      
      if (error) {
        toast({
          title: "Error",
          description: error.message || "Failed to update email. Please try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Email update request sent. Please check your new email for verification.",
        });
        setIsEmailDialogOpen(false);
        emailForm.reset();
      }
    } catch (error: any) {
      console.error('Error updating email:', error);
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handlePasswordUpdate = async (values: z.infer<typeof passwordSchema>) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.updateUser({ password: values.newPassword });
      
      if (error) {
        toast({
          title: "Error",
          description: error.message || "Failed to update password. Please try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Your password has been updated.",
        });
        setIsPasswordDialogOpen(false);
        passwordForm.reset();
      }
    } catch (error: any) {
      console.error('Error updating password:', error);
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <CardHeader className="py-4 px-6">
        <CardTitle className="text-lg">Account Actions</CardTitle>
      </CardHeader>
      <CardContent className="px-6 py-2 space-y-2">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-gray-400 hover:text-white"
          onClick={() => setIsEmailDialogOpen(true)}
        >
          Change Email
        </Button>
        <Button 
          variant="ghost" 
          className="w-full justify-start text-gray-400 hover:text-white"
          onClick={() => setIsPasswordDialogOpen(true)}
        >
          Change Password
        </Button>
        <Button 
          variant="ghost" 
          className="w-full justify-start text-red-500"
          onClick={handleLogout}
          disabled={isLoading}
        >
          {isLoading ? "Logging out..." : "Log Out"}
        </Button>
      </CardContent>
      
      {/* Email Dialog */}
      <Dialog open={isEmailDialogOpen} onOpenChange={setIsEmailDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Change Email</DialogTitle>
          </DialogHeader>
          <Form {...emailForm}>
            <form onSubmit={emailForm.handleSubmit(handleEmailUpdate)} className="space-y-4">
              <FormField
                control={emailForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Email</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your new email" 
                        {...field} 
                        autoComplete="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsEmailDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Updating..." : "Update Email"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Password Dialog */}
      <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
          </DialogHeader>
          <Form {...passwordForm}>
            <form onSubmit={passwordForm.handleSubmit(handlePasswordUpdate)} className="space-y-4">
              <FormField
                control={passwordForm.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="Enter your current password" 
                        {...field} 
                        autoComplete="current-password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={passwordForm.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="Enter your new password" 
                        {...field} 
                        autoComplete="new-password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={passwordForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="Confirm your new password" 
                        {...field} 
                        autoComplete="new-password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsPasswordDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Updating..." : "Update Password"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AccountActions;
