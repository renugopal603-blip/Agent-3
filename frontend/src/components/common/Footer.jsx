import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Share2, MessageSquare, Link2, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary-light dark:bg-secondary-dark text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary-dark rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="font-bold text-2xl text-white">
                Agentic<span className="text-accent-dark">Store</span>
              </span>
            </Link>
            <p className="text-text-secondary-dark leading-relaxed">
              Premium membership platform connecting local businesses, professional agents, and discerning customers across every district.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-surface-dark hover:bg-primary-dark transition-colors rounded-lg"><Globe size={20} /></a>
              <a href="#" className="p-2 bg-surface-dark hover:bg-primary-dark transition-colors rounded-lg"><Share2 size={20} /></a>
              <a href="#" className="p-2 bg-surface-dark hover:bg-primary-dark transition-colors rounded-lg"><MessageSquare size={20} /></a>
              <a href="#" className="p-2 bg-surface-dark hover:bg-primary-dark transition-colors rounded-lg"><Link2 size={20} /></a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-accent-dark">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link to="/plans" className="text-text-secondary-dark hover:text-white transition-colors">Membership Plans</Link></li>
              <li><Link to="/services" className="text-text-secondary-dark hover:text-white transition-colors">Local Services</Link></li>
              <li><Link to="/shops" className="text-text-secondary-dark hover:text-white transition-colors">Partner Shops</Link></li>
              <li><Link to="/apply-agent" className="text-text-secondary-dark hover:text-white transition-colors">Become an Agent</Link></li>
              <li><Link to="/register-shop" className="text-text-secondary-dark hover:text-white transition-colors">Register Shop</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-accent-dark">Support</h4>
            <ul className="space-y-4">
              <li><Link to="/help" className="text-text-secondary-dark hover:text-white transition-colors">Help Center</Link></li>
              <li><Link to="/terms" className="text-text-secondary-dark hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-text-secondary-dark hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/contact" className="text-text-secondary-dark hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="text-text-secondary-dark hover:text-white transition-colors">FAQs</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-accent-dark">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-text-secondary-dark">
                <MapPin className="text-primary-dark shrink-0 mt-1" size={20} />
                <span>123 Premium Business Hub, District Center, Metropolis</span>
              </li>
              <li className="flex items-center space-x-3 text-text-secondary-dark">
                <Phone className="text-primary-dark shrink-0" size={20} />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-3 text-text-secondary-dark">
                <Mail className="text-primary-dark shrink-0" size={20} />
                <span>support@agenticstore.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border-dark text-center">
          <p className="text-text-secondary-dark text-sm">
            © {new Date().getFullYear()} AgenticStore. All rights reserved. Premium Multi-Agent Platform.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
