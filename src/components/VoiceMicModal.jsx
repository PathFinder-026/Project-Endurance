import React, { useState, useEffect } from 'react';
import { Mic, X, Check } from 'lucide-react';

export default function VoiceMicModal({ isOpen, onClose, onExecuteVoiceCommand }) {
  const [listeningState, setListeningState] = useState('listening'); // 'listening' | 'recognized'
  const [recognizedCommand, setRecognizedCommand] = useState('');

  useEffect(() => {
    if (isOpen) {
      setListeningState('listening');
      setRecognizedCommand('');

      const commands = [
        "Bump oldest order in kitchen queue",
        "Check stock on Margherita Pizza",
        "Show local reservations for tonight",
        "Enable rain surge alert mode"
      ];
      const randomCmd = commands[Math.floor(Math.random() * commands.length)];

      const timer = setTimeout(() => {
        setRecognizedCommand(randomCmd);
        setListeningState('recognized');
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '440px', textAlign: 'center', padding: '32px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '-10px' }}>
          <button onClick={onClose} className="close-btn">
            <X size={18} />
          </button>
        </div>

        <div style={{
          width: '76px',
          height: '76px',
          margin: '0 auto 20px',
          borderRadius: '50%',
          backgroundColor: listeningState === 'listening' ? '#ecfdf5' : '#dcfce7',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px solid #10b981',
          boxShadow: '0 0 20px rgba(16, 185, 129, 0.3)',
          animation: listeningState === 'listening' ? 'pulse 1.5s infinite' : 'none'
        }}>
          <Mic size={36} color="#059669" />
        </div>

        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '8px' }}>
          {listeningState === 'listening' ? 'Listening for Command...' : 'Voice Command Captured'}
        </h3>

        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
          {listeningState === 'listening'
            ? 'Speak clearly into your microphone. e.g. "Bump order 1" or "Check stock".'
            : `"${recognizedCommand}"`}
        </p>

        {listeningState === 'recognized' && (
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button
              onClick={() => {
                onExecuteVoiceCommand(recognizedCommand);
                onClose();
              }}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <Check size={16} /> Execute Command
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
