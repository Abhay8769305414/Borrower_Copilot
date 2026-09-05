import React from 'react';
import { NegotiationCardData, BorrowerInput } from '../engine/rules';
import { X, Smartphone, Shield, Download, Check, AlertCircle, Quote } from 'lucide-react';

interface NegotiationCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  cardData: NegotiationCardData;
  input: BorrowerInput;
}

export const NegotiationCardModal: React.FC<NegotiationCardModalProps> = ({
  isOpen,
  onClose,
  cardData,
  input
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="animate-fade-in"
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: 440,
          background: '#0d131f',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: 28,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 35px rgba(59, 130, 246, 0.25)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '92vh'
        }}
      >
        {/* Mobile Mockup Header */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(255, 255, 255, 0.03)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Smartphone size={18} color="#60a5fa" />
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>
              Borrower Negotiation Card
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="badge badge-emerald" style={{ fontSize: '0.68rem' }}>
              Mobile View Ready
            </span>
            <button
              onClick={onClose}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                borderRadius: '50%',
                width: 28,
                height: 28,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff'
              }}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Scrollable Mobile Card Content */}
        <div style={{ padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Card Hero */}
          <div style={{
            background: 'linear-gradient(135deg, #1e3a8a, #1e293b)',
            borderRadius: 'var(--radius-lg)',
            padding: '18px',
            border: '1px solid rgba(96, 165, 250, 0.3)',
            boxShadow: '0 4px 20px rgba(30, 58, 138, 0.4)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
              <div>
                <div style={{ fontSize: '0.72rem', color: '#93c5fd', textTransform: 'uppercase', fontWeight: 600 }}>
                  Borrower Advocate Sheet
                </div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff' }}>
                  {cardData.borrowerName}
                </div>
              </div>
              <span className="badge badge-blue">
                CIBIL {input.creditScoreNum || '780'}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 12, paddingTop: 12, borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <div>
                <div style={{ fontSize: '0.68rem', color: '#93c5fd', textTransform: 'uppercase' }}>
                  Anchor Benchmark
                </div>
                <div className="font-mono" style={{ fontSize: '1.25rem', fontWeight: 800, color: '#34d399' }}>
                  {cardData.anchorRate}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.68rem', color: '#fca5a5', textTransform: 'uppercase' }}>
                  Walk-Away Rate
                </div>
                <div className="font-mono" style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f87171' }}>
                  {cardData.walkAwayRate}
                </div>
              </div>
            </div>

            <div style={{ marginTop: 10, fontSize: '0.75rem', color: '#cbd5e1' }}>
              Fair Processing Fee: <strong>{cardData.fairProcessingFee}</strong>
            </div>
          </div>

          {/* Verbatim Counter-Scripts */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Branch Counter-Scripts (Word-for-Word)
            </div>

            {cardData.scripts.map((item, idx) => (
              <div 
                key={idx}
                style={{
                  background: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '12px 14px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                  <Quote size={14} color="#60a5fa" />
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#ffffff' }}>
                    {item.title}
                  </span>
                </div>
                
                <div style={{ fontSize: '0.72rem', color: '#fbbf24', marginBottom: 8, fontStyle: 'italic' }}>
                  Trigger: {item.trigger}
                </div>

                <div style={{
                  background: 'rgba(0, 0, 0, 0.25)',
                  padding: '8px 10px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.8rem',
                  color: '#e2e8f0',
                  lineHeight: 1.45,
                  borderLeft: '3px solid #3b82f6'
                }}>
                  {item.verbatimCounterScript}
                </div>
              </div>
            ))}
          </div>

          {/* RBI Protection Notice */}
          <div style={{
            background: 'rgba(59, 130, 246, 0.08)',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            borderRadius: 'var(--radius-md)',
            padding: '10px 12px',
            fontSize: '0.72rem',
            color: '#93c5fd',
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}>
            <Shield size={16} style={{ flexShrink: 0 }} />
            <span>
              <strong>RBI Fair Practices Code:</strong> Lenders must disclose Key Fact Statement (KFS) containing true APR and cannot compel insurance purchases.
            </span>
          </div>
        </div>

        {/* Footer Actions */}
        <div style={{
          padding: '14px 20px',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'rgba(255, 255, 255, 0.02)'
        }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Show this screen at the branch desk
          </span>
          <button
            onClick={() => window.print()}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '6px 12px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-strong)',
              color: '#ffffff',
              fontSize: '0.78rem',
              fontWeight: 600
            }}
          >
            <Download size={13} />
            <span>Print / Save</span>
          </button>
        </div>
      </div>
    </div>
  );
};
