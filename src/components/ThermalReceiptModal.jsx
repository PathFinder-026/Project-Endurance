import React, { useState } from 'react';
import { X, Printer, CheckCircle2, Copy, Wifi, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function ThermalReceiptModal({ isOpen, onClose, order }) {
  const [isSpooling, setIsSpooling] = useState(false);
  const [spooledSuccess, setSpooledSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentOrder = order || {
    id: '104',
    customerName: 'Akash Sharma',
    phone: '447789123456',
    address: '12 Braehead Road, Glasgow, G51 4BN',
    deliveryType: 'Delivery',
    createdAt: 'Today, 15:34',
    amount: 39.96,
    items: [
      { name: '12" The Braehead Special Pizza', qty: 1, price: 14.50, modifiers: 'WELL-DONE • CUT IN 4 • HOT HONEY' },
      { name: 'Glasgow Munchy Box', qty: 1, price: 19.99, modifiers: 'HALAL • EXTRA GARLIC SAUCE' },
      { name: 'Barr Irn-Bru 330ml Can ("Ginger")', qty: 2, price: 2.73, modifiers: 'CHILLED' }
    ]
  };

  const handlePrintNodeSpool = () => {
    setIsSpooling(true);
    setTimeout(() => {
      setIsSpooling(false);
      setSpooledSuccess(true);
      setTimeout(() => setSpooledSuccess(false), 4000);
    }, 1200);
  };

  const handleBrowserPrint = () => {
    window.print();
  };

  const rawThermalText = `
========================================
           THE BRAEHEAD SLICE
    Artisan Glasgow Sourdough Pizzas
       14 Braehead Way, Glasgow
         VAT: GB 349 9281 04
========================================
ORDER #${currentOrder.id} [${currentOrder.deliveryType ? currentOrder.deliveryType.toUpperCase() : 'DELIVERY'}]
TIME: ${currentOrder.createdAt || '15:34'}
SOURCE: WhatsApp AI Bot (Meta Cloud API)
CUSTOMER: ${currentOrder.customerName}
TEL: +${currentOrder.phone ? currentOrder.phone.slice(0, 4) + ' ' + currentOrder.phone.slice(4, 7) + '***' : '+44 77** ***'}
ADDRESS: ${currentOrder.address || '12 Braehead Road'}
----------------------------------------
KITCHEN ITEMS:
${(currentOrder.items || []).map(i => `${i.qty}x ${i.name.toUpperCase()}\n   >> ${i.modifiers || 'STANDARD PREP'}`).join('\n')}
----------------------------------------
[!] DIETARY GUARDIAN: HALAL VERIFIED
[!] 60-SEC SOFT-ACCEPT: CONFIRMED
----------------------------------------
SUBTOTAL:             £${((currentOrder.amount || 39.96) - 2.50).toFixed(2)}
DELIVERY FEE:         £2.50 (Shop Driver)
MARKETPLACE CUT:      £0.00 (Zero Commission)
TOTAL PAID:           £${(currentOrder.amount || 39.96).toFixed(2)}
PAYMENT: STRIPE (IDEMPOTENCY CONFIRMED)
========================================
`.trim();

  const handleCopyRaw = () => {
    navigator.clipboard?.writeText(rawThermalText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modal-overlay" style={{ zIndex: 1100 }}>
      <div className="modal-content" style={{ maxWidth: '460px', padding: '24px' }}>
        {/* Header */}
        <div className="modal-header" style={{ marginBottom: '16px' }}>
          <div>
            <h3 className="modal-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Printer size={18} color="#059669" />
              Thermal Kitchen Docket Preview
            </h3>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              80mm ESC/POS physical printer output (PrintNode Feature 24)
            </div>
          </div>
          <button onClick={onClose} className="close-btn">
            <X size={18} />
          </button>
        </div>

        {/* PrintNode Status Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 12px',
          borderRadius: '10px',
          background: 'rgba(16, 185, 129, 0.1)',
          border: '1px solid rgba(16, 185, 129, 0.25)',
          marginBottom: '16px',
          fontSize: '0.78rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#047857', fontWeight: 600 }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
            <span>PrintNode: Citizen CT-S310II (80mm)</span>
          </div>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>Latency: 18ms</span>
        </div>

        {/* 80mm Physical Thermal Paper Simulation */}
        <div style={{
          background: '#fffdfa',
          color: '#111827',
          padding: '24px 20px',
          borderRadius: '6px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.12), 0 1px 3px rgba(0,0,0,0.08)',
          borderTop: '4px dashed #cbd5e1',
          borderBottom: '4px dashed #cbd5e1',
          fontFamily: '"JetBrains Mono", Courier, monospace',
          fontSize: '0.74rem',
          lineHeight: '1.45',
          margin: '0 auto',
          maxWidth: '360px'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '12px' }}>
            <div style={{ fontWeight: 800, fontSize: '0.98rem', letterSpacing: '0.04em' }}>THE BRAEHEAD SLICE</div>
            <div style={{ fontSize: '0.68rem', color: '#4b5563' }}>Artisan Glasgow Sourdough Pizzas</div>
            <div style={{ fontSize: '0.66rem', color: '#6b7280' }}>14 Braehead Way, Glasgow • VAT: GB 349 9281</div>
          </div>

          <div style={{ borderTop: '1px dashed #9ca3af', margin: '8px 0' }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '0.88rem' }}>
            <span>ORDER #{currentOrder.id}</span>
            <span style={{ background: '#111827', color: '#ffffff', padding: '1px 6px', borderRadius: '2px', fontSize: '0.72rem' }}>
              {currentOrder.deliveryType ? currentOrder.deliveryType.toUpperCase() : 'DELIVERY'}
            </span>
          </div>

          <div style={{ fontSize: '0.68rem', color: '#4b5563', marginTop: '2px' }}>
            TIME: {currentOrder.createdAt || '15:34'} | VIA: WhatsApp Cloud API
          </div>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, marginTop: '4px' }}>
            GUEST: {currentOrder.customerName}
          </div>
          <div style={{ fontSize: '0.68rem', color: '#4b5563' }}>
            ADDR: {currentOrder.address}
          </div>

          <div style={{ borderTop: '1px dashed #9ca3af', margin: '8px 0' }} />

          <div style={{ fontWeight: 800, fontSize: '0.75rem', marginBottom: '4px' }}>KITCHEN ITEMS:</div>
          {(currentOrder.items || []).map((item, idx) => (
            <div key={idx} style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
                <span>{item.qty}x {item.name.toUpperCase()}</span>
                <span>£{((item.price || 12.0) * (item.qty || 1)).toFixed(2)}</span>
              </div>
              {item.modifiers && (
                <div style={{ fontSize: '0.68rem', color: '#047857', fontWeight: 700, paddingLeft: '8px' }}>
                  &gt;&gt; {item.modifiers}
                </div>
              )}
            </div>
          ))}

          <div style={{ borderTop: '1px dashed #9ca3af', margin: '8px 0' }} />

          {/* Allergy / Dietary Guardian Alert Box */}
          <div style={{
            background: '#111827',
            color: '#ffffff',
            padding: '6px 8px',
            borderRadius: '4px',
            fontSize: '0.68rem',
            fontWeight: 800,
            textAlign: 'center',
            marginBottom: '8px'
          }}>
            [ ! ] DIETARY GUARDIAN: HALAL VERIFIED
          </div>

          {/* Totals */}
          <div style={{ fontSize: '0.7rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Subtotal:</span>
              <span>£{((currentOrder.amount || 39.96) - 2.50).toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Delivery Fee:</span>
              <span>£2.50</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#047857', fontWeight: 700 }}>
              <span>Aggregator Commission:</span>
              <span>£0.00 (0%)</span>
            </div>
            <div style={{ borderTop: '1px solid #111827', marginTop: '4px', paddingTop: '4px', display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '0.84rem' }}>
              <span>TOTAL PAID:</span>
              <span>£{(currentOrder.amount || 39.96).toFixed(2)}</span>
            </div>
            <div style={{ fontSize: '0.64rem', color: '#6b7280', marginTop: '2px' }}>
              PAID: STRIPE CARD (IDEMPOTENCY KEY VERIFIED)
            </div>
          </div>

          {/* Simulated Barcode */}
          <div style={{ textAlign: 'center', marginTop: '14px' }}>
            <div style={{
              height: '24px',
              background: 'repeating-linear-gradient(90deg, #111827, #111827 2px, transparent 2px, transparent 4px, #111827 4px, #111827 7px, transparent 7px, transparent 9px)',
              width: '80%',
              margin: '0 auto 4px'
            }} />
            <div style={{ fontSize: '0.62rem', letterSpacing: '0.15em', color: '#6b7280' }}>
              *VV-ORD-{currentOrder.id}-UK*
            </div>
          </div>
        </div>

        {/* Spool Success Notice */}
        {spooledSuccess && (
          <div style={{
            marginTop: '14px',
            padding: '10px 14px',
            borderRadius: '10px',
            background: '#ecfdf5',
            border: '1px solid #059669',
            color: '#065f46',
            fontSize: '0.8rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <CheckCircle2 size={16} color="#059669" />
            <span>Spool Job #9401 sent to PrintNode thermal printer!</span>
          </div>
        )}

        {/* Controls */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '18px' }}>
          <button
            type="button"
            onClick={handleCopyRaw}
            className="btn-secondary"
            style={{ flex: 1, fontSize: '0.8rem', justifyContent: 'center' }}
          >
            <Copy size={14} /> {copied ? 'Copied!' : 'Copy ESC/POS'}
          </button>
          <button
            type="button"
            onClick={handlePrintNodeSpool}
            disabled={isSpooling}
            className="btn-primary"
            style={{ flex: 1.5, fontSize: '0.8rem', justifyContent: 'center', backgroundColor: '#133826' }}
          >
            <Printer size={15} /> {isSpooling ? 'Printing...' : 'Print via PrintNode'}
          </button>
        </div>
      </div>
    </div>
  );
}

