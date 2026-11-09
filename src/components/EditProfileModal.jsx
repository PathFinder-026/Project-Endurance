import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

export default function EditProfileModal({ isOpen, onClose, userName, onSaveName }) {
  const [name, setName] = useState(userName || 'Sakib');
  const [role, setRole] = useState('Merchant admin');
  const [email, setEmail] = useState('sakibahmedloner@gmail.com');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveName(name);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="modal-title">Merchant Admin Profile</h3>
          <button onClick={onClose} className="close-btn">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Display Name</label>
            <input
              type="text"
              required
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Account Role</label>
            <input
              type="text"
              disabled
              className="form-input"
              style={{ opacity: 0.7 }}
              value={role}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              disabled
              className="form-input"
              style={{ opacity: 0.7 }}
              value={email}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              <Check size={16} /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
