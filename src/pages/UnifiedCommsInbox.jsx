import React, { useState } from 'react';
import {
  MessageSquare,
  Search,
  Phone,
  Bot,
  Send,
  User,
  ExternalLink,
  Mic,
  ShieldCheck,
  CheckCheck,
  AlertCircle
} from 'lucide-react';

export default function UnifiedCommsInbox() {
  const [activeThread, setActiveThread] = useState('akash'); // 'akash' | 'sakib'
  const [filterType, setFilterType] = useState('all'); // 'all' | 'human' | 'ai'
  const [showCallLogs, setShowCallLogs] = useState(true);
  const [replyText, setReplyText] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'customer',
      text: 'CONFIRM DCFDB499',
      time: '12:12 AM'
    },
    {
      id: 2,
      sender: 'ai',
      text: 'That will place your order. Let me know if you\'d like to add anything else!',
      time: '12:12 AM'
    },
    {
      id: 3,
      sender: 'customer',
      text: 'CONFIRM DCFDB499',
      time: '12:13 AM'
    },
    {
      id: 4,
      sender: 'ai',
      text: 'Order confirmed. Order ID: 1f21fe9a-f4d7-49d4-8458-84d7490fd3f2 Total: 39.96',
      time: '12:13 AM'
    },
    {
      id: 5,
      sender: 'alert',
      text: 'Order 1f21fe9a status: pending. Total: 39.96. Contact the shop for updates.',
      time: '12:14 AM'
    }
  ]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    setMessages([...messages, {
      id: Date.now(),
      sender: 'human_merchant',
      text: replyText,
      time: 'Just now'
    }]);
    setReplyText('');
  };

  return (
    <div style={{ height: 'calc(100vh - 70px)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Column 1: Conversations List */}
        <div style={{
          width: '320px',
          minWidth: '320px',
          borderRight: '1px solid var(--border-color)',
          backgroundColor: 'var(--bg-surface)',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{ padding: '16px', borderBottom: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-secondary)', letterSpacing: '0.04em' }}>
                UNIFIED COMMS INBOX
              </span>
              <button
                onClick={() => setShowCallLogs(!showCallLogs)}
                style={{
                  background: 'none',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '3px 8px',
                  fontSize: '0.72rem',
                  color: 'var(--text-muted)',
                  cursor: 'pointer'
                }}
              >
                {showCallLogs ? 'Hide Call Logs' : 'Show Call Logs'}
              </button>
            </div>

            <div className="search-input-wrap" style={{ padding: '6px 10px', marginBottom: '10px' }}>
              <Search size={14} color="var(--text-light)" />
              <input
                type="text"
                className="search-input"
                style={{ fontSize: '0.82rem' }}
                placeholder="Search customer name or phone..."
              />
            </div>

            <div style={{ display: 'flex', gap: '4px' }}>
              <button
                onClick={() => setFilterType('all')}
                style={{
                  padding: '4px 10px',
                  borderRadius: '9999px',
                  border: 'none',
                  backgroundColor: filterType === 'all' ? '#133826' : 'var(--bg-surface-secondary)',
                  color: filterType === 'all' ? 'white' : 'var(--text-secondary)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                All (2)
              </button>
              <button
                onClick={() => setFilterType('human')}
                style={{
                  padding: '4px 10px',
                  borderRadius: '9999px',
                  border: 'none',
                  backgroundColor: filterType === 'human' ? '#133826' : 'var(--bg-surface-secondary)',
                  color: filterType === 'human' ? 'white' : 'var(--text-secondary)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Human (0)
              </button>
              <button
                onClick={() => setFilterType('ai')}
                style={{
                  padding: '4px 10px',
                  borderRadius: '9999px',
                  border: 'none',
                  backgroundColor: filterType === 'ai' ? '#133826' : 'var(--bg-surface-secondary)',
                  color: filterType === 'ai' ? 'white' : 'var(--text-secondary)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                AI Active
              </button>
            </div>
          </div>

          <div style={{ flex: 1, overflowY: 'auto' }}>
            {/* Thread 1: Akash */}
            <div
              onClick={() => setActiveThread('akash')}
              style={{
                padding: '14px 16px',
                borderBottom: '1px solid var(--border-light)',
                backgroundColor: activeThread === 'akash' ? 'var(--bg-surface-hover)' : 'transparent',
                cursor: 'pointer',
                display: 'flex',
                gap: '12px',
                alignItems: 'center'
              }}
            >
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: 'var(--status-green-bg)',
                color: 'var(--status-green-text)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '0.85rem'
              }}>
                AB
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.88rem' }}>Akash Brahmbhatt</span>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <span className="badge badge-green" style={{ fontSize: '0.68rem', padding: '1px 5px' }}>AI</span>
                    <span className="badge" style={{ backgroundColor: 'var(--bg-surface-secondary)', color: 'var(--text-muted)', border: '1px solid var(--border-color)', fontSize: '0.68rem', padding: '1px 5px' }}>24h</span>
                  </div>
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', marginTop: '2px' }}>
                  Order confirmed. Order ID: 1f21fe9a-f4d7-...
                </div>
              </div>
            </div>

            {/* Thread 2: Sakib */}
            <div
              onClick={() => setActiveThread('sakib')}
              style={{
                padding: '14px 16px',
                borderBottom: '1px solid var(--border-light)',
                backgroundColor: activeThread === 'sakib' ? 'var(--bg-surface-hover)' : 'transparent',
                cursor: 'pointer',
                display: 'flex',
                gap: '12px',
                alignItems: 'center'
              }}
            >
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: 'var(--status-green-bg)',
                color: 'var(--status-green-text)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '0.85rem'
              }}>
                SA
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.88rem' }}>Sakib</span>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <span className="badge badge-green" style={{ fontSize: '0.68rem', padding: '1px 5px' }}>AI</span>
                    <span className="badge badge-amber" style={{ fontSize: '0.68rem', padding: '1px 5px' }}>Tpl</span>
                  </div>
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', marginTop: '2px' }}>
                  [Template: storm_prep_alert]
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Column 2: Live Chat Panel */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-app)' }}>
          {/* Chat Header */}
          <div style={{
            padding: '14px 24px',
            backgroundColor: 'var(--bg-surface)',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontWeight: 800, fontSize: '1.05rem' }}>Akash Brahmbhatt</span>
                <a href="#crm" onClick={(e) => e.preventDefault()} style={{ fontSize: '0.8rem', color: '#059669', display: 'flex', alignItems: 'center', gap: '2px', textDecoration: 'none', fontWeight: 600 }}>
                  CRM Profile <ExternalLink size={12} />
                </a>
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                447777154301 · Meta 24-Hour Customer Service Window Active
              </div>
            </div>

            <button
              onClick={() => alert('Merchant staff takeover: AI concierge paused on this WhatsApp thread.')}
              className="btn-secondary"
              style={{ fontSize: '0.82rem', padding: '6px 12px' }}
            >
              AI Active · Take Over Chat
            </button>
          </div>

          {/* Messages Feed */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {messages.map((m) => {
              if (m.sender === 'alert') {
                return (
                  <div
                    key={m.id}
                    style={{
                      alignSelf: 'center',
                      backgroundColor: 'var(--status-red-bg)',
                      border: '1px solid var(--status-red-border)',
                      color: 'var(--status-red-text)',
                      borderRadius: '12px',
                      padding: '10px 18px',
                      fontSize: '0.82rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      maxWidth: '80%'
                    }}
                  >
                    <AlertCircle size={16} />
                    <span>{m.text}</span>
                    <span style={{ fontSize: '0.72rem', opacity: 0.7, marginLeft: 'auto' }}>{m.time}</span>
                  </div>
                );
              }

              const isUser = m.sender === 'customer';
              return (
                <div
                  key={m.id}
                  style={{
                    alignSelf: isUser ? 'flex-start' : 'flex-end',
                    backgroundColor: isUser ? 'var(--bg-surface)' : 'var(--status-blue-bg)',
                    color: isUser ? 'var(--text-primary)' : 'var(--status-blue-text)',
                    border: isUser ? '1px solid var(--border-color)' : '1px solid var(--status-blue-border)',
                    padding: '10px 14px',
                    borderRadius: isUser ? '14px 14px 14px 2px' : '14px 14px 2px 14px',
                    maxWidth: '70%',
                    boxShadow: 'var(--shadow-sm)',
                    fontSize: '0.88rem'
                  }}
                >
                  {!isUser && (
                    <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--status-blue-text)', marginBottom: '2px' }}>
                      Slice AI
                    </div>
                  )}
                  <div>{m.text}</div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textAlign: 'right', marginTop: '4px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
                    {m.time}
                    <CheckCheck size={12} color="#0284c7" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Chat Reply Input Bar */}
          <form
            onSubmit={handleSend}
            style={{
              padding: '14px 20px',
              backgroundColor: 'var(--bg-surface)',
              borderTop: '1px solid var(--border-color)',
              display: 'flex',
              gap: '10px'
            }}
          >
            <input
              type="text"
              className="form-input"
              style={{ flex: 1 }}
              placeholder="Send direct WhatsApp message or command..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
            <button type="submit" className="btn-primary" style={{ padding: '8px 16px' }}>
              <Send size={16} />
            </button>
          </form>
        </div>

        {/* Column 3: Voice Call & Audio Transcripts */}
        {showCallLogs && (
          <div style={{
            width: '360px',
            minWidth: '360px',
            borderLeft: '1px solid var(--border-color)',
            backgroundColor: 'var(--bg-surface)',
            padding: '20px',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 800 }}>Voice Call & Audio Transcripts</h3>
                <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>Timestamped Voice & Call Log Verification</div>
              </div>
              <span className="badge badge-green" style={{ fontSize: '0.72rem' }}>
                <ShieldCheck size={12} /> Synced
              </span>
            </div>

            <div style={{
              backgroundColor: 'var(--bg-surface-secondary)',
              borderRadius: 'var(--radius-md)',
              padding: '14px',
              border: '1px solid var(--border-color)',
              marginBottom: '16px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Akash Brahmbhatt</span>
                <span className="badge badge-green" style={{ fontSize: '0.68rem' }}>Voice & Audio Log</span>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>447777154301</div>
            </div>

            <div style={{
              backgroundColor: 'var(--bg-surface-secondary)',
              borderRadius: 'var(--radius-md)',
              padding: '14px',
              border: '1px solid var(--border-color)'
            }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, marginBottom: '8px' }}>
                Timestamped Call & Voice Ledger
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.5, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div>
                  <strong style={{ color: '#059669' }}>[00:02] Customer:</strong> "Order confirmed. Order ID: 1f21fe9a-f4d7-49d4-8458-84d7490fd3f2 Total: 39.96"
                </div>
                <div>
                  <strong style={{ color: '#2563eb' }}>[00:06] AI Concierge:</strong> "Verified against live menu & kitchen queue."
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
