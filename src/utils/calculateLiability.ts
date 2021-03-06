import { roundNumber } from '.';
import { LiabilityMonthly } from '../classes/Liability/LiabilityMonthly';
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
    const payment = payments[i].payment;

    if (i === 0) {
      const month = new LiabilityMonthly(
        date,
        payment,
        startingBalance,
        interestRate,
        0,
        prepaid
      );

      result.push(month);
    } else {
      let month: LiabilityMonthly;
      const { interestExpense, endingBalance } = result[i - 1].getMonthlyData();

      if (prepaid) {
        month = new LiabilityMonthly(
          date,
          payment,
          endingBalance,
          interestRate,
          interestExpense,
          prepaid
        );
      } else {
        month = new LiabilityMonthly(
          date,
          payment,
          endingBalance,
          interestRate,
          0,
          prepaid
        );
      }

      result.push(month);
    }
  }

  result.sort(
    (a, b) => new Date(a.date).valueOf() - new Date(b.date).valueOf()
  );

  let stBalance = 0;
  let ltBalance = 0;

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
