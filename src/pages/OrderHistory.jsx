import React, { useState } from 'react';
import {
  ClipboardList,
  Clock,
  CheckCircle,
  XCircle,
  ShoppingBag,
  ArrowUpDown,
  Search,
  Filter
} from 'lucide-react';

export default function OrderHistory({ orders, hideValues }) {
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'active' | 'pickup' | 'delivered' | 'cancelled'
  const [searchTerm, setSearchTerm] = useState('');

  const deliveredCount = 0;
  const cancelledCount = 1;
  const activeCount = orders.filter(o => o.stage === 'pending' || o.stage === 'active').length;

  return (
    <div className="page-container">
      {/* Page Header */}
      <div className="page-header-row">
        <div className="page-title-group">
          <h1 className="page-title">Orders & Collections</h1>
          <div className="page-subtitle">
            Orders & Collections for My Test Company. Status transitions remain bound to the owning merchant.
          </div>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="tab-pill-bar">
        <button
          onClick={() => setActiveTab('all')}
          className={`tab-pill ${activeTab === 'all' ? 'active' : ''}`}
        >
          All Orders (4)
        </button>
        <button
          onClick={() => setActiveTab('active')}
          className={`tab-pill ${activeTab === 'active' ? 'active' : ''}`}
        >
          Active Queue ({activeCount})
        </button>
        <button
          onClick={() => setActiveTab('pickup')}
          className={`tab-pill ${activeTab === 'pickup' ? 'active' : ''}`}
        >
          Click & Collect (Pickup) History
        </button>
        <button
          onClick={() => setActiveTab('delivered')}
          className={`tab-pill ${activeTab === 'delivered' ? 'active' : ''}`}
        >
          Delivered / Completed History (0)
        </button>
        <button
          onClick={() => setActiveTab('cancelled')}
          className={`tab-pill ${activeTab === 'cancelled' ? 'active' : ''}`}
        >
          Cancelled Orders Log (1)
        </button>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-top-row">
            <span className="kpi-title">Matching orders</span>
            <div className="kpi-icon-wrap">
              <ShoppingBag size={18} />
            </div>
          </div>
          <div className="kpi-value">4</div>
          <div className="kpi-footer">
            <span>Across current filters</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top-row">
            <span className="kpi-title">Active</span>
            <div className="kpi-icon-wrap amber">
              <Clock size={18} />
            </div>
          </div>
          <div className="kpi-value">{activeCount}</div>
          <div className="kpi-footer">
            <span>Not delivered or cancelled</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top-row">
            <span className="kpi-title">Delivered</span>
            <div className="kpi-icon-wrap">
              <CheckCircle size={18} />
            </div>
          </div>
          <div className="kpi-value">0</div>
          <div className="kpi-footer">
            <span>Completed orders</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top-row">
            <span className="kpi-title">Cancelled</span>
            <div className="kpi-icon-wrap red">
              <XCircle size={18} />
            </div>
          </div>
          <div className="kpi-value">1</div>
          <div className="kpi-footer">
            <span>Cancelled orders</span>
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
            placeholder="Search by order ID, customer name or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="data-table-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Ordered Items</th>
              <th>Total Value</th>
              <th>Channel</th>
              <th>Status</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#059669' }}>
                  #{o.id}
                </td>
                <td>
                  <div style={{ fontWeight: 700 }}>{o.customerName}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>+{o.phone}</div>
                </td>
                <td>
                  <div style={{ fontSize: '0.86rem' }}>
                    {o.items.map(i => `${i.qty}x ${i.name}`).join(', ')}
                  </div>
                </td>
                <td style={{ fontWeight: 700 }}>
                  {hideValues ? '••••' : `£${o.amount.toFixed(2)}`}
                </td>
                <td>
                  <span className="badge badge-green">WhatsApp Direct</span>
                </td>
                <td>
                  <span className={`badge ${o.stage === 'pending' ? 'badge-amber' : 'badge-green'}`}>
                    {o.status}
                  </span>
                </td>
                <td style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  {o.timeAgo}
                </td>
              </tr>
            ))}
            <tr>
              <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#dc2626' }}>
                #3b991fa0
              </td>
              <td>
                <div style={{ fontWeight: 700 }}>Callum Higgins</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>+447711223344</div>
              </td>
              <td>1x Classic Margherita Pizza 12"</td>
              <td style={{ fontWeight: 700 }}>{hideValues ? '••••' : '£10.99'}</td>
              <td><span className="badge badge-green">WhatsApp Direct</span></td>
              <td><span className="badge badge-red">Cancelled (&lt;5m)</span></td>
              <td style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Oct 28, 9:14 PM</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
