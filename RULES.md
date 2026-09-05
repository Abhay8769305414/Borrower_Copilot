# Domain Reasoning & Lending Policy Documentation (`RULES.md`)

## 1. Executive Summary & Core Philosophy

Retail lending in India exhibits severe information asymmetry. Lenders utilize proprietary risk algorithms and aggressive sales targets, leading borrowers to accept whatever sanction amount is offered. Consequently, borrowers often overpay by **300 to 400 basis points** and enter unsustainable Fixed Obligation to Income Ratios (FOIR).

**Borrower Copilot** is an uncompromised borrower advocacy engine that operates **100% client-side with zero data persistence, zero tracking, and no bureau pull friction**. It operates on the principle that the lender's credit limit is not the borrower's safe capacity.

---

## 2. Headless Architecture & Logic Decoupling

All financial rules, regulatory ceilings, and stress testing models are completely decoupled from UI components and reside in a pure, standalone TypeScript file:
```
src/
└── engine/
    ├── rules.ts       <-- Pure domain logic & financial math (100% unit-tested)
    └── presets.ts     <-- Ground-truth persona test cases (Priya, Ravi, Anita)
```
Presentation components merely render the `CopilotAssessment` payload returned by `evaluateBorrower(input: BorrowerInput)`.

---

## 3. Four Core Questions Answered

### O1: Should I Borrow?
- **Depreciating Consumption vs. Productive Asset:**
  - **Consumption (Weddings, Vacations, Lifestyle):** Yields zero cash return. Capped at a hard maximum of **₹5.0 Lakhs** or $5 \times$ monthly income, even if bank underwriting sanctions more.
  - **Productive Investments (Machinery, EV delivery vehicles, working capital):** Permitted higher leverage provided projected incremental cash flows exceed the EMI by at least $1.4\times$ (Debt Service Coverage Ratio $\ge 1.4$).
- **Predatory Debt Freeze Trigger:**
  - If a borrower carries $\ge 2$ instant app loans alongside a NACH/cheque bounce in the last 6 months, or carries $\ge 3$ active fintech micro-loans, the engine issues an unconditional **"DO NOT BORROW NEW DEBT"** verdict with emergency debt-freeze triage steps.

---

### O2: How Much is Safe? (FOIR Divergence)
Traditional Indian banks routinely push **50% FOIR** on gross declared income, stretching personal loan tenures to 48–60 months to maximize the sanctioned ticket size.
$$\text{Bank Max Monthly EMI} = (\text{Income} \times 0.50) - \text{Existing EMIs}$$

In contrast, **Borrower Copilot Safe FOIR**:
1. Base safe ceiling capped at **35% FOIR** (or **30% FOIR** in Tier-1 metros where rent exceeds 25% of net income).
2. Incorporates actual living rent and mandatory non-debt commitments.
3. Imposes a strict emergency savings buffer floor ($\ge 15\%$ of net take-home pay remaining every month).

#### The Priya Divergence Proof:
* Net Salary: ₹1,10,000 | Existing Car EMI: ₹14,000 | Rent: ₹28,000 | Desired Wedding Loan: ₹8,00,000
* **Bank Sanction Model (50% FOIR, 48m tenure at 10.5%):** Sanctions up to **₹15.20 Lakhs**.
* **Borrower Copilot Safe Cap:** Capped at **₹5.00 Lakhs** because:
  - Wedding is purely depreciating consumption.
  - Taking ₹8L pushes total fixed commitments (EMI + Rent) to **58% of income**, eliminating monthly mutual fund SIPs and emergency reserves.

---

### O3: What is a Fair Rate? (RBI APR Model)

Banks quote attractive nominal "headline" rates (e.g., 10.5%), while obscuring upfront deductions:
1. Upfront Processing Fee (typically 1.50% to 2.50%).
2. Mandatory 18% GST on fees.
3. Stamp duty, legal drafting charges, and document verification (₹1,000 – ₹5,000).
4. Broken-period interest deductions.

