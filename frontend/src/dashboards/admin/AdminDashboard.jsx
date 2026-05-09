import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  UserCheck, Briefcase, Megaphone, Sun, Moon, Eye, User, FileText, Shield, MapPin, Coins, Wallet, Trophy, Calendar, Zap, Navigation, Download, ArrowUpRight, ArrowDownRight, PieChart, Activity, FileSpreadsheet, Layout, MessageSquare, Send, Smartphone, Mail, Plus, Headset, Ticket, Paperclip, Smile, Link2, Copy, Gift, Camera, Fingerprint, Monitor, Check
} from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const { notifications, addNotification, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overview');
  const [showAddAgentModal, setShowAddAgentModal] = useState(false);
  const [showAddSubAdminModal, setShowAddSubAdminModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
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
  const [showSetTargetModal, setShowSetTargetModal] = useState(false);
  const [showNotificationsMenu, setShowNotificationsMenu] = useState(false);
  const [showBulkPayoutModal, setShowBulkPayoutModal] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showForecastModal, setShowForecastModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showCustomReportModal, setShowCustomReportModal] = useState(false);
  const [showTemplatesModal, setShowTemplatesModal] = useState(false);
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);
  const [showLiveChatModal, setShowLiveChatModal] = useState(false);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [showCampaignSettingsModal, setShowCampaignSettingsModal] = useState(false);
  const [showTrackLinksModal, setShowTrackLinksModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showTwoFAModal, setShowTwoFAModal] = useState(false);
  const [showSessionsModal, setShowSessionsModal] = useState(false);
  const [showCreateRoleModal, setShowCreateRoleModal] = useState(false);
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);
  const [showManageAccessModal, setShowManageAccessModal] = useState(false);
  const [showAddServicePartnerModal, setShowAddServicePartnerModal] = useState(false);
  const [showAddProductPartnerModal, setShowAddProductPartnerModal] = useState(false);
  
  const [categories, setCategories] = useState([
    { id: 1, name: 'Food / Restaurant', icon: 'Utensils', count: 42, status: 'Active', color: 'bg-orange-500/10 text-orange-500' },
    { id: 2, name: 'Grocery', icon: 'ShoppingBag', count: 124, status: 'Active', color: 'bg-emerald-500/10 text-emerald-500' },
    { id: 3, name: 'Hospital', icon: 'HeartPulse', count: 12, status: 'Active', color: 'bg-red-500/10 text-red-500' },
    { id: 4, name: 'Medicine / Pharmacy', icon: 'Pill', count: 45, status: 'Active', color: 'bg-blue-500/10 text-blue-500' },
    { id: 5, name: 'Fashion', icon: 'Shirt', count: 85, status: 'Active', color: 'bg-purple-500/10 text-purple-500' },
    { id: 6, name: 'Electronics', icon: 'Zap', count: 64, status: 'Active', color: 'bg-yellow-500/10 text-yellow-500' },
    { id: 7, name: 'Beauty / Salon', icon: 'Scissors', count: 28, status: 'Active', color: 'bg-pink-500/10 text-pink-500' },
    { id: 8, name: 'Education', icon: 'GraduationCap', count: 15, status: 'Inactive', color: 'bg-indigo-500/10 text-indigo-500' },
    { id: 9, name: 'Services', icon: 'Wrench', count: 92, status: 'Active', color: 'bg-gray-500/10 text-gray-500' },
    { id: 10, name: 'Others', icon: 'MoreHorizontal', count: 10, status: 'Active', color: 'bg-slate-500/10 text-slate-500' }
  ]);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [agentModalType, setAgentModalType] = useState(null); // 'view', 'edit', 'map', 'team', 'performance'
  const [showAgentModal, setShowAgentModal] = useState(false);
  
  const [showShopModal, setShowShopModal] = useState(false);
  const [shopModalType, setShopModalType] = useState(null); // 'view', 'edit', 'approve', 'correction', 'assign'
  
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
  
  const [states, setStates] = useState([
    { id: 1, name: 'Tamil Nadu', code: 'TN', districts: 38, agents: 450, status: 'Active' },
    { id: 2, name: 'Karnataka', code: 'KA', districts: 31, agents: 320, status: 'Active' },
    { id: 3, name: 'Maharashtra', code: 'MH', districts: 36, agents: 280, status: 'Active' },
    { id: 4, name: 'Kerala', code: 'KL', districts: 14, agents: 150, status: 'Inactive' }
  ]);

  const [districts, setDistricts] = useState([
    { id: 1, name: 'Chennai', state: 'Tamil Nadu', taluks: 10, agents: 120, status: 'Active' },
    { id: 2, name: 'Coimbatore', state: 'Tamil Nadu', taluks: 11, agents: 85, status: 'Active' },
    { id: 3, name: 'Bangalore Urban', state: 'Karnataka', taluks: 5, agents: 140, status: 'Active' },
    { id: 4, name: 'Mumbai City', state: 'Maharashtra', taluks: 3, agents: 95, status: 'Active' }
  ]);

  const [taluks, setTaluks] = useState([
    { id: 1, name: 'Ambattur', district: 'Chennai', state: 'Tamil Nadu', pincodes: 8, agents: 24, status: 'Active' },
    { id: 2, name: 'Guindy', district: 'Chennai', state: 'Tamil Nadu', pincodes: 5, agents: 18, status: 'Active' },
    { id: 3, name: 'Electronic City', district: 'Bangalore Urban', state: 'Karnataka', pincodes: 4, agents: 32, status: 'Active' }
  ]);

  const [pincodes, setPincodes] = useState([
    { id: 1, code: '600053', taluk: 'Ambattur', district: 'Chennai', state: 'Tamil Nadu', agents: 5, status: 'Active' },
    { id: 2, code: '600032', taluk: 'Guindy', district: 'Chennai', state: 'Tamil Nadu', agents: 3, status: 'Active' },
    { id: 3, code: '560100', taluk: 'Electronic City', district: 'Bangalore Urban', state: 'Karnataka', agents: 7, status: 'Active' }
  ]);

  const [showAreaHierarchyModal, setShowAreaHierarchyModal] = useState(false);
  const [areaModalType, setAreaModalType] = useState('State'); 
  const [showAreaModal, setShowAreaModal] = useState(false);
  const [selectedArea, setSelectedArea] = useState(null);

  const [subAdminAccessFilter, setSubAdminAccessFilter] = useState('All Levels');
  const [selectedSubAdmin, setSelectedSubAdmin] = useState(null);
  const [subAdminModalType, setSubAdminModalType] = useState(null); // 'view', 'edit', 'location', 'agents', 'performance'
  const [showSubAdminModal, setShowSubAdminModal] = useState(false);

  const [agents, setAgents] = useState([
    { id: 1, name: 'Amit Singh', role: 'State Agent', territory: 'Maharashtra', status: 'Active' },
    { id: 2, name: 'Priya Verma', role: 'District Agent', territory: 'Pune', status: 'Active' },
    { id: 3, name: 'Rahul Dev', role: 'Pincode Agent', territory: '411001', status: 'Inactive' },
    { id: 4, name: 'Sanjay Dutt', role: 'Divisional Agent', territory: 'Electronics', status: 'Active' },
  ]);

  const [documentVerifications, setDocumentVerifications] = useState([
    {
      id: 1,
      entityName: 'Fresh Grocery Mart',
      type: 'Shop',
      owner: 'Rajesh Kumar',
      documents: [
        { id: 'd1', name: 'Shop License', status: 'Pending', fileType: 'PDF', size: '1.2 MB' },
        { id: 'd2', name: 'GST Certificate', status: 'Verified', fileType: 'PDF', size: '800 KB' },
        { id: 'd3', name: 'Rent Agreement', status: 'Pending', fileType: 'Image', size: '2.5 MB' }
      ],
      submittedAt: '2 hours ago',
      priority: 'High',
      status: 'Action Required'
    },
    {
      id: 2,
      entityName: 'Vijay Electronics',
      type: 'Shop',
      owner: 'Vijay Mallya',
      documents: [
        { id: 'd4', name: 'Shop License', status: 'Pending', fileType: 'PDF', size: '1.5 MB' },
        { id: 'd5', name: 'Owner ID Proof', status: 'Pending', fileType: 'Image', size: '1.8 MB' }
      ],
      submittedAt: '5 hours ago',
      priority: 'Medium',
      status: 'Pending'
    },
    {
      id: 3,
      entityName: 'Style Fashion Hub',
      type: 'Product Partner',
      owner: 'Anjali Sharma',
      documents: [
        { id: 'd6', name: 'Business Registration', status: 'Pending', fileType: 'PDF', size: '2.1 MB' },
        { id: 'd7', name: 'Identity Proof', status: 'Pending', fileType: 'PDF', size: '900 KB' }
      ],
      submittedAt: 'Yesterday',
      priority: 'Low',
      status: 'Pending'
    }
  ]);

  const [selectedVerification, setSelectedVerification] = useState(null);
  const [showVerificationModal, setShowVerificationModal] = useState(false);

  const [systemUsers, setSystemUsers] = useState([
    { id: 1, name: 'Amit Kumar', role: 'Sub Admin', phone: '+91 98765 43210', email: 'amit@adminhub.com', location: 'Delhi', status: 'Active', lastLogin: '2026-05-04 10:30', riskLevel: 'Low' },
    { id: 2, name: 'Rajesh Singh', role: 'Agent', phone: '+91 87654 32109', email: 'rajesh@agent.com', location: 'Mumbai', status: 'Suspended', lastLogin: '2026-05-03 15:45', riskLevel: 'Medium' },
    { id: 3, name: 'Sunil Verma', role: 'Shop Owner', phone: '+91 76543 21098', email: 'sunil@shop.com', location: 'Pune', status: 'Deactivated', lastLogin: '2026-04-28 09:12', riskLevel: 'High' },
    { id: 4, name: 'Priya Das', role: 'Customer', phone: '+91 65432 10987', email: 'priya@gmail.com', location: 'Kolkata', status: 'Blocked', lastLogin: '2026-05-01 18:20', riskLevel: 'Critical' },
    { id: 5, name: 'Suresh Raina', role: 'Agent', phone: '+91 54321 09876', email: 'suresh@agent.com', location: 'Chennai', status: 'Pending Approval', lastLogin: 'N/A', riskLevel: 'Low' }
  ]);

  const handleDeleteAgent = (id) => {
    if (window.confirm('Are you sure you want to remove this agent?')) {
      setAgents(agents.filter(a => a.id !== id));
      addNotification({ title: 'Agent Removed', message: 'The agent profile has been deleted.', type: 'success' });
    }
  };

  const handleDeleteSubAdmin = (id) => {
    if (window.confirm('Are you sure you want to remove this sub-admin?')) {
      setSubAdmins(subAdmins.filter(sa => sa.id !== id));
      addNotification({ title: 'Sub-Admin Removed', message: 'The sub-admin profile has been deleted.', type: 'success' });
    }
  };

  const handleDeleteShop = (id) => {
    if (window.confirm('Are you sure you want to remove this shop tie-up?')) {
      setShopTieUps(shopTieUps.filter(s => s.id !== id));
      addNotification({ title: 'Shop Removed', message: 'The shop partnership has been terminated.', type: 'success' });
    }
  };

  const handleDeleteCategory = (id) => {
    if (window.confirm('Are you sure you want to delete this category? This may affect shops assigned to it.')) {
      setCategories(categories.filter(c => c.id !== id));
      addNotification({ title: 'Category Deleted', message: 'The business category has been removed.', type: 'error' });
    }
  };

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

  const [areaPerformanceData] = useState([
    { name: 'Maharashtra', revenue: 450000, shops: 124, growth: '+15%' },
    { name: 'Karnataka', revenue: 320000, shops: 95, growth: '+8%' },
    { name: 'Tamil Nadu', revenue: 280000, shops: 88, growth: '+12%' },
    { name: 'Delhi', revenue: 520000, shops: 156, growth: '+20%' },
    { name: 'Kerala', revenue: 150000, shops: 42, growth: '-2%' },
  ]);

  const [agentPerformanceData] = useState([
    { name: 'Amit Singh', shops: 52, revenue: '₹4.2L', rating: 4.8, status: 'Top Performer' },
    { name: 'Priya Verma', shops: 38, revenue: '₹2.8L', rating: 4.5, status: 'Consistent' },
    { name: 'Vikram Batra', shops: 45, revenue: '₹3.5L', rating: 4.2, status: 'Average' },
    { name: 'Rajesh Kumar', shops: 28, revenue: '₹2.1L', rating: 4.0, status: 'Needs Support' },
    { name: 'Sneha Patel', shops: 64, revenue: '₹5.5L', rating: 4.9, status: 'Top Performer' },
  ]);

  const [shopCategoryPerformance] = useState([
    { name: 'Grocery', value: 45 },
    { name: 'Electronics', value: 25 },
    { name: 'Fashion', value: 15 },
    { name: 'Services', value: 10 },
    { name: 'Others', value: 5 },
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

  const [servicePartners, setServicePartners] = useState([
    { id: 1, name: 'Swift Logistics', category: 'Logistics', contact: 'John Doe', status: 'Active', joined: '2026-01-10', email: 'contact@swift.com', performance: 'Excellent' },
    { id: 2, name: 'Tech Solutions', category: 'IT Support', contact: 'Sarah Smith', status: 'Active', joined: '2026-02-15', email: 'sarah@techsol.com', performance: 'Good' },
    { id: 3, name: 'Eco Delivery', category: 'Logistics', contact: 'Mike Ross', status: 'Inactive', joined: '2026-03-20', email: 'mike@ecodel.com', performance: 'Average' },
    { id: 4, name: 'Secure Guard', category: 'Security', contact: 'Robert C.', status: 'Active', joined: '2026-04-05', email: 'rob@secure.com', performance: 'Excellent' }
  ]);

  const [productPartners, setProductPartners] = useState([
    { id: 1, name: 'Global Electronics', category: 'Electronics', representative: 'Alex Johnson', status: 'Active', rating: 4.8, products: 124, commission: '8%' },
    { id: 2, name: 'Fresh Farm Co', category: 'FMCG', representative: 'Emma Wilson', status: 'Active', rating: 4.5, products: 450, commission: '5%' },
    { id: 3, name: 'Style & Grace', category: 'Fashion', representative: 'Oliver Brown', status: 'Active', rating: 4.2, products: 85, commission: '12%' },
    { id: 4, name: 'Pure Water', category: 'Beverages', representative: 'Lucy H.', status: 'Inactive', rating: 3.9, products: 12, commission: '6%' }
  ]);

  const [serviceSearchTerm, setServiceSearchTerm] = useState('');
  const [productSearchTerm, setProductSearchTerm] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const { data } = await axios.get('http://localhost:5000/api/agents', config);
        
        const formattedAgents = data.map(a => ({
          id: a._id,
          name: a.name,
          role: a.role,
          territory: a.territory?.pincode || 'Not Set',
          status: a.status
        }));
        setAgents(formattedAgents);
      } catch (error) {
        console.error('Error fetching agents:', error);
      }
    };
    if (user?.token) fetchData();
  }, [user]);

  const handleAddAgent = async (agentData) => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.post('http://localhost:5000/api/agents', agentData, config);
      
      const newAgent = {
        id: data._id,
        name: data.name,
        role: data.role,
        territory: data.territory?.pincode || 'Not Set',
        status: data.status
      };
      
      setAgents([...agents, newAgent]);
      addNotification({ title: 'Agent Added', message: `${data.name} registered successfully.`, type: 'success' });
      setShowAddAgentModal(false);
    } catch (error) {
      addNotification({ title: 'Registration Error', message: error.response?.data?.message || error.message, type: 'error' });
    }
  };

  const handleApproveVerification = (entityId, docId = null) => {
    if (docId) {
      // Approve specific document
      setDocumentVerifications(prev => prev.map(v => 
        v.id === entityId 
          ? { ...v, documents: v.documents.map(d => d.id === docId ? { ...d, status: 'Verified' } : d) }
          : v
      ));
      addNotification({ title: 'Document Verified', message: 'Document has been approved.', type: 'success' });
    } else {
      // Approve entire entity
      setDocumentVerifications(prev => prev.map(v => v.id === entityId ? { ...v, status: 'Approved' } : v));
      setKycData(prev => prev.map(k => k.id === entityId ? { ...k, status: 'Approved' } : k));
      addNotification({ title: 'KYC Approved', message: 'The entity has been fully approved.', type: 'success' });
    }
  };

  const handleRejectVerification = (entityId) => {
    setDocumentVerifications(prev => prev.map(v => v.id === entityId ? { ...v, status: 'Rejected' } : v));
    setKycData(prev => prev.map(k => k.id === entityId ? { ...k, status: 'Rejected' } : k));
    addNotification({ title: 'KYC Rejected', message: 'The entity has been rejected.', type: 'error' });
  };

  const stats = [
    { title: 'Total Agents', value: '1,248', icon: <Users />, color: 'bg-blue-500', trend: '+8.4%' },
    { title: 'Active Shops', value: '452', icon: <Store />, color: 'bg-orange-500', trend: '+18.4%' },
    { title: 'Pending KYC', value: '12', icon: <ShieldCheck />, color: 'bg-error', trend: 'Action Required' },
    { title: 'Active Partners', value: '24', icon: <Briefcase />, color: 'bg-purple-500', trend: '+2.5%' },
  ];

  const registrationTrendData = [
    { name: 'Mon', agents: 12, shops: 45 },
    { name: 'Tue', agents: 18, shops: 38 },
    { name: 'Wed', agents: 15, shops: 52 },
    { name: 'Thu', agents: 22, shops: 40 },
    { name: 'Fri', agents: 30, shops: 65 },
    { name: 'Sat', agents: 25, shops: 58 },
    { name: 'Sun', agents: 28, shops: 72 },
  ];

  const chartData = [
    { name: 'Jan', revenue: 45000 },
    { name: 'Feb', revenue: 52000 },
    { name: 'Mar', revenue: 48000 },
    { name: 'Apr', revenue: 61000 },
    { name: 'May', revenue: 55000 },
    { name: 'Jun', revenue: 67000 },
    { name: 'Jul', revenue: 72000 },
    { name: 'Aug', revenue: 68000 },
    { name: 'Sep', revenue: 79000 },
    { name: 'Oct', revenue: 84000 },
    { name: 'Nov', revenue: 91000 },
    { name: 'Dec', revenue: 98000 },
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
                  <h3 className="text-lg font-bold dark:text-white">Registration Trends</h3>
                  <select className="bg-gray-100 dark:bg-secondary-dark border-none rounded-lg text-sm dark:text-white px-3 py-1">
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                  </select>
                </div>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={registrationTrendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.1} />
                      <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                      <YAxis stroke="#94a3b8" fontSize={12} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0F172A', border: 'none', borderRadius: '12px', color: '#fff' }}
                        itemStyle={{ color: '#10B981' }}
                      />
                      <Line type="monotone" dataKey="shops" stroke="#10B981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} name="Shops" />
                      <Line type="monotone" dataKey="agents" stroke="#3B82F6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} name="Agents" />
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
                    {agents
                    .filter(agent => 
                      (roleFilter === 'All Roles' || agent.role === roleFilter) &&
                      (agent.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                       agent.territory.toLowerCase().includes(searchTerm.toLowerCase()))
                    )
                    .map((agent) => (
                      <tr key={agent.id} className="hover:bg-gray-50 dark:hover:bg-secondary-dark/50 transition-colors group">
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
                          <div className="flex justify-end gap-1.5">
                            <button 
                              onClick={() => {
                                setSelectedAgent(agent);
                                setAgentModalType('view');
                                setShowAgentModal(true);
                              }}
                              className="p-2 bg-gray-100 dark:bg-secondary-dark rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-200 transition-all"
                              title="View Details"
                            >
                              <Eye size={14} />
                            </button>
                            <button 
                              onClick={() => {
                                setSelectedAgent(agent);
                                setAgentModalType('edit');
                                setShowAgentModal(true);
                              }}
                              className="p-2 bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl hover:bg-emerald-200 transition-all"
                              title="Edit Agent"
                            >
                              <Edit size={14} />
                            </button>
                            <button 
                              onClick={() => {
                                setSelectedAgent(agent);
                                setAgentModalType('map');
                                setShowAgentModal(true);
                              }}
                              className="p-2 bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl hover:bg-blue-200 transition-all"
                              title="Map Territory"
                            >
                              <Map size={14} />
                            </button>
                            <button 
                              onClick={() => {
                                setSelectedAgent(agent);
                                setAgentModalType('team');
                                setShowAgentModal(true);
                              }}
                              className="p-2 bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-xl hover:bg-purple-200 transition-all"
                              title="View Team"
                            >
                              <Users size={14} />
                            </button>
                            <button 
                              onClick={() => {
                                setSelectedAgent(agent);
                                setAgentModalType('performance');
                                setShowAgentModal(true);
                              }}
                              className="p-2 bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 rounded-xl hover:bg-orange-200 transition-all"
                              title="Performance"
                            >
                              <TrendingUp size={14} />
                            </button>
                            <button 
                              onClick={() => {
                                const newStatus = agent.status === 'Active' ? 'Inactive' : 'Active';
                                setAgents(agents.map(a => a.id === agent.id ? { ...a, status: newStatus } : a));
                                addNotification({ title: `Agent ${newStatus}`, message: `${agent.name} is now ${newStatus.toLowerCase()}.`, type: newStatus === 'Active' ? 'success' : 'error' });
                              }}
                              className="p-2 bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-200 transition-all"
                              title={agent.status === 'Active' ? 'Suspend Agent' : 'Activate Agent'}
                            >
                              <XCircle size={14} />
                            </button>
                            <button 
                              onClick={() => handleDeleteAgent(agent.id)}
                              className="p-2 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
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
          </div>
        );


      case 'KYC Verification':
      case 'KYC Approvals': {
        const kycData = [
          { 
            id: 1, 
            name: 'Arjun Reddy', 
            role: 'District Agent', 
            location: 'Hyderabad', 
            date: '2 hours ago', 
            status: 'Pending',
            details: {
              territory: { state: 'Telangana', district: 'Hyderabad', division: 'South', pincode: '500001' },
              bankDetails: { bankName: 'HDFC Bank', accNo: 'XXXXXX9842', ifsc: 'HDFC0001234' },
              paymentDetails: { amount: '₹15,000', txnId: 'UTR9988776655', date: '2026-05-04' },
              kycDocs: { aadharFront: true, aadharBack: true, panCard: true, bankPassbook: true }
            }
          },
          { 
            id: 2, 
            name: 'Modern Electronics', 
            role: 'Shop Owner', 
            location: 'Bangalore', 
            date: '5 hours ago', 
            status: 'Under Review',
            details: {
              territory: { state: 'Karnataka', district: 'Bangalore', division: 'Central', pincode: '560001' },
              bankDetails: { bankName: 'ICICI Bank', accNo: 'XXXXXX5521', ifsc: 'ICIC0005521' },
              paymentDetails: { amount: '₹5,000', txnId: 'UTR5544332211', date: '2026-05-05' },
              kycDocs: { gstCert: true, tradeLicense: true, panCard: true, shopPhoto: true }
            }
          },
          { 
            id: 3, 
            name: 'Vikram Batra', 
            role: 'State Agent', 
            location: 'Delhi', 
            date: 'Yesterday', 
            status: 'Pending',
            details: {
              territory: { state: 'Delhi', district: 'New Delhi', division: 'North', pincode: '110001' },
              bankDetails: { bankName: 'SBI', accNo: 'XXXXXX2211', ifsc: 'SBIN0000001' },
              paymentDetails: { amount: '₹50,000', txnId: 'UTR1122334455', date: '2026-05-03' },
              kycDocs: { aadharFront: true, aadharBack: true, panCard: true, businessCert: true }
            }
          }
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
      }


      case 'Target Management':
        return (
          <div className="p-8 space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold dark:text-white">Incentive & Sales Targets</h3>
              <button 
                onClick={() => setShowSetTargetModal(true)}
                className="btn-primary px-4 py-2 text-sm flex items-center gap-2"
              >
                <Target size={18} /> Set New Target
              </button>
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
              <button 
                onClick={() => setShowMapModal(true)}
                className="btn-primary px-6 py-3 rounded-2xl text-sm flex items-center gap-2 shadow-xl shadow-primary-light/20"
              >
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
                              <button 
                                onClick={() => {
                                  setEditingItem(area);
                                  // Implementation for Area Editing would go here
                                  addNotification({ title: 'Edit Area', message: `Editing territory ${area.pincode}`, type: 'info' });
                                }}
                                className="p-2 hover:bg-primary-light/10 text-text-secondary-light hover:text-primary-light rounded-xl transition-all" 
                                title="Edit Territory"
                              >
                                <Edit size={16} />
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

      case 'Document Verification':
        return (
          <div className="p-8 space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div>
                <h3 className="text-2xl font-black dark:text-white tracking-tight leading-none uppercase">Document Verification</h3>
                <p className="text-sm text-text-secondary-light mt-1">Review business certifications and legal documents.</p>
              </div>
              <div className="flex gap-3">
                <div className="flex bg-gray-100 dark:bg-secondary-dark p-1 rounded-xl">
                  <button className="px-4 py-2 text-xs font-black bg-white dark:bg-surface-dark shadow-sm rounded-lg dark:text-white">Pending</button>
                  <button className="px-4 py-2 text-xs font-black text-text-secondary-light hover:text-primary-light transition-colors">Verified</button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {documentVerifications.map((verify) => (
                <div key={verify.id} className="card-premium group hover:border-primary-light/30 transition-all duration-300">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner ${
                        verify.type === 'Shop' ? 'bg-primary-light/10 text-primary-light' : 'bg-accent-light/10 text-accent-light'
                      }`}>
                        {verify.type === 'Shop' ? <Store size={24} /> : <Briefcase size={24} />}
                      </div>
                      <div>
                        <div className="flex items-center gap-3">
                          <h4 className="font-black dark:text-white text-lg tracking-tight">{verify.entityName}</h4>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                            verify.priority === 'High' ? 'bg-error/10 text-error' : 
                            verify.priority === 'Medium' ? 'bg-warning/10 text-warning' : 'bg-blue-500/10 text-blue-500'
                          }`}>
                            {verify.priority} Priority
                          </span>
                        </div>
                        <p className="text-sm font-bold text-text-secondary-light flex items-center gap-2 mt-1">
                          <User size={14} className="opacity-50" /> {verify.owner} • {verify.type}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-6 lg:border-l lg:border-border-light dark:lg:border-border-dark lg:pl-6">
                      <div className="space-y-1">
                        <p className="text-[10px] font-black text-text-secondary-light uppercase tracking-widest">Documents</p>
                        <div className="flex items-center gap-2">
                          <div className="flex -space-x-2">
                            {verify.documents.map((doc, idx) => (
                              <div key={idx} className={`w-8 h-8 rounded-lg border-2 border-surface-light dark:border-surface-dark flex items-center justify-center text-white text-[10px] font-black ${
                                doc.status === 'Verified' ? 'bg-success' : 'bg-gray-400'
                              }`} title={doc.name}>
                                {doc.name[0]}
                              </div>
                            ))}
                          </div>
                          <span className="text-xs font-bold dark:text-white">
                            {verify.documents.filter(d => d.status === 'Verified').length}/{verify.documents.length} Verified
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <p className="text-[10px] font-black text-text-secondary-light uppercase tracking-widest">Submitted</p>
                        <p className="text-xs font-bold dark:text-white flex items-center gap-1.5">
                          <Clock size={12} className="text-primary-light" /> {verify.submittedAt}
                        </p>
                      </div>

                      <div className="flex gap-2 ml-auto lg:ml-0">
                        <button 
                          onClick={() => {
                            setSelectedVerification(verify);
                            setShowVerificationModal(true);
                          }}
                          className="px-6 py-3 bg-primary-light text-white rounded-xl font-black text-xs shadow-lg shadow-primary-light/20 hover:scale-[1.05] active:scale-[0.95] transition-all flex items-center gap-2"
                        >
                          <ShieldCheck size={14} /> Review Documents
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'Performance Reports':
        return (
          <div className="p-8 space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div>
                <h3 className="text-2xl font-black dark:text-white tracking-tight leading-none uppercase">Performance Reports</h3>
                <p className="text-sm text-text-secondary-light mt-1">Analyze agent productivity and shop category growth.</p>
              </div>
              <div className="flex gap-3">
                <button className="btn-outline px-4 py-2 text-xs flex items-center gap-2">
                  <Download size={14} /> Download PDF
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {/* Category Performance */}
              <div className="card-premium space-y-6">
                <h4 className="font-black dark:text-white text-sm uppercase tracking-widest flex items-center gap-2">
                  <Layout size={16} className="text-primary-light" /> Shop Category Distribution
                </h4>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={shopCategoryPerformance} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} opacity={0.1} />
                      <XAxis type="number" hide />
                      <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} fontSize={12} width={100} />
                      <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ borderRadius: '12px', border: 'none' }} />
                      <Bar dataKey="value" fill="#8B5CF6" radius={[0, 6, 6, 0]} barSize={20} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Agent Leaderboard */}
              <div className="card-premium space-y-6">
                <h4 className="font-black dark:text-white text-sm uppercase tracking-widest flex items-center gap-2">
                  <Trophy size={16} className="text-yellow-500" /> Top Performing Agents
                </h4>
                <div className="space-y-4">
                  {agentPerformanceData.sort((a, b) => b.rating - a.rating).map((agent, idx) => (
                    <div key={agent.name} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-secondary-dark rounded-2xl border border-border-light dark:border-border-dark group hover:border-primary-light/30 transition-all">
                      <div className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs ${
                          idx === 0 ? 'bg-yellow-500 text-white' : idx === 1 ? 'bg-gray-300 text-gray-700' : idx === 2 ? 'bg-orange-400 text-white' : 'bg-gray-100 text-gray-500'
                        }`}>
                          {idx + 1}
                        </div>
                        <div>
                          <p className="text-sm font-black dark:text-white">{agent.name}</p>
                          <p className="text-[10px] font-bold text-text-secondary-light uppercase">{agent.shops} Shops • {agent.revenue}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-yellow-500 font-black text-sm">
                          <Star size={12} fill="currentColor" /> {agent.rating}
                        </div>
                        <span className="text-[10px] font-black text-success uppercase">{agent.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'Area Performance':
        return (
          <div className="p-8 space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div>
                <h3 className="text-2xl font-black dark:text-white tracking-tight leading-none uppercase">Area Performance</h3>
                <p className="text-sm text-text-secondary-light mt-1">Geographic revenue distribution and growth metrics.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Revenue by Area Chart */}
              <div className="xl:col-span-2 card-premium space-y-6">
                <h4 className="font-black dark:text-white text-sm uppercase tracking-widest flex items-center gap-2">
                  <MapPin size={16} className="text-primary-light" /> Revenue Distribution by State
                </h4>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={areaPerformanceData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={12} />
                      <YAxis axisLine={false} tickLine={false} fontSize={12} />
                      <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ borderRadius: '12px', border: 'none' }} />
                      <Bar dataKey="revenue" fill="#3B82F6" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Area Growth Stats */}
              <div className="space-y-4">
                <h4 className="font-black dark:text-white text-sm uppercase tracking-widest px-1">Regional Insights</h4>
                {areaPerformanceData.map((area) => (
                  <div key={area.name} className="card-premium p-5 hover:border-primary-light/30 transition-all">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-[10px] font-black text-text-secondary-light uppercase tracking-widest">State / Territory</p>
                        <h4 className="text-lg font-black dark:text-white mt-1">{area.name}</h4>
                      </div>
                      <div className={`px-2 py-1 rounded-lg text-[10px] font-black ${
                        area.growth.startsWith('+') ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
                      }`}>
                        {area.growth} Growth
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-border-light dark:border-border-dark grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-[10px] font-bold text-text-secondary-light uppercase">Revenue</p>
                        <p className="font-black dark:text-white mt-1">₹{(area.revenue / 100000).toFixed(1)}L</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-text-secondary-light uppercase">Active Shops</p>
                        <p className="font-black dark:text-white mt-1">{area.shops}</p>
                      </div>
                    </div>
                  </div>
                ))}
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
                <button 
                  onClick={() => setShowReportModal(true)}
                  className="btn-outline px-4 py-2 text-sm flex items-center gap-2"
                >
                  <FileText size={16} /> Monthly Report
                </button>
                <button 
                  onClick={() => setShowForecastModal(true)}
                  className="btn-primary px-4 py-2 text-sm flex items-center gap-2"
                >
                  <TrendingUp size={16} /> Annual Forecast
                </button>
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
                  <button 
                    onClick={() => setShowEditProfileModal(true)}
                    className="ml-auto btn-outline px-4 py-2 text-xs"
                  >
                    Edit Profile
                  </button>
                </div>
              </div>

              {/* Setting Groups */}
              {[
                { title: 'Security', icon: <Lock />, desc: 'Password, 2FA, and session management', items: [
                  { name: 'Change Password', action: () => setShowPasswordModal(true) },
                  { name: 'Two-Factor Authentication', action: () => setShowTwoFAModal(true) },
                  { name: 'Active Sessions', action: () => setShowSessionsModal(true) }
                ]},
                { title: 'Notifications', icon: <BellRing />, desc: 'Configure email and system alerts', items: [
                  { name: 'KYC Alerts', action: () => alert('Configuring KYC Alerts...') },
                  { name: 'New Shop Registrations', action: () => alert('Configuring Shop Alerts...') },
                  { name: 'Revenue Milestones', action: () => alert('Configuring Revenue Alerts...') }
                ]},
                { title: 'System Appearance', icon: <Palette />, desc: 'Customize dashboard look and feel', items: [
                  { name: 'Dark Mode Toggle', action: () => alert('Use the toggle in the top bar to switch modes.') },
                  { name: 'Primary Brand Color', action: () => alert('Brand color customization coming soon.') },
                  { name: 'Sidebar Layout', action: () => alert('Sidebar layout presets coming soon.') }
                ]},
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
                            onClick={item.action}
                            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-secondary-dark/50 rounded-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-secondary-dark transition-all group"
                          >
                            <span className="text-sm dark:text-white font-medium">{item.name}</span>
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
                <button 
                  onClick={() => setActiveTab('Payments / Transactions')}
                  className="btn-outline px-4 py-2 text-sm flex items-center gap-2"
                >
                  <History size={18} /> Payout History
                </button>
                <button 
                  onClick={() => setShowBulkPayoutModal(true)}
                  className="btn-primary px-4 py-2 text-sm flex items-center gap-2"
                >
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
                      { id: 1, name: 'Amit Singh', role: 'State Agent', volume: '₹14.5L', rate: '5%', earned: '₹72,500', status: 'Pending' },
                      { id: 2, name: 'Priya Verma', role: 'District Agent', volume: '₹8.2L', rate: '8%', earned: '₹65,600', status: 'Ready for Payout' },
                      { id: 3, name: 'Kiran Deep', role: 'Divisional Agent', volume: '₹5.4L', rate: '10%', earned: '₹54,000', status: 'Processing' },
                      { id: 4, name: 'Rahul Dev', role: 'Pincode Agent', volume: '₹2.4L', rate: '12%', earned: '₹28,800', status: 'Paid' },
                      { id: 5, name: 'Sanjay Dutt', role: 'Category Agent', volume: '₹5.8L', rate: '10%', earned: '₹58,000', status: 'Held' },
                    ].map((agent) => (
                      <tr key={agent.id} className="hover:bg-gray-50 dark:hover:bg-secondary-dark/50 transition-colors group">
                        <td className="py-4">
                          <p className="dark:text-white font-bold text-sm tracking-tight">{agent.name}</p>
                          <p className="text-[10px] text-text-secondary-light font-bold uppercase tracking-wider mt-0.5">{agent.role}</p>
                        </td>
                        <td className="py-4 font-medium dark:text-white text-sm">{agent.volume}</td>
                        <td className="py-4">
                          <span className="px-2 py-1 bg-gray-100 dark:bg-secondary-dark rounded-lg text-xs font-semibold dark:text-white">{agent.rate}</span>
                        </td>
                        <td className="py-4 font-bold text-success text-sm">{agent.earned}</td>
                        <td className="py-4">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 w-max ${
                            agent.status === 'Paid' ? 'bg-success/10 text-success' : 
                            agent.status === 'Ready for Payout' ? 'bg-purple-500/10 text-purple-500' :
                            agent.status === 'Processing' ? 'bg-blue-500/10 text-blue-500' : 
                            agent.status === 'Held' ? 'bg-error/10 text-error' : 'bg-warning/10 text-warning'
                          }`}>
                            {agent.status === 'Processing' && <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>}
                            {agent.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <div className="flex justify-end items-center gap-3">
                            {/* View Button */}
                            <button 
                              onClick={() => addNotification({ title: 'Full Details', message: `Sales breakdown for ${agent.name}`, type: 'info' })}
                              className="w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-secondary-dark rounded-xl text-gray-500 hover:bg-gray-200 dark:hover:bg-secondary-dark/80 transition-all shadow-sm group/btn relative"
                            >
                              <Eye size={18} />
                              <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-[10px] rounded opacity-0 group-hover/btn:opacity-100 transition-opacity whitespace-nowrap z-[60]">View Details</span>
                            </button>

                            {/* Release Button */}
                            <button 
                              disabled={agent.status === 'Processing' || agent.status === 'Paid'}
                              onClick={() => addNotification({ title: 'Payout Released', message: `Initiated ₹${agent.earned} payout for ${agent.name}`, type: 'success' })}
                              className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all shadow-lg group/release relative ${
                                agent.status === 'Processing' || agent.status === 'Paid'
                                ? 'bg-gray-100 dark:bg-secondary-dark opacity-50 cursor-not-allowed'
                                : 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white hover:scale-105 hover:shadow-emerald-500/20'
                              }`}
                            >
                              {agent.status === 'Processing' ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                              ) : (
                                <Coins size={18} />
                              )}
                              <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-[10px] rounded opacity-0 group-hover/release:opacity-100 transition-opacity whitespace-nowrap z-[60]">Release Commission</span>
                            </button>

                            {/* More Options */}
                            <div className="relative group/more">
                              <button 
                                className="w-10 h-10 flex items-center justify-center bg-gray-100 dark:bg-secondary-dark/50 backdrop-blur-md rounded-xl text-gray-500 hover:bg-gray-200 dark:hover:bg-secondary-dark transition-all border border-transparent hover:border-gray-200 shadow-sm"
                              >
                                <MoreVertical size={18} />
                              </button>
                              
                              <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-2xl shadow-2xl py-2 opacity-0 invisible group-hover/more:opacity-100 group-hover/more:visible transition-all z-50 translate-y-2 group-hover/more:translate-y-0">
                                <div className="px-4 py-2 border-b border-border-light dark:border-border-dark mb-2">
                                  <p className="text-[10px] font-black text-text-secondary-light uppercase tracking-widest">Options</p>
                                </div>
                                <button className="w-full px-4 py-2 text-left text-xs font-bold hover:bg-gray-50 dark:hover:bg-secondary-dark flex items-center gap-2 transition-colors">
                                  <FileText size={14} className="text-blue-500" /> Download Invoice
                                </button>
                                <button className="w-full px-4 py-2 text-left text-xs font-bold hover:bg-gray-50 dark:hover:bg-secondary-dark flex items-center gap-2 transition-colors">
                                  <History size={14} className="text-purple-500" /> View Logs
                                </button>
                                <button className="w-full px-4 py-2 text-left text-xs font-bold hover:bg-gray-50 dark:hover:bg-secondary-dark flex items-center gap-2 transition-colors">
                                  <Bell size={14} className="text-orange-500" /> Send Notification
                                </button>
                                <button className="w-full px-4 py-2 text-left text-xs font-bold hover:bg-gray-50 dark:hover:bg-secondary-dark flex items-center gap-2 transition-colors">
                                  <Edit size={14} className="text-emerald-500" /> Edit Commission
                                </button>
                                {agent.status === 'Paid' && (
                                  <button className="w-full px-4 py-2 text-left text-xs font-bold hover:bg-gray-50 dark:hover:bg-secondary-dark flex items-center gap-2 transition-colors">
                                    <CheckCircle size={14} className="text-success" /> View Receipt
                                  </button>
                                )}
                                <button className="w-full px-4 py-2 text-left text-xs font-bold hover:bg-gray-50 dark:hover:bg-secondary-dark flex items-center gap-2 text-error transition-colors mt-2 border-t border-border-light dark:border-border-dark pt-2">
                                  <AlertCircle size={14} /> Hold Payment
                                </button>
                              </div>
                            </div>
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
                <button 
                  onClick={() => setShowFilterModal(true)}
                  className="btn-outline px-4 py-2 text-sm flex items-center gap-2"
                >
                  <Filter size={18} /> Filters
                </button>
                <button 
                  onClick={() => setShowCustomReportModal(true)}
                  className="btn-primary px-4 py-2 text-sm flex items-center gap-2"
                >
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
                  <button 
                    onClick={() => setShowTemplatesModal(true)}
                    className="mt-4 text-xs font-bold text-primary-light flex items-center gap-1 group-hover:underline"
                  >
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
                <button 
                  onClick={() => setShowLiveChatModal(true)}
                  className="btn-outline px-4 py-2 text-sm flex items-center gap-2"
                >
                  <Headset size={18} /> Live Chat
                </button>
                <button 
                  onClick={() => setShowTicketModal(true)}
                  className="btn-primary px-4 py-2 text-sm flex items-center gap-2"
                >
                  <Ticket size={18} /> Open Ticket
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
                <button 
                  onClick={() => setShowTemplatesModal(true)}
                  className="btn-outline px-4 py-2 text-sm flex items-center gap-2"
                >
                  <Layout size={18} /> Templates
                </button>
                <button 
                  onClick={() => setShowBroadcastModal(true)}
                  className="btn-primary px-4 py-2 text-sm flex items-center gap-2"
                >
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
                <button 
                  onClick={() => setShowCampaignSettingsModal(true)}
                  className="btn-outline px-4 py-2 text-sm flex items-center gap-2"
                >
                  <Settings size={18} /> Campaign Settings
                </button>
                <button 
                  onClick={() => setShowTrackLinksModal(true)}
                  className="btn-primary px-4 py-2 text-sm flex items-center gap-2"
                >
                  <Link2 size={18} /> Generate Track Links
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
      case 'Role & Permissions': {
        return (
          <div className="p-8 space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-black dark:text-white tracking-tight">Role & Permission Management</h3>
                <p className="text-sm text-text-secondary-light mt-1">Control user access, roles, and platform security.</p>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowCreateRoleModal(true)}
                  className="btn-outline px-4 py-2.5 text-sm font-bold flex items-center gap-2"
                >
                  <ShieldCheck size={18} /> Role Editor
                </button>
                <button className="btn-primary px-6 py-2.5 text-sm font-bold shadow-lg shadow-primary-light/20 flex items-center gap-2">
                  <Shield size={18} /> Add System User
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
                  <button 
                    onClick={() => setShowPermissionsModal(true)}
                    className="mt-4 text-xs font-bold text-primary-light hover:underline w-full text-left"
                  >
                    Edit Permissions →
                  </button>
                </div>
              ))}
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
      }

      case 'Audit Logs':
      case 'Activity Log': {
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
      }

      case 'Shop Approvals':
      case 'Shop Tie-Up Management': {
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
                              onClick={() => {
                                setSelectedShop(shop);
                                setShopModalType('view');
                                setShowShopModal(true);
                              }}
                              className="p-2 bg-primary-light/10 text-primary-light rounded-xl hover:bg-primary-light hover:text-white transition-all"
                              title="View Details"
                            >
                              <Eye size={16} />
                            </button>
                            <button 
                              onClick={() => {
                                setSelectedShop(shop);
                                setShopModalType('approve');
                                setShowShopModal(true);
                              }}
                              className="p-2 bg-success/10 text-success rounded-xl hover:bg-success hover:text-white transition-all" 
                              title="Approve"
                            >
                              <CheckCircle size={16} />
                            </button>
                            <button 
                              onClick={() => {
                                setSelectedShop(shop);
                                setShopModalType('correction');
                                setShowShopModal(true);
                              }}
                              className="p-2 bg-warning/10 text-warning rounded-xl hover:bg-warning hover:text-white transition-all" 
                              title="Request Correction"
                            >
                              <AlertCircle size={16} />
                            </button>
                            <button 
                              onClick={() => {
                                setSelectedShop(shop);
                                setShopModalType('assign');
                                setShowShopModal(true);
                              }}
                              className="p-2 bg-blue-500/10 text-blue-500 rounded-xl hover:bg-blue-500 hover:text-white transition-all" 
                              title="Assign Agent"
                            >
                              <UserPlus size={16} />
                            </button>
                            <button 
                              onClick={() => {
                                setSelectedShop(shop);
                                setShopModalType('edit');
                                setShowShopModal(true);
                              }}
                              className="p-2 bg-gray-100 dark:bg-secondary-dark rounded-xl hover:bg-primary-light hover:text-white transition-all text-text-secondary-light" 
                              title="Edit Shop"
                            >
                              <Edit size={16} />
                            </button>
                            <button 
                              onClick={() => handleDeleteShop(shop.id)}
                              className="p-2 bg-error/10 text-error rounded-xl hover:bg-error hover:text-white transition-all" 
                              title="Delete/Remove Shop"
                            >
                              <Trash2 size={16} />
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
      }

      case 'Service Partners':
        return (
          <div className="p-8 space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div>
                <h3 className="text-2xl font-black dark:text-white tracking-tight">Service Partner Network</h3>
                <p className="text-sm text-text-secondary-light mt-1">Manage external service providers and logistics partners.</p>
              </div>
              <button 
                onClick={() => setShowAddServicePartnerModal(true)}
                className="btn-primary px-6 py-2.5 text-sm font-bold shadow-lg shadow-primary-light/20 flex items-center gap-2"
              >
                <Plus size={18} /> Add New Service Partner
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Active Partners', value: servicePartners.length, color: 'bg-blue-500', icon: <Users /> },
                { label: 'Pending Review', value: '3', color: 'bg-warning', icon: <Clock /> },
                { label: 'Avg Rating', value: '4.7', color: 'bg-success', icon: <Star /> },
              ].map((s, i) => (
                <div key={i} className="card-premium flex items-center gap-4 hover:scale-[1.02] transition-all">
                  <div className={`p-4 ${s.color} text-white rounded-2xl shadow-lg`}>
                    {React.cloneElement(s.icon, { size: 24 })}
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-text-secondary-light uppercase tracking-widest">{s.label}</p>
                    <h3 className="text-2xl font-black dark:text-white">{s.value}</h3>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2 card-premium p-0 overflow-hidden">
                <div className="p-6 border-b dark:border-border-dark flex justify-between items-center bg-gray-50/30">
                  <h4 className="text-lg font-black dark:text-white flex items-center gap-2">
                    <Briefcase size={20} className="text-primary-light" /> Service Partner List
                  </h4>
                  <div className="relative">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary-light" />
                    <input 
                      type="text" 
                      placeholder="Search Partners..." 
                      value={serviceSearchTerm}
                      onChange={(e) => setServiceSearchTerm(e.target.value)}
                      className="pl-8 pr-4 py-2 bg-gray-100 dark:bg-secondary-dark rounded-xl text-xs outline-none focus:ring-2 focus:ring-primary-light dark:text-white"
                    />
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-gray-50/50 dark:bg-secondary-dark/20 text-text-secondary-light">
                        <th className="p-4 font-black text-[10px] uppercase tracking-widest">Partner Info</th>
                        <th className="p-4 font-black text-[10px] uppercase tracking-widest">Category</th>
                        <th className="p-4 font-black text-[10px] uppercase tracking-widest">Joined</th>
                        <th className="p-4 font-black text-[10px] uppercase tracking-widest">Status</th>
                        <th className="p-4 font-black text-[10px] uppercase tracking-widest text-right">Performance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-light dark:divide-border-dark">
                      {servicePartners
                        .filter(p => p.name.toLowerCase().includes(serviceSearchTerm.toLowerCase()) || 
                                     p.category.toLowerCase().includes(serviceSearchTerm.toLowerCase()))
                        .map((p) => (
                        <tr key={p.id} className="hover:bg-gray-50 dark:hover:bg-secondary-dark/50 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-primary-light/10 text-primary-light rounded-lg flex items-center justify-center font-bold text-xs">{p.name[0]}</div>
                              <div>
                                <p className="text-sm font-bold dark:text-white">{p.name}</p>
                                <p className="text-[10px] text-text-secondary-light font-bold uppercase">{p.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="px-2 py-1 bg-gray-100 dark:bg-secondary-dark rounded text-[10px] font-bold dark:text-white">{p.category}</span>
                          </td>
                          <td className="p-4 text-xs font-medium text-text-secondary-light">{p.joined}</td>
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-tighter ${
                              p.status === 'Active' ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
                            }`}>{p.status}</span>
                          </td>
                          <td className="p-4 text-right">
                            <span className="text-xs font-black text-primary-light uppercase tracking-widest">{p.performance}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="card-premium space-y-6">
                <h4 className="text-lg font-black dark:text-white flex items-center gap-2">
                  <FileText size={20} className="text-accent-light" /> Related Content Library
                </h4>
                <p className="text-xs text-text-secondary-light -mt-2 italic">Essential documents for service partner management.</p>
                <div className="space-y-4">
                  {[
                    { title: 'Standard Agreement 2024', size: '2.4 MB', icon: <FileText className="text-blue-500" /> },
                    { title: 'Logistics Quality Standards', size: '1.8 MB', icon: <Shield className="text-emerald-500" /> },
                    { title: 'Partner Onboarding Kit', size: '5.2 MB', icon: <Package className="text-orange-500" /> },
                    { title: 'Support SLA Guidelines', size: '1.1 MB', icon: <LifeBuoy className="text-purple-500" /> },
                  ].map((item, i) => (
                    <div key={i} className="p-4 bg-gray-50 dark:bg-secondary-dark/30 rounded-2xl border border-border-light dark:border-border-dark flex items-center gap-4 group cursor-pointer hover:border-primary-light transition-all">
                      <div className="w-10 h-10 bg-white dark:bg-surface-dark rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-black dark:text-white">{item.title}</p>
                        <p className="text-[10px] font-bold text-text-secondary-light uppercase mt-0.5">{item.size} · PDF</p>
                      </div>
                      <Download size={14} className="text-text-secondary-light group-hover:text-primary-light" />
                    </div>
                  ))}
                </div>
                <button className="w-full py-4 bg-gray-100 dark:bg-secondary-dark rounded-2xl text-xs font-black text-text-secondary-light hover:bg-primary-light hover:text-white transition-all uppercase tracking-widest mt-4">
                  Upload New Material
                </button>
              </div>
            </div>
          </div>
        );

      case 'Product Partners':
        return (
          <div className="p-8 space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div>
                <h3 className="text-2xl font-black dark:text-white tracking-tight">Product Brands & Partners</h3>
                <p className="text-sm text-text-secondary-light mt-1">Manage brand partnerships and product catalog suppliers.</p>
              </div>
              <button 
                onClick={() => setShowAddProductPartnerModal(true)}
                className="btn-primary px-6 py-2.5 text-sm font-bold shadow-lg shadow-primary-light/20 flex items-center gap-2"
              >
                <Plus size={18} /> Add New Brand
              </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: 'Total Brands', value: productPartners.length, icon: <Package />, color: 'text-orange-500', bg: 'bg-orange-500/10' },
                { label: 'Active', value: productPartners.filter(p => p.status === 'Active').length, icon: <CheckCircle />, color: 'text-success', bg: 'bg-success/10' },
                { label: 'Live Products', value: productPartners.reduce((acc, curr) => acc + curr.products, 0), icon: <ShoppingCart />, color: 'text-blue-500', bg: 'bg-blue-500/10' },
                { label: 'Avg Commission', value: '7.8%', icon: <Percent />, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
              ].map((stat, i) => (
                <div key={i} className="card-premium p-4 flex items-center gap-4">
                  <div className={`p-3 ${stat.bg} ${stat.color} rounded-xl`}>
                    {React.cloneElement(stat.icon, { size: 20 })}
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-text-secondary-light uppercase tracking-widest">{stat.label}</p>
                    <p className="text-xl font-black dark:text-white">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="card-premium">
              <div className="mb-6 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary-light" size={18} />
                <input 
                  type="text" 
                  placeholder="Search by brand name, category or representative..." 
                  value={productSearchTerm}
                  onChange={(e) => setProductSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-secondary-dark border border-border-light dark:border-border-dark rounded-2xl focus:ring-2 focus:ring-primary-light outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {productPartners
                  .filter(p => p.name.toLowerCase().includes(productSearchTerm.toLowerCase()) || 
                               p.category.toLowerCase().includes(productSearchTerm.toLowerCase()) ||
                               p.representative.toLowerCase().includes(productSearchTerm.toLowerCase()))
                  .map((brand) => (
                  <div key={brand.id} className="p-5 bg-gray-50 dark:bg-secondary-dark/30 border border-border-light dark:border-border-dark rounded-3xl hover:border-primary-light/50 transition-all group">
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 bg-white dark:bg-surface-dark rounded-2xl flex items-center justify-center shadow-sm border border-border-light dark:border-border-dark font-black text-xl text-primary-light group-hover:scale-110 transition-transform">
                        {brand.name[0]}
                      </div>
                      <span className={`px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-tighter ${
                        brand.status === 'Active' ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
                      }`}>{brand.status}</span>
                    </div>
                    
                    <h4 className="font-bold dark:text-white mb-1">{brand.name}</h4>
                    <p className="text-[10px] text-text-secondary-light font-bold uppercase tracking-wider mb-4">{brand.category}</p>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="text-text-secondary-light font-medium">Representative</span>
                        <span className="font-bold dark:text-white">{brand.representative}</span>
                      </div>
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="text-text-secondary-light font-medium">Live Products</span>
                        <span className="font-bold dark:text-white">{brand.products}</span>
                      </div>
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="text-text-secondary-light font-medium">Commission</span>
                        <span className="font-bold text-emerald-500">{brand.commission}</span>
                      </div>
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="text-text-secondary-light font-medium">Rating</span>
                        <span className="font-bold text-yellow-500">★ {brand.rating}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-6 pt-4 border-t dark:border-border-dark opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="py-2 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl text-[10px] font-bold dark:text-white hover:bg-gray-100 transition-all">Details</button>
                      <button className="py-2 bg-primary-light text-white rounded-xl text-[10px] font-bold hover:bg-primary-dark transition-all">Catalog</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Brand Related Content */}
            <div className="card-premium mt-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h4 className="text-lg font-black dark:text-white">Brand Assets & Content</h4>
                  <p className="text-xs text-text-secondary-light">Marketing materials, brand guidelines, and product catalogs.</p>
                </div>
                <button className="btn-outline px-4 py-2 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                  <Plus size={14} /> Upload Asset
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: 'Brand Identity Guidelines', type: 'PDF', size: '12.4 MB', date: 'May 01', icon: <Palette className="text-purple-500" /> },
                  { title: 'Summer Collection Catalog', type: 'PDF', size: '25.8 MB', date: 'Apr 28', icon: <ShoppingCart className="text-orange-500" /> },
                  { title: 'Promotional Video Pack', type: 'ZIP', size: '145 MB', date: 'May 04', icon: <Zap className="text-yellow-500" /> }
                ].map((item, i) => (
                  <div key={i} className="p-5 bg-gray-50 dark:bg-secondary-dark/40 rounded-3xl border border-border-light dark:border-border-dark group hover:border-primary-light/50 transition-all cursor-pointer shadow-sm hover:shadow-md">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white dark:bg-surface-dark rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                        {item.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-black dark:text-white truncate">{item.title}</p>
                        <p className="text-[10px] text-text-secondary-light font-bold mt-0.5">{item.type} • {item.size} • {item.date}</p>
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-text-secondary-light hover:text-primary-light"><Eye size={16} /></button>
                        <button className="p-2 text-text-secondary-light hover:text-primary-light"><Download size={16} /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'Subadmin Management':
      case 'Sub Admin Management': {
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
                <button 
                  onClick={() => setShowAddSubAdminModal(true)}
                  className="btn-primary px-6 py-2.5 text-sm font-bold shadow-lg shadow-primary-light/20 flex items-center gap-2"
                >
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
                            <button 
                              onClick={() => handleDeleteSubAdmin(sa.id)}
                              className="p-2 bg-error/10 text-error rounded-xl hover:bg-error hover:text-white transition-all" 
                              title="Delete Sub-Admin"
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
          </div>
        );
      }

      case 'Categories':
        return (
          <div className="p-8 space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-black dark:text-white tracking-tight">Business Categories</h3>
                <p className="text-sm text-text-secondary-light mt-1">Manage and organize industry categories for partners and shops.</p>
              </div>
              <button 
                onClick={() => {
                  setEditingItem(null);
                  setShowAddCategoryModal(true);
                }}
                className="btn-primary px-6 py-2.5 text-sm flex items-center gap-2"
              >
                <Plus size={18} /> Add New Category
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {categories.map((cat) => (
                <div key={cat.id} className="card-premium group hover:border-primary-light/50 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-4 rounded-[20px] ${cat.color || 'bg-primary-light/10 text-primary-light'} transition-all shadow-sm group-hover:scale-110`}>
                      <Layout size={24} />
                    </div>
                    <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-all translate-y-1 group-hover:translate-y-0">
                      <button 
                        onClick={() => {
                          setEditingItem(cat);
                          setShowAddCategoryModal(true);
                        }}
                        className="p-2.5 bg-gray-100 dark:bg-secondary-dark rounded-xl text-gray-600 dark:text-gray-400 hover:bg-primary-light hover:text-white transition-all shadow-sm"
                      >
                        <Edit size={14} />
                      </button>
                      <button 
                        onClick={() => handleDeleteCategory(cat.id)}
                        className="p-2.5 bg-red-50 dark:bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <h4 className="text-lg font-black dark:text-white mb-1 tracking-tight">{cat.name}</h4>
                  <p className="text-xs text-text-secondary-light font-bold uppercase tracking-widest">Industry Classification</p>
                  
                  <div className="flex items-center justify-between mt-6 pt-4 border-t dark:border-border-dark">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-text-secondary-light uppercase tracking-tighter">Total Partners</span>
                      <span className="text-sm font-black dark:text-white">{cat.count} Businesses</span>
                    </div>
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                      cat.status === 'Active' ? 'bg-success/10 text-success border border-success/20' : 'bg-gray-100 dark:bg-secondary-dark text-text-secondary-light border border-border-light dark:border-border-dark'
                    }`}>
                      {cat.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'State':
      case 'District':
      case 'Taluk':
      case 'Pincode Mapping':
        const getAreaTitle = () => {
          switch(activeTab) {
            case 'State': return 'States / Union Territories';
            case 'District': return 'Districts / Divisions';
            case 'Taluk': return 'Taluks / Tehsils';
            case 'Pincode Mapping': return 'Pincode Service Areas';
            default: return 'Area Management';
          }
        };

        const getAreaData = () => {
          switch(activeTab) {
            case 'State': return states;
            case 'District': return districts;
            case 'Taluk': return taluks;
            case 'Pincode Mapping': return pincodes;
            default: return [];
          }
        };

        return (
          <div className="p-8 space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-black dark:text-white tracking-tight">{getAreaTitle()}</h3>
                <p className="text-sm text-text-secondary-light mt-1">Manage geography hierarchy and operational zones.</p>
              </div>
              <button 
                onClick={() => {
                  setAreaModalType(activeTab);
                  setEditingItem(null);
                  setShowAreaHierarchyModal(true);
                }}
                className="btn-primary px-6 py-2.5 text-sm flex items-center gap-2"
              >
                <Plus size={18} /> Add New {activeTab}
              </button>
            </div>

            <div className="card-premium p-0 overflow-hidden">
              <div className="p-6 border-b dark:border-border-dark flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary-light" size={18} />
                  <input 
                    type="text" 
                    placeholder={`Search ${activeTab.toLowerCase()}...`}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none rounded-2xl dark:text-white font-bold transition-all"
                  />
                </div>
                <div className="flex gap-2">
                  <button className="btn-outline px-4 py-2.5 flex items-center gap-2 text-sm">
                    <Filter size={18} /> Filters
                  </button>
                  <button className="btn-outline px-4 py-2.5 flex items-center gap-2 text-sm">
                    <Download size={18} /> Export
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-secondary-dark/30 text-left">
                      <th className="p-6 font-black text-[10px] text-text-secondary-light uppercase tracking-widest">{activeTab} Details</th>
                      <th className="p-6 font-black text-[10px] text-text-secondary-light uppercase tracking-widest">Hierarchy</th>
                      <th className="p-6 font-black text-[10px] text-text-secondary-light uppercase tracking-widest">Stats</th>
                      <th className="p-6 font-black text-[10px] text-text-secondary-light uppercase tracking-widest">Status</th>
                      <th className="p-6 font-black text-[10px] text-text-secondary-light uppercase tracking-widest text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-light dark:divide-border-dark">
                    {getAreaData().map((area) => (
                      <tr key={area.id} className="hover:bg-gray-50/50 dark:hover:bg-secondary-dark/20 transition-colors group">
                        <td className="p-6">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-primary-light/10 text-primary-light rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                              {activeTab === 'State' && <MapPin size={24} />}
                              {activeTab === 'District' && <Map size={24} />}
                              {activeTab === 'Taluk' && <Navigation size={24} />}
                              {activeTab === 'Pincode Mapping' && <Zap size={24} />}
                            </div>
                            <div>
                              <p className="font-black dark:text-white text-base tracking-tight">{area.name || area.code}</p>
                              {area.code && area.name && <p className="text-[10px] font-black text-text-secondary-light uppercase">Code: {area.code}</p>}
                            </div>
                          </div>
                        </td>
                        <td className="p-6">
                          <div className="space-y-1">
                            {area.taluk && <p className="text-xs font-bold dark:text-white flex items-center gap-1"><Navigation size={12} className="text-primary-light"/> {area.taluk}</p>}
                            {area.district && <p className="text-xs font-bold dark:text-white flex items-center gap-1"><Map size={12} className="text-primary-light"/> {area.district}</p>}
                            {area.state && <p className="text-xs font-bold dark:text-white flex items-center gap-1"><MapPin size={12} className="text-primary-light"/> {area.state}</p>}
                            {!area.state && !area.district && <p className="text-xs text-text-secondary-light italic">Top Level</p>}
                          </div>
                        </td>
                        <td className="p-6">
                          <div className="flex flex-wrap gap-2">
                            {area.districts !== undefined && <span className="px-2.5 py-1 bg-blue-500/10 text-blue-500 rounded-lg text-[10px] font-black">{area.districts} Districts</span>}
                            {area.taluks !== undefined && <span className="px-2.5 py-1 bg-purple-500/10 text-purple-500 rounded-lg text-[10px] font-black">{area.taluks} Taluks</span>}
                            {area.pincodes !== undefined && <span className="px-2.5 py-1 bg-orange-500/10 text-orange-500 rounded-lg text-[10px] font-black">{area.pincodes} Pincodes</span>}
                            {area.agents !== undefined && <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-500 rounded-lg text-[10px] font-black">{area.agents} Agents</span>}
                          </div>
                        </td>
                        <td className="p-6">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                            area.status === 'Active' ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
                          }`}>
                            {area.status}
                          </span>
                        </td>
                        <td className="p-6 text-right">
                          <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                            <button 
                              onClick={() => {
                                setEditingItem(area);
                                setAreaModalType(activeTab);
                                setShowAreaHierarchyModal(true);
                              }}
                              className="p-2.5 bg-gray-100 dark:bg-secondary-dark rounded-xl text-gray-600 dark:text-gray-400 hover:bg-primary-light hover:text-white transition-all shadow-sm"
                            >
                              <Edit size={14} />
                            </button>
                            <button 
                              className="p-2.5 bg-red-50 dark:bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
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

          <SidebarSection title="User Management">
            <SidebarLink icon={<UserPlus size={18} />} label="Agent Management" active={activeTab === 'Agent Management'} onClick={() => setActiveTab('Agent Management')} />
            <SidebarLink icon={<Users size={18} />} label="Subadmin Management" active={activeTab === 'Subadmin Management'} onClick={() => setActiveTab('Subadmin Management')} />
          </SidebarSection>

          <SidebarSection title="Business Management">
            <SidebarLink icon={<Briefcase size={18} />} label="Service Partners" active={activeTab === 'Service Partners'} onClick={() => setActiveTab('Service Partners')} />
            <SidebarLink icon={<Package size={18} />} label="Product Partners" active={activeTab === 'Product Partners'} onClick={() => setActiveTab('Product Partners')} />
            <SidebarLink icon={<Store size={18} />} label="Shop Approvals" active={activeTab === 'Shop Approvals'} onClick={() => setActiveTab('Shop Approvals')} />
            <SidebarLink icon={<Layout size={18} />} label="Categories" active={activeTab === 'Categories'} onClick={() => setActiveTab('Categories')} />
          </SidebarSection>

          <SidebarSection title="Area Management">
            <SidebarLink icon={<MapPin size={18} />} label="State" active={activeTab === 'State'} onClick={() => setActiveTab('State')} />
            <SidebarLink icon={<Map size={18} />} label="District" active={activeTab === 'District'} onClick={() => setActiveTab('District')} />
            <SidebarLink icon={<Navigation size={18} />} label="Taluk" active={activeTab === 'Taluk'} onClick={() => setActiveTab('Taluk')} />
            <SidebarLink icon={<Zap size={18} />} label="Pincode Mapping" active={activeTab === 'Pincode Mapping'} onClick={() => setActiveTab('Pincode Mapping')} />
          </SidebarSection>

          <SidebarSection title="Operations">
            <SidebarLink icon={<Percent size={18} />} label="Commission Management" active={activeTab === 'Commission Management'} onClick={() => setActiveTab('Commission Management')} />
          </SidebarSection>

          <SidebarSection title="Verification">
            <SidebarLink icon={<ShieldCheck size={18} />} label="KYC Verification" active={activeTab === 'KYC Verification'} onClick={() => setActiveTab('KYC Verification')} badge="12" />
            <SidebarLink icon={<FileText size={18} />} label="Document Verification" active={activeTab === 'Document Verification'} onClick={() => setActiveTab('Document Verification')} />
          </SidebarSection>

          <SidebarSection title="Analytics">
            <SidebarLink icon={<TrendingUp size={18} />} label="Revenue Analytics" active={activeTab === 'Revenue Analytics'} onClick={() => setActiveTab('Revenue Analytics')} />
            <SidebarLink icon={<BarChartIcon size={18} />} label="Performance Reports" active={activeTab === 'Performance Reports'} onClick={() => setActiveTab('Performance Reports')} />
            <SidebarLink icon={<Activity size={18} />} label="Area Performance" active={activeTab === 'Area Performance'} onClick={() => setActiveTab('Area Performance')} />
          </SidebarSection>

          <SidebarSection title="Communication">
            <SidebarLink icon={<Bell size={18} />} label="Notifications" active={activeTab === 'Notifications'} onClick={() => setActiveTab('Notifications')} />
            <SidebarLink icon={<LifeBuoy size={18} />} label="Support / Tickets" active={activeTab === 'Support / Tickets'} onClick={() => setActiveTab('Support / Tickets')} />
          </SidebarSection>

          <SidebarSection title="System">
            <SidebarLink icon={<Key size={18} />} label="Role & Permissions" active={activeTab === 'Role & Permissions'} onClick={() => setActiveTab('Role & Permissions')} />
            <SidebarLink icon={<Settings size={18} />} label="Settings" active={activeTab === 'Settings'} onClick={() => setActiveTab('Settings')} />
            <SidebarLink icon={<History size={18} />} label="Audit Logs" active={activeTab === 'Audit Logs'} onClick={() => setActiveTab('Audit Logs')} />
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
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleTheme}
              className="p-2.5 bg-gray-100 dark:bg-secondary-dark text-text-secondary-light dark:text-text-secondary-dark rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all active:scale-95"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} className="text-blue-600" />}
            </button>

            <div className="relative">
              <button 
                onClick={() => setShowNotificationsMenu(!showNotificationsMenu)}
                className={`p-2.5 rounded-xl transition-all relative ${
                  showNotificationsMenu 
                    ? 'bg-primary-light text-white shadow-lg shadow-primary-light/20' 
                    : 'bg-gray-100 dark:bg-secondary-dark text-text-secondary-light dark:text-text-secondary-dark hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full ring-2 ring-surface-light dark:ring-surface-dark animate-pulse"></span>
                )}
              </button>

              {showNotificationsMenu && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowNotificationsMenu(false)}></div>
                  <div className="absolute right-0 top-full mt-4 w-80 sm:w-96 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-3xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-4 duration-200">
                    <div className="p-4 border-b dark:border-border-dark flex justify-between items-center bg-gray-50/50 dark:bg-secondary-dark/30">
                      <div className="flex items-center gap-2">
                        <h3 className="font-black dark:text-white">Notifications</h3>
                        {unreadCount > 0 && <span className="bg-error/10 text-error px-2 py-0.5 rounded-full text-[10px] font-bold">{unreadCount} New</span>}
                      </div>
                      {unreadCount > 0 && (
                        <button onClick={markAllAsRead} className="text-xs font-bold text-primary-light hover:underline">Mark all as read</button>
                      )}
                    </div>
                    <div className="max-h-96 overflow-y-auto custom-scrollbar">
                      {notifications.length === 0 ? (
                        <div className="p-8 text-center text-text-secondary-light">
                          <Bell size={32} className="mx-auto mb-3 opacity-20" />
                          <p className="font-bold text-sm">No notifications yet</p>
                        </div>
                      ) : (
                        notifications.map(notification => (
                          <div key={notification.id} onClick={() => markAsRead(notification.id)} className={`p-4 border-b dark:border-border-dark hover:bg-gray-50 dark:hover:bg-secondary-dark/50 cursor-pointer transition-colors ${!notification.isRead ? 'bg-primary-light/[0.02]' : ''}`}>
                            <div className="flex gap-4">
                              <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${!notification.isRead ? 'bg-primary-light' : 'bg-transparent'}`}></div>
                              <div>
                                <h4 className={`text-sm ${!notification.isRead ? 'font-black dark:text-white' : 'font-bold text-text-secondary-light'}`}>{notification.title}</h4>
                                <p className="text-xs text-text-secondary-light mt-1 line-clamp-2 leading-relaxed">{notification.message}</p>
                                <span className="text-[10px] font-bold text-text-secondary-light mt-2 block uppercase tracking-wider">{notification.time}</span>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    <div className="p-3 border-t dark:border-border-dark bg-gray-50/50 dark:bg-secondary-dark/30 text-center">
                      <button className="text-xs font-black text-text-secondary-light hover:text-primary-light">View All Notifications</button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {renderContent()}

        <VerificationDetailModal 
          isOpen={showVerificationModal}
          onClose={() => setShowVerificationModal(false)}
          verification={selectedVerification}
          onApprove={handleApproveVerification}
          onReject={handleRejectVerification}
        />
        <AddAgentModal 
          isOpen={showAddAgentModal} 
          onClose={() => {
            setShowAddAgentModal(false);
            setEditingItem(null);
          }} 
          onAdd={handleAddAgent}
          initialData={editingItem}
        />
        <AddSubAdminModal 
          isOpen={showAddSubAdminModal}
          onClose={() => {
            setShowAddSubAdminModal(false);
            setEditingItem(null);
          }}
          initialData={editingItem}
        />
        <CategoryManagementModal 
          isOpen={showAddCategoryModal}
          onClose={() => {
            setShowAddCategoryModal(false);
            setEditingItem(null);
          }}
          initialData={editingItem}
          categories={categories}
          setCategories={setCategories}
          addNotification={addNotification}
        />
        <AreaHierarchyModal 
          isOpen={showAreaHierarchyModal}
          onClose={() => setShowAreaHierarchyModal(false)}
          type={areaModalType}
          initialData={editingItem}
          states={states}
          districts={districts}
          taluks={taluks}
          pincodes={pincodes}
          setStates={setStates}
          setDistricts={setDistricts}
          setTaluks={setTaluks}
          setPincodes={setPincodes}
          addNotification={addNotification}
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
        <AddServicePartnerModal 
          isOpen={showAddServicePartnerModal}
          onClose={() => setShowAddServicePartnerModal(false)}
          setServicePartners={setServicePartners}
          servicePartners={servicePartners}
          addNotification={addNotification}
        />
        <AddProductPartnerModal 
          isOpen={showAddProductPartnerModal}
          onClose={() => setShowAddProductPartnerModal(false)}
          setProductPartners={setProductPartners}
          productPartners={productPartners}
          addNotification={addNotification}
        />
        <AreaDetailsModal 
          isOpen={showAreaModal}
          onClose={() => setShowAreaModal(false)}
          area={selectedArea}
        />
        <SetTargetModal 
          isOpen={showSetTargetModal}
          onClose={() => setShowSetTargetModal(false)}
        />
        <BulkPayoutModal 
          isOpen={showBulkPayoutModal}
          onClose={() => setShowBulkPayoutModal(false)}
        />
        <MapTerritoryModal 
          isOpen={showMapModal}
          onClose={() => setShowMapModal(false)}
        />
        <ReportModal 
          isOpen={showReportModal}
          onClose={() => setShowReportModal(false)}
        />
        <ForecastModal 
          isOpen={showForecastModal}
          onClose={() => setShowForecastModal(false)}
        />
        <FilterModal 
          isOpen={showFilterModal}
          onClose={() => setShowFilterModal(false)}
        />
        <CustomReportModal 
          isOpen={showCustomReportModal}
          onClose={() => setShowCustomReportModal(false)}
        />
        <TemplatesModal 
          isOpen={showTemplatesModal}
          onClose={() => setShowTemplatesModal(false)}
        />
        <BroadcastModal 
          isOpen={showBroadcastModal}
          onClose={() => setShowBroadcastModal(false)}
        />
        <LiveChatModal 
          isOpen={showLiveChatModal}
          onClose={() => setShowLiveChatModal(false)}
        />
        <TicketModal 
          isOpen={showTicketModal}
          onClose={() => setShowTicketModal(false)}
        />
        <CampaignSettingsModal 
          isOpen={showCampaignSettingsModal}
          onClose={() => setShowCampaignSettingsModal(false)}
        />
        <TrackLinksModal 
          isOpen={showTrackLinksModal}
          onClose={() => setShowTrackLinksModal(false)}
        />
        <EditProfileModal 
          isOpen={showEditProfileModal}
          onClose={() => setShowEditProfileModal(false)}
        />
        <PasswordModal 
          isOpen={showPasswordModal}
          onClose={() => setShowPasswordModal(false)}
        />
        <TwoFAModal 
          isOpen={showTwoFAModal}
          onClose={() => setShowTwoFAModal(true)}
        />
        <SessionsModal 
          isOpen={showSessionsModal}
          onClose={() => setShowSessionsModal(false)}
        />
        <CreateRoleModal 
          isOpen={showCreateRoleModal}
          onClose={() => setShowCreateRoleModal(false)}
        />
        <PermissionsModal 
          isOpen={showPermissionsModal}
          onClose={() => setShowPermissionsModal(false)}
        />
        <ManageAccessModal 
          isOpen={showManageAccessModal}
          onClose={() => setShowManageAccessModal(false)}
        />
        <AgentActionsModal 
          isOpen={showAgentModal}
          onClose={() => setShowAgentModal(false)}
          agent={selectedAgent}
          type={agentModalType}
          setAgents={setAgents}
          agents={agents}
          addNotification={addNotification}
        />
        <ShopActionsModal 
          isOpen={showShopModal}
          onClose={() => setShowShopModal(false)}
          shop={selectedShop}
          type={shopModalType}
          setShopTieUps={setShopTieUps}
          shopTieUps={shopTieUps}
          addNotification={addNotification}
        />
      </main>
    </div>
  );
};

const AddSubAdminModal = ({ isOpen, onClose, initialData }) => {
  const [step, setStep] = useState(1);
  const [emailOtp, setEmailOtp] = useState('');
  const [phoneOtp, setPhoneOtp] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [sendingEmailOtp, setSendingEmailOtp] = useState(false);
  const [sendingPhoneOtp, setSendingPhoneOtp] = useState(false);
  const [showEmailOtpInput, setShowEmailOtpInput] = useState(false);
  const [showPhoneOtpInput, setShowPhoneOtpInput] = useState(false);

  const [permissions, setPermissions] = useState({
    manageAgents: true,
    manageShops: true,
    viewAnalytics: true,
    approveKYC: false,
    manageAreas: true,
    communication: false
  });
  const { addNotification } = useNotifications();

  if (!isOpen) return null;

  const handleNext = () => {
    if (step === 1 && (!isEmailVerified || !isPhoneVerified)) {
      addNotification({ title: 'Verification Required', message: 'Please verify both Email and Phone Number before proceeding.', type: 'warning' });
      return;
    }
    setStep(prev => prev + 1);
  };
  const handleBack = () => setStep(prev => prev - 1);

  const verifyEmail = () => {
    setSendingEmailOtp(true);
    setTimeout(() => {
      setSendingEmailOtp(false);
      setShowEmailOtpInput(true);
      addNotification({ title: 'OTP Sent', message: 'Verification code sent to your email.', type: 'info' });
    }, 1000);
  };

  const verifyPhone = () => {
    setSendingPhoneOtp(true);
    setTimeout(() => {
      setSendingPhoneOtp(false);
      setShowPhoneOtpInput(true);
      addNotification({ title: 'OTP Sent', message: 'Verification code sent to your phone.', type: 'info' });
    }, 1000);
  };

  const confirmEmailOtp = () => {
    if (emailOtp === '123456') {
      setIsEmailVerified(true);
      setShowEmailOtpInput(false);
      addNotification({ title: 'Verified', message: 'Email address verified successfully.', type: 'success' });
    } else {
      addNotification({ title: 'Invalid OTP', message: 'Please enter the correct code.', type: 'error' });
    }
  };

  const confirmPhoneOtp = () => {
    if (phoneOtp === '123456') {
      setIsPhoneVerified(true);
      setShowPhoneOtpInput(false);
      addNotification({ title: 'Verified', message: 'Phone number verified successfully.', type: 'success' });
    } else {
      addNotification({ title: 'Invalid OTP', message: 'Please enter the correct code.', type: 'error' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNotification({ 
      title: 'Sub Admin Created', 
      message: 'Credentials have been generated and sent via Email/SMS.', 
      type: 'success' 
    });
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setStep(1);
    setIsEmailVerified(false);
    setIsPhoneVerified(false);
    setShowEmailOtpInput(false);
    setShowPhoneOtpInput(false);
    setEmailOtp('');
    setPhoneOtp('');
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background-dark/80 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose}></div>
      
      <div className="relative w-full max-w-2xl bg-surface-light dark:bg-surface-dark rounded-[2.5rem] shadow-2xl border border-border-light dark:border-border-dark overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-8 border-b border-border-light dark:border-border-dark bg-gray-50/50 dark:bg-secondary-dark/30">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary-light text-white rounded-2xl flex items-center justify-center shadow-lg">
                <UserPlus size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-black dark:text-white tracking-tight uppercase">Sub Admin Setup</h3>
                <p className="text-xs text-text-secondary-light font-bold">Step {step} of 3: {step === 1 ? 'Verification' : step === 2 ? 'Permissions & Area' : 'Security & Access'}</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-secondary-dark rounded-xl transition-all"><X size={20} className="dark:text-white" /></button>
          </div>
          
          <div className="flex gap-2">
            {[1, 2, 3].map(i => (
              <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${i <= step ? 'bg-primary-light' : 'bg-gray-200 dark:bg-border-dark'}`}></div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
            {step === 1 && (
              <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">Full Name</label>
                    <input type="text" placeholder="John Doe" className="w-full px-4 py-3.5 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-bold transition-all" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">Employee ID</label>
                    <input type="text" placeholder="SA-1004" className="w-full px-4 py-3.5 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-bold transition-all" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">Email Address</label>
                    <div className="relative">
                      <input 
                        type="email" 
                        placeholder="admin@premium.com" 
                        disabled={isEmailVerified}
                        className={`w-full px-4 py-3.5 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-bold transition-all ${isEmailVerified ? 'border-success bg-success/5 pr-12' : 'pr-24'}`} 
                        required 
                      />
                      {isEmailVerified ? (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-success">
                          <CheckCircle size={20} />
                        </div>
                      ) : (
                        <button 
                          type="button" 
                          onClick={verifyEmail}
                          disabled={sendingEmailOtp}
                          className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-primary-light text-white text-[10px] font-black rounded-lg hover:scale-105 transition-all disabled:opacity-50"
                        >
                          {sendingEmailOtp ? 'Sending...' : 'Verify'}
                        </button>
                      )}
                    </div>
                    {showEmailOtpInput && (
                      <div className="flex gap-2 mt-2 animate-in slide-in-from-top-2 duration-200">
                        <input 
                          type="text" 
                          placeholder="Enter 6-digit OTP" 
                          maxLength={6}
                          value={emailOtp}
                          onChange={(e) => setEmailOtp(e.target.value)}
                          className="flex-1 px-4 py-2 bg-gray-100 dark:bg-secondary-dark/50 border-2 border-primary-light/30 rounded-xl outline-none dark:text-white text-xs font-bold"
                        />
                        <button 
                          type="button" 
                          onClick={confirmEmailOtp}
                          className="px-4 py-2 bg-primary-light text-white text-[10px] font-black rounded-xl"
                        >
                          Confirm
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">Phone Number</label>
                    <div className="relative">
                      <input 
                        type="tel" 
                        placeholder="+91 98765 43210" 
                        disabled={isPhoneVerified}
                        className={`w-full px-4 py-3.5 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-bold transition-all ${isPhoneVerified ? 'border-success bg-success/5 pr-12' : 'pr-24'}`} 
                        required 
                      />
                      {isPhoneVerified ? (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-success">
                          <CheckCircle size={20} />
                        </div>
                      ) : (
                        <button 
                          type="button" 
                          onClick={verifyPhone}
                          disabled={sendingPhoneOtp}
                          className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-primary-light text-white text-[10px] font-black rounded-lg hover:scale-105 transition-all disabled:opacity-50"
                        >
                          {sendingPhoneOtp ? 'Sending...' : 'Verify'}
                        </button>
                      )}
                    </div>
                    {showPhoneOtpInput && (
                      <div className="flex gap-2 mt-2 animate-in slide-in-from-top-2 duration-200">
                        <input 
                          type="text" 
                          placeholder="Enter 6-digit OTP" 
                          maxLength={6}
                          value={phoneOtp}
                          onChange={(e) => setPhoneOtp(e.target.value)}
                          className="flex-1 px-4 py-2 bg-gray-100 dark:bg-secondary-dark/50 border-2 border-primary-light/30 rounded-xl outline-none dark:text-white text-xs font-bold"
                        />
                        <button 
                          type="button" 
                          onClick={confirmPhoneOtp}
                          className="px-4 py-2 bg-primary-light text-white text-[10px] font-black rounded-xl"
                        >
                          Confirm
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">Access Level</label>
                    <select className="w-full px-4 py-3.5 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-bold transition-all appearance-none">
                      <option>State Wise</option>
                      <option>District Wise</option>
                      <option>Taluk Wise</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">Assigned Location</label>
                    <input type="text" placeholder="e.g. Maharashtra" className="w-full px-4 py-3.5 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-bold transition-all" />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] font-black text-text-secondary-light uppercase tracking-widest">Permission Controls</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Object.keys(permissions).map(key => (
                      <div key={key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-secondary-dark rounded-2xl border border-border-light dark:border-border-dark group hover:border-primary-light/30 transition-all">
                        <span className="text-xs font-bold dark:text-white capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                        <div 
                          onClick={() => setPermissions(prev => ({ ...prev, [key]: !prev[key] }))}
                          className={`w-10 h-5 rounded-full relative cursor-pointer transition-all ${permissions[key] ? 'bg-primary-light' : 'bg-gray-300 dark:bg-border-dark'}`}
                        >
                          <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${permissions[key] ? 'left-6' : 'left-1'}`}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                <div className="p-6 bg-primary-light/5 rounded-[2rem] border-2 border-dashed border-primary-light/20 flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-primary-light/10 text-primary-light rounded-full flex items-center justify-center mb-4">
                    <Key size={32} />
                  </div>
                  <h4 className="font-black dark:text-white uppercase tracking-tight">Generate Login Credentials</h4>
                  <p className="text-xs text-text-secondary-light font-bold mt-2">A temporary password will be auto-generated and sent to the administrator.</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-secondary-dark rounded-2xl">
                    <div className="w-10 h-10 bg-success/10 text-success rounded-xl flex items-center justify-center">
                      <Check size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-black dark:text-white">Email Notification Enabled</p>
                      <p className="text-[10px] text-text-secondary-light font-bold">Standard onboarding kit will be sent.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-secondary-dark rounded-2xl">
                    <div className="w-10 h-10 bg-blue-500/10 text-blue-500 rounded-xl flex items-center justify-center">
                      <Smartphone size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-black dark:text-white">SMS Notification Enabled</p>
                      <p className="text-[10px] text-text-secondary-light font-bold">Credential summary via text message.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-8 border-t border-border-light dark:border-border-dark bg-gray-50/50 dark:bg-secondary-dark/30 flex gap-4">
            {step > 1 ? (
              <button type="button" onClick={handleBack} className="flex-1 py-4 rounded-2xl font-black text-sm border-2 border-border-light dark:border-border-dark dark:text-white hover:bg-white dark:hover:bg-secondary-dark transition-all">Back</button>
            ) : (
              <button type="button" onClick={onClose} className="flex-1 py-4 rounded-2xl font-black text-sm border-2 border-border-light dark:border-border-dark dark:text-white hover:bg-white dark:hover:bg-secondary-dark transition-all">Cancel</button>
            )}
            
            {step < 3 ? (
              <button type="button" onClick={handleNext} className="flex-[2] py-4 rounded-2xl bg-primary-light text-white font-black text-sm shadow-xl shadow-primary-light/20 hover:scale-[1.02] transition-all">Continue</button>
            ) : (
              <button type="submit" className="flex-[2] py-4 rounded-2xl bg-success text-white font-black text-sm shadow-xl shadow-success/20 hover:scale-[1.02] transition-all">Complete Setup</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

const AddAgentModal = ({ isOpen, onClose, onAdd, initialData }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Pincode Agent',
    territory: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        role: initialData.role || 'Pincode Agent',
        territory: initialData.territory || ''
      });
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        role: 'Pincode Agent',
        territory: ''
      });
    }
  }, [initialData, isOpen]);

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
            <h3 className="text-2xl font-black dark:text-white tracking-tight">{initialData ? 'Edit Agent Profile' : 'Register New Agent'}</h3>
            <p className="text-sm text-text-secondary-light mt-1">{initialData ? 'Update the details for this agent.' : 'Fill in the details to add a new agent to the network.'}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-secondary-dark rounded-xl transition-all hover:rotate-90"
          >
            <X size={20} className="dark:text-white" />
          </button>
        </div>

        <form className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={(e) => {
          e.preventDefault();
          onAdd(formData);
        }}>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-text-secondary-light ml-1">Full Name</label>
            <div className="relative group">
              <input 
                type="text" 
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
                className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light focus:bg-white dark:focus:bg-background-dark transition-all outline-none dark:text-white font-medium"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-text-secondary-light ml-1">Email Address</label>
            <input 
              type="email" 
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
              className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light focus:bg-white dark:focus:bg-background-dark transition-all outline-none dark:text-white font-medium"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-text-secondary-light ml-1">Phone Number</label>
            <input 
              type="tel" 
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              required
              className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light focus:bg-white dark:focus:bg-background-dark transition-all outline-none dark:text-white font-medium"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-text-secondary-light ml-1">Agent Role</label>
            <select 
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
              className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light focus:bg-white dark:focus:bg-background-dark transition-all outline-none dark:text-white font-medium appearance-none"
            >
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
              value={formData.territory}
              onChange={(e) => setFormData({...formData, territory: e.target.value})}
              required
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
              {initialData ? 'Save Changes' : 'Create Agent Profile'}
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

const SetTargetModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background-dark/80 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose}></div>
      
      <div className="relative w-full max-w-xl bg-surface-light dark:bg-surface-dark rounded-[32px] shadow-2xl border border-border-light dark:border-border-dark overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="p-8 border-b dark:border-border-dark flex justify-between items-center bg-primary-light/5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-primary-light text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary-light/20">
              <Target size={32} className="animate-pulse" />
            </div>
            <div>
              <h3 className="text-2xl font-black dark:text-white tracking-tight leading-tight">Define New Goal</h3>
              <p className="text-sm text-text-secondary-light font-bold">Set sales & growth targets for agents.</p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-white dark:hover:bg-secondary-dark rounded-2xl transition-all shadow-sm">
            <X size={24} className="dark:text-white" />
          </button>
        </div>

        <form className="p-8 space-y-6" onSubmit={(e) => {
          e.preventDefault();
          onClose();
        }}>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">Agent Category</label>
              <div className="relative">
                <select className="w-full px-4 py-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-bold appearance-none">
                  <option>State Agents</option>
                  <option>District Agents</option>
                  <option>Divisional Agents</option>
                  <option>Pincode Agents</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary-light pointer-events-none" size={16} />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">Goal Type</label>
              <div className="relative">
                <select className="w-full px-4 py-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-bold appearance-none">
                  <option>Shop Onboarding</option>
                  <option>Sales Volume</option>
                  <option>Revenue Generated</option>
                  <option>New User Signups</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary-light pointer-events-none" size={16} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">Target Value</label>
              <div className="relative">
                <input type="text" placeholder="e.g. 50 Shops" className="w-full px-4 py-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-bold" />
                <Briefcase className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary-light opacity-50" size={18} />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1 flex items-center gap-1"><Trophy size={12} className="text-orange-500" /> Incentive / Reward</label>
              <div className="relative">
                <select className="w-full px-4 py-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-bold appearance-none">
                  <option>₹1,000 Bonus</option>
                  <option>₹2,000 Bonus</option>
                  <option>₹5,000 Bonus</option>
                  <option>₹7,500 Bonus</option>
                  <option>₹10,000 Bonus</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary-light pointer-events-none" size={16} />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">Deadline Date</label>
            <div className="relative">
              <input type="date" className="w-full px-4 py-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-bold" />
              <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary-light opacity-50" size={18} />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">Instruction / Notes</label>
            <textarea placeholder="Specify any additional requirements or bonus conditions..." rows="3" className="w-full px-4 py-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-bold resize-none"></textarea>
          </div>

          <div className="pt-4 flex gap-4">
            <button type="button" onClick={onClose} className="flex-1 py-4 bg-gray-50 dark:bg-secondary-dark dark:text-white rounded-2xl font-black text-sm hover:bg-gray-100 transition-all">Cancel</button>
            <button type="submit" className="flex-[2] py-4 bg-primary-light text-white rounded-2xl font-black text-sm shadow-xl shadow-primary-light/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
              <Zap size={18} /> Deploy Target to Agents
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const BulkPayoutModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background-dark/80 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose}></div>
      
      <div className="relative w-full max-w-2xl bg-surface-light dark:bg-surface-dark rounded-[32px] shadow-2xl border border-border-light dark:border-border-dark overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-8 border-b dark:border-border-dark flex justify-between items-center bg-primary-light/5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-primary-light text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary-light/20">
              <Percent size={32} className="animate-pulse" />
            </div>
            <div>
              <h3 className="text-2xl font-black dark:text-white tracking-tight leading-tight">Process Bulk Payout</h3>
              <p className="text-sm text-text-secondary-light font-bold">Review and release pending commissions.</p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-white dark:hover:bg-secondary-dark rounded-2xl transition-all shadow-sm">
            <X size={24} className="dark:text-white" />
          </button>
        </div>

        <div className="p-8 overflow-y-auto flex-1 custom-scrollbar">
          <div className="space-y-6">
            {/* Summary */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 dark:bg-secondary-dark rounded-2xl border border-border-light dark:border-border-dark">
                <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light mb-1">Total Pending</p>
                <h4 className="text-2xl font-black text-orange-500">₹4.8L</h4>
                <p className="text-xs font-bold text-text-secondary-light mt-1">Across 145 Agents</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-secondary-dark rounded-2xl border border-border-light dark:border-border-dark">
                <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light mb-1">Ready to Release</p>
                <h4 className="text-2xl font-black text-primary-light">₹2.1L</h4>
                <p className="text-xs font-bold text-text-secondary-light mt-1">Verified & Approved (64 Agents)</p>
              </div>
            </div>

            {/* List */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-bold dark:text-white text-sm">Payout Queue (Ready)</h4>
                <button className="text-xs font-bold text-primary-light hover:underline">Select All</button>
              </div>
              <div className="space-y-2">
                {[
                  { name: 'Amit Singh', role: 'State Agent', amount: '₹72,500', bank: 'HDFC Bank •••• 9842' },
                  { name: 'Priya Verma', role: 'District Agent', amount: '₹65,600', bank: 'ICICI Bank •••• 5521' },
                  { name: 'Ravi Kumar', role: 'Divisional Agent', amount: '₹34,200', bank: 'SBI •••• 1122' },
                  { name: 'Anjali Desai', role: 'Pincode Agent', amount: '₹12,400', bank: 'Axis Bank •••• 8844' }
                ].map((agent, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-secondary-dark/50 rounded-xl hover:bg-gray-100 dark:hover:bg-secondary-dark transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-5 h-5 rounded border border-border-light dark:border-border-dark flex items-center justify-center bg-primary-light text-white">
                        <CheckCircle size={14} />
                      </div>
                      <div>
                        <p className="font-bold dark:text-white text-sm">{agent.name}</p>
                        <p className="text-[10px] text-text-secondary-light font-bold uppercase tracking-wider">{agent.role} • {agent.bank}</p>
                      </div>
                    </div>
                    <p className="font-black text-success">{agent.amount}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Authentication */}
            <div className="space-y-2 pt-4 border-t border-border-light dark:border-border-dark">
               <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">Admin Authorization Code</label>
               <div className="relative">
                 <input type="password" placeholder="Enter PIN to authorize release" className="w-full px-4 py-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-bold tracking-widest" />
                 <Key className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary-light opacity-50" size={18} />
               </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t dark:border-border-dark bg-gray-50/50 dark:bg-secondary-dark/30 flex gap-4">
          <button onClick={onClose} className="flex-1 py-4 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-2xl font-black text-sm dark:text-white hover:bg-gray-100 transition-all">Cancel</button>
          <button 
            onClick={() => {
              alert('Processing payouts...');
              onClose();
            }} 
            className="flex-[2] py-4 bg-primary-light text-white rounded-2xl font-black text-sm shadow-xl shadow-primary-light/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <Coins size={18} /> Confirm & Release ₹2.1L
          </button>
        </div>
      </div>
    </div>
  );
};

const MapTerritoryModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background-dark/80 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose}></div>
      
      <div className="relative w-full max-w-5xl bg-surface-light dark:bg-surface-dark rounded-[32px] shadow-2xl border border-border-light dark:border-border-dark overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col md:flex-row h-[90vh] md:h-auto md:max-h-[85vh]">
        
        {/* Left Side: Form */}
        <div className="w-full md:w-2/5 p-8 overflow-y-auto custom-scrollbar flex flex-col">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-primary-light text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary-light/20">
              <MapPin size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black dark:text-white tracking-tight">Map New Territory</h3>
              <p className="text-xs text-text-secondary-light font-bold uppercase tracking-widest">Territory Definition</p>
            </div>
          </div>

          <form className="space-y-6 flex-1">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">Select State</label>
              <div className="relative">
                <select className="w-full px-4 py-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-bold appearance-none">
                  <option>Maharashtra</option>
                  <option>Telangana</option>
                  <option>Karnataka</option>
                  <option>Tamil Nadu</option>
                  <option>Delhi</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary-light pointer-events-none" size={16} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">District</label>
                <input type="text" placeholder="e.g. Mumbai" className="w-full px-4 py-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-bold" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">Division</label>
                <input type="text" placeholder="e.g. South Mumbai" className="w-full px-4 py-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-bold" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">Assigned Pincodes</label>
              <textarea placeholder="Enter pincodes separated by commas (e.g. 400001, 400002)" rows="3" className="w-full px-4 py-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-bold resize-none"></textarea>
              <p className="text-[10px] text-text-secondary-light font-bold mt-1 ml-1">* Total 245 Pincodes available in this district.</p>
            </div>

            <div className="pt-4 space-y-3">
              <button type="button" className="w-full py-4 bg-primary-light text-white rounded-2xl font-black text-sm shadow-xl shadow-primary-light/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                <Navigation size={18} /> Validate & Map Territory
              </button>
              <button type="button" onClick={onClose} className="w-full py-4 bg-gray-50 dark:bg-secondary-dark dark:text-white rounded-2xl font-black text-sm hover:bg-gray-100 transition-all border border-border-light dark:border-border-dark">Cancel</button>
            </div>
          </form>
        </div>

        {/* Right Side: Map Visualization */}
        <div className="flex-1 bg-gray-100 dark:bg-background-dark relative overflow-hidden flex items-center justify-center min-h-[300px] md:min-h-0 border-l dark:border-border-dark">
          {/* Simulated Map UI */}
          <div className="absolute inset-0 opacity-20 dark:opacity-10 pointer-events-none">
            <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/0,0,0/1200x800?access_token=pk.xxx')] bg-cover bg-center"></div>
          </div>
          
          <div className="relative z-10 text-center p-8">
            <div className="w-20 h-20 bg-white dark:bg-surface-dark rounded-full shadow-2xl flex items-center justify-center mx-auto mb-6 group cursor-pointer hover:scale-110 transition-transform">
              <MapPin size={40} className="text-primary-light animate-bounce" />
            </div>
            <h4 className="text-2xl font-black dark:text-white tracking-tight">Interactive Map Preview</h4>
            <p className="text-sm text-text-secondary-light font-bold max-w-xs mx-auto mt-2 leading-relaxed">
              Click and drag to define boundaries or select pincodes directly on the map interface.
            </p>
            
            <div className="mt-8 flex gap-3 justify-center">
              <button className="px-4 py-2 bg-white dark:bg-surface-dark rounded-xl shadow-lg text-xs font-black dark:text-white flex items-center gap-2 hover:bg-gray-50 transition-all">
                <Search size={14} /> Search Area
              </button>
              <button className="px-4 py-2 bg-white dark:bg-surface-dark rounded-xl shadow-lg text-xs font-black dark:text-white flex items-center gap-2 hover:bg-gray-50 transition-all">
                <Navigation size={14} /> My Location
              </button>
            </div>
          </div>

          {/* Map Controls */}
          <div className="absolute top-6 right-6 flex flex-col gap-2">
            <button className="w-10 h-10 bg-white dark:bg-surface-dark rounded-xl shadow-xl flex items-center justify-center font-black dark:text-white hover:bg-gray-50 transition-all text-xl">+</button>
            <button className="w-10 h-10 bg-white dark:bg-surface-dark rounded-xl shadow-xl flex items-center justify-center font-black dark:text-white hover:bg-gray-50 transition-all text-xl">-</button>
          </div>
          
          {/* Legend */}
          <div className="absolute bottom-6 right-6 bg-white/80 dark:bg-surface-dark/80 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/20">
            <h5 className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light mb-3">Map Legend</h5>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary-light rounded-full shadow-sm"></div>
                <span className="text-[10px] font-bold dark:text-white">Active Territory</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full shadow-sm"></div>
                <span className="text-[10px] font-bold dark:text-white">Pending Approval</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full shadow-sm"></div>
                <span className="text-[10px] font-bold dark:text-white">Unassigned</span>
              </div>
            </div>
          </div>
        </div>

        {/* Close Button Mobile */}
        <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full md:hidden">
          <X size={20} className="text-white" />
        </button>
      </div>
    </div>
  );
};

const ReportModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background-dark/80 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose}></div>
      
      <div className="relative w-full max-w-4xl bg-surface-light dark:bg-surface-dark rounded-[32px] shadow-2xl border border-border-light dark:border-border-dark overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-8 border-b dark:border-border-dark flex justify-between items-center bg-gray-50/50 dark:bg-secondary-dark/30">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-emerald-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <FileText size={32} />
            </div>
            <div>
              <h3 className="text-2xl font-black dark:text-white tracking-tight leading-tight">Monthly Revenue Report</h3>
              <p className="text-sm text-text-secondary-light font-bold">April 2026 • Financial Performance</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-3 bg-white dark:bg-secondary-dark hover:bg-gray-50 rounded-2xl transition-all shadow-sm border border-border-light dark:border-border-dark">
              <Share2 size={20} className="text-text-secondary-light" />
            </button>
            <button onClick={onClose} className="p-3 hover:bg-white dark:hover:bg-secondary-dark rounded-2xl transition-all shadow-sm">
              <X size={24} className="dark:text-white" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto flex-1 custom-scrollbar space-y-8">
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-emerald-500/10 rounded-3xl border border-emerald-500/20">
              <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-1">Total Revenue</p>
              <h4 className="text-3xl font-black text-emerald-600">₹25.5L</h4>
              <div className="flex items-center gap-1 text-emerald-600 mt-2 text-xs font-bold">
                <ArrowUpRight size={14} /> +18.4% vs last month
              </div>
            </div>
            <div className="p-6 bg-blue-500/10 rounded-3xl border border-blue-500/20">
              <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-1">Active Agents</p>
              <h4 className="text-3xl font-black text-blue-600">1,245</h4>
              <div className="flex items-center gap-1 text-blue-600 mt-2 text-xs font-bold">
                <ArrowUpRight size={14} /> +42 new this month
              </div>
            </div>
            <div className="p-6 bg-purple-500/10 rounded-3xl border border-purple-500/20">
              <p className="text-[10px] font-black uppercase tracking-widest text-purple-600 mb-1">Avg. Transaction</p>
              <h4 className="text-3xl font-black text-purple-600">₹12,450</h4>
              <div className="flex items-center gap-1 text-purple-600 mt-2 text-xs font-bold">
                <ArrowDownRight size={14} /> -2.1% vs last month
              </div>
            </div>
          </div>

          {/* Breakdown Table */}
          <div className="space-y-4">
            <h4 className="font-black dark:text-white text-lg tracking-tight">Revenue Breakdown</h4>
            <div className="border border-border-light dark:border-border-dark rounded-3xl overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50 dark:bg-secondary-dark/50 text-[10px] font-black uppercase tracking-widest text-text-secondary-light">
                    <th className="px-6 py-4">Revenue Stream</th>
                    <th className="px-6 py-4">Total Value</th>
                    <th className="px-6 py-4">Contribution</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y dark:divide-border-dark">
                  {[
                    { name: 'Membership Fees', value: '₹15.2L', share: '59%', status: 'Stable' },
                    { name: 'Onboarding Charges', value: '₹4.8L', share: '19%', status: 'Growing' },
                    { name: 'Platform Service Tax', value: '₹3.2L', share: '13%', status: 'Stable' },
                    { name: 'Agent Target Overheads', value: '₹2.3L', share: '9%', status: 'At Risk' }
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50 dark:hover:bg-secondary-dark/30 transition-colors">
                      <td className="px-6 py-4 font-bold dark:text-white text-sm">{row.name}</td>
                      <td className="px-6 py-4 font-black dark:text-white text-sm">{row.value}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-2 bg-gray-100 dark:bg-secondary-dark rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 rounded-full" style={{ width: row.share }}></div>
                          </div>
                          <span className="text-[10px] font-black dark:text-white">{row.share}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          row.status === 'Growing' ? 'bg-emerald-100 text-emerald-600' : 
                          row.status === 'At Risk' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-8 border-t dark:border-border-dark bg-gray-50/50 dark:bg-secondary-dark/30 flex gap-4">
          <button className="flex-1 py-4 bg-primary-light text-white rounded-2xl font-black text-sm shadow-xl shadow-primary-light/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
            <Download size={18} /> Download PDF Report
          </button>
          <button className="flex-1 py-4 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-2xl font-black text-sm dark:text-white hover:bg-gray-100 transition-all flex items-center justify-center gap-2">
            <PieChart size={18} /> View Analytics Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

const ForecastModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background-dark/80 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose}></div>
      
      <div className="relative w-full max-w-4xl bg-surface-light dark:bg-surface-dark rounded-[32px] shadow-2xl border border-border-light dark:border-border-dark overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-8 border-b dark:border-border-dark flex justify-between items-center bg-blue-500/5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/20">
              <TrendingUp size={32} />
            </div>
            <div>
              <h3 className="text-2xl font-black dark:text-white tracking-tight leading-tight">Annual Revenue Forecast</h3>
              <p className="text-sm text-text-secondary-light font-bold">Projected Performance • FY 2026-27</p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-white dark:hover:bg-secondary-dark rounded-2xl transition-all shadow-sm">
            <X size={24} className="dark:text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto flex-1 custom-scrollbar space-y-8">
          {/* Projection Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-[32px] text-white shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform duration-700">
                <TrendingUp size={120} />
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Projected Annual Revenue</p>
              <h4 className="text-5xl font-black mt-2">₹3.2Cr</h4>
              <p className="text-xs mt-4 font-bold opacity-90 flex items-center gap-2">
                <ArrowUpRight size={14} /> Estimated 35% YoY Growth
              </p>
            </div>
            <div className="p-8 bg-surface-light dark:bg-secondary-dark rounded-[32px] border border-border-light dark:border-border-dark shadow-xl">
              <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light mb-4">Quarterly Projections</p>
              <div className="space-y-4">
                {[
                  { label: 'Q1 (Apr-Jun)', value: '₹65L', progress: '20%' },
                  { label: 'Q2 (Jul-Sep)', value: '₹78L', progress: '24%' },
                  { label: 'Q3 (Oct-Dec)', value: '₹85L', progress: '27%' },
                  { label: 'Q4 (Jan-Mar)', value: '₹92L', progress: '29%' }
                ].map((q, i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="dark:text-white">{q.label}</span>
                      <span className="text-blue-600">{q.value}</span>
                    </div>
                    <div className="h-2 bg-gray-100 dark:bg-background-dark rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 rounded-full" style={{ width: q.progress }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Forecast Insights */}
          <div className="space-y-4">
            <h4 className="font-black dark:text-white text-lg tracking-tight">Growth Drivers & Risks</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl">
                <h5 className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-2">Expansion</h5>
                <p className="text-xs font-bold dark:text-white leading-relaxed">Agent network expected to grow by 500+ new members in Q3.</p>
              </div>
              <div className="p-4 bg-blue-500/5 border border-blue-500/10 rounded-2xl">
                <h5 className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-2">Productivity</h5>
                <p className="text-xs font-bold dark:text-white leading-relaxed">New CRM tools projected to increase agent output by 12%.</p>
              </div>
              <div className="p-4 bg-orange-500/5 border border-orange-500/10 rounded-2xl">
                <h5 className="text-[10px] font-black uppercase tracking-widest text-orange-600 mb-2">Market Risk</h5>
                <p className="text-xs font-bold dark:text-white leading-relaxed">Potential seasonality dip expected during the monsoon quarter.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-8 border-t dark:border-border-dark bg-gray-50/50 dark:bg-secondary-dark/30 flex gap-4">
          <button className="flex-1 py-4 bg-primary-light text-white rounded-2xl font-black text-sm shadow-xl shadow-primary-light/20 hover:scale-[1.02] active:scale-[0.98] transition-all">Update Projection Model</button>
          <button onClick={onClose} className="flex-1 py-4 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-2xl font-black text-sm dark:text-white hover:bg-gray-100 transition-all">Close</button>
        </div>
      </div>
    </div>
  );
};

const FilterModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background-dark/80 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose}></div>
      
      <div className="relative w-full max-w-xl bg-surface-light dark:bg-surface-dark rounded-[32px] shadow-2xl border border-border-light dark:border-border-dark overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-8 border-b dark:border-border-dark flex justify-between items-center bg-gray-50/50 dark:bg-secondary-dark/30">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary-light text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary-light/20">
              <Filter size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black dark:text-white tracking-tight">Report Filters</h3>
              <p className="text-xs text-text-secondary-light font-bold uppercase tracking-widest">Refine Data Output</p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-white dark:hover:bg-secondary-dark rounded-2xl transition-all shadow-sm">
            <X size={24} className="dark:text-white" />
          </button>
        </div>

        <div className="p-8 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">Date Range</label>
              <div className="relative">
                <select className="w-full px-4 py-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-bold appearance-none">
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                  <option>This Month</option>
                  <option>Last Quarter</option>
                  <option>Custom Range</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary-light pointer-events-none" size={16} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">Region</label>
                <div className="relative">
                  <select className="w-full px-4 py-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-bold appearance-none">
                    <option>All India</option>
                    <option>North Zone</option>
                    <option>South Zone</option>
                    <option>East Zone</option>
                    <option>West Zone</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary-light pointer-events-none" size={16} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">Category</label>
                <div className="relative">
                  <select className="w-full px-4 py-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-bold appearance-none">
                    <option>All Streams</option>
                    <option>Retail</option>
                    <option>Distribution</option>
                    <option>Logistics</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary-light pointer-events-none" size={16} />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">Report Format</label>
              <div className="flex gap-4">
                {['Excel (XLS)', 'PDF Document', 'CSV Data'].map((format) => (
                  <button key={format} className="flex-1 py-3 px-4 bg-gray-50 dark:bg-secondary-dark rounded-xl border-2 border-transparent hover:border-primary-light transition-all text-xs font-bold dark:text-white">
                    {format}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 flex gap-4">
            <button onClick={onClose} className="flex-1 py-4 bg-gray-50 dark:bg-secondary-dark dark:text-white rounded-2xl font-black text-sm hover:bg-gray-100 transition-all border border-border-light dark:border-border-dark">Clear All</button>
            <button className="flex-1 py-4 bg-primary-light text-white rounded-2xl font-black text-sm shadow-xl shadow-primary-light/20 hover:scale-[1.02] active:scale-[0.98] transition-all">Apply Filters</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CustomReportModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background-dark/80 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose}></div>
      
      <div className="relative w-full max-w-2xl bg-surface-light dark:bg-surface-dark rounded-[32px] shadow-2xl border border-border-light dark:border-border-dark overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
        <div className="p-8 border-b dark:border-border-dark flex justify-between items-center bg-emerald-500/5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-emerald-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <BarChartIcon size={32} />
            </div>
            <div>
              <h3 className="text-2xl font-black dark:text-white tracking-tight leading-tight">Generate Custom Report</h3>
              <p className="text-sm text-text-secondary-light font-bold">Build a personalized data export.</p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-white dark:hover:bg-secondary-dark rounded-2xl transition-all shadow-sm">
            <X size={24} className="dark:text-white" />
          </button>
        </div>

        <div className="p-8 overflow-y-auto flex-1 custom-scrollbar space-y-8">
          <div className="space-y-4">
            <h4 className="font-black dark:text-white text-lg tracking-tight">Step 1: Select Data Modules</h4>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Revenue Logs', icon: <CreditCard size={16} /> },
                { label: 'Agent Activity', icon: <Activity size={16} /> },
                { label: 'Shop Onboarding', icon: <Package size={16} /> },
                { label: 'KYC Verifications', icon: <ShieldCheck size={16} /> },
                { label: 'Commission Payouts', icon: <Coins size={16} /> },
                { label: 'User Signups', icon: <Users size={16} /> }
              ].map((mod) => (
                <button key={mod.label} className="p-4 bg-gray-50 dark:bg-secondary-dark rounded-2xl border-2 border-transparent hover:border-emerald-500 transition-all flex items-center gap-3">
                  <div className="text-text-secondary-light">{mod.icon}</div>
                  <span className="text-xs font-bold dark:text-white">{mod.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-black dark:text-white text-lg tracking-tight">Step 2: Configuration</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-secondary-dark rounded-2xl border border-border-light dark:border-border-dark">
                <div>
                  <p className="text-xs font-black dark:text-white">Include Detailed Logs</p>
                  <p className="text-[10px] text-text-secondary-light font-bold">Add row-level transaction data.</p>
                </div>
                <div className="w-12 h-6 bg-emerald-500 rounded-full relative p-1 cursor-pointer">
                  <div className="w-4 h-4 bg-white rounded-full absolute right-1 shadow-sm"></div>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-secondary-dark rounded-2xl border border-border-light dark:border-border-dark">
                <div>
                  <p className="text-xs font-black dark:text-white">Trend Comparisons</p>
                  <p className="text-[10px] text-text-secondary-light font-bold">Show variance from previous period.</p>
                </div>
                <div className="w-12 h-6 bg-gray-300 dark:bg-gray-600 rounded-full relative p-1 cursor-pointer">
                  <div className="w-4 h-4 bg-white rounded-full absolute left-1 shadow-sm"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 border-t dark:border-border-dark bg-gray-50/50 dark:bg-secondary-dark/30 flex gap-4">
          <button className="flex-1 py-4 bg-emerald-500 text-white rounded-2xl font-black text-sm shadow-xl shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
            <FileSpreadsheet size={18} /> Generate .XLSX
          </button>
          <button onClick={onClose} className="flex-1 py-4 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-2xl font-black text-sm dark:text-white hover:bg-gray-100 transition-all">Close</button>
        </div>
      </div>
    </div>
  );
};

const TemplatesModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background-dark/80 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose}></div>
      
      <div className="relative w-full max-w-3xl bg-surface-light dark:bg-surface-dark rounded-[32px] shadow-2xl border border-border-light dark:border-border-dark overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[85vh]">
        <div className="p-8 border-b dark:border-border-dark flex justify-between items-center bg-gray-50/50 dark:bg-secondary-dark/30">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary-light text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary-light/20">
              <Layout size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black dark:text-white tracking-tight">Broadcast Templates</h3>
              <p className="text-xs text-text-secondary-light font-bold uppercase tracking-widest">Manage Message Presets</p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-white dark:hover:bg-secondary-dark rounded-2xl transition-all shadow-sm">
            <X size={24} className="dark:text-white" />
          </button>
        </div>

        <div className="p-8 overflow-y-auto custom-scrollbar flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: 'Welcome Message', type: 'Email/SMS', content: 'Welcome to AgentHub! Your account is now active...' },
              { title: 'KYC Approved', type: 'Push', content: 'Great news! Your KYC has been verified successfully.' },
              { title: 'Monthly Payout', type: 'SMS', content: 'Your commission for April 2026 has been released.' },
              { title: 'Target Update', type: 'Push', content: 'New targets have been assigned to your territory.' }
            ].map((tpl, i) => (
              <div key={i} className="p-6 bg-gray-50 dark:bg-secondary-dark rounded-3xl border border-border-light dark:border-border-dark group hover:border-primary-light transition-all cursor-pointer">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-black dark:text-white text-sm">{tpl.title}</h4>
                  <span className="px-2 py-0.5 bg-primary-light/10 text-primary-light rounded-full text-[10px] font-bold">{tpl.type}</span>
                </div>
                <p className="text-xs text-text-secondary-light line-clamp-2 leading-relaxed mb-4">{tpl.content}</p>
                <div className="flex gap-2">
                  <button className="text-[10px] font-black text-primary-light uppercase tracking-widest hover:underline">Edit</button>
                  <button className="text-[10px] font-black text-error uppercase tracking-widest hover:underline">Delete</button>
                </div>
              </div>
            ))}
            <button className="p-6 border-2 border-dashed border-border-light dark:border-border-dark rounded-3xl flex flex-col items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-secondary-dark transition-all">
              <div className="w-10 h-10 bg-gray-100 dark:bg-background-dark rounded-full flex items-center justify-center">
                <Plus size={20} className="text-text-secondary-light" />
              </div>
              <span className="text-xs font-black dark:text-white uppercase tracking-widest">Create New</span>
            </button>
          </div>
        </div>

        <div className="p-8 border-t dark:border-border-dark bg-gray-50/50 dark:bg-secondary-dark/30">
          <button onClick={onClose} className="w-full py-4 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-2xl font-black text-sm dark:text-white hover:bg-gray-100 transition-all">Close</button>
        </div>
      </div>
    </div>
  );
};

const BroadcastModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background-dark/80 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose}></div>
      
      <div className="relative w-full max-w-4xl bg-surface-light dark:bg-surface-dark rounded-[32px] shadow-2xl border border-border-light dark:border-border-dark overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
        <div className="p-8 border-b dark:border-border-dark flex justify-between items-center bg-primary-light/5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-primary-light text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary-light/20">
              <Megaphone size={32} />
            </div>
            <div>
              <h3 className="text-2xl font-black dark:text-white tracking-tight leading-tight">Create New Broadcast</h3>
              <p className="text-sm text-text-secondary-light font-bold">Send announcements to your agent network.</p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-white dark:hover:bg-secondary-dark rounded-2xl transition-all shadow-sm">
            <X size={24} className="dark:text-white" />
          </button>
        </div>

        <div className="p-8 overflow-y-auto custom-scrollbar flex-1 flex flex-col md:flex-row gap-8">
          {/* Left: Editor */}
          <div className="flex-1 space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">Recipient Group</label>
              <div className="relative">
                <select className="w-full px-4 py-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-bold appearance-none">
                  <option>All India Agents</option>
                  <option>State Agents Only</option>
                  <option>Verified (KYC) Agents</option>
                  <option>Mumbai Territory</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary-light pointer-events-none" size={16} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">Broadcast Channel</label>
              <div className="flex gap-3">
                {[
                  { icon: <Smartphone size={16} />, label: 'Push' },
                  { icon: <MessageSquare size={16} />, label: 'SMS' },
                  { icon: <Mail size={16} />, label: 'Email' }
                ].map((ch) => (
                  <button key={ch.label} className="flex-1 p-4 bg-gray-50 dark:bg-secondary-dark rounded-2xl border-2 border-transparent hover:border-primary-light flex flex-col items-center gap-2">
                    <div className="text-text-secondary-light">{ch.icon}</div>
                    <span className="text-[10px] font-black dark:text-white uppercase tracking-widest">{ch.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">Message Content</label>
              <textarea placeholder="Write your broadcast message here..." rows="5" className="w-full px-4 py-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-bold resize-none leading-relaxed"></textarea>
            </div>
          </div>

          {/* Right: Preview */}
          <div className="w-full md:w-80 space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">Mobile Preview</h4>
            <div className="bg-gray-100 dark:bg-background-dark rounded-[40px] p-4 border-[6px] border-gray-200 dark:border-secondary-dark aspect-[9/16] relative">
              <div className="w-20 h-1.5 bg-gray-200 dark:bg-secondary-dark rounded-full mx-auto mb-4"></div>
              <div className="space-y-3">
                <div className="bg-white dark:bg-surface-dark p-3 rounded-2xl shadow-lg border-l-4 border-primary-light animate-in slide-in-from-top-4 duration-500">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-4 h-4 bg-primary-light rounded flex items-center justify-center text-[8px] text-white font-bold">A</div>
                    <span className="text-[10px] font-black dark:text-white">AgentHub</span>
                    <span className="text-[8px] text-text-secondary-light ml-auto">Now</span>
                  </div>
                  <p className="text-[10px] font-bold dark:text-white line-clamp-3 leading-normal">
                    Your broadcast message will appear here exactly how agents will see it on their mobile devices.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 border-t dark:border-border-dark bg-gray-50/50 dark:bg-secondary-dark/30 flex gap-4">
          <button onClick={onClose} className="flex-1 py-4 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-2xl font-black text-sm dark:text-white hover:bg-gray-100 transition-all">Save Draft</button>
          <button className="flex-[2] py-4 bg-primary-light text-white rounded-2xl font-black text-sm shadow-xl shadow-primary-light/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
            <Send size={18} /> Launch Broadcast
          </button>
        </div>
      </div>
    </div>
  );
};

const LiveChatModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-end md:items-center justify-center md:p-4">
      <div className="absolute inset-0 bg-background-dark/80 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose}></div>
      
      <div className="relative w-full max-w-lg bg-white dark:bg-surface-dark md:rounded-[32px] rounded-t-[32px] shadow-2xl border border-border-light dark:border-border-dark overflow-hidden animate-in slide-in-from-bottom-10 duration-300 flex flex-col h-[80vh] md:h-[600px]">
        {/* Chat Header */}
        <div className="p-6 border-b dark:border-border-dark flex justify-between items-center bg-primary-light">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-white">
                <Headset size={24} />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success border-2 border-primary-light rounded-full"></div>
            </div>
            <div>
              <h3 className="text-lg font-black text-white tracking-tight">Admin Support Live</h3>
              <p className="text-[10px] text-white/80 font-bold uppercase tracking-widest">Average Wait: 2 mins</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl transition-all">
            <X size={24} className="text-white" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-6 overflow-y-auto custom-scrollbar space-y-4 bg-gray-50 dark:bg-background-dark/50">
          <div className="text-center">
            <span className="px-3 py-1 bg-gray-200 dark:bg-secondary-dark rounded-full text-[10px] font-black dark:text-white uppercase tracking-widest">Today</span>
          </div>
          
          <div className="flex gap-3 max-w-[80%]">
            <div className="w-8 h-8 bg-primary-light rounded-lg flex items-center justify-center text-white text-[10px] font-black shrink-0">S</div>
            <div className="p-4 bg-white dark:bg-surface-dark rounded-2xl rounded-tl-none shadow-sm border border-border-light dark:border-border-dark">
              <p className="text-xs font-bold dark:text-white leading-relaxed">Hello Admin! How can we help you today with your territory management?</p>
              <span className="text-[8px] text-text-secondary-light font-bold mt-2 block text-right">10:24 AM</span>
            </div>
          </div>

          <div className="flex gap-3 max-w-[80%] ml-auto flex-row-reverse">
            <div className="w-8 h-8 bg-gray-200 dark:bg-secondary-dark rounded-lg flex items-center justify-center dark:text-white text-[10px] font-black shrink-0">A</div>
            <div className="p-4 bg-primary-light text-white rounded-2xl rounded-tr-none shadow-lg">
              <p className="text-xs font-bold leading-relaxed">I need help with the bulk payout verification process.</p>
              <span className="text-[8px] text-white/80 font-bold mt-2 block text-right">10:25 AM</span>
            </div>
          </div>
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t dark:border-border-dark bg-white dark:bg-surface-dark">
          <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-secondary-dark rounded-2xl border border-border-light dark:border-border-dark">
            <button className="p-2 text-text-secondary-light hover:text-primary-light transition-all">
              <Paperclip size={20} />
            </button>
            <input type="text" placeholder="Type your message..." className="flex-1 bg-transparent outline-none text-xs font-bold dark:text-white" />
            <button className="p-2 text-text-secondary-light hover:text-primary-light transition-all">
              <Smile size={20} />
            </button>
            <button className="w-10 h-10 bg-primary-light text-white rounded-xl flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all">
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const TicketModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background-dark/80 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose}></div>
      
      <div className="relative w-full max-w-2xl bg-surface-light dark:bg-surface-dark rounded-[32px] shadow-2xl border border-border-light dark:border-border-dark overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
        <div className="p-8 border-b dark:border-border-dark flex justify-between items-center bg-gray-50/50 dark:bg-secondary-dark/30">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-emerald-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Ticket size={32} />
            </div>
            <div>
              <h3 className="text-2xl font-black dark:text-white tracking-tight leading-tight">Open Support Ticket</h3>
              <p className="text-sm text-text-secondary-light font-bold">Submit a formal request to our team.</p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-white dark:hover:bg-secondary-dark rounded-2xl transition-all shadow-sm">
            <X size={24} className="dark:text-white" />
          </button>
        </div>

        <div className="p-8 overflow-y-auto custom-scrollbar flex-1 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">Issue Category</label>
              <div className="relative">
                <select className="w-full px-4 py-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-bold appearance-none">
                  <option>Financial / Payouts</option>
                  <option>Agent Onboarding</option>
                  <option>System Bug</option>
                  <option>Feature Request</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary-light pointer-events-none" size={16} />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">Priority Level</label>
              <div className="relative">
                <select className="w-full px-4 py-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-error outline-none dark:text-white font-bold appearance-none">
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High (24h Response)</option>
                  <option className="text-error">Urgent (4h Response)</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary-light pointer-events-none" size={16} />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">Subject</label>
            <input type="text" placeholder="Briefly describe the issue" className="w-full px-4 py-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-bold" />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">Detailed Description</label>
            <textarea placeholder="Provide as much detail as possible..." rows="4" className="w-full px-4 py-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-bold resize-none leading-relaxed"></textarea>
          </div>

          <div className="p-4 border-2 border-dashed border-border-light dark:border-border-dark rounded-2xl flex flex-col items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-secondary-dark transition-all cursor-pointer group">
            <Paperclip size={24} className="text-text-secondary-light group-hover:text-primary-light transition-all" />
            <span className="text-[10px] font-black dark:text-white uppercase tracking-widest">Attach Screenshots or Logs</span>
          </div>
        </div>

        <div className="p-8 border-t dark:border-border-dark bg-gray-50/50 dark:bg-secondary-dark/30 flex gap-4">
          <button onClick={onClose} className="flex-1 py-4 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-2xl font-black text-sm dark:text-white hover:bg-gray-100 transition-all">Cancel</button>
          <button className="flex-[2] py-4 bg-emerald-500 text-white rounded-2xl font-black text-sm shadow-xl shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
            Submit Support Ticket
          </button>
        </div>
      </div>
    </div>
  );
};

const CampaignSettingsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background-dark/80 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose}></div>
      
      <div className="relative w-full max-w-2xl bg-surface-light dark:bg-surface-dark rounded-[32px] shadow-2xl border border-border-light dark:border-border-dark overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
        <div className="p-8 border-b dark:border-border-dark flex justify-between items-center bg-gray-50/50 dark:bg-secondary-dark/30">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary-light text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary-light/20">
              <Settings size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black dark:text-white tracking-tight">Campaign Global Settings</h3>
              <p className="text-xs text-text-secondary-light font-bold uppercase tracking-widest">Rewards & Referral Rules</p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-white dark:hover:bg-secondary-dark rounded-2xl transition-all shadow-sm">
            <X size={24} className="dark:text-white" />
          </button>
        </div>

        <div className="p-8 overflow-y-auto custom-scrollbar flex-1 space-y-8">
          <div className="space-y-4">
            <h4 className="font-black dark:text-white text-lg tracking-tight">Referral Reward Structure</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">Referrer Reward (Agent)</label>
                <div className="relative">
                  <input type="text" defaultValue="₹500" className="w-full px-4 py-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-bold" />
                  <Coins className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary-light opacity-50" size={18} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">Referee Bonus (Shop)</label>
                <div className="relative">
                  <input type="text" defaultValue="₹200" className="w-full px-4 py-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-bold" />
                  <Gift className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary-light opacity-50" size={18} />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-black dark:text-white text-lg tracking-tight">Automation & Limits</h4>
            <div className="space-y-3">
              {[
                { label: 'Auto-Approve Rewards', desc: 'Verify and release rewards automatically after KYC.', status: true },
                { label: 'Max Referrals Per Agent', desc: 'Limit the number of referrals an agent can make.', value: '50' },
                { label: 'Link Expiry (Days)', desc: 'Set how long referral links remain active.', value: '30' }
              ].map((setting, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-secondary-dark rounded-2xl border border-border-light dark:border-border-dark">
                  <div className="flex-1">
                    <p className="text-xs font-black dark:text-white">{setting.label}</p>
                    <p className="text-[10px] text-text-secondary-light font-bold">{setting.desc}</p>
                  </div>
                  {setting.status !== undefined ? (
                    <div className="w-12 h-6 bg-primary-light rounded-full relative p-1 cursor-pointer">
                      <div className="w-4 h-4 bg-white rounded-full absolute right-1 shadow-sm"></div>
                    </div>
                  ) : (
                    <input type="text" defaultValue={setting.value} className="w-16 px-2 py-1 bg-white dark:bg-background-dark border border-border-light dark:border-border-dark rounded-lg text-center text-xs font-bold dark:text-white" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-8 border-t dark:border-border-dark bg-gray-50/50 dark:bg-secondary-dark/30 flex gap-4">
          <button onClick={onClose} className="flex-1 py-4 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-2xl font-black text-sm dark:text-white hover:bg-gray-100 transition-all">Discard Changes</button>
          <button className="flex-[2] py-4 bg-primary-light text-white rounded-2xl font-black text-sm shadow-xl shadow-primary-light/20 hover:scale-[1.02] active:scale-[0.98] transition-all">Save Global Settings</button>
        </div>
      </div>
    </div>
  );
};

const TrackLinksModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background-dark/80 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose}></div>
      
      <div className="relative w-full max-w-xl bg-surface-light dark:bg-surface-dark rounded-[32px] shadow-2xl border border-border-light dark:border-border-dark overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
        <div className="p-8 border-b dark:border-border-dark flex justify-between items-center bg-primary-light/5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary-light text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary-light/20">
              <Link2 size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black dark:text-white tracking-tight">Generate Tracking Link</h3>
              <p className="text-xs text-text-secondary-light font-bold uppercase tracking-widest">Marketing Attribution</p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-white dark:hover:bg-secondary-dark rounded-2xl transition-all shadow-sm">
            <X size={24} className="dark:text-white" />
          </button>
        </div>

        <div className="p-8 space-y-6 overflow-y-auto custom-scrollbar">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">Campaign Source</label>
            <div className="relative">
              <select className="w-full px-4 py-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-bold appearance-none">
                <option>Social Media (Instagram/FB)</option>
                <option>WhatsApp Direct</option>
                <option>Offline Print (QR Code)</option>
                <option>Email Newsletter</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary-light pointer-events-none" size={16} />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">Assigned Agent (Optional)</label>
            <input type="text" placeholder="Search agent name or ID" className="w-full px-4 py-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-bold" />
          </div>

          <div className="p-6 bg-primary-light/5 rounded-[32px] border-2 border-dashed border-primary-light/20 space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-primary-light text-center">Your Generated Link</h4>
            <div className="relative">
              <input readOnly type="text" value="https://agenthub.io/ref/campaign_sm_2026_xyz" className="w-full px-4 py-4 pr-12 rounded-2xl bg-white dark:bg-surface-dark border-2 border-primary-light/30 text-xs font-black dark:text-white overflow-hidden" />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary-light text-white rounded-xl shadow-lg hover:scale-110 active:scale-95 transition-all">
                <Copy size={16} />
              </button>
            </div>
            <p className="text-[10px] text-text-secondary-light font-bold text-center italic">Includes UTM parameters for real-time tracking.</p>
          </div>
        </div>

        <div className="p-8 border-t dark:border-border-dark bg-gray-50/50 dark:bg-secondary-dark/30">
          <button className="w-full py-4 bg-primary-light text-white rounded-2xl font-black text-sm shadow-xl shadow-primary-light/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
            <Share2 size={18} /> Share Link Directly
          </button>
        </div>
      </div>
    </div>
  );
};

const EditProfileModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background-dark/80 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose}></div>
      
      <div className="relative w-full max-w-xl bg-surface-light dark:bg-surface-dark rounded-[32px] shadow-2xl border border-border-light dark:border-border-dark overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
        <div className="p-8 border-b dark:border-border-dark flex justify-between items-center bg-gray-50/50 dark:bg-secondary-dark/30">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary-light text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary-light/20">
              <User size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black dark:text-white tracking-tight">Edit Admin Profile</h3>
              <p className="text-xs text-text-secondary-light font-bold uppercase tracking-widest">Personal Information</p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-white dark:hover:bg-secondary-dark rounded-2xl transition-all shadow-sm">
            <X size={24} className="dark:text-white" />
          </button>
        </div>

        <div className="p-8 overflow-y-auto custom-scrollbar flex-1 space-y-6">
          <div className="flex flex-col items-center gap-4 mb-4">
            <div className="relative group">
              <div className="w-24 h-24 bg-primary-light rounded-full flex items-center justify-center text-white font-bold text-4xl shadow-xl shadow-primary-light/20">A</div>
              <button className="absolute bottom-0 right-0 p-2 bg-white dark:bg-surface-dark rounded-full shadow-lg border border-border-light dark:border-border-dark text-primary-light hover:scale-110 transition-all">
                <Camera size={16} />
              </button>
            </div>
            <p className="text-[10px] font-black text-text-secondary-light uppercase tracking-widest">Change Avatar</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">Full Name</label>
              <input type="text" defaultValue="Super Admin" className="w-full px-4 py-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-bold" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">Admin ID</label>
              <input disabled type="text" defaultValue="ADM-001-PRM" className="w-full px-4 py-4 rounded-2xl bg-gray-100 dark:bg-background-dark border-2 border-transparent outline-none text-text-secondary-light font-bold" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">Email Address</label>
            <input type="email" defaultValue="admin@premium.com" className="w-full px-4 py-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-bold" />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">Official Mobile</label>
            <input type="text" defaultValue="+91 98765 43210" className="w-full px-4 py-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-bold" />
          </div>
        </div>

        <div className="p-8 border-t dark:border-border-dark bg-gray-50/50 dark:bg-secondary-dark/30 flex gap-4">
          <button onClick={onClose} className="flex-1 py-4 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-2xl font-black text-sm dark:text-white hover:bg-gray-100 transition-all">Cancel</button>
          <button className="flex-[2] py-4 bg-primary-light text-white rounded-2xl font-black text-sm shadow-xl shadow-primary-light/20 hover:scale-[1.02] active:scale-[0.98] transition-all">Update Profile</button>
        </div>
      </div>
    </div>
  );
};

const PasswordModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background-dark/80 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose}></div>
      
      <div className="relative w-full max-w-lg bg-surface-light dark:bg-surface-dark rounded-[32px] shadow-2xl border border-border-light dark:border-border-dark overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col">
        <div className="p-8 border-b dark:border-border-dark flex justify-between items-center bg-primary-light/5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary-light text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary-light/20">
              <Lock size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black dark:text-white tracking-tight">Change Password</h3>
              <p className="text-xs text-text-secondary-light font-bold uppercase tracking-widest">Security Update</p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-white dark:hover:bg-secondary-dark rounded-2xl transition-all shadow-sm">
            <X size={24} className="dark:text-white" />
          </button>
        </div>

        <div className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">Current Password</label>
            <input type="password" placeholder="••••••••••••" className="w-full px-4 py-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-bold" />
          </div>
          
          <div className="h-px bg-border-light dark:border-border-dark mx-4"></div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">New Password</label>
            <input type="password" placeholder="Enter new password" className="w-full px-4 py-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-bold" />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">Confirm New Password</label>
            <input type="password" placeholder="Repeat new password" className="w-full px-4 py-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-bold" />
          </div>

          <div className="p-4 bg-gray-50 dark:bg-secondary-dark rounded-2xl border border-border-light dark:border-border-dark">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-black dark:text-white uppercase tracking-widest">Password Strength</span>
              <span className="text-[10px] font-black text-success uppercase tracking-widest">Strong</span>
            </div>
            <div className="flex gap-1">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= 3 ? 'bg-success' : 'bg-gray-200 dark:bg-background-dark'}`}></div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-8 border-t dark:border-border-dark bg-gray-50/50 dark:bg-secondary-dark/30">
          <button className="w-full py-4 bg-primary-light text-white rounded-2xl font-black text-sm shadow-xl shadow-primary-light/20 hover:scale-[1.02] active:scale-[0.98] transition-all">Update Security Credentials</button>
        </div>
      </div>
    </div>
  );
};

const TwoFAModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background-dark/80 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose}></div>
      
      <div className="relative w-full max-w-lg bg-surface-light dark:bg-surface-dark rounded-[32px] shadow-2xl border border-border-light dark:border-border-dark overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col">
        <div className="p-8 border-b dark:border-border-dark flex justify-between items-center bg-gray-50/50 dark:bg-secondary-dark/30">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Fingerprint size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black dark:text-white tracking-tight">Two-Factor Auth</h3>
              <p className="text-xs text-text-secondary-light font-bold uppercase tracking-widest">Enhanced Security</p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-white dark:hover:bg-secondary-dark rounded-2xl transition-all shadow-sm">
            <X size={24} className="dark:text-white" />
          </button>
        </div>

        <div className="p-8 space-y-6">
          <div className="flex items-center justify-between p-6 bg-purple-500/5 border border-purple-500/20 rounded-[32px]">
            <div className="flex-1">
              <p className="text-xs font-black dark:text-white">Status: Currently Disabled</p>
              <p className="text-[10px] text-text-secondary-light font-bold mt-1">Add an extra layer of security to your admin account.</p>
            </div>
            <div className="w-14 h-7 bg-gray-200 dark:bg-background-dark rounded-full relative p-1 cursor-pointer">
              <div className="w-5 h-5 bg-white rounded-full absolute left-1 shadow-md"></div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">Available Methods</h4>
            {[
              { title: 'Authenticator App', desc: 'Google Authenticator, Authy, etc.', icon: <Smartphone size={16} />, active: true },
              { title: 'SMS Verification', desc: 'Codes sent via text message.', icon: <MessageSquare size={16} /> },
              { title: 'Biometric Login', desc: 'FaceID or Fingerprint (TouchID)', icon: <Fingerprint size={16} /> }
            ].map((method, i) => (
              <div key={i} className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${method.active ? 'border-primary-light bg-primary-light/5' : 'border-transparent bg-gray-50 dark:bg-secondary-dark hover:border-gray-200 dark:hover:border-border-dark'}`}>
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${method.active ? 'bg-primary-light text-white' : 'bg-gray-100 dark:bg-background-dark text-text-secondary-light'}`}>
                    {method.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-black dark:text-white">{method.title}</p>
                    <p className="text-[10px] text-text-secondary-light font-bold">{method.desc}</p>
                  </div>
                  {method.active && <CheckCircle size={18} className="text-primary-light" />}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 border-t dark:border-border-dark bg-gray-50/50 dark:bg-secondary-dark/30">
          <button className="w-full py-4 bg-primary-light text-white rounded-2xl font-black text-sm shadow-xl shadow-primary-light/20 hover:scale-[1.02] active:scale-[0.98] transition-all">Configure 2FA Method</button>
        </div>
      </div>
    </div>
  );
};

const SessionsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background-dark/80 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose}></div>
      
      <div className="relative w-full max-w-2xl bg-surface-light dark:bg-surface-dark rounded-[32px] shadow-2xl border border-border-light dark:border-border-dark overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
        <div className="p-8 border-b dark:border-border-dark flex justify-between items-center bg-gray-50/50 dark:bg-secondary-dark/30">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Monitor size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black dark:text-white tracking-tight">Active Sessions</h3>
              <p className="text-xs text-text-secondary-light font-bold uppercase tracking-widest">Device Management</p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-white dark:hover:bg-secondary-dark rounded-2xl transition-all shadow-sm">
            <X size={24} className="dark:text-white" />
          </button>
        </div>

        <div className="p-8 overflow-y-auto custom-scrollbar flex-1 space-y-6">
          <div className="p-6 bg-blue-500/5 border-2 border-blue-500/20 rounded-[32px]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500 text-white rounded-2xl flex items-center justify-center">
                <Monitor size={24} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-xs font-black dark:text-white">This Device: Windows PC (Mumbai)</p>
                  <span className="px-2 py-0.5 bg-blue-500 text-white rounded-full text-[8px] font-black uppercase tracking-widest">Current</span>
                </div>
                <p className="text-[10px] text-text-secondary-light font-bold mt-1">Chrome Browser • Last active: Just now</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">Other Logged-in Devices</h4>
            {[
              { device: 'iPhone 15 Pro', location: 'Delhi, India', time: '2 hours ago', icon: <Smartphone size={18} /> },
              { device: 'MacBook Air M2', location: 'Bangalore, India', time: 'Active 2 days ago', icon: <Monitor size={18} /> }
            ].map((session, i) => (
              <div key={i} className="p-6 bg-gray-50 dark:bg-secondary-dark rounded-[32px] border border-border-light dark:border-border-dark group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 dark:bg-background-dark text-text-secondary-light rounded-2xl flex items-center justify-center group-hover:bg-primary-light/10 group-hover:text-primary-light transition-all">
                    {session.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-black dark:text-white">{session.device}</p>
                    <p className="text-[10px] text-text-secondary-light font-bold mt-0.5">{session.location} • {session.time}</p>
                  </div>
                  <button className="px-4 py-2 bg-error/10 text-error rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-error hover:text-white transition-all">Logout</button>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full py-4 border-2 border-dashed border-error/30 text-error rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-error/5 transition-all mt-4">Log out from all other devices</button>
        </div>

        <div className="p-8 border-t dark:border-border-dark bg-gray-50/50 dark:bg-secondary-dark/30">
          <button onClick={onClose} className="w-full py-4 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-2xl font-black text-sm dark:text-white hover:bg-gray-100 transition-all">Close Window</button>
        </div>
      </div>
    </div>
  );
};

const CreateRoleModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background-dark/80 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose}></div>
      
      <div className="relative w-full max-w-2xl bg-surface-light dark:bg-surface-dark rounded-[32px] shadow-2xl border border-border-light dark:border-border-dark overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
        <div className="p-8 border-b dark:border-border-dark flex justify-between items-center bg-primary-light">
          <div className="flex items-center gap-4 text-white">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black tracking-tight">Create Custom Role</h3>
              <p className="text-xs font-bold uppercase tracking-widest opacity-80">Define System Permissions</p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-white/10 rounded-2xl transition-all">
            <X size={24} className="text-white" />
          </button>
        </div>

        <div className="p-8 overflow-y-auto custom-scrollbar flex-1 space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">Role Name</label>
            <input type="text" placeholder="e.g., Regional Supervisor" className="w-full px-4 py-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-bold" />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">Role Description</label>
            <textarea placeholder="Briefly describe the responsibilities of this role..." rows="3" className="w-full px-4 py-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-bold resize-none leading-relaxed"></textarea>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">Core Access Modules</h4>
            <div className="grid grid-cols-2 gap-3">
              {['Inventory Management', 'Financial Records', 'User Verification', 'Support Desk', 'Marketing Tools', 'System Logs'].map((mod) => (
                <div key={mod} className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-secondary-dark rounded-2xl border border-transparent hover:border-primary-light transition-all cursor-pointer group">
                  <div className="w-5 h-5 rounded-md border-2 border-border-light dark:border-border-dark group-hover:border-primary-light flex items-center justify-center transition-all">
                    <Check size={12} className="text-primary-light scale-0 group-hover:scale-100 transition-transform" />
                  </div>
                  <span className="text-xs font-bold dark:text-white">{mod}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-8 border-t dark:border-border-dark bg-gray-50/50 dark:bg-secondary-dark/30 flex gap-4">
          <button onClick={onClose} className="flex-1 py-4 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-2xl font-black text-sm dark:text-white hover:bg-gray-100 transition-all">Cancel</button>
          <button className="flex-[2] py-4 bg-primary-light text-white rounded-2xl font-black text-sm shadow-xl shadow-primary-light/20 hover:scale-[1.02] active:scale-[0.98] transition-all">Generate Custom Role</button>
        </div>
      </div>
    </div>
  );
};

const PermissionsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background-dark/80 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose}></div>
      
      <div className="relative w-full max-w-3xl bg-surface-light dark:bg-surface-dark rounded-[32px] shadow-2xl border border-border-light dark:border-border-dark overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
        <div className="p-8 border-b dark:border-border-dark flex justify-between items-center bg-gray-50/50 dark:bg-secondary-dark/30">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Key size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black dark:text-white tracking-tight">Granular Permissions</h3>
              <p className="text-xs text-text-secondary-light font-bold uppercase tracking-widest">Adjusting: State Agent Role</p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-white dark:hover:bg-secondary-dark rounded-2xl transition-all shadow-sm">
            <X size={24} className="dark:text-white" />
          </button>
        </div>

        <div className="p-8 overflow-y-auto custom-scrollbar flex-1">
          <div className="space-y-8">
            {[
              { category: 'Shop Management', items: ['Create Shops', 'Approve Onboarding', 'Edit Details', 'Delete Shop'] },
              { category: 'Financial Controls', items: ['View Payouts', 'Request Transfers', 'Audit Logs', 'Refund Management'] },
              { category: 'Network Analytics', items: ['View Revenue', 'Export Reports', 'Forecast Trends', 'Agent Completion'] }
            ].map((section) => (
              <div key={section.category} className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-primary-light border-b-2 border-primary-light/10 pb-2">{section.category}</h4>
                <div className="grid grid-cols-2 gap-4">
                  {section.items.map((item) => (
                    <div key={item} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-secondary-dark rounded-2xl border border-border-light dark:border-border-dark">
                      <span className="text-xs font-black dark:text-white">{item}</span>
                      <div className="w-12 h-6 bg-primary-light rounded-full relative p-1 cursor-pointer">
                        <div className="w-4 h-4 bg-white rounded-full absolute right-1 shadow-sm"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 border-t dark:border-border-dark bg-gray-50/50 dark:bg-secondary-dark/30 flex gap-4">
          <button onClick={onClose} className="flex-1 py-4 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-2xl font-black text-sm dark:text-white hover:bg-gray-100 transition-all">Reset Defaults</button>
          <button className="flex-[2] py-4 bg-primary-light text-white rounded-2xl font-black text-sm shadow-xl shadow-primary-light/20 hover:scale-[1.02] active:scale-[0.98] transition-all">Update Permission Set</button>
        </div>
      </div>
    </div>
  );
};

const AddServicePartnerModal = ({ isOpen, onClose, setServicePartners, servicePartners, addNotification }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Logistics',
    contact: '',
    email: '',
    status: 'Active',
    joined: new Date().toISOString().split('T')[0],
    relatedContent: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPartner = {
      id: servicePartners.length + 1,
      ...formData,
      performance: 'Excellent'
    };
    setServicePartners([...servicePartners, newPartner]);
    addNotification({ title: 'Partner Added', message: 'New service partner has been successfully added.', type: 'success' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background-dark/80 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose}></div>
      <div className="relative w-full max-w-xl bg-white dark:bg-surface-dark rounded-[40px] shadow-2xl border border-white/10 overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-8 border-b dark:border-border-dark flex justify-between items-center bg-gradient-to-r from-emerald-500 to-emerald-700 text-white">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center shadow-inner">
              <Briefcase size={28} />
            </div>
            <div>
              <h3 className="text-2xl font-black tracking-tight">Add Service Partner</h3>
              <p className="text-xs font-bold uppercase tracking-widest opacity-80">Network Expansion Hub</p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-white/10 rounded-2xl transition-all">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">Partner Entity Name</label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="e.g., Swift Logistics" 
                className="w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-emerald-500 outline-none dark:text-white font-bold transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">Business Category</label>
              <select 
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-emerald-500 outline-none dark:text-white font-bold appearance-none transition-all"
              >
                <option>Logistics</option>
                <option>IT Support</option>
                <option>Security Services</option>
                <option>Facility Management</option>
                <option>Legal Compliance</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">Primary Contact</label>
              <input 
                type="text" 
                required
                value={formData.contact}
                onChange={(e) => setFormData({...formData, contact: e.target.value})}
                placeholder="Full Name" 
                className="w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-emerald-500 outline-none dark:text-white font-bold transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">Official Email</label>
              <input 
                type="email" 
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="partner@company.com" 
                className="w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-emerald-500 outline-none dark:text-white font-bold transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">Related Content / Documentation</label>
            <textarea 
              value={formData.relatedContent}
              onChange={(e) => setFormData({...formData, relatedContent: e.target.value})}
              placeholder="Add links to agreements, marketing materials, or service level descriptions..."
              rows="3"
              className="w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-emerald-500 outline-none dark:text-white font-bold transition-all resize-none"
            ></textarea>
          </div>

          <div className="pt-4">
            <button 
              type="submit"
              className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black text-sm shadow-xl shadow-emerald-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Confirm & Onboard Partner
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AddProductPartnerModal = ({ isOpen, onClose, setProductPartners, productPartners, addNotification }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Electronics',
    representative: '',
    status: 'Active',
    commission: '5%',
    products: 0,
    relatedContent: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPartner = {
      id: productPartners.length + 1,
      ...formData,
      rating: 5.0
    };
    setProductPartners([...productPartners, newPartner]);
    addNotification({ title: 'Brand Added', message: 'New product brand has been successfully registered.', type: 'success' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background-dark/80 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose}></div>
      <div className="relative w-full max-w-xl bg-white dark:bg-surface-dark rounded-[40px] shadow-2xl border border-white/10 overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-8 border-b dark:border-border-dark flex justify-between items-center bg-gradient-to-r from-orange-500 to-orange-700 text-white">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center shadow-inner">
              <Package size={28} />
            </div>
            <div>
              <h3 className="text-2xl font-black tracking-tight">Add Product Partner</h3>
              <p className="text-xs font-bold uppercase tracking-widest opacity-80">Onboard New Brand</p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-white/10 rounded-2xl transition-all">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">Brand Name</label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="e.g., Global Electronics" 
                className="w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-orange-500 outline-none dark:text-white font-bold transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">Category</label>
              <select 
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-orange-500 outline-none dark:text-white font-bold appearance-none transition-all"
              >
                <option>Electronics</option>
                <option>FMCG</option>
                <option>Fashion</option>
                <option>Beverages</option>
                <option>Home Decor</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">Representative</label>
              <input 
                type="text" 
                required
                value={formData.representative}
                onChange={(e) => setFormData({...formData, representative: e.target.value})}
                placeholder="Account Manager Name" 
                className="w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-orange-500 outline-none dark:text-white font-bold transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">Commission Rate</label>
              <input 
                type="text" 
                required
                value={formData.commission}
                onChange={(e) => setFormData({...formData, commission: e.target.value})}
                placeholder="e.g., 8%" 
                className="w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-orange-500 outline-none dark:text-white font-bold transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">Related Content / Brand Guidelines</label>
            <textarea 
              value={formData.relatedContent}
              onChange={(e) => setFormData({...formData, relatedContent: e.target.value})}
              placeholder="Add links to brand assets, catalogs, or marketing guidelines..."
              rows="3"
              className="w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-orange-500 outline-none dark:text-white font-bold transition-all resize-none"
            ></textarea>
          </div>

          <div className="pt-4">
            <button 
              type="submit"
              className="w-full py-4 bg-orange-600 text-white rounded-2xl font-black text-sm shadow-xl shadow-orange-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Confirm & Register Brand
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ManageAccessModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background-dark/80 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose}></div>
      
      <div className="relative w-full max-w-xl bg-surface-light dark:bg-surface-dark rounded-[32px] shadow-2xl border border-border-light dark:border-border-dark overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col">
        <div className="p-8 border-b dark:border-border-dark flex justify-between items-center bg-gray-50/50 dark:bg-secondary-dark/30">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gray-100 dark:bg-secondary-dark rounded-2xl flex items-center justify-center text-primary-light font-bold text-xl">S</div>
            <div>
              <h3 className="text-xl font-black dark:text-white tracking-tight">Manage Access</h3>
              <p className="text-xs text-text-secondary-light font-bold uppercase tracking-widest">Administrator: Sanjay Dutt</p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-white dark:hover:bg-secondary-dark rounded-2xl transition-all shadow-sm">
            <X size={24} className="dark:text-white" />
          </button>
        </div>

        <div className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">Current Role Assignment</label>
            <div className="relative">
              <select className="w-full px-4 py-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-bold appearance-none">
                <option>Super Admin (Owner)</option>
                <option>State Agent</option>
                <option>Finance Manager</option>
                <option>Support Staff</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary-light pointer-events-none" size={16} />
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">Security & Restrictions</h4>
            <div className="space-y-3">
              {[
                { label: 'Login Protection (MFA)', status: true },
                { label: 'Restrict to Office IP', status: false },
                { label: 'Session Auto-Timeout', status: true }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-secondary-dark rounded-2xl border border-border-light dark:border-border-dark">
                  <span className="text-xs font-black dark:text-white">{item.label}</span>
                  <div className={`w-12 h-6 rounded-full relative p-1 cursor-pointer transition-all ${item.status ? 'bg-primary-light' : 'bg-gray-200 dark:bg-background-dark'}`}>
                    <div className={`w-4 h-4 bg-white rounded-full absolute shadow-sm transition-all ${item.status ? 'right-1' : 'left-1'}`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <button className="w-full py-4 bg-error text-white rounded-2xl font-black text-sm shadow-xl shadow-error/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
              <Trash2 size={18} /> Suspend Administrator Account
            </button>
          </div>
        </div>

        <div className="p-8 border-t dark:border-border-dark bg-gray-50/50 dark:bg-secondary-dark/30">
          <button className="w-full py-4 bg-primary-light text-white rounded-2xl font-black text-sm shadow-xl shadow-primary-light/20 hover:scale-[1.02] active:scale-[0.98] transition-all">Save Access Configuration</button>
        </div>
      </div>
    </div>
  );
};

const ShopActionsModal = ({ isOpen, onClose, shop, type, setShopTieUps, shopTieUps, addNotification }) => {
  if (!isOpen || !shop) return null;

  const handleStatusUpdate = (newStatus, message) => {
    setShopTieUps(shopTieUps.map(s => s.id === shop.id ? { ...s, status: newStatus } : s));
    addNotification({ title: 'Status Updated', message, type: 'success' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-background-dark/80 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose}></div>
      <div className="relative w-full max-w-4xl bg-surface-light dark:bg-surface-dark rounded-[40px] shadow-2xl border border-border-light dark:border-border-dark overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
        <div className={`p-6 border-b dark:border-border-dark flex justify-between items-center ${
          type === 'view' ? 'bg-gray-50 dark:bg-secondary-dark text-text-primary-light dark:text-white' :
          type === 'edit' ? 'bg-primary-light text-white' :
          type === 'approve' ? 'bg-success text-white' :
          type === 'correction' ? 'bg-warning text-white' :
          'bg-blue-500 text-white'
        }`}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <Store size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-xl font-black">{type.charAt(0).toUpperCase() + type.slice(1)}: {shop.shopName}</h3>
              <p className="text-xs opacity-80 font-bold uppercase tracking-widest">{shop.category} • ID: SHP-{shop.id}001</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-all text-white">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {type === 'view' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h4 className="text-xs font-black uppercase tracking-widest text-primary-light border-b dark:border-border-dark pb-2">Business Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                     <div><p className="text-[10px] font-bold text-text-secondary-light uppercase">Owner Name</p><p className="text-sm font-bold dark:text-white">{shop.ownerName}</p></div>
                     <div><p className="text-[10px] font-bold text-text-secondary-light uppercase">Phone Number</p><p className="text-sm font-bold dark:text-white">{shop.phone}</p></div>
                     <div><p className="text-[10px] font-bold text-text-secondary-light uppercase">Category</p><p className="text-sm font-bold dark:text-white">{shop.category}</p></div>
                     <div><p className="text-[10px] font-bold text-text-secondary-light uppercase">Current Status</p><p className={`text-sm font-black uppercase ${
                       shop.status === 'Approved' ? 'text-success' : 'text-warning'
                     }`}>{shop.status}</p></div>
                  </div>
                </div>
                <div className="space-y-6">
                  <h4 className="text-xs font-black uppercase tracking-widest text-blue-500 border-b dark:border-border-dark pb-2">Location & Assignment</h4>
                  <div className="grid grid-cols-2 gap-4">
                     <div><p className="text-[10px] font-bold text-text-secondary-light uppercase">City/Region</p><p className="text-sm font-bold dark:text-white">{shop.location}</p></div>
                     <div><p className="text-[10px] font-bold text-text-secondary-light uppercase">Pincode</p><p className="text-sm font-bold dark:text-white">{shop.pincode}</p></div>
                     <div><p className="text-[10px] font-bold text-text-secondary-light uppercase">Assigned Agent</p><p className="text-sm font-bold dark:text-white">{shop.assignedAgent}</p></div>
                     <div><p className="text-[10px] font-bold text-text-secondary-light uppercase">Submitted By</p><p className="text-sm font-bold dark:text-white">{shop.submittedBy}</p></div>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-primary-light/5 border border-primary-light/10 rounded-3xl">
                 <h4 className="text-xs font-black uppercase tracking-widest text-primary-light mb-4">Submitted Documents</h4>
                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {['GST Certificate', 'Trade License', 'Owner ID', 'Shop Photo'].map(doc => (
                      <div key={doc} className="p-4 bg-white dark:bg-secondary-dark rounded-2xl border border-border-light dark:border-border-dark text-center space-y-2">
                         <FileText size={20} className="mx-auto text-text-secondary-light" />
                         <p className="text-[10px] font-bold dark:text-white">{doc}</p>
                         <button className="text-[10px] font-black text-primary-light hover:underline uppercase">Preview</button>
                      </div>
                    ))}
                 </div>
              </div>
            </div>
          )}

          {type === 'edit' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-text-secondary-light ml-1">Shop Name</label>
                  <input type="text" defaultValue={shop.shopName} className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-bold" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-text-secondary-light ml-1">Business Category</label>
                  <select defaultValue={shop.category} className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-bold appearance-none">
                    <option>Grocery</option>
                    <option>Pharmacy</option>
                    <option>Fashion</option>
                    <option>Electronics</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-text-secondary-light ml-1">Owner Name</label>
                  <input type="text" defaultValue={shop.ownerName} className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-bold" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-text-secondary-light ml-1">Contact Phone</label>
                  <input type="text" defaultValue={shop.phone} className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-bold" />
                </div>
              </div>
              <div className="pt-6">
                 <button 
                   onClick={() => handleStatusUpdate(shop.status, 'Shop details updated successfully.')}
                   className="w-full py-4 rounded-2xl font-black bg-primary-light text-white hover:bg-primary-dark shadow-xl shadow-primary-light/20"
                 >
                   Save Business Changes
                 </button>
              </div>
            </div>
          )}

          {type === 'approve' && (
            <div className="text-center space-y-8 py-12">
              <div className="w-24 h-24 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={48} />
              </div>
              <div className="max-w-md mx-auto space-y-4">
                <h4 className="text-2xl font-black dark:text-white">Confirm Approval?</h4>
                <p className="text-text-secondary-light font-medium leading-relaxed">By approving this shop, you verify that all documents are valid and the business is eligible for partnership.</p>
              </div>
              <div className="flex gap-4 max-w-sm mx-auto">
                <button onClick={onClose} className="flex-1 py-4 bg-gray-100 dark:bg-secondary-dark rounded-2xl font-black text-sm dark:text-white">Cancel</button>
                <button 
                  onClick={() => handleStatusUpdate('Approved', `${shop.shopName} has been officially approved.`)}
                  className="flex-[2] py-4 bg-success text-white rounded-2xl font-black text-sm shadow-xl shadow-success/20"
                >
                  Yes, Approve Shop
                </button>
              </div>
            </div>
          )}

          {type === 'correction' && (
            <div className="space-y-6">
              <div className="p-6 bg-warning/5 border border-warning/20 rounded-[32px] flex items-start gap-4">
                <AlertCircle size={24} className="text-warning shrink-0" />
                <div>
                  <p className="text-sm font-black dark:text-white">Requesting Corrections</p>
                  <p className="text-xs text-text-secondary-light mt-1">Please specify what information or documents need to be corrected by the agent.</p>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-text-secondary-light ml-1">Correction Notes</label>
                <textarea rows="4" placeholder="e.g. GST certificate is expired, please upload latest..." className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-warning outline-none dark:text-white font-medium resize-none"></textarea>
              </div>
              <button 
                onClick={() => handleStatusUpdate('Need Correction', `Correction request sent to ${shop.assignedAgent}.`)}
                className="w-full py-4 bg-warning text-white rounded-2xl font-black text-sm shadow-xl shadow-warning/20"
              >
                Send Correction Request
              </button>
            </div>
          )}

          {type === 'assign' && (
            <div className="space-y-6">
              <h4 className="text-xs font-black uppercase tracking-widest text-blue-500 border-b dark:border-border-dark pb-2">Assign New Agent</h4>
              <div className="space-y-4">
                {[
                  { name: 'Vikram Singh', zone: 'Mumbai North', rating: '4.9' },
                  { name: 'Sneha Patel', zone: 'Mumbai South', rating: '4.7' },
                  { name: 'Rajesh Kumar', zone: 'Mumbai East', rating: '4.8' },
                ].map(agent => (
                  <div key={agent.name} className="p-4 bg-gray-50 dark:bg-secondary-dark rounded-2xl border border-transparent hover:border-blue-500 transition-all cursor-pointer flex justify-between items-center group">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-500/10 text-blue-500 rounded-xl flex items-center justify-center font-bold">{agent.name[0]}</div>
                      <div>
                        <p className="text-sm font-bold dark:text-white">{agent.name}</p>
                        <p className="text-[10px] text-text-secondary-light font-bold uppercase">{agent.zone}</p>
                      </div>
                    </div>
                    <div className="text-right flex items-center gap-4">
                      <div>
                        <p className="text-[10px] text-text-secondary-light font-black uppercase">Rating</p>
                        <p className="text-sm font-black text-blue-500">{agent.rating} ★</p>
                      </div>
                      <button 
                        onClick={() => handleStatusUpdate(shop.status, `Shop assigned to ${agent.name} successfully.`)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-xl text-[10px] font-black uppercase opacity-0 group-hover:opacity-100 transition-all shadow-lg"
                      >
                        Assign
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="p-6 bg-gray-50 dark:bg-secondary-dark/30 border-t dark:border-border-dark flex gap-4">
           <button onClick={onClose} className="flex-1 py-4 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-2xl font-black text-sm dark:text-white hover:bg-gray-100 transition-all">Close Window</button>
        </div>
      </div>
    </div>
  );
};

const AgentActionsModal = ({ isOpen, onClose, agent, type, setAgents, agents, addNotification }) => {
  if (!isOpen || !agent) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="absolute inset-0 bg-background-dark/80 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose}></div>
      <div className="relative w-full max-w-4xl bg-surface-light dark:bg-surface-dark rounded-[40px] shadow-2xl border border-border-light dark:border-border-dark overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
        <div className={`p-6 border-b dark:border-border-dark flex justify-between items-center ${
          type === 'view' ? 'bg-gray-50 dark:bg-secondary-dark' :
          type === 'edit' ? 'bg-emerald-500 text-white' :
          type === 'map' ? 'bg-blue-500 text-white' :
          type === 'team' ? 'bg-purple-500 text-white' :
          'bg-orange-500 text-white'
        }`}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center font-black text-xl text-white shadow-inner">
              {agent.name[0]}
            </div>
            <div>
              <h3 className="text-xl font-black">{type.charAt(0).toUpperCase() + type.slice(1)} Agent: {agent.name}</h3>
              <p className="text-xs opacity-80 font-bold uppercase tracking-widest">{agent.role} • ID: AGT-{agent.id}001</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-all text-white">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {type === 'view' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h4 className="text-xs font-black uppercase tracking-widest text-primary-light border-b dark:border-border-dark pb-2">Profile Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                     <div><p className="text-[10px] font-bold text-text-secondary-light uppercase">Full Name</p><p className="text-sm font-bold dark:text-white">{agent.name}</p></div>
                     <div><p className="text-[10px] font-bold text-text-secondary-light uppercase">Phone</p><p className="text-sm font-bold dark:text-white">+91 99887 76655</p></div>
                     <div><p className="text-[10px] font-bold text-text-secondary-light uppercase">Email</p><p className="text-sm font-bold dark:text-white">{agent.name.toLowerCase().replace(' ', '.')}@agent.com</p></div>
                     <div><p className="text-[10px] font-bold text-text-secondary-light uppercase">Status</p><p className="text-sm font-bold text-success">{agent.status}</p></div>
                  </div>
                </div>
                <div className="space-y-6">
                  <h4 className="text-xs font-black uppercase tracking-widest text-blue-500 border-b dark:border-border-dark pb-2">Territory Data</h4>
                  <div className="grid grid-cols-2 gap-4">
                     <div><p className="text-[10px] font-bold text-text-secondary-light uppercase">Primary Region</p><p className="text-sm font-bold dark:text-white">{agent.territory}</p></div>
                     <div><p className="text-[10px] font-bold text-text-secondary-light uppercase">Coverage</p><p className="text-sm font-bold dark:text-white">84%</p></div>
                     <div><p className="text-[10px] font-bold text-text-secondary-light uppercase">Total Shops</p><p className="text-sm font-bold dark:text-white">42 Shops</p></div>
                     <div><p className="text-[10px] font-bold text-text-secondary-light uppercase">Last Activity</p><p className="text-sm font-bold dark:text-white">2 hours ago</p></div>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-primary-light/5 border border-primary-light/10 rounded-3xl">
                 <h4 className="text-xs font-black uppercase tracking-widest text-primary-light mb-4">Onboarding Documents</h4>
                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {['ID Proof', 'Address Proof', 'Bank Passbook', 'PAN Card'].map(doc => (
                      <div key={doc} className="p-4 bg-white dark:bg-secondary-dark rounded-2xl border border-border-light dark:border-border-dark text-center space-y-2">
                         <FileText size={20} className="mx-auto text-text-secondary-light" />
                         <p className="text-[10px] font-bold dark:text-white">{doc}</p>
                         <button className="text-[10px] font-black text-primary-light hover:underline uppercase">View</button>
                      </div>
                    ))}
                 </div>
              </div>
            </div>
          )}

          {type === 'edit' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-text-secondary-light ml-1">Agent Name</label>
                  <input type="text" defaultValue={agent.name} className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-emerald-500 outline-none dark:text-white font-bold" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-text-secondary-light ml-1">Operational Role</label>
                  <select defaultValue={agent.role} className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-emerald-500 outline-none dark:text-white font-bold appearance-none">
                    <option>State Agent</option>
                    <option>District Agent</option>
                    <option>Pincode Agent</option>
                    <option>Divisional Agent</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-text-secondary-light ml-1">Assigned Territory</label>
                <input type="text" defaultValue={agent.territory} className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-emerald-500 outline-none dark:text-white font-bold" />
              </div>
              <div className="pt-6">
                 <button 
                   onClick={() => {
                     onClose();
                     addNotification({ title: 'Success', message: 'Agent profile updated successfully.', type: 'success' });
                   }}
                   className="w-full py-4 rounded-2xl font-black bg-emerald-500 text-white hover:bg-emerald-600 shadow-xl shadow-emerald-500/20"
                 >
                   Save Agent Changes
                 </button>
              </div>
            </div>
          )}

          {type === 'map' && (
            <div className="space-y-6">
              <div className="h-[300px] bg-blue-500/5 border-2 border-dashed border-blue-500/20 rounded-[32px] flex items-center justify-center relative overflow-hidden">
                 <Map size={80} className="text-blue-500 opacity-10 absolute" />
                 <div className="text-center relative z-10 space-y-4">
                    <p className="text-sm font-bold dark:text-white">Active Territory: {agent.territory}</p>
                    <div className="flex gap-2 justify-center">
                       <span className="px-3 py-1 bg-blue-500 text-white text-[10px] font-black rounded-lg">42 Active Shops</span>
                       <span className="px-3 py-1 bg-emerald-500 text-white text-[10px] font-black rounded-lg">85% Coverage</span>
                    </div>
                 </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <button className="py-4 bg-gray-50 dark:bg-secondary-dark rounded-2xl text-xs font-bold dark:text-white hover:bg-blue-50 transition-all">Expand Pincodes</button>
                 <button className="py-4 bg-gray-50 dark:bg-secondary-dark rounded-2xl text-xs font-bold dark:text-white hover:bg-blue-50 transition-all">Reassign Region</button>
              </div>
            </div>
          )}

          {type === 'team' && (
            <div className="space-y-6">
               <div className="grid grid-cols-1 gap-3">
                  {[
                    { name: 'Kunal Verma', role: 'Field Exec', perf: '85%' },
                    { name: 'Shubham Singh', role: 'Verifier', perf: '92%' },
                    { name: 'Ankita Das', role: 'Support', perf: '78%' },
                  ].map(member => (
                    <div key={member.name} className="p-4 bg-gray-50 dark:bg-secondary-dark rounded-2xl border border-border-light dark:border-border-dark flex justify-between items-center">
                       <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-purple-500/10 text-purple-500 rounded-xl flex items-center justify-center font-black">{member.name[0]}</div>
                          <div>
                             <p className="text-sm font-bold dark:text-white">{member.name}</p>
                             <p className="text-[10px] text-text-secondary-light font-bold uppercase">{member.role}</p>
                          </div>
                       </div>
                       <div className="text-right">
                          <p className="text-[10px] text-text-secondary-light font-black uppercase">Efficiency</p>
                          <p className="text-sm font-black text-purple-500">{member.perf}</p>
                       </div>
                    </div>
                  ))}
               </div>
               <button className="w-full py-3 border-2 border-dashed border-purple-500/20 text-purple-500 rounded-xl text-xs font-bold hover:bg-purple-500/5 transition-all">Manage Hierarchy</button>
            </div>
          )}

          {type === 'performance' && (
            <div className="space-y-8">
               <div className="grid grid-cols-3 gap-4">
                  <div className="p-6 bg-orange-500/5 rounded-3xl border border-orange-500/10 text-center">
                     <p className="text-[10px] text-text-secondary-light font-black uppercase">Target Met</p>
                     <p className="text-2xl font-black text-orange-500">92%</p>
                  </div>
                  <div className="p-6 bg-emerald-500/5 rounded-3xl border border-emerald-500/10 text-center">
                     <p className="text-[10px] text-text-secondary-light font-black uppercase">Growth</p>
                     <p className="text-2xl font-black text-emerald-500">+14%</p>
                  </div>
                  <div className="p-6 bg-blue-500/5 rounded-3xl border border-blue-500/10 text-center">
                     <p className="text-[10px] text-text-secondary-light font-black uppercase">Rating</p>
                     <p className="text-2xl font-black text-blue-500">4.8</p>
                  </div>
               </div>
               <div className="p-6 bg-gray-50 dark:bg-secondary-dark rounded-[32px] space-y-4">
                  <h4 className="text-xs font-black uppercase tracking-widest dark:text-white">Monthly Sales Volume</h4>
                  <div className="h-4 bg-gray-200 dark:bg-background-dark rounded-full overflow-hidden">
                     <div className="h-full bg-orange-500 w-[85%]"></div>
                  </div>
                  <div className="flex justify-between text-[10px] font-black text-text-secondary-light uppercase">
                     <span>₹8.5L Achieved</span>
                     <span>₹10L Target</span>
                  </div>
               </div>
            </div>
          )}
        </div>

        <div className="p-6 bg-gray-50 dark:bg-secondary-dark/30 border-t dark:border-border-dark flex gap-4">
           <button onClick={onClose} className="flex-1 py-4 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-2xl font-black text-sm dark:text-white hover:bg-gray-100 transition-all">Close Window</button>
        </div>
      </div>
    </div>
  );
};

const CategoryManagementModal = ({ isOpen, onClose, initialData, categories, setCategories, addNotification }) => {
  const [formData, setFormData] = useState({
    name: '',
    status: 'Active',
    icon: 'Layout'
  });

  React.useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        status: initialData.status,
        icon: initialData.icon || 'Layout'
      });
    } else {
      setFormData({
        name: '',
        status: 'Active',
        icon: 'Layout'
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (initialData) {
      setCategories(categories.map(c => c.id === initialData.id ? { ...c, ...formData } : c));
      addNotification({ title: 'Category Updated', message: 'The category has been successfully updated.', type: 'success' });
    } else {
      const newCategory = {
        id: categories.length + 1,
        ...formData,
        count: 0,
        color: 'bg-primary-light/10 text-primary-light'
      };
      setCategories([...categories, newCategory]);
      addNotification({ title: 'Category Added', message: 'New business category has been created.', type: 'success' });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background-dark/80 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose}></div>
      
      <div className="relative w-full max-w-lg bg-surface-light dark:bg-surface-dark rounded-[32px] shadow-2xl border border-border-light dark:border-border-dark overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col">
        <div className={`p-8 border-b dark:border-border-dark flex justify-between items-center ${initialData ? 'bg-emerald-500' : 'bg-primary-light'}`}>
          <div className="flex items-center gap-4 text-white">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center shadow-inner">
              <Layout size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black tracking-tight">{initialData ? 'Edit Category' : 'Add New Category'}</h3>
              <p className="text-xs font-bold uppercase tracking-widest opacity-80">Business Classification</p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-white/10 rounded-2xl transition-all">
            <X size={24} className="text-white" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">Category Name</label>
            <input 
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Luxury Services" 
              className="w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-bold transition-all"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">Icon Representation</label>
            <div className="grid grid-cols-4 gap-3">
              {['Utensils', 'ShoppingBag', 'HeartPulse', 'Pill', 'Shirt', 'Zap', 'Scissors', 'GraduationCap'].map((icon) => (
                <div 
                  key={icon}
                  onClick={() => setFormData({ ...formData, icon })}
                  className={`p-4 rounded-2xl border-2 flex items-center justify-center cursor-pointer transition-all ${formData.icon === icon ? 'border-primary-light bg-primary-light/5' : 'border-transparent bg-gray-50 dark:bg-secondary-dark hover:border-gray-200'}`}
                >
                  <Layout size={20} className={formData.icon === icon ? 'text-primary-light' : 'text-text-secondary-light'} />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">Operational Status</label>
            <div className="flex gap-3">
              {['Active', 'Inactive'].map((status) => (
                <div 
                  key={status}
                  onClick={() => setFormData({ ...formData, status })}
                  className={`flex-1 p-4 rounded-2xl border-2 flex items-center justify-center gap-2 cursor-pointer transition-all ${formData.status === status ? (status === 'Active' ? 'border-success bg-success/5 text-success' : 'border-error bg-error/5 text-error') : 'border-transparent bg-gray-50 dark:bg-secondary-dark'}`}
                >
                  <div className={`w-2 h-2 rounded-full ${status === 'Active' ? 'bg-success' : 'bg-error'}`}></div>
                  <span className="text-xs font-black uppercase tracking-widest">{status}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <button 
              type="submit"
              className={`w-full py-4 rounded-2xl font-black text-sm shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] text-white ${initialData ? 'bg-emerald-500 shadow-emerald-500/20' : 'bg-primary-light shadow-primary-light/20'}`}
            >
              {initialData ? 'Save Changes' : 'Create Category'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AreaHierarchyModal = ({ 
  isOpen, onClose, type, initialData, 
  states, districts, taluks, pincodes,
  setStates, setDistricts, setTaluks, setPincodes,
  addNotification 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    state: '',
    district: '',
    taluk: '',
    status: 'Active'
  });

  React.useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        code: initialData.code || '',
        state: initialData.state || '',
        district: initialData.district || '',
        taluk: initialData.taluk || '',
        status: initialData.status || 'Active'
      });
    } else {
      setFormData({
        name: '',
        code: '',
        state: '',
        district: '',
        taluk: '',
        status: 'Active'
      });
    }
  }, [initialData, isOpen, type]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const actionType = initialData ? 'Updated' : 'Added';
    
    if (type === 'State') {
      if (initialData) {
        setStates(states.map(s => s.id === initialData.id ? { ...s, ...formData } : s));
      } else {
        setStates([...states, { id: states.length + 1, ...formData, districts: 0, agents: 0 }]);
      }
    } else if (type === 'District') {
      if (initialData) {
        setDistricts(districts.map(d => d.id === initialData.id ? { ...d, ...formData } : d));
      } else {
        setDistricts([...districts, { id: districts.length + 1, ...formData, taluks: 0, agents: 0 }]);
      }
    } else if (type === 'Taluk') {
      if (initialData) {
        setTaluks(taluks.map(t => t.id === initialData.id ? { ...t, ...formData } : t));
      } else {
        setTaluks([...taluks, { id: taluks.length + 1, ...formData, pincodes: 0, agents: 0 }]);
      }
    } else if (type === 'Pincode Mapping') {
      if (initialData) {
        setPincodes(pincodes.map(p => p.id === initialData.id ? { ...p, ...formData } : p));
      } else {
        setPincodes([...pincodes, { id: pincodes.length + 1, ...formData, agents: 0 }]);
      }
    }

    addNotification({ 
      title: `${type} ${actionType}`, 
      message: `${type} has been successfully ${actionType.toLowerCase()}.`, 
      type: 'success' 
    });
    onClose();
  };

  const getIcon = () => {
    switch(type) {
      case 'State': return <MapPin size={24} />;
      case 'District': return <Map size={24} />;
      case 'Taluk': return <Navigation size={24} />;
      case 'Pincode Mapping': return <Zap size={24} />;
      default: return <Layout size={24} />;
    }
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background-dark/80 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose}></div>
      
      <div className="relative w-full max-w-lg bg-surface-light dark:bg-surface-dark rounded-[32px] shadow-2xl border border-border-light dark:border-border-dark overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col">
        <div className={`p-8 border-b dark:border-border-dark flex justify-between items-center ${initialData ? 'bg-emerald-500' : 'bg-primary-light'}`}>
          <div className="flex items-center gap-4 text-white">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center shadow-inner">
              {getIcon()}
            </div>
            <div>
              <h3 className="text-xl font-black tracking-tight">{initialData ? `Edit ${type}` : `Add New ${type}`}</h3>
              <p className="text-xs font-bold uppercase tracking-widest opacity-80">Geographic Hierarchy</p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-white/10 rounded-2xl transition-all">
            <X size={24} className="text-white" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {type !== 'Pincode Mapping' ? (
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">{type} Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={`Enter ${type} name`}
                  className="w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-bold transition-all"
                  required
                />
              </div>
            ) : (
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">Pincode</label>
                <input 
                  type="text" 
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  placeholder="e.g., 600001"
                  className="w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-bold transition-all"
                  required
                />
              </div>
            )}

            {type === 'State' && (
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">State Code</label>
                <input 
                  type="text" 
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  placeholder="e.g., TN"
                  className="w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-bold transition-all"
                  required
                />
              </div>
            )}

            {(type === 'District' || type === 'Taluk' || type === 'Pincode Mapping') && (
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">Parent State</label>
                <select 
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-bold transition-all appearance-none"
                  required
                >
                  <option value="">Select State</option>
                  {states.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                </select>
              </div>
            )}

            {(type === 'Taluk' || type === 'Pincode Mapping') && (
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">Parent District</label>
                <select 
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-bold transition-all appearance-none"
                  required
                >
                  <option value="">Select District</option>
                  {districts.filter(d => !formData.state || d.state === formData.state).map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                </select>
              </div>
            )}

            {type === 'Pincode Mapping' && (
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">Parent Taluk</label>
                <select 
                  value={formData.taluk}
                  onChange={(e) => setFormData({ ...formData, taluk: e.target.value })}
                  className="w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-bold transition-all appearance-none"
                  required
                >
                  <option value="">Select Taluk</option>
                  {taluks.filter(t => !formData.district || t.district === formData.district).map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
                </select>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light ml-1">Operational Status</label>
              <div className="flex gap-3">
                {['Active', 'Inactive'].map((status) => (
                  <div 
                    key={status}
                    onClick={() => setFormData({ ...formData, status })}
                    className={`flex-1 p-4 rounded-2xl border-2 flex items-center justify-center gap-2 cursor-pointer transition-all ${formData.status === status ? (status === 'Active' ? 'border-success bg-success/5 text-success' : 'border-error bg-error/5 text-error') : 'border-transparent bg-gray-50 dark:bg-secondary-dark'}`}
                  >
                    <div className={`w-2 h-2 rounded-full ${status === 'Active' ? 'bg-success' : 'bg-error'}`}></div>
                    <span className="text-xs font-black uppercase tracking-widest">{status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button 
              type="submit"
              className={`w-full py-4 rounded-2xl font-black text-sm shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] text-white ${initialData ? 'bg-emerald-500 shadow-emerald-500/20' : 'bg-primary-light shadow-primary-light/20'}`}
            >
              {initialData ? 'Save Changes' : `Create ${type}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const VerificationDetailModal = ({ isOpen, onClose, verification, onApprove, onReject }) => {
  if (!isOpen || !verification) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background-dark/80 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose}></div>
      <div className="relative w-full max-w-4xl bg-surface-light dark:bg-surface-dark rounded-3xl shadow-2xl border border-border-light dark:border-border-dark overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-border-light dark:border-border-dark flex justify-between items-center bg-primary-light/5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary-light text-white rounded-xl flex items-center justify-center shadow-lg">
              <FileText size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black dark:text-white tracking-tight uppercase">{verification.entityName}</h3>
              <p className="text-sm text-text-secondary-light font-bold">Verification Request • {verification.type}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-secondary-dark rounded-xl transition-all"><X size={20} className="dark:text-white" /></button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 space-y-6">
              <div className="card-premium bg-gray-50/50 dark:bg-secondary-dark/30 border-none">
                <h4 className="text-[10px] font-black text-text-secondary-light uppercase tracking-widest mb-4">Entity Details</h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] font-bold text-text-secondary-light uppercase">Owner Name</p>
                    <p className="text-sm font-black dark:text-white mt-1">{verification.owner}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-text-secondary-light uppercase">Submitted At</p>
                    <p className="text-sm font-black dark:text-white mt-1">{verification.submittedAt}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-text-secondary-light uppercase">Priority Level</p>
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-black uppercase mt-1 ${
                      verification.priority === 'High' ? 'bg-error/10 text-error' : 'bg-blue-500/10 text-blue-500'
                    }`}>{verification.priority} Priority</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-primary-light/10 rounded-2xl border border-primary-light/20">
                <p className="text-xs font-bold text-primary-light leading-relaxed">
                  Please review each document carefully for authenticity and validity period before final approval.
                </p>
              </div>
            </div>

            <div className="md:col-span-2 space-y-4">
              <h4 className="text-[10px] font-black text-text-secondary-light uppercase tracking-widest flex items-center gap-2">
                <ShieldCheck size={14} /> Document Checklist
              </h4>
              <div className="space-y-3">
                {verification.documents.map((doc) => (
                  <div key={doc.id} className="p-4 bg-gray-50 dark:bg-secondary-dark rounded-2xl border border-border-light dark:border-border-dark flex items-center justify-between group hover:border-primary-light/30 transition-all">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        doc.status === 'Verified' ? 'bg-success/10 text-success' : 'bg-primary-light/10 text-primary-light'
                      }`}>
                        {doc.fileType === 'PDF' ? <FileText size={20} /> : <Camera size={20} />}
                      </div>
                      <div>
                        <p className="text-sm font-black dark:text-white">{doc.name}</p>
                        <p className="text-[10px] font-bold text-text-secondary-light uppercase">{doc.fileType} • {doc.size}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-primary-light/10 text-primary-light rounded-lg transition-all" title="View Document"><Eye size={16} /></button>
                      <button className="p-2 hover:bg-blue-500/10 text-blue-500 rounded-lg transition-all" title="Download"><Download size={16} /></button>
                      {doc.status === 'Verified' ? (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-success/10 text-success rounded-lg text-[10px] font-black uppercase">
                          <Check size={12} /> Verified
                        </div>
                      ) : (
                        <button 
                          onClick={() => onApprove(verification.id, doc.id)}
                          className="px-3 py-1.5 bg-success text-white rounded-lg text-[10px] font-black uppercase hover:scale-105 active:scale-95 transition-all"
                        >
                          Verify
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border-light dark:border-border-dark bg-gray-50/50 dark:bg-secondary-dark/30 flex gap-4">
          <button onClick={onReject} className="flex-1 py-4 rounded-2xl font-black text-sm border-2 border-error/20 text-error hover:bg-error/5 transition-all">Reject All Documents</button>
          <button 
            onClick={() => {
              onApprove(verification.id);
              onClose();
            }} 
            className="flex-1 py-4 rounded-2xl bg-success text-white font-black text-sm shadow-xl shadow-success/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Finalize Verification
          </button>
        </div>
      </div>
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

export default AdminDashboard;
