
import React from 'react';
import { CardHeader, CardTitle } from "@/components/ui/card";

interface ModuleHeaderProps {
  title: string;
}

const ModuleHeader: React.FC<ModuleHeaderProps> = ({ title }) => {
  return (
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
  );
};

export default ModuleHeader;
