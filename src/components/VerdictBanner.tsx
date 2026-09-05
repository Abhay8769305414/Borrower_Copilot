import React from 'react';
import { CopilotAssessment } from '../engine/rules';
import { AlertOctagon, AlertTriangle, CheckCircle2, ArrowRightCircle } from 'lucide-react';

interface VerdictBannerProps {
  assessment: CopilotAssessment;
}

export const VerdictBanner: React.FC<VerdictBannerProps> = ({ assessment }) => {
  const { verdict, verdictTitle, verdictSummary, triageActionPlan, reroute } = assessment;

  if (verdict === 'DO_NOT_BORROW') {
    return (
      <div 
        className="animate-pulse-rose animate-fade-in"
        style={{
          background: 'linear-gradient(135deg, rgba(159, 18, 57, 0.4), rgba(136, 19, 55, 0.2))',
          border: '1px solid rgba(244, 63, 94, 0.7)',
          borderRadius: 'var(--radius-lg)',
          padding: '20px 24px',
          boxShadow: 'var(--shadow-glow-rose)',
          marginBottom: 20
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
          <div style={{
            background: 'rgba(244, 63, 94, 0.25)',
            border: '1px solid #f43f5e',
            borderRadius: 'var(--radius-md)',
            padding: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <AlertOctagon size={32} color="#fda4af" />
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 6 }}>
              <span className="badge badge-rose" style={{ fontSize: '0.85rem', padding: '6px 14px' }}>
                {verdictTitle}
              </span>
              <span style={{ fontSize: '0.8rem', color: '#fda4af', fontWeight: 600 }}>
                • Hard Constraint Triggered
              </span>
            </div>

            <p style={{ fontSize: '0.98rem', fontWeight: 600, color: '#ffffff', marginBottom: 12 }}>
              {verdictSummary}
            </p>

            {triageActionPlan && triageActionPlan.length > 0 && (
              <div style={{
                background: 'rgba(0, 0, 0, 0.35)',
                borderRadius: 'var(--radius-md)',
                padding: '12px 16px',
                border: '1px solid rgba(244, 63, 94, 0.25)'
              }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#fda4af', textTransform: 'uppercase', marginBottom: 6 }}>
                  Emergency Action Triage:
                </div>
                <ul style={{ paddingLeft: 18, margin: 0, fontSize: '0.86rem', color: '#fecdd3', display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {triageActionPlan.map((action, idx) => (
                    <li key={idx}>{action}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (verdict === 'BORROW_LESS') {
    return (
      <div 
        className="animate-fade-in"
        style={{
          background: 'linear-gradient(135deg, rgba(180, 83, 9, 0.2), rgba(120, 53, 15, 0.1))',
          border: '1px solid rgba(245, 158, 11, 0.45)',
          borderRadius: 'var(--radius-lg)',
          padding: '18px 24px',
          boxShadow: '0 0 25px rgba(245, 158, 11, 0.15)',
          marginBottom: 20
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            background: 'rgba(245, 158, 11, 0.2)',
            border: '1px solid #f59e0b',
            borderRadius: 'var(--radius-md)',
            padding: 8,
            flexShrink: 0
          }}>
            <AlertTriangle size={28} color="#fbbf24" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
              <span className="badge badge-amber" style={{ fontSize: '0.85rem', padding: '4px 12px' }}>
                {verdictTitle}
              </span>
            </div>
            <p style={{ fontSize: '0.94rem', color: '#ffffff', fontWeight: 500 }}>
              {verdictSummary}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // BORROW_SAFE
  return (
    <div 
      className="animate-fade-in"
      style={{
        background: 'linear-gradient(135deg, rgba(6, 95, 70, 0.25), rgba(4, 120, 87, 0.1))',
        border: '1px solid rgba(16, 185, 129, 0.45)',
        borderRadius: 'var(--radius-lg)',
        padding: '18px 24px',
        boxShadow: 'var(--shadow-glow-emerald)',
        marginBottom: 20
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{
          background: 'rgba(16, 185, 129, 0.2)',
          border: '1px solid #10b981',
          borderRadius: 'var(--radius-md)',
          padding: 8,
          flexShrink: 0
        }}>
          <CheckCircle2 size={28} color="#34d399" />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <span className="badge badge-emerald" style={{ fontSize: '0.85rem', padding: '4px 12px' }}>
              {verdictTitle}
            </span>
            {reroute.isRerouted && (
              <span className="badge badge-blue">
                Collateral LTV: {reroute.collateralLTV}%
              </span>
            )}
          </div>
          <p style={{ fontSize: '0.94rem', color: '#ffffff', fontWeight: 500 }}>
            {verdictSummary}
          </p>
        </div>
      </div>
    </div>
  );
};
