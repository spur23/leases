import { LiabilityMonthly } from './LiabilityMonthly';

export class Liability {
  private startDate: Date;
  private monthlyTransactions: LiabilityMonthly[];

  constructor(
    startDate: string,
    private interestRate: number,
    private startingBalance: number,
    private life: number
  ) {
    this.startingBalance = startingBalance;
    this.startDate = new Date(startDate);
    this.interestRate = interestRate;
    this.life = life;
  }

  calculateMonthlySchedule(): LiabilityMonthly[] {
    let result = [];
    for (let i = 0; i < this.life; i++) {
      if (i === 0) {
        const month = new LiabilityMonthly(
          this.startDate,
          this.startingBalance,
          this.interestRate
        );
        result.push(month);
      }

      return result;
    }
  }
}
