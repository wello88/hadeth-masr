import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AlertTriangle, Phone, History, Settings as SettingsIcon, Car, MapPin, Brain, Zap, Shield, Activity } from 'lucide-react'

const HomePage = () => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [sensorData, setSensorData] = useState({
    accelerometer: { x: 0, y: 0, z: 0 },
    gyroscope: { x: 0, y: 0, z: 0 },
    isMonitoring: false
  })

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    const sensorTimer = setInterval(() => {
      if (sensorData.isMonitoring) {
        setSensorData(prev => ({
          ...prev,
          accelerometer: {
            x: (Math.random() - 0.5) * 2,
            y: (Math.random() - 0.5) * 2,
            z: 9.8 + (Math.random() - 0.5) * 0.5
          },
          gyroscope: {
            x: (Math.random() - 0.5) * 0.1,
            y: (Math.random() - 0.5) * 0.1,
            z: (Math.random() - 0.5) * 0.1
          }
        }))
      }
    }, 100)
    return () => {
      clearInterval(timer)
      clearInterval(sensorTimer)
    }
  }, [sensorData.isMonitoring])

  const toggleMonitoring = () => {
    setSensorData(prev => ({
      ...prev,
      isMonitoring: !prev.isMonitoring
    }))
  }

  return (
    <div className="container">
      {/* Modern Navigation Bar */}
      <nav style={{
        width: '100%',
        background: 'rgba(255,255,255,0.85)',
        boxShadow: '0 2px 12px rgba(30,41,59,0.04)',
        borderRadius: '16px',
        margin: '0 auto 2rem auto',
        padding: '0.5rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Removed logo icon */}
          <span style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '1.15rem' }}>CrashScan</span>
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', fontWeight: 700, fontSize: '1.05rem' }}>
          <Link to="/" style={{ color: 'var(--primary-dark)', textDecoration: 'none', borderBottom: window.location.pathname === '/' ? '2.5px solid var(--primary)' : 'none', paddingBottom: 2 }}>الرئيسية</Link>
          <Link to="/report" style={{ color: 'var(--primary-dark)', textDecoration: 'none', borderBottom: window.location.pathname.startsWith('/report') ? '2.5px solid var(--primary)' : 'none', paddingBottom: 2 }}>الإبلاغ عن حادث</Link>
          <Link to="/emergency" style={{ color: 'var(--primary-dark)', textDecoration: 'none', borderBottom: window.location.pathname.startsWith('/emergency') ? '2.5px solid var(--primary)' : 'none', paddingBottom: 2 }}>خدمات الطوارئ</Link>
          <Link to="/history" style={{ color: 'var(--primary-dark)', textDecoration: 'none', borderBottom: window.location.pathname.startsWith('/history') ? '2.5px solid var(--primary)' : 'none', paddingBottom: 2 }}>سجل الحوادث</Link>
          <Link to="/settings" style={{ color: 'var(--primary-dark)', textDecoration: 'none', borderBottom: window.location.pathname.startsWith('/settings') ? '2.5px solid var(--primary)' : 'none', paddingBottom: 2 }}>الإعدادات</Link>
        </div>
      </nav>
      {/* Hero Section */}
      <header style={{ background: 'none', boxShadow: 'none', padding: 0, marginBottom: '2rem' }}>
        <div style={{
          position: 'relative',
          borderRadius: '24px',
          overflow: 'hidden',
          minHeight: 220,
          maxHeight: 340,
          width: '100%',
          boxShadow: '0 8px 32px rgba(37,99,235,0.13)',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(90deg, #2563eb0d 0%, #f4f8ff 100%)'
        }}>
          <img
            src="/image-car-accident-that-occurred-600nw-2463381917.jpg"
            alt="CrashScan Hero"
            style={{
              width: '100%',
              height: 'clamp(180px, 32vw, 340px)',
              objectFit: 'cover',
              opacity: 0.85,
              display: 'block',
              borderRadius: '24px',
              margin: 0
            }}
          />
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, #2563eb55 0%, #f4f8ffcc 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#1e293b',
            textAlign: 'center',
            padding: '2rem',
            zIndex: 2
          }}>
            <h1 style={{ fontWeight: 800, fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', marginBottom: 10, textShadow: '0 2px 8px #fff8' }}>CrashScan | Accident Detector</h1>
            <p style={{ fontSize: 'clamp(1rem, 2vw, 1.3rem)', color: '#2563eb', fontWeight: 700, marginBottom: 0, textShadow: '0 1px 6px #fff8' }}>
              نظام ذكي للكشف التلقائي عن الحوادث
            </p>
          </div>
        </div>
      </header>

      {/* System Status */}
      <section className="card">
        <h2 className="flex items-center gap-2 mb-2" style={{ fontWeight: 700 }}>
          <Activity size={20} /> حالة النظام الذكي
        </h2>
        <div className="flex gap-2" style={{ flexWrap: 'wrap' }}>
          <div style={{ minWidth: 220, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'stretch', paddingTop: '1.5rem' }}>
            <div className="flex-between mb-3" style={{ marginBottom: '1.5rem' }}>
              <span className="text-muted">حالة المراقبة:</span>
              <span className={sensorData.isMonitoring ? 'text-success' : 'text-danger'} style={{ fontWeight: 700 }}>
                {sensorData.isMonitoring ? 'نشط' : 'متوقف'}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              <button
                className={`btn ${sensorData.isMonitoring ? 'btn-danger' : 'btn-accent'}`}
                onClick={toggleMonitoring}
                style={{ marginTop: '1.2rem', paddingTop: '1rem', paddingBottom: '1rem', fontSize: '1.1rem', minWidth: '180px' }}
              >
                {sensorData.isMonitoring ? 'إيقاف المراقبة' : 'بدء المراقبة'}
              </button>
            </div>
          </div>
          <div style={{ minWidth: 260, flex: 1 }}>
            <div className="card" style={{ background: 'linear-gradient(90deg, #e0e7ff 0%, #f4f8ff 100%)', boxShadow: '0 2px 12px #2563eb22', border: 'none', marginBottom: 0, padding: '1.2rem 1rem' }}>
              <h4 className="mb-2 flex items-center gap-1" style={{ fontWeight: 700, color: '#2563eb', fontSize: '1.08rem' }}>
                <Activity size={18} style={{ color: '#2563eb' }} /> بيانات المستشعرات
              </h4>
              <div style={{ display: 'flex', gap: '1.2rem', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                  <span style={{ display: 'block', color: '#64748b', fontWeight: 600, fontSize: '0.98rem' }}>X</span>
                  <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#2563eb', fontSize: '1.1rem' }}>{sensorData.accelerometer.x.toFixed(2)}</span>
                  <span style={{ display: 'block', color: '#64748b', fontSize: '0.85rem' }}>m/s²</span>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <span style={{ display: 'block', color: '#64748b', fontWeight: 600, fontSize: '0.98rem' }}>Y</span>
                  <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#10b981', fontSize: '1.1rem' }}>{sensorData.accelerometer.y.toFixed(2)}</span>
                  <span style={{ display: 'block', color: '#64748b', fontSize: '0.85rem' }}>m/s²</span>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <span style={{ display: 'block', color: '#64748b', fontWeight: 600, fontSize: '0.98rem' }}>Z</span>
                  <span style={{ fontFamily: 'monospace', fontWeight: 700, color: '#f59e42', fontSize: '1.1rem' }}>{sensorData.accelerometer.z.toFixed(2)}</span>
                  <span style={{ display: 'block', color: '#64748b', fontSize: '0.85rem' }}>m/s²</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="centered-row">
        <div className="card feature-card">
          <Zap size={48} style={{ color: '#f59e42' }} />
          <h3 style={{ fontWeight: 700 }}>الكشف التلقائي</h3>
          <p className="text-muted">استخدام مستشعرات الهاتف للكشف عن الحوادث فوراً</p>
        </div>
        <div className="card feature-card">
          <Shield size={48} style={{ color: '#10b981' }} />
          <h3 style={{ fontWeight: 700 }}>الاستجابة السريعة</h3>
          <p className="text-muted">إرسال إشارة استغاثة تلقائية للجهات المختصة</p>
        </div>
        <div className="card feature-card">
          <Brain size={48} style={{ color: '#a78bfa' }} />
          <h3 style={{ fontWeight: 700 }}>الذكاء الاصطناعي</h3>
          <p className="text-muted">تمييز الحوادث الحقيقية من الأنشطة اليومية</p>
        </div>
      </section>

      {/* Main Actions */}
      <section className="main-action-cards">
        <Link to="/report">
          <button className="btn btn-danger main-action-btn flex flex-center gap-2">
            <AlertTriangle size={24} /> محاكاة كشف حادث
          </button>
        </Link>
        <Link to="/emergency">
          <button className="btn btn-accent main-action-btn flex flex-center gap-2" style={{ background: 'var(--secondary)', color: '#fff' }}>
            <Phone size={24} /> خدمات الطوارئ
          </button>
        </Link>
      </section>

      {/* Project Objectives */}
      <section className="card">
        <h2 className="mb-2" style={{ fontWeight: 700 }}>الأهداف الرئيسية للمشروع</h2>
        <div className="flex gap-2" style={{ flexWrap: 'wrap' }}>
          <div className="card flex-1" style={{ background: '#e0f2fe', boxShadow: 'none' }}>
            <h4 className="mb-1" style={{ color: '#2563eb', fontWeight: 700 }}>الإنقاذ السريع</h4>
            <p className="text-muted">تقليل زمن وصول الإسعاف من خلال التبليغ التلقائي</p>
          </div>
          <div className="card flex-1" style={{ background: '#e0f2fe', boxShadow: 'none' }}>
            <h4 className="mb-1" style={{ color: '#2563eb', fontWeight: 700 }}>التنبيه الذكي</h4>
            <p className="text-muted">استخدام الذكاء الاصطناعي للتمييز بين الحوادث الحقيقية والأنشطة اليومية</p>
          </div>
          <div className="card flex-1" style={{ background: '#e0f2fe', boxShadow: 'none' }}>
            <h4 className="mb-1" style={{ color: '#2563eb', fontWeight: 700 }}>التكامل الطبي</h4>
            <p className="text-muted">ربط التطبيق بقواعد بيانات المستشفيات ومراكز الطوارئ</p>
          </div>
          <div className="card flex-1" style={{ background: '#e0f2fe', boxShadow: 'none' }}>
            <h4 className="mb-1" style={{ color: '#2563eb', fontWeight: 700 }}>دراسة الجدوى</h4>
            <p className="text-muted">تحليل التكلفة مقابل الفائدة لتنفيذ النظام على نطاق واسع</p>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="card">
        <h2 className="mb-2" style={{ fontWeight: 700 }}>إحصائيات مهمة</h2>
        <div className="flex gap-2" style={{ flexWrap: 'wrap' }}>
          <div className="card flex-1 text-center" style={{ background: '#dcfce7', boxShadow: 'none' }}>
            <h3 className="text-2xl" style={{ color: '#10b981', fontWeight: 800 }}>60%</h3>
            <p className="text-muted">من الأرواح يمكن إنقاذها بالاستجابة السريعة</p>
          </div>
          <div className="card flex-1 text-center" style={{ background: '#dbeafe', boxShadow: 'none' }}>
            <h3 className="text-2xl" style={{ color: '#2563eb', fontWeight: 800 }}>3-5 دقائق</h3>
            <p className="text-muted">الوقت الحرج للاستجابة الطبية</p>
          </div>
          <div className="card flex-1 text-center" style={{ background: '#ede9fe', boxShadow: 'none' }}>
            <h3 className="text-2xl" style={{ color: '#a78bfa', fontWeight: 800 }}>95%</h3>
            <p className="text-muted">دقة الكشف المتوقعة للنظام الذكي</p>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="flex gap-2 mb-2" style={{ flexWrap: 'wrap' }}>
        <Link to="/history" className="flex-1">
          <button className="btn w-full h-16 flex flex-col flex-center">
            <History size={20} className="mb-1" />
            <span className="text-xs">سجل الحوادث</span>
          </button>
        </Link>
        <Link to="/settings" className="flex-1">
          <button className="btn w-full h-16 flex flex-col flex-center">
            <SettingsIcon size={20} className="mb-1" />
            <span className="text-xs">الإعدادات</span>
          </button>
        </Link>
        <button className="btn w-full h-16 flex flex-col flex-center flex-1">
          <MapPin size={20} className="mb-1" />
          <span className="text-xs">الخرائط الذكية</span>
        </button>
        <button className="btn w-full h-16 flex flex-col flex-center flex-1">
          <Car size={20} className="mb-1" />
          <span className="text-xs">تحليل القيادة</span>
        </button>
      </section>

      {/* Current Time */}
      <section className="card" style={{ background: 'linear-gradient(90deg, #2563eb 0%, #a78bfa 100%)', color: '#fff' }}>
        <div className="text-center">
          <p className="mb-1" style={{ opacity: 0.9 }}>
            {currentTime.toLocaleDateString('ar-EG', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
          <p className="text-2xl" style={{ fontWeight: 800 }}>
            {currentTime.toLocaleTimeString('ar-EG', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            })}
          </p>
        </div>
      </section>
    </div>
  )
}

export default HomePage

