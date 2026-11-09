import React, { useState } from 'react';
import { Plus, Search, ArrowUpDown, Clock } from 'lucide-react';

export default function MenuCategories({
  categories,
  onOpenAddCategory,
  onRemoveCategory
}) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = categories.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-container">
      {/* Page Header */}
      <div className="page-header-row">
        <div className="page-title-group">
          <h1 className="page-title">Categories</h1>
          <div className="page-subtitle">
            Removing a category leaves its products uncategorized; the product count below shows the impact first.
          </div>
        </div>

        <div className="page-header-actions">
          <button onClick={onOpenAddCategory} className="btn-primary" style={{ backgroundColor: '#163b2a' }}>
            <Plus size={16} /> New category
          </button>
        </div>
      </div>

      {/* Filter Row */}
      <div className="filter-bar">
        <div className="search-input-wrap">
          <Search size={16} color="var(--text-light)" />
          <input
            type="text"
            className="search-input"
            placeholder="Search category or merchant..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Categories Table */}
      <div className="data-table-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  Category <ArrowUpDown size={12} />
                </div>
              </th>
              <th>Available Hours (Time-Gating)</th>
              <th>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  Products <ArrowUpDown size={12} />
                </div>
              </th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.map((c) => (
              <tr key={c.id}>
                <td>
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{c.name}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {c.description}
                    </div>
                  </div>
                </td>
                <td>
                  <span className="badge badge-green" style={{ fontSize: '0.78rem', textTransform: 'none' }}>
                    <Clock size={12} /> {c.hours}
                  </span>
                </td>
                <td>
                  <span style={{ fontWeight: 800, color: '#059669', fontSize: '1rem' }}>
                    {c.productsCount}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <div style={{ display: 'inline-flex', gap: '8px' }}>
                    <button
                      onClick={() => alert(`Edit category: ${c.name}`)}
                      className="btn-secondary"
                      style={{ padding: '6px 12px', fontSize: '0.82rem' }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onRemoveCategory(c.id)}
                      className="btn-danger"
                      style={{ padding: '6px 12px', fontSize: '0.82rem' }}
                    >
                      Remove
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
