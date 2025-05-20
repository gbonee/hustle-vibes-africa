
import React from 'react';

const CHFIProgramBanner: React.FC = () => {
  return (
    <div className="mb-6 p-4 bg-gradient-to-r from-black to-rebel/20 border border-electric rounded-lg text-white">
      <h3 className="text-electric text-lg font-bold mb-2">Program Benefits:</h3>
      <ul className="space-y-1">
        <li className="flex items-center gap-2">
          <span className="text-neon">•</span> 
          <span>Top 3 learners win ₦500,000 cash prize each</span>
        </li>
        <li className="flex items-center gap-2">
          <span className="text-neon">•</span> 
          <span>Free mobile data for all participants</span>
        </li>
        <li className="flex items-center gap-2">
          <span className="text-neon">•</span> 
          <span>Cash prizes and airtime rewards while learning</span>
        </li>
        <li className="flex items-center gap-2">
          <span className="text-neon">•</span> 
          <span>Upskill with industry-leading AI training</span>
        </li>
      </ul>
    </div>
  );
};

export default CHFIProgramBanner;
