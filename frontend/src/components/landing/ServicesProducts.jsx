import React from 'react';
import { Link } from 'react-router-dom';
import { Hotel, ShoppingBasket, Stethoscope, Utensils, Scissors, Plane, Sofa, Laptop, Home, Package, ShieldCheck, TrendingUp, UserCheck } from 'lucide-react';

const ServicesProducts = () => {
  const services = [
    { name: 'Hotels', icon: <Hotel />, desc: 'Premium stays at local rates', type: 'service' },
    { name: 'Hospitals', icon: <Stethoscope />, desc: 'Priority healthcare access', type: 'service' },
    { name: 'Grocery', icon: <ShoppingBasket />, desc: 'Daily essentials delivered', type: 'service' },
    { name: 'Restaurants', icon: <Utensils />, desc: 'Fine dining & local eats', type: 'service' },
    { name: 'Salons', icon: <Scissors />, desc: 'Beauty & wellness services', type: 'service' },
    { name: 'Travel', icon: <Plane />, desc: 'Hassle-free local travel', type: 'service' }
  ];

  const products = [
    { name: 'Furniture', icon: <Sofa />, desc: 'Custom local craftsmanship', type: 'product' },
    { name: 'Electronics', icon: <Laptop />, desc: 'Latest gadgets with warranty', type: 'product' },
    { name: 'Appliances', icon: <Home />, desc: 'Smart home solutions', type: 'product' },
    { name: 'Local Items', icon: <Package />, desc: 'Unique district specialties', type: 'product' }
  ];

  return (
    <section className="py-24 bg-surface-light dark:bg-surface-dark" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-bold text-text-primary-light dark:text-text-primary-dark">Services & Products</h2>
          <p className="text-text-secondary-light dark:text-text-secondary-dark max-w-2xl mx-auto">
            Everything you need, managed by local experts and delivered to your doorstep.
          </p>
        </div>

        <div className="space-y-16">
          {/* Services */}
          <div>
            <h3 className="text-2xl font-bold text-primary-light dark:text-primary-dark mb-8 flex items-center gap-3">
              <span className="w-8 h-1 bg-primary-light dark:bg-primary-dark rounded-full"></span>
              Service-Based
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {services.map((item) => (
                <Link 
                  key={item.name} 
                  to={`/explore/${item.type}/${item.name}`}
                  className="card-premium group hover:-translate-y-2 text-center flex flex-col items-center cursor-pointer transition-all border-2 border-transparent hover:border-primary-light/30"
                >
                  <div className="w-16 h-16 bg-primary-light/10 dark:bg-primary-dark/10 rounded-2xl flex items-center justify-center text-primary-light dark:text-primary-dark mb-4 transition-transform group-hover:scale-110">
                    {React.cloneElement(item.icon, { size: 32 })}
                  </div>
                  <h4 className="font-bold dark:text-white mb-1">{item.name}</h4>
                  <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">{item.desc}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-2xl font-bold text-accent-light dark:text-accent-dark mb-8 flex items-center gap-3 text-right justify-end">
              Product-Based
              <span className="w-8 h-1 bg-accent-light dark:bg-accent-dark rounded-full"></span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {products.map((item) => (
                <Link 
                  key={item.name} 
                  to={`/explore/${item.type}/${item.name}`}
                  className="card-premium group hover:-translate-y-2 text-center flex flex-col items-center cursor-pointer transition-all border-2 border-transparent hover:border-accent-light/30"
                >
                  <div className="w-16 h-16 bg-accent-light/10 dark:bg-accent-dark/10 rounded-2xl flex items-center justify-center text-accent-light dark:text-accent-dark mb-4 transition-transform group-hover:scale-110">
                    {React.cloneElement(item.icon, { size: 32 })}
                  </div>
                  <h4 className="font-bold dark:text-white mb-1">{item.name}</h4>
                  <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">{item.desc}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* New Why Choose Us Section */}
          <div className="pt-16 border-t dark:border-border-dark">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'Quality Assured', desc: 'Every service provider and shop is manually verified by our district agents.', icon: <ShieldCheck className="text-success" /> },
                { title: 'Local Speed', desc: 'Since we operate at a pincode level, services are faster than any national platform.', icon: <TrendingUp className="text-primary-light" /> },
                { title: '24/7 Support', desc: 'Your local agent is always available to resolve any issues or queries.', icon: <UserCheck className="text-accent-light" /> }
              ].map((feature, i) => (
                <div key={i} className="flex gap-4">
                  <div className="mt-1">{React.cloneElement(feature.icon, { size: 24 })}</div>
                  <div>
                    <h4 className="font-bold dark:text-white">{feature.title}</h4>
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mt-1 leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesProducts;
