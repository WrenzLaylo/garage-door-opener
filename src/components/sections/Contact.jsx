import { useCallback, useEffect, useRef, useState } from 'react'
import ScrollReveal from '../ui/ScrollReveal'
import { CONTACT, BUSINESS } from '../../constants'
import { Phone, Mail, Clock, CheckCircle, UploadCloud, FileText, X } from 'lucide-react'

// ── Suburb list (same as AGG Doors form) ──────────────────────────
const SUBURBS = [
  'Abbotsford','Airport West','Albert Park','Altona','Balwyn',
  'Bentleigh','Berwick','Blackburn','Box Hill','Brighton',
  'Broadmeadows','Brunswick','Camberwell','Carnegie','Carrum Downs',
  'Caulfield','Cheltenham','Clayton','Coburg','Craigieburn',
  'Cranbourne','Croydon','Dandenong','Doncaster','Epping',
  'Essendon','Ferntree Gully','Footscray','Frankston','Glen Iris',
  'Glen Waverley','Hampton','Hawthorn','Heidelberg','Hoppers Crossing',
  'Ivanhoe','Keilor','Keysborough','Lilydale','Malvern',
  'Melbourne','Mentone','Mitcham','Moorabbin','Mornington',
  'Mount Waverley','Mulgrave','Narre Warren','Noble Park','Northcote',
  'Oakleigh','Pakenham','Parkdale','Point Cook','Preston',
  'Reservoir','Richmond','Ringwood','Rowville','Seaford',
  'South Yarra','Springvale','St Kilda','Sunbury','Tarneit',
  'Thomastown','Toorak','Wantirna','Werribee','Williamstown','Other',
]

const PROPERTY_TYPES = ['Residential', 'Commercial']
const SERVICE_TYPES  = ['Installation', 'Repair', 'Maintenance', 'Automation']
const SERVICE_FOR    = ['Garage Door', 'Gate', 'Motor', 'Remote']
const GARAGE_DOOR_TYPES = ['Roller Door', 'Panel Door', 'Tilt Door', 'Counterweight Tilt Door']
const GATE_TYPES     = ['Single Swing Gate', 'Dual Swing Gate', 'Sliding Gate']

const QUOTE_FORM_ENDPOINT =
  import.meta.env.VITE_QUOTE_FORM_ENDPOINT ||
  '/quote-submit.php'

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || ''
const TURNSTILE_PLACEHOLDER = 'replace-with-cloudflare-turnstile-site-key'
const HAS_TURNSTILE = Boolean(TURNSTILE_SITE_KEY && TURNSTILE_SITE_KEY !== TURNSTILE_PLACEHOLDER)

const ELEMENTOR_QUOTE_FORM = {
  action:       'elementor_pro_forms_send_form',
  postId:       '7',
  formId:       '2372f6b',
  refererTitle: 'AGG Doors Enquiry - AGG Doors Inquiry',
  queriedId:    '7',
  referrer:     'https://garage-door-opener.com.au/',
}

function cleanPhone(phone) { return phone.replace(/\s+/g, '') }

function buildConcern(form) {
  return [
    'Source: Garage Door Opener Melbourne landing page',
    `Suburb / area: ${form.suburb}`,
    `Property type: ${form.propertyType}`,
    `Type of service: ${form.typeOfService}`,
    `Service for: ${form.serviceFor}`,
    form.serviceFor === 'Garage Door' ? `Garage door type: ${form.garageDoorType}` : null,
    form.serviceFor === 'Gate'        ? `Gate type: ${form.gateType}`              : null,
    `Concern: ${form.concern.trim() || 'No concern provided.'}`,
  ].filter(Boolean).join('\n')
}

