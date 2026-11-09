import React, { useState } from 'react';
import { X, Camera, Scan, UploadCloud, CheckCircle2, AlertCircle, Sparkles, TrendingUp, DollarSign } from 'lucide-react';

export default function AiVisionScannerModal({ isOpen, onClose, onAddProduct }) {
  const [activeTab, setActiveTab] = useState('vision_product'); // 'vision_product' | 'rival_receipt'
  const [isScanning, setIsScanning] = useState(false);
  const [scannedResult, setScannedResult] = useState(null);
  const [receiptResult, setReceiptResult] = useState(null);

  if (!isOpen) return null;

  const handleSimulateProductScan = () => {
    setIsScanning(true);
    setScannedResult(null);

    setTimeout(() => {
      setIsScanning(false);
      setScannedResult({
        name: 'San Pellegrino Sparkling Blood Orange (Aranciata Rossa)',
        brand: 'San Pellegrino',
        category: 'Drinks & Beverages',
        detectedIngredients: ['Carbonated Water', 'Blood Orange Juice 10%', 'Sugar', 'Citric Acid'],
        allergens: 'None (Gluten Free, Vegan)',
        netWeight: '330ml Can',
        suggestedPrice: 2.25,
        stock: 48,
        confidence: '98.4% (GPT-4o Vision)',
        barcode: '8002270014292'
      });
    }, 1800);
  };

  const handleSimulateReceiptScan = () => {
    setIsScanning(true);
    setReceiptResult(null);

    setTimeout(() => {
      setIsScanning(false);
      setReceiptResult({
        competitor: 'Uber Eats (Local Glasgow Pizzeria)',
        receiptDate: 'Today, 14:15',
        totalItems: 3,
        items: [
          { name: '12" Pepperoni Pizza', rivalPrice: 17.50, ourPrice: 14.50, difference: 3.00 },
          { name: 'Garlic Bread with Cheese', rivalPrice: 7.20, ourPrice: 5.50, difference: 1.70 },
          { name: 'Can of Irn-Bru', rivalPrice: 3.20, ourPrice: 1.80, difference: 1.40 }
        ],
        rivalTotal: 27.90,
        ourTotal: 21.80,
        commissionLostToUber: 8.37, // 30%
        customerSaved: 6.10
      });
    }, 1800);
  };

  const handlePushToCatalog = () => {
    if (!scannedResult) return;

    if (onAddProduct) {
      onAddProduct({
        id: `scanned-${Date.now()}`,
        name: scannedResult.name,
        category: scannedResult.category,
        brand: scannedResult.brand,
        price: scannedResult.suggestedPrice,
        stock: scannedResult.stock,
        reorderLevel: 10,
        inStock: true,
        status: 'active',
        createdAt: 'Just now (AI Vision)',
        image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=150&auto=format&fit=crop&q=80',
        description: `Imported via GPT-4o Vision. Ingredients: ${scannedResult.detectedIngredients.join(', ')}. Net: ${scannedResult.netWeight}.`,
        restriction: scannedResult.allergens,
        expiryDays: 90
      });
    }
    onClose();
  };

  return (
    <div className="modal-overlay" style={{ zIndex: 1100 }}>
      <div className="modal-content" style={{ maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto' }}>
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff'
            }}>
              <Camera size={20} />
            </div>
            <div>
              <h3 className="modal-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                AI Vision Onboarding &amp; Rival Receipt Scanner
                <span className="badge badge-green" style={{ fontSize: '0.72rem' }}>Features 3 &amp; 39</span>
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                GPT-4o Vision multi-modal scanning for zero-friction catalog entry and competitor pricing intelligence.
              </p>
            </div>
          </div>
          <button onClick={onClose} className="close-btn">
            <X size={18} />
          </button>
        </div>

        {/* Tab Pills */}
        <div className="tab-pill-bar" style={{ margin: '14px 0 18px' }}>
          <button
            type="button"
            onClick={() => setActiveTab('vision_product')}
            className={`tab-pill ${activeTab === 'vision_product' ? 'active' : ''}`}
          >
            <Camera size={14} style={{ display: 'inline', marginRight: '6px' }} />
            Feature 3: 5-Second AI Product Photo Onboarding
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('rival_receipt')}
            className={`tab-pill ${activeTab === 'rival_receipt' ? 'active' : ''}`}
          >
            <TrendingUp size={14} style={{ display: 'inline', marginRight: '6px' }} />
            Feature 39: Rival Takeaway Receipt Scanner
          </button>
        </div>

        {activeTab === 'vision_product' ? (
          /* TAB 1: Product Onboarding */
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '20px' }}>
            {/* Viewfinder Card */}
            <div>
              <div style={{
                height: '260px',
                borderRadius: '16px',
                background: '#090d16',
                border: '2px dashed rgba(16, 185, 129, 0.4)',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                padding: '16px',
                textAlign: 'center'
              }}>
                {isScanning ? (
                  <>
                    <div style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      height: '3px',
                      background: '#10b981',
                      boxShadow: '0 0 16px #10b981',
                      animation: 'scanLaser 1.8s infinite ease-in-out'
                    }} />
                    <Scan size={44} color="#10b981" className="animate-pulse" />
                    <div style={{ marginTop: '12px', fontWeight: 700, fontSize: '0.88rem', color: '#a7f3d0' }}>
                      GPT-4o Vision Analyzing...
                    </div>
                    <div style={{ fontSize: '0.74rem', color: '#94a3b8', marginTop: '4px' }}>
                      Extracting brand, net weight, barcodes &amp; allergens
                    </div>
                  </>
                ) : scannedResult ? (
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '8px' }}>🥫</div>
                    <div style={{ fontWeight: 800, fontSize: '0.88rem', color: '#34d399' }}>
                      Image Processed
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                      Confidence: {scannedResult.confidence}
                    </div>
                  </div>
                ) : (
                  <>
                    <UploadCloud size={40} color="#64748b" style={{ marginBottom: '8px' }} />
                    <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>
                      Photograph Any Can, Box or Ingredient
                    </div>
                    <div style={{ fontSize: '0.74rem', color: '#94a3b8', margin: '4px 0 14px' }}>
                      AI reads packaging text &amp; creates product automatically in seconds
                    </div>
                    <button
                      type="button"
                      onClick={handleSimulateProductScan}
                      className="btn-primary"
                      style={{ fontSize: '0.8rem', padding: '8px 16px' }}
                    >
                      <Camera size={15} /> Simulate Camera Snapshot
                    </button>
                  </>
                )}
              </div>

              {!isScanning && scannedResult && (
                <button
                  type="button"
                  onClick={handleSimulateProductScan}
                  className="btn-secondary"
                  style={{ width: '100%', marginTop: '10px', fontSize: '0.78rem', justifyContent: 'center' }}
                >
                  Scan Another Product
                </button>
              )}
            </div>

            {/* Extracted Product Data Form */}
            <div style={{
              background: 'var(--bg-surface-secondary)',
              borderRadius: '16px',
              padding: '18px',
              border: '1px solid var(--border-color)'
            }}>
              <div style={{ fontSize: '0.76rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>
                Extracted Product Metadata
              </div>

              {scannedResult ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div>
                    <label className="form-label" style={{ fontSize: '0.75rem' }}>Identified Name</label>
                    <input
                      type="text"
                      className="form-input"
                      value={scannedResult.name}
                      readOnly
                      style={{ fontSize: '0.82rem', fontWeight: 700 }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div>
                      <label className="form-label" style={{ fontSize: '0.75rem' }}>Brand</label>
                      <input
                        type="text"
                        className="form-input"
                        value={scannedResult.brand}
                        readOnly
                        style={{ fontSize: '0.8rem' }}
                      />
                    </div>
                    <div>
                      <label className="form-label" style={{ fontSize: '0.75rem' }}>Category</label>
                      <input
                        type="text"
                        className="form-input"
                        value={scannedResult.category}
                        readOnly
                        style={{ fontSize: '0.8rem' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div>
                      <label className="form-label" style={{ fontSize: '0.75rem' }}>Suggested Price (£)</label>
                      <input
                        type="number"
                        className="form-input"
                        value={scannedResult.suggestedPrice}
                        readOnly
                        style={{ fontSize: '0.88rem', fontWeight: 800, color: '#047857' }}
                      />
                    </div>
                    <div>
                      <label className="form-label" style={{ fontSize: '0.75rem' }}>Initial Stock</label>
                      <input
                        type="number"
                        className="form-input"
                        value={scannedResult.stock}
                        readOnly
                        style={{ fontSize: '0.88rem', fontWeight: 800 }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="form-label" style={{ fontSize: '0.75rem' }}>Allergen &amp; Dietary Tags</label>
                    <div style={{ fontSize: '0.78rem', color: '#047857', fontWeight: 600 }}>
                      ✓ {scannedResult.allergens}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handlePushToCatalog}
                    className="btn-primary"
                    style={{ marginTop: '12px', justifyContent: 'center' }}
                  >
                    <CheckCircle2 size={16} /> Publish to Live Catalog Now
                  </button>
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '40px 10px', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                  Click "Simulate Camera Snapshot" to test GPT-4o Vision auto-detection.
                </div>
              )}
            </div>
          </div>
        ) : (
          /* TAB 2: Rival Receipt Scanner */
          <div>
            <div style={{
              background: 'var(--bg-surface-secondary)',
              borderRadius: '16px',
              padding: '20px',
              border: '1px solid var(--border-color)',
              marginBottom: '18px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ fontWeight: 800, fontSize: '0.98rem', marginBottom: '2px' }}>
                    Scan Competitor Receipt (Uber Eats / Deliveroo)
                  </h4>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Extract competitor pricing tables and demonstrate 30% commission margin savings to shopkeepers.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleSimulateReceiptScan}
                  disabled={isScanning}
                  className="btn-primary"
                  style={{ fontSize: '0.8rem', backgroundColor: '#133826' }}
                >
                  <Scan size={14} /> {isScanning ? 'Reading Receipt...' : 'Simulate Receipt Scan'}
                </button>
              </div>
            </div>

            {receiptResult && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Comparison KPI Row */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                  <div style={{ background: 'var(--status-red-bg)', border: '1px solid var(--status-red-border)', borderRadius: '12px', padding: '14px' }}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--status-red-text)', fontWeight: 700 }}>UBER EATS / JUST EAT TOTAL</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--status-red-text)', marginTop: '4px' }}>
                      £{receiptResult.rivalTotal.toFixed(2)}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--status-red-text)', marginTop: '4px', opacity: 0.85 }}>
                      30% Commission: -£{receiptResult.commissionLostToUber.toFixed(2)}
                    </div>
                  </div>

                  <div style={{ background: 'var(--status-green-bg)', border: '1px solid var(--status-green-border)', borderRadius: '12px', padding: '14px' }}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--status-green-text)', fontWeight: 700 }}>VILLAGE VOICE AI DIRECT</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--status-green-text)', marginTop: '4px' }}>
                      £{receiptResult.ourTotal.toFixed(2)}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--status-green-text)', marginTop: '4px', opacity: 0.85 }}>
                      Shop Commission Paid: £0.00 (Zero)
                    </div>
                  </div>

                  <div style={{ background: 'var(--status-blue-bg)', border: '1px solid var(--status-blue-border)', borderRadius: '12px', padding: '14px' }}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--status-blue-text)', fontWeight: 700 }}>CUSTOMER SAVING</div>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--status-blue-text)', marginTop: '4px' }}>
                      £{receiptResult.customerSaved.toFixed(2)} Cheaper
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--status-blue-text)', marginTop: '4px', opacity: 0.85 }}>
                      Plus shop keeps 100% margin
                    </div>
                  </div>
                </div>

                {/* Items Side-by-Side Table */}
                <div className="data-table-container">
                  <table className="data-table" style={{ fontSize: '0.82rem' }}>
                    <thead>
                      <tr>
                        <th>Receipt Item Detected</th>
                        <th>Competitor Price</th>
                        <th>Our Menu Price</th>
                        <th>Net Difference</th>
                      </tr>
                    </thead>
                    <tbody>
                      {receiptResult.items.map((it, idx) => (
                        <tr key={idx}>
                          <td style={{ fontWeight: 700 }}>{it.name}</td>
                          <td style={{ color: '#b91c1c', fontWeight: 700 }}>£{it.rivalPrice.toFixed(2)}</td>
                          <td style={{ color: '#047857', fontWeight: 700 }}>£{it.ourPrice.toFixed(2)}</td>
                          <td style={{ color: '#059669', fontWeight: 800 }}>-£{it.difference.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

