import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { 
  Users, Store, TrendingUp, 
  ShieldCheck, AlertCircle, DollarSign, Target,
  LayoutDashboard, Map, Settings, Bell,
  CheckSquare, CheckCircle, FileText, BarChart2,
  Clock, LogOut, Briefcase, LifeBuoy, Sun, Moon, User,
  Lock, BellRing, Palette, ChevronRight, Download, Gift, Trophy, Zap, Filter,
  Key, History, X, Edit, Eye, XCircle, Phone, Mail, MapPin, Plus, Send, Trash2
} from 'lucide-react';

import { useNotifications } from '../../context/NotificationContext';
import axios from 'axios';

const SubAdminDashboard = () => {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const { addNotification } = useNotifications();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [selectedShop, setSelectedShop] = useState(null);
  const [showCommissionModal, setShowCommissionModal] = useState(false);
  
  const [kycRequests, setKycRequests] = useState([
    { id: 1, name: 'Rahul Dev', role: 'Agent', docs: 'Aadhar, PAN', status: 'Pending Review', location: 'Delhi', date: '2h ago' },
    { id: 2, name: 'Fresh Mart', role: 'Shop', docs: 'GST, Trade License', status: 'Action Required', location: 'Mumbai', date: '5h ago' },
    { id: 3, name: 'Sneha Patel', role: 'Agent', docs: 'Aadhar', status: 'Incomplete', location: 'Pune', date: '1d ago' },
  ]);

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
  const [showAddAgentModal, setShowAddAgentModal] = useState(false);
  const [showAddZoneModal, setShowAddZoneModal] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [showAgentDetailModal, setShowAgentDetailModal] = useState(false);
  const [agentDetailModalType, setAgentDetailModalType] = useState('view'); // 'view' | 'edit' | 'history'
  const [showShopDetailModal, setShowShopDetailModal] = useState(false);
  const [selectedShopDetail, setSelectedShopDetail] = useState(null);
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [savingProfile, setSavingProfile] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [showSessionsModal, setShowSessionsModal] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showNotificationSettingsModal, setShowNotificationSettingsModal] = useState(false);
  const [showAppearanceSettingsModal, setShowAppearanceSettingsModal] = useState(false);
  const [timeRange, setTimeRange] = useState('Yesterday');
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const [financeFilter, setFinanceFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAgentFilters, setShowAgentFilters] = useState(false);
  const [showShopFilters, setShowShopFilters] = useState(false);
  const [showKYCFilters, setShowKYCFilters] = useState(false);
  const [agentRoleFilter, setAgentRoleFilter] = useState('All');
  const [agentStatusFilter, setAgentStatusFilter] = useState('All');
  const [shopStatusFilter, setShopStatusFilter] = useState('All');
  const [kycStatusFilter, setKycStatusFilter] = useState('All');
  const [supportTickets, setSupportTickets] = useState([
    { id: 'TKT-4821', subject: 'Agent unable to login', by: 'Amit Singh', priority: 'High', status: 'Open', time: '10 min ago' },
    { id: 'TKT-4820', subject: 'Shop KYC document rejected incorrectly', by: 'Fresh Mart', priority: 'High', status: 'In Progress', time: '1h ago' },
    { id: 'TKT-4818', subject: 'Commission not credited for May', by: 'Priya Verma', priority: 'Medium', status: 'Open', time: '3h ago' },
    { id: 'TKT-4815', subject: 'App crash on data submission', by: 'Rahul Dev', priority: 'Low', status: 'In Progress', time: 'Yesterday' },
    { id: 'TKT-4810', subject: 'Wrong area assigned to agent', by: 'Sneha Patel', priority: 'Medium', status: 'Resolved', time: '2 days ago' },
    { id: 'TKT-4805', subject: 'Referral bonus not reflecting', by: 'Vikram Kumar', priority: 'Low', status: 'Resolved', time: '3 days ago' },
  ]);



  const [payoutData, setPayoutData] = useState([
    { id: 'TXN-9021', name: 'Amit Singh (Fresh Mart)', amount: '1240', date: 'Oct 12, 2023', status: 'Successful' },
    { id: 'TXN-9020', name: 'Priya Verma (ElectroHub)', amount: '850', date: 'Oct 12, 2023', status: 'Pending' },
    { id: 'TXN-9018', name: 'Rahul Dev (Style Studio)', amount: '2100', date: 'Oct 11, 2023', status: 'Successful' },
  ]);

  const exportToCSV = (data, filename) => {
    if (!data || !data.length) {
      addNotification({ title: 'Export Failed', message: 'No data available to export.', type: 'error' });
      return;
    }

    try {
      addNotification({ title: 'Exporting...', message: 'Preparing your CSV file for download.', type: 'info' });
      
      const headers = Object.keys(data[0]).join(',');
      const rows = data.map(obj => {
        return Object.values(obj).map(val => {
          const str = String(val).replace(/"/g, '""');
          return str.includes(',') ? `"${str}"` : str;
        }).join(',');
      });

      const csvContent = [headers, ...rows].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      addNotification({ title: 'Export Success', message: 'CSV file downloaded successfully.', type: 'success' });
    } catch (err) {
      addNotification({ title: 'Export Error', message: 'Failed to generate CSV file.', type: 'error' });
    }
  };
  const handleDownload = (docName = 'Document', extension = 'pdf') => {
    addNotification({ 
      title: 'Preparing Download', 
      message: `Securing ${docName} for transfer...`, 
      type: 'info' 
    });
    
    setTimeout(() => {
      try {
        const type = extension === 'csv' ? 'text/csv' : 'application/pdf';
        const content = `Simulated ${extension.toUpperCase()} content for ${docName}\nGenerated on: ${new Date().toLocaleString()}`;
        const blob = new Blob([content], { type });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${docName.replace(/\s+/g, '_')}.${extension}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        addNotification({ 
          title: 'Download Ready', 
          message: `${docName} has been saved successfully.`, 
          type: 'success' 
        });
      } catch (error) {
        addNotification({ 
          title: 'Download Failed', 
          message: 'An error occurred during file generation.', 
          type: 'error' 
        });
      }
    }, 1500);
  };

  const [verifyShops, setVerifyShops] = useState([
    { id: 1, name: 'Fresh Mart', cat: 'Grocery', loc: 'Pune Central', status: 'Pending', agent: 'Rajesh Kumar', docs: ['GST', 'License'] },
    { id: 2, name: 'ElectroHub', cat: 'Electronics', loc: 'Mumbai South', status: 'Pending', agent: 'Vikram Singh', docs: ['Trade License', 'Owner ID'] },
    { id: 3, name: 'Style Studio', cat: 'Fashion', loc: 'Delhi NCR', status: 'Verified', agent: 'Sneha Patel', docs: ['GST', 'Photo'] },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${user.token}` }
        };
        
        const [agentsRes, shopsRes] = await Promise.all([
          axios.get('/api/agents', config),
          axios.get('/api/shops', config)
        ]);

        // Transform backend data to frontend format if necessary
        const formattedAgents = agentsRes.data.map(a => ({
          id: a._id,
          name: a.name,
          role: a.role,
          phone: a.phone,
          email: a.email,
          location: a.territory?.pincode || 'Not Set',
          status: a.status,
          lastLogin: a.lastLogin || 'Never',
          riskLevel: a.riskLevel || 'Low'
        }));

        const formattedShops = shopsRes.data.map(s => ({
          id: s._id,
          name: s.shopName,
          cat: s.category,
          loc: s.taluk + ', ' + s.pincode,
          status: s.kycStatus,
          agent: s.ownerId?.name || 'Unassigned',
          docs: ['GST', 'License']
        }));

        setSystemUsers(formattedAgents);
        setVerifyShops(formattedShops);
      } catch (error) {
        console.error('Error fetching dashboard data, using mock data:', error);
        // Fallback to mock data if API fails to prevent white screen
        setSystemUsers([
          { id: 1, name: 'Amit Kumar', role: 'Agent', phone: '+91 98765 43210', email: 'amit@test.com', location: 'Delhi', status: 'Active', lastLogin: '10 min ago', riskLevel: 'Low' },
          { id: 2, name: 'Rajesh Singh', role: 'Agent', phone: '+91 87654 32109', email: 'rajesh@test.com', location: 'Mumbai', status: 'Active', lastLogin: '1h ago', riskLevel: 'Medium' }
        ]);
        setVerifyShops([
          { id: 1, name: 'Fresh Mart', cat: 'Grocery', loc: 'Pune Central', status: 'Pending', agent: 'Amit Kumar', docs: ['GST'] }
        ]);
      }
    };

    if (user?.token) fetchData();
  }, [user]);

  const handleVerify = async (id) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      };
      const { data } = await axios.put(`/api/shops/${id}/verify`, { status: 'Verified' }, config);
      
      setVerifyShops(verifyShops.filter(s => shopStatusFilter === 'All' || s.status === shopStatusFilter).map(s => s.id === id ? { ...s, status: 'Verified' } : s));
      addNotification({
        title: 'Shop Verified',
        message: `Shop has been verified and sent to Admin for final approval.`,
        type: 'success'
      });
    } catch (error) {
      addNotification({ title: 'Verification Error', message: error.message, type: 'error' });
    }
  };

  const handleApproveKYC = (id) => {
    const kyc = kycRequests.find(k => k.id === id);
    setKycRequests(kycRequests.filter(k => kycStatusFilter === 'All' || k.status === kycStatusFilter).map(k => k.id === id ? { ...k, status: 'Approved' } : k));
    addNotification({
      title: 'KYC Approved',
      message: `KYC for ${kyc.name} has been approved successfully.`,
      type: 'success'
    });
  };

  const handleRejectKYC = (id) => {
    const kyc = kycRequests.find(k => k.id === id);
    setKycRequests(kycRequests.filter(k => kycStatusFilter === 'All' || k.status === kycStatusFilter).map(k => k.id === id ? { ...k, status: 'Rejected' } : k));
    addNotification({
      title: 'KYC Rejected',
      message: `KYC for ${kyc.name} has been rejected.`,
      type: 'error'
    });
  };

  const handleReject = (id) => {
    const shop = verifyShops.find(s => s.id === id);
    setVerifyShops(verifyShops.filter(s => shopStatusFilter === 'All' || s.status === shopStatusFilter).map(s => s.id === id ? { ...s, status: 'Rejected' } : s));
    addNotification({
      title: 'Shop Rejected',
      message: `Shop "${shop.name}" has been rejected. The agent will be notified.`,
      type: 'error'
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
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold dark:text-white">Sub-Admin Dashboard</h3>
                <p className="text-sm text-text-secondary-light">Overview of your assigned responsibilities.</p>
              </div>
              <div className="relative">
                <button 
                  onClick={() => setShowTimeDropdown(!showTimeDropdown)}
                  className="px-4 py-2 bg-white dark:bg-secondary-dark border border-border-light dark:border-border-dark rounded-xl flex items-center gap-3 text-sm font-bold dark:text-white shadow-sm hover:border-primary-light transition-all"
                >
                  <Filter size={14} className="text-primary-light" />
                  <span>{timeRange}</span>
                </button>
                {showTimeDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-2xl shadow-2xl z-[100] py-2 animate-in zoom-in-95 duration-200">
                    {['Today', 'Yesterday', 'Last 7 Days', 'Last 30 Days', 'This Quarter', 'Custom Range'].map(range => (
                      <div 
                        key={range}
                        onClick={() => {
                          setTimeRange(range);
                          setShowTimeDropdown(false);
                          addNotification({ title: 'Filter Applied', message: `Showing data for ${range}`, type: 'info' });
                        }}
                        className={`px-4 py-2.5 text-sm font-medium cursor-pointer transition-colors ${timeRange === range ? 'bg-primary-light text-white' : 'dark:text-white hover:bg-primary-light/10 hover:text-primary-light'}`}
                      >
                        {range}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
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
              <div className="flex gap-2">
                <button 
                  onClick={() => setShowAgentFilters(!showAgentFilters)}
                  className="px-4 py-2 bg-gray-50 dark:bg-secondary-dark border border-border-light dark:border-border-dark rounded-xl text-xs font-black text-text-secondary-light flex items-center gap-2 hover:border-primary-light transition-all"
                >
                  <Filter size={14} /> Filters
                </button>
                <button 
                  onClick={() => exportToCSV(systemUsers.filter(u => u.role === 'Agent'), 'assigned_agents')}
                  className="px-4 py-2 bg-gray-50 dark:bg-secondary-dark border border-border-light dark:border-border-dark rounded-xl text-xs font-black text-text-secondary-light flex items-center gap-2 hover:border-primary-light transition-all"
                >
                  <Download size={14} /> Export
                </button>
                <button onClick={() => setShowAddAgentModal(true)} className="btn-primary px-4 py-2 text-sm font-black flex items-center gap-2 shadow-lg shadow-primary-light/20"><Plus size={16}/> Add Agent</button>
              </div>
            </div>

            {showAgentFilters && (
              <div className="p-6 bg-white dark:bg-secondary-dark rounded-2xl shadow-sm border border-border-light dark:border-border-dark flex flex-wrap gap-4 animate-in slide-in-from-top-2 duration-300">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-text-secondary-light">Role Filter</label>
                  <select 
                    value={agentRoleFilter}
                    onChange={(e) => setAgentRoleFilter(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-gray-50 dark:bg-background-dark border-none outline-none dark:text-white text-xs font-bold">
                    <option>All</option>
                    <option>District Agent</option>
                    <option>Divisional Agent</option>
                    <option>Pincode Agent</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-text-secondary-light">Status Filter</label>
                  <select 
                    value={agentStatusFilter}
                    onChange={(e) => setAgentStatusFilter(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-gray-50 dark:bg-background-dark border-none outline-none dark:text-white text-xs font-bold">
                    <option>All</option>
                    <option>Active</option>
                    <option>Suspended</option>
                  </select>
                </div>
              </div>
            )}

            <div className="card-premium">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-border-light dark:border-border-dark text-text-secondary-light">
                    <th className="pb-4 font-bold">Agent Name</th>
                    <th className="pb-4 font-bold">Role</th>
                    <th className="pb-4 font-bold">Territory</th>
                    <th className="pb-4 font-bold">Status</th>
                    <th className="pb-4 font-bold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-light dark:divide-border-dark">
                  {systemUsers.filter(u => { const isAgent = u.role?.toLowerCase().includes('agent') || u.role === 'Agent'; const roleMatch = agentRoleFilter === 'All' || u.role === agentRoleFilter; const statusMatch = agentStatusFilter === 'All' || u.status === agentStatusFilter; return isAgent && roleMatch && statusMatch; }).map((a, i) => (
                    <tr key={i} className="hover:bg-gray-50 dark:hover:bg-secondary-dark/50">
                      <td className="py-4 font-bold dark:text-white flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary-light/20 flex items-center justify-center text-primary-light text-xs font-black">{a.name[0]}</div>
                        {a.name}
                      </td>
                      <td className="py-4">
                        <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-tight ${
                          a.role === 'District Agent' ? 'bg-blue-500/10 text-blue-500' :
                          a.role === 'Divisional Agent' ? 'bg-purple-500/10 text-purple-500' :
                          'bg-emerald-500/10 text-emerald-500'
                        }`}>{a.role}</span>
                      </td>
                      <td className="py-4 text-sm text-text-secondary-light font-medium">{a.territory || a.location}</td>
                      <td className="py-4"><span className={`px-2 py-1 text-[10px] rounded-lg font-bold uppercase ${a.status === 'Active' ? 'bg-success/10 text-success' : 'bg-error/10 text-error'}`}>{a.status}</span></td>
                      <td className="py-4 text-right">
                        <div className="flex justify-end gap-1.5">
                          <button
                            onClick={() => { setSelectedAgent(a); setAgentDetailModalType('view'); setShowAgentDetailModal(true); }}
                            className="p-2 bg-gray-100 dark:bg-secondary-dark rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 text-text-secondary-light transition-all"
                            title="View Profile"
                          >
                            <Eye size={14} />
                          </button>
                          <button
                            onClick={() => { setSelectedAgent(a); setAgentDetailModalType('edit'); setShowAgentDetailModal(true); }}
                            className="p-2 bg-emerald-500/10 text-emerald-500 rounded-xl hover:bg-emerald-500 hover:text-white transition-all"
                            title="Edit Info"
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            onClick={() => { setSelectedAgent(a); setAgentDetailModalType('history'); setShowAgentDetailModal(true); }}
                            className="p-2 bg-orange-500/10 text-orange-500 rounded-xl hover:bg-orange-500 hover:text-white transition-all"
                            title="Activity History"
                          >
                            <History size={14} />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Remove ${a.name} from your territory?`)) {
                                setSystemUsers(systemUsers.filter(u => u.id !== a.id));
                                addNotification({ title: 'Agent Removed', message: `${a.name} has been removed from your territory.`, type: 'error' });
                              }
                            }}
                            className="p-2 bg-error/10 text-error rounded-xl hover:bg-error hover:text-white transition-colors"
                            title="Delete Agent"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
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
              <div className="flex gap-2">
                <button 
                  onClick={() => setShowShopFilters(!showShopFilters)}
                  className="px-4 py-2 bg-gray-50 dark:bg-secondary-dark border border-border-light dark:border-border-dark rounded-xl text-xs font-black text-text-secondary-light flex items-center gap-2 hover:border-primary-light transition-all"
                >
                  <Filter size={14} /> Filters
                </button>
                <button 
                  onClick={() => exportToCSV(verifyShops, 'shop_verification_report')}
                  className="px-4 py-2 bg-gray-50 dark:bg-secondary-dark border border-border-light dark:border-border-dark rounded-xl text-xs font-black text-text-secondary-light flex items-center gap-2 hover:border-primary-light transition-all"
                >
                  <Download size={14} /> Export
                </button>
              </div>
            </div>

            {showShopFilters && (
              <div className="p-6 bg-white dark:bg-secondary-dark rounded-2xl shadow-sm border border-border-light dark:border-border-dark flex flex-wrap gap-4 animate-in slide-in-from-top-2 duration-300">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-text-secondary-light">Status Filter</label>
                  <select 
                    value={shopStatusFilter}
                    onChange={(e) => setShopStatusFilter(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-gray-50 dark:bg-background-dark border-none outline-none dark:text-white text-xs font-bold">
                    <option>All</option>
                    <option>Pending Review</option>
                    <option>Action Required</option>
                    <option>Incomplete</option>
                  </select>
                </div>
              </div>
            )}
            
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
                  {verifyShops.filter(s => shopStatusFilter === 'All' || s.status === shopStatusFilter).map((s) => (
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
                          <div className="flex justify-end gap-2">
                            <button 
                              onClick={() => {
                                setSelectedShopDetail(s);
                                setShowShopDetailModal(true);
                              }}
                              className="p-2 bg-gray-100 dark:bg-secondary-dark rounded-xl hover:bg-primary-light hover:text-white transition-all"
                              title="View Details"
                            >
                              <Eye size={16} />
                            </button>
                            <button 
                              onClick={() => handleVerify(s.id)}
                              className="p-2 bg-success/10 text-success rounded-xl hover:bg-success hover:text-white transition-all"
                              title="Verify"
                            >
                              <CheckCircle size={16} />
                            </button>
                            <button 
                              onClick={() => handleReject(s.id)}
                              className="p-2 bg-error/10 text-error rounded-xl hover:bg-error hover:text-white transition-all"
                              title="Reject"
                            >
                              <XCircle size={16} />
                            </button>
                          </div>
                        ) : (
                          <div className="flex justify-end gap-2">
                             <button 
                              onClick={() => {
                                setSelectedShopDetail(s);
                                setShowShopDetailModal(true);
                              }}
                              className="p-2 bg-gray-100 dark:bg-secondary-dark rounded-xl hover:bg-primary-light hover:text-white transition-all"
                            >
                              <Eye size={16} />
                            </button>
                            <button 
                              onClick={async () => {
                                try {
                                  const config = { headers: { Authorization: `Bearer ${user.token}` } };
                                  await axios.delete(`/api/shops/${s.id}`, config);
                                  setVerifyShops(verifyShops.filter(item => item.id !== s.id));
                                  addNotification({ title: 'Record Deleted', message: `Shop request for ${s.name} has been removed.`, type: 'error' });
                                } catch (error) {
                                  addNotification({ title: 'Delete Error', message: error.message, type: 'error' });
                                }
                              }}
                              className="p-2 bg-error/5 text-error/60 rounded-xl hover:bg-error hover:text-white transition-all"
                            >
                              <Trash2 size={16} />
                            </button>
                            <span className="text-xs font-bold text-text-secondary-light italic bg-gray-50 dark:bg-secondary-dark/50 px-3 py-2 rounded-xl flex items-center">
                              {s.status === 'Verified' ? 'Waiting for Admin' : 'Action Taken'}
                            </span>
                          </div>
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
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-black dark:text-white tracking-tight uppercase">KYC Review Queue</h3>
                <p className="text-sm text-text-secondary-light">Manage and verify onboarding documents for agents and shops.</p>
              </div>
              <div className="flex gap-2 items-center">
                <button 
                  onClick={() => setShowKYCFilters(!showKYCFilters)}
                  className="px-4 py-2 bg-gray-50 dark:bg-secondary-dark border border-border-light dark:border-border-dark rounded-xl text-xs font-black text-text-secondary-light flex items-center gap-2 hover:border-primary-light transition-all"
                >
                  <Filter size={14} /> Filters
                </button>
                <button 
                  onClick={() => exportToCSV(kycRequests, 'kyc_document_ledger')}
                  className="px-4 py-2 bg-gray-50 dark:bg-secondary-dark border border-border-light dark:border-border-dark rounded-xl text-xs font-black text-text-secondary-light flex items-center gap-2 hover:border-primary-light transition-all"
                >
                  <Download size={14} /> Export
                </button>
                <span className="px-4 py-2 bg-primary-light/10 text-primary-light rounded-xl font-black text-xs ml-2">
                  {kycRequests.filter(k => k.status === 'Pending Review').length} Pending
                </span>
              </div>
            </div>

            {showKYCFilters && (
              <div className="p-6 bg-white dark:bg-secondary-dark rounded-2xl shadow-sm border border-border-light dark:border-border-dark flex flex-wrap gap-4 animate-in slide-in-from-top-2 duration-300">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-text-secondary-light">Status Filter</label>
                  <select 
                    value={kycStatusFilter}
                    onChange={(e) => setKycStatusFilter(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-gray-50 dark:bg-background-dark border-none outline-none dark:text-white text-xs font-bold">
                    <option>All</option>
                    <option>Pending Review</option>
                    <option>In Review</option>
                    <option>Approved</option>
                    <option>Rejected</option>
                  </select>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {kycRequests.filter(k => kycStatusFilter === 'All' || k.status === kycStatusFilter).map((k) => (
                <div key={k.id} className="card-premium group hover:border-primary-light/50 transition-all">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex gap-4 items-center">
                      <div className="w-12 h-12 bg-primary-light text-white rounded-2xl flex items-center justify-center text-xl font-black shadow-lg shadow-primary-light/20">
                        {k.name[0]}
                      </div>
                      <div>
                        <h4 className="font-black dark:text-white text-lg tracking-tight">{k.name}</h4>
                        <p className="text-xs font-bold text-text-secondary-light uppercase tracking-widest">{k.role} Ãƒâ€šÃ‚Â· {k.location}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                        k.status === 'Approved' ? 'bg-success/10 text-success' : 
                        k.status === 'Rejected' ? 'bg-error/10 text-error' : 
                        'bg-warning/10 text-warning animate-pulse'
                      }`}>
                        {k.status}
                      </span>
                      <span className="text-[10px] font-bold text-text-secondary-light flex items-center gap-1"><Clock size={10}/> {k.date}</span>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6 bg-gray-50 dark:bg-secondary-dark/30 p-4 rounded-2xl border border-border-light dark:border-border-dark">
                    <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light mb-2">Submitted Documents</p>
                    <div className="flex flex-wrap gap-2">
                      {k.docs.split(', ').map(doc => (
                        <div 
                          key={doc} 
                          onClick={() => handleDownload(doc)}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl text-[10px] font-bold dark:text-white cursor-pointer hover:border-primary-light transition-all active:scale-95 group"
                        >
                          <FileText size={12} className="text-primary-light" /> {doc}
                          <Download size={10} className="text-text-secondary-light group-hover:text-primary-light ml-1" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {k.status !== 'Approved' && k.status !== 'Rejected' ? (
                    <div className="flex gap-3 mt-auto">
                      <button 
                        onClick={() => handleApproveKYC(k.id)} 
                        className="flex-1 py-3 bg-success text-white font-black text-sm rounded-2xl shadow-lg shadow-success/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                      >
                        Approve
                      </button>
                      <button 
                        onClick={() => handleRejectKYC(k.id)} 
                        className="flex-1 py-3 bg-white dark:bg-surface-dark border-2 border-error/20 text-error font-black text-sm rounded-2xl hover:bg-error/5 transition-all"
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-center p-3 bg-gray-100 dark:bg-secondary-dark/50 rounded-2xl">
                      <span className="text-xs font-black text-text-secondary-light uppercase tracking-widest italic">Verification Finalized</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'Commission View':
      case 'Incentive Tracking':
        return (
          <div className="p-8 space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-black dark:text-white tracking-tight uppercase">Earnings & Incentives</h3>
                <p className="text-sm text-text-secondary-light">Detailed breakdown of commissions and performance rewards.</p>
              </div>
              <button 
                onClick={() => setShowCommissionModal(true)}
                className="btn-primary px-6 py-3 rounded-2xl text-sm font-black flex items-center gap-2 shadow-xl shadow-primary-light/20"
              >
                <Trophy size={18} /> View Commission Plan
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Total Volume', value: 'ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¹12.5L', color: 'bg-primary-light', icon: <Briefcase /> },
                { label: 'This Month', value: 'ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¹2.4L', color: 'bg-emerald-500', icon: <TrendingUp /> },
                { label: 'Pending Settlement', value: 'ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¹45K', color: 'bg-orange-500', icon: <Clock /> },
              ].map((stat, i) => (
                <div key={i} className="card-premium flex items-center gap-4">
                  <div className={`p-4 ${stat.color} text-white rounded-2xl shadow-lg`}>
                    {React.cloneElement(stat.icon, { size: 24 })}
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-text-secondary-light uppercase tracking-widest">{stat.label}</p>
                    <h3 className="text-2xl font-black dark:text-white">{stat.value}</h3>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2 card-premium">
                <h4 className="text-lg font-black dark:text-white mb-6 flex items-center gap-2">
                  <History size={20} className="text-primary-light" /> Recent Settlements
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-border-light dark:border-border-dark text-text-secondary-light">
                        <th className="pb-4 font-black text-[10px] uppercase tracking-widest">ID / Ref</th>
                        <th className="pb-4 font-black text-[10px] uppercase tracking-widest">Date</th>
                        <th className="pb-4 font-black text-[10px] uppercase tracking-widest">Type</th>
                        <th className="pb-4 font-black text-[10px] uppercase tracking-widest text-right">Amount</th>
                        <th className="pb-4 font-black text-[10px] uppercase tracking-widest text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-light dark:divide-border-dark">
                      {[
                        { id: 'TXN-00192', date: 'Today, 10:30 AM', type: 'Shop Onboarding', amount: 'ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¹1,200', status: 'Completed' },
                        { id: 'TXN-00191', date: 'Yesterday', type: 'Sales Commission', amount: 'ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¹4,500', status: 'Pending' },
                        { id: 'TXN-00189', date: 'Oct 24', type: 'Performance Bonus', amount: 'ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¹12,400', status: 'Completed' },
                      ].map((t, i) => (
                        <tr key={i} className="hover:bg-gray-50 dark:hover:bg-secondary-dark/50 group transition-colors">
                          <td className="py-4 font-bold dark:text-white text-sm">{t.id}</td>
                          <td className="py-4 text-[11px] font-bold text-text-secondary-light">{t.date}</td>
                          <td className="py-4 text-xs font-medium dark:text-white">{t.type}</td>
                          <td className="py-4 font-black text-primary-light text-right">{t.amount}</td>
                          <td className="py-4 text-right">
                            <span className={`px-3 py-1 text-[10px] rounded-lg font-black uppercase tracking-tighter ${
                              t.status === 'Completed' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                            }`}>
                              {t.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="card-premium space-y-6">
                <h4 className="text-lg font-black dark:text-white flex items-center gap-2">
                  <Gift size={20} className="text-accent-light" /> Related Content
                </h4>
                <div className="space-y-4">
                  {[
                    { title: 'Commission Policy 2024', size: '1.2 MB', icon: <FileText className="text-blue-500" /> },
                    { title: 'Reward Milestone Guide', size: '2.5 MB', icon: <Trophy className="text-yellow-500" /> },
                    { title: 'Payout Cycle Schedule', size: '0.8 MB', icon: <Clock className="text-emerald-500" /> },
                  ].map((item, i) => (
                    <div 
                      key={i} 
                      onClick={() => handleDownload(item.title)}
                      className="p-4 bg-gray-50 dark:bg-secondary-dark/30 rounded-2xl border border-border-light dark:border-border-dark flex items-center gap-4 group cursor-pointer hover:border-primary-light/50 transition-all"
                    >
                      <div className="w-10 h-10 bg-white dark:bg-surface-dark rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-black dark:text-white">{item.title}</p>
                        <p className="text-[10px] font-bold text-text-secondary-light uppercase mt-0.5">{item.size} Ãƒâ€šÃ‚Â· PDF</p>
                      </div>
                      <Download size={14} className="text-text-secondary-light group-hover:text-primary-light" />
                    </div>
                  ))}
                </div>
              </div>
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
                { title: 'Security', icon: <Lock />, desc: 'Password, 2FA, and session management', items: [
                  { name: 'Change Password', icon: <Key size={14} /> },
                  { name: 'Two-Factor Authentication', icon: <ShieldCheck size={14} /> },
                  { name: 'Active Sessions', icon: <Clock size={14} /> }
                ] },
                { title: 'Notifications', icon: <BellRing />, desc: 'Configure email and system alerts', items: [
                  { name: 'Task Reminders', icon: <CheckSquare size={14} /> },
                  { name: 'Agent Alerts', icon: <AlertCircle size={14} /> },
                  { name: 'Weekly Digest', icon: <BarChart2 size={14} /> }
                ] },
                { title: 'System Appearance', icon: <Palette />, desc: 'Customize dashboard look and feel', items: [
                  { name: 'Dark Mode Toggle', icon: <Moon size={14} /> },
                  { name: 'Primary Brand Color', icon: <Palette size={14} /> },
                  { name: 'Compact Sidebar', icon: <LayoutDashboard size={14} /> }
                ] },
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
                          <div 
                            key={item.name} 
                            onClick={() => {
                              if (item.name === 'Change Password') setShowPasswordModal(true);
                              if (item.name === 'Two-Factor Authentication') setShow2FAModal(true);
                              if (item.name === 'Active Sessions') setShowSessionsModal(true);
                              
                              if (['Task Reminders', 'Agent Alerts', 'Weekly Digest'].includes(item.name)) {
                                setShowNotificationSettingsModal(true);
                              }
                              
                              if (['Primary Brand Color'].includes(item.name)) {
                                setShowAppearanceSettingsModal(true);
                              }

                              if (item.name === 'Dark Mode Toggle') toggleTheme();
                              if (item.name === 'Compact Sidebar') setIsSidebarCollapsed(!isSidebarCollapsed);
                            }}
                            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-secondary-dark/50 rounded-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-secondary-dark transition-all group"
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-primary-light p-1.5 bg-white dark:bg-surface-dark rounded-lg shadow-sm">{item.icon}</span>
                              <span className="text-sm dark:text-white font-medium">{item.name}</span>
                            </div>
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
                  <button 
                    onClick={() => {
                      setSavingProfile(true);
                      setTimeout(() => {
                        setSavingProfile(false);
                        addNotification({ title: 'Profile Updated', message: 'Your changes have been saved successfully.', type: 'success' });
                      }, 1500);
                    }}
                    disabled={savingProfile}
                    className={`btn-primary px-8 py-3 rounded-xl font-bold shadow-lg shadow-primary-light/20 transition-all ${savingProfile ? 'opacity-50 cursor-not-allowed scale-[0.98]' : 'hover:scale-[1.02] active:scale-[0.98]'}`}
                  >
                    {savingProfile ? 'Saving...' : 'Save Changes'}
                  </button>
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
        return (
          <div className="p-8 space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold dark:text-white">Area Management</h3>
                <p className="text-sm text-text-secondary-light mt-1">Monitor and manage your assigned territories, zones and pincode coverage.</p>
              </div>
              <button onClick={() => setShowAddZoneModal(true)} className="btn-primary px-4 py-2 text-sm flex items-center gap-2">
                <Map size={16} /> Add New Zone
              </button>
            </div>

            {/* Area Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { label: 'Total Zones', value: '8', color: 'bg-blue-500', icon: <Map size={20} /> },
                { label: 'Active Pincodes', value: '124', color: 'bg-emerald-500', icon: <ShieldCheck size={20} /> },
                { label: 'Agents Deployed', value: '42', color: 'bg-primary-light', icon: <Users size={20} /> },
                { label: 'Uncovered Areas', value: '3', color: 'bg-orange-500', icon: <AlertCircle size={20} /> },
              ].map((stat) => (
                <div key={stat.label} className="card-premium flex items-center gap-4">
                  <div className={`p-3 ${stat.color} text-white rounded-2xl shadow-lg`}>{stat.icon}</div>
                  <div>
                    <p className="text-xs text-text-secondary-light">{stat.label}</p>
                    <h3 className="text-2xl font-bold dark:text-white">{stat.value}</h3>
                  </div>
                </div>
              ))}
            </div>

            {/* Zone Table */}
            <div className="card-premium p-0 overflow-hidden">
              <div className="p-5 border-b dark:border-border-dark flex justify-between items-center">
                <h4 className="font-bold dark:text-white">Territory Zone Overview</h4>
                <span className="text-[10px] font-black text-text-secondary-light uppercase tracking-widest">8 Zones Active</span>
              </div>
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50 dark:bg-secondary-dark/30">
                    <th className="p-4 font-black text-[10px] text-text-secondary-light uppercase tracking-widest">Zone / Area</th>
                    <th className="p-4 font-black text-[10px] text-text-secondary-light uppercase tracking-widest">Pincodes</th>
                    <th className="p-4 font-black text-[10px] text-text-secondary-light uppercase tracking-widest">Agents</th>
                    <th className="p-4 font-black text-[10px] text-text-secondary-light uppercase tracking-widest">Shops</th>
                    <th className="p-4 font-black text-[10px] text-text-secondary-light uppercase tracking-widest">Coverage</th>
                    <th className="p-4 font-black text-[10px] text-text-secondary-light uppercase tracking-widest text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-light dark:divide-border-dark">
                  {[
                    { zone: 'Pune Central', pincodes: '411001, 411002', agents: 8, shops: 34, coverage: 92, status: 'Active' },
                    { zone: 'Mumbai South', pincodes: '400001, 400002', agents: 12, shops: 56, coverage: 87, status: 'Active' },
                    { zone: 'Delhi NCR Zone A', pincodes: '110001-110010', agents: 10, shops: 41, coverage: 78, status: 'Active' },
                    { zone: 'Nashik District', pincodes: '422001, 422002', agents: 5, shops: 18, coverage: 55, status: 'Partial' },
                    { zone: 'Nagpur East', pincodes: '440001', agents: 3, shops: 9, coverage: 40, status: 'Low Coverage' },
                  ].map((zone, i) => (
                    <tr key={i} className="hover:bg-gray-50 dark:hover:bg-secondary-dark/50 transition-colors">
                      <td className="p-4">
                        <p className="font-bold dark:text-white text-sm">{zone.zone}</p>
                        <p className="text-[10px] text-text-secondary-light font-bold mt-0.5">{zone.pincodes}</p>
                      </td>
                      <td className="p-4 text-sm font-bold dark:text-white">{zone.pincodes.split(',').length}</td>
                      <td className="p-4 text-sm font-bold dark:text-white">{zone.agents}</td>
                      <td className="p-4 text-sm font-bold dark:text-white">{zone.shops}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-gray-100 dark:bg-background-dark rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${zone.coverage >= 80 ? 'bg-success' : zone.coverage >= 50 ? 'bg-warning' : 'bg-error'}`}
                              style={{ width: `${zone.coverage}%` }}
                            ></div>
                          </div>
                          <span className="text-[10px] font-black dark:text-white w-8">{zone.coverage}%</span>
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          zone.status === 'Active' ? 'bg-success/10 text-success' :
                          zone.status === 'Partial' ? 'bg-warning/10 text-warning' : 'bg-error/10 text-error'
                        }`}>{zone.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'Daily Work Updates':
        return (
          <div className="p-8 space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold dark:text-white">Daily Work Updates</h3>
                <p className="text-sm text-text-secondary-light mt-1">Submit your daily field report and monitor team activity logs.</p>
              </div>
              <button 
                onClick={() => {
                  setReportSubmitted(true);
                  addNotification({ 
                    title: 'Report Submitted', 
                    message: 'Your daily field report for Pune Central has been successfully recorded.', 
                    type: 'success' 
                  });
                  setTimeout(() => setReportSubmitted(false), 5000);
                }}
                disabled={reportSubmitted}
                className={`btn-primary px-4 py-2 text-sm flex items-center gap-2 transition-all ${reportSubmitted ? 'bg-success border-success' : ''}`}
              >
                {reportSubmitted ? <CheckCircle size={16} /> : <Briefcase size={16} />}
                {reportSubmitted ? 'Report Submitted' : "Submit Today's Report"}
              </button>
            </div>

            {/* Today's Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: "Agents Reported Today", value: '36 / 42', sub: '6 pending', color: 'text-primary-light bg-primary-light/10' },
                { label: "Shops Visited", value: '87', sub: 'Out of 128 assigned', color: 'text-emerald-500 bg-emerald-500/10' },
                { label: "Issues Flagged", value: '4', sub: 'Requires follow-up', color: 'text-error bg-error/10' },
              ].map((s) => (
                <div key={s.label} className="card-premium flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl ${s.color}`}>{s.value}</div>
                  <div>
                    <p className="text-xs text-text-secondary-light">{s.label}</p>
                    <p className="text-sm font-bold dark:text-white">{s.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Submit Form */}
            <div className="card-premium space-y-5">
              <h4 className="font-bold dark:text-white text-lg border-b border-border-light dark:border-border-dark pb-3">📝 Today's Field Update</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">Zone / Area Covered</label>
                  <select className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-bold appearance-none">
                    <option>Pune Central</option>
                    <option>Mumbai South</option>
                    <option>Delhi NCR Zone A</option>
                    <option>Nashik District</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">Agents Visited</label>
                  <input type="number" defaultValue="8" className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-bold" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">Daily Summary / Observations</label>
                <textarea rows="3" placeholder="Briefly describe today's field activity, issues, and highlights..." className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-bold resize-none leading-relaxed"></textarea>
              </div>
              <button 
                onClick={() => {
                  setReportSubmitted(true);
                  addNotification({ 
                    title: 'Report Submitted', 
                    message: 'Your daily field report for Pune Central has been successfully recorded.', 
                    type: 'success' 
                  });
                  setTimeout(() => setReportSubmitted(false), 5000);
                }}
                disabled={reportSubmitted}
                className={`w-full py-3 text-white rounded-2xl font-black text-sm shadow-xl transition-all ${reportSubmitted ? 'bg-success shadow-success/20 scale-[0.98]' : 'bg-primary-light shadow-primary-light/20 hover:scale-[1.01] active:scale-[0.99]'}`}
              >
                {reportSubmitted ? '✅ Report Submitted' : 'Submit Field Report'}
              </button>
            </div>

            {/* Recent Team Updates */}
            <div className="card-premium space-y-4">
              <h4 className="font-bold dark:text-white text-lg border-b border-border-light dark:border-border-dark pb-3">🕒 Recent Team Updates</h4>
              {[
                { name: 'Amit Singh', zone: 'Pune South', time: '10:30 AM', note: 'Visited 6 shops, 1 new KYC submitted.', status: 'Submitted' },
                { name: 'Priya Verma', zone: 'Pincode 411001', time: '11:15 AM', note: 'Agent follow-up done, updates collected.', status: 'Submitted' },
                { name: 'Rahul Dev', zone: 'Mumbai South', time: '--:--', note: 'No update yet for today.', status: 'Pending' },
                { name: 'Sneha Patel', zone: 'Delhi NCR A', time: '09:00 AM', note: 'Morning route complete, 4 shops verified.', status: 'Submitted' },
              ].map((update, i) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-secondary-dark rounded-2xl border border-border-light dark:border-border-dark">
                  <div className="w-10 h-10 bg-primary-light/10 text-primary-light rounded-xl flex items-center justify-center font-bold text-sm shrink-0">{update.name[0]}</div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold dark:text-white text-sm">{update.name}</p>
                        <p className="text-[10px] text-text-secondary-light font-bold">{update.zone} · {update.time}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                        update.status === 'Submitted' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                      }`}>{update.status}</span>
                    </div>
                    <p className="text-xs text-text-secondary-light mt-2">{update.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'Support / Tickets':
        return (
          <div className="p-8 space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold dark:text-white">Support / Tickets</h3>
                <p className="text-sm text-text-secondary-light mt-1">Manage, escalate and track all support requests from your territory.</p>
              </div>
              <button 
                onClick={() => setShowTicketModal(true)}
                className="btn-primary px-4 py-2 text-sm flex items-center gap-2"
              >
                <LifeBuoy size={16} /> Raise New Ticket
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { label: 'Open Tickets', value: '8', color: 'bg-error', icon: <AlertCircle size={20} /> },
                { label: 'In Progress', value: '5', color: 'bg-warning', icon: <Clock size={20} /> },
                { label: 'Resolved Today', value: '12', color: 'bg-success', icon: <CheckCircle size={20} /> },
                { label: 'Avg. Resolution Time', value: '3.2h', color: 'bg-blue-500', icon: <TrendingUp size={20} /> },
              ].map((stat) => (
                <div key={stat.label} className="card-premium flex items-center gap-4">
                  <div className={`p-3 ${stat.color} text-white rounded-2xl shadow-lg shrink-0`}>{stat.icon}</div>
                  <div>
                    <p className="text-xs text-text-secondary-light">{stat.label}</p>
                    <h3 className="text-2xl font-bold dark:text-white">{stat.value}</h3>
                  </div>
                </div>
              ))}
            </div>

            {/* Tickets Table */}
            <div className="card-premium p-0 overflow-hidden">
              <div className="p-5 border-b dark:border-border-dark flex justify-between items-center">
                <h4 className="font-bold dark:text-white">Active Tickets</h4>
                <div className="flex gap-2">
                  {['All', 'Open', 'In Progress', 'Resolved'].map((f) => (
                    <button key={f} className="px-3 py-1 rounded-full text-[10px] font-black bg-gray-100 dark:bg-secondary-dark text-text-secondary-light hover:text-primary-light hover:bg-primary-light/10 transition-colors uppercase tracking-widest">{f}</button>
                  ))}
                </div>
              </div>
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50 dark:bg-secondary-dark/30">
                    <th className="p-4 font-black text-[10px] text-text-secondary-light uppercase tracking-widest">Ticket ID</th>
                    <th className="p-4 font-black text-[10px] text-text-secondary-light uppercase tracking-widest">Subject</th>
                    <th className="p-4 font-black text-[10px] text-text-secondary-light uppercase tracking-widest">Raised By</th>
                    <th className="p-4 font-black text-[10px] text-text-secondary-light uppercase tracking-widest">Priority</th>
                    <th className="p-4 font-black text-[10px] text-text-secondary-light uppercase tracking-widest">Status</th>
                    <th className="p-4 font-black text-[10px] text-text-secondary-light uppercase tracking-widest">Created</th>
                    <th className="p-4 font-black text-[10px] text-text-secondary-light uppercase tracking-widest text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-light dark:divide-border-dark">
                  {[
                    { id: 'TKT-4821', subject: 'Agent unable to login', by: 'Amit Singh', priority: 'High', status: 'Open', time: '10 min ago' },
                    { id: 'TKT-4820', subject: 'Shop KYC document rejected incorrectly', by: 'Fresh Mart', priority: 'High', status: 'In Progress', time: '1h ago' },
                    { id: 'TKT-4818', subject: 'Commission not credited for May', by: 'Priya Verma', priority: 'Medium', status: 'Open', time: '3h ago' },
                    { id: 'TKT-4815', subject: 'App crash on data submission', by: 'Rahul Dev', priority: 'Low', status: 'In Progress', time: 'Yesterday' },
                    { id: 'TKT-4810', subject: 'Wrong area assigned to agent', by: 'Sneha Patel', priority: 'Medium', status: 'Resolved', time: '2 days ago' },
                    { id: 'TKT-4805', subject: 'Referral bonus not reflecting', by: 'Vikram Kumar', priority: 'Low', status: 'Resolved', time: '3 days ago' },
                  ].map((ticket, i) => (
                    <tr key={i} className="hover:bg-gray-50 dark:hover:bg-secondary-dark/50 transition-colors group">
                      <td className="p-4">
                        <span className="text-[11px] font-black text-primary-light bg-primary-light/10 px-2 py-1 rounded-lg">{ticket.id}</span>
                      </td>
                      <td className="p-4">
                        <p className="font-bold dark:text-white text-sm">{ticket.subject}</p>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 bg-gray-100 dark:bg-secondary-dark rounded-full flex items-center justify-center text-xs font-bold dark:text-white">{ticket.by[0]}</div>
                          <span className="text-sm text-text-secondary-light font-medium">{ticket.by}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                          ticket.priority === 'High' ? 'bg-error/10 text-error' :
                          ticket.priority === 'Medium' ? 'bg-warning/10 text-warning' :
                          'bg-gray-100 dark:bg-secondary-dark text-text-secondary-light'
                        }`}>{ticket.priority}</span>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          ticket.status === 'Open' ? 'bg-error/10 text-error' :
                          ticket.status === 'In Progress' ? 'bg-warning/10 text-warning' :
                          'bg-success/10 text-success'
                        }`}>{ticket.status}</span>
                      </td>
                      <td className="p-4 text-xs text-text-secondary-light font-medium">{ticket.time}</td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button className="p-2 bg-gray-100 dark:bg-secondary-dark rounded-xl hover:bg-primary-light hover:text-white transition-all">
                            <Eye size={14} />
                          </button>
                          <button 
                            onClick={() => {
                              setSupportTickets(supportTickets.filter(t => t.id !== ticket.id));
                              addNotification({ title: 'Ticket Deleted', message: `Support ticket ${ticket.id} has been removed.`, type: 'error' });
                            }}
                            className="p-2 bg-error/5 text-error/60 rounded-xl hover:bg-error hover:text-white transition-all"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Raise New Ticket Form */}
            <div className="card-premium space-y-5">
              <h4 className="font-bold dark:text-white text-lg border-b border-border-light dark:border-border-dark pb-3">🎟️ Raise a New Ticket</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">Issue Category</label>
                  <select className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-bold appearance-none">
                    <option>Agent Issue</option>
                    <option>Shop / KYC Problem</option>
                    <option>Commission / Finance</option>
                    <option>App / Technical Bug</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">Priority Level</label>
                  <select className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-bold appearance-none">
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">Subject</label>
                <input type="text" placeholder="Brief title of the issue..." className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-bold" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">Description</label>
                <textarea rows="3" placeholder="Describe the issue in detail including agent/shop ID if applicable..." className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-bold resize-none leading-relaxed"></textarea>
              </div>
              <button 
                onClick={() => addNotification({ title: 'Ticket Submitted', message: 'Your support ticket has been raised. A technician will contact you soon.', type: 'info' })}
                className="w-full py-3 bg-primary-light text-white rounded-2xl font-black text-sm shadow-xl shadow-primary-light/20 hover:scale-[1.01] active:scale-[0.99] transition-all"
              >
                Submit Support Ticket
              </button>
            </div>
          </div>
        );

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
                    <p className="text-sm text-text-secondary-light mb-4">Detailed metric or record log regarding this operational category.</p>
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


      case 'Reports':
        return (
          <div className="p-8 space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold dark:text-white">Reports Overview</h3>
                <p className="text-sm text-text-secondary-light mt-1">Consolidated performance reports for your assigned territory.</p>
              </div>
              <div className="relative">
                <button 
                  onClick={() => setShowTimeDropdown(!showTimeDropdown)}
                  className="px-4 py-2 bg-white dark:bg-secondary-dark border border-border-light dark:border-border-dark rounded-xl flex items-center gap-3 text-sm font-bold dark:text-white shadow-sm hover:border-primary-light transition-all"
                >
                  <Filter size={14} className="text-primary-light" />
                  <span>{timeRange}</span>
                </button>
                {showTimeDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-2xl shadow-2xl z-[100] py-2 animate-in zoom-in-95 duration-200">
                    {['Today', 'Yesterday', 'Last 7 Days', 'Last 30 Days', 'This Quarter', 'Custom Range'].map(range => (
                      <div 
                        key={range}
                        onClick={() => {
                          setTimeRange(range);
                          setShowTimeDropdown(false);
                          addNotification({ title: 'Data Filtered', message: `Compiling reports for ${range}...`, type: 'info' });
                        }}
                        className={`px-4 py-2.5 text-sm font-medium cursor-pointer transition-colors ${timeRange === range ? 'bg-primary-light text-white' : 'dark:text-white hover:bg-primary-light/10 hover:text-primary-light'}`}
                      >
                        {range}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Agent Performance', value: '42 Active', sub: '+3 this week', color: 'bg-blue-500', icon: <Users size={22} /> },
                { title: 'Shop Activity', value: '128 Shops', sub: '12 pending review', color: 'bg-emerald-500', icon: <Store size={22} /> },
                { title: 'Commission Earned', value: '₹2.4L', sub: '+8% vs last month', color: 'bg-primary-light', icon: <DollarSign size={22} /> },
              ].map((stat) => (
                <div key={stat.title} className="card-premium flex items-center gap-4">
                  <div className={`p-4 ${stat.color} text-white rounded-2xl shadow-lg shrink-0`}>{stat.icon}</div>
                  <div>
                    <p className="text-sm text-text-secondary-light">{stat.title}</p>
                    <h3 className="text-2xl font-bold dark:text-white">{stat.value}</h3>
                    <p className="text-xs text-text-secondary-light mt-0.5">{stat.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: 'Agent Reports', items: ['Weekly Agent Activity', 'Agent KYC Completion Rate', 'New Registrations This Month'] },
                { title: 'Shop Reports', items: ['Shop Onboarding Rate', 'Verification Backlog', 'Category-wise Distribution'] },
                { title: 'Finance Summary', items: ['Commission Ledger (MTD)', 'Payout Status Overview', 'Pending Settlements'] },
                { title: 'Operations Log', items: ['Daily Work Submission Rate', 'Area Coverage Progress', 'Outstanding Follow-ups'] },
              ].map((section) => (
                <div key={section.title} className="card-premium space-y-4">
                  <h4 className="font-bold dark:text-white text-lg border-b border-border-light dark:border-border-dark pb-3">{section.title}</h4>
                  <div className="space-y-2">
                    {section.items.map((item) => (
                       <div 
                        key={item} 
                        onClick={() => {
                          setSelectedReport(item);
                          setShowReportModal(true);
                        }}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-secondary-dark rounded-xl group hover:bg-primary-light/5 cursor-pointer transition-all"
                      >
                        <span className="text-sm font-medium dark:text-white">{item}</span>
                        <button className="text-[10px] font-black text-primary-light px-3 py-1 bg-primary-light/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">View ➔</button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'Commission View':
        return (
          <div className="p-8 space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold dark:text-white">Commission & Payouts</h3>
                <p className="text-sm text-text-secondary-light mt-1">Monitor and manage agent commissions and payout statuses.</p>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => exportToCSV(payoutData, 'commission_ledger')}
                  className="px-4 py-2 bg-gray-50 dark:bg-secondary-dark border border-border-light dark:border-border-dark rounded-xl text-xs font-black text-text-secondary-light flex items-center gap-2 hover:border-primary-light transition-all"
                >
                  <Download size={14} /> Export CSV
                </button>
              </div>
            </div>

            {/* Search and Filter Row */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
              <div className="relative w-full md:w-96">
                <BarChart2 className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary-light" size={18} />
                <input 
                  type="text"
                  placeholder="Search Txn ID, User or Amount..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light rounded-2xl outline-none dark:text-white font-bold transition-all"
                />
              </div>

              {/* Filter Chips */}
              <div className="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
                {['All', 'Successful', 'Pending', 'Refunded'].map(filter => (
                  <button 
                    key={filter}
                    onClick={() => {
                      setFinanceFilter(filter);
                      addNotification({ title: 'Filter Updated', message: `Showing ${filter} transactions`, type: 'info' });
                    }}
                    className={`px-6 py-2 rounded-full text-xs font-black transition-all duration-300 whitespace-nowrap ${
                      financeFilter === filter 
                        ? 'bg-primary-light text-white shadow-lg shadow-primary-light/20 scale-105' 
                        : 'bg-gray-100 dark:bg-secondary-dark text-text-secondary-light hover:bg-gray-200 dark:hover:bg-background-dark'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Commission Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Total Commission', value: '₹4.8L', icon: <DollarSign size={20} />, color: 'bg-primary-light' },
                { title: 'Payout Processed', value: '₹3.2L', icon: <CheckCircle size={20} />, color: 'bg-emerald-500' },
                { title: 'Outstanding Balance', value: '₹1.6L', icon: <Clock size={20} />, color: 'bg-orange-500' },
              ].map((stat) => (
                <div key={stat.title} className="card-premium flex items-center gap-4">
                  <div className={`p-4 ${stat.color} text-white rounded-2xl shadow-lg`}>{stat.icon}</div>
                  <div>
                    <p className="text-xs text-text-secondary-light">{stat.title}</p>
                    <h3 className="text-2xl font-bold dark:text-white">{stat.value}</h3>
                  </div>
                </div>
              ))}
            </div>

            <div className="card-premium p-0 overflow-hidden">
               <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50 dark:bg-secondary-dark/30 border-b dark:border-border-dark text-text-secondary-light">
                    <th className="p-4 font-black text-[10px] uppercase tracking-widest">Transaction ID</th>
                    <th className="p-4 font-black text-[10px] uppercase tracking-widest">Agent / Shop</th>
                    <th className="p-4 font-black text-[10px] uppercase tracking-widest">Amount</th>
                    <th className="p-4 font-black text-[10px] uppercase tracking-widest">Date</th>
                    <th className="p-4 font-black text-[10px] uppercase tracking-widest">Status</th>
                    <th className="p-4 font-black text-[10px] uppercase tracking-widest text-right">Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-light dark:divide-border-dark">
                  {payoutData
                  .filter(txn => {
                    const matchesFilter = financeFilter === 'All' || txn.status === financeFilter;
                    const matchesSearch = txn.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                        txn.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                        txn.amount.toLowerCase().includes(searchQuery.toLowerCase());
                    return matchesFilter && matchesSearch;
                  })
                  .map((txn, i) => (
                    <tr key={i} className="hover:bg-gray-50 dark:hover:bg-secondary-dark/50 transition-colors group">
                      <td className="p-4 text-xs font-mono dark:text-white">{txn.id}</td>
                      <td className="p-4 text-sm font-bold dark:text-white">{txn.name}</td>
                      <td className="p-4 text-sm font-black text-primary-light">{txn.amount}</td>
                      <td className="p-4 text-xs text-text-secondary-light font-medium">{txn.date}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest ${
                          txn.status === 'Successful' ? 'bg-success/10 text-success' :
                          txn.status === 'Pending' ? 'bg-warning/10 text-warning' : 'bg-error/10 text-error'
                        }`}>{txn.status}</span>
                      </td>
                      <td className="p-4 text-right">
                        <button 
                          onClick={() => {
                            addNotification({ title: 'Preparing Receipt', message: `Generating PDF for ${txn.id}...`, type: 'info' });
                            setTimeout(() => addNotification({ title: 'Download Success', message: `Receipt for ${txn.id} has been saved.`, type: 'success' }), 2000);
                          }}
                          className="px-3 py-1.5 bg-primary-light/5 text-primary-light text-[10px] font-black rounded-lg hover:bg-primary-light hover:text-white transition-all uppercase tracking-widest"
                        >
                          Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
      <aside className={`${isSidebarCollapsed ? 'w-24' : 'w-72'} bg-surface-light dark:bg-surface-dark border-r border-border-light dark:border-border-dark hidden lg:flex flex-col shadow-2xl z-20 transition-all duration-500`}>
        <div className={`p-6 border-b dark:border-border-dark ${isSidebarCollapsed ? 'flex justify-center' : ''}`}>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-light dark:bg-primary-dark rounded-xl flex items-center justify-center shadow-lg shadow-primary-light/20 transition-transform">
              <span className="text-white font-black text-xl">S</span>
            </div>
            {!isSidebarCollapsed && (
              <div>
                <span className="font-black text-xl dark:text-white block leading-tight tracking-tight">Agent<span className="text-primary-light">Hub</span></span>
                <span className="text-[10px] font-black text-primary-light uppercase tracking-widest">Sub-Admin</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-4 custom-scrollbar">
          <SidebarSection title={isSidebarCollapsed ? "" : "MAIN"} collapsed={isSidebarCollapsed}>
            <SidebarLink icon={<LayoutDashboard size={18} />} label="Dashboard" active={activeTab === 'Dashboard'} onClick={() => setActiveTab('Dashboard')} collapsed={isSidebarCollapsed} />
            <SidebarLink icon={<Bell size={18} />} label="Notifications" active={activeTab === 'Notifications'} onClick={() => setActiveTab('Notifications')} collapsed={isSidebarCollapsed} />
          </SidebarSection>

          <SidebarSection title={isSidebarCollapsed ? "" : "MANAGEMENT"} collapsed={isSidebarCollapsed}>
            <SidebarLink icon={<Users size={18} />} label="Assigned Agents" active={activeTab === 'Assigned Agents'} onClick={() => setActiveTab('Assigned Agents')} collapsed={isSidebarCollapsed} />
            <SidebarLink icon={<Store size={18} />} label="Shop Management" active={activeTab === 'Shop Management'} onClick={() => setActiveTab('Shop Management')} collapsed={isSidebarCollapsed} />
          </SidebarSection>

          <SidebarSection title={isSidebarCollapsed ? "" : "VERIFICATION"} collapsed={isSidebarCollapsed}>
            <SidebarLink icon={<ShieldCheck size={18} />} label="KYC Review" active={activeTab === 'KYC Review'} onClick={() => setActiveTab('KYC Review')} collapsed={isSidebarCollapsed} />
          </SidebarSection>

          <SidebarSection title={isSidebarCollapsed ? "" : "OPERATIONS"} collapsed={isSidebarCollapsed}>
            <SidebarLink icon={<Map size={18} />} label="Area Management" active={activeTab === 'Area Management'} onClick={() => setActiveTab('Area Management')} collapsed={isSidebarCollapsed} />
            <SidebarLink icon={<Briefcase size={18} />} label="Daily Work Updates" active={activeTab === 'Daily Work Updates'} onClick={() => setActiveTab('Daily Work Updates')} collapsed={isSidebarCollapsed} />
          </SidebarSection>

          <SidebarSection title={isSidebarCollapsed ? "" : "FINANCE"} collapsed={isSidebarCollapsed}>
            <SidebarLink icon={<DollarSign size={18} />} label="Commission View" active={activeTab === 'Commission View'} onClick={() => setActiveTab('Commission View')} collapsed={isSidebarCollapsed} />
          </SidebarSection>

          <SidebarSection title={isSidebarCollapsed ? "" : "SUPPORT"} collapsed={isSidebarCollapsed}>
            <SidebarLink icon={<LifeBuoy size={18} />} label="Support / Tickets" active={activeTab === 'Support / Tickets'} onClick={() => setActiveTab('Support / Tickets')} collapsed={isSidebarCollapsed} />
          </SidebarSection>

          <SidebarSection title={isSidebarCollapsed ? "" : "REPORTS"} collapsed={isSidebarCollapsed}>
            <SidebarLink icon={<BarChart2 size={18} />} label="Reports" active={activeTab === 'Reports'} onClick={() => setActiveTab('Reports')} collapsed={isSidebarCollapsed} />
          </SidebarSection>

          <SidebarSection title={isSidebarCollapsed ? "" : "ACCOUNT"} collapsed={isSidebarCollapsed}>
            <SidebarLink icon={<User size={18} />} label="My Profile" active={activeTab === 'My Profile'} onClick={() => setActiveTab('My Profile')} collapsed={isSidebarCollapsed} />
            <SidebarLink icon={<Settings size={18} />} label="Settings" active={activeTab === 'Settings'} onClick={() => setActiveTab('Settings')} collapsed={isSidebarCollapsed} />
            <div 
              onClick={handleLogout} 
              className={`flex items-center ${isSidebarCollapsed ? 'justify-center w-12 mx-auto' : 'p-4'} rounded-2xl cursor-pointer bg-error/5 hover:bg-error/10 border border-error/10 transition-all duration-500 group overflow-hidden relative shadow-sm mt-2`}
            >
              <div className="relative z-10">
                <span className={`font-black text-sm text-error/80 group-hover:text-error transition-colors tracking-widest uppercase flex items-center gap-2 ${isSidebarCollapsed ? 'justify-center' : ''}`}>
                  <LogOut size={16} /> {!isSidebarCollapsed && "Logout"}
                </span>
              </div>
            </div>
          </SidebarSection>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative">
        <header className="h-20 bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-md border-b border-border-light dark:border-border-dark flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm">
          <div>
            <h2 className="text-2xl font-bold dark:text-white tracking-tight">{activeTab}</h2>
            <p className="text-xs text-text-secondary-light font-medium">Sub-Admin ID: SA-10294 • Welcome back, {user?.name?.split(' ')[0] || 'State'}!</p>
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

        <AgentDetailModal
          isOpen={showAgentDetailModal}
          onClose={() => { setShowAgentDetailModal(false); setSelectedAgent(null); }}
          agent={selectedAgent}
          type={agentDetailModalType}
          onSave={(updated) => {
            setSystemUsers(systemUsers.map(u => u.id === updated.id ? { ...u, ...updated } : u));
            addNotification({ title: 'Agent Updated', message: `${updated.name}'s profile has been updated.`, type: 'success' });
            setShowAgentDetailModal(false);
          }}
        />

        <AddAgentModal 
          isOpen={showAddAgentModal} 
          onClose={() => setShowAddAgentModal(false)} 
          onAdd={async (agentData) => {
            try {
              const config = {
                headers: { Authorization: `Bearer ${user.token}` }
              };
              const { data } = await axios.post('/api/agents', agentData, config);
              
              const newAgent = {
                id: data._id,
                name: data.name,
                role: data.role,
                phone: data.phone,
                email: data.email,
                location: data.territory?.pincode || 'Not Set',
                status: data.status,
                lastLogin: 'Never',
                riskLevel: 'Low'
              };

              setSystemUsers([...systemUsers, newAgent]);
              addNotification({ title: 'Agent Added', message: `${data.name} has been successfully registered.`, type: 'success' });
              setShowAddAgentModal(false);
            } catch (error) {
              addNotification({ title: 'Registration Error', message: error.response?.data?.message || error.message, type: 'error' });
            }
          }}
        />

        <AddZoneModal 
          isOpen={showAddZoneModal} 
          onClose={() => setShowAddZoneModal(false)} 
          onAdd={(zone) => {
            addNotification({ title: 'Zone Created', message: `New territory "${zone.name}" is now active.`, type: 'success' });
            setShowAddZoneModal(false);
          }}
        />

        <ShopDetailModal 
          isOpen={showShopDetailModal} 
          onClose={() => setShowShopDetailModal(false)} 
          shop={selectedShopDetail} 
        />

        <CommissionPlanModal 
          isOpen={showCommissionModal}
          onClose={() => setShowCommissionModal(false)}
        />

        <SupportTicketModal 
          isOpen={showTicketModal}
          onClose={() => setShowTicketModal(false)}
          onAdd={() => {
            addNotification({ title: 'Ticket Created', message: 'Your support ticket has been logged successfully.', type: 'success' });
            setShowTicketModal(false);
          }}
        />

        <ReportDetailsModal 
          isOpen={showReportModal}
          onClose={() => setShowReportModal(false)}
          reportTitle={selectedReport}
        />

        <ChangePasswordModal 
          isOpen={showPasswordModal}
          onClose={() => setShowPasswordModal(false)}
          onSuccess={() => {
            addNotification({ title: 'Password Changed', message: 'Your security credentials have been updated.', type: 'success' });
            setShowPasswordModal(false);
          }}
        />

        <TwoFAModal 
          isOpen={show2FAModal}
          onClose={() => setShow2FAModal(false)}
          onUpdate={(enabled) => {
            addNotification({ title: 'Security Updated', message: `Two-Factor Authentication is now ${enabled ? 'Enabled' : 'Disabled'}.`, type: 'info' });
            setShow2FAModal(false);
          }}
        />

        <SessionsModal 
          isOpen={showSessionsModal}
          onClose={() => setShowSessionsModal(false)}
        />

        <NotificationSettingsModal 
          isOpen={showNotificationSettingsModal}
          onClose={() => setShowNotificationSettingsModal(false)}
          onSave={() => {
            addNotification({ title: 'Alerts Updated', message: 'Your notification preferences have been synced.', type: 'success' });
            setShowNotificationSettingsModal(false);
          }}
        />

        <AppearanceSettingsModal 
          isOpen={showAppearanceSettingsModal}
          onClose={() => setShowAppearanceSettingsModal(false)}
          onSave={() => {
            addNotification({ title: 'Appearance Saved', message: 'System theme and colors have been updated.', type: 'info' });
            setShowAppearanceSettingsModal(false);
          }}
        />
      </main>
    </div>
  );
};

const CommissionPlanModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background-dark/80 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose}></div>
      <div className="relative w-full max-w-2xl bg-white dark:bg-surface-dark rounded-[40px] shadow-2xl border border-white/10 overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
        <div className="p-8 border-b dark:border-border-dark flex justify-between items-center bg-gradient-to-r from-primary-light to-primary-dark text-white">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center shadow-inner">
              <Trophy size={28} />
            </div>
            <div>
              <h3 className="text-2xl font-black tracking-tight">Standard Commission Plan</h3>
              <p className="text-xs font-bold uppercase tracking-widest opacity-80">FY 2024-25 Reward Structure</p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-white/10 rounded-2xl transition-all">
            <X size={24} />
          </button>
        </div>

        <div className="p-8 overflow-y-auto custom-scrollbar space-y-8">
          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-primary-light border-b-2 border-primary-light/10 pb-2">Onboarding Rewards</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 dark:bg-secondary-dark rounded-2xl border border-border-light dark:border-border-dark">
                <p className="text-xs font-bold text-text-secondary-light uppercase">New Shop Tie-up</p>
                <p className="text-2xl font-black dark:text-white mt-1">ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¹500 <span className="text-xs font-medium text-text-secondary-light">per shop</span></p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-secondary-dark rounded-2xl border border-border-light dark:border-border-dark">
                <p className="text-xs font-bold text-text-secondary-light uppercase">Agent Referral</p>
                <p className="text-2xl font-black dark:text-white mt-1">ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¹1,000 <span className="text-xs font-medium text-text-secondary-light">per agent</span></p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-500 border-b-2 border-emerald-500/10 pb-2">Sales Commission</h4>
            <div className="card-premium p-0 overflow-hidden border-emerald-500/20">
              <table className="w-full text-left">
                <thead className="bg-emerald-500/5">
                  <tr>
                    <th className="p-4 text-[10px] font-black uppercase text-text-secondary-light">Monthly Sales Volume</th>
                    <th className="p-4 text-[10px] font-black uppercase text-text-secondary-light text-right">Commission Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-light dark:divide-border-dark">
                  <tr>
                    <td className="p-4 text-sm font-bold dark:text-white">Up to ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¹5 Lakhs</td>
                    <td className="p-4 text-sm font-black text-emerald-500 text-right">3%</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-sm font-bold dark:text-white">ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¹5 Lakhs - ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¹15 Lakhs</td>
                    <td className="p-4 text-sm font-black text-emerald-500 text-right">5%</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-sm font-bold dark:text-white">Above ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¹15 Lakhs</td>
                    <td className="p-4 text-sm font-black text-emerald-500 text-right">8%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-6 bg-primary-light/5 rounded-3xl border border-primary-light/10">
            <h4 className="font-bold dark:text-white flex items-center gap-2 mb-2">
              <Zap size={18} className="text-primary-light" /> Performance Multiplier
            </h4>
            <p className="text-sm text-text-secondary-light leading-relaxed">
              Maintain a shop retention rate above <span className="font-bold text-primary-light">95%</span> to qualify for an additional <span className="font-bold text-primary-light">2% bonus</span> on total monthly earnings.
            </p>
          </div>
        </div>

        <div className="p-8 border-t dark:border-border-dark bg-gray-50/50 dark:bg-secondary-dark/30">
          <button onClick={onClose} className="w-full py-4 bg-primary-light text-white rounded-2xl font-black text-sm shadow-xl shadow-primary-light/20 hover:scale-[1.02] transition-all">Got it, Thanks!</button>
        </div>
      </div>
    </div>
  );
};

const AddAgentModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    role: 'District Agent',
    territory: 'Pune Central'
  });
  const [documents, setDocuments] = useState({});

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!formData.name || !formData.phone) {
      alert('Please fill in Name and Phone number');
      return;
    }
    onAdd({
      ...formData,
      documents,
      id: Date.now(),
      status: 'Active',
      lastLogin: 'Never',
      riskLevel: 'Low'
    });
    setFormData({ name: '', phone: '', email: '', role: 'District Agent', territory: 'Pune Central' });
    setDocuments({});
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background-dark/80 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose}></div>
      <div className="relative w-full max-w-2xl bg-surface-light dark:bg-surface-dark rounded-[32px] shadow-2xl border border-border-light dark:border-border-dark overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
        <div className="p-8 border-b dark:border-border-dark flex justify-between items-center bg-primary-light text-white">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center"><Users size={24}/></div>
            <div>
              <h3 className="text-xl font-black">Register New Agent</h3>
              <p className="text-xs font-bold uppercase opacity-80">Agent Onboarding Form</p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-white/10 rounded-2xl transition-all"><X size={24}/></button>
        </div>
        <div className="p-8 overflow-y-auto custom-scrollbar space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-text-secondary-light">Full Name</label>
              <input 
                type="text" 
                placeholder="John Doe" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-bold" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-text-secondary-light">Phone Number</label>
              <input 
                type="tel" 
                placeholder="+91 00000 00000" 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-4 py-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-bold" 
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-text-secondary-light">Email Address</label>
            <input 
              type="email" 
              placeholder="agent@example.com" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-bold" 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-text-secondary-light">Assigned Role</label>
              <select 
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
                className="w-full px-4 py-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-bold appearance-none"
              >
                <option>District Agent</option>
                <option>Pincode Agent</option>
                <option>Divisional Agent</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-text-secondary-light">Territory / Zone</label>
              <select 
                value={formData.territory}
                onChange={(e) => setFormData({...formData, territory: e.target.value})}
                className="w-full px-4 py-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-bold appearance-none"
              >
                <option>Pune Central</option>
                <option>Mumbai South</option>
                <option>Delhi NCR Zone A</option>
              </select>
            </div>
          </div>
          <div className="space-y-4 pt-4">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light">Document Verification</h4>
            <div className="grid grid-cols-2 gap-3">
              {['Aadhar Card', 'PAN Card', 'Address Proof', 'Profile Photo'].map(doc => (
                <label key={doc} className={`p-4 rounded-2xl border-2 border-dashed flex flex-col items-center gap-2 cursor-pointer transition-all ${documents[doc] ? 'bg-success/5 border-success/30' : 'bg-gray-50 dark:bg-secondary-dark border-border-light dark:border-border-dark hover:border-primary-light'}`}>
                  <input type="file" className="hidden" onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setDocuments(prev => ({...prev, [doc]: e.target.files[0]}));
                    }
                  }} />
                  <div className={`p-2 rounded-xl ${documents[doc] ? 'bg-success/10 text-success' : 'bg-primary-light/10 text-primary-light'}`}>
                    {documents[doc] ? <CheckCircle size={20}/> : <Plus size={20}/>}
                  </div>
                  <span className="text-[10px] font-black dark:text-white text-center w-full truncate">
                    {documents[doc] ? documents[doc].name : doc}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="p-8 border-t dark:border-border-dark bg-gray-50/50 dark:bg-secondary-dark/30 flex gap-4">
          <button onClick={onClose} className="flex-1 py-4 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-2xl font-black text-sm dark:text-white hover:bg-gray-100 transition-all">Cancel</button>
          <button onClick={handleSubmit} className="flex-[2] py-4 bg-primary-light text-white rounded-2xl font-black text-sm shadow-xl shadow-primary-light/20 hover:scale-[1.02] transition-all">Complete Registration</button>
        </div>
      </div>
    </div>
  );
};

const AddZoneModal = ({ isOpen, onClose, onAdd }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background-dark/80 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose}></div>
      <div className="relative w-full max-w-lg bg-surface-light dark:bg-surface-dark rounded-[32px] shadow-2xl border border-border-light dark:border-border-dark overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-8 border-b dark:border-border-dark flex justify-between items-center bg-emerald-500 text-white">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center"><Map size={24}/></div>
            <h3 className="text-xl font-black">Add Territory Zone</h3>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-white/10 rounded-2xl transition-all"><X size={24}/></button>
        </div>
        <div className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-text-secondary-light">Zone Name</label>
            <input type="text" placeholder="e.g., Bangalore East" className="w-full px-4 py-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-bold" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-text-secondary-light">Pincodes (Comma separated)</label>
            <textarea rows="2" placeholder="560001, 560002..." className="w-full px-4 py-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-bold resize-none"></textarea>
          </div>
          <button onClick={() => onAdd({ name: 'Bangalore East' })} className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-black text-sm shadow-xl shadow-emerald-500/20 hover:scale-[1.02] transition-all">Create Territory Zone</button>
        </div>
      </div>
    </div>
  );
};

const ShopDetailModal = ({ isOpen, onClose, shop }) => {
  if (!isOpen || !shop) return null;
  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background-dark/80 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose}></div>
      <div className="relative w-full max-w-2xl bg-surface-light dark:bg-surface-dark rounded-[32px] shadow-2xl border border-border-light dark:border-border-dark overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
        <div className="p-8 border-b dark:border-border-dark flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-primary-light rounded-2xl flex items-center justify-center text-white text-xl font-black">{shop.name[0]}</div>
            <div>
              <h3 className="text-xl font-black dark:text-white">{shop.name}</h3>
              <p className="text-xs font-bold text-text-secondary-light uppercase tracking-widest">{shop.cat} Ãƒâ€šÃ‚Â· {shop.loc}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-gray-100 dark:hover:bg-secondary-dark rounded-2xl transition-all"><X size={24} className="dark:text-white"/></button>
        </div>
        <div className="p-8 overflow-y-auto custom-scrollbar space-y-8">
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase text-text-secondary-light border-b-2 border-primary-light/10 pb-2">Business Details</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm font-bold dark:text-white"><Phone size={16} className="text-primary-light"/> +91 99999 88888</div>
                <div className="flex items-center gap-3 text-sm font-bold dark:text-white"><Mail size={16} className="text-primary-light"/> shop@example.com</div>
                <div className="flex items-center gap-3 text-sm font-bold dark:text-white"><MapPin size={16} className="text-primary-light"/> {shop.loc}, Maharashtra</div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase text-text-secondary-light border-b-2 border-primary-light/10 pb-2">Agent Assignment</h4>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 dark:bg-secondary-dark rounded-xl flex items-center justify-center font-bold dark:text-white text-xs">{shop.agent[0]}</div>
                <div>
                  <p className="text-sm font-black dark:text-white">{shop.agent}</p>
                  <p className="text-[10px] font-bold text-text-secondary-light uppercase">Verified by this Agent</p>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase text-text-secondary-light border-b-2 border-primary-light/10 pb-2">Submitted Documents</h4>
            <div className="grid grid-cols-3 gap-3">
              {['Trade_License.pdf', 'GST_Certificate.png', 'Shop_Front.jpg'].map(doc => (
                <div 
                  key={doc} 
                  onClick={() => {
                    addNotification({ title: 'Securing File', message: 'Verifying document encryption...', type: 'info' });
                    setTimeout(() => {
                      addNotification({ title: 'Download Complete', message: `${doc} saved successfully.`, type: 'success' });
                    }, 1500);
                  }}
                  className="p-3 bg-gray-50 dark:bg-secondary-dark rounded-xl border border-border-light dark:border-border-dark flex items-center justify-between group cursor-pointer hover:border-primary-light active:scale-95 transition-all"
                >
                  <span className="text-[10px] font-bold dark:text-white truncate">{doc}</span>
                  <Eye size={14} className="text-text-secondary-light group-hover:text-primary-light shrink-0"/>
                </div>
              ))}
            </div>
          </div>
        </div>
        {shop.status === 'Pending' && (
          <div className="p-8 border-t dark:border-border-dark bg-gray-50/50 dark:bg-secondary-dark/30 flex gap-4">
            <button onClick={onClose} className="flex-1 py-4 bg-error text-white rounded-2xl font-black text-sm shadow-xl shadow-error/20 hover:scale-[1.02] transition-all">Reject Shop</button>
            <button onClick={onClose} className="flex-[2] py-4 bg-success text-white rounded-2xl font-black text-sm shadow-xl shadow-success/20 hover:scale-[1.02] transition-all">Approve & Live</button>
          </div>
        )}
      </div>
    </div>
  );
};

const EscalateUserModal = ({ isOpen, onClose, user, reason, setReason, notes, setNotes, onConfirm }) => {
  if (!isOpen || !user) return null;
  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background-dark/80 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose}></div>
      <div className="relative w-full max-w-lg bg-surface-light dark:bg-surface-dark rounded-[32px] shadow-2xl border border-border-light dark:border-border-dark overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-8 border-b dark:border-border-dark flex justify-between items-center bg-error text-white">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center"><AlertCircle size={24}/></div>
            <h3 className="text-xl font-black">Escalate Security Risk</h3>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-white/10 rounded-2xl transition-all"><X size={24}/></button>
        </div>
        <div className="p-8 space-y-6">
          <div className="p-4 bg-error/5 border border-error/10 rounded-2xl">
            <p className="text-sm font-bold dark:text-white">Reporting User: <span className="text-error">{user.name}</span></p>
            <p className="text-xs text-text-secondary-light font-bold mt-1">Level: {user.riskLevel} Risk</p>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-text-secondary-light">Reason for Escalation</label>
            <select value={reason} onChange={(e) => setReason(e.target.value)} className="w-full px-4 py-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-error outline-none dark:text-white font-bold appearance-none">
              <option>Suspicious Activity</option>
              <option>KYC Fraud Detected</option>
              <option>Financial Discrepancy</option>
              <option>Multiple Failed Logins</option>
              <option>Policy Violation</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-text-secondary-light">Evidence / Details</label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows="3" placeholder="Provide details to help Admin investigate..." className="w-full px-4 py-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-error outline-none dark:text-white font-bold resize-none"></textarea>
          </div>
          <button onClick={onConfirm} className="w-full py-4 bg-error text-white rounded-2xl font-black text-sm shadow-xl shadow-error/20 hover:scale-[1.02] active:scale-[0.98] transition-all">Submit Security Report</button>
        </div>
      </div>
    </div>
  );
};


