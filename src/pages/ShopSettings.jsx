import React, { useState } from 'react';
import { Store, Clock, MapPin, DollarSign, ShieldCheck, Check, Palette } from 'lucide-react';

export default function ShopSettings({ onOpenWhiteLabel }) {
  const [shopName, setShopName] = useState('My Test Company');
  const [tradingName, setTradingName] = useState('The Braehead Slice');
  const [currency, setCurrency] = useState('GBP (£)');
  const [vatNumber, setVatNumber] = useState('GB 349 9281 04');
  const [openingTime, setOpeningTime] = useState('11:00');
  const [closingTime, setClosingTime] = useState('23:00');
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="page-container">
      <div className="page-header-row">
        <div className="page-title-group">
          <h1 className="page-title">Shop Settings & Operating Parameters</h1>
          <div className="page-subtitle">
            Configure your business profile, operating hours, delivery perimeter, and VAT numbers.
          </div>
        </div>
        <div className="page-header-actions">
          <button
            type="button"
            onClick={onOpenWhiteLabel}
            className="btn-primary"
            style={{ backgroundColor: '#133826' }}
          >
            <Palette size={16} /> Customise White-Label Branding (Feature 67)
          </button>
        </div>
      </div>

      {saved && (
        <div className="notice-card green-theme" style={{ marginBottom: '20px' }}>
          <Check size={18} color="#059669" />
          <span>Shop settings updated and synchronized with live WhatsApp merchant catalog!</span>
        </div>
      )}

      <div className="data-table-card" style={{ padding: '32px', maxWidth: '800px' }}>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Legal Business Entity Name</label>
              <input
                type="text"
                className="form-input"
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Storefront / Trading Name</label>
              <input
                type="text"
                className="form-input"
                value={tradingName}
                onChange={(e) => setTradingName(e.target.value)}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Base Currency</label>
              <select
                className="form-select"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option value="GBP (£)">GBP (£) - British Pound</option>
                <option value="EUR (€)">EUR (€) - Euro</option>
                <option value="USD ($)">USD ($) - US Dollar</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">UK VAT / Tax Registration ID</label>
              <input
                type="text"
                className="form-input"
                value={vatNumber}
                onChange={(e) => setVatNumber(e.target.value)}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Opening Time</label>
              <input
                type="time"
                className="form-input"
                value={openingTime}
                onChange={(e) => setOpeningTime(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Closing Time</label>
              <input
                type="time"
                className="form-input"
                value={closingTime}
                onChange={(e) => setClosingTime(e.target.value)}
              />
            </div>
          </div>

          <div style={{ marginTop: '24px' }}>
            <button type="submit" className="btn-primary" style={{ padding: '10px 24px' }}>
              Save Shop Parameters
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
