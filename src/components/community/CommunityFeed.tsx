
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Heart, MessageSquare, Share, MoreHorizontal, Send, Smile } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Post {
  id: string;
  user: {
    name: string;
    avatar: string;
    username: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  comments: Comment[];
  isLiked: boolean;
}

interface Comment {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  gif?: string;
}

const CommunityFeed = () => {
  const [newPost, setNewPost] = useState('');
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      user: {
        name: 'Adunni Lagos',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c',
        username: '@adunni_hustles'
      },
      content: 'Just made my first ₦50,000 from digital marketing! The uSabi course really works. Big thank you to the community for all the support! 🔥💰',
      timestamp: '2 hours ago',
      likes: 24,
      isLiked: false,
      comments: [
        {
          id: '1',
          user: {
            name: 'Emeka Aba',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d'
          },
          content: 'Congratulations! Which strategy worked best for you?',
          timestamp: '1 hour ago'
        }
      ]
    },
    {
      id: '2',
      user: {
        name: 'Kemi Abuja',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
        username: '@kemi_pastries'
      },
      content: 'My pastry business is booming! Started with just ₦10,000 and now I have 3 employees. Dreams do come true! 🧁✨',
      timestamp: '4 hours ago',
      likes: 45,
      isLiked: true,
      comments: []
    }
  ]);

  const [commentInputs, setCommentInputs] = useState<{[key: string]: string}>({});

  const handlePostSubmit = () => {
    if (newPost.trim()) {
      const post: Post = {
        id: Date.now().toString(),
        user: {
          name: 'You',
          avatar: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1',
          username: '@you'
        },
        content: newPost,
        timestamp: 'now',
        likes: 0,
        isLiked: false,
        comments: []
      };
      setPosts([post, ...posts]);
      setNewPost('');
    }
  };

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked, 
            likes: post.isLiked ? post.likes - 1 : post.likes + 1 
          }
        : post
    ));
  };

  const handleComment = (postId: string) => {
    const commentText = commentInputs[postId];
    if (commentText?.trim()) {
      const newComment: Comment = {
        id: Date.now().toString(),
        user: {
          name: 'You',
          avatar: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1'
        },
        content: commentText,
        timestamp: 'now'
      };
      
      setPosts(posts.map(post => 
        post.id === postId 
          ? { ...post, comments: [...post.comments, newComment] }
          : post
      ));
      
      setCommentInputs({ ...commentInputs, [postId]: '' });
    }
  };

  return (
    <div className="space-y-6">
      {/* Create Post */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src="https://images.unsplash.com/photo-1535268647677-300dbf3d78d1" />
              <AvatarFallback>You</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-white font-medium">Share your wins!</p>
              <p className="text-gray-400 text-sm">What's happening in your hustle?</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Share your progress, ask questions, or celebrate wins..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            className="bg-gray-800 border-gray-600 text-white resize-none"
            rows={3}
          />
          <div className="flex justify-end">
            <Button 
              onClick={handlePostSubmit}
              disabled={!newPost.trim()}
              className="rebel-button"
            >
              Post
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Posts Feed */}
      {posts.map((post) => (
        <Card key={post.id} className="bg-gray-900 border-gray-700">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={post.user.avatar} />
                  <AvatarFallback>{post.user.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-white font-medium">{post.user.name}</p>
                  <p className="text-gray-400 text-sm">{post.user.username} • {post.timestamp}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-white">{post.content}</p>
            
            {/* Post Actions */}
            <div className="flex items-center space-x-6 py-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleLike(post.id)}
                className={`flex items-center space-x-2 ${post.isLiked ? 'text-red-500' : 'text-gray-400'}`}
              >
                <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
                <span>{post.likes}</span>
              </Button>
              
              <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-gray-400">
                <MessageSquare className="w-5 h-5" />
                <span>{post.comments.length}</span>
              </Button>
              
              <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-gray-400">
                <Share className="w-5 h-5" />
                <span>Share</span>
              </Button>
            </div>

            {/* Comments */}
            {post.comments.length > 0 && (
              <div className="space-y-3 pt-2 border-t border-gray-700">
                {post.comments.map((comment) => (
                  <div key={comment.id} className="flex items-start space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={comment.user.avatar} />
                      <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="bg-gray-800 rounded-lg p-3">
                        <p className="text-white text-sm font-medium">{comment.user.name}</p>
                        <p className="text-gray-300 text-sm">{comment.content}</p>
                        {comment.gif && (
                          <img src={comment.gif} alt="GIF" className="mt-2 rounded max-w-xs" />
                        )}
                      </div>
                      <p className="text-gray-500 text-xs mt-1">{comment.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Add Comment */}
            <div className="flex items-center space-x-3 pt-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src="https://images.unsplash.com/photo-1535268647677-300dbf3d78d1" />
                <AvatarFallback>You</AvatarFallback>
              </Avatar>
              <div className="flex-1 flex items-center space-x-2">
                <Input
                  placeholder="Write a comment..."
                  value={commentInputs[post.id] || ''}
                  onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                  className="bg-gray-800 border-gray-600 text-white"
                  onKeyPress={(e) => e.key === 'Enter' && handleComment(post.id)}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white"
                >
                  <Smile className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleComment(post.id)}
                  className="text-electric hover:text-electric/80"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CommunityFeed;
