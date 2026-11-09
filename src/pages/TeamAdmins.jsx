import React, { useState } from 'react';
import { UserCheck, Plus, Shield, Mail, Phone, Trash2 } from 'lucide-react';

export default function TeamAdmins() {
  const [members, setMembers] = useState([
    { id: 1, name: 'Sakib', email: 'sakibahmedloner@gmail.com', role: 'Merchant Admin (Owner)', status: 'Active', phone: '+44 7777 154301' },
    { id: 2, name: 'Gordon Ramsay', email: 'kitchen@braeheadslice.co.uk', role: 'Head Chef / Kitchen Lead', status: 'Active', phone: '+44 7811 002233' },
    { id: 3, name: 'Callum MacLeod', email: 'support@braeheadslice.co.uk', role: 'Floor Manager', status: 'Active', phone: '+44 7700 900123' }
  ]);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteForm, setInviteForm] = useState({ name: '', email: '', role: 'Kitchen Staff' });

  const handleAddMember = (e) => {
    e.preventDefault();
    setMembers([...members, {
      id: Date.now(),
      name: inviteForm.name,
      email: inviteForm.email,
      role: inviteForm.role,
      status: 'Invited',
      phone: '+44 7000 000000'
    }]);
    setShowInviteModal(false);
    alert(`Access invitation dispatched to ${inviteForm.email}!`);
  };

  return (
    <div className="page-container">
      <div className="page-header-row">
        <div className="page-title-group">
          <h1 className="page-title">Team & Staff Administration</h1>
          <div className="page-subtitle">
            Manage roles, kitchen station access, PIN codes, and dispute arbitration permissions.
          </div>
        </div>

        <div className="page-header-actions">
          <button onClick={() => setShowInviteModal(true)} className="btn-primary" style={{ backgroundColor: '#133826' }}>
            <Plus size={16} /> Invite Staff Member
          </button>
        </div>
      </div>

      <div className="data-table-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Staff Member</th>
              <th>Email Address</th>
              <th>System Role</th>
              <th>Assigned Phone</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((m) => (
              <tr key={m.id}>
                <td>
                  <div style={{ fontWeight: 700 }}>{m.name}</div>
                </td>
                <td style={{ color: 'var(--text-secondary)' }}>{m.email}</td>
                <td>
                  <span className="badge badge-blue">
                    <Shield size={11} style={{ marginRight: '3px' }} /> {m.role}
                  </span>
                </td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>{m.phone}</td>
                <td>
                  <span className="badge badge-green">{m.status}</span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  {m.id !== 1 && (
                    <button
                      onClick={() => setMembers(members.filter(x => x.id !== m.id))}
                      className="btn-danger"
                      style={{ padding: '5px 10px', fontSize: '0.78rem' }}
                    >
                      <Trash2 size={12} /> Remove
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showInviteModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Invite New Staff Member</h3>
              <button onClick={() => setShowInviteModal(false)} className="close-btn">✕</button>
            </div>
            <form onSubmit={handleAddMember}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={inviteForm.name}
                  onChange={(e) => setInviteForm({ ...inviteForm, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  required
                  className="form-input"
                  value={inviteForm.email}
                  onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Station Role</label>
                <select
                  className="form-select"
                  value={inviteForm.role}
                  onChange={(e) => setInviteForm({ ...inviteForm, role: e.target.value })}
                >
                  <option value="Kitchen Staff">Kitchen Staff (War Room Only)</option>
                  <option value="Floor Host">Floor Host (Reservations & Tables)</option>
                  <option value="Support Agent">Support Agent (Disputes & Inbox)</option>
                  <option value="Merchant Admin">Merchant Admin (Full Access)</option>
                </select>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                <button type="button" onClick={() => setShowInviteModal(false)} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
