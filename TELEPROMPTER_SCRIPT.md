# Borrower Copilot - 5-Minute Teleprompter & Recording Script

Formatted specifically for screen recording with exact visual cues, cursor gestures, pause markers, and spoken dialogue.

---

### **[0:00 – 0:45] Intro, Problem & Architecture**

**Screen Setup:**
* Split screen: Left half has clean terminal/repo tree showing `/engine/rules.ts` and `RULES.md`; Right half has running Borrower Copilot UI.
* Mouse pointer stationary over the app logo.

---

**(Spoken - deliberate, clear, conversational pace)**

"Hi Lokta team, I'm Abhay. This is my walkthrough of Borrower Copilot.

When retail borrowers walk into a bank or NBFC in India, the asymmetry is brutal. Lenders sit with automated credit models and sales quotas, while borrowers walk in blind. They take whatever sanction letter is offered, only to discover three years later that they paid 300 to 400 basis points over market and stretched their debt past 60% of income.

Borrower Copilot balances that asymmetry. It is not an origination funnel or an affiliate lead-gen tool. It is an uncompromised borrower advocate that answers four foundational questions: Should I borrow at all? How much can I safely carry? What is a fair rate? And what monthly EMI should I agree to?

Technically, the app runs entirely client-side. There are no logins, no bureau pulls, and no personal data storage. Most importantly, I decoupled the domain logic: all FOIR affordability rules, RBI-mandated APR models, and stress tests live in a pure, headless `rules.ts` file. You can change any policy threshold live without touching the UI."

---

### **[0:45 – 1:45] Persona 1: Priya (Salaried MNC, Prime)**

**Screen Action:**
* Click the preset pill `[Priya - Salaried IT]`.
* Form auto-populates in one click. Scroll smoothly down to the 4 Output Cards.

---

**(Spoken - energetic, analytical tone)**

"Let’s look at our first borrower: Priya. 29, software engineer in Bengaluru, ₹1.10 Lakh net take-home, 780 CIBIL. She has a ₹14,000 car EMI with two years left, ₹28,000 rent, and wants an ₹8 Lakh personal loan for a wedding.

Watch the divergence here in Output 2. A traditional bank’s 50% FOIR formula sees her ₹1.10 Lakh income and will happily sanction up to **₹15 Lakhs**.

*(Hover cursor over the Divergence Card)*

Our engine stops her and issues a verdict of **'Borrow Less'**, recommending a hard ceiling of **₹5 Lakhs**.

Why? Two reasons. First, a wedding is purely depreciating consumption with zero cash flow return. Second, if she takes ₹8 Lakhs over 3 years, her total monthly fixed obligations surge past 58% of her income. That completely wipes out her monthly savings buffer while she still carries an active car loan.

For pricing in Output 3: Her 780 score and Tier-1 employer earn her a prime rate band of **10.5% to 11.5%**. But notice we do not stop at the headline rate: we compute the **RBI-compliant APR of 12.1%**, factoring in the mandatory 1.5% processing fee and stamp duty so she isn't caught off guard at disbursement."

---

### **[1:45 – 2:45] Persona 2: Ravi (Self-Employed, Product Reroute)**

**Screen Action:**
* Click `[Ravi - Kirana Owner]`.
* Point the cursor to the yellow highlight badge: **"Product Rerouted: Unsecured SME ➔ Loan Against Property (LAP)"**.

---

**(Spoken - problem-solving, authoritative tone)**

"Now, let's load Ravi. 42, running a kirana store in Mysuru for 14 years. His ITR shows ₹4.2 Lakhs a year, but his actual cash turnover is ₹40,000 to ₹80,000 a month. He has no credit score and wants ₹15 Lakhs for working capital and a delivery van.

*(Point to the Risk Warning)*

In the real world, a private bank would either outright reject his informal cash flow, or a fintech NBFC would trap him in an unsecured business loan at an aggressive 18% to 22% rate.

Watch how our adaptive questionnaire handles this: because Ravi reported that he owns unencumbered shop premises worth ₹45 Lakhs, the copilot immediately **reroutes his loan product to a Loan Against Property (LAP)** at a conservative 33% LTV.

*(Hover over Output 3 and Output 4)*

That single product shift changes everything:
1. His fair interest rate drops from 20% down to **9.25% – 10.5%**.
2. His tenure stretches from 3 years to 7 years.
3. His monthly EMI drops to roughly **₹18,800**—well within his baseline low-season cash floor of ₹40,000, keeping his shop completely safe."

