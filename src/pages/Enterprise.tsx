
import React from 'react';
import Navbar from '@/components/Navbar';
import EnterpriseHero from '@/components/enterprise/EnterpriseHero';
import EnterpriseBenefits from '@/components/enterprise/EnterpriseBenefits';
import EnterpriseClients from '@/components/enterprise/EnterpriseClients';
import EnterpriseFAQ from '@/components/enterprise/EnterpriseFAQ';
import EnterpriseCallToAction from '@/components/enterprise/EnterpriseCallToAction';
import EnterpriseFooter from '@/components/enterprise/EnterpriseFooter';

const Enterprise = () => {
  const handleRequestDemo = () => {
    console.log("Request demo clicked");
    // Open Calendly in a new tab
    window.open("https://calendly.com/ella-usabi/30min", "_blank");
  };

  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <EnterpriseHero onRequestDemo={handleRequestDemo} />
      <EnterpriseBenefits />
      <EnterpriseClients />
      <EnterpriseFAQ />
      <EnterpriseCallToAction onRequestDemo={handleRequestDemo} />
      <EnterpriseFooter />
    </div>
  );
};

export default Enterprise;
