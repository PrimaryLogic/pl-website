# Patient referral workflow audit

Source: [Takeoff](https://www.hiretakeoff.com/) patient-referral animation, observed end to end on 2026-08-12.

## Result

Healthy. The workflow now contains the complete 30-step referral journey, runs once from inbound referral through `appointment_confirmed`, stops at the terminal outcome, routes edge-to-edge between circular nodes, and fits without an internal pan or scrollbar.

## Findings and fixes

1. **[P1] The terminal outcome was outside the visible graph.** The first implementation preserved a full-size graph inside an overflow-hidden viewport, so the right half was clipped. Fixed with a bounded React Flow viewport, explicit width subtraction for the lane axis, initial `fitView`, and resize-triggered refitting.
2. **[P1] Routing targeted composite node boxes.** Fixed by reducing each event to one 28px circular node and putting its target/source handles on the circle itself.
3. **[P1] The local story ended before every Takeoff step and follow-up loop.** Fixed by reproducing all 30 observed steps, including payer verification, PCP webhook, next-day reminder, and terminal confirmation.
4. **[P2] Graph labels collided with edges and obscured the sequence.** Fixed by moving copy into one persistent detail panel and letting the graph communicate structure, state, and time only.
5. **[P2] Narrow-width resizing could leave the old desktop viewport in place.** Fixed with a `ResizeObserver` that refits the workflow after every container-size change.

## Observed source sequence

| # | Phase | Day / time | Event | Evidence |
|---:|---|---|---|---|
| 1 | Signal | Day 1 · 9:43 am | Inbound · PCP referral webhook | `artifacts/audit-takeoff/01-patient-referral-start.jpg` |
| 2 | Decision | Day 1 · 9:43 am | Rank candidate specialists | `artifacts/audit-takeoff/02-patient-referral.jpg` |
| 3 | Task | Day 1 · 9:46 am | Queue · Office A call | `artifacts/audit-takeoff/03-patient-referral.jpg` |
| 4 | Interaction | Day 1 · 9:48 am | Call · Office A (mismatch) | `artifacts/audit-takeoff/04-patient-referral.jpg` |
| 5 | Signal | Day 1 · 9:59 am | call.ended · mismatch | `artifacts/audit-takeoff/05-patient-referral.jpg` |
| 6 | Decision | Day 1 · 9:59 am | Try Office B | `artifacts/audit-takeoff/06-patient-referral.jpg` |
| 7 | Task | Day 1 · 10:00 am | Queue · Office B call | `artifacts/audit-takeoff/07-patient-referral.jpg` |
| 8 | Interaction | Day 1 · 10:02 am | Call · Office B (match) | `artifacts/audit-takeoff/08-patient-referral.jpg` |
| 9 | Decision | Day 1 · 10:16 am | Verify in-network with insurer | `artifacts/audit-takeoff/09-patient-referral.jpg` |
| 10 | Task | Day 1 · 10:18 am | Queue · insurer verify call | `artifacts/audit-takeoff/10-patient-referral.jpg` |
| 11 | Interaction | Day 1 · 10:20 am | Call · insurer (verified) | `artifacts/audit-takeoff/11-patient-referral.jpg` |
| 12 | Signal | Day 1 · 10:29 am | insurance_verified | `artifacts/audit-takeoff/12-patient-referral.jpg` |
| 13 | Decision | Day 1 · 10:29 am | Send fax · notify patient | `artifacts/audit-takeoff/13-patient-referral.jpg` |
| 14 | Task | Day 1 · 10:30 am | Queue · referral fax | `artifacts/audit-takeoff/14-patient-referral.jpg` |
| 15 | Task | Day 1 · 10:30 am | Queue · SMS to patient | `artifacts/audit-takeoff/15-patient-referral.jpg` |
| 16 | Interaction | Day 1 · 10:31 am | Fax · referral packet | `artifacts/audit-takeoff/16-patient-referral.jpg` |
| 17 | Interaction | Day 1 · 10:31 am | SMS · 3 dates to choose | `artifacts/audit-takeoff/17-patient-referral.jpg` |
| 18 | Signal | Day 1 · 2:14 pm | SMS inbound · patient picks | `artifacts/audit-takeoff/18-patient-referral.jpg` |
| 19 | Decision | Day 1 · 2:14 pm | Lock the slot | `artifacts/audit-takeoff/19-patient-referral.jpg` |
| 20 | Task | Day 1 · 2:16 pm | Queue · Office B callback | `artifacts/audit-takeoff/20-patient-referral.jpg` |
| 21 | Interaction | Day 1 · 2:18 pm | Call · book the slot · 6m | `artifacts/audit-takeoff/21-patient-referral.jpg` |
| 22 | Signal | Day 1 · 2:24 pm | appointment_booked | `artifacts/audit-takeoff/22-patient-referral.jpg` |
| 23 | Decision | Day 1 · 2:24 pm | Close loops · patient + PCP | `artifacts/audit-takeoff/23-patient-referral.jpg` |
| 24 | Task | Day 1 · 2:24 pm | Queue · SMS confirmation | `artifacts/audit-takeoff/24-patient-referral.jpg` |
| 25 | Task | Day 1 · 2:24 pm | Queue · webhook to PCP | `artifacts/audit-takeoff/25-patient-referral.jpg` |
| 26 | Interaction | Day 1 · 2:25 pm | SMS · confirmation | `artifacts/audit-takeoff/26-patient-referral.jpg` |
| 27 | Interaction | Day 1 · 2:25 pm | Webhook → PCP system | `artifacts/audit-takeoff/27-patient-referral.jpg` |
| 28 | Task | Day 2 · 9:00 am | Reminder SMS scheduled | `artifacts/audit-takeoff/28-patient-referral.jpg` |
| 29 | Interaction | Day 2 · 9:00 am | SMS · reminder | `artifacts/audit-takeoff/29-patient-referral.jpg` |
| 30 | Signal | Day 2 · 9:14 am | appointment_confirmed | `artifacts/audit-takeoff/30-patient-referral.jpg` |

## Verification

- Desktop 1280×1000: workflow canvas `1178px` wide; `scrollWidth === clientWidth`; first and last nodes visible.
- Narrow 390×844: workflow canvas `348px` wide; `scrollWidth === clientWidth`; first and last nodes visible; page horizontal overflow `0px`.
- Playback: previous, next, pause, resume, restart, milestone selection, and all 30 detail states tested.
- Terminal behavior: autoplay stops at step 30; next is disabled; play restarts at step 1.
- Console: no warnings or errors.
- Visual evidence: `artifacts/audit-takeoff/contact-sheet.png`, `artifacts/audit-local/06-final-step-02.png`, and `artifacts/design-qa-comparison.png`.
