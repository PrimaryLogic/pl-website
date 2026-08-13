/**
 * Transparent referral economics. Every result is derived from reader inputs;
 * defaults are an explicitly illustrative qualification scenario.
 */

export type Inputs = {
  monthlyReferrals: number;
  currentBooked: number;
  modeledBooked: number;
  monthlyCoordinationCost: number;
  contributionPerBooking: number;
  outcomeFee: number;
};

export const DEFAULTS: Inputs = {
  // Illustrative 30,000-referral annual cohort. The interface asks readers to
  // replace every figure with finance-approved values from one defined lane.
  monthlyReferrals: 2500,
  currentBooked: 875,
  modeledBooked: 1000,
  monthlyCoordinationCost: 25000,
  contributionPerBooking: 650,
  outcomeFee: 100,
};

export type Model = {
  currentBooked: number;
  modeledBooked: number;
  currentBookingRate: number;
  modeledBookingRate: number;
  unbookedReferrals: number;
  additionalBooked: number;
  currentCostPerBooking: number | null;
  monthlyContributionOpportunity: number;
  annualContributionOpportunity: number;
  annualOperatingValue: number;
  annualGrossSwitchingValue: number;
  annualOutcomeFee: number;
  annualCustomerRetained: number;
  grossValueToFee: number | null;
  customerRetainedPct: number;
  primaryLogicPct: number;
};

export function computeModel(inputs: Inputs): Model {
  const monthlyReferrals = Math.max(0, inputs.monthlyReferrals);
  const currentBooked = Math.min(Math.max(0, inputs.currentBooked), monthlyReferrals);
  const modeledBooked = Math.min(Math.max(0, inputs.modeledBooked), monthlyReferrals);
  const additionalBooked = Math.max(0, modeledBooked - currentBooked);
  const monthlyCoordinationCost = Math.max(0, inputs.monthlyCoordinationCost);
  const contributionPerBooking = Math.max(0, inputs.contributionPerBooking);
  const outcomeFee = Math.max(0, inputs.outcomeFee);
  const monthlyContributionOpportunity = additionalBooked * contributionPerBooking;
  const annualContributionOpportunity = monthlyContributionOpportunity * 12;
  const annualOperatingValue = monthlyCoordinationCost * 12;
  const annualGrossSwitchingValue = annualContributionOpportunity + annualOperatingValue;
  // Second-pass billing: the fee applies only to recovered kept visits — the
  // conversions beyond the customer's own first pass — never to the baseline.
  const annualOutcomeFee = additionalBooked * outcomeFee * 12;
  const annualCustomerRetained = annualGrossSwitchingValue - annualOutcomeFee;
  const grossValueToFee = annualOutcomeFee > 0 ? annualGrossSwitchingValue / annualOutcomeFee : null;
  const customerRetainedPct =
    annualGrossSwitchingValue > 0
      ? Math.max(0, Math.min(100, (annualCustomerRetained / annualGrossSwitchingValue) * 100))
      : 0;

  return {
    currentBooked,
    modeledBooked,
    currentBookingRate:
      monthlyReferrals > 0 ? (currentBooked / monthlyReferrals) * 100 : 0,
    modeledBookingRate:
      monthlyReferrals > 0 ? (modeledBooked / monthlyReferrals) * 100 : 0,
    unbookedReferrals: Math.max(0, monthlyReferrals - currentBooked),
    additionalBooked,
    currentCostPerBooking:
      currentBooked > 0 ? monthlyCoordinationCost / currentBooked : null,
    monthlyContributionOpportunity,
    annualContributionOpportunity,
    annualOperatingValue,
    annualGrossSwitchingValue,
    annualOutcomeFee,
    annualCustomerRetained,
    grossValueToFee,
    customerRetainedPct,
    primaryLogicPct: 100 - customerRetainedPct,
  };
}
