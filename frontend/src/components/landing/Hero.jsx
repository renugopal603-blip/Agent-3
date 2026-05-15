import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Zap, Users, ShoppingBag } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-primary-light/5 dark:bg-primary-dark/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[500px] h-[500px] bg-accent-light/5 dark:bg-accent-dark/5 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left space-y-8">
            <div className="inline-flex items-center px-4 py-2 bg-primary-light/10 dark:bg-primary-dark/10 border border-primary-light/20 dark:border-primary-dark/20 rounded-full animate-bounce">
              <ShieldCheck className="text-primary-light dark:text-primary-dark w-5 h-5 mr-2" />
              <span className="text-primary-light dark:text-primary-dark font-semibold text-sm">Verified Agent-Managed Network</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold text-text-primary-light dark:text-text-primary-dark leading-[1.1]">
              One Premium <span className="text-primary-light dark:text-primary-dark">Membership.</span><br />
              <span className="text-accent-light dark:text-accent-dark">Unlimited</span> Local Benefits.
            </h1>
            
            <p className="text-xl text-text-secondary-light dark:text-text-secondary-dark max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Access hotels, groceries, hospitals, furniture, and products across districts with verified shops, fast delivery, and a powerful agent-managed network.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link to="/register" className="btn-primary px-12 py-4 text-lg w-full sm:w-auto">
                Join as Agent
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8">
              <div className="space-y-1">
                <p className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark">10K+</p>
                <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">Active Users</p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark">500+</p>
                <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">Partner Shops</p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark">100+</p>
                <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">Verified Agents</p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark">1 Hr</p>
                <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">Avg. Delivery</p>
              </div>
            </div>
          </div>

          {/* Right Visuals */}
          <div className="flex-1 relative w-full max-w-lg lg:max-w-none">
            <div className="relative z-10 animate-float">
              {/* Premium Card Mockup */}
              <div className="gold-gradient p-1 rounded-3xl shadow-2xl shadow-accent-light/30">
                <div className="bg-secondary-light rounded-[1.4rem] p-8 aspect-[1.6/1] relative overflow-hidden group">
                  {/* Background Image */}
                  <img 
                    src="/premium_member_card_bg_1777703148337.png" 
                    alt="Premium Member" 
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary-light via-secondary-light/40 to-transparent" />
                  
                  <div className="absolute top-0 right-0 p-6 z-10">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20">
                      <Zap className="text-accent-dark w-6 h-6" />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
