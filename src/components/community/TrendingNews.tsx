
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, MessageSquare, Share, ExternalLink, Clock, Eye } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  category: 'business' | 'entertainment' | 'politics' | 'sports' | 'tech';
  source: string;
  timestamp: string;
  views: number;
  comments: number;
  image?: string;
  trending: boolean;
}

const TrendingNews = () => {
  const [news] = useState<NewsItem[]>([
    {
      id: '1',
      title: 'Dangote Refinery Begins Petrol Production, Set to Transform Nigerian Economy',
      excerpt: 'The long-awaited Dangote Refinery has officially started producing petrol, marking a historic milestone for Nigeria\'s oil industry and potentially reducing fuel imports.',
      category: 'business',
      source: 'Punch Newspapers',
      timestamp: '2 hours ago',
      views: 15420,
      comments: 234,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96',
      trending: true
    },
    {
      id: '2',
      title: 'Burna Boy Wins Another Grammy Nomination for "I Told Them" Album',
      excerpt: 'Nigerian superstar Burna Boy continues his global dominance with another Grammy nomination, solidifying Afrobeats\' position on the world stage.',
      category: 'entertainment',
      source: 'The Guardian Nigeria',
      timestamp: '4 hours ago',
      views: 12890,
      comments: 567,
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f',
      trending: true
    },
    {
      id: '3',
      title: 'Nigerian Tech Startup Flutterwave Expands to 5 New African Countries',
      excerpt: 'Fintech giant Flutterwave announces major expansion across Africa, bringing digital payment solutions to millions more users.',
      category: 'tech',
      source: 'TechCabal',
      timestamp: '6 hours ago',
      views: 8540,
      comments: 123,
      trending: false
    },
    {
      id: '4',
      title: 'Super Eagles Qualify for AFCON 2025 After Victory Over Benin Republic',
      excerpt: 'Nigeria\'s national football team secures their spot in the Africa Cup of Nations with a convincing 3-1 victory.',
      category: 'sports',
      source: 'Complete Sports',
      timestamp: '8 hours ago',
      views: 19320,
      comments: 445,
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018',
      trending: true
    },
    {
      id: '5',
      title: 'New Minimum Wage Policy Sparks Nationwide Debate',
      excerpt: 'Labour unions and government officials continue negotiations over the proposed minimum wage increase amid economic challenges.',
      category: 'politics',
      source: 'Vanguard',
      timestamp: '12 hours ago',
      views: 7890,
      comments: 678,
      trending: false
    }
  ]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'business':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'entertainment':
        return 'bg-pink-500/20 text-pink-400 border-pink-500/30';
      case 'politics':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'sports':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'tech':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getCategoryNews = (category: string) => {
    if (category === 'all') return news;
    return news.filter(item => item.category === category);
  };

  const formatViews = (views: number) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}k`;
    }
    return views.toString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center">
            <TrendingUp className="w-6 h-6 mr-2 text-electric" />
            Trending in Nigeria
          </h2>
          <p className="text-gray-400">Stay updated with the latest news and trends</p>
        </div>
      </div>

      {/* Categories */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
          <TabsTrigger value="business" className="text-xs">Business</TabsTrigger>
          <TabsTrigger value="entertainment" className="text-xs">Entertainment</TabsTrigger>
          <TabsTrigger value="tech" className="text-xs">Tech</TabsTrigger>
          <TabsTrigger value="sports" className="text-xs">Sports</TabsTrigger>
          <TabsTrigger value="politics" className="text-xs">Politics</TabsTrigger>
        </TabsList>

        {['all', 'business', 'entertainment', 'tech', 'sports', 'politics'].map((category) => (
          <TabsContent key={category} value={category} className="space-y-4 mt-6">
            {getCategoryNews(category).map((item) => (
              <Card key={item.id} className="bg-gray-900 border-gray-700 hover:border-electric/50 transition-colors">
                <CardContent className="p-0">
                  <div className="flex">
                    {/* Image */}
                    {item.image && (
                      <div className="w-32 h-24 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover rounded-l-lg"
                        />
                      </div>
                    )}
                    
                    {/* Content */}
                    <div className="flex-1 p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Badge className={`${getCategoryColor(item.category)} border text-xs`}>
                            {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                          </Badge>
                          {item.trending && (
                            <Badge className="bg-electric/20 text-electric border-electric/30 text-xs">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              Trending
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <h3 className="font-semibold text-white mb-2 line-clamp-2">
                        {item.title}
                      </h3>
                      
                      <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                        {item.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>{item.source}</span>
                          <div className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {item.timestamp}
                          </div>
                          <div className="flex items-center">
                            <Eye className="w-3 h-3 mr-1" />
                            {formatViews(item.views)}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-1">
                            <MessageSquare className="w-4 h-4" />
                            <span className="ml-1 text-xs">{item.comments}</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-1">
                            <Share className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-1">
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        ))}
      </Tabs>

      {/* Trending Topics */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <h3 className="font-semibold text-white">Trending Topics</h3>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {['#DangoteRefinery', '#BurnaBoy', '#SuperEagles', '#NaijaEntertainment', '#AfrobeatsTakeover', '#TechInNigeria'].map((topic, index) => (
              <Badge key={index} variant="outline" className="border-gray-600 text-gray-300 hover:border-electric/50 cursor-pointer">
                {topic}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrendingNews;
