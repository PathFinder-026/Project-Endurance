import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

export default function AddTableModal({ isOpen, onClose, onAddTable }) {
  const [name, setName] = useState('');
  const [seats, setSeats] = useState('4');
  const [zone, setZone] = useState('Main Hall');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;

    onAddTable({
      id: `T${Date.now().toString().slice(-2)}`,
      name,
      seats: parseInt(seats) || 4,
      status: 'Available',
      zone
    });

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="modal-title">Add Booth / Dining Table</h3>
          <button onClick={onClose} className="close-btn">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Table / Booth Name *</label>
            <input
              type="text"
              required
              className="form-input"
              placeholder="e.g. Table 07 - Courtyard Pergola"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label">Seat Capacity</label>
              <input
                type="number"
                min="1"
                max="20"
                className="form-input"
                value={seats}
                onChange={(e) => setSeats(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Floor Zone</label>
              <select
                className="form-select"
                value={zone}
                onChange={(e) => setZone(e.target.value)}
              >
                <option value="Main Hall">Main Hall</option>
                <option value="Front Dining">Front Dining</option>
                <option value="Bar Lounge">Bar Lounge</option>
                <option value="Veranda">Veranda</option>
                <option value="Kitchen View">Kitchen View</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              <Plus size={16} /> Add Table
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
