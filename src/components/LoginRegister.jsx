import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const initialFields = {
  email: '',
  password: '',
  name: '',
  phone: '',
  carModel: '',
  carYear: '',
  plateNumber: '',
  insuranceCompany: '',
  policyNumber: '',
  location: null,
};

const insuranceCompanies = [
  { value: 'misr', label: 'مصر للتأمين' },
  { value: 'allianz', label: 'أليانز مصر' },
  { value: 'axa', label: 'أكسا مصر' },
  { value: 'gig', label: 'الخليج للتأمين' },
  { value: 'mohandes', label: 'المهندس للتأمين' },
  { value: 'other', label: 'أخرى' }
];

const LoginRegister = () => {
  const { login, register, isAuthenticated } = useAuth();
  const [fields, setFields] = useState(initialFields);
  const [error, setError] = useState('');
  const [step, setStep] = useState(localStorage.getItem('registeredUser') ? 'login' : 'register');
  const [locationStatus, setLocationStatus] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!fields.email || !fields.password) {
      setError('يرجى إدخال البريد الإلكتروني وكلمة المرور');
      return;
    }
    const ok = login(fields.email, fields.password);
    if (!ok) setError('بيانات الدخول غير صحيحة');
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!fields.email || !fields.password || !fields.name || !fields.phone || !fields.carModel || !fields.carYear || !fields.plateNumber) {
      setError('يرجى ملء جميع الحقول المطلوبة');
      return;
    }
    // Prompt for location
    if (navigator.geolocation) {
      setLocationStatus('جاري تحديد الموقع...');
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = `${pos.coords.latitude},${pos.coords.longitude}`;
          const userData = { ...fields, location: coords };
          register(userData);
          setLocationStatus('تم حفظ الموقع بنجاح!');
        },
        (err) => {
          register({ ...fields, location: null });
          setLocationStatus('لم يتم السماح بالموقع. تم التسجيل بدون موقع.');
        }
      );
    } else {
      register({ ...fields, location: null });
      setLocationStatus('المتصفح لا يدعم تحديد الموقع. تم التسجيل بدون موقع.');
    }
  };

  return (
    <div className="container" style={{ maxWidth: 480, margin: '3rem auto', minHeight: 500, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div className="card" style={{ margin: 0 }}>
        <h2 style={{ fontWeight: 800, color: 'var(--primary)', marginBottom: 16, textAlign: 'center' }}>
          {step === 'login' ? 'تسجيل الدخول' : 'تسجيل حساب جديد'}
        </h2>
        {error && <div className="alert alert-danger" style={{ marginBottom: 16 }}>{error}</div>}
        {step === 'login' ? (
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <label style={{ fontWeight: 700, color: '#64748b' }}>البريد الإلكتروني</label>
            <input name="email" type="email" className="input" value={fields.email} onChange={handleChange} />
            <label style={{ fontWeight: 700, color: '#64748b' }}>كلمة المرور</label>
            <input name="password" type="password" className="input" value={fields.password} onChange={handleChange} />
            <button className="btn btn-accent main-action-btn w-full" style={{ background: 'var(--primary)', color: '#fff' }}>دخول</button>
            <div style={{ textAlign: 'center', marginTop: 8 }}>
              <span>ليس لديك حساب؟ </span>
              <button type="button" style={{ color: 'var(--primary)', background: 'none', border: 'none', fontWeight: 700, cursor: 'pointer' }} onClick={() => { setStep('register'); setError(''); }}>سجل الآن</button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <label style={{ fontWeight: 700, color: '#64748b' }}>البريد الإلكتروني</label>
            <input name="email" type="email" className="input" value={fields.email} onChange={handleChange} />
            <label style={{ fontWeight: 700, color: '#64748b' }}>كلمة المرور</label>
            <input name="password" type="password" className="input" value={fields.password} onChange={handleChange} />
            <label style={{ fontWeight: 700, color: '#64748b' }}>الاسم الكامل</label>
            <input name="name" className="input" value={fields.name} onChange={handleChange} />
            <label style={{ fontWeight: 700, color: '#64748b' }}>رقم الهاتف</label>
            <input name="phone" className="input" value={fields.phone} onChange={handleChange} />
            <label style={{ fontWeight: 700, color: '#64748b' }}>موديل السيارة</label>
            <input name="carModel" className="input" value={fields.carModel} onChange={handleChange} />
            <label style={{ fontWeight: 700, color: '#64748b' }}>سنة الصنع</label>
            <input name="carYear" className="input" value={fields.carYear} onChange={handleChange} />
            <label style={{ fontWeight: 700, color: '#64748b' }}>رقم اللوحة</label>
            <input name="plateNumber" className="input" value={fields.plateNumber} onChange={handleChange} />
            <label style={{ fontWeight: 700, color: '#64748b' }}>شركة التأمين</label>
            <select name="insuranceCompany" className="input" value={fields.insuranceCompany} onChange={handleChange}>
              <option value="">اختر شركة التأمين</option>
              {insuranceCompanies.map((company) => (
                <option key={company.value} value={company.value}>{company.label}</option>
              ))}
            </select>
            <label style={{ fontWeight: 700, color: '#64748b' }}>رقم الوثيقة</label>
            <input name="policyNumber" className="input" value={fields.policyNumber} onChange={handleChange} />
            <button className="btn btn-accent main-action-btn w-full" style={{ background: 'var(--primary)', color: '#fff' }}>تسجيل</button>
            <div style={{ textAlign: 'center', marginTop: 8 }}>
              <span>لديك حساب بالفعل؟ </span>
              <button type="button" style={{ color: 'var(--primary)', background: 'none', border: 'none', fontWeight: 700, cursor: 'pointer' }} onClick={() => { setStep('login'); setError(''); }}>دخول</button>
            </div>
            {locationStatus && <div className="alert" style={{ marginTop: 8 }}>{locationStatus}</div>}
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginRegister; 