import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { CheckCircle, Clock, AlertCircle, Phone, Mail, ArrowLeft, LogOut, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const AgentStatusPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getStatusIcon = () => {
    switch (user?.applicationStatus) {
      case 'Pending Review':
        return <Clock size={48} className="text-warning animate-pulse" />;
      case 'Rejected':
        return <AlertCircle size={48} className="text-error" />;
      case 'Request Correction':
        return <AlertCircle size={48} className="text-primary-light" />;
      default:
        return <ShieldCheck size={48} className="text-primary-light" />;
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark p-4 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary-light dark:bg-primary-dark rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <span className="font-bold text-2xl text-text-primary-light dark:text-text-primary-dark">
              Agentic<span className="text-accent-light">Store</span>
            </span>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm font-bold text-text-secondary-light hover:text-error transition-colors">
            <LogOut size={18} /> Logout
          </button>
        </div>

        <div className="card-premium p-8 text-center space-y-8">
          <div className="w-24 h-24 bg-gray-50 dark:bg-secondary-dark rounded-full flex items-center justify-center mx-auto shadow-inner">
            {getStatusIcon()}
          </div>

          <div>
            <h2 className="text-3xl font-black dark:text-white">Application Status</h2>
            <div className="inline-block px-4 py-1.5 bg-warning/10 text-warning text-xs font-black uppercase tracking-widest rounded-full mt-4">
              {user?.applicationStatus || 'Pending Review'}
            </div>
          </div>

          <div className="space-y-4 max-w-md mx-auto">
            <p className="text-text-secondary-light">
              Welcome, <span className="font-bold dark:text-white">{user?.name}</span>. Your application for <span className="font-bold dark:text-white">{user?.agentType}</span> in <span className="font-bold dark:text-white">{user?.territory?.district}</span> is currently under review.
            </p>
            <p className="text-sm text-text-secondary-light italic">
              Verification typically takes 24-48 business hours. You will receive an email once your account is activated.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t dark:border-border-dark">
            <div className="p-4 bg-gray-50 dark:bg-secondary-dark rounded-2xl text-left space-y-2 border border-border-light dark:border-border-dark">
              <p className="text-[10px] font-black text-text-secondary-light uppercase tracking-widest flex items-center gap-2">
                <Phone size={12} /> Contact Support
              </p>
              <p className="text-sm font-bold dark:text-white">+91 1800 123 4567</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-secondary-dark rounded-2xl text-left space-y-2 border border-border-light dark:border-border-dark">
              <p className="text-[10px] font-black text-text-secondary-light uppercase tracking-widest flex items-center gap-2">
                <Mail size={12} /> Email Us
              </p>
              <p className="text-sm font-bold dark:text-white">compliance@agenticstore.com</p>
            </div>
          </div>

          <div className="pt-4">
            <Link to="/" className="text-sm font-bold text-primary-light hover:underline flex items-center justify-center gap-2">
              <ArrowLeft size={16} /> Back to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentStatusPage;
