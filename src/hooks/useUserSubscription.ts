
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";

interface UserSubscription {
  isProUser: boolean;
  subscriptionTier: string;
  totalEarnings: number;
}

export const useUserSubscription = () => {
  const [subscription, setSubscription] = useState<UserSubscription>({
    isProUser: false,
    subscriptionTier: 'core',
    totalEarnings: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserSubscription = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          setIsLoading(false);
          return;
        }

        const { data: profile } = await supabase
          .from('profiles')
          .select('is_pro_user, subscription_tier, total_earnings')
          .eq('id', user.id)
          .single();

        if (profile) {
          setSubscription({
            isProUser: profile.is_pro_user || false,
            subscriptionTier: profile.subscription_tier || 'core',
            totalEarnings: profile.total_earnings || 0
          });
        }
      } catch (error) {
        console.error('Error fetching user subscription:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserSubscription();
  }, []);

  const upgradeToProUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return false;

      const { error } = await supabase
        .from('profiles')
        .update({
          is_pro_user: true,
          subscription_tier: 'pro'
        })
        .eq('id', user.id);

      if (error) throw error;

      setSubscription(prev => ({
        ...prev,
        isProUser: true,
        subscriptionTier: 'pro'
      }));

      return true;
    } catch (error) {
      console.error('Error upgrading to pro:', error);
      return false;
    }
  };

  return {
    subscription,
    isLoading,
    upgradeToProUser
  };
};
