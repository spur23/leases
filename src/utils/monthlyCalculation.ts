import { PaymentFrequency } from '../enums';
import { addMonth } from './addMonth';
/**
 *Calculates the next month and next payment depending on the payment frequency.
 */
const monthlyCalculation = (
  y: number,
  startDate: string,
  payment: number,
  frequency: PaymentFrequency
): { nextMonth: Date; monthlyPayment: number } => {
  let nextMonth = addMonth(new Date(startDate), y);
  let monthlyPayment = payment;

  if (y === 0) {
    nextMonth = new Date(startDate);
  } else if (frequency === PaymentFrequency.Annual) {
    if (y % 12 !== 0) {
      monthlyPayment = 0;
    }
  } else if (frequency === PaymentFrequency.SemiAnnual) {
    if (y % 6 !== 0) {
      monthlyPayment = 0;
    }
  } else if (frequency === PaymentFrequency.Quarterly) {
    if (y % 3 !== 0) {
      monthlyPayment = 0;
    }
  }

  return { nextMonth, monthlyPayment };
};

export default monthlyCalculation;
