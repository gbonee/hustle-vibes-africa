
import React from 'react';
import { Zap, Users, Trophy, BookOpen, DollarSign, Globe } from 'lucide-react';

const FeaturesShowcase = () => {
  const features = [
    {
      icon: <BookOpen className="text-electric" size={32} />,
      title: "USABI Learn",
      description: "Master skills in your native language with AI-powered courses",
      gradient: "from-electric/20 to-yellow-600/10"
    },
    {
      icon: <DollarSign className="text-purple-400" size={32} />,
      title: "Bounty Board",
      description: "Earn real money completing AI projects for Nigerian startups",
      gradient: "from-purple-500/20 to-purple-900/10",
      isPro: true
    },
    {
      icon: <Users className="text-blue-400" size={32} />,
      title: "USABI Live",
      description: "Join live sessions with expert mentors and fellow learners",
      gradient: "from-blue-500/20 to-blue-900/10"
    },
    {
      icon: <Trophy className="text-orange-400" size={32} />,
      title: "Leaderboard",
      description: "Compete with builders across Africa and showcase your skills",
      gradient: "from-orange-500/20 to-orange-900/10"
    },
    {
      icon: <Zap className="text-red-400" size={32} />,
      title: "AI Certifications",
      description: "Get industry-recognized certificates that open doors",
      gradient: "from-red-500/20 to-red-900/10"
    },
    {
      icon: <Globe className="text-green-400" size={32} />,
      title: "Global Community",
      description: "Connect with 10K+ African builders changing the continent",
      gradient: "from-green-500/20 to-green-900/10"
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-oswald font-bold text-white mb-4">
            Everything You Need to
            <span className="text-electric"> Build & Earn</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From foundational skills to advanced AI automation, we've got your entire learning journey covered
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-8 bg-gradient-to-br ${feature.gradient} backdrop-blur-sm border border-gray-700/50 hover:border-gray-600 transition-all duration-300 hover:scale-105`}
            >
              {feature.isPro && (
                <div className="absolute -top-3 -right-3">
                  <span className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    PRO
                  </span>
                </div>
              )}
              
              <div className="mb-6">
                {feature.icon}
              </div>
              
              <h3 className="text-xl font-bold text-white mb-4">
                {feature.title}
              </h3>
              
              <p className="text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesShowcase;
