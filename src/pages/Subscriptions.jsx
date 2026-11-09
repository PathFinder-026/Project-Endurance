import React, { useState } from 'react';
import {
  Repeat,
  Plus,
  Search,
  ArrowUpDown,
  CheckCircle,
  PauseCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import { INITIAL_SUBSCRIPTIONS } from '../data/mockData';

export default function Subscriptions({ hideValues }) {
  const [subscriptions, setSubscriptions] = useState(INITIAL_SUBSCRIPTIONS);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    product: 'Weekly Pizza Club (2 Pizzas + 2 Drinks)',
    frequency: 'Every Friday 7:00 PM',
    amount: '25.00'
  });

  const activeCount = subscriptions.filter(s => s.status === 'Active').length;

  const handleCreateSub = (e) => {
    e.preventDefault();
    const newSub = {
      id: `sub-${Date.now().toString().slice(-3)}`,
      customerName: formData.customerName,
      phone: formData.phone,
      product: formData.product,
      frequency: formData.frequency,
      nextBilling: 'Nov 08, 2026',
      status: 'Active',
      amount: parseFloat(formData.amount) || 25.0
    };
    setSubscriptions([newSub, ...subscriptions]);
    setShowModal(false);
    alert(`Recurring subscription activated for ${formData.customerName}!`);
  };

  return (
    <div className="page-container">
      {/* Page Header */}
      <div className="page-header-row">
        <div className="page-title-group">
          <h1 className="page-title">Subscriptions</h1>
          <div className="page-subtitle">
            Recurring-order operations for the selected merchant.
          </div>
        </div>

        <div className="page-header-actions">
          <button onClick={() => setShowModal(true)} className="btn-primary" style={{ backgroundColor: '#133826' }}>
            <Plus size={16} /> New subscription
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-top-row">
            <span className="kpi-title">Active</span>
            <div className="kpi-icon-wrap">
              <Repeat size={18} />
            </div>
          </div>
          <div className="kpi-value">{activeCount}</div>
          <div className="kpi-footer">
            <span>Currently running</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top-row">
            <span className="kpi-title">Paused</span>
            <div className="kpi-icon-wrap amber">
              <PauseCircle size={18} />
            </div>
          </div>
          <div className="kpi-value">0</div>
          <div className="kpi-footer">
            <span>Can be resumed</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top-row">
            <span className="kpi-title">Due</span>
            <div className="kpi-icon-wrap amber">
              <Clock size={18} />
            </div>
          </div>
          <div className="kpi-value">0</div>
          <div className="kpi-footer">
            <span>Billing in next 7 days</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top-row">
            <span className="kpi-title">Overdue</span>
            <div className="kpi-icon-wrap red">
              <AlertCircle size={18} />
            </div>
          </div>
          <div className="kpi-value">0</div>
          <div className="kpi-footer">
            <span>Active and past due</span>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        <div className="search-input-wrap">
          <Search size={16} color="var(--text-light)" />
          <input
            type="text"
            className="search-input"
            placeholder="Search customer, phone, product or brand..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          className="custom-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All statuses</option>
          <option value="active">Active</option>
          <option value="paused">Paused</option>
        </select>

        <select className="custom-select">
          <option value="all">Any due state</option>
          <option value="due">Due soon</option>
          <option value="paid">Paid</option>
        </select>
      </div>

      {/* Subscriptions Table */}
      <div className="data-table-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Product / Plan</th>
              <th>Frequency</th>
              <th>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Next billing <ArrowUpDown size={12} />
                </div>
              </th>
              <th>Status</th>
              <th>Amount</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((s) => (
              <tr key={s.id}>
                <td>
                  <div style={{ fontWeight: 700 }}>{s.customerName}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{s.phone}</div>
                </td>
                <td style={{ fontWeight: 600 }}>{s.product}</td>
                <td>{s.frequency}</td>
                <td>{s.nextBilling}</td>
                <td>
                  <span className="badge badge-green">{s.status}</span>
                </td>
                <td style={{ fontWeight: 700 }}>
                  {hideValues ? '••••' : `£${s.amount.toFixed(2)}`}
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button
                    onClick={() => alert(`Paused recurring subscription #${s.id}`)}
                    className="btn-secondary"
                    style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                  >
                    Manage
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* New Subscription Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">New Recurring Subscription</h3>
              <button onClick={() => setShowModal(false)} className="close-btn">✕</button>
            </div>
            <form onSubmit={handleCreateSub}>
              <div className="form-group">
                <label className="form-label">Customer Name *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  placeholder="e.g. Liam Gallagher"
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Phone Number *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  placeholder="+44 7700 900123"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Plan / Product Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.product}
                  onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">Frequency</label>
                  <select
                    className="form-select"
                    value={formData.frequency}
                    onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                  >
                    <option value="Every Friday 7:00 PM">Every Friday 7:00 PM</option>
                    <option value="Weekly (Every Monday)">Weekly (Every Monday)</option>
                    <option value="Bi-Weekly">Bi-Weekly</option>
                    <option value="Monthly Delivery Box">Monthly Delivery Box</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Amount (£)</label>
                  <input
                    type="number"
                    step="0.01"
                    className="form-input"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  />
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                <button type="button" onClick={() => setShowModal(false)} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Activate Subscription
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
