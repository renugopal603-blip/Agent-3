import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { 
  Users, Store, ShoppingCart, TrendingUp, 
  ShieldCheck, AlertCircle, DollarSign, Target,
  LayoutDashboard, Map, Settings, Bell,
  CheckSquare, CheckCircle, FileText, BarChart2,
  Clock, LogOut, Briefcase, LifeBuoy, Sun, Moon, User,
  Lock, BellRing, Palette, ChevronRight,
  Key, History, X, Edit, Eye, XCircle
} from 'lucide-react';

import { useNotifications } from '../../context/NotificationContext';

const SubAdminDashboard = () => {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const { addNotification } = useNotifications();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [selectedShop, setSelectedShop] = useState(null);

  const [systemUsers, setSystemUsers] = useState([
    { id: 1, name: 'Amit Kumar', role: 'Sub Admin', phone: '+91 98765 43210', email: 'amit@adminhub.com', location: 'Delhi', status: 'Active', lastLogin: '2026-05-04 10:30', riskLevel: 'Low' },
    { id: 2, name: 'Rajesh Singh', role: 'Agent', phone: '+91 87654 32109', email: 'rajesh@agent.com', location: 'Mumbai', status: 'Suspended', lastLogin: '2026-05-03 15:45', riskLevel: 'Medium' },
    { id: 3, name: 'Sunil Verma', role: 'Shop Owner', phone: '+91 76543 21098', email: 'sunil@shop.com', location: 'Pune', status: 'Deactivated', lastLogin: '2026-04-28 09:12', riskLevel: 'High' },
    { id: 4, name: 'Priya Das', role: 'Customer', phone: '+91 65432 10987', email: 'priya@gmail.com', location: 'Kolkata', status: 'Blocked', lastLogin: '2026-05-01 18:20', riskLevel: 'Critical' }
  ]);

  const [systemActivityLogs, setSystemActivityLogs] = useState([
    { id: 1, user: 'Amit Kumar', action: 'Login', module: 'Auth', timestamp: '2026-05-04 10:30', status: 'Success', ip: '192.168.1.1' },
    { id: 2, user: 'Rajesh Singh', action: 'Upload KYC', module: 'Verification', timestamp: '2026-05-03 15:40', status: 'Success', ip: '192.168.1.5' }
  ]);

  const [selectedSystemUser, setSelectedSystemUser] = useState(null);
  const [showEscalateModal, setShowEscalateModal] = useState(false);
  const [escalateReason, setEscalateReason] = useState('Suspicious Activity');
  const [escalateNotes, setEscalateNotes] = useState('');

  const [verifyShops, setVerifyShops] = useState([
    { id: 1, name: 'Fresh Mart', cat: 'Grocery', loc: 'Pune Central', status: 'Pending', agent: 'Rajesh Kumar', docs: ['GST', 'License'] },
    { id: 2, name: 'ElectroHub', cat: 'Electronics', loc: 'Mumbai South', status: 'Pending', agent: 'Vikram Singh', docs: ['Trade License', 'Owner ID'] },
    { id: 3, name: 'Style Studio', cat: 'Fashion', loc: 'Delhi NCR', status: 'Verified', agent: 'Sneha Patel', docs: ['GST', 'Photo'] },
  ]);

  const handleVerify = (id) => {
    const shop = verifyShops.find(s => s.id === id);
    setVerifyShops(verifyShops.map(s => s.id === id ? { ...s, status: 'Verified' } : s));
    addNotification({
      title: 'Shop Verified',
      message: `Shop "${shop.name}" has been verified and sent to Admin for final approval.`,
      type: 'success'
    });
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return (
          <div className="p-8 space-y-8 animate-in fade-in duration-500">
            <h3 className="text-2xl font-bold dark:text-white">Sub-Admin Dashboard</h3>
            <p className="text-sm text-text-secondary-light">Overview of your assigned responsibilities.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {[
                { title: 'Agents Managed', value: '42', icon: <Users />, color: 'bg-blue-500' },
                { title: 'Shops Verified', value: '128', icon: <Store />, color: 'bg-emerald-500' },
                { title: 'Pending KYC', value: '15', icon: <ShieldCheck />, color: 'bg-orange-500' },
                { title: 'Open Tickets', value: '8', icon: <LifeBuoy />, color: 'bg-error' },
              ].map((stat) => (
                <div key={stat.title} className="card-premium flex items-center gap-4 hover:scale-[1.02] transition-transform">
                  <div className={`p-4 ${stat.color} text-white rounded-2xl shadow-lg`}>
                    {React.cloneElement(stat.icon, { size: 24 })}
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">{stat.title}</p>
                    <h3 className="text-2xl font-bold dark:text-white">{stat.value}</h3>
                  </div>
                </div>
              ))}
            </div>
            {/* Additional basic content to make it look complete */}
            <div className="card-premium space-y-4">
              <h4 className="font-bold dark:text-white">Recent Activity</h4>
              <p className="text-sm text-text-secondary-light">You have no new alerts at this time.</p>
            </div>
          </div>
        );
      
      case 'Today Tasks':
        return (
          <div className="p-8 space-y-8 animate-in fade-in duration-500">
            <h3 className="text-2xl font-bold dark:text-white">Today's Tasks</h3>
            <div className="card-premium space-y-4">
              {[
                { task: 'Review new KYC for Mumbai region', time: '10:00 AM', priority: 'High' },
                { task: 'Approve 5 shop verification requests', time: '11:30 AM', priority: 'Medium' },
                { task: 'Weekly sync with District Agents', time: '02:00 PM', priority: 'High' },
                { task: 'Check territory expansion proposals', time: '04:00 PM', priority: 'Low' },
              ].map((t, i) => (
                <div key={i} className="flex justify-between items-center p-4 bg-gray-50 dark:bg-secondary-dark rounded-xl border border-border-light dark:border-border-dark">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded border-2 border-primary-light"></div>
                    <div>
                      <p className="font-bold dark:text-white">{t.task}</p>
                      <p className="text-xs text-text-secondary-light">{t.time}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-[10px] font-bold rounded-lg uppercase ${
                    t.priority === 'High' ? 'bg-error/10 text-error' : 
                    t.priority === 'Medium' ? 'bg-warning/10 text-warning' : 'bg-success/10 text-success'
                  }`}>{t.priority}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'Notifications':
        return (
          <div className="p-8 space-y-8 animate-in fade-in duration-500">
            <h3 className="text-2xl font-bold dark:text-white">Notifications</h3>
            <div className="card-premium space-y-4">
              {[
                { title: 'New Agent Registered', desc: 'Rahul from Pune joined the network.', time: '10m ago' },
                { title: 'System Maintenance', desc: 'AgentHub will be down from 2AM to 4AM.', time: '1h ago' },
                { title: 'Target Achieved', desc: 'District 4 crossed 10L monthly sales!', time: '3h ago' },
              ].map((n, i) => (
                <div key={i} className="p-4 bg-gray-50 dark:bg-secondary-dark rounded-xl border border-border-light dark:border-border-dark flex items-start gap-4">
                  <div className="p-2 bg-primary-light/10 text-primary-light rounded-lg"><Bell size={18} /></div>
                  <div>
                    <p className="font-bold dark:text-white">{n.title}</p>
                    <p className="text-sm text-text-secondary-light">{n.desc}</p>
                    <p className="text-xs text-text-secondary-light mt-1">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'Assigned Agents':
        return (
          <div className="p-8 space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold dark:text-white">Assigned Agents</h3>
              <button className="btn-primary px-4 py-2 text-sm">Add Agent</button>
            </div>
            <div className="card-premium">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-border-light dark:border-border-dark text-text-secondary-light">
                    <th className="pb-4 font-bold">Agent Name</th>
                    <th className="pb-4 font-bold">Role</th>
                    <th className="pb-4 font-bold">Territory</th>
                    <th className="pb-4 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-light dark:divide-border-dark">
                  {[
                    { name: 'Amit Singh', role: 'District Agent', territory: 'Pune South', status: 'Active' },
                    { name: 'Priya Verma', role: 'Pincode Agent', territory: '411001', status: 'Active' },
                    { name: 'Rahul Dev', role: 'Divisional Agent', territory: 'Mumbai', status: 'Inactive' },
                  ].map((a, i) => (
                    <tr key={i} className="hover:bg-gray-50 dark:hover:bg-secondary-dark/50">
                      <td className="py-4 font-bold dark:text-white flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary-light/20 flex items-center justify-center text-primary-light text-xs">{a.name[0]}</div>
                        {a.name}
                      </td>
                      <td className="py-4 text-sm text-text-secondary-light">{a.role}</td>
                      <td className="py-4 text-sm text-text-secondary-light">{a.territory}</td>
                      <td className="py-4"><span className={`px-2 py-1 text-[10px] rounded-lg font-bold uppercase ${a.status === 'Active' ? 'bg-success/10 text-success' : 'bg-error/10 text-error'}`}>{a.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'Shop Management':
      case 'Shop Verification':
        return (
          <div className="p-8 space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold dark:text-white">Shop Verification Queue</h3>
                <p className="text-sm text-text-secondary-light">Review and verify shop tie-up requests from agents.</p>
              </div>
            </div>
            
            <div className="card-premium p-0 overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50 dark:bg-secondary-dark/30 text-text-secondary-light">
                    <th className="p-4 font-bold text-xs uppercase tracking-widest">Shop & Agent</th>
                    <th className="p-4 font-bold text-xs uppercase tracking-widest">Category</th>
                    <th className="p-4 font-bold text-xs uppercase tracking-widest">Location</th>
                    <th className="p-4 font-bold text-xs uppercase tracking-widest">Status</th>
                    <th className="p-4 font-bold text-xs uppercase tracking-widest text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-light dark:divide-border-dark">
                  {verifyShops.map((s) => (
                    <tr key={s.id} className="hover:bg-gray-50 dark:hover:bg-secondary-dark/50 transition-colors">
                      <td className="p-4">
                        <div>
                          <p className="font-bold dark:text-white">{s.name}</p>
                          <p className="text-[10px] text-text-secondary-light font-bold uppercase tracking-tighter">Agent: {s.agent}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-1 bg-gray-100 dark:bg-secondary-dark rounded text-[10px] font-bold dark:text-white">{s.cat}</span>
                      </td>
                      <td className="p-4 text-sm text-text-secondary-light font-medium">{s.loc}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          s.status === 'Verified' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                        }`}>{s.status}</span>
                      </td>
                      <td className="p-4 text-right">
                        {s.status === 'Pending' ? (
                          <button 
                            onClick={() => handleVerify(s.id)}
                            className="px-4 py-2 bg-primary-light text-white text-xs font-bold rounded-xl shadow-lg shadow-primary-light/20 hover:scale-105 transition-transform"
                          >
                            Verify Shop
                          </button>
                        ) : (
                          <span className="text-xs font-bold text-text-secondary-light italic">Waiting for Admin</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'KYC Review':
        return (
          <div className="p-8 space-y-8 animate-in fade-in duration-500">
            <h3 className="text-2xl font-bold dark:text-white">KYC Review Queue</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: 'Rahul Dev', role: 'Agent', docs: 'Aadhar, PAN', status: 'Pending Review' },
                { name: 'Fresh Mart', role: 'Shop', docs: 'GST, Trade License', status: 'Action Required' },
                { name: 'Sneha Patel', role: 'Agent', docs: 'Aadhar', status: 'Incomplete' },
              ].map((k, i) => (
                <div key={i} className="p-6 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-2xl shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-3 items-center">
                      <div className="w-10 h-10 bg-gray-100 dark:bg-secondary-dark rounded-xl flex items-center justify-center text-lg">{k.name[0]}</div>
                      <div>
                        <h4 className="font-bold dark:text-white text-lg">{k.name}</h4>
                        <p className="text-xs text-text-secondary-light">{k.role}</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-warning/10 text-warning text-[10px] font-bold rounded-lg uppercase">{k.status}</span>
                  </div>
                  <p className="text-sm dark:text-white mb-4">Uploaded Docs: <span className="text-text-secondary-light font-bold">{k.docs}</span></p>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 bg-success text-white font-bold text-sm rounded-xl hover:opacity-90">Approve</button>
                    <button className="flex-1 py-2 bg-error/10 text-error font-bold text-sm rounded-xl hover:bg-error/20">Reject</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'Leads / Orders':
      case 'Commission View':
      case 'Incentive Tracking':
        return (
          <div className="p-8 space-y-8 animate-in fade-in duration-500">
            <h3 className="text-2xl font-bold dark:text-white">{activeTab}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="card-premium">
                <p className="text-sm text-text-secondary-light">Total Volume</p>
                <h3 className="text-3xl font-bold dark:text-white mt-2">₹12.5L</h3>
              </div>
              <div className="card-premium">
                <p className="text-sm text-text-secondary-light">This Month</p>
                <h3 className="text-3xl font-bold text-emerald-500 mt-2">+15%</h3>
              </div>
              <div className="card-premium">
                <p className="text-sm text-text-secondary-light">Pending Settlement</p>
                <h3 className="text-3xl font-bold text-orange-500 mt-2">₹45K</h3>
              </div>
            </div>
            <div className="card-premium">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-border-light dark:border-border-dark text-text-secondary-light">
                    <th className="pb-4 font-bold">ID / Ref</th>
                    <th className="pb-4 font-bold">Date</th>
                    <th className="pb-4 font-bold">Amount</th>
                    <th className="pb-4 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-light dark:divide-border-dark">
                  {[
                    { id: 'TXN-00192', date: 'Today, 10:30 AM', amount: '₹1,200', status: 'Completed' },
                    { id: 'TXN-00191', date: 'Yesterday', amount: '₹4,500', status: 'Pending' },
                    { id: 'TXN-00189', date: 'Oct 24', amount: '₹12,400', status: 'Completed' },
                  ].map((t, i) => (
                    <tr key={i} className="hover:bg-gray-50 dark:hover:bg-secondary-dark/50">
                      <td className="py-4 font-bold dark:text-white">{t.id}</td>
                      <td className="py-4 text-sm text-text-secondary-light">{t.date}</td>
                      <td className="py-4 font-bold text-primary-light">{t.amount}</td>
                      <td className="py-4"><span className={`px-2 py-1 text-[10px] rounded-lg font-bold uppercase ${t.status === 'Completed' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`}>{t.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'Settings':
        return (
          <div className="p-8 space-y-8 animate-in fade-in duration-500 max-w-4xl">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold dark:text-white">Sub-Admin Settings</h3>
              <p className="text-text-secondary-light">Manage your preferences, security, and notifications.</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {[
                { title: 'Security', icon: <Lock />, desc: 'Password, 2FA, and session management', items: ['Change Password', 'Two-Factor Authentication', 'Active Sessions'] },
                { title: 'Notifications', icon: <BellRing />, desc: 'Configure email and system alerts', items: ['Task Reminders', 'Agent Alerts', 'Weekly Digest'] },
                { title: 'System Appearance', icon: <Palette />, desc: 'Customize dashboard look and feel', items: ['Dark Mode Toggle', 'Primary Brand Color', 'Compact Sidebar'] },
              ].map((group) => (
                <div key={group.title} className="card-premium space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gray-100 dark:bg-secondary-dark rounded-xl text-primary-light">
                      {group.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold dark:text-white">{group.title}</h4>
                      <p className="text-xs text-text-secondary-light mt-0.5">{group.desc}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                        {group.items.map(item => (
                          <div key={item} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-secondary-dark/50 rounded-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-secondary-dark transition-all group">
                            <span className="text-sm dark:text-white font-medium">{item}</span>
                            <ChevronRight size={14} className="text-text-secondary-light group-hover:translate-x-1 transition-transform" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'My Profile':
        return (
          <div className="p-8 space-y-8 animate-in fade-in duration-500 max-w-3xl">
            <h3 className="text-2xl font-bold dark:text-white">{activeTab}</h3>
            <div className="card-premium space-y-6">
              <div className="flex items-center gap-4 border-b border-border-light dark:border-border-dark pb-6">
                <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-xl shadow-primary-light/20">
                  {user?.name?.[0] || 'S'}
                </div>
                <div>
                  <h4 className="font-bold dark:text-white text-lg">{user?.name || 'State Sub-Admin'}</h4>
                  <p className="text-sm text-text-secondary-light">{user?.email || 'subadmin@premium.com'}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-text-secondary-light uppercase">Full Name</label>
                  <input type="text" defaultValue={user?.name || "State Sub-Admin"} className="w-full px-4 py-3 bg-gray-50 dark:bg-secondary-dark border border-border-light dark:border-border-dark rounded-xl outline-none dark:text-white focus:border-primary-light" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-text-secondary-light uppercase">Email</label>
                  <input type="email" defaultValue={user?.email || "subadmin@premium.com"} disabled className="w-full px-4 py-3 bg-gray-100 dark:bg-secondary-dark/50 border border-border-light dark:border-border-dark rounded-xl outline-none text-text-secondary-light cursor-not-allowed" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-text-secondary-light uppercase">Phone Number</label>
                  <input type="tel" defaultValue={user?.phone || "+91 8888888888"} className="w-full px-4 py-3 bg-gray-50 dark:bg-secondary-dark border border-border-light dark:border-border-dark rounded-xl outline-none dark:text-white focus:border-primary-light" />
                </div>
                <div className="pt-4">
                  <button className="btn-primary px-8 py-3 rounded-xl font-bold shadow-lg shadow-primary-light/20 hover:scale-[1.02] transition-transform">Save Changes</button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'Role & Permissions':
        return (
          <div className="p-8 space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div>
              <h3 className="text-2xl font-black dark:text-white tracking-tight">User Monitoring & Access</h3>
              <p className="text-sm text-text-secondary-light mt-1">Review assigned users and report security risks to Admin.</p>
            </div>

            <div className="card-premium p-0 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-secondary-dark/30 text-left">
                      <th className="p-4 font-black text-[10px] text-text-secondary-light uppercase tracking-widest min-w-[200px]">User Info</th>
                      <th className="p-4 font-black text-[10px] text-text-secondary-light uppercase tracking-widest min-w-[120px]">Role</th>
                      <th className="p-4 font-black text-[10px] text-text-secondary-light uppercase tracking-widest min-w-[120px]">Risk Level</th>
                      <th className="p-4 font-black text-[10px] text-text-secondary-light uppercase tracking-widest min-w-[120px]">Status</th>
                      <th className="p-4 font-black text-[10px] text-text-secondary-light uppercase tracking-widest text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-light dark:divide-border-dark">
                    {systemUsers.map((u) => (
                      <tr key={u.id} className="hover:bg-gray-50/50 dark:hover:bg-secondary-dark/20 transition-colors group">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary-light/10 text-primary-light rounded-xl flex items-center justify-center font-bold shrink-0">{u.name[0]}</div>
                            <div>
                              <p className="font-bold dark:text-white text-sm">{u.name}</p>
                              <p className="text-[10px] text-text-secondary-light font-bold uppercase">{u.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="px-2 py-1 bg-gray-100 dark:bg-secondary-dark rounded text-[10px] font-bold dark:text-white uppercase whitespace-nowrap">{u.role}</span>
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                            u.riskLevel === 'Low' ? 'bg-success/10 text-success' :
                            u.riskLevel === 'Medium' ? 'bg-warning/10 text-warning' :
                            u.riskLevel === 'High' ? 'bg-orange-500/10 text-orange-500' :
                            'bg-error/10 text-error animate-pulse'
                          }`}>{u.riskLevel}</span>
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                            u.status === 'Active' ? 'bg-success/10 text-success' :
                            u.status === 'Blocked' ? 'bg-error/10 text-error' :
                            u.status === 'Suspended' ? 'bg-warning/10 text-warning' :
                            'bg-gray-100 text-gray-500'
                          }`}>{u.status}</span>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-2 bg-gray-100 dark:bg-secondary-dark rounded-xl hover:bg-gray-200 text-text-secondary-light" title="View Details"><User size={14} /></button>
                            <button 
                              onClick={() => {
                                setSelectedSystemUser(u);
                                setShowEscalateModal(true);
                              }}
                              className="p-2 bg-error/10 text-error rounded-xl hover:bg-error hover:text-white" 
                              title="Escalate to Admin"
                            >
                              <AlertCircle size={14} />
                            </button>
                            <button className="p-2 bg-orange-500/10 text-orange-500 rounded-xl hover:bg-orange-500 hover:text-white" title="Activity Log" onClick={() => setActiveTab('Activity Log')}><History size={14} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="p-4 bg-error/5 border border-error/20 rounded-2xl flex items-center gap-3">
              <Lock size={16} className="text-error" />
              <p className="text-xs text-error font-bold italic">Sub-Admin Notice: Final account deactivation and role changes require Admin approval.</p>
            </div>
          </div>
        );

      case 'Activity Log':
        return (
          <div className="p-8 space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div>
              <h3 className="text-2xl font-black dark:text-white tracking-tight">System Activity Log</h3>
              <p className="text-sm text-text-secondary-light mt-1">Audit trail of actions within your assigned territory.</p>
            </div>

            <div className="card-premium p-0 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-secondary-dark/30 text-left border-b dark:border-border-dark">
                      <th className="p-4 font-black text-[10px] text-text-secondary-light uppercase tracking-widest">Timestamp</th>
                      <th className="p-4 font-black text-[10px] text-text-secondary-light uppercase tracking-widest">User</th>
                      <th className="p-4 font-black text-[10px] text-text-secondary-light uppercase tracking-widest">Action</th>
                      <th className="p-4 font-black text-[10px] text-text-secondary-light uppercase tracking-widest">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-light dark:divide-border-dark">
                    {systemActivityLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-gray-50/50 dark:hover:bg-secondary-dark/20 transition-colors">
                        <td className="p-4 text-xs font-mono dark:text-white">{log.timestamp}</td>
                        <td className="p-4 text-xs font-bold dark:text-white">{log.user}</td>
                        <td className="p-4 text-xs font-bold dark:text-white">{log.action}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                            log.status === 'Success' ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
                          }`}>{log.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'Area Management':
      case 'Target Tracking':
      case 'Daily Work Updates':
      case 'Support / Tickets':
      case 'Escalations':
      case 'Agent Reports':
      case 'Shop Reports':
      case 'Target Reports':
      case 'Daily Work Report':
        return (
          <div className="p-8 space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold dark:text-white">{activeTab}</h3>
                <p className="text-sm text-text-secondary-light">Manage and review {activeTab.toLowerCase()} data.</p>
              </div>
              <button className="btn-primary px-4 py-2 text-sm flex items-center gap-2">
                Export Data
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="card-premium flex flex-col justify-between hover:-translate-y-1 transition-transform border border-transparent hover:border-primary-light/30">
                  <div>
                    <div className="w-10 h-10 bg-primary-light/10 text-primary-light rounded-lg flex items-center justify-center mb-4">
                      <FileText size={20} />
                    </div>
                    <h4 className="font-bold dark:text-white text-lg mb-2">{activeTab} Record #{item}</h4>
                    <p className="text-sm text-text-secondary-light mb-4">Detailed metric or record log regarding this operational category. Showing aggregated data for your assigned territory.</p>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-border-light dark:border-border-dark">
                    <span className="text-xs font-bold text-text-secondary-light">Updated 2h ago</span>
                    <button className="text-xs font-bold text-primary-light hover:underline px-3 py-1.5 bg-primary-light/10 rounded-lg">View Details</button>
                  </div>
                </div>
              ))}
            </div>
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
              <span className="text-white font-black text-xl">S</span>
            </div>
            <div>
              <span className="font-black text-xl dark:text-white block leading-tight tracking-tight">Agent<span className="text-primary-light">Hub</span></span>
              <span className="text-[10px] font-black text-primary-light uppercase tracking-widest">Sub-Admin</span>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-4 custom-scrollbar">
          <SidebarSection title="MAIN">
            <SidebarLink icon={<LayoutDashboard size={18} />} label="Dashboard" active={activeTab === 'Dashboard'} onClick={() => setActiveTab('Dashboard')} />
            <SidebarLink icon={<CheckSquare size={18} />} label="Today Tasks" active={activeTab === 'Today Tasks'} onClick={() => setActiveTab('Today Tasks')} />
            <SidebarLink icon={<Bell size={18} />} label="Notifications" active={activeTab === 'Notifications'} onClick={() => setActiveTab('Notifications')} />
          </SidebarSection>

          <SidebarSection title="MANAGEMENT">
            <SidebarLink icon={<Users size={18} />} label="Assigned Agents" active={activeTab === 'Assigned Agents'} onClick={() => setActiveTab('Assigned Agents')} />
            <SidebarLink icon={<Store size={18} />} label="Shop Management" active={activeTab === 'Shop Management'} onClick={() => setActiveTab('Shop Management')} />
            <SidebarLink icon={<ShoppingCart size={18} />} label="Leads / Orders" active={activeTab === 'Leads / Orders'} onClick={() => setActiveTab('Leads / Orders')} />
          </SidebarSection>

          <SidebarSection title="VERIFICATION">
            <SidebarLink icon={<ShieldCheck size={18} />} label="KYC Review" active={activeTab === 'KYC Review'} onClick={() => setActiveTab('KYC Review')} />
            <SidebarLink icon={<CheckCircle size={18} />} label="Shop Verification" active={activeTab === 'Shop Verification'} onClick={() => setActiveTab('Shop Verification')} />
          </SidebarSection>

          <SidebarSection title="OPERATIONS">
            <SidebarLink icon={<Map size={18} />} label="Area Management" active={activeTab === 'Area Management'} onClick={() => setActiveTab('Area Management')} />
            <SidebarLink icon={<Target size={18} />} label="Target Tracking" active={activeTab === 'Target Tracking'} onClick={() => setActiveTab('Target Tracking')} />
            <SidebarLink icon={<Briefcase size={18} />} label="Daily Work Updates" active={activeTab === 'Daily Work Updates'} onClick={() => setActiveTab('Daily Work Updates')} />
          </SidebarSection>

          <SidebarSection title="FINANCE (VIEW ONLY)">
            <SidebarLink icon={<DollarSign size={18} />} label="Commission View" active={activeTab === 'Commission View'} onClick={() => setActiveTab('Commission View')} />
            <SidebarLink icon={<TrendingUp size={18} />} label="Incentive Tracking" active={activeTab === 'Incentive Tracking'} onClick={() => setActiveTab('Incentive Tracking')} />
          </SidebarSection>

          <SidebarSection title="SUPPORT">
            <SidebarLink icon={<LifeBuoy size={18} />} label="Support / Tickets" active={activeTab === 'Support / Tickets'} onClick={() => setActiveTab('Support / Tickets')} />
            <SidebarLink icon={<AlertCircle size={18} />} label="Escalations" active={activeTab === 'Escalations'} onClick={() => setActiveTab('Escalations')} />
          </SidebarSection>

          <SidebarSection title="REPORTS">
            <SidebarLink icon={<FileText size={18} />} label="Agent Reports" active={activeTab === 'Agent Reports'} onClick={() => setActiveTab('Agent Reports')} />
            <SidebarLink icon={<BarChart2 size={18} />} label="Shop Reports" active={activeTab === 'Shop Reports'} onClick={() => setActiveTab('Shop Reports')} />
            <SidebarLink icon={<Target size={18} />} label="Target Reports" active={activeTab === 'Target Reports'} onClick={() => setActiveTab('Target Reports')} />
            <SidebarLink icon={<Clock size={18} />} label="Daily Work Report" active={activeTab === 'Daily Work Report'} onClick={() => setActiveTab('Daily Work Report')} />
          </SidebarSection>

          <SidebarSection title="SYSTEM">
            <SidebarLink icon={<Key size={18} />} label="Role & Permissions" active={activeTab === 'Role & Permissions'} onClick={() => setActiveTab('Role & Permissions')} />
            <SidebarLink icon={<History size={18} />} label="Activity Log" active={activeTab === 'Activity Log'} onClick={() => setActiveTab('Activity Log')} />
          </SidebarSection>

          <SidebarSection title="ACCOUNT">
            <SidebarLink icon={<User size={18} />} label="My Profile" active={activeTab === 'My Profile'} onClick={() => setActiveTab('My Profile')} />
            <SidebarLink icon={<Settings size={18} />} label="Settings" active={activeTab === 'Settings'} onClick={() => setActiveTab('Settings')} />
            <div 
              onClick={handleLogout} 
              className="flex items-center justify-center p-4 rounded-2xl cursor-pointer bg-error/5 hover:bg-error/10 border border-error/10 transition-all duration-500 group overflow-hidden relative shadow-sm mt-2"
            >
              <div className="relative z-10">
                <span className="font-black text-sm text-error/80 group-hover:text-error transition-colors tracking-widest uppercase flex items-center gap-2">
                  <LogOut size={16} /> Logout
                </span>
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
            <p className="text-xs text-text-secondary-light font-medium">Sub-Admin ID: SA-10294 — Welcome back, {user?.name?.split(' ')[0] || 'State'}!</p>
          </div>
          <div className="flex items-center space-x-6">
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
                <p className="text-sm font-black dark:text-white leading-none">Sub-Admin</p>
              </div>
              <div className="w-11 h-11 bg-primary-light rounded-2xl flex items-center justify-center text-white font-black shadow-lg shadow-primary-light/20">
                S
              </div>
            </div>
          </div>
        </header>

        <div className="animate-in fade-in slide-in-from-top-2 duration-700">
          {renderContent()}
        </div>
        <EscalateUserModal 
          isOpen={showEscalateModal}
          onClose={() => setShowEscalateModal(false)}
          user={selectedSystemUser}
          reason={escalateReason}
          setReason={setEscalateReason}
          notes={escalateNotes}
          setNotes={setEscalateNotes}
          onConfirm={() => {
            setSystemActivityLogs([{
              id: Date.now(),
              user: 'Sub-Admin',
              action: `Escalated User: ${selectedSystemUser.name}`,
              module: 'Security',
              timestamp: new Date().toLocaleString(),
              status: 'Warning'
            }, ...systemActivityLogs]);
            addNotification({
              title: 'User Escalated',
              message: `Security report for ${selectedSystemUser.name} sent to Admin.`,
              type: 'warning'
            });
            setShowEscalateModal(false);
          }}
        />
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

const EscalateUserModal = ({ isOpen, onClose, user, reason, setReason, notes, setNotes, onConfirm }) => {
  if (!isOpen || !user) return null;

  const reasons = ['Suspicious Activity', 'KYC Mismatch Reported', 'Payment Anomaly', 'Repeated Complaints', 'Others'];

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background-dark/80 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose}></div>
      <div className="relative w-full max-w-lg bg-surface-light dark:bg-surface-dark rounded-3xl shadow-2xl border border-border-light dark:border-border-dark overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-6 border-b border-border-light dark:border-border-dark flex justify-between items-center bg-warning/5">
          <div className="flex items-center gap-3 text-warning">
            <AlertCircle size={24} />
            <h3 className="text-lg font-black tracking-tight">Escalate to Admin</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-secondary-dark rounded-xl transition-all"><X size={20} className="dark:text-white" /></button>
        </div>

        <div className="p-8 space-y-6">
          <div className="p-4 bg-gray-50 dark:bg-secondary-dark rounded-2xl border border-dashed border-border-light dark:border-border-dark">
            <p className="text-sm dark:text-white font-medium text-center">Reporting <span className="font-bold text-warning">{user.name}</span> for Admin review.</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">Reporting Reason</label>
              <select 
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-warning outline-none dark:text-white font-medium appearance-none"
              >
                {reasons.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">Evidence / Notes</label>
              <textarea 
                placeholder="Describe the suspicious behavior..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-warning outline-none dark:text-white font-medium h-24 resize-none"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button onClick={onClose} className="flex-1 py-4 rounded-2xl font-black text-sm border-2 border-border-light dark:border-border-dark dark:text-white hover:bg-gray-50 transition-all">Cancel</button>
            <button onClick={onConfirm} className="flex-1 py-4 rounded-2xl bg-warning text-background-dark font-black text-sm shadow-xl shadow-warning/20 hover:scale-[1.02] active:scale-[0.98] transition-all">Submit Escalation</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubAdminDashboard;
