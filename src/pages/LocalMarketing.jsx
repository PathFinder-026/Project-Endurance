import React, { useState } from 'react';
import {
  Megaphone,
  Users,
  UserX,
  ShieldCheck,
  Send,
  AlertTriangle,
  Clock,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { INITIAL_TEMPLATES } from '../data/mockData';

export default function LocalMarketing() {
  const [templates, setTemplates] = useState(INITIAL_TEMPLATES);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [broadcastSent, setBroadcastSent] = useState(false);

  const handleSendBroadcast = (templateName) => {
    setBroadcastSent(true);
    setTimeout(() => setBroadcastSent(false), 5000);
  };

  return (
    <div className="page-container">
      {/* Page Header */}
      <div className="page-header-row">
        <div className="page-title-group">
          <h1 className="page-title">Marketing Broadcasts & Community</h1>
          <div className="page-subtitle">
            Consented WhatsApp Template Broadcasts, Cultural FOMO Triggers, and Meta WABA Quality Auto-Throttle.
          </div>
        </div>

        <div className="page-header-actions">
          <button
            onClick={() => alert('New WhatsApp Message Template submission window opened.')}
            className="btn-primary"
          >
            <Megaphone size={16} /> New Campaign
          </button>
        </div>
      </div>

      {broadcastSent && (
        <div className="notice-card green-theme" style={{ marginBottom: '20px' }}>
          <CheckCircle2 size={18} color="#059669" />
          <div>
            <strong>Broadcast Queued:</strong> Successfully dispatched to 3 consented subscribers via official Meta WhatsApp Cloud API!
          </div>
        </div>
      )}

      {/* Meta Template Warning Banner */}
      <div className="notice-card">
        <div className="notice-icon">
          <AlertTriangle size={20} color="#b45309" />
        </div>
        <div>
          <div style={{ fontWeight: 700, marginBottom: '4px' }}>
            Meta WhatsApp Template Approval Required Before Live Delivery
          </div>
          <div style={{ lineHeight: 1.5 }}>
            Preset template names (<strong>bakery_fresh_now</strong>, <strong>storm_prep_alert</strong>, <strong>vip_secret_menu</strong>) are sample templates. Meta's Cloud API will reject any broadcast outside the 24-hour window unless a template with that exact name is created and approved inside your <strong>Meta Business Suite → WhatsApp Manager → Message Templates</strong>.
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-top-row">
            <span className="kpi-title">Consented Audience</span>
            <div className="kpi-icon-wrap">
              <Users size={18} />
            </div>
          </div>
          <div className="kpi-value">3</div>
          <div className="kpi-footer">
            <span>Opted in to promotional updates</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top-row">
            <span className="kpi-title">Opted-Out (Excluded)</span>
            <div className="kpi-icon-wrap red">
              <UserX size={18} />
            </div>
          </div>
          <div className="kpi-value">1</div>
          <div className="kpi-footer">
            <span>Texted STOP / Unsubscribe</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top-row">
            <span className="kpi-title">WABA Quality Rating</span>
            <div className="kpi-icon-wrap">
              <ShieldCheck size={18} />
            </div>
          </div>
          <div className="kpi-value" style={{ color: 'var(--brand-accent)' }}>GREEN</div>
          <div className="kpi-footer">
            <span>Healthy fast-track status</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top-row">
            <span className="kpi-title">Scheduled Campaigns</span>
            <div className="kpi-icon-wrap">
              <Clock size={18} />
            </div>
          </div>
          <div className="kpi-value">0</div>
          <div className="kpi-footer">
            <span>Dispatched according to schedule</span>
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="data-table-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '16px' }}>
          Approved Meta Message Templates
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
          {templates.map((tpl) => (
            <div
              key={tpl.name}
              style={{
                backgroundColor: 'var(--bg-surface-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '14px'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.92rem', color: '#059669' }}>
                    {tpl.name}
                  </span>
                  <span className="badge badge-green">{tpl.status}</span>
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                  {tpl.category} · {tpl.language}
                </div>
                <div style={{
                  backgroundColor: 'var(--bg-surface)',
                  padding: '12px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.85rem',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-color)',
                  lineHeight: 1.45
                }}>
                  "{tpl.preview}"
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px', borderTop: '1px solid var(--border-color)' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Used {tpl.lastUsed}
                </span>
                <button
                  onClick={() => handleSendBroadcast(tpl.name)}
                  className="btn-primary"
                  style={{ padding: '7px 14px', fontSize: '0.82rem' }}
                >
                  <Send size={13} /> Send Broadcast
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
