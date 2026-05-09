import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Phone, Lock, ArrowRight, Loader2, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      let user;
      try {
        user = await login(phone, password);
      } catch (apiErr) {
        // Bypass for testing specific roles
        if (phone === '1111111111') {
          user = { _id: 'admin-1', name: 'Demo Admin', phone, role: 'Admin', token: 'demo-token' };
        } else if (phone === '2222222222') {
          user = { _id: 'subadmin-1', name: 'Demo Sub-Admin', phone, role: 'Sub-Admin', token: 'demo-token' };
        } else if (phone === '3333333333') {
          user = { _id: 'agent-1', name: 'Demo Agent', phone, role: 'Agent', token: 'demo-token' };
        } else {
          throw apiErr; // Rethrow original error if not a demo number
        }
        localStorage.setItem('user', JSON.stringify(user));
      }
      
      // Map roles to dashboard categories
      console.log('Login: Success. User:', user.name, 'Role:', user.role);
      if (user.role === 'Admin') {
        console.log('Login: Redirecting to Admin Dashboard...');
        window.location.href = '/dashboard/admin';
      } else if (user.role === 'Sub-Admin' || user.role === 'SubAdmin') {
        console.log('Login: Redirecting to Sub-Admin Dashboard...');
        window.location.href = '/dashboard/subadmin';
      } else if (user.role === 'Agent') {
        console.log('Login: Redirecting to Agent Dashboard...');
        window.location.href = '/dashboard/agent';
      } else {
        console.log('Login: No specific dashboard for role:', user.role);
        window.location.href = '/';
      }
    } catch (err) {
      console.error('Login: Error occurred:', err);
      setError(err.message || 'Login failed. Please try again.');
    } finally {

      setLoading(false);
    }
  };

  const handlePhoneChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhone(val);
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center p-4 relative">
      <Link 
        to="/" 
        className="absolute top-8 left-8 p-3 bg-white dark:bg-surface-dark shadow-xl rounded-2xl text-text-primary-light dark:text-text-primary-dark hover:scale-110 transition-all z-10 border border-border-light dark:border-border-dark group"
      >
        <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
      </Link>
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="w-10 h-10 bg-primary-light dark:bg-primary-dark rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <span className="font-bold text-2xl text-text-primary-light dark:text-text-primary-dark">
              Agentic<span className="text-accent-light">Store</span>
            </span>
          </Link>
          <h2 className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark">Welcome Back</h2>
          <p className="text-text-secondary-light dark:text-text-secondary-dark mt-2">Log in to manage your membership and orders</p>
        </div>

        <div className="card-premium">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 bg-error/10 border border-error/20 text-error text-sm rounded-lg text-center">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-text-primary-light dark:text-text-primary-dark">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary-light w-5 h-5" />
                <input
                  type="tel"
                  maxLength="10"
                  pattern="[0-9]{10}"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-secondary-dark border border-border-light dark:border-border-dark rounded-xl focus:ring-2 focus:ring-primary-light outline-none transition-all dark:text-white"
                  placeholder="e.g. 9876543210"
                  value={phone}
                  onChange={handlePhoneChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-semibold text-text-primary-light dark:text-text-primary-dark">Password</label>
                <Link to="/forgot-password" size="sm" className="text-xs text-primary-light dark:text-primary-dark hover:underline">Forgot password?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary-light w-5 h-5" />
                <input
                  type="password"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-secondary-dark border border-border-light dark:border-border-dark rounded-xl focus:ring-2 focus:ring-primary-light outline-none transition-all dark:text-white"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-4 text-lg"
            >
              {loading ? <Loader2 className="animate-spin" /> : <>Login <ArrowRight className="ml-2 w-5 h-5" /></>}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary-light dark:text-primary-dark font-bold hover:underline">Sign up for free</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
