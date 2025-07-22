import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, User, Car, Shield, Info, Save, Trash2 } from 'lucide-react'
import { useAuth } from '../AuthContext'

const Settings = () => {
  const { user, setUser } = useAuth();
  const [userInfo, setUserInfo] = useState({
    name: '',
    phone: '',
    email: '',
    carModel: '',
    carYear: '',
    plateNumber: '',
    insuranceCompany: '',
    policyNumber: ''
  })

  useEffect(() => {
    if (user) {
      setUserInfo({
        name: user.name || '',
        phone: user.phone || '',
        email: user.email || '',
        carModel: user.carModel || '',
        carYear: user.carYear || '',
        plateNumber: user.plateNumber || '',
        insuranceCompany: user.insuranceCompany || '',
        policyNumber: user.policyNumber || ''
      });
    } else {
      // fallback to localStorage if needed
      const stored = localStorage.getItem('authUser');
      if (stored) {
        const u = JSON.parse(stored);
        setUserInfo({
          name: u.name || '',
          phone: u.phone || '',
          email: u.email || '',
          carModel: u.carModel || '',
          carYear: u.carYear || '',
          plateNumber: u.plateNumber || '',
          insuranceCompany: u.insuranceCompany || '',
          policyNumber: u.policyNumber || ''
        });
      }
    }
  }, [user]);

  const handleInputChange = (field, value) => {
    setUserInfo(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const saveSettings = () => {
    // Update AuthContext and localStorage
    const updatedUser = { ...user, ...userInfo };
    setUser(updatedUser);
    localStorage.setItem('authUser', JSON.stringify(updatedUser));
    localStorage.setItem('registeredUser', JSON.stringify(updatedUser));
    alert('تم حفظ الإعدادات بنجاح')
  }

  const clearAllData = () => {
    if (confirm('هل تريد حذف جميع البيانات؟ لا يمكن التراجع عن هذا الإجراء.')) {
      localStorage.clear()
      setUserInfo({
        name: '',
        phone: '',
        email: '',
        carModel: '',
        carYear: '',
        plateNumber: '',
        insuranceCompany: '',
        policyNumber: ''
      })
      setUser(null);
      alert('تم حذف جميع البيانات')
    }
  }

  const insuranceCompanies = [
    { value: 'misr', label: 'مصر للتأمين' },
    { value: 'allianz', label: 'أليانز مصر' },
    { value: 'axa', label: 'أكسا مصر' },
    { value: 'gig', label: 'الخليج للتأمين' },
    { value: 'mohandes', label: 'المهندس للتأمين' },
    { value: 'other', label: 'أخرى' }
  ]

  return (
    <div className="container">
      {/* Header */}
      <header className="card mb-2" style={{ background: 'linear-gradient(90deg, #2563eb0d 0%, #f4f8ff 100%)', boxShadow: 'none', marginBottom: '2rem' }}>
        <div className="flex flex-between gap-2 mb-2">
          <Link to="/">
            <ArrowRight size={24} />
          </Link>
          <h1 className="text-xl" style={{ fontWeight: 800 }}>الإعدادات</h1>
          <div style={{ width: 24 }}></div>
        </div>
      </header>

      <div style={{ maxWidth: 600, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Personal Information */}
        <div className="card">
          <div className="flex items-center gap-2 mb-2" style={{ color: '#2563eb', fontWeight: 700 }}>
            <User size={20} />
            المعلومات الشخصية
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label htmlFor="name" style={{ fontWeight: 700, color: '#64748b', marginBottom: 4, display: 'block' }}>الاسم الكامل</label>
              <input
                id="name"
                className="input"
                placeholder="أدخل اسمك الكامل"
                value={userInfo.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                style={{ marginBottom: 0 }}
              />
            </div>
            <div>
              <label htmlFor="phone" style={{ fontWeight: 700, color: '#64748b', marginBottom: 4, display: 'block' }}>رقم الهاتف</label>
              <input
                id="phone"
                className="input"
                placeholder="01xxxxxxxxx"
                value={userInfo.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                style={{ marginBottom: 0 }}
              />
            </div>
            <div>
              <label htmlFor="email" style={{ fontWeight: 700, color: '#64748b', marginBottom: 4, display: 'block' }}>البريد الإلكتروني</label>
              <input
                id="email"
                className="input"
                type="email"
                placeholder="example@email.com"
                value={userInfo.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                style={{ marginBottom: 0 }}
              />
            </div>
          </div>
        </div>

        {/* Car Information */}
        <div className="card">
          <div className="flex items-center gap-2 mb-2" style={{ color: '#2563eb', fontWeight: 700 }}>
            <Car size={20} />
            معلومات السيارة
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label htmlFor="carModel" style={{ fontWeight: 700, color: '#64748b', marginBottom: 4, display: 'block' }}>موديل السيارة</label>
              <input
                id="carModel"
                className="input"
                placeholder="مثال: تويوتا كورولا"
                value={userInfo.carModel}
                onChange={(e) => handleInputChange('carModel', e.target.value)}
                style={{ marginBottom: 0 }}
              />
            </div>
            <div>
              <label htmlFor="carYear" style={{ fontWeight: 700, color: '#64748b', marginBottom: 4, display: 'block' }}>سنة الصنع</label>
              <input
                id="carYear"
                className="input"
                placeholder="مثال: 2020"
                value={userInfo.carYear}
                onChange={(e) => handleInputChange('carYear', e.target.value)}
                style={{ marginBottom: 0 }}
              />
            </div>
            <div>
              <label htmlFor="plateNumber" style={{ fontWeight: 700, color: '#64748b', marginBottom: 4, display: 'block' }}>رقم اللوحة</label>
              <input
                id="plateNumber"
                className="input"
                placeholder="مثال: أ ب ج 123"
                value={userInfo.plateNumber}
                onChange={(e) => handleInputChange('plateNumber', e.target.value)}
                style={{ marginBottom: 0 }}
              />
            </div>
          </div>
        </div>

        {/* Insurance Information */}
        <div className="card">
          <div className="flex items-center gap-2 mb-2" style={{ color: '#2563eb', fontWeight: 700 }}>
            <Shield size={20} />
            معلومات التأمين
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label htmlFor="insuranceCompany" style={{ fontWeight: 700, color: '#64748b', marginBottom: 4, display: 'block' }}>شركة التأمين</label>
              <select
                id="insuranceCompany"
                className="input"
                value={userInfo.insuranceCompany}
                onChange={(e) => handleInputChange('insuranceCompany', e.target.value)}
                style={{ marginBottom: 0 }}
              >
                <option value="">اختر شركة التأمين</option>
                {insuranceCompanies.map((company) => (
                  <option key={company.value} value={company.value}>{company.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="policyNumber" style={{ fontWeight: 700, color: '#64748b', marginBottom: 4, display: 'block' }}>رقم الوثيقة</label>
              <input
                id="policyNumber"
                className="input"
                placeholder="رقم وثيقة التأمين"
                value={userInfo.policyNumber}
                onChange={(e) => handleInputChange('policyNumber', e.target.value)}
                style={{ marginBottom: 0 }}
              />
            </div>
          </div>
        </div>

        {/* App Information */}
        <div className="card">
          <div className="flex items-center gap-2 mb-2" style={{ color: '#2563eb', fontWeight: 700 }}>
            <Info size={20} />
            معلومات التطبيق
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div className="flex flex-between items-center">
              <span style={{ color: '#64748b', fontSize: '0.98rem' }}>إصدار التطبيق</span>
              <span style={{ fontWeight: 700 }}>1.0.0</span>
            </div>
            <div className="flex flex-between items-center">
              <span style={{ color: '#64748b', fontSize: '0.98rem' }}>آخر تحديث</span>
              <span style={{ fontWeight: 700 }}>يوليو 2025</span>
            </div>
            <div className="flex flex-between items-center">
              <span style={{ color: '#64748b', fontSize: '0.98rem' }}>المطور</span>
              <span style={{ fontWeight: 700 }}>CrashScan</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button onClick={saveSettings} className="btn btn-accent main-action-btn w-full" style={{ background: 'var(--accent)', color: '#fff' }}>
            <Save size={20} style={{ marginLeft: 8 }} />
            حفظ الإعدادات
          </button>
          <button
            onClick={clearAllData}
            className="btn main-action-btn w-full"
            style={{ background: '#fee2e2', color: '#b91c1c', border: '1.5px solid #fecaca' }}
          >
            <Trash2 size={20} style={{ marginLeft: 8 }} />
            حذف جميع البيانات
          </button>
        </div>

        {/* Privacy Notice */}
        <div className="card" style={{ background: '#e0e7ff', border: '1.5px solid #bae6fd' }}>
          <p style={{ fontSize: '0.98rem', color: '#2563eb', fontWeight: 700 }}>
            <strong>ملاحظة الخصوصية:</strong> جميع البيانات محفوظة محلياً على جهازك ولا يتم إرسالها لأي خوادم خارجية.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Settings

