# Borrower Copilot - 5-Minute Video Walkthrough Script

Structured to directly satisfy evaluation criteria: **Domain Reasoning (30 pts)**, **Honesty about Limits (5 pts)**, and **What to Build Next / What to Cut**.

---

### **Video Walkthrough Script (Target: 4:30 – 5:00 min)**

#### **[0:00 – 0:45] 1. The Core Philosophy & Architecture**
> *"Hi Lokta team, I'm Abhay. This is my walkthrough of the Borrower Copilot."*  
> *"When borrowers walk into a branch, lenders evaluate them using opaque risk algorithms and aggressive sales quotas. Borrowers usually walk away with whatever sanction limit is offered—often overpaying by 300 to 400 basis points and committing to unsustainable EMIs."*  
> *"Borrower Copilot is not a credit bureau and not a lead-generation tool. It is an uncompromised borrower advocate that answers four questions: Should I borrow? How much is safe? What is a fair rate? And what EMI can I actually afford?"*  
> *(Show repository / code structure on screen)*  
> *"Technically, the app runs 100% client-side with zero tracking or backend storage. I strictly separated the logic: all lending rules, FOIR logic, and APR formulas live in a pure, headless `/engine/rules.ts` file, completely isolated from the React UI. This ensures any policy rule can be altered or unit-tested instantly without touching presentation code."*

---

#### **[0:45 – 1:45] 2. Persona 1: Priya (Salaried MNC, Prime)**
> *(Click "Load Priya" preset on screen)*  
> *"Let’s look at Priya: 29, software engineer in Bengaluru making ₹1.1L net, 780 CIBIL score. She wants an ₹8 Lakh personal loan for a wedding."*  
> *(Highlight O1 and O2)*  
> *"Notice the divergence in Output 2: A bank's standard 50% FOIR model would happily sanction her up to **₹15.2 Lakhs**. But our engine gives a verdict of **'Borrow Less'**, recommending a cap of **₹5 Lakhs**."*  
> *"Why? Two reasons: First, a wedding is purely depreciating consumption with zero economic return. Second, she already has a ₹14,000 car EMI running for 2 more years, plus ₹28,000 rent. If she takes ₹8 Lakhs at a 3-year tenure, her fixed commitments cross 58% of take-home pay, depleting her savings buffer."*  
> *(Scroll to Fair Rate & APR)*  
> *"For fair rate: Her 780 score and Tier-1 employer entitle her to prime pricing of **10.5% to 11.5%**. But we also show the **RBI-compliant APR of 12.1%**, factoring in the mandatory 1.5% upfront processing fee and stamp duty so she isn't blindsided by hidden disbursement deductions."*

---

#### **[1:45 – 2:45] 3. Persona 2: Ravi (Self-Employed, Rerouting to Secured)**
> *(Click "Load Ravi" preset on screen)*  
> *"Next is Ravi: 42, running a kirana store in Mysuru for 14 years. His ITR shows ₹4.2 Lakhs, but he makes ₹40,000 to ₹80,000 in cash. He has no bureau score and wants ₹15 Lakhs for stock expansion."*  
> *"A typical bank would either reject him or an NBFC would push him into an unsecured business loan at an extortionate 18% to 22% rate, which would cripple his margins."*  
> *(Highlight the Reroute badge and O3)*  
> *"Because our adaptive questionnaire detected he owns unencumbered commercial premises worth ₹45 Lakhs, our copilot **reroutes the product to a Loan Against Property (LAP)** at an LTV of just 33%."*  
> *"This single product shift drops his fair rate band down to **9.25% – 10.5%**, stretches safe tenure to 7–10 years, and keeps his monthly EMI under ₹19,000—well within his baseline ₹40,000 low-season cash flow."*

---

#### **[2:45 – 3:35] 4. Persona 3: Anita (Informal, Predatory Debt Trap)**
> *(Click "Load Anita" preset on screen)*  
> *"Finally, Anita: 35, gig rider and tailor in Hubballi, ₹28,000 monthly income with an unemployed spouse. She has three instant app loans totaling ₹35,000 at 30%+ APR, with a recent bounce. She wants ₹1.5 Lakhs for an electric scooter."*  
> *(Point to Red Banner: DON'T BORROW)*  
> *"Here, Output 1 triggers an unequivocal **'DON'T BORROW (New Debt)'**."*  
> *"Even though an EV scooter is a productive asset that could increase her earnings, adding a ₹5,000 fresh EMI on top of high-interest app loans while in default will trigger a debt spiral. The copilot advises an emergency debt freeze: prioritize settling the 36% app debt or seek formal MFI/EV asset lease-to-own subsidies before taking on fresh commercial leverage."*

---

#### **[3:35 – 4:10] 5. The Negotiation Card & Stress Test**
> *(Click "View Negotiation Card" and toggle the Stress Switch)*  
> *"Here is the Negotiation Card. It’s designed as a clean, single-screen view formatted for a mobile phone screen or a one-page PDF."*  
> *"When a lender pushes 14% on Priya, she can hold up this card showing: 'Fair rate for 780 CIBIL + Tier-1 IT is 10.75%. Walk-away rate is 12%.' It gives her exact counter-phrases to demand processing fee waivers and reject bundled insurance."*  
> *"We also include a **Stress Test toggle**: what happens if floating interest rates rise by 200 bps or household income drops by 20%? The borrower sees immediately if their cushion turns red."*

---

#### **[4:10 – 5:00] 6. What I’d Cut, What I’d Build Next & Limitations**
> *"To wrap up with product trade-offs:*  
> * **What I cut:** *I deliberately omitted bureau integration (Account Aggregator/CIBIL pulls) and document OCR. Asking for bank statements kills top-of-funnel trust. Self-reported data with honest confidence bands is faster, zero-friction, and safer.*  
> * **Known Limitation:** *Self-employed cash verification is an estimate. As documented in `RULES.md`, we apply a conservative 40% haircut to informal unrecorded cash flow.*  
> * **What I'd build next:** *A real-time 'Offer Auditor' tab. The borrower types in the sanction letter quote (Interest rate, processing fee, insurance fee, tenure), and the copilot instantly calculates the hidden IRR and shows whether it breaches their Negotiation Card.*  
> 
> *"Thank you for your time. The repo contains `RULES.md` and instructions to run this locally. Looking forward to our discussion!"*

---

### **Key Presentation Tips for Recording:**
1. **Resolution & View:** Keep browser zoom at 100% or 110%. Open DevTools in mobile viewport mode (iPhone 14/15 Pro) for 30 seconds when showing the Negotiation Card to prove it works on a phone.
2. **Preset Buttons:** Have 3 visible buttons at the top of your dev screen: `[Load Priya]`, `[Load Ravi]`, `[Load Anita]` so you never waste time typing inputs during the recording.
3. **Pacing:** Hit the 4:45 mark smoothly without rushing; Lokta specifies a 5-minute ceiling.
