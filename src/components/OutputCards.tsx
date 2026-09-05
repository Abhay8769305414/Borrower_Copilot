import React from 'react';
import { CopilotAssessment, BorrowerInput } from '../engine/rules';
import { 
  HelpCircle, 
  TrendingDown, 
  Percent, 
  Calculator, 
  ShieldAlert, 
  Check, 
  Layers, 
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';

interface OutputCardsProps {
  assessment: CopilotAssessment;
  input: BorrowerInput;
  onOpenNegotiation: () => void;
  isStressTested: boolean;
  onToggleStressTest: () => void;
}

export const OutputCards: React.FC<OutputCardsProps> = ({
  assessment,
  input,
  onOpenNegotiation,
  isStressTested,
  onToggleStressTest
}) => {
  const { divergence, fairRate, safeEMI, reroute, stressTest, domainReasoning, verdict } = assessment;

  // Format INR currency
  const formatINR = (val: number) => {
    if (val >= 100000) {
      return `₹${(val / 100000).toFixed(2)} Lakhs`;
    }
    return `₹${val.toLocaleString('en-IN')}`;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Product Reroute Callout (Prominent for Ravi) */}
      {reroute.isRerouted && (
        <div 
          className="animate-fade-in"
          style={{
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(37, 99, 235, 0.15))',
            border: '1px solid rgba(245, 158, 11, 0.4)',
            borderRadius: 'var(--radius-lg)',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              background: '#f59e0b',
              color: '#000000',
              fontWeight: 800,
              fontSize: '0.72rem',
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)',
              textTransform: 'uppercase'
            }}>
              Product Rerouted
            </div>
            <div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff' }}>
                {reroute.fromProduct} <span style={{ color: '#f59e0b' }}>➔</span> {reroute.toProduct}
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                {reroute.reason}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 16 }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Rate Reduction
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#34d399' }}>
                -{reroute.rateReductionPct}% APR
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Safe Tenure
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#60a5fa' }}>
                {reroute.tenureExtensionYears} Years
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4 Core Output Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: 16
      }}>
        {/* Output 1: Should I Borrow? */}
        <div className="copilot-card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="badge badge-blue">Output 1</span>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}>
                Should I Borrow?
              </h3>
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              Domain Audit
            </span>
          </div>

          <div style={{ marginBottom: 14 }}>
            <div style={{
              fontSize: '1.15rem',
              fontWeight: 800,
              color: verdict === 'DO_NOT_BORROW' ? '#f43f5e' : (verdict === 'BORROW_LESS' ? '#f59e0b' : '#10b981')
            }}>
              {verdict === 'DO_NOT_BORROW' && '⛔ Verdict: DO NOT BORROW'}
              {verdict === 'BORROW_LESS' && '⚠️ Verdict: BORROW LESS'}
              {verdict === 'BORROW_SAFE' && '✅ Verdict: BORROW SAFE'}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 2 }}>
              {input.purpose.includes('WEDDING') ? 'Depreciating Consumption Check Applied' : 'Productive Capacity Validated'}
            </div>
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8, background: 'var(--bg-surface-elevated)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Why this decision?
            </div>
            <ul style={{ paddingLeft: 16, margin: 0, fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: 6 }}>
              {domainReasoning.slice(0, 3).map((reason, idx) => (
                <li key={idx} style={{ lineHeight: 1.4 }}>{reason}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Output 2: How Much is Safe? (Divergence Card) */}
        <div 
          className="copilot-card" 
          style={{ 
            display: 'flex', 
            flexDirection: 'column',
            border: verdict === 'BORROW_LESS' ? '1px solid rgba(245, 158, 11, 0.4)' : undefined
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="badge badge-amber">Output 2</span>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}>
                How Much is Safe?
              </h3>
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#fbbf24' }}>
              FOIR Divergence
            </span>
          </div>

          {/* Divergence Comparison */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
            <div style={{
              background: 'rgba(239, 68, 68, 0.08)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              borderRadius: 'var(--radius-md)',
              padding: '10px 12px'
            }}>
              <div style={{ fontSize: '0.72rem', color: '#f87171', textTransform: 'uppercase', fontWeight: 600 }}>
                Bank Max Sanction (50% FOIR)
              </div>
              <div className="font-mono" style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fca5a5', marginTop: 2 }}>
                {formatINR(divergence.bankMaxSanction)}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 2 }}>
                Opaque sales limit
              </div>
            </div>

            <div style={{
              background: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              borderRadius: 'var(--radius-md)',
              padding: '10px 12px'
            }}>
              <div style={{ fontSize: '0.72rem', color: '#34d399', textTransform: 'uppercase', fontWeight: 600 }}>
                Copilot Safe Ceiling
              </div>
              <div className="font-mono" style={{ fontSize: '1.25rem', fontWeight: 800, color: '#6ee7b7', marginTop: 2 }}>
                {formatINR(divergence.safeRecommendedCeiling)}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 2 }}>
                Guarantees cash cushion
              </div>
            </div>
          </div>

          {/* Visual Divergence Delta */}
          <div style={{
            background: 'var(--bg-surface-elevated)',
            padding: '10px 12px',
            borderRadius: 'var(--radius-md)',
            marginTop: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: 4 }}>
              <span style={{ color: 'var(--text-secondary)' }}>Over-Sanction Gap:</span>
              <strong style={{ color: '#f59e0b' }}>
                +{formatINR(divergence.divergenceDelta)} ({divergence.bankFOIRPercent}% vs {divergence.safeFOIRPercent}% FOIR)
              </strong>
            </div>
            <div style={{
              height: 6,
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: 3,
              overflow: 'hidden',
              display: 'flex'
            }}>
              <div style={{ width: '35%', background: '#10b981' }} />
              <div style={{ width: '65%', background: '#f59e0b' }} />
            </div>
          </div>
        </div>

        {/* Output 3: What is a Fair Rate? */}
        <div className="copilot-card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="badge badge-emerald">Output 3</span>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}>
                What is a Fair Rate?
              </h3>
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#34d399' }}>
              RBI APR Model
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 10, marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Prime Benchmark Band
              </div>
              <div className="font-mono" style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', marginTop: 2 }}>
                {fairRate.benchmarkRateDisplay}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                Walk-away: <strong>{fairRate.walkAwayRate}%</strong>
              </div>
            </div>

            <div style={{
              background: 'rgba(59, 130, 246, 0.1)',
              border: '1px solid rgba(59, 130, 246, 0.25)',
              borderRadius: 'var(--radius-md)',
              padding: '8px 10px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.7rem', color: '#93c5fd', textTransform: 'uppercase', fontWeight: 600 }}>
                RBI-Compliant APR
              </div>
              <div className="font-mono" style={{ fontSize: '1.35rem', fontWeight: 800, color: '#60a5fa', marginTop: 2 }}>
                {fairRate.effectiveAPR}%
              </div>
            </div>
          </div>

          {/* Upfront Fees Breakdown */}
          <div style={{
            background: 'var(--bg-surface-elevated)',
            borderRadius: 'var(--radius-md)',
            padding: '10px 12px',
            fontSize: '0.78rem',
            marginTop: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 4
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
              <span>Upfront Processing Fee ({fairRate.processingFeePercent}% + GST):</span>
              <span className="font-mono">₹{fairRate.processingFeeAmount.toLocaleString('en-IN')}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
              <span>Stamp Duty & Doc Charges:</span>
              <span className="font-mono">₹{fairRate.stampDutyAndDocCharges.toLocaleString('en-IN')}</span>
            </div>
            {fairRate.hiddenFeeWarning && (
              <div style={{ color: '#fbbf24', fontSize: '0.72rem', fontWeight: 600, marginTop: 4 }}>
                {fairRate.hiddenFeeWarning}
              </div>
            )}
          </div>
        </div>

        {/* Output 4: What EMI Can I Afford? */}
        <div className="copilot-card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="badge badge-blue">Output 4</span>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}>
                What Monthly EMI is Safe?
              </h3>
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              Budget Fit
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Safe Monthly EMI
              </div>
              <div className="font-mono" style={{ fontSize: '1.25rem', fontWeight: 800, color: '#38bdf8', marginTop: 2 }}>
                ₹{safeEMI.projectedEMIAtFairRate.toLocaleString('en-IN')}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                for {reroute.isRerouted ? reroute.tenureExtensionYears : input.requestedTenureYears}y tenure
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Total Fixed Commitments
              </div>
              <div className="font-mono" style={{ fontSize: '1.25rem', fontWeight: 800, color: safeEMI.totalFixedObligationRatio > 55 ? '#f59e0b' : '#34d399', marginTop: 2 }}>
                {safeEMI.totalFixedObligationRatio}%
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                of recognized income
              </div>
            </div>
          </div>

          <div style={{
            background: 'var(--bg-surface-elevated)',
            borderRadius: 'var(--radius-md)',
            padding: '10px 12px',
            marginTop: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: 2 }}>
              <span>Monthly Savings Buffer Cushion:</span>
              <strong className="font-mono" style={{ color: safeEMI.remainingMonthlySavingsBuffer > 0 ? '#34d399' : '#f43f5e' }}>
                ₹{safeEMI.remainingMonthlySavingsBuffer.toLocaleString('en-IN')}
              </strong>
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              (Keeps emergency funds & mutual fund SIPs intact)
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Controls Bar: Stress Test Toggle & View Negotiation Card */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 14,
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: '14px 20px'
      }}>
        {/* Stress Test Switch */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            onClick={onToggleStressTest}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 16px',
              borderRadius: 'var(--radius-full)',
              background: isStressTested ? 'rgba(239, 68, 68, 0.2)' : 'var(--bg-surface-elevated)',
              border: `1px solid ${isStressTested ? '#f43f5e' : 'var(--border-subtle)'}`,
              color: isStressTested ? '#fda4af' : 'var(--text-secondary)',
              fontWeight: 700,
              fontSize: '0.84rem'
            }}
          >
            <span style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: isStressTested ? '#f43f5e' : '#64748b',
              boxShadow: isStressTested ? '0 0 10px #f43f5e' : 'none'
            }} />
            <span>Stress Test (+200 bps / -20% Income)</span>
          </button>

          {isStressTested && (
            <div className="animate-fade-in" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className={`badge badge-${stressTest.cushionStatus === 'RED' ? 'rose' : (stressTest.cushionStatus === 'YELLOW' ? 'amber' : 'emerald')}`}>
                Cushion: {stressTest.cushionStatus}
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Stressed Buffer: <strong className="font-mono" style={{ color: stressTest.stressedSavingsBuffer <= 0 ? '#f43f5e' : '#ffffff' }}>₹{stressTest.stressedSavingsBuffer.toLocaleString('en-IN')}/mo</strong>
              </span>
            </div>
          )}
        </div>

        {/* View Negotiation Card Button */}
        <button
          onClick={onOpenNegotiation}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '10px 20px',
            borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, #2563eb, #3b82f6)',
            color: '#ffffff',
            fontWeight: 700,
            fontSize: '0.88rem',
            boxShadow: '0 4px 14px rgba(37, 99, 235, 0.4)'
          }}
        >
          <Sparkles size={16} />
          <span>View Negotiation Card</span>
        </button>
      </div>
    </div>
  );
};
