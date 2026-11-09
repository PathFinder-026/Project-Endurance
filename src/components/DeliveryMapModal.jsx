import React, { useState } from 'react';
import { X, Navigation, Clock, Phone, Send, Layers } from 'lucide-react';

export default function DeliveryMapModal({ isOpen, onClose, order }) {
  const [activeTab, setActiveTab] = useState('driver'); // 'driver' | 'heatmap'
  const [whatsappSent, setWhatsappSent] = useState(false);
  const [zoneSurchargeEnabled, setZoneSurchargeEnabled] = useState(true);

  if (!isOpen) return null;

  const currentOrder = order || {
    id: '104',
    customerName: 'Akash Sharma',
    phone: '447789123456',
    address: '12 Braehead Road, Glasgow, G51 4BN',
    driver: 'Michael Campbell',
    eta: '6 mins away',
    status: 'Out for Delivery'
  };

  return (
    <div className="modal-overlay" style={{ zIndex: 1100 }}>
      <div className="modal-content" style={{ maxWidth: '840px', padding: '24px' }}>
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff'
            }}>
              <Navigation size={20} />
            </div>
            <div>
              <h3 className="modal-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                Honest ETA Tracker &amp; Delivery Heatmap
                <span className="badge badge-green" style={{ fontSize: '0.72rem' }}>Features 31 &amp; 57</span>
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Live Mapbox GPS tracking with traffic lights telemetry &amp; delivery zone surcharge intelligence.
              </p>
            </div>
          </div>
          <button onClick={onClose} className="close-btn">
            <X size={18} />
          </button>
        </div>

        {/* View Switcher Tabs */}
        <div className="tab-pill-bar" style={{ margin: '14px 0 16px' }}>
          <button
            type="button"
            onClick={() => setActiveTab('driver')}
            className={`tab-pill ${activeTab === 'driver' ? 'active' : ''}`}
          >
            <Navigation size={14} style={{ display: 'inline', marginRight: '6px' }} />
            Live Driver GPS Tracking (Order #{currentOrder.id})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('heatmap')}
            className={`tab-pill ${activeTab === 'heatmap' ? 'active' : ''}`}
          >
            <Layers size={14} style={{ display: 'inline', marginRight: '6px' }} />
            Delivery Zone Heatmap &amp; £1.50 Surcharge
          </button>
        </div>

        {activeTab === 'driver' ? (
          <div>
            {/* Map Canvas Visualizer */}
            <div style={{
              position: 'relative',
              height: '320px',
              borderRadius: '16px',
              overflow: 'hidden',
              background: '#0f172a',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.5)'
            }}>
              {/* Map grid lines */}
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)',
                backgroundSize: '24px 24px'
              }} />

              {/* Road vectors simulation */}
              <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                {/* Secondary streets */}
                <path d="M 40 80 Q 200 120 400 90 T 780 140" stroke="rgba(255,255,255,0.08)" strokeWidth="6" fill="none" />
                <path d="M 120 280 Q 300 180 500 240 T 760 200" stroke="rgba(255,255,255,0.08)" strokeWidth="6" fill="none" />
                <path d="M 280 40 L 320 300" stroke="rgba(255,255,255,0.08)" strokeWidth="8" fill="none" />
                
                {/* Active Route Polyline from Shop to Customer */}
                <path
                  d="M 90 220 C 180 200, 260 140, 420 145 C 560 150, 640 110, 720 100"
                  stroke="rgba(59, 130, 246, 0.4)"
                  strokeWidth="8"
                  fill="none"
                />
                <path
                  d="M 90 220 C 180 200, 260 140, 420 145"
                  stroke="#10b981"
                  strokeWidth="6"
                  strokeDasharray="8 4"
                  fill="none"
                />

                {/* Shop Pin */}
                <circle cx="90" cy="220" r="14" fill="#133826" stroke="#10b981" strokeWidth="3" />
                <text x="90" y="252" fill="#a7f3d0" fontSize="11" fontWeight="700" textAnchor="middle">Shop</text>

                {/* Driver Pulse Point */}
                <circle cx="420" cy="145" r="22" fill="rgba(59, 130, 246, 0.25)" className="animate-ping" />
                <circle cx="420" cy="145" r="14" fill="#1d4ed8" stroke="#ffffff" strokeWidth="3" />
                <text x="420" y="122" fill="#93c5fd" fontSize="11" fontWeight="800" textAnchor="middle">
                  Michael (Courier #04)
                </text>

                {/* Customer Destination Pin */}
                <circle cx="720" cy="100" r="14" fill="#dc2626" stroke="#ffffff" strokeWidth="3" />
                <text x="720" y="80" fill="#fca5a5" fontSize="11" fontWeight="700" textAnchor="middle">
                  12 Braehead Rd
                </text>
              </svg>

              {/* Floating Live Telemetry HUD */}
              <div style={{
                position: 'absolute',
                top: '14px',
                left: '14px',
                padding: '10px 14px',
                borderRadius: '12px',
                background: 'rgba(15, 23, 42, 0.85)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                fontSize: '0.78rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
                  <span style={{ fontWeight: 800 }}>LIVE GPS TELEMETRY:</span>
                  <span style={{ color: '#60a5fa' }}>HONDA SCOOTER 125CC</span>
                </div>
                <div style={{ color: '#cbd5e1' }}>
                  Location: <strong style={{ color: '#fef08a' }}>Bridge Street Traffic Lights (Idle 30s)</strong>
                </div>
                <div style={{ color: '#94a3b8', fontSize: '0.72rem' }}>
                  Coordinates: 55.8642° N, 4.2518° W • Speed: 21 mph
                </div>
              </div>

              {/* ETA Badge */}
              <div style={{
                position: 'absolute',
                bottom: '14px',
                right: '14px',
                padding: '8px 16px',
                borderRadius: '9999px',
                background: '#10b981',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '0.86rem',
                boxShadow: '0 4px 14px rgba(16, 185, 129, 0.4)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <Clock size={16} />
                <span>Honest ETA: 6 mins away</span>
              </div>
            </div>

            {/* Bottom Driver Action Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '14px', marginTop: '16px' }}>
              <div style={{
                background: 'var(--bg-surface-secondary)',
                borderRadius: '12px',
                padding: '14px',
                border: '1px solid var(--border-color)'
              }}>
                <div style={{ fontSize: '0.76rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '6px' }}>
                  Feature 31: Honest ETA WhatsApp Dispatch
                </div>
                <div style={{
                  background: '#ecfdf5',
                  border: '1px solid #a7f3d0',
                  borderRadius: '10px',
                  padding: '10px 12px',
                  fontSize: '0.82rem',
                  color: '#065f46'
                }}>
                  💬 <em>"Michael is at the traffic lights on Bridge Street, 6 mins away."</em>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setWhatsappSent(true);
                    setTimeout(() => setWhatsappSent(false), 3000);
                  }}
                  className="btn-primary"
                  style={{ marginTop: '10px', fontSize: '0.78rem', padding: '6px 12px' }}
                >
                  <Send size={13} /> {whatsappSent ? 'Dispatched to Customer!' : 'Trigger Live WhatsApp Update'}
                </button>
              </div>

              <div style={{
                background: 'var(--bg-surface-secondary)',
                borderRadius: '12px',
                padding: '14px',
                border: '1px solid var(--border-color)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontSize: '0.76rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                    Driver Details
                  </div>
                  <div style={{ fontWeight: 800, fontSize: '0.94rem', color: 'var(--text-primary)', marginTop: '2px' }}>
                    {currentOrder.driver}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Driver ID: #04 • Completed 18 deliveries today
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                  <button
                    type="button"
                    onClick={() => alert(`Calling driver Michael on +44 7700 900412...`)}
                    className="btn-secondary"
                    style={{ flex: 1, fontSize: '0.76rem', padding: '6px' }}
                  >
                    <Phone size={13} /> Call Driver
                  </button>
                  <button
                    type="button"
                    onClick={() => alert('Driver marked as arrived at 12 Braehead Road.')}
                    className="btn-secondary"
                    style={{ flex: 1, fontSize: '0.76rem', padding: '6px' }}
                  >
                    Mark Arrived
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* TAB 2: Delivery Zone Heatmap (Feature 57) */
          <div>
            <div style={{
              background: '#0f172a',
              borderRadius: '16px',
              padding: '24px',
              position: 'relative',
              overflow: 'hidden',
              minHeight: '280px',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '14px',
                position: 'relative',
                zIndex: 2
              }}>
                {/* Zone 1: Green */}
                <div style={{
                  background: 'rgba(16, 185, 129, 0.15)',
                  border: '2px solid #10b981',
                  borderRadius: '12px',
                  padding: '16px',
                  color: '#ffffff'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#34d399' }}>ZONE 1 (0–3 MILES)</span>
                    <span className="badge badge-green" style={{ fontSize: '0.68rem' }}>Profitable</span>
                  </div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, marginTop: '8px' }}>£2.50</div>
                  <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>Standard Flat Delivery Fee</div>
                  <div style={{ fontSize: '0.72rem', color: '#34d399', marginTop: '6px' }}>
                    Avg Trip: 12 mins • Net Margin: 92%
                  </div>
                </div>

                {/* Zone 2: Amber */}
                <div style={{
                  background: 'rgba(245, 158, 11, 0.15)',
                  border: '2px solid #f59e0b',
                  borderRadius: '12px',
                  padding: '16px',
                  color: '#ffffff'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#fbbf24' }}>ZONE 2 (3–5 MILES)</span>
                    <span className="badge badge-amber" style={{ fontSize: '0.68rem' }}>+£1.50 Surcharge</span>
                  </div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, marginTop: '8px' }}>£4.00</div>
                  <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>Includes £1.50 Auto-Surcharge</div>
                  <div style={{ fontSize: '0.72rem', color: '#fbbf24', marginTop: '6px' }}>
                    Avg Trip: 24 mins • Covers Fuel &amp; Time
                  </div>
                </div>

                {/* Zone 3: Red */}
                <div style={{
                  background: 'rgba(239, 68, 68, 0.15)',
                  border: '2px solid #ef4444',
                  borderRadius: '12px',
                  padding: '16px',
                  color: '#ffffff'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#f87171' }}>ZONE 3 (5+ MILES)</span>
                    <span className="badge badge-red" style={{ fontSize: '0.68rem' }}>Restricted</span>
                  </div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, marginTop: '8px' }}>£5.50</div>
                  <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>Requires Min Order £25.00</div>
                  <div style={{ fontSize: '0.72rem', color: '#f87171', marginTop: '6px' }}>
                    High traffic congestion friction
                  </div>
                </div>
              </div>

              {/* Surcharge Configuration Row */}
              <div style={{
                marginTop: '20px',
                padding: '14px',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.05)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                color: '#ffffff'
              }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>
                    Feature 57 Auto-Surcharge Enforcement
                  </div>
                  <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>
                    Automatically applies £1.50 surcharge in red/amber postcode zones during peak traffic.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setZoneSurchargeEnabled(!zoneSurchargeEnabled)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: 'none',
                    background: zoneSurchargeEnabled ? '#10b981' : '#64748b',
                    color: '#ffffff',
                    fontWeight: 800,
                    fontSize: '0.8rem',
                    cursor: 'pointer'
                  }}
                >
                  {zoneSurchargeEnabled ? '✓ Surcharge Active' : 'Surcharge Disabled'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
