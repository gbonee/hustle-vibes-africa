
import React from 'react';
import { BookOpen, Users, Trophy, Briefcase, Play, Zap } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: <Play className="w-8 h-8" />,
      title: "uSabi Live",
      description: "Interactive live AI sessions with expert instructors. Learn in real-time with your peers.",
      color: "purple"
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "AI Learning Tracks",
      description: "Structured courses from beginner to expert. Master Prompting, Chatbots, Workflows & more.",
      color: "yellow"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "uSabi Hustles",
      description: "Real AI bounties and projects. Earn money while building your portfolio and skills.",
      color: "purple"
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Certifications",
      description: "Industry-recognized certificates that boost your career and earning potential.",
      color: "yellow"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community",
      description: "Connect with 2,500+ African AI builders. Share projects, get feedback, collaborate.",
      color: "purple"
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: "Enterprise Training",
      description: "Custom AI upskilling programs for companies. Transform your team with AI superpowers.",
      color: "yellow"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-purple-light/5 to-yellow-bright/5">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="heading-lg mb-6">
            Everything you need to master <span className="text-gradient">AI</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From interactive live sessions to real bounties, we provide the complete ecosystem 
            for learning and earning with AI technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="feature-card group animate-on-scroll"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 ${
                feature.color === 'purple' 
                  ? 'bg-purple-light/20 text-purple group-hover:bg-purple group-hover:text-white' 
                  : 'bg-yellow-bright/20 text-yellow-800 group-hover:bg-yellow-bright group-hover:text-gray-900'
              } transition-all duration-300`}>
                {feature.icon}
              </div>
              
              <h3 className="heading-md mb-4 group-hover:text-purple transition-colors duration-300">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
