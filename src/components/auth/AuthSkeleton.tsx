
import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";

const AuthSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md space-y-4">
        <div className="flex justify-center mb-8">
          <Skeleton className="h-12 w-40" />
        </div>
        <Skeleton className="h-[400px] w-full" />
      </div>
    </div>
  );
};

export default AuthSkeleton;
