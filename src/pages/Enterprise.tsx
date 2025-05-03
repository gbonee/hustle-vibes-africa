
import React from 'react';
import Navbar from '@/components/Navbar';
import { Button } from "@/components/ui/button";
import { Check, Mail, ArrowRight, Building2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useNavigate } from "react-router-dom";

const Enterprise = () => {
  const handleRequestDemo = () => {
    console.log("Request demo clicked");
    // Open the Google Form in a new tab
    window.open("https://docs.google.com/forms/d/e/1FAIpQLSddajKguRwE_0pfsDpHM6T3xIg26G89kQlvtn2uQK9P1IqTZA/viewform", "_blank");
  };

  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      
      <section className="pt-28 pb-16 md:py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-electric/20 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-electric/20 rounded-full blur-3xl -z-10"></div>
        
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-4 bg-electric/20 text-electric hover:bg-electric/30 py-1.5 px-4 text-sm">
              For Enterprise
            </Badge>
            <h1 className="font-oswald uppercase font-bold text-5xl md:text-7xl tracking-tight mb-6 leading-none">
              <span className="block">SKILLS-FIRST</span> 
              <span className="block">EDUCATION FOR YOUR <span className="text-electric">WORKFORCE</span></span>
            </h1>
            
            <p className="text-xl md:text-2xl font-rubik mb-10 text-gray-300">
              Train your workforce with practical skills that drive real business outcomes, in their native languages.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={handleRequestDemo}
                className="rebel-button text-lg group"
              >
                Request Demo
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
            
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center p-6 border border-electric/30 rounded-xl bg-black/50 hover:bg-black/70 transition">
                <Building2 className="h-10 w-10 text-electric mb-4" />
                <h3 className="text-xl font-bold mb-2">Local Language Support</h3>
                <p className="text-gray-400">Train in Pidgin, Yoruba, Hausa, Igbo and more.</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 border border-electric/30 rounded-xl bg-black/50 hover:bg-black/70 transition">
                <Building2 className="h-10 w-10 text-electric mb-4" />
                <h3 className="text-xl font-bold mb-2">Skills Certification</h3>
                <p className="text-gray-400">Verifiable skills certification for your team.</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6 border border-electric/30 rounded-xl bg-black/50 hover:bg-black/70 transition">
                <Building2 className="h-10 w-10 text-electric mb-4" />
                <h3 className="text-xl font-bold mb-2">Customized Training</h3>
                <p className="text-gray-400">Built specifically for your business needs.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
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
      
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="section-title mb-8">OUR ENTERPRISE <span className="text-electric">CLIENTS</span></h2>
            <p className="text-xl mb-12 text-gray-300">Trusted by forward-thinking companies across Nigeria</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-center">
              <div className="flex items-center justify-center h-20 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition">
                <div className="p-4 rounded-full bg-white/10">
                  <span className="text-2xl font-bold text-electric">Company 1</span>
                </div>
              </div>
              <div className="flex items-center justify-center h-20 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition">
                <div className="p-4 rounded-full bg-white/10">
                  <span className="text-2xl font-bold text-electric">Company 2</span>
                </div>
              </div>
              <div className="flex items-center justify-center h-20 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition">
                <div className="p-4 rounded-full bg-white/10">
                  <span className="text-2xl font-bold text-electric">Company 3</span>
                </div>
              </div>
              <div className="flex items-center justify-center h-20 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition">
                <div className="p-4 rounded-full bg-white/10">
                  <span className="text-2xl font-bold text-electric">Company 4</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="section-title">FREQUENTLY ASKED <span className="text-electric">QUESTIONS</span></h2>
            </div>
            
            <div className="space-y-6">
              <Card className="bg-black border-electric/30">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">How does the enterprise program differ from regular courses?</h3>
                  <p className="text-gray-400">Enterprise programs are customized to your organization's specific needs, with dedicated support, analytics, and bulk licensing options.</p>
                </CardContent>
              </Card>
              
              <Card className="bg-black border-electric/30">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">Can we integrate with our existing learning management system?</h3>
                  <p className="text-gray-400">Yes, we offer integrations with popular LMS platforms and can work with your IT team for custom solutions.</p>
                </CardContent>
              </Card>
              
              <Card className="bg-black border-electric/30">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">How do you measure ROI for our training investment?</h3>
                  <p className="text-gray-400">We provide comprehensive analytics that track skill acquisition, completion rates, and can work with you to establish KPIs tied to business outcomes.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      <section id="enterprise-cta" className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <Alert className="mb-8 border-electric bg-electric/10">
              <AlertDescription className="text-center">
                Limited spots available for enterprise partnerships in Q3 2025
              </AlertDescription>
            </Alert>
            
            <h2 className="text-4xl md:text-5xl font-oswald uppercase mb-6">
              Ready to transform your <span className="text-electric">workforce</span>?
            </h2>
            
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Schedule a consultation with our enterprise team to discuss how uSabi AI can help your organization develop practical skills at scale.
            </p>
            
            <Button 
              onClick={handleRequestDemo}
              className="rebel-button text-lg py-6 px-10 text-xl"
            >
              <Mail className="mr-2 h-5 w-5" />
              Request Demo
            </Button>
            
            <p className="mt-6 text-sm text-gray-400">
              Our team will respond within 24 hours to schedule your consultation
            </p>
          </div>
        </div>
      </section>
      
      <footer className="bg-black py-8 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <img 
                src="/lovable-uploads/20591bbc-87c9-4bbc-8159-3e4becbee8c8.png" 
                alt="uSabi AI Owl Mascot" 
                className="h-8 w-auto" 
              />
              <span className="text-2xl font-oswald font-bold text-electric">
                uSabi <span className="text-white">AI</span>
              </span>
            </div>
            <p className="text-sm text-gray-400">
              © 2025 uSabi AI. Education for the streets, by the streets.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Enterprise;
