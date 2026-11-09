import React, { useState } from 'react';
import {
  Plus,
  Search,
  ArrowUpDown,
  Share2,
  Sparkles,
  Layers,
  AlertTriangle,
  PackageCheck,
  PackageX,
  Slice,
  Camera
} from 'lucide-react';

export default function MenuCatalog({
  products,
  categories,
  onToggleStock,
  onOpenAddProduct,
  onOpenCategories,
  onOpenPizzaBuilder,
  onOpenVisionScanner,
  hideValues
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStock, setSelectedStock] = useState('all');
  const [selectedRestriction, setSelectedRestriction] = useState('all');
  const [selectedExpiry, setSelectedExpiry] = useState('all');

  const filteredProducts = products.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchStatus = selectedStatus === 'all' || p.status === selectedStatus;
    const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchStock =
      selectedStock === 'all' ||
      (selectedStock === 'in' && p.inStock) ||
      (selectedStock === 'out' && !p.inStock);
    const matchRest =
      selectedRestriction === 'all' || p.restriction === selectedRestriction;

    return matchSearch && matchStatus && matchCat && matchStock && matchRest;
  });

  const activeCount = products.filter((p) => p.status === 'active').length;
  const lowStockCount = products.filter((p) => p.stock <= p.reorderLevel).length;
  const outOfStockCount = products.filter((p) => !p.inStock || p.stock === 0).length;

  return (
    <div className="page-container">
      {/* Page Header */}
      <div className="page-header-row">
        <div className="page-title-group">
          <h1 className="page-title">Menu & Catalog</h1>
          <div className="page-subtitle">
            Manage your food, retail and age-restricted inventory across all ordering channels.
          </div>
        </div>

        <div className="page-header-actions" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            onClick={onOpenPizzaBuilder}
            className="btn-secondary"
            title="Complex Modifier Engine (Feature 9)"
          >
            <Slice size={15} color="#d97706" /> Pizza Modifier Builder
          </button>
          <button
            onClick={onOpenVisionScanner}
            className="btn-secondary"
            title="AI Vision Onboarding & Competitor Scanner"
          >
            <Camera size={15} color="#059669" /> AI Vision Scanner
          </button>
          <button onClick={onOpenAddProduct} className="btn-primary">
            <Plus size={16} /> Add product
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-top-row">
            <span className="kpi-title">Active</span>
            <div className="kpi-icon-wrap">
              <PackageCheck size={18} />
            </div>
          </div>
          <div className="kpi-value">{activeCount}</div>
          <div className="kpi-footer">
            <span>Published on WhatsApp menu</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top-row">
            <span className="kpi-title">Archived</span>
            <div className="kpi-icon-wrap" style={{ backgroundColor: 'var(--bg-surface-secondary)', color: 'var(--text-muted)' }}>
              <Layers size={18} />
            </div>
          </div>
          <div className="kpi-value">0</div>
          <div className="kpi-footer">
            <span>Hidden from storefront</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top-row">
            <span className="kpi-title">Low stock</span>
            <div className="kpi-icon-wrap amber">
              <AlertTriangle size={18} />
            </div>
          </div>
          <div className="kpi-value">{lowStockCount}</div>
          <div className="kpi-footer">
            <span>At or below reorder level</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-top-row">
            <span className="kpi-title">Out of stock</span>
            <div className="kpi-icon-wrap red">
              <PackageX size={18} />
            </div>
          </div>
          <div className="kpi-value">{outOfStockCount}</div>
          <div className="kpi-footer">
            <span>Zero available quantity</span>
          </div>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <button
          onClick={() => alert('WhatsApp Menu Card exported: PDF & interactive catalog link generated for WhatsApp Broadcast.')}
          className="btn-secondary"
        >
          <Share2 size={15} /> WhatsApp Menu Card
        </button>

        <button onClick={onOpenCategories} className="btn-secondary">
          <Layers size={15} /> Categories ({categories.length})
        </button>

        <button
          onClick={() => alert('All pantry items audited: Stock velocity is healthy.')}
          className="btn-secondary"
        >
          Stock & Expiry
        </button>

        <button
          onClick={() => alert('AI Vision Add Product: Camera ready. Snap any dish or grocery label to generate name, calories, allergens, and price!')}
          className="btn-secondary"
          style={{ borderColor: '#34d399', color: 'var(--brand-accent)', fontWeight: 700 }}
        >
          <Sparkles size={15} /> AI Vision Add Product
        </button>
      </div>

      {/* Filter Row */}
      <div className="filter-bar">
        <div className="search-input-wrap">
          <Search size={16} color="var(--text-light)" />
          <input
            type="text"
            className="search-input"
            placeholder="Search name, brand or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          className="custom-select"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="all">All statuses</option>
          <option value="active">Active</option>
          <option value="draft">Draft</option>
          <option value="archived">Archived</option>
        </select>

        <select
          className="custom-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.name}>{c.name}</option>
          ))}
        </select>

        <select
          className="custom-select"
          value={selectedStock}
          onChange={(e) => setSelectedStock(e.target.value)}
        >
          <option value="all">Any stock</option>
          <option value="in">In Stock</option>
          <option value="out">Out of Stock</option>
        </select>

        <select
          className="custom-select"
          value={selectedRestriction}
          onChange={(e) => setSelectedRestriction(e.target.value)}
        >
          <option value="all">Any restriction</option>
          <option value="Halal">Halal</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="None">None</option>
        </select>

        <select
          className="custom-select"
          value={selectedExpiry}
          onChange={(e) => setSelectedExpiry(e.target.value)}
        >
          <option value="all">Any expiry</option>
          <option value="30">Expiring in 30 days</option>
          <option value="60">Expiring in 60 days</option>
        </select>
      </div>

      {/* Products Table */}
      <div className="data-table-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                  Product <ArrowUpDown size={12} />
                </div>
              </th>
              <th>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                  Price <ArrowUpDown size={12} />
                </div>
              </th>
              <th>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                  Stock <ArrowUpDown size={12} />
                </div>
              </th>
              <th>AI Availability Toggle</th>
              <th>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                  Status <ArrowUpDown size={12} />
                </div>
              </th>
              <th>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                  Created <ArrowUpDown size={12} />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((p) => (
              <tr key={p.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <img
                      src={p.image}
                      alt={p.name}
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '8px',
                        objectFit: 'cover',
                        border: '1px solid var(--border-color)'
                      }}
                    />
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{p.name}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        {p.brand} · {p.category}
                      </div>
                    </div>
                  </div>
                </td>
                <td style={{ fontWeight: 700 }}>
                  {hideValues ? '••••' : `£${p.price.toFixed(2)}`}
                </td>
                <td>
                  <div>
                    <span style={{ fontWeight: 600 }}>{p.stock}</span>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                      reorder {p.reorderLevel}
                    </div>
                  </div>
                </td>
                <td>
                  <div
                    onClick={() => onToggleStock(p.id)}
                    className="switch-control"
                  >
                    <div className={`switch-track ${p.inStock ? 'active' : ''}`}>
                      <div className="switch-thumb"></div>
                    </div>
                    <span className="switch-label">
                      {p.inStock ? 'IN STOCK' : 'OUT OF STOCK'}
                    </span>
                  </div>
                </td>
                <td>
                  <span className={`badge ${p.status === 'active' ? 'badge-green' : 'badge-amber'}`}>
                    {p.status}
                  </span>
                </td>
                <td style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                  {p.createdAt}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
