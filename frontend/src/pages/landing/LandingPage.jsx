import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import Hero from '../../components/landing/Hero';
import HowItWorks from '../../components/landing/HowItWorks';
import ServicesProducts from '../../components/landing/ServicesProducts';
import ShopPartner from '../../components/landing/ShopPartner';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <ServicesProducts />
        <ShopPartner />
        
        {/* Additional Sections can be added here */}
        <section className="py-24 bg-primary-light dark:bg-primary-dark text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-8">Ready to experience local luxury?</h2>
            <p className="text-xl opacity-90 mb-12 max-w-2xl mx-auto">
              Join thousands of members enjoying exclusive benefits and priority services every day.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/register" className="px-10 py-4 bg-white text-primary-light font-bold rounded-xl hover:bg-opacity-90 transition-all">Get Started Now</Link>
              <a href="#how-it-works" className="px-10 py-4 bg-transparent border-2 border-white font-bold rounded-xl hover:bg-white/10 transition-all text-center">Learn More</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
