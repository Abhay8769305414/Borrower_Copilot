import React, { useState } from 'react';
import { evaluateBorrower, BorrowerInput } from './engine/rules';
import { PRESET_PERSONAS, PresetPersona } from './engine/presets';
import { Header } from './components/Header';
import { BorrowerForm } from './components/BorrowerForm';
import { VerdictBanner } from './components/VerdictBanner';
import { OutputCards } from './components/OutputCards';
import { NegotiationCardModal } from './components/NegotiationCardModal';
import { OfferAuditorRoadmap } from './components/OfferAuditorRoadmap';
import { BookOpen, Shield, Code, Cpu, ExternalLink } from 'lucide-react';

export const App: React.FC = () => {
  // Default to Priya as in the script
  const [selectedPresetId, setSelectedPresetId] = useState<string>('priya');
  const [input, setInput] = useState<BorrowerInput>(PRESET_PERSONAS[0].input);
  const [isStressTested, setIsStressTested] = useState<boolean>(false);
  const [isNegotiationOpen, setIsNegotiationOpen] = useState<boolean>(false);

  // Live evaluation via pure domain engine
  const assessment = evaluateBorrower(input);

  const handleSelectPreset = (preset: PresetPersona) => {
    setSelectedPresetId(preset.id);
    setInput(preset.input);
    setIsStressTested(false);
  };

  const handleCustomInput = (updated: BorrowerInput) => {
    setInput(updated);
    setSelectedPresetId('custom');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Header with Preset Pills */}
      <Header
        selectedPresetId={selectedPresetId}
        onSelectPreset={handleSelectPreset}
        onResetCustom={() => setSelectedPresetId('custom')}
      />

      {/* Main Workspace Layout */}
      <main style={{
        maxWidth: 1400,
        width: '100%',
        margin: '0 auto',
        padding: '24px 20px',
        flex: 1
      }}>
        {/* Persona Context Sub-Header */}
        {selectedPresetId !== 'custom' && (
          <div style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '10px 16px',
            marginBottom: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 10
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: '1.2rem' }}>
                {PRESET_PERSONAS.find(p => p.id === selectedPresetId)?.avatar}
              </span>
              <div>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>
                  {PRESET_PERSONAS.find(p => p.id === selectedPresetId)?.title}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginLeft: 8 }}>
                  — {PRESET_PERSONAS.find(p => p.id === selectedPresetId)?.description}
                </span>
              </div>
            </div>

            <span className="badge badge-blue">
              Preserving Buffer Cushion
            </span>
          </div>
        )}

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(340px, 390px) 1fr',
          gap: 24,
          alignItems: 'start'
        }}>
          {/* Left Column: Adaptive Borrower Questionnaire */}
          <BorrowerForm
            input={input}
            onChange={handleCustomInput}
            cashHaircut={assessment.cashHaircutApplied}
            recognizedIncome={assessment.effectiveRecognizedIncome}
          />

          {/* Right Column: Dynamic Assessment & Output Cards */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Top Verdict Alert Banner */}
            <VerdictBanner assessment={assessment} />

            {/* 4 Core Output Cards */}
            <OutputCards
              assessment={assessment}
              input={input}
              onOpenNegotiation={() => setIsNegotiationOpen(true)}
              isStressTested={isStressTested}
              onToggleStressTest={() => setIsStressTested(!isStressTested)}
            />

            {/* What to Build Next: Live Offer Auditor */}
            <OfferAuditorRoadmap
              benchmarkAPR={assessment.fairRate.effectiveAPR}
              walkAwayRate={assessment.fairRate.walkAwayRate}
            />
          </div>
        </div>
      </main>

      {/* Negotiation Card Mobile Modal */}
      <NegotiationCardModal
        isOpen={isNegotiationOpen}
        onClose={() => setIsNegotiationOpen(false)}
        cardData={assessment.negotiationCard}
        input={input}
      />

      {/* Footer & Transparency Guarantee */}
      <footer style={{
        borderTop: '1px solid var(--border-subtle)',
        background: 'var(--bg-surface)',
        padding: '20px 24px',
        marginTop: 40
      }}>
        <div style={{
          maxWidth: 1400,
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            <Cpu size={15} color="#60a5fa" />
            <span>
              All calculations run in pure headless <code className="font-mono" style={{ color: '#93c5fd' }}>/engine/rules.ts</code> with zero server calls.
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <span>Policy documented in <strong>RULES.md</strong></span>
            <span>•</span>
            <span>40% Haircut on Informal Cash</span>
            <span>•</span>
            <span>RBI APR Aligned</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