const SidebarSection = ({ title, children, collapsed }) => (
  <div className="mb-6">
    {title && <h5 className={`text-[10px] font-black text-text-secondary-light dark:text-text-secondary-dark mb-3 uppercase tracking-[0.2em] ml-2 ${collapsed ? 'text-center ml-0' : ''}`}>{title}</h5>}
    <div className="space-y-1">
      {children}
    </div>
  </div>
);

const SidebarLink = ({ icon, label, active, onClick, collapsed }) => (
  <div 
    onClick={onClick}
    className={`
      flex items-center gap-3 px-4 py-3.5 rounded-2xl cursor-pointer transition-all duration-300 group relative
      ${active 
        ? 'bg-primary-light text-white shadow-lg shadow-primary-light/20 scale-[1.02]' 
        : 'text-text-secondary-light hover:bg-gray-100 dark:hover:bg-secondary-dark hover:text-primary-light dark:hover:text-primary-light'
      }
      ${collapsed ? 'justify-center px-0 w-12 mx-auto' : ''}
    `}
  >
    <div className={`transition-transform duration-300 ${active ? 'scale-110' : 'group-hover:scale-110'}`}>
      {icon}
    </div>
    {!collapsed && <span className="text-sm font-bold tracking-tight">{label}</span>}
    {active && !collapsed && (
      <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>
    )}
    {collapsed && (
      <div className="absolute left-full ml-4 px-2 py-1 bg-gray-900 text-white text-[10px] font-black rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
        {label}
      </div>
    )}
  </div>
);


