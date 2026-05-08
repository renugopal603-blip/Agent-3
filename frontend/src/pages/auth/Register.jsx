import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, Mail, Lock, Phone, ArrowRight, Loader2, Shield, ArrowLeft, 
  CheckCircle, Upload, FileText, MapPin, Building, CreditCard, 
  AlertCircle, ChevronRight, ChevronLeft, Eye, X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';

const Register = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'Agent',
    agentType: 'Pincode Agent',
    businessCategory: 'Service-Based',
    businessType: 'Hospital',
    territory: {
      state: '',
      district: '',
      division: '',
      pincode: ''
    },
    kycDocuments: {
      identityProofType: 'Aadhaar Card',
      aadharFront: null,
      panCard: null,
      photo: null,
      identityFront: null,
      addressProof: null,
      bankPassbook: null
    },
    bankDetails: {
      accountName: '',
      accountNumber: '',
      bankName: '',
      ifscCode: '',
      upiApp: 'Google Pay',
      upiId: ''
    },
    paymentDetails: {
      amount: '100000',
      transactionId: '',
      paymentProof: null
    }
  });

  const [previews, setPreviews] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // OTP Flow States
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [isManualAmount, setIsManualAmount] = useState(false);

  const { register } = useAuth();
  const { addNotification } = useNotifications();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        kycDocuments: { ...prev.kycDocuments, [field]: file }
      }));
      setPreviews(prev => ({
        ...prev,
        [field]: URL.createObjectURL(file)
      }));
    }
  };

  const handlePaymentProofChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        paymentDetails: { ...prev.paymentDetails, paymentProof: file }
      }));
      setPreviews(prev => ({
        ...prev,
        paymentProof: URL.createObjectURL(file)
      }));
    }
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  // OTP Simulation Logic
  const handleSendOtp = () => {
    if (!formData.phone) {
      setOtpError('Please enter a phone number first');
      return;
    }
    setOtpLoading(true);
    setOtpError('');
    // Simulate API call
    setTimeout(() => {
      setOtpSent(true);
      setOtpLoading(false);
      addNotification({
        title: 'OTP Sent',
        message: 'A verification code has been sent to your phone.',
        type: 'success'
      });
    }, 1500);
  };

  const handleVerifyOtp = () => {
    if (otp.length !== 6) {
      setOtpError('Please enter a valid 6-digit OTP');
      return;
    }
    setOtpLoading(true);
    setOtpError('');
    // Simulate verification
    setTimeout(() => {
      if (otp === '123456') { // Mock OTP
        setOtpVerified(true);
        setOtpLoading(false);
        addNotification({
          title: 'Verified Success',
          message: 'Your phone number has been verified.',
          type: 'success'
        });
      } else {
        setOtpError('Invalid OTP. Use 123456 for demo.');
        setOtpLoading(false);
      }
    }, 1500);
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // In a real app, we'd upload files to S3/Cloudinary first
      // For this demo, we'll send a simplified version
      const submissionData = {
        ...formData,
        kycDocuments: {
          ...formData.kycDocuments,
          aadharFront: formData.kycDocuments.aadharFront?.name || 'uploaded',
          panCard: formData.kycDocuments.panCard?.name || 'uploaded',
          photo: formData.kycDocuments.photo?.name || 'uploaded',
          identityFront: formData.kycDocuments.identityFront?.name || 'uploaded',
          addressProof: formData.kycDocuments.addressProof?.name || 'uploaded',
          bankPassbook: formData.kycDocuments.bankPassbook?.name || 'uploaded',
        },
        paymentDetails: {
          ...formData.paymentDetails,
          paymentProof: formData.paymentDetails.paymentProof?.name || 'uploaded'
        }
      };

      await register(submissionData);
      
      // Trigger notification for Admin
      addNotification({
        title: 'New Agent Registration',
        message: `${formData.name} has applied as a ${formData.agentType}.`,
        type: 'info'
      });

      setIsSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
      setStep(1); // Go back to start if error
    } finally {
      setLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center p-4">
        <div className="max-w-md w-full card-premium text-center py-12 animate-in zoom-in duration-500">
          <div className="w-20 h-20 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} />
          </div>
          <h2 className="text-3xl font-black dark:text-white mb-4">Application Submitted!</h2>
          <p className="text-text-secondary-light mb-8">
            Your application has been submitted for admin review. Our team will verify your documents and payment within 24-48 hours.
          </p>
          <div className="p-4 bg-gray-50 dark:bg-secondary-dark rounded-xl border border-border-light dark:border-border-dark mb-8 text-left">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-text-secondary-light">Status:</span>
              <span className="text-warning font-bold uppercase">Pending Review</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary-light">Reference ID:</span>
              <span className="dark:text-white font-mono">AGT-{Math.floor(Math.random() * 1000000)}</span>
            </div>
          </div>
          <Link to="/login" className="btn-primary w-full py-4 rounded-xl flex items-center justify-center gap-2">
            Return to Login <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark p-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary-light dark:bg-primary-dark rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <span className="font-bold text-2xl text-text-primary-light dark:text-text-primary-dark">
              Agentic<span className="text-accent-light">Store</span>
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-4">
            <span className="text-sm text-text-secondary-light">Already have an account?</span>
            <Link to="/login" className="px-4 py-2 bg-white dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-xl font-bold text-sm dark:text-white">Login</Link>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4 px-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <div key={s} className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-500 ${
                  step === s ? 'bg-primary-light text-white ring-4 ring-primary-light/20 scale-110' : 
                  step > s ? 'bg-success text-white' : 'bg-gray-200 dark:bg-secondary-dark text-text-secondary-light'
                }`}>
                  {step > s ? <CheckCircle size={20} /> : s}
                </div>
                <span className={`text-[10px] font-black uppercase tracking-widest mt-2 hidden sm:block ${step >= s ? 'text-primary-light' : 'text-text-secondary-light'}`}>
                  {s === 1 ? 'Account' : s === 2 ? 'Details' : s === 3 ? 'KYC' : s === 4 ? 'Payment' : 'Review'}
                </span>
              </div>
            ))}
          </div>
          <div className="h-1 w-full bg-gray-200 dark:bg-secondary-dark rounded-full overflow-hidden">
            <div className="h-full bg-primary-light transition-all duration-500" style={{ width: `${((step - 1) / 4) * 100}%` }}></div>
          </div>
        </div>

        <div className="card-premium p-0 overflow-hidden shadow-2xl">
          <form onSubmit={e => e.preventDefault()}>
            {error && <div className="m-8 p-4 bg-error/10 border border-error/20 text-error rounded-xl text-center font-bold">{error}</div>}

            {/* Step 1: Basic Account Info */}
            {step === 1 && (
              <div className="p-8 space-y-8 animate-in slide-in-from-right duration-500">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary-light/10 text-primary-light rounded-xl"><User size={24} /></div>
                  <div>
                    <h3 className="text-2xl font-black dark:text-white">Account Setup</h3>
                    <p className="text-sm text-text-secondary-light">Basic information to get started.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-text-secondary-light">Full Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="input-field" placeholder="John Doe" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-text-secondary-light">Email Address</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="input-field" placeholder="john@example.com" required />
                  </div>
                  <div className="space-y-2 relative">
                    <label className="text-xs font-black uppercase tracking-widest text-text-secondary-light">Phone Number</label>
                    <div className="relative">
                      <input 
                        type="tel" 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleInputChange} 
                        className={`input-field pr-32 ${otpVerified ? 'border-success bg-success/5' : ''}`} 
                        placeholder="+91 98765 43210" 
                        disabled={otpVerified}
                        required 
                      />
                      {!otpVerified && (
                        <button 
                          type="button"
                          onClick={handleSendOtp}
                          disabled={otpLoading || !formData.phone}
                          className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-primary-light text-white rounded-lg text-[10px] font-black uppercase tracking-widest disabled:opacity-50 transition-all"
                        >
                          {otpLoading && !otpSent ? 'Sending...' : otpSent ? 'Resend OTP' : 'Send OTP'}
                        </button>
                      )}
                      {otpVerified && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-success flex items-center gap-1 font-black text-[10px] uppercase tracking-widest">
                          <CheckCircle size={14} /> Verified
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-text-secondary-light">Password</label>
                    <input type="password" name="password" value={formData.password} onChange={handleInputChange} className="input-field" placeholder="••••••••" required />
                  </div>
                </div>

                {otpSent && !otpVerified && (
                  <div className="p-6 bg-primary-light/5 border border-primary-light/20 rounded-2xl space-y-4 animate-in fade-in slide-in-from-top-4">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-black uppercase tracking-widest text-primary-light">Enter 6-Digit OTP</label>
                      <span className="text-[10px] font-bold text-text-secondary-light">OTP is 123456</span>
                    </div>
                    <div className="flex gap-4">
                      <input 
                        type="text" 
                        maxLength={6}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="input-field text-center text-2xl tracking-[1rem] font-black" 
                        placeholder="000000"
                      />
                      <button 
                        type="button"
                        onClick={handleVerifyOtp}
                        disabled={otpLoading || otp.length !== 6}
                        className="btn-primary px-8 rounded-xl shrink-0"
                      >
                        {otpLoading ? <Loader2 className="animate-spin" /> : 'Verify OTP'}
                      </button>
                    </div>
                    {otpError && <p className="text-xs text-error font-bold flex items-center gap-1"><AlertCircle size={14} /> {otpError}</p>}
                  </div>
                )}

                <div className="pt-6 flex justify-between items-center">
                  <Link to="/" className="text-sm font-bold text-text-secondary-light hover:text-error flex items-center gap-2 transition-colors">
                    <X size={16} /> Exit Registration
                  </Link>
                  <button 
                    onClick={nextStep} 
                    disabled={!otpVerified}
                    className={`btn-primary px-10 py-4 rounded-xl flex items-center gap-2 ${!otpVerified ? 'opacity-50 cursor-not-allowed grayscale' : ''}`}
                  >
                    Next Step <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Agent Details */}
            {step === 2 && (
              <div className="p-8 space-y-8 animate-in slide-in-from-right duration-500">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-orange-500/10 text-orange-500 rounded-xl"><Building size={24} /></div>
                  <div>
                    <h3 className="text-2xl font-black dark:text-white">Agent Details</h3>
                    <p className="text-sm text-text-secondary-light">Select your agent type and territory.</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-text-secondary-light">Agent Type</label>
                    <select name="agentType" value={formData.agentType} onChange={handleInputChange} className="input-field">
                      <option>State Agent</option>
                      <option>District Agent</option>
                      <option>Divisional Agent</option>
                      <option>Pincode Agent</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-text-secondary-light">Business Focus</label>
                      <select name="businessCategory" value={formData.businessCategory} onChange={handleInputChange} className="input-field">
                        <option>Service-Based</option>
                        <option>Product-Based</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-text-secondary-light">Business Type</label>
                      <select name="businessType" value={formData.businessType} onChange={handleInputChange} className="input-field">
                        <optgroup label="Healthcare">
                          <option value="Hospital">🏥 Hospital</option>
                          <option value="Clinic">🩺 Clinic</option>
                          <option value="Pharmacy">💊 Pharmacy</option>
                          <option value="Diagnostic Lab">🔬 Diagnostic Lab</option>
                        </optgroup>
                        <optgroup label="Hospitality">
                          <option value="Hotel">🏨 Hotel</option>
                          <option value="Restaurant">🍽️ Restaurant</option>
                          <option value="Café">☕ Café</option>
                          <option value="Resort">🌴 Resort</option>
                          <option value="Guest House">🏠 Guest House</option>
                        </optgroup>
                        <optgroup label="Retail & Commerce">
                          <option value="Supermarket">🛒 Supermarket</option>
                          <option value="Grocery Store">🥦 Grocery Store</option>
                          <option value="Electronics Shop">📱 Electronics Shop</option>
                          <option value="Clothing Store">👗 Clothing Store</option>
                          <option value="Jewellery Shop">💎 Jewellery Shop</option>
                        </optgroup>
                        <optgroup label="Education">
                          <option value="School">🏫 School</option>
                          <option value="College">🎓 College</option>
                          <option value="Coaching Center">📚 Coaching Center</option>
                        </optgroup>
                        <optgroup label="Finance & Services">
                          <option value="Bank">🏦 Bank</option>
                          <option value="Insurance Agency">🛡️ Insurance Agency</option>
                          <option value="Travel Agency">✈️ Travel Agency</option>
                          <option value="Real Estate">🏗️ Real Estate</option>
                        </optgroup>
                        <optgroup label="Others">
                          <option value="Salon & Spa">💇 Salon & Spa</option>
                          <option value="Gym & Fitness">🏋️ Gym & Fitness</option>
                          <option value="Transport">🚛 Transport & Logistics</option>
                          <option value="Other">🔧 Other</option>
                        </optgroup>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-text-secondary-light">State</label>
                      <input type="text" name="territory.state" value={formData.territory.state} onChange={handleInputChange} className="input-field" placeholder="Maharashtra" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-text-secondary-light">District</label>
                      <input type="text" name="territory.district" value={formData.territory.district} onChange={handleInputChange} className="input-field" placeholder="Pune" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-text-secondary-light">Division</label>
                      <input type="text" name="territory.division" value={formData.territory.division} onChange={handleInputChange} className="input-field" placeholder="South Division" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-text-secondary-light">Pincode</label>
                      <input type="text" name="territory.pincode" value={formData.territory.pincode} onChange={handleInputChange} className="input-field" placeholder="411001" />
                    </div>
                  </div>
                </div>

                <div className="pt-6 flex justify-between items-center">
                  <div className="flex gap-4">
                    <button onClick={prevStep} className="btn-outline px-8 py-4 rounded-xl flex items-center gap-2">
                      <ChevronLeft size={20} /> Back
                    </button>
                    <Link to="/" className="px-8 py-4 rounded-xl border border-border-light dark:border-border-dark text-text-secondary-light font-bold text-sm flex items-center gap-2 hover:bg-error/5 hover:text-error transition-all">
                      <X size={16} /> Exit
                    </Link>
                  </div>
                  <button onClick={nextStep} className="btn-primary px-10 py-4 rounded-xl flex items-center gap-2">
                    Next Step <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: KYC Documents */}
            {step === 3 && (
              <div className="p-8 space-y-8 animate-in slide-in-from-right duration-500">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl"><Shield size={24} /></div>
                  <div>
                    <h3 className="text-2xl font-black dark:text-white">KYC Verification</h3>
                    <p className="text-sm text-text-secondary-light">Upload your mandatory documents for verification.</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-text-secondary-light">Identity Proof Type</label>
                    <select name="kycDocuments.identityProofType" value={formData.kycDocuments.identityProofType} onChange={handleInputChange} className="input-field">
                      <option>Aadhaar Card</option>
                      <option>PAN Card</option>
                      <option>Voter ID</option>
                      <option>Driving License</option>
                      <option>Passport</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      ...(formData.kycDocuments.identityProofType === 'Aadhaar Card' 
                        ? [{ label: 'Aadhaar Card Front', field: 'aadharFront' }] 
                        : []),
                      ...(formData.kycDocuments.identityProofType === 'PAN Card' 
                        ? [{ label: 'PAN Card', field: 'panCard' }] 
                        : []),
                      ...(formData.kycDocuments.identityProofType !== 'Aadhaar Card' && formData.kycDocuments.identityProofType !== 'PAN Card'
                        ? [{ label: `${formData.kycDocuments.identityProofType} Front`, field: 'identityFront' }]
                        : [])
                    ].map((doc) => (
                      <div key={doc.field} className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-text-secondary-light">{doc.label}</label>
                        <div className="relative group">
                          {previews[doc.field] ? (
                            <div className="relative h-32 rounded-xl overflow-hidden border-2 border-primary-light">
                              <img src={previews[doc.field]} alt={doc.label} className="w-full h-full object-cover" />
                              <button onClick={() => {
                                setPreviews(prev => ({ ...prev, [doc.field]: null }));
                                setFormData(prev => ({ ...prev, kycDocuments: { ...prev.kycDocuments, [doc.field]: null } }));
                              }} className="absolute top-2 right-2 p-1 bg-error text-white rounded-full"><X size={14} /></button>
                            </div>
                          ) : (
                            <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-border-light dark:border-border-dark rounded-xl cursor-pointer hover:bg-primary-light/5 hover:border-primary-light transition-all">
                              <Upload size={24} className="text-text-secondary-light group-hover:text-primary-light transition-colors" />
                              <span className="text-[10px] font-bold text-text-secondary-light mt-2 uppercase">Click to upload</span>
                              <input type="file" onChange={(e) => handleFileChange(e, doc.field)} className="hidden" accept="image/*,.pdf" />
                            </label>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 flex justify-between items-center">
                  <div className="flex gap-4">
                    <button onClick={prevStep} className="btn-outline px-8 py-4 rounded-xl flex items-center gap-2">
                      <ChevronLeft size={20} /> Back
                    </button>
                    <Link to="/" className="px-8 py-4 rounded-xl border border-border-light dark:border-border-dark text-text-secondary-light font-bold text-sm flex items-center gap-2 hover:bg-error/5 hover:text-error transition-all">
                      <X size={16} /> Exit
                    </Link>
                  </div>
                  <button onClick={nextStep} className="btn-primary px-10 py-4 rounded-xl flex items-center gap-2">
                    Next Step <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Bank & Payment */}
            {step === 4 && (
              <div className="p-8 space-y-8 animate-in slide-in-from-right duration-500">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl"><CreditCard size={24} /></div>
                  <div>
                    <h3 className="text-2xl font-black dark:text-white">Bank & Payment</h3>
                    <p className="text-sm text-text-secondary-light">Your bank details for payouts and security deposit proof.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h4 className="font-bold dark:text-white border-b dark:border-border-dark pb-2">Bank Details</h4>
                    <div className="space-y-4">
                      <input type="text" name="bankDetails.accountName" value={formData.bankDetails.accountName} onChange={handleInputChange} className="input-field" placeholder="Account Holder Name" />
                      <input type="text" name="bankDetails.accountNumber" value={formData.bankDetails.accountNumber} onChange={handleInputChange} className="input-field" placeholder="Account Number" />
                      <input type="text" name="bankDetails.bankName" value={formData.bankDetails.bankName} onChange={handleInputChange} className="input-field" placeholder="Bank Name" />
                      <input type="text" name="bankDetails.ifscCode" value={formData.bankDetails.ifscCode} onChange={handleInputChange} className="input-field" placeholder="IFSC Code" />
                      
                      <div className="pt-4 space-y-4 border-t dark:border-border-dark mt-4">
                        <h4 className="font-bold dark:text-white text-xs uppercase tracking-widest text-primary-light">OR UPI Details</h4>
                        <div className="grid grid-cols-1 gap-4">
                          <select name="bankDetails.upiApp" value={formData.bankDetails.upiApp} onChange={handleInputChange} className="input-field">
                            <option>Google Pay</option>
                            <option>PhonePe</option>
                            <option>Paytm</option>
                            <option>Amazon Pay</option>
                            <option>Other UPI</option>
                          </select>
                          <input type="text" name="bankDetails.upiId" value={formData.bankDetails.upiId} onChange={handleInputChange} className="input-field" placeholder="UPI ID (e.g. name@okaxis)" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h4 className="font-bold dark:text-white border-b dark:border-border-dark pb-2">Security Deposit</h4>
                    <div className="p-4 bg-primary-light/5 rounded-xl border border-primary-light/20 space-y-3">
                      <div className="flex justify-between items-center">
                        <p className="text-xs text-text-secondary-light font-bold">
                          {isManualAmount ? 'Enter Amount to Transfer:' : 'Transfer Amount:'}
                        </p>
                        <button 
                          type="button"
                          onClick={() => setIsManualAmount(!isManualAmount)}
                          className="text-[10px] font-black uppercase tracking-widest text-primary-light hover:underline"
                        >
                          {isManualAmount ? 'Fixed Amount' : 'Manual Entry'}
                        </button>
                      </div>
                      
                      {isManualAmount ? (
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-text-secondary-light">₹</span>
                          <input 
                            type="number" 
                            name="paymentDetails.amount" 
                            value={formData.paymentDetails.amount} 
                            onChange={handleInputChange}
                            className="w-full pl-8 pr-4 py-2 bg-white dark:bg-surface-dark border border-primary-light/30 rounded-lg font-black dark:text-white focus:border-primary-light outline-none"
                            placeholder="0.00"
                          />
                        </div>
                      ) : (
                        <p className="text-xl font-black dark:text-white">₹{Number(formData.paymentDetails.amount).toLocaleString('en-IN')}</p>
                      )}

                      <div className="pt-2 border-t border-primary-light/10 space-y-1">
                        <p className="text-xs text-text-secondary-light font-bold">Transfer to:</p>
                        <p className="text-sm font-black dark:text-white">AgenticStore Platforms Ltd.</p>
                        <p className="text-sm font-mono dark:text-white">A/C: 998877665544</p>
                        <p className="text-sm font-mono dark:text-white">IFSC: AGNT0001234</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-text-secondary-light">Transaction ID</label>
                        <input type="text" name="paymentDetails.transactionId" value={formData.paymentDetails.transactionId} onChange={handleInputChange} className="input-field" placeholder="UTR / Txn ID" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-text-secondary-light">Payment Proof</label>
                        <label className={`flex items-center gap-3 p-3 border-2 border-dashed rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-secondary-dark transition-all ${previews.paymentProof ? 'border-primary-light bg-primary-light/5' : 'border-border-light dark:border-border-dark'}`}>
                          <Upload size={18} className="text-primary-light" />
                          <span className="text-xs font-bold dark:text-white">{formData.paymentDetails.paymentProof ? formData.paymentDetails.paymentProof.name : 'Upload Screenshot'}</span>
                          <input type="file" onChange={handlePaymentProofChange} className="hidden" />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 flex justify-between items-center">
                  <div className="flex gap-4">
                    <button onClick={prevStep} className="btn-outline px-8 py-4 rounded-xl flex items-center gap-2">
                      <ChevronLeft size={20} /> Back
                    </button>
                    <Link to="/" className="px-8 py-4 rounded-xl border border-border-light dark:border-border-dark text-text-secondary-light font-bold text-sm flex items-center gap-2 hover:bg-error/5 hover:text-error transition-all">
                      <X size={16} /> Exit
                    </Link>
                  </div>
                  <button onClick={nextStep} className="btn-primary px-10 py-4 rounded-xl flex items-center gap-2">
                    Review Application <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 5: Final Review */}
            {step === 5 && (
              <div className="p-8 space-y-8 animate-in slide-in-from-right duration-500">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-500/10 text-purple-500 rounded-xl"><FileText size={24} /></div>
                  <div>
                    <h3 className="text-2xl font-black dark:text-white">Final Review</h3>
                    <p className="text-sm text-text-secondary-light">Confirm your details before submission.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="p-6 bg-gray-50 dark:bg-secondary-dark rounded-2xl space-y-4">
                      <h4 className="font-bold dark:text-white text-sm uppercase tracking-widest">Personal Info</h4>
                      <div className="space-y-1">
                        <p className="text-xs text-text-secondary-light">Name: <span className="font-bold dark:text-white">{formData.name}</span></p>
                        <p className="text-xs text-text-secondary-light">Email: <span className="font-bold dark:text-white">{formData.email}</span></p>
                        <p className="text-xs text-text-secondary-light">Phone: <span className="font-bold dark:text-white">{formData.phone}</span></p>
                      </div>
                      <h4 className="font-bold dark:text-white text-sm uppercase tracking-widest pt-4">Territory</h4>
                      <div className="space-y-1">
                        <p className="text-xs text-text-secondary-light">Type: <span className="font-bold dark:text-white">{formData.agentType}</span></p>
                        <p className="text-xs text-text-secondary-light">Focus: <span className="font-bold dark:text-white">{formData.businessCategory}</span></p>
                        <p className="text-xs text-text-secondary-light">Business Type: <span className="font-bold dark:text-white">{formData.businessType}</span></p>
                        <p className="text-xs text-text-secondary-light">Area: <span className="font-bold dark:text-white">{formData.territory.district}, {formData.territory.state}</span></p>
                      </div>
                      {formData.bankDetails.upiId && (
                        <>
                          <h4 className="font-bold dark:text-white text-sm uppercase tracking-widest pt-4">UPI Details</h4>
                          <div className="space-y-1">
                            <p className="text-xs text-text-secondary-light">App: <span className="font-bold dark:text-white">{formData.bankDetails.upiApp}</span></p>
                            <p className="text-xs text-text-secondary-light">ID: <span className="font-bold dark:text-white">{formData.bankDetails.upiId}</span></p>
                          </div>
                        </>
                      )}
                      <h4 className="font-bold dark:text-white text-sm uppercase tracking-widest pt-4">Payment</h4>
                      <div className="space-y-1">
                        <p className="text-xs text-text-secondary-light">Amount: <span className="font-bold dark:text-white">₹{Number(formData.paymentDetails.amount).toLocaleString('en-IN')}</span></p>
                        <p className="text-xs text-text-secondary-light">Txn ID: <span className="font-bold dark:text-white">{formData.paymentDetails.transactionId}</span></p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="p-6 bg-gray-50 dark:bg-secondary-dark rounded-2xl space-y-4">
                      <h4 className="font-bold dark:text-white text-sm uppercase tracking-widest">Documents Status</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {/* Only show the document that was selected for identity */}
                        {formData.kycDocuments.identityProofType === 'Aadhaar Card' && (
                          <div className="flex items-center gap-2 p-2 bg-white dark:bg-surface-dark rounded-lg border border-border-light dark:border-border-dark">
                            {formData.kycDocuments.aadharFront ? <CheckCircle size={12} className="text-success" /> : <AlertCircle size={12} className="text-error" />}
                            <span className="text-[9px] font-bold dark:text-white uppercase">Aadhaar Front</span>
                          </div>
                        )}
                        {formData.kycDocuments.identityProofType === 'PAN Card' && (
                          <div className="flex items-center gap-2 p-2 bg-white dark:bg-surface-dark rounded-lg border border-border-light dark:border-border-dark">
                            {formData.kycDocuments.panCard ? <CheckCircle size={12} className="text-success" /> : <AlertCircle size={12} className="text-error" />}
                            <span className="text-[9px] font-bold dark:text-white uppercase">PAN Card</span>
                          </div>
                        )}
                        {formData.kycDocuments.identityProofType !== 'Aadhaar Card' && formData.kycDocuments.identityProofType !== 'PAN Card' && (
                          <div className="flex items-center gap-2 p-2 bg-white dark:bg-surface-dark rounded-lg border border-border-light dark:border-border-dark">
                            {formData.kycDocuments.identityFront ? <CheckCircle size={12} className="text-success" /> : <AlertCircle size={12} className="text-error" />}
                            <span className="text-[9px] font-bold dark:text-white uppercase">{formData.kycDocuments.identityProofType}</span>
                          </div>
                        )}
                      </div>
                      <div className="pt-4 border-t dark:border-border-dark">
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input type="checkbox" className="mt-1 w-4 h-4 rounded text-primary-light focus:ring-primary-light" required />
                          <span className="text-[10px] text-text-secondary-light leading-tight font-bold">
                            I hereby declare that the information provided is true and correct. I agree to the Agent Onboarding Terms & Conditions.
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 flex justify-between items-center">
                  <div className="flex gap-4">
                    <button onClick={prevStep} className="btn-outline px-8 py-4 rounded-xl flex items-center gap-2">
                      <ChevronLeft size={20} /> Back
                    </button>
                    <Link to="/" className="px-8 py-4 rounded-xl border border-border-light dark:border-border-dark text-text-secondary-light font-bold text-sm flex items-center gap-2 hover:bg-error/5 hover:text-error transition-all">
                      <X size={16} /> Exit
                    </Link>
                  </div>
                  <button 
                    onClick={handleSubmit} 
                    disabled={loading}
                    className="btn-primary px-12 py-4 rounded-xl font-black flex items-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-primary-light/30"
                  >
                    {loading ? <Loader2 className="animate-spin" /> : <>Submit Application <CheckCircle size={20} /></>}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>

      <style jsx>{`
        .input-field {
          width: 100%;
          padding: 0.875rem 1.25rem;
          background: #F9FAFB;
          border: 2px solid transparent;
          border-radius: 1rem;
          outline: none;
          transition: all 0.3s;
          font-weight: 500;
        }
        :global(.dark) .input-field {
          background: #1E293B;
          color: white;
        }
        .input-field:focus {
          border-color: #10B981;
          background: white;
          box-shadow: 0 10px 15px -3px rgba(16, 185, 129, 0.1);
        }
        :global(.dark) .input-field:focus {
          background: #0F172A;
        }
      `}</style>
    </div>
  );
};

export default Register;
