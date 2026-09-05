import { BorrowerInput } from './rules';

export interface PresetPersona {
  id: string;
  name: string;
  title: string;
  badge: string;
  avatar: string;
  description: string;
  input: BorrowerInput;
}

export const PRESET_PERSONAS: PresetPersona[] = [
  {
    id: 'priya',
    name: 'Priya',
    title: 'Salaried MNC, Prime',
    badge: 'Priya - Salaried IT',
    avatar: '👩‍💻',
    description: '29, Software Engineer in Bengaluru, ₹1.10L net, 780 CIBIL, wants ₹8L personal loan for wedding.',
    input: {
      name: 'Priya Sharma',
      age: 29,
      city: 'Bengaluru (Tier 1)',
      employmentType: 'SALARIED_TIER1',
      monthlyDeclaredIncome: 110000,
      monthlyExistingEMIs: 14000,
      remainingTenureMonths: 24,
      monthlyRentOrFixedExpense: 28000,
      activeAppLoansCount: 0,
      activeAppLoanOutstanding: 0,
      hasRecentDefaultOrBounce: false,
      householdDependentStress: false,
      requestedAmount: 800000,
      requestedTenureYears: 3,
      purpose: 'WEDDING_LIFESTYLE',
      creditScoreTier: 'EXCELLENT_780_PLUS',
      creditScoreNum: 780,
      hasUnencumberedProperty: false,
      hasGoldOrFixedDeposits: false
    }
  },
  {
    id: 'ravi',
    name: 'Ravi',
    title: 'Self-Employed Kirana, Product Reroute',
    badge: 'Ravi - Kirana Owner',
    avatar: '🏪',
    description: '42, Kirana store owner in Mysuru for 14 years. ₹40k–₹80k monthly cash turnover, no CIBIL. Wants ₹15L working capital.',
    input: {
      name: 'Ravi Kumar',
      age: 42,
      city: 'Mysuru (Tier 2)',
      employmentType: 'SELF_EMPLOYED_INFORMAL',
      monthlyDeclaredIncome: 60000,
      informalCashIncome: 50000,
      itrAnnualIncome: 420000,
      monthlyExistingEMIs: 0,
      monthlyRentOrFixedExpense: 12000,
      activeAppLoansCount: 0,
      activeAppLoanOutstanding: 0,
      hasRecentDefaultOrBounce: false,
      householdDependentStress: false,
      requestedAmount: 1500000,
      requestedTenureYears: 3,
      purpose: 'BUSINESS_EXPANSION',
      creditScoreTier: 'NEW_TO_CREDIT',
      hasUnencumberedProperty: true,
      propertyMarketValue: 4500000, // 33% LTV
      hasGoldOrFixedDeposits: false
    }
  },
  {
    id: 'anita',
    name: 'Anita',
    title: 'Informal Gig Worker, Debt Freeze',
    badge: 'Anita - Gig Delivery',
    avatar: '🛵',
    description: '35, Gig delivery rider & tailor in Hubballi, ₹28,000 monthly, unemployed spouse, 3 instant app loans with recent bounce. Wants ₹1.5L for EV scooter.',
    input: {
      name: 'Anita Patil',
      age: 35,
      city: 'Hubballi (Tier 3)',
      employmentType: 'GIG_WORKER',
      monthlyDeclaredIncome: 28000,
      informalCashIncome: 20000,
      monthlyExistingEMIs: 6200,
      monthlyRentOrFixedExpense: 9000,
      activeAppLoansCount: 3,
      activeAppLoanOutstanding: 35000,
      hasRecentDefaultOrBounce: true,
      householdDependentStress: true,
      requestedAmount: 150000,
      requestedTenureYears: 2,
      purpose: 'PRODUCTIVE_VEHICLE',
      creditScoreTier: 'POOR_BELOW_650',
      creditScoreNum: 610,
      hasUnencumberedProperty: false,
      hasGoldOrFixedDeposits: false
    }
  }
];
