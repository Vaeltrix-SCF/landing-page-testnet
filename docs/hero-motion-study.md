# Hero motion study

Reference: https://heronaiapp.com/

Captured 327 uninterrupted real browser screenshots over 21.059 seconds after reload, on October 14, 2026. This is a timestamped sampled frame sequence, not a continuous native screen recording. Captures live under `/private/tmp/heron-opening-continuous` and are temporary.

Observed sequence (relative to capture start, not a measured CSS animation duration):

- Initial paper frame, followed by small metadata and progressive line drawing.
- Around 4.5–7.5 seconds, the architectural outline builds to a complete drawing.
- Around 8.48 seconds, a horizontal strip centered through the drawing exposes the finished shaded illustration. Paper panels above and below move away from the center, so the opening expands vertically in both directions.
- Around 9.46 seconds, the finished illustration is exposed; header and lower copy follow into position.
- Around 10.97 seconds, the full hero composition is settled.

Implementation lesson: two coordinated views of the same subject. A completed line drawing sits in an overlay split at the center; two clipped halves travel up and down over the aligned rendered image. Exact source easing/durations are unverified. A fade-in alone cannot reproduce this behavior.

## Vaeltrix visual proposal

The protocol measures the off-chain payout after Stellar settlement, not general banking, card checkout, or architectural exchange gateways. A more direct scene is an editorial isometric payment route: a sender/client terminal, a central settlement ledger, a receiving provider/payout terminal, and a connected locked performance bond. A small payment packet travels between them. The hero should have two matching versions of this exact geometry: fine pencil/drafting outline and shaded, filled illustration. Restrained orange should indicate payment status or evidence rather than arbitrary building windows.

The sender and beneficiary must be distinguished. The penalty is usually paid to the sending client in V0; the hero should not imply guaranteed end-user reimbursement, a credit-card payment product, or insurance. Bank and mobile-money payout branches may be represented at the receiving end. Proposed creative direction, not yet implemented.

Current project was left unchanged during this inspection, apart from this research note.
