
import React from 'react';
import { AlertCircle } from 'lucide-react';

const PreviewMode: React.FC = () => {
  return (
    <div className="fixed top-0 right-0 m-2 p-2 bg-yellow-500 text-black rounded-md z-50 flex items-center gap-2 text-xs">
      <AlertCircle size={16} />
      <span>Preview Mode</span>
    </div>
  );
};

export default PreviewMode;
