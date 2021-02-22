import { LiabilitySchedule } from '../../interfaces';
import { PaymentStream } from '../../interfaces';
import { roundNumber } from '../../utils';
import { LiabilityMonthly } from './LiabilityMonthly';

export class Liability {
  private startDate: Date;
  private monthlyTransactions: LiabilityMonthly[];

  constructor(
    startDate: string,
    private payment: number,
    private paymentStream: PaymentStream[],
    private interestRate: number,
    private startingBalance: number,
    private life: number,
    private prepaid: boolean
  ) {
    this.startingBalance = startingBalance;
    this.startDate = new Date(startDate);
    this.paymentStream = paymentStream;
    this.payment = payment;
    this.interestRate = interestRate;
    this.life = life;
    this.prepaid = prepaid;

    this.monthlyTransactions = this.calculateMonthlySchedule();
  }

  calculateMonthlySchedule(): LiabilityMonthly[] {
    let result = [];

    for (let i = 0; i < this.paymentStream.length; i++) {
      const date = new Date(this.paymentStream[i].month);
      const payment = this.paymentStream[i].payment;

      if (i === 0) {
        const month = new LiabilityMonthly(
          date,
          payment,
          this.startingBalance,
          this.interestRate,
          0,
          this.prepaid
        );

        result.push(month);
      } else {
        let month;
        const { interestExpense, endingBalance } = result[
          i - 1
        ].getMonthlyData();

        if (this.prepaid) {
          month = new LiabilityMonthly(
            date,
            payment,
            endingBalance,
            this.interestRate,
            interestExpense,
            this.prepaid
          );
        } else {
          month = new LiabilityMonthly(
            date,
            payment,
            endingBalance,
            this.interestRate,
            0,
            this.prepaid
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
  }

  getLiabilityData(): LiabilitySchedule[] {
    const schedule = this.monthlyTransactions.map((month) => {
      const {
        date,
        beginningBalance,
        payment,
        interestExpense,
        interestPayment,
        principal,
        endingBalance,
        shortTermBalance,
        longTermBalance
      } = month.getMonthlyData();

      return {
        date,
        beginningBalance,
        payment,
        interestExpense,
        interestPayment,
        principal,
        endingBalance,
        shortTermBalance,
        longTermBalance
      };
    });

    return schedule;
  }
}
