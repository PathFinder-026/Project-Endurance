import React from 'react';
import { X, Check, MessageSquare, Phone, MapPin, Clock, Printer, Navigation, Slice } from 'lucide-react';

export default function InspectOrderModal({ isOpen, onClose, order, onBump, onPrintReceipt, onTrackDelivery, onOpenPizzaBuilder, hideValues }) {
  if (!isOpen || !order) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '520px' }}>
        <div className="modal-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="order-code">#{order.id}</span>
              <span className="badge badge-amber">{order.timeAgo} · {order.status}</span>
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Village-Shop Kitchen War Room Dispatch
            </div>
          </div>
          <button onClick={onClose} className="close-btn">
            <X size={18} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Customer info */}
          <div style={{
            backgroundColor: 'var(--bg-surface-secondary)',
            padding: '14px 16px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)'
          }}>
            <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '4px' }}>
              {order.customerName}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              <Phone size={14} /> +{order.phone}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              <MapPin size={14} /> {order.address}
            </div>
          </div>

          {/* Order items */}
          <div>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>
              Order Contents
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--bg-surface)',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>
                    <span style={{ color: 'var(--brand-accent)', marginRight: '6px' }}>{item.qty}x</span>
                    {item.name}
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>
                    {hideValues ? '••••' : `£${(item.price * item.qty).toFixed(2)}`}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          {order.notes && (
            <div style={{
              backgroundColor: 'var(--status-amber-bg)',
              border: '1px solid var(--status-amber-border)',
              borderRadius: 'var(--radius-md)',
              padding: '10px 14px',
              fontSize: '0.85rem',
              color: 'var(--status-amber-text)'
            }}>
              <strong>Customer Note:</strong> {order.notes}
            </div>
          )}

          {/* Total */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '12px',
            borderTop: '1px solid var(--border-color)'
          }}>
            <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>Total Order Value:</span>
            <span style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {hideValues ? '••••' : `£${order.amount.toFixed(2)}`}
            </span>
          </div>

          {/* Actions */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '6px' }}>
            <button
              onClick={() => onPrintReceipt && onPrintReceipt(order)}
              className="btn-secondary"
              style={{ justifyContent: 'center', fontSize: '0.8rem', padding: '8px' }}
            >
              <Printer size={15} color="#059669" /> Print Thermal Ticket
            </button>
            <button
              onClick={() => onTrackDelivery && onTrackDelivery(order)}
              className="btn-secondary"
              style={{ justifyContent: 'center', fontSize: '0.8rem', padding: '8px' }}
            >
              <Navigation size={15} color="#3b82f6" /> Live Driver GPS
            </button>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
            <button
              onClick={() => {
                alert(`WhatsApp message queued to +${order.phone}: "Hello ${order.customerName}, your Village-Shop order #${order.id} is being fresh baked now!"`);
              }}
              className="btn-secondary"
              style={{ flex: 1, justifyContent: 'center' }}
            >
              <MessageSquare size={16} /> WhatsApp Ping
            </button>
            <button
              onClick={() => {
                onBump(order.id);
                onClose();
              }}
              className="btn-primary"
              style={{ flex: 1, justifyContent: 'center' }}
            >
              <Check size={16} /> Bump &rarr; Confirmed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