function buildPayload(form, formStartedAt, turnstileToken) {
  const payload = new FormData()
  payload.set('action',        ELEMENTOR_QUOTE_FORM.action)
  payload.set('post_id',       ELEMENTOR_QUOTE_FORM.postId)
  payload.set('form_id',       ELEMENTOR_QUOTE_FORM.formId)
  payload.set('referer_title', ELEMENTOR_QUOTE_FORM.refererTitle)
  payload.set('queried_id',    ELEMENTOR_QUOTE_FORM.queriedId)
  payload.set('referrer',      ELEMENTOR_QUOTE_FORM.referrer)
  payload.set('form_fields[full_name]',               form.name.trim())
  payload.set('form_fields[email]',                   form.email.trim())
  payload.set('form_fields[contact_number]',          cleanPhone(form.phone))
  payload.set('form_fields[suburb]',                  form.suburb.trim())
  payload.set('form_fields[property_type]',           form.propertyType)
  payload.set('form_fields[type_of_service]',         form.typeOfService)
  payload.set('form_fields[service_for]',             form.serviceFor)
  payload.set('form_fields[type_of_garage_door]',     form.garageDoorType)
  payload.set('form_fields[type_of_gate]',            form.gateType)
  if (form.file) payload.set('form_fields[photos]',  form.file)
  payload.set('form_fields[describe_garage_door_concern]', buildConcern(form))
  payload.set('form_fields[source_referrer]',         'www.garage-door-opener.com.au')
  payload.set('_form_started_at', String(formStartedAt))
  payload.set('cf-turnstile-response', turnstileToken)
  return payload
}

function TurnstileWidget({ siteKey, resetSignal, onVerify, onExpire }) {
  const widgetRef = useRef(null)
  const widgetIdRef = useRef(null)

  useEffect(() => {
    if (!siteKey) return

    let cancelled = false
    const renderWidget = () => {
      if (cancelled || !window.turnstile || !widgetRef.current || widgetIdRef.current !== null) return
      widgetIdRef.current = window.turnstile.render(widgetRef.current, {
        sitekey: siteKey,
        theme: 'light',
        callback: onVerify,
        'expired-callback': onExpire,
        'error-callback': onExpire,
      })
    }

    const existingScript = document.querySelector('script[src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"]')
    if (!existingScript) {
      const script = document.createElement('script')
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
      script.async = true
      script.defer = true
      script.addEventListener('load', renderWidget)
      document.head.appendChild(script)
    } else {
      renderWidget()
      existingScript.addEventListener('load', renderWidget)
    }

    const poll = window.setInterval(renderWidget, 100)

    return () => {
      cancelled = true
      window.clearInterval(poll)
      if (window.turnstile && widgetIdRef.current !== null) {
        window.turnstile.remove(widgetIdRef.current)
        widgetIdRef.current = null
      }
      existingScript?.removeEventListener('load', renderWidget)
    }
  }, [siteKey, onVerify, onExpire])

  useEffect(() => {
    if (window.turnstile && widgetIdRef.current !== null) {
      window.turnstile.reset(widgetIdRef.current)
    }
  }, [resetSignal])

  return <div ref={widgetRef} style={{ minHeight: 65 }} />
}

