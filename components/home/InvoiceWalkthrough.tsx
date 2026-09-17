"use client";

import "./DemoChrome.css";

import { useEffect, useRef, useState, type ReactNode } from "react";
import "./InvoiceWalkthrough.css";

type GlyphKind =
  | "arrow"
  | "back"
  | "check"
  | "document"
  | "pause"
  | "play"
  | "replay"
  | "search";

const chapters = ["Receive", "Check the records", "Approve the exception", "Schedule payment"];
const chapterStarts = [0, 2, 6, 9];
const actions = [
  {
    chapter: 0,
    screen: "queue",
    title: "A supplier invoice is assigned with a precise finish line.",
    next: "Open invoice",
    duration: 3200,
  },
  {
    chapter: 0,
    screen: "invoice",
    title: "Sprout reads invoice NP-20841 and captures the line item.",
    next: "Match PO",
    duration: 3000,
  },
  {
    chapter: 1,
    screen: "invoice",
    title: "The invoice references PO-1047 for 400 shipping cartons.",
    next: "Check receipt",
    duration: 3000,
  },
  {
    chapter: 1,
    screen: "invoice",
    title: "Receiving confirms all 400 cartons arrived in good condition.",
    next: "Check duplicates",
    duration: 3000,
  },
  {
    chapter: 1,
    screen: "invoice",
    title: "No duplicate invoice number, amount, or document was found.",
    next: "Compare price",
    duration: 3000,
  },
  {
    chapter: 1,
    screen: "exception",
    title: "The invoice is $80 above the PO, so policy requires approval.",
    next: "Prepare review",
    duration: 3400,
  },
  {
    chapter: 2,
    screen: "approval",
    title: "Sprout gathers the evidence into one focused human decision.",
    next: "Review context",
    duration: 3300,
  },
  {
    chapter: 2,
    screen: "approval",
    title: "Priya sees the PO, receipt, variance, and supplier history together.",
    next: "Approve exception",
    duration: 3600,
  },
  {
    chapter: 2,
    screen: "approved",
    title: "Priya approves this $80 price exception; Sprout records her decision.",
    next: "Record decision",
    duration: 3300,
  },
  {
    chapter: 3,
    screen: "recorded",
    title: "The approval and its supporting evidence are written to the invoice record.",
    next: "Schedule payment",
    duration: 3300,
  },
  {
    chapter: 3,
    screen: "scheduled",
    title: "Payment is scheduled for September 29 using the approved supplier method.",
    next: "Verify status",
    duration: 3400,
  },
  {
    chapter: 3,
    screen: "complete",
    title: "Invoice approved and payment scheduled. No funds have moved yet.",
    next: "Replay",
    duration: 3400,
  },
] as const;

function Glyph({ kind }: { kind: GlyphKind }) {
  const paths: Record<GlyphKind, string> = {
    arrow: "m9 5 7 7-7 7",
    back: "m15 5-7 7 7 7",
    check: "m5 12 4 4L19 6",
    document: "M6 3h8l4 4v14H6zM14 3v5h5M9 12h6M9 16h6",
    pause: "M9 5v14M16 5v14",
    play: "m9 5 11 7-11 7Z",
    replay: "M4 10a8 8 0 1 1 1 8M4 4v6h6",
    search: "m20 20-4.4-4.4M18 11a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z",
  };
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill={kind === "play" ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[kind]} />
    </svg>
  );
}

function CheckRow({
  active,
  done,
  label,
  result,
}: {
  active?: boolean;
  done?: boolean;
  label: string;
  result: string;
}) {
  return (
    <div className={`iw-check ${active ? "is-active" : ""} ${done ? "is-done" : ""}`}>
      <span className="iw-check__icon">{done ? <Glyph kind="check" /> : <Glyph kind="search" />}</span>
      <span>
        <strong>{label}</strong>
        <small>{result}</small>
      </span>
      <b>{done ? "Clear" : "Checking"}</b>
    </div>
  );
}