const SupportTicketModal = ({ isOpen, onClose, onAdd }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background-dark/80 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose}></div>
      <div className="relative w-full max-w-lg bg-surface-light dark:bg-surface-dark rounded-[32px] shadow-2xl border border-border-light dark:border-border-dark overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-8 border-b dark:border-border-dark flex justify-between items-center bg-primary-light text-white">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center"><LifeBuoy size={24}/></div>
            <div>
              <h3 className="text-xl font-black">Raise Support Ticket</h3>
              <p className="text-xs font-bold uppercase opacity-80">Territory Support Request</p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-white/10 rounded-2xl transition-all"><X size={24}/></button>
        </div>
        <div className="p-8 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-text-secondary-light">Issue Category</label>
              <select className="w-full px-4 py-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-bold appearance-none">
                <option>Agent Verification</option>
                <option>Shop Onboarding</option>
                <option>Payout Dispute</option>
                <option>Technical Bug</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-text-secondary-light">Priority</label>
              <select className="w-full px-4 py-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-bold appearance-none">
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-text-secondary-light">Subject</label>
            <input type="text" placeholder="Brief summary of the issue..." className="w-full px-4 py-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-bold" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-text-secondary-light">Description</label>
            <textarea rows="3" placeholder="Provide full details here..." className="w-full px-4 py-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-bold resize-none"></textarea>
          </div>
          <button onClick={onAdd} className="w-full py-4 bg-primary-light text-white rounded-2xl font-black text-sm shadow-xl shadow-primary-light/20 hover:scale-[1.02] transition-all">Submit Support Ticket</button>
        </div>
      </div>
    </div>
  );
};


