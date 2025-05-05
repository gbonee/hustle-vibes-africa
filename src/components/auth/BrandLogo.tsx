
import React from 'react';

const BrandLogo: React.FC = () => {
  return (
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
  );
};

export default BrandLogo;