export default function InvoiceWalkthrough({ tabs, id }: { tabs?: ReactNode; id?: string }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const chapterRail = useRef<HTMLOListElement>(null);
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const action = actions[index];
  const finished = index === actions.length - 1;
  const invoiceOpen = index >= 1;
  const poChecked = index >= 2;
  const receiptChecked = index >= 3;
  const duplicateChecked = index >= 4;

  const jump = (next: number) => {
    setIndex(next);
    setPlaying(false);
  };

  const focusDemo = () => {
    requestAnimationFrame(() => {
      const target = window.matchMedia("(min-width: 701px)").matches
        ? root.current?.parentElement
        : stage.current;
      target?.scrollIntoView({ behavior: "instant", block: "start" });
    });
  };

  const advance = () => {
    if (finished) setIndex(0);
    else setIndex((current) => current + 1);
    setPlaying(false);
    focusDemo();
  };

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => {
      setIndex((current) => (current + 1) % actions.length);
    }, finished ? Math.max(action.duration, 4000) : action.duration);
    return () => window.clearTimeout(timer);
  }, [action.duration, finished, index, playing]);

  useEffect(() => {
    const rail = chapterRail.current;
    const active = rail?.children[action.chapter] as HTMLElement | undefined;
    if (!rail || !active) return;
    const left =
      rail.scrollLeft +
      active.getBoundingClientRect().left -
      rail.getBoundingClientRect().left -
      (rail.clientWidth - active.offsetWidth) / 2;
    rail.scrollTo({
      left,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  }, [action.chapter]);

  return (
    <section ref={root} className="iw sw" id={id} aria-label="Interactive supplier invoice processing demo">
      <header className="demo-header">
        {tabs ? <div className="iw-tabs">{tabs}</div> : null}
        <div className="demo-header-copy">
          <h2>Turn a price mismatch into an approved, scheduled invoice</h2>
          <p>Match the records, get approval for the price difference, then verify the payment schedule.</p><div className="sw-workflow-meta"><span>Verdant ERP</span><span>PDF invoice</span><span>Human approval</span><span>1 day</span></div>
        </div>
      </header>

      <ol ref={chapterRail} className="demo-chapters" aria-label="Invoice workflow chapters">
        {chapters.map((chapter, chapterIndex) => (
          <li key={chapter}>
            <button
              type="button"
              aria-pressed={action.chapter === chapterIndex}
              onClick={() => jump(chapterStarts[chapterIndex])}
            >
              <span>{action.chapter > chapterIndex ? <Glyph kind="check" /> : chapterIndex + 1}</span>
              {chapter}
            </button>
          </li>
        ))}
      </ol>

      <div className="iw-world">
      <div ref={stage} className={`iw-stage ${playing ? "is-playing" : ""}`} data-screen={action.screen}>
        <div className="iw-windowbar">
          <span className="iw-windowdots" aria-hidden="true"><i /><i /><i /></span>
          <span>Verdant Kitchens / Accounts payable</span>
          <span className="iw-demo-label">Demo workspace</span>
        </div>
        <div className="iw-appbar">
          <strong>Verdant</strong>
          <nav aria-label="Simulated accounts payable application"><span>Overview</span><b>Invoices</b><span>Suppliers</span><span>Payments</span></nav>
          <span className="iw-agent-state"><i /> Sprout is ready</span>
        </div>

        <div className="iw-workspace">
          <aside className="iw-sidebar" aria-label="Simulated application sections">
            <button className={action.screen === "queue" ? "is-selected" : ""} type="button" onClick={() => jump(0)}><span>▤</span>Inbox</button>
            <button className={action.screen !== "queue" ? "is-selected" : ""} type="button" onClick={() => jump(1)}><span>▧</span>Invoice</button>
            <button type="button"><span>◎</span>Vendors</button>
          </aside>

          <div className="iw-content" key={`${action.screen}-${index}`}>
            {action.screen === "queue" ? (
              <div className="iw-queue">
                <div className="iw-titlebar">
                  <div><small>Accounts payable / Assigned work</small><h3>Invoice inbox</h3></div>
                  <span>1 needs attention</span>
                </div>

                <div className="iw-brief" aria-label="Current assignment and completion condition">
                  <div><small>Assigned to Sprout</small><strong>Review Northstar Packaging invoice NP-20841</strong></div>
                  <div><small>Done when</small><strong>Approval is recorded and payment is scheduled</strong></div>
                </div>

                <div className="iw-table">
                  <div className="iw-table__head"><span>Supplier</span><span>Invoice</span><span>Amount</span><span>Status</span></div>
                  <button type="button" className="iw-invoice-row is-active" onClick={() => jump(1)}>
                    <span><b>NP</b><span><strong>Northstar Packaging</strong><small>Received today · PDF</small></span></span>
                    <span>NP-20841</span><strong>$1,800.00</strong><span className="iw-pill iw-pill--amber">Ready to review</span>
                  </button>
                  <div className="iw-invoice-row"><span><b>BC</b><span><strong>Beacon Cold Storage</strong><small>Received yesterday</small></span></span><span>BC-4418</span><strong>$642.00</strong><span className="iw-pill">Matched</span></div>
                </div>
              </div>
            ) : null}

            {action.screen === "invoice" ? (
              <div className="iw-invoice-screen">
                <InvoiceHeader status="In review" />
                <div className="iw-invoice-grid">
                  <section className={`iw-document ${index === 1 ? "is-focus" : ""}`}>
                    <div className="iw-document__title"><span><Glyph kind="document" /></span><div><strong>Invoice NP-20841</strong><small>Northstar Packaging · September 15</small></div><b>$1,800.00</b></div>
                    <div className="iw-line"><span>Recycled shipping cartons</span><span>400 × $4.50</span><strong>$1,800.00</strong></div>
                    <dl><div><dt>PO reference</dt><dd>PO-1047</dd></div><div><dt>Terms</dt><dd>Net 30</dd></div><div><dt>Due</dt><dd>October 15</dd></div></dl>
                  </section>
                  <section className="iw-checks" aria-label="Automated invoice checks">
                    <CheckRow active={index === 2} done={poChecked} label="Purchase order" result="PO-1047 · 400 cartons" />
                    <CheckRow active={index === 3} done={receiptChecked} label="Receiving record" result="400 received · No damage" />
                    <CheckRow active={index === 4} done={duplicateChecked} label="Duplicate search" result="Number, amount, and file hash" />
                  </section>
                </div>
                <p className="iw-scope-note">Sprout compares connected business records; Verdant remains the system of record.</p>
              </div>
            ) : null}

            {action.screen === "exception" ? (
              <div>
                <InvoiceHeader status="Approval needed" warning />
                <div className="iw-exception-layout">
                  <section className="iw-variance-card">
                    <span className="iw-kicker">Price exception</span>
                    <strong className="iw-variance">+$80.00</strong>
                    <p>Invoice unit price is $4.50. The purchase order unit price is $4.30.</p>
                    <div><span>Invoice total <b>$1,800.00</b></span><span>PO total <b>$1,720.00</b></span><span>Variance <b>4.65%</b></span></div>
                  </section>
                  <section className="iw-policy-card">
                    <small>Approval policy</small>
                    <strong>Price variance above 2% or $50</strong>
                    <p>This exception crosses both thresholds. Sprout cannot approve it.</p>
                    <span><Glyph kind="check" /> Quantity and duplicate checks are clear</span>
                  </section>
                </div>
              </div>
            ) : null}

            {action.screen === "approval" ? (
              <div>
                <InvoiceHeader status="Waiting for Priya" warning />
                <div className="iw-review-layout">
                  <section className="iw-decision-card">
                    <span className="iw-kicker">Focused human approval</span>
                    <h4>Approve an $80 price exception?</h4>
                    <p>Northstar invoiced $4.50 per carton against a $4.30 PO price.</p>
                    <label>Decision note<textarea readOnly value="Approved as a one-time supplier price exception." aria-label="Decision note" /></label>
                    <button type="button" onClick={() => jump(8)}>Approve exception <Glyph kind="arrow" /></button>
                    <small>Priya Shah · AP manager</small>
                  </section>
                  <section className="iw-support">
                    <div className={index === 7 ? "is-focus" : ""}><span>PO-1047</span><strong>400 × $4.30</strong><small>Authorized by Operations</small></div>
                    <div><span>Receiving</span><strong>400 of 400</strong><small>Received with no damage</small></div>
                    <div><span>Supplier history</span><strong>12 prior invoices</strong><small>No duplicates · 98% on time</small></div>
                    <div><span>Policy trigger</span><strong>4.65% · $80</strong><small>Human approval required</small></div>
                  </section>
                </div>
              </div>
            ) : null}

            {action.screen === "approved" ? (
              <div>
                <InvoiceHeader status="Approved" />
                <section className="iw-approved-card">
                  <span className="iw-approved-card__icon"><Glyph kind="check" /></span>
                  <div><small>Human decision received</small><h4>Price exception approved</h4><p>Priya Shah approved the $80 variance as a one-time supplier exception.</p></div>
                  <span className="iw-pill">Recorded at 10:42 AM</span>
                </section>
                <div className="iw-audit"><span><Glyph kind="check" /> Approver identity captured</span><span><Glyph kind="check" /> Supporting records linked</span><span><Glyph kind="check" /> Decision note preserved</span></div>
              </div>
            ) : null}

            {action.screen === "recorded" ? (
              <div>
                <InvoiceHeader status="Ready to schedule" />
                <section className="iw-record-card">
                  <span className="iw-kicker">Invoice record updated</span>
                  <h4>NP-20841 is approved for $1,800.00</h4>
                  <ol>
                    <li><span><Glyph kind="check" /></span><div><strong>Three-way check completed</strong><small>PO, receiving, and duplicate search</small></div></li>
                    <li><span><Glyph kind="check" /></span><div><strong>Exception approval recorded</strong><small>Priya Shah · $80 price variance · Audit link attached</small></div></li>
                    <li><span>3</span><div><strong>Schedule the payment</strong><small>Use Northstar’s approved ACH instructions</small></div></li>
                  </ol>
                </section>
              </div>
            ) : null}

            {action.screen === "scheduled" || action.screen === "complete" ? (
              <div>
                <InvoiceHeader status="Scheduled · Unpaid" />
                <div className={`iw-finish ${action.screen === "complete" ? "is-complete" : ""}`}>
                  <section className="iw-payment-card">
                    <span className="iw-kicker">Payment schedule</span>
                    <div className="iw-payment-amount"><strong>$1,800.00</strong><span className="iw-pill iw-pill--scheduled">Scheduled</span></div>
                    <dl><div><dt>Send on</dt><dd>September 29</dd></div><div><dt>Method</dt><dd>ACH · Approved ending 3146</dd></div><div><dt>Terms</dt><dd>Net 30 · Before October 15</dd></div></dl>
                    <p><i /> No funds have moved. Payment remains unpaid until the bank confirms settlement.</p>
                  </section>
                  <section className="iw-outcome">
                    <span className="iw-outcome__check"><Glyph kind="check" /></span>
                    <small>Workflow complete</small>
                    <h4>Approved and scheduled</h4>
                    <p>The invoice record holds the checks, exception decision, and payment schedule.</p>
                    <strong>Final status: Scheduled · Unpaid</strong>
                  </section>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <footer className="iw-statusbar">
          <span><i /> Illustrative data · Fictional company and suppliers</span>
          <span>Day 1 · {invoiceOpen ? "Invoice NP-20841" : "Accounts payable inbox"}</span>
        </footer>
      </div>

      </div>
      <div className="iw-director">
        <div className="iw-caption">
          <span className={playing ? "is-playing" : ""} />
          <p aria-live="polite" aria-atomic="true">{action.title}</p>
          <b>{String(index + 1).padStart(2, "0")} / {actions.length}</b>
        </div>
        <div className="iw-controls">
          <button
            type="button"
            className="iw-play"
            onClick={() => {
              if (finished && !playing) setIndex(0);
              setPlaying((current) => !current);
              focusDemo();
            }}
          >
            <Glyph kind={playing ? "pause" : finished ? "replay" : "play"} />
            {playing ? "Pause" : finished ? "Replay" : "Play"}
          </button>
          <input
            className="iw-scrub"
            type="range"
            min="0"
            max={actions.length - 1}
            value={index}
            onChange={(event) => jump(Number(event.target.value))}
            aria-label="Invoice workflow timeline"
            aria-valuetext={`Step ${index + 1} of ${actions.length}: ${action.title}`}
          />
          <div className="iw-progress" aria-label="Choose a workflow step">
            {actions.map((item, stepIndex) => (
              <button
                key={`${item.screen}-${stepIndex}`}
                type="button"
                className={`${stepIndex <= index ? "is-done" : ""} ${stepIndex === index ? "is-current" : ""}`}
                aria-label={`Step ${stepIndex + 1}: ${item.title}`}
                aria-current={stepIndex === index ? "step" : undefined}
                onClick={() => jump(stepIndex)}
              ><span /></button>
            ))}
          </div>
          <button type="button" className="iw-icon-button" onClick={() => jump(Math.max(0, index - 1))} disabled={index === 0} aria-label="Previous step"><Glyph kind="back" /></button>
          <button type="button" className="iw-next" onClick={advance} aria-label={action.next}>
            <span>{finished ? "Start over" : action.next}</span><Glyph kind={finished ? "replay" : "arrow"} />
          </button>
        </div>
      </div>
    </section>
  );
}

function InvoiceHeader({ status, warning = false }: { status: string; warning?: boolean }) {
  return (
    <div className="iw-invoice-header">
      <div><span className="iw-supplier-mark">NP</span><span><strong>Northstar Packaging</strong><small>Invoice NP-20841 · PO-1047</small></span></div>
      <span className={`iw-pill ${warning ? "iw-pill--amber" : ""}`}>{status}</span>
    </div>
  );
}
