
import React from 'react';
import { Button } from "@/components/ui/button";

interface BackButtonProps {
  onClick: () => void;
  text: string;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick, text }) => {
  return (
    <Button 
      onClick={onClick}
      variant="ghost"
      className="w-full"
    >
      {text}
    </Button>
  );
};

export default BackButton;
