
import { useState, useEffect } from 'react';

interface UserPreferences {
  language: string;
  avatar: string;
  course: string;
}

export const useUserPreferences = () => {
  const [userPrefs, setUserPrefs] = useState<UserPreferences | null>(null);
  
  useEffect(() => {
    const savedPrefs = localStorage.getItem('userPreferences');
    if (savedPrefs) {
      setUserPrefs(JSON.parse(savedPrefs));
    }
  }, []);

  const updateUserPreferences = (newPrefs: Partial<UserPreferences>) => {
    const updatedPrefs = { ...userPrefs, ...newPrefs };
    localStorage.setItem('userPreferences', JSON.stringify(updatedPrefs));
    setUserPrefs(updatedPrefs as UserPreferences);
  };
  
  return { userPrefs, updateUserPreferences };
};
