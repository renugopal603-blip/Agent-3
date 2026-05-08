import React from 'react';
import Navbar from '../../components/common/Navbar';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { FacebookIcon, InstagramIcon, TwitterIcon, LinkedinIcon } from '../../components/common/SocialIcons';

const ContactPage = () => {
  const socialLinks = [
    { icon: <FacebookIcon />, color: 'hover:bg-blue-600', label: 'Facebook' },
    { icon: <InstagramIcon />, color: 'hover:bg-pink-600', label: 'Instagram' },
    { icon: <TwitterIcon />, color: 'hover:bg-sky-500', label: 'Twitter' },
    { icon: <LinkedinIcon />, color: 'hover:bg-blue-700', label: 'LinkedIn' },
  ];
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <Navbar />
      
      <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-5xl font-black text-text-primary-light dark:text-white tracking-tight">
            Get in <span className="text-primary-light">Touch</span>
          </h1>
          <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark max-w-2xl mx-auto">
            Have questions about our multi-agent platform or membership plans? Our team is here to help you 24/7.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <div className="space-y-8 animate-in slide-in-from-left duration-700">
            <div className="card-premium space-y-8 p-10 bg-gradient-to-br from-primary-light/5 to-transparent">
              <h3 className="text-2xl font-bold dark:text-white mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                {[
                  { icon: <Mail className="text-primary-light" />, label: 'Email Us', value: 'support@agenticstore.com', desc: 'Direct support for all inquiries' },
                  { icon: <Phone className="text-primary-light" />, label: 'Call Us', value: '+91 98765 43210', desc: 'Mon-Sat, 9am to 6pm IST' },
                  { icon: <MapPin className="text-primary-light" />, label: 'Our Head Office', value: '402, Business Hub, Mumbai, Maharashtra, India', desc: 'Visit us for a coffee!' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-12 h-12 bg-white dark:bg-secondary-dark rounded-xl shadow-lg flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs font-black text-text-secondary-light uppercase tracking-widest">{item.label}</p>
                      <p className="text-lg font-bold dark:text-white">{item.value}</p>
                      <p className="text-sm text-text-secondary-light mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t dark:border-border-dark">
                <p className="text-sm font-bold dark:text-white mb-4">Connect with us on Social Media</p>
                <div className="flex gap-4">
                  {socialLinks.map((social, i) => (
                    <div 
                      key={i} 
                      className={`w-10 h-10 bg-primary-light/10 text-primary-light rounded-lg flex items-center justify-center ${social.color} hover:text-white transition-all cursor-pointer group`}
                      title={social.label}
                    >
                      {social.icon}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card-premium p-10 animate-in slide-in-from-right duration-700">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-text-secondary-light uppercase tracking-widest">Full Name</label>
                  <input type="text" placeholder="John Doe" className="w-full px-4 py-3 bg-gray-50 dark:bg-secondary-dark border border-border-light dark:border-border-dark rounded-xl outline-none focus:ring-2 focus:ring-primary-light transition-all dark:text-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-text-secondary-light uppercase tracking-widest">Email Address</label>
                  <input type="email" placeholder="john@example.com" className="w-full px-4 py-3 bg-gray-50 dark:bg-secondary-dark border border-border-light dark:border-border-dark rounded-xl outline-none focus:ring-2 focus:ring-primary-light transition-all dark:text-white" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-text-secondary-light uppercase tracking-widest">Subject</label>
                <select className="w-full px-4 py-3 bg-gray-50 dark:bg-secondary-dark border border-border-light dark:border-border-dark rounded-xl outline-none focus:ring-2 focus:ring-primary-light transition-all dark:text-white">
                  <option>General Inquiry</option>
                  <option>Agent Registration</option>
                  <option>Shop Partnership</option>
                  <option>Membership Support</option>
                  <option>Technical Issue</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-text-secondary-light uppercase tracking-widest">Your Message</label>
                <textarea rows="5" placeholder="How can we help you today?" className="w-full px-4 py-3 bg-gray-50 dark:bg-secondary-dark border border-border-light dark:border-border-dark rounded-xl outline-none focus:ring-2 focus:ring-primary-light transition-all dark:text-white resize-none"></textarea>
              </div>

              <button type="button" onClick={() => alert('Message sent successfully! Our team will get back to you soon.')} className="w-full btn-primary py-4 rounded-xl font-black text-sm shadow-xl shadow-primary-light/20 flex items-center justify-center gap-2">
                <Send size={18} /> SEND MESSAGE
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer Simulation */}
      <footer className="py-12 border-t dark:border-border-dark bg-white dark:bg-surface-dark text-center">
        <p className="text-sm text-text-secondary-light">© 2026 AgenticStore Multi-Agent Platform. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ContactPage;
