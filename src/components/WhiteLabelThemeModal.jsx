import React, { useState } from 'react';
import { X, Check, Palette, Store, Sparkles, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function WhiteLabelThemeModal({ isOpen, onClose, brandConfig, onUpdateBrand }) {
  const [storeName, setStoreName] = useState(brandConfig?.storeName || 'The Braehead Slice');
  const [tagline, setTagline] = useState(brandConfig?.tagline || 'Artisan Glasgow Sourdough & Kebabs');
  const [selectedPalette, setSelectedPalette] = useState(brandConfig?.paletteId || 'emerald');
  const [cornerRoundness, setCornerRoundness] = useState('14px');
  const [savedNotice, setSavedNotice] = useState(false);

  if (!isOpen) return null;

  const palettes = [
    {
      id: 'emerald',
      name: 'Emerald Sourdough (Default)',
      primary: '#10b981',
      hover: '#059669',
      light: 'rgba(16, 185, 129, 0.12)',
      accent: '#059669'
    },
    {
      id: 'navy',
      name: 'Royal Napoli Navy',
      primary: '#3b82f6',
      hover: '#1d4ed8',
      light: 'rgba(59, 130, 246, 0.12)',
      accent: '#1d4ed8'
    },
    {
      id: 'amber',
      name: 'Tuscan Sunset Amber',
      primary: '#f59e0b',
      hover: '#d97706',
      light: 'rgba(245, 158, 11, 0.12)',
      accent: '#d97706'
    },
    {
      id: 'ruby',
      name: 'Ruby Marinara Red',
      primary: '#ef4444',
      hover: '#dc2626',
      light: 'rgba(239, 68, 68, 0.12)',
      accent: '#dc2626'
    },
    {
      id: 'purple',
      name: 'Highland Artisan Violet',
      primary: '#a855f7',
      hover: '#7e22ce',
      light: 'rgba(168, 85, 247, 0.12)',
      accent: '#7e22ce'
    }
  ];

  const applyThemeLive = (palette) => {
    setSelectedPalette(palette.id);
    const root = document.documentElement;
    root.style.setProperty('--brand-primary', palette.primary);
    root.style.setProperty('--brand-primary-hover', palette.hover);
    root.style.setProperty('--brand-primary-light', palette.light);
    root.style.setProperty('--brand-accent', palette.accent);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const activePalette = palettes.find(p => p.id === selectedPalette) || palettes[0];
    applyThemeLive(activePalette);

    if (onUpdateBrand) {
      onUpdateBrand({
        storeName,
        tagline,
        paletteId: selectedPalette,
        colors: activePalette
      });
    }

    setSavedNotice(true);
    setTimeout(() => {
      setSavedNotice(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="modal-overlay" style={{ zIndex: 1100 }}>
      <div className="modal-content" style={{ maxWidth: '560px', padding: '24px' }}>
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff'
            }}>
              <Palette size={20} />
            </div>
            <div>
              <h3 className="modal-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                Dynamic White-Label Branding
                <span className="badge badge-amber" style={{ fontSize: '0.72rem' }}>Feature 67</span>
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Customize store name, logo, and brand theme accents applied across all screens via CSS variables.
              </p>
            </div>
          </div>
          <button onClick={onClose} className="close-btn">
            <X size={18} />
          </button>
        </div>

        {savedNotice && (
          <div style={{
            margin: '12px 0',
            padding: '10px 14px',
            borderRadius: '10px',
            background: '#ecfdf5',
            border: '1px solid #059669',
            color: '#065f46',
            fontSize: '0.82rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <CheckCircle2 size={16} color="#059669" />
            <span>White-label brand parameters synced across dashboard!</span>
          </div>
        )}

        <form onSubmit={handleSave} style={{ marginTop: '16px' }}>
          {/* Store Name & Tagline */}
          <div className="form-group">
            <label className="form-label">Merchant Storefront Name</label>
            <input
              type="text"
              required
              className="form-input"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              placeholder="e.g. The Braehead Slice"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Subtitle / Culinary Tagline</label>
            <input
              type="text"
              className="form-input"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="e.g. Artisan Glasgow Sourdough & Kebabs"
            />
          </div>

          {/* Color Palettes */}
          <div className="form-group">
            <label className="form-label">Primary Brand Accent Theme</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
              {palettes.map((p) => {
                const isSelected = selectedPalette === p.id;
                return (
                  <div
                    key={p.id}
                    onClick={() => applyThemeLive(p)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 14px',
                      borderRadius: '12px',
                      border: isSelected ? `2px solid ${p.primary}` : '1px solid var(--border-color)',
                      background: isSelected ? p.light : 'var(--bg-surface)',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        background: p.primary,
                        boxShadow: `0 0 10px ${p.primary}`,
                        display: 'inline-block'
                      }} />
                      <span style={{ fontWeight: 700, fontSize: '0.86rem', color: 'var(--text-primary)' }}>
                        {p.name}
                      </span>
                    </div>
                    {isSelected && <Check size={16} color={p.primary} />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Live Preview Pill */}
          <div style={{
            padding: '12px 16px',
            borderRadius: '12px',
            background: 'var(--bg-surface-secondary)',
            border: '1px solid var(--border-color)',
            marginTop: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                {storeName}
              </div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                {tagline}
              </div>
            </div>
            <span className="badge badge-green" style={{ fontSize: '0.74rem' }}>
              Live CSS Preview
            </span>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
              style={{ flex: 1, justifyContent: 'center' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              style={{ flex: 1.5, justifyContent: 'center' }}
            >
              <Check size={16} /> Save &amp; Apply Branding
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

