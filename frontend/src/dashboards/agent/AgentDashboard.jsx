import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import {
  LayoutDashboard, User, ShieldCheck, Lock, Users, GitBranch, Link as LinkIcon,
  Map, PlusSquare, Store, CheckSquare, Target, ShoppingBag, CreditCard,
  Wallet, History, Award, ArrowUpRight, TrendingUp, BarChart2,
  Bell, LifeBuoy, MessageSquare, Settings, LogOut, Search, Filter,
  ChevronRight, ArrowRight, MoreVertical, Edit, Trash2, CheckCircle, Clock, ChevronDown,
  FileText, PieChart, Info, AlertCircle, Globe, Download, Sun, Moon, Star, X, UserPlus, Mail, Phone, Eye, Activity
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, AreaChart, Area, PieChart as RePieChart, Pie, Cell
} from 'recharts';
import { useNotifications } from '../../context/NotificationContext';

const AgentDashboard = () => {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const { notifications, addNotification, pushGlobalNotification, markAsRead, markAllAsRead, unreadCount } = useNotifications();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [applicationStep, setApplicationStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const generateReportPDF = (title, fileName) => {
    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      
      // Header Background
      doc.setFillColor(16, 185, 129);
      doc.rect(0, 0, pageWidth, 40, 'F');
      
      // Header Text
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(22);
      doc.setFont('helvetica', 'bold');
      doc.text('AGENT HUB', 20, 20);
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text('OFFICIAL PLATFORM DOCUMENT', 20, 30);
      
      // Document Title
      doc.setTextColor(31, 41, 55);
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      doc.text(title.replace(/_/g, ' ').toUpperCase(), 20, 60);
      
      // Divider
      doc.setDrawColor(16, 185, 129);
      doc.setLineWidth(0.5);
      doc.line(20, 65, pageWidth - 20, 65);
      
      // Metadata
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`Reference ID: AGT-DOC-${Math.floor(100000 + Math.random() * 900000)}`, 20, 75);
      doc.text(`Issued Date: ${new Date().toLocaleDateString()}`, 20, 82);
      doc.text(`Recipient: ${user?.name || 'Authorized Agent'}`, 20, 89);
      doc.text(`Status: VERIFIED`, 20, 96);
      
      // Main Body
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('Document Summary', 20, 115);
      
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      const summary = `This official document pertains to ${title.replace(/_/g, ' ')}. It serves as a verified record within the Agent Hub ecosystem. The recipient is authorized to present this document for platform-related verifications.`;
      const splitSummary = doc.splitTextToSize(summary, pageWidth - 40);
      doc.text(splitSummary, 20, 125);
      
      // Detailed Content Table (Simulated)
      doc.setFillColor(249, 250, 251);
      doc.rect(20, 150, pageWidth - 40, 60, 'F');
      doc.setDrawColor(229, 231, 235);
      doc.rect(20, 150, pageWidth - 40, 60, 'S');
      
      doc.setFont('helvetica', 'bold');
      doc.text('Key Details:', 30, 165);
      doc.setFont('helvetica', 'normal');
      doc.text(`• Document Type: ${fileName.split('.').pop().toUpperCase()} Report`, 30, 175);
      doc.text(`• Verification Authority: Agent Hub Compliance Dept.`, 30, 185);
      doc.text(`• Validity: Active / Perpetual`, 30, 195);
      
      // Footer
      doc.setFontSize(8);
      doc.setTextColor(156, 163, 175);
      doc.text('CONFIDENTIAL - FOR AUTHORIZED USE ONLY', pageWidth / 2, 280, { align: 'center' });
      doc.text('© 2026 Agent Hub Platform. All rights reserved.', pageWidth / 2, 285, { align: 'center' });
      
      doc.save(`${fileName.replace(/\s+/g, '_')}.pdf`);
      return true;
    } catch (error) {
      console.error('PDF Generation error:', error);
      return false;
    }
  };

  const handleDownloadFile = (fileName = 'Document', extension = 'pdf') => {
    if (fileName === 'Agent_ID_Card') {
      generateIDCardPDF();
      return;
    }
    
    addNotification({ 
      title: 'Preparing Report', 
      message: `Generating professional ${extension.toUpperCase()} document...`, 
      type: 'info' 
    });

    setTimeout(() => {
      if (extension === 'pdf') {
        const success = generateReportPDF(fileName, fileName);
        if (success) {
          addNotification({ 
            title: 'Report Ready', 
            message: `${fileName} has been downloaded successfully.`, 
            type: 'success' 
          });
        } else {
          addNotification({ title: 'Download Failed', message: 'PDF engine error.', type: 'error' });
        }
      } else {
        // Fallback for non-PDF files
        try {
          const type = 'text/csv';
          const content = `Report Title,${fileName}\nGenerated Date,${new Date().toLocaleString()}\nAgent Name,${user?.name}\nStatus,Verified`;
          const blob = new Blob([content], { type });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `${fileName.replace(/\s+/g, '_')}.${extension}`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
          addNotification({ title: 'File Ready', message: 'Download complete.', type: 'success' });
        } catch (e) {
          addNotification({ title: 'Error', message: 'Download failed.', type: 'error' });
        }
      }
    }, 1500);
  };

  const generateIDCardPDF = () => {
    addNotification({ title: 'Generating ID Card', message: 'Building your official ID card...', type: 'info' });
    try {
      const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: [86, 54] });

      // --- Background ---
      doc.setFillColor(10, 25, 47); // deep navy
      doc.rect(0, 0, 86, 54, 'F');

      // --- Green accent bar (left side) ---
      doc.setFillColor(16, 185, 129); // emerald green
      doc.rect(0, 0, 6, 54, 'F');

      // --- Watermark circle (decorative) ---
      doc.setFillColor(16, 185, 129, 0.05);
      doc.setDrawColor(16, 185, 129);
      doc.setLineWidth(0.3);
      doc.circle(68, 27, 20, 'S');
      doc.circle(68, 27, 14, 'S');

      // --- Header ---
      doc.setFillColor(16, 185, 129);
      doc.setTextColor(16, 185, 129);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.text('AGENT HUB', 10, 8);

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(5);
      doc.setFont('helvetica', 'normal');
      doc.text('OFFICIAL AGENT IDENTIFICATION CARD', 10, 12);

      // --- Divider ---
      doc.setDrawColor(16, 185, 129);
      doc.setLineWidth(0.3);
      doc.line(9, 14, 60, 14);

      // --- Avatar circle ---
      doc.setFillColor(16, 185, 129);
      doc.circle(17, 23, 7, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text('A', 17, 25.5, { align: 'center' });

      // --- Agent Name ---
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(255, 255, 255);
      doc.text('AdminHub', 27, 20);

      // --- Role badge ---
      doc.setFillColor(16, 185, 129);
      doc.roundedRect(27, 21.5, 18, 4, 1, 1, 'F');
      doc.setFontSize(4.5);
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.text('STATE LEVEL AGENT', 36, 24.2, { align: 'center' });

      // --- Info fields ---
      const fields = [
        { label: 'AGENT ID',    value: 'AGT-882901' },
        { label: 'EMAIL',       value: 'agent2@agenticstore.com' },
        { label: 'STATE',       value: 'Maharashtra' },
        { label: 'VALID FROM',  value: 'Jan 15, 2024' },
      ];
      doc.setFontSize(4.2);
      let yPos = 32;
      fields.forEach(({ label, value }) => {
        doc.setTextColor(100, 200, 160);
        doc.setFont('helvetica', 'bold');
        doc.text(label, 10, yPos);
        doc.setTextColor(220, 230, 240);
        doc.setFont('helvetica', 'normal');
        doc.text(value, 30, yPos);
        yPos += 4.5;
      });

      // --- QR-style box ---
      doc.setDrawColor(16, 185, 129);
      doc.setLineWidth(0.4);
      doc.rect(63, 8, 18, 18, 'S');
      // inner squares to mimic QR
      doc.setFillColor(16, 185, 129);
      doc.rect(64, 9, 4, 4, 'F');
      doc.rect(76, 9, 4, 4, 'F');
      doc.rect(64, 21, 4, 4, 'F');
      doc.setFillColor(30, 60, 90);
      doc.rect(64.5, 9.5, 3, 3, 'F');
      doc.rect(76.5, 9.5, 3, 3, 'F');
      doc.rect(64.5, 21.5, 3, 3, 'F');
      doc.setFillColor(16, 185, 129);
      doc.rect(64.5+1, 9.5+1, 1, 1, 'F');
      doc.rect(76.5+1, 9.5+1, 1, 1, 'F');
      doc.rect(64.5+1, 21.5+1, 1, 1, 'F');
      // random data dots
      const dots = [[66,14],[68,12],[70,14],[72,12],[74,14],[66,16],[70,16],[73,16],[68,18],[72,18],[75,13],[75,15],[75,21],[75,23],[66,23],[68,23],[70,22]];
      doc.setFillColor(16, 185, 129);
      dots.forEach(([x,y]) => doc.rect(x, y, 0.8, 0.8, 'F'));

      doc.setFontSize(3.5);
      doc.setTextColor(100, 200, 160);
      doc.text('SCAN TO VERIFY', 72, 29, { align: 'center' });

      // --- Footer bar ---
      doc.setFillColor(16, 185, 129);
      doc.rect(0, 49, 86, 5, 'F');
      doc.setTextColor(10, 25, 47);
      doc.setFontSize(4);
      doc.setFont('helvetica', 'bold');
      doc.text('AgentHub Platform  |  www.agenticstore.com  |  KYC VERIFIED  |  OPERATIONAL', 43, 52.2, { align: 'center' });

      doc.save('Agent_ID_Card_AGT-882901.pdf');
      addNotification({ title: 'ID Card Downloaded', message: 'Your official ID card has been saved.', type: 'success' });
    } catch (err) {
      console.error('ID Card generation failed:', err);
      addNotification({ title: 'Download Failed', message: 'Could not generate ID card. Please try again.', type: 'error' });
    }
  };

  const [isDownloading, setIsDownloading] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [showExpansionModal, setShowExpansionModal] = useState(false);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [supportTickets, setSupportTickets] = useState([
    { id: '#TK-9921', sub: 'Commission payout delay for April', status: 'In Progress', priority: 'High', activity: 'Just now' },
    { id: '#TK-9845', sub: 'Technical issue with shop upload', status: 'Pending', priority: 'Medium', activity: '5 hours ago' },
    { id: '#TK-9721', sub: 'How to update KYC documents?', status: 'Resolved', priority: 'Low', activity: '2 days ago' }
  ]);
  const [analyticsTimeframe, setAnalyticsTimeframe] = useState('Monthly View');
  const [paymentMethod, setPaymentMethod] = useState('UPI'); // 'UPI' or 'Manual'
  const [showOnboardModal, setShowOnboardModal] = useState(false);
  const [onboardForm, setOnboardForm] = useState({ name: '', email: '', phone: '', role: 'Agent', location: '' });
  const [shopForm, setShopForm] = useState({ 
    name: '', 
    category: 'Grocery', 
    owner: '', 
    location: '', 
    contact: '',
    documents: {
      license: null,
      licenseName: '',
      gst: null,
      gstName: ''
    }
  });
  const [showShopModal, setShowShopModal] = useState(false);
  const [viewingFile, setViewingFile] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [settings, setSettings] = useState({
    twoFactor: true,
    emailAlerts: true,
    smsNotifications: true,
    browserPushes: false,
    commissionAlerts: true,
    language: 'English'
  });
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showCommissionModal, setShowCommissionModal] = useState(false);
  const [members, setMembers] = useState([
    { id: 1, name: 'Rahul Sharma', role: 'Agent', location: 'Pune', status: 'Active', joined: '2026-04-15' },
    { id: 2, name: 'Priya Verma', role: 'Premium Agent', location: 'Mumbai', status: 'Active', joined: '2026-04-20' },
    { id: 3, name: 'Amit Singh', role: 'Agent', location: 'Nashik', status: 'Pending', joined: '2026-05-01' },
    { id: 4, name: 'Sneha Patel', role: 'Agent', location: 'Pune', status: 'Active', joined: '2026-03-10' },
  ]);
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Visit Fresh Mart', desc: 'Discuss monthly target achievement and commission payout.', time: '11:00 AM', priority: 'High', done: false },
    { id: 2, title: 'Verify KYC for Rahul S.', desc: 'Review uploaded documents for new member onboarding.', time: '02:00 PM', priority: 'Medium', done: true },
    { id: 3, title: 'Shop Audit - Electro World', desc: 'Verify stock levels for premium member exclusive offers.', time: '04:30 PM', priority: 'High', done: false },
    { id: 4, title: 'Update Area Report', desc: 'Submit weekly territory growth report to Admin hub.', time: '06:00 PM', priority: 'Medium', done: false },
  ]);
  const [shops, setShops] = useState(() => {
    try {
      const saved = localStorage.getItem('agentShops');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error('Failed to load shops from localStorage', e);
    }
    return []; // Start empty, will fetch from API
  });

  // 1. Fetch shops from MongoDB on load
  useEffect(() => {
    const fetchShops = async () => {
      try {
        if (!user?.token) return;
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const { data } = await axios.get('/api/shops', config);
        if (data && Array.isArray(data)) {
          setShops(data);
          localStorage.setItem('agentShops', JSON.stringify(data));
        }
      } catch (error) {
        console.error('Error fetching shops from MongoDB:', error);
      }
    };
    fetchShops();
  }, [user?.token]);

  useEffect(() => {
    localStorage.setItem('agentShops', JSON.stringify(shops));
  }, [shops]);

  useEffect(() => {
    const syncGlobalShops = () => {
      const globalShops = JSON.parse(localStorage.getItem('globalShops') || '[]');
      if (globalShops.length > 0) {
        setShops(prev => {
          const updated = [...prev];
          globalShops.forEach(gs => {
            const index = updated.findIndex(s => (s._id === gs._id || s.id === gs._id || s._id === gs.id || s.id === gs.id));
            if (index !== -1) {
              // Update status and other fields from global registry
              updated[index] = {
                ...updated[index],
                status: gs.status,
                name: gs.name || gs.shopName || updated[index].name,
                category: gs.category || gs.cat || updated[index].category
              };
            }
          });
          return updated;
        });
      }
    };

    syncGlobalShops();
    window.addEventListener('storage', syncGlobalShops);
    return () => window.removeEventListener('storage', syncGlobalShops);
  }, []);

  const handleDeleteShop = async (id) => {
    if (window.confirm('Are you sure you want to remove this shop onboarding?')) {
      try {
        if (user?.token) {
          const config = { headers: { Authorization: `Bearer ${user.token}` } };
          await axios.delete(`/api/shops/${id}`, config);
        }
        setShops(shops.filter(s => s.id !== id && s._id !== id));
        addNotification({ title: 'Shop Removed', message: 'The shop has been removed from the database.', type: 'success' });
      } catch (error) {
        console.error('Delete error:', error);
        addNotification({ title: 'Error', message: 'Failed to remove shop from database.', type: 'error' });
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSubmitShop = async (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    console.log('DEBUG: handleSubmitShop triggered');
    window.alert('Saving Registration Data...');

    try {
      const shopName = (shopForm.name || '').trim();
      const ownerName = (shopForm.owner || '').trim();
      const contactNum = (shopForm.contact || '').trim();
      const shopLoc = (shopForm.location || '').trim();

      if (!shopName || !ownerName || !contactNum || !shopLoc) {
        window.alert(`Validation Error: ${!shopName ? 'Shop Name, ' : ''}${!ownerName ? 'Owner Name, ' : ''}${!contactNum ? 'Contact, ' : ''}${!shopLoc ? 'Location ' : ''}are required.`);
        setIsProcessing(false);
        return;
      }

      setIsProcessing(true);

      const currentShops = Array.isArray(shops) ? shops : [];
      
      const payload = {
        name: shopName,
        category: shopForm.category || 'Grocery',
        owner: ownerName,
        location: shopLoc,
        agent: user?.name || 'AgentHub',
        documents: {
          license: (shopForm.documents && shopForm.documents.licenseName) ? shopForm.documents.licenseName : 'Shop_License.pdf',
          gst: (shopForm.documents && shopForm.documents.gstName) ? shopForm.documents.gstName : 'GST_Certificate.pdf'
        }
      };

      // 1. API Call to save to MongoDB
      let savedShop = null;
      if (user?.token) {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const { data } = await axios.post('/api/shops', payload, config);
        savedShop = data;
      }

      const shopToStore = savedShop || { ...payload, id: Date.now(), status: 'Pending Review' };
      const updatedShops = [shopToStore, ...currentShops];
      
      // Sync to shared global state for Admin/Sub-Admin access
      const globalShops = JSON.parse(localStorage.getItem('globalShops') || '[]');
      localStorage.setItem('globalShops', JSON.stringify([shopToStore, ...globalShops]));
      localStorage.setItem('shop_updated', Date.now().toString());
      
      // UPDATE STATE
      setShops(updatedShops);
      
      addNotification({
        title: 'Registration Submitted',
        message: `${shopName} onboarding initiated. Waiting for Sub-Admin verification.`,
        type: 'success'
      });
      
      pushGlobalNotification({
        title: 'New Shop Registration',
        message: `Agent ${user?.name || 'AgentHub'} has submitted a new shop: ${shopName}`,
        type: 'info'
      });

      console.log('DEBUG: Saved successfully', shopToStore);
      
      setTimeout(() => {
        setShowShopModal(false);
        setIsProcessing(false);
        // Reset form
        setShopForm({ 
          name: '', category: 'Grocery', owner: '', location: '', contact: '',
          documents: { license: null, licenseName: '', gst: null, gstName: '' }
        });
      }, 1500);

    } catch (error) {
      console.error('DEBUG: Save Failed', error);
      setIsProcessing(false);
      addNotification({
        title: 'Submission Failed',
        message: error.response?.data?.message || 'Server error occurred.',
        type: 'error'
      });
      window.alert('Submission Failed: ' + (error.response?.data?.message || error.message));
    }
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
    { title: 'Total Earnings', value: '₹42,850', icon: <Wallet />, color: 'bg-emerald-500', trend: '+12.5%', trendType: 'success' },
    { title: 'Shop Onboarded', value: '12', icon: <Store />, color: 'bg-orange-500', trend: '+2 this week', trendType: 'success' },
    { title: 'Current Target', value: '85%', icon: <Target />, color: 'bg-purple-500', trend: 'In Progress', trendType: 'info' },
    { title: 'Network Growth', value: '124', icon: <Users />, color: 'bg-blue-500', trend: '+18% Growth', trendType: 'success' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return (
          <div className="p-8 space-y-8 animate-in fade-in duration-500">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.title} className="card-premium flex items-center gap-5 hover:scale-[1.02] transition-all group border-b-4 border-b-transparent hover:border-b-primary-light/40">
                  <div className={`w-14 h-14 ${stat.color} text-white rounded-2xl shadow-lg flex items-center justify-center shrink-0 transition-transform group-hover:rotate-6`}>
                    {React.cloneElement(stat.icon, { size: 28 })}
                  </div>
                  <div className="flex flex-col justify-center min-w-0">
                    <p className="text-[11px] font-black text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-[0.1em]">{stat.title}</p>
                    <h3 className="text-2xl font-black dark:text-white mt-0.5 tracking-tight">{stat.value}</h3>
                    <div className="flex items-center gap-1.5 mt-1">
                      <div className={`w-1.5 h-1.5 rounded-full ${stat.trendType === 'success' ? 'bg-emerald-500' : 'bg-blue-500'}`}></div>
                      <p className={`text-[10px] font-bold ${stat.trendType === 'success' ? 'text-emerald-500' : 'text-blue-500'}`}>{stat.trend}</p>
                    </div>
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
                  <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
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
              <div className="card-premium flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold dark:text-white">Recent Activities</h3>
                  <div className="w-8 h-8 bg-primary-light/10 text-primary-light rounded-full flex items-center justify-center">
                    <Activity size={16} />
                  </div>
                </div>
                
                <div className="flex-1 space-y-4">
                  {[
                    { title: 'Shop Registration', desc: 'New Shop: Fresh Mart', time: '5h ago', icon: <Store />, color: 'text-emerald-500', bgColor: 'bg-emerald-500/10', target: 'Shop Tie-Up' },
                    { title: 'KYC Verified', desc: 'Your KYC was approved by Admin', time: '1d ago', icon: <ShieldCheck />, color: 'text-purple-500', bgColor: 'bg-purple-500/10', target: 'Security Deposit' },
                    { title: 'Payment Received', desc: 'Payout for April processed', time: '2d ago', icon: <Wallet />, color: 'text-blue-500', bgColor: 'bg-blue-500/10', target: 'Wallet / Earnings' },
                  ].map((activity, i) => (
                    <div 
                      key={i} 
                      onClick={() => setActiveTab(activity.target)}
                      className="flex items-center justify-between p-4 bg-gray-50/50 dark:bg-secondary-dark/50 rounded-2xl group transition-all hover:bg-white dark:hover:bg-secondary-dark hover:shadow-md border border-transparent hover:border-border-light dark:hover:border-border-dark cursor-pointer"
                    >
                      <div className="flex gap-4">
                        <div className={`w-12 h-12 rounded-xl ${activity.bgColor} ${activity.color} flex items-center justify-center shadow-sm shrink-0 transition-transform group-hover:scale-110`}>
                          {React.cloneElement(activity.icon, { size: 22 })}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-black dark:text-white truncate">{activity.title}</p>
                          <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark font-medium line-clamp-1">{activity.desc}</p>
                          <p className="text-[10px] text-text-secondary-light/60 dark:text-text-secondary-dark/40 mt-1 font-bold uppercase tracking-wider">{activity.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-gray-100 dark:bg-surface-dark rounded-xl transition-all opacity-0 group-hover:opacity-100 text-text-secondary-light">
                          <ChevronRight size={18} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 pt-6 border-t dark:border-border-dark">
                  <button 
                    onClick={() => setActiveTab('Commission History')}
                    className="w-full btn-outline py-4 text-xs font-black uppercase tracking-[0.2em] hover:shadow-lg hover:shadow-primary-light/10 transition-all rounded-2xl flex items-center justify-center gap-3"
                  >
                    View All History <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="h-10"></div>
          </div>
        );

      case 'My Profile': {
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
                      onClick={() => {
                        setActiveTab('Settings');
                        addNotification({ title: 'Edit Profile', message: 'You can update your personal information in Settings.', type: 'info' });
                      }}
                      className="w-full btn-primary py-3 rounded-xl font-bold text-sm shadow-lg shadow-primary-light/20 hover:scale-[1.02] transition-all"
                    >
                      Edit Profile Info
                    </button>
                    <button 
                      onClick={() => handleDownloadFile('Agent_ID_Card', 'pdf')}
                      disabled={isDownloading}
                      className={`w-full btn-outline py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${isDownloading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50 dark:hover:bg-secondary-dark'}`}
                    >
                      {isDownloading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-primary-light border-t-transparent rounded-full animate-spin"></div>
                          Downloading...
                        </>
                      ) : (
                        <>
                          <Download size={16} />
                          Download ID Card
                        </>
                      )}
                    </button>
                    <button 
                      onClick={() => setShowUpgradeModal(true)}
                      className="w-full py-3 text-error font-bold text-sm hover:bg-error/5 rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                      <TrendingUp size={16} />
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
      }

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
                  <h4 className="font-bold dark:text-white">Uploaded Identity</h4>
                  <div className="space-y-4">
                    {[
                      { name: 'Aadhar Card', status: 'Approved', date: 'Jan 16, 2024' },
                      { name: 'PAN Card', status: 'Approved', date: 'Jan 16, 2024' },
                      { name: 'Address Proof', status: 'Approved', date: 'Jan 16, 2024' },
                    ].map((doc, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-secondary-dark rounded-xl border border-border-light dark:border-border-dark group hover:border-primary-light transition-all">
                        <div className="flex items-center gap-3">
                          <FileText className="text-primary-light" size={20} />
                          <div>
                            <p className="text-sm font-bold dark:text-white">{doc.name}</p>
                            <p className="text-[10px] text-text-secondary-light">Verified on {doc.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => handleDownloadFile(doc.name, 'pdf')}
                            className="p-2 hover:bg-white dark:hover:bg-surface-dark rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                          >
                            <Download size={14} className="text-text-secondary-light hover:text-primary-light" />
                          </button>
                          <CheckCircle className="text-success" size={16} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <h4 className="font-bold dark:text-white mt-8">Business Certificates</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { name: 'Trade_License.pdf', size: '2.4 MB' },
                      { name: 'GST_Cert.png', size: '1.1 MB' }
                    ].map((doc, i) => (
                      <div 
                        key={i} 
                        onClick={() => setViewingFile(doc.name)}
                        className="p-4 bg-gray-50 dark:bg-secondary-dark rounded-2xl border border-border-light dark:border-border-dark flex items-center justify-between group cursor-pointer hover:border-primary-light transition-all active:scale-95"
                      >
                        <div>
                          <p className="text-[10px] font-black dark:text-white truncate max-w-[100px]">{doc.name}</p>
                          <p className="text-[8px] text-text-secondary-light font-bold uppercase">{doc.size}</p>
                        </div>
                        <Eye size={16} className="text-text-secondary-light group-hover:text-primary-light" />
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
                        <td className="py-4 text-right relative">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveDropdown(activeDropdown === `member-${i}` ? null : `member-${i}`);
                            }}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-secondary-dark rounded-lg transition-colors"
                          >
                            <MoreVertical size={16} />
                          </button>
                          {activeDropdown === `member-${i}` && (
                            <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-surface-dark shadow-2xl rounded-2xl z-50 border border-border-light dark:border-border-dark py-2 animate-in fade-in zoom-in-95 duration-200">
                               <button onClick={() => setActiveDropdown(null)} className="w-full text-left px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-secondary-dark text-xs font-bold dark:text-white flex items-center gap-3">
                                 <User size={14} className="text-primary-light" /> View Details
                               </button>
                               <button onClick={() => setActiveDropdown(null)} className="w-full text-left px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-secondary-dark text-xs font-bold dark:text-white flex items-center gap-3">
                                 <Mail size={14} className="text-blue-500" /> Send Email
                               </button>
                               <div className="my-1 border-t dark:border-border-dark"></div>
                               <button onClick={() => setActiveDropdown(null)} className="w-full text-left px-4 py-2.5 hover:bg-red-50 dark:hover:bg-red-500/10 text-xs font-bold text-red-500 flex items-center gap-3">
                                 <Trash2 size={14} /> Remove Member
                               </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'Referral Links':
        return (
          <div className="p-8 max-w-5xl animate-in slide-in-from-bottom-4 duration-500 mx-auto">
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
                  <div key={i} className="space-y-2.5">
                    <h4 className="text-[11px] font-black text-text-secondary-light uppercase tracking-widest ml-1">{item.title}</h4>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 p-3.5 bg-gray-50 dark:bg-secondary-dark rounded-2xl border border-border-light dark:border-border-dark font-mono text-[11px] dark:text-white overflow-hidden text-ellipsis whitespace-nowrap h-[52px] flex items-center shadow-inner">
                        {item.link}
                      </div>
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(item.link);
                          addNotification({ title: 'Link Copied', message: 'Referral link copied to clipboard.', type: 'success' });
                        }}
                        className="btn-primary h-[52px] px-6 rounded-2xl text-xs font-black flex items-center gap-2 whitespace-nowrap shadow-lg shadow-primary-light/20 transition-transform active:scale-95"
                      >
                        <LinkIcon size={16} /> Copy Link
                      </button>
                    </div>
                    <p className="text-[10px] text-text-secondary-light ml-1 opacity-70 font-medium">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                {[
                  { label: 'Total Clicks', value: '1,240', sub: 'Last 30 days' },
                  { label: 'Conversions', value: '156', sub: '12.5% rate' },
                  { label: 'Bonus Earned', value: '₹12,500', sub: 'MTD Earning' },
                ].map((stat, i) => (
                  <div key={i} className="p-6 bg-primary-light/5 rounded-[24px] border border-primary-light/10 text-center hover:bg-primary-light/10 transition-colors">
                    <p className="text-[10px] font-black text-primary-light uppercase tracking-widest mb-1">{stat.label}</p>
                    <p className="text-2xl font-black dark:text-white">{stat.value}</p>
                    <p className="text-[9px] font-bold text-text-secondary-light uppercase mt-1 opacity-60">{stat.sub}</p>
                  </div>
                ))}
              </div>

              {/* Referral Benefits & Rewards */}
              <div className="pt-10 space-y-8">
                <div className="flex items-center gap-3 border-b dark:border-border-dark pb-5">
                  <div className="p-2 bg-yellow-500/10 rounded-xl">
                    <Award className="text-yellow-500" size={22} />
                  </div>
                  <h4 className="font-black dark:text-white uppercase tracking-[0.1em] text-sm">Referral Benefits & Rewards</h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {[
                    { 
                      title: 'Direct Referral Commission', 
                      reward: 'UP TO 10%', 
                      desc: 'Earn a percentage on every purchase made by customers you refer.',
                      icon: <TrendingUp className="text-emerald-500" size={20} />,
                      color: 'bg-emerald-500/10'
                    },
                    { 
                      title: 'Onboarding Bonus', 
                      reward: '₹500 / SHOP', 
                      desc: 'Get a fixed reward for every shop partner that successfully completes KYC.',
                      icon: <Store className="text-blue-500" size={20} />,
                      color: 'bg-blue-500/10'
                    },
                    { 
                      title: 'Member Network Growth', 
                      reward: '₹200 / AGENT', 
                      desc: 'Fixed bonus for every new agent joining under your network.',
                      icon: <Users className="text-purple-500" size={20} />,
                      color: 'bg-purple-500/10'
                    },
                    { 
                      title: 'Milestone Rewards', 
                      reward: 'PREMIUM STATUS', 
                      desc: 'Unlock exclusive benefits and higher rates after reaching 50 conversions.',
                      icon: <Target className="text-orange-500" size={20} />,
                      color: 'bg-orange-500/10'
                    }
                  ].map((benefit, i) => (
                    <div key={i} className="p-6 bg-gray-50 dark:bg-secondary-dark/30 rounded-[28px] border border-border-light dark:border-border-dark flex gap-5 hover:border-primary-light/40 transition-all group shadow-sm">
                      <div className={`w-14 h-14 rounded-2xl ${benefit.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-sm`}>
                        {benefit.icon}
                      </div>
                      <div className="space-y-1.5 flex-1">
                        <div className="flex justify-between items-start gap-2">
                          <h5 className="font-black dark:text-white text-sm leading-tight">{benefit.title}</h5>
                          <span className="text-[9px] font-black text-primary-light bg-primary-light/10 px-2 py-1 rounded-lg uppercase whitespace-nowrap border border-primary-light/20">
                            {benefit.reward}
                          </span>
                        </div>
                        <p className="text-[11px] text-text-secondary-light leading-relaxed font-medium opacity-80">{benefit.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-8 bg-gradient-to-br from-secondary-dark to-background-dark rounded-[32px] border border-white/5 text-white overflow-hidden relative group shadow-2xl">
                  <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                    <div className="space-y-3">
                      <h4 className="text-2xl font-black tracking-tight">Ready to boost your earnings?</h4>
                      <p className="text-sm opacity-60 max-w-md leading-relaxed">Our multi-level reward system is designed to help you grow. More referrals mean higher commission tiers and exclusive perks!</p>
                    </div>
                    <button 
                      onClick={() => setShowCommissionModal(true)}
                      className="bg-primary-light hover:bg-primary-dark text-white font-black px-10 py-4 rounded-[20px] shadow-2xl shadow-primary-light/30 transition-all hover:scale-[1.05] active:scale-[0.95] whitespace-nowrap text-sm flex items-center gap-2 group/btn"
                    >
                      View Compensation Plan
                      <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                  <Award size={180} className="absolute -right-12 -top-12 text-white/5 -rotate-12 group-hover:scale-110 transition-transform duration-1000" />
                </div>

                {/* Recent Referral Activity */}
                <div className="pt-10 space-y-5">
                  <div className="flex items-center justify-between border-b dark:border-border-dark pb-5">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary-light/10 rounded-xl">
                        <History className="text-primary-light" size={22} />
                      </div>
                      <h4 className="font-black dark:text-white uppercase tracking-[0.1em] text-sm">Recent Referral Activity</h4>
                    </div>
                    <button className="text-xs font-black text-primary-light hover:underline tracking-widest uppercase">View Full Ledger</button>
                  </div>

                  <div className="overflow-hidden border border-border-light dark:border-border-dark rounded-[28px] shadow-sm">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-gray-50 dark:bg-secondary-dark/40 border-b border-border-light dark:border-border-dark">
                          <th className="p-5 text-[10px] font-black uppercase text-text-secondary-light tracking-[0.15em] w-[40%]">Referred Entity</th>
                          <th className="p-5 text-[10px] font-black uppercase text-text-secondary-light tracking-[0.15em] w-[20%] text-center">Type</th>
                          <th className="p-5 text-[10px] font-black uppercase text-text-secondary-light tracking-[0.15em] w-[20%] text-center">Date</th>
                          <th className="p-5 text-[10px] font-black uppercase text-text-secondary-light tracking-[0.15em] text-right w-[20%]">Reward Earned</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border-light dark:divide-border-dark">
                        {[
                          { name: 'John Doe', type: 'Customer', date: 'May 02, 2026', reward: '₹120.00', status: 'Commission' },
                          { name: 'Organic Foods Store', type: 'Shop Partner', date: 'Apr 28, 2026', reward: '₹500.00', status: 'Onboarding' },
                          { name: 'Sarah Miller', type: 'Agent', date: 'Apr 25, 2026', reward: '₹200.00', status: 'Network Growth' },
                          { name: 'Mike Johnson', type: 'Customer', date: 'Apr 20, 2026', reward: '₹85.50', status: 'Commission' },
                        ].map((ref, i) => (
                          <tr key={i} className="hover:bg-gray-50/50 dark:hover:bg-secondary-dark/20 transition-colors">
                            <td className="p-5">
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-surface-dark flex items-center justify-center font-bold text-xs dark:text-white border dark:border-border-dark">
                                  {ref.name[0]}
                                </div>
                                <span className="text-sm font-bold dark:text-white tracking-tight">{ref.name}</span>
                              </div>
                            </td>
                            <td className="p-5 text-center">
                              <span className="text-[10px] font-black text-text-secondary-light uppercase tracking-widest bg-gray-100 dark:bg-secondary-dark/50 px-2.5 py-1 rounded-md">{ref.type}</span>
                            </td>
                            <td className="p-5 text-center">
                              <span className="text-xs text-text-secondary-light font-medium">{ref.date}</span>
                            </td>
                            <td className="p-5 text-right">
                              <div className="flex flex-col items-end">
                                <span className="text-sm font-black text-emerald-500 tracking-tight">+{ref.reward}</span>
                                <span className="text-[8px] font-black uppercase text-text-secondary-light tracking-tighter opacity-60">{ref.status}</span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
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
                onClick={() => setShowShopModal(true)} 
                className="btn-primary px-6 py-3 rounded-xl flex items-center gap-2 font-bold"
              >
                <PlusSquare size={20} /> Add New Shop
              </button>
            </div>

            <div className="grid grid-cols-1 gap-8">
              {/* Status Tracking UI */}
              <div className="card-premium space-y-6 bg-gray-50 dark:bg-secondary-dark/50">
                <h3 className="text-lg font-bold dark:text-white">Tie-Up Status Tracker</h3>
                <p className="text-xs text-text-secondary-light">Track the approval workflow of your recently added shops.</p>
                
                <div className="space-y-4 mt-6">
                  {shops.slice().reverse().map((shop) => {
                    const isActive = shop.status === 'Active' || shop.status === 'Shop Active';
                    const isVerifiedBySubAdmin = shop.status === 'Verified by Sub Admin';
                    const isPendingReview = shop.status === 'Pending Review' || shop.status === 'Pending';
                    
                    let statusColor = 'bg-warning text-warning';
                    let progressWidth = '0%';
                    let progressBarColor = 'bg-gray-200 dark:bg-gray-700';
                    let statusText = 'Pending Review';

                    if (isActive) {
                      statusColor = 'bg-success/10 text-success border border-success/20';
                      progressWidth = '100%';
                      progressBarColor = 'bg-success';
                      statusText = 'Active & Activated';
                    } else if (isVerifiedBySubAdmin) {
                      statusColor = 'bg-primary-light/20 text-primary-light border border-primary-light/30 shadow-sm';
                      progressWidth = '50%';
                      progressBarColor = 'bg-primary-light';
                      statusText = 'Verified (Sub-Admin)';
                    } else {
                      statusColor = 'bg-warning/10 text-warning border border-warning/20';
                      progressWidth = '0%';
                      progressBarColor = 'bg-warning';
                      statusText = 'Pending Review';
                    }

                    return (
                      <div key={shop.id} className="p-4 bg-white dark:bg-surface-dark rounded-2xl border border-border-light dark:border-border-dark shadow-sm animate-in slide-in-from-right duration-500">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="font-bold dark:text-white">{shop.name}</h4>
                            <p className="text-[10px] text-text-secondary-light">Submitted on {shop.date || 'Today'}</p>
                          </div>
                          <span className={`px-2 py-1 ${statusColor} text-[10px] font-bold rounded-md uppercase tracking-wider`}>
                            {statusText}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-1 w-full justify-between relative before:absolute before:top-1/2 before:-translate-y-1/2 before:w-full before:h-0.5 before:bg-gray-200 dark:before:bg-gray-700">
                          <div className={`absolute top-1/2 -translate-y-1/2 h-0.5 ${progressBarColor} transition-all duration-1000`} style={{ width: progressWidth }}></div>
                          
                          {/* Dot 1: Submitted */}
                          <div className={`w-3.5 h-3.5 rounded-full ring-4 ring-white dark:ring-surface-dark relative z-10 transition-colors duration-500 ${
                            isActive || isVerifiedBySubAdmin || isPendingReview ? 'bg-warning' : 'bg-gray-300 dark:bg-gray-600'
                          }`} title="Submitted"></div>
                          
                          {/* Dot 2: Sub Admin Review */}
                          <div className={`w-3.5 h-3.5 rounded-full ring-4 ring-white dark:ring-surface-dark relative z-10 transition-colors duration-500 ${
                            isActive || isVerifiedBySubAdmin ? 'bg-primary-light' : 'bg-gray-300 dark:bg-gray-600'
                          }`} title="Sub Admin Review"></div>
                          
                          {/* Dot 3: Admin Approval */}
                          <div className={`w-3.5 h-3.5 rounded-full ring-4 ring-white dark:ring-surface-dark relative z-10 transition-colors duration-500 ${
                            isActive ? 'bg-success' : 'bg-gray-300 dark:bg-gray-600'
                          }`} title="Admin Approval"></div>
                        </div>

                        <div className="flex justify-between mt-2 px-1">
                          <span className={`text-[8px] font-black uppercase tracking-widest ${isActive || isVerifiedBySubAdmin || isPendingReview ? 'text-warning' : 'text-text-secondary-light'}`}>Submitted</span>
                          <span className={`text-[8px] font-black uppercase tracking-widest ${isActive || isVerifiedBySubAdmin ? 'text-primary-light' : 'text-text-secondary-light'}`}>Sub Admin Verified</span>
                          <span className={`text-[8px] font-black uppercase tracking-widest ${isActive ? 'text-success' : 'text-text-secondary-light'}`}>Admin Approved</span>
                        </div>
                      </div>
                    );
                  })}
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
                <button onClick={() => setShowShopModal(true)} className="btn-primary px-4 py-2 text-sm flex items-center gap-2"><PlusSquare size={18} /> Add Shop</button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {shops.map((shop, i) => (
                <div key={i} className="card-premium space-y-4 hover:border-primary-light/50 transition-colors cursor-pointer group">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-orange-500/10 text-orange-500 rounded-xl flex items-center justify-center font-bold text-xl">
                        {shop.name[0]}
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            addNotification({ title: 'Edit Shop', message: `Opening editor for ${shop.name}`, type: 'info' });
                          }}
                          className="p-1.5 hover:bg-primary-light/10 text-text-secondary-light hover:text-primary-light rounded-lg transition-all"
                        >
                          <Edit size={14} />
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteShop(shop.id);
                          }}
                          className="p-1.5 hover:bg-error/10 text-text-secondary-light hover:text-error rounded-lg transition-all"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                      shop.status === 'Active' ? 'bg-success/10 text-success border-success/20' : 
                      shop.status === 'Verified by Sub Admin' ? 'bg-primary-light/10 text-primary-light border-primary-light/20' : 
                      shop.status === 'Pending Review' || shop.status === 'Pending' ? 'bg-warning/10 text-warning border-warning/20' : 
                      'bg-error/10 text-error border-error/20'
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
        const pendingCount = tasks.filter(t => !t.done).length;
        return (
          <div className="p-8 max-w-4xl animate-in slide-in-from-bottom-4 duration-500">
            <div className="card-premium space-y-8">
              <div className="border-b dark:border-border-dark pb-6 flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-bold dark:text-white">Daily Tasks</h3>
                  <p className="text-text-secondary-light font-bold">
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: '2-digit' })} — {pendingCount} pending tasks
                  </p>
                </div>
                <div className="w-12 h-12 bg-primary-light/10 text-primary-light rounded-xl flex items-center justify-center">
                  <CheckSquare size={24} />
                </div>
              </div>

              <div className="space-y-4">
                {tasks.map((task, i) => (
                  <div key={task.id} className={`flex items-start gap-4 p-4 rounded-2xl border transition-all ${
                    task.done ? 'bg-gray-50/50 dark:bg-secondary-dark/20 border-border-light dark:border-border-dark' : 'bg-white dark:bg-secondary-dark border-border-light dark:border-border-dark hover:border-primary-light'
                  }`}>
                    <button 
                      onClick={() => {
                        setTasks(tasks.map(t => t.id === task.id ? {...t, done: !t.done} : t));
                        addNotification({ 
                          title: task.done ? 'Task Reopened' : 'Task Completed', 
                          message: task.title, 
                          type: task.done ? 'info' : 'success' 
                        });
                      }}
                      className={`mt-1 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${
                        task.done ? 'bg-success border-success text-white' : 'border-border-light dark:border-border-dark'
                      }`}
                    >
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
                        <button 
                          onClick={() => {
                            const newTitle = window.prompt('Update Task Title:', task.title);
                            if (newTitle) {
                              setTasks(tasks.map(t => t.id === task.id ? {...t, title: newTitle} : t));
                              addNotification({ title: 'Task Updated', message: 'The task title has been changed.', type: 'info' });
                            }
                          }}
                          className="text-[10px] font-bold text-primary-light hover:underline"
                        >
                          Edit Task
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => {
                  const title = window.prompt('Enter New Task:');
                  if (title) {
                    const newTask = {
                      id: Date.now(),
                      title,
                      desc: 'Custom task added by agent.',
                      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                      priority: 'Medium',
                      done: false
                    };
                    setTasks([...tasks, newTask]);
                    addNotification({ title: 'Task Added', message: 'New custom task has been created.', type: 'success' });
                  }
                }}
                className="w-full py-4 border-2 border-dashed border-border-light dark:border-border-dark rounded-2xl text-text-secondary-light font-bold text-sm hover:border-primary-light hover:text-primary-light transition-all flex items-center justify-center gap-2 group"
              >
                <PlusSquare size={18} className="group-hover:scale-110 transition-transform" /> Add Custom Task
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
              <div 
                onClick={() => setShowCommissionModal(true)}
                className="p-3 bg-purple-500/10 text-purple-500 rounded-xl cursor-pointer hover:bg-purple-500/20 transition-all active:scale-95 shadow-sm"
              >
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
                  <button 
                    onClick={() => setShowCommissionModal(true)}
                    className="w-full btn-primary mt-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:shadow-lg shadow-primary-light/20 transition-all active:scale-[0.98]"
                  >
                    View Rewards
                  </button>
                </div>
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
                  <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
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
                  <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
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
              <button 
                onClick={() => {
                  const csvContent = "data:text/csv;charset=utf-8," 
                    + "Source,Type,Date,Order Value,Rate,Earning\n"
                    + "Fresh Mart,Shop Sale,May 02 2026,₹1250,5%,₹62.50\n"
                    + "Anjali G.,Membership,May 02 2026,₹9999,10%,₹999.90\n"
                    + "Electro World,Shop Sale,May 01 2026,₹45000,5%,₹2250.00\n"
                    + "Gourmet Kitchen,Shop Sale,Apr 30 2026,₹2800,5%,₹140.00\n"
                    + "System,Referral Bonus,Apr 28 2026,N/A,Flat,₹500.00";
                  const encodedUri = encodeURI(csvContent);
                  const link = document.createElement("a");
                  link.setAttribute("href", encodedUri);
                  link.setAttribute("download", "Commission_Statement.csv");
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  addNotification({ title: 'Statement Downloaded', message: 'Your commission statement is ready.', type: 'success' });
                }}
                className="btn-outline px-4 py-2 text-sm flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-secondary-dark transition-all active:scale-95 shadow-sm"
              >
                <Download size={18} /> Download Statement
              </button>
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
                      <input 
                        type="number" 
                        placeholder="0.00" 
                        className="w-full pl-8 pr-4 py-3 bg-gray-50 dark:bg-secondary-dark border border-border-light dark:border-border-dark rounded-xl outline-none focus:ring-2 focus:ring-primary-light dark:text-white font-bold" 
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                      />
                    </div>
                    <div className="flex gap-2 pt-2">
                      {[5000, 10000, 'Max'].map((v, i) => (
                        <button 
                          key={i} 
                          onClick={() => setWithdrawAmount(v === 'Max' ? '12450' : v.toString())}
                          className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all ${
                            withdrawAmount === (v === 'Max' ? '12450' : v.toString()) 
                              ? 'bg-primary-light text-white' 
                              : 'bg-gray-100 dark:bg-secondary-dark text-text-secondary-light hover:bg-gray-200'
                          }`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) {
                        return window.alert('Please enter a valid amount.');
                      }
                      if (parseFloat(withdrawAmount) > 12450) {
                        return window.alert('Insufficient balance.');
                      }
                      setIsProcessing(true);
                      const amount = withdrawAmount; // Capture it before reset
                      setTimeout(() => {
                        setIsProcessing(false);
                        setWithdrawAmount('');
                        addNotification({ 
                          title: 'Withdrawal Successful', 
                          message: `₹${amount} has been initiated to your HDFC bank account.`, 
                          type: 'success' 
                        });
                        
                        // Notify Admin & Sub-Admin
                        pushGlobalNotification({
                          title: 'New Payout Request',
                          message: `Agent ${user?.name || 'AgentHub'} has requested a withdrawal of ₹${amount}.`,
                          type: 'warning'
                        });
                      }, 2000);
                    }}
                    disabled={isProcessing}
                    className={`w-full btn-primary py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${isProcessing ? 'opacity-70 cursor-wait' : 'active:scale-95'}`}
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Processing...
                      </>
                    ) : 'Confirm Withdrawal'}
                  </button>
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
                  <button 
                    onClick={() => {
                      const csvContent = "data:text/csv;charset=utf-8," 
                        + "Date,Amount,Status\n"
                        + "Apr 25 2026,₹15000,Completed\n"
                        + "Apr 12 2026,₹8400,Completed\n"
                        + "Mar 30 2026,₹22000,Completed";
                      const encodedUri = encodeURI(csvContent);
                      const link = document.createElement("a");
                      link.setAttribute("href", encodedUri);
                      link.setAttribute("download", "Payout_History.csv");
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                      addNotification({ title: 'Report Generated', message: 'Payout history has been downloaded.', type: 'info' });
                    }}
                    className="w-full btn-outline py-2 text-sm hover:bg-gray-50 dark:hover:bg-secondary-dark transition-all"
                  >
                    Download History
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'Analytics':
        const timeframeData = {
          'Monthly View': [
            { name: 'Week 1', sales: 4000, commission: 2400 },
            { name: 'Week 2', sales: 3000, commission: 1398 },
            { name: 'Week 3', sales: 2000, commission: 9800 },
            { name: 'Week 4', sales: 2780, commission: 3908 },
          ],
          'Quarterly View': [
            { name: 'Jan', sales: 12000, commission: 7200 },
            { name: 'Feb', sales: 15000, commission: 9000 },
            { name: 'Mar', sales: 18000, commission: 10800 },
          ],
          'Yearly View': [
            { name: '2023', sales: 150000, commission: 90000 },
            { name: '2024', sales: 210000, commission: 126000 },
            { name: '2025', sales: 280000, commission: 168000 },
            { name: '2026', sales: 350000, commission: 210000 },
          ]
        };
        const currentData = timeframeData[analyticsTimeframe] || timeframeData['Monthly View'];

        return (
          <div className="p-8 space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold dark:text-white">Deep Analytics</h3>
                <p className="text-sm text-text-secondary-light">Performance metrics across your territory.</p>
              </div>
              <select 
                value={analyticsTimeframe}
                onChange={(e) => {
                  setAnalyticsTimeframe(e.target.value);
                  addNotification({ title: 'View Updated', message: `Showing ${e.target.value} data.`, type: 'info' });
                }}
                className="bg-gray-100 dark:bg-secondary-dark border-none rounded-lg text-sm dark:text-white px-4 py-2 outline-none cursor-pointer hover:bg-gray-200 dark:hover:bg-secondary-dark/80 transition-all font-bold"
              >
                <option>Monthly View</option>
                <option>Quarterly View</option>
                <option>Yearly View</option>
              </select>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2 card-premium space-y-6">
                <h4 className="font-bold dark:text-white">Network Growth vs Sales ({analyticsTimeframe})</h4>
                <div className="h-[350px] w-full">
                  <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                    <LineChart data={currentData}>
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
                  <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
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

      case 'Onboard New Member':
        return (
          <div className="p-8 max-w-4xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
            <div className="card-premium space-y-8">
              <div className="flex items-center gap-4 border-b dark:border-border-dark pb-6">
                <div className="w-12 h-12 bg-primary-light/10 text-primary-light rounded-2xl flex items-center justify-center">
                  <UserPlus size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-black dark:text-white">New Member Onboarding</h3>
                  <p className="text-sm text-text-secondary-light font-bold">Fill in the details to register a new agent to your downline.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-text-secondary-light ml-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary-light" size={18} />
                    <input 
                      type="text" 
                      placeholder="Enter full name" 
                      className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-bold transition-all"
                      value={onboardForm.name}
                      onChange={(e) => setOnboardForm({...onboardForm, name: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-text-secondary-light ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary-light" size={18} />
                    <input 
                      type="email" 
                      placeholder="email@example.com" 
                      className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-bold transition-all"
                      value={onboardForm.email}
                      onChange={(e) => setOnboardForm({...onboardForm, email: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-text-secondary-light ml-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary-light" size={18} />
                    <input 
                      type="text" 
                      placeholder="+91 XXXXX XXXXX" 
                      className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-bold transition-all"
                      value={onboardForm.phone}
                      onChange={(e) => setOnboardForm({...onboardForm, phone: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-text-secondary-light ml-1">Agent Role</label>
                  <select 
                    className="w-full px-4 py-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-bold appearance-none transition-all cursor-pointer"
                    value={onboardForm.role}
                    onChange={(e) => setOnboardForm({...onboardForm, role: e.target.value})}
                  >
                    <option>Agent</option>
                    <option>Premium Agent</option>
                    <option>Territory Head</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-text-secondary-light ml-1">Primary Location / Territory</label>
                <div className="relative">
                  <Map className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary-light" size={18} />
                  <input 
                    type="text" 
                    placeholder="Enter city or district" 
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-bold transition-all"
                    value={onboardForm.location}
                    onChange={(e) => setOnboardForm({...onboardForm, location: e.target.value})}
                  />
                </div>
              </div>

              <div className="p-6 bg-primary-light/5 border-2 border-dashed border-primary-light/20 rounded-[32px] space-y-4">
                <p className="text-[10px] text-text-secondary-light font-black mb-2 uppercase tracking-widest">Initial Documentation</p>
                <div className="flex gap-6">
                  <button className="flex-1 py-4 bg-white dark:bg-secondary-dark border border-border-light dark:border-border-dark rounded-2xl text-sm font-bold dark:text-white hover:border-primary-light hover:shadow-lg transition-all flex items-center justify-center gap-3">
                    <FileText size={20} className="text-primary-light" /> ID Proof (Aadhar/Voter)
                  </button>
                  <button className="flex-1 py-4 bg-white dark:bg-secondary-dark border border-border-light dark:border-border-dark rounded-2xl text-sm font-bold dark:text-white hover:border-primary-light hover:shadow-lg transition-all flex items-center justify-center gap-3">
                    <FileText size={20} className="text-primary-light" /> Address Proof
                  </button>
                </div>
              </div>

              <div className="flex gap-6 pt-6 border-t dark:border-border-dark">
                <button 
                  onClick={() => setActiveTab('My Members')}
                  className="flex-1 py-5 border-2 border-border-light dark:border-border-dark rounded-[24px] font-black text-sm dark:text-white hover:bg-gray-50 transition-all"
                >
                  Discard & Exit
                </button>
                <button 
                  onClick={() => {
                    const newId = members.length + 1;
                    setMembers([...members, { ...onboardForm, id: newId, status: 'Pending', joined: new Date().toISOString().split('T')[0] }]);
                    setActiveTab('My Members');
                    addNotification({ title: 'Onboarding Successful', message: `${onboardForm.name} has been added to your downline.`, type: 'success' });
                  }}
                  className="flex-1 py-5 bg-primary-light text-white rounded-[24px] font-black text-sm shadow-xl shadow-primary-light/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Confirm & Onboard Member
                </button>
              </div>
            </div>
          </div>
        );


      case 'Territory Management':
        return (
          <div className="p-8 space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold dark:text-white">Territory Management</h3>
                <p className="text-sm text-text-secondary-light">Monitor and expand your assigned geographic regions.</p>
              </div>
              <button 
                onClick={() => setShowMap(true)}
                className="px-6 py-3 bg-white dark:bg-secondary-dark border-2 border-emerald-500 rounded-2xl text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-2 hover:bg-emerald-50 transition-all shadow-lg shadow-emerald-500/10"
              >
                <Globe size={20} /> View Global Map
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 card-premium space-y-6">
                <h4 className="font-bold dark:text-white">Active Regions</h4>
                <div className="space-y-4">
                  {[
                    { region: 'South Mumbai', status: 'Primary', agents: 24, growth: '+12%' },
                    { region: 'Pune Central', status: 'Secondary', agents: 18, growth: '+8%' },
                    { region: 'Nashik District', status: 'Expanding', agents: 12, growth: '+15%' },
                  ].map((region, i) => (
                    <div key={i} className="p-4 bg-gray-50 dark:bg-secondary-dark rounded-2xl border border-border-light dark:border-border-dark flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-primary-light/10 text-primary-light rounded-xl flex items-center justify-center font-bold">
                          <Map size={20} />
                        </div>
                        <div>
                          <p className="text-sm font-bold dark:text-white">{region.region}</p>
                          <p className="text-[10px] text-text-secondary-light font-bold uppercase">{region.status}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold dark:text-white">{region.agents} Agents</p>
                        <p className="text-xs text-success font-bold">{region.growth}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card-premium space-y-6">
                <h4 className="font-bold dark:text-white">Expansion Requests</h4>
                <div className="p-6 bg-primary-light/5 border-2 border-dashed border-primary-light/20 rounded-[32px] text-center space-y-4">
                  <div className="w-16 h-16 bg-white dark:bg-surface-dark rounded-2xl flex items-center justify-center mx-auto text-primary-light shadow-lg">
                    <PlusSquare size={32} />
                  </div>
                  <p className="text-sm dark:text-white font-bold">Request New Territory</p>
                  <p className="text-xs text-text-secondary-light">Apply for exclusive rights in adjacent pincodes or districts.</p>
                  <button 
                    onClick={() => setShowExpansionModal(true)}
                    className="w-full btn-primary py-3 rounded-xl transition-transform active:scale-95"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </div>

            {/* Expansion Application Modal */}
            {showExpansionModal && (
              <div className="fixed inset-0 z-[300] flex items-center justify-center p-6">
                <div className="absolute inset-0 bg-background-dark/60 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setShowExpansionModal(false)}></div>
                <div className="relative w-full max-w-lg bg-white dark:bg-surface-dark rounded-[32px] shadow-2xl border border-border-light dark:border-border-dark overflow-hidden animate-in zoom-in-95 duration-300">
                  <div className="p-8 space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary-light/10 text-primary-light rounded-xl flex items-center justify-center">
                           <GitBranch size={20} />
                        </div>
                        <h3 className="text-xl font-black dark:text-white">New Territory Request</h3>
                      </div>
                      <button onClick={() => setShowExpansionModal(false)} className="text-text-secondary-light hover:text-error transition-colors"><X size={20}/></button>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-text-secondary-light ml-1">Target Pincode / Area</label>
                        <input type="text" placeholder="e.g. 400001 or Bandra West" className="w-full px-4 py-3.5 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-bold transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-text-secondary-light ml-1">Expansion Type</label>
                        <select className="w-full px-4 py-3.5 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-bold appearance-none cursor-pointer">
                          <option>Exclusive Pincode</option>
                          <option>Sub-District Expansion</option>
                          <option>Full District Rights</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-text-secondary-light ml-1">Business Case / Reason</label>
                        <textarea placeholder="Briefly describe why you want to expand here..." className="w-full px-4 py-3.5 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-bold h-24 resize-none transition-all"></textarea>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button onClick={() => setShowExpansionModal(false)} className="flex-1 py-4 font-black uppercase text-[11px] tracking-widest text-text-secondary-light hover:bg-gray-50 dark:hover:bg-secondary-dark rounded-2xl transition-all">Cancel</button>
                      <button 
                        onClick={() => {
                          setIsProcessing(true);
                          setTimeout(() => {
                            setIsProcessing(false);
                            setShowExpansionModal(false);
                            addNotification({ title: 'Application Sent', message: 'Your expansion request is under review by the Admin.', type: 'success' });
                          }, 1500);
                        }}
                        className="flex-2 btn-primary px-10 py-4 rounded-2xl font-black uppercase text-[11px] tracking-widest flex items-center justify-center gap-2"
                      >
                        {isProcessing ? 'Sending...' : 'Submit Application'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Global Map Overlay */}
            {showMap && (
              <div className="fixed inset-0 z-[200] flex items-center justify-center p-8">
                <div className="absolute inset-0 bg-background-dark/90 backdrop-blur-xl animate-in fade-in duration-500" onClick={() => setShowMap(false)}></div>
                <div className="relative w-full max-w-6xl h-full max-h-[80vh] bg-surface-light dark:bg-surface-dark rounded-[40px] shadow-2xl border border-white/10 overflow-hidden flex flex-col animate-in zoom-in-95 duration-500">
                  <div className="p-6 border-b dark:border-border-dark flex justify-between items-center bg-emerald-500 text-white">
                    <div className="flex items-center gap-3">
                      <Globe size={24} />
                      <h3 className="text-xl font-black">Global Territory Network</h3>
                    </div>
                    <button onClick={() => setShowMap(false)} className="p-2 hover:bg-white/20 rounded-xl transition-all"><X size={24}/></button>
                  </div>
                  
                  <div className="flex-1 relative bg-[#0B0F1A] p-8 overflow-hidden">
                    {/* Dynamic Background Effects */}
                    <div className="absolute inset-0 opacity-20" style={{ 
                      backgroundImage: 'radial-gradient(circle at 2px 2px, #3B82F6 1px, transparent 0)', 
                      backgroundSize: '24px 24px' 
                    }}></div>
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary-light/5 via-transparent to-emerald-500/5"></div>
                    
                    <div className="relative w-full h-full border border-white/10 rounded-[40px] flex items-center justify-center overflow-hidden bg-[#0F172A]/40 backdrop-blur-sm shadow-inner">
                       {/* Premium Stylized World Map SVG */}
                       <svg viewBox="0 0 1000 500" className="w-full h-full opacity-30 select-none pointer-events-none">
                          <defs>
                            <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2" />
                              <stop offset="100%" stopColor="#10B981" stopOpacity="0.2" />
                            </linearGradient>
                            <filter id="glow">
                              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                              <feMerge>
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                              </feMerge>
                            </filter>
                          </defs>
                          
                          {/* Stylized Continent Shapes (Simplified for performance and aesthetics) */}
                          <path d="M150,120 Q180,100 220,130 T280,110 T320,150 T280,220 T220,250 T150,200 Z" fill="url(#mapGradient)" />
                          <path d="M450,180 Q500,150 550,180 T620,220 T580,350 T500,380 T420,320 Z" fill="url(#mapGradient)" />
                          <path d="M750,100 Q800,80 850,120 T900,200 T850,300 T750,250 Z" fill="url(#mapGradient)" />
                          <path d="M700,350 Q750,320 800,350 T850,420 T780,480 T700,420 Z" fill="url(#mapGradient)" />
                          
                          {/* Animated Connection Arcs */}
                          <path d="M210,160 Q400,50 510,240" fill="none" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="5,5" className="animate-[dash_20s_linear_infinite]" />
                          <path d="M510,240 Q700,100 810,130" fill="none" stroke="#10B981" strokeWidth="1.5" strokeDasharray="5,5" className="animate-[dash_25s_linear_infinite]" />
                          <path d="M510,240 Q650,400 760,390" fill="none" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="5,5" className="animate-[dash_15s_linear_infinite]" />
                       </svg>

                       <style dangerouslySetInnerHTML={{ __html: `
                          @keyframes dash {
                            to { stroke-dashoffset: -100; }
                          }
                       `}} />

                       {/* Map Markers with Enhanced Styling */}
                       {[
                         { x: '21%', y: '32%', label: 'North Zone', active: true, agents: 45, shops: 120, color: 'bg-blue-500' },
                         { x: '51%', y: '48%', label: 'Central Hub', active: true, agents: 89, shops: 340, color: 'bg-emerald-500' },
                         { x: '81%', y: '26%', label: 'East Region', active: false, agents: 12, shops: 45, color: 'bg-gray-400' },
                         { x: '76%', y: '78%', label: 'South Zone', active: true, agents: 34, shops: 110, color: 'bg-orange-500' },
                       ].map((marker, i) => (
                         <div 
                           key={i} 
                           onClick={() => {
                             setSelectedMarker(marker);
                             addNotification({ title: 'Region Selected', message: `Showing live data for ${marker.label}`, type: 'success' });
                           }}
                           className="absolute flex flex-col items-center group cursor-pointer transition-all hover:scale-110 z-10" 
                           style={{ left: marker.x, top: marker.y }}
                         >
                            {/* Ripple Effect for Active Markers */}
                            {marker.active && (
                              <div className="absolute inset-0 -m-4">
                                <div className={`absolute inset-0 rounded-full ${marker.color} opacity-20 animate-ping`}></div>
                                <div className={`absolute inset-0 rounded-full ${marker.color} opacity-10 animate-pulse delay-700`}></div>
                              </div>
                            )}
                            
                            <div className={`w-6 h-6 rounded-full border-4 border-white dark:border-[#1E293B] shadow-2xl relative z-10 transition-all ${
                              selectedMarker?.label === marker.label ? 'scale-125 ring-4 ring-primary-light/30' : ''
                            } ${marker.color}`}></div>
                            
                            <div className={`mt-3 px-4 py-1.5 bg-[#1E293B]/90 backdrop-blur-md rounded-xl border border-white/10 shadow-2xl transition-all duration-300 ${
                              selectedMarker?.label === marker.label ? 'opacity-100 translate-y-0' : 'opacity-0 group-hover:opacity-100 translate-y-1'
                            }`}>
                               <span className="text-[11px] font-black text-white whitespace-nowrap tracking-wider uppercase">{marker.label}</span>
                            </div>
                         </div>
                       ))}

                       {/* Interactive Data Panel (Glassmorphism) */}
                       <div className="absolute bottom-10 left-10 p-8 bg-[#1E293B]/60 backdrop-blur-2xl rounded-[32px] border border-white/10 max-w-sm w-full space-y-6 shadow-2xl animate-in slide-in-from-left-8 duration-700">
                          <div className="flex items-center justify-between border-b border-white/10 pb-4">
                             <div className="flex items-center gap-3">
                               <div className={`w-3 h-3 rounded-full ${selectedMarker ? selectedMarker.color : 'bg-primary-light'} animate-pulse`}></div>
                               <h4 className="text-white font-black text-base tracking-tight uppercase">{selectedMarker ? selectedMarker.label : 'Global Insights'}</h4>
                             </div>
                             {selectedMarker && (
                               <button 
                                 onClick={(e) => { e.stopPropagation(); setSelectedMarker(null); }} 
                                 className="text-[10px] text-primary-light font-black uppercase hover:text-white transition-colors"
                               >
                                 Reset View
                               </button>
                             )}
                          </div>
                          
                          <div className="grid grid-cols-2 gap-8">
                             <div className="space-y-1">
                                <p className="text-[10px] text-white/40 uppercase font-black tracking-[0.1em]">{selectedMarker ? 'Network Force' : 'Market Reach'}</p>
                                <p className="text-2xl font-black text-white tracking-tighter">
                                  {selectedMarker ? `${selectedMarker.agents} Agents` : '12 States'}
                                </p>
                             </div>
                             <div className="space-y-1">
                                <p className="text-[10px] text-white/40 uppercase font-black tracking-[0.1em]">{selectedMarker ? 'Business Hubs' : 'Avg Penetration'}</p>
                                <p className={`text-2xl font-black tracking-tighter ${selectedMarker ? 'text-emerald-400' : 'text-primary-light'}`}>
                                  {selectedMarker ? `${selectedMarker.shops} Shops` : '85.4%'}
                                </p>
                             </div>
                          </div>
                          
                          {!selectedMarker && (
                            <div className="pt-4 border-t border-white/5">
                               <p className="text-[10px] text-white/30 font-bold leading-relaxed">
                                 Select any active node on the map to visualize detailed territory metrics and agent distribution.
                               </p>
                            </div>
                          )}
                       </div>

                       {/* Legend */}
                       <div className="absolute top-10 right-10 p-4 bg-[#1E293B]/40 backdrop-blur-md rounded-2xl border border-white/5 space-y-3">
                          <div className="flex items-center gap-3">
                             <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                             <span className="text-[10px] font-black text-white/60 uppercase">Operational</span>
                          </div>
                          <div className={`flex items-center gap-3`}>
                             <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                             <span className="text-[10px] font-black text-white/60 uppercase">In-Pipeline</span>
                          </div>
                          <div className="flex items-center gap-3">
                             <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                             <span className="text-[10px] font-black text-white/60 uppercase">Restricted</span>
                          </div>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );





      case 'Notifications':
        return (
          <div className="p-8 max-w-5xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-2xl font-black dark:text-white">Notification Center</h3>
                <p className="text-text-secondary-light font-bold">Stay updated with system alerts and network activity.</p>
              </div>
              <button className="text-sm font-bold text-primary-light hover:underline">Mark all as read</button>
            </div>

            <div className="space-y-4">
              {[
                { title: 'New Commission Earned', desc: 'You received ₹2,450 from Metro Supermarket sales.', time: '2 hours ago', type: 'success', icon: <Wallet size={20}/> },
                { title: 'Shop Approval Update', desc: 'Fresh Mart Grocery has been approved by the Admin.', time: '5 hours ago', type: 'info', icon: <CheckCircle size={20}/> },
                { title: 'Security Alert', desc: 'New login detected from a Chrome browser on Windows.', time: '1 day ago', type: 'warning', icon: <ShieldCheck size={20}/> },
                { title: 'System Maintenance', desc: 'AgentHub will be down for scheduled maintenance on Sunday.', time: '2 days ago', type: 'error', icon: <AlertCircle size={20}/> },
                { title: 'Incentive Program', desc: 'Complete 10 shop tie-ups this month to earn a bonus.', time: '3 days ago', type: 'success', icon: <Award size={20}/> }
              ].map((notif, i) => (
                <div key={i} className="card-premium flex gap-6 items-start hover:scale-[1.01] transition-transform cursor-pointer">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                    notif.type === 'success' ? 'bg-emerald-500/10 text-emerald-500' :
                    notif.type === 'warning' ? 'bg-orange-500/10 text-orange-500' :
                    notif.type === 'error' ? 'bg-red-500/10 text-red-500' : 'bg-blue-500/10 text-blue-500'
                  }`}>
                    {notif.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold dark:text-white">{notif.title}</h4>
                      <span className="text-[10px] font-black text-text-secondary-light uppercase">{notif.time}</span>
                    </div>
                    <p className="text-sm text-text-secondary-light mt-1">{notif.desc}</p>
                  </div>
                  <div className="relative">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveDropdown(activeDropdown === `notif-${i}` ? null : `notif-${i}`);
                      }}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-secondary-dark rounded-xl transition-all"
                    >
                      <MoreVertical size={18} className="text-text-secondary-light"/>
                    </button>
                    {activeDropdown === `notif-${i}` && (
                      <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-surface-dark shadow-2xl rounded-2xl z-50 border border-border-light dark:border-border-dark py-2 animate-in fade-in zoom-in-95 duration-200">
                         <button onClick={() => setActiveDropdown(null)} className="w-full text-left px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-secondary-dark text-xs font-bold dark:text-white flex items-center gap-3">
                           <CheckCircle size={14} className="text-emerald-500" /> Mark as Read
                         </button>
                         <button onClick={() => setActiveDropdown(null)} className="w-full text-left px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-secondary-dark text-xs font-bold dark:text-white flex items-center gap-3">
                           <Bell size={14} className="text-blue-500" /> Mute Alerts
                         </button>
                         <div className="my-1 border-t dark:border-border-dark"></div>
                         <button onClick={() => setActiveDropdown(null)} className="w-full text-left px-4 py-2.5 hover:bg-red-50 dark:hover:bg-red-500/10 text-xs font-bold text-red-500 flex items-center gap-3">
                           <Trash2 size={14} /> Delete
                         </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'Support / Tickets':
        return (
          <div className="p-8 max-w-6xl mx-auto animate-in slide-in-from-bottom-4 duration-500 space-y-8">
            <div className="flex justify-between items-end">
              <div>
                <h3 className="text-2xl font-black dark:text-white">Support Center</h3>
                <p className="text-text-secondary-light font-bold">Need help? Raise a ticket or browse our FAQ.</p>
              </div>
              <button 
                onClick={() => setShowTicketModal(true)}
                className="btn-primary px-6 py-3 rounded-2xl flex items-center gap-2 shadow-xl shadow-primary-light/20 active:scale-95 transition-all"
              >
                <PlusSquare size={20}/> New Support Ticket
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Active Tickets', value: '2', color: 'text-primary-light', bg: 'bg-primary-light/10' },
                { label: 'Resolved', value: '14', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
                { label: 'Avg Response Time', value: '4h 20m', color: 'text-blue-500', bg: 'bg-blue-500/10' }
              ].map((stat, i) => (
                <div key={i} className="card-premium p-8 text-center space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light">{stat.label}</p>
                  <p className={`text-3xl font-black ${stat.color}`}>{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="card-premium overflow-hidden border-none shadow-2xl">
              <div className="p-6 border-b dark:border-border-dark flex justify-between items-center bg-gray-50/50 dark:bg-secondary-dark/30">
                <h4 className="font-black dark:text-white uppercase tracking-tighter">Recent Tickets</h4>
                <div className="flex gap-2">
                  <button 
                    onClick={() => {
                      const query = window.prompt("Search Tickets by Subject or ID:");
                      if (query) addNotification({ title: 'Search Results', message: `Found 2 tickets matching "${query}"`, type: 'info' });
                    }}
                    className="p-2 hover:bg-white dark:hover:bg-secondary-dark rounded-xl transition-all border border-transparent hover:border-border-light shadow-sm"
                  >
                    <Search size={18}/>
                  </button>
                  <button 
                    onClick={() => addNotification({ title: 'Filter Applied', message: 'Showing active tickets only.', type: 'info' })}
                    className="p-2 hover:bg-white dark:hover:bg-secondary-dark rounded-xl transition-all border border-transparent hover:border-border-light shadow-sm"
                  >
                    <Filter size={18}/>
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-secondary-dark/50 text-left">
                      <th className="px-6 py-4 text-[10px] font-black text-text-secondary-light uppercase">Ticket ID</th>
                      <th className="px-6 py-4 text-[10px] font-black text-text-secondary-light uppercase">Subject</th>
                      <th className="px-6 py-4 text-[10px] font-black text-text-secondary-light uppercase">Status</th>
                      <th className="px-6 py-4 text-[10px] font-black text-text-secondary-light uppercase">Priority</th>
                      <th className="px-6 py-4 text-[10px] font-black text-text-secondary-light uppercase">Last Activity</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y dark:divide-border-dark">
                    {supportTickets.map((ticket, i) => (
                      <tr key={i} className="hover:bg-gray-50 dark:hover:bg-secondary-dark/30 transition-colors cursor-pointer group">
                        <td className="px-6 py-4 text-sm font-black dark:text-white">{ticket.id}</td>
                        <td className="px-6 py-4 text-sm font-bold dark:text-white group-hover:text-primary-light transition-colors">{ticket.sub}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black ${
                            ticket.status === 'Resolved' ? 'bg-emerald-500/10 text-emerald-500' :
                            ticket.status === 'In Progress' ? 'bg-blue-500/10 text-blue-500' : 'bg-orange-500/10 text-orange-500'
                          }`}>{ticket.status}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-[10px] font-black ${
                            ticket.priority === 'High' ? 'text-red-500' :
                            ticket.priority === 'Medium' ? 'text-orange-500' : 'text-emerald-500'
                          }`}>{ticket.priority}</span>
                        </td>
                        <td className="px-6 py-4 text-xs text-text-secondary-light font-bold flex items-center justify-between">
                          {ticket.activity}
                          <div className="relative">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveDropdown(activeDropdown === `ticket-${i}` ? null : `ticket-${i}`);
                              }}
                              className="p-1.5 hover:bg-white dark:hover:bg-surface-dark rounded-lg transition-all opacity-0 group-hover:opacity-100"
                            >
                              <MoreVertical size={16} />
                            </button>
                            {activeDropdown === `ticket-${i}` && (
                              <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-surface-dark shadow-2xl rounded-2xl z-50 border border-border-light dark:border-border-dark py-2 animate-in fade-in zoom-in-95 duration-200 shadow-emerald-500/5">
                                 <button onClick={() => setActiveDropdown(null)} className="w-full text-left px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-secondary-dark text-xs font-bold dark:text-white flex items-center gap-3">
                                   <MessageSquare size={14} className="text-primary-light" /> View Chat
                                 </button>
                                 <button onClick={() => setActiveDropdown(null)} className="w-full text-left px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-secondary-dark text-xs font-bold dark:text-white flex items-center gap-3">
                                   <ArrowUpRight size={14} className="text-orange-500" /> Escalate Ticket
                                 </button>
                                 <div className="my-1 border-t dark:border-border-dark"></div>
                                 <button onClick={() => setActiveDropdown(null)} className="w-full text-left px-4 py-2.5 hover:bg-red-50 dark:hover:bg-red-500/10 text-xs font-bold text-red-500 flex items-center gap-3">
                                   <X size={14} /> Close Ticket
                                 </button>
                              </div>
                            )}
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

      case 'Settings':
        return (
          <div className="p-8 max-w-4xl mx-auto animate-in slide-in-from-bottom-4 duration-500 space-y-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-primary-light/10 text-primary-light rounded-2xl"><Settings size={32}/></div>
              <div>
                <h3 className="text-2xl font-black dark:text-white">Dashboard Settings</h3>
                <p className="text-text-secondary-light font-bold">Customize your experience and manage security.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {/* Notification Preferences */}
              <div className="card-premium space-y-6">
                <div className="flex items-center gap-3 border-b dark:border-border-dark pb-4">
                  <Bell className="text-primary-light" size={20}/>
                  <h4 className="font-black dark:text-white uppercase tracking-tighter">Notification Preferences</h4>
                </div>
                <div className="space-y-4">
                  {[
                    { key: 'commissionAlerts', label: 'Email Payout Alerts', desc: 'Receive an email when commissions are credited.' },
                    { key: 'smsNotifications', label: 'Shop Status Updates', desc: 'Instant notification when a shop is approved or rejected.' },
                    { key: 'browserPushes', label: 'Network Activity', desc: 'Monthly report of your team performance.' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-secondary-dark rounded-2xl border border-transparent hover:border-border-light dark:hover:border-border-dark transition-all">
                      <div>
                        <p className="text-sm font-bold dark:text-white">{item.label}</p>
                        <p className="text-[10px] text-text-secondary-light font-bold">{item.desc}</p>
                      </div>
                      <div 
                        onClick={() => {
                          const newValue = !settings[item.key];
                          setSettings({...settings, [item.key]: newValue});
                          addNotification({ 
                            title: 'Settings Updated', 
                            message: `${item.label} ${newValue ? 'Enabled' : 'Disabled'}`, 
                            type: 'info' 
                          });
                        }}
                        className={`w-12 h-6 rounded-full relative cursor-pointer transition-all duration-300 shadow-inner ${
                          settings[item.key] ? 'bg-emerald-500 shadow-emerald-500/20' : 'bg-gray-300 dark:bg-gray-700'
                        }`}
                      >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-all duration-300 ${
                          settings[item.key] ? 'right-1' : 'left-1'
                        }`}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Security Settings */}
              <div className="card-premium space-y-6">
                <div className="flex items-center gap-3 border-b dark:border-border-dark pb-4">
                  <ShieldCheck className="text-orange-500" size={20}/>
                  <h4 className="font-black dark:text-white uppercase tracking-tighter">Security & Privacy</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button 
                    onClick={() => {
                      const newPass = window.prompt('Enter new password:');
                      if (newPass) {
                        addNotification({ title: 'Password Changed', message: 'Your login credentials have been updated.', type: 'success' });
                      }
                    }}
                    className="p-6 bg-gray-50 dark:bg-secondary-dark rounded-[32px] border-2 border-transparent hover:border-primary-light transition-all text-left space-y-2 group"
                  >
                    <div className="w-10 h-10 bg-white dark:bg-surface-dark rounded-xl flex items-center justify-center text-text-secondary-light group-hover:text-primary-light shadow-sm transition-colors"><Lock size={20}/></div>
                    <p className="text-sm font-black dark:text-white">Change Password</p>
                    <p className="text-[10px] text-text-secondary-light font-bold">Update your login credentials.</p>
                  </button>
                  <button 
                    onClick={() => {
                      const newState = !settings.twoFactor;
                      setSettings({...settings, twoFactor: newState});
                      addNotification({ 
                        title: 'Security Updated', 
                        message: `Two-Factor Auth ${newState ? 'Enabled' : 'Disabled'}`, 
                        type: newState ? 'success' : 'warning' 
                      });
                    }}
                    className={`p-6 rounded-[32px] border-2 transition-all text-left space-y-2 group ${
                      settings.twoFactor ? 'bg-orange-500/5 border-orange-500/20' : 'bg-gray-50 dark:bg-secondary-dark border-transparent hover:border-primary-light'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm transition-colors ${
                      settings.twoFactor ? 'bg-orange-500 text-white' : 'bg-white dark:bg-surface-dark text-text-secondary-light group-hover:text-primary-light'
                    }`}><ShieldCheck size={20}/></div>
                    <p className="text-sm font-black dark:text-white">Two-Factor Auth</p>
                    <p className="text-[10px] text-text-secondary-light font-bold">
                      {settings.twoFactor ? 'High security enabled.' : 'Add an extra layer of security.'}
                    </p>
                  </button>
                </div>
              </div>

              {/* Data & Account */}
              <div className="card-premium space-y-6">
                <div className="flex items-center gap-3 border-b dark:border-border-dark pb-4">
                  <History className="text-blue-500" size={20}/>
                  <h4 className="font-black dark:text-white uppercase tracking-tighter">Data Management</h4>
                </div>
                <div className="flex items-center justify-between p-6 bg-blue-500/5 rounded-[32px] border-2 border-dashed border-blue-500/20">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-white dark:bg-surface-dark rounded-2xl flex items-center justify-center text-blue-500 shadow-xl shadow-blue-500/5"><Download size={24}/></div>
                    <div>
                      <p className="text-sm font-black dark:text-white">Export My Data</p>
                      <p className="text-[10px] text-text-secondary-light font-bold">Download your shop tie-ups and commission history in CSV.</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      try {
                        const csvContent = "data:text/csv;charset=utf-8," 
                          + "ID,Shop Name,Category,Owner,Status,Date\n"
                          + shops.map(s => `${s.id},"${s.name}","${s.category}","${s.owner}","${s.status}","${s.date}"`).join("\n");
                        const encodedUri = encodeURI(csvContent);
                        const link = document.createElement("a");
                        link.setAttribute("href", encodedUri);
                        link.setAttribute("download", `Agent_Data_Export_${new Date().toLocaleDateString()}.csv`);
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        addNotification({ title: 'Export Successful', message: 'Your data has been downloaded.', type: 'success' });
                      } catch (err) {
                        window.alert('Export failed: ' + err.message);
                      }
                    }}
                    className="btn-secondary px-6 py-3 rounded-2xl bg-blue-500 text-white shadow-xl shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all"
                  >
                    Download
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-center pt-8">
              <button 
                onClick={() => {
                  if (window.confirm('Are you sure you want to deactivate your account? This action requires administrator approval.')) {
                    addNotification({ title: 'Request Sent', message: 'Account deactivation request is pending review.', type: 'warning' });
                  }
                }}
                className="flex items-center gap-2 text-red-500 font-black uppercase text-[10px] tracking-widest hover:bg-red-500/5 px-6 py-3 rounded-full transition-all"
              >
                <LogOut size={16}/> Deactivate Account
              </button>
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
            <SidebarLink icon={<User size={18} />} label="My Profile" active={activeTab === 'My Profile'} onClick={() => setActiveTab('My Profile')} />
            <SidebarLink icon={<ShieldCheck size={18} />} label="KYC Status" active={activeTab === 'KYC Status'} onClick={() => setActiveTab('KYC Status')} />
            <SidebarLink icon={<Lock size={18} />} label="Security Deposit" active={activeTab === 'Security Deposit'} onClick={() => setActiveTab('Security Deposit')} />
          </SidebarSection>

          <SidebarSection title="OPERATIONS">
            <SidebarLink icon={<Map size={18} />} label="Territory Management" active={activeTab === 'Territory Management'} onClick={() => setActiveTab('Territory Management')} />
            <SidebarLink icon={<PlusSquare size={18} />} label="Shop Tie-Up" active={activeTab === 'Shop Tie-Up' || activeTab === 'Add New Shop'} onClick={() => setActiveTab('Shop Tie-Up')} />
            <SidebarLink icon={<CheckSquare size={18} />} label="Daily Tasks" active={activeTab === 'Daily Tasks'} onClick={() => setActiveTab('Daily Tasks')} />
          </SidebarSection>

          <SidebarSection title="BUSINESS">
            <SidebarLink icon={<Target size={18} />} label="Sales Targets" active={activeTab === 'Sales Targets'} onClick={() => setActiveTab('Sales Targets')} />

          </SidebarSection>

          <SidebarSection title="EARNINGS">
            <SidebarLink icon={<Wallet size={18} />} label="Wallet / Earnings" active={activeTab === 'Wallet / Earnings'} onClick={() => setActiveTab('Wallet / Earnings')} />
            <SidebarLink icon={<History size={18} />} label="Commission History" active={activeTab === 'Commission History'} onClick={() => setActiveTab('Commission History')} />
          </SidebarSection>

          <SidebarSection title="PERFORMANCE">
            <SidebarLink icon={<TrendingUp size={18} />} label="Analytics" active={activeTab === 'Analytics'} onClick={() => setActiveTab('Analytics')} />
          </SidebarSection>

          <SidebarSection title="COMMUNICATION">
            <SidebarLink icon={<Bell size={18} />} label="Notifications" active={activeTab === 'Notifications'} onClick={() => setActiveTab('Notifications')} />
            <SidebarLink icon={<LifeBuoy size={18} />} label="Support / Tickets" active={activeTab === 'Support / Tickets'} onClick={() => setActiveTab('Support / Tickets')} />
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

            <button 
              onClick={() => setActiveTab('Notifications')}
              className="p-2.5 text-text-secondary-light dark:text-text-secondary-dark relative hover:bg-gray-100 dark:hover:bg-secondary-dark rounded-xl transition-all hover:scale-110"
            >
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
      {/* Edit Profile Modal */}
      {showEditProfile && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-background-dark/80 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setShowEditProfile(false)}></div>
          <div className="relative w-full max-w-lg bg-surface-light dark:bg-surface-dark rounded-[32px] shadow-2xl border border-border-light dark:border-border-dark overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-8 border-b dark:border-border-dark flex justify-between items-center bg-primary-light text-white">
              <h3 className="text-xl font-black">Edit Personal Info</h3>
              <button onClick={() => setShowEditProfile(false)} className="p-2 hover:bg-white/10 rounded-xl transition-all"><X size={24}/></button>
            </div>
            <div className="p-8 space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-text-secondary-light">Full Name</label>
                <input type="text" defaultValue="Demo Agent" className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-bold" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-text-secondary-light">Phone Number</label>
                <input type="text" defaultValue="+91 98765 43210" className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-bold" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-text-secondary-light">Email Address</label>
                <input type="email" defaultValue="demo@agenticstore.com" className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-bold" />
              </div>
              <button 
                onClick={() => {
                  setShowEditProfile(false);
                  addNotification({ title: 'Profile Updated', message: 'Your personal information has been saved.', type: 'success' });
                }}
                className="w-full btn-primary py-4 rounded-2xl mt-4 font-black"
              >
                Save Profile Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Language Modal */}
      {showLanguageModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-background-dark/80 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setShowLanguageModal(false)}></div>
          <div className="relative w-full max-w-xs bg-surface-light dark:bg-surface-dark rounded-[32px] shadow-2xl border border-border-light dark:border-border-dark overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-6 border-b dark:border-border-dark text-center">
              <h3 className="text-lg font-black dark:text-white">Select Language</h3>
            </div>
            <div className="p-4 space-y-2">
              {['English', 'Hindi', 'Marathi', 'Gujarati', 'Tamil'].map((lang) => (
                <div 
                  key={lang}
                  onClick={() => {
                    setSettings({...settings, language: lang});
                    setShowLanguageModal(false);
                    addNotification({ title: 'Language Changed', message: `Interface language set to ${lang}.`, type: 'success' });
                  }}
                  className={`p-4 rounded-xl cursor-pointer flex items-center justify-between transition-all ${
                    settings.language === lang ? 'bg-primary-light/10 text-primary-light font-bold' : 'hover:bg-gray-50 dark:hover:bg-secondary-dark dark:text-white'
                  }`}
                >
                  <span>{lang}</span>
                  {settings.language === lang && <CheckCircle size={16} />}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Role Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-background-dark/80 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setShowUpgradeModal(false)}></div>
          <div className="relative w-full max-w-lg bg-surface-light dark:bg-surface-dark rounded-[32px] shadow-2xl border border-border-light dark:border-border-dark overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-8 border-b dark:border-border-dark flex justify-between items-center bg-error/10 text-error">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-error/20 rounded-2xl flex items-center justify-center"><TrendingUp size={24}/></div>
                <div>
                  <h3 className="text-xl font-black">Request Role Upgrade</h3>
                  <p className="text-xs text-error/80 font-bold">Apply for a higher tier with better commissions.</p>
                </div>
              </div>
              <button onClick={() => setShowUpgradeModal(false)} className="p-3 hover:bg-error/5 rounded-2xl transition-all text-error"><X size={24}/></button>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-secondary-dark rounded-2xl border border-border-light dark:border-border-dark">
                  <p className="text-[10px] text-text-secondary-light font-black uppercase mb-1">Current Role</p>
                  <p className="text-sm font-bold dark:text-white">Pincode Agent</p>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-text-secondary-light ml-1">Target Role</label>
                  <select className="w-full px-4 py-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-bold appearance-none">
                    <option>District Agent (+5% Commission)</option>
                    <option>State Agent (+10% Commission)</option>
                    <option>Premium Corporate Partner</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-text-secondary-light ml-1">Justification / Experience</label>
                  <textarea 
                    placeholder="Briefly describe your performance or reasons for upgrade..." 
                    className="w-full px-4 py-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-primary-light outline-none dark:text-white font-bold h-32 resize-none"
                  ></textarea>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  onClick={() => setShowUpgradeModal(false)}
                  className="flex-1 py-4 border-2 border-border-light dark:border-border-dark rounded-2xl font-black text-sm dark:text-white hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    setShowUpgradeModal(false);
                    addNotification({ title: 'Application Submitted', message: 'Your upgrade request is under review by the corporate team.', type: 'success' });
                  }}
                  className="flex-1 py-4 bg-error text-white rounded-2xl font-black text-sm shadow-xl shadow-error/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Submit Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add New Shop Modal */}
      {showShopModal && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-background-dark/80 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setShowShopModal(false)}></div>
          <form 
            onSubmit={(e) => {
              console.log('DEBUG: Form onSubmit event fired');
              handleSubmitShop(e);
            }}
            noValidate
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl bg-surface-light dark:bg-surface-dark rounded-[40px] shadow-2xl border border-border-light dark:border-border-dark overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]"
          >
            <div className="p-8 border-b dark:border-border-dark flex justify-between items-center bg-emerald-500 text-white shrink-0">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm"><PlusSquare size={24}/></div>
                <div>
                  <h3 className="text-2xl font-black">Add New Shop</h3>
                  <p className="text-xs opacity-80 font-bold uppercase tracking-wider">Retail Partner Onboarding</p>
                </div>
              </div>
              <button type="button" onClick={() => setShowShopModal(false)} className="p-3 hover:bg-white/10 rounded-2xl transition-all"><X size={24}/></button>
            </div>
            
            <div className="p-8 overflow-y-auto custom-scrollbar space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-text-secondary-light ml-1">Shop Name</label>
                  <div className="relative">
                    <Store className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary-light" size={18} />
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Metro Supermarket" 
                      className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-emerald-500 outline-none dark:text-white font-bold transition-all"
                      value={shopForm.name}
                      onChange={(e) => setShopForm({...shopForm, name: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-text-secondary-light ml-1">Business Category</label>
                  <select 
                    className="w-full px-4 py-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-emerald-500 outline-none dark:text-white font-bold appearance-none cursor-pointer"
                    value={shopForm.category}
                    onChange={(e) => setShopForm({...shopForm, category: e.target.value})}
                  >
                    <option>Grocery</option>
                    <option>Electronics</option>
                    <option>Fashion & Apparel</option>
                    <option>Restaurant / Cafe</option>
                    <option>Pharmacy</option>
                    <option>Hardware / Paints</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-text-secondary-light ml-1">Owner Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary-light" size={18} />
                    <input 
                      type="text" 
                      required
                      placeholder="Full legal name" 
                      className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-emerald-500 outline-none dark:text-white font-bold transition-all"
                      value={shopForm.owner}
                      onChange={(e) => setShopForm({...shopForm, owner: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-text-secondary-light ml-1">Contact Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary-light" size={18} />
                    <input 
                      type="text" 
                      required
                      placeholder="+91 XXXXX XXXXX" 
                      className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-emerald-500 outline-none dark:text-white font-bold transition-all"
                      value={shopForm.contact}
                      onChange={(e) => setShopForm({...shopForm, contact: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-text-secondary-light ml-1">Shop Location / Address</label>
                <div className="relative">
                  <Map className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary-light" size={18} />
                  <input 
                    type="text" 
                    placeholder="Enter full business address" 
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 dark:bg-secondary-dark border-2 border-transparent focus:border-emerald-500 outline-none dark:text-white font-bold transition-all"
                    value={shopForm.location}
                    onChange={(e) => setShopForm({...shopForm, location: e.target.value})}
                  />
                </div>
              </div>

              <div className="p-6 bg-emerald-500/5 border-2 border-dashed border-emerald-500/20 rounded-[32px] space-y-4">
                <p className="text-[10px] text-text-secondary-light font-black mb-2 uppercase tracking-widest">Required Documents</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <input 
                    type="file" 
                    id="shopLicense" 
                    className="hidden" 
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) setShopForm({
                        ...shopForm, 
                        documents: { ...shopForm.documents, license: file, licenseName: file.name }
                      });
                    }}
                  />
                  <button 
                    type="button"
                    onClick={() => document.getElementById('shopLicense').click()}
                    className={`flex-1 py-4 rounded-2xl text-sm font-bold transition-all flex items-center justify-center gap-3 border ${
                      shopForm.documents.licenseName 
                        ? 'bg-emerald-500/10 border-emerald-500 text-emerald-600' 
                        : 'bg-white dark:bg-secondary-dark border-border-light dark:border-border-dark dark:text-white hover:border-emerald-500 hover:shadow-lg'
                    }`}
                  >
                    <FileText size={20} className="text-emerald-500" /> 
                    {shopForm.documents.licenseName || 'Shop License'}
                  </button>

                  <input 
                    type="file" 
                    id="gstPan" 
                    className="hidden" 
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) setShopForm({
                        ...shopForm, 
                        documents: { ...shopForm.documents, gst: file, gstName: file.name }
                      });
                    }}
                  />
                  <button 
                    type="button"
                    onClick={() => document.getElementById('gstPan').click()}
                    className={`flex-1 py-4 rounded-2xl text-sm font-bold transition-all flex items-center justify-center gap-3 border ${
                      shopForm.documents.gstName 
                        ? 'bg-emerald-500/10 border-emerald-500 text-emerald-600' 
                        : 'bg-white dark:bg-secondary-dark border-border-light dark:border-border-dark dark:text-white hover:border-emerald-500 hover:shadow-lg'
                    }`}
                  >
                    <FileText size={20} className="text-emerald-500" /> 
                    {shopForm.documents.gstName || 'GST / PAN'}
                  </button>
                </div>
              </div>
            </div>

            <div className="p-8 border-t dark:border-border-dark flex gap-4 shrink-0 bg-gray-50 dark:bg-secondary-dark/30">
              <button 
                type="button"
                onClick={() => setShowShopModal(false)}
                className="flex-1 py-4 border-2 border-border-light dark:border-border-dark rounded-2xl font-black text-sm dark:text-white hover:bg-white dark:hover:bg-secondary-dark transition-all"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className={`flex-1 py-4 rounded-2xl font-black text-sm shadow-xl transition-all flex items-center justify-center gap-2 bg-emerald-500 text-white shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] ${
                  isProcessing ? 'opacity-70 cursor-wait' : ''
                }`}
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : 'Submit Registration'}
              </button>
            </div>
          </form>
        </div>
      )}
      {/* Commission Plan Modal */}
      <CommissionPlanModal 
        isOpen={showCommissionModal} 
        onClose={() => setShowCommissionModal(false)} 
        onDownload={(name) => handleDownloadFile(name, 'pdf')}
      />
      <SupportTicketModal 
        isOpen={showTicketModal} 
        onClose={() => setShowTicketModal(false)} 
        pushGlobalNotification={pushGlobalNotification}
        user={user}
        setSupportTickets={setSupportTickets}
      />
      <FileViewModal 
        isOpen={!!viewingFile} 
        onClose={() => setViewingFile(null)} 
        fileName={viewingFile || ''} 
        onDownload={(name) => handleDownloadFile(name.split('.')[0], name.split('.').pop())}
      />
    </div>
  );
};

const FileViewModal = ({ isOpen, onClose, fileName, onDownload }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="absolute inset-0" onClick={onClose}></div>
      <div className="relative w-full max-w-lg bg-white dark:bg-surface-dark rounded-[40px] shadow-2xl border border-border-light dark:border-border-dark overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-8 border-b dark:border-border-dark flex justify-between items-center bg-gray-50 dark:bg-secondary-dark/50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary-light/10 rounded-2xl flex items-center justify-center text-primary-light">
              <FileText size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black dark:text-white truncate max-w-[200px]">{fileName}</h3>
              <p className="text-[10px] text-text-secondary-light font-black uppercase tracking-widest">Document Preview</p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-gray-200 dark:hover:bg-surface-dark rounded-2xl transition-all"><X size={24}/></button>
        </div>
        
        <div className="p-8 space-y-6">
          <div className="aspect-[4/3] w-full bg-gray-100 dark:bg-secondary-dark rounded-3xl border-2 border-dashed border-border-light dark:border-border-dark flex flex-col items-center justify-center gap-4 relative group overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-br from-primary-light/5 to-transparent"></div>
             <ShieldCheck size={64} className="text-primary-light opacity-20" />
             <div className="text-center z-10">
               <p className="text-sm font-black dark:text-white mb-1 uppercase tracking-tight">Verified Digital Document</p>
               <p className="text-[10px] text-text-secondary-light font-bold">This document has been verified by AgentHub Compliance.</p>
             </div>
             
             {/* Mock document content */}
             <div className="w-3/4 h-2 bg-gray-200 dark:bg-white/5 rounded-full mb-2"></div>
             <div className="w-1/2 h-2 bg-gray-200 dark:bg-white/5 rounded-full mb-2"></div>
             <div className="w-2/3 h-2 bg-gray-200 dark:bg-white/5 rounded-full mb-2"></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <ProfileItem label="Upload Date" value="Jan 15, 2024" />
            <ProfileItem label="Status" value="KYC Verified" />
            <ProfileItem label="Security" value="Encrypted" />
            <ProfileItem label="File Type" value={fileName.split('.').pop().toUpperCase()} />
          </div>
        </div>

        <div className="p-8 bg-gray-50 dark:bg-secondary-dark/30 border-t dark:border-border-dark">
          <button 
            onClick={() => {
              onDownload(fileName);
              onClose();
            }}
            className="w-full py-4 bg-primary-light text-white rounded-2xl font-black text-sm shadow-xl shadow-primary-light/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <Download size={18} />
            Download Original File
          </button>
        </div>
      </div>
    </div>
  );
};

const SupportTicketModal = ({ isOpen, onClose, pushGlobalNotification, user, setSupportTickets }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white dark:bg-surface-dark w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-border-light dark:border-border-dark">
        <div className="p-6 border-b dark:border-border-dark flex justify-between items-center bg-gray-50 dark:bg-secondary-dark/50">
          <div>
            <h3 className="text-xl font-black dark:text-white uppercase tracking-tight">Create Support Ticket</h3>
            <p className="text-xs text-text-secondary-light font-bold">Expect a response within 4-6 business hours.</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 dark:hover:bg-surface-dark rounded-xl transition-colors"><X size={20}/></button>
        </div>
        
        <form className="p-6 space-y-6" onSubmit={(e) => {
          e.preventDefault();
          const subject = e.target.elements[0].value;
          const category = e.target.elements[1].value;
          const priority = e.target.elements[3].value;
          
          setIsSubmitting(true);
          setTimeout(() => {
            setIsSubmitting(false);
            onClose();
            
            const ticketId = '#TK-' + Math.floor(1000 + Math.random() * 9000);
            
            // Add to local state
            setSupportTickets(prev => [
              { id: ticketId, sub: subject, status: 'Pending', priority: priority, activity: 'Just now' },
              ...prev
            ]);

            window.alert('Support ticket ' + ticketId + ' has been created successfully.');
            
            // Notify Admin & Sub-Admin
            pushGlobalNotification?.({
              title: 'New Support Ticket',
              message: `Agent ${user?.name || 'AgentHub'} has raised a ${category} ticket: ${subject}`,
              type: 'info'
            });
          }, 1500);
        }}>
          <div className="space-y-2">
            <label className="text-xs font-black text-text-secondary-light uppercase tracking-widest">Subject</label>
            <input required type="text" placeholder="e.g., Payout delay or technical glitch" className="w-full px-4 py-3 bg-gray-50 dark:bg-secondary-dark border border-border-light dark:border-border-dark rounded-xl outline-none focus:ring-2 focus:ring-primary-light font-bold dark:text-white" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-black text-text-secondary-light uppercase tracking-widest">Category</label>
              <select className="w-full px-4 py-3 bg-gray-50 dark:bg-secondary-dark border border-border-light dark:border-border-dark rounded-xl outline-none focus:ring-2 focus:ring-primary-light font-bold dark:text-white">
                <option>Payout / Wallet</option>
                <option>Shop Tie-Up</option>
                <option>KYC / Verification</option>
                <option>Technical Issue</option>
                <option>Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-text-secondary-light uppercase tracking-widest">Priority</label>
              <select className="w-full px-4 py-3 bg-gray-50 dark:bg-secondary-dark border border-border-light dark:border-border-dark rounded-xl outline-none focus:ring-2 focus:ring-primary-light font-bold dark:text-white">
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Urgent</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-text-secondary-light uppercase tracking-widest">Description</label>
            <textarea required rows={4} placeholder="Describe your issue in detail..." className="w-full px-4 py-3 bg-gray-50 dark:bg-secondary-dark border border-border-light dark:border-border-dark rounded-xl outline-none focus:ring-2 focus:ring-primary-light font-bold dark:text-white resize-none"></textarea>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full btn-primary py-4 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-primary-light/20 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Creating Ticket...
              </>
            ) : 'Submit Support Ticket'}
          </button>
        </form>
      </div>
    </div>
  );
};

const CommissionPlanModal = ({ isOpen, onClose, onDownload }) => {
  const [selectedTier, setSelectedTier] = useState(null);

  if (!isOpen) return null;

  const tiers = [
    { tier: 'Standard', requirement: '0-50 Referrals', bonus: 'Base Rate', details: 'The entry-level tier for all partners. Earn standard commissions on every shop onboarded and every customer referral.', active: true },
    { tier: 'Silver', requirement: '51-150 Referrals', bonus: '+2% Extra Commission', details: 'Unlock the Silver tier to receive a 2% bonus override on all transactional earnings across your network.', active: false },
    { tier: 'Gold', requirement: '151-500 Referrals', bonus: '+5% Extra Commission', details: 'High-volume performers receive a 5% bonus boost. Includes exclusive access to city-wide promotional events.', active: false },
    { tier: 'Platinum', requirement: '500+ Referrals', bonus: '+10% Extra Commission', details: 'Top-tier status. Enjoy a 10% commission override, a dedicated account manager, and early access to new features.', active: false },
  ];

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background-dark/90 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose}></div>
      <div className="relative w-full max-w-2xl bg-white dark:bg-surface-dark rounded-[40px] shadow-2xl border border-white/10 overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-8 border-b dark:border-border-dark flex justify-between items-center bg-gradient-to-r from-primary-light to-primary-dark text-white">
          <div className="flex items-center gap-3">
            <Award size={28} />
            <div>
              <h3 className="text-2xl font-black">Compensation Plan</h3>
              <p className="text-xs opacity-80 font-bold uppercase tracking-widest">Effective May 2026</p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-white/20 rounded-2xl transition-all"><X size={24}/></button>
        </div>
        
        <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
          {/* Section 1: Direct Commission */}
          <div className="space-y-4">
            <h4 className="font-black dark:text-white uppercase tracking-widest text-sm flex items-center gap-2">
              <TrendingUp size={18} className="text-emerald-500" />
              Direct Referral Commission
            </h4>
            <div className="overflow-hidden border border-border-light dark:border-border-dark rounded-2xl">
              <table className="w-full text-left">
                <thead className="bg-gray-50 dark:bg-secondary-dark/50">
                  <tr>
                    <th className="p-4 text-[10px] font-black uppercase text-text-secondary-light tracking-widest">Customer Type</th>
                    <th className="p-4 text-[10px] font-black uppercase text-text-secondary-light tracking-widest">Commission Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-light dark:divide-border-dark">
                  <tr>
                    <td className="p-4 text-sm font-bold dark:text-white">New User (First Purchase)</td>
                    <td className="p-4 text-sm font-black text-emerald-500">10%</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-sm font-bold dark:text-white">Returning Customer</td>
                    <td className="p-4 text-sm font-black text-emerald-500">5%</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-sm font-bold dark:text-white">Subscription Services</td>
                    <td className="p-4 text-sm font-black text-emerald-500">₹200 Monthly</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 2: Onboarding Rewards */}
          <div className="space-y-4">
            <h4 className="font-black dark:text-white uppercase tracking-widest text-sm flex items-center gap-2">
              <PlusSquare size={18} className="text-blue-500" />
              Onboarding & Network Bonuses
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 bg-blue-500/5 rounded-2xl border border-blue-500/10 space-y-2">
                <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Shop Onboarding</p>
                <p className="text-xl font-black dark:text-white">₹500.00</p>
                <p className="text-[10px] text-text-secondary-light font-medium leading-relaxed">Paid once the shop completes KYC and lists at least 10 products/services.</p>
              </div>
              <div className="p-5 bg-purple-500/5 rounded-2xl border border-purple-500/10 space-y-2">
                <p className="text-[10px] font-black text-purple-500 uppercase tracking-widest">Agent Recruitment</p>
                <p className="text-xl font-black dark:text-white">₹200.00</p>
                <p className="text-[10px] text-text-secondary-light font-medium leading-relaxed">Paid after the referred agent successfully completes their first 5 shop tie-ups.</p>
              </div>
            </div>
          </div>

          {/* Section 3: Performance Tiers */}
          <div className="space-y-4">
            <h4 className="font-black dark:text-white uppercase tracking-widest text-sm flex items-center gap-2">
              <Target size={18} className="text-orange-500" />
              Performance Tiers
            </h4>
            <div className="space-y-3">
              {tiers.map((tier, i) => (
                <div key={i} className="space-y-2">
                  <div 
                    onClick={() => setSelectedTier(selectedTier === i ? null : i)}
                    className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all hover:scale-[1.01] ${
                      selectedTier === i 
                        ? 'bg-primary-light/10 border-primary-light shadow-lg' 
                        : tier.active 
                          ? 'bg-primary-light/5 border-primary-light/30' 
                          : 'bg-gray-50 dark:bg-secondary-dark border-transparent'
                    }`}
                  >
                    <div>
                      <p className={`text-sm font-black ${tier.active || selectedTier === i ? 'text-primary-light' : 'dark:text-white'}`}>{tier.tier} Tier</p>
                      <p className="text-[10px] text-text-secondary-light font-bold">{tier.requirement}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-black ${tier.active || selectedTier === i ? 'text-primary-light' : 'text-text-secondary-light'}`}>{tier.bonus}</span>
                      <div className={`transition-transform duration-300 ${selectedTier === i ? 'rotate-180' : ''}`}>
                        <ChevronDown size={14} className={selectedTier === i ? 'text-primary-light' : 'text-text-secondary-light'} />
                      </div>
                    </div>
                  </div>
                  {selectedTier === i && (
                    <div className="px-6 py-4 bg-primary-light/5 rounded-2xl border border-primary-light/20 animate-in slide-in-from-top-2 duration-300">
                      <p className="text-xs text-text-secondary-light font-bold leading-relaxed">{tier.details}</p>
                      <div className="mt-3 flex items-center gap-2">
                        <div className="h-1.5 flex-1 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                          <div className={`h-full bg-primary-light transition-all duration-1000 ${tier.active ? 'w-100' : 'w-0'}`}></div>
                        </div>
                        <span className="text-[10px] font-black text-primary-light uppercase">{tier.active ? 'Current Status' : 'Locked'}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 bg-gray-100 dark:bg-secondary-dark/50 rounded-[28px] border border-dashed border-border-light dark:border-border-dark text-center">
            <p className="text-xs text-text-secondary-light font-bold">Commissions are calculated on the net order value after taxes. Payouts are processed every 1st and 15th of the month.</p>
          </div>
        </div>
        
        <div className="p-8 bg-gray-50 dark:bg-secondary-dark/30 border-t dark:border-border-dark flex gap-4">
          <button onClick={onClose} className="flex-1 py-4 bg-white dark:bg-surface-dark border-2 border-border-light dark:border-border-dark rounded-2xl font-black text-sm dark:text-white hover:bg-gray-100 transition-all">Close</button>
          <button 
            onClick={() => onDownload('Compensation_Plan_May_2026')}
            className="flex-1 py-4 bg-primary-light text-white rounded-2xl font-black text-sm shadow-xl shadow-primary-light/20 flex items-center justify-center gap-2"
          >
            <Download size={18} /> Download PDF
          </button>
        </div>
      </div>
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
