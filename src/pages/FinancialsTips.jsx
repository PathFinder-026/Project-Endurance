import React, { useState } from 'react';
import {
  TrendingUp,
  CircleDollarSign,
  ShoppingBag,
  Users,
  Percent,
  Calendar,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';

export default function FinancialsTips({ hideValues }) {
  const [timeRange, setTimeRange] = useState('30d'); // '7d' | '30d' | '90d' | 'custom'

  return (
    <div className="page-container">
      {/* Page Header */}
      <div className="page-header-row">
        <div className="page-title-group">
          <h1 className="page-title">Financial Intelligence & Analytics</h1>
          <div className="page-subtitle">
            Performance analytics, 30% aggregator commission savings, and Night Manager summary for My Test Company.
          </div>
        </div>

        {/* Time filters */}
        <div className="page-header-actions">
          <div style={{
            display: 'inline-flex',
            padding: '3px',
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)'
          }}>
            {['7d', '30d', '90d', 'Custom'].map((t) => (
              <button
                key={t}
                onClick={() => setTimeRange(t.toLowerCase())}
                style={{
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-sm)',
                  border: 'none',
                  backgroundColor: timeRange === t.toLowerCase() ? '#133826' : 'transparent',
                  color: timeRange === t.toLowerCase() ? '#ffffff' : 'var(--text-secondary)',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-top-row">
            <span className="kpi-title">Revenue</span>
            <div className="kpi-icon-wrap">
              <CircleDollarSign size={18} />
            </div>
          </div>
          <div className="kpi-value">{hideValues ? '••••' : '£68.96'}</div>
          <div className="kpi-footer">
            <span>Selected period (100% Direct)</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top-row">
            <span className="kpi-title">30% Commission Saved</span>
            <div className="kpi-icon-wrap">
              <Percent size={18} />
            </div>
          </div>
          <div className="kpi-value" style={{ color: 'var(--brand-accent)' }}>
            {hideValues ? '••••' : '£20.69'}
          </div>
          <div className="kpi-footer">
            <span>Saved vs Uber Eats / Just Eat (30%)</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top-row">
            <span className="kpi-title">Orders</span>
            <div className="kpi-icon-wrap">
              <ShoppingBag size={18} />
            </div>
          </div>
          <div className="kpi-value">4</div>
          <div className="kpi-footer">
            <span>Selected period</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top-row">
            <span className="kpi-title">Active customers</span>
            <div className="kpi-icon-wrap">
              <Users size={18} />
            </div>
          </div>
          <div className="kpi-value">2</div>
          <div className="kpi-footer">
            <span>Customers ordering in range</span>
          </div>
        </div>
      </div>

      {/* 30% Baseline Competitor Analysis Card */}
      <div className="data-table-card" style={{ padding: '28px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>
              30% Baseline Competitor Analysis (Direct WhatsApp vs. Aggregators)
            </h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
              Side-by-side comparison of net revenue kept on direct WhatsApp orders vs. paying 30% commission to Uber Eats / Just Eat.
            </p>
          </div>
          <span className="badge badge-green" style={{ fontSize: '0.82rem', padding: '6px 12px' }}>
            <ShieldCheck size={14} /> 100% Margin Retention
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
          <div style={{
            padding: '20px',
            borderRadius: 'var(--radius-lg)',
            border: '1.5px solid var(--status-green-border)',
            backgroundColor: 'var(--status-green-bg)'
          }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--status-green-text)', textTransform: 'uppercase', marginBottom: '6px' }}>
              Village-Shop Direct WhatsApp Channel
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--status-green-text)', marginBottom: '8px' }}>
              {hideValues ? '••••' : '£68.96'}
            </div>
            <p style={{ fontSize: '0.84rem', color: 'var(--status-green-text)', lineHeight: 1.45, opacity: 0.9 }}>
              ✓ 0% marketplace commission cut<br />
              ✓ Direct WhatsApp customer phone numbers owned by you<br />
              ✓ Automated 10% re-engagement loyalty streaks
            </p>
          </div>

          <div style={{
            padding: '20px',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-color)',
            backgroundColor: 'var(--bg-surface-secondary)'
          }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
              Traditional Third-Party Aggregators (30% Cut)
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
              {hideValues ? '••••' : '£48.27'}
            </div>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
              ✗ £20.69 lost to marketplace commission fees<br />
              ✗ Customer data masked & retained by aggregator<br />
              ✗ Competing restaurants promoted to your customers
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
