import React from 'react';
import { BorrowerInput, EmploymentType, LoanPurpose, CreditScoreTier } from '../engine/rules';
import { User, Wallet, Building, AlertCircle, Home, Coins } from 'lucide-react';

interface BorrowerFormProps {
  input: BorrowerInput;
  onChange: (updated: BorrowerInput) => void;
  cashHaircut: number;
  recognizedIncome: number;
}

export const BorrowerForm: React.FC<BorrowerFormProps> = ({
  input,
  onChange,
  cashHaircut,
  recognizedIncome
}) => {
  const update = (fields: Partial<BorrowerInput>) => {
    onChange({ ...input, ...fields });
  };

  return (
    <div className="copilot-card" style={{ height: 'fit-content' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, borderBottom: '1px solid var(--border-subtle)', paddingBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <User size={18} color="#60a5fa" />
          <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff' }}>
            Borrower Profile & Obligations
          </h2>
        </div>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          Inputs sync live to /engine/rules.ts
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {/* Name and Age */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 10 }}>
          <div>
            <label>Borrower Name</label>
            <input
              type="text"
              value={input.name}
              onChange={e => update({ name: e.target.value })}
            />
          </div>
          <div>
            <label>Age</label>
            <input
              type="number"
              value={input.age}
              onChange={e => update({ age: Number(e.target.value) })}
            />
          </div>
        </div>

        {/* Employment Type */}
        <div>
          <label>Employment Profile</label>
          <select
            value={input.employmentType}
            onChange={e => update({ employmentType: e.target.value as EmploymentType })}
          >
            <option value="SALARIED_TIER1">Salaried (Tier 1 Tech / MNC)</option>
            <option value="SALARIED_OTHER">Salaried (Mid / Other Corporate)</option>
            <option value="SELF_EMPLOYED_FORMAL">Self-Employed (Audited ITR)</option>
            <option value="SELF_EMPLOYED_INFORMAL">Self-Employed (Informal / Kirana / Cash)</option>
            <option value="GIG_WORKER">Gig Economy / Informal Delivery</option>
          </select>
        </div>

        {/* Income Breakdown */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <div>
            <label>Monthly Take-Home (₹)</label>
            <input
              type="number"
              step="5000"
              value={input.monthlyDeclaredIncome}
              onChange={e => update({ monthlyDeclaredIncome: Number(e.target.value) })}
            />
          </div>
          <div>
            <label>Monthly Rent / Fixed (₹)</label>
            <input
              type="number"
              step="2000"
              value={input.monthlyRentOrFixedExpense}
              onChange={e => update({ monthlyRentOrFixedExpense: Number(e.target.value) })}
            />
          </div>
        </div>

        {/* Informal Cash Haircut Banner if applicable */}
        {cashHaircut > 0 && (
          <div style={{
            background: 'rgba(245, 158, 11, 0.08)',
            border: '1px solid rgba(245, 158, 11, 0.25)',
            borderRadius: 'var(--radius-md)',
            padding: '8px 12px',
            fontSize: '0.78rem',
            color: '#fbbf24',
            display: 'flex',
            alignItems: 'flex-start',
            gap: 8
          }}>
            <AlertCircle size={15} style={{ marginTop: 2, flexShrink: 0 }} />
            <div>
              <strong>40% Haircut Applied:</strong> In `RULES.md`, unrecorded informal cash is reduced by ₹{cashHaircut.toLocaleString('en-IN')}. Recognized debt-servicing floor is <strong>₹{recognizedIncome.toLocaleString('en-IN')}/mo</strong>.
            </div>
          </div>
        )}

        {/* Existing Obligations */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <div>
            <label>Existing EMIs (₹/mo)</label>
            <input
              type="number"
              step="1000"
              value={input.monthlyExistingEMIs}
              onChange={e => update({ monthlyExistingEMIs: Number(e.target.value) })}
            />
          </div>
          <div>
            <label>CIBIL Credit Score</label>
            <input
              type="number"
              value={input.creditScoreNum || ''}
              placeholder="e.g. 780"
              onChange={e => update({ 
                creditScoreNum: Number(e.target.value),
                creditScoreTier: Number(e.target.value) >= 780 ? 'EXCELLENT_780_PLUS' : (Number(e.target.value) >= 720 ? 'GOOD_720_779' : 'POOR_BELOW_650')
              })}
            />
          </div>
        </div>

        {/* Loan Request */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 10 }}>
          <div>
            <label>Requested Loan Amount (₹)</label>
            <input
              type="number"
              step="50000"
              value={input.requestedAmount}
              onChange={e => update({ requestedAmount: Number(e.target.value) })}
            />
          </div>
          <div>
            <label>Tenure (Years)</label>
            <input
              type="number"
              min="1"
              max="15"
              value={input.requestedTenureYears}
              onChange={e => update({ requestedTenureYears: Number(e.target.value) })}
            />
          </div>
        </div>

        {/* Purpose */}
        <div>
          <label>Loan Purpose / End-Use</label>
          <select
            value={input.purpose}
            onChange={e => update({ purpose: e.target.value as LoanPurpose })}
          >
            <option value="WEDDING_LIFESTYLE">Wedding / Lifestyle (Depreciating Consumption)</option>
            <option value="VACATION_SHOPPING">Vacation / Discretionary (Depreciating Consumption)</option>
            <option value="BUSINESS_EXPANSION">Business Inventory / Working Capital (Productive)</option>
            <option value="PRODUCTIVE_VEHICLE">EV / Commercial Delivery Vehicle (Productive)</option>
            <option value="MEDICAL_EMERGENCY">Medical Emergency (Essential)</option>
            <option value="DEBT_CONSOLIDATION">Consolidate High-Cost Debt</option>
          </select>
        </div>

        {/* Distress Indicators */}
        <div style={{
          background: 'var(--bg-surface-elevated)',
          padding: '12px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)',
          display: 'flex',
          flexDirection: 'column',
          gap: 8
        }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Risk & Stress Signals
          </div>

          <label style={{ display: 'flex', alignItems: 'center', gap: 8, margin: 0, textTransform: 'none', cursor: 'pointer' }}>
            <input
              type="checkbox"
              style={{ width: 'auto' }}
              checked={input.hasRecentDefaultOrBounce}
              onChange={e => update({ hasRecentDefaultOrBounce: e.target.checked })}
            />
            <span style={{ fontSize: '0.825rem', color: input.hasRecentDefaultOrBounce ? '#fda4af' : 'var(--text-secondary)' }}>
              Recent NACH / Cheque Bounce (last 6 months)
            </span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: 8, margin: 0, textTransform: 'none', cursor: 'pointer' }}>
            <input
              type="checkbox"
              style={{ width: 'auto' }}
              checked={input.activeAppLoansCount > 0}
              onChange={e => update({ activeAppLoansCount: e.target.checked ? 3 : 0 })}
            />
            <span style={{ fontSize: '0.825rem', color: input.activeAppLoansCount > 0 ? '#fda4af' : 'var(--text-secondary)' }}>
              Active Instant App Loans (Fintech / NBFC micro-debt)
            </span>
          </label>
        </div>

        {/* Collateral & Assets for Rerouting */}
        <div style={{
          background: 'var(--bg-surface-elevated)',
          padding: '12px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)',
          display: 'flex',
          flexDirection: 'column',
          gap: 8
        }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#38bdf8', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Home size={14} /> Collateral for Product Rerouting
          </div>

          <label style={{ display: 'flex', alignItems: 'center', gap: 8, margin: 0, textTransform: 'none', cursor: 'pointer' }}>
            <input
              type="checkbox"
              style={{ width: 'auto' }}
              checked={input.hasUnencumberedProperty}
              onChange={e => update({ 
                hasUnencumberedProperty: e.target.checked,
                propertyMarketValue: e.target.checked ? 4500000 : 0
              })}
            />
            <span style={{ fontSize: '0.825rem', color: input.hasUnencumberedProperty ? '#7dd3fc' : 'var(--text-secondary)' }}>
              Owns unencumbered shop or residential property (₹45L)
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};
