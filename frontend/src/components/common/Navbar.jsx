import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Sun, Moon, ShoppingCart, User, LogOut } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/#' },
    { name: 'Services', path: '/#services' },
    { name: 'Shops', path: '/#shops' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/80 dark:bg-secondary-dark/80 backdrop-blur-lg shadow-lg py-2' : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary-light dark:bg-primary-dark rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <span className={`font-bold text-2xl ${scrolled ? 'text-text-primary-light dark:text-text-primary-dark' : 'text-primary-light dark:text-primary-dark'}`}>
              Agentic<span className="text-accent-light dark:text-accent-dark">Store</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              link.path.startsWith('/#') ? (
                <a
                  key={link.name}
                  href={link.path}
                  className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary-light dark:hover:text-primary-dark font-medium transition-colors"
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary-light dark:hover:text-primary-dark font-medium transition-colors"
                >
                  {link.name}
                </Link>
              )
            ))}
            
            <div className="flex items-center space-x-4 border-l border-border-light dark:border-border-dark pl-6">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {isDarkMode ? <Sun className="text-accent-dark w-5 h-5" /> : <Moon className="text-secondary-light w-5 h-5" />}
              </button>

              {user ? (
                <div className="flex items-center space-x-4">
                  <Link to={`/dashboard/${user.role.toLowerCase().replace(' ', '-')}`} className="btn-primary py-2 px-4 text-sm">
                    Dashboard
                  </Link>
                  <button onClick={handleLogout} className="p-2 text-error hover:bg-error/10 rounded-full transition-colors">
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link to="/login" className="text-text-primary-light dark:text-text-primary-dark font-semibold hover:text-primary-light dark:hover:text-primary-dark">
                    Login
                  </Link>
                  <Link to="/register" className="btn-primary py-2 px-6 text-sm">
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button onClick={toggleTheme} className="p-2 rounded-full">
              {isDarkMode ? <Sun className="text-accent-dark w-5 h-5" /> : <Moon className="text-secondary-light w-5 h-5" />}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-text-primary-light dark:text-text-primary-dark">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-secondary-dark border-t dark:border-border-dark animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              link.path.startsWith('/#') ? (
                <a
                  key={link.name}
                  href={link.path}
                  className="block px-3 py-2 text-text-secondary-light dark:text-text-secondary-dark hover:text-primary-light dark:hover:text-primary-dark font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.path}
                  className="block px-3 py-2 text-text-secondary-light dark:text-text-secondary-dark hover:text-primary-light dark:hover:text-primary-dark font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              )
            ))}
            {!user && (
              <>
                <Link to="/login" className="block px-3 py-2 text-primary-light dark:text-primary-dark font-bold">Login</Link>
                <Link to="/register" className="block px-3 py-2 text-primary-light dark:text-primary-dark font-bold">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
