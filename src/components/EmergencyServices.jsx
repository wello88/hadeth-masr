import { Link } from 'react-router-dom'
import { ArrowRight, Phone, Shield, Truck, Flame, MapPin, Clock } from 'lucide-react'

const EmergencyServices = () => {
  const emergencyNumbers = [
    {
      name: 'الشرطة',
      number: '122',
      icon: Shield,
      color: 'var(--primary)',
      description: 'للإبلاغ عن الحوادث والطوارئ الأمنية'
    },
    {
      name: 'الإسعاف',
      number: '123',
      icon: Phone,
      color: 'var(--danger)',
      description: 'للحالات الطبية الطارئة والإصابات'
    },
    {
      name: 'المطافئ',
      number: '180',
      icon: Flame,
      color: 'var(--secondary)',
      description: 'للحرائق والحوادث الخطيرة'
    },
    {
      name: 'المساعدة على الطريق',
      number: '01221110000',
      icon: Truck,
      color: 'var(--accent)',
      description: 'لأعطال السيارات والمساعدة المرورية'
    }
  ]

  const handleCall = (number) => {
    if (confirm(`هل تريد الاتصال بـ ${number}؟`)) {
      window.location.href = `tel:${number}`
    }
  }

  return (
    <div className="container">
      {/* Header */}
      <header className="card mb-2" style={{ background: 'linear-gradient(90deg, #dc26260d 0%, #f4f8ff 100%)', boxShadow: 'none', marginBottom: '2rem' }}>
        <div className="flex flex-between gap-2 mb-2">
          <Link to="/">
            <ArrowRight size={24} />
          </Link>
          <h1 className="text-xl" style={{ fontWeight: 800 }}>خدمات الطوارئ</h1>
          <div style={{ width: 24 }}></div>
        </div>
      </header>

      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        {/* Warning Card */}
        <div className="card" style={{ background: '#fee2e2', border: '1.5px solid #fecaca', marginBottom: 24 }}>
          <div className="flex gap-2 mb-2" style={{ alignItems: 'center' }}>
            <div style={{ background: '#fee2e2', padding: 8, borderRadius: '50%' }}>
              <Clock size={20} style={{ color: 'var(--danger)' }} />
            </div>
            <div>
              <h3 style={{ fontWeight: 700, color: '#b91c1c' }}>تنبيه مهم</h3>
              <p style={{ fontSize: '0.98rem', color: '#b91c1c' }}>
                استخدم هذه الأرقام في حالات الطوارئ الحقيقية فقط
              </p>
            </div>
          </div>
        </div>

        {/* Emergency Numbers */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {emergencyNumbers.map((service, index) => {
            const IconComponent = service.icon
            return (
              <div key={index} className="card" style={{ overflow: 'hidden', marginBottom: 0 }}>
                <div className="flex gap-2" style={{ alignItems: 'center' }}>
                  <div style={{ background: '#f1f5fa', padding: 12, borderRadius: '50%' }}>
                    <IconComponent size={20} style={{ color: '#64748b' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontWeight: 700, color: '#1e293b', marginBottom: 2 }}>{service.name}</h3>
                    <p style={{ fontWeight: 800, color: '#2563eb', fontSize: '1.3rem', marginBottom: 2 }}>{service.number}</p>
                    <p style={{ fontSize: '0.98rem', color: '#64748b' }}>{service.description}</p>
                  </div>
                  <button
                    className="btn main-action-btn"
                    style={{ background: service.color, color: '#fff', minWidth: 80, height: 48, fontSize: '1.1rem', borderRadius: 10 }}
                    onClick={() => handleCall(service.number)}
                  >
                    <Phone size={20} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Additional Information */}
        <div className="card" style={{ marginTop: 32 }}>
          <div className="flex items-center gap-2 mb-2" style={{ color: '#2563eb', fontWeight: 700 }}>
            <MapPin size={20} />
            معلومات إضافية
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <h4 style={{ fontWeight: 700, color: '#1e293b', marginBottom: 6 }}>عند الاتصال بالطوارئ:</h4>
              <ul style={{ fontSize: '0.98rem', color: '#64748b', paddingRight: 16, margin: 0 }}>
                <li>• اذكر موقعك بوضوح</li>
                <li>• وصف الحالة بدقة</li>
                <li>• ابق هادئاً واتبع التعليمات</li>
                <li>• لا تنهِ المكالمة حتى يطلب منك ذلك</li>
              </ul>
            </div>
            <div>
              <h4 style={{ fontWeight: 700, color: '#1e293b', marginBottom: 6 }}>في حالة حادث مروري:</h4>
              <ul style={{ fontSize: '0.98rem', color: '#64748b', paddingRight: 16, margin: 0 }}>
                <li>• تأكد من سلامتك أولاً</li>
                <li>• انقل السيارة لمكان آمن إن أمكن</li>
                <li>• شغل الإشارات التحذيرية</li>
                <li>• لا تترك موقع الحادث</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quick Report Button */}
        <Link to="/report">
          <button className="btn btn-accent main-action-btn w-full mt-6" style={{ background: 'var(--primary)', color: '#fff' }}>
            الإبلاغ عن الحادث الآن
          </button>
        </Link>
      </div>
    </div>
  )
}

export default EmergencyServices

