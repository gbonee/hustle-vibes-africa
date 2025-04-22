
import React from 'react';
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

const comparisonData = [
  {
    without: "Broke, stressed",
    with: "Skillful & stacking money"
  },
  {
    without: "Watching TikTok",
    with: "Learning & winning giveaways"
  },
  {
    without: '"God abeg"',
    with: '"E choke! I just earned ₦10K!"'
  },
  {
    without: "Boring school teacher",
    with: "Funny AI that sounds like your big sis"
  }
];

const WhyWeExist = () => {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center">
          WHY WE <span className="text-electric">EXIST</span>
        </h2>
        
        <p className="text-2xl text-center mb-12 max-w-2xl mx-auto font-medium">
          Nigeria is hard. School didn't teach you how to make money.
          <span className="text-electric block mt-2">We will.</span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="meme-card p-6">
            <div className="text-center mb-4">
              <span className="text-6xl">📚</span>
              <h3 className="text-xl font-bold mt-2">Traditional School</h3>
              <p className="text-gray-400">Solving quadratic equations</p>
            </div>
          </div>
          
          <div className="meme-card bg-electric p-6">
            <div className="text-center mb-4">
              <span className="text-6xl">💰</span>
              <h3 className="text-xl font-bold mt-2 text-black">Usabi AI</h3>
              <p className="text-gray-800">Buying lace frontal in bulk</p>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-6">With vs Without Usabi</h3>
          <div className="meme-card overflow-hidden">
            <Table>
              <TableBody>
                {comparisonData.map((row, index) => (
                  <TableRow key={index} className="border-b border-electric/20">
                    <TableCell className="text-gray-400">{row.without}</TableCell>
                    <TableCell className="text-electric font-medium">{row.with}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyWeExist;
