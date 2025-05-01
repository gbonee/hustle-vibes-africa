
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Check } from "lucide-react";

type Language = 'pidgin' | 'yoruba' | 'hausa' | 'igbo';
type Avatar = 'digital-mama' | 'baker-amara' | 'uncle-musa';
type Course = 'digital-marketing' | 'pastry-biz' | 'importation';

interface AvatarInfo {
  id: Avatar;
  name: string;
  role: string;
  image: string;
  course: Course;
  intro: {
    pidgin: string;
    yoruba: string;
    hausa: string;
    igbo: string;
  };
}

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [language, setLanguage] = useState<Language | null>(null);
  const [avatar, setAvatar] = useState<Avatar | null>(null);
  const [animateMessage, setAnimateMessage] = useState(false);

  const languages = [
    { id: 'pidgin', name: 'Pidgin English', flag: '🇳🇬' },
    { id: 'yoruba', name: 'Yoruba', flag: '🧙‍♂️' },
    { id: 'hausa', name: 'Hausa', flag: '🌵' },
    { id: 'igbo', name: 'Igbo', flag: '🌟' },
  ];

  const avatars: AvatarInfo[] = [
    {
      id: 'digital-mama',
      name: 'Digital Mama',
      role: 'Digital Marketing Expert',
      image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9',
      course: 'digital-marketing',
      intro: {
        pidgin: "Ah! You don choose Digital Mama? Oya let's go hustle money online sharp sharp. You no go carry last!",
        yoruba: "Ẹ ku àbọ̀! Mo ni Digital Mama. A ti ṣetan lati kọ́ ọ bi o ṣe le ṣiṣẹ́ lori ayelujara.",
        hausa: "Barka! Ni ne Digital Mama. Mun shirya mu koya maka yadda zaka samu kuɗi ta yanar gizo.",
        igbo: "Nnọọ! Abụ m Digital Mama. Anyị kwadebere ịkụzi gị ka ị na-akpata ego n'Intanet."
      }
    },
    {
      id: 'baker-amara',
      name: 'Baker Amara',
      role: 'Pastry Business Expert',
      image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901',
      course: 'pastry-biz',
      intro: {
        pidgin: "You wan bake like pro? Baker Amara don land! Make I show you how to hammer with puff-puff and meat pie business!",
        yoruba: "Ṣe o fẹ́ bake bí aláṣẹ? Baker Amara ti dé! Jẹ́ kí n fi hàn ọ́ bí o ṣe le ná ìdí olówó pẹ̀lú puff-puff àti meat pie!",
        hausa: "Kana son yin baking kamar ɗan gaskiya? Baker Amara ta iso! Bari in nuna maka yadda zaka samu kuɗi da puff-puff da meat pie!",
        igbo: "Ị chọrọ isi nri dị ka ọkachamara? Baker Amara abịala! Ka m gosi gị ka ị ga-esi nweta ego site na ahịa puff-puff na meat pie!"
      }
    },
    {
      id: 'uncle-musa',
      name: 'Uncle Musa',
      role: 'Importation & Sales Guru',
      image: 'https://images.unsplash.com/photo-1501286353178-1ec871214838',
      course: 'importation',
      intro: {
        pidgin: "Uncle Musa for your service! You go learn how to import goods from China come make heavy money for Nigeria. No long talk, na action!",
        yoruba: "Uncle Musa ni mi! O ma kọ́ bi o ṣe le gbe ọjà wọle lati China lati ṣe owo nla ni Naijiria. Ko si ọrọ pipẹ, iṣe ni!",
        hausa: "Uncle Musa nake! Za ka koyi yadda za ka kawo kaya daga China don samun kuɗi a Nigeria. Ba magana mai yawa, aiki kawai!",
        igbo: "Abụ m Uncle Musa! Ị ga-amụta otu ị ga-esi bubata ngwongwo site na China wee na-eme ego ukwuu na Naịjirịa. Ọ bụghị okwu ogologo, ọ bụ omume!"
      }
    }
  ];

  const handleLanguageSelect = (selectedLanguage: Language) => {
    setLanguage(selectedLanguage);
    setTimeout(() => setStep(2), 500);
  };

  const handleAvatarSelect = (selectedAvatar: Avatar) => {
    setAvatar(selectedAvatar);
    setAnimateMessage(true);
    
    // Wait for animation to complete before redirecting to dashboard
    setTimeout(() => {
      // In a real app, save these preferences to user's profile
      const selectedAvatarObj = avatars.find(a => a.id === selectedAvatar);
      localStorage.setItem('userPreferences', JSON.stringify({
        language,
        avatar: selectedAvatar,
        course: selectedAvatarObj?.course
      }));
      
      navigate('/dashboard');
    }, 5000);
  };

  const selectedAvatarInfo = avatar ? avatars.find(a => a.id === avatar) : null;

  return (
    <div className="min-h-screen bg-black flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/20591bbc-87c9-4bbc-8159-3e4becbee8c8.png" 
              alt="uSabi AI Owl Mascot" 
              className="h-12 w-auto" 
            />
            <span className="text-4xl font-oswald font-bold text-electric">
              uSabi <span className="text-white">AI</span>
            </span>
          </div>
        </div>

        <div className="mb-8">
          <Progress value={step === 1 ? 50 : 100} className="h-2" />
        </div>

        <Card className="border-electric bg-muted overflow-hidden">
          <CardContent className="p-6">
            {step === 1 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-2">Choose Your Language</h2>
                  <p className="text-gray-400">Select the language your AI coach will speak</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {languages.map((lang) => (
                    <Button
                      key={lang.id}
                      onClick={() => handleLanguageSelect(lang.id as Language)}
                      className={`h-24 text-lg flex flex-col items-center justify-center transition-all ${
                        language === lang.id 
                          ? 'bg-electric text-black border-2 border-white'
                          : 'bg-black hover:bg-gray-900 border border-gray-700'
                      }`}
                    >
                      <span className="text-2xl mb-1">{lang.flag}</span>
                      <span>{lang.name}</span>
                      {language === lang.id && (
                        <Check className="absolute top-2 right-2 w-4 h-4" />
                      )}
                    </Button>
                  ))}
                </div>
              </div>
            )}
            
            {step === 2 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-2">Choose Your AI Coach</h2>
                  <p className="text-gray-400">Select who will guide you through your learning journey</p>
                </div>
                
                <div className="space-y-4">
                  {avatars.map((av) => (
                    <div 
                      key={av.id}
                      onClick={() => handleAvatarSelect(av.id)}
                      className={`avatar-card p-4 cursor-pointer transition-all ${
                        avatar === av.id ? 'border-4 border-electric animate-pulse-glow' : ''
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div 
                          className="w-16 h-16 rounded-full overflow-hidden bg-gray-800"
                          style={{
                            backgroundImage: `url(${av.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                          }}
                        />
                        <div>
                          <h3 className="font-bold text-lg">{av.name}</h3>
                          <p className="text-sm text-gray-400">{av.role}</p>
                        </div>
                        {avatar === av.id && (
                          <Check className="ml-auto text-electric w-6 h-6" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {avatar && animateMessage && (
              <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6">
                <div className="bg-muted p-6 rounded-lg max-w-md border-2 border-electric animate-slide-up">
                  <div className="flex items-center gap-4 mb-4">
                    <div 
                      className="w-16 h-16 rounded-full overflow-hidden"
                      style={{
                        backgroundImage: `url(${selectedAvatarInfo?.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    />
                    <h3 className="font-bold text-xl">{selectedAvatarInfo?.name}</h3>
                  </div>
                  <div className="bg-black p-4 rounded-lg border border-gray-800 mb-4">
                    <p className="text-lg">
                      {selectedAvatarInfo?.intro[language as Language]}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-400">Loading your dashboard...</p>
                    <Progress value={100} className="h-2 mt-4 animate-pulse" />
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;
