import { PRESET_PERSONAS } from './src/engine/presets.ts';
import { evaluateBorrower, calculateEMI, calculateEffectiveAPR } from './src/engine/rules.ts';

console.log('=== TESTING BORROWER COPILOT ENGINE ===\n');

// 1. Priya
const priya = PRESET_PERSONAS.find(p => p.id === 'priya')!;
const priyaResult = evaluateBorrower(priya.input);
console.log('--- PERSONA 1: PRIYA ---');
console.log('Verdict:', priyaResult.verdict, '|', priyaResult.verdictTitle);
console.log('Bank Max Sanction:', priyaResult.divergence.bankMaxSanction);
console.log('Safe Recommended Ceiling:', priyaResult.divergence.safeRecommendedCeiling);
console.log('Fair Rate Range:', priyaResult.fairRate.benchmarkRateDisplay);
console.log('Effective APR:', priyaResult.fairRate.effectiveAPR + '%');
console.log('Total Fixed Obligation Ratio:', priyaResult.safeEMI.totalFixedObligationRatio + '%');
console.log('Post Loan FOIR:', priyaResult.safeEMI.postLoanFOIR + '%\n');

// 2. Ravi
const ravi = PRESET_PERSONAS.find(p => p.id === 'ravi')!;
const raviResult = evaluateBorrower(ravi.input);
console.log('--- PERSONA 2: RAVI ---');
console.log('Verdict:', raviResult.verdict, '|', raviResult.verdictTitle);
console.log('Is Rerouted:', raviResult.reroute.isRerouted);
console.log('From:', raviResult.reroute.fromProduct, '-> To:', raviResult.reroute.toProduct);
console.log('LTV:', raviResult.reroute.collateralLTV + '%');
console.log('Fair Rate Range:', raviResult.fairRate.benchmarkRateDisplay);
console.log('Projected EMI:', raviResult.safeEMI.projectedEMIAtFairRate);
console.log('Cash Haircut Applied:', raviResult.cashHaircutApplied, 'Recognized:', raviResult.effectiveRecognizedIncome, '\n');

// 3. Anita
const anita = PRESET_PERSONAS.find(p => p.id === 'anita')!;
const anitaResult = evaluateBorrower(anita.input);
console.log('--- PERSONA 3: ANITA ---');
console.log('Verdict:', anitaResult.verdict, '|', anitaResult.verdictTitle);
console.log('Is Predatory Trap:', anitaResult.isPredatoryDebtTrap);
console.log('Reasoning count:', anitaResult.domainReasoning.length);
console.log('Triage steps:', anitaResult.triageActionPlan);
