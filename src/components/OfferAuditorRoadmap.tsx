import React, { useState } from 'react';
import { calculateEffectiveAPR } from '../engine/rules';
import { FileSearch, Sparkles, CheckCircle, AlertTriangle, ArrowRight, ShieldCheck } from 'lucide-react';

interface OfferAuditorProps {
  benchmarkAPR: number;
  walkAwayRate: number;
}

export const OfferAuditorRoadmap: React.FC<OfferAuditorProps> = ({
  benchmarkAPR,
  walkAwayRate
}) => {
  const [sanctionAmount, setSanctionAmount] = useState<number>(800000);
  const [quotedRate, setQuotedRate] = useState<number>(13.5);
  const [tenureYears, setTenureYears] = useState<number>(3);
  const [processingFeePercent, setProcessingFeePercent] = useState<number>(2.5);
  const [insuranceCost, setInsuranceCost] = useState<number>(22000);

  // Calculate true hidden IRR
  const { effectiveAPR, totalUpfrontFee } = calculateEffectiveAPR(
    sanctionAmount,
    quotedRate,
    tenureYears * 12,
    processingFeePercent,
    insuranceCost + 1500
  );

  const isBreached = effectiveAPR > walkAwayRate;

  return (
    <div className="copilot-card" style={{ marginTop: 24, border: '1px dashed rgba(59, 130, 246, 0.4)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            background: 'rgba(59, 130, 246, 0.15)',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            borderRadius: 'var(--radius-md)',
            padding: 6
          }}>
            <FileSearch size={20} color="#60a5fa" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff' }}>
                Next Roadmap Feature: Live "Offer Auditor"
              </h3>
              <span className="badge badge-blue">Interactive Preview</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Type in the loan officer's sanction letter quote to uncover hidden IRR & predatory fees
            </p>
          </div>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 12,
        background: 'var(--bg-surface-elevated)',
        padding: '14px',
        borderRadius: 'var(--radius-md)',
        marginBottom: 14
      }}>
        <div>
          <label style={{ fontSize: '0.74rem' }}>Lender Quoted Rate (%)</label>
          <input
            type="number"
            step="0.25"
            value={quotedRate}
            onChange={e => setQuotedRate(Number(e.target.value))}
          />
        </div>

        <div>
          <label style={{ fontSize: '0.74rem' }}>Processing Fee (%)</label>
          <input
            type="number"
            step="0.5"
            value={processingFeePercent}
            onChange={e => setProcessingFeePercent(Number(e.target.value))}
          />
        </div>

        <div>
          <label style={{ fontSize: '0.74rem' }}>Bundled Insurance (₹)</label>
          <input
            type="number"
            step="1000"
            value={insuranceCost}
            onChange={e => setInsuranceCost(Number(e.target.value))}
          />
        </div>
      </div>

      {/* Audit Result Display */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 14,
        padding: '12px 16px',
        borderRadius: 'var(--radius-md)',
        background: isBreached ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
        border: `1px solid ${isBreached ? 'rgba(239, 68, 68, 0.3)' : 'rgba(16, 185, 129, 0.3)'}`
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {isBreached ? (
            <AlertTriangle size={24} color="#f87171" />
          ) : (
            <ShieldCheck size={24} color="#34d399" />
          )}
          <div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#ffffff' }}>
              True Hidden IRR: <span className="font-mono" style={{ color: isBreached ? '#f87171' : '#34d399', fontSize: '1.15rem' }}>{effectiveAPR}%</span>
              <span style={{ fontSize: '0.8rem', fontWeight: 400, color: 'var(--text-secondary)', marginLeft: 8 }}>
                (Quoted: {quotedRate}% + ₹{totalUpfrontFee.toLocaleString('en-IN')} upfront deductions)
              </span>
            </div>
            <div style={{ fontSize: '0.78rem', color: isBreached ? '#fda4af' : '#6ee7b7' }}>
              {isBreached 
                ? `❌ Breaches walk-away ceiling of ${walkAwayRate}%. Do not sign without fee & rate adjustment!`
                : `✅ Within acceptable limits. Verify Key Fact Statement before disbursement.`}
            </div>
          </div>
        </div>

        <span className={`badge badge-${isBreached ? 'rose' : 'emerald'}`}>
          {isBreached ? 'Overpaying by 300+ bps' : 'Fair Quote'}
        </span>
      </div>
    </div>
  );
};