---

### **[2:45 – 3:35] Persona 3: Anita (Informal, Debt Freeze Alert)**

**Screen Action:**
* Click `[Anita - Gig Delivery]`.
* Scroll down to the Output Cards. The top banner turns bold red: **"VERDICT: DO NOT BORROW NEW DEBT"**.

---

**(Spoken - direct, serious, protective tone)**

"Third is Anita: 35, gig delivery rider and home tailor in Hubballi, earning ₹26,000 to ₹30,000 a month. Her husband has been unemployed for 8 months. She currently carries three instant app loans totaling ₹35,000 at predatory 30%+ rates, with an EMI bounce last month. She wants ₹1.5 Lakhs for an electric scooter to double her delivery runs.

*(Hover over the Red Alert Banner)*

Here, Output 1 triggers an unequivocal **'DON'T BORROW'**.

Even though an EV scooter is technically a productive income-generating asset, adding a new ₹5,000 EMI on top of high-cost debt while in active default guarantees a default spiral.

The copilot provides actionable triage: it advises an immediate debt freeze. Her priority must be restructuring or clearing the 36% app debt, or accessing a formal state-subsidized EV lease-to-own scheme rather than taking on fresh commercial leverage."

---

### **[3:35 – 4:15] The Negotiation Card & Stress Test**

**Screen Action:**
* Click the **"View Negotiation Card"** button.
* Press `Cmd + Shift + M` (or toggle browser DevTools) for 5 seconds to show it formatted cleanly as a mobile card, then switch back.
* Click the **"Stress Test (+200 bps / -20% Income)"** toggle switch.

---

**(Spoken - practical, product-focused tone)**

"Here is the Negotiation Card—the tangible takeaway a borrower takes into the branch.

*(Point to Anchor Rate and Script)*

If a credit manager tells Priya, *'Best we can do is 13.5%,'* she looks at her card: *'Benchmark for 780 CIBIL is 10.75%. Walk-away ceiling is 12%.'* It gives her verbatim scripts to counter fee markups and decline bundled cross-sell insurance.

*(Toggle the Stress Test Switch)*

We also built in an interactive **Stress Test**. Borrowers rarely consider what happens if floating repo rates climb 200 basis points or if household income drops 20%. Toggling this recalculates their debt-service coverage in real time and flags if their safety margin turns negative."

---

### **[4:15 – 5:00] Trade-offs, Limits & Roadmap**

**Screen Action:**
* Switch to `RULES.md` in the text editor or scroll to the assumptions table at the bottom of the page.
* Bring the camera focus back to concluding the presentation.

---

**(Spoken - candid, self-aware, confident close)**

"To conclude with our product trade-offs and limits:

* **What I deliberately cut:** Account Aggregator pulls and bank statement OCR. Uploading 6 months of PDFs introduces massive friction and skepticism. Self-reported inputs with dynamic confidence ranges preserve complete privacy and build trust on day one.
* **Our honest limitation:** Cash verification for informal workers like Ravi. In `RULES.md`, we document a mandatory 40% haircut on unrecorded cash income because formal underwriters will never count cash at face value.
* **What I would build next:** A real-time **'Offer Auditor'**. The borrower inputs the sanction sheet numbers—quoted rate, processing fees, documentation charges, insurance—and the engine instantly computes the real IRR and checks if the lender slipped in predatory clauses.

Thank you for your time. The repo runs with `npm run dev`, and every rule is documented in `RULES.md`. I look forward to our live walk-through session!"

---

### **Quick Checklist for Recording:**
- [ ] Presets testable with 1 click: `[Priya - Salaried IT]`, `[Ravi - Kirana Owner]`, `[Anita - Gig Delivery]`.
- [ ] Divergence card prominently highlighting ₹15.2L Bank sanction vs ₹5L Safe cap for Priya.
- [ ] Reroute badge: Unsecured SME ➔ LAP with 33% LTV for Ravi.
- [ ] Bold Red "DO NOT BORROW" alert with debt triage for Anita.
- [ ] Mobile-responsive Negotiation Card with counter-scripts & walk-away ceiling.
- [ ] Real-time Stress Test toggle (+200 bps / -20% income).
- [ ] Headless `/engine/rules.ts` cleanly decoupled from React UI.
- [ ] Thorough `RULES.md` file in root.