Borrower Copilot calculates the **RBI-compliant Annual Percentage Rate (APR)** using internal rate of return (IRR) on actual net cash disbursed:
$$\text{Net Disbursed} = \text{Principal} - (\text{Fee} \times 1.18 + \text{Stamp Duty})$$
$$\sum_{t=1}^{n} \frac{\text{EMI}_t}{(1 + r_{\text{monthly}})^t} = \text{Net Disbursed}$$
$$\text{Effective APR} = r_{\text{monthly}} \times 12 \times 100$$

For Priya, a nominal 10.50% prime rate translates into a **true effective APR of 12.10%**, equipping her to detect hidden deductions at disbursement.

#### Benchmark Prime Spreads (Indian Market Standards):
| Risk Tier | CIBIL Band | Prime Rate Band | Walk-Away Rate | Typical Processing Fee |
| :--- | :--- | :--- | :--- | :--- |
| **Salaried Tier-1 MNC** | 780+ | 10.50% – 11.50% | 12.00% | Max 1.00% – 1.50% |
| **Salaried Mid-Corporate** | 720 – 779 | 11.50% – 12.75% | 13.50% | 1.50% – 2.00% |
| **Self-Employed (Formal ITR)** | 720+ | 12.50% – 14.50% | 15.50% | 1.75% – 2.25% |
| **Loan Against Property (LAP)**| Secured | 9.25% – 10.50% | 11.25% | Max 1.00% |
| **Secured Gold Loan** | Collateralized | 9.00% – 10.25% | 11.00% | Max 0.50% |

---

### O4: What Monthly EMI Can I Afford?
The monthly affordable EMI is constrained by:
$$\text{Affordable EMI} = \min \left( (\text{Recognized Income} \times \text{Safe FOIR}\%) - \text{Existing EMIs}, \; \text{Recognized Income} - (\text{Existing EMIs} + \text{Rent} + \text{15\% Savings Buffer}) \right)$$

---

## 4. Product Rerouting Engine (Unsecured $\rightarrow$ Secured)

When self-employed or thin-file borrowers seek large unsecured business loans, NBFCs charge usurious rates (18% – 24%) over short 3-year tenures, creating high default risk.

Borrower Copilot detects unencumbered physical assets (commercial shops, residential property, gold):
* **Ravi's Case:**
  - Kirana owner seeking ₹15 Lakhs working capital.
  - Detected unencumbered commercial shop valued at ₹45 Lakhs.
  - **Rerouted to Loan Against Property (LAP)** at **33% LTV**.
  - **Outcome:**
    1. Interest drops from **19.5% $\rightarrow$ 9.25% – 10.50%**.
    2. Tenure extends from **3 years $\rightarrow$ 10 years**.
    3. Monthly EMI drops to **~₹18,800 – ₹19,200**, comfortably within his baseline low-season cash flow of ₹40,000.

---

## 5. Stress Testing Engine (+200 bps / -20% Income)

Retail floating loans are exposed to macro interest rate cycles. The built-in Stress Test simulates:
1. **+200 bps Repo Rate Hike:** Floating rate increases by 2.00%.
2. **-20% Income Shock:** Household income drops by 20% (job disruption, business slowdown).
3. **Cushion Recalculation:** Re-evaluates debt service ratio. If total commitments breach 65% of stressed income, the status transitions to **RED WARNING**.

---

## 6. Honest Limitations & Product Trade-Offs

1. **Self-Employed Cash Verification (The 40% Haircut):**
   - *Limitation:* Unrecorded cash turnover cannot be proven to formal banking underwriters without audited banking records.
   - *Engine Rule:* We apply a **mandatory 40% haircut** to unrecorded cash income. Declared ₹50,000 cash is recognized as ₹30,000 for debt-servicing safety.
2. **Omission of Account Aggregator (AA) / Bureau Scrapes:**
   - *Deliberate Cut:* Uploading 6 months of bank statement PDFs kills top-of-funnel adoption. Zero-friction self-reporting with dynamic confidence bands establishes trust immediately.
3. **What to Build Next ("Offer Auditor"):**
   - A drag-and-drop sanction letter scanner that extracts the fine print (penal interest clauses, foreclosure lock-ins, bundled insurance premiums) and compares the lender's quote against the borrower's Negotiation Card in real time.
