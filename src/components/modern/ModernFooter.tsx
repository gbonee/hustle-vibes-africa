
import React from 'react';
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

const ModernFooter = () => {
  const footerLinks = {
    Product: [
      { label: 'Courses', href: '#' },
      { label: 'Live Sessions', href: '#' },
      { label: 'Bounties', href: '#' },
      { label: 'Community', href: '#' },
      { label: 'Certifications', href: '#' }
    ],
    Company: [
      { label: 'About', href: '#' },
      { label: 'Enterprise', href: '/enterprise' },
      { label: 'Careers', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Press', href: '#' }
    ],
    Resources: [
      { label: 'Help Center', href: '#' },
      { label: 'API Docs', href: '#' },
      { label: 'Tutorials', href: '#' },
      { label: 'Changelog', href: '#' },
      { label: 'Status', href: '#' }
    ],
    Legal: [
      { label: 'Privacy', href: '#' },
      { label: 'Terms', href: '#' },
      { label: 'Security', href: '#' },
      { label: 'Cookies', href: '#' }
    ]
  };

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-purple to-purple-dark rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">u</span>
              </div>
              <span className="text-2xl font-space font-bold text-gray-900">
                uSabi <span className="text-gradient">AI</span>
              </span>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Africa's premier AI learning platform. Master AI skills, earn real money, 
              and build the future of technology in Africa.
            </p>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-gray-400 hover:text-purple transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-space font-semibold text-gray-900 mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a 
                      href={link.href} 
                      className="text-gray-600 hover:text-purple transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © 2024 uSabi AI. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <span className="text-sm text-gray-500">Made with ❤️ in Africa</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ModernFooter;
