import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Calendar, MapPin, FileText, Share2, Trash2, AlertTriangle } from 'lucide-react'

const AccidentHistory = () => {
  const [accidents, setAccidents] = useState([])

  useEffect(() => {
    const stored = localStorage.getItem('accidents')
    if (stored) {
      setAccidents(JSON.parse(stored))
    }
  }, [])

  const deleteAccident = (id) => {
    if (confirm('هل تريد حذف هذا التقرير؟')) {
      const updatedAccidents = accidents.filter(accident => accident.id !== id)
      setAccidents(updatedAccidents)
      localStorage.setItem('accidents', JSON.stringify(updatedAccidents))
    }
  }

  const shareAccident = (accident) => {
    const text = `تقرير حادث مروري\nالتاريخ: ${accident.date}\nالوقت: ${accident.time}\nالموقع: ${accident.location || 'غير محدد'}\nالوصف: ${accident.description || 'غير محدد'}\nالطرف الآخر: ${accident.otherParty?.name || 'غير محدد'}\nرقم الهاتف: ${accident.otherParty?.phone || 'غير محدد'}\nرقم اللوحة: ${accident.otherParty?.plateNumber || 'غير محدد'}`

    if (navigator.share) {
      navigator.share({
        title: 'تقرير حادث مروري',
        text: text
      })
    } else {
      navigator.clipboard.writeText(text).then(() => {
        alert('تم نسخ التقرير إلى الحافظة')
      })
    }
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'minor': return { background: '#dcfce7', color: '#15803d' }
      case 'moderate': return { background: '#fef9c3', color: '#b45309' }
      case 'severe': return { background: '#fee2e2', color: '#b91c1c' }
      default: return { background: '#f1f5f9', color: '#334155' }
    }
  }

  const getSeverityText = (severity) => {
    switch (severity) {
      case 'minor': return 'بسيط'
      case 'moderate': return 'متوسط'
      case 'severe': return 'شديد'
      default: return 'غير محدد'
    }
  }

  return (
    <div className="container">
      {/* Header */}
      <header className="card mb-2" style={{ background: 'linear-gradient(90deg, #2563eb0d 0%, #f4f8ff 100%)', boxShadow: 'none', marginBottom: '2rem' }}>
        <div className="flex flex-between gap-2 mb-2">
          <Link to="/">
            <ArrowRight size={24} />
          </Link>
          <h1 className="text-xl" style={{ fontWeight: 800 }}>الحوادث السابقة</h1>
          <div style={{ width: 24 }}></div>
        </div>
      </header>

      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        {accidents.length === 0 ? (
          <div className="card" style={{ textAlign: 'center' }}>
            <AlertTriangle size={48} style={{ color: '#cbd5e1', margin: '0 auto 1rem' }} />
            <h3 className="text-lg" style={{ fontWeight: 700, color: '#1e293b', marginBottom: 8 }}>
              لا توجد حوادث مسجلة
            </h3>
            <p className="text-muted" style={{ marginBottom: 16 }}>
              لم تقم بالإبلاغ عن أي حوادث بعد
            </p>
            <Link to="/report">
              <button className="btn btn-accent main-action-btn" style={{ background: 'var(--primary)', color: '#fff' }}>
                الإبلاغ عن حادث جديد
              </button>
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Summary Card */}
            <div className="card" style={{ marginBottom: 0 }}>
              <div className="flex flex-between items-center">
                <div>
                  <h3 className="text-md" style={{ fontWeight: 700, color: '#1e293b' }}>إجمالي الحوادث</h3>
                  <p className="text-2xl" style={{ fontWeight: 800, color: '#2563eb' }}>{accidents.length}</p>
                </div>
                <Calendar size={32} style={{ color: '#2563eb' }} />
              </div>
            </div>

            {/* Accidents List */}
            {accidents.map((accident) => (
              <div key={accident.id} className="card" style={{ marginBottom: 0 }}>
                <div className="flex flex-between items-start mb-2">
                  <div>
                    <h4 className="text-lg" style={{ fontWeight: 700, color: '#1e293b' }}>
                      {accident.description || 'حادث مروري'}
                    </h4>
                    <div className="flex gap-2 mt-1" style={{ fontSize: '0.98rem', color: '#64748b' }}>
                      <Calendar size={16} style={{ color: '#64748b' }} />
                      <span>
                        {new Date(accident.date).toLocaleDateString('ar-EG')} - {accident.time}
                      </span>
                    </div>
                  </div>
                  {accident.severity && (
                    <span style={{ ...getSeverityColor(accident.severity), padding: '4px 12px', borderRadius: 16, fontSize: 13, fontWeight: 700 }}>
                      {getSeverityText(accident.severity)}
                    </span>
                  )}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {accident.location && (
                    <div className="flex gap-2" style={{ color: '#64748b', fontSize: '0.98rem' }}>
                      <MapPin size={16} />
                      <span>{accident.location}</span>
                    </div>
                  )}
                  {accident.otherParty?.name && (
                    <div style={{ background: '#f1f5fa', padding: 12, borderRadius: 12 }}>
                      <h5 style={{ fontWeight: 700, color: '#1e293b', marginBottom: 4 }}>الطرف الآخر:</h5>
                      <p style={{ color: '#64748b', fontSize: '0.98rem', marginBottom: 2 }}>{accident.otherParty.name}</p>
                      {accident.otherParty.phone && (
                        <p style={{ color: '#64748b', fontSize: '0.98rem', marginBottom: 2 }}>{accident.otherParty.phone}</p>
                      )}
                      {accident.otherParty.plateNumber && (
                        <p style={{ color: '#64748b', fontSize: '0.98rem' }}>لوحة: {accident.otherParty.plateNumber}</p>
                      )}
                    </div>
                  )}
                  <div className="flex gap-2 pt-2" style={{ justifyContent: 'flex-end' }}>
                    <button
                      className="btn btn-accent"
                      style={{ background: 'var(--primary)', color: '#fff', minWidth: 120 }}
                      onClick={() => shareAccident(accident)}
                    >
                      <Share2 size={16} style={{ marginLeft: 4 }} />
                      مشاركة
                    </button>
                    <button
                      className="btn btn-danger"
                      style={{ minWidth: 48 }}
                      onClick={() => deleteAccident(accident.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add New Accident Button */}
        <Link to="/report">
          <button className="btn btn-accent main-action-btn w-full mt-6" style={{ background: 'var(--primary)', color: '#fff' }}>
            <FileText size={20} style={{ marginLeft: 8 }} />
            إضافة حادث جديد
          </button>
        </Link>
      </div>
    </div>
  )
}

export default AccidentHistory

