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

        const month = new LiabilityMonthly(
          nextMonth,
          this.payment,
          this.startingBalance,
          this.interestRate
        );
      }

      return result;
    }
  }
}
