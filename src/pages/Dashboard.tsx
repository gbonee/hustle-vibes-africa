import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, Video, MessageSquare, Star, CircleCheck, CircleX } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { useUserPreferences } from '@/hooks/useUserPreferences';

// Define types for our content
interface Module {
  id: number;
  title: string;
  hasVideo: boolean;
  completed: boolean;
  locked: boolean;
}

interface Course {
  id: string;
  title: string;
  avatar: string;
  progress: number;
  modules: Module[];
}

interface Quiz {
  question: string;
  options: string[];
  answer: number;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { userPrefs } = useUserPreferences();
  const [activeTab, setActiveTab] = useState("lessons");
  const [message, setMessage] = useState("");
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizResult, setQuizResult] = useState<'correct' | 'incorrect' | null>(null);
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    avatar: ''
  });
  
  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      
      if (!authUser) return;
      
      // Get the user's profile if it exists
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .maybeSingle();
      
      setUser({
        id: authUser.id,
        name: profile?.display_name || authUser.user_metadata?.full_name || authUser.email?.split('@')[0] || 'User',
        email: authUser.email || '',
        avatar: profile?.avatar_url || "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1" // Default avatar
      });
    };
    
    fetchUserData();
  }, []);
  
  // Mock course data based on user's selection
  const courses: Record<string, Course> = {
    'digital-marketing': {
      id: 'digital-marketing',
      title: 'Digital Marketing the Naija Way',
      avatar: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9',
      progress: 25,
      modules: [
        { id: 1, title: 'Intro to Digital Marketing the Naija Way', hasVideo: false, completed: true, locked: false },
        { id: 2, title: 'How to Sell on WhatsApp & Instagram', hasVideo: true, completed: false, locked: false },
        { id: 3, title: 'Create Content That Converts (Even With Just Your Phone)', hasVideo: true, completed: false, locked: true },
        { id: 4, title: 'How to Run Small Ads on Meta', hasVideo: false, completed: false, locked: true },
        { id: 5, title: 'How to Keep Customers & Sell Weekly', hasVideo: true, completed: false, locked: true }
      ]
    },
    'pastry-biz': {
      id: 'pastry-biz',
      title: 'Start a Pastry Biz From Your Kitchen',
      avatar: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901',
      progress: 20,
      modules: [
        { id: 1, title: 'Intro to Baking as a Business in Nigeria', hasVideo: false, completed: true, locked: false },
        { id: 2, title: 'How to Make Puff-Puff That Sells', hasVideo: true, completed: false, locked: false },
        { id: 3, title: 'How to Make Nigerian Meatpie', hasVideo: false, completed: false, locked: true },
        { id: 4, title: 'Branding & Packaging for Pastry Biz', hasVideo: true, completed: false, locked: true },
        { id: 5, title: 'How to Find Your First Customers & Start Selling', hasVideo: true, completed: false, locked: true }
      ]
    },
    'importation': {
      id: 'importation',
      title: 'Import From China & Sell on WhatsApp',
      avatar: 'https://images.unsplash.com/photo-1501286353178-1ec871214838',
      progress: 15,
      modules: [
        { id: 1, title: 'How to Find Hot-Selling Products Nigerians Want', hasVideo: false, completed: true, locked: false },
        { id: 2, title: 'Where to Buy Cheap: 1688, Alibaba & Hidden Supplier Hacks', hasVideo: true, completed: false, locked: false },
        { id: 3, title: 'Shipping & Delivery: How to Import Without Wahala', hasVideo: false, completed: false, locked: true },
        { id: 4, title: 'How to Market & Sell FAST on WhatsApp & Instagram', hasVideo: true, completed: false, locked: true },
        { id: 5, title: 'Pricing, Profit & Customer Service Tips to Keep Sales Coming', hasVideo: false, completed: false, locked: true }
      ]
    }
  };

  // Sample quizzes for modules
  const quizzes: Quiz[] = [
    {
      question: 'What is the best platform to start selling your products in Nigeria?',
      options: ['LinkedIn', 'WhatsApp', 'Snapchat', 'TikTok'],
      answer: 1
    },
    {
      question: 'How much capital do you typically need to start importing from China?',
      options: ['₦5,000', '₦50,000', '₦500,000', 'It depends on the product'],
      answer: 3
    },
    {
      question: "What is the most important skill for digital marketing in Nigeria?",
      options: ['Programming', 'Persuasive copywriting', 'Graphic design', 'Video editing'],
      answer: 1
    },
    {
      question: 'Which of these is NOT necessary for a successful pastry business?',
      options: ['Quality ingredients', 'Good taste', 'A big kitchen', 'Proper packaging'],
      answer: 2
    },
    {
      question: "What is the best way to handle customer complaints?",
      options: ['Ignore them', 'Argue back', 'Respond promptly and solve the problem', 'Offer free products'],
      answer: 2
    }
  ];

  const handleMessageSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // In a real app, this would be sent to an AI endpoint
    // For now, we'll just show a mock response
    const aiResponses = [
      "Na good question be dat. The best way to start na to just do am! Start small, learn fast.",
      "You sabi ask question o! Make sure you understand the basics before you start spending money.",
      "See ehn, for digital marketing, content na king and consistency na queen. No forget!",
      "Ah ah! This one na simple matter. Just make sure your product quality no dey fall. Customer go notice.",
      "My friend, the secret na to know your target audience well-well. Na them be your bread and butter."
    ];
    
    // Add user message and AI response to chat (this is just a mock example)
    const chatBox = document.getElementById('chat-messages');
    if (chatBox) {
      // Add user message
      const userDiv = document.createElement('div');
      userDiv.className = 'flex justify-end mb-4';
      userDiv.innerHTML = `
        <div class="bg-electric text-black p-3 rounded-lg max-w-[80%]">
          <p>${message}</p>
        </div>
      `;
      chatBox.appendChild(userDiv);
      
      // Add AI response (random from our list)
      setTimeout(() => {
        const aiDiv = document.createElement('div');
        aiDiv.className = 'flex mb-4';
        aiDiv.innerHTML = `
          <div class="w-10 h-10 rounded-full overflow-hidden mr-3">
            <img src="${courses[userPrefs?.course || 'digital-marketing'].avatar}" alt="AI Avatar" class="w-full h-full object-cover" />
          </div>
          <div class="bg-muted p-3 rounded-lg max-w-[80%]">
            <p>${aiResponses[Math.floor(Math.random() * aiResponses.length)]}</p>
          </div>
        `;
        chatBox.appendChild(aiDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
      }, 1000);
      
      chatBox.scrollTop = chatBox.scrollHeight;
    }
    
    setMessage('');
  };

  const handleModuleSelect = (module: Module) => {
    if (module.locked) return;
    setSelectedModule(module);
  };

  const handleStartQuiz = () => {
    setShowQuiz(true);
    setCurrentQuizIndex(0);
    setQuizResult(null);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (answerIndex === quizzes[currentQuizIndex].answer) {
      setQuizResult('correct');
    } else {
      setQuizResult('incorrect');
    }
    
    setTimeout(() => {
      if (currentQuizIndex < quizzes.length - 1) {
        setCurrentQuizIndex(prevIndex => prevIndex + 1);
      } else {
        // End of quiz
        setShowQuiz(false);
        // Update progress (in a real app)
      }
      setQuizResult(null);
    }, 2000);
  };

  const handleCloseModule = () => {
    setSelectedModule(null);
    setShowQuiz(false);
  };

  const userCourse = userPrefs?.course ? courses[userPrefs.course] : courses['digital-marketing'];

  return (
    <div className="min-h-screen bg-black">
      {/* Top Navigation Bar */}
      <header className="bg-black/90 backdrop-blur-sm border-b border-electric/30 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center py-3 px-4">
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/20591bbc-87c9-4bbc-8159-3e4becbee8c8.png" 
              alt="uSabi AI Owl Mascot" 
              className="h-8 w-auto" 
            />
            <span className="text-2xl font-oswald font-bold text-electric ml-2">
              uSabi <span className="text-white">AI</span>
            </span>
          </div>
          <Button 
            onClick={() => navigate('/profile')}
            variant="ghost" 
            className="rounded-full w-10 h-10 p-0"
          >
            <Avatar>
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{user.name?.split(' ').map(n => n[0]).join('') || 'U'}</AvatarFallback>
            </Avatar>
          </Button>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-6">
        {/* Course Info Card */}
        <Card className="bg-muted border-electric mb-6">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div 
                className="w-16 h-16 rounded-full overflow-hidden"
                style={{
                  backgroundImage: `url(${userCourse.avatar})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
              <div>
                <h2 className="text-xl font-bold">{userCourse.title}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <Progress value={userCourse.progress} className="h-2 w-32" />
                  <span className="text-sm text-gray-400">{userCourse.progress}% complete</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-6 bg-black">
            <TabsTrigger value="lessons" className="text-lg">
              <Video className="mr-2 h-4 w-4" />
              Lessons
            </TabsTrigger>
            <TabsTrigger value="chat" className="text-lg">
              <MessageSquare className="mr-2 h-4 w-4" />
              AI Chat
            </TabsTrigger>
          </TabsList>
          
          {/* Lessons Tab */}
          <TabsContent value="lessons" className="space-y-4">
            {selectedModule ? (
              <Card className="bg-muted border-electric">
                <CardHeader>
                  <CardTitle>{selectedModule.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {selectedModule.hasVideo ? (
                    <div className="aspect-video bg-black rounded-lg flex items-center justify-center border border-gray-800">
                      {/* In a real app this would be a video player */}
                      <div className="text-center">
                        <Video className="h-12 w-12 mx-auto mb-4 text-electric" />
                        <p className="text-gray-400">Video would play here</p>
                      </div>
                    </div>
                  ) : (
                    <div className="aspect-video bg-black rounded-lg flex items-center justify-center border border-gray-800">
                      <div className="text-center p-6">
                        <h3 className="text-xl font-bold mb-4">Module Content</h3>
                        <p className="text-gray-400">This module contains reading materials and exercises.</p>
                      </div>
                    </div>
                  )}
                  
                  {showQuiz ? (
                    <div className="bg-black p-6 rounded-lg border border-gray-800">
                      <h3 className="text-xl font-bold mb-4">Quick Quiz</h3>
                      <p className="text-gray-400 mb-4">Question {currentQuizIndex + 1} of {quizzes.length}</p>
                      
                      <div className="mb-6">
                        <h4 className="text-lg mb-4">{quizzes[currentQuizIndex].question}</h4>
                        <div className="space-y-2">
                          {quizzes[currentQuizIndex].options.map((option, index) => (
                            <Button 
                              key={index}
                              onClick={() => handleAnswerSelect(index)}
                              variant="outline"
                              className="w-full justify-start text-left h-auto py-3 px-4"
                              disabled={quizResult !== null}
                            >
                              {option}
                            </Button>
                          ))}
                        </div>
                      </div>
                      
                      {quizResult && (
                        <div className={`p-4 rounded-lg mb-4 flex items-center gap-2 ${
                          quizResult === 'correct' 
                            ? 'bg-green-900/30 border border-green-500/30' 
                            : 'bg-red-900/30 border border-red-500/30'
                        }`}>
                          {quizResult === 'correct' ? (
                            <>
                              <CircleCheck className="text-green-400 h-5 w-5" />
                              <p>You sabi die! You go make money pass Dangote o!</p>
                            </>
                          ) : (
                            <>
                              <CircleX className="text-red-400 h-5 w-5" />
                              <p>Ah, who dash you brain today? Oya try again jare!</p>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Button 
                      onClick={handleStartQuiz} 
                      className="w-full py-6 bg-electric text-black hover:bg-electric/90"
                    >
                      Take Quiz
                    </Button>
                  )}
                  
                  <div>
                    <h3 className="text-lg font-bold mb-2">Mini-Challenge</h3>
                    <div className="bg-black p-4 rounded-lg border border-gray-800">
                      <p>Post your practice video and tag @UsabiAI to win 500MB data!</p>
                      <Button 
                        className="mt-4"
                        variant="outline"
                      >
                        Submit Challenge
                      </Button>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleCloseModule}
                    variant="ghost"
                    className="w-full"
                  >
                    Back to All Modules
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <>
                <h2 className="text-xl font-bold mb-4">Your Modules</h2>
                <div className="space-y-3">
                  {userCourse.modules.map((module) => (
                    <Card 
                      key={module.id}
                      onClick={() => handleModuleSelect(module)}
                      className={`cursor-pointer transition-all hover:border-electric ${
                        module.locked 
                          ? 'opacity-60' 
                          : module.completed 
                          ? 'border-green-500 bg-black' 
                          : 'bg-black'
                      }`}
                    >
                      <CardContent className="p-4 flex items-center">
                        {module.completed ? (
                          <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
                            <CircleCheck className="h-5 w-5 text-green-500" />
                          </div>
                        ) : module.locked ? (
                          <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center mr-3">
                            <span className="text-xs">🔒</span>
                          </div>
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-electric/20 flex items-center justify-center mr-3">
                            <span className="text-xs">{module.id}</span>
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className="font-medium">{module.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            {module.hasVideo && (
                              <span className="text-xs bg-muted px-2 py-0.5 rounded-full">
                                <Video className="inline-block w-3 h-3 mr-1" />
                                Video
                              </span>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </TabsContent>
          
          {/* Chat Tab */}
          <TabsContent value="chat" className="space-y-4">
            <Card className="bg-muted border-electric">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={userCourse.avatar} />
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>Chat with Your AI Coach</CardTitle>
                    <CardDescription>Hey {user.name}, ask me anything about your course</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div 
                  id="chat-messages" 
                  className="h-80 overflow-y-auto flex flex-col space-y-4 mb-4 p-2"
                >
                  <div className="flex mb-4">
                    <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                      <img src={userCourse.avatar} alt="AI Avatar" className="w-full h-full object-cover" />
                    </div>
                    <div className="bg-muted p-3 rounded-lg max-w-[80%]">
                      <p>Hey {user.name}! I'm your AI coach. How can I help you with your {userCourse.title} journey today?</p>
                    </div>
                  </div>
                </div>
                
                <form onSubmit={handleMessageSend} className="flex gap-2">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask your AI coach a question..."
                    className="bg-black border-gray-700"
                  />
                  <Button type="submit">Send</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-sm border-t border-electric/30 py-2">
        <div className="container mx-auto grid grid-cols-3">
          <Button 
            variant="ghost"
            className="flex flex-col items-center justify-center h-16"
            onClick={() => navigate('/dashboard')}
          >
            <Video className="h-5 w-5 mb-1" />
            <span className="text-xs">Learn</span>
          </Button>
          
          <Button 
            variant="ghost"
            className="flex flex-col items-center justify-center h-16"
            onClick={() => navigate('/leaderboard')}
          >
            <Trophy className="h-5 w-5 mb-1" />
            <span className="text-xs">Leaderboard</span>
          </Button>
          
          <Button 
            variant="ghost"
            className="flex flex-col items-center justify-center h-16"
            onClick={() => navigate('/profile')}
          >
            <Avatar className="h-8 w-8 mb-1">
              <AvatarImage src="https://images.unsplash.com/photo-1535268647677-300dbf3d78d1" />
              <AvatarFallback>US</AvatarFallback>
            </Avatar>
            <span className="text-xs">Profile</span>
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default Dashboard;
