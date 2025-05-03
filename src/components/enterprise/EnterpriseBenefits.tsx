
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";

const EnterpriseBenefits = () => {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center mb-16">
          WHY <span className="text-electric">ENTERPRISE</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <Card className="bg-black border-electric/30">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold mb-4">For Organizations</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Check className="text-electric mr-2 mt-1 flex-shrink-0" />
                  <span>Custom learning paths aligned with business goals</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-electric mr-2 mt-1 flex-shrink-0" />
                  <span>Reduce training costs with AI-based mentorship</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-electric mr-2 mt-1 flex-shrink-0" />
                  <span>Track employee progress and skill development</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-electric mr-2 mt-1 flex-shrink-0" />
                  <span>Multi-language support for diverse teams</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="bg-black border-electric/30">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold mb-4">For Employees</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Check className="text-electric mr-2 mt-1 flex-shrink-0" />
                  <span>Learn in their native language</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-electric mr-2 mt-1 flex-shrink-0" />
                  <span>24/7 AI mentor support</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-electric mr-2 mt-1 flex-shrink-0" />
                  <span>Practical skills with immediate application</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-electric mr-2 mt-1 flex-shrink-0" />
                  <span>Gamified learning to increase engagement</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default EnterpriseBenefits;
