
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from 'react-router-dom';

const CHFISignupForm: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !name || !phone) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            phone: phone,
            program: 'CHFI',
          },
        },
      });
      
      if (error) {
        toast({
          title: "Registration failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Registration successful",
          description: "Welcome to the CHFI x uSabi AI program! Your journey to winning begins now.",
        });
        
        // Create a profile for the user
        if (data.user) {
          const { error: profileError } = await supabase
            .from('profiles')
            .insert([
              { 
                id: data.user.id,
                display_name: name,
                phone: phone,
                program: 'CHFI',
              },
            ]);
            
          if (profileError) {
            console.error('Error creating profile:', profileError);
          }
        }
        
        navigate('/onboarding');
      }
    } catch (error) {
      toast({
        title: "An error occurred",
        description: "Please try again later.",
        variant: "destructive",
      });
      console.error('Error during signup:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignup} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="chfi-name">Full Name</Label>
        <Input 
          id="chfi-name"
          type="text" 
          placeholder="Your Full Name" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={loading}
          className="bg-black/50 border-gray-700"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="chfi-phone">Phone Number</Label>
        <Input 
          id="chfi-phone"
          type="tel" 
          placeholder="Your Phone Number" 
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          disabled={loading}
          className="bg-black/50 border-gray-700"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="chfi-signup-email">Email</Label>
        <Input 
          id="chfi-signup-email"
          type="email" 
          placeholder="your@email.com" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
          className="bg-black/50 border-gray-700"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="chfi-signup-password">Password</Label>
        <div className="relative">
          <Input 
            id="chfi-signup-password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
            className="bg-black/50 border-gray-700 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>
      <Button type="submit" className="w-full bg-electric hover:bg-electric/80 text-black font-bold" disabled={loading}>
        {loading ? (
          <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating Account...</>
        ) : (
          'Join Program & Start Learning'
        )}
      </Button>
      <p className="text-xs text-center text-gray-400 mt-2">
        By signing up, you're eligible for all program rewards including cash prizes and airtime.
      </p>
    </form>
  );
};

export default CHFISignupForm;
