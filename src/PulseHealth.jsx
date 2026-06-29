import { useState, useEffect } from 'react'

/* ─── COLOR TOKENS ─────────────────────── */
const C = {
  teal:    '#0d9488',
  tealDk:  '#0a6e6e',
  tealLt:  '#ccfbf1',
  blue:    '#0284c7',
  slate:   '#0f172a',
  slateM:  '#334155',
  slateL:  '#64748b',
  surface: '#f0fdfa',
  white:   '#ffffff',
  green:   '#22c55e',
  amber:   '#f59e0b',
  red:     '#ef4444',
}

/* ─── SHARED STYLE HELPERS ─────────────── */
const S = {
  card: {
    background: C.white,
    borderRadius: 18,
    boxShadow: '0 2px 14px rgba(13,148,136,0.09)',
    padding: '16px',
    marginBottom: 12,
  },
  btnPrimary: {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    gap: 7, padding: '13px 22px', borderRadius: 50,
    fontSize: 14, fontWeight: 700, border: 'none', cursor: 'pointer',
    background: `linear-gradient(135deg, ${C.teal}, ${C.blue})`,
    color: C.white, boxShadow: '0 4px 14px rgba(13,148,136,0.28)',
    width: '100%', fontFamily: 'Poppins, sans-serif',
  },
  btnOutline: {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    gap: 7, padding: '12px 22px', borderRadius: 50,
    fontSize: 14, fontWeight: 600, cursor: 'pointer',
    background: 'transparent', color: C.teal,
    border: `1.5px solid ${C.teal}`, width: '100%',
    fontFamily: 'Poppins, sans-serif',
  },
  sectionLabel: {
    fontSize: 10, fontWeight: 700, color: C.slateM,
    letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 9,
  },
}

function Pill({ active, onClick, children }) {
  return (
    <button onClick={onClick} style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '5px 12px', borderRadius: 50, fontSize: 11, fontWeight: 600,
      border: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
      background: active ? C.teal : 'rgba(13,148,136,0.09)',
      color: active ? C.white : C.teal, transition: 'all 0.18s',
    }}>
      {children}
    </button>
  )
}

function CircProgress({ pct, label, color = C.teal, size = 72 }) {
  const r = (size - 10) / 2
  const circ = 2 * Math.PI * r
  const offset = circ - (pct / 100) * circ
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
      <svg width={size} height={size}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={C.tealLt} strokeWidth={7} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={7}
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%', transition: 'stroke-dashoffset 1s ease' }} />
        <text x={size/2} y={size/2 + 5} textAnchor="middle" fontSize={14} fontWeight={700} fill={C.slate}>{pct}%</text>
      </svg>
      {label && <span style={{ fontSize: 10, fontWeight: 600, color: C.slateM }}>{label}</span>}
    </div>
  )
}

function ECGLine() {
  return (
    <svg viewBox="0 0 300 46" style={{ width: '100%', height: 46 }}>
      <polyline
        points="0,28 28,28 40,28 48,8 56,42 64,5 72,28 110,28 150,28 162,28 170,14 178,40 186,6 194,28 230,28 260,28 290,28"
        fill="none" stroke="#5eead4" strokeWidth={2}
        strokeLinecap="round" strokeLinejoin="round"
        style={{ filter: 'drop-shadow(0 0 3px #0d9488)' }}
      />
    </svg>
  )
}

