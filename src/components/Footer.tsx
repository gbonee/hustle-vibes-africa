
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black py-4 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <img 
              src="/lovable-uploads/20591bbc-87c9-4bbc-8159-3e4becbee8c8.png" 
              alt="uSabi AI Owl Mascot" 
              className="h-6 w-auto" 
            />
            <span className="text-xl font-oswald font-bold text-electric">
              uSabi <span className="text-white">AI</span>
            </span>
          </div>
          <p className="text-xs text-gray-400">
            © 2025 uSabi AI. Education for the streets, by the streets.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