const ReportDetailsModal = ({ isOpen, onClose, reportTitle }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background-dark/80 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose}></div>
      <div className="relative w-full max-w-2xl bg-surface-light dark:bg-surface-dark rounded-[40px] shadow-2xl border border-white/10 overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
        <div className="p-8 border-b dark:border-border-dark flex justify-between items-center bg-gradient-to-r from-emerald-500 to-emerald-700 text-white">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center shadow-inner">
              <BarChart2 size={28} />
            </div>
            <div>
              <h3 className="text-2xl font-black tracking-tight">{reportTitle}</h3>
              <p className="text-xs font-bold uppercase tracking-widest opacity-80">Detailed Analytical View</p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-white/10 rounded-2xl transition-all">
            <X size={24} />
          </button>
        </div>

        <div className="p-8 overflow-y-auto custom-scrollbar space-y-8">
          <div className="grid grid-cols-3 gap-4">
            {[
              { l: 'Total Units', v: '1,284', s: '+12%' },
              { l: 'Completion', v: '94.2%', s: 'Optimal' },
              { l: 'Risk Index', v: '0.02', s: 'Very Low' },
            ].map((d, i) => (
              <div key={i} className="p-4 bg-gray-50 dark:bg-secondary-dark rounded-2xl border border-border-light dark:border-border-dark text-center">
                <p className="text-[10px] font-black text-text-secondary-light uppercase mb-1">{d.l}</p>
                <p className="text-xl font-black dark:text-white">{d.v}</p>
                <p className="text-[10px] font-bold text-emerald-500 mt-1">{d.s}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light border-b-2 border-primary-light/10 pb-2">Data Breakdown</h4>
            <div className="space-y-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-secondary-dark rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    <span className="text-sm font-bold dark:text-white">Region Zone - {i * 10} Alpha</span>
                  </div>
                  <span className="text-sm font-black text-primary-light">ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¹{(i * 12.5).toFixed(1)}L</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 bg-primary-light/5 rounded-3xl border border-primary-light/10 flex items-center justify-between">
            <div>
              <h4 className="font-bold dark:text-white flex items-center gap-2 mb-1">
                <ShieldCheck size={18} className="text-primary-light" /> Data Integrity
              </h4>
              <p className="text-xs text-text-secondary-light">This report is verified and synced in real-time.</p>
            </div>
            <button 
              onClick={() => exportToCSV(systemUsers, 'area_performance_report')}
              className="px-4 py-2 bg-primary-light text-white rounded-xl text-xs font-black shadow-lg"
            >
              Export CSV
            </button>
          </div>
        </div>

        <div className="p-8 border-t dark:border-border-dark bg-gray-50/50 dark:bg-secondary-dark/30">
          <button onClick={onClose} className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-black text-sm shadow-xl shadow-emerald-500/20 hover:scale-[1.02] transition-all">Close Report View</button>
        </div>
      </div>
    </div>
  );
};


const ChangePasswordModal = ({ isOpen, onClose, onSuccess }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background-dark/80 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose}></div>
      <div className="relative w-full max-w-md bg-surface-light dark:bg-surface-dark rounded-[32px] shadow-2xl border border-border-light dark:border-border-dark overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-8 border-b dark:border-border-dark flex justify-between items-center bg-primary-light text-white">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center"><Lock size={24}/></div>
            <h3 className="text-xl font-black">Security Update</h3>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-white/10 rounded-2xl transition-all"><X size={24}/></button>
        </div>
        <div className="p-8 space-y-6">
          <div className="space-y-4">
            {['Current Password', 'New Password', 'Confirm New Password'].map(label => (
              <div key={label} className="space-y-2">
                <label className="text-[10px] font-black uppercase text-text-secondary-light">{label}</label>
                <div className="relative">
                  <input type="password" placeholder="ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢" className="w-full px-4 py-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-bold" />
                  <Key className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary-light" size={18} />
                </div>
              </div>
            ))}
          </div>
          <button onClick={onSuccess} className="w-full py-4 bg-primary-light text-white rounded-2xl font-black text-sm shadow-xl shadow-primary-light/20 hover:scale-[1.02] transition-all">Update Credentials</button>
        </div>
      </div>
    </div>
  );
};

