/**
 * The economics model behind the ledger and the three-way comparison.
 *
 * Every figure here is derived from inputs the reader supplies. Nothing in
 * this file encodes a Primary Logic performance claim or a price — the
 * platform cost is the reader's own answer to "what would you pay for this?"
 *
 * The one structural assertion the model makes is that a coordinator team
 * scales in steps of headcount while a platform fee does not. That is
 * arithmetic, not marketing: it falls out of ceil(patients / capacity).
 */

export type Inputs = {
  /** Referrals and new-patient calls arriving each month. */
  inbound: number;
  /** Percentage of those that never complete intake today. */
  dropRate: number;
  /** Net collections attributable to one patient in their first year. */
  revenuePerPatient: number;
  /** Marketing spend to acquire one net-new patient. */
  acquisitionCost: number;
  /** The reader's assumption about how many of the lost group come back. */
  recoveryRate: number;
  /** Fully loaded monthly cost of one patient coordinator. */
  coordinatorCost: number;
  /** Patients one coordinator can work in a month. */
  coordinatorCapacity: number;
  /** The reader's modelled monthly cost for coverage software. */
  platformCost: number;
};

export const DEFAULTS: Inputs = {
  // Sized to a multi-site specialty group. Below roughly 150 lost patients a
  // month a single coordinator absorbs the whole workload, so the linear-vs-
  // fixed distinction has nothing to show; these defaults sit clear of that.
  inbound: 1200,
  dropRate: 35,
  revenuePerPatient: 1200,
  acquisitionCost: 250,
  recoveryRate: 30,
  coordinatorCost: 5500,
  coordinatorCapacity: 150,
  platformCost: 4500,
};

/** Below this many recovered patients a month, per-patient costs are noise. */
const MIN_DENOMINATOR = 1;

export type Model = {
  lostPerMonth: number;
  recoveredPerMonth: number;
  monthlyLoss: number;
  annualLoss: number;
  recoverableAnnual: number;
  sunkMonthly: number;
  coordinatorsNeeded: number;
  teamMonthlyCost: number;
  /** Cost to land one additional patient, three ways. null when undefined. */
  perPatient: {
    paid: number | null;
    team: number | null;
    coverage: number | null;
  };
};

export function computeModel(i: Inputs): Model {
  const lostPerMonth = i.inbound * (i.dropRate / 100);
  const recoveredPerMonth = lostPerMonth * (i.recoveryRate / 100);

  const monthlyLoss = lostPerMonth * i.revenuePerPatient;
  const annualLoss = monthlyLoss * 12;
  const recoverableAnnual = annualLoss * (i.recoveryRate / 100);
  const sunkMonthly = lostPerMonth * i.acquisitionCost;

  // A team has to work the whole lost cohort, not just the share that
  // converts — that is what makes its cost track volume in steps.
  const coordinatorsNeeded =
    i.coordinatorCapacity > 0 ? Math.ceil(lostPerMonth / i.coordinatorCapacity) : 0;
  const teamMonthlyCost = coordinatorsNeeded * i.coordinatorCost;

  const divisible = recoveredPerMonth >= MIN_DENOMINATOR;
  // With no stated capacity there is no team to price, which is not the same
  // as a team that costs nothing.
  const teamPriceable = divisible && i.coordinatorCapacity > 0;

  return {
    lostPerMonth,
    recoveredPerMonth,
    monthlyLoss,
    annualLoss,
    recoverableAnnual,
    sunkMonthly,
    coordinatorsNeeded,
    teamMonthlyCost,
    perPatient: {
      // Paid acquisition buys a net-new patient rather than recovering one,
      // so its per-patient cost is the reader's rate directly.
      paid: i.acquisitionCost > 0 ? i.acquisitionCost : null,
      team: teamPriceable ? teamMonthlyCost / recoveredPerMonth : null,
      coverage: divisible ? i.platformCost / recoveredPerMonth : null,
    },
  };
}

/** Seeds the platform-cost slider from what is actually at stake. */
export function suggestedPlatformCost(recoverableAnnual: number): number {
  const monthly = (recoverableAnnual * 0.03) / 12;
  return Math.max(500, Math.round(monthly / 500) * 500);
}
