import React, { useState } from 'react';
import { X, Plus, Image as ImageIcon } from 'lucide-react';

export default function AddProductModal({ isOpen, onClose, onAddProduct, categories }) {
  const [formData, setFormData] = useState({
    name: '',
    category: categories[0]?.name || 'Pizzas',
    brand: 'The Braehead Slice',
    price: '',
    stock: '',
    reorderLevel: '10',
    description: '',
    restriction: 'None',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=150&auto=format&fit=crop&q=80'
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return;

    onAddProduct({
      id: `prod-${Date.now()}`,
      name: formData.name,
      category: formData.category,
      brand: formData.brand,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock) || 50,
      reorderLevel: parseInt(formData.reorderLevel) || 10,
      inStock: true,
      status: 'active',
      createdAt: 'Just now',
      image: formData.image,
      description: formData.description,
      restriction: formData.restriction,
      expiryDays: 30
    });

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="modal-title">Add New Product</h3>
          <button onClick={onClose} className="close-btn">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Product Name *</label>
            <input
              type="text"
              required
              className="form-input"
              placeholder="e.g. Stone-Baked Tartufo Pizza 12-inch"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                className="form-select"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Brand / Vendor</label>
              <input
                type="text"
                className="form-input"
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label">Price (£) *</label>
              <input
                type="number"
                step="0.01"
                required
                className="form-input"
                placeholder="12.50"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Initial Stock</label>
              <input
                type="number"
                className="form-input"
                placeholder="50"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Reorder Limit</label>
              <input
                type="number"
                className="form-input"
                value={formData.reorderLevel}
                onChange={(e) => setFormData({ ...formData, reorderLevel: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Dietary Restriction</label>
            <select
              className="form-select"
              value={formData.restriction}
              onChange={(e) => setFormData({ ...formData, restriction: e.target.value })}
            >
              <option value="None">None</option>
              <option value="Halal">Halal</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Vegan">Vegan</option>
              <option value="Gluten-Free">Gluten-Free</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              className="form-textarea"
              rows={3}
              placeholder="Fresh ingredients, toppings and tasting notes..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              <Plus size={16} /> Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
