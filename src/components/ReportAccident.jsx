import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Brain, Zap, AlertTriangle, MapPin, Phone, Activity } from 'lucide-react'

const ReportAccident = () => {
  const navigate = useNavigate()
  const [simulationStep, setSimulationStep] = useState(0)
  const [sensorData, setSensorData] = useState({
    accelerometer: { x: 0, y: 0, z: 9.8 },
    gyroscope: { x: 0, y: 0, z: 0 },
    impact: 0,
    isDetecting: false
  })
  const [accidentDetected, setAccidentDetected] = useState(false)
  const [emergencyResponse, setEmergencyResponse] = useState({
    sent: false,
    location: 'شارع التحرير، وسط البلد، القاهرة',
    coordinates: '30.0444, 31.2357',
    nearestHospital: 'مستشفى قصر العيني',
    estimatedTime: '8 دقائق'
  })

  const simulationSteps = [
    {
      title: 'بدء المراقبة',
      description: 'تفعيل مستشعرات الهاتف لمراقبة أنماط القيادة',
      action: 'startMonitoring'
    },
    {
      title: 'محاكاة حادث',
      description: 'محاكاة اصطدام مفاجئ أو كبح عنيف',
      action: 'simulateAccident'
    },
    {
      title: 'تحليل البيانات',
      description: 'تحليل بيانات المستشعرات باستخدام الذكاء الاصطناعي',
      action: 'analyzeData'
    },
    {
      title: 'كشف الحادث',
      description: 'تأكيد وجود حادث حقيقي',
      action: 'detectAccident'
    },
    {
      title: 'إرسال الاستغاثة',
      description: 'إرسال إشارة استغاثة تلقائية للجهات المختصة',
      action: 'sendEmergency'
    }
  ]

  useEffect(() => {
    let interval
    if (sensorData.isDetecting) {
      interval = setInterval(() => {
        setSensorData(prev => ({
          ...prev,
          accelerometer: {
            x: (Math.random() - 0.5) * (simulationStep === 1 ? 20 : 2),
            y: (Math.random() - 0.5) * (simulationStep === 1 ? 15 : 2),
            z: 9.8 + (Math.random() - 0.5) * (simulationStep === 1 ? 10 : 0.5)
          },
          gyroscope: {
            x: (Math.random() - 0.5) * (simulationStep === 1 ? 5 : 0.1),
            y: (Math.random() - 0.5) * (simulationStep === 1 ? 5 : 0.1),
            z: (Math.random() - 0.5) * (simulationStep === 1 ? 5 : 0.1)
          },
          impact: simulationStep === 1 ? Math.random() * 100 : Math.random() * 10
        }))
      }, 100)
    }
    return () => clearInterval(interval)
  }, [sensorData.isDetecting, simulationStep])

  const executeStep = () => {
    const currentStep = simulationSteps[simulationStep]
    switch (currentStep.action) {
      case 'startMonitoring':
        setSensorData(prev => ({ ...prev, isDetecting: true }))
        break
      case 'simulateAccident':
        break
      case 'analyzeData':
        break
      case 'detectAccident':
        setAccidentDetected(true)
        break
      case 'sendEmergency':
        setEmergencyResponse(prev => ({ ...prev, sent: true }))
        break
    }
    if (simulationStep < simulationSteps.length - 1) {
      setTimeout(() => setSimulationStep(simulationStep + 1), 2000)
    }
  }

  const resetSimulation = () => {
    setSimulationStep(0)
    setSensorData({
      accelerometer: { x: 0, y: 0, z: 9.8 },
      gyroscope: { x: 0, y: 0, z: 0 },
      impact: 0,
      isDetecting: false
    })
    setAccidentDetected(false)
    setEmergencyResponse(prev => ({ ...prev, sent: false }))
  }

  return (
    <div className="container">
      {/* Header */}
      <header className="card mb-2" style={{ background: 'linear-gradient(90deg, #dc26260d 0%, #f4f8ff 100%)', boxShadow: 'none', marginBottom: '2rem' }}>
        <div className="flex flex-between gap-2 mb-2">
          <Link to="/">
            <ArrowRight size={24} />
          </Link>
          <h1 className="text-xl" style={{ fontWeight: 800 }}>محاكاة النظام الذكي للكشف عن الحوادث</h1>
          <div style={{ width: 24 }}></div>
        </div>
      </header>

      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        {/* Progress Indicator */}
        <div className="card">
          <div className="flex flex-between items-center mb-4">
            <h3 className="text-md" style={{ fontWeight: 700, color: '#1e293b' }}>تقدم المحاكاة</h3>
            <span style={{ fontSize: '1rem', color: '#64748b' }}>{simulationStep + 1} من {simulationSteps.length}</span>
          </div>
          <div style={{ background: '#e0e7ff', borderRadius: 8, height: 8, marginBottom: 16, overflow: 'hidden' }}>
            <div style={{ background: 'var(--primary)', width: `${(simulationStep / (simulationSteps.length - 1)) * 100}%`, height: '100%', transition: 'width 0.4s' }}></div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <h4 style={{ fontWeight: 700, color: '#2563eb', fontSize: '1.1rem', marginBottom: 8 }}>
              {simulationSteps[simulationStep].title}
            </h4>
            <p className="text-muted" style={{ fontSize: '1rem' }}>
              {simulationSteps[simulationStep].description}
            </p>
          </div>
        </div>

        {/* Sensor Data Display & AI Analysis */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginBottom: 24 }}>
          <div className="card" style={{ flex: 1, minWidth: 280, marginBottom: 0 }}>
            <div className="flex items-center gap-2 mb-2" style={{ color: '#2563eb', fontWeight: 700 }}>
              <Activity size={20} />
              بيانات المستشعرات المباشرة
            </div>
            <div style={{ marginBottom: 12 }}>
              <h4 style={{ fontWeight: 700, color: '#1e293b', marginBottom: 6 }}>مقياس التسارع</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: '0.98rem' }}>
                <div className="flex flex-between">
                  <span>المحور X:</span>
                  <span style={{ fontFamily: 'monospace', fontWeight: 700, color: Math.abs(sensorData.accelerometer.x) > 10 ? '#b91c1c' : '#2563eb' }}>
                    {sensorData.accelerometer.x.toFixed(2)} m/s²
                  </span>
                </div>
                <div className="flex flex-between">
                  <span>المحور Y:</span>
                  <span style={{ fontFamily: 'monospace', fontWeight: 700, color: Math.abs(sensorData.accelerometer.y) > 10 ? '#b91c1c' : '#10b981' }}>
                    {sensorData.accelerometer.y.toFixed(2)} m/s²
                  </span>
                </div>
                <div className="flex flex-between">
                  <span>المحور Z:</span>
                  <span style={{ fontFamily: 'monospace', fontWeight: 700, color: Math.abs(sensorData.accelerometer.z - 9.8) > 5 ? '#b91c1c' : '#f59e42' }}>
                    {sensorData.accelerometer.z.toFixed(2)} m/s²
                  </span>
                </div>
              </div>
            </div>
            <div>
              <h4 style={{ fontWeight: 700, color: '#1e293b', marginBottom: 6 }}>الجيروسكوب</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: '0.98rem' }}>
                <div className="flex flex-between">
                  <span>الدوران X:</span>
                  <span style={{ fontFamily: 'monospace', fontWeight: 700, color: Math.abs(sensorData.gyroscope.x) > 2 ? '#b91c1c' : '#2563eb' }}>
                    {sensorData.gyroscope.x.toFixed(3)} rad/s
                  </span>
                </div>
                <div className="flex flex-between">
                  <span>الدوران Y:</span>
                  <span style={{ fontFamily: 'monospace', fontWeight: 700, color: Math.abs(sensorData.gyroscope.y) > 2 ? '#b91c1c' : '#10b981' }}>
                    {sensorData.gyroscope.y.toFixed(3)} rad/s
                  </span>
                </div>
                <div className="flex flex-between">
                  <span>الدوران Z:</span>
                  <span style={{ fontFamily: 'monospace', fontWeight: 700, color: Math.abs(sensorData.gyroscope.z) > 2 ? '#b91c1c' : '#f59e42' }}>
                    {sensorData.gyroscope.z.toFixed(3)} rad/s
                  </span>
                </div>
              </div>
            </div>
            <div style={{ borderTop: '1px solid #e2e8f0', marginTop: 12, paddingTop: 12 }}>
              <div className="flex flex-between items-center">
                <span style={{ fontWeight: 700, color: '#1e293b' }}>مؤشر الخطر:</span>
                <span style={{ fontWeight: 800, fontSize: '1.1rem', color: sensorData.impact > 50 ? '#b91c1c' : sensorData.impact > 20 ? '#f59e42' : '#10b981' }}>
                  {sensorData.impact.toFixed(0)}%
                </span>
              </div>
              <div style={{ background: '#e0e7ff', borderRadius: 8, height: 8, marginTop: 8, overflow: 'hidden' }}>
                <div style={{ background: sensorData.impact > 50 ? '#b91c1c' : sensorData.impact > 20 ? '#f59e42' : '#10b981', width: `${sensorData.impact}%`, height: '100%', transition: 'width 0.4s' }}></div>
              </div>
            </div>
          </div>
          <div className="card" style={{ flex: 1, minWidth: 280, marginBottom: 0 }}>
            <div className="flex items-center gap-2 mb-2" style={{ color: '#a78bfa', fontWeight: 700 }}>
              <Brain size={20} />
              تحليل الذكاء الاصطناعي
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div className="flex flex-between items-center">
                <span style={{ color: '#64748b', fontSize: '0.98rem' }}>حالة النظام:</span>
                <span style={{ fontWeight: 700, color: sensorData.isDetecting ? '#10b981' : '#64748b' }}>
                  {sensorData.isDetecting ? 'نشط' : 'متوقف'}
                </span>
              </div>
              <div className="flex flex-between items-center">
                <span style={{ color: '#64748b', fontSize: '0.98rem' }}>نوع الحدث المتوقع:</span>
                <span style={{ fontWeight: 500 }}>
                  {sensorData.impact > 50 ? 'اصطدام مفاجئ' : sensorData.impact > 20 ? 'كبح عنيف' : 'قيادة طبيعية'}
                </span>
              </div>
              <div className="flex flex-between items-center">
                <span style={{ color: '#64748b', fontSize: '0.98rem' }}>مستوى الثقة:</span>
                <span style={{ fontWeight: 500 }}>
                  {sensorData.impact > 50 ? '95%' : sensorData.impact > 20 ? '75%' : '10%'}
                </span>
              </div>
              {accidentDetected && (
                <div style={{ background: '#fee2e2', border: '1.5px solid #fecaca', borderRadius: 12, padding: 12, marginTop: 8 }}>
                  <div className="flex gap-2 items-center">
                    <AlertTriangle size={18} style={{ color: '#b91c1c' }} />
                    <span style={{ fontWeight: 700, color: '#b91c1c' }}>تم كشف حادث!</span>
                  </div>
                  <p style={{ fontSize: '0.98rem', color: '#b91c1c', marginTop: 4 }}>
                    تم تأكيد وجود حادث مروري. جاري إرسال إشارة الاستغاثة...
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Emergency Response */}
        {emergencyResponse.sent && (
          <div className="card" style={{ background: '#dcfce7', border: '1.5px solid #bbf7d0' }}>
            <div className="flex items-center gap-2 mb-2" style={{ color: '#10b981', fontWeight: 700 }}>
              <Phone size={20} />
              تم إرسال إشارة الاستغاثة بنجاح
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
              <div style={{ flex: 1, minWidth: 180 }}>
                <h4 style={{ fontWeight: 700, color: '#1e293b', marginBottom: 6 }}>معلومات الموقع</h4>
                <div style={{ fontSize: '0.98rem', color: '#64748b' }}>
                  <div className="flex gap-2 items-center">
                    <MapPin size={16} />
                    <span>{emergencyResponse.location}</span>
                  </div>
                  <p>الإحداثيات: {emergencyResponse.coordinates}</p>
                </div>
              </div>
              <div style={{ flex: 1, minWidth: 180 }}>
                <h4 style={{ fontWeight: 700, color: '#1e293b', marginBottom: 6 }}>الاستجابة الطبية</h4>
                <div style={{ fontSize: '0.98rem', color: '#64748b' }}>
                  <p>أقرب مستشفى: <span style={{ fontWeight: 700 }}>{emergencyResponse.nearestHospital}</span></p>
                  <p>الوقت المتوقع للوصول: <span style={{ fontWeight: 700, color: '#10b981' }}>{emergencyResponse.estimatedTime}</span></p>
                </div>
              </div>
            </div>
            <div style={{ background: '#fff', borderRadius: 12, padding: 12, marginTop: 16 }}>
              <h4 style={{ fontWeight: 700, color: '#1e293b', marginBottom: 6 }}>الجهات المبلغة</h4>
              <div style={{ display: 'flex', gap: 8, fontSize: '0.98rem' }}>
                <div style={{ flex: 1, background: '#e0e7ff', borderRadius: 8, padding: 8, textAlign: 'center' }}>
                  <p style={{ fontWeight: 700 }}>الإسعاف</p>
                  <p style={{ color: '#10b981' }}>✓ تم الإبلاغ</p>
                </div>
                <div style={{ flex: 1, background: '#e0e7ff', borderRadius: 8, padding: 8, textAlign: 'center' }}>
                  <p style={{ fontWeight: 700 }}>الشرطة</p>
                  <p style={{ color: '#10b981' }}>✓ تم الإبلاغ</p>
                </div>
                <div style={{ flex: 1, background: '#e0e7ff', borderRadius: 8, padding: 8, textAlign: 'center' }}>
                  <p style={{ fontWeight: 700 }}>الدفاع المدني</p>
                  <p style={{ color: '#10b981' }}>✓ تم الإبلاغ</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Control Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, margin: '32px 0' }}>
          {simulationStep < simulationSteps.length - 1 ? (
            <button
              onClick={executeStep}
              className="btn btn-accent main-action-btn"
              style={{ background: 'var(--primary)', color: '#fff', padding: '0.8em 2.5em' }}
              disabled={sensorData.isDetecting && simulationStep === 0}
            >
              <Zap size={20} style={{ marginLeft: 8 }} />
              {simulationStep === 0 ? 'بدء المحاكاة' : 'الخطوة التالية'}
            </button>
          ) : (
            <button
              onClick={resetSimulation}
              className="btn main-action-btn"
              style={{ background: '#64748b', color: '#fff', padding: '0.8em 2.5em' }}
            >
              إعادة تشغيل المحاكاة
            </button>
          )}
          <Link to="/">
            <button className="btn main-action-btn" style={{ background: 'var(--surface)', color: 'var(--primary)', border: '1.5px solid var(--primary)', padding: '0.8em 2.5em' }}>
              العودة للرئيسية
            </button>
          </Link>
        </div>

        {/* Technical Notes */}
        <div className="card" style={{ background: '#e0e7ff', border: '1.5px solid #bae6fd' }}>
          <h4 style={{ fontWeight: 700, color: '#2563eb', marginBottom: 8 }}>ملاحظات تقنية</h4>
          <div style={{ fontSize: '0.98rem', color: '#2563eb', display: 'flex', flexDirection: 'column', gap: 4 }}>
            <p>• يستخدم النظام مستشعرات الهاتف (الجيروسكوب ومقياس التسارع) لكشف الحوادث</p>
            <p>• خوارزميات الذكاء الاصطناعي تحلل البيانات لتمييز الحوادث الحقيقية</p>
            <p>• يتم إرسال إشارة الاستغاثة تلقائياً عند تأكيد وجود حادث</p>
            <p>• النظام يوفر الموقع الدقيق وأقرب المستشفيات للاستجابة السريعة</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReportAccident

