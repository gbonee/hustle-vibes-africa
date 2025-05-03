
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const EnterpriseFAQ = () => {
  const faqs = [
    {
      question: "How does the enterprise program differ from regular courses?",
      answer: "Enterprise programs are customized to your organization's specific needs, with dedicated support, analytics, and bulk licensing options."
    },
    {
      question: "Can we integrate with our existing learning management system?",
      answer: "Yes, we offer integrations with popular LMS platforms and can work with your IT team for custom solutions."
    },
    {
      question: "How do you measure ROI for our training investment?",
      answer: "We provide comprehensive analytics that track skill acquisition, completion rates, and can work with you to establish KPIs tied to business outcomes."
    }
  ];

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title">FREQUENTLY ASKED <span className="text-electric">QUESTIONS</span></h2>
          </div>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="bg-black border-electric/30">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{faq.question}</h3>
                  <p className="text-gray-400">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnterpriseFAQ;