// ── Accessible custom select ──────────────────────────────────────
function SelectField({ id, label, value, placeholder, options, onChange }) {
  const fieldRef  = useRef(null)
  const buttonRef = useRef(null)
  const optionRefs = useRef([])
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onPointerDown = (e) => { if (!fieldRef.current?.contains(e.target)) setOpen(false) }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [open])

  const selectedIndex = Math.max(options.indexOf(value), 0)
  const focusOption   = (i) => optionRefs.current[(i + options.length) % options.length]?.focus()

  const choose = (opt) => {
    onChange(opt)
    setOpen(false)
    requestAnimationFrame(() => buttonRef.current?.focus())
  }

  const handleButtonKeyDown = (e) => {
    if (['ArrowDown','Enter',' '].includes(e.key)) { e.preventDefault(); setOpen(true); requestAnimationFrame(() => focusOption(selectedIndex)) }
    if (e.key === 'ArrowUp') { e.preventDefault(); setOpen(true); requestAnimationFrame(() => focusOption(options.length - 1)) }
  }

  const handleOptionKeyDown = (e, i, opt) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); focusOption(i + 1) }
    if (e.key === 'ArrowUp')   { e.preventDefault(); focusOption(i - 1) }
    if (e.key === 'Home')      { e.preventDefault(); focusOption(0) }
    if (e.key === 'End')       { e.preventDefault(); focusOption(options.length - 1) }
    if (e.key === 'Escape')    { e.preventDefault(); setOpen(false); buttonRef.current?.focus() }
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); choose(opt) }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label id={`${id}-label`} style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--body)' }}>{label}</label>
      <div ref={fieldRef} style={{ position: 'relative', zIndex: open ? 30 : 1 }}>
        <button
          ref={buttonRef} type="button"
          aria-labelledby={`${id}-label`} aria-haspopup="listbox"
          aria-expanded={open} aria-controls={`${id}-options`}
          onClick={() => setOpen(c => !c)} onKeyDown={handleButtonKeyDown}
          style={{
            width: '100%', minHeight: 46, display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', gap: 14,
            background: 'white', border: `1.5px solid ${open ? 'var(--blue)' : 'var(--border)'}`,
            borderRadius: 8, padding: '12px 16px',
            color: value ? 'var(--heading)' : 'var(--muted)',
            fontFamily: 'var(--font-body)', fontSize: '0.95rem',
            textAlign: 'left', cursor: 'pointer',
            boxShadow: open ? '0 0 0 3px rgba(37,99,235,0.1)' : 'none',
            transition: 'border-color 0.2s, box-shadow 0.2s',
          }}
        >
          <span>{value || placeholder}</span>
          <span style={{
            width: 8, height: 8, flexShrink: 0,
            borderRight: '2px solid var(--blue)', borderBottom: '2px solid var(--blue)',
            transform: open ? 'rotate(225deg) translateY(-1px)' : 'rotate(45deg) translateY(-2px)',
            transition: 'transform 0.2s',
          }} />
        </button>

        <div
          id={`${id}-options`} role="listbox" aria-labelledby={`${id}-label`}
          style={{
            position: 'absolute', top: 'calc(100% + 6px)', left: 0, right: 0, zIndex: 40,
            maxHeight: 240, overflowY: 'auto', padding: 8,
            background: 'white', border: '1.5px solid var(--border)',
            borderRadius: 10, boxShadow: '0 12px 36px rgba(13,31,51,0.12)',
            opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none',
            transform: open ? 'translateY(0) scale(1)' : 'translateY(-6px) scale(0.98)',
            transition: 'opacity 0.18s, transform 0.18s',
          }}
        >
          {options.map((opt, i) => (
            <button
              key={opt}
              ref={el => { optionRefs.current[i] = el }}
              type="button" role="option" aria-selected={opt === value}
              tabIndex={open ? 0 : -1}
              onClick={() => choose(opt)}
              onKeyDown={e => handleOptionKeyDown(e, i, opt)}
              style={{
                width: '100%', display: 'block', padding: '10px 12px',
                borderRadius: 6, textAlign: 'left', fontSize: '0.9rem',
                fontFamily: 'var(--font-body)', cursor: 'pointer',
                color: opt === value ? 'var(--blue)' : 'var(--body)',
                background: opt === value ? 'var(--blue-light)' : 'transparent',
                fontWeight: opt === value ? 600 : 400,
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => { if (opt !== value) e.currentTarget.style.background = 'var(--off-white)' }}
              onMouseLeave={e => { if (opt !== value) e.currentTarget.style.background = 'transparent' }}
            >{opt}</button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Radio chip group ──────────────────────────────────────────────
function ChipGroup({ legend, name, options, value, onChange }) {
  return (
    <fieldset style={{ border: 0, minWidth: 0 }}>
      <legend style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--body)', marginBottom: 8 }}>{legend}</legend>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {options.map(opt => (
          <label key={opt} style={{
            position: 'relative', display: 'inline-flex',
            alignItems: 'center', justifyContent: 'center',
            minHeight: 40, padding: '8px 16px',
            border: `1.5px solid ${value === opt ? 'var(--blue)' : 'var(--border)'}`,
            borderRadius: 8, cursor: 'pointer',
            background: value === opt ? 'var(--blue-light)' : 'white',
            color: value === opt ? 'var(--blue)' : 'var(--subtle)',
            fontSize: '0.85rem', fontWeight: 600,
            transition: 'all 0.18s',
          }}>
            <input type="radio" name={name} value={opt} checked={value === opt}
              onChange={e => onChange(e.target.value)}
              style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }} />
            {opt}
          </label>
        ))}
      </div>
    </fieldset>
  )
}

// ── Main component ────────────────────────────────────────────────
const INITIAL_FORM = {
  name: '', email: '', phone: '', suburb: '',
  propertyType: 'Residential', typeOfService: 'Repair',
  serviceFor: 'Garage Door', garageDoorType: 'Roller Door',
  gateType: 'Single Swing Gate', concern: '', file: null,
}

