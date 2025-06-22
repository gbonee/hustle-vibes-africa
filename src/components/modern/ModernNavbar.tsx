
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const ModernNavbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: 'Courses', href: '#courses' },
    { label: 'Live Sessions', href: '#live' },
    { label: 'Bounties', href: '#bounties' },
    { label: 'Enterprise', href: '/enterprise' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-purple to-purple-dark rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">u</span>
            </div>
            <span className="text-2xl font-space font-bold text-gray-900">
              uSabi <span className="text-gradient">AI</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="nav-link"
                onClick={item.href.startsWith('/') ? () => navigate(item.href) : undefined}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/auth')}
              className="btn-ghost"
            >
              Sign In
            </Button>
            <Button 
              onClick={() => navigate('/auth')}
              className="btn-primary"
            >
              Join uSabi Pro
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-slide-up">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="nav-link py-2"
                  onClick={item.href.startsWith('/') ? () => navigate(item.href) : undefined}
                >
                  {item.label}
                </a>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                <Button 
                  variant="ghost" 
                  onClick={() => navigate('/auth')}
                  className="btn-ghost w-full"
                >
                  Sign In
                </Button>
                <Button 
                  onClick={() => navigate('/auth')}
                  className="btn-primary w-full"
                >
                  Join uSabi Pro
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default ModernNavbar;
