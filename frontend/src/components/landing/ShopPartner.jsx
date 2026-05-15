import React from 'react';
import { Link } from 'react-router-dom';
import { Store, TrendingUp, ShieldCheck, Clock } from 'lucide-react';

const ShopPartner = () => {
  const perks = [
    { title: '1 Month Free Trial', desc: 'Try our platform risk-free for 30 days.', icon: <Clock /> },
    { title: 'Local Reach', desc: 'Connect with thousands of premium members in your area.', icon: <TrendingUp /> },
    { title: 'Verified Status', desc: 'Gain trust with our official partner verification.', icon: <ShieldCheck /> },
    { title: 'Low Subscription', desc: 'Plans start as low as ₹500/month after trial.', icon: <Store /> }
  ];

  return (
    <section className="py-24 bg-background-light dark:bg-background-dark" id="shops">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 order-2 lg:order-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {perks.map((perk) => (
                <div key={perk.title} className="card-premium space-y-4">
                  <div className="p-3 bg-primary-light/10 dark:bg-primary-dark/10 text-primary-light dark:text-primary-dark w-fit rounded-xl">
                    {React.cloneElement(perk.icon, { size: 24 })}
                  </div>
                  <h4 className="font-bold text-text-primary-light dark:text-text-primary-dark">{perk.title}</h4>
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">{perk.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 order-1 lg:order-2 space-y-8">
            <h2 className="text-4xl font-bold text-text-primary-light dark:text-text-primary-dark">Grow Your Business as a <span className="text-primary-light dark:text-primary-dark">Partner Shop</span></h2>
            <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark">
              List your products or services on our premium platform. We handle the discovery and delivery, while you focus on providing the best quality.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-text-primary-light dark:text-text-primary-dark font-medium">
                <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center text-white text-xs">✓</div>
                Easy inventory management
              </div>
              <div className="flex items-center gap-4 text-text-primary-light dark:text-text-primary-dark font-medium">
                <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center text-white text-xs">✓</div>
                Real-time order tracking
              </div>
              <div className="flex items-center gap-4 text-text-primary-light dark:text-text-primary-dark font-medium">
                <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center text-white text-xs">✓</div>
                Transparent commission structure
              </div>
            </div>
            <Link to="/register" className="btn-primary py-4 px-10 w-fit">Register Your Shop</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopPartner;
