
import React from 'react';

const StatsSection = () => {
  const stats = [
    {
      number: "2,500+",
      label: "Active Learners",
      description: "Across 36 African countries"
    },
    {
      number: "₦2.5M+",
      label: "Earned by Community",
      description: "Through bounties and projects"
    },
    {
      number: "150+",
      label: "AI Projects Completed",
      description: "Real-world applications built"
    },
    {
      number: "95%",
      label: "Success Rate",
      description: "Learners complete their tracks"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-r from-purple to-purple-dark">
      <div className="container mx-auto text-center">
        <h2 className="heading-lg text-white mb-16">
          Empowering Africa's AI future
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={stat.label}
              className="text-center animate-on-scroll"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-5xl md:text-6xl font-space font-bold text-yellow-bright mb-2 glow-purple">
                {stat.number}
              </div>
              <div className="text-xl font-semibold text-white mb-2">
                {stat.label}
              </div>
              <div className="text-purple-light">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
