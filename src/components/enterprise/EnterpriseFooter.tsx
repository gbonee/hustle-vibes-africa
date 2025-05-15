
import React from 'react';

const EnterpriseFooter = () => {
  return (
    <footer className="bg-black py-8 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <img 
              src="/lovable-uploads/20591bbc-87c9-4bbc-8159-3e4becbee8c8.png" 
              alt="uSabi AI Owl Mascot" 
              className="h-8 w-auto" 
            />
            <span className="text-2xl font-oswald font-bold text-electric">
              uSabi <span className="text-white">AI</span>
            </span>
          </div>
          <p className="text-sm text-gray-400">
            © 2025 uSabi AI. Education for the streets, by the streets.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default EnterpriseFooter;