/* ════════════════════════════════════════
   SCREEN: HOME
═══════════════════════════════════════ */
function HomeScreen({ onNav }) {
  const vitals = [
    { icon: '❤️', label: 'Heart Rate', val: '72', unit: 'bpm', bg: '#fef2f2' },
    { icon: '🩸', label: 'Blood Pressure', val: '120/80', unit: 'mmHg', bg: '#f5f3ff' },
    { icon: '🌡️', label: 'Temperature', val: '98.6', unit: '°F', bg: '#fffbeb' },
    { icon: '💧', label: 'SpO₂', val: '98%', unit: '', bg: '#eff6ff' },
  ]
  const alerts = [
    { bg: '#eff6ff', bc: C.blue,  text: 'Flu season advisory — get vaccinated', time: '2h ago' },
    { bg: '#fffbeb', bc: C.amber, text: 'Poor air quality in your area today',  time: '4h ago' },
    { bg: '#f0fdf4', bc: C.green, text: 'Your survey results are ready to view', time: '1d ago' },
  ]
  const quick = [
    { icon: '📋', label: 'Survey',    key: 'survey'    },
    { icon: '🤖', label: 'Diagnose',  key: 'diagnosis' },
    { icon: '🏥', label: 'Hospitals', key: 'hospitals' },
    { icon: '🌍', label: 'Awareness', key: 'awareness' },
  ]

  return (
    <div>
      {/* Hero header */}
      <div style={{ background: `linear-gradient(145deg,${C.slate},#0d2d3e,${C.tealDk})`, borderRadius: '0 0 24px 24px', padding: '18px 18px 22px', marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
          <div>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', margin: 0 }}>Good morning 👋</p>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: C.white, margin: '2px 0 0' }}>Rahul Sharma</h2>
          </div>
          <div style={{ width: 38, height: 38, borderRadius: '50%', background: C.teal, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>👤</div>
        </div>
        <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: 12, padding: '7px 10px' }}>
          <p style={{ fontSize: 8, letterSpacing: '0.15em', color: 'rgba(94,234,212,0.55)', margin: '0 0 3px', fontFamily: 'monospace' }}>LIVE HEALTH MONITOR</p>
          <ECGLine />
        </div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {/* Vitals */}
        <p style={S.sectionLabel}>Today's Vitals</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 9, marginBottom: 16 }}>
          {vitals.map(v => (
            <div key={v.label} style={{ background: C.white, borderRadius: 15, padding: 12, display: 'flex', alignItems: 'center', gap: 9, boxShadow: '0 2px 10px rgba(13,148,136,0.08)' }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: v.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, flexShrink: 0 }}>{v.icon}</div>
              <div>
                <p style={{ fontSize: 9, color: C.slateL, margin: 0 }}>{v.label}</p>
                <p style={{ fontSize: 14, fontWeight: 800, color: C.slate, margin: '1px 0 0' }}>{v.val} <span style={{ fontSize: 9, fontWeight: 400, color: C.slateL }}>{v.unit}</span></p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick access */}
        <p style={S.sectionLabel}>Quick Access</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 9, marginBottom: 16 }}>
          {quick.map(q => (
            <button key={q.key} onClick={() => onNav(q.key)} style={{ background: C.white, border: 'none', borderRadius: 14, padding: '13px 4px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, boxShadow: '0 2px 9px rgba(13,148,136,0.08)' }}>
              <span style={{ fontSize: 20 }}>{q.icon}</span>
              <span style={{ fontSize: 9, fontWeight: 600, color: C.slateM }}>{q.label}</span>
            </button>
          ))}
        </div>

        {/* Alerts */}
        <p style={S.sectionLabel}>Health Alerts</p>
        {alerts.map((a, i) => (
          <div key={i} style={{ background: a.bg, borderLeft: `3px solid ${a.bc}`, borderRadius: 11, padding: '11px 13px', marginBottom: 9, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ fontSize: 12, color: C.slateM, margin: 0, flex: 1, paddingRight: 8, lineHeight: 1.4 }}>{a.text}</p>
            <span style={{ fontSize: 9, color: C.slateL, whiteSpace: 'nowrap' }}>{a.time}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ════════════════════════════════════════
   SCREEN: SURVEY
═══════════════════════════════════════ */
const QUESTIONS = [
  { q: 'How are you feeling today overall?', opts: ['😄 Great', '🙂 Good', '😐 Okay', '😟 Not well'] },
  { q: 'Symptoms in the last 7 days?', opts: ['🤧 Runny nose', '🤒 Fever', '😮 Shortness of breath', '💪 None of these'], multi: true },
  { q: 'Hours of sleep last night?', opts: ['< 4 hours', '4–6 hours', '6–8 hours', '> 8 hours'] },
  { q: 'Did you exercise this week?', opts: ['Yes, daily', 'Yes, 2–3 times', 'Once or twice', 'Not at all'] },
]

function SurveyScreen() {
  const [step, setStep]       = useState(0)
  const [answers, setAnswers] = useState({})
  const [done, setDone]       = useState(false)

  const q = QUESTIONS[step]
  const pct = Math.round((step / QUESTIONS.length) * 100)

  const toggle = (opt) => {
    if (q.multi) {
      const prev = answers[step] || []
      setAnswers({ ...answers, [step]: prev.includes(opt) ? prev.filter(x => x !== opt) : [...prev, opt] })
    } else {
      setAnswers({ ...answers, [step]: opt })
    }
  }

  const isSelected = (opt) => {
    const a = answers[step]
    return q.multi ? (a || []).includes(opt) : a === opt
  }

  const canNext = answers[step] && (!q.multi || answers[step].length > 0)

  if (done) return (
    <div style={{ padding: '32px 20px', textAlign: 'center' }}>
      <div style={{ fontSize: 54, marginBottom: 12 }}>🎉</div>
      <h2 style={{ fontSize: 20, fontWeight: 800, color: C.slate, marginBottom: 8 }}>Survey Complete!</h2>
      <p style={{ fontSize: 13, color: C.slateL, marginBottom: 22 }}>Your data helps build a healthier community. Thank you!</p>
      <div style={{ ...S.card, textAlign: 'left', marginBottom: 20 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: C.slateM, marginBottom: 14 }}>Your Health Score</p>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <CircProgress pct={82} label="Overall" color={C.teal} />
          <CircProgress pct={74} label="Sleep"   color={C.blue} />
          <CircProgress pct={90} label="Activity" color={C.green} />
        </div>
      </div>
      <button style={S.btnPrimary} onClick={() => { setStep(0); setAnswers({}); setDone(false) }}>
        Take Another Survey
      </button>
    </div>
  )

  return (
    <div style={{ padding: '0 18px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
        <span style={{ fontSize: 11, color: C.slateL }}>Question {step + 1} of {QUESTIONS.length}</span>
        <span style={{ fontSize: 11, fontWeight: 600, color: C.teal }}>{pct}% done</span>
      </div>
      <div style={{ height: 5, background: C.tealLt, borderRadius: 99, overflow: 'hidden', marginBottom: 18 }}>
        <div style={{ height: '100%', width: `${pct}%`, background: `linear-gradient(90deg,${C.teal},${C.blue})`, borderRadius: 99, transition: 'width 0.4s ease' }} />
      </div>

      <h3 style={{ fontSize: 15, fontWeight: 700, color: C.slate, marginBottom: q.multi ? 5 : 18, lineHeight: 1.4 }}>{q.q}</h3>
      {q.multi && <p style={{ fontSize: 10, color: C.slateL, marginBottom: 14 }}>Select all that apply</p>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
        {q.opts.map(opt => (
          <button key={opt} onClick={() => toggle(opt)} style={{
            padding: '13px 16px', borderRadius: 13, textAlign: 'left',
            fontSize: 13, fontWeight: 500, cursor: 'pointer', transition: 'all 0.18s',
            fontFamily: 'Poppins, sans-serif',
            background: isSelected(opt) ? C.tealLt : C.white,
            border: `2px solid ${isSelected(opt) ? C.teal : 'rgba(13,148,136,0.18)'}`,
            color: isSelected(opt) ? C.tealDk : C.slateM,
          }}>
            {opt}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        {step > 0 && (
          <button style={{ ...S.btnOutline, flex: 1 }} onClick={() => setStep(step - 1)}>← Back</button>
        )}
        <button
          style={{ ...S.btnPrimary, flex: 2, opacity: canNext ? 1 : 0.45 }}
          disabled={!canNext}
          onClick={() => step < QUESTIONS.length - 1 ? setStep(step + 1) : setDone(true)}>
          {step < QUESTIONS.length - 1 ? 'Next →' : 'Submit Survey'}
        </button>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════
   SCREEN: DIAGNOSIS
═══════════════════════════════════════ */
const SUGGESTIONS = ['Fever', 'Headache', 'Cough', 'Fatigue', 'Nausea', 'Chest pain', 'Sore throat', 'Body aches']
const MOCK_RESULTS = [
  { condition: 'Common Cold',  probability: 72, severity: 'mild',     color: C.green, advice: 'Rest, stay hydrated, and take OTC medication.' },
  { condition: 'Seasonal Flu', probability: 18, severity: 'moderate', color: C.amber, advice: 'Consider antiviral medication if caught early.' },
  { condition: 'COVID-19',     probability: 6,  severity: 'monitor',  color: C.red,   advice: 'Get tested and isolate. Monitor oxygen levels.' },
]

function DiagnosisScreen() {
  const [symptoms, setSymptoms] = useState([])
  const [input,    setInput]    = useState('')
  const [result,   setResult]   = useState(null)
  const [loading,  setLoading]  = useState(false)

  const addSymptom = (s) => {
    const clean = (s || input).trim()
    if (clean && !symptoms.includes(clean)) setSymptoms(prev => [...prev, clean])
    setInput('')
  }

  const analyze = () => {
    if (!symptoms.length) return
    setLoading(true); setResult(null)
    setTimeout(() => { setLoading(false); setResult(MOCK_RESULTS) }, 1800)
  }

  return (
    <div style={{ padding: '0 18px' }}>
      <div style={{ ...S.card, background: `linear-gradient(135deg,${C.tealLt},#e0f2fe)`, marginBottom: 14 }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: C.tealDk, marginBottom: 5 }}>⚠️ Disclaimer</p>
        <p style={{ fontSize: 10, color: C.slateM, margin: 0, lineHeight: 1.5 }}>Preliminary AI assessment only. Not a substitute for professional medical advice.</p>
      </div>

      <div style={{ display: 'flex', gap: 7, marginBottom: 10 }}>
        <input value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addSymptom()}
          placeholder="Type a symptom..."
          style={{ flex: 1, padding: '11px 12px', borderRadius: 11, border: `1.5px solid rgba(13,148,136,0.22)`, fontSize: 13, color: C.slate, outline: 'none', fontFamily: 'Poppins, sans-serif' }} />
        <button onClick={() => addSymptom()} style={{ ...S.btnPrimary, width: 'auto', padding: '11px 16px', borderRadius: 11 }}>Add</button>
      </div>

      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
        {SUGGESTIONS.filter(s => !symptoms.includes(s)).slice(0, 6).map(s => (
          <Pill key={s} active={false} onClick={() => addSymptom(s)}>{s}</Pill>
        ))}
      </div>

      {symptoms.length > 0 && (
        <div style={{ marginBottom: 14 }}>
          <p style={{ fontSize: 10, fontWeight: 700, color: C.slateM, marginBottom: 7, textTransform: 'uppercase', letterSpacing: '0.07em' }}>Your symptoms</p>
          <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
            {symptoms.map(s => (
              <span key={s} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 50, fontSize: 11, fontWeight: 600, background: C.teal, color: C.white }}>
                {s}
                <button onClick={() => setSymptoms(prev => prev.filter(x => x !== s))}
                  style={{ background: 'rgba(255,255,255,0.3)', border: 'none', borderRadius: '50%', width: 14, height: 14, cursor: 'pointer', color: C.white, fontSize: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}>✕</button>
              </span>
            ))}
          </div>
        </div>
      )}

      <button style={{ ...S.btnPrimary, marginBottom: 16, opacity: symptoms.length ? 1 : 0.45 }}
        disabled={!symptoms.length} onClick={analyze}>
        {loading ? '🔍 Analyzing…' : '🤖 Analyze Symptoms'}
      </button>

      {loading && (
        <div style={{ textAlign: 'center', padding: '16px 0' }}>
          <div style={{ width: 36, height: 36, border: `3px solid ${C.tealLt}`, borderTopColor: C.teal, borderRadius: '50%', margin: '0 auto 10px', animation: 'spin 0.8s linear infinite' }} />
          <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
          <p style={{ fontSize: 12, color: C.slateL }}>AI is analyzing your symptoms…</p>
        </div>
      )}

      {result && !loading && (
        <div>
          <p style={S.sectionLabel}>Possible Conditions</p>
          {result.map(r => (
            <div key={r.condition} style={{ ...S.card, borderLeft: `4px solid ${r.color}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: C.slate }}>{r.condition}</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: r.color, background: `${r.color}18`, padding: '3px 9px', borderRadius: 50 }}>{r.severity}</span>
              </div>
              <div style={{ height: 5, background: '#f1f5f9', borderRadius: 99, marginBottom: 9 }}>
                <div style={{ height: '100%', width: `${r.probability}%`, background: r.color, borderRadius: 99 }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p style={{ fontSize: 11, color: C.slateL, margin: 0, flex: 1, lineHeight: 1.5 }}>{r.advice}</p>
                <span style={{ fontSize: 12, fontWeight: 700, color: r.color, marginLeft: 10 }}>{r.probability}%</span>
              </div>
            </div>
          ))}
          <button style={S.btnOutline}>📞 Book a Doctor</button>
        </div>
      )}
    </div>
  )
}

/* ════════════════════════════════════════
   SCREEN: HOSPITALS
═══════════════════════════════════════ */
const HOSPITALS = [
  { name: 'Apollo Hospitals',        type: 'Specialist', dist: '1.2 km', beds: '24 available', rating: 4.8, open: true,  emoji: '🏥' },
  { name: 'City General Hospital',   type: 'Emergency',  dist: '2.1 km', beds: '8 available',  rating: 4.5, open: true,  emoji: '🚑' },
  { name: 'HealthFirst Clinic',      type: 'Clinic',     dist: '0.8 km', beds: 'Walk-in',       rating: 4.6, open: true,  emoji: '🩺' },
  { name: 'MediCare Specialist',     type: 'Specialist', dist: '3.4 km', beds: '12 available', rating: 4.7, open: false, emoji: '🔬' },
  { name: 'Sunrise Community Clinic',type: 'Clinic',     dist: '1.9 km', beds: 'Walk-in',       rating: 4.3, open: true,  emoji: '☀️' },
]

function HospitalsScreen() {
  const [filter, setFilter] = useState('All')
  const filters = ['All', 'Emergency', 'Clinic', 'Specialist']
  const list = filter === 'All' ? HOSPITALS : HOSPITALS.filter(h => h.type === filter)

  return (
    <div style={{ padding: '0 16px' }}>
      <div style={{ position: 'relative', marginBottom: 13 }}>
        <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 14 }}>🔍</span>
        <input placeholder="Search hospitals, clinics…"
          style={{ width: '100%', padding: '11px 12px 11px 36px', borderRadius: 12, border: `1.5px solid rgba(13,148,136,0.2)`, fontSize: 12, color: C.slate, outline: 'none', fontFamily: 'Poppins, sans-serif', boxSizing: 'border-box' }} />
      </div>

      <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 4, marginBottom: 14, scrollbarWidth: 'none' }}>
        {filters.map(f => <Pill key={f} active={filter === f} onClick={() => setFilter(f)}>{f}</Pill>)}
      </div>

      <div style={{ background: `linear-gradient(135deg,${C.tealLt},#bfdbfe)`, borderRadius: 16, height: 110, marginBottom: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle,rgba(13,148,136,0.13) 1px,transparent 1px)', backgroundSize: '16px 16px' }} />
        <span style={{ fontSize: 28, position: 'relative' }}>🗺️</span>
        <p style={{ fontSize: 11, fontWeight: 600, color: C.tealDk, margin: '5px 0 0', position: 'relative' }}>Map View · {list.length} hospitals nearby</p>
      </div>

      <p style={S.sectionLabel}>{list.length} Results Near You</p>
      {list.map(h => (
        <div key={h.name} style={S.card}>
          <div style={{ display: 'flex', gap: 11, alignItems: 'flex-start' }}>
            <div style={{ width: 44, height: 44, borderRadius: 13, background: C.tealLt, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{h.emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h4 style={{ fontSize: 13, fontWeight: 700, color: C.slate, margin: 0, lineHeight: 1.3 }}>{h.name}</h4>
                <span style={{ fontSize: 9, fontWeight: 700, color: h.open ? C.green : C.red, background: h.open ? '#f0fdf4' : '#fef2f2', padding: '3px 8px', borderRadius: 50, flexShrink: 0, marginLeft: 7 }}>{h.open ? 'Open' : 'Closed'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginTop: 4, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 10, color: C.slateL }}>📍 {h.dist}</span>
                <span style={{ fontSize: 10, color: C.slateL }}>🛏 {h.beds}</span>
                <span style={{ fontSize: 10, color: C.amber }}>⭐ {h.rating}</span>
              </div>
              <span style={{ fontSize: 9, fontWeight: 600, color: C.teal, background: C.tealLt, padding: '2px 8px', borderRadius: 50, display: 'inline-block', marginTop: 5 }}>{h.type}</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 7, marginTop: 11, borderTop: `1px solid rgba(13,148,136,0.07)`, paddingTop: 11 }}>
            <button style={{ flex: 1, padding: 8, borderRadius: 10, fontSize: 11, fontWeight: 600, border: 'none', cursor: 'pointer', background: 'rgba(13,148,136,0.08)', color: C.teal, fontFamily: 'Poppins, sans-serif' }}>📞 Call</button>
            <button style={{ flex: 1, padding: 8, borderRadius: 10, fontSize: 11, fontWeight: 600, border: 'none', cursor: 'pointer', background: `linear-gradient(135deg,${C.teal},${C.blue})`, color: C.white, fontFamily: 'Poppins, sans-serif' }}>🗺️ Directions</button>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ════════════════════════════════════════
   SCREEN: AWARENESS
═══════════════════════════════════════ */
const ARTICLES = [
  { tag: 'Preventive',   title: '5 Signs You Should Visit a Doctor Immediately', read: '4 min', emoji: '🚨', hot: true  },
  { tag: 'Seasonal',     title: 'Monsoon Health Guide: What to Watch Out For',   read: '6 min', emoji: '🌧️', hot: false },
  { tag: 'Mental Health',title: 'Managing Anxiety in High-Stress Environments',  read: '5 min', emoji: '🧠', hot: false },
  { tag: 'Nutrition',    title: '10 Foods That Naturally Boost Your Immunity',   read: '3 min', emoji: '🥦', hot: true  },
  { tag: 'Featured',     title: 'Understanding Your Blood Pressure Readings',    read: '4 min', emoji: '🩺', hot: false },
]

function AwarenessScreen() {
  const [tab, setTab] = useState('Featured')
  const tabs = ['Featured', 'Seasonal', 'Mental Health', 'Nutrition']

  return (
    <div style={{ padding: '0 16px' }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {[['2.4M+', 'Articles Read'], ['142', 'Topics'], ['98%', 'Accuracy']].map(([v, l]) => (
          <div key={l} style={{ flex: 1, background: `linear-gradient(135deg,${C.tealLt},#e0f2fe)`, borderRadius: 13, padding: '11px 8px', textAlign: 'center' }}>
            <p style={{ fontSize: 15, fontWeight: 800, color: C.tealDk, margin: 0 }}>{v}</p>
            <p style={{ fontSize: 9, color: C.slateM, margin: '2px 0 0' }}>{l}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 4, marginBottom: 14, scrollbarWidth: 'none' }}>
        {tabs.map(t => <Pill key={t} active={tab === t} onClick={() => setTab(t)}>{t}</Pill>)}
      </div>

      {ARTICLES.map((a, i) => (
        <div key={i} style={{ ...S.card, display: 'flex', gap: 12, alignItems: 'center', cursor: 'pointer' }}>
          <div style={{ width: 48, height: 48, borderRadius: 13, background: C.tealLt, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 23, flexShrink: 0 }}>{a.emoji}</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 5, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 9, fontWeight: 700, color: C.teal, background: C.tealLt, padding: '2px 8px', borderRadius: 50 }}>{a.tag}</span>
              {a.hot && <span style={{ fontSize: 9, fontWeight: 700, color: '#dc2626', background: '#fef2f2', padding: '2px 8px', borderRadius: 50 }}>🔥 Trending</span>}
            </div>
            <h4 style={{ fontSize: 12, fontWeight: 600, color: C.slate, margin: 0, lineHeight: 1.4 }}>{a.title}</h4>
            <p style={{ fontSize: 10, color: C.slateL, margin: '3px 0 0' }}>⏱ {a.read} read</p>
          </div>
          <span style={{ color: C.slateL, fontSize: 15 }}>›</span>
        </div>
      ))}
    </div>
  )
}

/* ════════════════════════════════════════
   SCREEN: PROFILE
═══════════════════════════════════════ */
function ProfileScreen() {
  const settings = [
    { icon: '🔔', label: 'Health Notifications', val: 'On'      },
    { icon: '📍', label: 'Location Services',     val: 'On'      },
    { icon: '🌐', label: 'Language',              val: 'English' },
    { icon: '🔒', label: 'Privacy Settings',      val: ''        },
    { icon: '📄', label: 'Medical History',        val: ''        },
    { icon: '🚪', label: 'Sign Out',               val: '', danger: true },
  ]

  return (
    <div style={{ padding: '0 18px' }}>
      <div style={{ textAlign: 'center', padding: '8px 0 20px' }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: `linear-gradient(135deg,${C.teal},${C.blue})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30, margin: '0 auto 10px', boxShadow: '0 4px 18px rgba(13,148,136,0.28)' }}>👤</div>
        <h2 style={{ fontSize: 17, fontWeight: 800, color: C.slate, margin: 0 }}>Rahul Sharma</h2>
        <p style={{ fontSize: 12, color: C.slateL, margin: '4px 0 0' }}>rahul.sharma@email.com</p>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: C.tealLt, color: C.tealDk, fontSize: 10, fontWeight: 700, padding: '5px 13px', borderRadius: 50, marginTop: 9 }}>✅ Health Profile Complete</div>
      </div>

      <div style={{ background: `linear-gradient(135deg,${C.slate},#0d2d3e)`, borderRadius: 18, padding: 16, marginBottom: 16 }}>
        <p style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.4)', margin: '0 0 12px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Health Summary</p>
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
          <CircProgress pct={82} label="Score" color={C.teal} />
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 20, fontWeight: 800, color: C.white, margin: 0 }}>12</p>
            <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', margin: '2px 0 0' }}>Surveys</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 20, fontWeight: 800, color: C.white, margin: 0 }}>3</p>
            <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', margin: '2px 0 0' }}>Reports</p>
          </div>
        </div>
      </div>

      <p style={S.sectionLabel}>Settings</p>
      <div style={{ ...S.card, padding: '4px 0' }}>
        {settings.map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '13px 16px', borderBottom: i < settings.length - 1 ? `1px solid rgba(13,148,136,0.07)` : 'none', cursor: 'pointer' }}>
            <span style={{ fontSize: 17, marginRight: 13 }}>{s.icon}</span>
            <span style={{ flex: 1, fontSize: 13, fontWeight: 500, color: s.danger ? C.red : C.slate }}>{s.label}</span>
            {s.val && <span style={{ fontSize: 11, color: C.slateL }}>{s.val}</span>}
            {!s.val && !s.danger && <span style={{ color: C.slateL, fontSize: 15 }}>›</span>}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ════════════════════════════════════════
   MAIN APP SHELL
═══════════════════════════════════════ */
const NAV_ITEMS = [
  { key: 'home',      icon: '🏠', label: 'Home'     },
  { key: 'survey',    icon: '📋', label: 'Survey'   },
  { key: 'diagnosis', icon: '🤖', label: 'Diagnose' },
  { key: 'hospitals', icon: '🏥', label: 'Hospitals'},
  { key: 'profile',   icon: '👤', label: 'Profile'  },
]

const SCREEN_MAP = {
  home:      HomeScreen,
  survey:    SurveyScreen,
  diagnosis: DiagnosisScreen,
  hospitals: HospitalsScreen,
  awareness: AwarenessScreen,
  profile:   ProfileScreen,
}

const TITLES = {
  home: 'PulseHealth', survey: 'Health Survey', diagnosis: 'AI Diagnosis',
  hospitals: 'Nearby Hospitals', awareness: 'Health Awareness', profile: 'My Profile',
}

export default function PulseHealth() {
  const [active, setActive] = useState('home')

  const navigate = (key) => setActive(key)
  const Screen = SCREEN_MAP[active] || HomeScreen

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: '100vh', background: '#dde4ed', padding: '24px 16px', fontFamily: 'Poppins, sans-serif' }}>

      {/* Phone frame */}
      <div style={{ width: 375, background: '#1a1a2e', borderRadius: 44, padding: '10px 9px 8px', boxShadow: '0 40px 80px rgba(0,0,0,0.4), 0 0 0 1.5px rgba(255,255,255,0.07), inset 0 1.5px 0 rgba(255,255,255,0.08)' }}>

        {/* Status bar */}
        <div style={{ background: '#0f172a', borderRadius: '28px 28px 0 0', padding: '8px 18px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.72)', fontWeight: 600 }}>9:41</span>
          <div style={{ width: 76, height: 20, background: '#000', borderRadius: 50 }} />
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.65)' }}>●●●● 100%</span>
        </div>

        {/* Screen */}
        <div style={{ background: C.surface, borderRadius: '18px 18px 0 0', overflow: 'hidden' }}>

          {/* Top bar */}
          <div style={{ background: C.white, padding: '11px 18px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid rgba(13,148,136,0.08)`, position: 'sticky', top: 0, zIndex: 100 }}>
            {active !== 'home' ? (
              <button onClick={() => navigate('home')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: C.teal, padding: 0 }}>←</button>
            ) : (
              <div style={{ width: 24, height: 24, borderRadius: 7, background: `linear-gradient(135deg,${C.teal},${C.blue})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="14" height="14" viewBox="0 0 28 28" fill="none">
                  <path d="M2 14h4l3-8 5 16 3-10 2 2h7" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}
            <h1 style={{ fontSize: 14, fontWeight: 700, color: C.slate, margin: 0 }}>{TITLES[active]}</h1>
            <button style={{ background: 'rgba(13,148,136,0.09)', border: 'none', borderRadius: '50%', width: 30, height: 30, cursor: 'pointer', fontSize: 13 }}>🔔</button>
          </div>

          {/* Scrollable content */}
          <div style={{ height: 560, overflowY: 'auto', paddingTop: active === 'home' ? 0 : 16, paddingBottom: 16, scrollbarWidth: 'none' }}>
            <Screen onNav={navigate} />
          </div>

          {/* Bottom nav */}
          <div style={{ background: C.white, borderTop: `1px solid rgba(13,148,136,0.1)`, display: 'flex', padding: '6px 0 10px' }}>
            {NAV_ITEMS.map(n => {
              const isActive = active === n.key
              return (
                <button key={n.key} onClick={() => navigate(n.key)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, background: 'none', border: 'none', cursor: 'pointer', padding: '5px 2px' }}>
                  <div style={{ width: isActive ? 32 : 28, height: isActive ? 32 : 28, borderRadius: isActive ? 12 : '50%', background: isActive ? C.tealLt : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: isActive ? 18 : 16, transition: 'all 0.2s' }}>{n.icon}</div>
                  <span style={{ fontSize: 8, fontWeight: isActive ? 700 : 400, color: isActive ? C.teal : C.slateL }}>{n.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Home indicator */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0 2px' }}>
          <div style={{ width: 90, height: 3.5, background: 'rgba(255,255,255,0.28)', borderRadius: 99 }} />
        </div>
      </div>
    </div>
  )
}
