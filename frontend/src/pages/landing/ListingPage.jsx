import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import { 
  Search, Filter, MapPin, Star, Clock, 
  ChevronRight, ArrowLeft, ShoppingBag, 
  ShieldCheck, Info, Tag
} from 'lucide-react';

const ListingPage = () => {
  const { type, category } = useParams();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  // Mock data generator based on category
  useEffect(() => {
    setLoading(true);
    // Simulate API fetch
    setTimeout(() => {
      const mockItems = Array.from({ length: 8 }).map((_, i) => ({
        id: i + 1,
        name: `${category} ${i + 1} - Premium ${category === 'Hotels' ? 'Stay' : category === 'Hospitals' ? 'Care' : 'Collection'}`,
        description: `Experience the best ${category.toLowerCase()} in your district with verified quality and priority service.`,
        price: category === 'Hotels' ? 2500 + i * 500 : category === 'Grocery' ? 150 + i * 20 : 5000 + i * 1000,
        rating: 4.5 + (i % 5) * 0.1,
        reviews: 120 + i * 15,
        location: `${10 + i * 2}km from your location`,
        status: 'Verified',
        image: `/placeholder_${category.toLowerCase()}_${i % 3 + 1}.png`,
        tags: [category, type === 'service' ? 'Quick Service' : 'Fast Delivery']
      }));
      setItems(mockItems);
      setLoading(false);
    }, 800);
  }, [category, type]);

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs & Title */}
          <div className="mb-12 animate-in slide-in-from-left duration-700">
            <Link to="/" className="inline-flex items-center text-sm font-bold text-text-secondary-light hover:text-primary-light transition-colors mb-6 group">
              <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Home
            </Link>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <span className="text-xs font-black uppercase tracking-[0.2em] text-primary-light mb-2 block">
                  Exploring {type}s
                </span>
                <h1 className="text-5xl font-black text-text-primary-light dark:text-white tracking-tight">
                  Premium <span className="text-primary-light">{category}</span>
                </h1>
              </div>
              
              {/* Search Bar */}
              <div className="relative w-full md:w-96 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary-light group-focus-within:text-primary-light transition-colors" size={20} />
                <input 
                  type="text" 
                  placeholder={`Search ${category}...`} 
                  className="w-full pl-12 pr-4 py-4 bg-white dark:bg-secondary-dark border border-border-light dark:border-border-dark rounded-2xl outline-none focus:ring-4 focus:ring-primary-light/10 focus:border-primary-light transition-all dark:text-white shadow-sm"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Sidebar Filters */}
            <aside className="w-full lg:w-64 space-y-8 animate-in slide-in-from-left duration-700">
              <div className="card-premium p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-black text-sm uppercase tracking-widest dark:text-white">Filters</h3>
                  <Filter size={16} className="text-text-secondary-light" />
                </div>
                
                <div className="space-y-4">
                  <p className="text-xs font-bold text-text-secondary-light uppercase tracking-widest">Price Range</p>
                  <div className="space-y-2">
                    {['Under ₹1000', '₹1000 - ₹5000', '₹5000+'].map(range => (
                      <label key={range} className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" className="w-4 h-4 rounded border-border-light text-primary-light focus:ring-primary-light" />
                        <span className="text-sm text-text-secondary-light group-hover:text-primary-light transition-colors">{range}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t dark:border-border-dark space-y-4">
                  <p className="text-xs font-bold text-text-secondary-light uppercase tracking-widest">Ratings</p>
                  <div className="space-y-2">
                    {[4, 3, 2].map(star => (
                      <label key={star} className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" className="w-4 h-4 rounded border-border-light text-primary-light focus:ring-primary-light" />
                        <span className="text-sm text-text-secondary-light flex items-center group-hover:text-primary-light transition-colors">
                          {star}+ <Star size={12} className="ml-1 fill-warning text-warning" />
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <button className="w-full py-3 bg-gray-50 dark:bg-background-dark text-xs font-black uppercase tracking-widest rounded-xl hover:bg-primary-light hover:text-white transition-all">
                  Reset All
                </button>
              </div>

              {/* Verified Badge Info */}
              <div className="p-6 bg-primary-light/5 border border-primary-light/10 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-primary-light">
                  <ShieldCheck size={20} />
                  <span className="font-bold text-sm">Verified Network</span>
                </div>
                <p className="text-xs text-text-secondary-light leading-relaxed">
                  All listings in this category are manually verified by our district agents for quality assurance.
                </p>
              </div>
            </aside>

            {/* Grid Content */}
            <div className="flex-1">
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-96 bg-white dark:bg-secondary-dark rounded-3xl animate-pulse border border-border-light dark:border-border-dark"></div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in zoom-in duration-500">
                  {items.map((item) => (
                    <div key={item.id} className="card-premium group overflow-hidden flex flex-col h-full border-2 border-transparent hover:border-primary-light/20 transition-all">
                      {/* Image Area */}
                      <div className="relative h-56 bg-gray-100 dark:bg-background-dark overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute top-4 left-4 z-20 flex gap-2">
                          {item.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 bg-white/90 dark:bg-secondary-dark/90 backdrop-blur-md text-[10px] font-black uppercase tracking-widest rounded-full shadow-sm">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="absolute top-4 right-4 z-20">
                          <div className="w-10 h-10 bg-white/90 dark:bg-secondary-dark/90 backdrop-blur-md rounded-full flex items-center justify-center text-primary-light shadow-sm">
                            <ShieldCheck size={20} />
                          </div>
                        </div>
                        {/* Mock Image Placeholder */}
                        <div className="w-full h-full flex items-center justify-center text-text-secondary-light/20">
                          <ShoppingBag size={64} />
                        </div>
                        <div className="absolute bottom-4 left-4 z-20 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <p className="text-xs font-bold flex items-center gap-1">
                            <MapPin size={12} /> {item.location}
                          </p>
                        </div>
                      </div>

                      {/* Content Area */}
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-xl font-bold dark:text-white group-hover:text-primary-light transition-colors leading-tight">
                            {item.name}
                          </h3>
                          <div className="flex items-center gap-1 px-2 py-1 bg-warning/10 text-warning rounded-lg text-xs font-bold shrink-0">
                            <Star size={12} className="fill-warning" /> {item.rating}
                          </div>
                        </div>
                        
                        <p className="text-sm text-text-secondary-light mb-6 line-clamp-2">
                          {item.description}
                        </p>

                        <div className="mt-auto pt-6 border-t dark:border-border-dark flex items-center justify-between">
                          <div>
                            <p className="text-[10px] font-black text-text-secondary-light uppercase tracking-widest mb-1">Price starts from</p>
                            <p className="text-2xl font-black text-primary-light">
                              ₹{item.price.toLocaleString()}
                              <span className="text-xs text-text-secondary-light font-bold ml-1">{category === 'Hotels' ? '/ night' : ''}</span>
                            </p>
                          </div>
                          <button className="px-6 py-3 bg-primary-light text-white font-black text-xs uppercase tracking-widest rounded-xl hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary-light/30">
                            {type === 'service' ? 'Book Now' : 'Add to Cart'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ListingPage;
