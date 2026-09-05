import React from 'react';
import { Shield, Sparkles, Cpu, Layers } from 'lucide-react';
import { PRESET_PERSONAS, PresetPersona } from '../engine/presets';

interface HeaderProps {
  selectedPresetId: string;
  onSelectPreset: (preset: PresetPersona) => void;
  onResetCustom: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  selectedPresetId,
  onSelectPreset,
  onResetCustom
}) => {
  return (
    <header style={{
      borderBottom: '1px solid var(--border-subtle)',
      background: 'rgba(17, 24, 39, 0.75)',
      backdropFilter: 'blur(12px)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      padding: '14px 24px'
    }}>
      <div style={{
        maxWidth: 1400,
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 42,
            height: 42,
            borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, #2563eb, #3b82f6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)'
          }}>
            <Shield size={24} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <h1 style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#ffffff' }}>
                Borrower Copilot
              </h1>
              <span className="badge badge-blue">Pure Headless Engine</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Uncompromised Retail Loan Advocate • 100% Client-Side Privacy
            </p>
          </div>
        </div>

        {/* Quick Persona Preset Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', marginRight: 4 }}>
            Presets:
          </span>
          {PRESET_PERSONAS.map(p => {
            const isSelected = selectedPresetId === p.id;
            return (
              <button
                key={p.id}
                onClick={() => onSelectPreset(p)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '8px 14px',
                  borderRadius: 'var(--radius-full)',
                  background: isSelected 
                    ? 'linear-gradient(135deg, #1d4ed8, #2563eb)' 
                    : 'var(--bg-surface-elevated)',
                  border: `1px solid ${isSelected ? '#60a5fa' : 'var(--border-subtle)'}`,
                  color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                  fontWeight: isSelected ? 700 : 500,
                  fontSize: '0.85rem',
                  boxShadow: isSelected ? '0 0 16px rgba(37, 99, 235, 0.5)' : 'none'
                }}
              >
                <span>{p.avatar}</span>
                <span>[{p.badge}]</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