const TwoFAModal = ({ isOpen, onClose, onUpdate }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background-dark/80 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose}></div>
      <div className="relative w-full max-w-md bg-surface-light dark:bg-surface-dark rounded-[32px] shadow-2xl border border-border-light dark:border-border-dark overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-8 border-b dark:border-border-dark flex justify-between items-center bg-emerald-500 text-white">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center"><ShieldCheck size={24}/></div>
            <h3 className="text-xl font-black">Two-Step Verification</h3>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-white/10 rounded-2xl transition-all"><X size={24}/></button>
        </div>
        <div className="p-8 space-y-8">
          <div className="flex items-center justify-between p-4 bg-emerald-50 dark:bg-emerald-500/5 border border-emerald-500/20 rounded-2xl">
            <div>
              <p className="text-sm font-black dark:text-white">Authenticator App</p>
              <p className="text-[10px] text-text-secondary-light font-bold">Use Google or Microsoft Authenticator</p>
            </div>
            <div className="w-12 h-6 bg-emerald-500 rounded-full relative cursor-pointer" onClick={() => onUpdate(false)}>
              <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-xs text-text-secondary-light leading-relaxed text-center font-medium">Protect your account with an extra layer of security. We will ask for a verification code when you login.</p>
            <div className="p-4 bg-gray-50 dark:bg-secondary-dark rounded-2xl border border-dashed border-border-light dark:border-border-dark text-center">
              <span className="text-[10px] font-black text-primary-light uppercase tracking-widest cursor-pointer hover:underline">View Backup Codes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SessionsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background-dark/80 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose}></div>
      <div className="relative w-full max-xl bg-surface-light dark:bg-surface-dark rounded-[32px] shadow-2xl border border-border-light dark:border-border-dark overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-8 border-b dark:border-border-dark flex justify-between items-center bg-gray-100 dark:bg-secondary-dark">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary-light text-white rounded-2xl flex items-center justify-center shadow-lg"><Clock size={24}/></div>
            <div>
              <h3 className="text-xl font-black dark:text-white">Active Sessions</h3>
              <p className="text-xs font-bold text-text-secondary-light uppercase">Devices currently logged in</p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-gray-200 dark:hover:bg-white/10 rounded-2xl transition-all"><X size={24} className="dark:text-white"/></button>
        </div>
        <div className="p-8 space-y-4">
          {[
            { device: 'Windows PC Ãƒâ€šÃ‚Â· Chrome', location: 'Delhi, India (Current)', status: 'Online', icon: <History /> },
            { device: 'iPhone 15 Ãƒâ€šÃ‚Â· Safari', location: 'Mumbai, India', status: '2h ago', icon: <History /> },
            { device: 'macOS Ãƒâ€šÃ‚Â· Firefox', location: 'Pune, India', status: 'Yesterday', icon: <History /> },
          ].map((s, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-secondary-dark/50 rounded-2xl border border-border-light dark:border-border-dark group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white dark:bg-surface-dark rounded-xl flex items-center justify-center text-text-secondary-light group-hover:text-primary-light transition-colors">{s.icon}</div>
                <div>
                  <p className="text-sm font-black dark:text-white">{s.device}</p>
                  <p className="text-[10px] text-text-secondary-light font-bold uppercase">{s.location}</p>
                </div>
              </div>
              <span className={`text-[10px] font-black uppercase tracking-widest ${s.status === 'Online' ? 'text-success' : 'text-text-secondary-light'}`}>{s.status}</span>
            </div>
          ))}
          <button className="w-full py-4 mt-4 bg-error/10 text-error rounded-2xl font-black text-sm hover:bg-error hover:text-white transition-all">Sign out from all other devices</button>
        </div>
      </div>
    </div>
  );
};


