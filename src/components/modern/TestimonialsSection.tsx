
import React from 'react';
import { Star } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Kemi Adebayo",
      role: "Digital Marketing Specialist",
      location: "Lagos, Nigeria",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b47c",
      quote: "uSabi AI transformed my career. I went from zero AI knowledge to earning ₦200k monthly from AI consulting. The live sessions in Yoruba made all the difference!",
      rating: 5
    },
    {
      name: "Emeka Okafor",
      role: "Tech Entrepreneur",
      location: "Abuja, Nigeria",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      quote: "The bounty system is genius. I've completed 12 AI projects and earned enough to start my own AI consultancy. uSabi doesn't just teach - it creates opportunities.",
      rating: 5
    },
    {
      name: "Fatima Hassan",
      role: "Operations Manager",
      location: "Kano, Nigeria",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
      quote: "Our team's productivity increased by 300% after the uSabi Enterprise program. The role-specific AI training was exactly what we needed.",
      rating: 5
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="heading-lg mb-6">
            Loved by <span className="text-gradient">2,500+ learners</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how African professionals are transforming their careers and businesses with AI
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.name}
              className="glass-card rounded-2xl p-8 hover:scale-105 transition-all duration-300 animate-on-scroll"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Rating */}
              <div className="flex items-center space-x-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-bright text-yellow-bright" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-gray-700 italic mb-6 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center space-x-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                  <div className="text-sm text-purple">{testimonial.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
