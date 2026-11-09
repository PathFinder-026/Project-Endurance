import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle,
  Eye,
  EyeOff,
  Plus,
  ShoppingBag,
  CircleDollarSign,
  Clock,
  Users,
  TrendingUp,
  PhoneCall,
  ArrowRight,
  ChevronRight,
  Headphones,
  AlertTriangle,
  Package,
  Repeat,
  History,
  MessageSquare,
  PieChart as PieIcon,
  Hourglass,
  Layers,
  ArrowUpRight,
  ExternalLink,
  MessageCircle,
  Sparkles,
  MoreHorizontal,
  Flame,
  Play,
  Printer,
  Navigation
} from 'lucide-react';

export default function LiveOpsKitchen({
  orders,
  onBumpOrder,
  onInspectOrder,
  onOpenAddProduct,
  onOpenThermalReceipt,
  onOpenDeliveryMap,
  onNavigate,
  hideValues,
  setHideValues
}) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'queue' | 'phone-issue'
  const [metricSlide, setMetricSlide] = useState(0);
  const [popularityFilter, setPopularityFilter] = useState('Popularity');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [hoverX, setHoverX] = useState(268);
  const [isHoveringChart, setIsHoveringChart] = useState(false);

  const [phoneForm, setPhoneForm] = useState({
    phone: '',
    name: '',
    orderId: '',
    details: ''
  });
  const [toastMessage, setToastMessage] = useState('');

  const pendingOrders = orders.filter((o) => o.stage === 'pending');
  const totalPendingValue = pendingOrders.reduce((sum, o) => sum + o.amount, 0);

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    if (!phoneForm.phone || !phoneForm.details) return;

    setToastMessage(`Issue logged for ${phoneForm.phone}. Dispatch notification sent to management ledger.`);
    setPhoneForm({ phone: '', name: '', orderId: '', details: '' });
    setTimeout(() => setToastMessage(''), 4000);
  };

  return (
    <div className="page-container">
      {toastMessage && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 999,
          backgroundColor: '#064e3b',
          color: '#a7f3d0',
          padding: '12px 20px',
          borderRadius: '10px',
          border: '1px solid #059669',
          boxShadow: '0 10px 15px rgba(0,0,0,0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '0.88rem'
        }}>
          <CheckCircle size={16} /> {toastMessage}
        </div>
      )}

      {/* Sleek Minimalist Sub-Header Actions Pill Strip */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', padding: '0 4px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => setActiveTab('overview')}
            className={`sub-tab-pill ${activeTab === 'overview' ? 'active' : ''}`}
          >
            Analytics Overview
          </button>
          <button
            onClick={() => setActiveTab('queue')}
            className={`sub-tab-pill ${activeTab === 'queue' ? 'active' : ''}`}
          >
            Kitchen Queue ({pendingOrders.length})
          </button>
          <button
            onClick={() => setActiveTab('phone-issue')}
            className={`sub-tab-pill ${activeTab === 'phone-issue' ? 'active' : ''}`}
          >
            Log Walk-In Issue
          </button>
          <button
            onClick={() => onOpenThermalReceipt && onOpenThermalReceipt(orders[0])}
            className="sub-action-pill"
            style={{ color: '#047857' }}
            title="Thermal Kitchen Docket (Feature 24)"
          >
            <Printer size={14} color="#059669" /> Thermal Docket
          </button>
          <button
            onClick={() => onOpenDeliveryMap && onOpenDeliveryMap(orders[0])}
            className="sub-action-pill"
            style={{ color: '#3b82f6' }}
            title="Honest ETA Tracker & Delivery Heatmap (Features 31 & 57)"
          >
            <Navigation size={14} color="#3b82f6" /> Live Driver GPS
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => setHideValues(!hideValues)}
            className="sub-action-pill"
          >
            {hideValues ? <Eye size={14} /> : <EyeOff size={14} />}
            <span>{hideValues ? 'Show values' : 'Hide values'}</span>
          </button>
          <button
            onClick={onOpenAddProduct}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 18px',
              borderRadius: '9999px',
              border: 'none',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: '#ffffff',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)'
            }}
          >
            <Plus size={14} />
            <span>Add product</span>
          </button>
        </div>
      </div>

      {/* TAB 1: Store Overview */}
      {activeTab === 'overview' && (
        <div key="overview" className="panel-zoom-entrance" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* =========================================================================
              IMAGE 2 ROW 1: HERO BANNER + ACTIVE USERS WAVE + LATEST SALES
              ========================================================================= */}
          <div className="live-ops-hero-grid" style={{ alignItems: 'stretch' }}>
            {/* HERO BANNER CARD: KITCHEN VELOCITY & ORDERS */}
            <div className="image2-hero-card glass-specular-shimmer stagger-1" style={{ position: 'relative', overflow: 'hidden' }}>
              {/* Holographic 3D Translucent Emerald Radar & Orbital Hexagon */}
              <div style={{
                position: 'absolute',
                right: '28px',
                top: '46%',
                transform: 'translateY(-50%)',
                width: '270px',
                height: '270px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(16, 185, 129, 0.22) 0%, rgba(16, 185, 129, 0.08) 45%, transparent 72%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none',
                zIndex: 1
              }}>
                {/* Outer concentric radar rings */}
                <div style={{
                  position: 'absolute',
                  inset: '-6px',
                  borderRadius: '50%',
                  border: '1.5px dashed rgba(16, 185, 129, 0.3)',
                  animation: 'pulseConcentricRings 22s linear infinite'
                }} />
                <div style={{
                  position: 'absolute',
                  inset: '28px',
                  borderRadius: '50%',
                  border: '1px solid rgba(16, 185, 129, 0.22)'
                }} />
                <div style={{
                  position: 'absolute',
                  inset: '56px',
                  borderRadius: '50%',
                  border: '1px dashed rgba(16, 185, 129, 0.2)'
                }} />

                {/* Radar sweep beam */}
                <div style={{
                  position: 'absolute',
                  width: '130px',
                  height: '130px',
                  borderRadius: '50%',
                  background: 'conic-gradient(from 0deg, transparent 0deg, rgba(16, 185, 129, 0.28) 60deg, transparent 90deg)',
                  animation: 'radarSweep 6s linear infinite'
                }} />

                {/* Central Holographic 3D Glass Hexagon Emblem */}
                <div
                  className="image2-hero-hexagon"
                  style={{
                    width: '110px',
                    height: '110px',
                    borderRadius: '30px',
                    backdropFilter: 'blur(24px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    animation: 'hexagonFloat 6s ease-in-out infinite'
                  }}
                >
                  <div style={{
                    transform: 'rotate(-45deg)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
                      <line x1="12" y1="22" x2="12" y2="15.5" />
                      <polyline points="22 8.5 12 15.5 2 8.5" />
                      <polyline points="12 2 12 8.5" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Content Left */}
              <div style={{ position: 'relative', zIndex: 2, maxWidth: '420px' }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '5px 14px',
                  borderRadius: '9999px',
                  background: 'rgba(16, 185, 129, 0.12)',
                  border: '1px solid rgba(16, 185, 129, 0.28)',
                  color: '#047857',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  marginBottom: '14px'
                }}>
                  <Sparkles size={13} />
                  <span>LIVE PEAK DISPATCH</span>
                </div>

                <h2 style={{
                  fontSize: '2.5rem',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  lineHeight: 1.12,
                  letterSpacing: '-0.03em',
                  margin: '0 0 12px'
                }}>
                  Kitchen Velocity <br /> & Orders
                </h2>

                <p style={{
                  fontSize: '0.88rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.45,
                  margin: '0 0 20px',
                  maxWidth: '360px',
                  fontWeight: 500
                }}>
                  Real-time automated bump station, delivery dispatch & order intelligence
                </p>

                <button
                  onClick={() => setActiveTab('queue')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '12px 28px',
                    borderRadius: '9999px',
                    background: 'var(--text-primary)',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 8px 20px rgba(15, 23, 42, 0.18)',
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)';
                    e.currentTarget.style.background = '#059669';
                    e.currentTarget.style.boxShadow = '0 10px 24px rgba(16, 185, 129, 0.35)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.background = 'var(--text-primary)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(15, 23, 42, 0.18)';
                  }}
                >
                  <span>Manage Stations</span>
                  <ArrowRight size={15} />
                </button>
              </div>

              {/* FLOATING FROSTED GLASS STATS PILL CAPSULE */}
              <div className="image2-stats-pill" style={{ animation: 'statsPillSlideIn 0.35s ease' }}>
                {metricSlide === 0 ? (
                  <>
                    <div className="image2-stat-unit">
                      <span style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1 }}>
                        148
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '3px' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#06b6d4' }} />
                        <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 600 }}>Tickets</span>
                      </div>
                    </div>

                    <div className="image2-stat-unit">
                      <span style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1 }}>
                        99.4%
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '3px' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981' }} />
                        <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 600 }}>On-Time Bump</span>
                      </div>
                    </div>

                    <div className="image2-stat-unit">
                      <span style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1 }}>
                        {hideValues ? '••••' : '£3,840'}
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '3px' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#f59e0b' }} />
                        <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 600 }}>Gross Rev</span>
                      </div>
                    </div>

                    <div className="image2-stat-unit">
                      <span style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1 }}>
                        12
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '3px' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
                        <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 600 }}>Exp. Alert</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="image2-stat-unit">
                      <span style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1 }}>
                        8m 12s
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '3px' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981' }} />
                        <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 600 }}>Avg Prep Time</span>
                      </div>
                    </div>

                    <div className="image2-stat-unit">
                      <span style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1 }}>
                        {hideValues ? '••••' : '£28.50'}
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '3px' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#3b82f6' }} />
                        <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 600 }}>Avg Ticket</span>
                      </div>
                    </div>

                    <div className="image2-stat-unit">
                      <span style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1 }}>
                        4.9 ★
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '3px' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#f59e0b' }} />
                        <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 600 }}>Kitchen CSAT</span>
                      </div>
                    </div>

                    <div className="image2-stat-unit">
                      <span style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1 }}>
                        0.0%
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '3px' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#8b5cf6' }} />
                        <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 600 }}>Waste Loss</span>
                      </div>
                    </div>
                  </>
                )}

                {/* Slider Toggle Arrow */}
                <button
                  className="stats-pill-arrow-btn"
                  onClick={() => setMetricSlide((prev) => (prev === 0 ? 1 : 0))}
                  title="Cycle kitchen operations metrics"
                >
                  <ChevronRight size={18} style={{ transform: metricSlide === 1 ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s ease' }} />
                </button>
              </div>
            </div>

            {/* RIGHT COLUMN: 2 STACKED CARDS */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* CARD 1: ACTIVE HOURLY KITCHEN RUSH VELOCITY */}
              <div
                className="curve-chart-card stagger-2"
                style={{ position: 'relative', overflow: 'hidden' }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = Math.max(20, Math.min(320, ((e.clientX - rect.left) / rect.width) * 340));
                  setHoverX(x);
                  setIsHoveringChart(true);
                }}
                onMouseLeave={() => setIsHoveringChart(false)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ fontSize: '0.94rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span>Active Hourly Kitchen Rush Velocity</span>
                      <span style={{ color: '#f59e0b', fontSize: '0.95rem' }}>⚡</span>
                    </h3>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '4px 11px',
                    borderRadius: '9999px',
                    background: 'var(--text-primary)',
                    color: '#ffffff',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    boxShadow: '0 4px 10px rgba(15, 23, 42, 0.15)'
                  }}>
                    <span>59 Orders/hr</span>
                  </div>
                </div>

                {/* Dual-Wave SVG Chart with Rush Hour Peak */}
                <div style={{ position: 'relative', width: '100%', height: '85px', margin: '6px 0 4px' }}>
                  <svg viewBox="0 0 340 85" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                    <defs>
                      <linearGradient id="emeraldCurveGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Dynamic Interactive Cursor Line */}
                    {isHoveringChart && (
                      <line x1={hoverX} y1="0" x2={hoverX} y2="85" stroke="rgba(16, 185, 129, 0.4)" strokeWidth="1.5" strokeDasharray="3 3" />
                    )}

                    {/* Peak Highlight Vertical Pillar Bar at 279px */}
                    <rect x="268" y="8" width="22" height="70" rx="11" fill="rgba(16, 185, 129, 0.08)" />

                    {/* Wave 2 Area Fill: Emerald */}
                    <path
                      d="M 10 42 Q 60 70, 110 46 T 190 65 T 270 28 T 330 65 L 330 85 L 10 85 Z"
                      fill="url(#emeraldCurveGrad)"
                    />

                    {/* Wave 1: Amber Rush curve */}
                    <path
                      d="M 10 60 Q 55 35, 95 55 T 180 40 T 260 18 T 330 58"
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      className="animated-wave-amber"
                    />

                    {/* Wave 2: Emerald Velocity curve */}
                    <path
                      d="M 10 42 Q 60 70, 110 46 T 190 65 T 270 28 T 330 65"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      className="animated-wave-emerald"
                    />

                    {/* Glowing Anchor Point at Peak */}
                    <circle cx="279" cy="18" r="5" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" style={{ filter: 'drop-shadow(0 0 6px rgba(245, 158, 11, 0.7))' }} />
                  </svg>
                </div>

                {/* X-Axis Hour Markers */}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-light)', fontWeight: 600, padding: '0 8px' }}>
                  <span>12:00</span>
                  <span>14:00</span>
                  <span>18:00</span>
                  <span style={{ color: '#047857', fontWeight: 800 }}>20:00 (Peak)</span>
                </div>
              </div>

              {/* CARD 2: TODAY'S GROSS & BEST SELLER */}
              <div className="latest-sales-card stagger-3" style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Today's Gross & Best Seller</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', margin: '4px 0 10px' }}>
                    <div style={{ fontSize: '2.1rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em', lineHeight: 1 }}>
                      {hideValues ? '••••' : '£1,480'}
                    </div>
                    <span style={{
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      color: '#047857',
                      background: 'rgba(16, 185, 129, 0.14)',
                      border: '1px solid rgba(16, 185, 129, 0.25)',
                      padding: '3px 8px',
                      borderRadius: '9999px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <TrendingUp size={11} />
                      +24.8% vs last week
                    </span>
                  </div>

                  {/* Best Seller Dish Badge */}
                  <div className="best-seller-dish-badge">
                    <span style={{ fontSize: '1rem' }}>🍝</span>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      Truffle Tagliolini
                    </span>
                    <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                      · 84 orders
                    </span>
                  </div>
                </div>

                {/* Growth Pill Accent Squircle */}
                <div
                  className="growth-pill-squircle"
                  style={{
                    width: '90px',
                    height: '92px',
                    borderRadius: '22px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '8px',
                    textAlign: 'center',
                    gap: '4px'
                  }}
                >
                  <div className="growth-icon-box">
                    <TrendingUp size={20} color="#059669" />
                  </div>
                  <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--brand-primary)' }}>
                    +24.8%
                  </span>
                  <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                    Growth
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* =========================================================================
              LIVE KITCHEN STATION VELOCITY & EXPEDITOR QUEUE (TABLE CARD)
              ========================================================================= */}
          <div className="top-tracks-card motion-card-enter">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                  Live Kitchen Station Velocity & Expeditor Queue
                </h3>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  Real-time station capacity, preparation speed & line flow across kitchen sections
                </div>
              </div>

              {/* Station Filter Dropdown Pill */}
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 18px',
                    borderRadius: '9999px',
                    background: 'var(--glass-pill-bg)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <span>{popularityFilter === 'Popularity' ? 'Station' : popularityFilter}</span>
                  <ChevronRight size={14} style={{ transform: isFilterOpen ? 'rotate(-90deg)' : 'rotate(90deg)', transition: 'transform 0.2s ease' }} />
                </button>

                {isFilterOpen && (
                  <div className="station-filter-dropdown">
                    {['All Stations', 'Wood-Fired Pizza', 'Artisan Pasta', 'Grill & Burgers'].map((opt) => (
                      <div
                        key={opt}
                        onClick={() => {
                          setPopularityFilter(opt);
                          setIsFilterOpen(false);
                        }}
                        className={`station-filter-item ${popularityFilter === opt ? 'active' : ''}`}
                      >
                        {opt}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Table Header Labels */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '2.2fr 1fr 1fr 1.2fr 140px',
              padding: '0 18px 12px',
              fontSize: '0.74rem',
              fontWeight: 700,
              color: 'var(--text-light)',
              letterSpacing: '0.03em',
              textTransform: 'uppercase'
            }}>
              <span>Station Name</span>
              <span>Active Tickets</span>
              <span>Avg Prep Time</span>
              <span>Load Velocity</span>
              <span style={{ textAlign: 'right' }}>Status</span>
            </div>

            {/* Row 1: Wood-Fired Pizza Line */}
            <div className="top-tracks-row" onClick={() => setActiveTab('queue')}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  boxShadow: '0 6px 14px rgba(16, 185, 129, 0.25)',
                  flexShrink: 0,
                  fontSize: '1.25rem'
                }}>
                  🍕
                </div>
                <div>
                  <div style={{ fontSize: '0.94rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    Wood-Fired Pizza Line
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    Oven Station · 2 Dedicated Chefs
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#10b981' }} />
                <span>18</span>
              </div>

              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={13} color="#64748b" />
                <span>8m 12s</span>
              </div>

              {/* Sparkline Wave: Rising Green */}
              <div style={{ width: '100px', height: '24px' }}>
                <svg viewBox="0 0 100 24" style={{ width: '100%', height: '100%' }}>
                  <path d="M 0 20 Q 20 8, 40 14 T 70 6 T 100 2" fill="none" stroke="#10b981" strokeWidth="2.4" strokeLinecap="round" />
                </svg>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span className="station-status-pill green">
                  Smooth Flow
                </span>
              </div>
            </div>

            {/* Row 2: Artisan Pasta & Mains */}
            <div className="top-tracks-row" onClick={() => setActiveTab('queue')}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  boxShadow: '0 6px 14px rgba(245, 158, 11, 0.25)',
                  flexShrink: 0,
                  fontSize: '1.25rem'
                }}>
                  🍝
                </div>
                <div>
                  <div style={{ fontSize: '0.94rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    Artisan Pasta & Mains
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    Sauté Station · Pan Line
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#f59e0b' }} />
                <span>24</span>
              </div>

              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={13} color="#64748b" />
                <span>12m 40s</span>
              </div>

              {/* Sparkline Wave: High Load Amber */}
              <div style={{ width: '100px', height: '24px' }}>
                <svg viewBox="0 0 100 24" style={{ width: '100%', height: '100%' }}>
                  <path d="M 0 16 Q 25 2, 50 18 T 75 4 T 100 8" fill="none" stroke="#f59e0b" strokeWidth="2.4" strokeLinecap="round" />
                </svg>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span className="station-status-pill amber">
                  High Load (Peak)
                </span>
              </div>
            </div>

            {/* Row 3: Gourmet Burgers & Grill */}
            <div className="top-tracks-row" onClick={() => setActiveTab('queue')}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  boxShadow: '0 6px 14px rgba(16, 185, 129, 0.25)',
                  flexShrink: 0,
                  fontSize: '1.25rem'
                }}>
                  🍔
                </div>
                <div>
                  <div style={{ fontSize: '0.94rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    Gourmet Burgers & Grill
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    Charcoal Flat-Top · Fryers
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#10b981' }} />
                <span>14</span>
              </div>

              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={13} color="#64748b" />
                <span>7m 15s</span>
              </div>

              {/* Sparkline Wave: Steady Green */}
              <div style={{ width: '100px', height: '24px' }}>
                <svg viewBox="0 0 100 24" style={{ width: '100%', height: '100%' }}>
                  <path d="M 0 14 Q 30 18, 55 8 T 80 12 T 100 4" fill="none" stroke="#10b981" strokeWidth="2.4" strokeLinecap="round" />
                </svg>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span className="station-status-pill green">
                  On Schedule
                </span>
              </div>
            </div>
          </div>

          {/* ROW 1: 4 KPI Cards in Responsive Grid */}
          <div className="live-ops-kpi-grid">
            {/* Card 1: Orders Today */}
            <div
              className="kpi-card"
              style={{ cursor: 'pointer', padding: '22px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              onClick={() => onNavigate('orders')}
            >
              <div>
                <div className="kpi-top-row">
                  <span className="kpi-title" style={{ fontSize: '0.9rem', fontWeight: 600 }}>Orders today</span>
                  <div className="kpi-icon-wrap">
                    <ShoppingBag size={17} />
                  </div>
                </div>
                <div className="kpi-value" style={{ fontSize: '2rem', fontWeight: 800, margin: '6px 0 12px' }}>
                  0
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: '10px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#059669', fontSize: '0.8rem', fontWeight: 700 }}>
                    <TrendingUp size={13} />
                    <span>200% vs previous 7 days</span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    Today (Europe/London)
                  </div>
                </div>
                {/* 6 vertical bars sparkline */}
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '24px' }}>
                  <span style={{ width: '3px', height: '4px', backgroundColor: '#a7f3d0', borderRadius: '1px' }}></span>
                  <span style={{ width: '3px', height: '6px', backgroundColor: '#a7f3d0', borderRadius: '1px' }}></span>
                  <span style={{ width: '3px', height: '8px', backgroundColor: '#6ee7b7', borderRadius: '1px' }}></span>
                  <span style={{ width: '3px', height: '12px', backgroundColor: '#34d399', borderRadius: '1px' }}></span>
                  <span style={{ width: '3px', height: '18px', backgroundColor: '#10b981', borderRadius: '1px' }}></span>
                  <span style={{ width: '3px', height: '24px', backgroundColor: '#059669', borderRadius: '1px' }}></span>
                </div>
              </div>
            </div>

            {/* Card 2: Total Revenue */}
            <div
              className="kpi-card"
              style={{ cursor: 'pointer', padding: '22px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              onClick={() => onNavigate('financials')}
            >
              <div>
                <div className="kpi-top-row">
                  <span className="kpi-title" style={{ fontSize: '0.9rem', fontWeight: 600 }}>Total revenue</span>
                  <div className="kpi-icon-wrap">
                    <CircleDollarSign size={17} />
                  </div>
                </div>
                <div className="kpi-value" style={{ fontSize: '2rem', fontWeight: 800, margin: '6px 0 12px' }}>
                  {hideValues ? '••••' : '£0.00'}
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Delivered orders · last 30 days
                </div>
                {/* 8 green horizontal dots sparkline */}
                <div style={{ display: 'flex', gap: '4px' }}>
                  <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#a7f3d0' }}></span>
                  <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#a7f3d0' }}></span>
                  <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#6ee7b7' }}></span>
                  <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#6ee7b7' }}></span>
                  <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#34d399' }}></span>
                  <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#34d399' }}></span>
                  <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#10b981' }}></span>
                  <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#059669' }}></span>
                </div>
              </div>
            </div>

            {/* Card 3: Pending Order Value */}
            <div
              className="kpi-card"
              style={{ cursor: 'pointer', padding: '22px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              onClick={() => onNavigate('orders')}
            >
              <div>
                <div className="kpi-top-row">
                  <span className="kpi-title" style={{ fontSize: '0.9rem', fontWeight: 600 }}>Pending order value</span>
                  <div className="kpi-icon-wrap">
                    <Clock size={17} />
                  </div>
                </div>
                <div className="kpi-value" style={{ fontSize: '2rem', fontWeight: 800, margin: '6px 0 12px' }}>
                  {hideValues ? '••••' : `£${totalPendingValue.toFixed(2)}`}
                </div>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', paddingTop: '10px' }}>
                <span>{pendingOrders.length} active orders · not delivered or cancelled</span>
              </div>
            </div>

            {/* Card 4: Active Customers */}
            <div
              className="kpi-card"
              style={{ cursor: 'pointer', padding: '22px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              onClick={() => onNavigate('customers')}
            >
              <div>
                <div className="kpi-top-row">
                  <span className="kpi-title" style={{ fontSize: '0.9rem', fontWeight: 600 }}>Active customers</span>
                  <div className="kpi-icon-wrap">
                    <Users size={17} />
                  </div>
                </div>
                <div className="kpi-value" style={{ fontSize: '2rem', fontWeight: 800, margin: '6px 0 12px' }}>
                  2
                </div>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', paddingTop: '10px' }}>
                <span>Customers ordering in the last 30 days</span>
              </div>
            </div>
          </div>

          {/* ROW 2: 3 Columns Responsive Grid (Stock Health & Kitchen Score | Recent Orders | Operational status) */}
          <div className="live-ops-tri-grid">
            {/* Column 1: Stock health & Kitchen Score with Radial Gauge */}
            <div className="kpi-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div className="kpi-top-row">
                  <div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                      Stock health & Kitchen Score
                    </h3>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      Live Kitchen Health: 76% · Stock Healthy: 100%
                    </div>
                  </div>
                  <div className="kpi-icon-wrap">
                    <Package size={18} />
                  </div>
                </div>

                {/* Radial Semi-Circle Gauge SVG with Warm Golden Amber Glow */}
                <div style={{ textAlign: 'center', margin: '22px 0 16px' }}>
                  <div style={{ position: 'relative', width: '220px', height: '110px', margin: '0 auto' }}>
                    <svg viewBox="0 0 100 50" style={{ width: '100%', height: '100%' }}>
                      <path
                        d="M 10 50 A 40 40 0 0 1 90 50"
                        fill="none"
                        stroke="var(--border-color)"
                        strokeWidth="10"
                        strokeLinecap="round"
                      />
                      <path
                        d="M 10 50 A 40 40 0 0 1 78 18"
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="10"
                        strokeLinecap="round"
                        style={{ filter: 'drop-shadow(0 0 8px rgba(245, 158, 11, 0.45))' }}
                      />
                    </svg>
                    <div style={{
                      position: 'absolute',
                      bottom: '0',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      textAlign: 'center'
                    }}>
                      <span style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>
                        76%
                      </span>
                      <div style={{ fontSize: '0.78rem', color: '#f59e0b', fontWeight: 700, marginTop: '2px' }}>
                        ● Watch
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3 Metrics Bottom Frosted Glass Pill Capsule */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: '8px',
                textAlign: 'center',
                paddingTop: '16px',
                borderTop: '1px solid var(--border-color)',
                cursor: 'pointer'
              }}
              onClick={() => onNavigate('inventory')}
              >
                <div className="kitchen-score-pill">
                  <div className="score-pill-label">Low stock</div>
                  <div className="score-pill-value">0</div>
                </div>
                <div className="kitchen-score-pill">
                  <div className="score-pill-label">Out of stock</div>
                  <div className="score-pill-value">0</div>
                </div>
                <div className="kitchen-score-pill">
                  <div className="score-pill-label">Expiring</div>
                  <div className="score-pill-value">0</div>
                </div>
              </div>
            </div>

            {/* Column 2: Recent orders */}
            <div className="kpi-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div className="kpi-top-row">
                  <div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                      Recent orders
                    </h3>
                    <div style={{ fontSize: '1.6rem', fontWeight: 800, margin: '4px 0 12px' }}>
                      {pendingOrders.length} <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-muted)' }}>active orders</span>
                    </div>
                  </div>
                  <div className="kpi-icon-wrap">
                    <ShoppingBag size={18} />
                  </div>
                </div>

                {/* Orders List Rows (Clickable to inspect) */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div
                    onClick={() => orders[0] && onInspectOrder(orders[0])}
                    className="recent-orders-row"
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#f59e0b', flexShrink: 0 }}></span>
                      <strong style={{ color: 'var(--text-muted)' }}>Nov 1</strong>
                      <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Akash Brahmbhatt</span>
                    </div>
                    <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{hideValues ? '••••' : '£39.96'}</span>
                  </div>

                  <div
                    onClick={() => (orders[1] || orders[0]) && onInspectOrder(orders[1] || orders[0])}
                    className="recent-orders-row"
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#f59e0b', flexShrink: 0 }}></span>
                      <strong style={{ color: 'var(--text-muted)' }}>Oct 30</strong>
                      <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Akash Brahmbhatt</span>
                    </div>
                    <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{hideValues ? '••••' : '£14.50'}</span>
                  </div>

                  <div
                    onClick={() => (orders[1] || orders[0]) && onInspectOrder(orders[1] || orders[0])}
                    className="recent-orders-row"
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#f59e0b', flexShrink: 0 }}></span>
                      <strong style={{ color: 'var(--text-muted)' }}>Oct 30</strong>
                      <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Akash Brahmbhatt</span>
                    </div>
                    <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{hideValues ? '••••' : '£14.50'}</span>
                  </div>

                  <div
                    onClick={() => (orders[2] || orders[0]) && onInspectOrder(orders[2] || orders[0])}
                    className="recent-orders-row"
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#ef4444', flexShrink: 0 }}></span>
                      <strong style={{ color: 'var(--text-muted)' }}>Oct 25</strong>
                      <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Sakib</span>
                    </div>
                    <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{hideValues ? '••••' : '£120.00'}</span>
                  </div>
                </div>
              </div>

              {/* Clickable awaiting delivery button -> redirects to active orders / kitchen */}
              <button
                onClick={() => onNavigate('orders')}
                className="awaiting-delivery-btn"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Hourglass size={16} />
                  <span>{hideValues ? '••••' : `£${totalPendingValue.toFixed(2)}`} awaiting delivery</span>
                </div>
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Column 3: Operational status Card */}
            <div className="kpi-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div className="kpi-top-row" style={{ marginBottom: '14px' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800 }}>Operational status</h3>
                  <div className="kpi-icon-wrap">
                    <Clock size={18} />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {/* Row 1: Support needs attention -> redirects to Ledger & Disputes */}
                  <div
                    onClick={() => onNavigate('ledger')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 8px',
                      borderBottom: '1px solid var(--border-light)',
                      cursor: 'pointer'
                    }}
                    className="clickable-status-row"
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <Headphones size={17} color="var(--text-muted)" />
                      <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Support needs attention</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, color: 'var(--text-secondary)' }}>
                      <span>0</span>
                      <ChevronRight size={15} color="var(--text-muted)" />
                    </div>
                  </div>

                  {/* Row 2: Low stock products -> redirects to Inventory */}
                  <div
                    onClick={() => onNavigate('inventory')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 8px',
                      borderBottom: '1px solid var(--border-light)',
                      cursor: 'pointer'
                    }}
                    className="clickable-status-row"
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <AlertTriangle size={17} color="var(--text-muted)" />
                      <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Low stock products</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, color: 'var(--text-secondary)' }}>
                      <span>0</span>
                      <ChevronRight size={15} color="var(--text-muted)" />
                    </div>
                  </div>

                  {/* Row 3: Out of stock -> redirects to Inventory */}
                  <div
                    onClick={() => onNavigate('inventory')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 8px',
                      borderBottom: '1px solid var(--border-light)',
                      cursor: 'pointer'
                    }}
                    className="clickable-status-row"
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <Package size={17} color="var(--text-muted)" />
                      <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Out of stock</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, color: 'var(--text-secondary)' }}>
                      <span>0</span>
                      <ChevronRight size={15} color="var(--text-muted)" />
                    </div>
                  </div>

                  {/* Row 4: Active subscriptions -> redirects to Subscriptions */}
                  <div
                    onClick={() => onNavigate('subscriptions')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 8px',
                      borderBottom: '1px solid var(--border-light)',
                      cursor: 'pointer'
                    }}
                    className="clickable-status-row"
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <Repeat size={17} color="var(--text-muted)" />
                      <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Active subscriptions</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, color: 'var(--text-secondary)' }}>
                      <span>0</span>
                      <ChevronRight size={15} color="var(--text-muted)" />
                    </div>
                  </div>

                  {/* Row 5: Audit events 24h -> redirects to Compliance & Logs */}
                  <div
                    onClick={() => onNavigate('compliance')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 8px',
                      cursor: 'pointer'
                    }}
                    className="clickable-status-row"
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <History size={17} color="var(--text-muted)" />
                      <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Audit events · 24h</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, color: 'var(--text-secondary)' }}>
                      <span>3</span>
                      <ChevronRight size={15} color="var(--text-muted)" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ROW 3: 3 Columns in 1 Line (Quick actions | Orders by status | Customer conversations) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', alignItems: 'stretch' }}>
            {/* 1. Quick Actions Frosted Glass Widget - Matching Image 2 */}
            <div className="kpi-card" style={{
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '350px'
            }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
                  Quick actions
                </h3>
                <div style={{ fontSize: '0.8rem', fontWeight: 400, color: 'var(--text-muted)', marginTop: '3px', marginBottom: '22px' }}>
                  Jump straight into today's work
                </div>

                {/* 2x2 Action Button Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <button
                    onClick={onOpenAddProduct}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '12px 14px',
                      borderRadius: '14px',
                      backgroundColor: 'var(--glass-pill-bg)',
                      border: '1px solid var(--glass-border)',
                      color: 'var(--text-primary)',
                      fontWeight: 600,
                      fontSize: '0.84rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.02)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--glass-card-hover)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--glass-pill-bg)'}
                  >
                    <Plus size={16} color="#059669" />
                    <span>Add product</span>
                  </button>

                  <button
                    onClick={() => onNavigate('orders')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '12px 14px',
                      borderRadius: '14px',
                      backgroundColor: 'var(--glass-pill-bg)',
                      border: '1px solid var(--glass-border)',
                      color: 'var(--text-primary)',
                      fontWeight: 600,
                      fontSize: '0.84rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.02)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--glass-card-hover)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--glass-pill-bg)'}
                  >
                    <ShoppingBag size={16} color="#059669" />
                    <span>Active orders</span>
                  </button>

                  <button
                    onClick={() => onNavigate('inventory')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '12px 14px',
                      borderRadius: '14px',
                      backgroundColor: 'var(--glass-pill-bg)',
                      border: '1px solid var(--glass-border)',
                      color: 'var(--text-primary)',
                      fontWeight: 600,
                      fontSize: '0.84rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.02)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--glass-card-hover)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--glass-pill-bg)'}
                  >
                    <Package size={16} color="#059669" />
                    <span>Inventory</span>
                  </button>

                  <button
                    onClick={() => onNavigate('chats')}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '12px 14px',
                      borderRadius: '14px',
                      backgroundColor: 'var(--glass-pill-bg)',
                      border: '1px solid var(--glass-border)',
                      color: 'var(--text-primary)',
                      fontWeight: 600,
                      fontSize: '0.84rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.02)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--glass-card-hover)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--glass-pill-bg)'}
                  >
                    <MessageSquare size={16} color="#059669" />
                    <span>Chats</span>
                  </button>
                </div>
              </div>

              {/* Bottom stats pill */}
              <div style={{ display: 'flex', gap: '16px', marginTop: '22px', fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                <span
                  onClick={() => onNavigate('menu-catalog')}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
                >
                  <Layers size={14} color="#059669" /> 11 catalog products
                </span>
                <span
                  onClick={() => onNavigate('menu-catalog')}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
                >
                  <AlertTriangle size={14} color="#f59e0b" /> 0 age-restricted
                </span>
              </div>
            </div>

            {/* 2. Orders by Status Donut Chart */}
            <div className="kpi-card" style={{
              background: 'var(--glass-card-bg)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid var(--glass-border)',
              borderRadius: '22px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '350px',
              boxShadow: 'var(--glass-card-shadow)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>Orders by status</h3>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  border: '1.5px solid #10b981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#10b981'
                }}>
                  <Clock size={15} color="#10b981" />
                </div>
              </div>

              {/* Donut Chart SVG with exact proportional curves */}
              <div style={{ position: 'relative', width: '140px', height: '140px', margin: '8px auto' }}>
                <svg viewBox="0 0 42 42" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                  <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="rgba(255,255,255,0.4)" strokeWidth="5"></circle>
                  {/* Pending 50% - Green */}
                  <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#10b981" strokeWidth="5.2" strokeDasharray="50 50" strokeDashoffset="0"></circle>
                  {/* Confirmed 25% - Warm Orange */}
                  <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#f59e0b" strokeWidth="5.2" strokeDasharray="25 75" strokeDashoffset="-50"></circle>
                  {/* Cancelled 25% - Cyan/Sky Blue */}
                  <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#0284c7" strokeWidth="5.2" strokeDasharray="25 75" strokeDashoffset="-75"></circle>
                </svg>
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  textAlign: 'center',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)'
                }}>
                  4
                </div>
              </div>

              {/* Legend with exact numbers and percentages */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.82rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontWeight: 500 }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }}></span>
                    <span>Pending</span>
                  </div>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                    2 <span style={{ color: 'var(--text-muted)', fontWeight: 400, marginLeft: '8px' }}>50%</span>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontWeight: 500 }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#f59e0b' }}></span>
                    <span>Confirmed</span>
                  </div>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                    1 <span style={{ color: 'var(--text-muted)', fontWeight: 400, marginLeft: '8px' }}>25%</span>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontWeight: 500 }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#0284c7' }}></span>
                    <span>Cancelled</span>
                  </div>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                    1 <span style={{ color: 'var(--text-muted)', fontWeight: 400, marginLeft: '8px' }}>25%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Customer conversations (Frosted Glass Card Matching Image 2) */}
            <div className="kpi-card" style={{
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden',
              minHeight: '350px'
            }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(16, 185, 129, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <MessageCircle size={19} color="#059669" />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
                        Customer conversations
                      </h3>
                      <div style={{ fontSize: '0.8rem', fontWeight: 400, color: 'var(--text-muted)', marginTop: '2px' }}>
                        Live WhatsApp Inbox & Staff Reply
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight
                    size={19}
                    color="var(--text-primary)"
                    style={{ cursor: 'pointer', opacity: 0.75, transition: 'opacity 0.15s ease' }}
                    onClick={() => onNavigate('chats')}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '0.75'}
                  />
                </div>

                {/* 2 Sub-Cards inside Customer conversations */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '22px' }}>
                  <div
                    style={{
                      backgroundColor: 'var(--glass-pill-bg)',
                      borderRadius: '14px',
                      padding: '16px 18px',
                      border: '1px solid var(--glass-border)',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.02)'
                    }}
                    onClick={() => onNavigate('chats')}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--glass-card-hover)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--glass-pill-bg)'}
                  >
                    <div style={{ fontSize: '1.9rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1 }}>2</div>
                    <div style={{ fontSize: '0.78rem', fontWeight: 400, color: 'var(--text-muted)', marginTop: '5px' }}>active customers</div>
                  </div>

                  <div
                    style={{
                      backgroundColor: 'var(--glass-pill-bg)',
                      borderRadius: '14px',
                      padding: '16px 18px',
                      border: '1px solid var(--glass-border)',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.02)'
                    }}
                    onClick={() => onNavigate('chats')}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--glass-card-hover)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--glass-pill-bg)'}
                  >
                    <div style={{ fontSize: '1.9rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1 }}>0</div>
                    <div style={{ fontSize: '0.78rem', fontWeight: 400, color: 'var(--text-muted)', marginTop: '5px' }}>tickets awaiting reply</div>
                  </div>
                </div>
              </div>

              {/* Bottom link: Open WhatsApp Inbox -> */}
              <button
                onClick={() => onNavigate('chats')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--brand-primary)',
                  fontWeight: 700,
                  fontSize: '0.84rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  marginTop: '22px',
                  padding: 0,
                  transition: 'opacity 0.15s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
              >
                <span>Open WhatsApp Inbox</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>

          {/* ROW 4: 2 Columns in 1 Line (Revenue trend | Category share) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.85fr 1.15fr', gap: '16px', alignItems: 'stretch' }}>
            {/* Revenue Trend Area Chart */}
            <div className="data-table-card" style={{
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '400px'
            }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>Revenue trend</h3>
                    <div style={{ fontSize: '0.8rem', fontWeight: 400, color: 'var(--text-muted)', marginTop: '3px' }}>
                      Revenue from delivered orders over the last 30 days
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                    <span style={{ width: '12px', height: '2px', backgroundColor: '#10b981', display: 'inline-block' }}></span>
                    <span>orders</span>
                  </div>
                </div>

                <div style={{ width: '100%', height: '270px', marginTop: '10px' }}>
                  <svg viewBox="0 0 520 200" style={{ width: '100%', height: '100%' }}>
                    <defs>
                      <linearGradient id="revenueGradArea" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Horizontal light grid lines */}
                    <line x1="45" y1="20" x2="500" y2="20" stroke="var(--border-light)" strokeWidth="1" />
                    <line x1="45" y1="55" x2="500" y2="55" stroke="var(--border-light)" strokeWidth="1" />
                    <line x1="45" y1="90" x2="500" y2="90" stroke="var(--border-light)" strokeWidth="1" />
                    <line x1="45" y1="125" x2="500" y2="125" stroke="var(--border-light)" strokeWidth="1" />
                    <line x1="45" y1="160" x2="500" y2="160" stroke="var(--border-color)" strokeWidth="1" />

                    {/* Y-axis numbers */}
                    <text x="35" y="24" fontSize="10" fill="var(--text-muted)" textAnchor="end">2</text>
                    <text x="35" y="59" fontSize="10" fill="var(--text-muted)" textAnchor="end">1.5</text>
                    <text x="35" y="94" fontSize="10" fill="var(--text-muted)" textAnchor="end">1</text>
                    <text x="35" y="129" fontSize="10" fill="var(--text-muted)" textAnchor="end">0.5</text>
                    <text x="35" y="163" fontSize="10" fill="var(--text-muted)" textAnchor="end">0</text>

                    {/* Triangular Area fill */}
                    <path
                      d="M 65 90 L 270 20 L 475 90 L 475 160 L 65 160 Z"
                      fill="url(#revenueGradArea)"
                    />

                    {/* Clean green line (No dots, sharp/subtle join matching original) */}
                    <path
                      d="M 65 90 L 270 20 L 475 90"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ filter: 'drop-shadow(0 2px 6px rgba(16, 185, 129, 0.4))' }}
                    />

                    {/* Date label under start point */}
                    <text x="65" y="178" fontSize="10" fill="var(--text-muted)" textAnchor="middle">2026-10-25</text>
                  </svg>
                </div>
              </div>
            </div>

            {/* Category Share Donut Chart Card (Stacked vertically: Donut on top, legend below) */}
            <div className="data-table-card" style={{
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '400px'
            }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>Category share</h3>
                <div style={{ fontSize: '0.8rem', fontWeight: 400, color: 'var(--text-muted)', marginTop: '3px', marginBottom: '14px' }}>
                  Share of catalog products by category
                </div>

                {/* Donut Chart Centered at Top */}
                <div style={{ position: 'relative', width: '135px', height: '135px', margin: '4px auto 18px auto' }}>
                  <svg viewBox="0 0 42 42" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                    <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="var(--border-light)" strokeWidth="5"></circle>
                    {/* Kebabs & Burgers: 27% green (#10b981) */}
                    <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#10b981" strokeWidth="5.2" strokeDasharray="27 73" strokeDashoffset="0"></circle>
                    {/* Pizzas: 27% orange (#f59e0b) */}
                    <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#f59e0b" strokeWidth="5.2" strokeDasharray="27 73" strokeDashoffset="-27"></circle>
                    {/* Sides & Starters: 27% cyan (#06b6d4) */}
                    <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#06b6d4" strokeWidth="5.2" strokeDasharray="27 73" strokeDashoffset="-54"></circle>
                    {/* Drinks & Beverages: 9% purple (#8b5cf6) */}
                    <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#8b5cf6" strokeWidth="5.2" strokeDasharray="9 91" strokeDashoffset="-81"></circle>
                    {/* Desserts: 9% pink (#ec4899) */}
                    <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#ec4899" strokeWidth="5.2" strokeDasharray="10 90" strokeDashoffset="-90"></circle>
                  </svg>
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center',
                    fontSize: '1.45rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)'
                  }}>
                    11
                  </div>
                </div>

                {/* 5 Category Items Stacked Underneath */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.82rem' }}>
                  <div
                    onClick={() => onNavigate('menu-catalog')}
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', padding: '1px 0' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontWeight: 500 }}>
                      <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#10b981' }}></span>
                      <span>Kebabs & Burgers</span>
                    </div>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>3 <span style={{ color: 'var(--text-muted)', fontWeight: 400, marginLeft: '8px' }}>27%</span></div>
                  </div>

                  <div
                    onClick={() => onNavigate('menu-catalog')}
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', padding: '1px 0' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontWeight: 500 }}>
                      <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#f59e0b' }}></span>
                      <span>Pizzas</span>
                    </div>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>3 <span style={{ color: 'var(--text-muted)', fontWeight: 400, marginLeft: '8px' }}>27%</span></div>
                  </div>

                  <div
                    onClick={() => onNavigate('menu-catalog')}
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', padding: '1px 0' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontWeight: 500 }}>
                      <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#06b6d4' }}></span>
                      <span>Sides & Starters</span>
                    </div>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>3 <span style={{ color: 'var(--text-muted)', fontWeight: 400, marginLeft: '8px' }}>27%</span></div>
                  </div>

                  <div
                    onClick={() => onNavigate('menu-catalog')}
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', padding: '1px 0' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontWeight: 500 }}>
                      <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#8b5cf6' }}></span>
                      <span>Drinks & Beverages</span>
                    </div>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>1 <span style={{ color: 'var(--text-muted)', fontWeight: 400, marginLeft: '8px' }}>9%</span></div>
                  </div>

                  <div
                    onClick={() => onNavigate('menu-catalog')}
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', padding: '1px 0' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontWeight: 500 }}>
                      <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#ec4899' }}></span>
                      <span>Desserts</span>
                    </div>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>1 <span style={{ color: 'var(--text-muted)', fontWeight: 400, marginLeft: '8px' }}>9%</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ROW 5: 2 Columns in 1 Line (Sales by merchant | Recent support) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.85fr 1.15fr', gap: '16px', alignItems: 'stretch' }}>
            {/* Sales by merchant Bar Chart Card */}
            <div className="data-table-card" style={{
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '290px'
            }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>Sales by merchant</h3>
                    <div style={{ fontSize: '0.8rem', fontWeight: 400, color: 'var(--text-muted)', marginTop: '3px' }}>
                      Revenue for the selected merchant
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                    <span style={{ width: '8px', height: '8px', backgroundColor: '#10b981', display: 'inline-block' }}></span>
                    <span>revenue</span>
                  </div>
                </div>

                <div style={{ width: '100%', height: '180px', marginTop: '6px' }}>
                  <svg viewBox="0 0 520 180" style={{ width: '100%', height: '100%' }}>
                    {/* Horizontal light grid lines */}
                    <line x1="45" y1="20" x2="500" y2="20" stroke="var(--border-light)" strokeWidth="1" />
                    <line x1="45" y1="55" x2="500" y2="55" stroke="var(--border-light)" strokeWidth="1" />
                    <line x1="45" y1="90" x2="500" y2="90" stroke="var(--border-light)" strokeWidth="1" />
                    <line x1="45" y1="125" x2="500" y2="125" stroke="var(--border-light)" strokeWidth="1" />
                    <line x1="45" y1="155" x2="500" y2="155" stroke="var(--border-color)" strokeWidth="1" />

                    {/* Y-axis numbers */}
                    <text x="35" y="24" fontSize="10" fill="var(--text-muted)" textAnchor="end">4</text>
                    <text x="35" y="59" fontSize="10" fill="var(--text-muted)" textAnchor="end">3</text>
                    <text x="35" y="94" fontSize="10" fill="var(--text-muted)" textAnchor="end">2</text>
                    <text x="35" y="129" fontSize="10" fill="var(--text-muted)" textAnchor="end">1</text>
                    <text x="35" y="159" fontSize="10" fill="var(--text-muted)" textAnchor="end">0</text>

                    {/* Centered merchant name */}
                    <text x="272" y="174" fontSize="10" fill="var(--text-muted)" textAnchor="middle">My Test Company</text>
                  </svg>
                </div>
              </div>
            </div>

            {/* Recent support Card */}
            <div className="data-table-card" style={{
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '290px'
            }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>Recent support</h3>
                    <div style={{ fontSize: '0.8rem', fontWeight: 400, color: 'var(--text-muted)', marginTop: '3px' }}>
                      Newest customer inquiries and partial refund requests
                    </div>
                  </div>
                  <button
                    onClick={() => onNavigate('ledger')}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--brand-primary-light)',
                      border: '1px solid var(--glass-border-subtle)',
                      color: 'var(--brand-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      flexShrink: 0,
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>

                <div
                  onClick={() => onNavigate('ledger')}
                  style={{
                    backgroundColor: 'var(--glass-pill-bg)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '14px',
                    padding: '14px 16px',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    backdropFilter: 'blur(10px)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--brand-accent)'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--glass-border)'}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <div style={{
                      fontWeight: 600,
                      fontSize: '0.85rem',
                      color: 'var(--text-primary)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: 'calc(100% - 65px)'
                    }}>
                      Customer requests to speak with a human staff member[MANAGER ARBITRATION: REJECTED]
                    </div>
                    <span style={{
                      backgroundColor: 'var(--bg-surface)',
                      border: '1px solid var(--border-light)',
                      color: 'var(--text-secondary)',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      padding: '2px 8px',
                      borderRadius: '9999px',
                      textTransform: 'lowercase',
                      flexShrink: 0
                    }}>
                      closed
                    </span>
                  </div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                    Oct 25, 2026, 10:07 PM
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Active Kitchen Queue (The War Room) */}
      {activeTab === 'queue' && (
        <div key="queue" className="panel-zoom-entrance">
          <div className="data-table-card" style={{ padding: '24px', marginBottom: '24px' }}>
            <div style={{ marginBottom: '16px' }}>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>
                Active Kitchen Queue (The War Room)
              </h2>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                60-second soft-accept grace window on new orders. Click Bump to advance kitchen status and notify the customer on WhatsApp.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <span className="badge badge-green" style={{ fontSize: '0.82rem', padding: '6px 12px' }}>
                Normal Kitchen Load (20m ETA)
              </span>
              <button
                onClick={() => onNavigate('orders')}
                style={{ background: 'none', border: 'none', color: '#059669', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                Open full orders table <ArrowRight size={14} />
              </button>
            </div>

            <div className="kitchen-orders-grid">
              {pendingOrders.map((order, idx) => (
                <div
                  key={order.id}
                  className={`kitchen-order-card ${order.timeAgo === 'Just now' || (idx === 0 && order.stage === 'pending') ? 'order-highlight-new' : ''}`}
                >
                  <div>
                    <div className="kitchen-order-header">
                      <span className="order-code">#{order.id}</span>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <span className="badge badge-amber">{order.timeAgo} · {order.status}</span>
                        <span className="badge badge-amber">
                          {order.stage}
                        </span>
                      </div>
                    </div>
                    <div className="order-customer-name" style={{ marginTop: '12px' }}>
                      {order.customerName}
                    </div>
                    <div className="order-phone">+{order.phone}</div>
                    <div className="order-price">
                      {hideValues ? '••••' : `£${order.amount.toFixed(2)}`}
                    </div>
                  </div>

                  <div className="order-card-actions">
                    <button
                      onClick={() => onBumpOrder(order.id)}
                      className="btn-primary"
                      style={{ flex: 1, justifyContent: 'center' }}
                    >
                      Bump &rarr; confirmed
                    </button>
                    <button
                      onClick={() => onInspectOrder(order)}
                      className="btn-secondary"
                    >
                      Inspect
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Log Phone / Walk-In Issue */}
      {activeTab === 'phone-issue' && (
        <div key="phone-issue" className="data-table-card panel-zoom-entrance" style={{ padding: '32px', maxWidth: '800px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              backgroundColor: '#ecfdf5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#059669'
            }}>
              <PhoneCall size={22} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                Log Phone Call or Walk-In Issue
              </h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Record an offline phone call or walk-in customer issue into your support queue.
              </p>
            </div>
          </div>

          <form onSubmit={handlePhoneSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Customer phone number *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  placeholder="+44 7700 900123"
                  value={phoneForm.phone}
                  onChange={(e) => setPhoneForm({ ...phoneForm, phone: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Customer name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. John MacLeod"
                  value={phoneForm.name}
                  onChange={(e) => setPhoneForm({ ...phoneForm, name: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Related Order ID (optional)</label>
              <input
                type="text"
                className="form-input"
                placeholder="Optional order ID"
                value={phoneForm.orderId}
                onChange={(e) => setPhoneForm({ ...phoneForm, orderId: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Issue details *</label>
              <textarea
                required
                className="form-textarea"
                rows={4}
                placeholder="Describe the phone call, missing item report, or walk-in issue..."
                value={phoneForm.details}
                onChange={(e) => setPhoneForm({ ...phoneForm, details: e.target.value })}
              />
            </div>

            <div style={{ marginTop: '20px' }}>
              <button type="submit" className="btn-primary" style={{ padding: '11px 24px' }}>
                Submit Issue to Support Queue
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
