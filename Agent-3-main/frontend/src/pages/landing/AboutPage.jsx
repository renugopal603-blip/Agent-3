import React, { useEffect } from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import { ShieldCheck, Users, Target, Globe, Award, Heart } from 'lucide-react';

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <Navbar />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h1 className="text-5xl lg:text-7xl font-black text-text-primary-light dark:text-text-primary-dark mb-6">
              Our <span className="text-primary-light">Mission.</span>
            </h1>
            <p className="text-xl text-text-secondary-light dark:text-text-secondary-dark max-w-3xl mx-auto leading-relaxed">
              We are building India's most trusted agent-managed retail network, bridging the gap between local shops and premium digital services.
            </p>
          </div>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-light/5 rounded-full blur-3xl -z-10 animate-pulse" />
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-gray-50 dark:bg-secondary-dark/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
              {[
                { label: 'Verified Agents', value: '500+', icon: <Users className="mx-auto mb-4 text-primary-light" /> },
                { label: 'Partner Shops', value: '2500+', icon: <Globe className="mx-auto mb-4 text-emerald-500" /> },
                { label: 'Active Members', value: '50k+', icon: <Award className="mx-auto mb-4 text-accent-light" /> },
                { label: 'Happy Customers', value: '100k+', icon: <Heart className="mx-auto mb-4 text-error" /> },
              ].map((stat, i) => (
                <div key={i} className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ delay: `${i * 100}ms` }}>
                  {stat.icon}
                  <h3 className="text-4xl font-black dark:text-white tracking-tight">{stat.value}</h3>
                  <p className="text-sm font-bold text-text-secondary-light uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center gap-16">
              <div className="flex-1 space-y-8">
                <h2 className="text-4xl font-black dark:text-white leading-tight">
                  Driving Innovation in <br />
                  <span className="text-primary-light">Hyperlocal Commerce</span>
                </h2>
                <p className="text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
                  At AgenticStore, we believe in the power of local connection. Our platform empowers neighborhood agents to become digital entrepreneurs, providing them with the tools to manage vast networks of retail partners and premium members.
                </p>
                <div className="space-y-4">
                  {[
                    'Trust-first verification for every shop',
                    'Transparent commission tracking for agents',
                    'Premium benefits for local community members',
                    'End-to-end digital business management'
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center">
                        <ShieldCheck size={14} />
                      </div>
                      <span className="text-sm font-bold dark:text-white">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-1">
                 <div className="relative p-2 bg-gradient-to-br from-primary-light to-emerald-500 rounded-[40px] shadow-2xl">
                    <div className="bg-white dark:bg-surface-dark rounded-[38px] p-8 overflow-hidden aspect-video flex items-center justify-center">
                       <Target size={80} className="text-primary-light opacity-20 absolute" />
                       <p className="text-center text-xl font-black dark:text-white relative z-10 italic">"Empowering the backbone of Indian commerce through technology and trust."</p>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
