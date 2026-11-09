import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  Send, 
  X, 
  Sparkles, 
  CheckCircle2, 
  History, 
  Mic, 
  MicOff, 
  ArrowLeft, 
  Trash2,
  Clock,
  ChevronRight,
  Volume2,
  VolumeX
} from 'lucide-react';
import ParticleSphere from './ParticleSphere';

export default function JarvisCopilot({ isOpen, onClose, orders = [], products = [], onBumpOrder }) {
  // Temporary interaction state (ephemeral)
  const [currentInteraction, setCurrentInteraction] = useState(null);
  const [inputText, setInputText] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  // Persistent conversation history (viewable only in history panel)
  const [conversationHistory, setConversationHistory] = useState([
    {
      id: 1,
      userText: "System Initialization",
      aiResponse: "Jarvis 3D Synapse connected to live kitchen queue, WhatsApp bot, and inventory database.",
      timestamp: "Today, 14:30"
    }
  ]);

  const autoDismissTimerRef = useRef(null);
  const speechUtteranceRef = useRef(null);

  const quickPrompts = [
    "What's in the kitchen queue right now?",
    "Forecast stock for tonight's rain alert",
    "Show active customer loyalty streaks",
    "Draft a WhatsApp marketing broadcast",
    "Check daily revenue vs £1,500 target",
    "Advance oldest pending kitchen order",
    "Check table occupancy on floor plan"
  ];

  // Auto-dismiss temporary interaction after idle reading time
  const resetAutoDismiss = () => {
    if (autoDismissTimerRef.current) {
      clearTimeout(autoDismissTimerRef.current);
      autoDismissTimerRef.current = null;
    }
  };

  const scheduleAutoDismiss = () => {
    resetAutoDismiss();
    autoDismissTimerRef.current = setTimeout(() => {
      setCurrentInteraction(null);
      stopSpeaking();
    }, 20000); // 20s provides ample time to listen to speech and read
  };

  const stopSpeaking = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  const speakText = (text) => {
    if (isMuted || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();

      // Clean speech text for natural human AI pronunciation
      const cleanText = text
        .replace(/#([a-f0-9]+)/gi, 'order $1')
        .replace(/£([0-9.]+)/g, '$1 pounds');

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'en-GB';
      utterance.rate = 1.05;
      utterance.pitch = 1.0;

      // Select UK British accent voice if available in the browser
      const voices = window.speechSynthesis.getVoices();
      const ukVoice = voices.find(v => 
        (v.lang.includes('en-GB') || v.lang.includes('en_GB')) && 
        (v.name.includes('UK') || v.name.includes('British') || v.name.includes('George') || v.name.includes('Oliver') || v.name.includes('Male'))
      ) || voices.find(v => v.lang.includes('en-GB') || v.lang.includes('en_GB')) || voices.find(v => v.lang.startsWith('en'));

      if (ukVoice) {
        utterance.voice = ukVoice;
      }

      utterance.onstart = () => {
        setIsSpeaking(true);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
      };

      utterance.onerror = () => {
        setIsSpeaking(false);
      };

      speechUtteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    } catch {
      setIsSpeaking(false);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = () => {
        // pre-load voices
        window.speechSynthesis.getVoices();
      };
    }
    return () => {
      resetAutoDismiss();
      stopSpeaking();
    };
  }, []);

  const handleSend = (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    resetAutoDismiss();
    stopSpeaking();
    const query = text.trim();
    setInputText('');

    // Check if user asked to see previous history
    const lowerQuery = query.toLowerCase();
    if (
      lowerQuery.includes('history') || 
      lowerQuery.includes('previous conversation') || 
      lowerQuery.includes('past chat')
    ) {
      setShowHistory(true);
      return;
    }

    // Set temporary user message bubble immediately
    setCurrentInteraction({
      userText: query,
      aiResponse: '',
      isActionable: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    setIsThinking(true);

    setTimeout(() => {
      let reply = "I've analyzed your live telemetry. All systems and WhatsApp webhooks are responding normally.";
      let isActionable = false;

      if (lowerQuery.includes('kitchen') || lowerQuery.includes('queue') || lowerQuery.includes('orders')) {
        const pendingCount = orders.filter(o => o.stage === 'pending').length;
        const oldestId = orders[0]?.id;
        const oldestCustomer = orders[0]?.customer || 'Akash Brahmbhatt';
        const oldestAmount = orders[0]?.amount || '39.96';
        reply = `You currently have ${pendingCount} orders in prep (${orders.map(o => `#${o.id}`).join(', ')}). The oldest order is #${oldestId} for ${oldestCustomer} (£${oldestAmount}). Would you like me to advance it?`;
        isActionable = Boolean(oldestId);
      } else if (lowerQuery.includes('stock') || lowerQuery.includes('rain') || lowerQuery.includes('forecast')) {
        reply = "Weather radar indicates Glasgow rain starting around 7:30 PM (+22% delivery surge expected). Sourdough pizza bases are currently at 63 units, which is well above the 10-unit reorder threshold. Supplier 9:00 PM auto-order is clear.";
      } else if (lowerQuery.includes('loyalty') || lowerQuery.includes('streak') || lowerQuery.includes('customer')) {
        reply = "Akash Brahmbhatt currently has a 4-week Golden Flame loyalty streak with 8 total orders (£168.45 spend). He is eligible for priority kitchen delivery.";
      } else if (lowerQuery.includes('marketing') || lowerQuery.includes('whatsapp') || lowerQuery.includes('broadcast')) {
        reply = "Recommended template: 'storm_prep_alert' (Approved). You have 3 consented subscribers ready to receive promotional alerts with 0 opt-outs today.";
      } else if (lowerQuery.includes('revenue') || lowerQuery.includes('target')) {
        reply = "Today's gross revenue is currently £1,280.00 against your £1,500 daily target (85.3% achieved). Evening dinner rush is forecasted to add £420-£580.";
      } else if (lowerQuery.includes('advance') || lowerQuery.includes('bump')) {
        const oldestId = orders[0]?.id;
        reply = oldestId 
          ? `Order #${oldestId} for ${orders[0]?.customer || 'Akash Brahmbhatt'} has been bumped to priority. Would you like me to advance it to Ready stage?` 
          : "There are currently no active orders in the prep queue.";
        isActionable = Boolean(oldestId);
      } else if (lowerQuery.includes('table') || lowerQuery.includes('occupancy') || lowerQuery.includes('floor')) {
        reply = "Current floor occupancy: 4 of 6 tables seated (66% capacity). VIP Booth 1 is reserved for 8:00 PM.";
      }

      const completedInteraction = {
        userText: query,
        aiResponse: reply,
        isActionable,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setCurrentInteraction(completedInteraction);
      setIsThinking(false);

      // Save to conversation history for the separate history panel
      setConversationHistory(prev => [
        {
          id: Date.now(),
          userText: query,
          aiResponse: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        },
        ...prev
      ]);

      // Speak the response in UK voice & pulse the orb dynamically
      speakText(reply);

      // Schedule auto-dismiss to return to idle orb state
      scheduleAutoDismiss();
    }, 650);
  };

  // Voice command toggle with Web Speech API or smart simulated fallback
  const handleToggleVoice = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-GB';

        recognition.onstart = () => {
          setIsListening(true);
        };

        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setIsListening(false);
          handleSend(transcript);
        };

        recognition.onerror = () => {
          setIsListening(false);
          runSimulatedVoice();
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognition.start();
        return;
      } catch {
        runSimulatedVoice();
      }
    } else {
      runSimulatedVoice();
    }
  };

  const runSimulatedVoice = () => {
    setIsListening(true);
    const voiceCommands = [
      "What's in the kitchen queue right now?",
      "Forecast stock for tonight's rain alert",
      "Show active customer loyalty streaks",
      "Draft a WhatsApp marketing broadcast"
    ];
    const picked = voiceCommands[Math.floor(Math.random() * voiceCommands.length)];

    setTimeout(() => {
      setIsListening(false);
      handleSend(picked);
    }, 1800);
  };

  const handleDismissInteraction = () => {
    resetAutoDismiss();
    stopSpeaking();
    setCurrentInteraction(null);
  };

  const handleClearHistory = () => {
    setConversationHistory([]);
  };

  const handleCloseAssistant = () => {
    stopSpeaking();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" style={{ justifyContent: 'flex-end', padding: '0 24px 24px 0' }}>
      <div
        className="modal-content"
        style={{
          width: '430px',
          height: '715px',
          maxHeight: '94vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--glass-depth-floating)',
          border: '1px solid var(--border-color)',
          borderRadius: '28px',
          padding: '22px',
          background: 'var(--bg-surface)',
          backdropFilter: 'blur(36px) saturate(190%)',
          WebkitBackdropFilter: 'blur(36px) saturate(190%)',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        {/* Top Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: '14px',
            borderBottom: '1px solid var(--border-color)',
            flexShrink: 0
          }}
        >
          {showHistory ? (
            <button
              onClick={() => setShowHistory(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'var(--bg-surface-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: '12px',
                padding: '6px 12px',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                fontSize: '0.82rem',
                fontWeight: 600,
                transition: 'all 0.15s ease'
              }}
            >
              <ArrowLeft size={15} />
              <span>Back to Assistant</span>
            </button>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  boxShadow: '0 4px 14px rgba(16, 185, 129, 0.35)',
                  border: '1px solid rgba(255, 255, 255, 0.4)',
                  flexShrink: 0
                }}
              >
                <Bot size={20} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.98rem', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-primary)' }}>
                  Jarvis Co-Pilot
                  <CheckCircle2 size={14} color="#059669" />
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: isSpeaking ? '#f59e0b' : '#10b981', display: 'inline-block', boxShadow: isSpeaking ? '0 0 10px #f59e0b' : '0 0 8px #10b981' }} />
                  {isSpeaking ? "Speaking Audio Response..." : "Apex AI Store Assistant"}
                </div>
              </div>
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {/* Audio Voice Output Mute / Unmute Toggle */}
            <button
              onClick={() => {
                if (isSpeaking) {
                  stopSpeaking();
                }
                setIsMuted(!isMuted);
              }}
              title={isMuted ? "Enable Voice Reading" : (isSpeaking ? "Mute Speaking Voice" : "Voice Output Active")}
              style={{
                position: 'relative',
                background: isSpeaking ? 'rgba(245, 158, 11, 0.15)' : 'var(--bg-surface-secondary)',
                border: isSpeaking ? '1px solid #f59e0b' : '1px solid var(--border-color)',
                borderRadius: '10px',
                color: isMuted ? 'var(--text-light)' : (isSpeaking ? '#b45309' : 'var(--text-secondary)'),
                cursor: 'pointer',
                padding: '7px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.15s ease',
                boxShadow: isSpeaking ? '0 0 12px rgba(245, 158, 11, 0.3)' : 'none'
              }}
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>

            {/* History Toggle Button */}
            {!showHistory && (
              <button
                onClick={() => setShowHistory(true)}
                title="View Conversation History"
                style={{
                  position: 'relative',
                  background: 'var(--bg-surface-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '10px',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  padding: '7px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.15s ease'
                }}
              >
                <History size={16} />
                {conversationHistory.length > 0 && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '-3px',
                      right: '-3px',
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: '#f59e0b',
                      boxShadow: '0 0 8px #f59e0b'
                    }}
                  />
                )}
              </button>
            )}

            {/* Close Button */}
            <button
              onClick={handleCloseAssistant}
              style={{
                background: 'var(--bg-surface-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: '10px',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                padding: '7px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.15s ease'
              }}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* =============================================================== */}
        {/* CASE A: HISTORY VIEW (Separate scrollable card, non-permanent)  */}
        {/* =============================================================== */}
        {showHistory ? (
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              marginTop: '14px',
              overflow: 'hidden'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Clock size={14} />
                <span>Saved Conversations ({conversationHistory.length})</span>
              </div>
              {conversationHistory.length > 0 && (
                <button
                  onClick={handleClearHistory}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'rgba(255, 255, 255, 0.45)',
                    cursor: 'pointer',
                    fontSize: '0.74rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '4px 8px',
                    borderRadius: '6px'
                  }}
                  title="Clear all conversation logs"
                >
                  <Trash2 size={13} />
                  <span>Clear</span>
                </button>
              )}
            </div>

            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                paddingRight: '6px'
              }}
            >
              {conversationHistory.length === 0 ? (
                <div style={{ textAlign: 'center', color: 'rgba(255, 255, 255, 0.45)', marginTop: '40px', fontSize: '0.84rem' }}>
                  No recent conversation logs found.
                </div>
              ) : (
                conversationHistory.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      background: 'var(--bg-surface-secondary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '16px',
                      padding: '12px 14px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.7rem', color: '#b45309', fontWeight: 600 }}>{item.timestamp}</span>
                      <span style={{ fontSize: '0.68rem', color: 'var(--text-light)' }}>Q&A Pair</span>
                    </div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                      "{item.userText}"
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.45, borderLeft: '2px solid rgba(245, 158, 11, 0.5)', paddingLeft: '8px' }}>
                      {item.aiResponse}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ) : (
          /* =============================================================== */
          /* CASE B: MAIN HUD (Preserved Orb Centered + Ephemeral Responses) */
          /* =============================================================== */
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              overflow: 'hidden',
              padding: '6px 0'
            }}
          >
            {/* 1. Preserved Jarvis Orb - Dynamically breathes/pulses bigger and smaller during speech */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: 'auto 0',
                flexShrink: 0
              }}
            >
              {/* Untouched 3D Glitch Particle Sphere Orb - Constant Large Size Throughout All States */}
              <ParticleSphere
                width={390}
                height={370}
                isThinking={isThinking}
                isSpeaking={isSpeaking}
                interactive={true}
                baseRadius={145}
                numParticles={1600}
                colorScheme="green"
              />
            </div>

            {/* 2. Ephemeral Interaction (Temporary message & response) - ONLY shown when active */}
            {currentInteraction && (
              <div
                style={{
                  width: '100%',
                  marginTop: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  animation: 'fadeIn 0.25s ease forwards',
                  maxHeight: '175px',
                  overflowY: 'auto',
                  paddingRight: '4px'
                }}
              >
                {/* Temporary User Prompt Capsule - High contrast Apple Light Glass */}
                <div
                  style={{
                    alignSelf: 'flex-end',
                    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(5, 150, 105, 0.18) 100%)',
                    border: '1px solid rgba(16, 185, 129, 0.35)',
                    borderRadius: '18px 18px 4px 18px',
                    padding: '9px 15px',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    color: '#064e3b',
                    maxWidth: '85%',
                    boxShadow: '0 4px 14px rgba(16, 185, 129, 0.10)'
                  }}
                >
                  {currentInteraction.userText}
                </div>

                {/* Temporary Jarvis Response Card */}
                <div
                  style={{
                    background: 'var(--bg-surface-secondary)',
                    backdropFilter: 'blur(20px)',
                    border: isSpeaking ? '1px solid rgba(245, 158, 11, 0.5)' : '1px solid var(--border-color)',
                    borderRadius: '16px 16px 16px 2px',
                    padding: '12px 14px',
                    fontSize: '0.82rem',
                    color: 'var(--text-primary)',
                    lineHeight: 1.5,
                    boxShadow: isSpeaking ? '0 8px 24px rgba(245, 158, 11, 0.15)' : '0 8px 24px rgba(15, 23, 42, 0.06)',
                    position: 'relative',
                    transition: 'border-color 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '0.7rem', color: '#b45309', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <Sparkles size={12} />
                      Jarvis Synapse
                      {isSpeaking && (
                        <span style={{ color: '#047857', display: 'inline-flex', alignItems: 'center', gap: '4px', marginLeft: '6px', fontSize: '0.68rem', fontWeight: 600 }}>
                          <Volume2 size={12} />
                          Speaking...
                        </span>
                      )}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {currentInteraction.aiResponse && (
                        <button
                          onClick={() => {
                            if (isSpeaking) {
                              stopSpeaking();
                            } else {
                              speakText(currentInteraction.aiResponse);
                            }
                          }}
                          title={isSpeaking ? "Pause speech" : "Replay voice reading"}
                          style={{
                            background: 'var(--bg-surface-secondary)',
                            border: '1px solid var(--border-color)',
                            color: isSpeaking ? '#b45309' : 'var(--text-secondary)',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            padding: '2px 6px',
                            fontSize: '0.68rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '3px'
                          }}
                        >
                          <Volume2 size={11} />
                          <span>{isSpeaking ? "Stop Voice" : "Replay"}</span>
                        </button>
                      )}
                      <button
                        onClick={handleDismissInteraction}
                        title="Dismiss to idle state"
                        style={{
                          background: 'var(--bg-surface-secondary)',
                          border: '1px solid var(--border-color)',
                          color: 'var(--text-muted)',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          padding: '2px 6px',
                          fontSize: '0.68rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '3px'
                        }}
                      >
                        <X size={11} />
                        <span>Dismiss</span>
                      </button>
                    </div>
                  </div>

                  {isThinking ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#b45309', padding: '6px 0' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#f59e0b', animation: 'pulse 1s infinite' }} />
                      <span>Processing live shop intelligence...</span>
                    </div>
                  ) : (
                    <>
                      <div style={{ color: 'var(--text-secondary)' }}>
                        {currentInteraction.aiResponse}
                      </div>

                      {currentInteraction.isActionable && orders.length > 0 && (
                        <div style={{ marginTop: '10px', paddingTop: '8px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                          <button
                            onClick={() => {
                              if (onBumpOrder && orders[0]?.id) {
                                onBumpOrder(orders[0].id);
                                handleDismissInteraction();
                              }
                            }}
                            style={{
                              background: 'linear-gradient(135deg, #10b981, #059669)',
                              color: '#ffffff',
                              border: 'none',
                              borderRadius: '10px',
                              padding: '6px 14px',
                              fontSize: '0.76rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.35)'
                            }}
                          >
                            <span>Advance Order #{orders[0]?.id}</span>
                            <ChevronRight size={13} />
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}

            {/* 3. Horizontal Scrollable Quick Chat Chips (Scrolls horizontally when overflowing) */}
            <div
              className="horizontal-chat-chips"
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                overflowX: 'auto',
                overflowY: 'hidden',
                padding: '4px 2px 6px 2px',
                marginTop: currentInteraction ? '8px' : 'auto',
                marginBottom: '8px',
                flexShrink: 0,
                WebkitOverflowScrolling: 'touch',
                scrollbarWidth: 'thin'
              }}
            >
              {quickPrompts.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSend(p)}
                  style={{
                    background: 'var(--bg-surface-secondary)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '9999px',
                    padding: '6px 14px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: 'var(--text-secondary)',
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    flexShrink: 0,
                    boxShadow: 'var(--shadow-sm)',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#10b981';
                    e.currentTarget.style.color = '#059669';
                    e.currentTarget.style.boxShadow = '0 4px 14px rgba(16, 185, 129, 0.2)';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                    e.currentTarget.style.color = 'var(--text-secondary)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <Sparkles size={12} color="#059669" style={{ flexShrink: 0 }} />
                  <span>{p}</span>
                </button>
              ))}
            </div>

            {/* 4. Floating Rounded Input Bar with Voice Mic & Send */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              style={{
                width: '100%',
                marginTop: '0',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'var(--bg-surface-secondary)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid var(--border-color)',
                borderRadius: '9999px',
                padding: '6px 8px 6px 14px',
                boxShadow: isListening 
                  ? '0 0 20px rgba(245, 158, 11, 0.35)'
                  : 'var(--glass-depth-floating)',
                transition: 'all 0.2s ease',
                flexShrink: 0
              }}
            >
              <input
                type="text"
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-primary)',
                  fontSize: '0.84rem',
                  outline: 'none',
                  padding: '6px 0'
                }}
                placeholder={isListening ? "Listening to voice command..." : "Ask Jarvis anything about shop ops..."}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />

              {/* Voice Mic Button */}
              <button
                type="button"
                onClick={handleToggleVoice}
                title={isListening ? "Stop Listening" : "Voice command"}
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  border: isListening ? '1px solid #f59e0b' : '1px solid var(--border-color)',
                  background: isListening 
                    ? 'rgba(245, 158, 11, 0.15)'
                    : 'var(--bg-surface-secondary)',
                  color: isListening ? '#f59e0b' : '#059669',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  flexShrink: 0,
                  boxShadow: isListening ? '0 0 12px rgba(245, 158, 11, 0.3)' : 'none'
                }}
              >
                {isListening ? <MicOff size={16} /> : <Mic size={16} />}
              </button>

              {/* Send Button */}
              <button
                type="submit"
                disabled={!inputText.trim()}
                title="Send query"
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  border: 'none',
                  background: inputText.trim() 
                    ? 'linear-gradient(135deg, #10b981, #059669)' 
                    : 'var(--bg-surface-secondary)',
                  color: inputText.trim() ? '#ffffff' : 'var(--text-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: inputText.trim() ? 'pointer' : 'default',
                  transition: 'all 0.15s ease',
                  flexShrink: 0,
                  boxShadow: inputText.trim() ? '0 4px 14px rgba(16, 185, 129, 0.35)' : 'none'
                }}
              >
                <Send size={15} />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

