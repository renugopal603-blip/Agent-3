import React from 'react';
import { UserPlus, Store, Truck, ShieldCheck } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      title: '1. Register Your Account',
      description: 'Sign up for free and get access to the ultimate hyper-local commerce network in your area.',
      icon: <UserPlus className="w-8 h-8 text-primary-light dark:text-primary-dark" />,
    },
    {
      title: '2. Connect with Local Agents',
      description: 'Our dedicated agents help you find the best deals and onboard your favorite local shops.',
      icon: <ShieldCheck className="w-8 h-8 text-primary-light dark:text-primary-dark" />,
    },
    {
      title: '3. Shop Verified Stores',
      description: 'Browse products and services from trusted, KYC-verified local businesses.',
      icon: <Store className="w-8 h-8 text-primary-light dark:text-primary-dark" />,
    },
    {
      title: '4. Hyper-Local Delivery',
      description: 'Enjoy lightning-fast delivery and seamless service right to your doorstep.',
      icon: <Truck className="w-8 h-8 text-primary-light dark:text-primary-dark" />,
    }
  ];

  return (
    <section className="py-24 bg-background-light dark:bg-background-dark" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-bold text-text-primary-light dark:text-text-primary-dark">How AgenticStore Works</h2>
          <p className="text-text-secondary-light dark:text-text-secondary-dark max-w-2xl mx-auto">
            A seamless ecosystem connecting customers, local shops, and dedicated agents to create the perfect shopping experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting line for desktop */}
          <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-transparent via-primary-light/20 to-transparent dark:via-primary-dark/20 z-0"></div>
          
          {steps.map((step, index) => (
            <div 
              key={index}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              <div className="w-24 h-24 bg-white dark:bg-surface-dark border-4 border-background-light dark:border-background-dark rounded-full shadow-xl shadow-primary-light/10 dark:shadow-none flex items-center justify-center mb-6 group-hover:-translate-y-2 transition-transform duration-300">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark mb-3">{step.title}</h3>
              <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
