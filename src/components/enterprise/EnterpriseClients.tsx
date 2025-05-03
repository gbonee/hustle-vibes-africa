
import React from 'react';

const EnterpriseClients = () => {
  const clients = [
    "Create Her Future Initiative",
    "Leap Africa",
    "Wave Academics",
    "Warri South Local Government"
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-title mb-8">OUR ENTERPRISE <span className="text-electric">CLIENTS</span></h2>
          <p className="text-xl mb-12 text-gray-300">Trusted by forward-thinking companies across Nigeria</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-center">
            {clients.map((client, index) => (
              <div key={index} className="flex items-center justify-center h-20 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition">
                <div className="p-4 rounded-full bg-white/10">
                  <span className="text-lg font-bold text-electric">{client}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnterpriseClients;
