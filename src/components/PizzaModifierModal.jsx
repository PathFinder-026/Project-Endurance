import React, { useState } from 'react';
import { X, Check, Sparkles, Copy, Slice, Flame, Scissors, ShieldAlert } from 'lucide-react';

export default function PizzaModifierModal({ isOpen, onClose, onAddCustomPizza }) {
  const [pizzaType, setPizzaType] = useState('half_and_half'); // 'whole' | 'half_and_half'
  const [size, setSize] = useState('12"');
  const [leftFlavor, setLeftFlavor] = useState('Pepperoni Piccante');
  const [rightFlavor, setRightFlavor] = useState('Classic Margherita');
  const [wholeFlavor, setWholeFlavor] = useState('The Braehead Special');
  const [crust, setCrust] = useState('Sourdough Classic');
  const [doneness, setDoneness] = useState('well_done'); // 'standard' | 'well_done' | 'light'
  const [cutStyle, setCutStyle] = useState('cut_in_4'); // 'cut_in_4' | 'cut_in_8' | 'uncut'
  const [extras, setExtras] = useState(['Extra Mozzarella', 'Hot Honey Drizzle']);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const basePrice = size === '10"' ? 11.50 : size === '12"' ? 14.50 : 18.50;
  const crustSurcharge = crust.includes('Stuffed') ? 2.50 : crust.includes('Gluten-Free') ? 2.00 : 0.00;
  const extrasCost = extras.length * 1.25;
  const totalPrice = (basePrice + crustSurcharge + extrasCost).toFixed(2);

  const flavorOptions = [
    { name: 'Classic Margherita', desc: 'San Marzano sauce, fior di latte, basil, EVOO', tag: 'Vegetarian' },
    { name: 'Pepperoni Piccante', desc: 'Smoked Napoli pepperoni, hot chili honey, mozzarella', tag: 'Bestseller' },
    { name: 'The Braehead Special', desc: 'Doner slices, chicken pakora, spicy onions, house relish', tag: 'Glasgow Iconic' },
    { name: 'Portobello & Truffle', desc: 'Wild mushrooms, garlic crema, thyme, truffle glaze', tag: 'Vegetarian' },
    { name: 'Spicy Calabrian Beef', desc: 'Minced spiced beef, roasted peppers, red onion', tag: 'Halal' },
    { name: 'Quattro Formaggi', desc: 'Mozzarella, gorgonzola, aged parmesan, ricotta', tag: 'Cheese Lovers' }
  ];

  const crustOptions = [
    { name: 'Sourdough Classic', extra: '£0.00', desc: '48-hour fermented slow dough' },
    { name: 'Garlic Butter Stuffed Crust', extra: '+£2.50', desc: 'Molten cheese sealed with roasted garlic' },
    { name: 'Italian Thin & Crispy', extra: '£0.00', desc: 'Ultra-thin Roman style crunch' },
    { name: 'Gluten-Free Artisan Base', extra: '+£2.00', desc: 'Dedicated clean baking tray' }
  ];

  const toggleExtra = (extraName) => {
    setExtras(prev => 
      prev.includes(extraName) ? prev.filter(e => e !== extraName) : [...prev, extraName]
    );
  };

  const structuredJson = {
    feature: "Feature 9 - Complex Modifier Engine",
    spec: "Half-and-half, well-done, cut in 4 structured JSON output",
    type: pizzaType,
    size: size,
    left_half: pizzaType === 'half_and_half' ? leftFlavor : wholeFlavor,
    right_half: pizzaType === 'half_and_half' ? rightFlavor : wholeFlavor,
    crust: crust,
    doneness: doneness,
    cut: cutStyle,
    additions: extras,
    calculated_price: `£${totalPrice}`,
    kitchen_tag: doneness === 'well_done' ? "STONE-CHARRED (WELL DONE)" : "STANDARD BAKE",
    cutting_instruction: cutStyle === 'cut_in_4' ? "GIANT 4-WAY CUT" : cutStyle === 'uncut' ? "DO NOT CUT (CRISP PRESERVE)" : "STANDARD 8-SLICE"
  };

  const handleCopyJson = () => {
    navigator.clipboard?.writeText(JSON.stringify(structuredJson, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleAdd = () => {
    const customItem = {
      id: `custom-pizza-${Date.now()}`,
      name: pizzaType === 'half_and_half' 
        ? `${size} Half ${leftFlavor} / Half ${rightFlavor}` 
        : `${size} ${wholeFlavor} (${crust})`,
      category: 'Pizzas',
      brand: 'The Braehead Slice',
      price: parseFloat(totalPrice),
      stock: 99,
      inStock: true,
      status: 'active',
      description: `Crust: ${crust} • Bake: ${doneness} • Cut: ${cutStyle.replace('_', ' ')} • Extras: ${extras.join(', ') || 'None'}`,
      isCustomSplit: true,
      structuredModifiers: structuredJson
    };

    if (onAddCustomPizza) {
      onAddCustomPizza(customItem);
    }
    onClose();
  };

  return (
    <div className="modal-overlay" style={{ zIndex: 1100 }}>
      <div className="modal-content" style={{ maxWidth: '820px', maxHeight: '90vh', overflowY: 'auto' }}>
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff'
            }}>
              <Slice size={20} />
            </div>
            <div>
              <h3 className="modal-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                Complex Pizza Modifier & Split Engine
                <span className="badge badge-amber" style={{ fontSize: '0.72rem' }}>Feature 9</span>
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Parses half-and-half, bake doneness, custom crusts and slice cuts into verified kitchen JSON.
              </p>
            </div>
          </div>
          <button onClick={onClose} className="close-btn">
            <X size={18} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '22px', marginTop: '16px' }}>
          {/* Left Column: Interactive Visual Configurator */}
          <div>
            {/* Split Mode Toggle */}
            <div style={{ marginBottom: '16px' }}>
              <label className="form-label">Pizza Configuration Mode</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setPizzaType('half_and_half')}
                  style={{
                    padding: '10px 14px',
                    borderRadius: '12px',
                    border: pizzaType === 'half_and_half' ? '2px solid #10b981' : '1px solid var(--border-color)',
                    background: pizzaType === 'half_and_half' ? 'rgba(16, 185, 129, 0.12)' : 'var(--bg-surface)',
                    color: pizzaType === 'half_and_half' ? '#047857' : 'var(--text-primary)',
                    fontWeight: 700,
                    fontSize: '0.86rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  <span>🌓 Half &amp; Half (Split)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPizzaType('whole')}
                  style={{
                    padding: '10px 14px',
                    borderRadius: '12px',
                    border: pizzaType === 'whole' ? '2px solid #10b981' : '1px solid var(--border-color)',
                    background: pizzaType === 'whole' ? 'rgba(16, 185, 129, 0.12)' : 'var(--bg-surface)',
                    color: pizzaType === 'whole' ? '#047857' : 'var(--text-primary)',
                    fontWeight: 700,
                    fontSize: '0.86rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  <span>🌕 Single Whole Pizza</span>
                </button>
              </div>
            </div>

            {/* Visual Pizza Graphic Representation */}
            <div style={{
              background: 'linear-gradient(145deg, var(--bg-surface-secondary), var(--bg-surface))',
              borderRadius: '16px',
              border: '1px solid var(--border-color)',
              padding: '18px',
              textAlign: 'center',
              marginBottom: '18px',
              boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.03)'
            }}>
              <div style={{
                position: 'relative',
                width: '160px',
                height: '160px',
                margin: '0 auto 12px',
                borderRadius: '50%',
                background: crust.includes('Stuffed') ? '#d97706' : '#b45309',
                boxShadow: '0 8px 24px rgba(217, 119, 6, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                border: '6px solid #fef3c7'
              }}>
                {pizzaType === 'half_and_half' ? (
                  <>
                    {/* Left Half */}
                    <div style={{
                      width: '50%',
                      height: '100%',
                      background: 'radial-gradient(circle, #ef4444 0%, #b91c1c 100%)',
                      borderRight: '2px dashed #ffffff',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '4px'
                    }}>
                      <span style={{ fontSize: '1.4rem' }}>🍕</span>
                      <span style={{ fontSize: '0.62rem', color: '#ffffff', fontWeight: 800, textTransform: 'uppercase' }}>
                        Left
                      </span>
                    </div>
                    {/* Right Half */}
                    <div style={{
                      width: '50%',
                      height: '100%',
                      background: 'radial-gradient(circle, #f59e0b 0%, #d97706 100%)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '4px'
                    }}>
                      <span style={{ fontSize: '1.4rem' }}>🧀</span>
                      <span style={{ fontSize: '0.62rem', color: '#ffffff', fontWeight: 800, textTransform: 'uppercase' }}>
                        Right
                      </span>
                    </div>
                  </>
                ) : (
                  <div style={{
                    width: '100%',
                    height: '100%',
                    background: 'radial-gradient(circle, #ef4444 0%, #991b1b 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <span style={{ fontSize: '2rem' }}>🍕</span>
                    <span style={{ fontSize: '0.7rem', color: '#ffffff', fontWeight: 800 }}>Whole 360°</span>
                  </div>
                )}

                {/* Doneness Overlay */}
                {doneness === 'well_done' && (
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(circle, rgba(0,0,0,0) 50%, rgba(69,26,3,0.45) 100%)',
                    pointerEvents: 'none'
                  }} />
                )}
              </div>

              <div style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {pizzaType === 'half_and_half' 
                  ? `[Left: ${leftFlavor}] ⟷ [Right: ${rightFlavor}]`
                  : wholeFlavor}
              </div>
              <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                {size} • {crust} • {doneness === 'well_done' ? 'Stone Charred 🔥' : 'Classic Bake'} • {cutStyle.replace('_', ' ')}
              </div>
            </div>

            {/* Flavor Selection */}
            {pizzaType === 'half_and_half' ? (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
                <div>
                  <label className="form-label" style={{ fontSize: '0.78rem' }}>Left Half Flavor</label>
                  <select
                    value={leftFlavor}
                    onChange={(e) => setLeftFlavor(e.target.value)}
                    className="form-input"
                    style={{ fontSize: '0.82rem', padding: '8px 10px' }}
                  >
                    {flavorOptions.map(f => (
                      <option key={`left-${f.name}`} value={f.name}>{f.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="form-label" style={{ fontSize: '0.78rem' }}>Right Half Flavor</label>
                  <select
                    value={rightFlavor}
                    onChange={(e) => setRightFlavor(e.target.value)}
                    className="form-input"
                    style={{ fontSize: '0.82rem', padding: '8px 10px' }}
                  >
                    {flavorOptions.map(f => (
                      <option key={`right-${f.name}`} value={f.name}>{f.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            ) : (
              <div style={{ marginBottom: '14px' }}>
                <label className="form-label">Pizza Recipe</label>
                <select
                  value={wholeFlavor}
                  onChange={(e) => setWholeFlavor(e.target.value)}
                  className="form-input"
                  style={{ fontSize: '0.85rem' }}
                >
                  {flavorOptions.map(f => (
                    <option key={`whole-${f.name}`} value={f.name}>{f.name} ({f.tag})</option>
                  ))}
                </select>
              </div>
            )}

            {/* Size & Crust */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
              <div>
                <label className="form-label">Diameter / Size</label>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {['10"', '12"', '16"'].map(s => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSize(s)}
                      style={{
                        flex: 1,
                        padding: '6px',
                        borderRadius: '8px',
                        border: size === s ? '2px solid #10b981' : '1px solid var(--border-color)',
                        background: size === s ? 'rgba(16, 185, 129, 0.15)' : 'var(--bg-surface)',
                        color: size === s ? '#047857' : 'var(--text-primary)',
                        fontWeight: 700,
                        fontSize: '0.8rem',
                        cursor: 'pointer'
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="form-label">Artisan Crust Type</label>
                <select
                  value={crust}
                  onChange={(e) => setCrust(e.target.value)}
                  className="form-input"
                  style={{ fontSize: '0.82rem', padding: '8px 10px' }}
                >
                  {crustOptions.map(c => (
                    <option key={c.name} value={c.name}>{c.name} ({c.extra})</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Doneness & Cut Style */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
              <div>
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Flame size={13} color="#f59e0b" /> Bake Doneness
                </label>
                <select
                  value={doneness}
                  onChange={(e) => setDoneness(e.target.value)}
                  className="form-input"
                  style={{ fontSize: '0.82rem', padding: '8px 10px' }}
                >
                  <option value="standard">Standard Italian Bake</option>
                  <option value="well_done">Well-Done (Charred &amp; Crispy)</option>
                  <option value="light">Lightly Baked (Softer Crust)</option>
                </select>
              </div>

              <div>
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Scissors size={13} color="#6366f1" /> Kitchen Slicing
                </label>
                <select
                  value={cutStyle}
                  onChange={(e) => setCutStyle(e.target.value)}
                  className="form-input"
                  style={{ fontSize: '0.82rem', padding: '8px 10px' }}
                >
                  <option value="cut_in_4">Cut in 4 (Giant Slices)</option>
                  <option value="cut_in_8">Cut in 8 (Standard)</option>
                  <option value="uncut">Uncut (Crisp Retention)</option>
                </select>
              </div>
            </div>

            {/* Extra High-Margin Addons */}
            <div>
              <label className="form-label">High-Margin Additions (+£1.25 each)</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {['Extra Mozzarella', 'Hot Honey Drizzle', 'Fresh Basil Leaves', 'Jalapeño Rings', 'Garlic Butter Dip'].map(opt => {
                  const isSelected = extras.includes(opt);
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => toggleExtra(opt)}
                      style={{
                        padding: '5px 12px',
                        borderRadius: '9999px',
                        border: isSelected ? '1px solid #10b981' : '1px solid var(--border-color)',
                        background: isSelected ? 'rgba(16, 185, 129, 0.12)' : 'var(--bg-surface)',
                        color: isSelected ? '#047857' : 'var(--text-muted)',
                        fontSize: '0.78rem',
                        fontWeight: isSelected ? 700 : 500,
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {isSelected ? '✓ ' : '+ '} {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Live Kitchen JSON & Order Dispatch */}
          <div style={{
            background: 'var(--bg-surface-secondary)',
            borderRadius: '16px',
            border: '1px solid var(--border-color)',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>
                  Structured Kitchen JSON
                </span>
                <button
                  type="button"
                  onClick={handleCopyJson}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: copied ? '#059669' : 'var(--text-muted)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <Copy size={13} /> {copied ? 'Copied!' : 'Copy JSON'}
                </button>
              </div>

              {/* JSON Visual Box */}
              <pre style={{
                background: '#090d16',
                color: '#34d399',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                lineHeight: 1.45,
                padding: '14px',
                borderRadius: '10px',
                overflowX: 'auto',
                maxHeight: '330px',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}>
                {JSON.stringify(structuredJson, null, 2)}
              </pre>

              {/* Price Calculation Pill */}
              <div style={{
                marginTop: '14px',
                padding: '12px 14px',
                borderRadius: '12px',
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <div style={{ fontSize: '0.74rem', color: '#047857', fontWeight: 600 }}>Total Calculated Price:</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#047857' }}>
                    £{totalPrice}
                  </div>
                </div>
                <div style={{ textAlign: 'right', fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                  <div>Base: £{basePrice.toFixed(2)}</div>
                  {crustSurcharge > 0 && <div>Crust: +£{crustSurcharge.toFixed(2)}</div>}
                  {extrasCost > 0 && <div>Extras: +£{extrasCost.toFixed(2)}</div>}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary"
                style={{ flex: 1, justifyContent: 'center' }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAdd}
                className="btn-primary"
                style={{ flex: 1.5, justifyContent: 'center' }}
              >
                <Check size={16} /> Add to Kitchen Dispatch
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

