import React, { useState } from 'react';
import {
  Bot,
  Sparkles,
  BookOpen,
  Languages,
  Check,
  CheckCircle2,
  FileText
} from 'lucide-react';

export default function AiAssistantDialect({ onNavigateToCompliance }) {
  const [activeTab, setActiveTab] = useState('prompt'); // 'prompt' | 'faq' | 'slang'
  const [botName, setBotName] = useState('Slice (My Test Company)');
  const [escalationPhone, setEscalationPhone] = useState('+44 7777 154301');
  const [greeting, setGreeting] = useState("Aye right! Welcome to The Braehead Slice. What can we get on the stone oven for you today?");
  const [savedStatus, setSavedStatus] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSavedStatus(true);
    setTimeout(() => setSavedStatus(false), 3000);
  };

  const handleLoadPrompt = () => {
    setBotName('The Braehead Slice AI Concierge');
    setGreeting("Welcome to The Braehead Slice! Artisan Glasgow sourdough pizzas and charcoal kebabs, delivered fresh.");
    alert('"The Braehead Slice" master system prompt loaded successfully!');
  };

  return (
    <div className="page-container">
      {/* Page Header */}
      <div className="page-header-row">
        <div className="page-title-group">
          <h1 className="page-title">AI Assistant, FAQs & Regional Dialect</h1>
          <div className="page-subtitle">
            Configure the WhatsApp AI assistant, shop FAQs, and local dialect dictionary for My Test Company.
          </div>
        </div>

        <div className="page-header-actions">
          <button
            onClick={handleLoadPrompt}
            className="btn-secondary"
          >
            <Sparkles size={15} color="#059669" /> Load "The Braehead Slice" Master Prompt
          </button>
          <button
            onClick={onNavigateToCompliance}
            className="btn-secondary"
          >
            <FileText size={15} /> Compliance & Age Refusal Logs
          </button>
        </div>
      </div>

      {savedStatus && (
        <div className="notice-card green-theme" style={{ marginBottom: '20px' }}>
          <CheckCircle2 size={18} color="#059669" />
          <span>AI configuration and dialect rules synced with live WhatsApp Cloud API bot runtime!</span>
        </div>
      )}

      {/* Sub Tabs */}
      <div className="tab-pill-bar">
        <button
          onClick={() => setActiveTab('prompt')}
          className={`tab-pill ${activeTab === 'prompt' ? 'active' : ''}`}
        >
          <Bot size={14} style={{ display: 'inline', marginRight: '4px' }} /> Master System Prompt & Zero-Friction Onboarding
        </button>
        <button
          onClick={() => setActiveTab('faq')}
          className={`tab-pill ${activeTab === 'faq' ? 'active' : ''}`}
        >
          <BookOpen size={14} style={{ display: 'inline', marginRight: '4px' }} /> Strict FAQ Knowledge Base & Shop Policies (9)
        </button>
        <button
          onClick={() => setActiveTab('slang')}
          className={`tab-pill ${activeTab === 'slang' ? 'active' : ''}`}
        >
          <Languages size={14} style={{ display: 'inline', marginRight: '4px' }} /> Regional Slang & Dialect Dictionary
        </button>
      </div>

      {/* TAB 1: Master System Prompt */}
      {activeTab === 'prompt' && (
        <div className="data-table-card" style={{ padding: '32px', maxWidth: '840px' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '20px' }}>
            Identity & messaging
          </h3>

          <form onSubmit={handleSave}>
            <div className="form-group">
              <label className="form-label">Bot display name</label>
              <input
                type="text"
                className="form-input"
                value={botName}
                onChange={(e) => setBotName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Human escalation phone (Staff / Manager WhatsApp)</label>
              <input
                type="text"
                className="form-input"
                value={escalationPhone}
                onChange={(e) => setEscalationPhone(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Welcome greeting message</label>
              <textarea
                className="form-textarea"
                rows={3}
                value={greeting}
                onChange={(e) => setGreeting(e.target.value)}
              />
            </div>

            <div style={{ marginTop: '24px' }}>
              <button
                type="submit"
                className="btn-primary"
                style={{ backgroundColor: '#10b981', color: 'white', padding: '10px 22px' }}
              >
                Save bot settings
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 2: Strict FAQ Knowledge Base */}
      {activeTab === 'faq' && (
        <div className="data-table-card" style={{ padding: '28px' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '14px' }}>
            Strict FAQ Policies (Zero-Hallucination Guardrails)
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { q: 'Halal Certification', a: 'All chicken and beef smash patties are 100% HMC certified Halal. Sliced and grilled separately.' },
              { q: 'Gluten-Free Crust Options', a: '12" gluten-free bases available upon request (+£2.00). Baked on dedicated sterile trays.' },
              { q: 'Age-Restricted Items (18+ Challenge 25)', a: 'Craft cider and alcoholic beverages require automated photo ID verification prior to dispatch.' },
              { q: 'Delivery Radius & Fees', a: 'Free delivery within 3 miles for orders over £15. £2.50 fee for extended 3-5 mile perimeter.' }
            ].map((f, i) => (
              <div key={i} style={{ padding: '16px', borderRadius: '10px', backgroundColor: 'var(--bg-surface-secondary)', border: '1px solid var(--border-color)' }}>
                <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>{f.q}</div>
                <div style={{ fontSize: '0.86rem', color: 'var(--text-secondary)' }}>{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Dialect Dictionary */}
      {activeTab === 'slang' && (
        <div className="data-table-card" style={{ padding: '28px' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '14px' }}>
            Regional Dialect & Slang Recognition (Scottish / Glasgow)
          </h3>
          <table className="data-table">
            <thead>
              <tr>
                <th>Customer Dialect Term</th>
                <th>Understood Intent by AI Concierge</th>
                <th>Automatic Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>"Scran" / "Piece"</strong></td>
                <td>Food / Sandwich / Quick takeaway</td>
                <td>Presents Pizza & Kebab lunch menu</td>
              </tr>
              <tr>
                <td><strong>"Chippy sauce"</strong></td>
                <td>Brown vinegar salt sauce</td>
                <td>Appends free traditional condiment note</td>
              </tr>
              <tr>
                <td><strong>"Ginger"</strong></td>
                <td>Carbonated soft drinks (Iron Bru, etc.)</td>
                <td>Suggests drinks catalogue</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
