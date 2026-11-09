import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  LayoutGrid,
  Users,
  Plus,
  CheckCircle,
  PhoneCall,
  Utensils
} from 'lucide-react';
import { INITIAL_TABLES } from '../data/mockData';

export default function ReservationsFloor({ tables: propTables, onUpdateTableStatus, onOpenAddTable }) {
  const [activeTab, setActiveTab] = useState('ledger'); // 'ledger' | 'floor' | 'catering'
  const [localTables, setLocalTables] = useState(INITIAL_TABLES);
  const tables = (propTables && propTables.length > 0) ? propTables : localTables;
  const [bookings, setBookings] = useState([]);
  const [showLogModal, setShowLogModal] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    tableId: 'T1',
    partySize: '2',
    time: '19:30'
  });

  const availableCount = tables.filter((t) => t.status === 'Available').length;

  const handleCreateBooking = (e) => {
    e.preventDefault();
    const newBooking = {
      id: `bk-${Date.now()}`,
      name: bookingForm.name,
      phone: bookingForm.phone,
      tableId: bookingForm.tableId,
      partySize: bookingForm.partySize,
      time: bookingForm.time,
      status: 'Confirmed'
    };

    setBookings([newBooking, ...bookings]);
    if (onUpdateTableStatus) {
      onUpdateTableStatus(bookingForm.tableId, 'Occupied');
    } else {
      setLocalTables(prev => prev.map(t => t.id === bookingForm.tableId ? { ...t, status: 'Occupied' } : t));
    }
    setShowLogModal(false);
    alert(`Booking confirmed for ${bookingForm.name} at ${bookingForm.time}!`);
  };

  return (
    <div className="page-container">
      {/* Page Header */}
      <div className="page-header-row">
        <div className="page-title-group">
          <h1 className="page-title">Reservations & Dine-In (The Host)</h1>
          <div className="page-subtitle">
            WhatsApp & Walk-In table booking ledger, live floor plan offline sync, and catering deposit management.
          </div>
        </div>

        <div className="page-header-actions">
          <button onClick={onOpenAddTable} className="btn-secondary">
            <LayoutGrid size={15} /> Add Booth / Table
          </button>
          <button
            onClick={() => setShowLogModal(true)}
            className="btn-primary"
            style={{ backgroundColor: '#133826' }}
          >
            <Plus size={16} /> Log Walk-In / Phone Booking
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-top-row">
            <span className="kpi-title">Upcoming Bookings</span>
            <div className="kpi-icon-wrap">
              <Calendar size={18} />
            </div>
          </div>
          <div className="kpi-value">{bookings.length}</div>
          <div className="kpi-footer">
            <span>Confirmed tables (£5/head)</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top-row">
            <span className="kpi-title">15-Min Tentative Holds</span>
            <div className="kpi-icon-wrap">
              <Utensils size={18} />
            </div>
          </div>
          <div className="kpi-value">0</div>
          <div className="kpi-footer">
            <span>Holds expire after 15 minutes if unconfirmed</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top-row">
            <span className="kpi-title">Tables Available</span>
            <div className="kpi-icon-wrap">
              <LayoutGrid size={18} />
            </div>
          </div>
          <div className="kpi-value">{availableCount}</div>
          <div className="kpi-footer">
            <span>Out of {tables.length} configured tables</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top-row">
            <span className="kpi-title">Bulk / Catering Orders</span>
            <div className="kpi-icon-wrap">
              <Users size={18} />
            </div>
          </div>
          <div className="kpi-value">0</div>
          <div className="kpi-footer">
            <span>Orders &gt;5 pizzas (50% deposit)</span>
          </div>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="tab-pill-bar">
        <button
          onClick={() => setActiveTab('ledger')}
          className={`tab-pill ${activeTab === 'ledger' ? 'active' : ''}`}
        >
          Reservation Ledger (The Booking List)
        </button>
        <button
          onClick={() => setActiveTab('floor')}
          className={`tab-pill ${activeTab === 'floor' ? 'active' : ''}`}
        >
          Live Floor Plan (Offline Walk-In Sync)
        </button>
        <button
          onClick={() => setActiveTab('catering')}
          className={`tab-pill ${activeTab === 'catering' ? 'active' : ''}`}
        >
          Catering & Bulk Orders
        </button>
      </div>

      {/* TAB 1: Ledger */}
      {activeTab === 'ledger' && (
        <div className="data-table-card">
          <table className="data-table">
            <thead>
              <tr>
                <th>Booking Ref</th>
                <th>Guest Name & Phone</th>
                <th>Party Size</th>
                <th>Table</th>
                <th>Seating Time</th>
                <th>Deposit Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '36px', color: 'var(--text-muted)' }}>
                    No pending bookings in ledger. Click "+ Log Walk-In / Phone Booking" above to add guest reservations.
                  </td>
                </tr>
              ) : (
                bookings.map((b) => (
                  <tr key={b.id}>
                    <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{b.id}</td>
                    <td>
                      <div style={{ fontWeight: 700 }}>{b.name}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{b.phone}</div>
                    </td>
                    <td>{b.partySize} Guests</td>
                    <td>
                      <span className="badge badge-green">{b.tableId}</span>
                    </td>
                    <td>{b.time}</td>
                    <td>
                      <span className="badge badge-green">£10.00 Held</span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        onClick={() => {
                          setBookings(bookings.filter(x => x.id !== b.id));
                          if (onUpdateTableStatus) {
                            onUpdateTableStatus(b.tableId, 'Available');
                          } else {
                            setLocalTables(prev => prev.map(t => t.id === b.tableId ? { ...t, status: 'Available' } : t));
                          }
                        }}
                        className="btn-secondary"
                        style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                      >
                        Seat Guest / Clear
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 2: Floor Plan */}
      {activeTab === 'floor' && (
        <div className="data-table-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Restaurant Floor Layout & Live Status</h3>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Click any booth to toggle Walk-In Seated / Available
            </span>
          </div>

          <div className="floor-grid">
            {tables.map((t) => (
              <div
                key={t.id}
                onClick={() => {
                  const nextStatus = t.status === 'Available' ? 'Occupied' : 'Available';
                  if (onUpdateTableStatus) {
                    onUpdateTableStatus(t.id, nextStatus);
                  } else {
                    setLocalTables(prev => prev.map(tbl => tbl.id === t.id ? { ...tbl, status: nextStatus } : tbl));
                  }
                }}
                className="table-card"
                style={{
                  backgroundColor: t.status === 'Available' ? 'var(--bg-surface)' : 'var(--status-amber-bg)',
                  borderColor: t.status === 'Available' ? 'var(--status-green-border)' : 'var(--status-amber-border)'
                }}
              >
                <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                  {t.id}
                </div>
                <div style={{ fontSize: '0.82rem', fontWeight: 600 }}>{t.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t.zone} · {t.seats} Seats</div>
                <span className={`badge ${t.status === 'Available' ? 'badge-green' : 'badge-amber'}`} style={{ marginTop: '6px' }}>
                  {t.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Catering & Bulk Orders */}
      {activeTab === 'catering' && (
        <div className="data-table-card" style={{ padding: '36px', textAlign: 'center' }}>
          <Utensils size={36} color="#059669" style={{ margin: '0 auto 14px' }} />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '6px' }}>
            Large Party & Event Catering Portal
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', maxWidth: '520px', margin: '0 auto 20px' }}>
            Orders of 5 or more pizzas require automated 50% deposit via WhatsApp Stripe checkout link.
          </p>
          <button onClick={() => alert('New catering package proposal initiated.')} className="btn-primary">
            + Create Catering Proposal
          </button>
        </div>
      )}

      {/* Log Walk-in Booking Modal */}
      {showLogModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Log Walk-In / Phone Booking</h3>
              <button onClick={() => setShowLogModal(false)} className="close-btn">✕</button>
            </div>
            <form onSubmit={handleCreateBooking}>
              <div className="form-group">
                <label className="form-label">Guest Full Name *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  placeholder="e.g. Fiona Campbell"
                  value={bookingForm.name}
                  onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Contact Phone Number *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  placeholder="+44 7700 900123"
                  value={bookingForm.phone}
                  onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">Table</label>
                  <select
                    className="form-select"
                    value={bookingForm.tableId}
                    onChange={(e) => setBookingForm({ ...bookingForm, tableId: e.target.value })}
                  >
                    {tables.map(t => (
                      <option key={t.id} value={t.id}>{t.id} ({t.seats}s)</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Party Size</label>
                  <input
                    type="number"
                    min="1"
                    className="form-input"
                    value={bookingForm.partySize}
                    onChange={(e) => setBookingForm({ ...bookingForm, partySize: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Time</label>
                  <input
                    type="text"
                    className="form-input"
                    value={bookingForm.time}
                    onChange={(e) => setBookingForm({ ...bookingForm, time: e.target.value })}
                  />
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                <button type="button" onClick={() => setShowLogModal(false)} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
