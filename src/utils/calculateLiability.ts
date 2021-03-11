import { roundNumber } from '.';
import { LiabilityMonthly } from '../classes/Liability/LiabilityMonthly';
import { PaymentStream } from '../interfaces';
/**
 *Calculates liability monthly schedule.
 */
const generateLiability = (
  paymentStream: PaymentStream[],
  startingBalance: number,
  interestRate: number,
  prepaid: boolean
) => {
  let result = [];
  const payments = [...paymentStream];

  for (let i = 0; i < payments.length; i++) {
    const date = new Date(payments[i].month);
    const { payment } = payments[i];

    // const annlPayments = annualPayments(frequency);
    const correctedInterestRate = interestRate / 12;

    result.push(
      calculateLiability(
        startingBalance,
        payment,
        correctedInterestRate,
        date,
        prepaid,
        i,
        payments.length,
        result
      )
    );
  }

  result = calculateSTLTBalances(result);

  return result;
};

const calculateLiability = (
  startingBalance: number,
  payment: number,
  interestRate: number,
  date: Date,
  prepaid: boolean,
  index: number,
  paymentsLength: number,
  schedule: any[]
) => {
  if (index === 0) {
    const principal = payment;
    const interestPayment = 0;

    if (prepaid) {
      const interestExpense = (startingBalance - payment) * interestRate;
      const endingBalance = endBalance(
        startingBalance,
        interestExpense,
        principal,
        interestPayment
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

      return month;
    } else {
      const interestExpense = startingBalance * interestRate;
      const endingBalance = endBalance(
        startingBalance,
        interestExpense,
        principal,
        interestPayment
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

      return month;
    }
  } else {
    const { interestExpense, endingBalance } = schedule[
      index - 1
    ].getMonthlyData();

    if (prepaid) {
      let currentMonthInterestExpense =
        (endingBalance - payment) * interestRate;

      const principal = payment - interestExpense;

      const interestPayment = interestExpense;

      if (index === paymentsLength - 1) {
        currentMonthInterestExpense = 0;
      }

      const currentMonthEndingBalance = endBalance(
        endingBalance,
        currentMonthInterestExpense,
        principal,
        interestPayment
      );

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

      return month;
    } else {
      const currentMonthInterestExpense = endingBalance * interestRate;

      const principal = payment;

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

      return month;
    }
  }
};

const endBalance = (
  beginningBalance: number,
  interestExpense: number,
  principal: number,
  interestPayment: number
): number => beginningBalance + interestExpense - principal - interestPayment;

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

export default generateLiability;
