import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Phone, Video, MoreVertical, Check, CheckCheck, Sparkles, ShieldCheck, ShoppingCart, RefreshCw } from 'lucide-react';

export default function WhatsAppPhoneSimulator({ isOpen, onClose, onPlaceOrder }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'customer',
      text: 'Awright pal, can I get a 12-inch slice well-done and a can of ginger?',
      time: '18:42',
      status: 'read'
    },
    {
      id: 2,
      sender: 'ai',
      text: 'Aye right Akash! Great to hear from you again. Delivering to 12 Braehead as usual?',
      time: '18:42'
    },
    {
      id: 3,
      sender: 'ai',
      text: 'Got you sorted: 1x 12" Braehead Special Pizza (stone-charred well done, cut in 4) and 1x ice-cold Barr Irn-Bru ("ginger"). Total is £17.23.',
      time: '18:42'
    },
    {
      id: 4,
      sender: 'ai',
      isUpsell: true,
      text: '🔥 Silent Upsell: Fancy our house roasted Garlic & Herb dip for £1.00? Pairs proper mint with that crust.',
      time: '18:43'
    }
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!isOpen) return null;

  const handleSend = (textToSend) => {
    const text = textToSend || inputVal;
    if (!text.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'customer',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'delivered'
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      let replyText = "Spot on! That's logged in our kitchen. We'll have your stone oven pizza ready in 25 mins.";
      let isPayLink = false;

      const lower = text.toLowerCase();
      if (lower.includes('dip') || lower.includes('aye') || lower.includes('add')) {
        replyText = "Added the £1.00 Garlic & Herb dip! Your updated total is £18.23. Click below to pay with Apple Pay / Card:";
        isPayLink = true;
      } else if (lower.includes('vegan') || lower.includes('allergy')) {
        replyText = "⚠️ Dietary Guardian Alert: Our kitchen confirmed 100% plant-based sourdough crust. Salami swapped for organic vegan sausage.";
      } else if (lower.includes('track') || lower.includes('where') || lower.includes('eta')) {
        replyText = "Michael is on his Honda Scooter at Bridge Street traffic lights. Honest ETA: 6 mins away!";
      }

      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'ai',
          text: replyText,
          isPayLink: isPayLink,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
    }, 1200);
  };

  const loadScenario = (type) => {
    if (type === 'old_friend') {
      setMessages([
        { id: 1, sender: 'customer', text: 'Hi, can I order tonight?', time: '18:30', status: 'read' },
        { id: 2, sender: 'ai', text: 'Aye right Akash! Welcome back to The Braehead Slice. Delivering to 12 Braehead as usual?', time: '18:30' },
        { id: 3, sender: 'ai', text: 'Would you like your usual 12" Braehead Special Pizza or trying our new Tartufo White Truffle tonight?', time: '18:31' }
      ]);
    } else if (type === 'slang') {
      setMessages([
        { id: 1, sender: 'customer', text: 'Gimme two slices, extra crispy, and a bottle of swally.', time: '18:35', status: 'read' },
        { id: 2, sender: 'ai', text: 'Regional Dialect Translated: 2x Artisan Pizzas (well done stone-baked) + 1x Madri Excepcional Lager ("swally").', time: '18:35' },
        { id: 3, sender: 'ai', text: 'Note: Alcohol order requires 18+ ID check upon delivery (Council Compliance Logged). Total £32.50.', time: '18:36' }
      ]);
    } else if (type === 'dietary') {
      setMessages([
        { id: 1, sender: 'customer', text: 'Can I get vegan mozzarella on the Spicy Beef pizza?', time: '18:40', status: 'read' },
        { id: 2, sender: 'ai', text: '🛡️ Dietary Guardian Check: You requested vegan cheese, but Spicy Beef contains dairy seasoning and beef. Would you like our Roasted Portobello Mushroom alternative to keep it 100% vegan?', time: '18:40' }
      ]);
    }
  };

  return (
    <div className="modal-overlay" style={{ zIndex: 1100 }}>
      <div className="modal-content" style={{ maxWidth: '440px', padding: '0', borderRadius: '32px', overflow: 'hidden', border: '8px solid #1f2937' }}>
        {/* Phone Top Speaker & Camera Notch */}
        <div style={{
          background: '#075e54',
          padding: '10px 16px 8px',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: '#128c7e',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '1rem',
              border: '2px solid #ffffff'
            }}>
              🍕
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.92rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                The Braehead Slice
                <span style={{ color: '#25d366', fontSize: '0.85rem' }}>✓</span>
              </div>
              <div style={{ fontSize: '0.7rem', color: '#e0f2fe' }}>
                Official WhatsApp Business AI
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Video size={17} style={{ opacity: 0.8 }} />
            <Phone size={16} style={{ opacity: 0.8 }} />
            <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer', padding: '2px' }}>
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Demo Scenario Pills */}
        <div style={{
          background: '#128c7e',
          padding: '6px 12px',
          display: 'flex',
          gap: '6px',
          overflowX: 'auto',
          borderBottom: '1px solid rgba(0,0,0,0.1)'
        }}>
          <button
            type="button"
            onClick={() => loadScenario('old_friend')}
            style={{
              padding: '3px 8px',
              borderRadius: '9999px',
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              color: '#ffffff',
              fontSize: '0.68rem',
              fontWeight: 700,
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            Old Friend Protocol
          </button>
          <button
            type="button"
            onClick={() => loadScenario('slang')}
            style={{
              padding: '3px 8px',
              borderRadius: '9999px',
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              color: '#ffffff',
              fontSize: '0.68rem',
              fontWeight: 700,
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            Glasgow Slang RAG
          </button>
          <button
            type="button"
            onClick={() => loadScenario('dietary')}
            style={{
              padding: '3px 8px',
              borderRadius: '9999px',
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              color: '#ffffff',
              fontSize: '0.68rem',
              fontWeight: 700,
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            Dietary Guardian
          </button>
          <button
            type="button"
            onClick={async () => {
              if (onPlaceOrder) {
                await onPlaceOrder({
                  customerName: 'Sarah VIP (WhatsApp Direct)',
                  phone: '+44 7812 903411',
                  address: '42 Byres Road, Flat 3, Glasgow G11 5RG',
                  deliveryType: 'Delivery',
                  subtotal: 18.50,
                  deliveryFee: 2.50,
                  amount: 21.00,
                  driverName: 'Michael (Honda Scooter)',
                  items: [
                    {
                      name: '12" Tartufo White Truffle Pizza',
                      qty: 1,
                      unit_price: 18.50,
                      modifiers: { crust: 'sourdough', cut: '6-slices' }
                    }
                  ]
                });
              }
              setMessages(prev => [
                ...prev,
                {
                  id: Date.now() + 1,
                  sender: 'ai',
                  text: '⚡ Instant Order Placed via WhatsApp! Sent to live kitchen screen #105.',
                  time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                }
              ]);
            }}
            style={{
              padding: '3px 8px',
              borderRadius: '9999px',
              background: '#25d366',
              border: 'none',
              color: '#075e54',
              fontSize: '0.68rem',
              fontWeight: 800,
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            ⚡ Test Order To Kitchen
          </button>
        </div>

        {/* Chat Messages Body (WhatsApp Wallpaper Texture) */}
        <div style={{
          height: '380px',
          overflowY: 'auto',
          padding: '14px',
          background: '#efeae2',
          backgroundImage: 'radial-gradient(#d1d5db 1px, transparent 1px)',
          backgroundSize: '16px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          {/* Encryption Note */}
          <div style={{
            background: '#fff3cd',
            color: '#856404',
            fontSize: '0.64rem',
            textAlign: 'center',
            padding: '4px 8px',
            borderRadius: '6px',
            margin: '0 auto 6px',
            maxWidth: '85%'
          }}>
            🔒 Messages with The Braehead Slice are zero-commission direct orders powered by Village Voice AI.
          </div>

          {messages.map(m => (
            <div
              key={m.id}
              style={{
                alignSelf: m.sender === 'customer' ? 'flex-end' : 'flex-start',
                maxWidth: '82%',
                background: m.sender === 'customer' ? '#dcf8c6' : '#ffffff',
                color: '#111827',
                padding: '8px 12px',
                borderRadius: m.sender === 'customer' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                boxShadow: '0 1px 2px rgba(0,0,0,0.15)',
                fontSize: '0.8rem',
                position: 'relative'
              }}
            >
              <div>{m.text}</div>

              {/* Interactive Stripe Payment Card inside WhatsApp */}
              {m.isPayLink && (
                <div style={{
                  marginTop: '8px',
                  padding: '8px 10px',
                  borderRadius: '8px',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0'
                }}>
                  <div style={{ fontWeight: 800, fontSize: '0.82rem', color: '#0f172a' }}>
                    Stripe Secure 1-Click Checkout
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                    Total Amount: £18.23 • Zero commission
                  </div>
                  <button
                    type="button"
                    onClick={async () => {
                      if (onPlaceOrder) {
                        await onPlaceOrder({
                          customerName: 'Akash (WhatsApp VIP)',
                          phone: '+44 7700 900123',
                          address: '12 Braehead St, Glasgow G51 1XQ',
                          deliveryType: 'Delivery',
                          subtotal: 15.73,
                          deliveryFee: 2.50,
                          amount: 18.23,
                          driverName: 'Michael (Honda Scooter)',
                          items: [
                            {
                              name: '12" Braehead Special Pizza (Stone-charred)',
                              qty: 1,
                              unit_price: 14.50,
                              modifiers: { doneness: 'well-done', cut: '4-slices' }
                            },
                            {
                              name: 'Roasted Garlic & Herb Dip',
                              qty: 1,
                              unit_price: 1.00,
                              modifiers: { fresh: true }
                            },
                            {
                              name: 'Barr Irn-Bru Can (330ml)',
                              qty: 1,
                              unit_price: 2.73,
                              modifiers: { chilled: true }
                            }
                          ]
                        });
                      }
                      setMessages(prev => [
                        ...prev,
                        {
                          id: Date.now() + 2,
                          sender: 'ai',
                          text: '✅ Payment Received (£18.23)! Order sent straight to stone oven KDS kitchen display with zero commission (£5.47 saved vs Just Eat). Michael is assigned for delivery!',
                          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                        }
                      ]);
                    }}
                    style={{
                      marginTop: '6px',
                      width: '100%',
                      padding: '6px',
                      borderRadius: '6px',
                      border: 'none',
                      background: '#10b981',
                      color: '#ffffff',
                      fontWeight: 700,
                      fontSize: '0.75rem',
                      cursor: 'pointer'
                    }}
                  >
                    Pay with Apple Pay (£18.23)
                  </button>
                </div>
              )}

              <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                gap: '4px',
                fontSize: '0.62rem',
                color: '#9ca3af',
                marginTop: '4px'
              }}>
                <span>{m.time}</span>
                {m.sender === 'customer' && <CheckCheck size={12} color="#34b7f1" />}
              </div>
            </div>
          ))}

          {isTyping && (
            <div style={{
              alignSelf: 'flex-start',
              background: '#ffffff',
              padding: '6px 12px',
              borderRadius: '12px',
              fontSize: '0.72rem',
              color: '#6b7280',
              fontStyle: 'italic'
            }}>
              The Braehead Slice AI is typing...
            </div>
          )}
          <div ref={chatBottomRef} />
        </div>

        {/* WhatsApp Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          style={{
            background: '#f0f2f5',
            padding: '10px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type a message or order in slang..."
            style={{
              flex: 1,
              padding: '10px 14px',
              borderRadius: '24px',
              border: '1px solid #d1d5db',
              outline: 'none',
              fontSize: '0.84rem'
            }}
          />
          <button
            type="submit"
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: '#075e54',
              color: '#ffffff',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}

