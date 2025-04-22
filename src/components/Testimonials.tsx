
import React from 'react';
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: 'Chike O.',
    avatar: '👨🏾',
    location: 'Lagos',
    text: '"Bruhhh! Usabi no be scam! I learn pastry hustle, now I don blow. My mama dey call me businessman. That Digital Mama avatar na correct babe!"',
    rating: 5,
    course: 'Pastry Biz'
  },
  {
    id: 2,
    name: 'Amina T.',
    avatar: '👩🏾‍🦱',
    location: 'Kano',
    text: '"Wallahi, the import hustle don change my life! Uncle Musa teach me how to find China connect, now I dey sell on WhatsApp, money dey flow. Mad oh!"',
    rating: 5,
    course: 'Import Hustle'
  },
  {
    id: 3,
    name: 'Efe D.',
    avatar: '🧔🏾',
    location: 'Warri',
    text: '"Wetin school dey teach? Nothing! Usabi AI show me say I fit learn tech without degree. Now I don get job for US company. Dem dey pay dollars! I don arrive!"',
    rating: 5,
    course: 'Tech Job'
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center mb-4">
          <span className="text-electric">STREETS</span> IS TALKING
        </h2>
        <p className="text-xl text-center mb-12 max-w-2xl mx-auto">
          Don't believe us? Ask the people who don cash out already.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="meme-card bg-black p-6">
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">{testimonial.avatar}</span>
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-400">{testimonial.location}</p>
                </div>
                <div className="ml-auto">
                  <span className="text-xs font-bold bg-electric text-black py-1 px-2 rounded">
                    {testimonial.course}
                  </span>
                </div>
              </div>
              
              <div className="flex mb-3">
                {Array(testimonial.rating).fill(0).map((_, i) => (
                  <Star key={i} size={16} fill="#F5FF00" color="#F5FF00" />
                ))}
              </div>
              
              <p className="text-lg italic">{testimonial.text}</p>
              
              <div className="absolute -bottom-4 -right-4 bg-electric text-black font-bold transform rotate-12 py-1 px-4 text-sm">
                VERIFIED HUSTLE!
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
