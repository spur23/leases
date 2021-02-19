import { addMonth } from '../../utils';
import { LiabilityMonthly } from './LiabilityMonthly';

export class Liability {
  private startDate: Date;
  private monthlyTransactions: LiabilityMonthly[];

  constructor(
    startDate: string,
    private payment: number,
    private interestRate: number,
    private startingBalance: number,
    private life: number
  ) {
    this.startingBalance = startingBalance;
    this.startDate = new Date(startDate);
    this.payment = payment;
    this.interestRate = interestRate;
    this.life = life;
    this.monthlyTransactions = this.calculateMonthlySchedule();
  }

  calculateMonthlySchedule(): LiabilityMonthly[] {
    let result = [];
    for (let i = 0; i < this.life; i++) {
      if (i === 0) {
        const month = new LiabilityMonthly(
          this.startDate,
          this.payment,
          this.startingBalance,
          this.interestRate
        );
        result.push(month);
      } else {
        const nextMonth = addMonth(this.startDate, i);
        const { endingBalance } = result[i - 1].getMonthlyData();

        const month = new LiabilityMonthly(
          nextMonth,
          this.payment,
          endingBalance,
          this.interestRate
        );

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
        result[i].shortTermBalance = stBalance;
        result[i].longTermBalance = ltBalance;
      } else {
        result[i].shortTermBalance = result[i].endingBalance;
        result[i].longTermBalance = 0;
      }
    }

    return result;
  }

  getLiabilityData() {
    const schedule = this.monthlyTransactions.map((month) => {
      const {
        date,
        beginningBalance,
        interestExpense,
        principal,
        endingBalance,
        shortTermBalance,
        longTermBalance
      } = month.getMonthlyData();

      return {
        date,
        beginningBalance,
        interestExpense,
        principal,
        endingBalance,
        shortTermBalance,
        longTermBalance
      };
    });

    return schedule;
  }
}