export default function Contact() {
  const fileInputRef = useRef(null)
  const [form, setForm]             = useState(INITIAL_FORM)
  const [submitState, setSubmitState] = useState('idle')
  const [submitError, setSubmitError] = useState('')
  const [isFileDragging, setIsFileDragging] = useState(false)
  const [formStartedAt, setFormStartedAt] = useState(() => Math.floor(Date.now() / 1000))
  const [turnstileToken, setTurnstileToken] = useState('')
  const [turnstileResetSignal, setTurnstileResetSignal] = useState(0)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const isSending = submitState === 'sending'
  const resetTurnstile = useCallback(() => {
    setTurnstileToken('')
    setTurnstileResetSignal(signal => signal + 1)
  }, [])
  const handleTurnstileVerify = useCallback((token) => {
    setTurnstileToken(token)
    setSubmitError('')
  }, [])

  const removeFile = () => {
    set('file', null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleFileDrop = (e) => {
    e.preventDefault()
    setIsFileDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (!file) return
    const allowedTypes = ['image/png', 'image/jpeg', 'image/webp', 'application/pdf']
    if (!allowedTypes.includes(file.type)) {
      setSubmitError('Please upload a PNG, JPG, WEBP, or PDF file.')
      return
    }
    setSubmitError('')
    set('file', file)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitError('')
    if (isSending) return
    if (new FormData(e.currentTarget).get('_gotcha')) return
    if (!form.suburb) { setSubmitError('Please select your suburb before sending.'); return }
    if (HAS_TURNSTILE && !turnstileToken) {
      setSubmitError('Please complete the spam protection check before sending.')
      return
    }
    if (!HAS_TURNSTILE) {
      setSubmitError('Spam protection is not configured yet. Add your Cloudflare Turnstile site key before testing live submissions.')
      return
    }

    setSubmitState('sending')
    try {
      const response = await fetch(QUOTE_FORM_ENDPOINT, {
        method: 'POST',
        body: buildPayload(form, formStartedAt, turnstileToken),
        headers: { Accept: 'application/json' },
      })
      const result = await response.json().catch(() => null)
      if (!response.ok || !result?.ok) {
        throw new Error(result?.message || 'The enquiry system did not accept the request.')
      }
      setSubmitState('sent')
    } catch (err) {
      setSubmitState('error')
      setSubmitError(`${err.message || 'Something went wrong.'} Please call ${CONTACT.phoneEmergency} directly if urgent.`)
      resetTurnstile()
      setFormStartedAt(Math.floor(Date.now() / 1000))
    }
  }

  const inputStyle = {
    width: '100%', background: 'white',
    border: '1.5px solid var(--border)', borderRadius: 8,
    padding: '12px 16px', color: 'var(--heading)',
    fontFamily: 'var(--font-body)', fontSize: '0.95rem',
    outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s',
  }
  const labelStyle = { fontSize: '0.82rem', fontWeight: 600, color: 'var(--body)', display: 'block', marginBottom: 6 }

  return (
    <section id="contact" className="section" style={{ background: 'var(--off-white)' }}>
      <div className="container">
        <ScrollReveal style={{ textAlign: 'center', marginBottom: 56 }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>Get In Touch</div>
          <h2 className="section-title" style={{ margin: '0 auto 16px' }}>Book Your Free Quote</h2>
          <p className="section-subtitle" style={{ margin: '0 auto', textAlign: 'center' }}>
            Tell us what's happening with your opener and we'll send a technician fast.
          </p>
        </ScrollReveal>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.8fr', gap: 40, alignItems: 'start' }}
          className="contact-grid">

          {/* LEFT: info */}
          <ScrollReveal preset="fadeLeft">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { icon: Phone, label: 'Business Hours', value: CONTACT.phoneBusiness, href: CONTACT.phoneBusinessRaw, note: 'Mon–Fri 9am–5pm' },
                { icon: Phone, label: '24/7 Emergency', value: CONTACT.phoneEmergency, href: CONTACT.phoneEmergencyRaw, note: 'Immediate Assistance', emerg: true },
                { icon: Mail,  label: 'Email Us', value: CONTACT.email, href: `mailto:${CONTACT.email}`, note: 'Quotes go through the enquiry system' },
                { icon: Clock, label: 'Hours', value: CONTACT.hours, href: null, note: null },
              ].map(({ icon: Icon, label, value, href, note, emerg }) => (
                <div key={label} style={{
                  background: emerg ? 'linear-gradient(135deg,rgba(37,99,235,0.07),rgba(37,99,235,0.03)) white' : 'white',
                  border: `1px solid ${emerg ? 'rgba(37,99,235,0.25)' : 'var(--border)'}`,
                  borderRadius: 12, padding: '16px 18px',
                  display: 'flex', alignItems: 'flex-start', gap: 12,
                  boxShadow: '0 2px 10px rgba(15,23,42,0.05)',
                }}>
                  <div style={{
                    width: 40, height: 40, background: emerg ? 'var(--blue)' : 'var(--blue-light)',
                    borderRadius: 10, flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon size={17} color={emerg ? 'white' : 'var(--blue)'} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 2 }}>{label}</div>
                    {href
                      ? <a href={href} style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.93rem', color: 'var(--heading)', textDecoration: 'none' }}
                          onMouseEnter={e => e.target.style.color='var(--blue)'}
                          onMouseLeave={e => e.target.style.color='var(--heading)'}
                        >{value}</a>
                      : <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.9rem', color: 'var(--body)' }}>{value}</span>
                    }
                    {note && <div style={{ fontSize: '0.75rem', color: 'var(--blue)', marginTop: 2 }}>{note}</div>}
                  </div>
                </div>
              ))}

              {/* Guarantees */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 4 }}>
                {['Fast Melbourne response', 'Free, no-obligation quote', 'Licensed, insured, warranty-backed'].map(g => (
                  <div key={g} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.83rem', color: 'var(--subtle)' }}>
                    <CheckCircle size={14} color="var(--blue)" /> {g}
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* RIGHT: form */}
          <ScrollReveal preset="fadeRight">
            <div style={{
              background: 'white', border: '1px solid var(--border)',
              borderRadius: 16, padding: '36px 32px',
              boxShadow: '0 4px 24px rgba(15,23,42,0.07)',
            }}>
              {submitState === 'sent' ? (
                <div style={{ textAlign: 'center', padding: '32px 16px' }}>
                  <div style={{
                    width: 64, height: 64, background: '#DCFCE7', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px',
                  }}>
                    <CheckCircle size={30} color="#16A34A" />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.3rem', color: 'var(--heading)', marginBottom: 10 }}>
                    Quote Request Sent!
                  </h3>
                  <p style={{ color: 'var(--subtle)', fontSize: '0.95rem', marginBottom: 20 }}>
                    Your request has been submitted through the AGG Doors enquiry system.
                    For urgent repairs, call us directly.
                  </p>
                  <div style={{ display: 'grid', gap: 8, marginBottom: 20 }}>
                    {[
                      ['Service', `${form.typeOfService} – ${form.serviceFor}`],
                      ['Suburb',  form.suburb],
                      ['Phone',   form.phone],
                    ].map(([k,v]) => (
                      <div key={k} style={{ display: 'flex', justifyContent: 'space-between', gap: 16, padding: '10px 14px', borderRadius: 10, background: 'var(--off-white)' }}>
                        <span style={{ fontSize: '0.78rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{k}</span>
                        <strong style={{ fontSize: '0.88rem', color: 'var(--heading)' }}>{v}</strong>
                      </div>
                    ))}
                  </div>
                  <a href={CONTACT.phoneEmergencyRaw} className="btn-primary" style={{ justifyContent: 'center', width: '100%', padding: '13px' }}>
                    <Phone size={16} /> Call {CONTACT.phoneEmergency}
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {/* Honeypot */}
                  <input type="text" name="_gotcha" tabIndex="-1" autoComplete="off"
                    style={{ position: 'absolute', left: -9999, opacity: 0, pointerEvents: 'none' }} />

                  {/* Row: name + email */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="form-two-col">
                    <div>
                      <label htmlFor="q-name" style={labelStyle}>Full Name *</label>
                      <input id="q-name" type="text" required placeholder="John Smith"
                        value={form.name} onChange={e => set('name', e.target.value)}
                        style={inputStyle}
                        onFocus={e => { e.target.style.borderColor='var(--blue)'; e.target.style.boxShadow='0 0 0 3px rgba(37,99,235,0.1)' }}
                        onBlur={e  => { e.target.style.borderColor='var(--border)'; e.target.style.boxShadow='none' }}
                      />
                    </div>
                    <div>
                      <label htmlFor="q-email" style={labelStyle}>Email Address *</label>
                      <input id="q-email" type="email" required placeholder="john@example.com"
                        value={form.email} onChange={e => set('email', e.target.value)}
                        style={inputStyle}
                        onFocus={e => { e.target.style.borderColor='var(--blue)'; e.target.style.boxShadow='0 0 0 3px rgba(37,99,235,0.1)' }}
                        onBlur={e  => { e.target.style.borderColor='var(--border)'; e.target.style.boxShadow='none' }}
                      />
                    </div>
                  </div>

                  {/* Row: phone + suburb */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="form-two-col">
                    <div>
                      <label htmlFor="q-phone" style={labelStyle}>Contact Number *</label>
                      <input id="q-phone" type="tel" required placeholder="04xx xxx xxx"
                        pattern="[0-9()#&+*\-=.\s]+" title="Only numbers and phone characters are accepted."
                        value={form.phone} onChange={e => set('phone', e.target.value)}
                        style={inputStyle}
                        onFocus={e => { e.target.style.borderColor='var(--blue)'; e.target.style.boxShadow='0 0 0 3px rgba(37,99,235,0.1)' }}
                        onBlur={e  => { e.target.style.borderColor='var(--border)'; e.target.style.boxShadow='none' }}
                      />
                    </div>
                    <SelectField id="q-suburb" label="Suburb *"
                      value={form.suburb} placeholder="Please select your suburb"
                      options={SUBURBS} onChange={v => set('suburb', v)} />
                  </div>

                  {/* Property type chips */}
                  <ChipGroup legend="Property Type *" name="property_type"
                    options={PROPERTY_TYPES} value={form.propertyType}
                    onChange={v => set('propertyType', v)} />

                  {/* Service type chips */}
                  <ChipGroup legend="Type of Service *" name="type_of_service"
                    options={SERVICE_TYPES} value={form.typeOfService}
                    onChange={v => set('typeOfService', v)} />

                  {/* Service for + conditional door/gate type */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="form-two-col">
                    <SelectField id="q-service-for" label="Service For *"
                      value={form.serviceFor} placeholder="Select Service For"
                      options={SERVICE_FOR} onChange={v => set('serviceFor', v)} />
                    {form.serviceFor === 'Garage Door' && (
                      <SelectField id="q-garage-type" label="Type of Garage Door *"
                        value={form.garageDoorType} placeholder="Please Select Garage Type"
                        options={GARAGE_DOOR_TYPES} onChange={v => set('garageDoorType', v)} />
                    )}
                    {form.serviceFor === 'Gate' && (
                      <SelectField id="q-gate-type" label="Type of Gate *"
                        value={form.gateType} placeholder="Please Select Gate Type"
                        options={GATE_TYPES} onChange={v => set('gateType', v)} />
                    )}
                  </div>

                  {/* File upload */}
                  <div>
                    <label htmlFor="q-file" style={labelStyle}>Please Upload File (optional)</label>
                    <input ref={fileInputRef} id="q-file" type="file"
                      accept="image/png,image/jpeg,image/webp,application/pdf"
                      onChange={e => set('file', e.target.files?.[0] || null)}
                      style={{ position: 'absolute', width: 1, height: 1, opacity: 0, overflow: 'hidden', pointerEvents: 'none' }} />
                    <label htmlFor="q-file" style={{
                      minHeight: 82,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 16,
                      padding: '16px 18px',
                      border: `1.5px dashed ${isFileDragging || form.file ? 'var(--blue)' : 'var(--border)'}`,
                      borderRadius: 12,
                      background: isFileDragging || form.file ? 'var(--blue-light)' : 'linear-gradient(135deg, #fff, var(--off-white))',
                      cursor: 'pointer',
                      transition: 'border-color 0.2s, background 0.2s, box-shadow 0.2s',
                    }}
                      onDragEnter={e => { e.preventDefault(); setIsFileDragging(true) }}
                      onDragOver={e => e.preventDefault()}
                      onDragLeave={e => { e.preventDefault(); setIsFileDragging(false) }}
                      onDrop={handleFileDrop}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
                        <span style={{
                          width: 42,
                          height: 42,
                          borderRadius: 10,
                          background: form.file ? 'white' : 'var(--blue-light)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}>
                          {form.file ? <FileText size={20} color="var(--blue)" /> : <UploadCloud size={20} color="var(--blue)" />}
                        </span>
                        <span style={{ minWidth: 0 }}>
                          <strong style={{ display: 'block', color: 'var(--heading)', fontFamily: 'var(--font-display)', fontSize: '0.95rem' }}>
                            {form.file ? form.file.name : 'Choose file or drag it here'}
                          </strong>
                          <span style={{ display: 'block', color: 'var(--muted)', fontSize: '0.78rem', marginTop: 2 }}>
                            PNG, JPG, WEBP, or PDF accepted
                          </span>
                        </span>
                      </span>
                      <span style={{
                        flexShrink: 0,
                        borderRadius: 999,
                        background: 'var(--amber)',
                        color: 'white',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                        fontSize: '0.78rem',
                        padding: '8px 12px',
                      }}>
                        Browse
                      </span>
                    </label>
                    {form.file && (
                      <div style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        gap: 12, marginTop: 8, padding: '8px 12px',
                        border: '1px solid var(--border)', borderRadius: 8, background: 'var(--off-white)',
                        fontSize: '0.85rem', color: 'var(--subtle)',
                      }}>
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{form.file.name}</span>
                        <button type="button" onClick={removeFile}
                          style={{ flexShrink: 0, color: '#EF4444', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', background: 'none', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                          <X size={13} /> Remove
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Concern textarea */}
                  <div>
                    <label htmlFor="q-concern" style={labelStyle}>Describe Your Concern &amp; Required Service *</label>
                    <textarea id="q-concern" required rows={4}
                      placeholder="Tell us what's happening, the opener brand if known, and when the issue started..."
                      value={form.concern} onChange={e => set('concern', e.target.value)}
                      style={{ ...inputStyle, resize: 'vertical' }}
                      onFocus={e => { e.target.style.borderColor='var(--blue)'; e.target.style.boxShadow='0 0 0 3px rgba(37,99,235,0.1)' }}
                      onBlur={e  => { e.target.style.borderColor='var(--border)'; e.target.style.boxShadow='none' }}
                    />
                  </div>

                  {/* Spam protection */}
                  <div>
                    <label style={labelStyle}>Spam Protection *</label>
                    <div style={{
                      minHeight: 76,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: HAS_TURNSTILE ? 'flex-start' : 'center',
                      border: '1.5px solid var(--border)',
                      borderRadius: 10,
                      background: 'var(--off-white)',
                      padding: '10px 12px',
                    }}>
                      {HAS_TURNSTILE ? (
                        <TurnstileWidget
                          siteKey={TURNSTILE_SITE_KEY}
                          resetSignal={turnstileResetSignal}
                          onVerify={handleTurnstileVerify}
                          onExpire={resetTurnstile}
                        />
                      ) : (
                        <span style={{ color: 'var(--muted)', fontSize: '0.84rem', textAlign: 'center' }}>
                          Add your Cloudflare Turnstile site key in .env before live submissions.
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Error alert */}
                  {submitError && (
                    <div style={{
                      border: '1px solid rgba(239,68,68,0.35)', borderRadius: 10,
                      background: 'rgba(239,68,68,0.07)', color: '#991B1B',
                      padding: '12px 14px', fontSize: '0.88rem',
                    }} role="alert">{submitError}</div>
                  )}

                  {/* Submit */}
                  <button type="submit" className="btn-primary"
                    disabled={isSending}
                    style={{ width: '100%', justifyContent: 'center', padding: '15px', fontSize: '1rem', opacity: isSending ? 0.7 : 1 }}>
                    {isSending ? (
                      <>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ animation: 'contact-spin 0.8s linear infinite' }}>
                          <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3"/>
                          <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                        </svg>
                        Sending Quote…
                      </>
                    ) : 'Send Quote Request'}
                  </button>

                  <p style={{ fontSize: '0.78rem', color: 'var(--muted)', textAlign: 'center' }}>
                    Quote requests are submitted through the AGG Doors enquiry system. We never spam.
                  </p>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>

      <style>{`
        @keyframes contact-spin { to { transform: rotate(360deg); } }
        @media (max-width: 820px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 540px) {
          .form-two-col { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
