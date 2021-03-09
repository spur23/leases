import { roundNumber } from '.';
import { LiabilityMonthly } from '../classes/Liability/LiabilityMonthly';
import { PaymentFrequency } from '../enums';
import { PaymentStream } from '../interfaces';
/**
 *Calculates liability monthly schedule.
 */
const calculateLiability = (
  paymentStream: PaymentStream[],
  startingBalance: number,
  interestRate: number,
  prepaid: boolean
) => {
  let result = [];
  const payments = [...paymentStream];

  for (let i = 0; i < payments.length; i++) {
    const date = new Date(payments[i].month);
    const { frequency, payment } = payments[i];

    let annualPayments: number;

    if (frequency === PaymentFrequency.Monthly) {
      annualPayments = 12;
    } else if (frequency === PaymentFrequency.Quarterly) {
      annualPayments = 4;
    } else if (frequency === PaymentFrequency.SemiAnnual) {
      annualPayments = 2;
    } else if (frequency === PaymentFrequency.Annual) {
      annualPayments = 1;
    }

    if (i === 0) {
      if (prepaid) {
        const interestExpense =
          (startingBalance - payment) * (interestRate / annualPayments);
        const principal = payment;
        const interestPayment = 0;
        const endingBalance =
          startingBalance + interestExpense - principal - interestPayment;

        const month = new LiabilityMonthly(
          date,
          payment,
          roundNumber(principal, 2),
          roundNumber(startingBalance, 2),
          interestPayment,
          roundNumber(interestExpense, 2),
          roundNumber(interestPayment, 2),
          roundNumber(endingBalance, 2),
          prepaid
        );

        result.push(month);
      } else {
        const interestExpense =
          startingBalance * (interestRate / annualPayments);
        const principal = payment;
        const interestPayment = 0;
        const endingBalance =
          startingBalance + interestExpense - principal - interestPayment;

        console.log(
          startingBalance,
          principal,
          interestPayment,
          interestExpense,
          interestPayment,
          endingBalance
        );
        const month = new LiabilityMonthly(
          date,
          payment,
          roundNumber(principal, 2),
          roundNumber(startingBalance, 2),
          interestPayment,
          roundNumber(interestExpense, 2),
          roundNumber(interestPayment, 2),
          roundNumber(endingBalance, 2),
          prepaid
        );

        result.push(month);
      }

      // const month = new LiabilityMonthly(
      //   date,
      //   payment,
      //   startingBalance,
      //   interestRate,
      //   0,
      //   prepaid
      // );

      // result.push(month);
    } else {
      // let month: LiabilityMonthly;

      const { interestExpense, endingBalance } = result[i - 1].getMonthlyData();

      if (prepaid) {
        const { interestExpense, endingBalance } = result[
          i - 1
        ].getMonthlyData();

        let currentMonthInterestExpense =
          (endingBalance - payment) * (interestRate / annualPayments);

        const principal = payment - interestExpense;

        const interestPayment = interestExpense;

        const currentMonthEndingBalance =
          endingBalance +
          currentMonthInterestExpense -
          principal -
          interestPayment;

        if (i === payments.length - 1) {
          currentMonthInterestExpense = 0;
        }

        const month = new LiabilityMonthly(
          date,
          payment,
          roundNumber(principal, 2),
          roundNumber(endingBalance, 2),
          0,
          roundNumber(currentMonthInterestExpense, 2),
          roundNumber(interestPayment, 2),
          roundNumber(currentMonthEndingBalance, 2),
          prepaid
        );

        result.push(month);
      } else {
        const { interestExpense, endingBalance } = result[
          i - 1
        ].getMonthlyData();

        const currentMonthInterestExpense =
          startingBalance * (interestRate / annualPayments);

        const principal = payment - currentMonthInterestExpense;

        const interestPayment = 0;

        const currentMonthEndingBalance =
          endingBalance +
          currentMonthInterestExpense -
          principal -
          interestPayment;

        const month = new LiabilityMonthly(
          date,
          payment,
          roundNumber(principal, 2),
          roundNumber(endingBalance, 2),
          0,
          roundNumber(currentMonthInterestExpense, 2),
          roundNumber(interestPayment, 2),
          roundNumber(currentMonthEndingBalance, 2),
          prepaid
        );

        result.push(month);
        // month = new LiabilityMonthly(
        //   date,
        //   payment,
        //   endingBalance,
        //   interestRate,
        //   0,
        //   prepaid
        // );
      }

      // result.push(month);
    }
  }

  result = calculateSTLTBalances(result);

  return result;
};

/**
 * Calculates the ST and LT balances for the liability schedule
 * @param liabilitySchedule
 * @returns
 */
const calculateSTLTBalances = (liabilitySchedule) => {
  let result = [...liabilitySchedule];
  let stBalance = 0;
  let ltBalance = 0;

  result.sort(
    (a, b) => new Date(a.date).valueOf() - new Date(b.date).valueOf()
  );

  for (let i = 0; i < result.length; i++) {
    if (i < result.length - 12) {
      for (let y = 0; y < 12; y++) {
        stBalance += result[y + i].principal;
      }
      ltBalance = result[i].endingBalance - stBalance;
      result[i].shortTermBalance = roundNumber(stBalance, 2);
      result[i].longTermBalance = roundNumber(ltBalance, 2);
    } else {
      result[i].shortTermBalance = roundNumber(result[i].endingBalance, 2);
      result[i].longTermBalance = 0;
    }

    stBalance = 0;
    ltBalance = 0;
  }

  return result;
};

export default calculateLiability;
