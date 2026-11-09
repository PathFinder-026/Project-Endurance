import React, { useState } from 'react';
import { Store, CheckCircle, Sun, Moon } from 'lucide-react';

export default function LoginPage({ onLogin, theme, toggleTheme }) {
  const [email, setEmail] = useState('sakibahmedloner@gmail.com');
  const [password, setPassword] = useState('12345678!');
  const [activeTab, setActiveTab] = useState('signin'); // 'signin' | 'signup'

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="login-split-container">
      {/* Left green branding panel */}
      <div className="login-left-panel">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '80px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              backgroundColor: '#10b981',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              boxShadow: '0 4px 14px rgba(16, 185, 129, 0.4)'
            }}>
              <Store size={26} />
            </div>
            <span style={{ fontSize: '1.45rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#ffffff' }}>
              Village-Shop
            </span>
          </div>

          <h1 style={{
            fontSize: '3.2rem',
            fontWeight: 800,
            lineHeight: 1.15,
            marginBottom: '28px',
            color: '#ffffff',
            letterSpacing: '-0.03em',
            maxWidth: '540px'
          }}>
            Run your whole shop from one command center.
          </h1>

          <p style={{
            fontSize: '1.2rem',
            color: '#c2ded1',
            lineHeight: 1.5,
            marginBottom: '42px',
            maxWidth: '500px'
          }}>
            Orders, stock, customers and WhatsApp conversations — live, in one place.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ color: '#34d399' }}><CheckCircle size={20} /></div>
              <span style={{ fontSize: '0.98rem', color: '#e6f3ec', fontWeight: 500 }}>
                Connect your shop's WhatsApp Business Account in minutes
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ color: '#34d399' }}><CheckCircle size={20} /></div>
              <span style={{ fontSize: '0.98rem', color: '#e6f3ec', fontWeight: 500 }}>
                Live orders, table reservations & partial refund reviews
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ color: '#34d399' }}><CheckCircle size={20} /></div>
              <span style={{ fontSize: '0.98rem', color: '#e6f3ec', fontWeight: 500 }}>
                Customer chats, voice notes & AI concierge in one inbox
              </span>
            </div>
          </div>
        </div>

        <div style={{ fontSize: '0.85rem', color: '#8da498' }}>
          Secure access for store owners & staff
        </div>
      </div>

      {/* Right sign in form panel */}
      <div className="login-right-panel" style={{ position: 'relative' }}>
        <button
          onClick={toggleTheme}
          className="theme-toggle-btn"
          style={{ position: 'absolute', top: '24px', right: '32px' }}
        >
          {theme === 'light' ? <Sun size={15} color="#eab308" /> : <Moon size={15} color="#38bdf8" />}
        </button>

        <div style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-color)',
          borderRadius: '24px',
          padding: '40px 38px',
          width: '100%',
          maxWidth: '460px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05)'
        }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#059669', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>
            STORE PORTAL
          </div>

          <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>
            Village-Shop
          </h2>

          <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
            Sign in to manage your shop, orders, and WhatsApp inbox.
          </p>

          {/* Sign In / Merchant Sign Up Tabs */}
          <div style={{
            display: 'flex',
            backgroundColor: 'var(--bg-surface-secondary)',
            borderRadius: 'var(--radius-md)',
            padding: '4px',
            marginBottom: '24px',
            border: '1px solid var(--border-color)'
          }}>
            <button
              type="button"
              onClick={() => setActiveTab('signin')}
              style={{
                flex: 1,
                padding: '8px 12px',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                backgroundColor: activeTab === 'signin' ? 'var(--bg-surface)' : 'transparent',
                color: activeTab === 'signin' ? 'var(--text-primary)' : 'var(--text-muted)',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                boxShadow: activeTab === 'signin' ? 'var(--shadow-sm)' : 'none'
              }}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('signup')}
              style={{
                flex: 1,
                padding: '8px 12px',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                backgroundColor: activeTab === 'signup' ? 'var(--bg-surface)' : 'transparent',
                color: activeTab === 'signup' ? 'var(--text-primary)' : 'var(--text-muted)',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                boxShadow: activeTab === 'signup' ? 'var(--shadow-sm)' : 'none'
              }}
            >
              Merchant Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                required
                className="form-input"
                style={{
                  border: '1.5px solid #10b981',
                  boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.1)'
                }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group" style={{ marginTop: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="form-label">Password</label>
                <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Password reset link sent to registered email.'); }} style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textDecoration: 'none' }}>
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                required
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn-primary"
              style={{
                width: '100%',
                marginTop: '24px',
                padding: '13px',
                justifyContent: 'center',
                fontSize: '0.98rem',
                backgroundColor: '#103926',
                borderRadius: '12px'
              }}
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
