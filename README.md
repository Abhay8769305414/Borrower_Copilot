# Borrower Copilot

> **An uncompromised borrower advocate balancing retail lending asymmetry in India.**
> Evaluates true safe capacity, fair risk-based interest rates, RBI-compliant APRs, and product rerouting opportunities.

---

## 🎯 Quick Start (Run Locally)

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Run pure headless engine domain tests
npm test
```

Local server starts at `http://localhost:5173`.

---

## 🏗️ Architecture & Philosophy

The application is built around **strict domain decoupling** and **uncompromising borrower privacy**:
1. **100% Client-Side:** No logins, zero external bureau pings, and no backend data storage.
2. **Pure Headless Engine (`/src/engine/rules.ts`):** All lending logic, FOIR thresholds, RBI APR models, and stress tests are completely separated from React presentation code.
3. **Comprehensive Domain Documentation (`RULES.md`):** Complete mathematical formulas, policy limits, and underwriter guidelines.

---

## 👥 Three Personas Tested & Calibrated

| Persona | Profile & Request | Bank FOIR Offer | Copilot Verdict | Key Mechanism |
| :--- | :--- | :--- | :--- | :--- |
| **Priya** | 29, Tier-1 Tech, ₹1.1L net, 780 CIBIL. Wants ₹8L personal loan for wedding. | Sanctions up to **₹15.2 Lakhs** | **BORROW LESS** (Cap at ₹5.0L) | Depreciating consumption penalty applied. Prevents fixed obligations from crossing 58% and preserves savings buffer. |
| **Ravi** | 42, Kirana store owner in Mysuru (14 yrs). ₹40k-80k cash turnover, no CIBIL. Wants ₹15L. | High-risk rejection or 18%-22% unsecured NBFC loan | **BORROW SAFE via LAP** | Detects unencumbered shop premises (₹45L). Reroutes to **Loan Against Property** at 33% LTV, dropping rate to **9.25%-10.5%** and EMI to under ₹19,000. |
| **Anita** | 35, Gig delivery rider in Hubballi, ₹28k income, 3 app loans (30%+ APR), recent bounce. Wants ₹1.5L EV scooter. | Predatory high-cost fintech micro-debt | **DO NOT BORROW (New Debt)** | Hard default constraint triggered. Immediate debt-freeze triage to prevent debt spiral before taking productive leverage. |

---

## 📑 Key Submission Documents

- [RULES.md](file:///d:/Borrower%20Copilot%20Build/RULES.md): Exhaustive domain reasoning, formulas, and trade-offs.
- [TELEPROMPTER_SCRIPT.md](file:///d:/Borrower%20Copilot%20Build/TELEPROMPTER_SCRIPT.md): Complete timed script (4:30–5:00 min) with visual cues and screen actions.
- [WALKTHROUGH_SCRIPT.md](file:///d:/Borrower%20Copilot%20Build/WALKTHROUGH_SCRIPT.md): Executive Loom walkthrough guide.
