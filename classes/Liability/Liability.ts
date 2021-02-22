import { LiabilitySchedulePrint } from '../../interfaces';
import { PaymentStream } from '../../interfaces';
import { calculateLiability, roundNumber } from '../../utils';
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
    const monthlySchedule = calculateLiability(
      this.paymentStream,
      this.startingBalance,
      this.interestRate,
      this.prepaid
    );

    return monthlySchedule;
  }

  getLiabilityData(): LiabilitySchedulePrint[] {
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
        date: date.toLocaleDateString(),
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
