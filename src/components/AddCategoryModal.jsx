import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

export default function AddCategoryModal({ isOpen, onClose, onAddCategory }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [hours, setHours] = useState('All Day (00:00 - 23:59)');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;

    onAddCategory({
      id: `cat-${Date.now()}`,
      name,
      description,
      hours,
      productsCount: 0
    });

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="modal-title">New Category</h3>
          <button onClick={onClose} className="close-btn">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Category Name *</label>
            <input
              type="text"
              required
              className="form-input"
              placeholder="e.g. Artisanal Breads & Focaccia"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              className="form-textarea"
              rows={3}
              placeholder="Brief description for customer menu cards..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Available Hours (Time-Gating)</label>
            <select
              className="form-select"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
            >
              <option value="All Day (00:00 - 23:59)">All Day (00:00 - 23:59)</option>
              <option value="Breakfast & Brunch (07:00 - 11:30)">Breakfast & Brunch (07:00 - 11:30)</option>
              <option value="Lunch Special (12:00 - 16:00)">Lunch Special (12:00 - 16:00)</option>
              <option value="Evening Dinner (17:00 - 23:00)">Evening Dinner (17:00 - 23:00)</option>
              <option value="Late Night Munchies (22:00 - 03:00)">Late Night Munchies (22:00 - 03:00)</option>
            </select>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              <Plus size={16} /> Create Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
