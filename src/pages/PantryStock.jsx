import React, { useState } from 'react';
import {
  Package,
  AlertTriangle,
  Clock,
  Sparkles,
  RefreshCw,
  Plus,
  TrendingUp,
  Layers
} from 'lucide-react';

export default function PantryStock({ products, onAdjustStock, hideValues }) {
  const [filterType, setFilterType] = useState('all');

  const lowStock = products.filter((p) => p.stock <= p.reorderLevel);
  const outOfStock = products.filter((p) => !p.inStock || p.stock === 0);
  const expiringSoon = products.filter((p) => p.expiryDays <= 30);

  return (
    <div className="page-container">
      {/* Page Header */}
      <div className="page-header-row">
        <div className="page-title-group">
          <h1 className="page-title">Inventory</h1>
          <div className="page-subtitle">
            Live inventory for My Test Company. Adjustments are transactional and audited.
          </div>
        </div>

        <div className="page-header-actions">
          <button
            onClick={() => alert('Manual stock count audit triggered across all cold rooms and ambient dry store.')}
            className="btn-secondary"
          >
            <RefreshCw size={15} /> Run Stock Audit
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-top-row">
            <span className="kpi-title">Low stock</span>
            <div className="kpi-icon-wrap amber">
              <AlertTriangle size={18} />
            </div>
          </div>
          <div className="kpi-value">{lowStock.length}</div>
          <div className="kpi-footer">
            <span>At or below reorder level</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top-row">
            <span className="kpi-title">Out of stock</span>
            <div className="kpi-icon-wrap red">
              <Package size={18} />
            </div>
          </div>
          <div className="kpi-value">{outOfStock.length}</div>
          <div className="kpi-footer">
            <span>Requires replenishment</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top-row">
            <span className="kpi-title">Expiring soon</span>
            <div className="kpi-icon-wrap amber">
              <Clock size={18} />
            </div>
          </div>
          <div className="kpi-value">{expiringSoon.length}</div>
          <div className="kpi-footer">
            <span>Within 30 days</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top-row">
            <span className="kpi-title">Expired</span>
            <div className="kpi-icon-wrap red">
              <Clock size={18} />
            </div>
          </div>
          <div className="kpi-value">0</div>
          <div className="kpi-footer">
            <span>Past expiry date</span>
          </div>
        </div>
      </div>

      {/* AI Demand Forecasting Notice Banner */}
      <div className="notice-card green-theme" style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
        <div style={{ color: '#059669', marginTop: '2px' }}>
          <Sparkles size={20} />
        </div>
        <div>
          <div style={{ fontWeight: 800, fontSize: '0.98rem', marginBottom: '4px' }}>
            AI Demand Forecasting & 9:00 PM Supplier Auto-Reorder
          </div>
          <div style={{ fontSize: '0.86rem', lineHeight: 1.5 }}>
            Combines local weather outlook (Rain / High Delivery Demand +22%) with current stock velocity. {lowStock.length} low-stock and {outOfStock.length} out-of-stock items queued for tonight's supplier purchase order.
          </div>
        </div>
      </div>

      {/* Stock List Table */}
      <div className="data-table-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Item & Category</th>
              <th>Current On Hand</th>
              <th>Safety Threshold</th>
              <th>Estimated Velocity</th>
              <th>Shelf Life</th>
              <th style={{ textAlign: 'right' }}>Quick Restock</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr key={item.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: '38px', height: '38px', borderRadius: '8px', objectFit: 'cover' }}
                    />
                    <div>
                      <div style={{ fontWeight: 700 }}>{item.name}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{item.category}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span style={{ fontWeight: 800, fontSize: '1.05rem', color: item.stock <= item.reorderLevel ? '#d97706' : 'inherit' }}>
                    {item.stock} units
                  </span>
                </td>
                <td>
                  <span className="badge badge-amber">Min {item.reorderLevel} units</span>
                </td>
                <td>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <TrendingUp size={14} color="#059669" /> ~14 units/day
                  </span>
                </td>
                <td>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    {item.expiryDays} days remaining
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <div style={{ display: 'inline-flex', gap: '6px' }}>
                    <button
                      onClick={() => onAdjustStock(item.id, 10)}
                      className="btn-secondary"
                      style={{ padding: '6px 10px', fontSize: '0.78rem' }}
                    >
                      +10
                    </button>
                    <button
                      onClick={() => onAdjustStock(item.id, 50)}
                      className="btn-primary"
                      style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                    >
                      +50 Batch
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
