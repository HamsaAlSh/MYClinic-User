import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import { useLocale } from '../localization/LocaleProvider';
import LocaleToggle from '../components/LocaleToggle';
import logo from '../assets/MYClinicLogo.jpg';
import { LogOut, Key, Wallet, RefreshCw, Copy, CheckCircle2, TrendingUp, Calendar, Power, Loader2, Plus } from 'lucide-react';

export default function UserDashboard() {
  const { tr } = useLocale();
  const navigate = useNavigate();
  const [user] = useState(JSON.parse(localStorage.getItem('user')));
  
  const [loading, setLoading] = useState(true);
  const [earningsData, setEarningsData] = useState({ earnings: 0, transactions: [] });
  
  const [myCodes, setMyCodes] = useState([]);
  
  const [generating, setGenerating] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const [showGenerateInput, setShowGenerateInput] = useState(false);
  const [discountAmount, setDiscountAmount] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const res = await API.get('/getUserEarnings');
      setEarningsData({
        earnings: res.data.earnings || 0,
        transactions: res.data.transactions || []
      });
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) handleLogout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleGenerateCode = async () => {
    if (!discountAmount) {
      setErrorMsg(tr('enterDiscountError') || 'الرجاء إدخال نسبة الخصم أولاً');
      return;
    }

    setGenerating(true);
    setErrorMsg('');
    try {
      const formData = new FormData();
      formData.append('discount', discountAmount);

      const res = await API.post('/generateUserCode', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      setMyCodes([...myCodes, res.data.code]);
      setDiscountAmount('');
      setShowGenerateInput(false);
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'حدث خطأ أثناء توليد الكود.');
    } finally {
      setGenerating(false);
    }
  };

  const handleToggleStatus = async (codeId, currentStatus) => {
    try {
      const formData = new FormData();
      formData.append('code_id', codeId);
      
      await API.post('/updateCodeStatus', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      setMyCodes(myCodes.map(c => 
        c.id === codeId ? { ...c, is_active: !currentStatus } : c
      ));
    } catch (err) {
      alert('Failed to change status / فشل تغيير الحالة');
    }
  };

  const handleCopyCode = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] relative overflow-hidden font-sans">
      
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-100 sticky top-0 z-10 px-8 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="w-10 h-10 rounded-xl" />
          <h1 className="font-serif text-lg font-bold text-[#0B3B2D] tracking-wider">MY CLINICS</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <LocaleToggle />
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm font-semibold text-red-600 bg-red-50 px-4 py-2 rounded-xl hover:bg-red-600 hover:text-white transition">
            <LogOut className="w-4 h-4" />
            {tr('logout')}
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-8 relative z-10">
        
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-[#0B3B2D]">{tr('welcomeUser')} {user?.first_name} 👋</h2>
          <p className="text-gray-500 mt-2">{tr('dashboardDesc')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <Key className="w-5 h-5 text-[#D4AF37]" />
                {tr('myCodesTitle')}
              </h3>
              <button 
                onClick={() => setShowGenerateInput(!showGenerateInput)}
                className="flex items-center gap-1 text-sm font-bold text-[#0B3B2D] bg-[#0B3B2D]/5 hover:bg-[#0B3B2D] hover:text-white px-3 py-2 rounded-lg transition"
              >
                <Plus className="w-4 h-4" /> {tr('newCode')}
              </button>
            </div>

            {showGenerateInput && (
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#D4AF37]/30 mb-4 animate-[fadeIn_0.3s_ease-out]">
                {errorMsg && (
                  <div className="bg-red-50 text-red-600 text-xs p-3 rounded-lg mb-3">
                    {errorMsg}
                  </div>
                )}
                <div className="flex gap-3">
                  <input
                    type="number"
                    value={discountAmount}
                    onChange={(e) => setDiscountAmount(e.target.value)}
                    placeholder={tr('discountPlaceholder') || 'أدخل نسبة الخصم'}
                    min="1" max="100"
                    className="flex-1 bg-[#F8F9FA] border border-gray-200 rounded-xl px-4 py-2 text-sm font-bold text-[#0B3B2D] focus:outline-none"
                  />
                  <button 
                    onClick={handleGenerateCode}
                    disabled={generating}
                    className="bg-[#0B3B2D] text-white px-6 py-2 rounded-xl font-bold text-sm hover:shadow-lg transition disabled:opacity-50 flex items-center justify-center min-w-[100px]"
                  >
                    {generating ? <Loader2 className="w-5 h-5 animate-spin" /> : tr('generateCode')}
                  </button>
                </div>
              </div>
            )}

            {myCodes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {myCodes.map((code) => (
                  <div key={code.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 relative group">
                    <div className="flex justify-between items-center mb-3">
                      {/* استخدام الترجمة هنا */}
                      <span className="text-xs font-bold text-gray-400">{tr('discountCode')} {code.discount}%</span>
                      <div className={`w-2 h-2 rounded-full ${code.is_active ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    </div>
                    <div className="bg-[#F8F9FA] rounded-xl p-3 flex items-center justify-between mb-3">
                      <span className="text-xl font-mono font-bold text-[#0B3B2D]">{code.code}</span>
                      <button onClick={() => handleCopyCode(code.code, code.id)} className="text-gray-400 hover:text-[#0B3B2D] transition">
                        {copiedId === code.id ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                      </button>
                    </div>
                    <button 
                      onClick={() => handleToggleStatus(code.id, code.is_active)}
                      className={`w-full py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-2 ${
                        code.is_active ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-green-50 text-green-600 hover:bg-green-100'
                      }`}
                    >
                      <Power className="w-3.5 h-3.5" />
                      {/* استخدام الترجمة هنا */}
                      {code.is_active ? tr('disableCode') : tr('enableCode')}
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
                <p className="text-gray-400 text-sm">{tr('noCodesYet')}</p>
              </div>
            )}
          </div>

          <div className="bg-gradient-to-br from-[#0B3B2D] to-[#135c47] rounded-3xl p-6 text-white relative overflow-hidden shadow-lg shadow-[#0B3B2D]/20 h-fit">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#D4AF37]/20 rounded-full blur-2xl"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <h3 className="font-bold">{tr('totalCommission')}</h3>
              </div>
              <p className="text-4xl font-bold font-serif mb-2">
                {earningsData?.earnings || 0} <span className="text-sm text-[#D4AF37]">{tr('currency')}</span>
              </p>
            </div>
          </div>

        </div>

        {/* سجل المعاملات */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-[#D4AF37]" />
            <h3 className="font-bold text-gray-800">{tr('transactionsLog')} ({earningsData?.transactions?.length || 0})</h3>
            <button onClick={fetchDashboardData} className="mr-auto p-2 hover:bg-gray-100 rounded-lg text-gray-400 transition">
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>

          {loading ? (
            <p className="text-center text-gray-400 py-10">Loading...</p>
          ) : earningsData?.transactions?.length > 0 ? (
            <div className="space-y-3">
              {earningsData.transactions.map((tx, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-[#F8F9FA] rounded-2xl border border-transparent hover:border-[#D4AF37]/30 transition gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0">
                      <Calendar className="w-5 h-5 text-[#0B3B2D]" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">{tx.patient_label}</p>
                      <p className="text-xs text-gray-500">{tx.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                     <div className="text-left">
                        <p className="text-[10px] text-gray-400">{tr('total')}</p>
                        <p className="font-semibold text-gray-700">{tx.total_amount}</p>
                     </div>
                     <div className="text-left">
                        <p className="text-[10px] text-gray-400">{tr('discountLabel')}</p>
                        <p className="font-semibold text-red-500">{tx.discount}</p>
                     </div>
                     <div className="text-left">
                        <p className="text-[10px] text-gray-400">{tr('commissionLabel')}</p>
                        <p className="font-bold text-green-600">+{tx.user_commission}</p>
                     </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
             <p className="text-center text-gray-400 py-10">{tr('noTransactions')}</p>
          )}
        </div>

      </main>
    </div>
  );
}