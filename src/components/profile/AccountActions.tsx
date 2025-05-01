
import React from 'react';
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AccountActions: React.FC = () => {
  return (
    <>
      <CardHeader className="py-4 px-6">
        <CardTitle className="text-lg">Account Actions</CardTitle>
      </CardHeader>
      <CardContent className="px-6 py-2 space-y-2">
        <Button variant="ghost" className="w-full justify-start text-gray-400">
          Change Email
        </Button>
        <Button variant="ghost" className="w-full justify-start text-gray-400">
          Change Password
        </Button>
        <Button variant="ghost" className="w-full justify-start text-red-500">
          Log Out
        </Button>
      </CardContent>
    </>
  );
};

export default AccountActions;
