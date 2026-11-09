import React, { useState } from 'react';
import {
  MessageSquareShare,
  CheckCircle2,
  CheckSquare,
  RefreshCw,
  Phone,
  ShieldCheck,
  Power
} from 'lucide-react';

const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

export default function WabaSetup() {
  const [acceptedPolicy, setAcceptedPolicy] = useState(true);
  const [connected, setConnected] = useState(true);
  const [pingStatus, setPingStatus] = useState('');

  const handleTestPing = () => {
    setPingStatus('Testing webhook ping...');
    setTimeout(() => {
      setPingStatus('Webhook response 200 OK: Inbound latency 42ms. Jarvis AI ready.');
      setTimeout(() => setPingStatus(''), 5000);
    }, 1000);
  };

  return (
    <div className="page-container">
      {/* Page Header */}
      <div className="page-header-row">
        <div className="page-title-group">
          <h1 className="page-title">Connect WhatsApp Business</h1>
          <div className="page-subtitle">
            Link your shop's WhatsApp Business Account so customers can message your AI assistant, browse the menu, and place orders.
          </div>
        </div>
      </div>

      {/* Main Setup Card */}
      <div className="data-table-card" style={{ padding: '32px', maxWidth: '860px' }}>
        {/* Connected account banner */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 24px',
          borderRadius: 'var(--radius-lg)',
          backgroundColor: 'var(--bg-surface-secondary)',
          border: '1px solid var(--border-color)',
          marginBottom: '28px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              backgroundColor: '#10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.35)'
            }}>
              <MessageSquareShare size={28} />
            </div>
            <div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                My Test Company
              </div>
              <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                WhatsApp Business Connected · +1 555-659-9495
              </div>
            </div>
          </div>

          <span className="badge badge-green" style={{ padding: '6px 14px', fontSize: '0.85rem' }}>
            <CheckCircle2 size={16} /> Connected
          </span>
        </div>

        {/* Step 1 */}
        <div style={{
          padding: '20px',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-color)',
          marginBottom: '20px',
          backgroundColor: 'var(--bg-surface)'
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <div
              onClick={() => setAcceptedPolicy(!acceptedPolicy)}
              style={{ cursor: 'pointer', color: acceptedPolicy ? '#059669' : 'var(--text-muted)', marginTop: '2px' }}
            >
              <CheckSquare size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.98rem', marginBottom: '4px' }}>
                Step 1 — Accept WhatsApp Commerce Policy & Terms of Service
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                I confirm that <strong>My Test Company</strong> will not sell illegal or prohibited items (weapons, drugs, counterfeit goods, or adult content) and will follow age-verification rules for any age-restricted products.
              </div>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div style={{
          padding: '20px',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--status-green-border)',
          backgroundColor: 'var(--status-green-bg)',
          marginBottom: '24px'
        }}>
          <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--status-green-text)', marginBottom: '6px' }}>
            Step 2 — Reconnect or Switch WhatsApp Number
          </div>
          <p style={{ fontSize: '0.86rem', color: 'var(--status-green-text)', lineHeight: 1.5, marginBottom: '18px', opacity: 0.9 }}>
            Opens the official Facebook Business window so you can select your business profile, verify your shop's WhatsApp phone number, and turn on your AI ordering assistant automatically.
          </p>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              onClick={() => alert('Simulating Meta Embedded Signup Window... Phone +1 555-659-9495 re-verified successfully!')}
              className="btn-primary"
              style={{ backgroundColor: '#2563eb' }}
            >
              <FacebookIcon /> Reconnect with Facebook
            </button>
            <button
              onClick={handleTestPing}
              className="btn-secondary"
            >
              <RefreshCw size={15} /> Test Webhook Ping
            </button>
            <button
              onClick={() => alert('Disconnect flow initiated: Warning - Inbound WhatsApp orders will pause.')}
              className="btn-secondary"
              style={{ color: '#dc2626' }}
            >
              <Power size={15} /> Disconnect
            </button>
          </div>

          {pingStatus && (
            <div style={{ marginTop: '14px', fontSize: '0.85rem', fontWeight: 600, color: '#059669' }}>
              ✓ {pingStatus}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
