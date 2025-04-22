
import React from 'react';
import Navbar from '@/components/Navbar';

const Manifesto = () => {
  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <div className="pt-24 pb-16 px-4 container mx-auto">
        <div className="max-w-3xl mx-auto space-y-8">
          <h1 className="text-4xl md:text-6xl font-oswald text-electric font-bold">
            Cheat the System. Win Faster.
          </h1>
          
          <div className="prose prose-invert prose-lg max-w-none space-y-6">
            <p className="text-xl">
              School told you to work hard.<br />
              Life told you to wait your turn.<br />
              But what if you could skip all that?
            </p>

            <p className="text-xl">
              No lectures. No student debt. No gatekeepers.<br />
              Just AI that teaches you the exact skill to get paid.
            </p>

            <p className="text-xl">
              We don't believe in wasting time.<br />
              We believe in shortcuts that work.
            </p>

            <p className="text-xl">
              Forget degrees.<br />
              Forget memorizing useless facts.<br />
              Forget waiting 4 years for a piece of paper nobody cares about.
            </p>

            <p className="text-xl">
              With Usabi AI, you cheat the system — and win.<br />
              We'll teach you how to speak fluent English, pass real job interviews, get globally recognized certs, and land remote jobs.<br />
              From your phone.<br />
              In your language.<br />
              On your schedule.
            </p>

            <p className="text-xl">
              The smart ones don't fight change — they use it.
            </p>

            <p className="text-xl">
              We built Usabi for the ones who are done waiting.<br />
              Done begging.<br />
              Done being broke.
            </p>

            <p className="text-xl">
              No fluff. No delays. Just results.<br />
              Real money. Real jobs. Real fast.
            </p>

            <p className="text-xl font-bold text-electric">
              This isn't school.<br />
              It's rebellion.
            </p>

            <p className="text-2xl font-oswald text-electric font-bold">
              Usabi AI. Cheat the system. Get the bag.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Manifesto;
