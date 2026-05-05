import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { 
  Users, Store, ShoppingCart, TrendingUp, 
  ShieldCheck, AlertCircle, DollarSign, Target,
  LayoutDashboard, UserPlus, Package, Map, Settings, Bell,
  Search, Filter, MoreVertical, Edit, Trash2, CheckCircle, XCircle, X,
  Clock, Star, LogOut, ChevronRight, ChevronDown, Lock, BellRing, Palette,
  CreditCard, Percent, Truck, BarChart as BarChartIcon, LifeBuoy, Share2, Key, History,
  UserCheck, Briefcase, Megaphone, Sun, Moon, Eye, User, FileText, Shield
} from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const { addNotification } = useNotifications();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overview');
  const [showAddAgentModal, setShowAddAgentModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All Roles');
  const [selectedKYC, setSelectedKYC] = useState([]);
  const [txnDateRange, setTxnDateRange] = useState('Last 30 Days');
  const [orderSearchTerm, setOrderSearchTerm] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('All Status');
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [shopSearchPincode, setShopSearchPincode] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [shopStatusFilter, setShopStatusFilter] = useState('All Status');
  const [selectedShop, setSelectedShop] = useState(null);
  
  const [subAdmins, setSubAdmins] = useState([
    {
      id: 1,
      name: 'Priya Sharma',
      empId: 'SA-1001',
      phone: '+91 98765 43210',
      email: 'priya@adminhub.com',
      accessLevel: 'District Wise',
      assignedLocation: 'Chennai District',
      agentsCount: 15,
      status: 'Active'
    },
    {
      id: 2,
      name: 'Rahul Dev',
      empId: 'SA-1002',
      phone: '+91 87654 32109',
      email: 'rahul@adminhub.com',
      accessLevel: 'Pincode Wise',
      assignedLocation: '635601',
      agentsCount: 4,
      status: 'Active'
    },
    {
      id: 3,
      name: 'Sanjay Dutt',
      empId: 'SA-1003',
      phone: '+91 76543 21098',
      email: 'sanjay@adminhub.com',
      accessLevel: 'State Wise',
      assignedLocation: 'Maharashtra',
      agentsCount: 42,
      status: 'Suspended'
    }
  ]);
  const [subAdminAccessFilter, setSubAdminAccessFilter] = useState('All Levels');
  const [selectedSubAdmin, setSelectedSubAdmin] = useState(null);
  const [subAdminModalType, setSubAdminModalType] = useState(null); // 'view', 'edit', 'location', 'agents', 'performance'
  const [showSubAdminModal, setShowSubAdminModal] = useState(false);

  const [systemUsers, setSystemUsers] = useState([
    { id: 1, name: 'Amit Kumar', role: 'Sub Admin', phone: '+91 98765 43210', email: 'amit@adminhub.com', location: 'Delhi', status: 'Active', lastLogin: '2026-05-04 10:30', riskLevel: 'Low' },
    { id: 2, name: 'Rajesh Singh', role: 'Agent', phone: '+91 87654 32109', email: 'rajesh@agent.com', location: 'Mumbai', status: 'Suspended', lastLogin: '2026-05-03 15:45', riskLevel: 'Medium' },
    { id: 3, name: 'Sunil Verma', role: 'Shop Owner', phone: '+91 76543 21098', email: 'sunil@shop.com', location: 'Pune', status: 'Deactivated', lastLogin: '2026-04-28 09:12', riskLevel: 'High' },
    { id: 4, name: 'Priya Das', role: 'Customer', phone: '+91 65432 10987', email: 'priya@gmail.com', location: 'Kolkata', status: 'Blocked', lastLogin: '2026-05-01 18:20', riskLevel: 'Critical' },
    { id: 5, name: 'Suresh Raina', role: 'Agent', phone: '+91 54321 09876', email: 'suresh@agent.com', location: 'Chennai', status: 'Pending Approval', lastLogin: 'N/A', riskLevel: 'Low' }
  ]);

  const [systemActivityLogs, setSystemActivityLogs] = useState([
    { id: 1, user: 'Amit Kumar', action: 'Login', module: 'Auth', timestamp: '2026-05-04 10:30', status: 'Success', ip: '192.168.1.1' },
    { id: 2, user: 'Rajesh Singh', action: 'Upload KYC', module: 'Verification', timestamp: '2026-05-03 15:40', status: 'Success', ip: '192.168.1.5' },
    { id: 3, user: 'Sunil Verma', action: 'Payment Initiation', module: 'Billing', timestamp: '2026-04-28 09:10', status: 'Failed', ip: '192.168.1.10' },
    { id: 4, user: 'Sub Admin Priya', action: 'Escalated User Account', module: 'System', timestamp: '2026-05-04 11:15', status: 'Warning', ip: '192.168.1.2', notes: 'Suspicious login pattern detected for User ID: 4' }
  ]);

  const [selectedSystemUser, setSelectedSystemUser] = useState(null);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [deactivateReason, setDeactivateReason] = useState('Fake Account');
  const [deactivateNotes, setDeactivateNotes] = useState('');
  
  const shopCategories = [
    'Food / Restaurant', 'Grocery', 'Hospital', 'Medicine / Pharmacy', 
    'Fashion', 'Electronics', 'Beauty / Salon', 'Education', 'Services', 'Others'
  ];

  const [shopTieUps, setShopTieUps] = useState([
    {
      id: 1,
      shopName: 'Fresh Mart',
      ownerName: 'Amit Patel',
      phone: '+91 98765 43210',
      category: 'Grocery',
      location: 'Pune, Maharashtra',
      pincode: '411001',
      assignedAgent: 'Rajesh Kumar',
      submittedBy: 'Agent राजेश',
      status: 'Pending',
      docs: ['Shop License', 'Owner ID', 'Bank Proof']
    },
    {
      id: 2,
      shopName: 'Health First Pharmacy',
      ownerName: 'Dr. Sunita Sharma',
      phone: '+91 87654 32109',
      category: 'Medicine / Pharmacy',
      location: 'Mumbai, Maharashtra',
      pincode: '400001',
      assignedAgent: 'Vikram Singh',
      submittedBy: 'Sub Admin Priya',
      status: 'Verified by Sub Admin',
      docs: ['Drug License', 'GST', 'Store Photo']
    },
    {
      id: 3,
      shopName: 'Style Studio',
      ownerName: 'Anjali S.',
      phone: '+91 76543 21098',
      category: 'Fashion',
      location: 'Delhi NCR',
      pincode: '110001',
      assignedAgent: 'Sneha Patel',
      submittedBy: 'Agent Sneha',
      status: 'Rejected',
      docs: ['GST', 'Photo']
    },
    {
      id: 4,
      shopName: 'City Inn Hotel',
      ownerName: 'Priya X.',
      phone: '+91 65432 10987',
      category: 'Hospitality',
      location: 'Bangalore Central',
      pincode: '560001',
      assignedAgent: 'Rahul Dev',
      submittedBy: 'Sub Admin Rahul',
      status: 'Need Correction',
      docs: ['Trade License', 'Fire Safety']
    }
  ]);

  const [areas, setAreas] = useState([
    { id: 1, state: 'Maharashtra', district: 'Pune', pincode: '411001', agent: 'Rahul Dev', status: 'Occupied', shops: 24, coverage: 85, pendingRequests: 3 },
    { id: 2, state: 'Maharashtra', district: 'Mumbai', pincode: '400001', agent: 'None', status: 'Available', shops: 0, coverage: 0, pendingRequests: 0 },
    { id: 3, state: 'Delhi', district: 'New Delhi', pincode: '110001', agent: 'Amit Singh', status: 'Occupied', shops: 52, coverage: 92, pendingRequests: 8 },
    { id: 4, state: 'Karnataka', district: 'Bangalore', pincode: '560001', agent: 'None', status: 'Under Review', shops: 12, coverage: 45, pendingRequests: 12 },
    { id: 5, state: 'Tamil Nadu', district: 'Chennai', pincode: '600001', agent: 'Priya Verma', status: 'Blocked', shops: 0, coverage: 0, pendingRequests: 0 },
    { id: 6, state: 'Uttar Pradesh', district: 'Lucknow', pincode: '226001', agent: 'None', status: 'Available', shops: 0, coverage: 0, pendingRequests: 2 },
  ]);

  const [areaFilters, setAreaFilters] = useState({
    state: 'All States',
    district: 'All Districts',
    pincode: '',
    status: 'All Status',
    assignment: 'All'
  });

  const [selectedArea, setSelectedArea] = useState(null);
  const [showAreaModal, setShowAreaModal] = useState(false);

  const [kycData, setKycData] = useState([
    { 
      id: 1, 
      name: 'Arjun Reddy', 
      role: 'District Agent', 
      location: 'Hyderabad', 
      date: '2 hours ago', 
      status: 'Pending Review',
      details: {
        agentType: 'District Agent',
        territory: { state: 'Telangana', district: 'Hyderabad', division: 'South', pincode: '500001' },
        kycDocs: { aadharFront: 'aadhar_f.jpg', aadharBack: 'aadhar_b.jpg', panCard: 'pan.jpg', photo: 'photo.jpg' },
        bankDetails: { bankName: 'SBI', accNo: 'XXXXXX9901', ifsc: 'SBIN0001' },
        paymentDetails: { txnId: 'TXN990123', amount: '₹1,00,000', proof: 'receipt.png' }
      }
    },
    { 
      id: 2, 
      name: 'Modern Electronics', 
      role: 'Shop Owner', 
      location: 'Bangalore', 
      date: '5 hours ago', 
      status: 'Pending Review',
      details: {
        agentType: 'Pincode Agent',
        territory: { state: 'Karnataka', district: 'Bangalore', division: 'East', pincode: '560001' },
        kycDocs: { aadharFront: 'aadhar_f2.jpg', aadharBack: 'aadhar_b2.jpg', panCard: 'pan2.jpg', photo: 'photo2.jpg' },
        bankDetails: { bankName: 'HDFC', accNo: 'XXXXXX1234', ifsc: 'HDFC0001' },
        paymentDetails: { txnId: 'TXN880456', amount: '₹50,000', proof: 'receipt2.png' }
      }
    }
  ]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const stats = [
    { title: 'Total Revenue', value: '₹12,45,000', icon: <DollarSign />, color: 'bg-emerald-500', trend: '+12.5%' },
    { title: 'Active Users', value: '8,432', icon: <Users />, color: 'bg-blue-500', trend: '+5.2%' },
    { title: 'Partner Shops', value: '452', icon: <Store />, color: 'bg-orange-500', trend: '+18.4%' },
    { title: 'Total Orders', value: '1,205', icon: <ShoppingCart />, color: 'bg-purple-500', trend: '+3.1%' },
  ];

  const chartData = [
    { name: 'Mon', revenue: 4000, orders: 240 },
    { name: 'Tue', revenue: 3000, orders: 198 },
    { name: 'Wed', revenue: 2000, orders: 150 },
    { name: 'Thu', revenue: 2780, orders: 390 },
    { name: 'Fri', revenue: 1890, orders: 480 },
    { name: 'Sat', revenue: 2390, orders: 380 },
    { name: 'Sun', revenue: 3490, orders: 430 },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'Overview':
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
                    <p className="text-xs text-success font-semibold">{stat.trend} from last month</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Chart */}
              <div className="xl:col-span-2 card-premium space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold dark:text-white">Revenue Performance</h3>
                  <select className="bg-gray-100 dark:bg-secondary-dark border-none rounded-lg text-sm dark:text-white px-3 py-1">
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                  </select>
                </div>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.1} />
                      <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                      <YAxis stroke="#94a3b8" fontSize={12} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0F172A', border: 'none', borderRadius: '12px', color: '#fff' }}
                        itemStyle={{ color: '#10B981' }}
                      />
                      <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Pending Approvals */}
              <div className="card-premium space-y-6">
                <h3 className="text-lg font-bold dark:text-white">Pending KYC</h3>
                <div className="space-y-4">
                  {[
                    { name: 'Rajesh Kumar', type: 'District Agent', time: '2h ago' },
                    { name: 'City Furniture', type: 'Shop Owner', time: '5h ago' },
                    { name: 'Suresh Raina', type: 'Delivery Partner', time: '1d ago' },
                  ].map((item) => (
                    <div key={item.name} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-secondary-dark rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-accent-light/20 rounded-full flex items-center justify-center text-accent-light font-bold">
                          {item.name[0]}
                        </div>
                        <div>
                          <p className="text-sm font-bold dark:text-white">{item.name}</p>
                          <p className="text-xs text-text-secondary-light">{item.type}</p>
                        </div>
                      </div>
                      <button className="text-xs font-bold text-primary-light hover:underline">Verify</button>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => setActiveTab('KYC Approvals')}
                  className="w-full btn-outline py-2 text-sm"
                >
                  View All Approvals
                </button>
              </div>
            </div>
          </div>
        );
      
      case 'Agent Management':
        return (
          <div className="p-8 space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold dark:text-white">Agent Directory</h3>
              <button 
                onClick={() => setShowAddAgentModal(true)}
                className="btn-primary px-4 py-2 text-sm flex items-center gap-2"
              >
                <UserPlus size={18} /> Add New Agent
              </button>
            </div>
            
            <div className="card-premium">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary-light" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search agents by name or territory..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-secondary-dark border border-border-light dark:border-border-dark rounded-xl focus:ring-2 focus:ring-primary-light outline-none transition-all"
                  />
                </div>
                <div className="flex gap-2">
                  <select 
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="btn-outline px-4 py-2.5 flex items-center gap-2 bg-transparent text-sm font-bold appearance-none cursor-pointer outline-none"
                  >
                    <option>All Roles</option>
                    <option>Pincode Agent</option>
                    <option>Divisional Agent</option>
                    <option>District Agent</option>
                    <option>State Agent</option>
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-border-light dark:border-border-dark">
                      <th className="pb-4 font-bold dark:text-white">Agent Name</th>
                      <th className="pb-4 font-bold dark:text-white">Role</th>
                      <th className="pb-4 font-bold dark:text-white">Territory</th>
                      <th className="pb-4 font-bold dark:text-white">Status</th>
                      <th className="pb-4 text-right font-bold dark:text-white">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-light dark:divide-border-dark">
                    {[
                      { name: 'Amit Singh', role: 'State Agent', territory: 'Maharashtra', status: 'Active' },
                      { name: 'Priya Verma', role: 'District Agent', territory: 'Pune', status: 'Active' },
                      { name: 'Rahul Dev', role: 'Pincode Agent', territory: '411001', status: 'Inactive' },
                      { name: 'Sanjay Dutt', role: 'Divisional Agent', territory: 'Electronics', status: 'Active' },
                    ]
                    .filter(agent => 
                      (roleFilter === 'All Roles' || agent.role === roleFilter) &&
                      (agent.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                       agent.territory.toLowerCase().includes(searchTerm.toLowerCase()))
                    )
                    .map((agent) => (
                      <tr key={agent.name} className="hover:bg-gray-50 dark:hover:bg-secondary-dark/50 transition-colors group">
                        <td className="py-4 flex items-center gap-3">
                          <div className="w-9 h-9 bg-primary-light/10 text-primary-light rounded-xl flex items-center justify-center font-bold text-xs group-hover:scale-110 transition-transform">
                            {agent.name[0]}
                          </div>
                          <span className="dark:text-white font-bold text-sm">{agent.name}</span>
                        </td>
                        <td className="py-4">
                          <span className="px-3 py-1 bg-gray-100 dark:bg-secondary-dark rounded-lg text-[11px] font-bold dark:text-white uppercase tracking-wider">
                            {agent.role}
                          </span>
                        </td>
                        <td className="py-4 text-text-secondary-light text-sm font-medium">{agent.territory}</td>
                        <td className="py-4">
                          <span className={`px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                            agent.status === 'Active' ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
                          }`}>{agent.status}</span>
                        </td>
                        <td className="py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button className="p-2 hover:bg-primary-light/10 text-text-secondary-light hover:text-primary-light rounded-lg transition-all"><Edit size={16} /></button>
                            <button className="p-2 hover:bg-error/10 text-text-secondary-light hover:text-error rounded-lg transition-all"><Trash2 size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );


      case 'KYC Approvals':
        const kycData = [
          { id: 1, name: 'Arjun Reddy', role: 'District Agent', location: 'Hyderabad', date: '2 hours ago', docs: ['Aadhar', 'PAN', 'Address Proof'] },
          { id: 2, name: 'Modern Electronics', role: 'Shop Owner', location: 'Bangalore', date: '5 hours ago', docs: ['GST', 'Trade License'] },
          { id: 3, name: 'Vikram Batra', role: 'State Agent', location: 'Delhi', date: 'Yesterday', docs: ['Identity', 'Business Cert'] },
          { id: 4, name: 'Zoya Khan', role: 'Pincode Agent', location: 'Mumbai', date: '2 days ago', docs: ['Aadhar', 'PAN'] },
        ];

        const toggleKYCSelection = (id) => {
          setSelectedKYC(prev => 
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
          );
        };

        const handleBulkApprove = () => {
          if (selectedKYC.length === 0) return;
          alert(`Bulk approving ${selectedKYC.length} KYC requests...`);
          setSelectedKYC([]);
        };

        return (
          <div className="p-8 space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div>
                <h3 className="text-2xl font-black dark:text-white tracking-tight">KYC Verification Queue</h3>
                <p className="text-sm text-text-secondary-light mt-1">Review and approve agent identities.</p>
              </div>
              <div className="flex gap-3">
                <button 
                  className={`btn-outline px-6 py-2.5 text-sm font-bold transition-all ${selectedKYC.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary-light/5 hover:border-primary-light text-primary-light'}`}
                  disabled={selectedKYC.length === 0}
                  onClick={() => alert('Downloading all documents for selected items...')}
                >
                  Download Docs {selectedKYC.length > 0 && `(${selectedKYC.length})`}
                </button>
                <button 
                  className={`btn-primary px-6 py-2.5 text-sm font-bold shadow-lg transition-all ${selectedKYC.length === 0 ? 'opacity-50 cursor-not-allowed scale-100' : 'shadow-primary-light/20 hover:scale-[1.02]'}`}
                  disabled={selectedKYC.length === 0}
                  onClick={handleBulkApprove}
                >
                  Bulk Approve {selectedKYC.length > 0 && `(${selectedKYC.length})`}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {kycData.map((kyc) => (
                <div 
                  key={kyc.id} 
                  className={`card-premium flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all duration-300 border-2 ${
                    selectedKYC.includes(kyc.id) ? 'border-primary-light bg-primary-light/[0.02]' : 'border-transparent hover:border-primary-light/20'
                  }`}
                >
                  <div className="flex items-center gap-5">
                    <div 
                      onClick={() => toggleKYCSelection(kyc.id)}
                      className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center cursor-pointer transition-all ${
                        selectedKYC.includes(kyc.id) ? 'bg-primary-light border-primary-light' : 'border-border-light dark:border-border-dark'
                      }`}
                    >
                      {selectedKYC.includes(kyc.id) && <CheckCircle size={14} className="text-white" />}
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-accent-light/10 text-accent-light rounded-2xl flex items-center justify-center font-black text-xl shadow-inner">
                        {kyc.name[0]}
                      </div>
                      <div>
                        <h4 className="font-bold dark:text-white text-lg tracking-tight">{kyc.name}</h4>
                        <p className="text-sm font-medium text-text-secondary-light">{kyc.role} • {kyc.location}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="px-2 py-0.5 bg-warning/10 text-warning text-[10px] font-black rounded uppercase">{kyc.status}</span>
                          <span className="text-[10px] text-text-secondary-light font-bold">UTR: {kyc.details.paymentDetails.txnId}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <span className="text-xs text-text-secondary-light font-bold flex items-center gap-1.5 bg-gray-50 dark:bg-secondary-dark/50 px-3 py-1 rounded-full"><Clock size={12} /> {kyc.date}</span>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setSelectedApplication(kyc)}
                        className="px-5 py-2.5 bg-primary-light/10 text-primary-light rounded-xl font-black text-xs hover:bg-primary-light hover:text-white transition-all flex items-center gap-2"
                      >
                        <Eye size={14} /> Review Details
                      </button>
                      <button 
                        onClick={() => alert('KYC Approved')}
                        className="px-5 py-2.5 bg-success text-white rounded-xl font-black text-xs shadow-lg shadow-success/20 hover:scale-[1.05] transition-all"
                      >
                        Quick Approve
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Detailed Review Modal */}
            {selectedApplication && (
              <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-background-dark/80 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setSelectedApplication(null)}></div>
                <div className="relative w-full max-w-4xl bg-surface-light dark:bg-surface-dark rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
                  <div className="p-6 border-b dark:border-border-dark flex justify-between items-center bg-gray-50/50 dark:bg-secondary-dark/30">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary-light text-white rounded-xl flex items-center justify-center font-bold text-xl">{selectedApplication.name[0]}</div>
                      <div>
                        <h3 className="text-xl font-black dark:text-white">{selectedApplication.name}</h3>
                        <p className="text-sm text-text-secondary-light font-bold">{selectedApplication.role} Application</p>
                      </div>
                    </div>
                    <button onClick={() => setSelectedApplication(null)} className="p-2 hover:bg-gray-100 dark:hover:bg-secondary-dark rounded-full transition-all"><X size={24} className="dark:text-white" /></button>
                  </div>

                  <div className="p-8 overflow-y-auto space-y-8 flex-1 custom-scrollbar">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Territory & Bank */}
                      <div className="space-y-6">
                        <div className="space-y-4">
                          <h4 className="text-xs font-black uppercase tracking-widest text-primary-light border-b dark:border-border-dark pb-2 flex items-center gap-2"><MapPin size={14} /> Territory Details</h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div><p className="text-[10px] font-bold text-text-secondary-light uppercase">State</p><p className="text-sm font-bold dark:text-white">{selectedApplication.details.territory.state}</p></div>
                            <div><p className="text-[10px] font-bold text-text-secondary-light uppercase">District</p><p className="text-sm font-bold dark:text-white">{selectedApplication.details.territory.district}</p></div>
                            <div><p className="text-[10px] font-bold text-text-secondary-light uppercase">Division</p><p className="text-sm font-bold dark:text-white">{selectedApplication.details.territory.division}</p></div>
                            <div><p className="text-[10px] font-bold text-text-secondary-light uppercase">Pincode</p><p className="text-sm font-bold dark:text-white">{selectedApplication.details.territory.pincode}</p></div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h4 className="text-xs font-black uppercase tracking-widest text-emerald-500 border-b dark:border-border-dark pb-2 flex items-center gap-2"><CreditCard size={14} /> Bank Information</h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div><p className="text-[10px] font-bold text-text-secondary-light uppercase">Bank</p><p className="text-sm font-bold dark:text-white">{selectedApplication.details.bankDetails.bankName}</p></div>
                            <div><p className="text-[10px] font-bold text-text-secondary-light uppercase">IFSC</p><p className="text-sm font-bold dark:text-white">{selectedApplication.details.bankDetails.ifsc}</p></div>
                            <div className="col-span-2"><p className="text-[10px] font-bold text-text-secondary-light uppercase">Account No</p><p className="text-sm font-mono font-bold dark:text-white">{selectedApplication.details.bankDetails.accNo}</p></div>
                          </div>
                        </div>
                      </div>

                      {/* Payment Proof */}
                      <div className="space-y-4">
                        <h4 className="text-xs font-black uppercase tracking-widest text-purple-500 border-b dark:border-border-dark pb-2 flex items-center gap-2"><DollarSign size={14} /> Security Deposit Proof</h4>
                        <div className="bg-gray-50 dark:bg-secondary-dark/50 rounded-2xl p-4 border border-border-light dark:border-border-dark space-y-4">
                          <div className="flex justify-between items-center">
                            <div><p className="text-[10px] font-bold text-text-secondary-light uppercase">Transaction ID</p><p className="text-sm font-mono font-bold dark:text-white">{selectedApplication.details.paymentDetails.txnId}</p></div>
                            <div className="text-right"><p className="text-[10px] font-bold text-text-secondary-light uppercase">Amount</p><p className="text-lg font-black text-emerald-500">{selectedApplication.details.paymentDetails.amount}</p></div>
                          </div>
                          <div className="aspect-video bg-white dark:bg-background-dark rounded-xl border border-border-light dark:border-border-dark flex items-center justify-center group cursor-pointer relative overflow-hidden">
                            <span className="text-[10px] font-black text-text-secondary-light group-hover:opacity-0 transition-opacity">PAYMENT_RECEIPT_PREVIEW</span>
                            <div className="absolute inset-0 bg-primary-light/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <Eye size={24} className="text-primary-light" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* KYC Documents */}
                    <div className="space-y-4">
                      <h4 className="text-xs font-black uppercase tracking-widest text-orange-500 border-b dark:border-border-dark pb-2 flex items-center gap-2"><Shield size={14} /> Uploaded Documents</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {Object.entries(selectedApplication.details.kycDocs).map(([key, val]) => (
                          <div key={key} className="space-y-2">
                            <p className="text-[10px] font-bold text-text-secondary-light uppercase truncate">{key.replace(/([A-Z])/g, ' $1')}</p>
                            <div className="h-24 bg-gray-50 dark:bg-secondary-dark rounded-xl border border-border-light dark:border-border-dark flex items-center justify-center hover:border-primary-light transition-all cursor-pointer group">
                              <FileText size={20} className="text-text-secondary-light group-hover:text-primary-light" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-gray-50/50 dark:bg-secondary-dark/30 border-t dark:border-border-dark flex gap-4">
                    <button onClick={() => setSelectedApplication(null)} className="flex-1 py-4 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-2xl font-black text-sm dark:text-white hover:bg-gray-100 transition-all">Close</button>
                    <button onClick={() => alert('Requesting correction...')} className="flex-1 py-4 bg-warning/10 text-warning border border-warning/20 rounded-2xl font-black text-sm hover:bg-warning/20 transition-all">Request Correction</button>
                    <button onClick={() => alert('Application Rejected')} className="flex-1 py-4 bg-error/10 text-error border border-error/20 rounded-2xl font-black text-sm hover:bg-error/20 transition-all">Reject</button>
                    <button onClick={() => alert('Application Approved! Agent account activated.')} className="flex-[2] py-4 bg-success text-white rounded-2xl font-black text-sm shadow-xl shadow-success/20 hover:scale-[1.02] active:scale-[0.98] transition-all">Approve & Activate Account</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 'Orders':
        return (
          <div className="p-8 space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div>
                <h3 className="text-2xl font-black dark:text-white tracking-tight">Global Order Tracking</h3>
                <p className="text-sm text-text-secondary-light mt-1">Monitor real-time sales across all shops and agents.</p>
              </div>
              <div className="flex gap-3">
                <div className="relative group">
                  <select 
                    value={orderStatusFilter}
                    onChange={(e) => setOrderStatusFilter(e.target.value)}
                    className="btn-outline pl-10 pr-4 py-2.5 text-sm font-bold appearance-none cursor-pointer outline-none bg-transparent hover:border-primary-light transition-all"
                  >
                    <option>All Status</option>
                    <option>Delivered</option>
                    <option>Processing</option>
                    <option>Pending</option>
                    <option>Cancelled</option>
                  </select>
                  <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary-light group-hover:text-primary-light transition-colors" />
                </div>
                <button 
                  onClick={() => alert('Generating comprehensive order report... Your download will begin shortly.')}
                  className="btn-primary px-6 py-2.5 text-sm font-bold shadow-lg shadow-primary-light/20 hover:scale-[1.02] transition-all"
                >
                  Export Report
                </button>
              </div>
            </div>

            <div className="card-premium">
              <div className="mb-6 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary-light" size={18} />
                <input 
                  type="text" 
                  placeholder="Search by Order ID, Customer, or Shop name..." 
                  value={orderSearchTerm}
                  onChange={(e) => setOrderSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-secondary-dark border border-border-light dark:border-border-dark rounded-xl focus:ring-2 focus:ring-primary-light outline-none transition-all"
                />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-border-light dark:border-border-dark">
                      <th className="pb-4 font-bold dark:text-white">Order ID</th>
                      <th className="pb-4 font-bold dark:text-white">Customer</th>
                      <th className="pb-4 font-bold dark:text-white">Shop</th>
                      <th className="pb-4 font-bold dark:text-white">Amount</th>
                      <th className="pb-4 font-bold dark:text-white">Status</th>
                      <th className="pb-4 text-right font-bold dark:text-white">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-light dark:divide-border-dark">
                    {[
                      { id: '#ORD-9901', customer: 'Rohan Sharma', shop: 'Fresh Grocery Mart', amount: '₹1,250', status: 'Delivered' },
                      { id: '#ORD-9902', customer: 'Sita Ram', shop: 'Electro World', amount: '₹45,000', status: 'Processing' },
                      { id: '#ORD-9903', customer: 'George P.', shop: 'Style Fashion', amount: '₹2,800', status: 'Pending' },
                      { id: '#ORD-9904', customer: 'Anjali X.', shop: 'Bake My Day', amount: '₹450', status: 'Cancelled' },
                      { id: '#ORD-9905', customer: 'Kevin L.', shop: 'Fresh Grocery Mart', amount: '₹920', status: 'Delivered' },
                    ]
                    .filter(order => 
                      (orderStatusFilter === 'All Status' || order.status === orderStatusFilter) &&
                      (order.id.toLowerCase().includes(orderSearchTerm.toLowerCase()) || 
                       order.customer.toLowerCase().includes(orderSearchTerm.toLowerCase()) ||
                       order.shop.toLowerCase().includes(orderSearchTerm.toLowerCase()))
                    )
                    .map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-secondary-dark/50 transition-colors group">
                        <td className="py-4 font-black text-primary-light text-sm tracking-tighter">{order.id}</td>
                        <td className="py-4 dark:text-white text-sm font-bold">{order.customer}</td>
                        <td className="py-4 text-text-secondary-light text-sm font-medium">{order.shop}</td>
                        <td className="py-4 font-black dark:text-white text-sm">{order.amount}</td>
                        <td className="py-4">
                          <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter ${
                            order.status === 'Delivered' ? 'bg-success/10 text-success' : 
                            order.status === 'Processing' ? 'bg-blue-500/10 text-blue-500' : 
                            order.status === 'Pending' ? 'bg-warning/10 text-warning' : 'bg-error/10 text-error'
                          }`}>{order.status}</span>
                        </td>
                        <td className="py-4 text-right">
                          <button className="px-3 py-1.5 bg-primary-light/10 text-primary-light rounded-lg text-xs font-black hover:bg-primary-light hover:text-white transition-all">Track</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'Target Management':
        return (
          <div className="p-8 space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold dark:text-white">Incentive & Sales Targets</h3>
              <button className="btn-primary px-4 py-2 text-sm flex items-center gap-2"><Target size={18} /> Set New Target</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Agent Performance Targets */}
              <div className="card-premium space-y-6">
                <h4 className="font-bold dark:text-white">Active Agent Goals</h4>
                <div className="space-y-6">
                  {[
                    { name: 'State Agents', progress: 75, target: '₹50L', current: '₹37.5L' },
                    { name: 'District Agents', progress: 42, target: '₹20L', current: '₹8.4L' },
                    { name: 'Category Agents', progress: 88, target: '₹10L', current: '₹8.8L' },
                  ].map((goal) => (
                    <div key={goal.name} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium dark:text-white">{goal.name}</span>
                        <span className="text-text-secondary-light">{goal.current} / {goal.target}</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 dark:bg-secondary-dark rounded-full overflow-hidden">
                        <div className="h-full bg-primary-light transition-all duration-1000" style={{ width: `${goal.progress}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reward Distribution */}
              <div className="card-premium space-y-6">
                <h4 className="font-bold dark:text-white">Reward Distribution</h4>
                <div className="flex items-center justify-center h-48">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-primary-light">₹2.4L</p>
                    <p className="text-sm text-text-secondary-light mt-1">Total Incentives Distributed</p>
                    <button className="mt-4 text-xs font-bold text-accent-light hover:underline">View Breakdown</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'Area Management':
        return (
          <div className="p-8 space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-black dark:text-white tracking-tight leading-none uppercase">Territory & Area Management</h3>
                <p className="text-sm text-text-secondary-light mt-1">Manage pincode distribution and agent coverage.</p>
              </div>
              <button className="btn-primary px-6 py-3 rounded-2xl text-sm flex items-center gap-2 shadow-xl shadow-primary-light/20">
                <MapPin size={18} /> Map New Territory
              </button>
            </div>

            {/* Top Cards & Alerts */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
              <div className="xl:col-span-1 card-premium bg-gradient-to-br from-primary-light to-primary-dark text-white border-none">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Unassigned Pincodes</p>
                <div className="flex items-end justify-between mt-2">
                  <h3 className="text-4xl font-black">{areas.filter(a => a.agent === 'None').length}</h3>
                  <div className="p-2 bg-white/20 rounded-xl">
                    <Map size={24} />
                  </div>
                </div>
                <p className="text-xs mt-4 font-bold opacity-90 flex items-center gap-1">
                  <AlertCircle size={12} /> High priority for coverage
                </p>
              </div>

              <div className="xl:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-warning/10 border border-warning/20 rounded-2xl flex items-center gap-4 animate-pulse">
                  <div className="w-12 h-12 bg-warning/20 text-warning rounded-xl flex items-center justify-center">
                    <AlertCircle size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-warning text-sm">Vacant Area Alert</h4>
                    <p className="text-xs text-warning/80">3 Pincodes in Mumbai District have no active agents assigned.</p>
                  </div>
                </div>
                <div className="p-4 bg-error/10 border border-error/20 rounded-2xl flex items-center gap-4">
                  <div className="w-12 h-12 bg-error/20 text-error rounded-xl flex items-center justify-center">
                    <TrendingUp size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-error text-sm">Overloaded Agent Alert</h4>
                    <p className="text-xs text-error/80">Agent 'Amit Singh' in Delhi is managing 52 shops (Threshold: 40).</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="card-premium">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">State</label>
                  <select 
                    value={areaFilters.state}
                    onChange={(e) => setAreaFilters({...areaFilters, state: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-secondary-dark border border-border-light dark:border-border-dark text-xs font-bold dark:text-white outline-none focus:ring-2 focus:ring-primary-light"
                  >
                    <option>All States</option>
                    <option>Maharashtra</option>
                    <option>Delhi</option>
                    <option>Karnataka</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">District</label>
                  <select 
                    value={areaFilters.district}
                    onChange={(e) => setAreaFilters({...areaFilters, district: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-secondary-dark border border-border-light dark:border-border-dark text-xs font-bold dark:text-white outline-none focus:ring-2 focus:ring-primary-light"
                  >
                    <option>All Districts</option>
                    <option>Pune</option>
                    <option>Mumbai</option>
                    <option>New Delhi</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">Pincode</label>
                  <input 
                    type="text" 
                    placeholder="Search Pincode..." 
                    value={areaFilters.pincode}
                    onChange={(e) => setAreaFilters({...areaFilters, pincode: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-secondary-dark border border-border-light dark:border-border-dark text-xs font-bold dark:text-white outline-none focus:ring-2 focus:ring-primary-light"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">Status</label>
                  <select 
                    value={areaFilters.status}
                    onChange={(e) => setAreaFilters({...areaFilters, status: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-secondary-dark border border-border-light dark:border-border-dark text-xs font-bold dark:text-white outline-none focus:ring-2 focus:ring-primary-light"
                  >
                    <option>All Status</option>
                    <option>Occupied</option>
                    <option>Available</option>
                    <option>Under Review</option>
                    <option>Blocked</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">Assignment</label>
                  <select 
                    value={areaFilters.assignment}
                    onChange={(e) => setAreaFilters({...areaFilters, assignment: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-secondary-dark border border-border-light dark:border-border-dark text-xs font-bold dark:text-white outline-none focus:ring-2 focus:ring-primary-light"
                  >
                    <option>All</option>
                    <option>Agent Assigned</option>
                    <option>Unassigned</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Territory Table */}
            <div className="card-premium overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-border-light dark:border-border-dark">
                      <th className="pb-4 font-black text-[10px] uppercase tracking-widest text-text-secondary-light pl-4">State</th>
                      <th className="pb-4 font-black text-[10px] uppercase tracking-widest text-text-secondary-light">District</th>
                      <th className="pb-4 font-black text-[10px] uppercase tracking-widest text-text-secondary-light">Pincode</th>
                      <th className="pb-4 font-black text-[10px] uppercase tracking-widest text-text-secondary-light">Agent Assigned</th>
                      <th className="pb-4 font-black text-[10px] uppercase tracking-widest text-text-secondary-light">Status</th>
                      <th className="pb-4 font-black text-[10px] uppercase tracking-widest text-text-secondary-light">Shops</th>
                      <th className="pb-4 text-right font-black text-[10px] uppercase tracking-widest text-text-secondary-light pr-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-light dark:divide-border-dark">
                    {areas
                      .filter(a => {
                        const stateMatch = areaFilters.state === 'All States' || a.state === areaFilters.state;
                        const districtMatch = areaFilters.district === 'All Districts' || a.district === areaFilters.district;
                        const pincodeMatch = a.pincode.includes(areaFilters.pincode);
                        const statusMatch = areaFilters.status === 'All Status' || a.status === areaFilters.status;
                        const assignmentMatch = areaFilters.assignment === 'All' || 
                          (areaFilters.assignment === 'Agent Assigned' ? a.agent !== 'None' : a.agent === 'None');
                        return stateMatch && districtMatch && pincodeMatch && statusMatch && assignmentMatch;
                      })
                      .map((area) => (
                        <tr key={area.id} className="hover:bg-gray-50 dark:hover:bg-secondary-dark/50 transition-colors group">
                          <td className="py-4 pl-4 font-bold dark:text-white text-sm">{area.state}</td>
                          <td className="py-4 text-text-secondary-light text-sm font-medium">{area.district}</td>
                          <td className="py-4 font-mono font-bold dark:text-white text-sm">{area.pincode}</td>
                          <td className="py-4">
                            {area.agent === 'None' ? (
                              <span className="text-error font-bold text-xs italic">Unassigned</span>
                            ) : (
                              <div className="flex items-center gap-2">
                                <div className="w-7 h-7 bg-primary-light/10 text-primary-light rounded-lg flex items-center justify-center font-black text-[10px]">
                                  {area.agent[0]}
                                </div>
                                <span className="dark:text-white font-bold text-sm">{area.agent}</span>
                              </div>
                            )}
                          </td>
                          <td className="py-4">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                              area.status === 'Occupied' ? 'bg-success/10 text-success border-success/20' : 
                              area.status === 'Available' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' : 
                              area.status === 'Under Review' ? 'bg-warning/10 text-warning border-warning/20' : 
                              'bg-error/10 text-error border-error/20'
                            }`}>{area.status}</span>
                          </td>
                          <td className="py-4">
                            <div className="flex items-center gap-2">
                              <span className="font-bold dark:text-white">{area.shops}</span>
                              <Store size={14} className="text-text-secondary-light" />
                            </div>
                          </td>
                          <td className="py-4 text-right pr-4">
                            <div className="flex justify-end gap-2">
                              <button 
                                onClick={() => {
                                  setSelectedArea(area);
                                  setShowAreaModal(true);
                                }}
                                className="p-2 hover:bg-primary-light/10 text-text-secondary-light hover:text-primary-light rounded-xl transition-all" 
                                title="View Details"
                              >
                                <Eye size={16} />
                              </button>
                              <button className="p-2 hover:bg-blue-500/10 text-text-secondary-light hover:text-blue-500 rounded-xl transition-all" title="Assign Agent"><UserPlus size={16} /></button>
                              <button className="p-2 hover:bg-orange-500/10 text-text-secondary-light hover:text-orange-500 rounded-xl transition-all" title="Change Agent"><History size={16} /></button>
                              <button className="p-2 hover:bg-error/10 text-text-secondary-light hover:text-error rounded-xl transition-all" title="Remove Agent"><Trash2 size={16} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'Revenue Analytics':
        return (
          <div className="p-8 space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold dark:text-white">Financial Insights</h3>
              <div className="flex gap-2">
                <button className="btn-outline px-4 py-2 text-sm">Monthly Report</button>
                <button className="btn-primary px-4 py-2 text-sm">Annual Forecast</button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Platform Fees', value: '₹4.2L', trend: '+15%', color: 'text-blue-500' },
                { label: 'Membership Revenue', value: '₹18.5L', trend: '+22%', color: 'text-emerald-500' },
                { label: 'Agent Commission', value: '₹2.8L', trend: '-2%', color: 'text-orange-500' },
              ].map((stat) => (
                <div key={stat.label} className="card-premium">
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">{stat.label}</p>
                  <h3 className={`text-3xl font-bold mt-2 ${stat.color}`}>{stat.value}</h3>
                  <p className="text-xs font-semibold mt-1 text-success">{stat.trend} vs last month</p>
                </div>
              ))}
            </div>

            <div className="card-premium h-[300px]">
              <h4 className="font-bold dark:text-white mb-6">Revenue Growth Trend</h4>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={12} />
                  <YAxis axisLine={false} tickLine={false} fontSize={12} />
                  <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ borderRadius: '12px', border: 'none' }} />
                  <Bar dataKey="revenue" fill="#10B981" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        );

      case 'Settings':
        return (
          <div className="p-8 space-y-8 animate-in fade-in duration-500 max-w-4xl">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold dark:text-white">Admin Settings</h3>
              <p className="text-text-secondary-light">Manage your profile, security, and system preferences.</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {/* Profile Settings */}
              <div className="card-premium space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-xl shadow-primary-light/20">A</div>
                  <div>
                    <h4 className="font-bold dark:text-white text-lg">Super Admin Profile</h4>
                    <p className="text-sm text-text-secondary-light">admin@premium.com</p>
                  </div>
                  <button className="ml-auto btn-outline px-4 py-2 text-xs">Edit Profile</button>
                </div>
              </div>

              {/* Setting Groups */}
              {[
                { title: 'Security', icon: <Lock />, desc: 'Password, 2FA, and session management', items: ['Change Password', 'Two-Factor Authentication', 'Active Sessions'] },
                { title: 'Notifications', icon: <BellRing />, desc: 'Configure email and system alerts', items: ['KYC Alerts', 'New Shop Registrations', 'Revenue Milestones'] },
                { title: 'System Appearance', icon: <Palette />, desc: 'Customize dashboard look and feel', items: ['Dark Mode Toggle', 'Primary Brand Color', 'Sidebar Layout'] },
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

      case 'Payments / Transactions':
        return (
          <div className="p-8 space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div>
                <h3 className="text-2xl font-black dark:text-white tracking-tight">Transaction Ledger</h3>
                <p className="text-sm text-text-secondary-light mt-1">Global payment history and financial logs.</p>
              </div>
              <div className="flex gap-3">
                <div className="relative group">
                  <select 
                    value={txnDateRange}
                    onChange={(e) => setTxnDateRange(e.target.value)}
                    className="btn-outline pl-10 pr-4 py-2.5 text-sm font-bold appearance-none cursor-pointer outline-none bg-transparent hover:border-primary-light transition-all"
                  >
                    <option>Today</option>
                    <option>Yesterday</option>
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                    <option>This Quarter</option>
                    <option>Custom Range</option>
                  </select>
                  <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary-light group-hover:text-primary-light transition-colors" />
                </div>
                <button 
                  onClick={() => alert('Preparing financial ledger for export... CSV/PDF formats will be ready in a moment.')}
                  className="btn-primary px-6 py-2.5 text-sm font-bold flex items-center gap-2 shadow-lg shadow-primary-light/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <CreditCard size={18} /> Export Ledger
                </button>
              </div>
            </div>

            {/* Financial Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card-premium border-l-4 border-l-blue-500">
                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Processing Volume (MTD)</p>
                <h3 className="text-3xl font-bold dark:text-white mt-2">₹48.2L</h3>
                <p className="text-xs font-semibold text-success mt-1">+12.4% vs last month</p>
              </div>
              <div className="card-premium border-l-4 border-l-emerald-500">
                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Successful Payments</p>
                <h3 className="text-3xl font-bold dark:text-white mt-2">14,230</h3>
                <p className="text-xs font-semibold text-text-secondary-light mt-1">98.5% Success Rate</p>
              </div>
              <div className="card-premium border-l-4 border-l-orange-500">
                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Pending / Failed</p>
                <h3 className="text-3xl font-bold dark:text-white mt-2">45</h3>
                <p className="text-xs font-semibold text-warning mt-1">Requires reconciliation</p>
              </div>
            </div>

            {/* Transactions Table */}
            <div className="card-premium">
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
                <div className="flex gap-2">
                  {['All', 'Successful', 'Pending', 'Refunded'].map(filter => (
                    <button key={filter} className="px-4 py-1.5 rounded-full text-xs font-bold bg-gray-100 dark:bg-secondary-dark text-text-secondary-light hover:text-primary-light hover:bg-primary-light/10 transition-colors">
                      {filter}
                    </button>
                  ))}
                </div>
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary-light" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search Txn ID, User or Amount..." 
                    className="w-full pl-9 pr-4 py-1.5 bg-gray-50 dark:bg-secondary-dark border border-border-light dark:border-border-dark rounded-lg focus:ring-2 focus:ring-primary-light outline-none text-sm"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-border-light dark:border-border-dark">
                      <th className="pb-3 font-bold dark:text-white text-sm">Txn ID & Date</th>
                      <th className="pb-3 font-bold dark:text-white text-sm">Participant</th>
                      <th className="pb-3 font-bold dark:text-white text-sm">Method</th>
                      <th className="pb-3 font-bold dark:text-white text-sm">Amount</th>
                      <th className="pb-3 font-bold dark:text-white text-sm">Status</th>
                      <th className="pb-3 font-bold dark:text-white text-sm text-right">Receipt</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-light dark:divide-border-dark">
                    {[
                      { id: 'TXN-990812', date: 'Today, 10:45 AM', name: 'Fresh Grocery Mart', type: 'Shop Settlement', method: 'Bank Transfer', amount: '+ ₹12,450.00', status: 'Completed' },
                      { id: 'TXN-990813', date: 'Today, 09:15 AM', name: 'Arjun Reddy', type: 'Membership Upgrade', method: 'UPI', amount: '+ ₹4,999.00', status: 'Completed' },
                      { id: 'TXN-990814', date: 'Yesterday, 04:30 PM', name: 'State Agent Commission', type: 'Payout', method: 'NEFT', amount: '- ₹45,000.00', status: 'Processing' },
                      { id: 'TXN-990815', date: 'Yesterday, 02:10 PM', name: 'Modern Electronics', type: 'Platform Fee', method: 'Credit Card', amount: '+ ₹1,250.00', status: 'Failed' },
                      { id: 'TXN-990816', date: 'Oct 24, 11:20 AM', name: 'Customer Refund', type: 'Order Cancellation', method: 'Original Source', amount: '- ₹850.00', status: 'Refunded' },
                    ].map((txn) => (
                      <tr key={txn.id} className="hover:bg-gray-50 dark:hover:bg-secondary-dark/50 transition-colors">
                        <td className="py-3">
                          <p className="dark:text-white font-bold text-sm tracking-tight">{txn.id}</p>
                          <p className="text-xs text-text-secondary-light flex items-center gap-1"><Clock size={10} /> {txn.date}</p>
                        </td>
                        <td className="py-3">
                          <p className="dark:text-white font-medium text-sm">{txn.name}</p>
                          <p className="text-[10px] text-text-secondary-light font-bold uppercase tracking-wider">{txn.type}</p>
                        </td>
                        <td className="py-3 text-text-secondary-light text-sm">{txn.method}</td>
                        <td className={`py-3 font-bold text-sm ${txn.amount.startsWith('+') ? 'text-success' : 'dark:text-white'}`}>
                          {txn.amount}
                        </td>
                        <td className="py-3">
                          <span className={`px-2 py-1 rounded-full text-[10px] font-bold flex w-max items-center gap-1 ${
                            txn.status === 'Completed' ? 'bg-success/10 text-success' : 
                            txn.status === 'Processing' ? 'bg-blue-500/10 text-blue-500' :
                            txn.status === 'Refunded' ? 'bg-gray-500/10 text-gray-500 dark:text-gray-400' : 'bg-error/10 text-error'
                          }`}>
                            {txn.status === 'Completed' && <CheckCircle size={10} />}
                            {txn.status === 'Failed' && <XCircle size={10} />}
                            {txn.status}
                          </span>
                        </td>
                        <td className="py-3 text-right">
                          <button className="text-xs font-bold text-primary-light hover:underline px-2 py-1 bg-primary-light/10 rounded-lg">Download</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case 'Commission Management':
        return (
          <div className="p-8 space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold dark:text-white">Agent Commissions & Payouts</h3>
              <div className="flex gap-2">
                <button className="btn-outline px-4 py-2 text-sm flex items-center gap-2">
                  <History size={18} /> Payout History
                </button>
                <button className="btn-primary px-4 py-2 text-sm flex items-center gap-2">
                  <Percent size={18} /> Process Bulk Payout
                </button>
              </div>
            </div>

            {/* Commission Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card-premium">
                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Pending Commissions</p>
                <h3 className="text-3xl font-bold text-orange-500 mt-2">₹4.8L</h3>
                <p className="text-xs font-semibold text-warning mt-1">Awaiting next cycle</p>
              </div>
              <div className="card-premium">
                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Paid This Month</p>
                <h3 className="text-3xl font-bold text-emerald-500 mt-2">₹12.2L</h3>
                <p className="text-xs font-semibold text-success mt-1">Distributed successfully</p>
              </div>
              <div className="card-premium">
                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Average Agent Earning</p>
                <h3 className="text-3xl font-bold text-blue-500 mt-2">₹18,450</h3>
                <p className="text-xs font-semibold text-text-secondary-light mt-1">Per active agent (MTD)</p>
              </div>
            </div>

            {/* Commission Table */}
            <div className="card-premium">
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
                <div className="flex gap-2">
                  <select className="px-4 py-1.5 rounded-lg text-xs font-bold bg-gray-100 dark:bg-secondary-dark text-text-secondary-light border-none focus:ring-2 focus:ring-primary-light outline-none">
                    <option>All Agent Roles</option>
                    <option>State Agents</option>
                    <option>District Agents</option>
                    <option>Divisional Agents</option>
                    <option>Pincode Agents</option>
                  </select>
                </div>
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary-light" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search by Agent Name..." 
                    className="w-full pl-9 pr-4 py-1.5 bg-gray-50 dark:bg-secondary-dark border border-border-light dark:border-border-dark rounded-lg focus:ring-2 focus:ring-primary-light outline-none text-sm"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-border-light dark:border-border-dark">
                      <th className="pb-3 font-bold dark:text-white text-sm">Agent Name & Role</th>
                      <th className="pb-3 font-bold dark:text-white text-sm">Sales Volume (MTD)</th>
                      <th className="pb-3 font-bold dark:text-white text-sm">Rate</th>
                      <th className="pb-3 font-bold dark:text-white text-sm">Earned Commission</th>
                      <th className="pb-3 font-bold dark:text-white text-sm">Status</th>
                      <th className="pb-3 font-bold dark:text-white text-sm text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-light dark:divide-border-dark">
                    {[
                      { name: 'Amit Singh', role: 'State Agent', volume: '₹14.5L', rate: '5%', earned: '₹72,500', status: 'Pending' },
                      { name: 'Priya Verma', role: 'District Agent', volume: '₹8.2L', rate: '8%', earned: '₹65,600', status: 'Ready for Payout' },
                      { name: 'Kiran Deep', role: 'Divisional Agent', volume: '₹5.4L', rate: '10%', earned: '₹54,000', status: 'Processing' },
                      { name: 'Rahul Dev', role: 'Pincode Agent', volume: '₹2.4L', rate: '12%', earned: '₹28,800', status: 'Paid' },
                      { name: 'Sanjay Dutt', role: 'Category Agent', volume: '₹5.8L', rate: '10%', earned: '₹58,000', status: 'Processing' },
                    ].map((agent) => (
                      <tr key={agent.name} className="hover:bg-gray-50 dark:hover:bg-secondary-dark/50 transition-colors">
                        <td className="py-3">
                          <p className="dark:text-white font-bold text-sm tracking-tight">{agent.name}</p>
                          <p className="text-[10px] text-text-secondary-light font-bold uppercase tracking-wider mt-0.5">{agent.role}</p>
                        </td>
                        <td className="py-3 font-medium dark:text-white text-sm">{agent.volume}</td>
                        <td className="py-3">
                          <span className="px-2 py-1 bg-gray-100 dark:bg-secondary-dark rounded-lg text-xs font-semibold dark:text-white">{agent.rate}</span>
                        </td>
                        <td className="py-3 font-bold text-success text-sm">{agent.earned}</td>
                        <td className="py-3">
                          <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                            agent.status === 'Paid' ? 'bg-success/10 text-success' : 
                            agent.status === 'Ready for Payout' ? 'bg-purple-500/10 text-purple-500' :
                            agent.status === 'Processing' ? 'bg-blue-500/10 text-blue-500' : 'bg-warning/10 text-warning'
                          }`}>
                            {agent.status}
                          </span>
                        </td>
                        <td className="py-3 text-right">
                          <button className="text-xs font-bold text-primary-light hover:underline px-2 py-1 bg-primary-light/10 rounded-lg">View Details</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case 'Delivery Management':
        return (
          <div className="p-8 space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold dark:text-white">Delivery Operations</h3>
              <div className="flex gap-2">
                <button className="btn-outline px-4 py-2 text-sm flex items-center gap-2">
                  <Map size={18} /> Live Tracking
                </button>
                <button className="btn-primary px-4 py-2 text-sm flex items-center gap-2">
                  <UserPlus size={18} /> Add Rider
                </button>
              </div>
            </div>

            {/* Delivery Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card-premium">
                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Active Riders</p>
                <h3 className="text-3xl font-bold text-blue-500 mt-2">124</h3>
                <p className="text-xs font-semibold text-success mt-1">85% currently on delivery</p>
              </div>
              <div className="card-premium">
                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Pending Deliveries</p>
                <h3 className="text-3xl font-bold text-orange-500 mt-2">42</h3>
                <p className="text-xs font-semibold text-warning mt-1">Awaiting rider assignment</p>
              </div>
              <div className="card-premium">
                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Completed Today</p>
                <h3 className="text-3xl font-bold text-emerald-500 mt-2">856</h3>
                <p className="text-xs font-semibold text-success mt-1">Avg. time: 24 mins</p>
              </div>
            </div>
            
            <div className="card-premium">
              <div className="flex gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary-light" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search by Order ID or Rider Name..." 
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-secondary-dark border border-border-light dark:border-border-dark rounded-xl focus:ring-2 focus:ring-primary-light outline-none"
                  />
                </div>
                <button className="btn-outline px-4 py-2 flex items-center gap-2">
                  <Filter size={18} /> Filter Status
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-border-light dark:border-border-dark">
                      <th className="pb-4 font-bold dark:text-white text-sm">Order ID</th>
                      <th className="pb-4 font-bold dark:text-white text-sm">Delivery Partner</th>
                      <th className="pb-4 font-bold dark:text-white text-sm">Route (Pickup → Drop)</th>
                      <th className="pb-4 font-bold dark:text-white text-sm">Time</th>
                      <th className="pb-4 font-bold dark:text-white text-sm">Status</th>
                      <th className="pb-4 font-bold dark:text-white text-sm text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-light dark:divide-border-dark">
                    {[
                      { id: '#DLV-1024', rider: 'Rajesh Kumar', pickup: 'Fresh Grocery Mart', drop: 'Sector 45, Gurugram', time: '12 mins left', status: 'Out for Delivery' },
                      { id: '#DLV-1025', rider: 'Suresh Raina', pickup: 'Electro World', drop: 'HSR Layout, Bangalore', time: 'Picked up', status: 'In Transit' },
                      { id: '#DLV-1026', rider: 'Amit Singh', pickup: 'Style Fashion', drop: 'Marine Drive, Mumbai', time: '2 mins ago', status: 'Delivered' },
                      { id: '#DLV-1027', rider: 'Unassigned', pickup: 'Bake My Day', drop: 'Civil Lines, Delhi', time: '--', status: 'Pending' },
                    ].map((delivery) => (
                      <tr key={delivery.id} className="hover:bg-gray-50 dark:hover:bg-secondary-dark/50 transition-colors">
                        <td className="py-4 font-bold text-primary-light text-sm">{delivery.id}</td>
                        <td className="py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gray-100 dark:bg-secondary-dark rounded-full flex items-center justify-center text-[10px] font-bold">
                              {delivery.rider === 'Unassigned' ? '?' : delivery.rider[0]}
                            </div>
                            <span className="dark:text-white font-medium text-sm">{delivery.rider}</span>
                          </div>
                        </td>
                        <td className="py-4">
                          <p className="text-sm dark:text-white">{delivery.pickup}</p>
                          <p className="text-[10px] text-text-secondary-light font-medium">→ {delivery.drop}</p>
                        </td>
                        <td className="py-4 text-text-secondary-light text-xs font-bold uppercase">{delivery.time}</td>
                        <td className="py-4">
                          <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                            delivery.status === 'Delivered' ? 'bg-success/10 text-success' : 
                            delivery.status === 'Pending' ? 'bg-orange-500/10 text-orange-500' : 'bg-blue-500/10 text-blue-500'
                          }`}>{delivery.status}</span>
                        </td>
                        <td className="py-4 text-right">
                          <button className="text-xs font-bold text-primary-light hover:underline">Track Live</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case 'Reports':
        return (
          <div className="p-8 space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold dark:text-white">System Reports & Exports</h3>
              <div className="flex gap-2">
                <button className="btn-outline px-4 py-2 text-sm flex items-center gap-2">
                  <Filter size={18} /> Filters
                </button>
                <button className="btn-primary px-4 py-2 text-sm flex items-center gap-2">
                  <BarChartIcon size={18} /> Generate Custom Report
                </button>
              </div>
            </div>

            {/* Report Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {[
                { title: 'Financial Analytics', desc: 'Revenue, payouts, and platform fees.', icon: <CreditCard />, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
                { title: 'Agent Performance', desc: 'Sales volume and target completion.', icon: <UserCheck />, color: 'text-purple-500', bg: 'bg-purple-500/10' },
                { title: 'User Activity', desc: 'Registrations, active sessions, drops.', icon: <Users />, color: 'text-blue-500', bg: 'bg-blue-500/10' },
                { title: 'Operations', desc: 'Shop onboarding and delivery stats.', icon: <Package />, color: 'text-orange-500', bg: 'bg-orange-500/10' },
              ].map((cat) => (
                <div key={cat.title} className="card-premium hover:scale-[1.02] transition-transform cursor-pointer group">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${cat.bg} ${cat.color} mb-4 group-hover:scale-110 transition-transform`}>
                    {cat.icon}
                  </div>
                  <h4 className="font-bold dark:text-white">{cat.title}</h4>
                  <p className="text-xs text-text-secondary-light mt-1">{cat.desc}</p>
                  <button className="mt-4 text-xs font-bold text-primary-light flex items-center gap-1 group-hover:underline">
                    View Templates <ChevronRight size={14} />
                  </button>
                </div>
              ))}
            </div>

            {/* Recent Reports Table */}
            <div className="card-premium">
              <div className="flex justify-between items-center mb-6">
                <h4 className="font-bold dark:text-white">Recently Generated Reports</h4>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary-light" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search reports..." 
                    className="w-full pl-9 pr-4 py-1.5 bg-gray-50 dark:bg-secondary-dark border border-border-light dark:border-border-dark rounded-lg focus:ring-2 focus:ring-primary-light outline-none text-sm"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-border-light dark:border-border-dark">
                      <th className="pb-3 font-bold dark:text-white text-sm">Report Name</th>
                      <th className="pb-3 font-bold dark:text-white text-sm">Category</th>
                      <th className="pb-3 font-bold dark:text-white text-sm">Generated On</th>
                      <th className="pb-3 font-bold dark:text-white text-sm">Status</th>
                      <th className="pb-3 font-bold dark:text-white text-sm text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-light dark:divide-border-dark">
                    {[
                      { name: 'Monthly Revenue Summary - October', category: 'Financial Analytics', date: 'Today, 09:30 AM', status: 'Completed' },
                      { name: 'State Agent Commission Payouts', category: 'Agent Performance', date: 'Yesterday, 04:15 PM', status: 'Completed' },
                      { name: 'Q3 New User Acquisition', category: 'User Activity', date: 'Oct 24, 11:20 AM', status: 'Failed' },
                      { name: 'Active Shop Directory - Maharashtra', category: 'Operations', date: 'Oct 22, 10:00 AM', status: 'Completed' },
                      { name: 'Annual Delivery SLA Compliance', category: 'Operations', date: 'Processing...', status: 'Generating' },
                    ].map((report) => (
                      <tr key={report.name} className="hover:bg-gray-50 dark:hover:bg-secondary-dark/50 transition-colors">
                        <td className="py-4">
                          <p className="dark:text-white font-bold text-sm">{report.name}</p>
                          <p className="text-xs text-text-secondary-light mt-0.5">CSV • 2.4 MB</p>
                        </td>
                        <td className="py-4">
                          <span className="px-2 py-1 bg-gray-100 dark:bg-secondary-dark rounded-lg text-xs font-semibold dark:text-white">
                            {report.category}
                          </span>
                        </td>
                        <td className="py-4 text-text-secondary-light text-sm flex items-center gap-1">
                          <Clock size={14} /> {report.date}
                        </td>
                        <td className="py-4">
                          <span className={`px-2 py-1 rounded-full text-[10px] font-bold flex w-max items-center gap-1 ${
                            report.status === 'Completed' ? 'bg-success/10 text-success' : 
                            report.status === 'Generating' ? 'bg-blue-500/10 text-blue-500 animate-pulse' : 'bg-error/10 text-error'
                          }`}>
                            {report.status === 'Completed' && <CheckCircle size={10} />}
                            {report.status === 'Failed' && <XCircle size={10} />}
                            {report.status}
                          </span>
                        </td>
                        <td className="py-4 text-right">
                          <button className={`text-xs font-bold px-3 py-1.5 rounded-lg ${
                            report.status === 'Completed' ? 'bg-primary-light/10 text-primary-light hover:bg-primary-light/20' : 'bg-gray-100 dark:bg-secondary-dark text-text-secondary-light opacity-50 cursor-not-allowed'
                          }`}>
                            Download
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case 'Support / Tickets':
        return (
          <div className="p-8 space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold dark:text-white">Helpdesk & Support</h3>
              <div className="flex gap-2">
                <button className="btn-outline px-4 py-2 text-sm flex items-center gap-2">
                  <LifeBuoy size={18} /> Live Chat
                </button>
                <button className="btn-primary px-4 py-2 text-sm flex items-center gap-2">
                  <Package size={18} /> Open Ticket
                </button>
              </div>
            </div>

            {/* Support Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card-premium">
                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Unresolved Tickets</p>
                <h3 className="text-3xl font-bold text-error mt-2">34</h3>
                <p className="text-xs font-semibold text-error mt-1">12 marked as urgent</p>
              </div>
              <div className="card-premium">
                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Avg. Response Time</p>
                <h3 className="text-3xl font-bold text-blue-500 mt-2">14m 20s</h3>
                <p className="text-xs font-semibold text-success mt-1">-2m 10s from last week</p>
              </div>
              <div className="card-premium">
                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Resolved Today</p>
                <h3 className="text-3xl font-bold text-success mt-2">128</h3>
                <p className="text-xs font-semibold text-text-secondary-light mt-1">94% satisfaction rate</p>
              </div>
            </div>

            {/* Tickets Table */}
            <div className="card-premium">
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
                <div className="flex gap-2">
                  <select className="px-4 py-1.5 rounded-lg text-xs font-bold bg-gray-100 dark:bg-secondary-dark text-text-secondary-light border-none focus:ring-2 focus:ring-primary-light outline-none">
                    <option>All Priorities</option>
                    <option>Urgent</option>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary-light" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search tickets or users..." 
                    className="w-full pl-9 pr-4 py-1.5 bg-gray-50 dark:bg-secondary-dark border border-border-light dark:border-border-dark rounded-lg focus:ring-2 focus:ring-primary-light outline-none text-sm"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-border-light dark:border-border-dark">
                      <th className="pb-3 font-bold dark:text-white text-sm">Ticket ID & Subject</th>
                      <th className="pb-3 font-bold dark:text-white text-sm">Customer</th>
                      <th className="pb-3 font-bold dark:text-white text-sm">Category</th>
                      <th className="pb-3 font-bold dark:text-white text-sm">Priority</th>
                      <th className="pb-3 font-bold dark:text-white text-sm">Status</th>
                      <th className="pb-3 font-bold dark:text-white text-sm text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-light dark:divide-border-dark">
                    {[
                      { id: '#TIC-401', subject: 'Payment deducted but plan not active', user: 'Arjun Reddy', category: 'Billing', priority: 'Urgent', status: 'Open', time: '10 mins ago' },
                      { id: '#TIC-402', subject: 'How to register a new delivery boy?', user: 'Modern Electronics', category: 'General', priority: 'Low', status: 'Closed', time: '2 hours ago' },
                      { id: '#TIC-403', subject: 'KYC rejected incorrectly', user: 'Vikram Batra', category: 'Verification', priority: 'High', status: 'Pending', time: '1 hour ago' },
                      { id: '#TIC-404', subject: 'App crashing on payout screen', user: 'Zoya Khan', category: 'Technical', priority: 'Medium', status: 'In Progress', time: '30 mins ago' },
                    ].map((ticket) => (
                      <tr key={ticket.id} className="hover:bg-gray-50 dark:hover:bg-secondary-dark/50 transition-colors">
                        <td className="py-3">
                          <p className="dark:text-white font-bold text-sm">{ticket.subject}</p>
                          <p className="text-xs text-text-secondary-light font-medium flex items-center gap-1 mt-0.5">
                            <span className="text-primary-light">{ticket.id}</span> • <Clock size={10} /> {ticket.time}
                          </p>
                        </td>
                        <td className="py-3">
                          <p className="dark:text-white font-medium text-sm">{ticket.user}</p>
                        </td>
                        <td className="py-3">
                          <span className="px-2 py-1 bg-gray-100 dark:bg-secondary-dark rounded-lg text-[10px] font-bold uppercase tracking-wider text-text-secondary-light">
                            {ticket.category}
                          </span>
                        </td>
                        <td className="py-3">
                          <span className={`text-xs font-bold ${
                            ticket.priority === 'Urgent' ? 'text-error' : 
                            ticket.priority === 'High' ? 'text-orange-500' : 
                            ticket.priority === 'Medium' ? 'text-blue-500' : 'text-text-secondary-light'
                          }`}>
                            {ticket.priority}
                          </span>
                        </td>
                        <td className="py-3">
                          <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                            ticket.status === 'Open' ? 'bg-error/10 text-error' : 
                            ticket.status === 'In Progress' ? 'bg-blue-500/10 text-blue-500' :
                            ticket.status === 'Pending' ? 'bg-warning/10 text-warning' : 'bg-gray-500/10 text-gray-500 dark:text-gray-400'
                          }`}>
                            {ticket.status}
                          </span>
                        </td>
                        <td className="py-3 text-right">
                          <button className="text-xs font-bold text-primary-light hover:underline px-3 py-1.5 bg-primary-light/10 rounded-lg">Reply</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case 'Notifications':
        return (
          <div className="p-8 space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold dark:text-white">Broadcast & Notifications</h3>
              <div className="flex gap-2">
                <button className="btn-outline px-4 py-2 text-sm flex items-center gap-2">
                  <Filter size={18} /> Templates
                </button>
                <button className="btn-primary px-4 py-2 text-sm flex items-center gap-2">
                  <Megaphone size={18} /> New Broadcast
                </button>
              </div>
            </div>

            {/* Broadcast Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card-premium">
                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Total Sent (MTD)</p>
                <h3 className="text-3xl font-bold text-blue-500 mt-2">124.5K</h3>
                <p className="text-xs font-semibold text-success mt-1">+12% vs last month</p>
              </div>
              <div className="card-premium">
                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Avg. Read Rate</p>
                <h3 className="text-3xl font-bold text-purple-500 mt-2">42.8%</h3>
                <p className="text-xs font-semibold text-success mt-1">Push notifications perform best</p>
              </div>
              <div className="card-premium">
                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Scheduled Broadcasts</p>
                <h3 className="text-3xl font-bold text-orange-500 mt-2">8</h3>
                <p className="text-xs font-semibold text-text-secondary-light mt-1">Upcoming in next 7 days</p>
              </div>
            </div>

            {/* Notifications Table */}
            <div className="card-premium">
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
                <div className="flex gap-2">
                  <select className="px-4 py-1.5 rounded-lg text-xs font-bold bg-gray-100 dark:bg-secondary-dark text-text-secondary-light border-none focus:ring-2 focus:ring-primary-light outline-none">
                    <option>All Channels</option>
                    <option>Push Notification</option>
                    <option>Email</option>
                    <option>SMS</option>
                  </select>
                </div>
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary-light" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search campaigns..." 
                    className="w-full pl-9 pr-4 py-1.5 bg-gray-50 dark:bg-secondary-dark border border-border-light dark:border-border-dark rounded-lg focus:ring-2 focus:ring-primary-light outline-none text-sm"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-border-light dark:border-border-dark">
                      <th className="pb-3 font-bold dark:text-white text-sm">Campaign / Message</th>
                      <th className="pb-3 font-bold dark:text-white text-sm">Target Audience</th>
                      <th className="pb-3 font-bold dark:text-white text-sm">Channel</th>
                      <th className="pb-3 font-bold dark:text-white text-sm">Date & Time</th>
                      <th className="pb-3 font-bold dark:text-white text-sm">Status</th>
                      <th className="pb-3 font-bold dark:text-white text-sm text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-light dark:divide-border-dark">
                    {[
                      { title: 'Diwali Mega Sale Started!', message: 'Get up to 50% off on all electronics.', audience: 'All Users', channel: 'Push', time: 'Today, 10:00 AM', status: 'Sent' },
                      { title: 'Commission Payout Processed', message: 'Your weekly commission has been credited.', audience: 'State Agents', channel: 'Email', time: 'Today, 09:15 AM', status: 'Sent' },
                      { title: 'System Maintenance Alert', message: 'Platform will be down from 2 AM to 4 AM.', audience: 'All Users & Agents', channel: 'In-App', time: 'Tomorrow, 12:00 PM', status: 'Scheduled' },
                      { title: 'KYC Reminder - Last Day', message: 'Please complete your KYC to avoid block.', audience: 'Pending KYC Users', channel: 'SMS', time: 'Yesterday, 04:30 PM', status: 'Failed' },
                    ].map((notif, i) => (
                      <tr key={i} className="hover:bg-gray-50 dark:hover:bg-secondary-dark/50 transition-colors">
                        <td className="py-3">
                          <p className="dark:text-white font-bold text-sm">{notif.title}</p>
                          <p className="text-xs text-text-secondary-light mt-0.5 truncate max-w-xs">{notif.message}</p>
                        </td>
                        <td className="py-3">
                          <span className="px-2 py-1 bg-gray-100 dark:bg-secondary-dark rounded-lg text-[10px] font-bold text-text-secondary-light">
                            {notif.audience}
                          </span>
                        </td>
                        <td className="py-3">
                          <span className={`text-xs font-bold flex items-center gap-1 ${
                            notif.channel === 'Push' ? 'text-purple-500' : 
                            notif.channel === 'Email' ? 'text-blue-500' : 
                            notif.channel === 'SMS' ? 'text-orange-500' : 'text-emerald-500'
                          }`}>
                            {notif.channel}
                          </span>
                        </td>
                        <td className="py-3 text-text-secondary-light text-sm flex items-center gap-1 mt-1.5">
                          <Clock size={12} /> {notif.time}
                        </td>
                        <td className="py-3">
                          <span className={`px-2 py-1 rounded-full text-[10px] font-bold flex w-max items-center gap-1 ${
                            notif.status === 'Sent' ? 'bg-success/10 text-success' : 
                            notif.status === 'Scheduled' ? 'bg-blue-500/10 text-blue-500' : 'bg-error/10 text-error'
                          }`}>
                            {notif.status === 'Sent' && <CheckCircle size={10} />}
                            {notif.status === 'Failed' && <XCircle size={10} />}
                            {notif.status}
                          </span>
                        </td>
                        <td className="py-3 text-right">
                          <button className="text-xs font-bold text-primary-light hover:underline px-3 py-1.5 bg-primary-light/10 rounded-lg">View Stats</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case 'Referral System':
        return (
          <div className="p-8 space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold dark:text-white">Referral Network & Rewards</h3>
              <div className="flex gap-2">
                <button className="btn-outline px-4 py-2 text-sm flex items-center gap-2">
                  <Settings size={18} /> Campaign Settings
                </button>
                <button className="btn-primary px-4 py-2 text-sm flex items-center gap-2">
                  <Share2 size={18} /> Generate Track Links
                </button>
              </div>
            </div>

            {/* Referral Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card-premium">
                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Total Referrals (MTD)</p>
                <h3 className="text-3xl font-bold text-blue-500 mt-2">1,842</h3>
                <p className="text-xs font-semibold text-success mt-1">+24% vs last month</p>
              </div>
              <div className="card-premium">
                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Rewards Distributed</p>
                <h3 className="text-3xl font-bold text-purple-500 mt-2">₹4.2L</h3>
                <p className="text-xs font-semibold text-text-secondary-light mt-1">Total cash bonuses paid</p>
              </div>
              <div className="card-premium">
                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Active Promoters</p>
                <h3 className="text-3xl font-bold text-emerald-500 mt-2">456</h3>
                <p className="text-xs font-semibold text-success mt-1">Users with 5+ successful refs</p>
              </div>
            </div>

            {/* Referral History Table */}
            <div className="card-premium">
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
                <div className="flex gap-2">
                  <select className="px-4 py-1.5 rounded-lg text-xs font-bold bg-gray-100 dark:bg-secondary-dark text-text-secondary-light border-none focus:ring-2 focus:ring-primary-light outline-none">
                    <option>All Statuses</option>
                    <option>Reward Paid</option>
                    <option>Pending Verification</option>
                    <option>Rejected / Fraud</option>
                  </select>
                </div>
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary-light" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search codes or users..." 
                    className="w-full pl-9 pr-4 py-1.5 bg-gray-50 dark:bg-secondary-dark border border-border-light dark:border-border-dark rounded-lg focus:ring-2 focus:ring-primary-light outline-none text-sm"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-border-light dark:border-border-dark">
                      <th className="pb-3 font-bold dark:text-white text-sm">Referrer</th>
                      <th className="pb-3 font-bold dark:text-white text-sm">Referral Code</th>
                      <th className="pb-3 font-bold dark:text-white text-sm">Referred User</th>
                      <th className="pb-3 font-bold dark:text-white text-sm">Reward</th>
                      <th className="pb-3 font-bold dark:text-white text-sm">Status</th>
                      <th className="pb-3 font-bold dark:text-white text-sm text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-light dark:divide-border-dark">
                    {[
                      { referrer: 'Arjun Reddy', code: 'ARJUN500', referred: 'Sneha Patil', reward: '₹500.00', status: 'Paid', date: 'Today' },
                      { referrer: 'Modern Electronics', code: 'MODERNX', referred: 'Tech World Shop', reward: '₹2,000.00', status: 'Pending Verification', date: 'Yesterday' },
                      { referrer: 'Vikram Batra', code: 'VIKRAM01', referred: 'Amit Singh', reward: '₹500.00', status: 'Paid', date: 'Oct 24' },
                      { referrer: 'Zoya Khan', code: 'ZOYA99', referred: 'Rahul Dev', reward: '₹0.00', status: 'Rejected / Fraud', date: 'Oct 20' },
                    ].map((ref, i) => (
                      <tr key={i} className="hover:bg-gray-50 dark:hover:bg-secondary-dark/50 transition-colors">
                        <td className="py-4">
                          <p className="dark:text-white font-bold text-sm">{ref.referrer}</p>
                          <p className="text-xs text-text-secondary-light flex items-center gap-1 mt-0.5"><Clock size={10} /> {ref.date}</p>
                        </td>
                        <td className="py-4">
                          <span className="px-2 py-1 bg-gray-100 dark:bg-secondary-dark rounded-lg text-xs font-mono font-bold text-primary-light tracking-widest border border-primary-light/20">
                            {ref.code}
                          </span>
                        </td>
                        <td className="py-4">
                          <p className="dark:text-white font-medium text-sm">{ref.referred}</p>
                        </td>
                        <td className="py-4 font-bold text-success text-sm">{ref.reward}</td>
                        <td className="py-4">
                          <span className={`px-2 py-1 rounded-full text-[10px] font-bold flex w-max items-center gap-1 ${
                            ref.status === 'Paid' ? 'bg-success/10 text-success' : 
                            ref.status === 'Pending Verification' ? 'bg-warning/10 text-warning' : 'bg-error/10 text-error'
                          }`}>
                            {ref.status === 'Paid' && <CheckCircle size={10} />}
                            {ref.status === 'Rejected / Fraud' && <XCircle size={10} />}
                            {ref.status}
                          </span>
                        </td>
                        <td className="py-4 text-right">
                          <button className={`text-xs font-bold px-3 py-1.5 rounded-lg ${
                            ref.status === 'Pending Verification' ? 'bg-primary-light/10 text-primary-light hover:bg-primary-light/20' : 'bg-gray-100 dark:bg-secondary-dark text-text-secondary-light opacity-50 cursor-not-allowed'
                          }`}>
                            Approve
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case 'Role & Permissions':
        return (
          <div className="p-8 space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold dark:text-white">Access Control & Roles</h3>
              <div className="flex gap-2">
                <button className="btn-primary px-4 py-2 text-sm flex items-center gap-2">
                  <ShieldCheck size={18} /> Create Custom Role
                </button>
              </div>
            </div>

            {/* Role Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: 'Super Admin', access: 'Full System Access', users: 3, color: 'border-error' },
                { title: 'State Agent', access: 'Regional Management', users: 45, color: 'border-primary-light' },
                { title: 'Finance Manager', access: 'Billing & Payouts Only', users: 4, color: 'border-emerald-500' },
                { title: 'Support Staff', access: 'Tickets & Users Only', users: 12, color: 'border-blue-500' },
              ].map((role) => (
                <div key={role.title} className={`card-premium border-t-4 ${role.color} hover:scale-[1.02] transition-transform cursor-pointer`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold dark:text-white text-lg">{role.title}</h4>
                      <p className="text-xs text-text-secondary-light mt-1">{role.access}</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-secondary-dark flex items-center justify-center text-xs font-bold text-primary-light">
                      {role.users}
                    </div>
                  </div>
                  <button className="mt-4 text-xs font-bold text-primary-light hover:underline w-full text-left">
                    Edit Permissions →
                  </button>
                </div>
              ))}
            </div>

            {/* Administrator Table */}
            <div className="card-premium">
              <div className="flex justify-between items-center mb-6">
                <h4 className="font-bold dark:text-white">System Administrators</h4>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary-light" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search admins by name or email..." 
                    className="w-full pl-9 pr-4 py-1.5 bg-gray-50 dark:bg-secondary-dark border border-border-light dark:border-border-dark rounded-lg focus:ring-2 focus:ring-primary-light outline-none text-sm"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-border-light dark:border-border-dark">
                      <th className="pb-3 font-bold dark:text-white text-sm">Administrator</th>
                      <th className="pb-3 font-bold dark:text-white text-sm">Assigned Role</th>
                      <th className="pb-3 font-bold dark:text-white text-sm">Security (2FA)</th>
                      <th className="pb-3 font-bold dark:text-white text-sm">Last Active</th>
                      <th className="pb-3 font-bold dark:text-white text-sm text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-light dark:divide-border-dark">
                    {[
                      { name: 'Sanjay Dutt', email: 'sanjay.admin@agentstore.com', role: 'Super Admin', mfa: true, active: 'Just now' },
                      { name: 'Priya Verma', email: 'priya.finance@agentstore.com', role: 'Finance Manager', mfa: true, active: '2 hours ago' },
                      { name: 'Rahul Dev', email: 'rahul.support@agentstore.com', role: 'Support Staff', mfa: false, active: 'Yesterday' },
                      { name: 'Amit Singh', email: 'amit.hr@agentstore.com', role: 'HR Manager', mfa: true, active: '3 days ago' },
                    ].map((admin, i) => (
                      <tr key={i} className="hover:bg-gray-50 dark:hover:bg-secondary-dark/50 transition-colors">
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary-light/10 text-primary-light flex items-center justify-center font-bold text-xs">
                              {admin.name.charAt(0)}
                            </div>
                            <div>
                              <p className="dark:text-white font-bold text-sm">{admin.name}</p>
                              <p className="text-xs text-text-secondary-light">{admin.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4">
                          <span className={`px-2 py-1 rounded-lg text-xs font-bold ${
                            admin.role === 'Super Admin' ? 'bg-error/10 text-error' : 
                            'bg-gray-100 dark:bg-secondary-dark dark:text-white'
                          }`}>
                            {admin.role}
                          </span>
                        </td>
                        <td className="py-4">
                          <span className={`flex items-center gap-1 text-xs font-bold ${admin.mfa ? 'text-success' : 'text-warning'}`}>
                            {admin.mfa ? <Lock size={12} /> : <AlertCircle size={12} />}
                            {admin.mfa ? 'Enabled' : 'Disabled'}
                          </span>
                        </td>
                        <td className="py-4 text-text-secondary-light text-sm flex items-center gap-1 mt-1.5">
                          <Clock size={12} /> {admin.active}
                        </td>
                        <td className="py-4 text-right">
                          <button className="text-xs font-bold text-primary-light hover:underline px-3 py-1.5 bg-primary-light/10 rounded-lg">
                            Manage Access
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case 'Role & Permissions':
        return (
          <div className="p-8 space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-black dark:text-white tracking-tight">Role & Permission Management</h3>
                <p className="text-sm text-text-secondary-light mt-1">Control user access, roles, and platform security.</p>
              </div>
              <button className="btn-primary px-6 py-2.5 text-sm font-bold shadow-lg shadow-primary-light/20 flex items-center gap-2">
                <Shield size={18} /> Add System User
              </button>
            </div>

            <div className="card-premium p-0 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-secondary-dark/30 text-left">
                      <th className="p-4 font-black text-[10px] text-text-secondary-light uppercase tracking-widest min-w-[200px]">User Info</th>
                      <th className="p-4 font-black text-[10px] text-text-secondary-light uppercase tracking-widest min-w-[120px]">Role</th>
                      <th className="p-4 font-black text-[10px] text-text-secondary-light uppercase tracking-widest min-w-[150px]">Location</th>
                      <th className="p-4 font-black text-[10px] text-text-secondary-light uppercase tracking-widest min-w-[120px]">Risk Level</th>
                      <th className="p-4 font-black text-[10px] text-text-secondary-light uppercase tracking-widest min-w-[120px]">Status</th>
                      <th className="p-4 font-black text-[10px] text-text-secondary-light uppercase tracking-widest min-w-[150px]">Last Login</th>
                      <th className="p-4 font-black text-[10px] text-text-secondary-light uppercase tracking-widest text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-light dark:divide-border-dark">
                    {systemUsers.map((u) => (
                      <tr key={u.id} className="hover:bg-gray-50/50 dark:hover:bg-secondary-dark/20 transition-colors group">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary-light/10 text-primary-light rounded-xl flex items-center justify-center font-bold shrink-0">{u.name[0]}</div>
                            <div className="whitespace-nowrap">
                              <p className="font-bold dark:text-white text-sm">{u.name}</p>
                              <p className="text-[10px] text-text-secondary-light font-bold uppercase">{u.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="px-2 py-1 bg-gray-100 dark:bg-secondary-dark rounded text-[10px] font-bold dark:text-white uppercase whitespace-nowrap">{u.role}</span>
                        </td>
                        <td className="p-4">
                          <p className="text-xs dark:text-white font-medium">{u.location}</p>
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
                        <td className="p-4 text-xs dark:text-white font-medium">{u.lastLogin}</td>
                        <td className="p-4 text-right">
                          <div className="flex justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            <button className="p-2 bg-gray-100 dark:bg-secondary-dark rounded-xl hover:bg-gray-200 text-text-secondary-light" title="View"><Eye size={14} /></button>
                            <button className="p-2 bg-primary-light/10 text-primary-light rounded-xl hover:bg-primary-light hover:text-white" title="Edit Role"><Edit size={14} /></button>
                            <button 
                              onClick={() => {
                                setSystemUsers(systemUsers.map(user => user.id === u.id ? { ...user, status: 'Active' } : user));
                                addNotification({ title: 'User Activated', message: `${u.name} is now active.`, type: 'success' });
                              }}
                              className="p-2 bg-success/10 text-success rounded-xl hover:bg-success hover:text-white" 
                              title="Activate"
                            >
                              <CheckCircle size={14} />
                            </button>
                            <button 
                              onClick={() => {
                                setSelectedSystemUser(u);
                                setShowDeactivateModal(true);
                              }}
                              className="p-2 bg-error/10 text-error rounded-xl hover:bg-error hover:text-white" 
                              title="Deactivate / Block"
                            >
                              <XCircle size={14} />
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
          </div>
        );

      case 'Activity Log':
        return (
          <div className="p-8 space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div>
              <h3 className="text-2xl font-black dark:text-white tracking-tight">System Activity Log</h3>
              <p className="text-sm text-text-secondary-light mt-1">Audit trail of all system actions and security events.</p>
            </div>

            <div className="card-premium p-0 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-secondary-dark/30 text-left border-b dark:border-border-dark">
                      <th className="p-4 font-black text-[10px] text-text-secondary-light uppercase tracking-widest">Timestamp</th>
                      <th className="p-4 font-black text-[10px] text-text-secondary-light uppercase tracking-widest">User</th>
                      <th className="p-4 font-black text-[10px] text-text-secondary-light uppercase tracking-widest">Action</th>
                      <th className="p-4 font-black text-[10px] text-text-secondary-light uppercase tracking-widest">Module</th>
                      <th className="p-4 font-black text-[10px] text-text-secondary-light uppercase tracking-widest">Status</th>
                      <th className="p-4 font-black text-[10px] text-text-secondary-light uppercase tracking-widest">IP Address</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-light dark:divide-border-dark">
                    {systemActivityLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-gray-50/50 dark:hover:bg-secondary-dark/20 transition-colors">
                        <td className="p-4 text-xs font-mono dark:text-white">{log.timestamp}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-gray-100 dark:bg-secondary-dark rounded flex items-center justify-center font-bold text-[10px] dark:text-white">{log.user[0]}</div>
                            <span className="text-xs font-bold dark:text-white">{log.user}</span>
                          </div>
                        </td>
                        <td className="p-4 text-xs font-bold dark:text-white">{log.action}</td>
                        <td className="p-4 text-[10px] font-black text-text-secondary-light uppercase tracking-widest">{log.module}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                            log.status === 'Success' ? 'bg-success/10 text-success' :
                            log.status === 'Warning' ? 'bg-warning/10 text-warning' : 'bg-error/10 text-error'
                          }`}>{log.status}</span>
                        </td>
                        <td className="p-4 text-xs font-mono text-text-secondary-light">{log.ip}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      
      case 'Shop Tie-Up Management':
        const filteredShops = shopTieUps.filter(shop => {
          const matchesCategory = selectedCategory === 'All Categories' || shop.category === selectedCategory;
          const matchesPincode = !shopSearchPincode || shop.pincode.includes(shopSearchPincode);
          const matchesStatus = shopStatusFilter === 'All Status' || shop.status === shopStatusFilter;
          return matchesCategory && matchesPincode && matchesStatus;
        });

        const getStatusColor = (status) => {
          switch (status) {
            case 'Pending': return 'bg-warning/10 text-warning';
            case 'Under Review': return 'bg-blue-500/10 text-blue-500';
            case 'Verified by Sub Admin': return 'bg-primary-light/10 text-primary-light';
            case 'Approved': return 'bg-success/10 text-success';
            case 'Active': return 'bg-success text-white';
            case 'Rejected': return 'bg-error/10 text-error';
            case 'Need Correction': return 'bg-orange-500/10 text-orange-500';
            default: return 'bg-gray-100 text-gray-500';
          }
        };

        const topCards = [
          { title: 'Total Requests', value: shopTieUps.length, color: 'text-primary-light', bg: 'bg-primary-light/10' },
          { title: 'Verified by Sub Admin', value: shopTieUps.filter(s => s.status === 'Verified by Sub Admin').length, color: 'text-success', bg: 'bg-success/10' },
          { title: 'Need Correction', value: shopTieUps.filter(s => s.status === 'Need Correction').length, color: 'text-orange-500', bg: 'bg-orange-500/10' },
          { title: 'Rejected', value: shopTieUps.filter(s => s.status === 'Rejected').length, color: 'text-error', bg: 'bg-error/10' },
        ];

        return (
          <div className="p-8 space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div>
                <h3 className="text-2xl font-black dark:text-white tracking-tight">Shop Tie-Up Management</h3>
                <p className="text-sm text-text-secondary-light mt-1">Review and manage store partnership requests across territories.</p>
              </div>
              <div className="flex gap-3">
                <div className="relative group">
                  <select 
                    value={shopStatusFilter}
                    onChange={(e) => setShopStatusFilter(e.target.value)}
                    className="btn-outline pl-4 pr-10 py-2.5 text-sm font-bold appearance-none cursor-pointer outline-none bg-transparent hover:border-primary-light transition-all"
                  >
                    <option>All Status</option>
                    <option>Pending</option>
                    <option>Under Review</option>
                    <option>Verified by Sub Admin</option>
                    <option>Approved</option>
                    <option>Rejected</option>
                    <option>Need Correction</option>
                  </select>
                  <Filter size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary-light group-hover:text-primary-light pointer-events-none" />
                </div>
                <div className="relative group">
                  <select 
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="btn-outline pl-4 pr-10 py-2.5 text-sm font-bold appearance-none cursor-pointer outline-none bg-transparent hover:border-primary-light transition-all"
                  >
                    <option>All Categories</option>
                    {shopCategories.map(cat => <option key={cat}>{cat}</option>)}
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary-light group-hover:text-primary-light pointer-events-none" />
                </div>
                <div className="relative">
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary-light" />
                  <input 
                    type="text" 
                    placeholder="Search by Pincode..." 
                    value={shopSearchPincode}
                    onChange={(e) => setShopSearchPincode(e.target.value)}
                    className="pl-10 pr-4 py-2.5 bg-white dark:bg-secondary-dark border border-border-light dark:border-border-dark rounded-xl text-sm focus:ring-2 focus:ring-primary-light outline-none dark:text-white w-48"
                  />
                </div>
              </div>
            </div>

            {/* Top Cards for Rejected / Need Correction */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {topCards.map((card, i) => (
                <div key={i} className="card-premium flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-text-secondary-light uppercase">{card.title}</p>
                    <h3 className="text-2xl font-black dark:text-white mt-1">{card.value}</h3>
                  </div>
                  <div className={`w-10 h-10 ${card.bg} ${card.color} rounded-xl flex items-center justify-center font-bold`}>
                    <Store size={18} />
                  </div>
                </div>
              ))}
            </div>

            {/* Pincode Insights Panel */}
            {shopSearchPincode && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-in fade-in zoom-in duration-300">
                <div className="p-4 bg-primary-light/5 rounded-2xl border border-primary-light/20">
                  <p className="text-[10px] font-black text-primary-light uppercase tracking-widest">Agents in {shopSearchPincode}</p>
                  <p className="text-xl font-black dark:text-white mt-1">12 Agents</p>
                </div>
                <div className="p-4 bg-success/5 rounded-2xl border border-success/20">
                  <p className="text-[10px] font-black text-success uppercase tracking-widest">Shops in {shopSearchPincode}</p>
                  <p className="text-xl font-black dark:text-white mt-1">45 Shops</p>
                </div>
                <div className="p-4 bg-warning/5 rounded-2xl border border-warning/20">
                  <p className="text-[10px] font-black text-warning uppercase tracking-widest">Pending Requests</p>
                  <p className="text-xl font-black dark:text-white mt-1">8 Requests</p>
                </div>
                <div className="p-4 bg-purple-500/5 rounded-2xl border border-purple-500/20">
                  <p className="text-[10px] font-black text-purple-500 uppercase tracking-widest">Coverage %</p>
                  <p className="text-xl font-black dark:text-white mt-1">92% Area</p>
                </div>
              </div>
            )}

            <div className="card-premium p-0 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-secondary-dark/30 text-left">
                      <th className="p-4 font-black text-[10px] text-text-secondary-light uppercase tracking-widest">Shop & Owner</th>
                      <th className="p-4 font-black text-[10px] text-text-secondary-light uppercase tracking-widest">Category</th>
                      <th className="p-4 font-black text-[10px] text-text-secondary-light uppercase tracking-widest">Location</th>
                      <th className="p-4 font-black text-[10px] text-text-secondary-light uppercase tracking-widest">Assignments</th>
                      <th className="p-4 font-black text-[10px] text-text-secondary-light uppercase tracking-widest">Status</th>
                      <th className="p-4 font-black text-[10px] text-text-secondary-light uppercase tracking-widest text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-light dark:divide-border-dark">
                    {filteredShops.map((shop) => (
                      <tr key={shop.id} className="hover:bg-gray-50/50 dark:hover:bg-secondary-dark/20 transition-colors group">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-100 dark:bg-secondary-dark rounded-xl flex items-center justify-center font-bold text-primary-light">
                              <Store size={20} />
                            </div>
                            <div>
                              <p className="font-bold dark:text-white text-sm">{shop.shopName}</p>
                              <p className="text-xs text-text-secondary-light">{shop.ownerName} • {shop.phone}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="px-3 py-1 bg-gray-100 dark:bg-secondary-dark rounded-lg text-xs font-bold dark:text-white">
                            {shop.category}
                          </span>
                        </td>
                        <td className="p-4">
                          <p className="text-sm dark:text-white font-medium">{shop.location}</p>
                          <p className="text-[10px] font-bold text-text-secondary-light uppercase">PIN: {shop.pincode}</p>
                        </td>
                        <td className="p-4">
                          <div className="space-y-1">
                            <p className="text-[10px] text-text-secondary-light font-bold uppercase tracking-tighter">By: {shop.submittedBy}</p>
                            <div className="flex items-center gap-1.5 text-xs font-bold dark:text-white">
                              <User size={12} className="text-primary-light" /> {shop.assignedAgent}
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm ${getStatusColor(shop.status)}`}>
                            {shop.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                              onClick={() => setSelectedShop(shop)}
                              className="p-2 bg-primary-light/10 text-primary-light rounded-xl hover:bg-primary-light hover:text-white transition-all"
                              title="View Details"
                            >
                              <Eye size={16} />
                            </button>
                            <button className="p-2 bg-success/10 text-success rounded-xl hover:bg-success hover:text-white transition-all" title="Approve">
                              <CheckCircle size={16} />
                            </button>
                            <button className="p-2 bg-warning/10 text-warning rounded-xl hover:bg-warning hover:text-white transition-all" title="Request Correction">
                              <AlertCircle size={16} />
                            </button>
                            <button className="p-2 bg-blue-500/10 text-blue-500 rounded-xl hover:bg-blue-500 hover:text-white transition-all" title="Assign Agent">
                              <UserPlus size={16} />
                            </button>
                            <button className="p-2 bg-error/10 text-error rounded-xl hover:bg-error hover:text-white transition-all" title="Reject">
                              <X size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Shop Detail Modal */}
            {selectedShop && (
              <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-background-dark/80 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setSelectedShop(null)}></div>
                <div className="relative w-full max-w-4xl bg-surface-light dark:bg-surface-dark rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
                  <div className="p-6 border-b dark:border-border-dark flex justify-between items-center bg-gray-50/50 dark:bg-secondary-dark/30">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary-light text-white rounded-xl flex items-center justify-center">
                        <Store size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-black dark:text-white">{selectedShop.shopName}</h3>
                        <p className="text-sm text-text-secondary-light font-bold">Tie-Up Request Details</p>
                      </div>
                    </div>
                    <button onClick={() => setSelectedShop(null)} className="p-2 hover:bg-gray-100 dark:hover:bg-secondary-dark rounded-full transition-all"><X size={24} className="dark:text-white" /></button>
                  </div>

                  <div className="p-8 overflow-y-auto space-y-8 flex-1 custom-scrollbar">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <h4 className="text-xs font-black uppercase tracking-widest text-primary-light border-b dark:border-border-dark pb-2">Business & Owner Details</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div><p className="text-[10px] font-bold text-text-secondary-light uppercase">Owner</p><p className="text-sm font-bold dark:text-white">{selectedShop.ownerName}</p></div>
                          <div><p className="text-[10px] font-bold text-text-secondary-light uppercase">Phone</p><p className="text-sm font-bold dark:text-white">{selectedShop.phone}</p></div>
                          <div><p className="text-[10px] font-bold text-text-secondary-light uppercase">Category</p><p className="text-sm font-bold dark:text-white">{selectedShop.category}</p></div>
                          <div><p className="text-[10px] font-bold text-text-secondary-light uppercase">Pincode</p><p className="text-sm font-bold dark:text-white">{selectedShop.pincode}</p></div>
                        </div>

                        <h4 className="text-xs font-black uppercase tracking-widest text-primary-light border-b dark:border-border-dark pb-2 mt-6">Agent & Sub-Admin Details</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-[10px] font-bold text-text-secondary-light uppercase">Assigned Agent</p>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="w-6 h-6 bg-primary-light/10 text-primary-light rounded-full flex items-center justify-center text-[10px] font-bold"><User size={12}/></div>
                              <p className="text-sm font-bold dark:text-white">{selectedShop.assignedAgent}</p>
                            </div>
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-text-secondary-light uppercase">Sub Admin Notes</p>
                            <div className="mt-1 p-2 bg-gray-50 dark:bg-secondary-dark rounded-lg border border-border-light dark:border-border-dark">
                              <p className="text-xs text-text-secondary-light italic flex items-start gap-1">
                                <FileText size={12} className="flex-shrink-0 mt-0.5" /> 
                                "All submitted documents have been verified. Physical shop inspection completed."
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <h4 className="text-xs font-black uppercase tracking-widest text-primary-light border-b dark:border-border-dark pb-2">Activity Log</h4>
                        <div className="space-y-4">
                          <div className="flex gap-3">
                            <div className="w-1.5 h-1.5 bg-primary-light rounded-full mt-1.5"></div>
                            <div>
                              <p className="text-xs font-bold dark:text-white">Shop Added by Agent ({selectedShop.assignedAgent})</p>
                              <p className="text-[10px] text-text-secondary-light">May 04, 10:30 AM</p>
                            </div>
                          </div>
                          {(selectedShop.status === 'Verified by Sub Admin' || selectedShop.status === 'Approved' || selectedShop.status === 'Rejected') && (
                            <div className="flex gap-3">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5"></div>
                              <div>
                                <p className="text-xs font-bold dark:text-white">Reviewed by Sub Admin Priya</p>
                                <p className="text-[10px] text-text-secondary-light">May 04, 02:15 PM</p>
                              </div>
                            </div>
                          )}
                          {selectedShop.status === 'Approved' && (
                            <div className="flex gap-3">
                              <div className="w-1.5 h-1.5 bg-success rounded-full mt-1.5"></div>
                              <div>
                                <p className="text-xs font-bold dark:text-white">Approved by Admin</p>
                                <p className="text-[10px] text-text-secondary-light">May 04, 04:00 PM</p>
                              </div>
                            </div>
                          )}
                          {selectedShop.status === 'Rejected' && (
                            <div className="flex gap-3">
                              <div className="w-1.5 h-1.5 bg-error rounded-full mt-1.5"></div>
                              <div>
                                <p className="text-xs font-bold dark:text-white">Rejected by Admin</p>
                                <p className="text-[10px] text-text-secondary-light">May 04, 04:00 PM</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-xs font-black uppercase tracking-widest text-orange-500 border-b dark:border-border-dark pb-2 flex items-center gap-2"><Shield size={14} /> Shop Documents</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {selectedShop.docs.map((doc) => (
                          <div key={doc} className="space-y-2 text-center">
                            <div className="h-32 bg-gray-50 dark:bg-secondary-dark rounded-2xl border border-border-light dark:border-border-dark flex flex-col items-center justify-center group hover:border-primary-light transition-all cursor-pointer">
                              <FileText size={24} className="text-text-secondary-light group-hover:text-primary-light mb-2" />
                              <span className="text-[10px] font-black text-text-secondary-light uppercase">{doc}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-gray-50/50 dark:bg-secondary-dark/30 border-t dark:border-border-dark flex gap-4">
                    <button 
                      onClick={() => {
                        addNotification({
                          title: 'Correction Requested',
                          message: `Shop "${selectedShop.shopName}" needs document corrections. Notified Agent & Sub-Admin.`,
                          type: 'warning'
                        });
                        setSelectedShop(null);
                      }} 
                      className="flex-1 py-4 bg-warning/10 text-warning rounded-2xl font-black text-xs hover:bg-warning/20"
                    >
                      Request Correction
                    </button>
                    <button 
                      onClick={() => {
                        addNotification({
                          title: 'Shop Rejected',
                          message: `Shop "${selectedShop.shopName}" has been rejected. Notified Agent & Sub-Admin.`,
                          type: 'error'
                        });
                        setSelectedShop(null);
                      }} 
                      className="flex-1 py-4 bg-error/10 text-error rounded-2xl font-black text-xs hover:bg-error/20"
                    >
                      Reject Shop
                    </button>
                    <button onClick={() => alert('Agent re-assigned')} className="flex-1 py-4 bg-blue-500/10 text-blue-500 rounded-2xl font-black text-xs hover:bg-blue-500/20">Change Agent</button>
                    <button 
                      onClick={() => {
                        addNotification({
                          title: 'Shop Approved',
                          message: `Shop "${selectedShop.shopName}" is now ACTIVE. Notified Agent & Sub-Admin.`,
                          type: 'success'
                        });
                        setSelectedShop(null);
                      }} 
                      className="flex-[2] py-4 bg-success text-white rounded-2xl font-black text-sm shadow-xl shadow-success/20 hover:scale-[1.02] transition-all"
                    >
                      Approve & Activate
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 'Sub Admin Management':
        const filteredSubAdmins = subAdmins.filter(sa => subAdminAccessFilter === 'All Levels' || sa.accessLevel === subAdminAccessFilter);

        return (
          <div className="p-8 space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div>
                <h3 className="text-2xl font-black dark:text-white tracking-tight">Sub Admin Management</h3>
                <p className="text-sm text-text-secondary-light mt-1">Manage sub-administrators, their permissions, and assigned territories.</p>
              </div>
              <div className="flex gap-3">
                <div className="relative group">
                  <select 
                    value={subAdminAccessFilter}
                    onChange={(e) => setSubAdminAccessFilter(e.target.value)}
                    className="btn-outline pl-4 pr-10 py-2.5 text-sm font-bold appearance-none cursor-pointer outline-none bg-transparent hover:border-primary-light transition-all"
                  >
                    <option>All Levels</option>
                    <option>State Wise</option>
                    <option>District Wise</option>
                    <option>Taluk Wise</option>
                    <option>Pincode Wise</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary-light group-hover:text-primary-light pointer-events-none" />
                </div>
                <button className="btn-primary px-6 py-2.5 text-sm font-bold shadow-lg shadow-primary-light/20 flex items-center gap-2">
                  <UserPlus size={18} /> Add Sub Admin
                </button>
              </div>
            </div>

            {/* Permission Context Note */}
            <div className="p-4 bg-primary-light/5 border border-primary-light/20 rounded-2xl flex items-start gap-4">
              <div className="p-2 bg-primary-light/10 text-primary-light rounded-xl"><Shield size={20}/></div>
              <div>
                <h4 className="font-bold dark:text-white text-sm">Important Permission Rule</h4>
                <p className="text-xs text-text-secondary-light mt-1">
                  <span className="font-bold">Admin</span> = Full access | <span className="font-bold">Sub Admin</span> = Assigned area access only | <span className="font-bold">Agent</span> = Self data only.<br/>
                  <span className="italic">Example: Sub Admin assigned to Chennai District can manage Chennai agents only.</span>
                </p>
              </div>
            </div>

            <div className="card-premium p-0 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-secondary-dark/30 text-left">
                      <th className="p-4 font-black text-[10px] text-text-secondary-light uppercase tracking-widest min-w-[200px]">Sub Admin Info</th>
                      <th className="p-4 font-black text-[10px] text-text-secondary-light uppercase tracking-widest min-w-[150px]">Contact</th>
                      <th className="p-4 font-black text-[10px] text-text-secondary-light uppercase tracking-widest min-w-[120px]">Access Level</th>
                      <th className="p-4 font-black text-[10px] text-text-secondary-light uppercase tracking-widest min-w-[180px]">Assigned Location</th>
                      <th className="p-4 font-black text-[10px] text-text-secondary-light uppercase tracking-widest min-w-[80px]">Agents</th>
                      <th className="p-4 font-black text-[10px] text-text-secondary-light uppercase tracking-widest min-w-[100px]">Status</th>
                      <th className="p-4 font-black text-[10px] text-text-secondary-light uppercase tracking-widest text-right min-w-[200px]">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-light dark:divide-border-dark">
                    {filteredSubAdmins.map((sa) => (
                      <tr key={sa.id} className="hover:bg-gray-50/50 dark:hover:bg-secondary-dark/20 transition-colors group">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary-light/10 text-primary-light rounded-xl flex items-center justify-center font-bold shrink-0">
                              {sa.name[0]}
                            </div>
                            <div className="whitespace-nowrap">
                              <p className="font-bold dark:text-white text-sm">{sa.name}</p>
                              <p className="text-[10px] font-bold text-text-secondary-light uppercase">ID: {sa.empId}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <p className="text-xs dark:text-white font-medium">{sa.phone}</p>
                          <p className="text-[10px] text-text-secondary-light">{sa.email}</p>
                        </td>
                        <td className="p-4">
                          <span className="px-2 py-1 bg-gray-100 dark:bg-secondary-dark rounded text-[10px] font-bold dark:text-white uppercase tracking-widest whitespace-nowrap">{sa.accessLevel}</span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-1.5 text-xs font-bold dark:text-white">
                            <Map size={12} className="text-primary-light" /> {sa.assignedLocation}
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="px-3 py-1 bg-blue-500/10 text-blue-500 rounded-lg text-xs font-black">{sa.agentsCount}</span>
                        </td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${
                            sa.status === 'Active' ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
                          }`}>
                            {sa.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            <button 
                              onClick={() => {
                                setSelectedSubAdmin(sa);
                                setSubAdminModalType('view');
                                setShowSubAdminModal(true);
                              }}
                              className="p-2 bg-gray-100 dark:bg-secondary-dark rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all text-text-secondary-light" 
                              title="View Details"
                            >
                              <Eye size={14} />
                            </button>
                            <button 
                              onClick={() => {
                                setSelectedSubAdmin(sa);
                                setSubAdminModalType('edit');
                                setShowSubAdminModal(true);
                              }}
                              className="p-2 bg-primary-light/10 text-primary-light rounded-xl hover:bg-primary-light hover:text-white transition-all" 
                              title="Edit Profile"
                            >
                              <Edit size={14} />
                            </button>
                            <button 
                              onClick={() => {
                                setSelectedSubAdmin(sa);
                                setSubAdminModalType('location');
                                setShowSubAdminModal(true);
                              }}
                              className="p-2 bg-blue-500/10 text-blue-500 rounded-xl hover:bg-blue-500 hover:text-white transition-all" 
                              title="Assign Location"
                            >
                              <Map size={14} />
                            </button>
                            <button 
                              onClick={() => {
                                setSelectedSubAdmin(sa);
                                setSubAdminModalType('agents');
                                setShowSubAdminModal(true);
                              }}
                              className="p-2 bg-purple-500/10 text-purple-500 rounded-xl hover:bg-purple-500 hover:text-white transition-all" 
                              title="Assign Agents"
                            >
                              <Users size={14} />
                            </button>
                            <button 
                              onClick={() => {
                                setSelectedSubAdmin(sa);
                                setSubAdminModalType('performance');
                                setShowSubAdminModal(true);
                              }}
                              className="p-2 bg-orange-500/10 text-orange-500 rounded-xl hover:bg-orange-500 hover:text-white transition-all" 
                              title="View Performance"
                            >
                              <TrendingUp size={14} />
                            </button>
                            <button 
                              onClick={() => {
                                const newStatus = sa.status === 'Active' ? 'Suspended' : 'Active';
                                setSubAdmins(subAdmins.map(s => s.id === sa.id ? { ...s, status: newStatus } : s));
                                addNotification({
                                  title: `Sub Admin ${newStatus}`,
                                  message: `${sa.name} has been ${newStatus.toLowerCase()}.`,
                                  type: newStatus === 'Active' ? 'success' : 'error'
                                });
                              }}
                              className={`p-2 rounded-xl transition-all ${
                                sa.status === 'Active' 
                                  ? 'bg-error/10 text-error hover:bg-error hover:text-white' 
                                  : 'bg-success/10 text-success hover:bg-success hover:text-white'
                              }`} 
                              title={sa.status === 'Active' ? 'Suspend' : 'Activate'}
                            >
                              {sa.status === 'Active' ? <XCircle size={14} /> : <CheckCircle size={14} />}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="p-20 text-center animate-in zoom-in duration-500">
            <div className="w-20 h-20 bg-primary-light/10 text-primary-light rounded-full flex items-center justify-center mx-auto mb-6">
              <Briefcase size={40} />
            </div>
            <h3 className="text-2xl font-bold dark:text-white mb-4">{activeTab} Section</h3>
            <p className="text-text-secondary-light max-w-md mx-auto">
              This module is currently being finalized. Please check back soon for the full management interface.
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
        <div className="h-20 p-6 border-b dark:border-border-dark flex items-center">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-primary-light dark:bg-primary-dark rounded-xl flex items-center justify-center shadow-lg shadow-primary-light/20 transition-transform">
              <span className="text-white font-black text-xl">A</span>
            </div>
            <div>
              <span className="font-black text-xl dark:text-white block leading-tight tracking-tight">Admin<span className="text-primary-light">Hub</span></span>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-4 custom-scrollbar">
          <SidebarSection title="Main">
            <SidebarLink icon={<LayoutDashboard size={18} />} label="Dashboard" active={activeTab === 'Dashboard'} onClick={() => setActiveTab('Dashboard')} />
          </SidebarSection>

          <SidebarSection title="Management">
            <SidebarLink icon={<Users size={18} />} label="Sub Admin Management" active={activeTab === 'Sub Admin Management'} onClick={() => setActiveTab('Sub Admin Management')} />
            <SidebarLink icon={<UserPlus size={18} />} label="Agent Management" active={activeTab === 'Agent Management'} onClick={() => setActiveTab('Agent Management')} />
          </SidebarSection>

          <SidebarSection title="Verification">
            <SidebarLink icon={<ShieldCheck size={18} />} label="KYC Approvals" active={activeTab === 'KYC Approvals'} onClick={() => setActiveTab('KYC Approvals')} badge="12" />
          </SidebarSection>

          <SidebarSection title="Business">
            <SidebarLink icon={<Store size={18} />} label="Shop Tie-Up Management" active={activeTab === 'Shop Tie-Up Management'} onClick={() => setActiveTab('Shop Tie-Up Management')} />
            <SidebarLink icon={<Percent size={18} />} label="Commission Management" active={activeTab === 'Commission Management'} onClick={() => setActiveTab('Commission Management')} />
          </SidebarSection>

          <SidebarSection title="Operations">
            <SidebarLink icon={<Target size={18} />} label="Target Management" active={activeTab === 'Target Management'} onClick={() => setActiveTab('Target Management')} />
            <SidebarLink icon={<Map size={18} />} label="Area Management" active={activeTab === 'Area Management'} onClick={() => setActiveTab('Area Management')} />
          </SidebarSection>

          <SidebarSection title="Analytics">
            <SidebarLink icon={<TrendingUp size={18} />} label="Revenue Analytics" active={activeTab === 'Revenue Analytics'} onClick={() => setActiveTab('Revenue Analytics')} />
            <SidebarLink icon={<BarChartIcon size={18} />} label="Reports" active={activeTab === 'Reports'} onClick={() => setActiveTab('Reports')} />
          </SidebarSection>

          <SidebarSection title="Communication">
            <SidebarLink icon={<Bell size={18} />} label="Notifications" active={activeTab === 'Notifications'} onClick={() => setActiveTab('Notifications')} />
            <SidebarLink icon={<LifeBuoy size={18} />} label="Support / Tickets" active={activeTab === 'Support / Tickets'} onClick={() => setActiveTab('Support / Tickets')} />
          </SidebarSection>

          <SidebarSection title="Growth">
            <SidebarLink icon={<Share2 size={18} />} label="Referral System" active={activeTab === 'Referral System'} onClick={() => setActiveTab('Referral System')} />
          </SidebarSection>

          <SidebarSection title="System">
            <SidebarLink icon={<Settings size={18} />} label="Settings" active={activeTab === 'Settings'} onClick={() => setActiveTab('Settings')} />
            <SidebarLink icon={<Key size={18} />} label="Role & Permissions" active={activeTab === 'Role & Permissions'} onClick={() => setActiveTab('Role & Permissions')} />
            <SidebarLink icon={<History size={18} />} label="Activity Log" active={activeTab === 'Activity Log'} onClick={() => setActiveTab('Activity Log')} />
          </SidebarSection>
        </div>

        <div className="p-4 border-t dark:border-border-dark">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center p-4 rounded-2xl cursor-pointer bg-error/5 hover:bg-error/10 border border-error/10 transition-all duration-500 group overflow-hidden relative shadow-sm"
          >
            <div className="relative z-10">
              <span className="font-black text-sm text-error/80 group-hover:text-error transition-colors tracking-widest uppercase">Logout</span>
            </div>
            
            {/* Shimmer Effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 ease-in-out"></div>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative bg-gray-50/50 dark:bg-background-dark/50">
        <header className="h-20 bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-md border-b border-border-light dark:border-border-dark flex items-center justify-between px-8 sticky top-0 z-30 shadow-sm">
          <div className="flex flex-col justify-center gap-1">
            <h2 className="text-xl font-black dark:text-white tracking-tight leading-none">{activeTab}</h2>
            <div className="flex items-center gap-1.5 text-[10px] text-text-secondary-light font-bold uppercase tracking-widest">
              <span>Admin</span>
              <ChevronRight size={10} className="opacity-40" />
              <span className="text-primary-light">{activeTab}</span>
            </div>
          </div>
          {/* Right Header: Theme Toggle & Profile */}
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleTheme}
              className="p-2.5 bg-gray-100 dark:bg-secondary-dark text-text-secondary-light dark:text-text-secondary-dark rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all active:scale-95"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} className="text-blue-600" />}
            </button>

            <button className="p-2.5 bg-gray-100 dark:bg-secondary-dark text-text-secondary-light dark:text-text-secondary-dark rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full ring-2 ring-surface-light dark:ring-surface-dark"></span>
            </button>
            <div className="flex items-center gap-4 pl-6 border-l-2 border-gray-100 dark:border-border-dark py-1">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-black dark:text-white leading-tight">AdminHub</p>
              </div>
              <div className="w-11 h-11 bg-primary-light dark:bg-primary-dark rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-primary-light/20 hover:scale-105 transition-transform cursor-pointer">
                A
              </div>
            </div>
          </div>
        </header>

        {renderContent()}
        <AddAgentModal 
          isOpen={showAddAgentModal} 
          onClose={() => setShowAddAgentModal(false)} 
        />
        <SubAdminActionModal 
          isOpen={showSubAdminModal}
          onClose={() => setShowSubAdminModal(false)}
          subAdmin={selectedSubAdmin}
          type={subAdminModalType}
        />
        <DeactivateUserModal 
          isOpen={showDeactivateModal}
          onClose={() => setShowDeactivateModal(false)}
          user={selectedSystemUser}
          reason={deactivateReason}
          setReason={setDeactivateReason}
          notes={deactivateNotes}
          setNotes={setDeactivateNotes}
          onConfirm={() => {
            setSystemUsers(systemUsers.map(u => u.id === selectedSystemUser.id ? { ...u, status: 'Blocked' } : u));
            setSystemActivityLogs([{
              id: Date.now(),
              user: 'Admin',
              action: `Deactivated User: ${selectedSystemUser.name}`,
              module: 'Security',
              timestamp: new Date().toLocaleString(),
              status: 'Success',
              ip: '192.168.1.1'
            }, ...systemActivityLogs]);
            addNotification({
              title: 'Account Deactivated',
              message: `User ${selectedSystemUser.name} has been blocked for: ${deactivateReason}`,
              type: 'error'
            });
            setShowDeactivateModal(false);
          }}
        />
        <AreaDetailsModal 
          isOpen={showAreaModal}
          onClose={() => setShowAreaModal(false)}
          area={selectedArea}
        />
      </main>
    </div>
  );
};

const SidebarSection = ({ title, children }) => (
  <div className="mb-6 last:mb-0">
    <h5 className="px-3 text-[10px] font-black text-text-secondary-light/50 uppercase tracking-[2px] mb-2">{title}</h5>
    <div className="space-y-1">
      {children}
    </div>
  </div>
);

const SidebarLink = ({ icon, label, active, badge, onClick }) => (
  <div 
    onClick={onClick}
    className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all duration-300 group ${
      active 
        ? 'bg-primary-light text-white shadow-lg shadow-primary-light/20 scale-[1.02]' 
        : 'text-text-secondary-light dark:text-text-secondary-dark hover:bg-gray-100 dark:hover:bg-secondary-dark hover:translate-x-1'
    }`}
  >
    <div className="flex items-center gap-3">
      <span className={`${active ? 'text-white' : 'group-hover:text-primary-light transition-colors'}`}>
        {icon}
      </span>
      <span className="font-bold text-xs tracking-tight">{label}</span>
    </div>
    {badge && (
      <span className={`px-2 py-0.5 text-[10px] font-black rounded-lg shadow-lg ${
        active ? 'bg-white text-primary-light' : 'bg-error text-white shadow-error/20'
      }`}>{badge}</span>
    )}
  </div>
);

const AddAgentModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-background-dark/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      ></div>
      
      <div className="relative w-full max-w-2xl bg-surface-light dark:bg-surface-dark rounded-3xl shadow-2xl border border-border-light dark:border-border-dark overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-8 border-b border-border-light dark:border-border-dark flex justify-between items-center bg-gray-50/50 dark:bg-secondary-dark/30">
          <div>
            <h3 className="text-2xl font-black dark:text-white tracking-tight">Register New Agent</h3>
            <p className="text-sm text-text-secondary-light mt-1">Fill in the details to add a new agent to the network.</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-secondary-dark rounded-xl transition-all hover:rotate-90"
          >
            <X size={20} className="dark:text-white" />
          </button>
        </div>

        <form className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-text-secondary-light ml-1">Full Name</label>
            <div className="relative group">
              <input 
                type="text" 
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light focus:bg-white dark:focus:bg-background-dark transition-all outline-none dark:text-white font-medium"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-text-secondary-light ml-1">Email Address</label>
            <input 
              type="email" 
              placeholder="john@example.com"
              className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light focus:bg-white dark:focus:bg-background-dark transition-all outline-none dark:text-white font-medium"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-text-secondary-light ml-1">Phone Number</label>
            <input 
              type="tel" 
              placeholder="+91 98765 43210"
              className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light focus:bg-white dark:focus:bg-background-dark transition-all outline-none dark:text-white font-medium"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-text-secondary-light ml-1">Agent Role</label>
            <select className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light focus:bg-white dark:focus:bg-background-dark transition-all outline-none dark:text-white font-medium appearance-none">
              <option>Pincode Agent</option>
              <option>Divisional Agent</option>
              <option>District Agent</option>
              <option>State Agent</option>
            </select>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-black uppercase tracking-widest text-text-secondary-light ml-1">Assigned Territory / Detail</label>
            <input 
              type="text" 
              placeholder="e.g. Maharashtra, Pune, 411001, or Electronics"
              className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light focus:bg-white dark:focus:bg-background-dark transition-all outline-none dark:text-white font-medium"
            />
          </div>

          <div className="md:col-span-2 pt-4 flex gap-4">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 py-4 rounded-2xl font-black text-sm border-2 border-border-light dark:border-border-dark dark:text-white hover:bg-gray-50 dark:hover:bg-secondary-dark transition-all"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-[2] py-4 rounded-2xl bg-primary-light text-white font-black text-sm shadow-xl shadow-primary-light/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Create Agent Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const SubAdminActionModal = ({ isOpen, onClose, subAdmin, type }) => {
  if (!isOpen || !subAdmin) return null;

  const getTitle = () => {
    switch (type) {
      case 'view': return 'Sub Admin Details';
      case 'edit': return 'Edit Sub Admin Profile';
      case 'location': return 'Assign Territory';
      case 'agents': return 'Assign Agents';
      case 'performance': return 'Performance Analytics';
      default: return 'Action';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'view': return <Eye size={24} />;
      case 'edit': return <Edit size={24} />;
      case 'location': return <Map size={24} />;
      case 'agents': return <Users size={24} />;
      case 'performance': return <TrendingUp size={24} />;
      default: return <Settings size={24} />;
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background-dark/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose}></div>
      <div className="relative w-full max-w-2xl bg-surface-light dark:bg-surface-dark rounded-3xl shadow-2xl border border-border-light dark:border-border-dark overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-6 border-b border-border-light dark:border-border-dark flex justify-between items-center bg-gray-50/50 dark:bg-secondary-dark/30">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary-light text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary-light/20">
              {getIcon()}
            </div>
            <div>
              <h3 className="text-xl font-black dark:text-white tracking-tight">{getTitle()}</h3>
              <p className="text-xs text-text-secondary-light font-bold uppercase tracking-widest">{subAdmin.name} • {subAdmin.empId}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-secondary-dark rounded-xl transition-all"><X size={20} className="dark:text-white" /></button>
        </div>

        <div className="p-8 space-y-6">
          {type === 'view' && (
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <p className="text-[10px] font-black text-text-secondary-light uppercase tracking-widest">Full Name</p>
                <p className="font-bold dark:text-white">{subAdmin.name}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-text-secondary-light uppercase tracking-widest">Employee ID</p>
                <p className="font-bold dark:text-white">{subAdmin.empId}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-text-secondary-light uppercase tracking-widest">Phone Number</p>
                <p className="font-bold dark:text-white">{subAdmin.phone}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-text-secondary-light uppercase tracking-widest">Email Address</p>
                <p className="font-bold dark:text-white">{subAdmin.email}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-text-secondary-light uppercase tracking-widest">Access Level</p>
                <p className="font-bold dark:text-white">{subAdmin.accessLevel}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-text-secondary-light uppercase tracking-widest">Assigned Location</p>
                <p className="font-bold dark:text-white">{subAdmin.assignedLocation}</p>
              </div>
            </div>
          )}

          {type === 'edit' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">Full Name</label>
                  <input type="text" defaultValue={subAdmin.name} className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-medium" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">Email</label>
                  <input type="email" defaultValue={subAdmin.email} className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-medium" />
                </div>
              </div>
              <button className="w-full btn-primary py-4 rounded-2xl font-black text-sm mt-4">Save Changes</button>
            </div>
          )}

          {type === 'location' && (
            <div className="space-y-4">
              <div className="p-4 bg-primary-light/5 border border-primary-light/10 rounded-2xl space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">Access Tier</label>
                  <select defaultValue={subAdmin.accessLevel} className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-medium appearance-none">
                    <option>State Wise</option>
                    <option>District Wise</option>
                    <option>Taluk Wise</option>
                    <option>Pincode Wise</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">Specific Location / Code</label>
                  <input type="text" placeholder="e.g. Tamil Nadu or 600001" defaultValue={subAdmin.assignedLocation} className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-medium" />
                </div>
              </div>
              <button className="w-full btn-primary py-4 rounded-2xl font-black text-sm">Update Territory</button>
            </div>
          )}

          {type === 'agents' && (
            <div className="space-y-4">
              <p className="text-sm text-text-secondary-light italic">Select agents from the list below to assign to {subAdmin.name}.</p>
              <div className="max-h-[300px] overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-secondary-dark rounded-xl border border-transparent hover:border-primary-light transition-all cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary-light/10 text-primary-light rounded-lg flex items-center justify-center font-bold text-xs">A{i}</div>
                      <div>
                        <p className="text-xs font-bold dark:text-white">Agent {i}</p>
                        <p className="text-[10px] text-text-secondary-light uppercase">Pincode: 60000{i}</p>
                      </div>
                    </div>
                    <div className="w-5 h-5 rounded border-2 border-gray-300 dark:border-gray-600 group-hover:border-primary-light"></div>
                  </div>
                ))}
              </div>
              <button className="w-full btn-primary py-4 rounded-2xl font-black text-sm">Assign Selected Agents</button>
            </div>
          )}

          {type === 'performance' && (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-success/5 rounded-2xl border border-success/10 text-center">
                  <p className="text-[10px] font-black text-success uppercase tracking-widest">Revenue</p>
                  <p className="text-xl font-black dark:text-white">₹4.2L</p>
                </div>
                <div className="p-4 bg-primary-light/5 rounded-2xl border border-primary-light/10 text-center">
                  <p className="text-[10px] font-black text-primary-light uppercase tracking-widest">Growth</p>
                  <p className="text-xl font-black dark:text-white">+12%</p>
                </div>
                <div className="p-4 bg-purple-500/5 rounded-2xl border border-purple-500/10 text-center">
                  <p className="text-[10px] font-black text-purple-500 uppercase tracking-widest">Shops</p>
                  <p className="text-xl font-black dark:text-white">86</p>
                </div>
              </div>
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={[
                    { name: 'W1', val: 400 }, { name: 'W2', val: 600 }, { name: 'W3', val: 500 }, { name: 'W4', val: 900 }
                  ]}>
                    <Line type="monotone" dataKey="val" stroke="#10B981" strokeWidth={3} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const DeactivateUserModal = ({ isOpen, onClose, user, reason, setReason, notes, setNotes, onConfirm }) => {
  if (!isOpen || !user) return null;

  const reasons = ['Fake Account', 'Illegal Activity', 'KYC Mismatch', 'Payment Fraud', 'Complaints', 'Policy Violation'];

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background-dark/80 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose}></div>
      <div className="relative w-full max-w-lg bg-surface-light dark:bg-surface-dark rounded-3xl shadow-2xl border border-border-light dark:border-border-dark overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-6 border-b border-border-light dark:border-border-dark flex justify-between items-center bg-error/5">
          <div className="flex items-center gap-3 text-error">
            <AlertCircle size={24} />
            <h3 className="text-lg font-black tracking-tight">Confirm Deactivation</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-secondary-dark rounded-xl transition-all"><X size={20} className="dark:text-white" /></button>
        </div>

        <div className="p-8 space-y-6">
          <div className="p-4 bg-gray-50 dark:bg-secondary-dark rounded-2xl border border-dashed border-border-light dark:border-border-dark">
            <p className="text-sm dark:text-white font-medium text-center">Are you sure you want to deactivate <span className="font-bold text-error">{user.name}</span>'s account? This will immediately block their access.</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">Deactivation Reason</label>
              <select 
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-error outline-none dark:text-white font-medium appearance-none"
              >
                {reasons.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">Additional Notes</label>
              <textarea 
                placeholder="Explain why this account is being deactivated..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-error outline-none dark:text-white font-medium h-24 resize-none"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button onClick={onClose} className="flex-1 py-4 rounded-2xl font-black text-sm border-2 border-border-light dark:border-border-dark dark:text-white hover:bg-gray-50 transition-all">Cancel</button>
            <button onClick={onConfirm} className="flex-1 py-4 rounded-2xl bg-error text-white font-black text-sm shadow-xl shadow-error/20 hover:scale-[1.02] active:scale-[0.98] transition-all">Deactivate Account</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AreaDetailsModal = ({ isOpen, onClose, area }) => {
  if (!isOpen || !area) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background-dark/80 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose}></div>
      <div className="relative w-full max-w-2xl bg-surface-light dark:bg-surface-dark rounded-3xl shadow-2xl border border-border-light dark:border-border-dark overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-6 border-b border-border-light dark:border-border-dark flex justify-between items-center bg-primary-light/5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary-light text-white rounded-xl flex items-center justify-center shadow-lg">
              <MapPin size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black dark:text-white tracking-tight uppercase">Area Details: {area.pincode}</h3>
              <p className="text-sm text-text-secondary-light font-bold">{area.district}, {area.state}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-secondary-dark rounded-xl transition-all"><X size={20} className="dark:text-white" /></button>
        </div>

        <div className="p-8 space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-50 dark:bg-secondary-dark rounded-2xl border border-border-light dark:border-border-dark">
              <p className="text-[10px] font-black text-text-secondary-light uppercase tracking-widest">Shops Count</p>
              <p className="text-2xl font-black dark:text-white mt-1">{area.shops}</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-secondary-dark rounded-2xl border border-border-light dark:border-border-dark">
              <p className="text-[10px] font-black text-text-secondary-light uppercase tracking-widest">Coverage %</p>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-2xl font-black dark:text-white">{area.coverage}%</p>
                <div className="flex-1 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-success transition-all duration-1000" style={{ width: `${area.coverage}%` }}></div>
                </div>
              </div>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-secondary-dark rounded-2xl border border-border-light dark:border-border-dark">
              <p className="text-[10px] font-black text-text-secondary-light uppercase tracking-widest">Pending Requests</p>
              <p className="text-2xl font-black text-warning mt-1">{area.pendingRequests}</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-secondary-dark rounded-2xl border border-border-light dark:border-border-dark">
              <p className="text-[10px] font-black text-text-secondary-light uppercase tracking-widest">Area Status</p>
              <p className="text-xs font-black text-primary-light mt-1 uppercase tracking-tighter">{area.status}</p>
            </div>
          </div>

          {/* Agent Information */}
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-primary-light flex items-center gap-2">
              <User size={14} /> Assigned Agent Details
            </h4>
            {area.agent === 'None' ? (
              <div className="p-6 border-2 border-dashed border-border-light dark:border-border-dark rounded-2xl text-center">
                <p className="text-sm text-text-secondary-light font-medium italic">No agent assigned to this territory yet.</p>
                <button className="mt-3 btn-primary px-4 py-2 text-xs">Assign Now</button>
              </div>
            ) : (
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-secondary-dark rounded-2xl border border-border-light dark:border-border-dark">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-primary-light/10 text-primary-light rounded-2xl flex items-center justify-center font-black text-xl">
                    {area.agent[0]}
                  </div>
                  <div>
                    <h5 className="font-bold dark:text-white">{area.agent}</h5>
                    <p className="text-xs text-text-secondary-light uppercase font-bold tracking-widest">Pincode Agent • Active</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-[10px] font-bold text-text-secondary-light flex items-center gap-1"><Store size={10} /> 42 Shops Managed</span>
                      <span className="text-[10px] font-bold text-text-secondary-light flex items-center gap-1"><CheckCircle size={10} /> 98% Perf.</span>
                    </div>
                  </div>
                </div>
                <button className="btn-outline px-4 py-2 text-xs font-bold">View Profile</button>
              </div>
            )}
          </div>

          {/* Coverage Map Placeholder */}
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-primary-light flex items-center gap-2">
              <Map size={14} /> Coverage Heatmap
            </h4>
            <div className="h-40 bg-gray-100 dark:bg-background-dark rounded-2xl border border-border-light dark:border-border-dark flex items-center justify-center relative overflow-hidden group">
              <Map size={48} className="text-text-secondary-light/20 group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-primary-light/5"></div>
              <p className="absolute bottom-4 text-[10px] font-black text-text-secondary-light/60 uppercase tracking-widest">Visual Data Map Integration Active</p>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button onClick={onClose} className="flex-1 py-4 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-2xl font-black text-sm dark:text-white hover:bg-gray-100 transition-all">Close</button>
            <button className="flex-1 py-4 bg-primary-light text-white rounded-2xl font-black text-sm shadow-xl shadow-primary-light/20 hover:scale-[1.02] active:scale-[0.98] transition-all">Manage Territory</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
