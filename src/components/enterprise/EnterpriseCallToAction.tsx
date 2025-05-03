
import React from 'react';
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface EnterpriseCallToActionProps {
  onRequestDemo: () => void;
}

const EnterpriseCallToAction: React.FC<EnterpriseCallToActionProps> = ({ onRequestDemo }) => {
  return (
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
            onClick={onRequestDemo}
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
  );
};

export default EnterpriseCallToAction;
