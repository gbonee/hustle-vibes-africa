
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Smile, Paperclip, Users, Search } from "lucide-react";

interface ChatMessage {
  id: string;
  user: {
    name: string;
    avatar: string;
    status: 'online' | 'offline';
  };
  message: string;
  timestamp: string;
  gif?: string;
}

interface ChatRoom {
  id: string;
  name: string;
  members: number;
  lastMessage: string;
  unreadCount: number;
  category: string;
}

const CommunityChat = () => {
  const [activeRoom, setActiveRoom] = useState('general');
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [chatRooms] = useState<ChatRoom[]>([
    {
      id: 'general',
      name: 'General Chat',
      members: 1247,
      lastMessage: 'Anyone know good suppliers in Lagos?',
      unreadCount: 3,
      category: 'general'
    },
    {
      id: 'digital-marketing',
      name: 'Digital Marketing',
      members: 856,
      lastMessage: 'Just got my first 1000 followers!',
      unreadCount: 0,
      category: 'business'
    },
    {
      id: 'pastry-business',
      name: 'Pastry Business',
      members: 634,
      lastMessage: 'New cake design trending 🎂',
      unreadCount: 5,
      category: 'business'
    },
    {
      id: 'importation',
      name: 'Import/Export',
      members: 542,
      lastMessage: 'Customs clearance tips needed',
      unreadCount: 2,
      category: 'business'
    },
    {
      id: 'lagos-entrepreneurs',
      name: 'Lagos Entrepreneurs',
      members: 342,
      lastMessage: 'Networking event this weekend?',
      unreadCount: 0,
      category: 'location'
    }
  ]);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      user: {
        name: 'Adunni Lagos',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c',
        status: 'online'
      },
      message: 'Good morning everyone! Hope your businesses are doing well today 💪',
      timestamp: '9:15 AM'
    },
    {
      id: '2',
      user: {
        name: 'Emeka Aba',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
        status: 'online'
      },
      message: 'Morning Adunni! Just closed a big deal with a client from Port Harcourt. The digital marketing course really works!',
      timestamp: '9:18 AM'
    },
    {
      id: '3',
      user: {
        name: 'Fatima Kano',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
        status: 'online'
      },
      message: 'Congratulations Emeka! 🎉 That\'s amazing. I\'m also seeing great results with my pastry business.',
      timestamp: '9:20 AM'
    },
    {
      id: '4',
      user: {
        name: 'Tunde Ibadan',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
        status: 'offline'
      },
      message: 'Anyone know good suppliers for electronics in Lagos? I want to start importing phones.',
      timestamp: '9:25 AM'
    },
    {
      id: '5',
      user: {
        name: 'Chioma Enugu',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956',
        status: 'online'
      },
      message: '@Tunde I can help you with that. I\'ve been importing electronics for 2 years now. Let me DM you some contacts.',
      timestamp: '9:28 AM',
      gif: 'https://media.giphy.com/media/26u4lOMA8JKSnL9Uk/giphy.gif'
    }
  ]);

  const onlineUsers = [
    { name: 'Adunni', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c' },
    { name: 'Emeka', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d' },
    { name: 'Fatima', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80' },
    { name: 'Chioma', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956' },
    { name: 'Kemi', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f' }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        user: {
          name: 'You',
          avatar: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1',
          status: 'online'
        },
        message: message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  const currentRoom = chatRooms.find(room => room.id === activeRoom);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[600px]">
      {/* Chat Rooms Sidebar */}
      <div className="md:col-span-1">
        <Card className="bg-gray-900 border-gray-700 h-full">
          <CardHeader className="pb-3">
            <div className="space-y-3">
              <h3 className="font-semibold text-white">Chat Rooms</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search rooms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 bg-gray-800 border-gray-600 text-white text-sm h-8"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-2">
            <ScrollArea className="h-[480px]">
              <div className="space-y-1">
                {chatRooms.map((room) => (
                  <Button
                    key={room.id}
                    variant={activeRoom === room.id ? "secondary" : "ghost"}
                    className={`w-full justify-start p-3 h-auto ${
                      activeRoom === room.id ? 'bg-electric/20 border-electric/30' : 'hover:bg-gray-800'
                    }`}
                    onClick={() => setActiveRoom(room.id)}
                  >
                    <div className="flex-1 text-left">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-sm">{room.name}</p>
                        {room.unreadCount > 0 && (
                          <Badge className="bg-electric text-black text-xs h-5 min-w-5 px-1">
                            {room.unreadCount}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-xs text-gray-400 truncate">{room.lastMessage}</p>
                        <div className="flex items-center text-xs text-gray-500">
                          <Users className="w-3 h-3 mr-1" />
                          {room.members}
                        </div>
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Main Chat Area */}
      <div className="md:col-span-2">
        <Card className="bg-gray-900 border-gray-700 h-full flex flex-col">
          <CardHeader className="border-b border-gray-700 pb-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-white">{currentRoom?.name}</h3>
                <p className="text-sm text-gray-400">{currentRoom?.members} members online</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Paperclip className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className="flex items-start space-x-3">
                    <div className="relative">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={msg.user.avatar} />
                        <AvatarFallback>{msg.user.name[0]}</AvatarFallback>
                      </Avatar>
                      {msg.user.status === 'online' && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline space-x-2">
                        <p className="font-medium text-white text-sm">{msg.user.name}</p>
                        <p className="text-xs text-gray-500">{msg.timestamp}</p>
                      </div>
                      <p className="text-gray-300 text-sm mt-1">{msg.message}</p>
                      {msg.gif && (
                        <img src={msg.gif} alt="GIF" className="mt-2 rounded max-w-xs" />
                      )}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="border-t border-gray-700 p-4">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="text-gray-400">
                  <Paperclip className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400">
                  <Smile className="w-4 h-4" />
                </Button>
                <Input
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 bg-gray-800 border-gray-600 text-white"
                />
                <Button onClick={handleSendMessage} className="rebel-button" size="sm">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Online Users Sidebar */}
      <div className="md:col-span-1">
        <Card className="bg-gray-900 border-gray-700 h-full">
          <CardHeader className="pb-3">
            <h3 className="font-semibold text-white">Online Now</h3>
            <p className="text-sm text-gray-400">{onlineUsers.length} members active</p>
          </CardHeader>
          <CardContent className="p-2">
            <ScrollArea className="h-[480px]">
              <div className="space-y-2">
                {onlineUsers.map((user, index) => (
                  <div key={index} className="flex items-center space-x-3 p-2 hover:bg-gray-800 rounded cursor-pointer">
                    <div className="relative">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></div>
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">{user.name}</p>
                      <p className="text-gray-400 text-xs">Online</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CommunityChat;