const NotificationSettingsModal = ({ isOpen, onClose, onSave }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background-dark/80 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose}></div>
      <div className="relative w-full max-w-md bg-surface-light dark:bg-surface-dark rounded-[32px] shadow-2xl border border-border-light dark:border-border-dark overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-8 border-b dark:border-border-dark flex justify-between items-center bg-blue-500 text-white">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center"><BellRing size={24}/></div>
            <h3 className="text-xl font-black">Notification Alerts</h3>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-white/10 rounded-2xl transition-all"><X size={24}/></button>
        </div>
        <div className="p-8 space-y-6">
          {['Task Reminders', 'Agent Activity Alerts', 'Weekly Territory Digest', 'System Updates'].map(label => (
            <div key={label} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-secondary-dark rounded-2xl">
              <span className="text-sm font-bold dark:text-white">{label}</span>
              <div className="w-12 h-6 bg-blue-500 rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
          ))}
          <button onClick={onSave} className="w-full py-4 bg-blue-500 text-white rounded-2xl font-black text-sm shadow-xl shadow-blue-500/20 hover:scale-[1.02] transition-all">Save Preferences</button>
        </div>
      </div>
    </div>
  );
};

const AppearanceSettingsModal = ({ isOpen, onClose, onSave }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background-dark/80 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose}></div>
      <div className="relative w-full max-w-md bg-surface-light dark:bg-surface-dark rounded-[32px] shadow-2xl border border-border-light dark:border-border-dark overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-8 border-b dark:border-border-dark flex justify-between items-center bg-primary-light text-white">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center"><Palette size={24}/></div>
            <h3 className="text-xl font-black">System Appearance</h3>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-white/10 rounded-2xl transition-all"><X size={24}/></button>
        </div>
        <div className="p-8 space-y-6">
          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase text-text-secondary-light tracking-widest">Primary Brand Color</label>
            <div className="grid grid-cols-4 gap-3">
              {['bg-emerald-500', 'bg-blue-500', 'bg-primary-light', 'bg-purple-500'].map(c => (
                <div key={c} className={`h-12 rounded-2xl ${c} cursor-pointer hover:scale-110 transition-transform border-4 border-transparent hover:border-white/20`}></div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase text-text-secondary-light tracking-widest">Sidebar Style</label>
            <div className="grid grid-cols-2 gap-3">
              <div 
                onClick={() => setIsSidebarCollapsed(false)}
                className={`p-4 bg-gray-50 dark:bg-secondary-dark rounded-2xl border-2 transition-all cursor-pointer ${!isSidebarCollapsed ? 'border-primary-light shadow-lg' : 'border-transparent'}`}
              >
                <span className="text-xs font-black dark:text-white">Full Navigation</span>
              </div>
              <div 
                onClick={() => setIsSidebarCollapsed(true)}
                className={`p-4 bg-gray-50 dark:bg-secondary-dark rounded-2xl border-2 transition-all cursor-pointer ${isSidebarCollapsed ? 'border-primary-light shadow-lg' : 'border-transparent'}`}
              >
                <span className="text-xs font-black dark:text-white">Compact View</span>
              </div>
            </div>
          </div>
          <button onClick={onSave} className="w-full py-4 bg-primary-light text-white rounded-2xl font-black text-sm shadow-xl shadow-primary-light/20 hover:scale-[1.02] transition-all">Apply Aesthetics</button>
        </div>
      </div>
    </div>
  );
};



const AgentDetailModal = ({ isOpen, onClose, agent, type, onSave }) => {
  const [editForm, setEditForm] = React.useState({});

  React.useEffect(() => {
    if (agent) setEditForm({ ...agent });
  }, [agent]);

  if (!isOpen || !agent) return null;

  const headerColor =
    type === 'edit' ? 'bg-emerald-500' :
    type === 'history' ? 'bg-orange-500' :
    'bg-gray-800 dark:bg-gray-700';

  const title =
    type === 'edit' ? 'Edit Agent' :
    type === 'history' ? 'Activity History' :
    'Agent Profile';

  const activityLog = [
    { action: 'Login', time: '2026-05-12 09:30', status: 'Success', ip: '192.168.1.10' },
    { action: 'KYC Upload', time: '2026-05-11 14:20', status: 'Success', ip: '192.168.1.10' },
    { action: 'Password Change', time: '2026-05-10 11:05', status: 'Success', ip: '192.168.1.15' },
    { action: 'Login Attempt', time: '2026-05-09 22:14', status: 'Failed', ip: '203.0.113.42' },
    { action: 'Profile Update', time: '2026-05-08 16:40', status: 'Success', ip: '192.168.1.10' },
  ];

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-surface-light dark:bg-surface-dark rounded-3xl shadow-2xl border border-border-light dark:border-border-dark overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
        <div className={`${headerColor} p-6 flex items-center justify-between`}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center font-black text-xl text-white">
              {agent.name?.[0] ?? '?'}
            </div>
            <div>
              <h3 className="text-xl font-black text-white">{title}: {agent.name}</h3>
              <p className="text-xs text-white/70 font-bold uppercase tracking-widest">{agent.role}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-all text-white">
            <X size={20} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          {type === 'view' && (
            <div className="grid grid-cols-2 gap-6">
              {[
                { label: 'Full Name', value: agent.name },
                { label: 'Role', value: agent.role },
                { label: 'Phone', value: agent.phone || 'N/A' },
                { label: 'Email', value: agent.email || 'N/A' },
                { label: 'Territory', value: agent.territory || agent.location || 'N/A' },
                { label: 'Status', value: agent.status },
                { label: 'Last Login', value: agent.lastLogin || 'N/A' },
                { label: 'Risk Level', value: agent.riskLevel || 'N/A' },
              ].map((item, i) => (
                <div key={i} className="space-y-1">
                  <p className="text-[10px] font-black text-text-secondary-light uppercase tracking-widest">{item.label}</p>
                  <p className="font-bold dark:text-white text-sm">{item.value}</p>
                </div>
              ))}
            </div>
          )}
          {type === 'edit' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Full Name', key: 'name', inputType: 'text' },
                  { label: 'Phone', key: 'phone', inputType: 'tel' },
                  { label: 'Email', key: 'email', inputType: 'email' },
                  { label: 'Location', key: 'location', inputType: 'text' },
                ].map(({ label, key, inputType }) => (
                  <div key={key} className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">{label}</label>
                    <input
                      type={inputType}
                      value={editForm[key] || ''}
                      onChange={e => setEditForm({ ...editForm, [key]: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-medium transition-all"
                    />
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">Status</label>
                <select
                  value={editForm.status || 'Active'}
                  onChange={e => setEditForm({ ...editForm, status: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-medium appearance-none"
                >
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>Suspended</option>
                </select>
              </div>
              <button
                onClick={() => onSave(editForm)}
                className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-black text-sm shadow-xl shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Save Changes
              </button>
            </div>
          )}
          {type === 'history' && (
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-widest text-text-secondary-light border-b dark:border-border-dark pb-3">Recent Activity Log</h4>
              {activityLog.map((log, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-secondary-dark rounded-2xl border border-border-light dark:border-border-dark">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${log.status === 'Success' ? 'bg-success' : 'bg-error'}`} />
                    <div>
                      <p className="text-sm font-bold dark:text-white">{log.action}</p>
                      <p className="text-[10px] text-text-secondary-light">{log.time} - IP: {log.ip}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase ${log.status === 'Success' ? 'bg-success/10 text-success' : 'bg-error/10 text-error'}`}>
                    {log.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default SubAdminDashboard;






