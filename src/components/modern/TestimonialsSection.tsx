
import React from 'react';
import { Star, Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Adunni Olanrewaju",
      role: "Fashion Designer",
      location: "Lagos, Nigeria",
      track: "core",
      image: "A",
      testimonial: "USABI Core helped me learn fashion design in Yoruba. Now I'm running my own boutique!",
      rating: 5
    },
    {
      name: "Kemi Adeleke",
      role: "AI Automation Specialist",
      location: "Abuja, Nigeria",
      track: "pro",
      image: "K",
      testimonial: "USABI Pro changed my life. I've earned over ₦800K building AI chatbots for startups.",
      rating: 5
    },
    {
      name: "Ibrahim Musa",
      role: "HVAC Technician",
      location: "Kano, Nigeria",
      track: "core",
      image: "I",
      testimonial: "Learning HVAC in Hausa made everything so clear. Now I have my own business.",
      rating: 5
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-oswald font-bold text-white mb-4">
            Success Stories from
            <span className="text-electric"> Real Builders</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            See how USABI is transforming lives across Africa
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-8 backdrop-blur-sm border transition-all duration-300 hover:scale-105 ${
                testimonial.track === 'pro'
                  ? 'bg-gradient-to-br from-purple-900/40 to-purple-800/20 border-purple-500/50'
                  : 'bg-gradient-to-br from-electric/10 to-yellow-600/5 border-electric/30'
              }`}
            >
              <Quote 
                className={`absolute top-4 right-4 opacity-20 ${
                  testimonial.track === 'pro' ? 'text-purple-400' : 'text-electric'
                }`} 
                size={32} 
              />
              
              <div className="flex items-center mb-6">
                <div 
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4 ${
                    testimonial.track === 'pro' ? 'bg-purple-500' : 'bg-electric text-black'
                  }`}
                >
                  {testimonial.image}
                </div>
                <div>
                  <h4 className="text-white font-semibold">{testimonial.name}</h4>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  <p className="text-gray-500 text-xs">{testimonial.location}</p>
                </div>
              </div>

              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 fill-current" size={16} />
                ))}
              </div>

              <p className="text-gray-300 leading-relaxed">
                "{testimonial.testimonial}"
              </p>

              {testimonial.track === 'pro' && (
                <div className="mt-4 pt-4 border-t border-purple-500/30">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-300">
                    USABI Pro Member
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
