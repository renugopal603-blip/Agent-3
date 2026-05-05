import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import {
  LayoutDashboard, User, ShieldCheck, Lock, Users, GitBranch, Link as LinkIcon,
  Map, PlusSquare, Store, CheckSquare, Target, ShoppingBag, CreditCard,
  Wallet, History, Award, ArrowUpRight, TrendingUp, BarChart2,
  Bell, LifeBuoy, MessageSquare, Settings, LogOut, Search, Filter,
  ChevronRight, ArrowRight, MoreVertical, Edit, Trash2, CheckCircle, Clock,
  FileText, PieChart, Info, AlertCircle, Globe, Download, Sun, Moon, Star
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, AreaChart, Area, PieChart as RePieChart, Pie, Cell
} from 'recharts';
import { useNotifications } from '../../context/NotificationContext';

const AgentDashboard = () => {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const { addNotification } = useNotifications();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [applicationStep, setApplicationStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const chartData = [
    { name: 'Mon', sales: 3200, commission: 320 },
    { name: 'Tue', sales: 4100, commission: 410 },
    { name: 'Wed', sales: 2800, commission: 280 },
    { name: 'Thu', sales: 5200, commission: 520 },
    { name: 'Fri', sales: 4700, commission: 470 },
    { name: 'Sat', sales: 6100, commission: 610 },
    { name: 'Sun', sales: 5500, commission: 550 },
  ];

  const stats = [
    { title: 'Total Earnings', value: '₹42,850', icon: <Wallet />, color: 'bg-emerald-500', trend: '+12.5%' },
    { title: 'Active Members', value: '156', icon: <Users />, color: 'bg-blue-500', trend: '+5.2%' },
    { title: 'Shop Onboarded', value: '12', icon: <Store />, color: 'bg-orange-500', trend: '+2 this week' },
    { title: 'Current Target', value: '85%', icon: <Target />, color: 'bg-purple-500', trend: 'In Progress' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return (
          <div className="p-8 space-y-8 animate-in fade-in duration-500">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.title} className="card-premium flex items-center gap-4 hover:scale-[1.02] transition-transform">
                  <div className={`p-4 ${stat.color} text-white rounded-2xl shadow-lg`}>
                    {React.cloneElement(stat.icon, { size: 24 })}
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">{stat.title}</p>
                    <h3 className="text-2xl font-bold dark:text-white">{stat.value}</h3>
                    <p className="text-xs text-success font-semibold">{stat.trend}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Main Chart */}
              <div className="xl:col-span-2 card-premium space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold dark:text-white">Earnings Overview</h3>
                  <select className="bg-gray-100 dark:bg-secondary-dark border-none rounded-lg text-sm dark:text-white px-3 py-1 outline-none">
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                  </select>
                </div>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.1} />
                      <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                      <YAxis stroke="#94a3b8" fontSize={12} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0F172A', border: 'none', borderRadius: '12px', color: '#fff' }}
                      />
                      <Area type="monotone" dataKey="sales" stroke="#10B981" fillOpacity={1} fill="url(#colorSales)" strokeWidth={3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Recent Activities */}
              <div className="card-premium space-y-6">
                <h3 className="text-lg font-bold dark:text-white">Recent Activities</h3>
                <div className="space-y-4">
                  {[
                    { title: 'New Member Joined', desc: 'Rahul S. via referral link', time: '2h ago', icon: <Users />, color: 'text-blue-500' },
                    { title: 'Commission Credited', desc: 'From Shop: Fresh Mart', time: '5h ago', icon: <Wallet />, color: 'text-emerald-500' },
                    { title: 'KYC Verified', desc: 'Your KYC was approved by Admin', time: '1d ago', icon: <ShieldCheck />, color: 'text-purple-500' },
                  ].map((activity, i) => (
                    <div key={i} className="flex gap-4 p-3 bg-gray-50 dark:bg-secondary-dark rounded-xl">
                      <div className={`p-2 rounded-lg bg-white dark:bg-surface-dark ${activity.color} shadow-sm`}>
                        {React.cloneElement(activity.icon, { size: 18 })}
                      </div>
                      <div>
                        <p className="text-sm font-bold dark:text-white">{activity.title}</p>
                        <p className="text-xs text-text-secondary-light">{activity.desc}</p>
                        <p className="text-[10px] text-text-secondary-light mt-1 font-medium">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full btn-outline py-2 text-sm">View All History</button>
              </div>
            </div>
          </div>
        );

      case 'My Profile':
        const agentLevels = {
          'Pincode Agent': { level: 'PINCODE LEVEL', territoryLabel: 'Assigned Pincode', territoryValue: '400001', commission: '5% + Referral' },
          'Divisional Agent': { level: 'DIVISIONAL LEVEL', territoryLabel: 'Assigned Division', territoryValue: 'Mumbai South', commission: '7% + Royalty' },
          'District Agent': { level: 'DISTRICT LEVEL', territoryLabel: 'Assigned District', territoryValue: 'Mumbai District', commission: '10% + Performance' },
          'State Agent': { level: 'STATE LEVEL', territoryLabel: 'Assigned State', territoryValue: 'Maharashtra', commission: '12% + Leadership' },
        };

        const currentLevel = agentLevels[user?.role] || agentLevels['State Agent'];

        return (
          <div className="p-8 max-w-5xl animate-in slide-in-from-bottom-4 duration-500 space-y-8">
            {/* Header Card */}
            <div className="card-premium relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-light/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
              <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                <div className="w-32 h-32 bg-primary-light rounded-3xl flex items-center justify-center text-white text-5xl font-black shadow-2xl shadow-primary-light/20 border-4 border-white dark:border-surface-dark">
                  A
                </div>
                <div className="text-center md:text-left space-y-3">
                  <div>
                    <h3 className="text-3xl font-black dark:text-white tracking-tight">AdminHub</h3>
                    <p className="text-sm text-text-secondary-light font-bold uppercase tracking-widest mt-1">{user?.email}</p>
                  </div>
                  <div className="flex flex-wrap justify-center md:justify-start gap-2">
                    <span className="px-3 py-1 bg-primary-light text-white text-[10px] font-black rounded-lg shadow-lg shadow-primary-light/20 uppercase tracking-wider">
                      {currentLevel.level}
                    </span>
                    <span className="px-3 py-1 bg-success/10 text-success text-[10px] font-black rounded-lg uppercase tracking-wider border border-success/20">
                      KYC Verified
                    </span>
                    <span className="px-3 py-1 bg-blue-500/10 text-blue-500 text-[10px] font-black rounded-lg uppercase tracking-wider border border-blue-500/20">
                      Active Status
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Primary Details */}
              <div className="lg:col-span-2 space-y-8">
                <div className="card-premium space-y-6">
                  <div className="flex items-center gap-2 border-b dark:border-border-dark pb-4">
                    <User className="text-primary-light" size={20} />
                    <h4 className="font-black dark:text-white uppercase tracking-widest text-sm">Professional Profile</h4>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <ProfileItem label="Agent Name" value="AdminHub" />
                    <ProfileItem label="Agent ID" value="AGT-882901" />
                    <ProfileItem label="Agent Level" value={user?.role || 'State Agent'} />
                    <ProfileItem label={currentLevel.territoryLabel} value={currentLevel.territoryValue} />
                    <ProfileItem label="Parent Agent / Reporting To" value={user?.role === 'State Agent' ? 'Corporate Hub' : 'Senior State Manager'} />
                    <ProfileItem label="Commission Level" value={currentLevel.commission} />
                    <ProfileItem label="Joining Date" value="Jan 15, 2024" />
                    <ProfileItem label="Account Status" value="Operational" />
                  </div>
                </div>

                <div className="card-premium space-y-6">
                  <div className="flex items-center gap-2 border-b dark:border-border-dark pb-4">
                    <ShieldCheck className="text-emerald-500" size={20} />
                    <h4 className="font-black dark:text-white uppercase tracking-widest text-sm">Verification & Finance</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-4 bg-success/5 rounded-2xl border border-success/10">
                      <p className="text-[10px] font-black text-success uppercase tracking-widest mb-1">KYC Status</p>
                      <p className="text-sm font-bold dark:text-white">Documents Verified</p>
                    </div>
                    <div className="p-4 bg-primary-light/5 rounded-2xl border border-primary-light/10">
                      <p className="text-[10px] font-black text-primary-light uppercase tracking-widest mb-1">Security Deposit</p>
                      <p className="text-sm font-bold dark:text-white">₹1,00,000 (Fully Paid)</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar Info */}
              <div className="space-y-8">
                <div className="card-premium space-y-6">
                  <h4 className="font-black dark:text-white uppercase tracking-widest text-sm">Quick Actions</h4>
                  <div className="space-y-3">
                    <button 
                      onClick={() => alert('Opening profile editor... You can update your contact details and business information here.')}
                      className="w-full btn-primary py-3 rounded-xl font-bold text-sm shadow-lg shadow-primary-light/20 hover:scale-[1.02] transition-all"
                    >
                      Edit Profile Info
                    </button>
                    <button 
                      onClick={() => alert('Generating your Digital Agent ID Card... Your PDF download will start in a moment.')}
                      className="w-full btn-outline py-3 rounded-xl font-bold text-sm hover:bg-gray-50 dark:hover:bg-secondary-dark transition-all"
                    >
                      Download ID Card
                    </button>
                    <button 
                      onClick={() => alert('Role Upgrade Request submitted to Admin. Our compliance team will review your performance metrics and contact you within 48 hours.')}
                      className="w-full py-3 text-error font-bold text-sm hover:bg-error/5 rounded-xl transition-all"
                    >
                      Request Role Upgrade
                    </button>
                  </div>
                </div>

                <div className="card-premium bg-gradient-to-br from-secondary-dark to-background-dark border-none text-white overflow-hidden relative">
                  <div className="relative z-10 space-y-4">
                    <p className="text-[10px] font-black text-primary-light uppercase tracking-[0.2em]">Compliance</p>
                    <p className="text-xs opacity-80 leading-relaxed">
                      Your account is currently in 100% compliance with platform policies. Next audit scheduled for July 2026.
                    </p>
                  </div>
                  <ShieldCheck className="absolute -right-4 -bottom-4 w-24 h-24 text-white/5 -rotate-12" />
                </div>
              </div>
            </div>
          </div>
        );

      case 'KYC Status':
        return (
          <div className="p-8 max-w-4xl animate-in slide-in-from-bottom-4 duration-500">
            <div className="card-premium space-y-8">
              <div className="flex items-center justify-between border-b dark:border-border-dark pb-6">
                <div>
                  <h3 className="text-2xl font-bold dark:text-white">KYC Verification</h3>
                  <p className="text-text-secondary-light">Manage your identity documents and verification status.</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-success/10 text-success rounded-xl font-bold text-sm">
                  <CheckCircle size={18} /> Verified
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h4 className="font-bold dark:text-white">Uploaded Documents</h4>
                  <div className="space-y-4">
                    {[
                      { name: 'Aadhar Card', status: 'Approved', date: 'Jan 16, 2024' },
                      { name: 'PAN Card', status: 'Approved', date: 'Jan 16, 2024' },
                      { name: 'Address Proof', status: 'Approved', date: 'Jan 16, 2024' },
                    ].map((doc, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-secondary-dark rounded-xl border border-border-light dark:border-border-dark">
                        <div className="flex items-center gap-3">
                          <FileText className="text-primary-light" size={20} />
                          <div>
                            <p className="text-sm font-bold dark:text-white">{doc.name}</p>
                            <p className="text-[10px] text-text-secondary-light">Verified on {doc.date}</p>
                          </div>
                        </div>
                        <CheckCircle className="text-success" size={16} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="font-bold dark:text-white">Verification Timeline</h4>
                  <div className="relative space-y-8 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-border-light dark:before:bg-border-dark">
                    {[
                      { title: 'Documents Submitted', date: 'Jan 15, 2024', done: true },
                      { title: 'Initial Review', date: 'Jan 15, 2024', done: true },
                      { title: 'Admin Approval', date: 'Jan 16, 2024', done: true },
                      { title: 'Verification Complete', date: 'Jan 16, 2024', done: true },
                    ].map((step, i) => (
                      <div key={i} className="relative pl-8">
                        <div className={`absolute left-0 top-1 w-4 h-4 rounded-full border-2 border-white dark:border-surface-dark ${step.done ? 'bg-success' : 'bg-gray-300'} z-10`}></div>
                        <div>
                          <p className={`text-sm font-bold ${step.done ? 'dark:text-white' : 'text-text-secondary-light'}`}>{step.title}</p>
                          <p className="text-xs text-text-secondary-light">{step.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-primary-light/5 border border-primary-light/10 rounded-xl flex gap-3">
                <Info className="text-primary-light shrink-0" size={20} />
                <p className="text-xs text-text-secondary-light leading-relaxed">
                  Your KYC is complete. You are eligible for all platform benefits, including higher commission rates and faster payouts. If you need to update any documents, please contact support.
                </p>
              </div>
            </div>
          </div>
        );

      case 'Security Deposit':
        return (
          <div className="p-8 max-w-4xl animate-in slide-in-from-bottom-4 duration-500">
            <div className="card-premium space-y-8">
              <div className="flex items-center justify-between border-b dark:border-border-dark pb-6">
                <div>
                  <h3 className="text-2xl font-bold dark:text-white">Security Deposit</h3>
                  <p className="text-text-secondary-light">Track your mandatory security deposit and refund eligibility.</p>
                </div>
                <div className="w-12 h-12 bg-primary-light/10 text-primary-light rounded-xl flex items-center justify-center">
                  <Lock size={24} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-6 bg-gradient-to-br from-primary-light/10 to-transparent rounded-2xl border border-primary-light/20 relative overflow-hidden">
                  <div className="relative z-10">
                    <p className="text-sm font-bold text-primary-light uppercase tracking-wider">Total Deposit Held</p>
                    <h3 className="text-4xl font-black dark:text-white mt-2">₹1,00,000</h3>
                    <p className="text-xs text-text-secondary-light mt-4 flex items-center gap-1">
                      <CheckCircle size={14} className="text-success" /> Fully Paid on Jan 15, 2024
                    </p>
                  </div>
                  <Lock className="absolute -right-4 -bottom-4 text-primary-light/5 w-32 h-32 rotate-12" />
                </div>

                <div className="space-y-4">
                  <h4 className="font-bold dark:text-white">Deposit Terms</h4>
                  <div className="space-y-3">
                    {[
                      'Refundable after 12 months of active service',
                      'Interest-free holding by the platform',
                      'Subject to performance and conduct audit',
                      'Linked to West District territory rights'
                    ].map((term, i) => (
                      <div key={i} className="flex gap-3">
                        <CheckCircle className="text-success shrink-0" size={16} />
                        <p className="text-sm text-text-secondary-light leading-snug">{term}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="card-premium bg-gray-50 dark:bg-secondary-dark/50 border-none space-y-4">
                <h4 className="font-bold dark:text-white">Refund Timeline</h4>
                <div className="w-full h-3 bg-gray-200 dark:bg-secondary-dark rounded-full overflow-hidden">
                  <div className="h-full bg-primary-light" style={{ width: '35%' }}></div>
                </div>
                <div className="flex justify-between text-xs font-bold text-text-secondary-light">
                  <span>Deposited (Jan 2024)</span>
                  <span>4 / 12 Months</span>
                  <span>Eligible (Jan 2025)</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'My Members':
        return (
          <div className="p-8 space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold dark:text-white">Network Members</h3>
                <p className="text-sm text-text-secondary-light">Manage and track your member network performance.</p>
              </div>
              <button className="btn-primary px-4 py-2 text-sm flex items-center gap-2">
                <PlusSquare size={18} /> Onboard New Member
              </button>
            </div>

            <div className="card-premium">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary-light" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search by name, ID or plan..." 
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-secondary-dark border border-border-light dark:border-border-dark rounded-xl focus:ring-2 focus:ring-primary-light outline-none"
                  />
                </div>
                <div className="flex gap-2">
                  <button className="btn-outline px-4 py-2 flex items-center gap-2 text-sm">
                    <Filter size={18} /> Filter
                  </button>
                  <button className="btn-outline px-4 py-2 flex items-center gap-2 text-sm">
                    <ArrowRight size={18} className="rotate-90" /> Export
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-border-light dark:border-border-dark">
                      <th className="pb-4 font-bold dark:text-white">Member Details</th>
                      <th className="pb-4 font-bold dark:text-white">Plan</th>
                      <th className="pb-4 font-bold dark:text-white">Join Date</th>
                      <th className="pb-4 font-bold dark:text-white">Earning (MTD)</th>
                      <th className="pb-4 font-bold dark:text-white">Status</th>
                      <th className="pb-4 font-bold dark:text-white text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-light dark:divide-border-dark">
                    {[
                      { name: 'Karan Sharma', id: 'MBR-101', plan: 'Diamond', date: 'Oct 12, 2023', earning: '₹12,450', status: 'Active' },
                      { name: 'Meera Rajput', id: 'MBR-102', plan: 'Gold', date: 'Oct 15, 2023', earning: '₹8,200', status: 'Active' },
                      { name: 'Sameer Khan', id: 'MBR-103', plan: 'Silver', date: 'Nov 02, 2023', earning: '₹4,500', status: 'Pending' },
                      { name: 'Anjali Gupta', id: 'MBR-104', plan: 'Diamond', date: 'Dec 05, 2023', earning: '₹15,000', status: 'Active' },
                    ].map((member) => (
                      <tr key={member.id} className="hover:bg-gray-50 dark:hover:bg-secondary-dark/50 transition-colors">
                        <td className="py-4 flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary-light/10 text-primary-light rounded-xl flex items-center justify-center font-bold">{member.name[0]}</div>
                          <div>
                            <p className="font-bold dark:text-white text-sm">{member.name}</p>
                            <p className="text-xs text-text-secondary-light">{member.id}</p>
                          </div>
                        </td>
                        <td className="py-4">
                          <span className={`px-2 py-1 rounded-lg text-[10px] font-black tracking-wider uppercase ${
                            member.plan === 'Diamond' ? 'bg-purple-500/10 text-purple-500' :
                            member.plan === 'Gold' ? 'bg-yellow-500/10 text-yellow-600' :
                            'bg-gray-500/10 text-gray-600'
                          }`}>
                            {member.plan}
                          </span>
                        </td>
                        <td className="py-4 text-sm text-text-secondary-light">{member.date}</td>
                        <td className="py-4 text-sm font-bold dark:text-white">{member.earning}</td>
                        <td className="py-4">
                          <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                            member.status === 'Active' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                          }`}>{member.status}</span>
                        </td>
                        <td className="py-4 text-right">
                          <button className="p-2 hover:bg-gray-100 dark:hover:bg-secondary-dark rounded-lg transition-colors"><MoreVertical size={16} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'Downline Tree':
        return (
          <div className="p-8 space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold dark:text-white">Network Hierarchy</h3>
                <p className="text-sm text-text-secondary-light">Visualize your downline and multi-level network structure.</p>
              </div>
              <div className="flex gap-2">
                <button className="btn-outline px-4 py-2 text-sm">Expand All</button>
                <button className="btn-primary px-4 py-2 text-sm">Refresh View</button>
              </div>
            </div>

            <div className="card-premium min-h-[500px] flex items-center justify-center overflow-auto">
              {/* Mockup of a tree structure */}
              <div className="flex flex-col items-center gap-12">
                <div className="w-20 h-20 bg-primary-light rounded-2xl flex items-center justify-center text-white font-black shadow-xl ring-4 ring-primary-light/20 relative">
                  YOU
                  <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-0.5 h-12 bg-border-light dark:border-border-dark"></div>
                </div>
                
                <div className="flex gap-20 relative">
                  <div className="absolute top-0 left-1/4 right-1/4 h-0.5 bg-border-light dark:border-border-dark -translate-y-12"></div>
                  {[
                    { name: 'L1: Karan', color: 'bg-emerald-500', children: 3 },
                    { name: 'L1: Meera', color: 'bg-blue-500', children: 5 },
                    { name: 'L1: Rahul', color: 'bg-orange-500', children: 2 },
                  ].map((node, i) => (
                    <div key={i} className="flex flex-col items-center gap-8 relative">
                      <div className={`w-16 h-16 ${node.color} rounded-xl flex items-center justify-center text-white font-bold text-xs shadow-lg relative`}>
                        {node.name}
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-border-light dark:border-border-dark"></div>
                      </div>
                      <div className="flex gap-4">
                        {Array.from({ length: node.children }).map((_, j) => (
                          <div key={j} className="w-8 h-8 bg-gray-200 dark:bg-secondary-dark rounded-lg flex items-center justify-center text-[8px] dark:text-white">L2</div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-12 p-4 bg-gray-50 dark:bg-secondary-dark/50 rounded-xl border border-dashed border-border-light dark:border-border-dark">
                  <p className="text-xs text-text-secondary-light font-bold flex items-center gap-2">
                    <Info size={14} /> Only top 2 levels are shown. Click on a node to explore deeper levels.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'Referral Links':
        return (
          <div className="p-8 max-w-4xl animate-in slide-in-from-bottom-4 duration-500">
            <div className="card-premium space-y-8">
              <div className="border-b dark:border-border-dark pb-6">
                <h3 className="text-2xl font-bold dark:text-white">Referral Program</h3>
                <p className="text-text-secondary-light">Share your unique links to grow your network and earn bonuses.</p>
              </div>

              <div className="space-y-6">
                {[
                  { title: 'Member Onboarding Link', link: `https://agenticstore.com/register?ref=AGT882901&type=member`, desc: 'Use this link to register new members under your network.' },
                  { title: 'Shop Partner Invitation', link: `https://agenticstore.com/partner?ref=AGT882901`, desc: 'Invite local shops to join the platform as verified partners.' },
                  { title: 'Customer Invitation', link: `https://agenticstore.com/join?ref=AGT882901`, desc: 'Direct link for customers to explore local luxury services.' },
                ].map((item, i) => (
                  <div key={i} className="space-y-3">
                    <h4 className="text-sm font-bold dark:text-white">{item.title}</h4>
                    <div className="flex gap-2">
                      <div className="flex-1 p-3 bg-gray-50 dark:bg-secondary-dark rounded-xl border border-border-light dark:border-border-dark font-mono text-xs dark:text-white overflow-hidden text-ellipsis whitespace-nowrap">
                        {item.link}
                      </div>
                      <button className="btn-primary px-4 py-2 text-xs flex items-center gap-2 whitespace-nowrap">
                        <LinkIcon size={14} /> Copy Link
                      </button>
                    </div>
                    <p className="text-[10px] text-text-secondary-light">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                {[
                  { label: 'Total Clicks', value: '1,240' },
                  { label: 'Conversions', value: '156' },
                  { label: 'Bonus Earned', value: '₹12,500' },
                ].map((stat, i) => (
                  <div key={i} className="p-4 bg-primary-light/5 rounded-2xl border border-primary-light/10 text-center">
                    <p className="text-[10px] font-bold text-primary-light uppercase tracking-widest">{stat.label}</p>
                    <p className="text-xl font-black dark:text-white mt-1">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'Territory Management':
        return (
          <div className="p-8 space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold dark:text-white">Territory Insights</h3>
                <p className="text-sm text-text-secondary-light">Managing: West District - Mumbai Zone</p>
              </div>
              <button className="btn-outline px-4 py-2 text-sm flex items-center gap-2">
                <Globe size={18} /> View Global Map
              </button>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2 card-premium h-[450px] relative overflow-hidden bg-gray-100 dark:bg-secondary-dark/50 flex items-center justify-center border-dashed">
                <div className="text-center space-y-4 relative z-10">
                  <div className="w-16 h-16 bg-primary-light/10 text-primary-light rounded-full flex items-center justify-center mx-auto animate-pulse">
                    <Map size={32} />
                  </div>
                  <div>
                    <h4 className="font-bold dark:text-white text-lg">Interactive Zone Map</h4>
                    <p className="text-sm text-text-secondary-light max-w-xs mx-auto">Visualizing active members and partner shops in West District.</p>
                  </div>
                  <div className="flex gap-4 justify-center">
                    <div className="flex items-center gap-2"><span className="w-3 h-3 bg-emerald-500 rounded-full"></span> <span className="text-xs dark:text-white">Active Shops (12)</span></div>
                    <div className="flex items-center gap-2"><span className="w-3 h-3 bg-blue-500 rounded-full"></span> <span className="text-xs dark:text-white">Members (156)</span></div>
                  </div>
                </div>
                {/* Mockup Map Lines */}
                <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none">
                  <path d="M0,100 Q100,50 200,100 T400,100 T600,100" fill="none" stroke="currentColor" strokeWidth="2" />
                  <path d="M0,200 Q150,150 300,200 T600,200" fill="none" stroke="currentColor" strokeWidth="2" />
                  <path d="M100,0 Q150,200 100,400" fill="none" stroke="currentColor" strokeWidth="2" />
                  <path d="M300,0 Q350,250 300,500" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>

              <div className="space-y-6">
                <div className="card-premium">
                  <h4 className="font-bold dark:text-white mb-4">Pincode Coverage</h4>
                  <div className="space-y-4">
                    {[
                      { code: '400001', name: 'South Fort', count: 42, health: 'High' },
                      { code: '400005', name: 'Colaba', count: 28, health: 'Medium' },
                      { code: '400012', name: 'Parel', count: 56, health: 'High' },
                      { code: '400021', name: 'Nariman Point', count: 30, health: 'Medium' },
                    ].map((pin, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-bold dark:text-white">{pin.code}</p>
                          <p className="text-xs text-text-secondary-light">{pin.name}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold dark:text-white">{pin.count}</p>
                          <span className={`text-[10px] font-bold ${pin.health === 'High' ? 'text-success' : 'text-warning'}`}>{pin.health}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full btn-outline mt-6 py-2 text-sm">Expand Coverage</button>
                </div>

                <div className="card-premium bg-primary-light text-white border-none">
                  <h4 className="font-bold mb-2">Expansion Opportunity!</h4>
                  <p className="text-xs opacity-90 leading-relaxed mb-4">
                    District 400033 currently has zero agent coverage. Apply to extend your territory and earn additional 2% royalty.
                  </p>
                  <button className="w-full bg-white text-primary-light font-bold py-2 rounded-xl text-sm">Learn More</button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'Shop Tie-Up':
        return (
          <div className="p-8 max-w-5xl animate-in slide-in-from-bottom-4 duration-500 mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-2xl font-bold dark:text-white">Shop Tie-Up Workflow</h3>
                <p className="text-text-secondary-light mt-1">Register local shops and track their approval process.</p>
              </div>
              <button 
                onClick={() => {
                  alert('Opening New Shop Tie-Up Form...');
                  // Logic to toggle form visibility
                }} 
                className="btn-primary px-6 py-3 rounded-xl flex items-center gap-2 font-bold"
              >
                <PlusSquare size={20} /> Add New Shop
              </button>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {/* Registration Form UI */}
              <div className="card-premium space-y-8">
                <div className="border-b dark:border-border-dark pb-4 flex items-center gap-3">
                  <div className="p-2 bg-orange-500/10 text-orange-500 rounded-lg"><Store size={20} /></div>
                  <h3 className="text-lg font-bold dark:text-white">New Shop Details</h3>
                </div>

                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-text-secondary-light uppercase tracking-wider">Shop Name</label>
                      <input type="text" placeholder="e.g. Royal Electronics" className="w-full px-4 py-3 bg-gray-50 dark:bg-secondary-dark border border-border-light dark:border-border-dark rounded-xl outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-text-secondary-light uppercase tracking-wider">Owner Name</label>
                      <input type="text" placeholder="Full legal name" className="w-full px-4 py-3 bg-gray-50 dark:bg-secondary-dark border border-border-light dark:border-border-dark rounded-xl outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-text-secondary-light uppercase tracking-wider">Category</label>
                      <select className="w-full px-4 py-3 bg-gray-50 dark:bg-secondary-dark border border-border-light dark:border-border-dark rounded-xl outline-none dark:text-white">
                        <option>Electronics</option>
                        <option>Groceries</option>
                        <option>Fashion</option>
                        <option>Hotels & Dining</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-text-secondary-light uppercase tracking-wider">Contact Number</label>
                      <input type="tel" placeholder="+91 00000 00000" className="w-full px-4 py-3 bg-gray-50 dark:bg-secondary-dark border border-border-light dark:border-border-dark rounded-xl outline-none" />
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t dark:border-border-dark">
                    <h4 className="font-bold dark:text-white text-sm">Upload Documents</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {['GST Certificate', 'Trade License', 'Owner ID Proof'].map((doc, i) => (
                        <div key={i} className="p-4 border-2 border-dashed border-border-light dark:border-border-dark rounded-xl flex flex-col items-center gap-2 hover:border-primary-light transition-colors cursor-pointer bg-white dark:bg-surface-dark">
                          <PlusSquare className="text-text-secondary-light" />
                          <span className="text-[10px] font-bold text-text-secondary-light text-center">{doc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button 
                    type="button" 
                    onClick={() => {
                      addNotification({
                        title: 'Shop Tie-Up Submitted',
                        message: `New request for "Royal Electronics" has been sent to Sub-Admin for verification.`,
                        type: 'info'
                      });
                      alert('Shop details uploaded. Status changed to Pending.');
                    }} 
                    className="w-full btn-primary py-4 rounded-xl font-bold"
                  >
                    Submit Tie-Up Request
                  </button>
                </form>
              </div>

              {/* Status Tracking UI */}
              <div className="card-premium space-y-6 bg-gray-50 dark:bg-secondary-dark/50">
                <h3 className="text-lg font-bold dark:text-white">Tie-Up Status Tracker</h3>
                <p className="text-xs text-text-secondary-light">Track the approval workflow of your recently added shops.</p>
                
                <div className="space-y-4 mt-6">
                  {/* Shop 1: Approved */}
                  <div className="p-4 bg-white dark:bg-surface-dark rounded-2xl border border-border-light dark:border-border-dark shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-bold dark:text-white">Fresh Mart Grocery</h4>
                        <p className="text-[10px] text-text-secondary-light">Submitted on May 01, 2026</p>
                      </div>
                      <span className="px-2 py-1 bg-success/10 text-success text-[10px] font-bold rounded-md">Shop Active</span>
                    </div>
                    <div className="flex items-center gap-1 w-full justify-between relative before:absolute before:top-1/2 before:-translate-y-1/2 before:w-full before:h-0.5 before:bg-success/30">
                      <div className="w-3 h-3 rounded-full bg-success ring-4 ring-white dark:ring-surface-dark relative z-10" title="Upload Details"></div>
                      <div className="w-3 h-3 rounded-full bg-success ring-4 ring-white dark:ring-surface-dark relative z-10" title="Sub Admin Review"></div>
                      <div className="w-3 h-3 rounded-full bg-success ring-4 ring-white dark:ring-surface-dark relative z-10" title="Admin Approval"></div>
                    </div>
                    <div className="flex justify-between text-[8px] font-bold text-text-secondary-light uppercase mt-2">
                      <span>Submitted</span>
                      <span className="text-center">Sub Admin Verified</span>
                      <span className="text-right">Admin Approved</span>
                    </div>
                  </div>

                  {/* Shop 2: Sub Admin Verified */}
                  <div className="p-4 bg-white dark:bg-surface-dark rounded-2xl border border-border-light dark:border-border-dark shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-bold dark:text-white">Style Studio</h4>
                        <p className="text-[10px] text-text-secondary-light">Submitted on May 03, 2026</p>
                      </div>
                      <span className="px-2 py-1 bg-blue-500/10 text-blue-500 text-[10px] font-bold rounded-md">Pending Admin</span>
                    </div>
                    <div className="flex items-center gap-1 w-full justify-between relative before:absolute before:top-1/2 before:-translate-y-1/2 before:w-full before:h-0.5 before:bg-gray-200 dark:before:bg-gray-700">
                      <div className="absolute top-1/2 -translate-y-1/2 h-0.5 bg-blue-500 w-1/2"></div>
                      <div className="w-3 h-3 rounded-full bg-blue-500 ring-4 ring-white dark:ring-surface-dark relative z-10" title="Upload Details"></div>
                      <div className="w-3 h-3 rounded-full bg-blue-500 ring-4 ring-white dark:ring-surface-dark relative z-10" title="Sub Admin Review"></div>
                      <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600 ring-4 ring-white dark:ring-surface-dark relative z-10" title="Admin Approval"></div>
                    </div>
                    <div className="flex justify-between text-[8px] font-bold text-text-secondary-light uppercase mt-2">
                      <span className="text-blue-500">Submitted</span>
                      <span className="text-center text-blue-500">Sub Admin Verified</span>
                      <span className="text-right">Admin Pending</span>
                    </div>
                  </div>

                  {/* Shop 3: Pending Sub Admin */}
                  <div className="p-4 bg-white dark:bg-surface-dark rounded-2xl border border-border-light dark:border-border-dark shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-bold dark:text-white">Raj Electronics</h4>
                        <p className="text-[10px] text-text-secondary-light">Submitted on May 04, 2026</p>
                      </div>
                      <span className="px-2 py-1 bg-warning/10 text-warning text-[10px] font-bold rounded-md">Pending Review</span>
                    </div>
                    <div className="flex items-center gap-1 w-full justify-between relative before:absolute before:top-1/2 before:-translate-y-1/2 before:w-full before:h-0.5 before:bg-gray-200 dark:before:bg-gray-700">
                      <div className="w-3 h-3 rounded-full bg-warning ring-4 ring-white dark:ring-surface-dark relative z-10" title="Upload Details"></div>
                      <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600 ring-4 ring-white dark:ring-surface-dark relative z-10" title="Sub Admin Review"></div>
                      <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600 ring-4 ring-white dark:ring-surface-dark relative z-10" title="Admin Approval"></div>
                    </div>
                    <div className="flex justify-between text-[8px] font-bold text-text-secondary-light uppercase mt-2">
                      <span className="text-warning">Submitted</span>
                      <span className="text-center">Sub Admin Pending</span>
                      <span className="text-right">Admin Pending</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'Shop List':
        return (
          <div className="p-8 space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold dark:text-white">Partnered Shops</h3>
                <p className="text-sm text-text-secondary-light">Managing 12 shops in your territory.</p>
              </div>
              <div className="flex gap-2">
                <button className="btn-outline px-4 py-2 text-sm flex items-center gap-2"><Filter size={18} /> Filters</button>
                <button onClick={() => setActiveTab('Shop Onboarding')} className="btn-primary px-4 py-2 text-sm flex items-center gap-2"><PlusSquare size={18} /> Add Shop</button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[
                { name: 'Fresh Mart Grocery', category: 'Grocery', owner: 'Ramesh K.', sales: '₹1.2L', status: 'Active', rating: '4.8' },
                { name: 'Electro World', category: 'Electronics', owner: 'Vijay M.', sales: '₹4.5L', status: 'Active', rating: '4.5' },
                { name: 'Style Studio', category: 'Fashion', owner: 'Anjali S.', sales: '₹85K', status: 'Pending', rating: 'N/A' },
                { name: 'Gourmet Kitchen', category: 'Restaurant', owner: 'Suresh R.', sales: '₹2.1L', status: 'Active', rating: '4.9' },
                { name: 'Comfort Beds', category: 'Furniture', owner: 'Vikram B.', sales: '₹1.8L', status: 'Inactive', rating: '4.2' },
                { name: 'City Inn Hotel', category: 'Hotel', owner: 'Priya X.', sales: '₹6.2L', status: 'Active', rating: '4.7' },
              ].map((shop, i) => (
                <div key={i} className="card-premium space-y-4 hover:border-primary-light/50 transition-colors cursor-pointer group">
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 bg-orange-500/10 text-orange-500 rounded-xl flex items-center justify-center font-bold text-xl">
                      {shop.name[0]}
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      shop.status === 'Active' ? 'bg-success/10 text-success' : 
                      shop.status === 'Pending' ? 'bg-warning/10 text-warning' : 'bg-error/10 text-error'
                    }`}>{shop.status}</span>
                  </div>
                  <div>
                    <h4 className="font-bold dark:text-white group-hover:text-primary-light transition-colors">{shop.name}</h4>
                    <p className="text-xs text-text-secondary-light">{shop.category} • {shop.owner}</p>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t dark:border-border-dark">
                    <div>
                      <p className="text-[10px] text-text-secondary-light font-bold uppercase">Monthly Sales</p>
                      <p className="text-sm font-black dark:text-white">{shop.sales}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-text-secondary-light font-bold uppercase">Rating</p>
                      <p className="text-sm font-black text-yellow-500 flex items-center gap-1 justify-end">
                        ★ {shop.rating}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'Daily Tasks':
        return (
          <div className="p-8 max-w-4xl animate-in slide-in-from-bottom-4 duration-500">
            <div className="card-premium space-y-8">
              <div className="border-b dark:border-border-dark pb-6 flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-bold dark:text-white">Daily Tasks</h3>
                  <p className="text-text-secondary-light">Saturday, May 02, 2026 — 4 pending tasks</p>
                </div>
                <div className="w-12 h-12 bg-primary-light/10 text-primary-light rounded-xl flex items-center justify-center">
                  <CheckSquare size={24} />
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { title: 'Visit Fresh Mart', desc: 'Discuss monthly target achievement and commission payout.', time: '11:00 AM', priority: 'High', done: false },
                  { title: 'Verify KYC for Rahul S.', desc: 'Review uploaded documents for new member onboarding.', time: '02:00 PM', priority: 'Medium', done: true },
                  { title: 'Shop Audit - Electro World', desc: 'Verify stock levels for premium member exclusive offers.', time: '04:30 PM', priority: 'High', done: false },
                  { title: 'Update Area Report', desc: 'Submit weekly territory growth report to Admin hub.', time: '06:00 PM', priority: 'Medium', done: false },
                ].map((task, i) => (
                  <div key={i} className={`flex items-start gap-4 p-4 rounded-2xl border transition-all ${
                    task.done ? 'bg-gray-50/50 dark:bg-secondary-dark/20 border-border-light dark:border-border-dark' : 'bg-white dark:bg-secondary-dark border-border-light dark:border-border-dark hover:border-primary-light'
                  }`}>
                    <button className={`mt-1 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${
                      task.done ? 'bg-success border-success text-white' : 'border-border-light dark:border-border-dark'
                    }`}>
                      {task.done && <CheckCircle size={14} />}
                    </button>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className={`font-bold text-sm ${task.done ? 'text-text-secondary-light line-through' : 'dark:text-white'}`}>{task.title}</h4>
                        <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                          task.priority === 'High' ? 'bg-error/10 text-error' : 'bg-blue-500/10 text-blue-500'
                        }`}>{task.priority} Priority</span>
                      </div>
                      <p className="text-xs text-text-secondary-light mt-1">{task.desc}</p>
                      <div className="flex items-center gap-3 mt-3">
                        <span className="text-[10px] font-bold text-text-secondary-light flex items-center gap-1"><Clock size={12} /> {task.time}</span>
                        <div className="h-1 w-1 bg-gray-300 rounded-full"></div>
                        <button className="text-[10px] font-bold text-primary-light hover:underline">Edit Task</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full py-4 border-2 border-dashed border-border-light dark:border-border-dark rounded-2xl text-text-secondary-light font-bold text-sm hover:border-primary-light hover:text-primary-light transition-all flex items-center justify-center gap-2">
                <PlusSquare size={18} /> Add Custom Task
              </button>
            </div>
          </div>
        );

      case 'Sales Targets':
        return (
          <div className="p-8 space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold dark:text-white">Sales Performance</h3>
                <p className="text-sm text-text-secondary-light">Monthly Target: ₹5,00,000</p>
              </div>
              <div className="p-3 bg-purple-500/10 text-purple-500 rounded-xl">
                <Target size={24} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="card-premium space-y-6">
                <h4 className="font-bold dark:text-white">Current Achievement</h4>
                <div className="flex items-center justify-center py-8">
                  <div className="relative w-48 h-48">
                    <svg className="w-full h-full" viewBox="0 0 36 36">
                      <path className="text-gray-200 dark:text-secondary-dark" strokeDasharray="100, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                      <path className="text-purple-500" strokeDasharray="85, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl font-black dark:text-white">85%</span>
                      <span className="text-[10px] font-bold text-text-secondary-light uppercase">Achieved</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 dark:bg-secondary-dark rounded-xl">
                    <p className="text-[10px] font-bold text-text-secondary-light uppercase">Achieved</p>
                    <p className="text-lg font-black dark:text-white">₹4,25,000</p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-secondary-dark rounded-xl">
                    <p className="text-[10px] font-bold text-text-secondary-light uppercase">Pending</p>
                    <p className="text-lg font-black text-warning">₹75,000</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="card-premium space-y-4">
                  <h4 className="font-bold dark:text-white">Target Breakdown</h4>
                  {[
                    { label: 'Membership Sales', target: '₹2.0L', current: '₹1.8L', color: 'bg-blue-500' },
                    { label: 'Shop Sales Share', target: '₹2.0L', current: '₹1.7L', color: 'bg-emerald-500' },
                    { label: 'Renewal Targets', target: '₹1.0L', current: '₹75K', color: 'bg-orange-500' },
                  ].map((t, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="dark:text-white">{t.label}</span>
                        <span className="text-text-secondary-light">{t.current} / {t.target}</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 dark:bg-secondary-dark rounded-full overflow-hidden">
                        <div className={`h-full ${t.color}`} style={{ width: '80%' }}></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="card-premium bg-gradient-to-br from-purple-500/20 to-transparent border-purple-500/20">
                  <h4 className="font-bold dark:text-white text-sm">Next Tier Bonus</h4>
                  <p className="text-xs text-text-secondary-light mt-2 leading-relaxed">
                    Achieve 100% target by end of month to unlock **₹15,000 Milestone Bonus** and upgrade to **Diamond Agent** level!
                  </p>
                  <button className="w-full btn-primary mt-4 py-2 text-xs">View Rewards</button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'Leads / Orders':
        return (
          <div className="p-8 space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold dark:text-white">Order Tracking</h3>
                <p className="text-sm text-text-secondary-light">Monitoring sales across your partner shops.</p>
              </div>
              <div className="flex gap-2">
                <button className="btn-outline px-4 py-2 text-sm flex items-center gap-2"><Search size={18} /> Search</button>
                <button className="btn-outline px-4 py-2 text-sm flex items-center gap-2"><Filter size={18} /> Filter</button>
              </div>
            </div>

            <div className="card-premium">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-border-light dark:border-border-dark">
                      <th className="pb-4 font-bold dark:text-white">Order ID</th>
                      <th className="pb-4 font-bold dark:text-white">Customer</th>
                      <th className="pb-4 font-bold dark:text-white">Shop</th>
                      <th className="pb-4 font-bold dark:text-white">Amount</th>
                      <th className="pb-4 font-bold dark:text-white">Commission</th>
                      <th className="pb-4 font-bold dark:text-white">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-light dark:divide-border-dark">
                    {[
                      { id: '#ORD-9901', customer: 'Rohan S.', shop: 'Fresh Mart', amount: '₹1,250', comm: '₹62.50', status: 'Delivered' },
                      { id: '#ORD-9905', customer: 'Priya K.', shop: 'Electro World', amount: '₹45,000', comm: '₹2,250.00', status: 'Processing' },
                      { id: '#ORD-9912', customer: 'Vijay M.', shop: 'Gourmet Kitchen', amount: '₹2,800', comm: '₹140.00', status: 'Shipped' },
                      { id: '#ORD-9918', customer: 'Anjali G.', shop: 'Fresh Mart', amount: '₹950', comm: '₹47.50', status: 'Pending' },
                      { id: '#ORD-9922', customer: 'Suresh R.', shop: 'Style Studio', amount: '₹3,400', comm: '₹170.00', status: 'Delivered' },
                    ].map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-secondary-dark/50 transition-colors">
                        <td className="py-4 font-bold text-primary-light text-sm">{order.id}</td>
                        <td className="py-4 dark:text-white text-sm font-medium">{order.customer}</td>
                        <td className="py-4 text-text-secondary-light text-sm">{order.shop}</td>
                        <td className="py-4 font-bold dark:text-white text-sm">{order.amount}</td>
                        <td className="py-4 font-bold text-emerald-500 text-sm">{order.comm}</td>
                        <td className="py-4">
                          <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                            order.status === 'Delivered' ? 'bg-success/10 text-success' : 
                            order.status === 'Processing' ? 'bg-blue-500/10 text-blue-500' : 
                            order.status === 'Shipped' ? 'bg-purple-500/10 text-purple-500' : 'bg-warning/10 text-warning'
                          }`}>{order.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'Membership Sales':
        return (
          <div className="p-8 space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold dark:text-white">Membership Onboarding</h3>
                <p className="text-sm text-text-secondary-light">Recent premium member registrations.</p>
              </div>
              <button className="btn-primary px-4 py-2 text-sm flex items-center gap-2"><CreditCard size={18} /> New Registration</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="card-premium space-y-6">
                <h4 className="font-bold dark:text-white">Sales by Plan</h4>
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                      { name: 'Diamond', sales: 45 },
                      { name: 'Gold', sales: 78 },
                      { name: 'Silver', sales: 32 },
                      { name: 'Basic', sales: 12 },
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                      <XAxis dataKey="name" fontSize={12} />
                      <YAxis fontSize={12} />
                      <Tooltip cursor={{ fill: 'transparent' }} />
                      <Bar dataKey="sales" fill="#D4AF37" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="card-premium space-y-6">
                <h4 className="font-bold dark:text-white">Recent Sales</h4>
                <div className="space-y-4">
                  {[
                    { name: 'Sameer Khan', plan: 'Silver', date: '2h ago', price: '₹1,999', comm: '₹199' },
                    { name: 'Anjali Gupta', plan: 'Diamond', date: '5h ago', price: '₹9,999', comm: '₹999' },
                    { name: 'Rahul Sharma', plan: 'Gold', date: 'Yesterday', price: '₹4,999', comm: '₹499' },
                  ].map((sale, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-secondary-dark rounded-xl">
                      <div>
                        <p className="text-sm font-bold dark:text-white">{sale.name}</p>
                        <p className="text-[10px] text-text-secondary-light">{sale.plan} Plan • {sale.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-black dark:text-white">{sale.price}</p>
                        <p className="text-[10px] font-bold text-emerald-500">Comm: {sale.comm}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full btn-outline py-2 text-sm">View All Sales</button>
              </div>
            </div>
          </div>
        );

      case 'Wallet / Earnings':
        return (
          <div className="p-8 space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold dark:text-white">Wallet & Earnings</h3>
                <p className="text-sm text-text-secondary-light">Real-time overview of your platform revenue.</p>
              </div>
              <button onClick={() => setActiveTab('Payout Requests')} className="btn-primary px-6 py-2 text-sm flex items-center gap-2">
                <ArrowUpRight size={18} /> Withdraw Funds
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card-premium bg-gradient-to-br from-emerald-500 to-emerald-700 text-white border-none relative overflow-hidden">
                <div className="relative z-10">
                  <p className="text-xs font-bold opacity-80 uppercase tracking-wider">Total Balance</p>
                  <h3 className="text-4xl font-black mt-2">₹42,850</h3>
                  <div className="mt-8 flex items-center gap-2">
                    <span className="px-2 py-1 bg-white/20 rounded-lg text-[10px] font-bold">Safe to Withdraw</span>
                  </div>
                </div>
                <Wallet size={120} className="absolute -right-8 -bottom-8 opacity-10 rotate-12" />
              </div>

              <div className="card-premium space-y-4">
                <p className="text-xs font-bold text-text-secondary-light uppercase tracking-wider">Today's Earnings</p>
                <h3 className="text-3xl font-black dark:text-white">₹1,240</h3>
                <div className="flex items-center gap-1 text-success text-xs font-bold">
                  <TrendingUp size={14} /> +15% from yesterday
                </div>
              </div>

              <div className="card-premium space-y-4">
                <p className="text-xs font-bold text-text-secondary-light uppercase tracking-wider">Pending Clearance</p>
                <h3 className="text-3xl font-black dark:text-white">₹8,500</h3>
                <div className="flex items-center gap-1 text-warning text-xs font-bold">
                  <Clock size={14} /> Scheduled for May 05
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <div className="card-premium space-y-6">
                <h4 className="font-bold dark:text-white">Earnings Breakdown</h4>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="colorComm" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                      <XAxis dataKey="name" fontSize={12} />
                      <YAxis fontSize={12} />
                      <Tooltip />
                      <Area type="monotone" dataKey="commission" stroke="#10B981" fillOpacity={1} fill="url(#colorComm)" strokeWidth={3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="card-premium space-y-6">
                <h4 className="font-bold dark:text-white">Revenue Sources</h4>
                <div className="space-y-4">
                  {[
                    { label: 'Shop Commission', value: '₹28,450', percentage: 65, color: 'bg-emerald-500' },
                    { label: 'Membership Referral', value: '₹12,400', percentage: 25, color: 'bg-blue-500' },
                    { label: 'Incentive Bonuses', value: '₹2,000', percentage: 10, color: 'bg-orange-500' },
                  ].map((source, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between text-sm font-bold">
                        <span className="dark:text-white">{source.label}</span>
                        <span className="text-text-secondary-light">{source.value}</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 dark:bg-secondary-dark rounded-full overflow-hidden">
                        <div className={`h-full ${source.color}`} style={{ width: `${source.percentage}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pt-4 border-t dark:border-border-dark">
                  <button onClick={() => setActiveTab('Commission History')} className="w-full btn-outline py-2 text-sm">View Detailed Ledger</button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'Commission History':
        return (
          <div className="p-8 space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold dark:text-white">Commission Ledger</h3>
                <p className="text-sm text-text-secondary-light">Detailed breakdown of all earnings.</p>
              </div>
              <button className="btn-outline px-4 py-2 text-sm flex items-center gap-2"><Download size={18} /> Download Statement</button>
            </div>

            <div className="card-premium">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-border-light dark:border-border-dark">
                      <th className="pb-4 font-bold dark:text-white">Source</th>
                      <th className="pb-4 font-bold dark:text-white">Type</th>
                      <th className="pb-4 font-bold dark:text-white">Date</th>
                      <th className="pb-4 font-bold dark:text-white">Order Value</th>
                      <th className="pb-4 font-bold dark:text-white">Rate</th>
                      <th className="pb-4 font-bold dark:text-white">Earning</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-light dark:divide-border-dark">
                    {[
                      { source: 'Fresh Mart', type: 'Shop Sale', date: 'May 02, 2026', val: '₹1,250', rate: '5%', earn: '₹62.50' },
                      { source: 'Anjali G.', type: 'Membership', date: 'May 02, 2026', val: '₹9,999', rate: '10%', earn: '₹999.90' },
                      { source: 'Electro World', type: 'Shop Sale', date: 'May 01, 2026', val: '₹45,000', rate: '5%', earn: '₹2,250.00' },
                      { source: 'Gourmet Kitchen', type: 'Shop Sale', date: 'Apr 30, 2026', val: '₹2,800', rate: '5%', earn: '₹140.00' },
                      { source: 'System', type: 'Referral Bonus', date: 'Apr 28, 2026', val: 'N/A', rate: 'Flat', earn: '₹500.00' },
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-gray-50 dark:hover:bg-secondary-dark/50 transition-colors">
                        <td className="py-4 font-bold dark:text-white text-sm">{row.source}</td>
                        <td className="py-4 text-xs font-semibold text-text-secondary-light">{row.type}</td>
                        <td className="py-4 text-sm text-text-secondary-light">{row.date}</td>
                        <td className="py-4 text-sm dark:text-white">{row.val}</td>
                        <td className="py-4 text-sm text-text-secondary-light">{row.rate}</td>
                        <td className="py-4 font-black text-emerald-500 text-sm">{row.earn}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'Incentives & Rewards':
        return (
          <div className="p-8 space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold dark:text-white">Rewards Hub</h3>
                <p className="text-sm text-text-secondary-light">Achieve milestones to unlock exclusive rewards.</p>
              </div>
              <div className="p-3 bg-yellow-500/10 text-yellow-500 rounded-xl">
                <Award size={24} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Top District Agent', goal: '100 Members', progress: 85, reward: '₹10,000 Cash Bonus', icon: <TrendingUp /> },
                { title: 'Shop Networker', goal: '20 Shops', progress: 60, reward: 'Premium Tablet', icon: <Store /> },
                { title: 'Customer Favorite', goal: '4.8+ Rating', progress: 95, reward: 'VIP Club Entry', icon: <Star size={18} /> },
              ].map((reward, i) => (
                <div key={i} className="card-premium space-y-4 border-l-4 border-yellow-500">
                  <div className="flex justify-between items-start">
                    <div className="p-2 bg-yellow-500/10 text-yellow-600 rounded-lg">
                      {reward.icon}
                    </div>
                    <span className="text-[10px] font-black text-yellow-600 uppercase">In Progress</span>
                  </div>
                  <div>
                    <h4 className="font-bold dark:text-white">{reward.title}</h4>
                    <p className="text-xs text-text-secondary-light">Goal: {reward.goal}</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-bold">
                      <span className="dark:text-white">Progress</span>
                      <span className="text-yellow-600">{reward.progress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-100 dark:bg-secondary-dark rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-500" style={{ width: `${reward.progress}%` }}></div>
                    </div>
                  </div>
                  <div className="pt-2">
                    <p className="text-[10px] text-text-secondary-light font-bold uppercase">Reward</p>
                    <p className="text-sm font-black dark:text-white">{reward.reward}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="card-premium bg-gradient-to-br from-primary-light to-primary-dark text-white border-none">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1 space-y-4">
                  <h3 className="text-3xl font-black">Annual Mega Bonus!</h3>
                  <p className="text-sm opacity-90 leading-relaxed">
                    Top performing agent of the year wins a **Fully Paid 3-Day Luxury Resort Trip** for two and a **Diamond Performance Trophy**.
                  </p>
                  <div className="flex gap-4">
                    <button className="px-6 py-2 bg-white text-primary-light font-bold rounded-xl text-sm">Check Leaderboard</button>
                    <button className="px-6 py-2 bg-white/20 font-bold rounded-xl text-sm border border-white/30 backdrop-blur-sm">View Terms</button>
                  </div>
                </div>
                <div className="w-48 h-48 bg-white/10 rounded-3xl flex items-center justify-center backdrop-blur-md rotate-12">
                  <Award size={80} className="text-accent-dark" />
                </div>
              </div>
            </div>
          </div>
        );

      case 'Payout Requests':
        return (
          <div className="p-8 max-w-4xl animate-in slide-in-from-bottom-4 duration-500">
            <div className="card-premium space-y-8">
              <div className="border-b dark:border-border-dark pb-6">
                <h3 className="text-2xl font-bold dark:text-white">Payout Management</h3>
                <p className="text-text-secondary-light">Withdraw your earnings to your linked bank account.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="p-6 bg-gray-50 dark:bg-secondary-dark rounded-2xl border border-border-light dark:border-border-dark">
                    <p className="text-xs font-bold text-text-secondary-light uppercase tracking-widest">Available for Payout</p>
                    <h3 className="text-4xl font-black dark:text-white mt-2">₹12,450</h3>
                    <div className="mt-6 space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-text-secondary-light">Linked Bank</span>
                        <span className="font-bold dark:text-white">HDFC Bank **** 9921</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-text-secondary-light">Transfer Speed</span>
                        <span className="font-bold text-success">Instant (IMPS)</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-text-secondary-light uppercase">Withdrawal Amount</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold dark:text-white">₹</span>
                      <input type="number" placeholder="0.00" className="w-full pl-8 pr-4 py-3 bg-gray-50 dark:bg-secondary-dark border border-border-light dark:border-border-dark rounded-xl outline-none focus:ring-2 focus:ring-primary-light" />
                    </div>
                    <div className="flex gap-2 pt-2">
                      {[5000, 10000, 'Max'].map((v, i) => (
                        <button key={i} className="px-3 py-1 bg-gray-100 dark:bg-secondary-dark rounded-lg text-[10px] font-bold text-text-secondary-light hover:bg-primary-light hover:text-white transition-all">{v}</button>
                      ))}
                    </div>
                  </div>

                  <button className="w-full btn-primary py-4 rounded-xl font-bold text-lg">Confirm Withdrawal</button>
                </div>

                <div className="space-y-6">
                  <h4 className="font-bold dark:text-white">Recent Payouts</h4>
                  <div className="space-y-4">
                    {[
                      { date: 'Apr 25, 2026', amount: '₹15,000', status: 'Completed' },
                      { date: 'Apr 12, 2026', amount: '₹8,400', status: 'Completed' },
                      { date: 'Mar 30, 2026', amount: '₹22,000', status: 'Completed' },
                    ].map((p, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-secondary-dark rounded-xl">
                        <div>
                          <p className="text-sm font-bold dark:text-white">{p.amount}</p>
                          <p className="text-[10px] text-text-secondary-light">{p.date}</p>
                        </div>
                        <span className="text-[10px] font-bold text-success flex items-center gap-1"><CheckCircle size={12} /> {p.status}</span>
                      </div>
                    ))}
                  </div>
                  <button className="w-full btn-outline py-2 text-sm">Download History</button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'Analytics':
        return (
          <div className="p-8 space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold dark:text-white">Deep Analytics</h3>
                <p className="text-sm text-text-secondary-light">Performance metrics across your territory.</p>
              </div>
              <select className="bg-gray-100 dark:bg-secondary-dark border-none rounded-lg text-sm dark:text-white px-4 py-2 outline-none">
                <option>Monthly View</option>
                <option>Quarterly View</option>
                <option>Yearly View</option>
              </select>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2 card-premium space-y-6">
                <h4 className="font-bold dark:text-white">Network Growth vs Sales</h4>
                <div className="h-[350px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                      <XAxis dataKey="name" fontSize={12} />
                      <YAxis fontSize={12} />
                      <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
                      <Line type="monotone" dataKey="sales" stroke="#10B981" strokeWidth={3} dot={{ r: 4 }} />
                      <Line type="monotone" dataKey="commission" stroke="#3B82F6" strokeWidth={3} dot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-8">
                  <div className="flex items-center gap-2"><span className="w-3 h-3 bg-emerald-500 rounded-full"></span> <span className="text-xs dark:text-white font-bold">Total Sales</span></div>
                  <div className="flex items-center gap-2"><span className="w-3 h-3 bg-blue-500 rounded-full"></span> <span className="text-xs dark:text-white font-bold">Your Commission</span></div>
                </div>
              </div>

              <div className="card-premium space-y-6">
                <h4 className="font-bold dark:text-white">Category Performance</h4>
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RePieChart>
                      <Pie
                        data={[
                          { name: 'Grocery', value: 45 },
                          { name: 'Electronics', value: 25 },
                          { name: 'Fashion', value: 20 },
                          { name: 'Other', value: 10 },
                        ]}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {['#10B981', '#3B82F6', '#F59E0B', '#6366F1'].map((color, i) => (
                          <Cell key={i} fill={color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RePieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-3">
                  {[
                    { name: 'Grocery', value: '45%', color: 'bg-emerald-500' },
                    { name: 'Electronics', value: '25%', color: 'bg-blue-500' },
                    { name: 'Fashion', value: '20%', color: 'bg-orange-500' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
                        <span className="text-xs dark:text-white font-medium">{item.name}</span>
                      </div>
                      <span className="text-xs font-bold dark:text-white">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'Reports':
        return (
          <div className="p-8 max-w-4xl animate-in slide-in-from-bottom-4 duration-500">
            <div className="card-premium space-y-8">
              <div className="flex justify-between items-center border-b dark:border-border-dark pb-6">
                <div>
                  <h3 className="text-2xl font-bold dark:text-white">Business Reports</h3>
                  <p className="text-text-secondary-light">Download professional reports for your business audit.</p>
                </div>
                <div className="p-3 bg-primary-light/10 text-primary-light rounded-xl">
                  <BarChart2 size={24} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: 'Monthly Earnings Summary', desc: 'Detailed breakdown of all shop and membership commissions.', type: 'PDF / Excel' },
                  { title: 'Network Growth Audit', desc: 'Level-wise downline performance and onboarding stats.', type: 'PDF' },
                  { title: 'Territory Health Report', desc: 'Pincode-wise sales density and shop performance audit.', type: 'PDF' },
                  { title: 'Tax & Compliance', desc: 'Annual commission summary for tax filing purposes.', type: 'Excel' },
                ].map((report, i) => (
                  <div key={i} className="p-5 bg-gray-50 dark:bg-secondary-dark rounded-2xl border border-border-light dark:border-border-dark group hover:border-primary-light transition-all cursor-pointer">
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-2 bg-white dark:bg-surface-dark rounded-lg shadow-sm">
                        <FileText className="text-primary-light" size={20} />
                      </div>
                      <button className="p-2 text-text-secondary-light hover:text-primary-light transition-colors"><Download size={18} /></button>
                    </div>
                    <h4 className="font-bold dark:text-white mb-1">{report.title}</h4>
                    <p className="text-xs text-text-secondary-light leading-relaxed mb-4">{report.desc}</p>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-primary-light/10 text-primary-light text-[10px] font-bold rounded-md">{report.type}</span>
                      <span className="text-[10px] text-text-secondary-light font-bold">Ready for download</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'Notifications':
        return (
          <div className="p-8 max-w-4xl animate-in slide-in-from-bottom-4 duration-500">
            <div className="card-premium space-y-6">
              <div className="flex justify-between items-center border-b dark:border-border-dark pb-6">
                <div>
                  <h3 className="text-2xl font-bold dark:text-white">Notifications</h3>
                  <p className="text-sm text-text-secondary-light">Stay updated with your business activities.</p>
                </div>
                <button className="text-xs font-bold text-primary-light hover:underline">Mark all as read</button>
              </div>

              <div className="space-y-4">
                {[
                  { title: 'Payout Successful', desc: '₹15,000 has been credited to your bank account.', time: '2h ago', type: 'success', icon: <CheckCircle /> },
                  { title: 'New Member Registered', desc: 'Rahul Sharma joined your downline via your link.', time: '5h ago', type: 'info', icon: <Users /> },
                  { title: 'Target Alert!', desc: 'You are only ₹75,000 away from your monthly target.', time: '1d ago', type: 'warning', icon: <AlertCircle /> },
                  { title: 'System Update', desc: 'AgentHub will be down for maintenance tonight at 2 AM.', time: '2d ago', type: 'error', icon: <Settings /> },
                ].map((notif, i) => (
                  <div key={i} className="flex gap-4 p-4 bg-gray-50 dark:bg-secondary-dark rounded-2xl group cursor-pointer hover:bg-gray-100 dark:hover:bg-secondary-dark/80 transition-all">
                    <div className={`p-3 rounded-xl h-fit ${
                      notif.type === 'success' ? 'bg-success/10 text-success' : 
                      notif.type === 'info' ? 'bg-blue-500/10 text-blue-500' : 
                      notif.type === 'warning' ? 'bg-warning/10 text-warning' : 'bg-error/10 text-error'
                    }`}>
                      {React.cloneElement(notif.icon, { size: 20 })}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold dark:text-white text-sm">{notif.title}</h4>
                        <span className="text-[10px] text-text-secondary-light font-medium">{notif.time}</span>
                      </div>
                      <p className="text-xs text-text-secondary-light mt-1">{notif.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full btn-outline py-3 text-sm">Load Older Notifications</button>
            </div>
          </div>
        );

      case 'Support / Tickets':
        return (
          <div className="p-8 space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold dark:text-white">Support Center</h3>
                <p className="text-sm text-text-secondary-light">We are here to help you grow your business.</p>
              </div>
              <button className="btn-primary px-6 py-2 text-sm flex items-center gap-2"><LifeBuoy size={18} /> Raise New Ticket</button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="card-premium space-y-6">
                  <h4 className="font-bold dark:text-white">Your Support Tickets</h4>
                  <div className="space-y-4">
                    {[
                      { id: '#T-8821', subject: 'Payout Delayed for West Zone', status: 'Open', date: 'May 01, 2026' },
                      { id: '#T-8740', subject: 'Shop Onboarding Document Error', status: 'Resolved', date: 'Apr 25, 2026' },
                      { id: '#T-8692', subject: 'Membership Commission Discrepancy', status: 'Resolved', date: 'Apr 12, 2026' },
                    ].map((ticket, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-secondary-dark rounded-xl border border-border-light dark:border-border-dark group cursor-pointer hover:border-primary-light transition-all">
                        <div className="flex items-center gap-4">
                          <div className={`w-2 h-2 rounded-full ${ticket.status === 'Open' ? 'bg-primary-light animate-pulse' : 'bg-success'}`}></div>
                          <div>
                            <p className="text-sm font-bold dark:text-white group-hover:text-primary-light transition-colors">{ticket.subject}</p>
                            <p className="text-[10px] text-text-secondary-light">{ticket.id} • Last updated on {ticket.date}</p>
                          </div>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          ticket.status === 'Open' ? 'bg-primary-light/10 text-primary-light' : 'bg-success/10 text-success'
                        }`}>{ticket.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="card-premium space-y-4">
                  <h4 className="font-bold dark:text-white">Quick Help</h4>
                  <div className="space-y-3">
                    {[
                      'How to withdraw earnings?',
                      'Onboarding shop guidelines',
                      'Territory rights policy',
                      'Commission rate slabs'
                    ].map((faq, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-secondary-dark rounded-xl cursor-pointer hover:bg-primary-light/5 transition-all group">
                        <span className="text-xs dark:text-white font-medium group-hover:text-primary-light transition-colors">{faq}</span>
                        <ChevronRight size={14} className="text-text-secondary-light group-hover:translate-x-1 transition-transform" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="card-premium bg-emerald-500 text-white border-none text-center space-y-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                    <MessageSquare size={24} />
                  </div>
                  <h4 className="font-bold">Live Chat</h4>
                  <p className="text-xs opacity-90">Instant support available 9 AM - 6 PM.</p>
                  <button className="w-full bg-white text-emerald-500 font-bold py-2 rounded-xl text-sm">Start Chat</button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'Admin Messages':
        return (
          <div className="p-8 max-w-4xl animate-in slide-in-from-bottom-4 duration-500">
            <div className="card-premium space-y-8">
              <div className="border-b dark:border-border-dark pb-6">
                <h3 className="text-2xl font-bold dark:text-white">Admin Messages</h3>
                <p className="text-sm text-text-secondary-light">Direct communications from the corporate hub.</p>
              </div>

              <div className="space-y-6">
                {[
                  { sender: 'Corporate Admin', title: 'New Sales Policy Q2 2026', body: 'Please review the updated commission structure for grocery partners effective from June 1st.', date: 'May 02, 2026', unread: true },
                  { sender: 'District Manager', title: 'Weekend Workshop Invitation', body: 'You are invited to our monthly agent performance workshop at the Central Hub this Sunday.', date: 'May 01, 2026', unread: false },
                  { sender: 'Security Team', title: 'Account Security Review', body: 'We have noticed a new login to your dashboard from a different location. Please verify if it was you.', date: 'Apr 28, 2026', unread: false },
                ].map((msg, i) => (
                  <div key={i} className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                    msg.unread ? 'bg-primary-light/5 border-primary-light/20 shadow-sm' : 'bg-gray-50 dark:bg-secondary-dark/50 border-border-light dark:border-border-dark'
                  }`}>
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary-light text-white rounded-lg flex items-center justify-center text-xs font-bold">{msg.sender[0]}</div>
                        <div>
                          <p className="text-[10px] font-bold text-primary-light uppercase tracking-widest">{msg.sender}</p>
                          <h4 className="text-sm font-bold dark:text-white">{msg.title}</h4>
                        </div>
                      </div>
                      <p className="text-[10px] text-text-secondary-light font-bold">{msg.date}</p>
                    </div>
                    <p className="text-xs text-text-secondary-light leading-relaxed">{msg.body}</p>
                    <div className="mt-4 flex gap-3">
                      <button className="text-xs font-bold text-primary-light hover:underline">Reply</button>
                      <button className="text-xs font-bold text-text-secondary-light hover:underline">Archive</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'Settings':
        return (
          <div className="p-8 max-w-4xl animate-in slide-in-from-bottom-4 duration-500">
            <div className="card-premium space-y-8">
              <div className="border-b dark:border-border-dark pb-6">
                <h3 className="text-2xl font-bold dark:text-white">Settings</h3>
                <p className="text-sm text-text-secondary-light">Configure your account and notification preferences.</p>
              </div>

              <div className="space-y-8">
                <div className="space-y-4">
                  <h4 className="font-bold dark:text-white text-sm flex items-center gap-2"><User size={18} /> Profile Settings</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 dark:bg-secondary-dark rounded-xl flex items-center justify-between">
                      <span className="text-sm dark:text-white">Edit Personal Info</span>
                      <ChevronRight size={16} className="text-text-secondary-light" />
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-secondary-dark rounded-xl flex items-center justify-between">
                      <span className="text-sm dark:text-white">Language: English</span>
                      <ChevronRight size={16} className="text-text-secondary-light" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-bold dark:text-white text-sm flex items-center gap-2"><Lock size={18} /> Security</h4>
                  <div className="space-y-3">
                    <div className="p-4 bg-gray-50 dark:bg-secondary-dark rounded-xl flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-sm dark:text-white">Change Password</span>
                        <span className="text-[10px] text-text-secondary-light">Last changed 3 months ago</span>
                      </div>
                      <button className="btn-outline px-3 py-1 text-xs">Update</button>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-secondary-dark rounded-xl flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-sm dark:text-white">Two-Factor Authentication</span>
                        <span className="text-[10px] text-text-secondary-light">Secured via email and phone</span>
                      </div>
                      <div className="w-10 h-5 bg-success rounded-full relative p-1 cursor-pointer">
                        <div className="absolute right-1 w-3 h-3 bg-white rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-bold dark:text-white text-sm flex items-center gap-2"><Bell size={18} /> Notifications</h4>
                  <div className="space-y-3">
                    {['Email Alerts', 'SMS Notifications', 'Browser Pushes', 'Commission Alerts'].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-2">
                        <span className="text-sm dark:text-white">{item}</span>
                        <div className="w-10 h-5 bg-primary-light rounded-full relative p-1 cursor-pointer">
                          <div className="absolute right-1 w-3 h-3 bg-white rounded-full"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t dark:border-border-dark flex justify-end gap-4">
                <button className="btn-outline px-6 py-2 text-sm font-bold">Discard Changes</button>
                <button className="btn-primary px-8 py-2 text-sm font-bold">Save All Settings</button>
              </div>
            </div>
          </div>
        );
      case 'Agent Application':
        return (
          <div className="p-8 max-w-4xl animate-in slide-in-from-bottom-4 duration-500 mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-black dark:text-white">Agent Application</h2>
              <p className="text-text-secondary-light mt-2">Complete the steps below to fully register as an AgenticStore Agent.</p>
            </div>

            {/* Stepper */}
            <div className="flex items-center justify-center mb-12 max-w-3xl mx-auto relative">
              {[
                { step: 1, label: 'APPLICATION' },
                { step: 2, label: 'PAYMENT' },
                { step: 3, label: 'KYC UPLOAD' },
                { step: 4, label: 'SUBMITTED' }
              ].map((s, i) => (
                <React.Fragment key={s.step}>
                  <div className="flex flex-col items-center relative z-10">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-500 shadow-lg
                      ${applicationStep >= s.step 
                        ? 'bg-primary-light text-white ring-4 ring-primary-light/20 scale-110' 
                        : 'bg-gray-100 dark:bg-secondary-dark text-text-secondary-light dark:text-text-secondary-dark'}`}
                    >
                      {applicationStep > s.step ? <CheckCircle size={24} /> : s.step}
                    </div>
                    <span className={`absolute -bottom-6 text-[10px] font-black uppercase tracking-widest whitespace-nowrap
                      ${applicationStep >= s.step ? 'text-primary-light' : 'text-text-secondary-light dark:text-text-secondary-dark'}`}
                    >
                      {s.label}
                    </span>
                  </div>
                  {i < 3 && (
                    <div className="flex-1 h-1 mx-4 rounded-full relative overflow-hidden bg-gray-100 dark:bg-secondary-dark">
                      <div className="absolute inset-y-0 left-0 bg-primary-light transition-all duration-500" 
                           style={{ width: applicationStep > s.step ? '100%' : '0%' }}></div>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Step 1: Form */}
            {applicationStep === 1 && (
              <div className="card-premium space-y-8">
                <div className="flex items-center gap-3 border-b dark:border-border-dark pb-4">
                  <div className="p-2 bg-primary-light/10 text-primary-light rounded-lg"><User size={20} /></div>
                  <h3 className="text-xl font-bold dark:text-white">Personal Information</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-text-secondary-light uppercase">Full Name</label>
                    <input type="text" className="w-full px-4 py-3 bg-gray-50 dark:bg-secondary-dark border border-border-light dark:border-border-dark rounded-xl outline-none" defaultValue={user?.name || ''} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-text-secondary-light uppercase">Phone Number</label>
                    <input type="text" className="w-full px-4 py-3 bg-gray-50 dark:bg-secondary-dark border border-border-light dark:border-border-dark rounded-xl outline-none" defaultValue={user?.phone || ''} readOnly />
                  </div>
                </div>

                <div className="flex items-center gap-3 border-b dark:border-border-dark pb-4 pt-4">
                  <div className="p-2 bg-orange-500/10 text-orange-500 rounded-lg"><Map size={20} /></div>
                  <h3 className="text-xl font-bold dark:text-white">Territory Details</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-text-secondary-light uppercase">Agent Role</label>
                    <select className="w-full px-4 py-3 bg-gray-50 dark:bg-secondary-dark border border-border-light dark:border-border-dark rounded-xl outline-none dark:text-white">
                      <option>Pincode Agent</option>
                      <option>Division/Taluk Agent</option>
                      <option>District Agent</option>
                      <option>State Agent</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-text-secondary-light uppercase">State</label>
                    <select className="w-full px-4 py-3 bg-gray-50 dark:bg-secondary-dark border border-border-light dark:border-border-dark rounded-xl outline-none dark:text-white">
                      <option>Maharashtra</option>
                      <option>Karnataka</option>
                      <option>Delhi</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-text-secondary-light uppercase">Pincode</label>
                    <input type="text" className="w-full px-4 py-3 bg-gray-50 dark:bg-secondary-dark border border-border-light dark:border-border-dark rounded-xl outline-none" placeholder="e.g. 400001" />
                  </div>
                </div>

                <div className="pt-6 border-t dark:border-border-dark flex justify-end">
                  <button onClick={() => setApplicationStep(2)} className="btn-primary px-10 py-4 rounded-xl text-lg w-full md:w-auto">Proceed to Payment</button>
                </div>
              </div>
            )}

            {/* Step 2: Payment */}
            {applicationStep === 2 && (
              <div className="card-premium space-y-8">
                <div className="text-center">
                  <h3 className="text-2xl font-bold dark:text-white">Security Deposit</h3>
                  <p className="text-text-secondary-light mt-1">A refundable deposit is required to activate your agent account.</p>
                </div>

                <div className="max-w-md mx-auto p-8 bg-gradient-to-br from-primary-light/10 to-transparent rounded-2xl border-2 border-primary-light/20 relative overflow-hidden text-center">
                  <div className="relative z-10">
                    <span className="text-xs font-bold text-primary-light uppercase tracking-widest">Amount to Pay</span>
                    <h2 className="text-5xl font-black dark:text-white mt-2 mb-6">₹1,00,000</h2>
                    <ul className="text-sm text-left space-y-3 mb-8 text-text-secondary-light">
                      <li className="flex gap-2"><CheckCircle size={16} className="text-success" /> Fully refundable after 1 year</li>
                      <li className="flex gap-2"><CheckCircle size={16} className="text-success" /> Secures your exclusive territory rights</li>
                      <li className="flex gap-2"><CheckCircle size={16} className="text-success" /> Unlocks immediate dashboard access</li>
                    </ul>
                    <button 
                      onClick={() => {
                        setIsProcessing(true);
                        setTimeout(() => { setIsProcessing(false); setApplicationStep(3); }, 2000);
                      }}
                      disabled={isProcessing}
                      className="w-full btn-primary py-4 rounded-xl text-lg flex items-center justify-center gap-2"
                    >
                      {isProcessing ? 'Processing...' : 'Pay Securely'}
                    </button>
                  </div>
                  <Lock size={120} className="absolute -right-10 -bottom-10 text-primary-light/5 rotate-12" />
                </div>
                
                <div className="text-center">
                  <button onClick={() => setApplicationStep(1)} className="text-sm font-bold text-text-secondary-light hover:text-primary-light">← Back to Form</button>
                </div>
              </div>
            )}

            {/* Step 3: KYC */}
            {applicationStep === 3 && (
              <div className="card-premium space-y-8">
                <div className="flex items-center justify-between border-b dark:border-border-dark pb-4">
                  <h3 className="text-xl font-bold dark:text-white flex items-center gap-2"><ShieldCheck className="text-primary-light" /> KYC Verification</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {['Aadhar Card', 'PAN Card', 'Passport Photo'].map((doc) => (
                    <div key={doc} className="p-6 border-2 border-dashed border-border-light dark:border-border-dark rounded-2xl flex flex-col items-center justify-center gap-3 hover:border-primary-light transition-colors group cursor-pointer bg-gray-50 dark:bg-secondary-dark">
                      <div className="p-3 bg-white dark:bg-surface-dark rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                        <PlusSquare className="text-text-secondary-light group-hover:text-primary-light" size={24} />
                      </div>
                      <span className="text-sm font-bold dark:text-white text-center">Upload {doc}</span>
                      <span className="text-[10px] text-text-secondary-light">Max 5MB (JPG/PNG/PDF)</span>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t dark:border-border-dark flex justify-between items-center">
                  <button onClick={() => setApplicationStep(2)} className="text-sm font-bold text-text-secondary-light hover:text-primary-light">← Back</button>
                  <button onClick={() => setApplicationStep(4)} className="btn-primary px-10 py-4 rounded-xl text-lg">Submit Application</button>
                </div>
              </div>
            )}

            {/* Step 4: Success */}
            {applicationStep === 4 && (
              <div className="card-premium text-center py-16 space-y-6">
                <div className="w-24 h-24 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto mb-6 relative">
                  <div className="absolute inset-0 bg-success/20 rounded-full animate-ping"></div>
                  <CheckCircle size={48} />
                </div>
                <h2 className="text-3xl font-black dark:text-white">Application Submitted!</h2>
                <p className="text-text-secondary-light max-w-md mx-auto">
                  Your application and payment of ₹1,00,000 has been received. Our compliance team will review your KYC documents within 24-48 hours.
                </p>
                <div className="inline-block p-4 bg-gray-50 dark:bg-secondary-dark rounded-2xl border border-border-light dark:border-border-dark my-8">
                  <p className="text-xs text-text-secondary-light uppercase font-bold tracking-widest">Application Reference</p>
                  <p className="text-xl font-mono font-bold dark:text-white mt-1">AGT-APP-9982X</p>
                </div>
                <div>
                  <button onClick={() => setActiveTab('Dashboard')} className="btn-primary px-10 py-4 rounded-xl text-lg">
                    Go to Dashboard
                  </button>
                </div>
              </div>
            )}
          </div>
        );


      default:
        return (
          <div className="p-20 text-center animate-in zoom-in duration-500">
            <div className="w-20 h-20 bg-primary-light/10 text-primary-light rounded-full flex items-center justify-center mx-auto mb-6">
              <LayoutDashboard size={40} />
            </div>
            <h3 className="text-2xl font-bold dark:text-white mb-4">{activeTab} Section</h3>
            <p className="text-text-secondary-light max-w-md mx-auto">
              This module is currently being finalized to provide you with the best management experience.
            </p>
            <button 
              onClick={() => setActiveTab('Dashboard')}
              className="mt-8 btn-primary px-8 py-3 rounded-xl shadow-lg shadow-primary-light/20"
            >
              Return to Dashboard
            </button>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-background-light dark:bg-background-dark overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 bg-surface-light dark:bg-surface-dark border-r border-border-light dark:border-border-dark hidden lg:flex flex-col shadow-2xl z-20">
        <div className="p-6 border-b dark:border-border-dark">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-light dark:bg-primary-dark rounded-xl flex items-center justify-center shadow-lg shadow-primary-light/20 transition-transform">
              <span className="text-white font-black text-xl">A</span>
            </div>
            <div>
              <span className="font-black text-xl dark:text-white block leading-tight tracking-tight">Agent<span className="text-primary-light">Hub</span></span>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-4 custom-scrollbar">
          <SidebarSection title="MAIN">
            <SidebarLink icon={<LayoutDashboard size={18} />} label="Dashboard" active={activeTab === 'Dashboard'} onClick={() => setActiveTab('Dashboard')} />
          </SidebarSection>

          <SidebarSection title="PROFILE">
            <SidebarLink icon={<FileText size={18} />} label="Agent Application" active={activeTab === 'Agent Application'} onClick={() => setActiveTab('Agent Application')} />
            <SidebarLink icon={<User size={18} />} label="My Profile" active={activeTab === 'My Profile'} onClick={() => setActiveTab('My Profile')} />
            <SidebarLink icon={<ShieldCheck size={18} />} label="KYC Status" active={activeTab === 'KYC Status'} onClick={() => setActiveTab('KYC Status')} />
            <SidebarLink icon={<Lock size={18} />} label="Security Deposit" active={activeTab === 'Security Deposit'} onClick={() => setActiveTab('Security Deposit')} />
          </SidebarSection>

          <SidebarSection title="NETWORK">
            <SidebarLink icon={<Users size={18} />} label="My Members" active={activeTab === 'My Members'} onClick={() => setActiveTab('My Members')} badge="156" />
            <SidebarLink icon={<GitBranch size={18} />} label="Downline Tree" active={activeTab === 'Downline Tree'} onClick={() => setActiveTab('Downline Tree')} />
            <SidebarLink icon={<LinkIcon size={18} />} label="Referral Links" active={activeTab === 'Referral Links'} onClick={() => setActiveTab('Referral Links')} />
          </SidebarSection>

          <SidebarSection title="OPERATIONS">
            <SidebarLink icon={<Map size={18} />} label="Territory Management" active={activeTab === 'Territory Management'} onClick={() => setActiveTab('Territory Management')} />
            <SidebarLink icon={<PlusSquare size={18} />} label="Shop Tie-Up" active={activeTab === 'Shop Tie-Up'} onClick={() => setActiveTab('Shop Tie-Up')} />
            <SidebarLink icon={<Store size={18} />} label="Shop List" active={activeTab === 'Shop List'} onClick={() => setActiveTab('Shop List')} badge="12" />
            <SidebarLink icon={<CheckSquare size={18} />} label="Daily Tasks" active={activeTab === 'Daily Tasks'} onClick={() => setActiveTab('Daily Tasks')} />
          </SidebarSection>

          <SidebarSection title="BUSINESS">
            <SidebarLink icon={<Target size={18} />} label="Sales Targets" active={activeTab === 'Sales Targets'} onClick={() => setActiveTab('Sales Targets')} />
            <SidebarLink icon={<ShoppingBag size={18} />} label="Leads / Orders" active={activeTab === 'Leads / Orders'} onClick={() => setActiveTab('Leads / Orders')} />
            <SidebarLink icon={<CreditCard size={18} />} label="Membership Sales" active={activeTab === 'Membership Sales'} onClick={() => setActiveTab('Membership Sales')} />
          </SidebarSection>

          <SidebarSection title="EARNINGS">
            <SidebarLink icon={<Wallet size={18} />} label="Wallet / Earnings" active={activeTab === 'Wallet / Earnings'} onClick={() => setActiveTab('Wallet / Earnings')} />
            <SidebarLink icon={<History size={18} />} label="Commission History" active={activeTab === 'Commission History'} onClick={() => setActiveTab('Commission History')} />
            <SidebarLink icon={<Award size={18} />} label="Incentives & Rewards" active={activeTab === 'Incentives & Rewards'} onClick={() => setActiveTab('Incentives & Rewards')} />
            <SidebarLink icon={<ArrowUpRight size={18} />} label="Payout Requests" active={activeTab === 'Payout Requests'} onClick={() => setActiveTab('Payout Requests')} />
          </SidebarSection>

          <SidebarSection title="PERFORMANCE">
            <SidebarLink icon={<TrendingUp size={18} />} label="Analytics" active={activeTab === 'Analytics'} onClick={() => setActiveTab('Analytics')} />
            <SidebarLink icon={<BarChart2 size={18} />} label="Reports" active={activeTab === 'Reports'} onClick={() => setActiveTab('Reports')} />
          </SidebarSection>

          <SidebarSection title="COMMUNICATION">
            <SidebarLink icon={<Bell size={18} />} label="Notifications" active={activeTab === 'Notifications'} onClick={() => setActiveTab('Notifications')} />
            <SidebarLink icon={<LifeBuoy size={18} />} label="Support / Tickets" active={activeTab === 'Support / Tickets'} onClick={() => setActiveTab('Support / Tickets')} />
            <SidebarLink icon={<MessageSquare size={18} />} label="Admin Messages" active={activeTab === 'Admin Messages'} onClick={() => setActiveTab('Admin Messages')} />
          </SidebarSection>

          <SidebarSection title="SYSTEM">
            <SidebarLink icon={<Settings size={18} />} label="Settings" active={activeTab === 'Settings'} onClick={() => setActiveTab('Settings')} />
            <div 
              onClick={handleLogout} 
              className="flex items-center justify-center p-4 rounded-2xl cursor-pointer bg-error/5 hover:bg-error/10 border border-error/10 transition-all duration-500 group overflow-hidden relative shadow-sm"
            >
              <div className="relative z-10">
                <span className="font-black text-sm text-error/80 group-hover:text-error transition-colors tracking-widest uppercase">Logout</span>
              </div>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 ease-in-out"></div>
            </div>
          </SidebarSection>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative">
        <header className="h-20 bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-md border-b border-border-light dark:border-border-dark flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm">
          <div>
            <h2 className="text-2xl font-bold dark:text-white tracking-tight">{activeTab}</h2>
            <p className="text-xs text-text-secondary-light font-medium">Agent ID: AGT-882901 — Welcome back, {user?.name?.split(' ')[0]}!</p>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-bold text-emerald-500">Live Status</span>
            </div>
            
            <div className="h-8 w-px bg-border-light dark:border-border-dark"></div>

            <button 
              onClick={toggleTheme}
              className="p-2.5 text-text-secondary-light dark:text-text-secondary-dark relative hover:bg-gray-100 dark:hover:bg-secondary-dark rounded-xl transition-all hover:scale-110 active:scale-95"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} className="text-blue-600" />}
            </button>

            <button className="p-2.5 text-text-secondary-light dark:text-text-secondary-dark relative hover:bg-gray-100 dark:hover:bg-secondary-dark rounded-xl transition-all hover:scale-110">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full ring-2 ring-surface-light dark:ring-surface-dark"></span>
            </button>
            
            <div className="flex items-center gap-3 pl-2 border-l border-border-light dark:border-border-dark">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-black dark:text-white leading-none">AgentHub</p>
              </div>
              <div className="w-11 h-11 bg-primary-light rounded-2xl flex items-center justify-center text-white font-black shadow-lg shadow-primary-light/20">
                A
              </div>
            </div>
          </div>
        </header>

        <div className="animate-in fade-in slide-in-from-top-2 duration-700">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

const SidebarSection = ({ title, children }) => (
  <div className="mb-6 last:mb-0">
    <p className="text-[10px] font-black text-text-secondary-light dark:text-text-secondary-dark/40 tracking-[0.2em] px-3 mb-2 uppercase">
      {title}
    </p>
    <div className="space-y-1">
      {children}
    </div>
  </div>
);

const SidebarLink = ({ icon, label, active, onClick, badge }) => (
  <div 
    onClick={onClick}
    className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all duration-300 group ${
      active 
        ? 'bg-primary-light/10 text-primary-light border border-primary-light/20 shadow-sm' 
        : 'text-text-secondary-light dark:text-text-secondary-dark hover:bg-gray-100 dark:hover:bg-secondary-dark hover:translate-x-1'
    }`}
  >
    <div className="flex items-center gap-3">
      <div className={`transition-transform duration-300 ${active ? 'scale-110' : 'group-hover:scale-110'}`}>
        {icon}
      </div>
      <span className={`text-sm font-bold tracking-tight ${active ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'}`}>
        {label}
      </span>
    </div>
    {badge && (
      <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-black ${
        active ? 'bg-primary-light text-white' : 'bg-gray-100 dark:bg-secondary-dark text-text-secondary-light'
      }`}>
        {badge}
      </span>
    )}
  </div>
);

const ProfileItem = ({ label, value }) => (
  <div className="flex flex-col gap-1">
    <span className="text-[10px] font-bold text-text-secondary-light uppercase tracking-wider">{label}</span>
    <span className="text-sm font-bold dark:text-white">{value}</span>
  </div>
);

export default AgentDashboard;
