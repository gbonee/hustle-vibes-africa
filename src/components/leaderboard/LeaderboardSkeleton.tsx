
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import DashboardLayout from '@/components/layout/DashboardLayout';

interface SkeletonProps {
  user: {
    id: string;
    name: string;
    email: string;
    avatar: string;
  };
}

const LeaderboardSkeleton: React.FC<SkeletonProps> = ({ user }) => {
  return (
    <DashboardLayout currentPath="/leaderboard" user={user}>
      <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>
      <div className="space-y-4">
        <Card className="bg-muted border border-gray-700 animate-pulse">
          <CardContent className="h-40"></CardContent>
        </Card>
        <Card className="bg-muted border border-gray-700 animate-pulse">
          <CardContent className="h-20"></CardContent>
        </Card>
        <Card className="bg-muted border border-gray-700 animate-pulse">
          <CardContent className="h-60"></CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default LeaderboardSkeleton;
