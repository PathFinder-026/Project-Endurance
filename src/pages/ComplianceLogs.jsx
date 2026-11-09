import React, { useState } from 'react';
import {
  ShieldAlert,
  Download,
  Printer,
  Plus,
  ShieldCheck,
  Clock,
  AlertTriangle
} from 'lucide-react';

export default function ComplianceLogs({ complianceLogs: propLogs, onLogRefusal }) {
  const [activeTab, setActiveTab] = useState('refusals'); // 'refusals' | 'audit'

  const defaultRefusals = [
    { id: '1', date: 'Oct 27, 2026, 6:08 AM', merchant: 'The Braehead Slice', phone: '+44 77** *** 123', reason: 'Age-verification refusal: Recipient failed challenge 25 check for craft beer.' },
    { id: '2', date: 'Oct 27, 2026, 6:06 AM', merchant: 'The Braehead Slice', phone: '+44 77** *** 984', reason: 'MUP alcohol unit floor verified (Scotland 65p/unit regulation)' }
  ];

  const refusals = (propLogs && propLogs.length > 0) ? propLogs : defaultRefusals;

  return (
    <div className="page-container">
      {/* Page Header */}
      <div className="page-header-row">
        <div className="page-title-group">
          <h1 className="page-title">Compliance & Audit Logs</h1>
          <div className="page-subtitle">
            Age-verification refusal logs, restricted item checks, masked customer phone numbers, and system activity history.
          </div>
        </div>

        <div className="page-header-actions">
          <button onClick={() => alert('Exporting compliance audit CSV...')} className="btn-secondary">
            <Download size={15} /> Export CSV
          </button>
          <button onClick={() => window.print()} className="btn-secondary">
            <Printer size={15} /> Export to PDF
          </button>
          <button
            onClick={() => {
              const reason = window.prompt('Enter reason for Challenge 25 age refusal / MUP intervention:', 'Recipient failed Challenge 25 check for craft beer delivery');
              if (reason && onLogRefusal) {
                onLogRefusal({
                  logType: 'age_refusal',
                  reason: reason,
                  customerPhoneMasked: '+44 77** *** ' + Math.floor(100 + Math.random() * 900)
                });
              }
            }}
            className="btn-primary"
            style={{ backgroundColor: '#133826' }}
          >
            <ShieldAlert size={16} /> Log Age-Verification Refusal
          </button>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="tab-pill-bar">
        <button
          onClick={() => setActiveTab('refusals')}
          className={`tab-pill ${activeTab === 'refusals' ? 'active' : ''}`}
        >
          Age-Verification & Compliance Refusals
        </button>
        <button
          onClick={() => setActiveTab('audit')}
          className={`tab-pill ${activeTab === 'audit' ? 'active' : ''}`}
        >
          System Activity & Change History
        </button>
      </div>

      {/* Compliance Notice */}
      <div className="notice-card green-theme">
        <ShieldCheck size={20} color="#059669" />
        <div>
          <strong>Compliance & Privacy Protection:</strong> Age-verification refusals for alcohol, tobacco, and restricted selling hours are recorded below with masked customer phone numbers (+4477** *** 123) for licensing and regulatory inspections.
        </div>
      </div>

      {/* Logs Table */}
      <div className="data-table-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Merchant Name</th>
              <th>Customer Phone (Masked PII)</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>
            {refusals.map((r) => (
              <tr key={r.id}>
                <td style={{ color: 'var(--text-muted)' }}>{r.date}</td>
                <td style={{ fontWeight: 600 }}>{r.merchant}</td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>{r.phone}</td>
                <td>
                  <span style={{ color: '#b91c1c', fontWeight: 600, fontSize: '0.86rem' }}>
                    {r.reason}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
