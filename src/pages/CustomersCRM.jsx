import React, { useState } from 'react';
import {
  Users,
  Award,
  ShieldCheck,
  Ban,
  Repeat,
  Flame,
  Search,
  MessageSquare,
  Tag
} from 'lucide-react';
import { INITIAL_CUSTOMERS } from '../data/mockData';

export default function CustomersCRM({ customers: propCustomers, onOpenSubscriptions, hideValues }) {
  const [searchTerm, setSearchTerm] = useState('');
  const customers = propCustomers && propCustomers.length > 0 ? propCustomers : INITIAL_CUSTOMERS;

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm) ||
      c.dietaryTags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const premiumCount = customers.filter(c => c.tier.includes('Premium')).length;

  return (
    <div className="page-container">
      {/* Page Header */}
      <div className="page-header-row">
        <div className="page-title-group">
          <h1 className="page-title">Customers (CRM) & Dietary Guardian</h1>
          <div className="page-subtitle">
            Customers, dietary guardian tags, and post-delivery reviews linked to My Test Company.
          </div>
        </div>

        <div className="page-header-actions">
          <button onClick={onOpenSubscriptions} className="btn-secondary">
            <Repeat size={15} /> Recurring Subscriptions
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-top-row">
            <span className="kpi-title">Matching customers</span>
            <div className="kpi-icon-wrap">
              <Users size={18} />
            </div>
          </div>
          <div className="kpi-value">{filteredCustomers.length}</div>
          <div className="kpi-footer">
            <span>Across current filters</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top-row">
            <span className="kpi-title">Premium</span>
            <div className="kpi-icon-wrap">
              <Award size={18} />
            </div>
          </div>
          <div className="kpi-value">{premiumCount}</div>
          <div className="kpi-footer">
            <span>Premium tier (Voice & Image AI)</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top-row">
            <span className="kpi-title">Active</span>
            <div className="kpi-icon-wrap">
              <ShieldCheck size={18} />
            </div>
          </div>
          <div className="kpi-value">{customers.length}</div>
          <div className="kpi-footer">
            <span>Not banned</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top-row">
            <span className="kpi-title">Banned</span>
            <div className="kpi-icon-wrap red">
              <Ban size={18} />
            </div>
          </div>
          <div className="kpi-value">0</div>
          <div className="kpi-footer">
            <span>Manager restricted</span>
          </div>
        </div>
      </div>

      {/* Loyalty Banner */}
      <div className="notice-card">
        <div className="notice-icon">
          <Flame size={22} color="#ea580c" />
        </div>
        <div>
          <div style={{ fontWeight: 800, marginBottom: '4px' }}>
            Village Streaks Loyalty & Local Supermarket Price Benchmark
          </div>
          <div style={{ fontSize: '0.86rem', lineHeight: 1.5 }}>
            Customers with 3+ weekly orders earn 🔥 Golden Flame priority & automatic 10% win-back vouchers if inactive for 14 days. Fresh Stone Pizza (£11.50 vs Tesco Express £10.80 + £3.50 delivery).
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="filter-bar">
        <div className="search-input-wrap">
          <Search size={16} color="var(--text-light)" />
          <input
            type="text"
            className="search-input"
            placeholder="Search by name, phone or dietary tag..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Customers Table */}
      <div className="data-table-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Phone Number</th>
              <th>Membership Tier</th>
              <th>Weekly Streak</th>
              <th>Dietary Guardian Tags</th>
              <th>Total Orders / Spend</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((c) => (
              <tr key={c.id}>
                <td>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{c.name}</div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>Last order: {c.lastOrder}</div>
                </td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>{c.phone}</td>
                <td>
                  <span className={`badge ${c.tier.includes('Premium') ? 'badge-green' : 'badge-amber'}`}>
                    {c.tier}
                  </span>
                </td>
                <td>
                  <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{c.streak}</span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                    {c.dietaryTags.map((tag, i) => (
                      <span key={i} className="badge" style={{ backgroundColor: 'var(--bg-surface-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                        <Tag size={10} style={{ marginRight: '3px' }} /> {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td>
                  <div>
                    <span style={{ fontWeight: 700 }}>{c.ordersCount} orders</span>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      {hideValues ? '••••' : `£${c.totalSpent.toFixed(2)}`}
                    </div>
                  </div>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button
                    onClick={() => alert(`Direct WhatsApp message initiated to ${c.name} (${c.phone})`)}
                    className="btn-secondary"
                    style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                  >
                    <MessageSquare size={13} /> Chat
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
