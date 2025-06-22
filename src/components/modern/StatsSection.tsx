
import React from 'react';
import { Users, BookOpen, Trophy, DollarSign } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    {
      icon: <Users className="text-electric" size={32} />,
      number: "10,000+",
      label: "Active Learners",
      description: "Across Nigeria & Africa"
    },
    {
      icon: <BookOpen className="text-purple-400" size={32} />,
      number: "500+",
      label: "Skills Courses",
      description: "In local languages"
    },
    {
      icon: <DollarSign className="text-green-400" size={32} />,
      number: "₦420K+",
      label: "Average Pro Earnings",
      description: "Monthly for AI builders"
    },
    {
      icon: <Trophy className="text-orange-400" size={32} />,
      number: "2,500+",
      label: "Certificates Issued",
      description: "Verified achievements"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gray-900/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-oswald font-bold text-white mb-4">
            Empowering Africa's
            <span className="text-electric"> Next Generation</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join thousands of Africans already building their future with AI and vocational skills
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-2xl bg-black/40 backdrop-blur-sm border border-gray-700/50 hover:border-gray-600 transition-all duration-300"
            >
              <div className="mb-4 flex justify-center">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">
                {stat.number}
              </h3>
              <p className="text-lg font-semibold text-gray-200 mb-1">
                {stat.label}
              </p>
              <p className="text-sm text-gray-400">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
