import React, { useState } from 'react';
import { Activity, Search, RefreshCw, CheckCircle2, MessageSquare } from 'lucide-react';

export default function MessageActivityLog() {
  const [logs] = useState([
    { id: 'log-1', time: '12:14:02 AM', type: 'System Alert', recipient: '+447777154301', status: 'Delivered', event: 'Order #1f21fe9a kitchen prep notification' },
    { id: 'log-2', time: '12:13:45 AM', type: 'Inbound Webhook', recipient: 'Slice AI Concierge', status: 'Processed 200', event: 'Text payload "CONFIRM DCFDB499"' },
    { id: 'log-3', time: '12:12:10 AM', type: 'Outbound Message', recipient: '+447777154301', status: 'Read', event: 'Order cart summary and totals £39.96' },
    { id: 'log-4', time: '11:45:00 PM', type: 'Marketing Broadcast', recipient: 'Consented Audience (3)', status: 'Success', event: 'Template: storm_prep_alert' }
  ]);

  return (
    <div className="page-container">
      <div className="page-header-row">
        <div className="page-title-group">
          <h1 className="page-title">Message Activity Log</h1>
          <div className="page-subtitle">
            Raw Cloud API telemetry, delivery receipts, read receipts, and webhook status.
          </div>
        </div>

        <div className="page-header-actions">
          <button onClick={() => alert('Webhook polling refreshed: Latency 38ms.')} className="btn-secondary">
            <RefreshCw size={15} /> Refresh Stream
          </button>
        </div>
      </div>

      <div className="data-table-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Direction / Type</th>
              <th>Recipient / Endpoint</th>
              <th>Event Summary</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((l) => (
              <tr key={l.id}>
                <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>{l.time}</td>
                <td>
                  <span className="badge badge-amber">{l.type}</span>
                </td>
                <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{l.recipient}</td>
                <td>{l.event}</td>
                <td>
                  <span className="badge badge-green">
                    <CheckCircle2 size={12} /> {l.status}
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
