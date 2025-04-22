
import React from 'react';

const avatars = [
  {
    id: 1,
    name: 'Digital Mama',
    language: 'Pidgin',
    personality: '"You dey craze? Let me show you how to cash out quick."',
    emoji: '👩🏾‍💻',
    bgColor: 'bg-purple-900'
  },
  {
    id: 2,
    name: 'Baker Amara',
    language: 'Yoruba',
    personality: '"Don't dull. Come and learn what will feed you."',
    emoji: '👩🏾‍🍳',
    bgColor: 'bg-amber-800'
  },
  {
    id: 3,
    name: 'Uncle Musa',
    language: 'Hausa',
    personality: '"Wallahi, I go teach you small skill wey go change your life."',
    emoji: '👨🏾‍🏫',
    bgColor: 'bg-green-900'
  },
  {
    id: 4,
    name: 'Aunty Nkem',
    language: 'Igbo',
    personality: '"Who dey breathe? You go sabi import from China sharp sharp."',
    emoji: '👩🏾‍💼',
    bgColor: 'bg-red-900'
  },
  {
    id: 5,
    name: 'Tech Tobi',
    language: 'Pidgin + English',
    personality: '"I go teach you code wey go blow your mind."',
    emoji: '👨🏾‍💻',
    bgColor: 'bg-blue-900'
  },
  {
    id: 6,
    name: 'Professor Lagbala',
    language: 'English',
    personality: '"Formal English, but make e still dey street."',
    emoji: '🧙🏾‍♂️',
    bgColor: 'bg-gray-800'
  }
];

const AvatarSelector = () => {
  return (
    <section id="avatars" className="py-20 slant-bg">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center">
          <span className="text-electric">AI AVATARS</span> WITH BIG VIBES
        </h2>
        <p className="text-xl text-center mb-12 max-w-2xl mx-auto">
          Choose your guide. Learn in your language. Get the knowledge from someone who gets you.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {avatars.map((avatar) => (
            <div key={avatar.id} className="avatar-card group">
              <div className={`${avatar.bgColor} p-6 h-full`}>
                <div className="flex justify-between items-start mb-4">
                  <div className="text-6xl animate-pulse-glow">{avatar.emoji}</div>
                  <span className="text-xs uppercase py-1 px-3 bg-electric text-black rounded-full font-bold">
                    {avatar.language}
                  </span>
                </div>
                <h3 className="text-2xl font-bold font-oswald mb-2">{avatar.name}</h3>
                <p className="text-gray-300 italic">{avatar.personality}</p>
                <div className="h-12"></div>
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="text-sm py-2 px-4 bg-electric text-black rounded-md font-bold transform transition-all hover:scale-105">
                    Select Guide
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AvatarSelector;
