import React, { useState } from 'react';
import {
  AlertCircle,
  CreditCard,
  Building,
  CheckCircle,
  XCircle,
  FileText,
  Image as ImageIcon,
  MessageSquare
} from 'lucide-react';
import { INITIAL_DISPUTES } from '../data/mockData';

export default function LedgerDisputes({ hideValues }) {
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'photo' | 'tabs'
  const [paymentGateway, setPaymentGateway] = useState('stripe'); // 'stripe' | 'paypoint'
  const [disputes, setDisputes] = useState(INITIAL_DISPUTES);
  const [selectedPhotoDispute, setSelectedPhotoDispute] = useState(null);

  const handleResolve = (id, action) => {
    setDisputes(disputes.map(d => d.id === id ? { ...d, status: action === 'approve' ? 'Refund Approved' : 'Rejected' } : d));
    alert(`Dispute #${id}: ${action === 'approve' ? 'Partial refund granted' : 'Dispute rejected with manager rationale'}.`);
  };

  return (
    <div className="page-container">
      {/* Page Header */}
      <div className="page-header-row">
        <div className="page-title-group">
          <h1 className="page-title">Disputes & Partial Refund Arbitration</h1>
          <div className="page-subtitle">
            Partial refund arbitration & dispute center for My Test Company.
          </div>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="tab-pill-bar">
        <button
          onClick={() => setActiveTab('all')}
          className={`tab-pill ${activeTab === 'all' ? 'active' : ''}`}
        >
          All Disputes & Support Tickets
        </button>
        <button
          onClick={() => setActiveTab('photo')}
          className={`tab-pill ${activeTab === 'photo' ? 'active' : ''}`}
        >
          ⚠ Partial Refund Photo Arbitration Queue
        </button>
        <button
          onClick={() => setActiveTab('tabs')}
          className={`tab-pill ${activeTab === 'tabs' ? 'active' : ''}`}
        >
          Walk-In Tab Ledger ("Put on Tab")
        </button>
      </div>

      {/* Payment Gateway Toggle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
        <span style={{ fontSize: '0.86rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
          Payment Gateway:
        </span>
        <div style={{ display: 'inline-flex', padding: '3px', backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
          <button
            onClick={() => setPaymentGateway('stripe')}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              backgroundColor: paymentGateway === 'stripe' ? '#0d5e3a' : 'transparent',
              color: paymentGateway === 'stripe' ? 'white' : 'var(--text-secondary)',
              fontWeight: 600,
              fontSize: '0.82rem',
              cursor: 'pointer'
            }}
          >
            Stripe Card / Apple Pay
          </button>
          <button
            onClick={() => setPaymentGateway('paypoint')}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              backgroundColor: paymentGateway === 'paypoint' ? '#0d5e3a' : 'transparent',
              color: paymentGateway === 'paypoint' ? 'white' : 'var(--text-secondary)',
              fontWeight: 600,
              fontSize: '0.82rem',
              cursor: 'pointer'
            }}
          >
            PayPoint Open Banking
          </button>
        </div>
      </div>

      {/* Policy Box */}
      <div className="notice-card">
        <div className="notice-icon">
          <AlertCircle size={20} color="#b45309" />
        </div>
        <div>
          <div style={{ fontWeight: 700, marginBottom: '4px' }}>
            Partial Refund Review: <span style={{ fontWeight: 400 }}>Refunds are never issued automatically. When a customer reports a damaged or missing item, their photo or video attachment is queued here for manager approval or rejection.</span>
          </div>
          <div style={{ fontWeight: 700, color: '#92400e' }}>
            Time-Decay Cancellation Rule: &lt;5m Free · &gt;5m Prep Fee (£5 base + £3 elapsed)
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-top-row">
            <span className="kpi-title">Needs attention</span>
            <div className="kpi-icon-wrap amber">
              <AlertCircle size={18} />
            </div>
          </div>
          <div className="kpi-value">0</div>
          <div className="kpi-footer">
            <span>Open, pending or in progress</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top-row">
            <span className="kpi-title">Open</span>
            <div className="kpi-icon-wrap red">
              <FileText size={18} />
            </div>
          </div>
          <div className="kpi-value">{disputes.filter(d => d.status === 'Open').length}</div>
          <div className="kpi-footer">
            <span>Awaiting action</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top-row">
            <span className="kpi-title">In progress</span>
            <div className="kpi-icon-wrap">
              <CreditCard size={18} />
            </div>
          </div>
          <div className="kpi-value">0</div>
          <div className="kpi-footer">
            <span>Under review</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top-row">
            <span className="kpi-title">Resolved / closed</span>
            <div className="kpi-icon-wrap">
              <CheckCircle size={18} />
            </div>
          </div>
          <div className="kpi-value">1</div>
          <div className="kpi-footer">
            <span>Settled transactions</span>
          </div>
        </div>
      </div>

      {/* Disputes Table */}
      <div className="data-table-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Ticket & Customer</th>
              <th>Order ID</th>
              <th>Reported Issue</th>
              <th>Amount</th>
              <th>Evidence</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Arbitration Decision</th>
            </tr>
          </thead>
          <tbody>
            {disputes.map((d) => (
              <tr key={d.id}>
                <td>
                  <div>
                    <div style={{ fontWeight: 700 }}>{d.customer}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{d.phone}</div>
                  </div>
                </td>
                <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                  {d.orderId}
                </td>
                <td style={{ maxWidth: '280px' }}>
                  {d.issue}
                </td>
                <td style={{ fontWeight: 700 }}>
                  {hideValues ? '••••' : `£${d.amountRequested.toFixed(2)}`}
                </td>
                <td>
                  {d.hasPhoto && (
                    <button
                      onClick={() => setSelectedPhotoDispute(d)}
                      className="btn-secondary"
                      style={{ padding: '4px 10px', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      <ImageIcon size={14} color="#059669" /> View Photo
                    </button>
                  )}
                </td>
                <td>
                  <span className={`badge ${d.status === 'Open' ? 'badge-amber' : 'badge-green'}`}>
                    {d.status}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  {d.status === 'Open' ? (
                    <div style={{ display: 'inline-flex', gap: '8px' }}>
                      <button
                        onClick={() => handleResolve(d.id, 'approve')}
                        className="btn-primary"
                        style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                      >
                        Approve Refund
                      </button>
                      <button
                        onClick={() => handleResolve(d.id, 'reject')}
                        className="btn-danger"
                        style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                      >
                        Decline
                      </button>
                    </div>
                  ) : (
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Case Concluded</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Photo Arbitration Modal */}
      {selectedPhotoDispute && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '480px' }}>
            <div className="modal-header">
              <h3 className="modal-title">Customer Photo Evidence</h3>
              <button onClick={() => setSelectedPhotoDispute(null)} className="close-btn">
                ✕
              </button>
            </div>
            <img
              src={selectedPhotoDispute.photoUrl}
              alt="Dispute evidence"
              style={{ width: '100%', height: '260px', objectFit: 'cover', borderRadius: '12px', marginBottom: '14px' }}
            />
            <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              <strong>Customer statement:</strong> {selectedPhotoDispute.issue}
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => {
                  handleResolve(selectedPhotoDispute.id, 'approve');
                  setSelectedPhotoDispute(null);
                }}
                className="btn-primary"
                style={{ flex: 1, justifyContent: 'center' }}
              >
                Approve £{selectedPhotoDispute.amountRequested.toFixed(2)}
              </button>
              <button
                onClick={() => setSelectedPhotoDispute(null)}
                className="btn-secondary"
                style={{ flex: 1, justifyContent: 'center' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
